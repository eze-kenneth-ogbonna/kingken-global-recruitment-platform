# SaaS Architecture – Kingken Global Recruitment Platform

**Company:** Kingken Global Travel Agency Ltd  
**Document Type:** Technical Architecture  
**Version:** 1.0

---

## Overview

This document describes the three-phase SaaS architecture for scaling the Kingken Global recruitment platform from a manual Google Sheets MVP to a full multi-tenant cloud platform.

---

## Phase 1 – MVP (Months 1–6): Google Workspace + No-Code Tools

### Architecture Description

Phase 1 uses a fully no-code stack to achieve fast launch at minimal cost. All data lives in Google Sheets, automations run via Zapier, and client-facing interfaces are WhatsApp and Google Forms.

### Phase 1 ASCII Architecture Diagram

```
+------------------+     +------------------+     +------------------+
|   WORKERS        |     |   EMPLOYERS      |     |   TEAM           |
| (WhatsApp/Form)  |     | (WhatsApp/Form)  |     | (Google Sheets)  |
+--------+---------+     +--------+---------+     +--------+---------+
         |                        |                        |
         v                        v                        v
+--------+------------------------+------------------------+---------+
|                                                                    |
|                    ZAPIER AUTOMATION LAYER                         |
|  Zap 01: Form → Sheet   Zap 03: AI Scoring   Zap 05: Tasks        |
|  Zap 02: Auto-Reply     Zap 04: Notify Team  Zap 06: Employer CRM |
|                                                                    |
+-----------------------------+--------------------------------------+
                              |
                              v
+-----------------------------+--------------------------------------+
|                                                                    |
|                    GOOGLE WORKSPACE (DATA LAYER)                   |
|                                                                    |
|  +-------------+  +-------------+  +-------------+                |
|  | Master Data |  |  Employers  |  | Job Requests|                |
|  +-------------+  +-------------+  +-------------+                |
|  +-------------+  +-------------+  +-------------+                |
|  |  Pipeline   |  |    Deals    |  |    Tasks    |                |
|  +-------------+  +-------------+  +-------------+                |
|  +-------------+                                                   |
|  |  Dashboard  |                                                   |
|  +-------------+                                                   |
|                                                                    |
+--------------------------------------------------------------------+
                              |
                              v
+-----------------------------+--------------------------------------+
|                                                                    |
|                    AI LAYER (OpenAI via Zapier)                    |
|  Candidate scoring (0-10), Job matching, Auto-screening           |
|                                                                    |
+--------------------------------------------------------------------+
                              |
                              v
+-----------------------------+--------------------------------------+
|                                                                    |
|                    COMMUNICATION LAYER                             |
|  +----------+  +----------+  +----------+  +----------+           |
|  |  WATI    |  |  Gmail   |  | WhatsApp |  |  Slack   |           |
|  | (WhatsApp|  | (Emails) |  | Broadcast|  | (Team)   |           |
|  |  Bot)    |  |          |  |          |  |          |           |
|  +----------+  +----------+  +----------+  +----------+           |
|                                                                    |
+--------------------------------------------------------------------+
```

### Phase 1 Tech Stack

| Layer | Tool | Purpose |
|-------|------|---------|
| Database | Google Sheets | All data storage |
| Automation | Zapier | All workflow automations |
| AI | OpenAI (GPT-4) via Zapier | Candidate scoring |
| WhatsApp | WATI | Bot + messaging |
| Forms | Google Forms | Worker + employer intake |
| Email | Gmail | Notifications + auto-replies |
| Dashboard | Google Sheets (Dashboard tab) | KPI visibility |
| Team Comms | WhatsApp groups | Internal coordination |

### Phase 1 Monthly Cost Estimate

| Tool | Plan | Monthly Cost (USD) |
|------|------|-------------------|
| Google Workspace | Business Starter (5 users) | $30 |
| Zapier | Starter (750 tasks/month) | $20 |
| WATI | Standard | $49 |
| OpenAI | Pay-per-use (GPT-4) | ~$10–30 |
| Domain/Website | Hosting | $10 |
| **Total** | | **~$119–139/month** |

---

## Phase 2 – Growth (Months 7–18): Low-Code App Layer

### Architecture Description

Phase 2 adds a mobile/web app layer on top of the Google Sheets data using Glide (or Softr). This gives team members and candidates a proper app interface while keeping Google Sheets as the database.

### Phase 2 ASCII Architecture Diagram

