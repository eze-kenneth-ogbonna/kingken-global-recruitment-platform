import { useEffect, useState } from 'react';

const STATUS_OPTIONS = ['PENDING', 'APPROVED', 'REJECTED'];
const ACTION_OPTIONS = ['', 'APPROVE_DOC', 'REJECT_DOC', 'SET_PENDING_DOC', 'DOWNLOAD_DOC'];

export default function AdminDocuments() {
    const [activeTab, setActiveTab] = useState('documents');
    const [docs, setDocs] = useState([]);
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [notice, setNotice] = useState('');
    const [logFilters, setLogFilters] = useState({ actorId: '', action: '', from: '', to: '' });
    const [verifyResult, setVerifyResult] = useState(null);

    async function fetchDocuments() {
        setLoading(true);
        setError('');
        setNotice('');

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/admin/documents', {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data.error ?? 'Failed to load documents.');
                return;
            }

            setDocs(data);
        } catch {
            setError('Network error while loading documents.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDocuments();
    }, []);

    async function fetchAuditLogs(filters = logFilters) {
        setLoading(true);
        setError('');
        setNotice('');

        try {
            const params = new URLSearchParams();
            if (filters.actorId) params.set('actorId', filters.actorId);
            if (filters.action) params.set('action', filters.action);
            if (filters.from) params.set('from', filters.from);
            if (filters.to) params.set('to', filters.to);

            const token = localStorage.getItem('token');
            const res = await fetch(`/admin/audit-logs?${params.toString()}`, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data.error ?? 'Failed to load audit logs.');
                return;
            }

            setLogs(data);
        } catch {
            setError('Network error while loading audit logs.');
        } finally {
            setLoading(false);
        }
    }

    async function verifyAuditIntegrity() {
        setError('');
        setNotice('');
        setVerifyResult(null);

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/admin/audit-logs/verify', {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data.error ?? 'Failed to verify audit chain.');
                return;
            }

            setVerifyResult(data);
        } catch {
            setError('Network error while verifying audit chain.');
        }
    }

    async function downloadAuditReport() {
        setError('');
        setNotice('');

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/admin/audit-logs/verify/report', {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });

            if (!res.ok) {
                const data = await res.json();
                setError(data.error ?? 'Failed to download audit report.');
                return;
            }

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'audit-report.json';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch {
            setError('Network error while downloading audit report.');
        }
    }

    async function updateStatus(id, status) {
        try {
            setError('');
            setNotice('');
            const token = localStorage.getItem('token');
            const res = await fetch(`/admin/documents/${id}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify({ status }),
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data.error ?? 'Failed to update status.');
                return;
            }

            setDocs((prev) => prev.map((d) => (d.id === id ? data : d)));
            setNotice(`Document status updated to ${status}. Notification email sent if the worker has a saved email address.`);
        } catch {
            setError('Network error while updating status.');
        }
    }

    async function downloadDocument(id) {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`/documents/${id}/download`, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });

            if (!res.ok) {
                const data = await res.json();
                setError(data.error ?? 'Failed to download file.');
                return;
            }

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `document-${id}`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch {
            setError('Network error while downloading file.');
        }
    }

    return (
        <main style={styles.page}>
            <div style={styles.container}>
                <h1 style={styles.heading}>Document Review</h1>
                <p style={styles.sub}>Admin/Employer workflow: view, approve/reject, and download.</p>

                <div style={styles.tabBar}>
                    <button
                        style={activeTab === 'documents' ? styles.activeTab : styles.tab}
                        onClick={() => {
                            setActiveTab('documents');
                            fetchDocuments();
                        }}
                    >
                        Documents
                    </button>
                    <button
                        style={activeTab === 'audit' ? styles.activeTab : styles.tab}
                        onClick={() => {
                            setActiveTab('audit');
                            fetchAuditLogs();
                        }}
                    >
                        Audit Logs
                    </button>
                </div>

                {error && <p style={styles.error}>{error}</p>}
                {notice && <p style={styles.notice}>{notice}</p>}

                {loading ? (
                    <p>Loading documents…</p>
                ) : activeTab === 'documents' ? (
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>User</th>
                                <th style={styles.th}>Type</th>
                                <th style={styles.th}>Status</th>
                                <th style={styles.th}>Created</th>
                                <th style={styles.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {docs.map((doc) => (
                                <tr key={doc.id}>
                                    <td style={styles.td}>{doc.userId}</td>
                                    <td style={styles.td}>{doc.type}</td>
                                    <td style={styles.td}>{doc.status}</td>
                                    <td style={styles.td}>{new Date(doc.createdAt).toLocaleString()}</td>
                                    <td style={styles.td}>
                                        <div style={styles.actions}>
                                            {STATUS_OPTIONS.map((status) => (
                                                <button
                                                    key={status}
                                                    style={styles.smallButton}
                                                    onClick={() => updateStatus(doc.id, status)}
                                                    disabled={doc.status === status}
                                                >
                                                    {status}
                                                </button>
                                            ))}
                                            <button style={styles.smallButton} onClick={() => downloadDocument(doc.id)}>
                                                Download
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div>
                        <div style={styles.filters}>
                            <input
                                style={styles.input}
                                placeholder="Actor ID"
                                value={logFilters.actorId}
                                onChange={(e) => setLogFilters((p) => ({ ...p, actorId: e.target.value }))}
                            />
                            <select
                                style={styles.input}
                                value={logFilters.action}
                                onChange={(e) => setLogFilters((p) => ({ ...p, action: e.target.value }))}
                            >
                                {ACTION_OPTIONS.map((action) => (
                                    <option key={action || 'all'} value={action}>
                                        {action || 'All actions'}
                                    </option>
                                ))}
                            </select>
                            <input
                                style={styles.input}
                                type="date"
                                value={logFilters.from}
                                onChange={(e) => setLogFilters((p) => ({ ...p, from: e.target.value }))}
                            />
                            <input
                                style={styles.input}
                                type="date"
                                value={logFilters.to}
                                onChange={(e) => setLogFilters((p) => ({ ...p, to: e.target.value }))}
                            />
                            <button style={styles.smallButton} onClick={() => fetchAuditLogs()}>
                                Apply Filters
                            </button>
                            <button style={styles.verifyButton} onClick={verifyAuditIntegrity}>
                                Verify Audit Integrity
                            </button>
                            <button style={styles.reportButton} onClick={downloadAuditReport}>
                                Download Audit Report
                            </button>
                        </div>

                        {verifyResult && (
                            <div style={verifyResult.valid ? styles.verifyOk : styles.verifyBad}>
                                {verifyResult.valid ? (
                                    verifyResult.legacyDetected
                                        ? `⚠️ Legacy Format Detected (${verifyResult.legacyCount} record(s)); integrity intact for current chain.`
                                        : `✅ Chain Valid (${verifyResult.totalLogs} logs)`
                                ) : (
                                    `❌ Chain Broken at record #${verifyResult.brokenAt} (log ${verifyResult.logId})`
                                )}
                            </div>
                        )}

                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Actor</th>
                                    <th style={styles.th}>Action</th>
                                    <th style={styles.th}>Target Document</th>
                                    <th style={styles.th}>IP</th>
                                    <th style={styles.th}>Hash</th>
                                    <th style={styles.th}>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.map((log) => (
                                    <tr key={log.id}>
                                        <td style={styles.td}>{log.actorId}</td>
                                        <td style={styles.td}>{log.action}</td>
                                        <td style={styles.td}>{log.targetId}</td>
                                        <td style={styles.td}>{log.ipAddress ?? '-'}</td>
                                        <td style={styles.td} title={log.hash}>{String(log.hash).slice(0, 16)}…</td>
                                        <td style={styles.td}>{new Date(log.createdAt).toLocaleString()}</td>
                                    </tr>
                                ))}
                                {logs.length === 0 && (
                                    <tr>
                                        <td style={styles.td} colSpan={6}>
                                            No audit logs found for current filters.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </main>
    );
}

