# Recruitment Pipeline Sheet Schema — Kingken Global Recruitment Platform

**Sheet Name:** `Recruitment Pipeline`
**Purpose:** Tracks every candidate-to-job assignment from initial application through deployment — one row per candidate-job pairing
**Company:** Kingken Global Travel Agency Ltd.

---

## Column Definitions

| Col | Field Name | Data Type | Example | Description |
|-----|------------|-----------|---------|-------------|
| A | Pipeline ID | Text | `PIP-20260115-0001` | Auto-generated unique ID; format PIP-YYYYMMDD-NNNN |
| B | Candidate ID | Text | `KENG-20260115-0042` | Linked to Master Data sheet (Column A) |
| C | Candidate Name | Text | `Amara Johnson` | Auto-populated via VLOOKUP from Master Data |
| D | Job ID | Text | `JOB-20260115-0001` | Linked to Job Requests sheet (Column A) |
| E | Job Title | Text | `Cleaner` | Auto-populated via VLOOKUP from Job Requests |
| F | Employer Name | Text | `Al-Mansour Cleaning Co.` | Auto-populated via VLOOKUP from Job Requests |
| G | Country | Text | `Kuwait` | Destination country (from Job Requests) |
| H | Stage | Dropdown | `Interview` | Current stage in the recruitment pipeline |
| I | Stage Date | Date | `2026-01-20` | Date candidate entered the current stage |
| J | Assigned HR Officer | Text | `Fatima Al-Zahra` | HR officer managing this pipeline entry |
| K | Documents Submitted | Dropdown | `Yes` | Whether candidate has submitted all required documents |
| L | Medical Clearance | Dropdown | `Pending` | Result of medical fitness assessment |
| M | Visa Status | Dropdown | `Not Started` | Current visa application status |
| N | Deployment Date | Date | `2026-03-15` | Actual date candidate was deployed to employer |
| O | Deployment Status | Dropdown | `Pending` | Final deployment confirmation status |
| P | Notes | Text | `Interview confirmed for Jan 22` | Free-text notes from HR officer |

---

## Field Detail

### Column A — Pipeline ID
- **Format:** `PIP-YYYYMMDD-NNNN` (e.g. `PIP-20260115-0007`)
- **Generation:** Apps Script generates on new row creation using today's date + sequential counter (padded to 4 digits)
- **Uniqueness:** Script checks existing IDs before assigning; no duplicates permitted
- **Read-only:** Protected range — only the Apps Script service account writes this field

### Column B — Candidate ID
- **Format:** Must match a valid `KENG-YYYYMMDD-NNNN` from the Master Data sheet
- **Source:** Entered by recruiter when matching a candidate to a job
- **Validation:** Apps Script can cross-reference to confirm the ID exists in Master Data

### Column C — Candidate Name
- **Type:** Formula-driven (VLOOKUP from Master Data)
- **Formula (in C2):**
  ```
  =IFERROR(VLOOKUP(B2,'Master Data'!A:C,3,FALSE),"⚠️ Candidate Not Found")
  ```
- **Read-only:** Protected — auto-populated; do not overwrite manually

### Column D — Job ID
- **Format:** Must match a valid `JOB-YYYYMMDD-NNNN` from the Job Requests sheet
- **Source:** Entered by recruiter when creating the pipeline entry

### Column E — Job Title
- **Type:** Formula-driven (VLOOKUP from Job Requests)
- **Formula (in E2):**
  ```
  =IFERROR(VLOOKUP(D2,'Job Requests'!A:D,4,FALSE),"⚠️ Job Not Found")
  ```
- **Read-only:** Protected — auto-populated

### Column F — Employer Name
- **Type:** Formula-driven (VLOOKUP from Job Requests)
- **Formula (in F2):**
  ```
  =IFERROR(VLOOKUP(D2,'Job Requests'!A:C,3,FALSE),"⚠️ Employer Not Found")
  ```
