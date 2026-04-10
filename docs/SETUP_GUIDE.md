# Setup Guide

A guide to set up the project environment and dependencies.

---

## Google Form & Sheets Integration (Worker / Client Application)

The recruitment application flow is powered by Google Forms and Google Sheets.
All automation scripts live in [`integrations/google/`](../integrations/google/).

### Step 1 — Create the Application Form

Run `createApplicationForm.gs` once from [script.google.com](https://script.google.com)
to programmatically create the **Kingken Global Recruitment Application Form**.

The form collects:

1. Full Name
2. Phone Number (with country code)
3. Nationality
4. Position Applying For
5. Years of Experience
6. Passport Available? (Yes / No)
7. Upload CV (file upload)

See [`integrations/google/README.md`](../integrations/google/README.md) for full
step-by-step instructions.

### Step 2 — Link the Form to Google Sheets

Inside the form editor:

1. Click the **Responses** tab.
2. Click the green **Google Sheets** icon.
3. Choose **Create new spreadsheet** and click **Create**.

Every submission becomes a new row; questions become columns. Updates are
real-time.

> ⚠️ **Never edit the "Form Responses 1" sheet directly.**

### Step 3 — Build the Dashboard

Run `setupDashboard.gs` from the linked spreadsheet's Apps Script editor.  
It creates a **Dashboard** sheet with the following KPI formulas:

| Metric | Formula |
|--------|---------|
| Total Applicants | `=COUNTA('Form Responses 1'!A2:A)` |
| Total Revenue | `=SUM('Form Responses 1'!I2:I)` |
| Total Paid | `=SUM('Form Responses 1'!J2:J)` |
| Outstanding Balance | `=B3-B4` (Total Revenue − Total Paid) |
| Pending (Paid = 0) | `=COUNTIF('Form Responses 1'!J2:J,0)` |
| Paid in Full | `=SUMPRODUCT((J2:J>0)*(J2:J>=I2:I))` |
| Partial Payment | `=SUMPRODUCT((J2:J>0)*(J2:J<I2:I))` |

A **Kingken Tools → Rebuild Dashboard** menu is added to the spreadsheet for
easy refresh.

---