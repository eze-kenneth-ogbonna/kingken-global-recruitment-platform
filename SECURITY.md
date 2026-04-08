# Security Policy

**Company:** Kingken Global Travel Agency Ltd  
**Platform:** Kingken Global Recruitment Platform  
**Version:** 1.0.0

---

## Reporting a Vulnerability

If you discover a security vulnerability in this platform, please **do not** open a public GitHub issue. Instead, report it privately:

**Email:** [info@kingkenglobal.com.ng](mailto:info@kingkenglobal.com.ng)  
**Subject Line:** `[SECURITY] Vulnerability Report — Kingken Global Platform`  
**WhatsApp (Tech Lead):** [+96569048174](https://wa.me/96569048174)

### What to Include in Your Report

1. Description of the vulnerability
2. Steps to reproduce
3. Potential impact (data exposure, unauthorized access, etc.)
4. Your recommended fix (if you have one)

### Response Timeline

| Action | Timeline |
|--------|----------|
| Acknowledgment of report | Within 24 hours |
| Initial assessment | Within 72 hours |
| Fix or mitigation | Within 7 days for critical issues |
| Public disclosure | After fix is deployed |

We appreciate responsible disclosure and will credit security researchers in our changelog (unless you prefer to remain anonymous).

---

## Data Protection Policy

### Candidate PII (Personally Identifiable Information)

The platform handles sensitive candidate data including:
- Full legal name
- Phone number (with country code)
- Nationality / country of origin
- Employment history and experience
- Passport availability and status
- CV / resume files
- WhatsApp conversation history

**Protection measures:**
- Candidate data is stored in Google Sheets with restricted sharing (edit access to recruiters only; no public access)
- CV file links stored in Google Drive with access control
- No candidate PII is committed to the GitHub repository
- Candidate records are never shared with employers without screening approval
- Data retention: Active records retained indefinitely; rejected/withdrawn candidates purged after 1 year

### Employer Data

Employer data includes:
- Company name and registration details
- Contact person name and phone
- Job requirements and salary budgets

**Protection measures:**
- Employer CRM access restricted to COO and CEO
- Employer data not shared with candidates or third parties without authorization

### Financial Data

Deal values, payment amounts, and revenue data:
- Access restricted to CEO and COO only
- Deals sheet protected with password in Google Sheets
- No financial data in GitHub repository

---

## Access Control Policy

### Google Sheets — Access Matrix

| Role | Master Data | Employers | Deals | Dashboard |
|------|------------|-----------|-------|-----------|
| CEO | Edit | Edit | Edit | View |
| COO | Edit | Edit | Edit | Edit |
| Head of Recruitment | Edit | View | View | View |
| Senior Recruiter | Edit | View | No access | View |
| Recruiter | View | No access | No access | View |
| Viewer | View | No access | No access | View |

### Zapier — Access Control
- Only the Tech Lead and COO have Zapier account credentials
- Zap editing is restricted to the Tech Lead
- Zapier webhook URLs treated as secrets (stored in `.env`, not in repo)

### API Keys — Management Rules
1. All API keys stored in `.env` file only — never in source code
2. `.env` is in `.gitignore` and never committed
3. API keys rotated:
   - **Quarterly** as standard practice
   - **Immediately** if suspected compromise or team member departure
4. Separate API keys for development and production environments
5. OpenAI API: spending limit set to prevent runaway costs
6. WATI API: IP restriction enabled where possible

### GitHub Repository Access
- Repository is currently public (documentation only — no real secrets)
- All secrets are in `.env` (gitignored) or GitHub Secrets
- Branch protection on `main`: requires PR review, no direct commits

---

## No-Secrets Policy

This repository must **never** contain:
- Real API keys (OpenAI, WATI, Zapier webhooks)
- Google Sheet IDs from production
- Candidate PII (names, phones, passport numbers)
- Employer contact information
- Passwords or app passwords
- Private keys or service account credentials

Use `.env.example` for variable templates and GitHub Secrets for CI/CD.

---

## Compliance Notes

### GDPR (General Data Protection Regulation)
- Candidate consent is obtained at form submission
- Privacy notice linked on Google Form
- Data deletion requests honored within 30 days
- Data minimization: only collect what is necessary for recruitment

### NDPR (Nigeria Data Protection Regulation)
- Applies to Nigerian candidates
- Data stored on Google servers (compliant infrastructure)
- Privacy policy available on website

### Kuwait Labor Law
- Employer verification required before any data sharing
- Worker contracts reviewed by legal team before deployment
- Deployment compliance checklist maintained in `ops/ROLLOUT_CHECKLIST.md`

---

## Incident Response

If a security incident occurs (data breach, unauthorized access, API key exposure):

1. **Immediately** rotate all affected API keys
2. Revoke compromised Google Sheets sharing permissions
3. Document the incident in a private incident report
4. Notify affected parties if their PII was exposed
5. Follow the full runbook in [ops/INCIDENT_RESPONSE.md](ops/INCIDENT_RESPONSE.md)

---

*Security policy maintained by Kingken Global Tech Team. Contact: info@kingkenglobal.com.ng*