- **Read-only:** Protected — auto-populated

### Column G — Country
- **Type:** Formula-driven (VLOOKUP from Job Requests)
- **Formula (in G2):**
  ```
  =IFERROR(VLOOKUP(D2,'Job Requests'!A:G,7,FALSE),"")
  ```
- **Read-only:** Protected — auto-populated from Job Requests destination country

### Column H — Stage
- **Type:** Dropdown (Data Validation)
- **Allowed values:** `Applied`, `Screening`, `Interview`, `Selected`, `Document Processing`, `Medical`, `Visa`, `Deployed`, `Rejected`
- **Workflow:** See Stage Definitions table below
- **Critical column:** Drives all downstream tracking

### Column I — Stage Date
- **Format:** `YYYY-MM-DD`
- **Purpose:** Records when the candidate entered the current stage in Column H
- **Auto-update:** Apps Script `onEdit` trigger updates this to today's date whenever Column H changes
- **Useful for:** SLA tracking (candidates stuck in a stage for too long)

### Column J — Assigned HR Officer
- **Values:** HR officer full name from the team roster
- **Default:** Assigned by Head of Recruitment based on workload
- **Used for:** Filtering pipeline by officer; daily workload reports

### Column K — Documents Submitted
- **Type:** Dropdown (Data Validation)
- **Allowed values:** `Yes`, `Partial`, `No`
- **Description:**
  - `Yes` — All required documents received and verified
  - `Partial` — Some documents received; follow-up required
  - `No` — No documents received yet
- **Blocks progression:** Stage should not advance to "Medical" unless K = "Yes"

### Column L — Medical Clearance
- **Type:** Dropdown (Data Validation)
- **Allowed values:** `Pass`, `Fail`, `Pending`
- **Description:**
  - `Pass` — Medical fitness certificate obtained; candidate cleared
  - `Fail` — Candidate did not pass medical; typically results in rejection
  - `Pending` — Medical examination not yet completed
- **Blocks progression:** Stage should not advance to "Visa" unless L = "Pass"

### Column M — Visa Status
- **Type:** Dropdown (Data Validation)
- **Allowed values:** `Not Started`, `In Progress`, `Approved`, `Rejected`
- **Description:**
  - `Not Started` — Visa application not yet initiated
  - `In Progress` — Application submitted; awaiting embassy decision
  - `Approved` — Visa granted; candidate cleared for travel
  - `Rejected` — Visa denied; case review required
- **Blocks progression:** Stage "Deployed" should only be set when M = "Approved"

### Column N — Deployment Date
- **Format:** `YYYY-MM-DD`
- **Source:** Actual date candidate traveled to employer country
- **Set manually** by HR officer once travel is confirmed
- **Required when:** Stage = "Deployed" — should not be blank if deployed

### Column O — Deployment Status
- **Type:** Dropdown (Data Validation)
- **Allowed values:** `Pending`, `Confirmed`, `Cancelled`
- **Description:**
  - `Pending` — Deployment arranged but not yet confirmed
  - `Confirmed` — Candidate has arrived and started with employer
  - `Cancelled` — Deployment cancelled (visa rejected, candidate withdrew, etc.)
- **Counted in:** Employers sheet Column K (Total Workers Deployed)

### Column P — Notes
- **Type:** Free text; wrap text enabled for this column
- **Usage:** Interview details, document follow-up notes, employer feedback, rejection reasons, special requirements

---

## Stage Definitions

