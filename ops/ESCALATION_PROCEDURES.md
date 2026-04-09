# Escalation Procedures — Kingken Global Recruitment Platform

**Document Type:** Escalation and Incident Response Procedures
**Scope:** All operational, technical, HR, and compliance escalations
**Owner:** COO (process owner); all team members follow this procedure
**Company:** Kingken Global Travel Agency Ltd.

---

## Overview

This document defines the escalation paths for all issues that arise in the day-to-day operation of Kingken Global's recruitment platform. Clear escalation procedures prevent delays, protect the company and its candidates, and ensure the right person is informed and empowered to act.

**Principles:**
1. Escalate quickly — a short delay is better than a long delay when something is wrong
2. Escalate with context — provide enough information for the recipient to act immediately
3. Never assume someone else is handling it — if you are unsure, escalate
4. All P1/P2 escalations are followed up with a written incident report within 24 hours

---

## Escalation Priority Levels

| Level | Name | Description | Response Time |
|-------|------|-------------|--------------|
| P1 | Critical | Immediate risk to candidate safety, data security, or business continuity | **Within 1 hour** — call, not message |
| P2 | High | Significant issue affecting multiple candidates, deals, or platform operations | **Within 4 hours** |
| P3 | Medium | Operational issue affecting one or a few records, resolvable within the day | **Within 24 hours** |
| P4 | Low | Minor issue with no immediate impact; can be resolved in normal workflow | **Within 48 hours** |

---

## Escalation Contact Directory

| Role | Contact Method | Backup Contact |
|------|---------------|----------------|
| CEO | WhatsApp (direct, stored internally) | Email: info@kingkenglobal.com.ng |
| COO | WhatsApp (direct) | Email: info@kingkenglobal.com.ng |
| Head of Tech | WhatsApp (direct) | Apps Script alert (if tech issue) |
| Head of Recruitment | WhatsApp (direct) | COO |
| Head of Legal / Compliance | WhatsApp (direct) | COO |
| Senior Ops Manager | WhatsApp (direct) | COO |
| WATI Support | support@wati.io | WATI in-app chat |
| Zapier Support | support@zapier.com | help.zapier.com |
| OpenAI Support | help.openai.com | platform.openai.com status page |
| Google Workspace Admin | Google Admin Console | support.google.com/a |

---

## Category 1: Candidate Safety and Welfare Escalations

### 1.1 Candidate Reports Abuse, Exploitation, or Unsafe Working Conditions

**Priority:** P1 — Critical
**Escalate to:** COO → Head of Legal (simultaneously)
**Method:** Phone call, then WhatsApp for written record

**Immediate steps:**
1. Listen carefully to the candidate — document exactly what they report
2. Do NOT promise outcomes you cannot deliver (e.g., "we will get you home today")
3. Call COO immediately regardless of time of day
4. COO calls Head of Legal within 30 minutes
5. Preserve all WhatsApp messages and communication records (screenshot)
6. Head of Legal contacts relevant embassy or labor authority if required
7. Document everything in the candidate's Pipeline Notes column

**Escalation message format (to COO):**
```
🚨 P1 — CANDIDATE WELFARE ALERT
Candidate: [Name] [CandidateID]
Employer: [Employer Name] [Country]
Situation: [Brief factual description — 2–3 sentences]
Contact number: [WhatsApp number]
Last communication: [Time and what was said]
ACTION REQUIRED IMMEDIATELY
```

---

### 1.2 Candidate Unreachable After Deployment

**Priority:** P2 — High
**Escalate to:** COO → Head of Recruitment
**Method:** WhatsApp message (urgent flag 🚨)
**Trigger:** Candidate has not responded to any contact for 72+ hours after deployment

**Steps:**
1. Recruiter attempts contact via WhatsApp, phone call (minimum 3 attempts over 24 hours)
2. If no response after 3 attempts: escalate to Head of Recruitment
3. Head of Recruitment contacts employer directly to confirm candidate arrival
4. If employer cannot confirm candidate's presence: escalate to COO
5. COO contacts relevant country manager to investigate
6. If candidate cannot be located within 48 hours of P2 escalation: escalate to P1

