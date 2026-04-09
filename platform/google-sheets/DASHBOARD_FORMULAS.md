# Dashboard Formulas & KPIs — Kingken Global Recruitment Platform

**Sheet Name:** `Dashboard`
**Purpose:** Real-time executive summary of all platform KPIs — auto-refreshed by Apps Script daily trigger
**Company:** Kingken Global Travel Agency Ltd.

---

## Overview

The Dashboard sheet pulls live data from all other sheets using Google Sheets formulas. It is divided into six sections:

1. **Candidate Pipeline KPIs** — Master Data and Pipeline sheet stats
2. **Employer CRM KPIs** — Employers Database stats
3. **Job Request KPIs** — Job Requests sheet stats
4. **Revenue KPIs** — Deals & Revenue sheet stats
5. **Task Management KPIs** — Tasks sheet stats
6. **AI Scoring Summary** — AI score distribution from Master Data

Each section has a header cell (merged, colored), KPI labels in column A, and formula values in column B.

---

## Section 1: Candidate Pipeline KPIs

**Header cell:** A1 (merged A1:D1) — "📊 Candidate Pipeline"

### Formulas

| Cell | Label (Column A) | Formula (Column B) | Description |
|------|-----------------|-------------------|-------------|
| B3 | Total Candidates (All Time) | `=COUNTA('Master Data'!A2:A)` | Count of all candidate rows |
| B4 | New (Unreviewed) | `=COUNTIF('Master Data'!K2:K,"New")` | Candidates with Status = New |
| B5 | Screened | `=COUNTIF('Master Data'!K2:K,"Screened")` | Candidates with Status = Screened |
| B6 | Approved | `=COUNTIF('Master Data'!K2:K,"Approved")` | Candidates approved for placement |
| B7 | Processing | `=COUNTIF('Master Data'!K2:K,"Processing")` | Candidates actively in placement process |
| B8 | Deployed | `=COUNTIF('Master Data'!K2:K,"Deployed")` | Successfully placed candidates |
| B9 | Rejected | `=COUNTIF('Master Data'!K2:K,"Rejected")` | Rejected candidates |
| B10 | Approval Rate (%) | `=IFERROR(ROUND(B6/(B5+B6+B9)*100,1)&"%","N/A")` | % of screened candidates approved |
| B11 | Deployment Rate (%) | `=IFERROR(ROUND(B8/B3*100,1)&"%","N/A")` | % of all candidates successfully deployed |
| B12 | Avg AI Score (All) | `=IFERROR(ROUND(AVERAGE('Master Data'!L2:L),1),"N/A")` | Average AI score across all candidates |
| B13 | Avg AI Score (Approved) | `=IFERROR(ROUND(AVERAGEIF('Master Data'!K2:K,"Approved",'Master Data'!L2:L),1),"N/A")` | Average AI score of approved candidates |
| B14 | New This Week | `=COUNTIFS('Master Data'!B2:B,">="&TODAY()-7,'Master Data'!K2:K,"New")` | New candidates submitted in last 7 days |
| B15 | New This Month | `=COUNTIFS('Master Data'!B2:B,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1))` | New candidates this calendar month |

---

## Section 2: Recruitment Pipeline KPIs

**Header cell:** A17 (merged A17:D17) — "🔄 Recruitment Pipeline"

### Formulas

