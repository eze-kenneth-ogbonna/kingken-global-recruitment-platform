# Security Controls – Kingken Global Recruitment Platform

**Company:** Kingken Global Travel Agency Ltd  
**Document Type:** Security Policy  
**Version:** 1.0  
**Last Updated:** 2026

---

## 1. Data Classification Table

All data handled by Kingken Global must be classified according to sensitivity level.

| Classification | Definition | Examples | Handling Requirements |
|---------------|-----------|---------|----------------------|
| **Public** | Information approved for public disclosure | Company name, website, general job listings | No restrictions |
| **Internal** | Business information for internal use only | Team structure, internal processes, job descriptions | Share only with team members |
| **Confidential** | Sensitive business data | Employer contracts, financial data, deal values, salary information | Restricted to authorised roles only; no sharing externally |
| **Personal Data** | Candidate personal information | Name, phone, passport, date of birth, medical results | GDPR/NDPR compliant; strict access controls; never share without consent |
| **Highly Sensitive** | Medical, financial, or legal records | Medical certificates, visa decisions, payment records | Highest access restrictions; encrypted storage; audit trail required |

---

## 2. Role-Based Access Control (RBAC) Matrix

### Roles Defined

| Role | Description |
|------|-------------|
| **CEO** | Full access — strategic oversight |
| **COO** | Full operational access |
| **Operations Manager** | Day-to-day platform management |
| **HR Officer** | Candidate pipeline management |
| **Recruiter** | Candidate sourcing and initial screening |
| **Country Manager** | Regional oversight (their country only) |
| **Finance** | Financial data access only |
| **Viewer** | Read-only access (investors, auditors) |

---

### RBAC Access Matrix – Google Sheets

| Sheet / Feature | CEO | COO | Ops Mgr | HR Officer | Recruiter | Country Mgr | Finance | Viewer |
|-----------------|-----|-----|---------|-----------|-----------|-------------|---------|--------|
| Master Data (read) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ (own country) | ❌ | ❌ |
| Master Data (write) | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Employers (read) | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ (own country) | ❌ | ❌ |
| Employers (write) | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Job Requests (read) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ (own country) | ❌ | ❌ |
| Job Requests (write) | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Pipeline (read) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ (own country) | ❌ | ❌ |
| Pipeline (write) | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Deals (read) | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ✅ |
| Deals (write) | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Tasks (read) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| Tasks (write) | ✅ | ✅ | ✅ | ✅ (own) | ✅ (own) | ❌ | ❌ | ❌ |
| Dashboard (read) | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ✅ |
| Dashboard (write) | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

---

### RBAC Access Matrix – Platform Tools

| Tool | CEO | COO | Ops Mgr | HR Officer | Recruiter | Finance |
|------|-----|-----|---------|-----------|-----------|---------|
| Zapier (configure) | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Zapier (view) | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| WATI (admin) | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| WATI (respond) | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Google Forms (edit) | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Google Forms (view responses) | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| Financial reports | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ |

---

## 3. Google Sheets Security Steps

### Step 1 – Enable Two-Factor Authentication (2FA)
1. All Google Workspace accounts must have 2FA enabled
2. Go to: myaccount.google.com → Security → 2-Step Verification
3. Use Google Authenticator app or hardware key
4. COO must verify 2FA is enabled for all team members quarterly

### Step 2 – Sheet Sharing Controls
1. Never share sheets publicly ("Anyone with the link can edit")
2. Always share with specific Google accounts (email addresses)
3. Use role-appropriate permissions (Viewer / Commenter / Editor)
4. Revoke access immediately when team members leave the company

### Step 3 – Protected Ranges
1. Protect ID columns (EmployerID, CandidateID, Job ID, etc.) from editing
2. Protect formula columns (calculated fields) from manual override
3. Protect the Dashboard sheet as view-only for most users
4. See each schema document for specific protected range setup steps

### Step 4 – Version History
1. Enable version history review: File → Version history → See version history
2. Restore previous versions if data is accidentally deleted or overwritten
3. Take manual snapshots (File → Download → CSV) before major updates

### Step 5 – Audit Access
1. Quarterly: review who has access to each sheet (Share → Manage access)
2. Remove anyone who no longer needs access
3. Log all sharing changes in the incident log

---

## 4. API Key Management Rules

### General Rules
1. **Never commit API keys to any repository or document**
2. API keys must be stored in the tool's secure configuration (not in spreadsheets)
3. Each integration (Zapier, WATI, OpenAI) uses its own API key
4. API keys must be rotated every 90 days or immediately after a suspected breach

### Tool-Specific Rules

| Tool | Where to Store Key | Rotation Policy |
|------|-------------------|----------------|
| Zapier | Zapier Connected Apps settings | Every 90 days |
| WATI | WATI dashboard → API Settings | Every 90 days |
| OpenAI | Zapier Connected Apps | Every 90 days |
| Google Sheets API | Google Cloud Console → Credentials | Every 90 days |
| SMTP/Gmail | Zapier email connection | Every 90 days |

