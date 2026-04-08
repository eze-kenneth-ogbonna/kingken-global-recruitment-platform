# Kingken Global Recruitment Platform — CRM Guide

> **Company:** Kingken Global Travel Agency Ltd
> **Website:** https://www.kingkenglobal.com.ng | **Email:** info@kingkenglobal.com.ng

---

## Overview

The Kingken Global CRM is built entirely on **Google Sheets** with 6 functional modules. It tracks every candidate, employer, job request, pipeline stage, deal, and team task in a single interconnected system. This guide explains how to use the CRM daily.

---

## 1. The 6 CRM Modules

| Module | Sheet Tab | Primary Users | Purpose |
|--------|-----------|--------------|---------|
| 1. Candidates (ATS) | Master Data | Recruiters, Head of Recruitment | Track all worker applicants |
| 2. Employers | Employers | COO, Head of Recruitment | Manage client companies |
| 3. Job Requests | Job Requests | COO, Head of Recruitment | Open positions from employers |
| 4. Pipeline | Pipeline | Recruiters, Head of Recruitment | Candidate progress per job |
| 5. Deals | Deals | COO, Finance | Placement fees and payments |
| 6. Tasks | Tasks | All team members | Daily action tracking |

---

## 2. Module 1: Candidates (ATS — Applicant Tracking System)

### What It Tracks
Every worker who has applied through the platform. Auto-populated by Google Forms and WhatsApp bot.

### Key Fields
- **CandidateID** — Unique identifier (auto-generated)
- **Status** — Current stage in the recruitment process
- **AI_Score** — 0–100 score from OpenAI screening
- **Recruiter** — Team member responsible for this candidate

### Candidate Lifecycle

```
Form Submission → New → Screened → Approved → Processing → Visa Applied → Deployed → Complete
                                                                  ↓
                                                              Rejected (at any stage)
```

### Daily Actions for Recruiters

| Time | Action |
|------|--------|
| 08:00 AM | Review all Status = `New` candidates from previous day |
| 09:00 AM | Update Status on reviewed candidates |
| 10:00 AM | Call/WhatsApp candidates moving to `Processing` |
| 02:00 PM | Check candidates in `Visa Applied` for updates |
| 05:00 PM | Update Notes column on all active candidates |

### How to Screen a Candidate

1. Open the **Master Data** tab.
2. Filter column K to show `New` status.
3. Review the AI_Score (column L) and AI_Summary (column M).
4. Open the CV link (column J) in a new tab.
5. Update column K Status to `Screened` if candidate merits review.
6. Update column N (Recruiter) with your name.
7. Add notes in column O about any follow-up needed.
8. Update column P (Date Updated) to today.

---

## 3. Module 2: Employers

### What It Tracks
All companies and individuals who have registered to hire workers through Kingken Global.

### Employer Lifecycle

```
Lead → Contacted → Active → Closed
                          ↘ Lost
```

| Stage | Meaning | Who Acts |
|-------|---------|---------|
| Lead | Registered but no contact made | COO within 24h |
| Contacted | First contact made, discussing needs | COO/Head of Recruitment |
| Active | Placement in progress; invoice raised | COO manages deal |
| Closed | Placement complete, fee fully paid | COO archives record |
| Lost | Employer stopped responding or went elsewhere | Record reason in Notes |

### How to Add a Manual Employer Record

