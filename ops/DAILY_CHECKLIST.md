# Daily Operations Checklist — Kingken Global Recruitment Platform

**Document Type:** Operational Checklist
**Frequency:** Every business day (Monday–Friday)
**Owner:** Each team member completes their section; submitted to COO by 6 PM daily
**Company:** Kingken Global Travel Agency Ltd.

---

## Overview

This checklist ensures all critical daily operational tasks are completed consistently across every team member. Each role has their own section. Completion is reported via the Daily Report (see `DAILY_REPORT_TEMPLATE.md`).

---

## COO Daily Checklist

**Completion time:** 08:00–09:30 AM and end of day review

### Morning (08:00–09:30 AM)

- [ ] Open Google Sheets Dashboard → review all 7 KPI sections
- [ ] Check for new employer leads (Employers Database — Status = Lead added since yesterday)
- [ ] Review outstanding invoices (Deals & Revenue — Payment Status = Overdue)
- [ ] Review Zapier Task History for any failures (all 6 Zaps)
- [ ] Check for unread WhatsApp messages from employers on WATI
- [ ] Respond to all employer WhatsApp messages within the 24-hour SLA window
- [ ] Review new employer leads from previous day → contact within 24 hours of submission
- [ ] Post morning standup summary in "Operations Daily" WhatsApp group by 08:30 AM

### Midday (11:00 AM–12:00 PM)

- [ ] Review Deals tab — any payments due today or this week?
- [ ] Follow up on outstanding invoices that are Overdue or due within 7 days
- [ ] Check in with Head of Recruitment on pipeline status

### End of Day (5:00–6:00 PM)

- [ ] Review all team daily reports as they come in
- [ ] Note any critical blockers requiring escalation
- [ ] Prepare COO daily summary for CEO (submitted by 6:30 PM)
- [ ] Confirm all P1/Critical tasks in Tasks sheet have been completed or rescheduled

---

## Head of Recruitment Daily Checklist

**Completion time:** 08:00–10:00 AM and 3:00–5:30 PM

### Morning (08:00–10:00 AM)

- [ ] Open Master Data → filter Status = "New" → review all new candidates since yesterday
- [ ] Assign all new candidates to individual recruiters (update AssignedTo column M)
- [ ] Check Pipeline tab → identify any candidates stuck > 7 days in same stage (yellow highlight)
- [ ] Review Job Requests — any new requests? Assign to recruiter if applicable
- [ ] Review shortlists pending employer approval — follow up if >48 hours since sending
- [ ] Check medical and visa stages — any pipeline entries blocked > 5 days?

### Afternoon (3:00–5:30 PM)

- [ ] Review recruiter progress reports (submitted by each recruiter by 4 PM)
- [ ] Approve or reject candidates escalated by recruiters from Screened status
- [ ] Update Pipeline entries where Head of Recruitment approval is the blocker
- [ ] Submit daily report to COO by 5:30 PM including:
  - New candidates reviewed
  - Approvals / rejections today
  - Pipeline entries advanced
  - Any critical blockers

---

## Head of Tech Daily Checklist

**Completion time:** 08:00–09:00 AM and as needed

### Morning (08:00–09:00 AM)

- [ ] Check Zapier Task History — any errors in last 24 hours? (target: 0 failures)
- [ ] Check WATI message delivery report — any failed template sends?
- [ ] Open Google Sheets → check for any `#REF!`, `#VALUE!`, or `#N/A` errors in Dashboard
- [ ] Verify Master Data Column L (AI_Score) is being populated for new candidates
- [ ] Check for blank CandidateIDs in Master Data (Apps Script failure indicator)
- [ ] Review GitHub Actions workflow status — any failed CI runs?

### Weekly (Every Monday in addition to daily)

- [ ] Review and rotate API keys if approaching 90-day expiry
- [ ] Run full system test: submit test application and track it through all automation steps
- [ ] Review WATI bot analytics — any high drop-off points in bot flows?
- [ ] Check Google Apps Script execution log for errors
- [ ] Audit team access permissions — any leavers requiring access removal?

---

## Recruiter Daily Checklist (x3 Recruiters)

**Completion time:** 08:30–5:00 PM

### Morning (08:30–10:00 AM)

- [ ] Open Master Data → filter AssignedTo = my name, Status = "New"
- [ ] Contact all new assigned candidates via WhatsApp within 24 hours of assignment
  - Introduce yourself and Kingken Global
  - Verify their details (name, phone, position, availability)
  - Ask about passport and document readiness