---

### 1.3 Candidate Documents Appear Fraudulent

**Priority:** P2 — High
**Escalate to:** Head of Legal → COO
**Method:** WhatsApp message

**Steps:**
1. Recruiter flags suspicious document in Pipeline Notes
2. Recruiter escalates to Head of Recruitment within 1 business day
3. Head of Recruitment escalates to Head of Legal for review
4. Head of Legal advises on whether to reject candidate or report
5. Do NOT share with employer until legal review complete
6. Set pipeline Stage to "Rejected" with reason: "Document verification — under review"

---

## Category 2: Technical and Platform Escalations

### 2.1 All Zapier Zaps Failing

**Priority:** P1 — Critical
**Escalate to:** Head of Tech immediately
**Method:** WhatsApp call

**Immediate steps (Head of Tech):**
1. Log into Zapier → check Task History for all 6 Zaps
2. Identify common failure point (often an API key expiry or connection issue)
3. Attempt to reconnect the failing app connection in Zapier
4. If not resolvable within 30 minutes: notify COO and implement manual fallback:
   - Manually check Form Responses and migrate to Master Data
   - Manually send WhatsApp acknowledgments via WATI broadcast
5. Post update in "Operations Daily" WhatsApp group every 30 minutes until resolved

---

### 2.2 WATI Bot Completely Unresponsive

**Priority:** P1 — Critical
**Escalate to:** Head of Tech
**Method:** WhatsApp call

**Immediate steps:**
1. Check WATI status page (wati.io/status or app.wati.io → System Status)
2. Check if WATI WhatsApp number is still active in Meta Business Manager
3. If WATI platform issue: follow WATI's incident communication
4. Post temporary message in WhatsApp status: "Our WhatsApp bot is temporarily unavailable. Please send a message directly and our team will respond within [X] hours."
5. Activate manual intake: team members handle WhatsApp responses directly
6. Notify COO of estimated resolution time

---

### 2.3 Google Sheets Data Corruption or Mass Deletion

**Priority:** P1 — Critical
**Escalate to:** Head of Tech + COO simultaneously
**Method:** Phone call

**Immediate steps:**
1. Do NOT make further edits to the affected sheet
2. Head of Tech immediately goes to **File → Version history** and identifies the last clean version
3. Restore the last clean version
4. Audit the Audit Log sheet to understand what was changed and by whom
5. Revoke edit access for any suspected unauthorized account immediately
6. COO notified of data loss scope and recovery status
7. Post-incident: identify cause and implement prevention measure

---

### 2.4 OpenAI API Key Compromised or Rate Limit Hit

**Priority:** P2 — High
**Escalate to:** Head of Tech
**Method:** WhatsApp message

**Steps:**
1. Immediately rotate the OpenAI API key in platform.openai.com
2. Update the new key in Apps Script Script Properties (`OPENAI_API_KEY`)
3. Update in Zapier if used there as well
4. If rate limit (not compromise): review usage, increase limits, or pause non-critical scoring
5. Notify COO of impact duration (estimated hours candidates went unscored)

---

### 2.5 GitHub Repository Contains Accidentally Committed Secrets

**Priority:** P2 — High
**Escalate to:** Head of Tech
**Method:** Immediately

**Steps:**
1. Rotate the exposed key immediately (even before removing from git)
2. Use `git filter-branch` or BFG Repo Cleaner to remove from git history
3. Force-push the cleaned history
4. Notify GitHub Security if needed
5. Review CI pipeline — the key scan in `ci.yml` should have caught this; investigate why it did not

---

## Category 3: Employer and Commercial Escalations

### 3.1 Employer Refuses to Pay Invoice (> 30 Days Overdue)

**Priority:** P2 — High
**Escalate to:** COO → Head of Legal
**Method:** COO documents and calls Head of Legal

