import multer from 'multer';
import path from 'path';
import { randomUUID } from 'crypto';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';
import { fileTypeFromFile } from 'file-type';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOADS_ROOT = path.resolve(__dirname, '..', '..', 'uploads');

const ALLOWED_MIME_TYPES = new Set(['application/pdf', 'image/jpeg', 'image/png']);
const ALLOWED_SIGNATURE_EXTS = new Set(['pdf', 'png', 'jpg']);

const FIELD_TO_DIR = {
    cv: 'cv',
    passport: 'passport',
    certificates: 'certificates',
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = FIELD_TO_DIR[file.fieldname] ?? 'misc';
        cb(null, path.join(UPLOADS_ROOT, dir));
    },
    filename: (_req, file, cb) => {
        // UUID-based name prevents path traversal and filename conflicts
        const ext = path.extname(file.originalname).toLowerCase().replace(/[^.a-z0-9]/g, '');
        cb(null, `${randomUUID()}${ext}`);
    },
});

const fileFilter = (_req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
        return cb(new Error('Invalid file type'), false);
    }
    cb(null, true);
};

export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
    fileFilter,
});

function expectedFieldKinds(fieldname) {
    if (fieldname === 'cv') return new Set(['pdf']);
    if (fieldname === 'passport') return new Set(['pdf', 'png', 'jpg']);
    if (fieldname === 'certificates') return new Set(['pdf', 'png', 'jpg']);
    return new Set();
}

export async function validateUploadedSignatures(req, res, next) {
    const filesByField = req.files ?? {};
    const allFiles = Object.values(filesByField).flat();

    try {
        for (const file of allFiles) {
            const detected = await fileTypeFromFile(file.path);
            const ext = detected?.ext?.toLowerCase();
            const expected = expectedFieldKinds(file.fieldname);

            if (!ext || !ALLOWED_SIGNATURE_EXTS.has(ext) || (expected.size > 0 && !expected.has(ext))) {
                throw new Error('Invalid file content');
            }
        }

        next();
    } catch (err) {
        await Promise.allSettled(allFiles.map((f) => fs.unlink(f.path)));
        return res.status(400).json({ error: 'Invalid file content. Signature mismatch detected.' });
    }
}
