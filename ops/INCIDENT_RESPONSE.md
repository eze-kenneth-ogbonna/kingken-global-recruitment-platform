# Incident Response Playbook – Kingken Global Recruitment Platform

**Company:** Kingken Global Travel Agency Ltd  
**Document Type:** Incident Response  
**Version:** 1.0  
**Emergency Contact:** +96569048174 | info@kingkenglobal.com.ng

---

## 1. Severity Levels & Response Targets

| Severity | Label | Description | Response Time | Resolution Target | Owner |
|----------|-------|-------------|--------------|------------------|-------|
| **P1** | Critical | Platform completely down; data breach; all operations halted | 30 minutes | 4 hours | CEO + COO |
| **P2** | High | Major feature broken; candidate data exposed; payment system failure | 2 hours | 8 hours | COO + Ops Manager |
| **P3** | Medium | Single automation failing; WhatsApp bot not responding; minor data error | 4 hours | 24 hours | Ops Manager |
| **P4** | Low | Minor bug; cosmetic issue; single form field error | 24 hours | 72 hours | HR / Tech |

---

## 2. Escalation Path

```
Issue Discovered
       ↓
  Team Member
  (identifies issue)
       ↓
  Ops Manager
  (assesses severity)
       ↓ P1/P2              ↓ P3/P4
  COO notified         Ops Manager handles
  (within 30 min)      (documents + resolves)
       ↓ P1
  CEO notified
  (within 30 min)
       ↓ P1 Data Breach
  Affected parties notified
  (within 72 hours per NDPR/GDPR)
```

### Contact List

| Role | Name | WhatsApp | Email |
|------|------|----------|-------|
| CEO | Kenneth Eze | +96569048174 | info@kingkenglobal.com.ng |
| COO | [COO Name] | [Number] | coo@kingkenglobal.com.ng |
| Ops Manager | [Name] | [Number] | ops@kingkenglobal.com.ng |
| HR Lead | [Name] | [Number] | hr@kingkenglobal.com.ng |
| Zapier Support | — | — | support@zapier.com |
| WATI Support | — | — | support@wati.io |
| Google Workspace Support | — | — | support.google.com/a |

---

## 3. Incident Playbooks

### P1 Playbook – Google Sheets Platform Down

**Symptoms:** Google Sheets returns errors; team cannot access sheets; data not loading

**Steps:**
1. **[0–5 min]** Verify it is a real outage:
   - Go to https://workspace.google.com/dashboard to check service status
   - Check Google Workspace Status Page: https://www.google.com/appsstatus
   - Check if other team members can access the sheets
2. **[5–10 min]** Notify COO and CEO via WhatsApp immediately
3. **[10–15 min]** Check if the issue is account-specific:
   - Try accessing from a different browser or device
   - Try a different Google account
4. **[15–30 min]** If Google is down (their side):
   - Send team WhatsApp: "Google Sheets is temporarily down. Stand by. Do not attempt data entry."
   - Pause all active Zapier zaps (Zapier Dashboard → each Zap → turn off)
   - Note all pending actions in a paper/notepad for manual entry later
5. **[On resolution]** When Google Sheets comes back online:
   - Turn all Zaps back on
   - Check Zapier Task History for any failed tasks during the outage
   - Replay failed tasks
   - Verify all sheet data is intact
   - Send team WhatsApp: "Systems restored. Resume normal operations."
6. **[Within 24 hours]** Complete incident report (see template below)

---

### P2 Playbook – Candidate Data Leak / Unauthorised Access

**Symptoms:** Candidate personal data accessed by unauthorised person; Google Sheet shared incorrectly; data found in wrong hands

**Steps:**
1. **[0–15 min]** Contain the breach immediately:
   - If sheet was shared incorrectly → Go to Share → Remove the unauthorised user immediately
   - If Google account was compromised → Immediately change the password and revoke all active sessions (Google Account → Security → Your devices → Sign out all)
   - If API key was exposed → Revoke key immediately (see Security Controls document)
