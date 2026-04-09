# Dashboard Formulas & Setup Guide

**Sheet Tab Name:** `Dashboard`
**Purpose:** Real-time KPI overview for CEO, COO, and management team. All data is pulled automatically from other sheets via formulas.

---

## Prerequisites – Sheet Tab Names

**CRITICAL:** All formulas in this document rely on these EXACT sheet tab names. Any variation (spelling, capitalisation, spaces) will break the formulas.

| Required Tab Name | Purpose |
|------------------|---------|
| `Master Data` | Candidate records (note the space) |
| `Employers` | Employer registry |
| `Job Requests` | Job placement requests (note the space) |
| `Pipeline` | Recruitment pipeline tracker |
| `Deals` | Financial deals and invoices |
| `Tasks` | Team task management |
| `Dashboard` | This sheet |

**To check/rename sheet tabs:** Right-click the tab at the bottom → Rename.

---

## Dashboard Layout

The Dashboard is laid out in a single column format with 5 sections:

| Rows | Section |
|------|---------|
| 1 | Title Row: "Kingken Global – Recruitment Dashboard" |
| 2–8 | Section 1: Candidate KPIs |
| 9 | Spacer |
| 10–14 | Section 2: Employer KPIs |
| 15 | Spacer |
| 16–21 | Section 3: Revenue KPIs |
| 22 | Spacer |
| 23–27 | Section 4: Pipeline KPIs |
| 28 | Spacer |
| 29–32 | Section 5: Team KPIs |

**Column A:** Section headers / KPI labels  
**Column B:** Values / Formulas  
**Column C:** Sparklines or trend indicators (optional)

---

## Section 1 – Candidate KPIs

| Cell | Label (Column A) | Formula (Column B) |
|------|-----------------|-------------------|
| A1 | **CANDIDATE KPIs** | — |
| A2 | Total Candidates | `=COUNTA('Master Data'!A2:A)` |
| A3 | New This Week | `=COUNTIFS('Master Data'!B2:B,">="&TODAY()-7,'Master Data'!B2:B,"<="&TODAY())` |
| A4 | Approved | `=COUNTIF('Master Data'!O2:O,"Approved")` |
| A5 | Deployed | `=COUNTIF('Master Data'!O2:O,"Deployed")` |
| A6 | Pending Screening | `=COUNTIF('Master Data'!O2:O,"New")` |
| A7 | Avg AI Score | `=IFERROR(AVERAGEIF('Master Data'!P2:P,"<>",'Master Data'!P2:P),0)` |
| A8 | High Scorers (≥8) | `=COUNTIF('Master Data'!P2:P,">=8")` |

**Notes:**
- Column B in Master Data = Date Registered
- Column O in Master Data = Candidate Status
- Column P in Master Data = AI Score (0–10)
- AVERAGEIF excludes blank cells to avoid division by zero errors

---

## Section 2 – Employer KPIs

| Cell | Label (Column A) | Formula (Column B) |
|------|-----------------|-------------------|
| A10 | **EMPLOYER KPIs** | — |
| A10 | Total Employers | `=COUNTA(Employers!A2:A)` |
| A11 | Active Employers | `=COUNTIF(Employers!I2:I,"Active")` |
| A12 | Total Job Requests | `=COUNTA('Job Requests'!A2:A)` |
| A13 | Open Jobs | `=COUNTIF('Job Requests'!K2:K,"Open")` |
| A14 | Total Workers Requested | `=SUM('Job Requests'!E2:E)` |

**Notes:**
- Employers!I = Status column (Lead/Active/Paused/Closed)
- Job Requests!K = Status column (Open/Matching/Shortlisted/Closed/Cancelled)
- Job Requests!E = Workers Required column

---

## Section 3 – Revenue KPIs