| Cell | Label (Column A) | Formula (Column B) | Description |
|------|-----------------|-------------------|-------------|
| B19 | Total Pipeline Entries | `=COUNTA('Recruitment Pipeline'!A2:A)` | All pipeline rows |
| B20 | Applied | `=COUNTIF('Recruitment Pipeline'!H2:H,"Applied")` | In Applied stage |
| B21 | Screening | `=COUNTIF('Recruitment Pipeline'!H2:H,"Screening")` | In Screening stage |
| B22 | Interview | `=COUNTIF('Recruitment Pipeline'!H2:H,"Interview")` | In Interview stage |
| B23 | Selected | `=COUNTIF('Recruitment Pipeline'!H2:H,"Selected")` | In Selected stage |
| B24 | Document Processing | `=COUNTIF('Recruitment Pipeline'!H2:H,"Document Processing")` | In Document Processing stage |
| B25 | Medical | `=COUNTIF('Recruitment Pipeline'!H2:H,"Medical")` | In Medical stage |
| B26 | Visa | `=COUNTIF('Recruitment Pipeline'!H2:H,"Visa")` | In Visa stage |
| B27 | Deployed (Pipeline) | `=COUNTIF('Recruitment Pipeline'!H2:H,"Deployed")` | Deployed via pipeline |
| B28 | Rejected (Pipeline) | `=COUNTIF('Recruitment Pipeline'!H2:H,"Rejected")` | Rejected from pipeline |
| B29 | Stalled > 7 Days | `=COUNTIFS('Recruitment Pipeline'!I2:I,"<"&TODAY()-7,'Recruitment Pipeline'!H2:H,"<>Deployed",'Recruitment Pipeline'!H2:H,"<>Rejected")` | Candidates stuck in same stage > 7 days |
| B30 | Confirmed Deployments | `=COUNTIF('Recruitment Pipeline'!O2:O,"Confirmed")` | Total confirmed deployments |

---

## Section 3: Employer CRM KPIs

**Header cell:** A32 (merged A32:D32) — "🏢 Employer CRM"

### Formulas

| Cell | Label (Column A) | Formula (Column B) | Description |
|------|-----------------|-------------------|-------------|
| B34 | Total Employers | `=COUNTA('Employers Database'!A2:A)` | All employer records |
| B35 | Active Employers | `=COUNTIF('Employers Database'!I2:I,"Active")` | Employers with Active status |
| B36 | Leads | `=COUNTIF('Employers Database'!I2:I,"Lead")` | Employers with Lead status |
| B37 | Paused | `=COUNTIF('Employers Database'!I2:I,"Paused")` | Employers with Paused status |
| B38 | Closed | `=COUNTIF('Employers Database'!I2:I,"Closed")` | Employers with Closed status |
| B39 | Total Workers Requested | `=SUM('Employers Database'!J2:J)` | Sum of all workers requested |
| B40 | Total Workers Deployed | `=SUM('Employers Database'!K2:K)` | Sum of all workers deployed |
| B41 | Fulfillment Rate (%) | `=IFERROR(ROUND(B40/B39*100,1)&"%","N/A")` | % of requested workers actually deployed |
| B42 | New Employers This Month | `=COUNTIFS('Employers Database'!A2:A,"EMP-"&TEXT(YEAR(TODAY()),"0000")&TEXT(MONTH(TODAY()),"00")&"*")` | Employers added this month (by ID prefix) |

---

## Section 4: Job Request KPIs

**Header cell:** A44 (merged A44:D44) — "💼 Job Requests"

### Formulas

| Cell | Label (Column A) | Formula (Column B) | Description |
|------|-----------------|-------------------|-------------|
| B46 | Total Job Requests | `=COUNTA('Job Requests'!A2:A)` | All job request rows |
| B47 | Open Jobs | `=COUNTIF('Job Requests'!K2:K,"Open")` | Currently open job requests |
| B48 | Matching in Progress | `=COUNTIF('Job Requests'!K2:K,"Matching")` | Jobs with active candidate matching |
| B49 | Shortlisted | `=COUNTIF('Job Requests'!K2:K,"Shortlisted")` | Jobs with shortlisted candidates |
| B50 | Closed (Filled) | `=COUNTIF('Job Requests'!K2:K,"Closed")` | Successfully filled job requests |
| B51 | Cancelled | `=COUNTIF('Job Requests'!K2:K,"Cancelled")` | Cancelled job requests |
| B52 | Total Workers Needed (Open) | `=SUMIF('Job Requests'!K2:K,"Open",'Job Requests'!E2:E)` | Total headcount from open jobs |
| B53 | Potential Revenue (Open) | `=TEXT(SUMPRODUCT(('Job Requests'!K2:K="Open")*('Job Requests'!E2:E)*('Job Requests'!F2:F)),"$#,##0")` | Estimated revenue if all open jobs filled |
| B54 | Avg Workers Per Job | `=IFERROR(ROUND(AVERAGE('Job Requests'!E2:E),0),"N/A")` | Average headcount per job request |

---

## Section 5: Revenue KPIs

