# Kingken Global Recruitment Platform — Automation Guide

> **Company:** Kingken Global Travel Agency Ltd
> **Website:** https://www.kingkenglobal.com.ng | **Email:** info@kingkenglobal.com.ng

---

## Overview

All platform automation runs through **Zapier**, connecting Google Forms, Google Sheets, OpenAI, WATI (WhatsApp), Gmail, and Trello/Notion. There are **6 core Zaps** that automate candidate intake, scoring, notifications, and employer onboarding.

### Prerequisites

- Zapier account (Starter plan minimum — required for multi-step Zaps)
- Apps connected in Zapier: Google Sheets, Google Forms, Gmail, OpenAI, WATI, Trello or Notion
- Master Database Google Sheet with all 7 tabs set up (see `GOOGLE_SHEETS_STRUCTURE.md`)
- WATI account with verified WhatsApp number and approved message templates
- OpenAI API key saved in Zapier

---

## Zap Overview Table

| # | Zap Name | Trigger | Key Action | Frequency |
|---|----------|---------|------------|-----------|
| 01 | Worker Form → Master Data | New Google Form response | Create row in Master Data sheet | Every submission |
| 02 | New Candidate → WhatsApp Reply | New row in Master Data | Send WhatsApp via WATI | Every new row |
| 03 | AI Candidate Scoring | New row in Master Data | OpenAI score → update row | Every new row |
| 04 | Team Notification | New row in Master Data | Email/WhatsApp to recruiter | Every new row |
| 05 | Create Recruiter Task | New row in Master Data | New card in Trello/Notion | Every new row |
| 06 | Employer Form → CRM + COO Alert | New Employer Form response | Add to Employers sheet + email COO | Every submission |

---

## Zap 01: Worker Form → Master Data Sheet

**Purpose:** Capture every worker application from Google Forms and create a structured row in the Master Data sheet.

### Trigger Configuration

| Field | Value |
|-------|-------|
| App | Google Forms |
| Event | New Form Response |
| Form | `Kingken Global — Worker Application Form` |
| Account | `platform@kingkenglobal.com.ng` |

### Action Configuration

| Field | Value |
|-------|-------|
| App | Google Sheets |
| Event | Create Spreadsheet Row |
| Spreadsheet | `Kingken Global Platform — Master Database` |
| Sheet | `Master Data` |

### Field Mapping

| Sheet Column | Maps From (Form Field) |
|-------------|------------------------|
| B: Timestamp | Response Timestamp |
| C: Full Name | Full Name |
| D: Phone | Phone Number (WhatsApp) |
| E: Email | Email Address (if collected) |
| F: Country | Country / Nationality |
| G: Position | Position Applying For |
| H: Experience | Years of Experience |
| I: Passport | Is Your Passport Available? |
| J: CV_Link | Upload Your CV (Google Drive URL) |
| K: Status | *(Static value)* `New` |
| N: Recruiter | *(Static value)* `Unassigned` |
| P: Date Updated | Response Timestamp |

### Testing Instructions

1. Open the Zap editor and click **Test Trigger**.
2. Submit a dummy application via the Google Form with test data.
3. Confirm Zapier detects the new response.
4. Click **Test Action** — verify a new row appears in Master Data with all fields populated.
5. Delete the test row from the sheet before going live.

### Common Errors

| Error | Cause | Fix |
|-------|-------|-----|
| "Could not find spreadsheet" | Spreadsheet not shared with Zapier account | Share spreadsheet with Zapier's Google account |
| "Sheet not found: Master Data" | Tab name mismatch | Ensure tab is named exactly `Master Data` (case-sensitive) |
| CV_Link is empty | File upload column not mapped | Map the file upload field to J; it returns a Google Drive URL |
| Duplicate rows | Zap triggered twice | Ensure "New Response" trigger only fires once per submission |

---

## Zap 02: New Candidate → WhatsApp Auto-Reply

**Purpose:** Send an immediate acknowledgment message to the candidate via WhatsApp as soon as they are added to the Master Data sheet.

