import { useState } from 'react';
import UploadDocuments from './pages/UploadDocuments.jsx';
import AdminDocuments from './pages/AdminDocuments.jsx';
import MonitoringPage from './pages/MonitoringPage.jsx';

/** SVG recreation of the KingKen crown-globe-orbit mark */
function KingKenLogoMark({ size = 48 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            {/* Globe */}
            <circle cx="50" cy="55" r="30" fill="#1a2e5a" stroke="#c9a84c" strokeWidth="1.5" />
            {/* Latitude lines */}
            <ellipse cx="50" cy="55" rx="30" ry="10" fill="none" stroke="#c9a84c" strokeWidth="1" opacity="0.6" />
            <ellipse cx="50" cy="55" rx="30" ry="20" fill="none" stroke="#c9a84c" strokeWidth="1" opacity="0.4" />
            {/* Longitude line */}
            <line x1="50" y1="25" x2="50" y2="85" stroke="#c9a84c" strokeWidth="1" opacity="0.6" />
            {/* Orbit ring (ellipse around globe) */}
            <ellipse cx="50" cy="60" rx="40" ry="14" fill="none" stroke="#c9a84c" strokeWidth="2.2" transform="rotate(-20 50 60)" />
            {/* Arrow tip on orbit */}
            <polygon points="82,46 76,42 76,50" fill="#c9a84c" />
            {/* Crown — 5 points */}
            <polyline
                points="30,32 35,20 42,30 50,15 58,30 65,20 70,32"
                fill="none" stroke="#c9a84c" strokeWidth="2.5"
                strokeLinejoin="round" strokeLinecap="round"
            />
            <line x1="30" y1="32" x2="70" y2="32" stroke="#c9a84c" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
    );
}

export default function App() {
    const [view, setView] = useState('worker');

    return (
        <div style={styles.root}>
            {/* ── Brand Header ── */}
            <header style={styles.header}>
                <div style={styles.brand}>
                    <KingKenLogoMark size={52} />
                    <div style={styles.brandText}>
                        <span style={styles.brandName}>KINGKEN GLOBAL</span>
                        <span style={styles.brandSub}>TRAVEL AGENCY LTD.</span>
                    </div>
                </div>

                {/* ── Navigation ── */}
                <nav style={styles.nav} role="navigation" aria-label="Main navigation">
                    <button
                        style={view === 'worker' ? styles.activeButton : styles.button}
                        onClick={() => setView('worker')}
                    >
                        Document Upload
                    </button>
                    <button
                        style={view === 'admin' ? styles.activeButton : styles.button}
                        onClick={() => setView('admin')}
                    >
                        Admin Review
                    </button>
                    <button
                        style={view === 'monitoring' ? styles.activeButton : styles.button}
                        onClick={() => setView('monitoring')}
                    >
                        Monitoring
                    </button>
                </nav>
            </header>

            {/* ── Gold divider ── */}
            <div style={styles.divider} />

            {/* ── Page content ── */}
            <main style={styles.main}>
                {view === 'worker' ? <UploadDocuments /> : view === 'admin' ? <AdminDocuments /> : <MonitoringPage />}
            </main>

            {/* ── Footer ── */}
            <footer style={styles.footer}>
                <span>© {new Date().getFullYear()} KingKen Global Travel Agency Ltd. · RC 8382972</span>
                <span style={styles.footerDot}>·</span>
                <a href="mailto:info@kingkenglobal.com.ng" style={styles.footerLink}>info@kingkenglobal.com.ng</a>
                <span style={styles.footerDot}>·</span>
                <span>www.kingkenglobal.com.ng</span>
            </footer>
        </div>
    );
}

const NAVY = '#12213a';
const NAVY2 = '#1a2e5a';
const GOLD = '#c9a84c';
const GOLD2 = '#e0c070';
const WHITE = '#ffffff';
const OFFWHITE = '#f0f4ff';

const styles = {
    root: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: OFFWHITE,
        fontFamily: "'Segoe UI', Arial, sans-serif",
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.75rem 2rem',
        background: NAVY,
        boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
    },
    brand: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
    },
    brandText: {
        display: 'flex',
        flexDirection: 'column',
        lineHeight: 1.15,
    },
    brandName: {
        color: WHITE,
        fontSize: '1.3rem',
        fontWeight: 800,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
    },
    brandSub: {
        color: GOLD,
        fontSize: '0.62rem',
        fontWeight: 600,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
    },
    nav: {
        display: 'flex',
        gap: '0.6rem',
    },
    divider: {
        height: 3,
        background: `linear-gradient(90deg, ${GOLD}, ${GOLD2}, ${GOLD})`,
    },
    main: {
        flex: 1,
        padding: '2rem',
    },
    button: {
        border: `1px solid ${GOLD}44`,
        background: `${NAVY2}`,
        color: OFFWHITE,
        borderRadius: 6,
        padding: '0.45rem 1rem',
        cursor: 'pointer',
        fontSize: '0.85rem',
        fontWeight: 500,
        letterSpacing: '0.04em',
        transition: 'border-color 0.15s',
    },
    activeButton: {
        border: `1.5px solid ${GOLD}`,
        background: GOLD,
        color: NAVY,
        borderRadius: 6,
        padding: '0.45rem 1rem',
        cursor: 'pointer',
        fontSize: '0.85rem',
        fontWeight: 700,
        letterSpacing: '0.04em',
    },
    footer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '0.4rem',
        padding: '0.85rem 2rem',
        background: NAVY,
        color: `${GOLD}cc`,
        fontSize: '0.72rem',
        letterSpacing: '0.04em',
    },
    footerDot: {
        color: `${GOLD}66`,
    },
    footerLink: {
        color: GOLD2,
        textDecoration: 'none',
    },
};