```
+------------------+  +------------------+  +------------------+
| CANDIDATE APP    |  | EMPLOYER PORTAL  |  | TEAM DASHBOARD   |
| (Glide/PWA)      |  | (Softr Web App)  |  | (Glide/Internal) |
+--------+---------+  +--------+---------+  +--------+---------+
         |                     |                      |
         +---------------------+----------------------+
                               |
                               v
+------------------------------+------------------------------+
|                                                             |
|              API / INTEGRATION LAYER                        |
|  +----------+  +----------+  +----------+  +----------+    |
|  | Zapier   |  | Make.com |  | REST API |  | Webhooks |    |
|  | (No-code)|  |(No-code) |  |(Custom)  |  |(Events)  |    |
|  +----------+  +----------+  +----------+  +----------+    |
|                                                             |
+------------------------------+------------------------------+
                               |
                               v
+------------------------------+------------------------------+
|                                                             |
|              DATA LAYER (Google Sheets + Airtable)          |
|  +-------------+  +-------------+  +-------------+         |
|  | Master Data |  |  Employers  |  | Job Requests|         |
|  +-------------+  +-------------+  +-------------+         |
|  +-------------+  +-------------+  +-------------+         |
|  |  Pipeline   |  |    Deals    |  |    Tasks    |         |
|  +-------------+  +-------------+  +-------------+         |
|                                                             |
+------------------------------+------------------------------+
                               |
                               v
+------------------------------+------------------------------+
|                                                             |
|              COMMUNICATION + AI LAYER                       |
|  WATI (WhatsApp) | SendGrid (Email) | OpenAI (Scoring)     |
|                                                             |
+-------------------------------------------------------------+
```

### Phase 2 New Components

| Component | Tool | Purpose |
|-----------|------|---------|
| Candidate App | Glide Apps | Mobile app for candidates to track applications |
| Employer Portal | Softr | Web portal for employers to view candidates |
| Internal App | Glide | Team dashboard and pipeline management |
| Email Marketing | SendGrid | Bulk emails for employer outreach |
| CRM | Airtable | Enhanced CRM (replaces some Google Sheets) |

### Phase 2 Monthly Cost Estimate

| Tool | Plan | Monthly Cost (USD) |
|------|------|-------------------|
| Google Workspace | Business Standard (10 users) | $120 |
| Zapier | Professional | $49 |
| WATI | Pro | $99 |
| Glide | Pro | $99 |
| Softr | Professional | $65 |
| OpenAI | Pay-per-use | ~$30–50 |
| SendGrid | Essentials | $20 |
| Airtable | Plus | $20 |
| **Total** | | **~$502–522/month** |

---

## Phase 3 – Scale (Months 19+): Full Cloud SaaS

### Architecture Description

Phase 3 is a custom-built SaaS platform deployed on AWS. It supports multi-tenancy (multiple companies/agencies on one platform), a proper relational database, REST APIs, and a React/Next.js frontend.

### Phase 3 ASCII Architecture Diagram

```
+-----------------------------------------------------------+
|                    FRONTEND LAYER                          |
|  +------------------+  +------------------+               |
|  | Next.js Web App  |  | React Native App |               |
|  | (Employer Portal |  | (Candidate App)  |               |
|  |  + Admin Panel)  |  |                  |               |
|  +--------+---------+  +--------+---------+               |
+-----------|------------------------------|------------------+
            |                             |
            v                             v
+-----------------------------------------------------------+
|                    API GATEWAY (AWS)                       |
|  AWS API Gateway + CloudFront CDN + WAF (Security)        |
+----------------------------+------------------------------+
                             |
                             v
+----------------------------+------------------------------+
|                    BACKEND LAYER                           |
|  +--------------------+  +--------------------+           |
|  |  Node.js/Express   |  |  Python FastAPI     |           |
|  |  (Core API)        |  |  (AI/ML Services)   |           |
|  +--------------------+  +--------------------+           |
+----------------------------+------------------------------+
            |                             |
            v                             v
+----------------------------+------------------------------+
|                    DATA LAYER                              |
|  +-------------+  +-------------+  +----------------+     |
|  | PostgreSQL  |  |    Redis    |  |   S3 Storage   |     |
|  | (Primary DB)|  |  (Cache)    |  |  (Files/CVs)   |     |
|  +-------------+  +-------------+  +----------------+     |
|  +-------------+                                          |
|  | Elasticsearch|                                          |
|  | (Search)    |                                           |
|  +-------------+                                          |
+----------------------------+------------------------------+
            |
            v
+----------------------------+------------------------------+
|                    INTEGRATION LAYER                       |
|  WATI (WhatsApp) | SendGrid | OpenAI | Stripe (Payments)  |
|  Twilio (SMS)    | DocuSign | AWS SES | PandaDoc           |
+-------------------------------------------------------------+
```

