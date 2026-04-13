# Tech Stack Reference

This document lists all planned technologies, frameworks, and services for the Kingken Global Recruitment Platform, along with version targets and rationale for each selection.

---

## 🖥 Frontend

| Technology | Version | Rationale |
|---|---|---|
| React.js | 18.x | Industry-standard component model, large ecosystem, strong hiring pool |
| Tailwind CSS | 3.x | Rapid UI development, consistent design system, no CSS bloat |
| Axios | 1.x | Reliable HTTP client with interceptor support for auth tokens |
| React Router | 6.x | Declarative client-side routing |
| React Query | 5.x | Efficient server state management with caching and background refetch |
| Vite | 5.x | Fast build tool and development server |

---

## 🔧 Backend

| Technology | Version | Rationale |
|---|---|---|
| Node.js | 18.x LTS | Long-term support, strong async performance, unified JS ecosystem |
| Express.js | 4.x | Lightweight, battle-tested REST API framework |
| TypeScript | 5.x | Type safety across the codebase, better IDE support |
| JWT (jsonwebtoken) | 9.x | Stateless, scalable authentication |
| bcrypt | 5.x | Industry-standard password hashing |
| Zod | 3.x | Runtime schema validation for API inputs |
| Helmet | 7.x | Express security headers middleware |

---

## 🗄 Database

| Technology | Version | Rationale |
|---|---|---|
| PostgreSQL | 15.x | Reliable, ACID-compliant relational database; ideal for structured recruitment data |
| Prisma ORM | 5.x | Type-safe query builder, automated migrations, schema-as-code |
| Redis | 7.x | In-memory store for session caching, job queues, and rate limiting |

---

## ⚙️ Automation & Queues

| Technology | Version | Rationale |
|---|---|---|
| BullMQ | 5.x | Redis-backed job queues with retry, scheduling, and concurrency control |
| node-cron | 3.x | Lightweight cron scheduling within Node.js |

---

## 🔌 Integrations

| Service | Purpose |
|---|---|
| SendGrid | Transactional email delivery |
| Twilio | SMS messaging and OTP verification |
| Paystack | Payment processing (African markets) |
| Flutterwave | Cross-border payment processing |
| Smile Identity | KYC and identity verification for African users |
| Onfido | International identity verification |

---

## ☁️ Infrastructure & DevOps

| Technology | Version | Rationale |
|---|---|---|
| Docker | 25.x | Container packaging for consistent environments |
| Kubernetes | 1.29+ | Container orchestration for scalable, resilient deployments |
| Terraform | 1.7+ | Infrastructure-as-code for reproducible cloud provisioning |
| GitHub Actions | N/A | CI/CD pipeline automation natively integrated with the repository |
| AWS / GCP | N/A | Cloud hosting — multi-cloud strategy for resilience |
| NGINX | 1.25+ | Reverse proxy and load balancer for container ingress |

---

## 🔒 Security

| Technology | Purpose |
|---|---|
| JWT (RS256) | Asymmetrically signed access and refresh tokens |
| bcrypt | Password hashing (min 12 rounds) |
| TLS 1.2+ | Encryption in transit for all API and web traffic |
| AES-256 | Encryption at rest for sensitive document data |
| RBAC | Role-based access control enforced at API layer |

---

## 📊 Analytics

| Technology | Purpose |
|---|---|
| PostgreSQL (read replicas) | Analytics queries without impacting production |
| Metabase | Internal dashboards for recruitment metrics |
| dbt | Data transformation pipelines |

---

_Last updated: 2026-04-10_