### If an API Key Is Compromised
1. Immediately revoke the key in the tool's settings
2. Generate a new key
3. Update all integrations using the old key
4. Review audit logs for the past 30 days for unauthorised activity
5. File an incident report (see Incident Response section)

---

## 5. GDPR / NDPR Compliance Notes

### Applicable Regulations
- **GDPR** (General Data Protection Regulation) — applies to EU citizens' data
- **NDPR** (Nigeria Data Protection Regulation) — applies to Nigerian citizens' data
- Both regulations require informed consent and data subject rights

### Key Compliance Requirements

| Requirement | Action Taken |
|-------------|-------------|
| Lawful basis for processing | Workers and employers explicitly consent via form checkbox |
| Data minimisation | Only collect data necessary for recruitment |
| Purpose limitation | Data used only for recruitment; never sold to third parties |
| Right to access | Workers can request their data by emailing info@kingkenglobal.com.ng |
| Right to erasure | Workers can request data deletion; we respond within 30 days |
| Data breach notification | Notify affected individuals within 72 hours of discovering a breach |
| Data transfer | International transfers (to Gulf) covered by employer contract |

### Consent Language (Used in Forms and Bot)
> "I confirm that the information provided is accurate and I consent to Kingken Global Travel Agency Ltd processing my personal data for recruitment purposes. I understand I can request access to or deletion of my data at any time by contacting info@kingkenglobal.com.ng."

### Data Subject Rights Procedure
1. **Access request:** Candidate emails info@kingkenglobal.com.ng with subject "Data Access Request"
2. Operations Manager verifies identity and exports candidate's row from all sheets
3. Response sent within 30 days
4. **Deletion request:** Candidate's row is permanently deleted from all sheets; confirm in writing
5. Log all requests in an "NDPR/GDPR Requests" log tab

---

## 6. Candidate Data Retention Policy

| Data Type | Retention Period | Action After Retention Period |
|-----------|-----------------|------------------------------|
| Active candidate profiles | Duration of active recruitment | Retain |
| Rejected candidates | 12 months after rejection | Delete or anonymise |
| Deployed candidates | 3 years after deployment | Archive; delete personal identifiers |
| Withdrawn applications | 6 months | Delete |
| Medical records | 1 year | Securely delete |
| CV/documents | 12 months after last activity | Delete from Drive and Sheets |
| Communication logs (WhatsApp) | 6 months | Delete from WATI |
| Financial records (deals) | 7 years (tax compliance) | Retain; restrict access |

### Annual Data Review:
1. Every January, COO reviews all data in Master Data sheet
2. Archive or delete records older than retention policy
3. Document the review in the audit log

---

## 7. Audit Logging Policy

### What Must Be Logged

| Event | Log Location | Who Reviews |
|-------|-------------|-------------|
| New candidate created | Google Sheets version history | COO (weekly) |
| Candidate status change | Pipeline sheet (Stage Date column) | HR Officer (daily) |
| Employer status change | Employers sheet (version history) | COO (weekly) |
| Deal created or modified | Deals sheet (version history) | Finance (weekly) |
| User access granted or revoked | Manual access log (Google Doc) | COO (quarterly) |
| API key rotation | Manual key log (secure note) | Ops Manager |
| Data deletion request | NDPR/GDPR requests log | COO |
| Security incident | Incident log | CEO + COO |
| Failed login attempt | Google Workspace Admin Console | COO (monthly) |

### Google Workspace Admin Audit Logs:
1. Go to admin.google.com → Reports → Audit
2. Review: Login activity, Drive activity, Admin activity
3. Alert configured for: suspicious login locations, mass file downloads

---

## 8. Incident Response Overview

For the full incident response playbook, see `ops/INCIDENT_RESPONSE.md`.

### Quick Reference

| Severity | Example | Response Time | Owner |
|----------|---------|--------------|-------|
| P1 – Critical | Data breach, platform fully down | 30 minutes | CEO + COO |
| P2 – High | Candidate data exposed, Zapier failure | 2 hours | COO + Ops Manager |
| P3 – Medium | Single automation fails | 4 hours | Ops Manager |
| P4 – Low | Minor bug, form question issue | 24 hours | HR / Tech |

### Immediate Steps for Any Incident:
1. Identify and contain the issue
2. Notify CEO and COO immediately
3. Document in incident log (date, time, what happened, who was affected)
4. Resolve and verify fix
5. Post-incident review within 48 hours

---

## 9. Security Checklist – Monthly Review

- [ ] Review Google Workspace Admin Console for suspicious logins
- [ ] Verify 2FA is enabled for all team member accounts
- [ ] Check access permissions on all Google Sheets — remove ex-employees
- [ ] Review Zapier zap activity for errors or unexpected triggers
- [ ] Check WATI conversation logs for abuse or data leaks
- [ ] Review NDPR/GDPR request log — respond to any pending requests
- [ ] Check API key rotation schedule — rotate any keys older than 90 days
- [ ] Review data retention compliance — archive/delete overdue records
- [ ] Verify backup copies of key sheets exist in Google Drive
