# Tasks Sheet Schema — Kingken Global Recruitment Platform

**Sheet Name:** `Tasks`
**Purpose:** Internal task management — one row per task; tracks assignments, deadlines, and completion across all team members
**Company:** Kingken Global Travel Agency Ltd.

---

## Column Definitions

| Col | Field Name | Data Type | Example | Description |
|-----|------------|-----------|---------|-------------|
| A | Task ID | Text | `TASK-20260115-0001` | Auto-generated unique ID; format TASK-YYYYMMDD-NNNN |
| B | Task Title | Text | `Collect passport copy for KENG-20260115-0042` | Short, actionable description of the task |
| C | Category | Dropdown | `Document Collection` | Type of task for filtering and reporting |
| D | Priority | Dropdown | `High` | Urgency level of the task |
| E | Assigned To | Text | `Fatima Al-Zahra` | Team member responsible for completing this task |
| F | Created By | Text | `COO` | Team member or system that created the task |
| G | Related ID | Text | `KENG-20260115-0042` | Optional: linked Candidate ID, Job ID, Employer ID, or Pipeline ID |
| H | Due Date | Date | `2026-01-22` | Date by which the task must be completed |
| I | Status | Dropdown | `In Progress` | Current completion status |
| J | Completed Date | Date | `2026-01-21` | Date task was marked as Done |
| K | Notes | Text | `Candidate confirmed passport is ready` | Additional context, blockers, or updates |

---

## Field Detail

### Column A — Task ID
- **Format:** `TASK-YYYYMMDD-NNNN` (e.g. `TASK-20260115-0001`)
- **Generation:** Apps Script generates on new task creation using today's date + sequential counter (padded to 4 digits)
- **Uniqueness:** Script checks existing IDs before assigning; no duplicates permitted
- **Read-only:** Protected range — only Apps Script writes this field

### Column B — Task Title
- **Required:** Yes
- **Format:** Short, imperative sentence (action verb first)
- **Examples:**
  - `Collect passport copy for KENG-20260115-0042`
  - `Follow up with EMP-20260115-0001 on outstanding payment`
  - `Update pipeline stage for JOB-20260115-0001 shortlisted candidates`
  - `Schedule interview for 5 candidates — Cleaning role Kuwait`

### Column C — Category
- **Type:** Dropdown (Data Validation)
- **Allowed values:** `Document Collection`, `Interview Scheduling`, `Employer Follow-up`, `Candidate Screening`, `Payment Follow-up`, `Visa Processing`, `Medical Coordination`, `Deployment`, `Administrative`, `Tech & Maintenance`, `Other`

### Column D — Priority
- **Type:** Dropdown (Data Validation)
- **Allowed values:** `Critical`, `High`, `Medium`, `Low`
- **Definitions:**
  - `Critical` — Must be completed today; blocks deployment or deal closure
  - `High` — Must be completed within 2 business days
  - `Medium` — Complete this week
  - `Low` — No urgent deadline; complete when time allows

### Column E — Assigned To
- **Values:** Team member full name from the Kingken Global team
- **Common values:** COO, Head of Recruitment, Head of Tech, Fatima Al-Zahra, Senior Ops Manager, HR/Admin, Country Manager (Nigeria), Country Manager (Ghana), Country Manager (Kenya)
- **Source:** Assigned by manager when creating the task; team member may also self-assign

### Column F — Created By
- **Values:** Name of team member or system (e.g. `Zapier Auto`, `System`)
- **Source:** Automatically set by Apps Script to the current user's email/name on row creation
- **Used for:** Accountability and task history

### Column G — Related ID
- **Type:** Text (optional)
- **Format:** Any valid platform ID — Candidate ID, Job ID, Employer ID, Pipeline ID, or Deal ID
- **Examples:** `KENG-20260115-0042`, `JOB-20260115-0001`, `EMP-20260115-0001`, `PIP-20260115-0007`
- **Purpose:** Links this task to the relevant record for easy cross-reference
- **Note:** Free text — validation is not enforced to allow flexibility

### Column H — Due Date
- **Format:** `YYYY-MM-DD`
- **Required for:** Priority = Critical or High
- **Validation:** Must be a valid date; warn if set in the past on creation

### Column I — Status
- **Type:** Dropdown (Data Validation)
- **Allowed values:** `Not Started`, `In Progress`, `Blocked`, `Done`, `Cancelled`
- **Workflow:**
  ```
  Not Started → In Progress → Done
                           ↘ Blocked (waiting on external input)
                           ↘ Cancelled (no longer needed)
  ```
- **Stage descriptions:**
  - `Not Started` — Task created but work not yet begun
  - `In Progress` — Task is actively being worked on
  - `Blocked` — Progress stopped; waiting on candidate, employer, or external party
  - `Done` — Task completed successfully
  - `Cancelled` — Task no longer required

### Column J — Completed Date
- **Format:** `YYYY-MM-DD`
- **Auto-set:** Apps Script `onEdit` trigger sets this to today's date when Status changes to "Done"
- **Clear when:** If status is changed back from "Done", this field should be cleared
- **Used for:** Productivity reporting; average task completion time

### Column K — Notes
- **Type:** Free text; wrap text enabled
- **Usage:** Blocker details, candidate/employer responses, follow-up instructions, rejection reasons

