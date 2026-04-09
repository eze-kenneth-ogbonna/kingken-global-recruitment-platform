# Deployment Guide — Kingken Global Recruitment Platform

**Document Type:** Deployment and Configuration Reference
**Scope:** Phase 1 (current) full deployment; Phase 2 deployment stub
**Company:** Kingken Global Travel Agency Ltd.

---

## Overview

This guide covers the complete deployment of the Kingken Global Recruitment Platform from scratch. It is intended for the Head of Tech or any technically capable team member responsible for setting up or restoring the platform.

**Phase 1 deployment requires no servers or infrastructure** — it is entirely cloud-based using Google Workspace, Zapier, WATI, and GitHub.

**Estimated deployment time:** 2–4 hours for full Phase 1 setup

---

## Prerequisites

Before starting, ensure you have:

- [ ] A **Google Workspace** account (name@kingkenglobal.com.ng) with admin access
- [ ] A **Zapier** account (Professional plan or higher)
- [ ] A **WATI** account (Growth plan) with the WhatsApp number +96569048174 verified
- [ ] An **OpenAI** API account with GPT-4o access and a funded API key
- [ ] A **GitHub** account with write access to the `kingken-global-recruitment-platform` repository
- [ ] A **Wix** business account (for the website)
- [ ] A **Google Drive** folder for candidate documents (shared with the team)

---

## Step 1: Google Sheets CRM Setup

### 1.1 Create the Google Sheets Workbook

