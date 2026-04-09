# Worker Application Form – Complete Specification

**Form Title:** Kingken Global – Worker Application Form  
**Purpose:** Collect worker applications for Gulf region job placements.  
**Platform:** Google Forms  
**Company:** Kingken Global Travel Agency Ltd  
**Contact:** +96569048174 | info@kingkenglobal.com.ng | https://www.kingkenglobal.com.ng

---

## Form Overview

| Property | Value |
|----------|-------|
| Title | Kingken Global – Worker Application Form |
| Description | Apply for job opportunities in Kuwait, UAE, Qatar, Saudi Arabia, and other Gulf countries. Please fill in all required fields accurately. Your information will be reviewed by our HR team within 48 hours. |
| Total Sections | 5 |
| Estimated Completion Time | 10–15 minutes |
| Response Collection | Google Sheets (linked) |
| File Upload | Enabled (for CV and documents) |

---

## Section 1 – Personal Information

**Section Title:** Personal Information  
**Section Description:** Please provide your accurate personal details.

| # | Field Name | Type | Required | Validation / Options |
|---|-----------|------|----------|---------------------|
| 1 | Full Name | Short answer | ✅ Yes | Minimum 2 characters; letters and spaces only |
| 2 | Date of Birth | Date | ✅ Yes | Must be 18 years or older |
| 3 | Gender | Multiple choice | ✅ Yes | Male / Female |
| 4 | Nationality | Short answer | ✅ Yes | e.g., Nigerian, Ghanaian, Filipino |
| 5 | Country of Residence | Dropdown | ✅ Yes | Nigeria / Ghana / Philippines / Kenya / Ethiopia / Uganda / Tanzania / Other |
| 6 | State / City | Short answer | ✅ Yes | e.g., Lagos, Accra |
| 7 | Phone Number (WhatsApp) | Short answer | ✅ Yes | Format: +[country code][number], e.g. +2348012345678 |
| 8 | Email Address | Short answer | ⬜ Optional | Valid email format |

---

## Section 2 – Passport & Travel Documents

**Section Title:** Passport & Travel Documents  
**Section Description:** Gulf employers require a valid passport and travel documents. Please provide accurate information.

| # | Field Name | Type | Required | Validation / Options |
|---|-----------|------|----------|---------------------|
| 9 | Do you have a valid passport? | Multiple choice | ✅ Yes | Yes – Valid / Yes – Expired / No – I don't have a passport |
| 10 | Passport Number | Short answer | ⬜ Optional | Required if passport exists |
| 11 | Passport Expiry Date | Date | ⬜ Optional | Should be at least 12 months from today |
| 12 | Do you have an existing visa to any Gulf country? | Multiple choice | ⬜ Optional | Yes / No |
| 13 | If yes, which country and what type of visa? | Short answer | ⬜ Optional | e.g., Kuwait Visit Visa, UAE Employment Visa |

**Conditional Logic:**
- Question 10, 11 → Show only if Q9 = "Yes – Valid" or "Yes – Expired"
- Question 13 → Show only if Q12 = "Yes"

---

## Section 3 – Work Experience & Skills

**Section Title:** Work Experience & Skills  
**Section Description:** Tell us about your work experience and skills. Be as specific as possible to improve your chances of matching.

| # | Field Name | Type | Required | Validation / Options |
|---|-----------|------|----------|---------------------|
| 14 | Desired Job Position | Checkboxes (multi-select) | ✅ Yes | Construction Worker / Cleaning Staff / Hospitality Staff / Security Guard / Driver / Healthcare Worker / Factory Worker / Electrician / Plumber / Welder / Other |
| 15 | Years of Experience in Desired Position | Multiple choice | ✅ Yes | Less than 1 year / 1–2 years / 3–5 years / 5–10 years / More than 10 years |
| 16 | Describe Your Experience | Paragraph | ✅ Yes | Minimum 30 characters |
| 17 | Education Level | Multiple choice | ✅ Yes | No formal education / Primary school / Secondary school / Vocational / Certificate / Diploma / Bachelor's Degree / Master's or above |
| 18 | Can you speak English? | Multiple choice | ✅ Yes | No / Basic / Intermediate / Fluent |
| 19 | Can you speak Arabic? | Multiple choice | ⬜ Optional | No / Basic / Intermediate / Fluent |
| 20 | Do you have any professional certifications? | Multiple choice | ✅ Yes | Yes / No |
| 21 | If yes, list your certifications | Short answer | ⬜ Optional | e.g., HUET, SafePass, NVQ Level 2 |

---

## Section 4 – Availability & Preferences

**Section Title:** Availability & Deployment Preferences  
**Section Description:** Let us know your preferred job conditions and availability.

| # | Field Name | Type | Required | Validation / Options |
|---|-----------|------|----------|---------------------|
| 22 | Preferred Country | Checkboxes (multi-select) | ✅ Yes | Kuwait / UAE / Qatar / Saudi Arabia / Bahrain / Oman / Open to any |
| 23 | Expected Monthly Salary (USD) | Multiple choice | ✅ Yes | Below $300 / $300–$500 / $500–$800 / $800–$1,200 / Above $1,200 |
| 24 | Are you available to start within 3 months? | Multiple choice | ✅ Yes | Yes / No – I need 3–6 months / No – More than 6 months |
| 25 | Contract Duration Preference | Multiple choice | ✅ Yes | 1 year / 2 years / Open to negotiation |
| 26 | Do you have any medical conditions that may affect work? | Multiple choice | ✅ Yes | No / Yes (will be reviewed by medical team) |
| 27 | Are you currently employed? | Multiple choice | ⬜ Optional | Yes / No |

