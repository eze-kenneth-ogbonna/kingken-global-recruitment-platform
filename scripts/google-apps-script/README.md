# Google Apps Script — Deployment Guide

**Kingken Global Recruitment Platform**  
Company: Kingken Global Travel Agency Ltd.

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Opening the Apps Script Editor](#2-opening-the-apps-script-editor)
3. [Deployment Order](#3-deployment-order)
4. [Setting the OpenAI API Key](#4-setting-the-openai-api-key)
5. [Setting Up Triggers](#5-setting-up-triggers)
6. [Required Permissions](#6-required-permissions)
7. [Testing Each Script](#7-testing-each-script)
8. [Troubleshooting Common Errors](#8-troubleshooting-common-errors)
9. [Verifying Scripts Are Working](#9-verifying-scripts-are-working)

---

## 1. Prerequisites

| Requirement | Details |
|---|---|
| Google Account | Must have edit access to the Kingken Master Spreadsheet |
| Google Sheet | The spreadsheet must contain a sheet named exactly **`Master Data`** |
| Sheet columns | Columns must match the defined schema (A=CandidateID, B=FullName, D=Phone, E=Country, F=Position, G=ExperienceYears, H=PassportAvailable, K=Status, L=AI_Score, M=AssignedTo, O=VisaStatus, P=Notes) |
| OpenAI API Key | A valid key starting with `sk-` from [platform.openai.com](https://platform.openai.com) |
| Apps Script enabled | Google Workspace account — Apps Script must not be blocked by your domain admin |

---

## 2. Opening the Apps Script Editor

1. Open the Kingken Master Spreadsheet in Google Sheets.
2. Click **Extensions → Apps Script** in the top menu.
3. The Apps Script IDE opens in a new tab.
4. You will see a default `Code.gs` file. You can rename it or add new files.

To add each script file:

- Click the **+** icon next to "Files" in the left sidebar.
- Choose **Script**.
- Name the file exactly as listed below (without the `.gs` extension — Sheets adds it automatically).
- Paste the full contents of each `.gs` file.
- Click **Save** (Ctrl+S / Cmd+S).

---

## 3. Deployment Order

Deploy scripts in this order to avoid dependency issues:

### Step 1 — `audit-log-on-edit`

This must be deployed first because it creates the Audit Log sheet.

1. Create file `audit-log-on-edit` in Apps Script editor.
2. Paste contents of `audit-log-on-edit.gs`.
3. Save.
4. Run `protectAuditLog()` once to protect the sheet (see Section 5).

### Step 2 — `normalize-phones`

1. Create file `normalize-phones`.
2. Paste contents of `normalize-phones.gs`.
3. Save.
4. **Do not run yet** — run after all data is migrated.

### Step 3 — `deduplicate-candidates`

1. Create file `deduplicate-candidates`.
2. Paste contents of `deduplicate-candidates.gs`.
3. Save.
4. **Do not run yet** — run after phone normalization.

### Step 4 — `dashboard-refresh`

1. Create file `dashboard-refresh`.
2. Paste contents of `dashboard-refresh.gs`.
3. Save.
4. Run `refreshDashboard()` once to create and populate the Dashboard sheet.
5. Run `setupDashboardTrigger()` to schedule the daily 08:00 refresh.

### Step 5 — `ai-scoring-trigger`

1. Create file `ai-scoring-trigger`.
2. Paste contents of `ai-scoring-trigger.gs`.
3. Save.
4. Run `setOpenAIKey()` to store your API key (see Section 4).

### Step 6 — Any additional utility scripts

Follow the same paste-and-save pattern.

---

## 4. Setting the OpenAI API Key

The AI scoring script reads the key from **Script Properties** — it is never stored in the spreadsheet or visible to users.

**Method A — Via the built-in helper (recommended)**

1. Open Apps Script editor.
2. In the function dropdown at the top, select `setOpenAIKey`.
3. Click **▶ Run**.
4. A dialog box appears. Paste your OpenAI API key (starts with `sk-`).
5. Click **OK**. The key is saved to Script Properties.

**Method B — Manually via the editor**

1. In Apps Script editor, click **Project Settings** (⚙ gear icon).
2. Scroll to **Script Properties**.
3. Click **Add script property**.
4. Property name: `OPENAI_API_KEY`
5. Value: your API key.
6. Click **Save script properties**.

> ⚠️ **Never commit your API key to source control or share it in spreadsheet cells.**

---

## 5. Setting Up Triggers

### onEdit Trigger — Audit Log

This trigger must be an **installable trigger** (not a simple `onEdit`) because it calls `Session.getActiveUser().getEmail()`.

1. In Apps Script editor, click **Triggers** (clock icon in left sidebar).
2. Click **+ Add Trigger** (bottom right).
3. Configure:
   - **Function to run**: `onEditAuditLog`
   - **Deployment**: Head
   - **Event source**: From spreadsheet
   - **Event type**: On edit
4. Click **Save**.
5. Authorise the script when the permissions dialog appears.
6. Run `protectAuditLog()` once from the editor to lock the Audit Log sheet.

### Time-Driven Trigger — Dashboard Refresh

1. In the function dropdown, select `setupDashboardTrigger`.
2. Click **▶ Run**.
3. Authorise if prompted.
4. The trigger `refreshDashboard` will now run every day at 08:00.

To verify: click **Triggers** in the left sidebar — you should see both triggers listed.

---

## 6. Required Permissions (OAuth Scopes)

| Script | Permissions Required |
|---|---|
| `audit-log-on-edit` | Read/write spreadsheet, read user email (`userinfo.email`) |
| `normalize-phones` | Read/write spreadsheet |
| `deduplicate-candidates` | Read/write spreadsheet |
| `dashboard-refresh` | Read/write spreadsheet, manage triggers |
| `ai-scoring-trigger` | Read/write spreadsheet, external URL fetch (OpenAI API), Script Properties |

When you first run any function, Google will display an authorisation dialog. Click **Review permissions → Allow**.

If you see "This app is not verified", click **Advanced → Go to [project name] (unsafe)** — this is normal for internal scripts.

---

## 7. Testing Each Script

### Test `normalize-phones`

1. Add a test row to Master Data: Phone = `08012345678`, Country = `Nigeria`.
2. Run `normalizeAllPhones()`.
3. Verify the phone is now `+2348012345678`.
4. Verify column P (Notes) contains `[original phone: 08012345678]`.
5. Delete the test row when done.

### Test `deduplicate-candidates`

1. Add two rows with identical Phone numbers.
2. Run `findDuplicateCandidates()`.
3. Verify both rows show `DUPLICATE - Review` in the Duplicates column.
4. Open the `Duplicate Report` sheet and verify one row appears with `High` confidence.
5. Delete the test rows when done.

### Test `audit-log-on-edit`

1. Edit the Status cell (col K) of any existing candidate row.
2. Open the `Audit Log` sheet.
3. Verify a new row appears with the correct Timestamp, Editor Email, Old Value, and New Value.

### Test `dashboard-refresh`

1. Run `refreshDashboard()`.
2. Open the `Dashboard` sheet.
3. Verify all 16 KPI rows have labels in column A and formula results in column B.
4. Verify cell A1 shows the last refreshed timestamp.

### Test `ai-scoring-trigger`

1. Ensure the OpenAI API key is set.
2. Add a test row to Master Data with a Name, Country, Position, and ExperienceYears.
3. Run `scoreCandidateWithAI(2)` (assuming the test row is row 2).
4. Verify column L (AI_Score) now contains a number between 0 and 100.
5. Verify column P (Notes) contains the recommendation and summary.

---

## 8. Troubleshooting Common Errors

| Error | Cause | Fix |
|---|---|---|
| `Sheet "Master Data" not found` | Sheet name does not match exactly | Rename the sheet to exactly `Master Data` (case-sensitive, with space) |
| `OPENAI_API_KEY not set` | Key not saved in Script Properties | Run `setOpenAIKey()` and enter your key |
| `Exception: Request failed for api.openai.com` | Network issue or API key invalid | Check the key is valid at [platform.openai.com](https://platform.openai.com). Check UrlFetch is allowed in Apps Script settings |
| `TypeError: Cannot read property 'range' of undefined` | Trigger event object is null | Ensure trigger is installable (not a simple trigger). Re-create via the Triggers panel |
| `Script exceeded maximum execution time` | `scoreAllUnscored()` ran on too many rows | Increase the rate limit delay, or score in smaller batches manually using `scoreCandidateWithAI(rowNumber)` |
| Audit Log not capturing editor email | Running as simple trigger | Re-install as an installable trigger via the Triggers panel |
| Dashboard formulas show `#REF!` | Referenced sheet (Employers, Job Requests, Deals) does not exist | Create those sheets or the formulas will resolve to 0 via IFERROR |
| `You do not have permission to call getActiveUser` | Simple trigger context | Use installable trigger for `onEditAuditLog` |

---

## 9. Verifying Scripts Are Working

### Quick Health Check Checklist

- [ ] **Audit Log sheet** exists and has the 8 column headers.
- [ ] **Audit Log** captures an edit within 5 seconds of changing Status on any row.
- [ ] **Dashboard sheet** exists and shows non-zero `Total Candidates` count.
- [ ] **Daily trigger** appears in Triggers panel: `refreshDashboard – Time-driven – Day timer`.
- [ ] **Installable trigger** appears in Triggers panel: `onEditAuditLog – From spreadsheet – On edit`.
- [ ] Running `normalizeAllPhones()` completes with a success alert.
- [ ] Running `findDuplicateCandidates()` creates a `Duplicate Report` sheet.
- [ ] `scoreCandidateWithAI(2)` writes a numeric score to column L within 10 seconds.
- [ ] Script Properties contains `OPENAI_API_KEY` (check in ⚙ Project Settings).

### Checking Execution Logs

1. In Apps Script editor, click **Executions** (play icon in the left sidebar).
2. Review recent runs — each should show `Completed` status.
3. Click any execution to expand its log output.
4. Errors appear in red with a stack trace.
