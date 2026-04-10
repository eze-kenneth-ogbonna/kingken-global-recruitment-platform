# Google Forms / Sheets Integration

This directory contains Google Apps Script (`.gs`) files that automate the
setup of the Kingken Global Recruitment Application Form and the linked
Google Sheets dashboard.

---

## Files

| File | Purpose |
|------|---------|
| `createApplicationForm.gs` | Creates the recruitment Google Form with all required fields. |
| `setupDashboard.gs` | Builds the **Dashboard** summary sheet inside the linked Google Spreadsheet. |

---

## Step 1 — Create the Application Form

1. Open [https://script.google.com](https://script.google.com) and create a **New project**.
2. Copy the contents of `createApplicationForm.gs` into the editor.
3. Click **Run → createApplicationForm**.
4. Grant the requested permissions when prompted.
5. Open the **Execution log** to find the form's published URL and ID.

The script creates a form titled **"Kingken Global Recruitment Application Form"**
with these fields:

| # | Field | Type | Required |
|---|-------|------|----------|
| 1 | Full Name | Short text | ✅ |
| 2 | Phone Number (with country code) | Short text (validated) | ✅ |
| 3 | Nationality | Short text | ✅ |
| 4 | Position Applying For | Short text | ✅ |
| 5 | Years of Experience | Short text (whole number ≥ 0) | ✅ |
| 6 | Passport Available? | Multiple choice (Yes / No) | ✅ |
| 7 | Upload CV | File upload (PDF/Word, max 10 MB) | ✅ |

---

## Step 2 — Link the Form to Google Sheets

1. Open the form in edit mode.
2. Click the **Responses** tab at the top of the form.
3. Click the green **Google Sheets** icon.
4. Choose **Create new spreadsheet** (recommended) and click **Create**.

Every new submission will automatically appear as a new row in the
**"Form Responses 1"** sheet.

---

## Step 3 — Set Up the Dashboard

> ⚠️ **Do NOT edit the "Form Responses 1" sheet manually.** Google Forms owns
> that sheet. All custom analytics belong in the **Dashboard** sheet.

1. Open the linked Google Spreadsheet.
2. Click **Extensions → Apps Script**.
3. Copy the contents of `setupDashboard.gs` into the editor.
4. Click **Run → setupDashboard**.
5. Grant the requested permissions when prompted.

The script creates a **Dashboard** sheet with:

| Metric | Formula |
|--------|---------|
| Total Applicants | `=COUNTA('Form Responses 1'!A2:A)` |
| Total Revenue (Amount Charged) | `=SUM('Form Responses 1'!E2:E)` |
| Total Paid | `=SUM('Form Responses 1'!F2:F)` |
| Outstanding Balance | `=B3-B4` |
| Passport Holders | `=COUNTIF('Form Responses 1'!G2:G,"Yes")` |
| No Passport | `=COUNTIF('Form Responses 1'!G2:G,"No")` |
| Pending (Amount Paid = 0) | `=COUNTIF('Form Responses 1'!F2:F,0)` |
| Paid in Full | SUMPRODUCT formula |
| Partial Payment | SUMPRODUCT formula |

A **Kingken Tools → Rebuild Dashboard** menu item is also added to the
spreadsheet so the dashboard can be refreshed without reopening the script
editor.

---

## Column Conventions (Form Responses 1)

| Column | Data |
|--------|------|
| A | Timestamp (auto) |
| B | Full Name |
| C | Phone Number |
| D | Nationality |
| E | Position Applying For / **Amount Charged** (enter manually) |
| F | Years of Experience / **Amount Paid** (enter manually) |
| G | Passport Available? |
| H | CV Upload (Drive link) |

> The `AMOUNT_COL` and `PAID_COL` constants in `setupDashboard.gs` can be
> updated to match the actual column letters used in your spreadsheet.

---

## Resources

- [Google Forms Help](https://support.google.com/docs/topic/9055404)
- [Google Apps Script Reference](https://developers.google.com/apps-script/reference)
- Kingken Global — [https://www.kingkenglobal.com.ng](https://www.kingkenglobal.com.ng)
