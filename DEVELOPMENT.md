# Kingken Global — Development Setup Guide

**Version:** 1.0.0  
**Company:** Kingken Global Travel Agency Ltd  
**Platform:** International Recruitment SaaS (No-Code MVP)

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Repository Setup](#2-repository-setup)
3. [Environment Variables](#3-environment-variables)
4. [Google Sheets Setup](#4-google-sheets-setup)
5. [Google Apps Script Deployment](#5-google-apps-script-deployment)
6. [Zapier Setup](#6-zapier-setup)
7. [OpenAI API Configuration](#7-openai-api-configuration)
8. [WhatsApp Business API Setup](#8-whatsapp-business-api-setup)
9. [Testing](#9-testing)
10. [Deployment Steps](#10-deployment-steps)
11. [Troubleshooting](#11-troubleshooting)

---

## 1. Prerequisites

Before starting, ensure you have access to:

| Tool | Plan Required | Purpose |
|------|--------------|---------|
| **Google Account** (Workspace recommended) | Free / Workspace | Forms, Sheets, Apps Script |
| **Zapier** | Professional (from $49/month) | Workflow automation |
| **OpenAI** | Pay-as-you-go API | AI candidate scoring |
| **WATI** or **360dialog** | Business plan | WhatsApp Business API |
| **WhatsApp Business Number** | Verified | Must be a dedicated number |
| **Git** | Free | Version control |
| **Node.js** v18+ | Free | Optional (for future Phase 2 dev) |

**Accounts to create:**
1. [Google Workspace](https://workspace.google.com) — use `info@kingkenglobal.com.ng`
2. [Zapier](https://zapier.com) — Professional plan
3. [OpenAI Platform](https://platform.openai.com) — Add billing, generate API key
4. [WATI](https://www.wati.io) — Connect WhatsApp number +96569048174

---

## 2. Repository Setup

### Clone the Repository

```bash
git clone https://github.com/eze-kenneth-ogbonna/kingken-global-recruitment-platform.git
cd kingken-global-recruitment-platform
```

### Environment Variables

```bash
cp .env.example .env
```

Open `.env` in a text editor and fill in all required values. See [Section 3](#3-environment-variables) for full reference.

### Branch Naming Convention

| Type | Pattern | Example |
|------|---------|---------|
| Feature | `feature/description` | `feature/add-ai-scoring` |
| Bug fix | `fix/description` | `fix/phone-normalization` |
| Documentation | `docs/description` | `docs/update-setup-guide` |
| Operations | `ops/description` | `ops/zapier-workflow-update` |

---

## 3. Environment Variables

Copy `.env.example` to `.env` and fill in all values:

```bash
# ─── GOOGLE SHEETS ────────────────────────────────────────────
GOOGLE_SHEET_ID=your_spreadsheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=your_private_key_here

# ─── OPENAI / CHATGPT ─────────────────────────────────────────
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o

# ─── WHATSAPP BUSINESS API ────────────────────────────────────
WHATSAPP_API_KEY=your_whatsapp_api_key_here
WHATSAPP_API_URL=https://live-mt-server.wati.io/api/v1
WHATSAPP_BUSINESS_PHONE=+96569048174

# ─── ZAPIER ───────────────────────────────────────────────────
ZAPIER_WEBHOOK_URL=your_zapier_webhook_url_here

# ─── CRM / DATABASE ───────────────────────────────────────────
AIRTABLE_API_KEY=your_airtable_api_key_if_used
AIRTABLE_BASE_ID=your_base_id_here

# ─── EMAIL ────────────────────────────────────────────────────
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=info@kingkenglobal.com.ng
SMTP_PASS=your_app_password_here

# ─── PLATFORM ─────────────────────────────────────────────────
NODE_ENV=development
PLATFORM_URL=https://www.kingkenglobal.com.ng
ADMIN_EMAIL=admin@kingkenglobal.com.ng
```

> ⚠️ **IMPORTANT:** Never commit the `.env` file to Git. It is already listed in `.gitignore`.

---

## 4. Google Sheets Setup

### Step 4.1 — Create the Spreadsheet

1. Go to [sheets.google.com](https://sheets.google.com)
2. Create a new spreadsheet: **"Kingken Global CRM v1"**
3. Note the Spreadsheet ID from the URL: `https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit`
4. Add `GOOGLE_SHEET_ID` to your `.env` file

### Step 4.2 — Create All 7 Tabs

Right-click on the tab bar and add the following sheets in this order:

| Tab # | Sheet Name | Purpose |
|-------|-----------|---------|
| 1 | `Master Data` | All candidate profiles (ATS) |
| 2 | `Employers` | All employer records |
| 3 | `Job Requests` | Open job orders |
| 4 | `Pipeline` | Candidate-to-job tracking |
| 5 | `Deals` | Revenue and deal tracking |
| 6 | `Tasks` | Team task management |
| 7 | `Dashboard` | Live KPI dashboard |

### Step 4.3 — Set Up Headers

**Master Data headers (Row 1):**

```
CandidateID | Timestamp | FullName | Phone | Country | Position | ExperienceYears | PassportAvailable | CV_Link | SourceSheetRow | Status | AI_Score | AssignedTo | ScreeningDate | VisaStatus | Notes | LastUpdated
```

**Employers headers (Row 1):**

```
EmployerID | Timestamp | CompanyName | ContactName | Phone | Email | Country | Industry | Status | Notes | AssignedTo | LastUpdated
```

**Job Requests headers (Row 1):**

```
JobRequestID | EmployerID | CompanyName | JobTitle | NumberRequired | SalaryBudget | StartDate | Deadline | Status | Requirements | Notes | CreatedDate
```

**Pipeline headers (Row 1):**

```
PipelineID | CandidateID | FullName | JobRequestID | JobTitle | EmployerName | Stage | SubmittedDate | InterviewDate | Decision | Notes | LastUpdated
```

**Deals headers (Row 1):**

```
DealID | EmployerID | CompanyName | CandidateIDs | DealValue | AmountPaid | AmountBalance | PaymentStatus | DealDate | ClosedDate | Notes
```

**Tasks headers (Row 1):**

```
TaskID | AssignedTo | TaskTitle | RelatedTo | Priority | DueDate | Status | Notes | CreatedDate | CompletedDate
```

### Step 4.4 — Add Dashboard Formulas

In the `Dashboard` sheet, add these formulas (starting at B2 with labels in A):

```
=COUNTA('Master Data'!A2:A)          ← Total Candidates
=COUNTIF('Master Data'!K2:K,"New")   ← New Candidates
=COUNTIF('Master Data'!K2:K,"Screened") ← Screened
=COUNTIF('Master Data'!K2:K,"Approved") ← Approved
=COUNTIF('Master Data'!K2:K,"Deployed") ← Deployed
=COUNTA('Employers'!A2:A)            ← Total Employers
=COUNTIF('Employers'!I2:I,"Active")  ← Active Employers
=COUNTIF('Job Requests'!I2:I,"Open") ← Open Job Requests
=SUM('Deals'!E2:E)                   ← Total Revenue
=SUM('Deals'!F2:F)                   ← Total Paid
=SUMIF('Deals'!H2:H,"<>Paid",'Deals'!G2:G) ← Balance Due
```

See [platform/google-sheets/DASHBOARD_FORMULAS.md](platform/google-sheets/DASHBOARD_FORMULAS.md) for full formula reference.

### Step 4.5 — Add Data Validation

In `Master Data` sheet, column K (Status):
1. Select K2:K1000
2. Data → Data validation → Dropdown from list
3. Enter: `New,Screened,Approved,Rejected,Processing,Deployed`

---

## 5. Google Apps Script Deployment

### Step 5.1 — Open Apps Script

1. In your Google Sheet: **Extensions → Apps Script**
2. This opens the Apps Script editor

### Step 5.2 — Deploy Scripts in Order

Deploy the scripts in this order:

| Order | Script File | Function |
|-------|------------|---------|
| 1 | `migrate-form-to-master.gs` | Run once: migrate form responses |
| 2 | `normalize-phones.gs` | Run once: fix phone formats |
| 3 | `deduplicate-candidates.gs` | Run as needed |
| 4 | `audit-log-on-edit.gs` | Set as onEdit trigger |
| 5 | `ai-scoring-trigger.gs` | Run as needed / scheduled |
| 6 | `dashboard-refresh.gs` | Set as daily trigger |

### Step 5.3 — Set Up Triggers

For audit log:
1. Apps Script → Triggers (clock icon) → Add Trigger
2. Function: `onEditAuditLog`
3. Event: From spreadsheet → On edit
4. Save

For dashboard refresh:
1. Add Trigger → Function: `refreshDashboard`
2. Event: Time-driven → Daily timer → 8:00 AM

Full instructions: [scripts/google-apps-script/README.md](scripts/google-apps-script/README.md)

---

## 6. Zapier Setup

### Step 6.1 — Connect Google Sheets

1. Log in to [zapier.com](https://zapier.com)
2. Go to Apps → Connect a new app → Google Sheets
3. Authorize with the same Google account that owns your CRM sheet

### Step 6.2 — Create All 6 Zaps

Create each Zap using the guides below:

| Zap | Guide |
|-----|-------|
| Zap 01: Form → Master Data | [scripts/zapier/zap-01-form-to-sheet.md](scripts/zapier/zap-01-form-to-sheet.md) |
| Zap 02: Auto-reply Worker | [scripts/zapier/zap-02-auto-reply-worker.md](scripts/zapier/zap-02-auto-reply-worker.md) |
| Zap 03: AI Scoring | [scripts/zapier/zap-03-ai-scoring.md](scripts/zapier/zap-03-ai-scoring.md) |
| Zap 04: Team Notify | [scripts/zapier/zap-04-team-notify.md](scripts/zapier/zap-04-team-notify.md) |
| Zap 05: Task Creation | [scripts/zapier/zap-05-task-creation.md](scripts/zapier/zap-05-task-creation.md) |
| Zap 06: Employer CRM | [scripts/zapier/zap-06-employer-crm.md](scripts/zapier/zap-06-employer-crm.md) |

### Step 6.3 — Test Each Zap

After creating each Zap:
1. Click **Test trigger** to load sample data
2. Run each action step with the test data
3. Verify the result in the destination system
4. Turn Zap **ON** when confirmed working

---

## 7. OpenAI API Configuration

### Step 7.1 — Get API Key

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign in with your OpenAI account
3. Navigate to API Keys → Create new secret key
4. Copy the key immediately (shown only once)
5. Add to `.env` as `OPENAI_API_KEY`

### Step 7.2 — Add Billing

1. Go to Billing → Add payment method
2. Set usage limit to $50/month initially
3. Monitor usage under Usage dashboard

### Step 7.3 — Model Selection

Use `gpt-4o` (set in `.env` as `OPENAI_MODEL=gpt-4o`).

**Estimated cost:** ~$0.01–0.03 per candidate scored (with standard prompts).

### Step 7.4 — In Zapier (Zap 03)

When configuring Zap 03 (AI Scoring):
1. Connect your OpenAI account in Zapier
2. Select model: `gpt-4o`
3. Use the candidate screening prompt from [scripts/zapier/ai-prompts.md](scripts/zapier/ai-prompts.md)
4. Parse the JSON response to extract score, strengths, and summary

---

## 8. WhatsApp Business API Setup

### Step 8.1 — WATI Account Setup

1. Go to [wati.io](https://www.wati.io) and sign up for the Business plan
2. Connect your WhatsApp Business number: **+96569048174**
3. Complete Meta Business verification (takes 24–72 hours)
4. Get your API Key and API URL from WATI Settings → API

### Step 8.2 — Add to Environment

```bash
WHATSAPP_API_KEY=your_wati_api_key
WHATSAPP_API_URL=https://live-mt-server.wati.io/api/v1
WHATSAPP_BUSINESS_PHONE=+96569048174
```

### Step 8.3 — Create Message Templates

In WATI dashboard, create these approved templates:

1. **worker_confirmation** — Auto-reply to new workers
2. **employer_lead_received** — Confirmation to employers
3. **team_new_lead** — Internal team notification
4. **coo_employer_alert** — COO alert for new employer

### Step 8.4 — Deploy Bot Scripts

1. In WATI, go to **Automation → Bot Builder**
2. Create two bots:
   - **Employer Bot** — use script from [platform/whatsapp/BOT_SCRIPT_EMPLOYER.md](platform/whatsapp/BOT_SCRIPT_EMPLOYER.md)
   - **Worker Bot** — use script from [platform/whatsapp/BOT_SCRIPT_WORKER.md](platform/whatsapp/BOT_SCRIPT_WORKER.md)
3. Add keyword triggers:
   - "HIRE" → Trigger Employer Bot
   - "APPLY" → Trigger Worker Bot

Full setup guide: [docs/WHATSAPP_BOT_GUIDE.md](docs/WHATSAPP_BOT_GUIDE.md)

---

## 9. Testing

### Test Checklist

Run through this checklist to verify the full system:

```
□ Submit a test worker application via Google Form
□ Verify row appears in Master Data sheet (Zap 01)
□ Verify auto-reply received on test WhatsApp/email (Zap 02)
□ Verify AI score written to Master Data AI_Score column (Zap 03)
□ Verify team notification received (Zap 04)
□ Verify task created in Trello/Notion (Zap 05)
□ Submit a test employer form
□ Verify employer row appears in Employers sheet (Zap 06)
□ Verify COO alert received
□ Test WhatsApp bot: send "APPLY" to +96569048174
□ Test WhatsApp bot: send "HIRE" to +96569048174
□ Verify Dashboard formulas return correct counts
□ Trigger onEdit audit log by editing a Master Data status
□ Verify Audit Log sheet records the change
□ Run migrate-form-to-master.gs on a test copy
□ Run normalize-phones.gs and verify output
□ Run deduplicate-candidates.gs and check report
```

### Test Data

Use this sample candidate for testing:

```
Full Name: Test Candidate
Phone: +23480000000
Country: Nigeria
Position: Domestic Worker
Experience: 2 years
Passport: Yes
CV Link: https://example.com/test-cv
```

---

## 10. Deployment Steps

### Go Live Checklist

1. **Verify all 7 Google Sheets tabs** are created with correct headers
2. **Test all 6 Zapier zaps** with sample data; confirm all are turned ON
3. **Confirm OpenAI** scoring returns valid JSON with score field
4. **Test WhatsApp bot** by sending messages to +96569048174
5. **Embed forms** on website and test submissions
6. **Share CRM sheet** with team (assign view/edit roles appropriately)
7. **Set up Google Apps Script triggers** (audit log + dashboard refresh)
8. **Run data migration** if you have existing candidates to import
9. **Brief the team** on daily reporting requirements

Full checklist: [ops/ROLLOUT_CHECKLIST.md](ops/ROLLOUT_CHECKLIST.md)

---

## 11. Troubleshooting

### Common Issues

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| Zap not triggering | Form responses sheet name mismatch | Check sheet tab name is exactly "Form Responses 1" |
| AI score not writing back | Zapier OpenAI step error | Check API key; verify JSON parser finds "score" field |
| WhatsApp bot not responding | WATI webhook not set | Set webhook URL in WATI → Integrations → Zapier |
| Duplicate rows in Master Data | Multiple Zap runs | Add Filter step in Zap 01 to check existing IDs |
| Phone normalization failing | Country column empty | Ensure Country field is required in Google Form |
| Dashboard showing 0 | Sheet name typo | Verify formula references match exact sheet tab names |

### Getting Help

- Review issue guides in `.github/ISSUE_TEMPLATE/`
- Contact Tech Lead via WhatsApp group: **Kingken Tech**
- Email: [info@kingkenglobal.com.ng](mailto:info@kingkenglobal.com.ng)

---

*Maintained by Kingken Global Tech Team. Last updated: 2026*
