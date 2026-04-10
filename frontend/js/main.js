/* ============================================================
   Kingken Global – Main JavaScript
   Handles navigation helpers, tab switching, mobile menu,
   and prototype-flow interactions.
   ============================================================ */

'use strict';

// ── Navbar mobile toggle ────────────────────────────────────
const navToggle = document.querySelector('.navbar__toggle');
const navMenu   = document.querySelector('.navbar__nav');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const open = navMenu.style.display === 'flex';
    navMenu.style.cssText = open
      ? ''
      : 'display:flex;flex-direction:column;position:absolute;top:68px;left:0;right:0;background:#fff;padding:12px;border-bottom:1px solid #E5E7EB;z-index:99;';
  });
}

// ── Active nav link ─────────────────────────────────────────
(function markActiveLink() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__nav a, .sidebar__nav a').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === page || href.endsWith('/' + page)) {
      link.classList.add('active');
    }
  });
})();

// ── Tab switcher ────────────────────────────────────────────
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const target = this.dataset.tab;
    const container = this.closest('.tabs-container') || document;

    container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    container.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

    this.classList.add('active');
    const panel = container.querySelector(`.tab-panel[data-panel="${target}"]`);
    if (panel) panel.classList.add('active');
  });
});

// ── Form submit → show success screen ──────────────────────
document.querySelectorAll('[data-submit-to]').forEach(form => {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const dest = this.dataset.submitTo;
    if (dest) window.location.href = dest;
  });
});

// ── Smooth confirm dialog (prototype action) ────────────────
document.querySelectorAll('[data-confirm]').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const dest = this.dataset.confirm;
    if (dest) { e.preventDefault(); window.location.href = dest; }
  });
});

// ── Simple search filter for tables ────────────────────────
const tableSearch = document.querySelector('[data-table-search]');
if (tableSearch) {
  const tableId = tableSearch.dataset.tableSearch;
  const table   = document.getElementById(tableId);
  tableSearch.addEventListener('input', function () {
    const q = this.value.toLowerCase();
    if (!table) return;
    table.querySelectorAll('tbody tr').forEach(row => {
      row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });
}

// ── Notification badge dismiss ──────────────────────────────
document.querySelectorAll('.notif-dot').forEach(dot => {
  dot.closest('button')?.addEventListener('click', () => dot.remove());
});

// ── Animate stat numbers on page load ──────────────────────
function animateCount(el, target, duration) {
  const start = performance.now();
  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target.toLocaleString();
  };
  requestAnimationFrame(update);
}

document.querySelectorAll('[data-count]').forEach(el => {
  const target = parseInt(el.dataset.count, 10);
  if (!isNaN(target)) animateCount(el, target, 1200);
});

// ── Progress bars on load ───────────────────────────────────
document.querySelectorAll('.progress__bar[data-width]').forEach(bar => {
  setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 200);
});