### Trigger Configuration

| Field | Value |
|-------|-------|
| App | Google Sheets |
| Event | New Spreadsheet Row |
| Spreadsheet | `Kingken Global Platform — Master Database` |
| Sheet | `Master Data` |

### Action Configuration

| Field | Value |
|-------|-------|
| App | WATI |
| Event | Send Template Message |
| To Phone | Maps from column D (Phone) |
| Template | `worker_acknowledgment` |

### WATI Template: `worker_acknowledgment`

```
Hello {{1}}! 👋

Thank you for applying to Kingken Global Travel Agency Ltd.

We have received your application for *{{2}}* and our team will review it within 2–3 business days.

Your application reference: {{3}}

For any questions, reply to this message or contact us:
📧 info@kingkenglobal.com.ng
🌐 www.kingkenglobal.com.ng

— The Kingken Global Team
```

**Template Variable Mapping:**
- `{{1}}` → Column C (Full Name)
- `{{2}}` → Column G (Position)
- `{{3}}` → Column A (CandidateID)

### Testing Instructions

1. Submit a test form response with a real WhatsApp number you can verify.
2. Wait up to 60 seconds for the message to arrive.
3. Confirm name, position, and CandidateID appear correctly.

### Common Errors

| Error | Cause | Fix |
|-------|-------|-----|
| "Template not found" | Template not approved by Meta | Wait for Meta approval (24–48h) |
| "Invalid phone number" | Phone number not in E.164 format | Add formatter step: strip spaces, add +countrycode |
| Message not received | WATI sandbox mode | Ensure recipient has sent "join" message in sandbox |

---

## Zap 03: AI Candidate Scoring Pipeline

**Purpose:** Automatically score each new candidate using OpenAI GPT, then write the score and summary back to columns L and M in the Master Data sheet.

### Trigger Configuration

Same as Zap 02 — New row in Master Data sheet.

### Step 1: Format the Prompt (Formatter Action)

| Field | Value |
|-------|-------|
| App | Zapier Formatter |
| Event | Text → Replace |
| Build prompt | Combine form fields into structured prompt (see template below) |

### Step 2: OpenAI Action

| Field | Value |
|-------|-------|
| App | OpenAI |
| Event | Send Prompt |
| Model | `gpt-4o-mini` |
| Max Tokens | `500` |
| Temperature | `0.3` |
| Prompt | Constructed prompt from Step 1 |

### AI Scoring Prompt Template

```
You are a recruitment screening AI for Kingken Global, an international recruitment agency placing African workers in Gulf countries (Kuwait, UAE, Qatar).

Evaluate this candidate and return a JSON object ONLY. No extra text.

Candidate Details:
- Name: {{Full_Name}}
- Country: {{Country}}
- Position Applied: {{Position}}
- Years of Experience: {{Experience}}
- Passport Available: {{Passport}}
- CV Available: {{CV_Link}}

Scoring Criteria:
- Experience relevance to position (40 points)
- Passport availability (20 points)
- Country of origin (Gulf demand alignment) (20 points)
- CV provided (20 points)

Return this JSON format:
{
  "score": 0-100,
  "strengths": ["strength 1", "strength 2"],
  "weaknesses": ["weakness 1"],
  "recommendation": "Approve" | "Manual Review" | "Reject",
  "summary": "One sentence summary of candidate suitability."
}
```

### Step 3: Parse JSON Response (Formatter Action)

| Field | Value |
|-------|-------|
| App | Zapier Formatter |
| Event | Utilities → Line Itemizer |
| Input | OpenAI response text |
| Action | Extract JSON fields: score, recommendation, summary |

### Step 4: Update Master Data Row

| Field | Value |
|-------|-------|
| App | Google Sheets |
| Event | Update Spreadsheet Row |
| Row | Row ID from trigger |
| Column L (AI_Score) | `score` from parsed JSON |
| Column M (AI_Summary) | `summary` from parsed JSON |
| Column K (Status) | Conditional: if score >= 80 → `Approved`, if 60–79 → `Screened`, if < 40 → `Rejected`, else `New` |

