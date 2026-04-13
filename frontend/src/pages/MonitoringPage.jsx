import { useEffect, useMemo, useState } from 'react';

const REFRESH_MS = 30000;

function formatValue(value) {
    if (value === null || value === undefined || value === '') {
        return '—';
    }
    return String(value);
}

function statusTone(status) {
    if (status === 'success') return { bg: '#dcfce7', border: '#86efac', text: '#166534' };
    if (status === 'rolled_back') return { bg: '#fef3c7', border: '#fcd34d', text: '#92400e' };
    return { bg: '#fee2e2', border: '#fca5a5', text: '#991b1b' };
}

export default function MonitoringPage() {
    const [status, setStatus] = useState(null);
    const [uptime, setUptime] = useState(null);
    const [publicStatus, setPublicStatus] = useState(null);
    const [publicUptime, setPublicUptime] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [lastUpdated, setLastUpdated] = useState('');

    async function loadStatus() {
        setError('');

        try {
            const token = localStorage.getItem('token');

            const [adminRes, publicRes] = await Promise.all([
                fetch('/admin/ops/deployment-status', {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                }),
                fetch('/ops/status'),
            ]);

            const publicPayload = await publicRes.json().catch(() => null);
            if (publicRes.ok) {
                setPublicStatus(publicPayload?.status ?? null);
                setPublicUptime(publicPayload?.uptime ?? null);
            }

            const payload = await adminRes.json().catch(() => null);
            if (!adminRes.ok) {
                throw new Error(payload?.error ?? 'Failed to load monitoring status.');
            }

            setStatus(payload?.status ?? null);
            setUptime(payload?.uptime ?? null);
            setLastUpdated(new Date().toLocaleTimeString());
        } catch (err) {
            setError(err.message || 'Unable to load monitoring status.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadStatus();
        const timer = window.setInterval(loadStatus, REFRESH_MS);
        return () => window.clearInterval(timer);
    }, []);

    const tone = useMemo(() => statusTone(status?.deploy_status), [status]);

    return (
        <main style={styles.page}>
            <div style={styles.container}>
                <div style={styles.headerRow}>
                    <div>
                        <h1 style={styles.heading}>Operations Monitoring</h1>
                        <p style={styles.sub}>Live deployment observability for KingKen Global production delivery.</p>
                    </div>
                    <button style={styles.refreshButton} onClick={loadStatus} disabled={loading}>
                        {loading ? 'Refreshing…' : 'Refresh'}
                    </button>
                </div>

                {error && <p style={styles.error}>{error}</p>}

                {status && (
                    <section style={{ ...styles.hero, background: tone.bg, borderColor: tone.border, color: tone.text }}>
                        <div>
                            <div style={styles.kicker}>Current deployment</div>
                            <div style={styles.heroValue}>{formatValue(status.deploy_status)}</div>
                            <div style={styles.heroMeta}>Rollback: {formatValue(status.rollback_status)} · Release: {formatValue(status.release_tag)}</div>
                        </div>
                        <div style={styles.heroMetaBlock}>
                            <div>Last updated: {lastUpdated || '—'}</div>
                            <div>Age: {formatValue(status.age_seconds)}s</div>
                            <div>Stale: {status.stale === null ? '—' : status.stale ? 'Yes' : 'No'}</div>
                        </div>
                    </section>
                )}

                <div style={styles.grid}>
                    <MetricCard title="Deploy health">
                        <MetricRow label="Failure reason" value={status?.failure_reason} />
                        <MetricRow label="Duration" value={status?.deploy_duration_seconds ? `${status.deploy_duration_seconds}s` : null} />
                        <MetricRow label="Started" value={status?.deploy_started_at} />
                        <MetricRow label="Finished" value={status?.deploy_finished_at} />
                    </MetricCard>

                    <MetricCard title="Active version">
                        <MetricRow label="Backend image" value={status?.active_backend_image} mono />
                        <MetricRow label="Frontend image" value={status?.active_frontend_image} mono />
                        <MetricRow label="Previous backend" value={status?.prev_backend_image} mono />
                        <MetricRow label="Previous frontend" value={status?.prev_frontend_image} mono />
                    </MetricCard>

                    <MetricCard title="Deployment traceability">
                        <MetricRow label="Run ID" value={status?.run_id} />
                        <MetricRow label="Run attempt" value={status?.run_attempt} />
                        <MetricRow label="History file" value={status?.deploy_history_file} mono />
                        <MetricRow label="Rollback audit" value={status?.rollback_audit_file} mono />
                    </MetricCard>

                    <MetricCard title="Public monitor feed">
                        <MetricRow label="Public status" value={publicStatus?.deploy_status} />
                        <MetricRow label="Rollback" value={publicStatus?.rollback_status} />
                        <MetricRow label="Release tag" value={publicStatus?.release_tag} />
                        <MetricRow label="Public age" value={publicStatus?.age_seconds ? `${publicStatus.age_seconds}s` : null} />
                    </MetricCard>

                    <MetricCard title="Uptime latency states">
                        <MetricRow label="Overall uptime" value={uptime?.overall_status} />
                        <MetricRow label="Slow endpoints" value={uptime?.slow_count} />
                        <MetricRow label="Down endpoints" value={uptime?.down_count} />
                        <MetricRow label="Threshold" value={uptime?.threshold_ms ? `${uptime.threshold_ms}ms` : null} />
                        <MetricRow label="Checked at" value={uptime?.checked_at} />
                    </MetricCard>
                </div>

                <section style={styles.card}>
                    <h2 style={styles.cardTitle}>Endpoint health matrix</h2>
                    {Array.isArray(uptime?.endpoints) && uptime.endpoints.length > 0 ? (
                        <div style={styles.endpointList}>
                            {uptime.endpoints.map((endpoint) => (
                                <div key={`${endpoint.name}-${endpoint.url}`} style={styles.endpointCard}>
                                    <div style={styles.endpointHeader}>
                                        <strong>{formatValue(endpoint.name)}</strong>
                                        <span style={endpointBadge(endpoint.status)}>{formatValue(endpoint.status)}</span>
                                    </div>
                                    <div style={styles.endpointUrl}>{formatValue(endpoint.url)}</div>
                                    <div style={styles.endpointMeta}>
                                        Latency: {endpoint.latency_ms === null || endpoint.latency_ms === undefined ? 'n/a' : `${endpoint.latency_ms}ms`}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={styles.empty}>No uptime samples recorded yet.</p>
                    )}
                </section>

                <section style={styles.card}>
                    <h2 style={styles.cardTitle}>Public uptime mirror</h2>
                    <MetricRow label="Overall status" value={publicUptime?.overall_status} />
                    <MetricRow label="Slow count" value={publicUptime?.slow_count} />
                    <MetricRow label="Down count" value={publicUptime?.down_count} />
                    <MetricRow label="Failed endpoint" value={publicUptime?.failed_endpoint} />
                </section>
            </div>
        </main>
    );
}

function endpointBadge(status) {
    if (status === 'healthy') {
        return { ...styles.badge, background: '#dcfce7', color: '#166534', borderColor: '#86efac' };
    }
    if (status === 'slow') {
        return { ...styles.badge, background: '#fef3c7', color: '#92400e', borderColor: '#fcd34d' };
    }
    return { ...styles.badge, background: '#fee2e2', color: '#991b1b', borderColor: '#fca5a5' };
}

function MetricCard({ title, children }) {
    return (
        <section style={styles.card}>
            <h2 style={styles.cardTitle}>{title}</h2>
            <div style={styles.metricList}>{children}</div>
        </section>
    );
}

function MetricRow({ label, value, mono = false }) {
    return (
        <div style={styles.metricRow}>
            <span style={styles.metricLabel}>{label}</span>
            <span style={mono ? styles.metricValueMono : styles.metricValue}>{formatValue(value)}</span>
        </div>
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
        maxWidth: 1200,
        margin: '0 auto',
        display: 'grid',
        gap: '1rem',
    },
    headerRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '1rem',
    },
    heading: { margin: 0, fontSize: '1.7rem' },
    sub: { margin: '0.35rem 0 0', color: '#64748b' },
    refreshButton: {
        border: '1px solid #1d4ed8',
        background: '#1d4ed8',
        color: '#fff',
        borderRadius: 8,
        padding: '0.6rem 0.95rem',
        fontWeight: 600,
        cursor: 'pointer',
    },
    hero: {
        border: '1px solid',
        borderRadius: 14,
        padding: '1rem 1.25rem',
        display: 'flex',
        justifyContent: 'space-between',
        gap: '1rem',
        alignItems: 'center',
    },
    kicker: {
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        fontSize: '0.75rem',
        fontWeight: 700,
    },
    heroValue: {
        fontSize: '2rem',
        fontWeight: 800,
        textTransform: 'capitalize',
    },
    heroMeta: {
        fontSize: '0.95rem',
    },
    heroMetaBlock: {
        display: 'grid',
        gap: 4,
        fontSize: '0.9rem',
        textAlign: 'right',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1rem',
    },
    card: {
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: 14,
        padding: '1rem',
        boxShadow: '0 4px 24px rgba(15, 23, 42, 0.06)',
    },
    cardTitle: {
        margin: '0 0 0.85rem',
        fontSize: '1rem',
    },
    metricList: {
        display: 'grid',
        gap: '0.75rem',
    },
    metricRow: {
        display: 'grid',
        gap: 6,
    },
    metricLabel: {
        color: '#64748b',
        fontSize: '0.82rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        fontWeight: 700,
    },
    metricValue: {
        color: '#0f172a',
        wordBreak: 'break-word',
    },
    metricValueMono: {
        color: '#0f172a',
        wordBreak: 'break-all',
        fontFamily: 'Consolas, Monaco, monospace',
        fontSize: '0.82rem',
    },
    error: {
        color: '#991b1b',
        background: '#fee2e2',
        border: '1px solid #fecaca',
        borderRadius: 10,
        padding: '0.75rem 1rem',
    },
    endpointList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '0.9rem',
    },
    endpointCard: {
        border: '1px solid #e2e8f0',
        borderRadius: 12,
        padding: '0.9rem',
        background: '#f8fafc',
        display: 'grid',
        gap: 8,
    },
    endpointHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 8,
    },
    endpointUrl: {
        fontFamily: 'Consolas, Monaco, monospace',
        fontSize: '0.8rem',
        wordBreak: 'break-all',
        color: '#334155',
    },
    endpointMeta: {
        color: '#475569',
        fontSize: '0.9rem',
    },
    badge: {
        border: '1px solid',
        borderRadius: 999,
        padding: '0.15rem 0.55rem',
        fontSize: '0.75rem',
        fontWeight: 700,
        textTransform: 'capitalize',
    },
    empty: {
        margin: 0,
        color: '#64748b',
    },
};
