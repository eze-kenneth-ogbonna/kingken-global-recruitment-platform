# Security Controls — Kingken Global Recruitment Platform

**Document Type:** Security Policy and Controls Reference
**Scope:** All phases of the platform; Phase 1 focus with Phase 2/3 guidance
**Company:** Kingken Global Travel Agency Ltd.

---

## Overview

This document defines the security controls in place for the Kingken Global Recruitment Platform across all three phases. The platform handles sensitive personally identifiable information (PII) for job-seeking candidates and employer clients, making robust data protection critical.

**Applicable regulations:**
- **NDPR** — Nigeria Data Protection Regulation (2019)
- **GDPR** — General Data Protection Regulation (EU, where applicable)
- **Kuwait Personal Data Protection Law** (pending enforcement)
- **WATI / Meta WhatsApp Business Policy**

---

## 1. Access Control

### Phase 1 — Google Workspace Role-Based Access Control (RBAC)

| Role | Google Sheets Permission | Zapier | WATI | GitHub |
|------|-------------------------|--------|------|--------|
| CEO | Owner (full access) | View only | View only | No access |
| COO | Owner (full access) | View + monitor | Monitor | No access |
| Head of Tech | Editor + protection override | Full access | Full access | Write access |
| Head of Recruitment | Editor (limited columns) | View only | View only | No access |
| Senior Ops Manager | Editor (limited columns) | No access | No access | No access |
| Recruiters (x3) | Editor — own assigned rows only | No access | No access | No access |
| Country Managers | Commenter only | No access | No access | No access |
| HR / Admin | Editor — limited columns | No access | No access | No access |

### Protected Ranges in Google Sheets

The following ranges are protected and can only be written to by the Apps Script service account:
- `Master Data` Column A (CandidateID)
- `Master Data` Column B (Timestamp)
- `Master Data` Column J (SourceSheetRow)
- `Master Data` Column L (AI_Score)
- `Master Data` Column Q (LastUpdated)
- `Employers Database` Column A (EmployerID)
- `Employers Database` Column K (Total Workers Deployed)
- `Job Requests` Column A (Job ID)
- `Job Requests` Column C (Employer Name — VLOOKUP)
- `Recruitment Pipeline` Column A (Pipeline ID)
- `Recruitment Pipeline` Columns C, E, F, G (VLOOKUP columns)
- `Deals & Revenue` Column A (Deal ID)
- `Deals & Revenue` Columns G, L, M (formula columns)
- `Tasks` Column A (Task ID)
- `Tasks` Column J (Completed Date)
- `Dashboard` — all cells (view only for all users)

### Setting Up Protected Ranges

1. Select the column or range to protect
2. Right-click → **Protect range**
3. Click **Set permissions**
4. Select **Restrict who can edit this range**
5. Choose **Only you** (or add the Apps Script service account email)
6. Click **Done**

---

## 2. API Key and Secret Management

### Phase 1 — Google Apps Script Properties

All API keys, tokens, and secrets are stored in **Google Apps Script Script Properties** — never hardcoded in scripts.

**Keys stored in Script Properties:**

| Property Key | Value Type | Used In |
|-------------|-----------|---------|
| `OPENAI_API_KEY` | OpenAI API key | `ai-scoring-trigger.gs` |
| `WATI_API_TOKEN` | WATI REST API bearer token | Notification scripts |
| `ZAPIER_WEBHOOK_URL` | Zapier webhook URL | Apps Script webhook triggers |
| `MASTER_SHEET_ID` | Google Sheets ID | All scripts referencing the CRM |
| `COO_WHATSAPP` | COO WhatsApp number (E.164) | Alert scripts |

**Setting Script Properties:**
1. In Apps Script editor, go to **Project Settings** → **Script properties**
2. Add each key-value pair
3. Access in code: `PropertiesService.getScriptProperties().getProperty('OPENAI_API_KEY')`

### Phase 1 — Environment Variables (`.env`)