| Stage | # | What Happens | Responsible | Exit Criteria |
|-------|---|-------------|-------------|---------------|
| Applied | 1 | Candidate matched to job; pipeline entry created | Recruiter | HR officer assigned; Candidate ID and Job ID confirmed |
| Screening | 2 | HR officer contacts candidate; verifies details and interest | HR Officer | Candidate confirms interest and availability; basic eligibility checked |
| Interview | 3 | Candidate interviewed (phone, video, or in-person) | HR Officer | Interview completed; result recorded in Notes |
| Selected | 4 | Candidate approved by Head of Recruitment and shared with employer | Head of Recruitment | Employer approves candidate; documents collection initiated |
| Document Processing | 5 | All required documents collected and verified | HR Officer | Column K = "Yes" (all documents received and verified) |
| Medical | 6 | Candidate undergoes medical fitness examination | HR Officer | Column L = "Pass" (medical clearance obtained) |
| Visa | 7 | Visa application submitted to embassy/consulate | Head of Legal | Column M = "Approved" (visa granted) |
| Deployed | 8 | Candidate has traveled and started with employer | HR Officer | Column N set (actual date), Column O = "Confirmed" |
| Rejected | 9 | Candidate removed from this pipeline entry | Recruiter / HR | Reason recorded in Column P (Notes) |

### Stage Progression Rules
```
Applied → Screening → Interview → Selected → Document Processing → Medical → Visa → Deployed
                                                                                   ↘ Rejected (possible at any stage)
```

- A candidate can only be in **one active pipeline entry** per job
- A candidate can appear in **multiple pipeline rows** if matched to multiple jobs
- Setting Stage to "Rejected" does NOT delete the row — it archives the attempt
- After "Rejected", a candidate may be re-matched to a different job (new pipeline row)

---

## Data Validation Rules

```
Column H (Stage):
  Type: List from range (or custom list)
  Values: Applied,Screening,Interview,Selected,Document Processing,Medical,Visa,Deployed,Rejected
  Show dropdown in cell: Yes
  Reject invalid input: Yes

Column K (Documents Submitted):
  Type: List from range (or custom list)
  Values: Yes,Partial,No
  Show dropdown in cell: Yes
  Reject invalid input: Yes

Column L (Medical Clearance):
  Type: List from range (or custom list)
  Values: Pass,Fail,Pending
  Show dropdown in cell: Yes
  Reject invalid input: Yes

Column M (Visa Status):
  Type: List from range (or custom list)
  Values: Not Started,In Progress,Approved,Rejected
  Show dropdown in cell: Yes
  Reject invalid input: Yes

Column O (Deployment Status):
  Type: List from range (or custom list)
  Values: Pending,Confirmed,Cancelled
  Show dropdown in cell: Yes
  Reject invalid input: Yes

Column I (Stage Date):
  Type: Date
  Criteria: Is a valid date
  Show warning on invalid: Yes

Column N (Deployment Date):
  Type: Date
  Criteria: Is a valid date
  Show warning on invalid: Yes
```

---

## Conditional Formatting Rules

### Column H — Stage

| Condition | Background Color | Text Color | Hex Code |
|-----------|-----------------|------------|----------|
| Value = "Applied" | Light Blue | Black | `#B3E5FC` |
| Value = "Screening" | Amber | Black | `#FFD54F` |
| Value = "Interview" | Orange | Black | `#FF9800` |
| Value = "Selected" | Light Green | Black | `#81C784` |
| Value = "Document Processing" | Purple | White | `#7B1FA2` |
| Value = "Medical" | Teal | White | `#00838F` |
| Value = "Visa" | Indigo | White | `#283593` |
| Value = "Deployed" | Dark Green | White | `#1B5E20` |
| Value = "Rejected" | Red | White | `#C62828` |

### Column I — Stage Date (SLA warning: stuck > 7 days)
```
Condition: =AND(I2<>"", TODAY()-I2>7, H2<>"Deployed", H2<>"Rejected")
Background: Light Red #FFCDD2
Purpose: Flag candidates who have been in the same stage for over 7 days
```

### Column L — Medical Clearance
| Condition | Background Color | Hex Code |
|-----------|-----------------|----------|
| Value = "Pass" | Green | `#81C784` |
| Value = "Fail" | Red | `#EF9A9A` |
| Value = "Pending" | Yellow | `#FFF176` |

