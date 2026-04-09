# Employers Database Sheet Schema — Kingken Global Recruitment Platform

**Sheet Name:** `Employers Database`
**Purpose:** CRM for all employer clients and leads — one row per employer company
**Company:** Kingken Global Travel Agency Ltd.

---

## Column Definitions

| Col | Field Name | Data Type | Example | Description |
|-----|------------|-----------|---------|-------------|
| A | EmployerID | Text | `EMP-20260115-0001` | Auto-generated unique ID; format EMP-YYYYMMDD-NNNN |
| B | Company Name | Text | `Al-Mansour Cleaning Co.` | Full legal company name |
| C | Country | Dropdown | `Kuwait` | Country where employer is based |
| D | Industry | Dropdown | `Cleaning` | Primary industry sector |
| E | Contact Person | Text | `Ahmed Al-Mansour` | Full name of primary contact |
| F | Contact Phone | Text | `+96512345678` | E.164 format — used for WhatsApp and calls |
| G | Contact Email | Email | `ahmed@almansour.com.kw` | Primary business email address |
| H | WhatsApp Number | Text | `+96512345678` | WhatsApp number (may differ from F) |
| I | Status | Dropdown | `Active` | Current relationship stage |
| J | Total Workers Requested | Number | `25` | Cumulative workers requested across all jobs |
| K | Total Workers Deployed | Number | `18` | Auto-count from Pipeline sheet (formula) |
| L | Notes | Text | `Prefers domestic workers from Nigeria` | Free-text notes from COO or recruiter |

---

## Field Detail

### Column A — EmployerID
- **Format:** `EMP-YYYYMMDD-NNNN` (e.g. `EMP-20260115-0001`)
- **Generation:** Apps Script generates on new employer row creation using today's date + sequential counter (padded to 4 digits)
- **Uniqueness:** Script checks existing IDs before assigning; no duplicates permitted
- **Read-only:** Protected range — only the Apps Script service account writes this field

### Column B — Company Name
- **Required:** Yes
- **Validation:** Minimum 3 characters; no purely numeric values
- **Casing:** Title Case preferred; normalize via Apps Script

### Column C — Country
- **Type:** Dropdown (Data Validation)
- **Allowed values:** `Kuwait`, `UAE`, `Qatar`, `Saudi Arabia`, `Other`
- **Source:** Fixed list — do not accept free-text entries

### Column D — Industry
- **Type:** Dropdown (Data Validation)
- **Allowed values:** `Construction`, `Cleaning`, `Hospitality`, `Logistics`, `Healthcare`, `Other`
- **Source:** Fixed list

### Column E — Contact Person
- **Required:** Yes
- **Format:** Full name (first and last); Title Case
- **Used for:** WhatsApp outreach, formal communications

### Column F — Contact Phone
- **Format:** E.164 — starts with `+`, followed by country code, then number (no spaces, dashes, or parentheses)
- **Example valid values:** `+96512345678`, `+97150123456`
- **Normalization script:** `normalize-phones.gs` strips invalid characters automatically
- **Uniqueness check:** System warns on duplicate phone

### Column G — Contact Email
- **Format:** Valid email address (contains `@` and domain)
- **Validation:** Text contains `@` — show warning on invalid
- **Used for:** Invoice delivery, formal proposals, contract signing

### Column H — WhatsApp Number
- **Format:** E.164 (same rules as Column F)
- **Note:** May be same as Contact Phone or a separate WhatsApp Business number
- **Used for:** Automated WATI messages, status updates, quick comms

### Column I — Status
- **Type:** Dropdown (Data Validation)
- **Allowed values:** `Lead`, `Active`, `Paused`, `Closed`
- **Workflow progression:**
  ```
  Lead → Active → Paused (temporary hold)
                ↘ Closed (permanently inactive)
  ```
- **Stage descriptions:**
  - `Lead` — Employer expressed interest; COO yet to establish formal relationship
  - `Active` — Signed agreement; has open or fulfilled job requests
  - `Paused` — Temporary hold; waiting on budget, approvals, or seasonal pause
  - `Closed` — No longer working with Kingken Global; account archived

### Column J — Total Workers Requested
- **Type:** Integer (whole number ≥ 0)
- **Source:** Sum of all "Number of Workers Required" across Job Requests for this employer
- **Formula (in J2):**
  ```
  =SUMIF('Job Requests'!B:B,A2,'Job Requests'!E:E)
  ```