**Header cell:** A56 (merged A56:D56) — "💰 Revenue & Deals"

### Formulas

| Cell | Label (Column A) | Formula (Column B) | Description |
|------|-----------------|-------------------|-------------|
| B58 | Total Deals | `=COUNTA('Deals & Revenue'!A2:A)` | All deal records |
| B59 | Total Revenue Invoiced | `=TEXT(SUM('Deals & Revenue'!G2:G),"$#,##0")` | Sum of all Total Deal Values |
| B60 | Total Received | `=TEXT(SUM('Deals & Revenue'!K2:K),"$#,##0")` | Sum of all Amount Paid |
| B61 | Total Outstanding | `=TEXT(SUMIF('Deals & Revenue'!M2:M,"<>Paid",'Deals & Revenue'!L2:L),"$#,##0")` | Sum of unpaid balances |
| B62 | Paid Deals | `=COUNTIF('Deals & Revenue'!M2:M,"Paid")` | Fully paid deals |
| B63 | Partial Payments | `=COUNTIF('Deals & Revenue'!M2:M,"Partial")` | Partially paid deals |
| B64 | Unpaid Invoices | `=COUNTIF('Deals & Revenue'!M2:M,"Unpaid")` | Completely unpaid invoices |
| B65 | Overdue Invoices | `=COUNTIFS('Deals & Revenue'!J2:J,"<"&TODAY(),'Deals & Revenue'!M2:M,"<>Paid")` | Past due and not paid |
| B66 | Revenue This Month | `=TEXT(SUMPRODUCT((MONTH('Deals & Revenue'!I2:I)=MONTH(TODAY()))*(YEAR('Deals & Revenue'!I2:I)=YEAR(TODAY()))*('Deals & Revenue'!G2:G)),"$#,##0")` | Total deal value invoiced this month |
| B67 | Collection Rate (%) | `=IFERROR(ROUND(SUM('Deals & Revenue'!K2:K)/SUM('Deals & Revenue'!G2:G)*100,1)&"%","N/A")` | % of invoiced revenue actually collected |

---

## Section 6: Task Management KPIs

**Header cell:** A69 (merged A69:D69) — "✅ Tasks"

### Formulas

| Cell | Label (Column A) | Formula (Column B) | Description |
|------|-----------------|-------------------|-------------|
| B71 | Total Tasks | `=COUNTA('Tasks'!A2:A)` | All task rows |
| B72 | Not Started | `=COUNTIF('Tasks'!I2:I,"Not Started")` | Tasks not yet started |
| B73 | In Progress | `=COUNTIF('Tasks'!I2:I,"In Progress")` | Tasks in progress |
| B74 | Blocked | `=COUNTIF('Tasks'!I2:I,"Blocked")` | Tasks currently blocked |
| B75 | Done (All Time) | `=COUNTIF('Tasks'!I2:I,"Done")` | Completed tasks |
| B76 | Overdue Tasks | `=COUNTIFS('Tasks'!H2:H,"<"&TODAY(),'Tasks'!I2:I,"<>Done",'Tasks'!I2:I,"<>Cancelled")` | Past due and not done |
| B77 | Due Today | `=COUNTIFS('Tasks'!H2:H,TODAY(),'Tasks'!I2:I,"<>Done",'Tasks'!I2:I,"<>Cancelled")` | Tasks due today |
| B78 | Critical Open | `=COUNTIFS('Tasks'!D2:D,"Critical",'Tasks'!I2:I,"<>Done",'Tasks'!I2:I,"<>Cancelled")` | Open Critical priority tasks |
| B79 | Task Completion Rate (%) | `=IFERROR(ROUND(COUNTIF('Tasks'!I2:I,"Done")/COUNTA('Tasks'!A2:A)*100,1)&"%","N/A")` | % of all tasks that are Done |

---

## Section 7: AI Scoring Summary

**Header cell:** A81 (merged A81:D81) — "🤖 AI Scoring"

### Formulas

