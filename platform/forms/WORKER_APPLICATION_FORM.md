# Worker Application Form — Field Specification
# Kingken Global Recruitment Platform

**Form Name:** Kingken Global — Worker Job Application
**Platform:** Google Forms
**Purpose:** Capture all candidate details required for screening, AI scoring, and placement matching
**Data destination:** Google Sheets → Master Data sheet (via Zapier Zap-01 or Apps Script `migrate-form-to-master.gs`)
**Company:** Kingken Global Travel Agency Ltd.

---

## Form Header

**Title:** Apply for International Jobs — Kingken Global Travel Agency Ltd

**Description text:**
```
Welcome! 🌍

Kingken Global Travel Agency Ltd connects skilled African workers with verified employers in Kuwait, UAE, Qatar, and Saudi Arabia.

Completing this form takes approximately 5–10 minutes. Please fill in all required fields accurately.

After submitting, our team will review your application and contact you within 2–3 business days via WhatsApp or phone.

📧 Questions? Contact us: info@kingkenglobal.com.ng
📱 WhatsApp: +96569048174
🌐 www.kingkenglobal.com.ng
```

---

## Form Sections and Fields

### Section 1: Personal Information

---

**Field 1.1 — Full Name**
- **Type:** Short answer (text)
- **Required:** Yes
- **Placeholder:** e.g. Amara Johnson
- **Validation:** Response must be at least 3 characters; no purely numeric values
- **Maps to:** Master Data Column C (FullName)

---

**Field 1.2 — WhatsApp Phone Number**
- **Type:** Short answer (text)
- **Required:** Yes
- **Placeholder:** e.g. +2348012345678 (include country code)
- **Description:** *This is the number we will use to contact you. Include your country code (e.g. +234 for Nigeria, +254 for Kenya, +233 for Ghana).*
- **Validation:** Regex pattern — must start with `+` followed by 7–15 digits: `^\+[0-9]{7,15}$`
- **Maps to:** Master Data Column D (Phone)

---

**Field 1.3 — Country of Origin / Nationality**
- **Type:** Dropdown (multiple choice)
- **Required:** Yes
- **Options:**
  - Nigeria
  - Ghana
  - Kenya
  - Ethiopia
  - Uganda
  - Tanzania
  - Cameroon
  - Senegal
  - Other
- **Maps to:** Master Data Column E (Country)

---

**Field 1.4 — Date of Birth**
- **Type:** Short answer (text) or Date field
- **Required:** Yes
- **Placeholder:** YYYY-MM-DD (e.g. 1995-06-15)
- **Validation:** Must be a date; applicant must be at least 21 years old
- **Maps to:** Stored in Notes or a dedicated DOB column; used for age verification

---

**Field 1.5 — Gender**
- **Type:** Multiple choice
- **Required:** Yes
- **Options:**
  - Male
  - Female
  - Prefer not to say
- **Maps to:** Notes or dedicated column

---

**Field 1.6 — Current City / State of Residence**
- **Type:** Short answer (text)
- **Required:** Yes
- **Placeholder:** e.g. Lagos, Nigeria
- **Maps to:** Notes column or dedicated field

---

### Section 2: Job Preference

---

**Field 2.1 — What position are you applying for?**
- **Type:** Dropdown (multiple choice)
- **Required:** Yes
- **Options:**
  - Domestic Worker / Housemaid
  - Driver (personal or commercial)
  - Security Guard
  - Cleaner (residential or commercial)
  - Nanny / Childcare Worker
  - Caregiver (elderly care)
  - Cook / Chef
  - Waiter / Waitress
  - Office Assistant / Receptionist
  - Construction Worker / Labourer
  - Factory Worker
  - Other (specify below)
- **Maps to:** Master Data Column F (Position)

---

**Field 2.2 — If "Other" — please specify your position**
- **Type:** Short answer (text)
- **Required:** No (only if "Other" selected in 2.1)
- **Logic:** Show this field only when "Other (specify below)" is selected in Field 2.1
- **Maps to:** Appended to Master Data Column F (Position)

