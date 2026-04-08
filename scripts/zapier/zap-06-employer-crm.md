# Zap 06 — New Employer Request → CRM + COO Alert

**Zap Name:** `Kingken - New Employer Request → CRM + COO Alert`  
**Platform:** Kingken Global Recruitment Platform  
**Company:** Kingken Global Travel Agency Ltd.  
**Status:** Production

---

## Overview

When a new employer submits the Employer Request Google Form, this Zap:
1. Creates an Employer record in the **Employers** sheet with a generated EmployerID.
2. Creates a Job Request record in the **Job Requests** sheet linked to that employer.
3. Sends an instant WhatsApp alert to the COO.
4. Sends a professional confirmation email to the employer (if email was provided).

---

## Trigger

| Setting | Value |
|---|---|
| App | Google Forms |
| Event | New Response in Spreadsheet |
| Form | **Kingken Employer Request Form** |
| Spreadsheet | *(Google Sheet linked to the Employer Request Form)* |
| Worksheet | Form Responses 1 |

---

## Action 1 — Code by Zapier (Generate IDs)

| Setting | Value |
|---|---|
| App | Code by Zapier |
| Event | Run JavaScript |

**Code:**

```javascript
const now = new Date();
const year  = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0');
const day   = String(now.getDate()).padStart(2, '0');
const rand4 = String(Math.floor(Math.random() * 9000) + 1000);
const rand5 = String(Math.floor(Math.random() * 90000) + 10000);

const employerId    = `EMP-${year}${month}${day}-${rand4}`;
const jobRequestId  = `JR-${year}${month}${day}-${rand5}`;

output = [{ employerId, jobRequestId }];
```

**Output variables:** `employerId`, `jobRequestId`

---

## Action 2 — Google Sheets (Create Employer Row)

| Setting | Value |
|---|---|
| App | Google Sheets |
| Event | Create Spreadsheet Row |
| Spreadsheet | *(Kingken Master Spreadsheet)* |
| Worksheet | **Employers** |

**Column mapping:**

| Column | Field | Value |
|---|---|---|
| A | EmployerID | Code: `employerId` |
| B | Timestamp | Form: Timestamp |
| C | CompanyName | Form: Company Name |
| D | ContactName | Form: Contact Person Name |
| E | Phone | Form: Phone Number |
| F | Email | Form: Email Address |
| G | Country | Form: Country / Location |
| H | Status | Static: `Lead` |
| I | AssignedTo | Static: `COO` |
| J | Notes | Form: Additional Notes (if field exists) |
| K | LastUpdated | `{{zap_meta_human_now}}` |

---

## Action 3 — Google Sheets (Create Job Request Row)

| Setting | Value |
|---|---|
| App | Google Sheets |
| Event | Create Spreadsheet Row |
| Spreadsheet | *(Kingken Master Spreadsheet)* |
| Worksheet | **Job Requests** |

**Column mapping:**

| Column | Field | Value |
|---|---|---|
| A | JobRequestID | Code: `jobRequestId` |
| B | EmployerID | Code: `employerId` |
| C | CompanyName | Form: Company Name |
| D | ContactName | Form: Contact Person Name |
| E | JobTitle | Form: Job Title / Role Required |
| F | NumberRequired | Form: Number of Workers Needed |
| G | RequiredNationality | Form: Preferred Nationality (if field exists) |
| H | StartDate | Static: `TBD` |
| I | Status | Static: `Open` |
| J | CreatedDate | `{{zap_meta_human_now}}` |

---

## Action 4 — WATI (Send WhatsApp Alert to COO)

| Setting | Value |
|---|---|
| App | WATI |
| Event | Send Template Message |
| To | `+96569048174` *(COO – hard-coded)* |
| Template Name | `employer_new_lead` |

**Message body (for session messages):**

```
🏢 *New Employer Lead!*

*Employer ID:* {{employerId}}
*Company:* {{CompanyName}}
*Contact:* {{ContactName}}
*Phone:* {{Phone}}
*Country:* {{Country}}
*Job Title:* {{JobTitle}}
*Workers Needed:* {{NumberRequired}}

💬 Reply to this message or call the employer to proceed with qualification.
— Kingken Global CRM
```

**Approved template `employer_new_lead` for submission to Meta:**

```
New Employer Lead!

Employer ID: {{1}}
Company: {{2}}
Contact: {{3}}
Phone: {{4}}
Job: {{5}} ({{6}} workers needed)

Open your CRM to action this lead.
— Kingken Global System
```