1. Log into Google Workspace at [sheets.google.com](https://sheets.google.com)
2. Create a new spreadsheet: **File → New → Spreadsheet**
3. Name it: `Kingken Global CRM — [YEAR]`
4. Share with the full team using the access matrix in `SECURITY_CONTROLS.md`

### 1.2 Create Sheet Tabs

Create the following tabs in this exact order (right-click tab → Insert sheet):

| Tab # | Tab Name | Color | Reference |
|-------|----------|-------|-----------|
| 1 | Master Data | Blue `#1565C0` | `MASTER_DATA_SCHEMA.md` |
| 2 | Employers Database | Orange `#E65100` | `EMPLOYERS_SCHEMA.md` |
| 3 | Job Requests | Blue `#1565C0` | `JOB_REQUESTS_SCHEMA.md` |
| 4 | Recruitment Pipeline | Purple `#6A1B9A` | `PIPELINE_SCHEMA.md` |
| 5 | Deals & Revenue | Green `#1B5E20` | `DEALS_SCHEMA.md` |
| 6 | Tasks | Red `#C62828` | `TASKS_SCHEMA.md` |
| 7 | Dashboard | Dark Blue `#0D47A1` | `DASHBOARD_FORMULAS.md` |
| 8 | Audit Log | Grey `#424242` | `audit-log-on-edit.gs` |
| 9 | Form Responses | Grey | Auto-created by Google Form |

### 1.3 Add Column Headers

For each sheet, add the column headers exactly as defined in the corresponding schema file. Headers must be in Row 1 and exactly match the field names used in Apps Script and Zapier.

### 1.4 Set Up Data Validation

For each dropdown column, apply data validation as specified in the schema files:
1. Select the column range (e.g. K2:K1000)
2. **Data → Data validation**
3. Set criteria: **List of items** with the allowed values
4. Check: **Show dropdown list in cell**
5. Check: **Reject input** for critical fields

### 1.5 Apply Conditional Formatting

Follow the conditional formatting rules in each schema file to color-code status columns.

### 1.6 Set Up Protected Ranges

Follow the protected ranges instructions in each schema file and in `SECURITY_CONTROLS.md`.

### 1.7 Freeze Headers and Configure Sheet Settings

For each sheet:
- Freeze Row 1 (headers): **View → Freeze → 1 row**
- Freeze Column A: **View → Freeze → 1 column**
- Set default sort as specified in each schema file

---

## Step 2: Google Apps Script Deployment

### 2.1 Open Apps Script Editor

1. In the Google Sheets workbook, go to **Extensions → Apps Script**
2. The Apps Script editor opens in a new tab
3. Project name: `Kingken Global CRM Scripts`

### 2.2 Deploy Scripts

Copy and paste each script from the `scripts/google-apps-script/` directory into separate script files:

| Script File | Apps Script Filename | Purpose |
|------------|---------------------|---------|
| `migrate-form-to-master.gs` | migrate-form-to-master | Migrate Form Responses → Master Data |
| `normalize-phones.gs` | normalize-phones | Normalize all phone numbers to E.164 |
| `deduplicate-candidates.gs` | deduplicate-candidates | Flag duplicate candidates |
| `audit-log-on-edit.gs` | audit-log-on-edit | Track changes to sensitive columns |
| `ai-scoring-trigger.gs` | ai-scoring-trigger | Call OpenAI API for candidate scoring |
| `dashboard-refresh.gs` | dashboard-refresh | Refresh Dashboard formulas daily |

**To add a new script file:**
1. In Apps Script editor, click **+** next to Files
2. Choose **Script**
3. Name it (without `.gs` extension)
4. Paste the script content

### 2.3 Set Script Properties (API Keys)

1. In Apps Script editor, go to **Project Settings** → **Script properties**
2. Add the following properties:

| Property | Value | Where to find |
|----------|-------|--------------|
| `OPENAI_API_KEY` | Your OpenAI API key | platform.openai.com → API Keys |
| `WATI_API_TOKEN` | Your WATI API token | WATI Dashboard → API |
| `WATI_PHONE_NUMBER` | +96569048174 | Your WATI account number |
| `ZAPIER_WEBHOOK_URL` | Zapier webhook URL | From Zap-01 webhook step |
| `MASTER_SHEET_ID` | Google Sheets ID | From the Sheets URL (between /d/ and /edit) |
| `COO_WHATSAPP` | COO WhatsApp number | E.164 format |

### 2.4 Set Up Triggers

1. In Apps Script editor, click the clock icon (**Triggers**)
2. Set up the following triggers:

| Function | Trigger Type | Time | Purpose |
|----------|-------------|------|---------|
| `onEdit` | Spreadsheet → On edit | — | Audit log and auto-updates |
| `onFormSubmit` | Spreadsheet → On form submit | — | Migrate form responses |
| `refreshDashboard` | Time-driven → Day timer | 7 AM – 8 AM | Daily dashboard refresh |
| `runDailyReport` | Time-driven → Day timer | 6 AM – 7 AM | Daily team report |

### 2.5 Authorize Scripts

1. Run any function manually first time: **Run → Run function**
2. Google will prompt for authorization
3. Click **Review permissions** → **Advanced** → **Go to Kingken Global CRM Scripts (unsafe)**
4. Grant all requested permissions (Sheets, external URL fetch, email)
5. Confirm in the authorization dialog

---

## Step 3: Google Forms Setup

### 3.1 Worker Application Form

1. Go to [forms.google.com](https://forms.google.com) → **Blank form**
2. Title: `Apply for International Jobs — Kingken Global Travel Agency Ltd`
3. Add all fields as specified in `platform/forms/WORKER_APPLICATION_FORM.md`
4. Set response destination: **Responses → Link to Sheets** → select the CRM workbook → create new tab "Form Responses"
5. Get the form URL and add to the website and WhatsApp bot

### 3.2 Employer Request Form

1. Create a second form: `Hire International Workers — Kingken Global Travel Agency Ltd`
2. Add all fields as specified in `platform/forms/EMPLOYER_REQUEST_FORM.md`
3. Link to CRM workbook: new tab "Employer Form Responses"

---

## Step 4: Zapier Deployment

### 4.1 Create Zapier Account and Connect Apps

1. Log into [zapier.com](https://zapier.com)
2. Connect the following apps (My Apps → Add Connection):
   - Google Sheets (authorize with Kingken Workspace account)
   - Gmail (for email notifications)
   - WATI (enter API token)
   - OpenAI (enter API key)
   - Trello or Notion (for task creation, optional)
   - Webhooks by Zapier (no auth needed — built-in)

### 4.2 Deploy the 6 Zaps

Deploy each Zap using the step-by-step configurations in `scripts/zapier/`:

| Zap | Config File | Trigger | Action |
|-----|------------|---------|--------|
| Zap-01 | `zap-01-form-to-sheet.md` | Google Form → new response | Append to Master Data |
| Zap-02 | `zap-02-auto-reply-worker.md` | New Master Data row | Send WhatsApp via WATI |
| Zap-03 | `zap-03-ai-scoring.md` | New Master Data row | OpenAI score → update row |
| Zap-04 | `zap-04-team-notify.md` | New Master Data row | Notify COO via WhatsApp |
| Zap-05 | `zap-05-task-creation.md` | Pipeline stage change | Create task in Tasks sheet |
| Zap-06 | `zap-06-employer-crm.md` | Employer form response | Create employer + job rows |

### 4.3 Test All Zaps

After deploying each Zap:
1. Use Zapier's built-in test function to run a test
2. Verify the output appears correctly in Google Sheets
3. Check WATI for the test WhatsApp message
4. Turn each Zap **ON** only after successful testing

---

## Step 5: WATI WhatsApp Setup

### 5.1 Connect WhatsApp Number

1. Log into WATI at [app.wati.io](https://app.wati.io)
2. Onboarding: connect number +96569048174 via Meta Business Manager
3. Set Business Profile (see `docs/WHATSAPP_BOT_GUIDE.md`)

### 5.2 Submit Message Templates

Submit all 9 templates for Meta approval as documented in `platform/whatsapp/NOTIFICATION_TEMPLATES.md`:
1. `worker_acknowledgment`
2. `application_status_update`
3. `interview_invitation`
4. `document_request`
5. `deployment_confirmation`
6. `medical_appointment_reminder`
7. `employer_welcome`
8. `shortlist_ready`
9. `payment_reminder`

### 5.3 Deploy Bot Flows

Using the WATI bot builder, deploy all 4 bot flows:
1. **Worker Registration Bot** — `platform/whatsapp/WORKER_BOT_SCRIPT.md`
2. **Employer Registration Bot** — `platform/whatsapp/EMPLOYER_BOT_SCRIPT.md`
3. **FAQ Bot** — `platform/whatsapp/FAQ_BOT_SCRIPT.md`
4. **Notification Templates** — `platform/whatsapp/NOTIFICATION_TEMPLATES.md`

### 5.4 Set Up Keyword Triggers

In WATI → Automation → Keywords:
- `APPLY` / `apply` → Worker Registration Bot
- `HIRE` / `hire` → Employer Registration Bot
- `FAQ` / `faq` / `HELP` / `help` → FAQ Bot
- `HUMAN` / `AGENT` → Human Handoff
- `STATUS` → Status check handler

---

## Step 6: GitHub Repository Configuration

### 6.1 Branch Protection

1. Go to repository **Settings → Branches**
2. Add branch protection rule for `main`:
   - Require pull request before merging
   - Require at least 1 review
   - Do not allow force pushes
   - Do not allow deletions

### 6.2 Repository Secrets (for CI)

1. Go to **Settings → Secrets and variables → Actions**
2. Add secrets:
   - `OPENAI_API_KEY` — for CI key pattern validation
   - Any other secrets used in workflows

### 6.3 Verify CI Pipeline

1. Push a test commit
2. Go to **Actions** tab
3. Confirm `ci.yml` runs and passes:
   - Markdown lint check
   - `.env` not-committed check
   - Required file presence check
   - OpenAI key pattern scan

---

## Step 7: Post-Deployment Verification

Run this checklist after completing all steps:

### Google Sheets
- [ ] All 9 tabs created with correct headers
- [ ] Data validation rules applied to all dropdown columns
- [ ] Conditional formatting applied to status columns
- [ ] Protected ranges set on formula and auto-populated columns
- [ ] Row 1 and Column A frozen on all sheets

### Apps Script
- [ ] All 6 scripts deployed
- [ ] Script Properties set with all API keys
- [ ] All 4 triggers configured
- [ ] Authorization completed — no "Authorization required" errors

### Google Forms
- [ ] Worker form created with all fields
- [ ] Employer form created with all fields
- [ ] Both forms linked to CRM workbook

### Zapier
- [ ] All 6 Zaps deployed and turned ON
- [ ] Each Zap tested at least once successfully
- [ ] No failed task history

### WATI
- [ ] WhatsApp number verified and active
- [ ] All 9 message templates approved by Meta
- [ ] All 4 bot flows built, tested, and activated
- [ ] All keyword triggers set

### Testing
- [ ] Submit a test worker application via form → verify Master Data row created
- [ ] Submit a test employer request → verify Employers DB + Job Requests rows created
- [ ] Send `APPLY` on WhatsApp → verify full bot flow completes
- [ ] Send `HIRE` on WhatsApp → verify full bot flow completes
- [ ] Change a candidate Status in Master Data → verify audit log entry created
- [ ] Verify Dashboard formulas populate correctly with test data

---

## Phase 2 Deployment Stub

When the platform migrates to Phase 2 (custom web application), deployment will use:

```yaml
# Planned: .github/workflows/deploy.yml
# Infrastructure: AWS EC2 / ECS with Docker containers
# Database: PostgreSQL on AWS RDS
# CI/CD: GitHub Actions → Docker build → ECR push → ECS deploy
# Secrets: AWS Secrets Manager
# DNS: Cloudflare (api.kingkenglobal.com)
# SSL: AWS ACM (auto-renewed)
```

See `SAAS_ARCHITECTURE.md` Phase 2 section for full specification.

---

## Rollback Procedure

### Google Sheets Rollback

If a data corruption or accidental bulk edit occurs:
1. Go to **File → Version history → See version history**
2. Browse to a version before the incident
3. Click **Restore this version**
4. Notify Head of Tech and COO immediately

### Zapier Rollback

If a Zap causes incorrect data to be written:
1. Turn the affected Zap **OFF** immediately
2. Review **Task History** in Zapier to identify affected rows
3. Manually correct or delete affected rows in Google Sheets
4. Fix the Zap logic before turning back ON

### Apps Script Rollback

Apps Script has version history:
1. Open Apps Script editor
2. Go to **Project history** (clock icon)
3. Select a previous version
4. Click **Restore**

---

*Maintained by: Head of Tech | Contact: info@kingkenglobal.com.ng | https://www.kingkenglobal.com.ng*
