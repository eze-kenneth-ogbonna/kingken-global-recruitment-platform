# Backend Service Layer

This directory contains the Node.js/Express REST API server that powers the Kingken Global Recruitment Platform.

---

## 🎯 Purpose

The backend service layer is the core of the platform, responsible for processing all business logic, managing authentication, and orchestrating the job matching engine between African workers and global employers.

---

## 🧠 Responsibilities

- **Authentication & Authorization** — JWT-based user authentication, role-based access control (RBAC) for workers, employers, and administrators
- **Business Logic** — Recruitment workflows, application processing, contract management, and approval pipelines
- **Job Matching Engine** — AI-assisted matching of worker profiles to employer job listings based on skills, location, and availability
- **API Endpoints** — RESTful API routes consumed by the frontend and exposed via the API gateway
- **Data Validation** — Input sanitization and validation before any database interaction
- **Event Handling** — Triggering integration hooks for notifications, payments, and document workflows

---

## 🏗 Key Folders

```
backend/
├── src/              # Application entry point and server bootstrap
├── controllers/      # Route handler logic (request → response)
├── services/         # Core business logic and domain services
├── middleware/       # Express middleware (auth, logging, error handling)
├── models/           # Data models and ORM schema definitions
```

---

## 🛠 Tech Stack

| Technology | Role |
|---|---|
| Node.js (v18+) | JavaScript runtime |
| Express.js | HTTP server and routing framework |
| JWT (jsonwebtoken) | Stateless authentication tokens |
| bcrypt | Secure password hashing |
| Prisma ORM | Database access and schema management |
| PostgreSQL | Relational database |

---

## 🚀 Getting Started

See [`docs/SETUP_GUIDE.md`](../docs/SETUP_GUIDE.md) for full environment setup instructions.

```bash
cd backend
npm install
npm run dev
```

---

## 🔗 Related Directories

- [`api/`](../api/README.md) — API gateway and route definitions
- [`database/`](../database/README.md) — Schema migrations and seed data
- [`security/`](../security/README.md) — Authentication and authorization policies
- [`integrations/`](../integrations/README.md) — Third-party service connections