**Steps:**
1. COO sends formal payment reminder via WhatsApp and email (provide paper trail)
2. If no response within 7 days: formal demand letter from Head of Legal
3. If no payment after 14 days of formal letter: COO decides on legal action or write-off
4. Pause any further deployments to this employer until account is settled
5. Update Employer Status to "Paused" in Employers Database

---

### 3.2 Employer Withdraws Contract After Workers Are Already Processing

**Priority:** P2 — High
**Escalate to:** COO + Head of Legal
**Method:** WhatsApp message (urgent flag)

**Steps:**
1. COO reviews service agreement for cancellation terms and deposit conditions
2. Head of Legal advises on whether a portion of the fee can be retained
3. Affected candidates notified by HR Officer: "Opportunity on hold — you will be matched to another role"
4. Update Job Request Status to "Cancelled"
5. Update all related Pipeline entries: Stage → "Rejected", Notes → "Employer cancelled contract [date]"
6. Candidates returned to "Approved" status in Master Data for re-matching

---

### 3.3 New Employer Lead Not Contacted Within 24 Hours

**Priority:** P3 — Medium
**Escalate to:** Senior Ops Manager → COO
**Method:** WhatsApp message

**Steps:**
1. Senior Ops Manager reviews Tasks tab at 10 AM daily for overdue employer contact tasks
2. If employer contact task is overdue (> 24 hours from lead submission): reassign to available team member
3. Alert COO if the employer lead appears high-value (> 20 workers requested)
4. Contact the employer and note the delay in Employers Database Notes

---

## Category 4: HR and Team Escalations

### 4.1 Team Member Repeatedly Missing Daily Reports

**Priority:** P3 — Medium
**Escalate to:** Direct manager → COO
**Method:** Private WhatsApp message (not group)

**Steps:**
1. Direct manager privately messages the team member after 2 consecutive missed reports
2. If missed 5+ reports in a month: formal verbal warning by direct manager
3. If issue persists: COO involved in performance discussion
4. Document all incidents with dates for HR record

---

### 4.2 Team Member Reports Misconduct or Harassment

**Priority:** P1 — Critical
**Escalate to:** COO → Head of Legal → CEO
**Method:** Private WhatsApp message or call to COO

**Steps:**
1. COO receives report in strict confidence
2. COO informs Head of Legal and CEO within 4 hours
3. Head of Legal advises on investigation process
4. No retaliation against the reporting person — zero tolerance policy
5. Head of Legal leads investigation within 7 business days
6. Outcome communicated to both parties by Head of Legal and COO

---

## Escalation Message Templates

### Standard P1 Escalation Message

```
🚨 P1 ESCALATION — [CATEGORY]
Time: [HH:MM]
Raised by: [Name / Role]
Description: [2–3 sentences of what is happening]
Impact: [Who/what is affected]
Steps taken so far: [Brief list]
ACTION REQUIRED: [Specific ask from recipient]
📞 Please call me immediately.
```

### Standard P2 Escalation Message

```
⚠️ P2 ESCALATION — [CATEGORY]
Time: [HH:MM]
Raised by: [Name / Role]
Description: [2–3 sentences]
Impact: [Who/what is affected]
Steps taken so far: [Brief list]
Action needed from you: [Specific ask]
Timeline: [When this needs to be resolved by]
```

### Incident Resolution Message (After Resolving)

```
✅ RESOLVED — [Original P-level] [CATEGORY]
Resolved by: [Name]
Resolution time: [HH:MM]
Root cause: [1–2 sentences]
Action taken: [What was done]
Prevention measure: [What will prevent recurrence]
```

---

## Escalation Log

All P1 and P2 escalations must be logged in the **Audit Log** sheet with:
- Date and time of escalation
- Issue category and P-level
- Who escalated and to whom
- Resolution summary
- Time to resolution

---

*Maintained by: COO | Contact: info@kingkenglobal.com.ng | https://www.kingkenglobal.com.ng*