---

## Section 5 – Documents Upload

**Section Title:** Document Upload  
**Section Description:** Please upload your CV and any supporting documents. Accepted formats: PDF, DOC, DOCX, JPG, PNG. Maximum size: 10 MB per file.

| # | Field Name | Type | Required | Validation / Options |
|---|-----------|------|----------|---------------------|
| 28 | Upload Your CV / Resume | File upload | ✅ Yes | Accepted types: PDF, DOC, DOCX; Max size: 10 MB |
| 29 | Upload Passport Photo Page (if available) | File upload | ⬜ Optional | Accepted types: PDF, JPG, PNG; Max size: 5 MB |
| 30 | Upload Any Certificates (if available) | File upload | ⬜ Optional | Accepted types: PDF, JPG, PNG; Multiple files allowed; Max size: 10 MB |
| 31 | How did you hear about Kingken Global? | Multiple choice | ⬜ Optional | WhatsApp / Facebook / Instagram / Friend / Agent / Website / Other |
| 32 | Any additional information you want to share? | Paragraph | ⬜ Optional | Free text |
| 33 | Agreement | Checkbox | ✅ Yes | "I confirm that the information provided is accurate and I consent to Kingken Global Travel Agency Ltd processing my personal data for recruitment purposes." |

---

## Form Creation Steps

### Step 1 – Create the Form
1. Go to https://forms.google.com
2. Click "+" (Blank form)
3. Title: `Kingken Global – Worker Application Form`
4. Description: (as shown in Form Overview above)

### Step 2 – Add Questions
1. Add each question in the order listed per section
2. Click "+" to add new questions
3. Click the section icon (≡) to add new sections
4. Set required/optional for each question using the toggle at the bottom of each field

### Step 3 – Set Up File Upload
1. For file upload fields, choose question type "File upload"
2. Allow specific file types (PDF, DOC, DOCX, JPG, PNG)
3. Set maximum number of files (1 or 5 as needed)
4. Set maximum file size (10 MB)
5. Note: File uploads require the form to be within a Google account's Google Drive

### Step 4 – Add Conditional Logic
1. For questions with conditional display:
   - Click the three dots (⋮) at bottom right of the question
   - Select "Go to section based on answer"
   - Map each answer to the appropriate section or "Continue to next section"

### Step 5 – Link to Google Sheet
1. In the form editor, click the "Responses" tab
2. Click the Google Sheets icon (green)
3. Select "Create a new spreadsheet"
4. Name it: `Worker Application Responses`
5. Click "Create"
6. All future responses will be logged to this sheet

### Step 6 – Enable Notifications
1. In the Responses tab, click the three dots (⋮)
2. Select "Get email notifications for new responses"
3. Notifications will be sent to the form owner's email

### Step 7 – Customise Confirmation Message
1. Click the Settings gear icon
2. Go to "Presentation" tab
3. Set "Confirmation message":
```
Thank you for applying to Kingken Global! 🎉

Your application has been received. Our HR team will review your profile within 48 hours.

Your Application Reference: You will receive a reference number on WhatsApp within 24 hours.

For urgent inquiries, contact us:
📞 WhatsApp: +96569048174
📧 Email: info@kingkenglobal.com.ng
🌐 Website: www.kingkenglobal.com.ng
```

### Step 8 – Set Form Access
1. Settings → General
2. For open applications: Leave "Restrict to [organisation] users" unchecked
3. Check "Collect email addresses" if you want emails auto-collected
4. Uncheck "Limit to 1 response" (allow multiple applications if needed)

---

## Sharing the Form

### Share via Direct Link
1. Click "Send" (top right)
2. Click the link icon (🔗)
3. Check "Shorten URL"
4. Copy the link: e.g., `https://forms.gle/XXXXXX`

### Share via WhatsApp
**Template message for WhatsApp broadcasts:**
```
🌍 *JOB OPPORTUNITIES IN THE GULF* 🌍

Kingken Global is recruiting workers for Kuwait, UAE, Qatar, and Saudi Arabia.

Positions: Construction, Cleaning, Hospitality, Healthcare, Security, and more.

✅ Apply NOW: https://forms.gle/XXXXXX

Or WhatsApp us directly: +96569048174

*Kingken Global Travel Agency Ltd*
info@kingkenglobal.com.ng
www.kingkenglobal.com.ng
```

### Embed on Website
1. Click "Send" → Embed icon `<>`
2. Adjust width (recommended: 100%) and height (800px)
3. Copy the `<iframe>` code
4. Paste into the HTML of the website page (contact your web developer)

---

## Form Maintenance

- **Review submitted responses:** Check the linked Google Sheet daily
- **Update job positions:** Update question 14 checkboxes when new roles are available
- **Update country list:** Add new countries as business expands
- **Monitor file uploads:** Check Google Drive storage usage monthly (File uploads go to Drive)