---

**Field 2.3 — Preferred destination country**
- **Type:** Checkboxes (select all that apply)
- **Required:** Yes (at least one)
- **Options:**
  - Kuwait
  - UAE (Dubai)
  - UAE (Abu Dhabi)
  - UAE (Sharjah)
  - Qatar
  - Saudi Arabia
  - Open to any destination
- **Maps to:** Notes column

---

**Field 2.4 — Years of experience in this field**
- **Type:** Multiple choice
- **Required:** Yes
- **Options:**
  - Less than 1 year
  - 1–2 years
  - 3–5 years
  - 5–10 years
  - More than 10 years
- **Maps to:** Master Data Column G (ExperienceYears) — mapped to numeric: <1→0, 1-2→2, 3-5→4, 5-10→7, >10→11

---

**Field 2.5 — Expected monthly salary (USD)**
- **Type:** Multiple choice
- **Required:** No
- **Options:**
  - $250 – $350 (entry level)
  - $350 – $500 (standard)
  - $500 – $700 (experienced)
  - $700+ (highly experienced)
  - Negotiable / Open to offer
- **Maps to:** Notes column

---

### Section 3: Documents & Qualifications

---

**Field 3.1 — Do you have a valid passport?**
- **Type:** Multiple choice
- **Required:** Yes
- **Options:**
  - Yes — my passport is valid (more than 6 months remaining)
  - Yes — but it expires within 6 months (needs renewal)
  - Yes — but it is expired
  - No — I do not have a passport yet
  - No — I am in the process of applying
- **Maps to:** Master Data Column H (PassportAvailable)

---

**Field 3.2 — Passport expiry date (if applicable)**
- **Type:** Short answer (text)
- **Required:** No (only if passport exists)
- **Placeholder:** YYYY-MM-DD
- **Logic:** Show only when Field 3.1 is "Yes (valid)" or "Yes (expires within 6 months)"
- **Maps to:** Notes column

---

**Field 3.3 — Do you have a CV / Resume?**
- **Type:** Multiple choice
- **Required:** Yes
- **Options:**
  - Yes — I will upload it below
  - Yes — I can send it by WhatsApp or email
  - No — I don't have one yet
- **Maps to:** Determines whether CV upload field is shown

---

**Field 3.4 — Upload your CV / Resume (optional)**
- **Type:** File upload
- **Required:** No
- **Accepted formats:** PDF, DOC, DOCX
- **Max file size:** 10 MB
- **Description:** *Upload your CV as a PDF or Word document. If you cannot upload now, send it to info@kingkenglobal.com.ng with your full name in the subject line.*
- **Maps to:** Master Data Column I (CV_Link) — Google Drive link auto-generated

---

**Field 3.5 — Do you have a medical fitness certificate?**
- **Type:** Multiple choice
- **Required:** Yes
- **Options:**
  - Yes — I have a current medical certificate
  - No — but I am willing to get one
  - No — I have a medical condition that may affect work
- **Maps to:** Notes column; flags for Head of Legal review

---

**Field 3.6 — Do you have a police clearance certificate?**
- **Type:** Multiple choice
- **Required:** Yes
- **Options:**
  - Yes — I have a current clearance certificate
  - No — but I can obtain one
  - No — I have a criminal record (will be reviewed case by case)
- **Maps to:** Notes column

---

### Section 4: Previous Employment

---

**Field 4.1 — Have you worked abroad before?**
- **Type:** Multiple choice
- **Required:** Yes
- **Options:**
  - Yes — I have worked in a Gulf country (Kuwait, UAE, Qatar, Saudi Arabia)
  - Yes — I have worked abroad, but not in the Gulf
  - No — this will be my first time working abroad
- **Maps to:** Notes column; used in AI scoring

---

