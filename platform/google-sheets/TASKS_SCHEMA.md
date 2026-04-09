# Tasks Sheet – Column Documentation

**Sheet Tab Name:** `Tasks`
**Purpose:** Team task management. Tracks all action items across the business, linked to candidates, jobs, employers, or general operations.

---

## Column Reference (A–J)

| Col | Field Name | Type | Description |
|-----|-----------|------|-------------|
| A | Task ID | Text | Unique task identifier |
| B | Task Title | Text | Short title describing the task |
| C | Description | Text | Detailed description of what needs to be done |
| D | Assigned To | Text | Name of the team member responsible |
| E | Role | Dropdown | Role category of the assigned person |
| F | Related To | Text | ID or description of related record |
| G | Priority | Dropdown | Task urgency level |
| H | Due Date | Date | Deadline for task completion |
| I | Status | Dropdown | Current task status |
| J | Notes | Text | Updates, blockers, and comments |

---

## Column A – Task ID

**Format:** `TASK-YYYYMMDD-NNNN`

**Examples:**
- `TASK-20260115-0001`
- `TASK-20260301-0014`

**Rules:**
- YYYYMMDD = date the task was created
- NNNN = sequential number for that day, padded to 4 digits
- Tasks are created manually, via Zapier (Zap 05), or by the COO

---

## Column B – Task Title

**Type:** Short text  
**Required:** Yes  
**Examples:**
- `Follow up with Al-Rashid for document submission`
- `Schedule interview for Candidate KENG-20260115-0045`
- `Send invoice INV-2026-007 to employer`
- `Update Pipeline for 5 new deployed workers`

---

## Column C – Description

**Type:** Long text  
**Required:** Recommended  
**Example:**
```
Candidate KENG-20260115-0045 has been selected by Gulf FM. HR Officer Grace 
needs to collect: passport copy, 2 photos, birth certificate, and signed 
employment contract by Friday. Send reminder via WhatsApp.
```

---

## Column D – Assigned To

**Type:** Text (or dropdown from team list)  
**Required:** Yes  
**Example:** `Grace Adaeze`, `Ibrahim Khalil`, `Kenneth Eze`

---

## Column E – Role

**Type:** Dropdown  
**Required:** Yes  
**Options:**
- CEO
- COO
- HR
- Recruiter
- Operations Manager
- Country Manager

**Setup:**
1. Select E2:E1000
2. Data → Data Validation → List of items
3. Enter: `CEO,COO,HR,Recruiter,Operations Manager,Country Manager`

---

## Column F – Related To

**Type:** Text  
**Required:** Recommended  
**Format:** Enter the ID and type of related record  
**Examples:**
- `KENG-20260115-0045` (Candidate ID)
- `JOB-20260201-0003` (Job ID)
- `EMP-20260115-0001` (Employer ID)
- `General` (for non-specific tasks)

---

## Column G – Priority

**Type:** Dropdown  
**Required:** Yes  
**Options:**
- High
- Medium
- Low

**Conditional Formatting:**

| Priority | Background Colour | Text Colour |
|----------|------------------|-------------|
| High | Red (`#FF0000`) | White |
| Medium | Orange (`#FF9900`) | White |
| Low | Green (`#00CC00`) | White |

**Setup:**
1. Select G2:G1000
2. Format → Conditional formatting
3. Add rule: "Text is exactly" → `High` → Red background, white text
4. Add rule: "Text is exactly" → `Medium` → Orange background, white text
5. Add rule: "Text is exactly" → `Low` → Green background, white text

---

## Column H – Due Date

**Type:** Date  
**Required:** Yes  
**Format:** `DD/MM/YYYY`  
**Note:** Set realistic due dates. Overdue tasks (Due Date < Today with Status ≠ Done) should trigger an alert.

---

## Column I – Status

**Type:** Dropdown  
**Required:** Yes  
**Options:**
- To Do
- In Progress
- Done
- Blocked

**Status Definitions:**

| Status | Meaning |
|--------|---------|
| To Do | Task created, not yet started |
| In Progress | Assignee is actively working on it |
| Done | Task completed; all actions taken |
| Blocked | Cannot proceed due to external dependency |

**Conditional Formatting:**

| Status | Background Colour | Text Colour |
|--------|------------------|-------------|
| To Do | Light Grey (`#CCCCCC`) | Black |
| In Progress | Yellow (`#FFFF00`) | Black |
| Done | Green (`#00CC00`) | White |
| Blocked | Red (`#FF0000`) | White |

**Setup:**
1. Select I2:I1000
2. Format → Conditional formatting
3. Add one rule per status with colours above

---

## Column J – Notes

