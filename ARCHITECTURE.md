# Architecture Documentation

This document outlines the architecture of the Kingken Global Recruitment Platform, detailing its components, relationships, and deployment model.

---

## 🌐 Overview

The Kingken Global Recruitment Platform is an enterprise-level, multi-tier system connecting African workers with verified international employers. The platform is built on a modular, layered architecture designed for scalability, security, and maintainability.

---

## 🏗 Architecture Diagram

The following diagram illustrates the high-level flow of data and control through the platform:

```
  ┌─────────────────────────────────────────┐
  │              Users / Clients             │
  │   (Workers, Employers, Administrators)   │
  └──────────────────┬──────────────────────┘
                     │ HTTPS
                     ▼
  ┌─────────────────────────────────────────┐
  │               frontend/                  │
  │         React.js Web Application         │
  │  (pages, components, hooks, assets)      │
  └──────────────────┬──────────────────────┘
                     │ REST API calls (Axios)
                     ▼
  ┌─────────────────────────────────────────┐
  │                  api/                    │
  │         API Gateway & Route Layer        │
  │   /api/v1/auth  /jobs  /workers  etc.    │
  └──────────────────┬──────────────────────┘
                     │ Internal service calls
                     ▼
  ┌─────────────────────────────────────────┐
  │               backend/                   │
  │       Node.js / Express Service Layer    │
  │  (controllers, services, middleware,     │
  │   models, job matching engine)           │
  └──────┬─────────────────────┬────────────┘
         │                     │
         ▼                     ▼
  ┌─────────────┐     ┌────────────────────┐
  │  database/  │     │   integrations/    │
  │ PostgreSQL  │     │  SendGrid, Twilio, │
  │ + Prisma    │     │  Paystack, KYC,    │
  └─────────────┘     │  Embassy APIs      │
                      └────────────────────┘
         │
         ▼
  ┌─────────────────────────────────────────┐
  │              automation/                 │
  │   Background Jobs, Cron Tasks,           │
  │   AI Matching Queues (BullMQ + Redis)    │
  └─────────────────────────────────────────┘
```

---

## 🧩 Component Descriptions

### `frontend/` — Web Application
The user-facing web application built with React.js and Tailwind CSS. Workers use it to register, upload documents, browse jobs, and track applications. Employers use it to post jobs, review candidates, and manage contracts. Administrators access platform management tools.

See [`frontend/README.md`](./frontend/README.md) for details.

---

### `api/` — API Gateway & Route Definitions
The API layer defines all inbound HTTP routes, enforces rate limiting, validates request shapes, and routes requests to the appropriate backend service. All routes are versioned under `/api/v1/`. Future GraphQL support is planned.

See [`api/README.md`](./api/README.md) for details.

---

### `backend/` — Service Layer
The core application server built with Node.js and Express. It contains all business logic including the job matching engine, application workflows, contract processing, and event dispatch. This layer sits between the API gateway and the database.

See [`backend/README.md`](./backend/README.md) for details.

---

### `database/` — Data Layer
Manages PostgreSQL schema definitions, Prisma ORM migrations, and seed data. All persistent data — worker profiles, job listings, applications, contracts, and audit logs — is stored here.

See [`database/README.md`](./database/README.md) for details.

---

### `integrations/` — Third-Party Services
Isolated modules for each external service the platform depends on, including payment gateways, email (SendGrid), SMS (Twilio), identity verification (Smile Identity / Onfido), and embassy/government APIs.

See [`integrations/README.md`](./integrations/README.md) for details.

---

### `automation/` — Background Processing
Background jobs, cron tasks, and queue-based processing using BullMQ and Redis. Includes the AI job matching scheduler, automated email campaigns, and document processing pipelines.

See [`automation/README.md`](./automation/README.md) for details.

---

### `security/` — Security Policies
Defines and enforces authentication (JWT), role-based access control (RBAC), data encryption standards, and GDPR compliance policies. Security middleware is applied at the API gateway and backend layers.

See [`security/README.md`](./security/README.md) for details.

---

### `infrastructure/` — Cloud & DevOps
Contains Docker configurations, Kubernetes manifests, Terraform infrastructure-as-code, and GitHub Actions CI/CD workflow definitions. Manages deployment across development, staging, and production environments on AWS/GCP.

See [`infrastructure/README.md`](./infrastructure/README.md) for details.

---

### `analytics/` — Data & Reporting
Data transformation pipelines (dbt), Metabase dashboards, and scheduled reports covering recruitment metrics, match rates, regional talent pools, and employer satisfaction.

See [`analytics/README.md`](./analytics/README.md) for details.

---

## 🔌 Integration Points

The platform integrates with external services at the backend and automation layers:

| Service | Type | Purpose |
|---|---|---|
| SendGrid | Email | Transactional emails and campaigns |
| Twilio | SMS | OTP verification and alerts |
| Paystack / Flutterwave | Payment | Placement fees and employer subscriptions |
| Smile Identity / Onfido | KYC | Worker identity verification |
| Embassy APIs | Government | Visa and work permit status tracking |
| Redis | Cache / Queue | Session caching and job queue broker |

---

## 🚀 Deployment Overview

### Environments

| Environment | Purpose |
|---|---|
| Development | Local developer machines |
| Staging | Pre-production testing and QA |
| Production | Live platform serving real users |

### CI/CD Pipeline (GitHub Actions)

Every code change follows this automated pipeline:

1. **Lint & Test** — ESLint and the full test suite run on every pull request
2. **Build** — Docker images are built and tagged with the commit SHA
3. **Push** — Images are pushed to the container registry (ECR / Artifact Registry)
4. **Deploy** — Kubernetes manifests are applied to the target environment
5. **Health Check** — Automated checks confirm the deployment is healthy

### Containerization

Each platform service (`backend`, `frontend`, `api`) runs as an independent Docker container orchestrated by Kubernetes. Configuration is stored in `infrastructure/docker/` and `infrastructure/k8s/`.

See [`infrastructure/TECH_STACK.md`](./infrastructure/TECH_STACK.md) for full infrastructure details.

---

## 🔒 Security Model

### Authentication
All platform users authenticate via JWT. Short-lived access tokens (15 minutes) are paired with rotating refresh tokens (7 days). Tokens are signed with RS256 asymmetric keys.

### Role-Based Access Control (RBAC)
Four roles govern platform access:

| Role | Permissions |
|---|---|
| `worker` | Own profile, job search, applications |
| `employer` | Job postings, applicant management, contracts |
| `admin` | Full platform access, user management |
| `compliance_officer` | Read-only audit logs and compliance reports |

### Data Protection
- Passwords hashed with bcrypt (12+ rounds)
- Sensitive fields encrypted at rest (AES-256)
- All traffic encrypted in transit (TLS 1.2+)
- GDPR compliance built into data collection and retention policies

See [`security/README.md`](./security/README.md) for the full security policy.

---