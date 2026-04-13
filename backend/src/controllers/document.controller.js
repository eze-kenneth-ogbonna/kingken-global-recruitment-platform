import { PrismaClient } from '@prisma/client';
import { createHash } from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';
import { sendDocumentReviewedEmail, sendUploadReceivedEmail } from '../services/email.service.js';

const prisma = new PrismaClient();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOADS_ROOT = path.resolve(__dirname, '..', '..', 'uploads');

const AuditAction = {
    APPROVE_DOC: 'APPROVE_DOC',
    REJECT_DOC: 'REJECT_DOC',
    SET_PENDING_DOC: 'SET_PENDING_DOC',
    DOWNLOAD_DOC: 'DOWNLOAD_DOC',
};

const ALLOWED_STATUS = new Set(['PENDING', 'APPROVED', 'REJECTED']);

function statusToAction(status) {
    if (status === 'APPROVED') return AuditAction.APPROVE_DOC;
    if (status === 'REJECTED') return AuditAction.REJECT_DOC;
    return AuditAction.SET_PENDING_DOC;
}

function getRequestContext(req) {
    const forwarded = req.headers['x-forwarded-for'];
    const ipAddress = Array.isArray(forwarded)
        ? forwarded[0]
        : typeof forwarded === 'string'
            ? forwarded.split(',')[0].trim()
            : req.ip;

    return {
        ipAddress: ipAddress || null,
        userAgent: req.headers['user-agent'] || null,
    };
}

function buildLogHash(previousHash, payload) {
    return createHash('sha256')
        .update(`${previousHash ?? ''}|${JSON.stringify(payload)}`)
        .digest('hex');
}

function buildLegacyHash(previousHash, payload, separator = '') {
    return createHash('sha256')
        .update(`${previousHash ?? ''}${separator}${JSON.stringify(payload)}`)
        .digest('hex');
}

function buildAuditPayload({ actorId, action, targetId, metadata, ipAddress, userAgent, createdAt }) {
    return {
        actorId,
        action,
        targetId,
        metadata: metadata ?? null,
        ipAddress: ipAddress ?? null,
        userAgent: userAgent ?? null,
        createdAt,
    };
}

function serializeMetadata(metadata) {
    if (metadata === null || metadata === undefined) return null;
    try {
        return JSON.stringify(metadata);
    } catch {
        return JSON.stringify({ value: String(metadata) });
    }
}

function parseMetadata(metadata) {
    if (metadata === null || metadata === undefined) return null;
    if (typeof metadata !== 'string') return metadata;
    try {
        return JSON.parse(metadata);
    } catch {
        return metadata;
    }
}

async function writeAuditLog(req, { actorId, action, targetId, metadata = null }) {
    // Append-only pattern: only create/read, never update/delete.
    const latest = await prisma.auditLog.findFirst({
        orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
        select: { hash: true },
    });

    const context = getRequestContext(req);
    const eventTime = new Date();
    const payload = buildAuditPayload({
        actorId,
        action,
        targetId,
        metadata,
        ipAddress: context.ipAddress,
        userAgent: context.userAgent,
        createdAt: eventTime.toISOString(),
    });

    const hash = buildLogHash(latest?.hash ?? null, payload);

    await prisma.auditLog.create({
        data: {
            actorId,
            action,
            targetId,
            version: 2,
            metadata: serializeMetadata(metadata),
            ipAddress: context.ipAddress,
            userAgent: context.userAgent,
            prevHash: latest?.hash ?? null,
            hash,
            createdAt: eventTime,
        },
    });
}

function tryLegacyVerification(log, previousHash) {
    const payloads = [
        {
            actorId: log.actorId,
            action: log.action,
            targetId: log.targetId,
            metadata: parseMetadata(log.metadata),
            createdAt: new Date(log.createdAt).toISOString(),
        },
        {
            actorId: log.actorId,
            action: log.action,
            targetId: log.targetId,
            createdAt: new Date(log.createdAt).toISOString(),
        },
        {
            actorId: log.actorId,
            action: log.action,
            targetId: log.targetId,
            createdAt: String(log.createdAt),
        },
    ];

    const previousCandidates = [previousHash ?? null, log.prevHash ?? null, null];

    for (const payload of payloads) {
        for (const prev of previousCandidates) {
            const noSep = buildLegacyHash(prev, payload, '');
            if (noSep === log.hash) {
                return { valid: true, mode: 'legacy-no-separator' };
            }

            const withSep = buildLegacyHash(prev, payload, '|');
            if (withSep === log.hash) {
                return { valid: true, mode: 'legacy-separator' };
            }
        }
    }

    return { valid: false, mode: null };
}