**Type:** Long text  
**Required:** No  
**Use for:** Progress updates, blocker explanations, communication logs, links to documents.

---

## Integration with Zapier (Zap 05 – Task Creation)

### How Tasks Are Auto-Created via Zapier

**Zap 05 – Automatic Task Creation Triggers:**

| Trigger Event | Task Created | Assigned To | Priority |
|---------------|-------------|-------------|----------|
| New candidate submits form | "Review new application: [Candidate Name]" | HR | High |
| Candidate reaches "Selected" stage | "Collect documents for [Candidate Name]" | HR | High |
| New job request received | "Review and assign recruiter: [Job ID]" | COO | High |
| Deal created | "Send invoice to [Employer Name]" | Operations Manager | High |
| Payment due in 3 days | "Follow up payment: [Invoice Number]" | Operations Manager | Medium |

**Zapier Setup for Zap 05:**
1. Trigger: Google Sheets → New Row (Pipeline sheet, Stage = "Selected")
2. Action: Google Sheets → Create Row in Tasks sheet
3. Map fields:
   - Task ID: `TASK-{{date:YYYYMMDD}}-{{zap_meta_human_id}}`
   - Task Title: `Collect documents for {{Candidate Name}}`
   - Assigned To: `[Default HR Officer name]`
   - Role: `HR`
   - Related To: `{{Candidate ID}}`
   - Priority: `High`
   - Due Date: `{{date + 3 days}}`
   - Status: `To Do`

---

## How COO Uses This Sheet for Daily Team Management

### COO Morning Routine (10–15 minutes):

1. **Open Tasks sheet**
2. **Filter by Status = "To Do" and "In Progress"** — view all active tasks
3. **Filter by Due Date ≤ Today** — identify overdue tasks
4. **Review High priority tasks** (filter G = "High") — ensure they're being worked on
5. **Check Blocked tasks** (filter I = "Blocked") — identify blockers and resolve them
6. **Assign any unassigned tasks** — fill in column D for any tasks with empty Assigned To
7. **Add notes** for any decisions made in column J

### Daily Stand-Up Use:
- Share screen showing Tasks filtered by team member
- Each team member updates their task statuses
- COO notes any new urgent tasks

---

## Filtering by Assigned To

**To filter tasks by team member:**
1. Click the dropdown arrow in the column D header
2. Select "Filter by condition" → "Text contains" → enter the team member's name
3. Or use: Data → Create a filter → select column D → filter by name

**Create Saved Filter Views:**
1. Data → Filter views → Create new filter view
2. Set filter on column D for each team member
3. Name each view (e.g., "Grace's Tasks", "Ibrahim's Tasks")
4. Share the view URL directly with the team member

---

## Email Reminders via Zapier for Overdue Tasks

**Zap: Overdue Task Email Alert**

**Trigger:** Schedule → Every day at 8:00 AM  
**Action 1:** Google Sheets → Lookup Row → find rows where Due Date < Today AND Status ≠ "Done"  
**Action 2:** Gmail → Send Email

**Email Template:**
```
Subject: ⚠️ Overdue Task Reminder – Kingken Global

Hi {{Assigned To}},

You have an overdue task:

Task: {{Task Title}}
Due Date: {{Due Date}}
Priority: {{Priority}}
Related To: {{Related To}}

Please update the status or add a note about any blockers.

Best regards,
Kingken Global – Operations
```

**Alternative using Zapier "Digest" method:**
1. Trigger: Schedule → Daily 8 AM
2. Action: Filter → Only continue if row count > 0
3. Action: Formatter → Create overdue task list
4. Action: Gmail → Send digest email to COO listing all overdue tasks

---

## Weekly Task Review Process

**When:** Every Monday morning (or Friday afternoon)  
**Who:** COO + all team members  
**Duration:** 30 minutes

**Agenda:**
1. **Review Done tasks from last week** — confirm completion; close or archive
2. **Review Blocked tasks** — identify and resolve blockers
3. **Set priorities for coming week** — update Priority column for active tasks
4. **Create new tasks for the week** — add rows for known upcoming work
5. **Archive completed tasks** — move rows with Status = "Done" older than 2 weeks to "Tasks – Archive" sheet

**Monthly Review:**
- Export the Tasks sheet as CSV
- Analyse: average task completion time, most common blockers, team workload distribution
- Report to CEO: team productivity summary

---

## Sheet Maintenance

- **Review frequency:** Daily (all team members); weekly team review led by COO
- **Archiving:** Move "Done" tasks older than 30 days to "Tasks – Archive"
- **Naming conventions:** Use consistent names in Assigned To (same spelling always)
- **Access:** All team members can view; HR/Recruiters can edit their own rows; COO can edit all