### Column M — Visa Status
| Condition | Background Color | Hex Code |
|-----------|-----------------|----------|
| Value = "Approved" | Green | `#81C784` |
| Value = "Rejected" | Red | `#EF9A9A` |
| Value = "In Progress" | Yellow | `#FFF176` |
| Value = "Not Started" | Grey | `#EEEEEE` |

---

## Protected Ranges

| Range | Protection Level | Who Can Edit |
|-------|-----------------|--------------|
| Column A (Pipeline ID) | Script-only | Apps Script service account |
| Column C (Candidate Name) | Script-only | Apps Script service account (formula) |
| Column E (Job Title) | Script-only | Apps Script service account (formula) |
| Column F (Employer Name) | Script-only | Apps Script service account (formula) |
| Column G (Country) | Script-only | Apps Script service account (formula) |

---

## Key Formulas

### Auto-populate Candidate Name (Column C)
```
=IFERROR(VLOOKUP(B2,'Master Data'!A:C,3,FALSE),"⚠️ Candidate Not Found")
```

### Auto-populate Job Title (Column E)
```
=IFERROR(VLOOKUP(D2,'Job Requests'!A:D,4,FALSE),"⚠️ Job Not Found")
```

### Auto-populate Employer Name (Column F)
```
=IFERROR(VLOOKUP(D2,'Job Requests'!A:C,3,FALSE),"⚠️ Employer Not Found")
```

### Auto-populate Destination Country (Column G)
```
=IFERROR(VLOOKUP(D2,'Job Requests'!A:G,7,FALSE),"")
```

### Count candidates per stage (used in Dashboard)
```
=COUNTIF(H2:H,"Applied")
=COUNTIF(H2:H,"Screening")
=COUNTIF(H2:H,"Interview")
=COUNTIF(H2:H,"Selected")
=COUNTIF(H2:H,"Document Processing")
=COUNTIF(H2:H,"Medical")
=COUNTIF(H2:H,"Visa")
=COUNTIF(H2:H,"Deployed")
=COUNTIF(H2:H,"Rejected")
```

### Count deployed workers for a specific employer
```
=COUNTIFS(F2:F,"Al-Mansour Cleaning Co.",O2:O,"Confirmed")
```

### Count candidates stuck > 7 days in current stage
```
=COUNTIFS(I2:I,"<"&TODAY()-7,H2:H,"<>Deployed",H2:H,"<>Rejected")
```

### Average days per stage (for a specific stage)
```
=AVERAGEIF(H2:H,"Interview",TODAY()-I2:I)
```

---

## Sheet Settings

- **Freeze rows:** Row 1 (headers) frozen
- **Freeze columns:** Column A (Pipeline ID) frozen for horizontal scroll
- **Sort default:** By Column I (Stage Date) ascending — oldest entries first to surface stale cases
- **Filter views:**
  - "Active Pipeline" — exclude Deployed and Rejected
  - "My Pipeline" — filter by Column J (Assigned HR Officer)
  - "Deployed This Month" — Stage = Deployed, date range
  - "Stalled Cases" — Stage Date > 7 days ago, not Deployed/Rejected
- **Tab color:** Purple `#6A1B9A`
- **Row height:** 21px default; expand column P (Notes) to wrap text

---

## Notes

- Do not delete pipeline rows — set Stage to "Rejected" to close an attempt
- A candidate appearing in multiple rows is normal (one row per job match)
- The Deployment Status column (O) feeds the employer's "Total Workers Deployed" count in the Employers sheet
- Always update Stage Date (Column I) when advancing a candidate to the next stage
- Medical Clearance (L) and Visa Status (M) columns must be updated before advancing to Deployed

---

*Maintained by: Head of Recruitment | Contact: info@kingkenglobal.com.ng | https://www.kingkenglobal.com.ng*
