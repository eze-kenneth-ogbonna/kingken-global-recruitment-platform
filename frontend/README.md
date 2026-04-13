# Frontend Layer

This directory contains the web user interface for the Kingken Global Recruitment Platform, serving both workers and employers.

---

## 🎯 Purpose

The frontend layer provides a responsive, accessible, and intuitive web application that enables African workers to discover international job opportunities and employers to find, screen, and hire verified talent.

---

## 👥 Target Users

- **Workers** — Browse jobs, manage profiles, upload documents, track applications, and connect with employers
- **Employers** — Post job listings, review worker profiles, manage applications, and handle contracts
- **Administrators** — Monitor platform activity, manage user accounts, and oversee compliance

---

## 🏗 Key Folders

```
frontend/
├── src/              # Application entry point and global configuration
├── components/       # Reusable UI components (buttons, forms, modals, tables)
├── pages/            # Page-level components mapped to application routes
├── hooks/            # Custom React hooks for state and data management
├── assets/           # Static files: images, icons, fonts, and stylesheets
```

---

## 🛠 Tech Stack

| Technology | Role |
|---|---|
| React.js (v18+) | Component-based UI framework |
| Tailwind CSS | Utility-first CSS styling |
| Axios | HTTP client for API communication |
| React Router | Client-side routing |
| React Query | Server state management and caching |

---

## 🚀 Getting Started

See [`docs/SETUP_GUIDE.md`](../docs/SETUP_GUIDE.md) for full environment setup instructions.

```bash
cd frontend
npm install
npm run dev
```

---

## 🔗 Related Directories

- [`api/`](../api/README.md) — API endpoints consumed by the frontend
- [`backend/`](../backend/README.md) — Backend service layer
