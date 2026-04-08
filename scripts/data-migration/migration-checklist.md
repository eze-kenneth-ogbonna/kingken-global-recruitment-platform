# Data Migration Checklist

**Platform:** Kingken Global Recruitment Platform  
**Company:** Kingken Global Travel Agency Ltd.  
**Version:** 1.0

---

## Overview

This checklist guides the safe migration of existing candidate data (from spreadsheets, paper records, or old CRM exports) into the new Master Data sheet. Follow every step in order. Do not skip steps.

---

## Pre-Migration Phase

### Step 1 — Back Up All Existing Data

- [ ] Open the existing candidate spreadsheet (or export from the old CRM).
- [ ] Click **File → Download → Microsoft Excel (.xlsx)**.
- [ ] Save the backup file as:
  `Kingken_CandidateBackup_YYYYMMDD.xlsx`
  (e.g. `Kingken_CandidateBackup_20241215.xlsx`)
- [ ] Store the backup in a secure Google Drive folder: **Kingken Global / Backups / Migration**.
- [ ] Confirm backup file opens correctly and all rows are present.
- [ ] Record backup row count: `_______ rows` (including header).

### Step 2 — Verify Column Mapping

Before importing, confirm your source data columns map to Master Data columns:

| Source Column | Master Data Column | Notes |
|---|---|---|
| Full Name / Applicant Name | B — FullName | Required |
| Phone / Mobile | D — Phone | Will be normalised later |
| Nationality / Country | E — Country | Must match approved country list |
| Job Applied / Role | F — Position | Must match approved position list |
| Years of Experience | G — ExperienceYears | Numeric only |
| Passport (Yes/No) | H — PassportAvailable | Must be "Yes" or "No" |
| CV / Resume Link | I — CV_Link | Google Drive or Dropbox URL |
| Application Date | C — Timestamp | Convert to DD/MM/YYYY if needed |

- [ ] Verify each source column maps correctly.
- [ ] Note any unmapped source columns: `_______________________`
- [ ] Note any missing required fields: `_______________________`

### Step 3 — Test on 5 Rows First

- [ ] Copy 5 representative rows from the source data.
- [ ] Manually paste them into Master Data (rows 2–6).
- [ ] Run `normalizeAllPhones()` and verify phones are correctly formatted.
- [ ] Run `findDuplicateCandidates()` and verify no false positives.
- [ ] Run `scoreCandidateWithAI(2)` through `scoreCandidateWithAI(6)` on the test rows.
- [ ] Confirm scores appear in column L and notes in column P.
- [ ] **Delete** the 5 test rows before proceeding to full migration.

### Step 4 — Prepare the CandidateID Generator

Each migrated row needs a unique CandidateID in the format `KENG-YYYYMMDD-NNNN`.

- [ ] In the Apps Script editor, confirm `migrateFormResponsesToMaster()` function exists (or use the manual formula below).
- [ ] As an alternative, generate IDs with this spreadsheet formula in a staging column:
  ```
  ="KENG-"&TEXT(TODAY(),"YYYYMMDD")&"-"&TEXT(ROW()-1,"0000")
  ```
- [ ] Verify no two rows have the same CandidateID.

---

## Migration Steps

### Step 5 — Run the Migration

**Option A: Apps Script migration function**

1. Open Apps Script editor (Extensions → Apps Script).
2. Select the function `migrateFormResponsesToMaster`.
3. Click **▶ Run**.
4. Monitor the execution log for errors.
5. Note the number of rows migrated from the log output.

**Option B: Manual paste**

1. Copy all rows from the source spreadsheet (excluding the header row).
2. In Master Data, click on cell **A2** (first data row).
3. Paste using **Ctrl+Shift+V** (paste values only — not formatting).
4. Manually add CandidateIDs to column A using the formula above.
5. Set Status (column K) to `New` for all migrated rows if not already set.

### Step 6 — Verify Row Count

- [ ] Count rows in source: `_______ rows`
- [ ] Count rows in Master Data after migration: `_______ rows`
- [ ] Confirm counts match (or document any intentionally excluded rows).

### Step 7 — Run Phone Normalization

