# Job Requests Sheet Schema — Kingken Global Recruitment Platform

**Sheet Name:** `Job Requests`
**Purpose:** Tracks all hiring requests received from employer clients — one row per job request
**Company:** Kingken Global Travel Agency Ltd.

---

## Column Definitions

| Col | Field Name | Data Type | Example | Description |
|-----|------------|-----------|---------|-------------|
| A | Job ID | Text | `JOB-20260115-0001` | Auto-generated unique ID; format JOB-YYYYMMDD-NNNN |
| B | Employer ID | Text | `EMP-20260115-0001` | Linked to Employers Database sheet (Column A) |
| C | Employer Name | Text | `Al-Mansour Cleaning Co.` | Auto-populated via VLOOKUP from Employers sheet |
| D | Job Title / Position | Text | `Cleaner` | Role being recruited for |
| E | Number of Workers Required | Number | `10` | Total headcount requested for this job |
| F | Salary (USD) | Number | `400` | Monthly salary per worker in USD |
| G | Country / Location | Dropdown | `Kuwait` | Destination country for placement |
| H | Contract Duration (months) | Number | `24` | Length of employment contract in months |
| I | Date Submitted | Date | `2026-01-15` | Date this job request was received |
| J | Required Start Date | Date | `2026-03-01` | Date employer needs workers to begin |
| K | Status | Dropdown | `Open` | Current recruitment status of this job |
| L | Assigned Recruiter | Text | `Fatima Al-Zahra` | Team member managing this job request |
| M | Notes | Text | `Must have 2+ years experience` | Additional requirements or context |

---

## Field Detail

### Column A — Job ID
- **Format:** `JOB-YYYYMMDD-NNNN` (e.g. `JOB-20260115-0042`)
- **Generation:** Apps Script generates on new row creation using today's date + sequential counter (padded to 4 digits)
- **Uniqueness:** Script checks existing IDs before assigning; no duplicates permitted
- **Read-only:** Protected range — only the Apps Script service account writes this field

### Column B — Employer ID
- **Format:** Must match a valid `EMP-YYYYMMDD-NNNN` from the Employers Database sheet
- **Source:** Entered manually by COO or recruiter when creating the job request
- **Validation:** Should reference a valid employer; script can flag if no match found in Employers sheet

### Column C — Employer Name
- **Type:** Formula-driven (VLOOKUP from Employers Database)
- **Formula (in C2):**
  ```
  =IFERROR(VLOOKUP(B2,'Employers Database'!A:B,2,FALSE),"⚠️ Employer Not Found")
  ```
- **Read-only:** Protected range — auto-populated; do not overwrite manually
- **Purpose:** Convenience display field; the authoritative link is Employer ID (Column B)

### Column D — Job Title / Position
- **Required:** Yes
- **Examples:** Domestic Worker, Driver, Security Guard, Cleaner, Nanny, Caregiver, Cook, Construction Worker, Factory Worker, Waiter/Waitress, Receptionist, Other
- **Note:** Free text — not a dropdown, as employers may have custom position titles

### Column E — Number of Workers Required
- **Type:** Integer (whole number ≥ 1)
- **Validation:** Must be a number ≥ 1
- **Used for:** Pipeline planning, capacity forecasting, deal value calculation

### Column F — Salary (USD)
- **Type:** Number (positive integer or decimal)
- **Currency:** USD per worker per month
- **Validation:** Must be a number > 0
- **Used for:** Deal value calculation, candidate offer communication

### Column G — Country / Location
- **Type:** Dropdown (Data Validation)
- **Allowed values:** `Kuwait`, `UAE`, `Qatar`, `Saudi Arabia`, `Other`
- **Source:** Fixed list

### Column H — Contract Duration (months)
- **Type:** Integer (whole number ≥ 1)
- **Examples:** `12`, `24`, `36`
- **Validation:** Must be a number ≥ 1
- **Default:** 24 (standard Gulf contract)

### Column I — Date Submitted
- **Format:** `YYYY-MM-DD`
- **Source:** Date job request was formally received from employer
- **Auto-set** by Apps Script on new row creation (`=TODAY()`)

### Column J — Required Start Date
- **Format:** `YYYY-MM-DD`
- **Source:** Entered by recruiter based on employer requirements
- **Used for:** Prioritizing urgent job requests; urgency flag if within 30 days

### Column K — Status
- **Type:** Dropdown (Data Validation)
- **Allowed values:** `Open`, `Matching`, `Shortlisted`, `Closed`, `Cancelled`
- **Workflow progression:**
  ```
  Open → Matching → Shortlisted → Closed
                              ↘ Cancelled (at any stage)
  ```
- **Stage descriptions:**
  - `Open` — New job request; active recruitment not yet started
  - `Matching` — Recruiter is searching and matching candidates from Master Data
  - `Shortlisted` — Candidates have been shortlisted and shared with employer
  - `Closed` — Job fully filled; all required workers deployed
  - `Cancelled` — Employer withdrew the request

