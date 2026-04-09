# Employer Request Form – Complete Specification

**Form Title:** Kingken Global – Employer / Company Request Form  
**Purpose:** Collect worker placement requests from employers in the Gulf region.  
**Platform:** Google Forms  
**Company:** Kingken Global Travel Agency Ltd  
**Contact:** +96569048174 | info@kingkenglobal.com.ng | https://www.kingkenglobal.com.ng

---

## Form Overview

| Property | Value |
|----------|-------|
| Title | Kingken Global – Employer / Company Request Form |
| Description | Request skilled and unskilled workers for your company. Kingken Global specialises in recruiting qualified workers from Africa and Asia for Gulf-region companies. Please complete this form and our team will contact you within 24 hours. |
| Total Sections | 5 |
| Estimated Completion Time | 8–12 minutes |
| Response Collection | Google Sheets (linked) |
| Auto-Response | Enabled (via Zapier) |

---

## Section 1 – Company Information

**Section Title:** Company Information  
**Section Description:** Please provide your company's official details.

| # | Field Name | Type | Required | Validation / Options |
|---|-----------|------|----------|---------------------|
| 1 | Company / Organisation Name | Short answer | ✅ Yes | Minimum 2 characters |
| 2 | Country of Operation | Dropdown | ✅ Yes | Kuwait / UAE / Qatar / Saudi Arabia / Bahrain / Oman / Other |
| 3 | Industry / Sector | Dropdown | ✅ Yes | Construction / Cleaning / Hospitality / Logistics / Healthcare / Manufacturing / Security / Oil & Gas / Other |
| 4 | Company Registration Number (if applicable) | Short answer | ⬜ Optional | CR number or trade licence number |
| 5 | Company Website | Short answer | ⬜ Optional | e.g., https://www.yourcompany.com |

---

## Section 2 – Contact Person Details

**Section Title:** Contact Person Details  
**Section Description:** Who should our team contact regarding this request?

| # | Field Name | Type | Required | Validation / Options |
|---|-----------|------|----------|---------------------|
| 6 | Contact Person Full Name | Short answer | ✅ Yes | Full name of the HR manager or authorised contact |
| 7 | Job Title / Position | Short answer | ✅ Yes | e.g., HR Manager, Operations Director, CEO |
| 8 | Phone Number (with country code) | Short answer | ✅ Yes | E.164 format: e.g., +96565001234 |
| 9 | WhatsApp Number | Short answer | ✅ Yes | Same or different from phone — used for quick communication |
| 10 | Email Address | Short answer | ✅ Yes | Professional email preferred |
| 11 | Preferred Contact Method | Multiple choice | ✅ Yes | WhatsApp / Email / Phone Call |
| 12 | Best Time to Contact | Multiple choice | ⬜ Optional | Morning (8am–12pm) / Afternoon (12pm–5pm) / Evening (5pm–8pm) |

---

## Section 3 – Worker Requirements

**Section Title:** Worker Requirements  
**Section Description:** Tell us exactly what type of workers you need.

| # | Field Name | Type | Required | Validation / Options |
|---|-----------|------|----------|---------------------|
| 13 | Job Title / Position Required | Short answer | ✅ Yes | e.g., Cleaning Supervisor, Construction Labour, Housekeeping Staff |
| 14 | Number of Workers Required | Short answer | ✅ Yes | Numeric only; minimum 1 |
| 15 | Required Nationalities (if any preference) | Checkboxes | ⬜ Optional | Nigerian / Ghanaian / Filipino / Indian / Pakistani / Bangladeshi / Kenyan / Ethiopian / No Preference |
| 16 | Gender Requirement | Multiple choice | ✅ Yes | Male only / Female only / Both / No preference |
| 17 | Age Range | Multiple choice | ⬜ Optional | 18–25 / 25–35 / 35–45 / No preference |
| 18 | Minimum Work Experience Required | Multiple choice | ✅ Yes | No experience needed / 1+ year / 2+ years / 3+ years / 5+ years |
| 19 | English Language Requirement | Multiple choice | ✅ Yes | Not required / Basic / Intermediate / Fluent |
| 20 | Any Specific Skills or Certifications Required | Paragraph | ⬜ Optional | e.g., forklift licence, NEBOSH, food handling certificate |

---

## Section 4 – Contract & Commercial Terms

**Section Title:** Contract & Commercial Terms  
**Section Description:** Please provide details about the employment terms so we can match suitable candidates.

| # | Field Name | Type | Required | Validation / Options |
|---|-----------|------|----------|---------------------|
| 21 | Monthly Salary Offered (USD) | Short answer | ✅ Yes | Numeric value in USD |
| 22 | Are accommodation and food provided? | Multiple choice | ✅ Yes | Both provided / Accommodation only / Food only / Neither / Allowance given instead |
| 23 | Contract Duration | Multiple choice | ✅ Yes | 6 months / 1 year / 2 years / Flexible |
| 24 | Required Start Date | Date | ✅ Yes | Earliest desired start date for workers |
| 25 | Are you willing to pay a recruitment fee? | Multiple choice | ✅ Yes | Yes / Open to discussion / What is your fee structure? |
| 26 | How many times have you hired through an agency before? | Multiple choice | ⬜ Optional | This is our first time / 1–3 times / More than 3 times |

---

## Section 5 – Additional Information

**Section Title:** Additional Information  
**Section Description:** Any other information that will help us serve you better.

