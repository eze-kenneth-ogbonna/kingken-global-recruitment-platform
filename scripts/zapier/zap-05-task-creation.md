# Zap 05 — Create Recruiter Task for New Candidate

**Zap Name:** `Kingken - Create Recruiter Task for New Candidate`  
**Platform:** Kingken Global Recruitment Platform  
**Company:** Kingken Global Travel Agency Ltd.  
**Status:** Production

---

## Overview

When a new candidate row appears in Master Data with an AI Score ≥ 60, this Zap automatically creates a task card in Trello (primary) or a Notion database item (alternative) so the recruitment team has a structured action item to review and action the candidate.

---

## Trigger

| Setting | Value |
|---|---|
| App | Google Sheets |
| Event | New Spreadsheet Row |
| Spreadsheet | *(Kingken Master Spreadsheet)* |
| Worksheet | **Master Data** |

---

## Filter — Only Continue if AI_Score ≥ 60

| Setting | Value |
|---|---|
| App | Filter by Zapier |
| Condition 1 | AI_Score (column L) **greater than or equal to** `60` |
| Condition 2 | AI_Score (column L) **is not empty** |
| Logic | AND (both conditions must be true) |

> This ensures only high and medium priority candidates generate tasks, preventing recruiter overload from low-quality applications.

---

## Action 1 (Primary) — Trello (Create Card)

| Setting | Value |
|---|---|
| App | Trello |
| Event | Create Card |
| Board | **Kingken Recruitment** |
| List | **To Screen** |

**Card fields:**

| Field | Value |
|---|---|
| Name | `{{FullName}} – {{Position}} ({{Country}})` |
| Description | See template below |
| Due Date | *(use Code by Zapier to add 3 days to today — see below)* |
| Label | Dynamic colour based on score (see label logic) |

**Card description template:**

```
🆔 Candidate ID   : {{CandidateID}}
👤 Full Name      : {{FullName}}
🌍 Country        : {{Country}}
💼 Position       : {{Position}}
📊 AI Score       : {{AI_Score}} / 100
📅 Applied        : {{Timestamp}}
📁 Experience     : {{ExperienceYears}} years
🛂 Passport       : {{PassportAvailable}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ ACTION REQUIRED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Open Master Data sheet and locate candidate {{CandidateID}}.
2. Review their full profile and AI screening notes.
3. Call or WhatsApp candidate within 3 business days.
4. Update Status in Master Data to "Screened", "Approved", or "Rejected".
5. Move this card to the appropriate Trello list.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CV Link: {{CV_Link}}
```

**Due date (3 days from now) — Code by Zapier:**

Add a Code step before the Trello action:

```javascript
const now = new Date();
now.setDate(now.getDate() + 3);
const dueDate = now.toISOString(); // Trello accepts ISO 8601
output = [{ dueDate }];
```

**Label colour logic — Code by Zapier:**

```javascript
const score = parseInt(inputData.aiScore, 10) || 0;
let label;
if (score >= 80)       { label = 'green';  }  // High priority
else if (score >= 60)  { label = 'yellow'; }  // Medium priority
else                   { label = 'red';    }  // Low (shouldn't reach here due to filter)
output = [{ label }];
```

> Map the `label` output to the **Label Colour** field in the Trello action. Ensure your Trello board has Green, Yellow, and Red labels configured.

---

## Action 1 (Alternative) — Notion (Create Database Item)

Use this if your team prefers Notion over Trello.

| Setting | Value |
|---|---|
| App | Notion |
| Event | Create Database Item |
| Database | **Kingken Candidate Tasks** *(pre-create this in Notion)* |

**Property mapping:**

| Notion Property | Type | Value |
|---|---|---|
| Title | Title | `{{FullName}} – {{Position}}` |
| Candidate ID | Text | `{{CandidateID}}` |
| Country | Select | `{{Country}}` |
| Position | Select | `{{Position}}` |
| AI Score | Number | `{{AI_Score}}` |
| Experience (years) | Number | `{{ExperienceYears}}` |
| Passport | Select | `{{PassportAvailable}}` |
| Applied Date | Date | `{{Timestamp}}` |
| Due Date | Date | Code output: `dueDate` |
| Status | Select | `To Screen` |
| CV Link | URL | `{{CV_Link}}` |
| Priority | Select | Code output: label (`High` / `Medium`) |

**Notion database setup:**
1. Create a new Notion database named **Kingken Candidate Tasks**.
2. Add the property columns listed above with matching types.
3. Create a **Board view** grouped by Status: `To Screen | In Progress | Screened | Approved | Rejected`.

---

## Testing Instructions

1. Add a test row to Master Data with:
   - AI_Score = `75`
   - FullName = `Test Recruiter Task`
   - Country = `Nigeria`
   - Position = `Driver`
   - ExperienceYears = `4`
   - PassportAvailable = `Yes`
2. In Zapier, click **Test Zap**.
3. Verify the Filter passes (score ≥ 60 ✓).
4. Open Trello board **Kingken Recruitment** → list **To Screen** and confirm the card appears.
5. Verify the card description has all fields populated.
6. Verify the due date is 3 days from today.
7. Delete the test row from Master Data and archive the test card in Trello.

---

## Common Errors and Fixes

| Error | Cause | Fix |
|---|---|---|
| Filter blocks all rows | AI_Score is a string, not a number | In Zapier formatter, add a **Numbers** → **Format Number** step before the filter to convert AI_Score to a numeric value |
| Trello: `Board not found` | Board name mismatch | Open Trello and ensure the board is named exactly `Kingken Recruitment`. Re-connect Trello in Zapier if needed |
| Trello: `List not found` | List name mismatch | Ensure the list is named exactly `To Screen` (capital T, capital S) |
| Due date shows wrong date | Timezone offset | In the Code step, use `new Date()` with your timezone: `const tz = 'Africa/Lagos'; /* adjust for GST */` |
| Notion: `Property type mismatch` | Wrong property type in Notion database | Check each property type in Notion matches the table above (e.g. AI Score must be `Number` not `Text`) |
| Card created but description is blank | Newlines stripped by Zapier | Replace `\n` characters with HTML `<br>` or use Trello's markdown: double newline for paragraph breaks |