For local development and GitHub Actions CI:
- All secrets are defined in `.env` (excluded from git via `.gitignore`)
- See `.env.example` for the full list of required variables with descriptions
- GitHub repository secrets are used for CI workflows (never in code)

**CI Security Scan:** The `.github/workflows/ci.yml` pipeline includes:
- Check that `.env` file is not committed
- Scan for OpenAI API key patterns in committed code
- Validate no hardcoded secrets (regex patterns)

---

## 3. Data Privacy and PII Handling

### Categories of PII Collected

| Data Element | Category | Sensitivity | Location |
|-------------|----------|-------------|----------|
| Full Name | Personal identifier | Medium | Master Data, Employers DB |
| Phone Number (WhatsApp) | Contact + identifier | High | Master Data, Employers DB |
| Country of Origin / Nationality | Personal | Medium | Master Data |
| Date of Birth | Personal identifier | High | Form responses |
| Passport number / scan | Government ID | Very High | Google Drive (CV/Docs folder) |
| CV / Resume | Professional PII | Medium | Google Drive |
| Medical fitness certificate | Health data | Very High | Google Drive |
| Police clearance | Legal data | Very High | Google Drive |
| Email address | Contact identifier | Medium | Employers DB |
| Company registration number | Business identifier | Low | Employers DB |

### Data Minimisation Principles

1. **Collect only what is needed** — The intake forms request only fields necessary for recruitment and placement
2. **Do not store payment card details** — All payments are bank transfer or via secure payment links (Stripe/Flutterwave); no card details are stored on the platform
3. **Anonymise test data** — Never use real candidate data in development or testing
4. **Candidate consent** — All forms include a consent checkbox before submission; consent is logged

### Data Retention Policy

| Data Type | Retention Period | Action After Period |
|-----------|-----------------|---------------------|
| Candidate records (Active) | Duration of placement + 2 years | Archive |
| Candidate records (Rejected) | 1 year | Delete or anonymise |
| Employer records (Active) | Duration of relationship + 3 years | Archive |
| Employer records (Closed) | 2 years | Delete |
| Audit logs | 5 years | Archive to cold storage |
| Financial records (Deals) | 7 years (legal requirement) | Archive |
| WhatsApp conversation logs | 90 days (WATI default) | Auto-deleted by WATI |

### Data Subject Rights (NDPR / GDPR)

Candidates and employers have the right to:
- **Access** — Request a copy of their data (respond within 30 days)
- **Correction** — Request inaccurate data be corrected
- **Erasure** — Request deletion of their data (where not legally required to retain)
- **Portability** — Request data in a machine-readable format

**Process for data requests:**
1. Candidate/employer emails info@kingkenglobal.com.ng with subject "Data Request — [Full Name]"
2. Head of Legal verifies identity within 3 business days
3. Request fulfilled within 30 days
4. Action logged in Audit Log sheet

---

## 4. Audit Logging

### Apps Script Audit Log (`audit-log-on-edit.gs`)

All edits to sensitive columns in Google Sheets are automatically logged to a dedicated **Audit Log** sheet (hidden from general users).

**Fields logged for each change:**

| Field | Description |
|-------|-------------|
| Timestamp | Date and time of change (ISO 8601) |
| Editor Email | Google account email of the person who made the change |
| Sheet Name | Which sheet was edited |
| Row Number | Row number of the edited record |
| Column Name | Which column was changed |
| Old Value | Previous value before the change |
| New Value | New value after the change |

**Tracked columns:**
- Master Data: Status (K), AI_Score (L), AssignedTo (M), VisaStatus (O), Notes (P)
- Pipeline: Stage (H), Medical Clearance (L), Visa Status (M), Deployment Status (O)
- Deals: Amount Paid (K), Payment Status (M)
- Tasks: Status (I)

**Audit Log protection:** The Audit Log sheet is hidden and write-protected — only the Apps Script service account can append rows.

---

## 5. Network and Communication Security

### WhatsApp / WATI