| Cell | Label (Column A) | Formula (Column B) |
|------|-----------------|-------------------|
| A16 | **REVENUE KPIs** | — |
| A16 | Total Deal Value | `=SUM(Deals!G2:G)` |
| A17 | Total Paid | `=SUM(Deals!K2:K)` |
| A18 | Total Balance | `=SUM(Deals!L2:L)` |
| A19 | Paid Deals | `=COUNTIF(Deals!M2:M,"Paid")` |
| A20 | Unpaid Deals | `=COUNTIF(Deals!M2:M,"Unpaid")` |
| A21 | Conversion Rate | `=IFERROR(TEXT(B19/B12,"0%"),"0%")` |

**Notes:**
- Deals!G = Total Deal Value (formula column)
- Deals!K = Amount Paid
- Deals!L = Balance (formula column)
- Deals!M = Payment Status (formula column)
- Conversion Rate = Paid Deals ÷ Total Job Requests (deals that closed / jobs requested)
- B19 refers to the "Paid Deals" value; B12 refers to "Total Job Requests" value on this dashboard

---

## Section 4 – Pipeline KPIs

| Cell | Label (Column A) | Formula (Column B) |
|------|-----------------|-------------------|
| A23 | **PIPELINE KPIs** | — |
| A23 | Total in Pipeline | `=COUNTA(Pipeline!A2:A)` |
| A24 | Confirmed Deployed | `=COUNTIF(Pipeline!O2:O,"Confirmed")` |
| A25 | Visa In Progress | `=COUNTIF(Pipeline!M2:M,"In Progress")` |
| A26 | Medical Pending | `=COUNTIF(Pipeline!L2:L,"Pending")` |
| A27 | Rejected | `=COUNTIF(Pipeline!H2:H,"Rejected")` |

**Notes:**
- Pipeline!O = Deployment Status (Pending/Confirmed/Cancelled)
- Pipeline!M = Visa Status (Not Started/In Progress/Approved/Rejected)
- Pipeline!L = Medical Clearance (Pass/Fail/Pending)
- Pipeline!H = Stage (includes "Rejected" as a stage value)

---

## Section 5 – Team KPIs

| Cell | Label (Column A) | Formula (Column B) |
|------|-----------------|-------------------|
| A29 | **TEAM KPIs** | — |
| A29 | Open Tasks | `=COUNTIF(Tasks!I2:I,"To Do")` |
| A30 | In Progress Tasks | `=COUNTIF(Tasks!I2:I,"In Progress")` |
| A31 | Blocked Tasks | `=COUNTIF(Tasks!I2:I,"Blocked")` |
| A32 | Done This Week | `=COUNTIFS(Tasks!I2:I,"Done",Tasks!H2:H,">="&TODAY()-7)` |

**Notes:**
- Tasks!I = Status column (To Do/In Progress/Done/Blocked)
- Tasks!H = Due Date column
- "Done This Week" counts tasks marked Done with a Due Date in the last 7 days

---

## All 25 KPI Formulas Reference Table

