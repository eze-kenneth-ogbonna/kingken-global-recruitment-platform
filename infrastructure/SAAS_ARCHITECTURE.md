# SaaS Architecture — Kingken Global Recruitment Platform

**Document Type:** System Architecture Reference
**Scope:** Full platform architecture across all 3 phases
**Company:** Kingken Global Travel Agency Ltd.

---

## Overview

Kingken Global's recruitment platform is architected in three progressive phases:

- **Phase 1 (Current — 2026):** No-code / low-code SaaS stack using Google Sheets as the operational database, Zapier for automation, and WATI for WhatsApp communication
- **Phase 2 (Planned — Q3 2026):** Dedicated web platform with a custom backend API, PostgreSQL database, and employer/worker portals
- **Phase 3 (2027+):** Global-scale microservices architecture with mobile apps and region-specific compliance modules

---

## Phase 1 Architecture — Current System

### System Layers

```
┌─────────────────────────────────────────────────────────────────┐
│                     LAYER 1: DATA COLLECTION                     │
│  Google Forms (Worker Application + Employer Request)            │
│  WhatsApp Bot (WATI — Worker Bot + Employer Bot)                 │
│  Direct WhatsApp (human intake by team members)                  │
└───────────────────────────┬─────────────────────────────────────┘
                            │ Form submissions / Bot completions
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                     LAYER 2: DATA STORAGE                        │
│  Google Sheets Workbook — "Kingken Global CRM"                   │
│  ├── Master Data (candidates)                                    │
│  ├── Employers Database                                          │
│  ├── Job Requests                                                │
│  ├── Recruitment Pipeline                                        │
│  ├── Deals & Revenue                                             │
│  ├── Tasks                                                       │
│  └── Dashboard                                                   │
└───────────────────────────┬─────────────────────────────────────┘
                            │ Read/write via Apps Script & Zapier
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                     LAYER 3: AUTOMATION                          │
│  Google Apps Script (triggered scripts)                          │
│  ├── migrate-form-to-master.gs                                   │
│  ├── normalize-phones.gs                                         │
│  ├── deduplicate-candidates.gs                                   │
│  ├── audit-log-on-edit.gs                                        │
│  ├── ai-scoring-trigger.gs                                       │
│  └── dashboard-refresh.gs                                        │
│                                                                  │
│  Zapier (6 automated workflows)                                  │
│  ├── Zap-01: Form → Master Data                                  │
│  ├── Zap-02: Auto-reply to worker                                │
│  ├── Zap-03: AI scoring                                          │
│  ├── Zap-04: Team notification                                   │
│  ├── Zap-05: Task creation                                       │
│  └── Zap-06: Employer CRM                                        │
└───────────────────────────┬─────────────────────────────────────┘
                            │ Prompts, scoring, matching
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                     LAYER 4: AI ENGINE                           │
│  OpenAI GPT-4o (via API)                                         │
│  ├── Candidate scoring (0–100 score)                             │
│  ├── Job-to-candidate matching                                   │
│  └── Automated shortlist generation                              │
└───────────────────────────┬─────────────────────────────────────┘
                            │ Notifications and alerts
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                   LAYER 5: COMMUNICATION                         │
│  WATI WhatsApp API                                               │
│  ├── Worker Registration Bot                                     │
│  ├── Employer Registration Bot                                   │
│  ├── FAQ Bot                                                     │
│  ├── Outbound templates (9 approved templates)                   │
│  └── Human handoff to team agents                                │
└───────────────────────────┬─────────────────────────────────────┘
                            │ KPI dashboards and reports
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                     LAYER 6: REPORTING                           │
│  Google Sheets Dashboard tab (live formulas)                     │
│  Daily WhatsApp report (sent by Apps Script trigger)             │
│  Google Data Studio (optional — Phase 1.5)                       │
└─────────────────────────────────────────────────────────────────┘
```

---

### Phase 1 Component Inventory

| Component | Tool | Version / Plan | Role |
|-----------|------|---------------|------|
| Worker intake form | Google Forms | Free | Candidate data collection |
| Employer intake form | Google Forms | Free | Employer data collection |
| Operational database | Google Sheets | Workspace $6/user/mo | All CRM, pipeline, deals, tasks |
| Automation engine | Zapier | Professional ($49/mo) | 6 Zaps connecting all tools |
| Script engine | Google Apps Script | Free (included with Sheets) | Custom triggers and logic |
| AI scoring | OpenAI GPT-4o | Pay-as-you-go (~$30/mo) | Candidate scoring and matching |
| WhatsApp bots | WATI | Growth ($49/mo) | Candidate and employer bots, notifications |
| Website | Wix Business | $23/mo | Public-facing platform |
| Version control | GitHub | Free | Code, scripts, documentation |
| File storage | Google Drive | Included with Workspace | CV and document storage |

---

### Phase 1 Data Flow — Candidate Registration

```
[Worker] → Google Form or WhatsApp Bot
              │
              ▼
[Google Sheets Form Responses]
              │
              ▼ (Apps Script: migrate-form-to-master.gs)
[Master Data Sheet]
  ├── CandidateID generated (KENG-YYYYMMDD-NNNN)
  ├── Phone normalized (normalize-phones.gs)
  └── Duplicate check (deduplicate-candidates.gs)
              │
              ▼ (Zapier Zap-03: AI Scoring)
[OpenAI GPT-4o] → AI Score (0–100) → Written to Master Data Column L
              │
              ▼ (Zapier Zap-02: Auto-reply)
[WATI] → Sends worker_acknowledgment WhatsApp template to candidate
              │
              ▼ (Zapier Zap-04: Team Notify)
[WATI] → Notifies COO / Head of Recruitment of new candidate
```

---

