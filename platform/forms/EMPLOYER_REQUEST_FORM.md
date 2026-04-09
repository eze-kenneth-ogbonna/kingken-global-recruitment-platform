# Employer Hiring Request Form — Field Specification
# Kingken Global Recruitment Platform

**Form Name:** Kingken Global — Employer Hiring Request
**Platform:** Google Forms
**Purpose:** Capture all employer requirements for worker placement — triggers CRM entry and COO notification
**Data destination:** Google Sheets → Employers Database and Job Requests sheets (via Zapier Zap-06)
**Company:** Kingken Global Travel Agency Ltd.

---

## Form Header

**Title:** Hire International Workers — Kingken Global Travel Agency Ltd

**Description text:**
```
Welcome! 🌍

Kingken Global Travel Agency Ltd specializes in placing verified, trained African workers with employers in Kuwait, UAE, Qatar, and Saudi Arabia.

Please complete this form with your hiring requirements. Our COO will contact you within 24 hours to confirm your request and provide a service proposal.

📧 Questions? Contact us: info@kingkenglobal.com.ng
📱 WhatsApp: +96569048174
🌐 www.kingkenglobal.com.ng
```

---

## Form Sections and Fields

### Section 1: Company Information

---

**Field 1.1 — Company / Organization Name**
- **Type:** Short answer (text)
- **Required:** Yes
- **Placeholder:** e.g. Al-Mansour Cleaning Services W.L.L.
- **Validation:** Minimum 3 characters
- **Maps to:** Employers Database Column B (Company Name)

---

**Field 1.2 — Country Where Your Company Is Based**
- **Type:** Dropdown (multiple choice)
- **Required:** Yes
- **Options:**
  - Kuwait
  - UAE — Dubai
  - UAE — Abu Dhabi
  - UAE — Sharjah
  - UAE — Other
  - Qatar
  - Saudi Arabia
  - Other Gulf / Middle East
  - Other (outside Middle East)
- **Maps to:** Employers Database Column C (Country)

---

**Field 1.3 — Industry / Sector**
- **Type:** Dropdown (multiple choice)
- **Required:** Yes
- **Options:**
  - Construction & Real Estate
  - Cleaning & Facilities Management
  - Hospitality & Hotels
  - Logistics & Transportation
  - Healthcare & Nursing
  - Private Household (domestic workers)
  - Retail
  - Manufacturing & Factory
  - Security Services
  - Catering & Food Services
  - Other
- **Maps to:** Employers Database Column D (Industry)

---

**Field 1.4 — Contact Person Full Name**
- **Type:** Short answer (text)
- **Required:** Yes
- **Placeholder:** e.g. Ahmed Al-Mansour
- **Description:** *The person our team will communicate with directly.*
- **Maps to:** Employers Database Column E (Contact Person)

---

**Field 1.5 — Contact Phone Number**
- **Type:** Short answer (text)
- **Required:** Yes
- **Placeholder:** e.g. +96512345678 (include country code)
- **Validation:** Regex — must start with `+` followed by 7–15 digits: `^\+[0-9]{7,15}$`
- **Maps to:** Employers Database Column F (Contact Phone)

---

**Field 1.6 — WhatsApp Number (if different from above)**
- **Type:** Short answer (text)
- **Required:** No
- **Placeholder:** e.g. +96599887766
- **Description:** *Leave blank if same as phone number above.*
- **Maps to:** Employers Database Column H (WhatsApp Number)

---

**Field 1.7 — Business Email Address**
- **Type:** Short answer (text)
- **Required:** Yes
- **Placeholder:** e.g. hr@almansour.com.kw
- **Validation:** Text must contain `@`
- **Maps to:** Employers Database Column G (Contact Email)

---

**Field 1.8 — Company Registration / License Number (optional)**
- **Type:** Short answer (text)
- **Required:** No
- **Placeholder:** e.g. KW-12345-2020
- **Description:** *Optional. Providing this helps us verify your business and expedites processing.*
- **Maps to:** Stored in Employers Database Notes (Column L)

---

### Section 2: Hiring Requirements

---