| # | Section | Label | Cell | Formula |
|---|---------|-------|------|---------|
| 1 | Candidates | Total Candidates | B2 | `=COUNTA('Master Data'!A2:A)` |
| 2 | Candidates | New This Week | B3 | `=COUNTIFS('Master Data'!B2:B,">="&TODAY()-7,'Master Data'!B2:B,"<="&TODAY())` |
| 3 | Candidates | Approved | B4 | `=COUNTIF('Master Data'!O2:O,"Approved")` |
| 4 | Candidates | Deployed | B5 | `=COUNTIF('Master Data'!O2:O,"Deployed")` |
| 5 | Candidates | Pending Screening | B6 | `=COUNTIF('Master Data'!O2:O,"New")` |
| 6 | Candidates | Avg AI Score | B7 | `=IFERROR(AVERAGEIF('Master Data'!P2:P,"<>",'Master Data'!P2:P),0)` |
| 7 | Candidates | High Scorers (≥8) | B8 | `=COUNTIF('Master Data'!P2:P,">=8")` |
| 8 | Employers | Total Employers | B10 | `=COUNTA(Employers!A2:A)` |
| 9 | Employers | Active Employers | B11 | `=COUNTIF(Employers!I2:I,"Active")` |
| 10 | Employers | Total Job Requests | B12 | `=COUNTA('Job Requests'!A2:A)` |
| 11 | Employers | Open Jobs | B13 | `=COUNTIF('Job Requests'!K2:K,"Open")` |
| 12 | Employers | Total Workers Requested | B14 | `=SUM('Job Requests'!E2:E)` |
| 13 | Revenue | Total Deal Value | B16 | `=SUM(Deals!G2:G)` |
| 14 | Revenue | Total Paid | B17 | `=SUM(Deals!K2:K)` |
| 15 | Revenue | Total Balance | B18 | `=SUM(Deals!L2:L)` |
| 16 | Revenue | Paid Deals | B19 | `=COUNTIF(Deals!M2:M,"Paid")` |
| 17 | Revenue | Unpaid Deals | B20 | `=COUNTIF(Deals!M2:M,"Unpaid")` |
| 18 | Revenue | Conversion Rate | B21 | `=IFERROR(TEXT(B19/B12,"0%"),"0%")` |
| 19 | Pipeline | Total in Pipeline | B23 | `=COUNTA(Pipeline!A2:A)` |
| 20 | Pipeline | Confirmed Deployed | B24 | `=COUNTIF(Pipeline!O2:O,"Confirmed")` |
| 21 | Pipeline | Visa In Progress | B25 | `=COUNTIF(Pipeline!M2:M,"In Progress")` |
| 22 | Pipeline | Medical Pending | B26 | `=COUNTIF(Pipeline!L2:L,"Pending")` |
| 23 | Pipeline | Rejected | B27 | `=COUNTIF(Pipeline!H2:H,"Rejected")` |
| 24 | Team | Open Tasks | B29 | `=COUNTIF(Tasks!I2:I,"To Do")` |
| 25 | Team | In Progress Tasks | B30 | `=COUNTIF(Tasks!I2:I,"In Progress")` |
| 26 | Team | Blocked Tasks | B31 | `=COUNTIF(Tasks!I2:I,"Blocked")` |
| 27 | Team | Done This Week | B32 | `=COUNTIFS(Tasks!I2:I,"Done",Tasks!H2:H,">="&TODAY()-7)` |

---

## Charts Setup

### Chart 1 – Candidate Status Pie Chart

**Purpose:** Visual breakdown of candidates by status  
**Data range:** Create a small table first:

| Status | Count |
|--------|-------|
| New | `=COUNTIF('Master Data'!O2:O,"New")` |
| Approved | `=COUNTIF('Master Data'!O2:O,"Approved")` |
| Deployed | `=COUNTIF('Master Data'!O2:O,"Deployed")` |
| Rejected | `=COUNTIF('Master Data'!O2:O,"Rejected")` |
| On Hold | `=COUNTIF('Master Data'!O2:O,"On Hold")` |

**Place this table in:** D2:E7 on the Dashboard sheet

**Insert chart:**
1. Select D2:E7
2. Insert → Chart
3. Chart type: Pie chart
4. Customise → Title: "Candidate Status Distribution"
5. Enable "Legend" at bottom

---

### Chart 2 – Revenue Bar Chart by Month

**Purpose:** Monthly revenue overview  
**Data range:** Create a monthly summary table:

| Month | Deal Value | Paid | Balance |
|-------|-----------|------|---------|
| Jan 2026 | `=SUMIFS(Deals!G:G,Deals!I:I,">="&DATE(2026,1,1),Deals!I:I,"<="&DATE(2026,1,31))` | ... | ... |
| Feb 2026 | (repeat for each month) | ... | ... |

**Place in:** D10:G22 on Dashboard sheet

**Insert chart:**
1. Select the monthly table
2. Insert → Chart
3. Chart type: Bar chart (grouped)
4. Series: Deal Value, Paid, Balance
5. Title: "Monthly Revenue Overview"

---

### Chart 3 – Pipeline Stage Funnel

**Purpose:** Show candidate count at each pipeline stage  
**Data range:**

