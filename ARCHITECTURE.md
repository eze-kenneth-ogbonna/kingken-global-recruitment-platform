# Kingken Global Platform — System Architecture

**Version:** 1.0.0  
**Company:** Kingken Global Travel Agency Ltd  
**Last Updated:** 2026

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [System Layers](#2-system-layers)
3. [Component Descriptions](#3-component-descriptions)
4. [Data Flow Diagram](#4-data-flow-diagram)
5. [Integration Points](#5-integration-points)
6. [Security Architecture](#6-security-architecture)
7. [Scalability Notes](#7-scalability-notes)
8. [Tech Stack Per Phase](#8-tech-stack-per-phase)

---

## 1. Architecture Overview

The Kingken Global platform is a **no-code SaaS recruitment system** (Phase 1 / MVP) that connects African job seekers with verified international employers through a fully automated pipeline using Google Forms, Google Sheets, Zapier, OpenAI, and WhatsApp.

The architecture follows a **6-layer model**:

```
Layer 1: DATA COLLECTION     → Google Forms, WhatsApp Bot, Website
Layer 2: STORAGE / CRM       → Google Sheets (7-tab CRM)
Layer 3: AUTOMATION          → Zapier (6 workflows)
Layer 4: AI ENGINE           → OpenAI GPT-4o (scoring + matching)
Layer 5: COMMUNICATION       → WhatsApp API (WATI), Email (Gmail)
Layer 6: REPORTING           → Google Sheets Dashboard, Daily Reports
```

---

## 2. System Layers

### Layer 1 — Data Collection

Captures all inbound leads and applications.

| Source | Tool | Data Captured |
|--------|------|--------------|
| Worker Application | Google Form (Worker) | Name, Phone, Country, Position, Experience, Passport, CV |
| Employer Request | Google Form (Employer) | Company, Contact, Country, Job Title, Number Needed, Budget |
| WhatsApp Bot | WATI (Worker flow) | Same as worker form via conversational intake |
| WhatsApp Bot | WATI (Employer flow) | Same as employer form via conversational intake |
| Website Contact | Wix/Webflow embedded form | Routes to Google Form |

### Layer 2 — Storage / CRM (Google Sheets)

Central data repository and CRM system.

| Sheet Tab | Purpose |
|-----------|---------|
| **Master Data** | All candidate profiles (ATS) |
| **Employers** | All employer records and contacts |
| **Job Requests** | Open job orders from employers |
| **Pipeline** | Candidate-to-job matching tracker |
| **Deals & Revenue** | Financial tracking and deal closure |
| **Tasks** | Team tasks and follow-up actions |
| **Dashboard** | Live KPIs, charts, and metrics |

### Layer 3 — Automation (Zapier)

Connects all systems with automated workflows.

| Zap | Trigger | Action |
|-----|---------|--------|
| Zap 01 | New Form Response | Create row in Master Data |
| Zap 02 | New Form Response | Send auto-reply to worker |
| Zap 03 | New Row in Master Data | Send to OpenAI, write AI score back |
| Zap 04 | New Row in Master Data | Notify team (WhatsApp/Email) |
| Zap 05 | New Row in Master Data | Create task in Trello/Notion |
| Zap 06 | New Employer Form Response | Add to Employers sheet + alert COO |

### Layer 4 — AI Engine (OpenAI GPT-4o)

Automated candidate screening and scoring.

- **Input:** Candidate profile (name, position, experience, country, passport status)
- **Processing:** GPT-4o evaluates against job criteria
- **Output:** JSON with `score` (0–100), `strengths`, `weaknesses`, `recommendation`, `summary`
- **Outcome:** Score and summary written back to Master Data sheet row

### Layer 5 — Communication (WhatsApp + Email)

Multi-channel messaging for all stakeholders.

| Channel | Tool | Recipients | Purpose |
|---------|------|-----------|---------|
| WhatsApp Bot | WATI | Workers, Employers | Intake, FAQ, status updates |
| WhatsApp Notification | WATI | COO, Recruiters | New lead alerts |
| Email Auto-reply | Gmail via Zapier | Workers | Confirmation & next steps |
| Email Alert | Gmail via Zapier | Admin | New employer lead |

### Layer 6 — Reporting (Dashboard + Daily Reports)

Visibility and accountability across all operations.

- **Live Dashboard:** Google Sheets formulas showing real-time KPIs
- **Daily Reports:** Team members submit structured daily reports to COO
- **KPIs Tracked:** Total candidates, approvals, deployed, revenue, pipeline stages

---

## 3. Component Descriptions

### Google Forms
- **Worker Form:** 7-field form capturing candidate intake
- **Employer Form:** 6-field form capturing employer job requests
- Responses automatically flow to corresponding sheets via Zapier
- Forms are embedded on the Kingken Global website

### Google Sheets CRM
- Central data warehouse and CRM system
- 7 interconnected sheets/tabs
- Cross-sheet formulas for pipeline tracking
- Dashboard tab with live KPI cards and charts
- Google Apps Script for automation, migration, and data quality

### Zapier
- Middleware connecting all systems
- 6 active Zaps handling all critical workflows
- Webhooks used for real-time triggers
- Formatter actions for data normalization
- Filter actions to prevent duplicates

### OpenAI GPT-4o
- Accessed via Zapier's OpenAI integration
- Custom prompt templates designed for recruitment scoring
- Returns structured JSON for consistent data writing
- Fallback handling for API errors

### WhatsApp Business API (WATI)
- Business phone number: +96569048174
- Employer conversation flow (12 steps)
- Worker conversation flow (10 steps)
- FAQ auto-responses (15+ responses)
- Keyword-triggered responses
- Human handoff triggers

### Website (Wix/Webflow)
- Public-facing landing page
- Embedded Google Forms for applications
- WhatsApp chat widget
- SEO-optimized for recruitment keywords

---

## 4. Data Flow Diagram

### Candidate Flow

```
Worker submits Google Form
         │
         ▼
Zapier Trigger (Form Responses 1)
         │
         ├──► Create row in Master Data (Zap 01)
         │         │
         │         ▼
         │    OpenAI GPT-4o scores candidate (Zap 03)
         │         │
         │         ▼
         │    AI Score + Summary written back to Master Data
         │
         ├──► Auto-reply WhatsApp/Email to worker (Zap 02)
         │
         ├──► Notify COO/Recruiter (Zap 04)
         │
         └──► Create Trello/Notion task for HR (Zap 05)

HR Recruiter reviews Master Data
         │
         ▼
Candidate status updated: New → Screened → Approved/Rejected
         │
         ▼ (if Approved)
Pipeline row created: CandidateID ↔ JobRequestID
         │
         ▼
Profile sent to Employer
         │
         ▼
Deal created in Deals sheet
         │
         ▼
Payment tracked → Status: Paid
         │
         ▼
Worker deployed → Status: Deployed
```

### Employer Flow

```
Employer submits Google Form OR via WhatsApp Bot
         │
         ▼
Zapier Trigger (Employer Form Responses)
         │
         ├──► Create row in Employers sheet (Zap 06)
         │
         ├──► Create row in Job Requests sheet
         │
         └──► Alert COO via WhatsApp/Email

COO reviews Employer record
         │
         ▼
Employer status: Lead → Active
         │
         ▼
Job Request matched to approved candidates
         │
         ▼
Pipeline stage: Matching → Submitted to Employer
         │
         ▼
Employer selects candidates → Interview arranged
         │
         ▼
Deal created and tracked in Deals sheet
```

---

## 5. Integration Points

| System A | System B | Method | Data Transferred |
|----------|----------|--------|-----------------|
| Google Form | Google Sheets | Zapier (Webhook) | All form field responses |
| Google Sheets | OpenAI | Zapier (API Action) | Candidate profile JSON |
| OpenAI | Google Sheets | Zapier (Update Row) | AI score, strengths, summary |
| Google Form | WhatsApp (WATI) | Zapier (WATI Action) | Auto-reply message |
| Google Sheets | WhatsApp (WATI) | Zapier (WATI Action) | Team notification |
| Google Sheets | Trello/Notion | Zapier (Create Card) | Task details |
| Google Apps Script | Google Sheets | Native (Apps Script) | Data migration, formatting |
| OpenAI | Google Apps Script | UrlFetchApp | AI scoring via REST API |

---

## 6. Security Architecture

### Access Control
- Google Sheets: Shared only with team members (view/edit roles per user)
- Zapier: Account shared only with Tech Lead; Zap editing restricted
- OpenAI API Key: Stored in `.env` file; never committed to repo
- WATI API Key: Stored in `.env` file; accessed only via Zapier

### Data Protection
- **Candidate PII** (name, phone, passport): Access restricted to recruiters and above
- **Employer data** (company, contacts): COO and CEO only
- **Financial data** (deals, revenue): CEO and COO only
- Google Sheets protected ranges on sensitive columns (Status, AI_Score, Passport)

### API Key Management
- All secrets stored in `.env` (excluded from git via `.gitignore`)
- `.env.example` contains all variable names with placeholder values
- API keys rotated quarterly or on suspected compromise
- No secrets in Google Apps Script code — stored in Script Properties

### Compliance Notes
- **GDPR:** Candidate consent collected at form submission; data deletion process documented
- **NDPR (Nigeria):** Data stored on Google servers; privacy notice provided
- **Kuwait Labor Law:** Employer verification process before data sharing

---

## 7. Scalability Notes

### Phase 1 → Phase 2 Migration Path

| Concern | MVP (Phase 1) | Full Platform (Phase 2) |
|---------|--------------|------------------------|
| Database | Google Sheets | PostgreSQL on AWS RDS |
| Auth | Google Account | Auth0 / Supabase |
| API | Google Apps Script | Node.js REST API |
| Automation | Zapier | Custom webhooks + cron |
| AI | OpenAI via Zapier | Direct OpenAI SDK |
| Hosting | Google + Wix | AWS/GCP + React.js |
| Capacity | ~5,000 rows | Unlimited |
| Cost | ~$200/month | ~$800/month |

### Bottlenecks Identified
1. **Google Sheets row limit** (10M cells): Addressed in Phase 2 with PostgreSQL
2. **Zapier task limits:** Upgrade to Professional plan; offload to webhooks in Phase 2
3. **OpenAI rate limits:** Batch processing for large imports
4. **WATI message limits:** Upgrade to Business plan for scale

---

## 8. Tech Stack Per Phase

### Phase 1 — MVP
```
Data Collection:  Google Forms
CRM / Database:   Google Sheets
Automation:       Zapier
AI:               OpenAI GPT-4o
Messaging:        WATI (WhatsApp Business API)
Website:          Wix / Webflow
App:              Glide / Softr (no-code)
Scripts:          Google Apps Script
```

### Phase 2 — Real Platform
```
Frontend:         React.js / Next.js
Backend:          Node.js + Express.js
Database:         PostgreSQL
Cloud:            AWS (EC2, RDS, S3)
Auth:             Auth0
AI:               OpenAI SDK (direct)
Payments:         Stripe + Flutterwave
Email:            SendGrid
Monitoring:       Datadog / Sentry
```

### Phase 3 — Global Scale
```
Mobile:           React Native (iOS + Android)
Architecture:     Microservices (Docker + Kubernetes)
AI/ML:            Custom models (fine-tuned GPT + sklearn)
CDN:              Cloudflare
Search:           Elasticsearch
Queue:            RabbitMQ / SQS
Analytics:        Mixpanel + Google Analytics 4
```

---

*Architecture maintained by Kingken Global Tech Team. For questions contact: info@kingkenglobal.com.ng*