### Multi-Tenancy Explanation

In Phase 3, the platform is multi-tenant, meaning multiple recruitment agencies (not just Kingken Global) can use the same platform with their own isolated data.

**Multi-Tenancy Model: Row-Level Isolation**

```
+----------------------------------+
|  tenants table                   |
|  id | name           | subdomain |
|  1  | Kingken Global | kingken   |
|  2  | ABC Recruit    | abcrec    |
|  3  | Gulf Staffing  | gulfstaff |
+----------------------------------+

+-------------------------------------------+
|  candidates table                          |
|  id | tenant_id | name     | status        |
|  1  | 1         | John Doe | New           |
|  2  | 1         | Mary Ann | Approved      |
|  3  | 2         | Ahmed K. | Deployed      |
+-------------------------------------------+
```

- Every table has a `tenant_id` column
- All queries are automatically scoped by `tenant_id`
- Each tenant has a subdomain (e.g., kingken.platform.com)
- Data is logically isolated but physically on the same database
- Row-Level Security (RLS) in PostgreSQL enforces isolation

---

## Security Architecture

### Phase 1 Security
- Google Workspace access controls (2FA required)
- Protected ranges in Google Sheets (EmployerID, CandidateID)
- Zapier API keys stored in Zapier (not exposed to users)
- WATI API key stored in environment config

### Phase 2 Security
- App-level authentication in Glide/Softr (email + password)
- Role-based access (RBAC) per user type
- API keys managed in Zapier/Make.com vaults
- HTTPS enforced on all portals

### Phase 3 Security
- JWT-based authentication with refresh tokens
- OAuth2 / Google SSO for team login
- AWS IAM roles for service-to-service auth
- AWS WAF (Web Application Firewall) on API Gateway
- AWS KMS for encryption at rest
- TLS 1.3 for all data in transit
- VPC isolation for database layer
- Secrets managed via AWS Secrets Manager
- CloudTrail for all API audit logs
- Regular penetration testing (quarterly)

---

## Scalability Design

### Phase 1 Scalability Limits
- Google Sheets: ~10 million cells per spreadsheet
- Zapier: limited by plan task count (upgrade as needed)
- WATI: limited by WhatsApp API tier
- **Handles:** 0–500 candidates, 0–50 employers

### Phase 2 Scalability
- Airtable: 50,000 records per base (Plus plan)
- Glide/Softr: scales with plan upgrades
- **Handles:** 500–5,000 candidates, 50–200 employers

### Phase 3 Scalability (AWS)
- Auto-scaling EC2 instances behind a load balancer
- PostgreSQL with read replicas for read-heavy operations
- Redis caching to reduce database load
- S3 for unlimited file storage
- CloudFront CDN for global performance
- **Handles:** 5,000+ candidates, 200+ employers, multiple tenant agencies

---

## Monthly Cost Estimates per Phase

| Phase | Timeframe | Monthly Cost | Revenue Target |
|-------|-----------|-------------|----------------|
| Phase 1 (MVP) | Months 1–6 | $120–140 | $5,000–20,000 |
| Phase 2 (Growth) | Months 7–18 | $500–520 | $20,000–100,000 |
| Phase 3 (SaaS) | Months 19+ | $2,000–5,000 | $100,000+ |

*Phase 3 AWS costs depend on usage and scale.*

### Phase 3 AWS Cost Breakdown (Estimated)

| AWS Service | Usage | Monthly Cost |
|-------------|-------|-------------|
| EC2 (2x t3.medium) | Application servers | $60 |
| RDS PostgreSQL (db.t3.medium) | Database | $80 |
| ElastiCache Redis | Caching | $30 |
| S3 (500 GB) | File storage | $12 |
| CloudFront | CDN | $20 |
| API Gateway | 5M requests | $18 |
| SES (SendGrid) | 100K emails | $10 |
| Route 53 | DNS | $5 |
| CloudWatch | Monitoring | $10 |
| WAF | Security | $25 |
| **Total AWS** | | **~$270/month** |

*Plus: OpenAI ($50), WATI ($99), other SaaS tools (~$100) = ~$520/month total at Phase 3 baseline.*