**Field 2.1 — What position(s) do you need to fill?**
- **Type:** Checkboxes (select all that apply)
- **Required:** Yes
- **Options:**
  - Domestic Worker / Housemaid
  - Driver (personal)
  - Driver (commercial / heavy vehicle)
  - Security Guard
  - Cleaner (residential)
  - Cleaner (commercial / facilities)
  - Nanny / Childcare Worker
  - Caregiver (elderly or disabled)
  - Cook / Chef
  - Waiter / Waitress
  - Receptionist / Office Assistant
  - Construction Worker / Mason
  - Labourer (general)
  - Factory Worker
  - Healthcare Aide / Nurse Assistant
  - Other (specify below)
- **Maps to:** Job Requests Column D (Job Title / Position)

---

**Field 2.2 — If "Other" — please specify the position(s)**
- **Type:** Short answer (text)
- **Required:** No
- **Logic:** Show only when "Other" selected in Field 2.1
- **Maps to:** Job Requests Column D

---

**Field 2.3 — Total number of workers required**
- **Type:** Multiple choice
- **Required:** Yes
- **Options:**
  - 1 worker
  - 2–5 workers
  - 6–10 workers
  - 11–20 workers
  - 21–50 workers
  - More than 50 workers
- **Maps to:** Job Requests Column E (Number of Workers Required) — mapped to numeric midpoint

---

**Field 2.4 — If more than 50 — please specify the exact number**
- **Type:** Short answer (text with number validation)
- **Required:** No
- **Logic:** Show only when "More than 50 workers" selected in Field 2.3
- **Validation:** Must be a whole number > 50
- **Maps to:** Job Requests Column E (override)

---

**Field 2.5 — Proposed monthly salary per worker (USD)**
- **Type:** Multiple choice
- **Required:** Yes
- **Options:**
  - $200 – $300
  - $300 – $400
  - $400 – $600
  - $600 – $800
  - $800+
  - Open to negotiation / not yet decided
- **Maps to:** Job Requests Column F (Salary USD) — mapped to numeric midpoint; "Not decided" → 0

---

**Field 2.6 — Preferred worker nationality / origin**
- **Type:** Checkboxes (select all that apply)
- **Required:** No
- **Options:**
  - Nigerian
  - Ghanaian
  - Kenyan
  - Ethiopian
  - Ugandan
  - Tanzanian
  - Cameroonian
  - No preference (any qualified African worker)
- **Maps to:** Job Requests Column M (Notes)

---

**Field 2.7 — Contract duration**
- **Type:** Multiple choice
- **Required:** Yes
- **Options:**
  - 6 months
  - 12 months (1 year)
  - 24 months (2 years)
  - 36 months (3 years)
  - Open-ended / flexible
- **Maps to:** Job Requests Column H (Contract Duration months) — mapped: 6=6, 12=12, 24=24, 36=36, flexible=24

---

**Field 2.8 — When do you need workers to start?**
- **Type:** Multiple choice
- **Required:** Yes
- **Options:**
  - As soon as possible (within 4 weeks)
  - Within 1–2 months
  - Within 2–3 months
  - Within 3–6 months
  - Flexible / no rush
- **Maps to:** Job Requests Column J (Required Start Date) — estimated from today's date

---

### Section 3: Specific Requirements

---

**Field 3.1 — Minimum education level required**
- **Type:** Multiple choice
- **Required:** Yes
- **Options:**
  - No education requirement
  - Basic literacy (read and write)
  - Primary school completion
  - Secondary school (O-level / high school)
  - Vocational / trade qualification
  - University degree
- **Maps to:** Job Requests Column M (Notes)

---

**Field 3.2 — Minimum years of experience required**
- **Type:** Multiple choice
- **Required:** Yes
- **Options:**
  - No experience required (willing to train)
  - At least 1 year
  - At least 2 years
  - At least 3–5 years
  - At least 5+ years
- **Maps to:** Job Requests Column M (Notes); also used in candidate matching AI criteria

---

**Field 3.3 — Language requirements**
- **Type:** Checkboxes (select all that apply)
- **Required:** Yes
- **Options:**
  - English (basic)
  - English (fluent)
  - Arabic (basic)
  - Arabic (fluent)
  - No language requirement
- **Maps to:** Job Requests Column M (Notes)

---

