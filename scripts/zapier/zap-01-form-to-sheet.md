# Zap 01 — New Worker Application → Master Data

**Zap Name:** `Kingken - New Worker Application → Master Data`  
**Platform:** Kingken Global Recruitment Platform  
**Company:** Kingken Global Travel Agency Ltd.  
**Status:** Production

---

## Overview

This Zap captures every new submission from the Kingken Worker Application Google Form and creates a structured candidate row in the Master Data sheet with a generated CandidateID, normalized field defaults, and initial status of "New".

---

## Trigger

| Setting | Value |
|---|---|
| App | Google Forms |
| Event | New Response in Spreadsheet |
| Form | **Kingken Worker Application Form** |
| Spreadsheet | *(select the linked Google Form response spreadsheet)* |
| Worksheet | Form Responses 1 |

**Setup steps:**
1. In Zapier, search for **Google Forms**.
2. Select trigger event: **New Response in Spreadsheet**.
3. Connect your Google account.
4. Select the Google Sheet linked to your Worker Application Form.
5. Select worksheet **Form Responses 1**.
6. Click **Test Trigger** — Zapier will pull the most recent form response.

---

## Action 1 — Formatter by Zapier (Handle Empty Fields)

| Setting | Value |
|---|---|
| App | Formatter by Zapier |
| Event | Text |
| Transform | Default Value |

**Field mapping for default values:**

| Field | Source | Default if Empty |
|---|---|---|
| Full Name | Form: Full Name | `Unknown Applicant` |
| Phone | Form: Phone Number | `0000000000` |
| Nationality | Form: Nationality / Country | `Unknown` |
| Position | Form: Position Applying For | `Other` |
| Years Experience | Form: Years of Experience | `0` |
| Passport | Form: Passport Available | `No` |
| CV Link | Form: CV Upload (URL) | *(leave blank)* |

**Purpose:** Ensures no critical field is blank before writing to the sheet.

---

## Action 2 — Code by Zapier (Generate CandidateID)

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
const rand  = String(Math.floor(Math.random() * 9000) + 1000); // 4-digit random
const candidateId = `KENG-${year}${month}${day}-${rand}`;
output = [{ candidateId }];
```

**Output variable:** `candidateId`

---

## Action 3 — Filter (Only Continue if FullName is Not Empty)

| Setting | Value |
|---|---|
| App | Filter by Zapier |
| Condition | Full Name (from Formatter) **does not contain** `Unknown Applicant` |

> If the form was submitted without a name the Zap stops here, preventing ghost rows in Master Data.

---

## Action 4 — Google Sheets (Create Spreadsheet Row)

| Setting | Value |
|---|---|
| App | Google Sheets |
| Event | Create Spreadsheet Row |
| Spreadsheet | *(select Kingken Master Spreadsheet)* |
| Worksheet | **Master Data** |

**Column → Value Mapping:**

| Column | Field Name | Value Source |
|---|---|---|
| A | CandidateID | Code output: `candidateId` |
| B | FullName | Formatter: Full Name |
| C | Timestamp | Form: Timestamp (or use `{{zap_meta_human_now}}`) |
| D | Phone | Formatter: Phone |
| E | Country | Formatter: Nationality |
| F | Position | Formatter: Position |
| G | ExperienceYears | Formatter: Years Experience |
| H | PassportAvailable | Formatter: Passport |
| I | CV_Link | Formatter: CV Link |
| J | SourceSheetRow | Google Forms: Row Number |
| K | Status | Static text: `New` |
| L | AI_Score | Static text: *(leave blank)* |
| M | AssignedTo | Static text: *(leave blank)* |
| N | LastUpdated | `{{zap_meta_human_now}}` |

> **Important:** Column order in this mapping must exactly match the column headers in your Master Data sheet. Verify by opening the sheet and comparing headers against this table.

---

## Testing Instructions

1. Open your Kingken Worker Application Google Form.
2. Submit a **test response** with realistic data (use a fake phone like `08099999999`).
3. Return to Zapier and click **Test Zap**.
4. Verify the Zap completes all steps with green checkmarks.
5. Open the Master Data sheet and confirm a new row was added.
6. Verify the CandidateID follows the format `KENG-YYYYMMDD-XXXX`.
7. Verify Status = `New`.
8. Delete the test row from Master Data when confirmed.

---

## Common Errors and Fixes

| Error | Cause | Fix |
|---|---|---|
| `Unable to find worksheet "Master Data"` | Sheet name mismatch | Open the spreadsheet and verify the sheet tab is named exactly `Master Data` (case-sensitive, with space) |
| Columns are written to wrong fields | Column order mismatch | Re-open the Google Sheets action and re-map each field manually to the correct column header |
| Duplicate rows appear | Zap triggered twice | Check if the Form response sheet has multiple worksheets — select only `Form Responses 1` |
| CandidateID not generated | Code step error | Open the Code step → View output to see the JavaScript error. Common fix: ensure the Code step uses **Run JavaScript** not **Run Python** |
| Empty rows created | Filter not stopping empty submissions | Move the Filter step before the Sheets action, and also check the form for required fields |
| `401 Unauthorized` on Google Sheets | Auth expired | Reconnect the Google account in Zapier under **My Apps** |