---

## Data Validation Rules

```
Column C (Category):
  Type: List from range (or custom list)
  Values: Document Collection,Interview Scheduling,Employer Follow-up,Candidate Screening,Payment Follow-up,Visa Processing,Medical Coordination,Deployment,Administrative,Tech & Maintenance,Other
  Show dropdown in cell: Yes
  Reject invalid input: Yes

Column D (Priority):
  Type: List from range (or custom list)
  Values: Critical,High,Medium,Low
  Show dropdown in cell: Yes
  Reject invalid input: Yes

Column I (Status):
  Type: List from range (or custom list)
  Values: Not Started,In Progress,Blocked,Done,Cancelled
  Show dropdown in cell: Yes
  Reject invalid input: Yes

Column H (Due Date):
  Type: Date
  Criteria: Is a valid date
  Show warning on invalid: Yes

Column J (Completed Date):
  Type: Date
  Criteria: Is a valid date
  Show warning on invalid: Yes
```

---

## Conditional Formatting Rules

### Column D — Priority

| Condition | Background Color | Text Color | Hex Code |
|-----------|-----------------|------------|----------|
| Value = "Critical" | Dark Red | White | `#B71C1C` |
| Value = "High" | Orange | Black | `#FF9800` |
| Value = "Medium" | Yellow | Black | `#FFF176` |
| Value = "Low" | Light Grey | Black | `#EEEEEE` |

### Column I — Status

| Condition | Background Color | Text Color | Hex Code |
|-----------|-----------------|------------|----------|
| Value = "Not Started" | Light Blue | Black | `#B3E5FC` |
| Value = "In Progress" | Amber | Black | `#FFD54F` |
| Value = "Blocked" | Red | White | `#C62828` |
| Value = "Done" | Green | White | `#2E7D32` |
| Value = "Cancelled" | Grey | White | `#757575` |

### Column H — Due Date (overdue highlight)
```
Condition: =AND(H2<>"", H2<TODAY(), I2<>"Done", I2<>"Cancelled")
Background: Dark Red #B71C1C
Text Color: White
Purpose: Flag all overdue tasks that are not yet Done or Cancelled
```

### Column H — Due Date (due today)
```
Condition: =AND(H2<>"", H2=TODAY(), I2<>"Done", I2<>"Cancelled")
Background: Orange #FF9800
Purpose: Highlight tasks due today
```

---

## Protected Ranges

| Range | Protection Level | Who Can Edit |
|-------|-----------------|--------------|
| Column A (Task ID) | Script-only | Apps Script service account |
| Column J (Completed Date) | Script-only | Apps Script service account (auto-set on Done) |

---

## Key Formulas

### Count tasks by status (used in Dashboard)
```
=COUNTIF(I2:I,"Not Started")
=COUNTIF(I2:I,"In Progress")
=COUNTIF(I2:I,"Blocked")
=COUNTIF(I2:I,"Done")
=COUNTIF(I2:I,"Cancelled")
```

### Count overdue tasks (due date passed, not Done or Cancelled)
```
=COUNTIFS(H2:H,"<"&TODAY(),I2:I,"<>Done",I2:I,"<>Cancelled")
```

### Count tasks due today
```
=COUNTIFS(H2:H,TODAY(),I2:I,"<>Done",I2:I,"<>Cancelled")
```

### Count tasks assigned to a specific team member
```
=COUNTIF(E2:E,"Fatima Al-Zahra")
```

### Count open tasks by priority
```
=COUNTIFS(D2:D,"Critical",I2:I,"<>Done",I2:I,"<>Cancelled")
=COUNTIFS(D2:D,"High",I2:I,"<>Done",I2:I,"<>Cancelled")
```

### Average task completion time (days from creation to Done)
```
=AVERAGEIF(I2:I,"Done",J2:J-A_creation_date_column)
```
*Requires a creation date column; can be approximated from Task ID YYYYMMDD portion*

---

## Sheet Settings

- **Freeze rows:** Row 1 (headers) frozen
- **Freeze columns:** Column A (Task ID) frozen for horizontal scroll
- **Sort default:** By Column D (Priority) then Column H (Due Date) — most urgent first
- **Filter views:**
  - "My Tasks" — filter by Column E (Assigned To = current user)
  - "Critical & High" — Priority = Critical or High, Status ≠ Done/Cancelled
  - "Overdue" — Due Date < TODAY(), Status ≠ Done/Cancelled
  - "Blocked Tasks" — Status = Blocked
  - "Due Today" — Due Date = TODAY()
- **Tab color:** Red `#C62828`
- **Row height:** 21px default; expand column K (Notes) to wrap text

---

## Notes

- Do not delete task rows — set Status to "Cancelled" if no longer needed
- Do not manually edit Task ID or Completed Date (auto-managed)
- The "Blocked" status must always be accompanied by an explanation in Notes (Column K)
- Critical tasks that remain "Not Started" by 10 AM should be escalated to the COO
- Weekly review: every Monday, Senior Ops Manager reviews all open tasks and reassigns any overdue items

---

*Maintained by: Senior Ops Manager | Contact: info@kingkenglobal.com.ng | https://www.kingkenglobal.com.ng*