async function verifyChainInternal(logs) {
    let previousHash = null;
    let legacyCount = 0;
    const legacyLogIds = [];

    for (let i = 0; i < logs.length; i += 1) {
        const log = logs[i];

        const payload = buildAuditPayload({
            actorId: log.actorId,
            action: log.action,
            targetId: log.targetId,
            metadata: parseMetadata(log.metadata),
            ipAddress: log.ipAddress,
            userAgent: log.userAgent,
            createdAt: new Date(log.createdAt).toISOString(),
        });

        const expectedHash = buildLogHash(previousHash, payload);
        const expectedPrevHash = previousHash;

        const strictValid = log.prevHash === expectedPrevHash && log.hash === expectedHash;

        if (!strictValid) {
            const legacy = tryLegacyVerification(log, previousHash);
            if (legacy.valid) {
                legacyCount += 1;
                legacyLogIds.push(log.id);
                previousHash = log.hash;
                continue;
            }

            return {
                valid: false,
                brokenAt: i,
                logId: log.id,
                expectedPrevHash,
                actualPrevHash: log.prevHash,
                expectedHash,
                actualHash: log.hash,
                reason: 'Hash mismatch (not legacy-compatible)',
                legacyDetected: legacyCount > 0,
                legacyCount,
                legacyLogIds,
            };
        }

        previousHash = log.hash;
    }

    return {
        valid: true,
        totalLogs: logs.length,
        lastHash: previousHash,
        legacyDetected: legacyCount > 0,
        legacyCount,
        legacyLogIds,
    };
}

export async function uploadDocuments(req, res) {
    const files = req.files;
    const uploaderEmail = typeof req.user?.email === 'string' ? req.user.email : null;

    if (!files || Object.keys(files).length === 0) {
        return res.status(400).json({ error: 'No files uploaded.' });
    }

    const uploads = [];

    for (const [fieldname, fileList] of Object.entries(files)) {
        for (const file of fileList) {
            const doc = await prisma.document.create({
                data: {
                    userId: req.user.id,
                    uploaderEmail,
                    type: fieldname.toUpperCase(),
                    // Store relative path — never expose absolute server paths to clients
                    filePath: `uploads/${fieldname}/${file.filename}`,
                    status: 'PENDING',
                },
            });

            // Return metadata only — never expose filePath to the client
            uploads.push({ id: doc.id, type: doc.type, status: doc.status, createdAt: doc.createdAt });
        }
    }

    await sendUploadReceivedEmail({
        to: uploaderEmail,
        documents: uploads,
    });

    res.status(201).json(uploads);
}

export async function listDocumentsForReview(_req, res) {
    const docs = await prisma.document.findMany({
        orderBy: { createdAt: 'desc' },
        select: {
            id: true,
            userId: true,
            type: true,
            status: true,
            createdAt: true,
        },
    });

    res.json(docs);
}

export async function updateDocumentStatus(req, res) {
    const { id } = req.params;
    const status = String(req.body?.status ?? '').toUpperCase();

    if (!ALLOWED_STATUS.has(status)) {
        return res.status(400).json({ error: 'Invalid status. Use PENDING, APPROVED, or REJECTED.' });
    }

    const existing = await prisma.document.findUnique({
        where: { id },
        select: { id: true, status: true, type: true, uploaderEmail: true },
    });
    if (!existing) {
        return res.status(404).json({ error: 'Document not found.' });
    }

    const updated = await prisma.document.update({
        where: { id },
        data: { status },
        select: {
            id: true,
            userId: true,
            uploaderEmail: true,
            type: true,
            status: true,
            createdAt: true,
        },
    });

    await writeAuditLog(req, {
        actorId: req.user.id,
        action: statusToAction(status),
        targetId: updated.id,
        metadata: {
            fromStatus: existing.status,
            toStatus: status,
            documentType: existing.type,
        },
    });

    if (status === 'APPROVED' || status === 'REJECTED') {
        await sendDocumentReviewedEmail({
            to: existing.uploaderEmail,
            documentId: updated.id,
            documentType: updated.type,
            status,
        });
    }

    res.json(updated);
}