| Stage | Count |
|-------|-------|
| Applied | `=COUNTIF(Pipeline!H2:H,"Applied")` |
| Screening | `=COUNTIF(Pipeline!H2:H,"Screening")` |
| Interview | `=COUNTIF(Pipeline!H2:H,"Interview")` |
| Selected | `=COUNTIF(Pipeline!H2:H,"Selected")` |
| Document Processing | `=COUNTIF(Pipeline!H2:H,"Document Processing")` |
| Medical | `=COUNTIF(Pipeline!H2:H,"Medical")` |
| Visa | `=COUNTIF(Pipeline!H2:H,"Visa")` |
| Deployed | `=COUNTIF(Pipeline!H2:H,"Deployed")` |

**Place in:** D25:E33 on Dashboard sheet

**Insert chart:**
1. Select D25:E33
2. Insert → Chart
3. Chart type: Bar chart (horizontal)
4. Title: "Recruitment Pipeline Funnel"
5. Sort descending by count to show funnel effect

---

## Protecting the Dashboard Sheet

**Purpose:** Prevent accidental editing of formulas while allowing view access.

**Steps:**
1. Right-click the Dashboard tab → "Protect sheet"
2. In the "Protect Sheets and Ranges" panel:
   - Select "Sheet" option
   - Uncheck any specific cells that users ARE allowed to edit (e.g., date filters if applicable)
3. Set permissions: "Only you" can edit
4. Optional: Add a note "Dashboard – Read Only. Contact COO to update."
5. Click "Done"

**For specific editable cells** (e.g., date range filters):
1. In the same protection panel, click "Except certain cells"
2. Enter the cell range for any user-editable cells

---

## Sharing Dashboard with Investors / CEO

### Option 1 – Share the Full Google Sheet (View Only)
1. Click the green "Share" button (top right)
2. Enter investor/CEO email address
3. Set permission to **"Viewer"** (not Editor or Commenter)
4. Uncheck "Notify people" if preferred
5. Click "Send"

### Option 2 – Share a Link (Anyone with the Link)
1. Click "Share" → "Get link"
2. Change "Restricted" to "Anyone with the link"
3. Set role to **"Viewer"**
4. Copy the link
5. Share via email or WhatsApp

### Option 3 – Publish Dashboard as Webpage
1. File → Share → Publish to web
2. Select "Dashboard" sheet only
3. Choose "Web page" format
4. Click "Publish"
5. Share the published URL — it auto-updates as data changes

---

## Daily Dashboard Routine

### 7:30 AM – COO
1. Open Dashboard sheet
2. Check Section 1 (Candidates): Are New This Week numbers growing?
3. Check Section 3 (Revenue): Any Unpaid deals outstanding?
4. Check Section 5 (Tasks): How many Blocked tasks? Resolve blockers.
5. Identify any urgent actions → create Tasks for team

### 8:00 AM – Operations Manager
1. Check Revenue KPIs — flag any Unpaid deals with Payment Due Date passed
2. Check Pipeline KPIs — flag any Visa or Medical delays
3. Send morning WhatsApp update to team with key numbers

### 9:00 AM – HR Officers
1. Check Pipeline KPIs (Section 4) for their active cases
2. Check their filtered Tasks (Section 5)
3. Begin daily pipeline updates

### Weekly (Monday) – CEO
1. Review all 5 sections of dashboard
2. Compare week-over-week: Total Candidates, Total Deal Value, Deployed workers
3. Review monthly Revenue Bar chart
4. Request detailed report from COO if numbers are below target

---

## Dashboard Formatting Tips

1. **Bold** all section header rows (Column A for section titles)
2. **Freeze row 1** (View → Freeze → 1 row) so header stays visible when scrolling
3. **Number formatting:** Format column B cells:
   - Revenue cells: Currency → $ USD, 2 decimal places
   - Count cells: Number, no decimal
   - Percentage cells: Percentage, 0 decimal
4. **Alternate row shading:** Format → Alternating colours for the data table
5. **Section background:** Set section header rows to dark background with white text for easy navigation