const styles = {
    page: {
        minHeight: '100vh',
        padding: '2rem',
        background: '#f4f5f7',
        fontFamily: 'system-ui, sans-serif',
    },
    container: {
        maxWidth: 1100,
        margin: '0 auto',
        background: '#fff',
        borderRadius: 12,
        padding: '1.5rem',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    },
    heading: { margin: 0, fontSize: '1.5rem' },
    sub: { color: '#666', marginBottom: '1rem' },
    error: { color: '#d32f2f' },
    notice: { color: '#166534', marginBottom: '1rem' },
    table: { width: '100%', borderCollapse: 'collapse' },
    tabBar: { display: 'flex', gap: 8, marginBottom: 12 },
    tab: {
        border: '1px solid #d1d5db',
        background: '#fff',
        borderRadius: 8,
        padding: '0.4rem 0.75rem',
        cursor: 'pointer',
    },
    activeTab: {
        border: '1px solid #2563eb',
        background: '#2563eb',
        color: '#fff',
        borderRadius: 8,
        padding: '0.4rem 0.75rem',
        cursor: 'pointer',
    },
    filters: { display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 },
    input: {
        border: '1px solid #d1d5db',
        borderRadius: 6,
        padding: '0.35rem 0.5rem',
    },
    th: { textAlign: 'left', borderBottom: '1px solid #ddd', padding: '0.6rem' },
    td: { borderBottom: '1px solid #eee', padding: '0.6rem', verticalAlign: 'top' },
    actions: { display: 'flex', gap: 6, flexWrap: 'wrap' },
    smallButton: {
        border: '1px solid #ccc',
        background: '#fff',
        borderRadius: 6,
        padding: '0.35rem 0.55rem',
        cursor: 'pointer',
    },
    verifyButton: {
        border: '1px solid #2563eb',
        background: '#2563eb',
        color: '#fff',
        borderRadius: 6,
        padding: '0.35rem 0.65rem',
        cursor: 'pointer',
    },
    reportButton: {
        border: '1px solid #0f766e',
        background: '#0f766e',
        color: '#fff',
        borderRadius: 6,
        padding: '0.35rem 0.65rem',
        cursor: 'pointer',
    },
    verifyOk: {
        marginBottom: 12,
        color: '#166534',
        background: '#dcfce7',
        border: '1px solid #86efac',
        borderRadius: 8,
        padding: '0.5rem 0.75rem',
    },
    verifyBad: {
        marginBottom: 12,
        color: '#991b1b',
        background: '#fee2e2',
        border: '1px solid #fca5a5',
        borderRadius: 8,
        padding: '0.5rem 0.75rem',
    },
};