### Testing Instructions

1. Add a test row to Master Data manually with all fields filled.
2. Run Zap manually from Zapier editor.
3. Verify OpenAI returns valid JSON (check Zap history).
4. Confirm columns L, M, and K are updated in the sheet.

### Common Errors

| Error | Cause | Fix |
|-------|-------|-----|
| JSON parse error | OpenAI returned markdown code block | Add formatter to strip ` ```json ` and ` ``` ` from response |
| "Rate limit exceeded" | Too many API calls | Add 2-second delay step before OpenAI action |
| Score not written to sheet | Row ID mismatch | Use the row number from the trigger, not a static value |
| Empty OpenAI response | Prompt too long or token limit | Reduce prompt length; increase Max Tokens to 600 |

---

## Zap 04: Team Notification

**Purpose:** Notify the assigned recruiter (and Head of Recruitment) immediately when a new candidate is added, so review can begin within hours.

### Trigger Configuration

Same as Zap 02 — New row in Master Data sheet.

### Filter Step (Add before actions)

Only trigger if column K (Status) = `New`. This avoids duplicate notifications for manually added rows.

### Action Option A: Gmail Notification

| Field | Value |
|-------|-------|
| App | Gmail |
| Event | Send Email |
| To | `recruitment@kingkenglobal.com.ng` |
| Subject | `New Candidate: {{Full_Name}} — {{Position}}` |
| Body | See template below |

**Email Body Template:**

```
New candidate received via Kingken Global Platform.

Name: {{Full_Name}}
Phone: {{Phone}}
Country: {{Country}}
Position: {{Position}}
Experience: {{Experience}}
Passport: {{Passport}}
AI Score: {{AI_Score}} (populated after Zap 03 runs)

View in Sheets: [Link to Master Data tab]

Action required: Review and update Status within 24 hours.

— Kingken Global Automation
```

### Action Option B: WATI WhatsApp Message to Recruiter

| Field | Value |
|-------|-------|
| App | WATI |
| Event | Send Message (non-template) |
| To | Recruiter's registered WhatsApp number |
| Message | `New candidate: {{Full_Name}} ({{Country}}) applied for {{Position}}. AI Score: {{AI_Score}}. Review in Sheets now.` |

### Testing Instructions

1. Submit a test form entry.
2. Confirm email is received at recruitment@ inbox within 2 minutes.
3. Confirm WhatsApp message received on recruiter's phone.

---

## Zap 05: Create Recruiter Task in Trello / Notion

**Purpose:** Automatically create a task card in Trello (or Notion) so the recruiter has a trackable action item for each new candidate.

### Trigger Configuration

Same as Zap 02 — New row in Master Data sheet.

### Action Option A: Trello

| Field | Value |
|-------|-------|
| App | Trello |
| Event | Create Card |
| Board | `Kingken Global — Recruitment Pipeline` |
| List | `New Candidates` |
| Name | `Screen: {{Full_Name}} — {{Position}} ({{Country}})` |
| Description | `CandidateID: {{CandidateID}}\nPhone: {{Phone}}\nExperience: {{Experience}}\nPassport: {{Passport}}\nAI Score: {{AI_Score}}\n\nReview CV and update Status in Master Data.` |
| Due Date | *(today + 1 day)* using Formatter → Date/Time |
| Label | `New Candidate` |

### Action Option B: Notion

| Field | Value |
|-------|-------|
| App | Notion |
| Event | Create Database Item |
| Database | `Recruitment Tasks` |
| Name | `Screen: {{Full_Name}} — {{Position}}` |
| Properties | Status = Open, Priority = High, Candidate = CandidateID |

### Testing Instructions

1. Submit a test form entry.
2. Open Trello board and confirm new card appears in "New Candidates" list.
3. Verify all fields in the card description are populated correctly.

---

## Zap 06: Employer Form → Employers Sheet + COO Alert

**Purpose:** When a new employer submits the registration form, add them to the Employers tab in Google Sheets and immediately alert the COO.

### Trigger Configuration

