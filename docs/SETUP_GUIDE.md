# Kingken Global Recruitment Platform — Setup Guide

> **Company:** Kingken Global Travel Agency Ltd
> **Website:** https://www.kingkenglobal.com.ng
> **Email:** info@kingkenglobal.com.ng
> **WhatsApp:** +96569048174
> **Markets:** Kuwait, UAE, Qatar | Nigeria, Ghana, Kenya, Ethiopia, Uganda, Tanzania, Cameroon, Senegal

---

## Table of Contents

1. [Google Form Setup](#1-google-form-setup)
2. [Google Sheets Setup](#2-google-sheets-setup)
3. [Dashboard Formulas](#3-dashboard-formulas)
4. [Zapier Setup Overview](#4-zapier-setup-overview)
5. [OpenAI Integration](#5-openai-integration)
6. [WhatsApp Business API Setup](#6-whatsapp-business-api-setup)
7. [Website Setup Options](#7-website-setup-options)
8. [Daily Reporting System](#8-daily-reporting-system)
9. [Role Assignment and Team Permissions](#9-role-assignment-and-team-permissions)
10. [Go-Live Checklist](#10-go-live-checklist)

---

## 1. Google Form Setup

### 1.1 Worker Registration Form

**Form Title:** Kingken Global — Worker Application Form
**Description:** Apply for international job placements in Kuwait, UAE, and Qatar through Kingken Global Travel Agency Ltd.

#### Steps to Create

1. Go to [forms.google.com](https://forms.google.com) and click **Blank Form**.
2. Rename the form: `Kingken Global — Worker Application Form`.
3. Add the following questions in order:

| # | Question Label | Type | Required | Validation / Options |
|---|----------------|------|----------|----------------------|
| 1 | Full Name | Short Answer | Yes | Min 2 characters |
| 2 | Phone Number (WhatsApp) | Short Answer | Yes | Number only |
| 3 | Country / Nationality | Dropdown | Yes | Nigeria, Ghana, Kenya, Ethiopia, Uganda, Tanzania, Cameroon, Senegal, Other |
| 4 | Position Applying For | Dropdown | Yes | Domestic Worker, Driver, Security Guard, Cleaner, Nanny, Caregiver, Cook, Office Assistant, Labourer, Other |
| 5 | Years of Experience | Multiple Choice | Yes | Less than 1 year, 1–2 years, 3–5 years, 5+ years |
| 6 | Is Your Passport Available? | Multiple Choice | Yes | Yes — Valid, Yes — Expired, No — Not Yet |
| 7 | Upload Your CV (PDF or Word) | File Upload | No | Max 10 MB, PDF/DOC/DOCX only |

4. Under **Settings → Responses**, tick **Collect email addresses**.
5. Under **Settings → Presentation**, add a confirmation message:

```
Thank you for applying! The Kingken Global team will review your application and contact you
within 2–3 business days via WhatsApp. WhatsApp us anytime: +96569048174
```

6. Click **Send → Link** and copy the shareable URL.
7. Under the **Responses** tab, click the green **Sheets icon** to link to Google Sheets.
   - Select **Create a new spreadsheet**, name it `Kingken Global Platform — Master Database`.

---

### 1.2 Employer Registration Form

**Form Title:** Kingken Global — Employer / Company Registration
**Description:** Register your company to hire skilled workers from Africa through Kingken Global Travel Agency Ltd.

#### Steps to Create

1. Create a second blank form: `Kingken Global — Employer Registration Form`.
2. Add the following questions:

| # | Question Label | Type | Required | Validation / Options |
|---|----------------|------|----------|----------------------|
| 1 | Company Name | Short Answer | Yes | Min 3 characters |
| 2 | Contact Person (Full Name) | Short Answer | Yes | — |
| 3 | WhatsApp Phone Number | Short Answer | Yes | Number only |
| 4 | Country / Location | Dropdown | Yes | Kuwait, UAE — Dubai, UAE — Abu Dhabi, UAE — Sharjah, Qatar, Saudi Arabia, Other |
| 5 | Job Title / Position Required | Short Answer | Yes | — |
| 6 | Number of Workers Required | Multiple Choice | Yes | 1–5, 6–10, 11–20, 21–50, 50+ |
| 7 | Preferred Nationality | Dropdown | No | Nigerian, Ghanaian, Kenyan, Ethiopian, Ugandan, Mixed / Any African |
| 8 | Estimated Monthly Salary (USD) | Short Answer | No | — |
| 9 | Preferred Start Date | Date | No | — |

3. Set the confirmation message:

```
Thank you for registering with Kingken Global! Our COO will contact you within 24 hours
to discuss your staffing requirements. WhatsApp: +96569048174
```

4. Link this form to a new sheet tab named `Employers` within the same master spreadsheet.

---

## 2. Google Sheets Setup

Open the `Kingken Global Platform — Master Database` spreadsheet and create **7 tabs** as follows.
Right-click each tab to rename it.

### Tab Overview

| Tab # | Tab Name | Purpose |
|-------|----------|---------|
| 1 | Master Data | All candidate records |
| 2 | Employers | All employer records |
| 3 | Job Requests | Active job openings |
| 4 | Pipeline | Candidate stage tracking |
| 5 | Deals | Financial records per placement |
| 6 | Tasks | Team task management |
| 7 | Dashboard | KPI metrics and charts |

### Tab 1: Master Data — Column Headers (Row 1)

```
A: CandidateID    B: Timestamp       C: Full Name      D: Phone
E: Email          F: Country         G: Position       H: Experience
I: Passport       J: CV_Link         K: Status         L: AI_Score
M: AI_Summary     N: Recruiter       O: Notes          P: Date Updated
```

### Tab 2: Employers — Column Headers (Row 1)

```
A: EmployerID     B: Timestamp       C: Company Name   D: Contact Person
E: WhatsApp       F: Country         G: Position Needed H: Workers Required
I: Status         J: COO Assigned    K: Notes          L: Date Updated
```

### Tab 3: Job Requests — Column Headers (Row 1)

```
A: JobID          B: EmployerID      C: Job Title      D: Country
E: Workers Needed F: Nationality Pref G: Salary        H: Start Date
I: Status         J: Matched Candidates K: Notes
```

### Tab 4: Pipeline — Column Headers (Row 1)

```
A: PipelineID     B: CandidateID     C: JobID          D: Stage
E: Stage Date     F: Recruiter       G: Notes          H: Next Action
I: Next Action Date
```

### Tab 5: Deals — Column Headers (Row 1)

```
A: DealID         B: EmployerID      C: CandidateID    D: JobID
E: Service Fee (USD) F: Amount Paid (USD) G: Amount Due (USD) H: Payment Status
I: Invoice Date   J: Payment Date    K: COO Approved   L: Notes
```

### Tab 6: Tasks — Column Headers (Row 1)

```
A: TaskID         B: Assigned To     C: Task Title     D: Priority
E: Related Record F: Due Date        G: Status         H: Notes
I: Created Date   J: Completed Date
```

### Tab 7: Dashboard — Set Up as KPI View

- Column A = Metric labels
- Column B = Formula values (see Section 3)
- Add charts using **Insert → Chart** linked to Dashboard data

### Formatting Best Practices

- Freeze Row 1 on all tabs: **View → Freeze → 1 row**
- Apply alternating row colors for readability
- Set column widths: ID columns = 120px, Name/Text = 200px, Date = 120px
- Enable **Data Validation** on Status columns:
  - Master Data K: `New, Screened, Approved, Processing, Visa Applied, Deployed, Complete, Rejected`
  - Employers I: `Lead, Contacted, Active, Closed, Lost`
  - Deals H: `Open, Matching, Submitted, Interview, Offer Made, Closed, Paid`

---

## 3. Dashboard Formulas

Set up the **Dashboard** tab with the following layout. Column A = Label, Column B = Formula.

| Row | Label (Column A) | Formula (Column B) |
|-----|------------------|--------------------|
| 2 | Total Candidates | `=COUNTA('Master Data'!A2:A)` |
| 3 | New Applications | `=COUNTIF('Master Data'!K2:K,"New")` |
| 4 | Screened | `=COUNTIF('Master Data'!K2:K,"Screened")` |
| 5 | Approved | `=COUNTIF('Master Data'!K2:K,"Approved")` |
| 6 | Deployed | `=COUNTIF('Master Data'!K2:K,"Deployed")` |
| 8 | Total Employers | `=COUNTA('Employers'!A2:A)` |
| 9 | Active Employers | `=COUNTIF('Employers'!I2:I,"Active")` |
| 11 | Open Job Requests | `=COUNTIF('Job Requests'!I2:I,"Open")` |
| 13 | Total Deals | `=COUNTA('Deals'!A2:A)` |
| 14 | Total Service Fees (USD) | `=SUM('Deals'!E2:E)` |
| 15 | Total Amount Collected (USD) | `=SUM('Deals'!F2:F)` |
| 16 | Outstanding Balance (USD) | `=SUMIF('Deals'!H2:H,"<>Paid",'Deals'!G2:G)` |
| 17 | Payment Conversion Rate | `=IFERROR(COUNTIF('Deals'!H2:H,"Paid")/COUNTA('Deals'!A2:A),0)` |
| 18 | Average AI Score | `=IFERROR(AVERAGEIF('Master Data'!L2:L,"<>",'Master Data'!L2:L),0)` |

### Conditional Formatting Rules (Master Data — Column K)

1. Select column K on the Master Data tab.
2. Go to **Format → Conditional Formatting**.
3. Add these rules in order:

| Condition | Background Color | Text Color |
|-----------|-----------------|------------|
| Text is exactly `Rejected` | Red `#FF0000` | White |
| Text is exactly `New` | Yellow `#FFF176` | Black |
| Text contains `Screening` | Yellow `#FFF9C4` | Black |
| Text is exactly `Approved` | Green `#66BB6A` | White |
| Text is exactly `Deployed` | Dark Green `#2E7D32` | White |
| Text is exactly `Processing` | Light Blue `#90CAF9` | Black |
| Text is exactly `Visa Applied` | Blue `#42A5F5` | White |
| Text is exactly `Complete` | Teal `#00897B` | White |

---

## 4. Zapier Setup Overview

Create a Zapier account at [zapier.com](https://zapier.com). Connect the following apps under **My Apps**:
Google Sheets, Google Forms, Gmail, OpenAI, WATI (WhatsApp), Trello (or Notion).

| Zap # | Name | Trigger App | Trigger Event | Primary Action |
|-------|------|-------------|---------------|----------------|
| Zap 01 | Worker Form → Master Data | Google Forms | New Response | Create row in Master Data |
| Zap 02 | New Candidate → Auto-Reply | Google Sheets | New Row (Master Data) | WATI: Send WhatsApp message |
| Zap 03 | AI Scoring Pipeline | Google Sheets | New Row (Master Data) | OpenAI: Score candidate → Update row |
| Zap 04 | Team Notification | Google Sheets | New Row (Master Data) | Gmail/WhatsApp: Notify recruiter |
| Zap 05 | Create Recruiter Task | Google Sheets | New Row (Master Data) | Trello/Notion: Create task card |
| Zap 06 | Employer Form → CRM + COO Alert | Google Forms | New Response (Employer Form) | Add to Employers sheet + Email COO |

> Full step-by-step Zap configuration is documented in [`AUTOMATION_GUIDE.md`](./AUTOMATION_GUIDE.md).

---

## 5. OpenAI Integration

### Prerequisites

- OpenAI account at [platform.openai.com](https://platform.openai.com)
- API key generated (starts with `sk-...`) — store securely, never share publicly
- Zapier Starter plan or above (required for multi-step Zaps)

### Setup Steps

1. Log in to [platform.openai.com](https://platform.openai.com).
2. Go to **API Keys → Create new secret key**. Name it `Kingken-Zapier` and copy it.
3. In Zapier, go to **My Apps → Add connection → OpenAI**.
4. Paste the API key when prompted and save.
5. In Zap 03, configure the OpenAI action:
   - **Model:** `gpt-4o-mini` (cost-efficient for scoring)
   - **Max Tokens:** 500
   - **Temperature:** 0.3 (consistent, deterministic scoring)
6. Use the exact prompt template documented in [`AI_SYSTEM_GUIDE.md`](./AI_SYSTEM_GUIDE.md).
7. Parse the JSON response in Zapier using the **Formatter → JSON → Explode JSON** action.
8. Write `score` field to column L (AI_Score) and `summary` to column M (AI_Summary).

### Monthly Cost Estimate

| Usage Level | Candidates/Month | Est. API Cost |
|-------------|-----------------|---------------|
| Low | 100 | ~$2–5 |
| Medium | 500 | ~$10–20 |
| High | 2,000 | ~$40–80 |

---

## 6. WhatsApp Business API Setup

### Option A: WATI (Recommended for MVP)

1. Sign up at [wati.io](https://wati.io) — choose the Starter or Growth plan.
2. Submit your WhatsApp Business number (+96569048174) for verification.
3. Connect to **Facebook Business Manager** (required by Meta for API access):
   - Go to [business.facebook.com](https://business.facebook.com)
   - Verify your business and phone number
4. Submit message templates for Meta approval (approval takes 24–48 hours):

| Template Name | Category | Purpose |
|---------------|----------|---------|
| `worker_acknowledgment` | Utility | Confirm application received |
| `employer_followup` | Utility | Notify employer of registration |
| `status_update` | Utility | Update candidate on pipeline stage |
| `interview_invitation` | Utility | Invite candidate to interview |

5. In the WATI dashboard, configure **Keyword Automation**:
   - Keyword `APPLY` → Start worker registration flow
   - Keyword `HIRE` → Start employer registration flow
   - Keyword `FAQ` → Send FAQ menu message
6. Copy the WATI API endpoint and API key for Zapier integration.

### Option B: Twilio WhatsApp (Advanced)

1. Sign up at [twilio.com](https://twilio.com).
2. Navigate to **Messaging → WhatsApp**.
3. Use the sandbox for testing or apply for full WhatsApp Business API access.
4. Integrate via Zapier's Twilio app connection.

> Full bot scripts and all WATI message templates are in [`WHATSAPP_BOT_GUIDE.md`](./WHATSAPP_BOT_GUIDE.md).

---

## 7. Website Setup Options

### Platform Comparison

| Feature | Wix | WordPress | Webflow |
|---------|-----|-----------|---------|
| Ease of use | Excellent | Moderate | Good |
| Monthly cost | $17–35 | $10–30 (hosting) | $14–39 |
| Google Forms embed | Yes | Yes | Yes |
| WhatsApp widget | Yes | Yes | Yes |
| SEO capability | Good | Excellent | Excellent |
| E-commerce | Yes | Yes | Yes |
| Custom domain | Yes | Yes | Yes |
| Launch time | 1 day | 2–3 days | 2–4 days |
| **Recommended for MVP** | Yes | Alternative | Alternative |

### Required Pages

1. **Home** — Hero, stats, how it works, CTA buttons
2. **About Us** — Company story, mission, team
3. **For Workers** — Benefits, embedded Worker Form, requirements
4. **For Employers** — Benefits, embedded Employer Form, pricing
5. **Jobs Board** — Available positions by country
6. **Apply Now** — Standalone Worker Form embed
7. **Contact Us** — Map, phone, email, WhatsApp button
8. **Privacy Policy** — GDPR/data privacy statement

### Wix Quick Start (MVP)

1. Go to [wix.com](https://wix.com) and sign up.
2. Choose **Business & Services** template category.
3. Use the Wix Editor to build pages listed above.
4. Connect domain: **Settings → Domains → Connect a Domain I Already Own** → `kingkenglobal.com.ng`.
5. Add Google Forms embed: **Add → Embed → Embed a Website** → paste Google Form URL.
6. Add WhatsApp chat widget: search Wix App Market for `WhatsApp Chat` or use HTML embed.

> Full website build instructions are in [`WEBSITE_GUIDE.md`](./WEBSITE_GUIDE.md).

---

## 8. Daily Reporting System

All team members submit a daily report by **6:00 PM** to the COO via the **Operations Daily** WhatsApp group.

### Report Template (Copy-Paste Ready)

```
📊 DAILY REPORT — [Name] — [Date DD/MM/YYYY]

1. Summary of Activities:
   -

2. Candidates Processed Today:
   - New: | Screened: | Approved: | Rejected:

3. Employer Contacts Made:
   -

4. Blockers / Issues:
   -

5. Plan for Tomorrow:
   -
```

### Accountability Rules

| Violation | Consequence |
|-----------|-------------|
| Report submitted late (after 6 PM) | Verbal reminder |
| First missed report | Noted in records |
| Second missed report | Written notice from COO |
| Third missed report | Formal warning issued |

> Full reporting templates and monthly KPI review format are in [`DAILY_REPORTING_SYSTEM.md`](./DAILY_REPORTING_SYSTEM.md).

---

## 9. Role Assignment and Team Permissions

### Google Sheets Access Matrix

| Role | Sheets Access | Master Data | Employers | Deals | Dashboard |
|------|--------------|-------------|-----------|-------|-----------|
| CEO | Owner | Full Edit | Full Edit | Full Edit | View |
| COO | Editor | Full Edit | Full Edit | Full Edit | View |
| Head of Recruitment | Editor | Full Edit | View | View | View |
| Head of Tech | Editor | Full Edit | Full Edit | Full Edit | Full Edit |
| Recruiters | Editor | Edit (own rows) | View | No | View |
| Country Managers | Commenter | Comment only | No | No | View |
| HR/Admin | Editor | Edit (limited) | No | No | View |

### How to Share the Spreadsheet

1. Open the spreadsheet in Google Sheets.
2. Click **Share** (top right corner).
3. Enter each team member's Gmail address.
4. Assign the correct permission level (Viewer / Commenter / Editor).
5. For sensitive columns (Deals), use **Protected Ranges**:
   - Go to **Data → Protect Sheets and Ranges**
   - Select the Deals tab → Restrict editing to COO and CEO only
6. Click **Done** and **Send** notifications.

---

## 10. Go-Live Checklist

### Phase 1: Foundation (Days 1–2)

- [ ] Google Workspace account created: `platform@kingkenglobal.com.ng`
- [ ] Worker Registration Form created, tested, and shareable link saved
- [ ] Employer Registration Form created, tested, and shareable link saved
- [ ] Master Database spreadsheet created with all 7 tabs
- [ ] Row 1 frozen on all tabs
- [ ] Data validation applied to all Status columns
- [ ] Conditional formatting applied to Master Data column K

### Phase 2: Automation (Days 3–5)

- [ ] Zapier account on Starter plan minimum
- [ ] Google Sheets, Forms, Gmail, OpenAI, WATI apps connected
- [ ] Zap 01: Worker Form → Master Data — tested with dummy submission
- [ ] Zap 02: Auto-reply to worker — WhatsApp message received within 60s
- [ ] Zap 03: AI scoring — score written to column L
- [ ] Zap 04: Team notification sent to recruiter
- [ ] Zap 05: Task created in Trello/Notion
- [ ] Zap 06: Employer form → Employers tab + COO emailed

### Phase 3: AI & Bot (Days 6–7)

- [ ] OpenAI API key created and connected to Zapier
- [ ] AI scoring tested — valid JSON returned for 3 test candidates
- [ ] WATI account created, number verified
- [ ] 4 message templates submitted for Meta approval
- [ ] Keyword automations configured: APPLY, HIRE, FAQ
- [ ] Worker bot flow tested end-to-end (name → phone → position → CV → thank you)
- [ ] Employer bot flow tested end-to-end

### Phase 4: Website & Business (Days 8–9)

- [ ] Website live with all 8 required pages
- [ ] Domain connected: `kingkenglobal.com.ng`
- [ ] SSL certificate active (HTTPS lock showing in browser)
- [ ] Google Forms embedded on For Workers and For Employers pages
- [ ] WhatsApp chat widget installed and linking to +96569048174
- [ ] Google Analytics (GA4) property created and tracking code installed
- [ ] All 14 Dashboard formulas entered and showing values
- [ ] All team members added to Google Sheets with correct permissions

### Phase 5: Testing (Days 10–11)

- [ ] End-to-end test: 3 worker applications processed from form to AI score
- [ ] End-to-end test: 1 employer registration processed to COO notification
- [ ] Verify WhatsApp auto-replies arrive within 60 seconds
- [ ] Verify all pipeline stages work in Sheets
- [ ] Team briefed on daily reporting format
- [ ] Trello/Notion board confirmed accessible to all recruiters

### Phase 6: Soft Launch (Days 12–14)

- [ ] First 10 real worker applications received
- [ ] First 3 employer contacts made via direct outreach
- [ ] Facebook awareness ad created and running
- [ ] Daily reporting started and first reports received
- [ ] Weekly team meeting recurring invite sent
- [ ] First deal recorded in Deals tab

---

*Maintained by: Head of Tech | Contact: info@kingkenglobal.com.ng | https://www.kingkenglobal.com.ng*
