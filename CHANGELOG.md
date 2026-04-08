# Changelog

All notable changes to the Kingken Global Recruitment Platform are documented here.

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) and the [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format.

---

## [1.0.0] — 2026-04-01 — Initial MVP Release

### 🎉 Initial Release

The first production-ready MVP of the Kingken Global Recruitment Platform. This release establishes the full no-code SaaS infrastructure for international recruitment operations connecting African workers with employers in Kuwait, UAE, Qatar, and globally.

---

### Added

#### Platform Foundation
- Full repository structure with 60+ professional documentation files
- Complete `README.md` with architecture overview, tech stack, and roadmap
- `ARCHITECTURE.md` with 6-layer system architecture and data flow diagrams
- `DEVELOPMENT.md` with step-by-step setup for all platform components
- `SECURITY.md` with security policy, data protection, and access control
- `CONTRIBUTING.md` with branch naming, PR process, and code standards
- `CODE_OF_CONDUCT.md` for team and community standards
- `.env.example` with all required environment variables documented

#### Google Sheets CRM
- 7-tab CRM system: Master Data, Employers, Job Requests, Pipeline, Deals, Tasks, Dashboard
- Complete column schemas for all 7 sheets (`platform/google-sheets/`)
- Dashboard with 14 live KPI formulas (candidates, revenue, pipeline, conversion rate)
- Conditional formatting rules (Red = Rejected, Yellow = Screening, Green = Approved/Deployed)
- Data validation dropdowns for Status, Priority, PaymentStatus fields

#### Google Forms
- Complete field specification for Worker Application Form (7 required fields + 3 optional)
- Complete field specification for Employer Request Form (6 required fields + 4 optional)
- Form embedding guide for website integration

#### Google Apps Scripts (6 scripts)
- `migrate-form-to-master.gs` — Migrate Form Responses → Master Data with duplicate detection
- `normalize-phones.gs` — Phone normalization with 15+ country dial codes
- `deduplicate-candidates.gs` — Detect and flag duplicate candidates by phone+name
- `audit-log-on-edit.gs` — onEdit trigger: full audit trail to Audit Log sheet
- `ai-scoring-trigger.gs` — Send candidate data to OpenAI, write score back to sheet
- `dashboard-refresh.gs` — Force-refresh all dashboard formulas and charts

#### Zapier Automations (6 Zaps)
- Zap 01: Google Form → Master Data row creation
- Zap 02: New form response → Auto-reply to worker (WhatsApp/Email)
- Zap 03: New candidate → OpenAI scoring → Score written back to Master Data
- Zap 04: New lead → Team notification (WhatsApp/Telegram/Email)
- Zap 05: New candidate → Task creation in Trello/Notion
- Zap 06: Employer form → Employers sheet + COO alert

#### AI System
- Candidate screening prompt (returns JSON: score, strengths, weaknesses, recommendation, summary)
- Employer-candidate matching prompt
- Auto-reply message generator prompt
- Interview question generator prompt
- Job description generator prompt
- AI scoring thresholds: Score ≥80 = Auto-approve, 60–79 = Manual review, <60 = Low priority

#### WhatsApp Bot (WATI)
- Employer bot conversation flow (12-step decision tree with branching)
- Worker bot conversation flow (10-step decision tree with branching)
- 15+ FAQ auto-responses
- Human handoff trigger conditions
- WATI setup guide with step-by-step instructions
- Zapier integration for bot → CRM

#### Documentation Suite
- `docs/SETUP_GUIDE.md` — Complete 10-section platform setup guide
- `docs/GOOGLE_SHEETS_STRUCTURE.md` — All 7 sheets fully documented
- `docs/AUTOMATION_GUIDE.md` — All 6 Zapier automations documented
- `docs/AI_SYSTEM_GUIDE.md` — AI screening, scoring, and matching system
- `docs/CRM_GUIDE.md` — CRM architecture, pipelines, lifecycle stages
- `docs/WHATSAPP_BOT_GUIDE.md` — Complete bot guide with scripts
- `docs/WEBSITE_GUIDE.md` — Website build guide (Wix/WordPress/Webflow)
- `docs/SALES_FUNNEL_GUIDE.md` — 5-stage funnel, Facebook Ads, retargeting
- `docs/ROLES_AND_STRUCTURE.md` — Org chart and all role definitions
- `docs/DAILY_REPORTING_SYSTEM.md` — Daily report templates and submission rules
- `docs/MVP_LAUNCH_PLAN.md` — 14-day MVP launch roadmap
- `docs/WIREFRAME_GUIDE.md` — Figma wireframe guide and screen specs
- `docs/API_REFERENCE.md` — Future API endpoint reference

#### Infrastructure
- `infrastructure/TECH_STACK.md` — Full tech stack for Phase 1, 2, and 3
- `infrastructure/SAAS_ARCHITECTURE.md` — SaaS cloud architecture design
- `infrastructure/SECURITY_CONTROLS.md` — Security controls, GDPR/NDPR notes
- `infrastructure/DEPLOYMENT_GUIDE.md` — Deployment guide for future app

#### Operations
- `ops/ROLLOUT_CHECKLIST.md` — Complete 3-phase go-live checklist
- `ops/TESTING_GUIDE.md` — Testing guide for all system components
- `ops/INCIDENT_RESPONSE.md` — Incident response runbook
- `ops/MONITORING_GUIDE.md` — KPIs to monitor and alerting setup

#### GitHub Configuration
- CI workflow (`.github/workflows/ci.yml`) — Markdown lint + secret validation
- Deploy workflow stub (`.github/workflows/deploy.yml`)
- PR template (`.github/PULL_REQUEST_TEMPLATE.md`)
- Issue templates: bug report, feature request, candidate data issue

---

### Technical Details

| Component | Version / Tool |
|-----------|---------------|
| CRM | Google Sheets |
| Automation | Zapier Professional |
| AI | OpenAI GPT-4o |
| WhatsApp | WATI Business |
| Scripts | Google Apps Script |
| CI | GitHub Actions |

---

## [Unreleased]

### Planned for v1.1.0
- Website integration with embedded forms live
- First 50 candidates migrated and AI-scored
- Paid advertising campaigns launched (Facebook + Google Ads)
- Daily reporting system active with all team members

### Planned for v2.0.0
- React.js frontend
- Node.js + Express backend API
- PostgreSQL database
- Auth0 authentication
- Employer and Worker portals
- Stripe/Flutterwave payment integration

---

[1.0.0]: https://github.com/eze-kenneth-ogbonna/kingken-global-recruitment-platform/releases/tag/v1.0.0