| Field | Value |
|-------|-------|
| App | Google Forms |
| Event | New Form Response |
| Form | `Kingken Global — Employer Registration Form` |

### Action 1: Add to Employers Sheet

| Field | Value |
|-------|-------|
| App | Google Sheets |
| Event | Create Spreadsheet Row |
| Spreadsheet | `Kingken Global Platform — Master Database` |
| Sheet | `Employers` |

**Field Mapping:**

| Sheet Column | Maps From |
|-------------|-----------|
| B: Timestamp | Response Timestamp |
| C: Company Name | Company Name |
| D: Contact Person | Contact Person (Full Name) |
| E: WhatsApp | WhatsApp Phone Number |
| F: Country | Country / Location |
| G: Position Needed | Job Title / Position Required |
| H: Workers Required | Number of Workers Required |
| I: Status | *(Static)* `Lead` |
| J: COO Assigned | *(Static)* `COO` |
| L: Date Updated | Response Timestamp |

### Action 2: Alert COO via Gmail

| Field | Value |
|-------|-------|
| App | Gmail |
| Event | Send Email |
| To | `coo@kingkenglobal.com.ng` |
| Subject | `URGENT: New Employer Registration — {{Company_Name}}` |
| Body | See template below |

**COO Alert Email Template:**

```
A new employer has registered on the Kingken Global Platform.

Company: {{Company_Name}}
Contact: {{Contact_Person}}
WhatsApp: {{WhatsApp_Phone}}
Country: {{Country}}
Position Required: {{Job_Title}}
Workers Needed: {{Number_of_Workers}}

This employer has been added to the Employers tab in Google Sheets with Status = Lead.

ACTION REQUIRED: Contact this employer within 24 hours via WhatsApp to discuss requirements.

View in Sheets: [Link to Employers tab]

— Kingken Global Automation
```

### Action 3: Send WhatsApp Welcome to Employer (Optional)

| Field | Value |
|-------|-------|
| App | WATI |
| Event | Send Template Message |
| Template | `employer_welcome` |
| To Phone | WhatsApp field from form |

**Template: `employer_welcome`**

```
Hello {{1}}, thank you for registering with *Kingken Global Travel Agency Ltd*! 🌍

We've received your request for {{2}} workers ({{3}}).

Our COO will contact you within 24 hours to discuss your requirements in detail.

📧 info@kingkenglobal.com.ng
🌐 www.kingkenglobal.com.ng

— Kingken Global Team
```

### Testing Instructions

1. Submit a test employer form entry.
2. Verify new row appears in the Employers tab.
3. Confirm COO email arrives with correct data.
4. Confirm employer receives WhatsApp message.

### Common Errors

| Error | Cause | Fix |
|-------|-------|-----|
| Two rows created | Zap fires twice | Check Zapier Zap history for duplicate runs |
| COO email not received | Wrong email address | Verify `coo@kingkenglobal.com.ng` in Zapier action |
| EmployerID not generated | No auto-ID formula | Use Google Apps Script in Sheet or add Formatter step |

---

## General Zapier Maintenance

### Monitoring Zap Health

- Check **Zap History** daily (Zapier dashboard → History).
- Look for failed Zaps (red X) and review error messages.
- Set up Zapier email notifications for task errors under **Account → Notifications**.

### Zapier Error Recovery

| Scenario | Action |
|----------|--------|
| Zap failed on a submission | Re-run the specific task from Zap History |
| Multiple failures | Pause Zap, investigate, fix field mappings, re-enable |
| API quota exceeded (OpenAI) | Wait for reset or upgrade OpenAI plan |
| Google Sheets "quota" error | Reduce Zap frequency; use batch processing |

### Monthly Zap Audit

- First Monday of every month: Head of Tech reviews all 6 Zaps.
- Check all field mappings still match current sheet structure.
- Review Zap run counts against Zapier plan limits.
- Update API keys if expired.

---

*Maintained by: Head of Tech | Contact: info@kingkenglobal.com.ng | https://www.kingkenglobal.com.ng*