1. Open Apps Script editor.
2. Select function `normalizeAllPhones`.
3. Click **▶ Run**.
4. Review the alert summary: note changed count, skipped count, error count.
5. Spot-check 5 random rows to verify phone format is `+[country code][number]`.

- [ ] Phone normalisation completed. Changes: `_______` | Errors: `_______`

### Step 8 — Run Duplicate Detection

1. Select function `findDuplicateCandidates`.
2. Click **▶ Run**.
3. Open the **Duplicate Report** sheet.
4. Review all flagged rows.

- [ ] Duplicate scan completed. Duplicates found: `_______`
- [ ] All High confidence duplicates reviewed: `_______` resolved, `_______` kept

### Step 9 — Manually Review Flagged Records

For each row marked `DUPLICATE - Review` in the Duplicates column:

- [ ] Compare the two candidate rows side-by-side.
- [ ] Decision options:
  - **Keep both** (different people with same name): clear the Duplicates flag.
  - **Merge records**: copy any missing data to the primary record, then delete the duplicate row.
  - **Delete one**: if certain it is a duplicate, delete the weaker/older record.
- [ ] Clear the Duplicates column value once resolved.
- [ ] All duplicate flags resolved: Yes / No

---

## Post-Migration Phase

### Step 10 — Verify Dashboard Counts

1. Open Apps Script editor, run `refreshDashboard()`.
2. Open the **Dashboard** sheet.
3. Verify:
   - [ ] Total Candidates matches the migrated row count.
   - [ ] Status counts (New, Screened, etc.) add up to Total Candidates.
   - [ ] No `#REF!` or `#VALUE!` errors in any formula cell.

### Step 11 — Spot-Check 10 Random Records

Randomly select 10 rows from Master Data and verify each:

- [ ] CandidateID is in `KENG-YYYYMMDD-NNNN` format.
- [ ] Phone is in E.164 format (`+[country code][number]`).
- [ ] Country matches the approved country list.
- [ ] Position matches the approved position list.
- [ ] Status is one of: New, Screened, Approved, Rejected, Processing, Deployed.
- [ ] No critical fields are blank (FullName, Phone, Country, Position).

### Step 12 — Test AI Scoring on 3 Records

1. Find 3 rows with empty AI_Score (column L).
2. Run `scoreCandidateWithAI(rowNumber)` for each.
3. Verify scores appear in column L (0–100 numeric).
4. Verify notes appear in column P.

- [ ] AI scoring works on migrated records: Yes / No

### Step 13 — Confirm Team Access

- [ ] Share the Master Spreadsheet with all team members.
- [ ] Verify each team member can view and edit their permitted columns.
- [ ] Confirm the Audit Log trigger is active and capturing edits.
- [ ] Send a test WhatsApp to confirm WATI integration is live.

---

## Rollback Plan

**If the migration fails or data is corrupted:**

### Rollback Step 1 — Identify the Problem

- Note the error message and the last successful step completed.
- Do not make any further changes to Master Data.

### Rollback Step 2 — Clear the Corrupted Data

1. Select all data rows in Master Data (rows 2 to last row).
2. Press **Delete** (do not delete rows — just clear the cell contents).
3. Verify the header row (row 1) is intact.

### Rollback Step 3 — Restore from Backup

1. Open the backup file `Kingken_CandidateBackup_YYYYMMDD.xlsx`.
2. Copy all data rows (excluding header).
3. Paste into Master Data starting from cell A2 using **Ctrl+Shift+V** (values only).
4. Verify row count matches the backup.

### Rollback Step 4 — Verify Restoration

- [ ] Row count matches backup: `_______ rows`
- [ ] No data corruption visible.
- [ ] Audit Log shows the restoration event.

### Rollback Step 5 — Investigate Root Cause

Before attempting the migration again:
1. Review the Apps Script execution log for errors.
2. Fix the identified issue.
3. Re-run the 5-row test (Step 3) before proceeding.

---

## Migration Sign-Off

| Item | Person Responsible | Date Completed | Sign-Off |
|---|---|---|---|
| Data backup completed | | | |
| Column mapping verified | | | |
| Migration executed | | | |
| Phone normalization done | | | |
| Duplicates resolved | | | |
| Dashboard verified | | | |
| Team access confirmed | | | |
| Migration approved | COO | | |