2. **[15–30 min]** Notify COO and CEO immediately
3. **[30–60 min]** Assess impact:
   - How many candidate records were exposed?
   - What data was exposed? (Name, phone, passport, medical?)
   - How long was the exposure window?
   - Do we know who accessed it?
4. **[1–4 hours]** Document the breach:
   - Date and time of discovery
   - Nature of data exposed
   - Number of affected individuals
   - How the breach occurred
   - Actions taken to contain it
5. **[Within 72 hours per NDPR/GDPR]** Notify affected individuals:
   - Send WhatsApp or email to each affected candidate
   - Use communication template (see Section 5)
6. **[Within 72 hours]** Notify regulatory authority if required:
   - Nigeria: NITDA (National Information Technology Development Agency)
   - Report at: https://nitda.gov.ng
7. **[After resolution]** Complete post-incident review

---

### P3 Playbook – Zapier Automation Failure

**Symptoms:** New form submissions not appearing in Google Sheets; auto-reply WhatsApp not sent; team not receiving notifications

**Steps:**
1. **[0–30 min]** Identify which Zap is failing:
   - Go to Zapier Dashboard → Task History
   - Filter by "Error" status
   - Identify the failing Zap and the error message
2. **[30–60 min]** Common fixes:
   - **"Google Sheets row not created":** Check that the target sheet still exists and column headers match the Zap field mapping exactly
   - **"Authentication expired":** Reconnect the Google account in Zapier → Connected Accounts
   - **"WATI not sending":** Check WATI API key in Zapier; verify WATI account is active and not over usage limits
   - **"OpenAI error":** Check OpenAI API key in Zapier; verify billing is active in OpenAI account
3. **[After fix]** Replay all failed tasks:
   - In Zapier Task History, select failed tasks
   - Click "Replay" to retry
4. **[Verify]** Submit a test form and confirm the Zap now works end-to-end
5. **[Within 24 hours]** Document the issue and fix in the incident log

---

### P4 Playbook – WhatsApp Bot Not Responding

**Symptoms:** Messages to the Kingken Global WhatsApp number receive no reply; bot not responding to keywords; flows not triggering

**Steps:**
1. **[0–30 min]** Diagnose:
   - Log into WATI Dashboard → check status indicator (green = online)
   - Check WATI → Conversations → any errors shown?
   - Go to WATI → Automation → check that flows are "Published" (not Draft)
   - Check keyword triggers are active
2. **[30–60 min]** Common fixes:
   - **Flow not published:** In WATI Bot Flow builder, click "Publish"
   - **Keyword not triggering:** Go to WATI → Keyword Triggers → verify spelling and ensure trigger is active
   - **WhatsApp number not connected:** Go to WATI → Settings → WhatsApp → reconnect number
   - **Message template not approved:** Check WATI → Message Templates → status should be "Approved"
3. **[Temporary fix]** If bot cannot be fixed within 1 hour:
   - Assign an HR Officer to manually respond to incoming messages
   - Post a WhatsApp status: "We are experiencing a technical issue. Please call +96569048174 for urgent inquiries."
4. **[After fix]** Send test message and verify bot responds correctly
5. **[Within 48 hours]** Document in incident log

---

## 4. Post-Incident Review Template

Complete within 48 hours of resolving any P1 or P2 incident, and within 72 hours for P3/P4.

---

**Incident Review Report**

| Field | Details |
|-------|---------|
| Incident ID | INC-YYYYMMDD-NNN |
| Date/Time Discovered | |
| Date/Time Resolved | |
| Total Duration | |
| Severity | P1 / P2 / P3 / P4 |
| Reported By | |
| Incident Lead | |

**What happened:**
*(Describe the incident clearly in 2–3 sentences)*

**Root cause:**
*(What caused the incident?)*

**Impact:**
- Number of users affected:
- Data affected (Yes/No):
- Revenue impact (Yes/No):
- Operations disruption duration:

**Timeline:**
| Time | Action Taken |
|------|-------------|
| | Incident discovered |
| | COO notified |
| | Investigation started |
| | Root cause identified |
| | Fix implemented |
| | Verified resolved |

**Actions taken to resolve:**
*(Step-by-step list of what was done)*

**Preventive measures (to avoid recurrence):**
*(What changes are being made to prevent this happening again?)*

**Lessons learned:**
*(What did the team learn from this incident?)*

**Sign-off:**
- Incident Lead: _________________________
- COO: _________________________
- Date: _________________________

---

## 5. Communication Templates

### Template 1 – Internal Team Alert (P1/P2)

> 🚨 *INCIDENT ALERT – KINGKEN GLOBAL*
> 
> *Severity:* P1 / P2
> *Time:* [HH:MM]
> *Issue:* [Brief description]
> *Impact:* [What is affected]
> 
> *Action Required:*
> - [Specific instruction for this team member]
> 
> Updates will follow every 30 minutes until resolved.
> *Incident Lead:* [Name]

---

### Template 2 – Candidate Notification (Data Breach)

> Dear [Candidate Name],
> 
> We are writing to inform you of a data security incident that may have affected your personal information stored with Kingken Global Travel Agency Ltd.
> 
> **What happened:** [Brief, clear description]
> 
> **What information was involved:** [List only the relevant data types]
> 
> **What we have done:** We have contained the breach and secured your data. [Additional steps taken]
> 
> **What you can do:**
> - Be alert to any unsolicited communications using your personal information
> - Contact us immediately if you notice any suspicious activity
> 
> We sincerely apologise for this incident. The security of your data is our highest priority.
> 
> For questions, contact us:
> 📞 +96569048174
> 📧 info@kingkenglobal.com.ng
> 
> Kingken Global Travel Agency Ltd

---

### Template 3 – Service Restoration Notice

> ✅ *SERVICE RESTORED – KINGKEN GLOBAL*
> 
> Normal operations have resumed at Kingken Global.
> 
> *Issue:* [Brief description]
> *Resolved at:* [Time]
> *Total downtime:* [Duration]
> 
> All pending applications and requests have been processed.
> 
> If you submitted a request during the downtime, please confirm receipt with our team:
> 📞 +96569048174
> 
> Thank you for your patience.
> *The Kingken Global Team*

---

## 6. Data Breach Notification Procedure

Per NDPR (Nigeria Data Protection Regulation) and GDPR requirements:

| Step | Action | Deadline |
|------|--------|---------|
| 1 | Contain the breach and preserve evidence | Immediately |
| 2 | Assess the severity and scope | Within 1 hour |
| 3 | Notify CEO and COO | Within 30 minutes |
| 4 | Document the breach (what, when, who, how many) | Within 4 hours |
| 5 | Notify affected individuals | Within 72 hours |
| 6 | Notify NITDA (if Nigerian data involved) | Within 72 hours |
| 7 | Complete full incident report | Within 7 days |
| 8 | Implement preventive measures | Within 30 days |
| 9 | Follow-up review to confirm prevention measures work | Within 90 days |

**NITDA Notification (Nigeria):**
- Portal: https://nitda.gov.ng/data-protection/
- Email: info@nitda.gov.ng
- Provide: breach description, data types, number affected, actions taken

**ICO Notification (UK/EU if applicable):**
- Portal: https://ico.org.uk/report-a-breach/
- Only required if EU/UK personal data is involved

---

## 7. Incident Log

Maintain a running incident log in a Google Sheet tab named "Incident Log" with columns:

| Column | Field |
|--------|-------|
| A | Incident ID |
| B | Date Discovered |
| C | Severity |
| D | Description |
| E | Root Cause |
| F | Resolution |
| G | Duration |
| H | Data Breach? (Yes/No) |
| I | Affected Users |
| J | Incident Lead |
| K | Status (Open/Resolved) |
| L | Lessons Learned |