### Phase 1 Data Flow — Employer Hiring Request

```
[Employer] → Google Form or WhatsApp Bot
              │
              ▼ (Zapier Zap-06)
[Employers Database] ← New row with Status = Lead
[Job Requests Sheet] ← New row with Status = Open
              │
              ▼ (Zapier Zap-06: COO Alert)
[WATI] → Sends employer_welcome template to employer
[WATI] → Sends 🚨 NEW EMPLOYER LEAD alert to COO
              │
              ▼ (Zapier Zap-05: Task Creation)
[Tasks Sheet] ← New task: "Contact employer within 24h — High priority"
```

---

## Phase 2 Architecture — Custom Platform (Planned Q3 2026)

### Overview

Phase 2 replaces Google Sheets with a dedicated web application — a React/Next.js frontend with a Node.js REST API and PostgreSQL database, hosted on AWS.

```
┌──────────────┐    ┌──────────────┐    ┌────────────────────┐
│ Worker Portal │    │ Employer     │    │ Admin Dashboard    │
│ (React/Next) │    │ Portal       │    │ (Internal use)     │
│              │    │ (React/Next) │    │ COO / Recruiters   │
└──────┬───────┘    └──────┬───────┘    └────────┬───────────┘
       │                   │                     │
       └───────────────────┼─────────────────────┘
                           │ HTTPS REST API
                           ▼
              ┌────────────────────────┐
              │   Node.js / Express    │
              │   REST API             │
              │   JWT Authentication   │
              │   Role-based access    │
              └────────────┬───────────┘
                           │
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
     ┌──────────┐   ┌──────────┐   ┌──────────────┐
     │PostgreSQL│   │  AWS S3  │   │ OpenAI SDK   │
     │ (AWS RDS)│   │ (CVs,    │   │ (Direct API  │
     │ Primary  │   │ Docs)    │   │  calls)      │
     │ Database │   └──────────┘   └──────────────┘
     └──────────┘
           │
     ┌─────▼──────┐
     │  Redis     │
     │  (Cache +  │
     │   Sessions)│
     └────────────┘
```

### Phase 2 Additional Components

| Component | Tool | Purpose |
|-----------|------|---------|
| Frontend framework | React.js + Next.js | Worker & Employer portals, SSR |
| UI Library | TailwindCSS + shadcn/ui | Design system |
| Backend API | Node.js + Express.js | REST API |
| Database | PostgreSQL on AWS RDS | Primary production database |
| ORM | Prisma | Database schema and migrations |
| Cache | Redis | Session management, rate limiting |
| File storage | AWS S3 | CV uploads, documents, photos |
| Authentication | Auth0 | SSO, JWT, RBAC |
| Email | SendGrid | Transactional emails, invoices |
| Payments | Stripe + Flutterwave | Service fee billing |
| Hosting | AWS EC2 / ECS | Backend API |
| CDN | Cloudflare | Global delivery, DDoS protection |
| Monitoring | Datadog + Sentry | Observability, error tracking |
| CI/CD | GitHub Actions | Automated build and deployment |
| Containers | Docker | Consistent environments |

---

## Phase 3 Architecture — Global Scale (2027+)

### Overview

Phase 3 evolves Phase 2 into a microservices architecture with mobile apps and multi-region compliance.

### Core Microservices

| Service | Responsibility |
|---------|---------------|
| `candidate-service` | All candidate CRUD, AI scoring, status management |
| `employer-service` | Employer CRM, job requests, deal tracking |
| `matching-service` | AI-powered candidate-to-job matching engine |
| `notification-service` | WhatsApp, email, push notifications |
| `billing-service` | Invoicing, payments, revenue tracking |
| `compliance-service` | Country-specific legal and document requirements |
| `analytics-service` | Business intelligence, reporting, forecasting |
| `auth-service` | Authentication, authorization, RBAC |

### Additional Phase 3 Components

| Component | Tool |
|-----------|------|
| Mobile app | React Native (iOS + Android) |
| Service mesh | Kubernetes + Docker |
| ML/AI engine | Custom fine-tuned model + scikit-learn |
| Search | Elasticsearch |
| Message queue | AWS SQS / RabbitMQ |
| Analytics | Mixpanel + Google Analytics 4 |
| Compliance | GDPR module, NDPR module, Kuwait Labor Law module |
| Multi-currency | Stripe + Flutterwave + regional gateways |

---

## Security Architecture (All Phases)

See `SECURITY_CONTROLS.md` for full security documentation.

### Phase 1 Security Summary

| Control | Implementation |
|---------|---------------|
| Access control | Google Workspace roles (Owner / Editor / Commenter / Viewer) |
| API key storage | Google Apps Script Properties (not in code) |
| Data encryption | Google's encryption at rest and in transit |
| Audit logging | `audit-log-on-edit.gs` tracks all changes to sensitive fields |
| PII handling | No PII shared publicly; restricted sheet access |
| Environment secrets | `.env` file (never committed — see `.gitignore`) |

---

## Scalability Limits and Migration Triggers

| Metric | Phase 1 Limit | Migration Trigger to Phase 2 |
|--------|--------------|------------------------------|
| Candidates in Master Data | ~50,000 rows (Sheets limit) | > 20,000 active rows or performance degradation |
| Concurrent users | 10–20 simultaneous editors | > 20 team members or portal needed |
| Zap tasks per month | 2,000 (Professional plan) | > 1,500 tasks/month consistently |
| API calls to OpenAI | Pay-as-you-go (no hard limit) | Cost exceeds $200/month |
| Monthly revenue | Any | When business can support $800+/mo infrastructure cost |

---

*Maintained by: Head of Tech | Contact: info@kingkenglobal.com.ng | https://www.kingkenglobal.com.ng*
