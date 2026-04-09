# Pipeline Sheet – Column Documentation

**Sheet Tab Name:** `Pipeline`
**Purpose:** The central recruitment pipeline tracker. Every candidate-to-job assignment lives here and is tracked through all stages from application to deployment.

---

## Column Reference (A–P)

| Col | Field Name | Type | Description |
|-----|-----------|------|-------------|
| A | Pipeline ID | Text | Unique pipeline record identifier |
| B | Candidate ID | Text | References CandidateID from Master Data sheet |
| C | Candidate Name | Formula | Auto-populated from Master Data sheet |
| D | Job ID | Text | References Job ID from Job Requests sheet |
| E | Job Title | Formula | Auto-populated from Job Requests sheet |
| F | Employer Name | Formula | Auto-populated from Job Requests sheet |
| G | Country | Text | Deployment country |
| H | Stage | Dropdown | Current recruitment stage |
| I | Stage Date | Date | Date the current stage was reached |
| J | HR Officer | Text | HR officer managing this pipeline record |
| K | Documents Submitted | Dropdown | Whether required documents have been submitted |
| L | Medical Clearance | Dropdown | Medical examination result |
| M | Visa Status | Dropdown | Visa application progress |
| N | Deployment Date | Date | Actual or planned deployment date |
| O | Deployment Status | Dropdown | Final deployment outcome |
| P | Notes | Text | Free-form notes |

---

## Column A – Pipeline ID

**Format:** `PIP-YYYYMMDD-NNNN`

**Examples:**
- `PIP-20260115-0001`
- `PIP-20260301-0023`

**Rules:**
- YYYYMMDD = date the pipeline record was created
- NNNN = sequential number for that day, padded to 4 digits
- One row per candidate per job assignment
- A candidate may appear multiple times if assigned to different jobs

---

## Column B – Candidate ID

**Type:** Text (references `Master Data`!A)  
**Required:** Yes  
**Example:** `KENG-20260115-0001`  
**Note:** Must exactly match a CandidateID in the Master Data sheet.

---

## Column C – Candidate Name

**Type:** Formula  
**Formula (row 2):**
```
=IFERROR(VLOOKUP(B2,'Master Data'!A:C,3,FALSE),"")
```

**Formula Explanation:**
- `VLOOKUP(B2, ...)` → looks up the Candidate ID in B2
- `'Master Data'!A:C` → searches Master Data sheet, columns A through C
- `3` → returns the value from column 3 (column C = Full Name)
- `FALSE` → exact match required
- `IFERROR(...,"")` → prevents #N/A errors if ID not found

**Note:** Sheet name `Master Data` contains a space, so it must be wrapped in single quotes in formulas.

---

## Column D – Job ID

**Type:** Text (references `Job Requests`!A)  
**Required:** Yes  
**Example:** `JOB-20260115-0003`

---

## Column E – Job Title

**Type:** Formula  
**Formula (row 2):**
```
=IFERROR(VLOOKUP(D2,'Job Requests'!A:D,4,FALSE),"")
```

**Formula Explanation:**
- Looks up Job ID (D2) in Job Requests sheet
- `'Job Requests'!A:D` → columns A through D of Job Requests
- `4` → returns column 4 (column D = Job Title / Position)
- Exact match, IFERROR prevents errors

---

## Column F – Employer Name

**Type:** Formula  
**Formula (row 2):**
```
=IFERROR(VLOOKUP(D2,'Job Requests'!A:C,3,FALSE),"")
```

**Formula Explanation:**
- Looks up Job ID (D2) in Job Requests sheet
- `'Job Requests'!A:C` → columns A through C of Job Requests
- `3` → returns column 3 (column C = Employer Name)
- Exact match, IFERROR prevents errors

**Note:** This column is referenced by the Employers sheet formula in column K (Total Workers Deployed).

---

## Column G – Country

**Type:** Text (usually auto-populated or manually entered)  
**Required:** Yes  
**Example:** `Kuwait`, `UAE`, `Qatar`  
**Note:** Should match the deployment country for the job. Can be pulled from Job Requests if needed using VLOOKUP on column G.

---

## Column H – Stage

**Type:** Dropdown  
**Required:** Yes  
**Options (in order):**
1. Applied
2. Screening
3. Interview
4. Selected
5. Document Processing
6. Medical
7. Visa
8. Deployed
9. Rejected

**Conditional Formatting:**

| Stage | Background Colour | Text Colour |
|-------|------------------|-------------|
| Applied | Light Grey (`#CCCCCC`) | Black |
| Screening | Light Blue (`#ADD8E6`) | Black |
| Interview | Blue (`#4A90D9`) | White |
| Selected | Light Green (`#90EE90`) | Black |
| Document Processing | Orange (`#FF9900`) | White |
| Medical | Purple (`#9B59B6`) | White |
| Visa | Dark Blue (`#1F4E79`) | White |
| Deployed | Green (`#00CC00`) | White |
| Rejected | Red (`#FF0000`) | White |

---

## Stage Definitions Table

