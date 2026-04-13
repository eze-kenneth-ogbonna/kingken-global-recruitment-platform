import express from 'express';
import { upload, validateUploadedSignatures } from '../middleware/upload.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import {
    downloadDocument,
    exportAuditVerificationReport,
    listAuditLogs,
    listDocumentsForReview,
    updateDocumentStatus,
    uploadDocuments,
    verifyAuditChain,
} from '../controllers/document.controller.js';

const router = express.Router();

router.post(
    '/documents/upload',
    requireAuth,
    requireRole('WORKER'),
    upload.fields([
        { name: 'cv', maxCount: 1 },
        { name: 'passport', maxCount: 1 },
        { name: 'certificates', maxCount: 5 },
    ]),
    validateUploadedSignatures,
    uploadDocuments,
);

router.get('/admin/documents', requireAuth, requireRole('ADMIN', 'EMPLOYER'), listDocumentsForReview);

router.get('/admin/audit-logs', requireAuth, requireRole('ADMIN', 'EMPLOYER'), listAuditLogs);

router.get('/admin/audit-logs/verify', requireAuth, requireRole('ADMIN'), verifyAuditChain);

router.get('/admin/audit-logs/verify/report', requireAuth, requireRole('ADMIN'), exportAuditVerificationReport);

router.patch('/admin/documents/:id/status', requireAuth, requireRole('ADMIN', 'EMPLOYER'), updateDocumentStatus);

router.get('/documents/:id/download', requireAuth, requireRole('WORKER', 'ADMIN', 'EMPLOYER'), downloadDocument);

export default router;