export async function downloadDocument(req, res) {
    const { id } = req.params;

    const doc = await prisma.document.findUnique({ where: { id } });
    if (!doc) {
        return res.status(404).json({ error: 'Document not found.' });
    }

    // Workers can only download their own docs. Admin/Employer can download any.
    const userRole = req.user?.role;
    if (userRole === 'WORKER' && doc.userId !== req.user.id) {
        return res.status(403).json({ error: 'Forbidden' });
    }

    const absolutePath = path.resolve(__dirname, '..', '..', doc.filePath);
    const normalizedRoot = path.normalize(UPLOADS_ROOT + path.sep);
    const normalizedTarget = path.normalize(absolutePath);

    if (!normalizedTarget.startsWith(normalizedRoot)) {
        return res.status(400).json({ error: 'Invalid file path.' });
    }

    await writeAuditLog(req, {
        actorId: req.user.id,
        action: AuditAction.DOWNLOAD_DOC,
        targetId: doc.id,
        metadata: {
            documentType: doc.type,
            documentStatus: doc.status,
        },
    });

    res.download(normalizedTarget, (err) => {
        if (err && !res.headersSent) {
            res.status(404).json({ error: 'File not found on disk.' });
        }
    });
}

export async function listAuditLogs(req, res) {
    const { actorId, action, from, to } = req.query;

    const where = {};

    // ADMIN sees full logs; EMPLOYER sees only their own actions.
    if (req.user.role === 'EMPLOYER') {
        where.actorId = req.user.id;
    } else if (actorId) {
        where.actorId = String(actorId);
    }

    if (action) {
        const normalized = String(action).toUpperCase();
        if (!Object.values(AuditAction).includes(normalized)) {
            return res.status(400).json({ error: 'Invalid action filter.' });
        }
        where.action = normalized;
    }

    if (from || to) {
        where.createdAt = {};
        if (from) {
            const fromDate = new Date(String(from));
            if (Number.isNaN(fromDate.getTime())) return res.status(400).json({ error: 'Invalid from date.' });
            where.createdAt.gte = fromDate;
        }
        if (to) {
            const toDate = new Date(String(to));
            if (Number.isNaN(toDate.getTime())) return res.status(400).json({ error: 'Invalid to date.' });
            where.createdAt.lte = toDate;
        }
    }

    const logs = await prisma.auditLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: 200,
    });

    const normalized = logs.map((log) => ({
        ...log,
        metadata: parseMetadata(log.metadata),
    }));

    res.json(normalized);
}

export async function verifyAuditChain(_req, res) {
    const logs = await prisma.auditLog.findMany({
        orderBy: [{ createdAt: 'asc' }, { id: 'asc' }],
    });

    const result = await verifyChainInternal(logs);

    return res.json(result);
}

export async function exportAuditVerificationReport(_req, res) {
    const logs = await prisma.auditLog.findMany({
        orderBy: [{ createdAt: 'asc' }, { id: 'asc' }],
    });

    const result = await verifyChainInternal(logs);
    const firstLog = logs[0] ?? null;
    const lastLog = logs[logs.length - 1] ?? null;

    const report = {
        status: result.valid ? 'VALID' : 'BROKEN',
        checkedAt: new Date().toISOString(),
        totalLogs: logs.length,
        lastHash: lastLog?.hash ?? null,
        chainStart: firstLog?.createdAt ?? null,
        chainEnd: lastLog?.createdAt ?? null,
        legacy: {
            detected: Boolean(result.legacyDetected),
            count: result.legacyCount ?? 0,
        },
        integrity: {
            broken: !result.valid,
            brokenAt: result.brokenAt ?? null,
            logId: result.logId ?? null,
            reason: result.reason ?? null,
        },
    };

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="audit-report.json"');

    return res.json(report);
}