**Field 4.2 — Previous employers or countries worked in**
- **Type:** Paragraph (long answer)
- **Required:** No
- **Placeholder:** e.g. "Worked as a Domestic Worker in Kuwait for 2 years (2022–2024) with Al-Khalid family"
- **Logic:** Show only when Field 4.1 = "Yes"
- **Maps to:** Notes column

---

**Field 4.3 — Do you have any professional certifications?**
- **Type:** Checkboxes (select all that apply)
- **Required:** No
- **Options:**
  - First Aid / Basic Life Support
  - Food Handling Certificate
  - Security Guard License
  - Driving License (standard)
  - Driving License (heavy vehicle / HGV)
  - Healthcare / Nursing Certificate
  - Hospitality / Hotel Management Certificate
  - Trade or Technical Certificate
  - None
- **Maps to:** Notes column; used in AI scoring

---

### Section 5: Additional Information

---

**Field 5.1 — Languages spoken**
- **Type:** Checkboxes (select all that apply)
- **Required:** Yes
- **Options:**
  - English
  - Arabic
  - French
  - Swahili
  - Hausa
  - Yoruba
  - Igbo
  - Other
- **Maps to:** Notes column

---

**Field 5.2 — When are you available to start?**
- **Type:** Multiple choice
- **Required:** Yes
- **Options:**
  - Immediately (within 2 weeks)
  - Within 1 month
  - Within 2–3 months
  - Within 3–6 months
  - Not sure — depends on offer
- **Maps to:** Notes column

---

**Field 5.3 — How did you hear about Kingken Global?**
- **Type:** Multiple choice
- **Required:** Yes
- **Options:**
  - Facebook / Instagram
  - WhatsApp group
  - Friend or family referral
  - Google search
  - Job fair / community event
  - Other
- **Maps to:** Notes column; used for marketing attribution

---

**Field 5.4 — Do you agree to our terms?**
- **Type:** Checkboxes (single checkbox)
- **Required:** Yes
- **Label:** I confirm that all information provided is accurate and truthful. I consent to Kingken Global Travel Agency Ltd processing my personal data for recruitment purposes in accordance with applicable data protection laws.
- **Validation:** Must be checked to submit
- **Maps to:** Confirmation stored in Notes

---

## Confirmation Message (Post-Submission)

```
✅ Application Received!

Thank you, your application has been submitted to Kingken Global Travel Agency Ltd.

What happens next:
1. Our AI system will score your application within minutes
2. A recruiter will review your profile within 1–2 business days
3. If approved, you will be contacted by WhatsApp to verify your details and discuss available positions

For urgent enquiries:
📱 WhatsApp: +96569048174
📧 Email: info@kingkenglobal.com.ng
🌐 www.kingkenglobal.com.ng

We look forward to helping you secure your international job! 🌍
```

---

## Form Configuration Settings

| Setting | Value |
|---------|-------|
| Collect email addresses | Optional (not required) |
| Send response copy to respondent | Yes (if email provided) |
| Allow response editing | No |
| Limit to 1 response | No (allow resubmission only if COO permits) |
| Progress bar | Enabled (5 sections) |
| Shuffle question order | No |
| Language | English |
| Form theme | Kingken Global brand colors (Blue #1565C0, White) |
| Response destination | Google Sheets — "Form Responses" tab |

---

## Zapier / Apps Script Integration

**Trigger:** New Google Form submission → Google Sheets "Form Responses" tab

**Action (Apps Script — `migrate-form-to-master.gs`):**
1. Read new row from Form Responses
2. Generate `KENG-YYYYMMDD-NNNN` CandidateID
3. Check for duplicate phone number
4. Write clean row to Master Data sheet
5. Trigger AI scoring via Zapier Zap-03 (OpenAI)
6. Send WhatsApp acknowledgment via WATI (Template: `worker_acknowledgment`)

---

*Maintained by: Head of Tech | Contact: info@kingkenglobal.com.ng | https://www.kingkenglobal.com.ng*
