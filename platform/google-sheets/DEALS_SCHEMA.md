# Deals Sheet – Column Documentation

**Sheet Tab Name:** `Deals`
**Purpose:** Tracks all financial deals, invoices, and payments for worker placements.

---

## Column Reference (A–N)

| Col | Field Name | Type | Description |
|-----|-----------|------|-------------|
| A | Deal ID | Text | Unique deal identifier |
| B | Employer ID | Text | References EmployerID from Employers sheet |
| C | Employer Name | Formula | Auto-populated from Employers sheet |
| D | Job ID | Text | References Job ID from Job Requests sheet |
| E | Workers in Deal | Number | Number of workers covered by this deal |
| F | Fee Per Worker | Number | Recruitment fee per worker in USD |
| G | Total Deal Value | Formula | Calculated: Workers × Fee Per Worker |
| H | Invoice Number | Text | Invoice reference number |
| I | Invoice Date | Date | Date invoice was issued |
| J | Payment Due Date | Date | Payment deadline |
| K | Amount Paid | Number | Total amount received in USD |
| L | Balance | Formula | Calculated: Total Value − Amount Paid |
| M | Payment Status | Formula | Calculated: Unpaid / Partial / Paid |
| N | Notes | Text | Additional notes |

---

## Column A – Deal ID

**Format:** `DEAL-YYYYMMDD-NNNN`

**Examples:**
- `DEAL-20260115-0001`
- `DEAL-20260301-0005`

**Rules:**
- YYYYMMDD = date the deal was created/signed
- NNNN = sequential number for that day, padded to 4 digits
- One row per deal (a deal may cover multiple workers under one contract)

---

## Column B – Employer ID

**Type:** Text (references Employers!A)  
**Required:** Yes  
**Example:** `EMP-20260115-0001`

---

## Column C – Employer Name

**Type:** Formula  
**Formula (row 2):**
```
=IFERROR(VLOOKUP(B2,Employers!A:B,2,FALSE),"")
```

**Formula Explanation:**
- Looks up Employer ID (B2) in the Employers sheet
- `Employers!A:B` → columns A and B of Employers sheet
- `2` → returns column 2 (Company Name)
- `IFERROR` prevents #N/A if ID not found

---

## Column D – Job ID

**Type:** Text (references `Job Requests`!A)  
**Required:** Yes  
**Example:** `JOB-20260115-0003`

---

## Column E – Workers in Deal

**Type:** Number (integer)  
**Required:** Yes  
**Example:** `10`, `25`  
**Note:** Number of workers this deal covers. Used in the Total Deal Value formula.

---

## Column F – Fee Per Worker

**Type:** Number (currency, USD)  
**Required:** Yes  
**Example:** `500`, `750`, `1000`  
**Note:** The recruitment/placement fee charged per worker for this deal.

---

## Column G – Total Deal Value

**Type:** Formula  
**Formula (row 2):**
```
=E2*F2
```

**Formula Explanation:**
- Multiplies Workers in Deal (E2) by Fee Per Worker (F2)
- Result is the gross value of the deal in USD
- Example: 10 workers × $500 fee = $5,000 total deal value

**To apply to all rows:** Enter in G2, drag down to G1000.

---

## Column H – Invoice Number

**Type:** Text  
**Required:** Yes  
**Format:** `INV-YYYY-NNN`

**Invoice Numbering Convention:**
- `INV-` = prefix (always uppercase)
- `YYYY` = calendar year the invoice was issued
- `NNN` = sequential number for that year, padded to 3 digits

**Examples:**
- `INV-2026-001` (first invoice of 2026)
- `INV-2026-015` (fifteenth invoice of 2026)
- `INV-2027-001` (first invoice of 2027 — counter resets each year)

**Rules:**
- Never reuse an invoice number
- Maintain a sequential log (can add a separate "Invoice Log" tab)
- Send PDF invoice to employer using this number as reference

---

## Column I – Invoice Date

**Type:** Date  
**Required:** Yes  
**Format:** `DD/MM/YYYY`  
**Note:** Date the invoice was generated and sent to the employer.

---

## Column J – Payment Due Date

**Type:** Date  
**Required:** Yes  
**Format:** `DD/MM/YYYY`  
**Note:** Typically Invoice Date + 30 days (net 30 terms). Agree terms with employer upfront.

---

## Column K – Amount Paid

**Type:** Number (currency, USD)  
**Required:** Yes (enter 0 if no payment received yet)  
**Example:** `0`, `2500`, `5000`  
**Note:** Total cumulative amount received for this deal. Update when payment is received.

---

## Column L – Balance

**Type:** Formula  
**Formula (row 2):**
```
=G2-K2
```