| Variable | Value |
|---|---|
| `{{1}}` | employerId |
| `{{2}}` | CompanyName |
| `{{3}}` | ContactName |
| `{{4}}` | Phone |
| `{{5}}` | JobTitle |
| `{{6}}` | NumberRequired |

---

## Action 5 — Filter (Only Send Employer Email if Email Exists)

| Setting | Value |
|---|---|
| App | Filter by Zapier |
| Condition | Email (from form) **is not empty** |

---

## Action 6 — Gmail (Send Confirmation Email to Employer)

| Setting | Value |
|---|---|
| App | Gmail |
| Event | Send Email |
| To | Form: Email Address |
| From Name | Kingken Global Travel Agency Ltd. |
| Subject | `Your Recruitment Request Has Been Received – Kingken Global` |
| Body Type | HTML |

**Email body:**

```html
<p>Dear <strong>{{ContactName}}</strong>,</p>

<p>Thank you for submitting a recruitment request to <strong>Kingken Global Travel Agency Ltd.</strong> We have received your enquiry and our team is reviewing your requirements.</p>

<h3>Your Request Summary</h3>
<table style="border-collapse:collapse; width:100%; font-family:Arial,sans-serif; font-size:14px;">
  <tr style="background:#f0f4ff;">
    <td style="padding:8px; font-weight:bold;">Employer Reference</td>
    <td style="padding:8px;">{{employerId}}</td>
  </tr>
  <tr>
    <td style="padding:8px; font-weight:bold;">Company</td>
    <td style="padding:8px;">{{CompanyName}}</td>
  </tr>
  <tr style="background:#f0f4ff;">
    <td style="padding:8px; font-weight:bold;">Job Required</td>
    <td style="padding:8px;">{{JobTitle}}</td>
  </tr>
  <tr>
    <td style="padding:8px; font-weight:bold;">Workers Needed</td>
    <td style="padding:8px;">{{NumberRequired}}</td>
  </tr>
</table>

<h3>What Happens Next</h3>
<ol>
  <li>Our COO will contact you within <strong>1 business day</strong> to discuss your requirements in detail.</li>
  <li>We will match your request with qualified pre-screened candidates from our database.</li>
  <li>A formal service agreement will be shared for your review.</li>
</ol>

<p>For urgent enquiries, please contact us directly:</p>
<ul>
  <li>📱 WhatsApp: +965 690 48174</li>
  <li>📧 Email: <a href="mailto:info@kingkenglobal.com.ng">info@kingkenglobal.com.ng</a></li>
</ul>

<p>Thank you for choosing Kingken Global. We look forward to serving you.</p>

<p>Best regards,<br>
<strong>Kingken Global Travel Agency Ltd.</strong><br>
International Recruitment Division</p>
```

---

## Testing Instructions

1. Submit a test response via the Employer Request Form with:
   - Company Name = `Test Company LLC`
   - Contact Name = `Test Contact`
   - Phone = `+96512345678`
   - Email = your own email
   - Job Title = `Domestic Worker`
   - Number Required = `5`
2. In Zapier, click **Test Zap**.
3. Verify Action 2 adds a row to the **Employers** sheet with EmployerID `EMP-YYYYMMDD-XXXX`.
4. Verify Action 3 adds a row to **Job Requests** with the same EmployerID.
5. Check the COO WhatsApp (`+96569048174`) for the WATI alert.
6. Check your email inbox for the employer confirmation email.
7. Delete all test rows when done.

---

## Common Errors and Fixes

| Error | Cause | Fix |
|---|---|---|
| `Sheet "Employers" not found` | Sheet not created yet | Create a sheet named exactly `Employers` in the Master Spreadsheet |
| `Sheet "Job Requests" not found` | Sheet not created yet | Create a sheet named exactly `Job Requests` in the Master Spreadsheet |
| EmployerID and JobRequestID are the same | Code ran once and values cached | Ensure both IDs use different random seeds (`rand4` vs `rand5`) — the provided code handles this |
| WATI message not delivered | COO's number not in WATI contact list | Add `+96569048174` as a contact in the WATI dashboard before go-live |
| Email not sent | Filter blocked it (email was empty) | Check the form has an email field. If employers are not always providing email, the Filter correctly stops this action — this is expected behaviour |