- All communication via WhatsApp uses end-to-end encryption (Meta's WhatsApp protocol)
- WATI API calls use HTTPS with bearer token authentication
- WATI bearer token is rotated every 90 days
- Bot flows do not transmit PII to external third parties (only to Google Sheets via webhook)

### Zapier

- All Zapier webhook URLs use HTTPS
- Zapier account is restricted to the Head of Tech (single owner account)
- Webhook URLs are not shared publicly; rotated if compromised
- Zap history is set to 7-day retention to minimize stored PII in Zapier

### Google Apps Script

- All `UrlFetchApp` calls use HTTPS endpoints only
- Script runs under the Google service account of the project owner
- OAuth scopes are reviewed quarterly and restricted to minimum required

### GitHub

- Repository is public (documentation only — no PII, no secrets)
- `.gitignore` excludes `.env`, credentials, and sensitive configuration files
- `ci.yml` includes a scan step to detect accidentally committed secrets
- Branch protection rules on `main` branch (PR required, no direct push)

---

## 6. Incident Response

### Security Incident Classification

| Level | Description | Examples |
|-------|-------------|---------|
| P1 — Critical | Immediate risk to data or operations | API key leaked, mass data breach |
| P2 — High | Significant security risk | Unauthorized access to Sheets, PII exposed |
| P3 — Medium | Moderate security concern | Phishing attempt, suspicious login |
| P4 — Low | Minor concern | Spam, failed login attempts |

### Incident Response Steps

**P1 / P2 Incidents:**
1. Head of Tech notified immediately (call, not WhatsApp message)
2. COO and Head of Legal notified within 1 hour
3. Affected API keys, tokens, or passwords rotated within 2 hours
4. Access revoked for suspected compromised accounts immediately
5. Full incident report prepared within 24 hours
6. Affected data subjects notified within 72 hours (NDPR/GDPR requirement)
7. Post-incident review within 7 days

**P3 / P4 Incidents:**
1. Head of Tech investigates and resolves
2. COO briefed in weekly operations review
3. Action logged in Audit Log

### Emergency Contacts

| Role | Contact |
|------|---------|
| Head of Tech | info@kingkenglobal.com.ng |
| COO | Direct WhatsApp (internal number) |
| Head of Legal | Direct WhatsApp (internal number) |
| WATI Support | support@wati.io |
| Google Workspace Admin | admin console |

---

## 7. Phase 2 / 3 Security Additions

When the platform migrates to Phase 2 (custom web app), the following additional controls will be implemented:

| Control | Tool | Description |
|---------|------|-------------|
| Web Application Firewall | Cloudflare WAF | Block common attack patterns (SQLi, XSS) |
| DDoS protection | Cloudflare | Absorb and mitigate volumetric attacks |
| SSO / MFA | Auth0 | Multi-factor authentication for all team logins |
| Secrets management | AWS Secrets Manager | Secure storage for all production secrets |
| Vulnerability scanning | GitHub Dependabot | Automated dependency vulnerability alerts |
| Penetration testing | External vendor | Annual pen test of all production systems |
| SIEM | Datadog Log Management | Centralized security event logging and alerting |
| Database encryption | AWS RDS encryption at rest | PostgreSQL database encrypted with AES-256 |
| TLS | Cloudflare / AWS ACM | TLS 1.3 enforced on all endpoints |
| RBAC | Auth0 + API middleware | Role-based access enforced at API layer |

---

## Security Review Schedule

| Review | Frequency | Owner |
|--------|-----------|-------|
| API key rotation | Every 90 days | Head of Tech |
| Access permissions audit | Monthly | Head of Tech + COO |
| Audit Log review | Weekly | COO |
| Full security review | Quarterly | Head of Tech + Head of Legal |
| Annual compliance review | Annually | Head of Legal |

---

*Maintained by: Head of Tech + Head of Legal | Contact: info@kingkenglobal.com.ng | https://www.kingkenglobal.com.ng*