### Column L — Assigned Recruiter
- **Values:** Team member full name (from ROLES_AND_STRUCTURE)
- **Default:** Assigned by Head of Recruitment based on workload
- **Auto-set:** Zapier Zap-05 may auto-assign based on capacity rules

### Column M — Notes
- **Type:** Free text; wrap text enabled
- **Usage:** Specific requirements (language, certifications, physical requirements), employer special instructions, follow-up dates

---

## Data Validation Rules

```
Column E (Number of Workers Required):
  Type: Number
  Criteria: Is a valid number, greater than or equal to 1
  Reject invalid input: Yes

Column F (Salary USD):
  Type: Number
  Criteria: Is a valid number, greater than 0
  Reject invalid input: Yes

Column G (Country / Location):
  Type: List from range (or custom list)
  Values: Kuwait,UAE,Qatar,Saudi Arabia,Other
  Show dropdown in cell: Yes
  Reject invalid input: Yes

Column H (Contract Duration months):
  Type: Number
  Criteria: Is a valid number, greater than or equal to 1
  Reject invalid input: Yes

Column I (Date Submitted):
  Type: Date
  Criteria: Is a valid date
  Show warning on invalid: Yes

Column J (Required Start Date):
  Type: Date
  Criteria: Is a valid date
  Show warning on invalid: Yes

Column K (Status):
  Type: List from range (or custom list)
  Values: Open,Matching,Shortlisted,Closed,Cancelled
  Show dropdown in cell: Yes
  Reject invalid input: Yes
```

---

## Conditional Formatting Rules

### Column K — Status

| Condition | Background Color | Text Color | Hex Code |
|-----------|-----------------|------------|----------|
| Value = "Open" | Blue | White | `#1565C0` |
| Value = "Matching" | Yellow | Black | `#FFF176` |
| Value = "Shortlisted" | Light Green | Black | `#81C784` |
| Value = "Closed" | Dark Green | White | `#388E3C` |
| Value = "Cancelled" | Red | White | `#C62828` |

### Column J — Required Start Date (urgency highlight)
```
Condition: =AND(J2<>"", J2-TODAY()<=30, K2<>"Closed", K2<>"Cancelled")
Background: Orange #FF9800
Purpose: Highlight urgent jobs starting within 30 days
```

**Setup instructions:**
1. Select column K (K2:K1000)
2. Format → Conditional formatting
3. Add a rule for each status value using "Text is exactly"
4. Apply the corresponding fill and text colors

---

## Protected Ranges

| Range | Protection Level | Who Can Edit |
|-------|-----------------|--------------|
| Column A (Job ID) | Script-only | Apps Script service account |
| Column C (Employer Name) | Script-only | Apps Script service account (formula) |

---

## Key Formulas

### Auto-populate Employer Name from Employer ID (Column C)
```
=IFERROR(VLOOKUP(B2,'Employers Database'!A:B,2,FALSE),"⚠️ Employer Not Found")
```
*Looks up Employer ID in Column B against the Employers Database sheet, returns Company Name*

### Count job requests by status (used in Dashboard)
```
=COUNTIF(K2:K,"Open")
=COUNTIF(K2:K,"Matching")
=COUNTIF(K2:K,"Shortlisted")
=COUNTIF(K2:K,"Closed")
=COUNTIF(K2:K,"Cancelled")
```

### Total workers required across all open jobs
```
=SUMIF(K2:K,"Open",E2:E)
```

### Total potential deal value of open jobs
```
=SUMPRODUCT((K2:K="Open")*(E2:E)*(F2:F))
```
*Workers × Salary for all Open jobs — used for revenue forecasting*

### Count jobs assigned to a specific recruiter
```
=COUNTIF(L2:L,"Fatima Al-Zahra")
```

### Days until Required Start Date
```
=J2-TODAY()
```
*Apply in a helper column to sort by urgency*

---

## Sheet Settings

- **Freeze rows:** Row 1 (headers) frozen
- **Freeze columns:** Column A (Job ID) frozen for horizontal scroll
- **Sort default:** By Column J (Required Start Date) ascending — most urgent first
- **Filter views:** Create named filter views: "Open Jobs", "My Jobs" (per recruiter), "Kuwait Only", "UAE Only"
- **Tab color:** Blue `#1565C0`
- **Row height:** 21px default; expand column M (Notes) to wrap text

---

## Notes

- Do not delete job request rows — set Status to "Cancelled" to deactivate
- Do not manually edit Job ID or Employer Name (formula)
- Column B (Employer ID) must reference a valid employer in the Employers Database
- Use the "Required Start Date" column to prioritize urgent requests in daily recruitment planning
- Salary amounts are in USD per worker per month; confirm currency with employer before recording

---

*Maintained by: Head of Recruitment | Contact: info@kingkenglobal.com.ng | https://www.kingkenglobal.com.ng*
