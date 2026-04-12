# Database Layer

This directory contains schema definitions, database migrations, and seed data for the Kingken Global Recruitment Platform.

---

## 🎯 Purpose

The database layer manages all persistent data for the platform, including worker profiles, employer records, job listings, applications, contracts, and audit logs. It provides a structured, versioned approach to schema management through migrations and controlled seed data for development and testing environments.

---

## 🗄 Key Folders

```
database/
├── migrations/       # Versioned schema migration files (applied sequentially)
├── seeds/            # Seed data scripts for development and staging environments
├── schemas/          # Prisma schema files and entity relationship definitions
```

---

## 🛠 Tech Stack

| Technology | Role |
|---|---|
| PostgreSQL (v15+) | Primary relational database |
| Prisma ORM | Schema management, migrations, and query builder |

---

## 🗂 Core Entities

| Entity | Description |
|---|---|
| `Worker` | Skilled worker profile including personal details, skills, and documents |
| `Employer` | Verified employer profile with company details and job postings |
| `Job` | Job listing with requirements, location, salary, and contract type |
| `Application` | Application record linking a worker to a job |
| `Contract` | Employment contract details and signing status |
| `Document` | Uploaded identity and qualification documents |
| `AuditLog` | Immutable record of key platform actions for compliance |

---

## 🚀 Planned Commands

> **⚠️ Placeholder Notice:** The commands below require the Prisma schema and migration files to exist in `database/schemas/` and `database/migrations/`. These have not been created yet. They are documented here as a reference for when Prisma is added to the project.

**Planned (once Prisma is added):** Generate the Prisma client from schema:

```bash
npx prisma generate
```

**Planned (once Prisma is added):** Apply all pending migrations:

```bash
npx prisma migrate deploy
```

**Planned (once Prisma is added):** Create a new migration:

```bash
npx prisma migrate dev --name <migration-name>
```

**Planned (once Prisma is added):** Seed the database:

```bash
npx prisma db seed
```

---

## 🔗 Related Directories

- [`backend/`](../backend/README.md) — Service layer that reads and writes to the database
- [`infrastructure/`](../infrastructure/README.md) — Database provisioning and cloud configuration