**Field 3.4 — Are there any physical requirements?**
- **Type:** Checkboxes (select all that apply)
- **Required:** No
- **Options:**
  - Must be physically fit for heavy lifting
  - Must be able to stand for long periods
  - Must have valid driving license
  - Must have medical fitness certificate
  - No special physical requirements
- **Maps to:** Job Requests Column M (Notes)

---

**Field 3.5 — Accommodation provided by employer?**
- **Type:** Multiple choice
- **Required:** Yes
- **Options:**
  - Yes — fully provided (accommodation + meals)
  - Yes — accommodation only
  - No — worker must arrange own accommodation
  - To be discussed
- **Maps to:** Job Requests Column M (Notes)

---

**Field 3.6 — Additional requirements or notes**
- **Type:** Paragraph (long answer)
- **Required:** No
- **Placeholder:** Any specific skills, certifications, physical attributes, or other requirements not covered above.
- **Maps to:** Job Requests Column M (Notes)

---

### Section 4: Agreement

---

**Field 4.1 — How did you hear about Kingken Global?**
- **Type:** Multiple choice
- **Required:** Yes
- **Options:**
  - Referral from another employer
  - WhatsApp message
  - Facebook / Instagram
  - LinkedIn
  - Google search
  - Industry contact / agent
  - Other
- **Maps to:** Employers Database Notes (Column L); marketing attribution

---

**Field 4.2 — Have you worked with Kingken Global before?**
- **Type:** Multiple choice
- **Required:** Yes
- **Options:**
  - Yes — we have placed workers with you before
  - No — this is our first enquiry
- **Maps to:** Employers Database Notes; flags for returning vs new employer

---

**Field 4.3 — Terms acknowledgment**
- **Type:** Checkboxes (single checkbox)
- **Required:** Yes
- **Label:** I confirm that my company is a legitimate registered business, that the information provided is accurate, and that I consent to being contacted by Kingken Global Travel Agency Ltd regarding this hiring request. I understand that service fees will be outlined in a formal proposal before any agreement is signed.
- **Maps to:** Confirmation stored in Notes

---

## Confirmation Message (Post-Submission)

```
✅ Hiring Request Received!

Thank you for your interest in Kingken Global Travel Agency Ltd.

What happens next:
1. Our COO will review your requirements within 2 hours (business days)
2. You will be contacted on WhatsApp within 24 hours to discuss your request
3. We will send a formal service proposal with fees, timelines, and next steps

For urgent matters, contact us directly:
📱 WhatsApp: +96569048174
📧 Email: info@kingkenglobal.com.ng
🌐 www.kingkenglobal.com.ng

We look forward to serving your workforce needs! 🤝
```

---

## Form Configuration Settings

| Setting | Value |
|---------|-------|
| Collect email addresses | Yes (required — business email) |
| Send response copy to respondent | Yes |
| Allow response editing | Yes (within 24 hours) |
| Limit to 1 response | No |
| Progress bar | Enabled (4 sections) |
| Language | English |
| Form theme | Kingken Global brand colors (Blue #1565C0, White) |
| Response destination | Google Sheets — "Employer Form Responses" tab |

---

## Zapier / Apps Script Integration (Zap-06)

**Trigger:** New Google Form submission → Google Sheets "Employer Form Responses" tab

**Action flow (Zapier Zap-06 — Employer CRM):**
1. Read new row from Employer Form Responses
2. Check if Employer already exists in Employers Database (match by email or phone)
3. If new employer: create row in Employers Database with Status = `Lead`, auto-generate `EMP-YYYYMMDD-NNNN`
4. Create row in Job Requests sheet with Status = `Open`, auto-generate `JOB-YYYYMMDD-NNNN`
5. Send confirmation email to employer (via SendGrid or Gmail)
6. Send WhatsApp notification to COO: "🚨 New Employer Lead: [Company Name] — [Position] × [Workers] — [Country]"
7. Create task in Tasks sheet: "Contact new employer [Company Name] within 24h — TASK priority: High"

---

## Access Control

- **Form URL:** Share only with verified employer contacts — do not publish publicly without COO approval
- **Response sheet:** Restricted to COO and Head of Tech
- **Employer data:** Handled in accordance with applicable data protection laws (NDPR, GDPR where applicable)

---

*Maintained by: COO | Contact: info@kingkenglobal.com.ng | https://www.kingkenglobal.com.ng*