1. Open the **Employers** tab.
2. Click on the first empty row.
3. Enter EmployerID (next sequential number: `EMP-0025`).
4. Fill in all columns C–K.
5. Set Status = `Lead`.
6. Set COO Assigned = your COO's name.
7. Save — Zapier will not create this entry (it's manual).

---

## 4. Module 3: Job Requests

### What It Tracks
Each open position that an employer has requested. One row per unique job requirement.

### Job Request Lifecycle

```
Open → Matching → Filled → Closed
              ↘ Cancelled
```

### How to Create a Job Request

1. After the COO confirms a staffing need with an employer:
2. Open the **Job Requests** tab.
3. Add a new row with:
   - **JobID:** Next sequential (e.g., `JOB-0012`)
   - **EmployerID:** From the Employers tab
   - **Job Title, Country, Workers Needed, Salary, Start Date**
   - **Status:** `Open`
4. Notify Head of Recruitment to begin candidate matching.
5. As candidates are approved, add their IDs to column J (Matched Candidates).

---

## 5. Module 4: Pipeline

### What It Tracks
Each candidate's specific progress toward a specific job. If one candidate is being considered for two jobs, there are two pipeline rows.

### Pipeline Stages

| Stage | Description | Expected Duration |
|-------|-------------|------------------|
| New | Candidate matched to job, not yet reviewed | 0–24 hours |
| Screened | Recruiter has reviewed; awaiting approval | 1–3 days |
| Approved | Head of Recruitment approved for this job | 1–2 days |
| Processing | Collecting documents (passport, medical, photos) | 1–3 weeks |
| Visa Applied | Visa submitted to embassy/consulate | 3–8 weeks |
| Deployed | Worker has traveled and started job | Final stage |
| Complete | Employer confirmed worker started; invoice paid | Final stage |
| Rejected | Not moving forward for this specific job | Any stage |

### How to Update a Pipeline Record

1. Open the **Pipeline** tab.
2. Find the row using CandidateID and/or JobID.
3. Update column D (Stage) to the new stage.
4. Update column E (Stage Date) to today's date.
5. Update column H (Next Action) with the next required step.
6. Update column I (Next Action Date) with the target date.
7. Add any notes in column G.

---

## 6. Module 5: Deals

### What It Tracks
The financial agreement and payment status for each placement.

### Deal Lifecycle

```
Open → Matching → Candidates Submitted → Interview → Offer Made → Closed → Paid
```

| Stage | Description |
|-------|-------------|
| Open | Job request raised, no candidates submitted yet |
| Matching | Candidates being identified |
| Candidates Submitted | Shortlist sent to employer |
| Interview | Employer interviewing candidates |
| Offer Made | Employer has selected a candidate |
| Closed | Worker deployed, invoice issued |
| Paid | Service fee received in full |

### Creating a Deal Record

The COO creates a deal record when an employer confirms they want to proceed:

1. Open the **Deals** tab.
2. Add a new row:
   - **DealID:** `DEAL-0001` (sequential)
   - **EmployerID, CandidateID, JobID:** From respective tabs
   - **Service Fee (USD):** Agreed placement fee (typically $500–2,000 per worker)
   - **Amount Paid:** $0 initially
   - **Amount Due:** = Service Fee (formula: `=E2-F2`)
   - **Payment Status:** `Open`
   - **Invoice Date:** Date invoice was sent
   - **COO Approved:** Check when COO has approved
3. Set a reminder for payment follow-up.

### Payment Recording

When payment is received:
1. Update column F (Amount Paid) with the amount received.
2. Column G (Amount Due) auto-calculates the balance.
3. If fully paid: set column H (Payment Status) = `Paid`.
4. Update column J (Payment Date) to today.

---

## 7. Module 6: Tasks

### What It Tracks
Every action item for the team. Auto-created by Zapier (Zap 05) or added manually.

### Task Priority Levels

| Priority | Use Case | Expected Response |
|----------|----------|------------------|
| High | Candidate needs urgent action, employer follow-up | Same day |
| Medium | Routine screening, document collection | Within 2 days |
| Low | Admin tasks, data cleanup | Within 5 days |

### Daily Task Management

1. Every morning, open the **Tasks** tab.
2. Filter column G (Status) = `Open` or `In Progress`.
3. Sort by column F (Due Date) ascending.
4. Work through tasks in priority order.
5. Update column G to `In Progress` when starting.
6. Update column G to `Done` and add column J (Completed Date) when finished.

---

## 8. Access Control Matrix

| Role | Master Data | Employers | Job Requests | Pipeline | Deals | Tasks | Dashboard |
|------|-------------|-----------|--------------|----------|-------|-------|-----------|
| CEO | Full Edit | Full Edit | Full Edit | Full Edit | Full Edit | Full Edit | View |
| COO | Full Edit | Full Edit | Full Edit | Full Edit | Full Edit | Full Edit | View |
| Head of Recruitment | Full Edit | View | Full Edit | Full Edit | View | Full Edit | View |
| Head of Tech | Full Edit | Full Edit | Full Edit | Full Edit | Full Edit | Full Edit | Full Edit |
| Senior Ops Manager | Edit | View | Edit | Edit | View | Full Edit | View |
| Recruiters | Edit (own) | View | View | Edit (own) | No | Edit (own) | View |
| Country Managers | Comment | No | No | No | No | Comment | View |
| HR/Admin | Edit (limited) | No | No | Edit | No | Full Edit | View |
| Head of Legal | View | View | View | View | View | View | View |

**Implementing Restricted Access:**
1. Go to **Data → Protect Sheets and Ranges** in Google Sheets.
2. Select the **Deals** tab → Restrict editing to CEO, COO, Head of Tech only.
3. For Master Data, protect columns E, L, M (sensitive AI data) from recruiter edits.

---

## 9. How to Use the CRM Daily

### Morning Routine (08:00–09:00 AM)

```
1. Open Google Sheets → Master Data tab
2. Filter Status = "New" → Review overnight submissions
3. Check AI_Score column — prioritize score 80+ first
4. Open Tasks tab → filter Status = "Open", sort by Due Date
5. Assign high-priority tasks
6. Open Employers tab → check for new "Lead" entries → COO follows up
```

### Candidate Updates (Throughout Day)

```
For each candidate you work on:
1. Update Status in column K
2. Update Notes in column O
3. Update Date Updated in column P
4. If moving to Processing: update Pipeline tab Stage
5. If requesting documents: create Task for recruiter
```

### Employer Follow-Ups (Afternoon)

```
For each "Contacted" employer:
1. Check Notes column for last contact date
2. If no contact in 3+ days: schedule WhatsApp follow-up
3. After contact: update Notes with outcome
4. If employer confirms: create Job Request, create Deal
```

---

## 10. Weekly KPIs to Track

Review these every Monday morning in the team meeting:

| KPI | Target | Where to Find |
|-----|--------|---------------|
| New candidates this week | 50+ | Dashboard → Total Candidates |
| Candidates screened | 80% of new | Dashboard → Screened count |
| Candidates approved | 30% of screened | Dashboard → Approved count |
| Employers contacted | 10+ | Employers tab |
| New deals opened | 3+ | Deals tab |
| Deals closed (paid) | 1+ | Deals tab → Paid status |
| Average AI score | 65+ | Dashboard → Avg AI Score |
| Tasks completed on time | 90%+ | Tasks tab |
| Outstanding payments (USD) | Minimize | Dashboard → Outstanding Balance |

### KPI Review Process

1. COO opens the Dashboard tab every Monday.
2. Screenshots the KPI values and shares in the Executive Strategy WhatsApp group.
3. If any KPI is below target: assigns a recovery action and owner.
4. Records in the weekly report (see `DAILY_REPORTING_SYSTEM.md`).

---

## 11. CRM Data Quality Standards

| Rule | Standard |
|------|----------|
| All candidates must have a Status | Never leave Status blank |
| Phone numbers | Always include country code (e.g., +234...) |
| Dates | Always enter in format DD/MM/YYYY |
| Notes | Always date-stamp notes: `15/01/24: Called, no answer` |
| CandidateID/EmployerID | Never duplicate or skip numbers |
| Rejected records | Never delete — set Status to Rejected |
| Completed deals | Never delete — set Status to Complete/Paid |

---

*Maintained by: COO | Contact: info@kingkenglobal.com.ng | https://www.kingkenglobal.com.ng*