- **Auto-updates** as new job requests are added

### Column K — Total Workers Deployed
- **Type:** Integer (whole number ≥ 0)
- **Source:** Count of Pipeline rows where Deployment Status = "Confirmed" and Employer matches
- **Formula (in K2):**
  ```
  =COUNTIFS('Recruitment Pipeline'!F:F,B2,'Recruitment Pipeline'!O:O,"Confirmed")
  ```
- **Read-only:** Protected — formula-driven, do not manually edit

### Column L — Notes
- **Type:** Free text; wrap text enabled for this column
- **Usage:** COO and recruiter observations, preferred candidate types, payment history notes, special terms

---

## Data Validation Rules

```
Column C (Country):
  Type: List from range (or custom list)
  Values: Kuwait,UAE,Qatar,Saudi Arabia,Other
  Show dropdown in cell: Yes
  Reject invalid input: Yes

Column D (Industry):
  Type: List from range (or custom list)
  Values: Construction,Cleaning,Hospitality,Logistics,Healthcare,Other
  Show dropdown in cell: Yes
  Reject invalid input: Yes

Column I (Status):
  Type: List from range (or custom list)
  Values: Lead,Active,Paused,Closed
  Show dropdown in cell: Yes
  Reject invalid input: Yes

Column J (Total Workers Requested):
  Type: Number
  Criteria: Is a valid number, greater than or equal to 0
  Reject invalid input: Yes

Column G (Contact Email):
  Type: Text
  Criteria: Text contains "@"
  Show warning on invalid: Yes
```

---

## Conditional Formatting Rules

### Column I — Status

| Condition | Background Color | Text Color | Hex Code |
|-----------|-----------------|------------|----------|
| Value = "Lead" | Yellow | Black | `#FFF176` |
| Value = "Active" | Green | White | `#388E3C` |
| Value = "Paused" | Orange | Black | `#FF9800` |
| Value = "Closed" | Grey | White | `#757575` |

**Setup instructions:**
1. Select column I (I2:I1000)
2. Format → Conditional formatting
3. Add a rule for each status value using "Text is exactly"
4. Apply the corresponding fill and text colors

---

## Protected Ranges

| Range | Protection Level | Who Can Edit |
|-------|-----------------|--------------|
| Column A (EmployerID) | Script-only | Apps Script service account |
| Column K (Total Workers Deployed) | Script-only | Apps Script service account (formula) |

**Setting up protection in Google Sheets:**
1. Select the column(s) to protect
2. Right-click → Protect range
3. Click "Set permissions"
4. Select "Only you" or add specific editors (service account email)
5. Save

---

## Key Formulas

### Total Workers Requested per employer (Column J)
```
=SUMIF('Job Requests'!B:B,A2,'Job Requests'!E:E)
```
*Sums "Number of Workers Required" in Job Requests where Employer ID matches this row's Employer ID*

### Total Workers Deployed per employer (Column K)
```
=COUNTIFS('Recruitment Pipeline'!F:F,B2,'Recruitment Pipeline'!O:O,"Confirmed")
```
*Counts pipeline rows where Employer Name matches AND Deployment Status is Confirmed*

### Count employers by status (used in Dashboard)
```
=COUNTIF(I2:I,"Lead")
=COUNTIF(I2:I,"Active")
=COUNTIF(I2:I,"Paused")
=COUNTIF(I2:I,"Closed")
```

### Find employer by company name
```
=MATCH("Al-Mansour Cleaning Co.",B2:B,0)
```

---

## Sheet Settings

- **Freeze rows:** Row 1 (headers) frozen
- **Freeze columns:** Column A (EmployerID) frozen for horizontal scroll
- **Sort default:** By Column I (Status) — Active first, then Lead, Paused, Closed
- **Filter views:** Create named filter views: "Active Employers", "Leads Only", "Paused", "Closed"
- **Tab color:** Orange `#E65100`
- **Row height:** 21px default; expand column L (Notes) to wrap text

---

## Notes

- Do not delete employer rows — set Status to "Closed" to deactivate
- Do not manually edit EmployerID
- All employer phone numbers must be E.164 format before outreach via WATI
- Column K is formula-driven — do not overwrite with a static number
- Back up this sheet weekly using the Apps Script backup function

---

*Maintained by: COO | Contact: info@kingkenglobal.com.ng | https://www.kingkenglobal.com.ng*