**Formula Explanation:**
- Subtracts Amount Paid (K2) from Total Deal Value (G2)
- Result is the outstanding balance in USD
- Example: $5,000 deal − $2,500 paid = $2,500 balance
- Shows $0 when fully paid

**To apply to all rows:** Enter in L2, drag down to L1000.

---

## Column M – Payment Status

**Type:** Formula  
**Formula (row 2):**
```
=IF(K2=0,"Unpaid",IF(K2<G2,"Partial","Paid"))
```

**Formula Explanation:**
- `IF(K2=0,"Unpaid", ...)` → if nothing has been paid, status = "Unpaid"
- `IF(K2<G2,"Partial","Paid")` → if paid amount is less than total, status = "Partial"; otherwise status = "Paid"

**Logic Table:**

| Amount Paid (K) | Total Value (G) | Status |
|----------------|----------------|--------|
| 0 | Any | Unpaid |
| > 0 and < G | Any | Partial |
| = G | Any | Paid |

**To apply to all rows:** Enter in M2, drag down to M1000.

**Conditional Formatting for Column M:**

| Status | Background Colour | Text Colour |
|--------|------------------|-------------|
| Unpaid | Red (`#FF0000`) | White |
| Partial | Orange (`#FF9900`) | White |
| Paid | Green (`#00CC00`) | White |

**Setup:**
1. Select M2:M1000
2. Format → Conditional formatting
3. Add rule: "Text is exactly" → `Unpaid` → Red background, white text
4. Add rule: "Text is exactly" → `Partial` → Orange background, white text
5. Add rule: "Text is exactly" → `Paid` → Green background, white text

---

## Column N – Notes

**Type:** Long text  
**Required:** No  
**Use for:** Payment receipt references, bank transfer details, disputed amounts, follow-up history.

---

## Summary Row at Top

Add a summary row above the headers (in row 1, shift headers to row 2 or use a separate "Summary" section at the top of the sheet):

**Recommended placement: Rows 1–3 as summary, Row 4 as headers, data from Row 5**

Or alternatively, add a summary block in columns P–Q (separate area):

| Cell | Label | Formula |
|------|-------|---------|
| Q1 | Total Deals | `=COUNTA(A5:A)` |
| Q2 | Total Deal Value | `=SUM(G5:G)` |
| Q3 | Total Paid | `=SUM(K5:K)` |
| Q4 | Total Balance | `=SUM(L5:L)` |
| Q5 | Paid Deals | `=COUNTIF(M5:M,"Paid")` |
| Q6 | Unpaid Deals | `=COUNTIF(M5:M,"Unpaid")` |
| Q7 | Partial Deals | `=COUNTIF(M5:M,"Partial")` |

*Adjust row numbers based on where your data starts.*

---

## Using This Sheet for CEO Reports

### Monthly Revenue Report Steps:
1. Filter by Invoice Date (column I) for the current month
2. Sum column G (Total Deal Value) = this month's contracted revenue
3. Sum column K (Amount Paid) = this month's cash received
4. Sum column L (Balance) = outstanding receivables
5. Count column M = "Unpaid" rows for overdue follow-up

### Creating a Monthly Report:
1. Add a "Reports" sheet to the workbook
2. Use SUMIF formulas to break down by month:
   ```
   =SUMIFS(Deals!G:G,Deals!I:I,">="&DATE(2026,1,1),Deals!I:I,"<="&DATE(2026,1,31))
   ```
3. Use COUNTIF to count deals by status
4. Share via Google Sheets "Share" button → Viewer access for CEO

### Overdue Payment Alert:
Add a column (e.g., column O) with an overdue flag:
```
=IF(AND(J2<TODAY(),M2<>"Paid"),"OVERDUE","")
```
Highlight in red using conditional formatting.

---

## Formulas Summary

| Column | Formula | Purpose |
|--------|---------|---------|
| C (Employer Name) | `=IFERROR(VLOOKUP(B2,Employers!A:B,2,FALSE),"")` | Auto-fill company name |
| G (Total Deal Value) | `=E2*F2` | Calculate deal size |
| L (Balance) | `=G2-K2` | Outstanding amount |
| M (Payment Status) | `=IF(K2=0,"Unpaid",IF(K2<G2,"Partial","Paid"))` | Auto status flag |

---

## Sheet Maintenance

- **Review frequency:** Daily (Operations Manager checks overdue payments); weekly CEO review
- **Invoice follow-up:** Set 7-day and 14-day reminder Zaps via Zapier when payment due date passes
- **Archiving:** Move fully Paid deals older than 12 months to "Deals – Archive" sheet
- **Backup:** Enable version history; keep copies in Google Drive