- [ ] Update Status in Master Data:
  - Verified and interested → `Screened`
  - Unreachable after 2 attempts → note in Notes, keep as `New` for 48h then escalate
  - Not interested → `Rejected` with reason in Notes

### Active Pipeline Management (10:00 AM–4:00 PM)

- [ ] Review Pipeline tab → all my assigned entries (filter by Assigned HR Officer)
- [ ] Advance candidates to next stage if exit criteria are met
- [ ] Request documents from all candidates in "Document Processing" stage with incomplete docs
- [ ] Follow up on document requests older than 3 days
- [ ] Update Notes column with all candidate communication

### End of Day (4:00–5:00 PM)

- [ ] Complete all Tasks assigned to me in Tasks sheet due today
- [ ] Update any Blocked tasks with explanation in Notes
- [ ] Submit daily report to Head of Recruitment by 4:30 PM:
  - Candidates contacted today
  - Status changes made
  - Pipeline entries advanced
  - Blockers

---

## Senior Operations Manager Daily Checklist

**Completion time:** 09:00 AM–5:30 PM

### Morning (09:00–10:00 AM)

- [ ] Open Tasks sheet → filter Status = "Not Started" or "In Progress" → review all open tasks
- [ ] Identify any overdue tasks (red highlight) → reassign or escalate
- [ ] Check for new tasks created by Zapier automation (Type = auto-created)
- [ ] Assign unassigned tasks to appropriate team members

### Midday and Afternoon

- [ ] Follow up with team on tasks due today — confirm completion
- [ ] Collect daily reports from all team members by 5 PM
- [ ] Compile and submit consolidated operations summary to COO by 5:30 PM
- [ ] Update Tasks sheet → mark completed tasks as Done with completion date

---

## HR / Admin Daily Checklist

**Completion time:** 09:00 AM–5:30 PM

### Morning

- [ ] Check info@kingkenglobal.com.ng inbox — respond to all emails within same business day
- [ ] Check for new candidate CVs and documents received by email → upload to Google Drive → update CV_Link in Master Data

### Document Management

- [ ] Check Pipeline tab for any candidates in "Document Processing" stage
- [ ] Follow up with candidates on missing documents via WhatsApp
- [ ] File newly received documents in Google Drive (correct folder structure)
- [ ] Update Pipeline Column K (Documents Submitted) when documents are received

### Administrative

- [ ] Update calendar with any new meetings, employer calls, or interview schedules
- [ ] Create any new tasks that have been requested by COO or team members
- [ ] Check Tasks sheet for administrative tasks assigned to HR/Admin
- [ ] Submit daily summary to Senior Ops Manager by 5:00 PM

---

## Weekend Monitoring (Saturdays — Reduced Operations)

**Owner:** COO + one rotating team member on standby

- [ ] Check WATI for urgent employer messages (9 AM – 2 PM only)
- [ ] Review Zapier for any critical automation failures
- [ ] Respond to urgent employer inquiries (SLA: within 4 hours during business hours)
- [ ] No routine tasks required — emergency only

---

## Daily Report Submission Schedule

| Role | Submits To | Deadline |
|------|-----------|----------|
| Country Managers (Nig/Gha/Ken) | Head of Recruitment | 4:00 PM |
| Recruiters (x3) | Head of Recruitment | 4:30 PM |
| HR / Admin | Senior Ops Manager | 5:00 PM |
| Head of Recruitment | COO | 5:30 PM |
| Senior Ops Manager | COO | 5:30 PM |
| Head of Tech | COO | 5:30 PM |
| COO | CEO | 6:30 PM |

---

## Escalation Triggers

Immediately escalate to the next level if any of the following occur:

| Situation | Escalate To | Method |
|-----------|------------|--------|
| Zapier zap failure affecting new candidate processing | Head of Tech | WhatsApp call |
| Overdue invoice > 14 days unpaid | COO | Direct message |
| Candidate reports abuse or unsafe situation | COO + Head of Legal | Immediate call |
| WATI bot completely unresponsive | Head of Tech | WhatsApp call |
| Google Sheets data corruption or mass deletion | Head of Tech + COO | Immediate call |
| Candidate or employer data breach suspected | Head of Tech + Head of Legal | Immediate call |

---

*Maintained by: COO | Contact: info@kingkenglobal.com.ng | https://www.kingkenglobal.com.ng*
