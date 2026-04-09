# Deals & Revenue Sheet Schema — Kingken Global Recruitment Platform

**Sheet Name:** `Deals & Revenue`
**Purpose:** Tracks all commercial deals, invoices, and payments — one row per deal with an employer
**Company:** Kingken Global Travel Agency Ltd.

---

## Column Definitions

| Col | Field Name | Data Type | Example | Description |
|-----|------------|-----------|---------|-------------|
| A | Deal ID | Text | `DEAL-20260115-0001` | Auto-generated unique ID; format DEAL-YYYYMMDD-NNNN |
| B | Employer ID | Text | `EMP-20260115-0001` | Linked to Employers Database sheet (Column A) |
| C | Employer Name | Text | `Al-Mansour Cleaning Co.` | Auto-populated via VLOOKUP from Employers sheet |
| D | Job ID | Text | `JOB-20260115-0001` | Linked to Job Requests sheet (Column A) |
| E | Number of Workers | Number | `10` | Workers included in this specific deal |
| F | Fee Per Worker (USD) | Number | `500` | One-time recruitment fee per worker in USD |
| G | Total Deal Value (USD) | Number | `5000` | Formula: =E×F |
| H | Invoice Number | Text | `INV-2026-001` | Invoice reference number |
| I | Invoice Date | Date | `2026-01-20` | Date invoice was issued to employer |
| J | Payment Due Date | Date | `2026-02-19` | Date payment is due (typically 30 days from invoice) |
| K | Amount Paid (USD) | Number | `2500` | Total amount received from employer to date |
| L | Balance (USD) | Number | `2500` | Formula: =G-K |
| M | Payment Status | Text | `Partial` | Formula-driven status based on payment progress |
| N | Notes | Text | `50% deposit received Jan 20` | Free-text notes on payment, disputes, or terms |

---

## Field Detail

### Column A — Deal ID
- **Format:** `DEAL-YYYYMMDD-NNNN` (e.g. `DEAL-20260115-0001`)
- **Generation:** Apps Script generates on new row creation using today's date + sequential counter (padded to 4 digits)
- **Uniqueness:** Script checks existing IDs before assigning; no duplicates permitted
- **Read-only:** Protected range — only the Apps Script service account writes this field

### Column B — Employer ID
- **Format:** Must match a valid `EMP-YYYYMMDD-NNNN` from the Employers Database sheet
- **Source:** Entered by COO when creating the deal record
- **Validation:** Apps Script can cross-reference to confirm the ID exists in Employers sheet

### Column C — Employer Name
- **Type:** Formula-driven (VLOOKUP from Employers Database)
- **Formula (in C2):**
  ```
  =IFERROR(VLOOKUP(B2,'Employers Database'!A:B,2,FALSE),"⚠️ Employer Not Found")
  ```
- **Read-only:** Protected — auto-populated; do not overwrite manually

### Column D — Job ID
- **Format:** Must match a valid `JOB-YYYYMMDD-NNNN` from the Job Requests sheet
- **Source:** Entered by COO when linking this deal to a specific job request
- **Optional:** Some deals may span multiple jobs; use Notes for details

### Column E — Number of Workers
- **Type:** Integer (whole number ≥ 1)
- **Note:** This may be less than the total requested in the job if billing in tranches
- **Validation:** Must be a number ≥ 1

### Column F — Fee Per Worker (USD)
- **Type:** Number (positive value)
- **Currency:** USD one-time recruitment fee per worker placed
- **Note:** Distinct from the worker's monthly salary (salary is in Job Requests); this is Kingken Global's service fee
- **Typical range:** $300–$1,500 depending on position, country, and contract terms

### Column G — Total Deal Value (USD)
- **Type:** Formula-driven (number)
- **Formula (in G2):**
  ```
  =E2*F2
  ```
- **Read-only:** Protected — formula-driven; do not overwrite manually
- **Currency:** USD

### Column H — Invoice Number
- **Format:** `INV-YYYY-NNN` (e.g. `INV-2026-001`)
- **Source:** Assigned by COO or HR/Admin when issuing invoice
- **Uniqueness:** Must be unique across all deals; maintain a running sequence

### Column I — Invoice Date
- **Format:** `YYYY-MM-DD`
- **Source:** Date invoice was formally sent to employer
- **Validation:** Must be a valid date

### Column J — Payment Due Date
- **Format:** `YYYY-MM-DD`
- **Default calculation:** 30 days after invoice date
- **Formula suggestion (in J2):**
  ```
  =IF(I2<>"",I2+30,"")
  ```
- **Override:** COO may manually set different terms for specific employers

### Column K — Amount Paid (USD)
- **Type:** Number (≥ 0)
- **Source:** Updated by COO or HR/Admin each time payment is received
- **Currency:** USD
- **Note:** This is cumulative — add all payments received, not just the latest

### Column L — Balance (USD)
- **Type:** Formula-driven (number)
- **Formula (in L2):**
  ```
  =G2-K2
  ```
- **Read-only:** Protected — formula-driven
- **Expected values:** Positive = outstanding balance; 0 = fully paid; negative = overpayment (error)

### Column M — Payment Status
- **Type:** Formula-driven text
- **Formula (in M2):**
  ```
  =IF(K2=0,"Unpaid",IF(K2>=G2,"Paid",IF(AND(K2>0,K2<G2),"Partial","Unknown")))
  ```