| # | Field Name | Type | Required | Validation / Options |
|---|-----------|------|----------|---------------------|
| 27 | Describe the Work Environment | Paragraph | ⬜ Optional | e.g., outdoor/indoor, physical demands, shift patterns |
| 28 | Do you require a specific document checklist from workers? | Multiple choice | ⬜ Optional | Yes – we will send our checklist / No – standard documents are fine |
| 29 | How did you hear about Kingken Global? | Multiple choice | ⬜ Optional | WhatsApp / LinkedIn / Website / Referral / Google Search / Other |
| 30 | Additional Notes or Special Requirements | Paragraph | ⬜ Optional | Any other information relevant to your request |
| 31 | Agreement | Checkbox | ✅ Yes | "I confirm that I am authorised to make this request on behalf of the company, and I consent to Kingken Global Travel Agency Ltd contacting me regarding this submission." |

---

## Form Creation Steps

### Step 1 – Create the Form
1. Go to https://forms.google.com
2. Click "+" (Blank form)
3. Title: `Kingken Global – Employer / Company Request Form`
4. Add the description as shown in Form Overview

### Step 2 – Add All 5 Sections
1. Click the "Add section" icon in the right toolbar for each new section
2. Title each section as specified above
3. Add questions to each section in order

### Step 3 – Configure Required Fields
1. Toggle "Required" on for all ✅ marked fields
2. For numerical fields (workers required, salary), add response validation:
   - Click the three dots (⋮) → "Response validation"
   - Choose "Number" → "Greater than" → 0

### Step 4 – Link to Google Sheet
1. Click the "Responses" tab
2. Click the Google Sheets icon
3. Select "Create a new spreadsheet"
4. Name it: `Employer Request Responses`
5. Click "Create"

### Step 5 – Customise Confirmation Message
1. Click the Settings gear icon → "Presentation"
2. Set confirmation message:
```
Thank you for your request! ✅

We have received your worker placement request. A Kingken Global representative will contact you within 24 hours.

Your request details:
- Company: [your company name]
- Position: [job title]
- Workers Needed: [number]

For urgent matters:
📞 WhatsApp: +96569048174
📧 Email: info@kingkenglobal.com.ng
🌐 Website: www.kingkenglobal.com.ng
```

### Step 6 – Share the Form
1. Click "Send" → copy the link
2. Share on LinkedIn, WhatsApp business groups, and via email campaigns

---

## CRM Integration via Zapier

### Zap: Employer Request Form → Employers Sheet + Job Requests Sheet

**Trigger:** Google Forms – New Response (Employer Request Form)

**Action 1 – Format Date and Generate IDs:**
- Use Zapier Formatter → Date/Time → format current date as YYYYMMDD
- Use Formatter → Numbers → create sequential ID

**Action 2 – Create Row in Employers Sheet:**
| Form Field | Sheet Column |
|-----------|-------------|
| Auto-generated | A: `EMP-{{YYYYMMDD}}-{{ID}}` |
| Company Name | B: Company Name |
| Country of Operation | C: Country |
| Industry / Sector | D: Industry |
| Contact Person Full Name | E: Contact Person |
| Phone Number | F: Contact Phone |
| Email Address | G: Contact Email |
| WhatsApp Number | H: WhatsApp Number |
| (Hardcoded) | I: Status = "Lead" |

**Action 3 – Create Row in Job Requests Sheet:**
| Form Field | Sheet Column |
|-----------|-------------|
| Auto-generated | A: `JOB-{{YYYYMMDD}}-{{ID}}` |
| Employer ID from Action 2 | B: Employer ID |
| (Auto via VLOOKUP) | C: Employer Name |
| Job Title / Position Required | D: Job Title |
| Number of Workers Required | E: Workers Required |
| Monthly Salary Offered | F: Salary USD |
| Country of Operation | G: Location |
| Contract Duration (number part) | H: Contract Duration |
| Today's date | I: Date Submitted |
| Required Start Date | J: Required Start Date |
| (Hardcoded) | K: Status = "Open" |

**Action 4 – Send Auto-Response Email (see below):**
- Use Gmail app → Send email to the employer's email

**Action 5 – Notify Team via WhatsApp:**
- Use WATI app → Send message to COO/Operations Manager WhatsApp

---

## Auto-Response Email Template

**Sent to:** Employer's email address (from field 10)  
**Sent via:** Zapier → Gmail (or SMTP)  
**Sent at:** Immediately upon form submission

---

**Subject:** We've Received Your Worker Request – Kingken Global ✅

---

Dear {{Contact Person Full Name}},

Thank you for reaching out to **Kingken Global Travel Agency Ltd**. We have received your worker placement request and our team is already reviewing your requirements.

**Your Request Summary:**
- **Company:** {{Company Name}}
- **Position Required:** {{Job Title / Position Required}}
- **Number of Workers:** {{Number of Workers Required}}
- **Start Date:** {{Required Start Date}}
- **Country:** {{Country of Operation}}

**What Happens Next:**

1. ✅ Our operations team will review your requirements within **24 hours**
2. 📋 We will send you a formal service agreement and fee structure
3. 👥 Matching begins immediately after agreement is signed
4. 📞 You will receive an initial shortlist within **7–14 business days**

**Need to speak with us urgently?**

📞 WhatsApp: +96569048174  
📧 Email: info@kingkenglobal.com.ng  
🌐 Website: https://www.kingkenglobal.com.ng

We look forward to building a successful working relationship with {{Company Name}}.

Warm regards,

**The Kingken Global Team**  
Kingken Global Travel Agency Ltd  
+96569048174 | info@kingkenglobal.com.ng  
https://www.kingkenglobal.com.ng

---
*This is an automated response. Our team will follow up personally within 24 hours.*

---

## Form Maintenance

- **Review submitted responses:** Check Employer Request Responses sheet daily
- **Qualify leads:** COO reviews each new employer submission within 24 hours
- **Update dropdown options:** Modify industry/country lists as business expands
- **Monitor conversion:** Track how many form submissions convert to active employers (Lead → Active in Employers sheet)
- **A/B testing:** Periodically test different form descriptions to improve completion rates