| Stage | Definition | What Must Happen to Advance |
|-------|-----------|----------------------------|
| **Applied** | Candidate has submitted application or been added to pipeline | HR Officer reviews application; confirms candidate meets basic requirements |
| **Screening** | Initial review of candidate profile and documents | HR Officer conducts phone screening; confirms work experience, passport validity, language, and availability |
| **Interview** | Candidate is scheduled for or has completed interview | Interview completed (phone or in-person); evaluation form filled; decision made to advance or reject |
| **Selected** | Candidate has been approved for this job | Employer has approved the candidate; candidate confirmed willingness; documents collection started |
| **Document Processing** | Collecting and verifying required documents | All required documents submitted and verified: passport copy, photos, certificates, NIN, etc. |
| **Medical** | Candidate undergoing medical examination | GAMCA-approved medical completed; medical certificate received; result is "Pass" |
| **Visa** | Visa application submitted | Visa application submitted to embassy; tracking number obtained; awaiting embassy decision |
| **Deployed** | Candidate has travelled to destination country | Candidate has arrived in the destination country; employer confirmed receipt |
| **Rejected** | Candidate removed from this pipeline | Reason recorded in Notes; candidate notified appropriately |

---

## Column I – Stage Date

**Type:** Date  
**Required:** Yes  
**Format:** `DD/MM/YYYY`  
**Note:** Update this date every time the Stage in column H changes. This allows tracking of how long each stage takes.

---

## Column J – HR Officer

**Type:** Text (or dropdown from team list)  
**Required:** Yes  
**Example:** `Grace Adaeze`, `Aminu Bello`  
**Note:** The HR Officer responsible for managing this candidate's pipeline journey.

---

## Column K – Documents Submitted

**Type:** Dropdown  
**Required:** Yes  
**Options:**
- Yes — All required documents submitted and verified
- Partial — Some documents received, others pending
- No — No documents submitted yet

**Setup:**
1. Select K2:K1000
2. Data → Data Validation → List of items: `Yes,Partial,No`

---

## Column L – Medical Clearance

**Type:** Dropdown  
**Required:** Yes  
**Options:**
- Pass — Candidate passed medical examination
- Fail — Candidate failed; disqualified from this job
- Pending — Medical not yet completed

**Setup:**
1. Select L2:L1000
2. Data → Data Validation → List of items: `Pass,Fail,Pending`

---

## Column M – Visa Status

**Type:** Dropdown  
**Required:** Yes  
**Options:**
- Not Started — Visa process not yet initiated
- In Progress — Application submitted; awaiting decision
- Approved — Visa granted
- Rejected — Visa denied

**Setup:**
1. Select M2:M1000
2. Data → Data Validation → List of items: `Not Started,In Progress,Approved,Rejected`

---

## Column N – Deployment Date

**Type:** Date  
**Required:** Yes (once known)  
**Format:** `DD/MM/YYYY`  
**Note:** The actual date the candidate flew to the destination country. Leave blank until confirmed.

---

## Column O – Deployment Status

**Type:** Dropdown  
**Required:** Yes  
**Options:**
- Pending — Deployment not yet confirmed
- Confirmed — Candidate successfully deployed
- Cancelled — Deployment cancelled

**Note:** This column is referenced in the Employers sheet formula:
```
=COUNTIFS('Pipeline'!F2:F,B2,'Pipeline'!O2:O,"Confirmed")
```
Set to "Confirmed" only when the candidate has physically arrived and employer has confirmed receipt.

---

## Column P – Notes

**Type:** Long text  
**Required:** No  
**Use for:** Stage change reasons, rejection reasons, employer feedback, special visa notes, communication log highlights.

---

## How HR Officers Use This Sheet Daily

### Morning Routine (15–20 minutes):
1. **Filter by HR Officer** (column J = your name)
2. **Review all non-Deployed, non-Rejected rows** — these are your active cases
3. **Check for stale stages** — if Stage Date (column I) is more than 7 days ago, the case needs action
4. **Update statuses** — as you receive updates (medical results, visa decisions), update the relevant columns
5. **Add notes** — log any communications or events in column P

### Weekly Actions:
- **Monday:** Review all "Document Processing" cases — follow up on missing documents
- **Wednesday:** Check all "Medical" cases — confirm results received
- **Friday:** Update Deployment Status for any newly deployed candidates

### Filtering Tips:
- Filter by Stage (column H) to see all candidates at a particular stage
- Filter by Employer Name (column F) to work employer-by-employer
- Filter by HR Officer (column J) during team meetings to review each person's workload

---

## VLOOKUP Formulas Summary

| Column | Formula | Source Sheet | Looks Up | Returns |
|--------|---------|-------------|----------|---------|
| C (Candidate Name) | `=IFERROR(VLOOKUP(B2,'Master Data'!A:C,3,FALSE),"")` | Master Data | Candidate ID | Full Name |
| E (Job Title) | `=IFERROR(VLOOKUP(D2,'Job Requests'!A:D,4,FALSE),"")` | Job Requests | Job ID | Job Title |
| F (Employer Name) | `=IFERROR(VLOOKUP(D2,'Job Requests'!A:C,3,FALSE),"")` | Job Requests | Job ID | Employer Name |

**To apply formulas to all rows:**
1. Enter each formula in row 2 (C2, E2, F2)
2. Select the cell
3. Copy (Ctrl+C)
4. Select the range down to row 1000 (e.g., C3:C1000)
5. Paste (Ctrl+V)

---

## Sheet Maintenance

- **Review frequency:** Daily by HR Officers; weekly summary review by COO
- **Archiving:** Move Deployed and Rejected rows older than 6 months to "Pipeline – Archive" sheet
- **Performance monitoring:** Track average days per stage to identify bottlenecks
