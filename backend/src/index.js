import 'dotenv/config';
import express from 'express';
import documentRoutes from './routes/document.routes.js';

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use('/', documentRoutes);

// Global error handler — must be last
app.use((err, _req, res, _next) => {
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File too large. Maximum size is 5 MB.' });
    }
    if (err.message === 'Invalid file type') {
        return res.status(400).json({ error: 'Invalid file type. Allowed: PDF, JPEG, PNG.' });
    }
    if (err.message === 'Invalid file content') {
        return res.status(400).json({ error: 'Invalid file content. Signature mismatch detected.' });
    }
    if (err.code === 'P2025') {
        return res.status(404).json({ error: 'Document not found.' });
    }
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