| Cell | Label (Column A) | Formula (Column B) | Description |
|------|-----------------|-------------------|-------------|
| B83 | Scored Candidates | `=COUNTIF('Master Data'!L2:L,">"&0)` | Candidates with an AI score |
| B84 | Strong (Score 80–100) | `=COUNTIFS('Master Data'!L2:L,">="&80,'Master Data'!L2:L,"<="&100)` | High-quality candidates |
| B85 | Good (Score 60–79) | `=COUNTIFS('Master Data'!L2:L,">="&60,'Master Data'!L2:L,"<"&80)` | Good quality candidates |
| B86 | Weak (Score < 60) | `=COUNTIFS('Master Data'!L2:L,">"&0,'Master Data'!L2:L,"<"&60)` | Below threshold candidates |
| B87 | Unscored | `=COUNTIF('Master Data'!L2:L,0)+COUNTBLANK('Master Data'!L2:L)` | Candidates without AI score |
| B88 | Average Score | `=IFERROR(ROUND(AVERAGEIF('Master Data'!L2:L,">"&0),1),"N/A")` | Average score of scored candidates |
| B89 | % Strong Candidates | `=IFERROR(ROUND(B84/B83*100,1)&"%","N/A")` | % of scored candidates rated Strong |

---

## Last Updated Timestamp

```
Cell B91 label: "Dashboard Last Refreshed"
Cell C91 formula: =NOW()
```
*The Apps Script `dashboard-refresh.gs` function rewrites all formulas and triggers a recalculation, then logs the timestamp.*

---

## Dashboard Refresh Script

The `dashboard-refresh.gs` script (in `scripts/google-apps-script/`) runs on a daily trigger at 07:00 AM and:
1. Forces recalculation of all formula cells
2. Refreshes charts
3. Updates the "Last Refreshed" timestamp in C91
4. Sends a summary WhatsApp message to the COO via WATI

To set up the daily trigger:
1. In Google Apps Script editor, click the clock icon (Triggers)
2. Add a new trigger for `refreshDashboard` function
3. Set to: Time-driven → Day timer → 7 AM – 8 AM

---

## Chart Recommendations

### Chart 1: Candidate Pipeline Funnel
- **Type:** Bar chart (horizontal)
- **Data:** B20:B28 (Applied → Deployed stages)
- **Title:** "Recruitment Pipeline — Candidates Per Stage"
- **Color:** Gradient from blue (Applied) to green (Deployed)

### Chart 2: Revenue Summary
- **Type:** Pie chart
- **Data:** B62:B64 (Paid, Partial, Unpaid deals)
- **Title:** "Deal Payment Status"
- **Colors:** Green (Paid), Orange (Partial), Red (Unpaid)

### Chart 3: Employer Status Breakdown
- **Type:** Donut chart
- **Data:** B35:B38 (Active, Lead, Paused, Closed)
- **Title:** "Employer CRM Status"

### Chart 4: Monthly Candidate Intake Trend
- **Type:** Line chart
- **Data:** Calculated using COUNTIFS per month across Master Data Timestamp column
- **Title:** "New Candidates per Month"
- **Setup:** Create a helper table with month labels and monthly COUNTIFS

### Chart 5: Task Status Overview
- **Type:** Stacked bar
- **Data:** B72:B78 (task status counts)
- **Title:** "Open Tasks by Status"

---

## Dashboard Sheet Settings

- **Tab color:** Dark Blue `#0D47A1`
- **All formula cells:** Locked (protected) — no manual edits
- **Refresh frequency:** Daily automatic via Apps Script trigger
- **Access:** All team members have View access to Dashboard
- **Freeze rows:** Row 1 frozen (title row)
- **Print area:** A1:D91 — suitable for PDF export as weekly report

---

## Dashboard Maintenance

- **Weekly:** COO reviews Dashboard every Monday morning at 08:30 AM
- **Monthly:** Head of Tech audits formulas on first Monday of each month
- **If data missing:** Check that source sheets have correct sheet names (names are case-sensitive in VLOOKUP/COUNTIF references)
- **Common issues:**
  - `#REF!` error — Sheet name changed; update formula references
  - `#VALUE!` error — Non-numeric data in numeric fields; check source sheets
  - `0` instead of count — Check that status values in dropdown match formula strings exactly

---

*Maintained by: Head of Tech | Contact: info@kingkenglobal.com.ng | https://www.kingkenglobal.com.ng*