- **Possible values:** `Unpaid`, `Partial`, `Paid`, `Unknown`
- **Read-only:** Protected — formula-driven

### Column N — Notes
- **Type:** Free text; wrap text enabled
- **Usage:** Payment terms agreed, deposit received dates, dispute details, bank transfer references, follow-up actions

---

## Data Validation Rules

```
Column E (Number of Workers):
  Type: Number
  Criteria: Is a valid number, greater than or equal to 1
  Reject invalid input: Yes

Column F (Fee Per Worker USD):
  Type: Number
  Criteria: Is a valid number, greater than 0
  Reject invalid input: Yes

Column K (Amount Paid USD):
  Type: Number
  Criteria: Is a valid number, greater than or equal to 0
  Reject invalid input: Yes

Column I (Invoice Date):
  Type: Date
  Criteria: Is a valid date
  Reject invalid input: Yes

Column J (Payment Due Date):
  Type: Date
  Criteria: Is a valid date
  Show warning on invalid: Yes
```

---

## Conditional Formatting Rules

### Column M — Payment Status

| Condition | Background Color | Text Color | Hex Code |
|-----------|-----------------|------------|----------|
| Value = "Unpaid" | Red | White | `#C62828` |
| Value = "Partial" | Orange | Black | `#FF9800` |
| Value = "Paid" | Green | White | `#2E7D32` |
| Value = "Unknown" | Grey | Black | `#757575` |

### Column J — Payment Due Date (overdue highlight)
```
Condition: =AND(J2<>"", J2<TODAY(), M2<>"Paid")
Background: Dark Red #B71C1C
Text Color: White
Purpose: Flag overdue invoices (past due date and not yet fully paid)
```

### Column J — Payment Due Date (due soon: within 7 days)
```
Condition: =AND(J2<>"", J2>=TODAY(), J2-TODAY()<=7, M2<>"Paid")
Background: Amber #FFD54F
Purpose: Warn about invoices due within the next 7 days
```

---

## Protected Ranges

| Range | Protection Level | Who Can Edit |
|-------|-----------------|--------------|
| Column A (Deal ID) | Script-only | Apps Script service account |
| Column C (Employer Name) | Script-only | Apps Script service account (formula) |
| Column G (Total Deal Value) | Script-only | Apps Script service account (formula) |
| Column L (Balance) | Script-only | Apps Script service account (formula) |
| Column M (Payment Status) | Script-only | Apps Script service account (formula) |

---

## Key Formulas

### Total Deal Value (Column G)
```
=E2*F2
```
*Workers × Fee Per Worker*

### Balance Outstanding (Column L)
```
=G2-K2
```
*Total value minus amount paid*

### Payment Status (Column M)
```
=IF(K2=0,"Unpaid",IF(K2>=G2,"Paid",IF(AND(K2>0,K2<G2),"Partial","Unknown")))
```
*Returns Unpaid / Partial / Paid based on amount paid vs total value*

### Auto-set Payment Due Date 30 days after Invoice Date (Column J)
```
=IF(I2<>"",I2+30,"")
```

### Total revenue (all paid deals)
```
=SUMIF(M2:M,"Paid",G2:G)
```

### Total outstanding balance (all unpaid + partial)
```
=SUMIF(M2:M,"Unpaid",L2:L)+SUMIF(M2:M,"Partial",L2:L)
```

### Revenue this month
```
=SUMPRODUCT((MONTH(I2:I)=MONTH(TODAY()))*(YEAR(I2:I)=YEAR(TODAY()))*(G2:G))
```

### Count overdue invoices (not paid and past due date)
```
=COUNTIFS(J2:J,"<"&TODAY(),M2:M,"<>Paid")
```

### Total value of deals by employer
```
=SUMIF(C2:C,"Al-Mansour Cleaning Co.",G2:G)
```

### Monthly revenue trend (for a specific month, e.g. January 2026)
```
=SUMPRODUCT((MONTH(I2:I)=1)*(YEAR(I2:I)=2026)*(K2:K))
```

---

## Sheet Settings

- **Freeze rows:** Row 1 (headers) frozen
- **Freeze columns:** Column A (Deal ID) frozen for horizontal scroll
- **Sort default:** By Column J (Payment Due Date) ascending — overdue/soonest first
- **Filter views:**
  - "Unpaid Invoices" — M = Unpaid
  - "Partial Payments" — M = Partial
  - "Overdue" — J < TODAY() and M ≠ Paid
  - "This Month" — Invoice Date in current month
- **Tab color:** Green `#1B5E20`
- **Row height:** 21px default; expand column N (Notes) to wrap text
- **Number formatting:** Apply currency format (USD) to columns F, G, K, L

---

## Notes

- Do not delete deal rows — they form the financial audit trail
- Do not manually edit Deal ID, Employer Name, Total Deal Value, Balance, or Payment Status (all formula-driven or protected)
- Amount Paid (Column K) is cumulative — update it by adding new payments, not overwriting
- Always record payment references in Notes (Column N) for reconciliation
- Overdue invoices should be followed up by COO within 48 hours of due date

---

*Maintained by: COO | Contact: info@kingkenglobal.com.ng | https://www.kingkenglobal.com.ng*
