import { useState, useRef } from 'react';

const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

const STATUS = { IDLE: 'idle', LOADING: 'loading', SUCCESS: 'success', ERROR: 'error' };

function validateFile(file) {
    if (!file) return null;
    if (!ALLOWED_TYPES.includes(file.type)) return 'Only PDF, JPEG and PNG files are allowed.';
    if (file.size > MAX_SIZE_BYTES) return 'File must be 5 MB or smaller.';
    return null;
}

export default function UploadDocuments() {
    const [cv, setCv] = useState(null);
    const [passport, setPassport] = useState(null);
    const [certificates, setCertificates] = useState([]);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState(STATUS.IDLE);
    const [serverMessage, setServerMessage] = useState('');

    const cvRef = useRef(null);
    const passportRef = useRef(null);
    const certRef = useRef(null);

    function handleSingleFile(setter, field) {
        return (e) => {
            const file = e.target.files[0] ?? null;
            const err = file ? validateFile(file) : null;
            setter(file);
            setErrors((prev) => ({ ...prev, [field]: err }));
        };
    }

    function handleCertificates(e) {
        const files = Array.from(e.target.files);
        const errs = files.map(validateFile).filter(Boolean);
        setCertificates(files);
        setErrors((prev) => ({ ...prev, certificates: errs[0] ?? null }));
    }

    function hasErrors() {
        return Object.values(errors).some(Boolean);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!cv && !passport && certificates.length === 0) {
            setServerMessage('Please select at least one file to upload.');
            setStatus(STATUS.ERROR);
            return;
        }
        if (hasErrors()) return;

        const formData = new FormData();
        if (cv) formData.append('cv', cv);
        if (passport) formData.append('passport', passport);
        certificates.forEach((f) => formData.append('certificates', f));

        setStatus(STATUS.LOADING);
        setServerMessage('');

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/documents/upload', {
                method: 'POST',
                headers: token ? { Authorization: `Bearer ${token}` } : {},
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                setStatus(STATUS.ERROR);
                setServerMessage(data.error ?? 'Upload failed. Please try again.');
                return;
            }

            setStatus(STATUS.SUCCESS);
            setServerMessage(`${data.length} file(s) uploaded successfully. If your account has an email address, a confirmation email has been sent.`);
            // Reset form
            setCv(null);
            setPassport(null);
            setCertificates([]);
            setErrors({});
            if (cvRef.current) cvRef.current.value = '';
            if (passportRef.current) passportRef.current.value = '';
            if (certRef.current) certRef.current.value = '';
        } catch {
            setStatus(STATUS.ERROR);
            setServerMessage('Network error. Please check your connection and try again.');
        }
    }

    return (
        <main style={styles.page}>
            <div style={styles.card}>
                <h1 style={styles.heading}>Upload Documents</h1>
                <p style={styles.sub}>Accepted formats: PDF, JPEG, PNG · Max 5 MB per file · Review updates are sent by email when available.</p>

                <form onSubmit={handleSubmit} noValidate>
                    <FileField
                        label="CV / Résumé"
                        ref={cvRef}
                        onChange={handleSingleFile(setCv, 'cv')}
                        fileName={cv?.name}
                        error={errors.cv}
                    />
                    <FileField
                        label="Passport or ID"
                        ref={passportRef}
                        onChange={handleSingleFile(setPassport, 'passport')}
                        fileName={passport?.name}
                        error={errors.passport}
                    />
                    <FileField
                        label="Certificates (up to 5)"
                        ref={certRef}
                        onChange={handleCertificates}
                        multiple
                        fileName={certificates.length ? `${certificates.length} file(s) selected` : null}
                        error={errors.certificates}
                    />

                    {serverMessage && (
                        <p style={status === STATUS.SUCCESS ? styles.success : styles.error}>
                            {serverMessage}
                        </p>
                    )}

                    <button
                        type="submit"
                        style={styles.button}
                        disabled={status === STATUS.LOADING || hasErrors()}
                    >
                        {status === STATUS.LOADING ? 'Uploading…' : 'Upload Documents'}
                    </button>
                </form>
            </div>
        </main>
    );
}

// eslint-disable-next-line react/display-name
const FileField = ({ label, fileName, error, multiple, onChange, ref }) => (
    <div style={styles.field}>
        <label style={styles.label}>{label}</label>
        <input
            ref={ref}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            multiple={multiple}
            onChange={onChange}
            style={styles.input}
        />
        {fileName && <span style={styles.fileName}>{fileName}</span>}
        {error && <span style={styles.fieldError}>{error}</span>}
    </div>
);

const styles = {
    page: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f4f5f7',
        fontFamily: 'system-ui, sans-serif',
    },
    card: {
        background: '#fff',
        borderRadius: 12,
        padding: '2rem',
        width: '100%',
        maxWidth: 480,
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    },
    heading: { margin: '0 0 4px', fontSize: '1.5rem', color: '#111' },
    sub: { margin: '0 0 1.5rem', fontSize: '0.85rem', color: '#666' },
    field: { marginBottom: '1.25rem' },
    label: { display: 'block', fontWeight: 600, marginBottom: 6, fontSize: '0.9rem' },
    input: { display: 'block', width: '100%' },
    fileName: { display: 'block', marginTop: 4, fontSize: '0.8rem', color: '#444' },
    fieldError: { display: 'block', marginTop: 4, fontSize: '0.8rem', color: '#d32f2f' },
    error: { color: '#d32f2f', fontSize: '0.875rem', marginBottom: '1rem' },
    success: { color: '#2e7d32', fontSize: '0.875rem', marginBottom: '1rem' },
    button: {
        width: '100%',
        padding: '0.75rem',
        background: '#1565c0',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        fontSize: '1rem',
        fontWeight: 600,
        cursor: 'pointer',
    },
};
