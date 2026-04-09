# Employers Sheet – Column Documentation

**Sheet Tab Name:** `Employers`
**Purpose:** Central registry of all employer companies and hiring contacts.

---

## Column Reference (A–L)

| Col | Field Name | Type | Description |
|-----|-----------|------|-------------|
| A | EmployerID | Text | Unique employer identifier |
| B | Company Name | Text | Full registered company name |
| C | Country | Dropdown | Country where employer is based |
| D | Industry | Dropdown | Employer's industry sector |
| E | Contact Person | Text | Full name of primary contact |
| F | Contact Phone | Text | Phone number in E.164 format |
| G | Contact Email | Email | Primary email address |
| H | WhatsApp Number | Text | WhatsApp contact in E.164 format |
| I | Status | Dropdown | Current employer relationship status |
| J | Total Workers Requested | Number | Sum of all workers requested across jobs |
| K | Total Workers Deployed | Formula | Auto-calculated from Pipeline sheet |
| L | Notes | Text | Free-form notes and comments |

---

## Column A – EmployerID

**Format:** `EMP-YYYYMMDD-NNNN`

**Examples:**
- `EMP-20260115-0001` (first employer added on 15 Jan 2026)
- `EMP-20260115-0002` (second employer added on 15 Jan 2026)
- `EMP-20260301-0047` (employer #47, added 1 Mar 2026)

**Rules:**
- YYYYMMDD = date the employer record was created
- NNNN = sequential number padded to 4 digits, resets each day
- IDs are assigned manually when creating a new row
- Never reuse or modify an existing EmployerID
- This column is **protected** (see Protected Range section below)

---

## Column B – Company Name

**Type:** Short text  
**Required:** Yes  
**Example:** `Al-Rashid Construction LLC`, `Gulf Facilities Management`

---

## Column C – Country

**Type:** Dropdown (Data Validation)  
**Required:** Yes  
**Options:**
- Kuwait
- UAE
- Qatar
- Saudi Arabia
- Bahrain
- Oman
- Other

**Setup:**  
1. Select column C (C2:C1000)
2. Data → Data Validation → Criteria: List of items
3. Enter: `Kuwait,UAE,Qatar,Saudi Arabia,Bahrain,Oman,Other`
4. Set "If invalid data: Reject input" and "Show dropdown list in cell"

---

## Column D – Industry

**Type:** Dropdown (Data Validation)  
**Required:** Yes  
**Options:**
- Construction
- Cleaning
- Hospitality
- Logistics
- Healthcare
- Manufacturing
- Other

**Setup:**  
1. Select column D (D2:D1000)
2. Data → Data Validation → Criteria: List of items
3. Enter: `Construction,Cleaning,Hospitality,Logistics,Healthcare,Manufacturing,Other`
4. Set "If invalid data: Reject input" and "Show dropdown list in cell"

---

## Column E – Contact Person

**Type:** Short text  
**Required:** Yes  
**Example:** `Mohammed Al-Rashid`, `Sarah Johnson`

---

## Column F – Contact Phone

**Type:** Text (E.164 format)  
**Required:** Yes  
**Format:** `+[country code][number]` — no spaces or dashes  
**Examples:** `+96565001234`, `+97150012345`, `+96569048174`

**Data Validation:**  
1. Select F2:F1000
2. Data → Data Validation → Custom formula: `=REGEXMATCH(TEXT(F2,"0"),"\+[0-9]{7,15}")`
3. Help text: "Enter phone in E.164 format, e.g. +96565001234"

---

## Column G – Contact Email

**Type:** Text (email format)  
**Required:** Yes  
**Example:** `hr@alrashid.com`, `procurement@gulffm.ae`

---

## Column H – WhatsApp Number

**Type:** Text (E.164 format)  
**Required:** Recommended  
**Format:** Same as Contact Phone  
**Note:** May be the same as Contact Phone or a separate number

---

## Column I – Status

**Type:** Dropdown (Data Validation)  
**Required:** Yes  
**Options:**
- Lead
- Active
- Paused
- Closed

**Conditional Formatting:**

| Status | Background Colour | Text Colour |
|--------|------------------|-------------|
| Lead | Yellow (`#FFFF00`) | Black |
| Active | Green (`#00CC00`) | White |
| Paused | Orange (`#FF9900`) | White |
| Closed | Grey (`#999999`) | White |

**Setup – Conditional Formatting:**
1. Select I2:I1000
2. Format → Conditional formatting
3. Add rule: "Text is exactly" → `Lead` → Background: Yellow
4. Add rule: "Text is exactly" → `Active` → Background: Green, text white
5. Add rule: "Text is exactly" → `Paused` → Background: Orange, text white
6. Add rule: "Text is exactly" → `Closed` → Background: Grey, text white

---

## Column J – Total Workers Requested

**Type:** Number  
**Required:** Yes (enter manually or sum via a formula if needed)  
**Example:** `25`, `10`, `100`  
**Note:** This reflects how many workers this employer has requested in total. Update when new Job Requests are created.

---

## Column K – Total Workers Deployed

**Type:** Formula (auto-calculated)  
**Formula (row 2):**
```
=COUNTIFS('Pipeline'!F2:F,B2,'Pipeline'!O2:O,"Confirmed")
```

**Formula Logic:**
- Looks at the Pipeline sheet
- Column F in Pipeline = Employer Name
- Column O in Pipeline = Deployment Status
- Counts rows where Employer Name matches this company (B2) AND Deployment Status = "Confirmed"
- Result = number of workers successfully deployed to this employer

**To apply to all rows:** Enter in K2, then drag down to K1000.

---

## Column L – Notes

**Type:** Long text  
**Required:** No  
**Use for:**
- Special requirements from the employer
- Communication history summary
- Visa quota notes
- Any important flags

---

## Protected Range – Column A (EmployerID)

**Purpose:** Prevent accidental editing of IDs once assigned.

**Setup:**
1. Select column A (A2:A1000)
2. Data → Protect ranges
3. Add a range description: "EmployerID – Do Not Edit"
4. Click "Set permissions"
5. Choose "Only you" or select specific admin users
6. Save

**Who can edit:** Sheet owner / Admin only  
**Who can view:** All users with sheet access

---

## Data Validation Summary

| Column | Validation Type | Options |
|--------|----------------|---------|
| C (Country) | Dropdown | Kuwait, UAE, Qatar, Saudi Arabia, Bahrain, Oman, Other |
| D (Industry) | Dropdown | Construction, Cleaning, Hospitality, Logistics, Healthcare, Manufacturing, Other |
| F (Phone) | Custom regex | E.164 format |
| I (Status) | Dropdown | Lead, Active, Paused, Closed |
| J (Workers Req.) | Number | Greater than or equal to 0 |

---

## Access Control

| Role | Access Level |
|------|-------------|
| CEO | View + Edit all columns |
| COO | View + Edit all columns |
| Operations Manager | View + Edit B–L; no edit on A |
| HR Officer | View only |
| Recruiter | View only |
| Country Manager | View only (their country rows) |

**To set access:**
1. Share the Google Sheet with individual users
2. For column-level restriction, use "Protect ranges" (see Column A above)
3. For row-level restriction (Country Manager sees only their country), use a separate filtered view or a dedicated filtered sheet

---

## Linking to Employer Google Form via Zapier

### Overview
When an employer submits the Employer Request Form, Zapier automatically creates or updates a row in this Employers sheet.

### Zap: Employer Form → Employers Sheet

**Trigger:** New response in Google Forms (Employer Request Form)  
**Action:** Create row in Google Sheets → Sheet: Employers

**Field Mapping:**

| Form Field | Sheet Column |
|-----------|-------------|
| Company Name | B (Company Name) |
| Country | C (Country) |
| Industry | D (Industry) |
| Contact Name | E (Contact Person) |
| Phone Number | F (Contact Phone) |
| Email Address | G (Contact Email) |
| WhatsApp Number | H (WhatsApp Number) |
| (Auto-generated) | A (EmployerID) — via Zapier Formatter: `EMP-{{date:YYYYMMDD}}-{{zap_meta_human_id}}` |
| (Default: Lead) | I (Status) — hardcoded to "Lead" on creation |

### Steps to Set Up in Zapier:
1. Create a new Zap
2. Trigger: Google Forms → New Response → Select Employer Request Form
3. Action 1: Formatter → Date/Time → format current date as YYYYMMDD
4. Action 2: Formatter → Numbers → pad sequential ID to 4 digits
5. Action 3: Google Sheets → Create Spreadsheet Row → select Employers sheet
6. Map all fields as shown above
7. Test and activate

---

## Sheet Maintenance

- **Review frequency:** Weekly (COO reviews new Lead employers and updates status)
- **Archiving:** Move Closed employers to a separate "Employers – Archive" sheet after 12 months
- **Backup:** Google Sheets auto-saves; enable version history (File → Version history → See version history)
