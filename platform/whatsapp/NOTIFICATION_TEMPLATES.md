# Notification Templates — WATI WhatsApp Configuration
# Kingken Global Recruitment Platform

**Document Type:** Outbound Message Templates (Meta-Approved)
**Platform:** WATI (WhatsApp API Tool Interface)
**Purpose:** Pre-approved WhatsApp message templates for outbound notifications to candidates and employers — covers all key recruitment lifecycle events
**Company:** Kingken Global Travel Agency Ltd.

---

## Overview

All outbound WhatsApp messages that initiate a conversation (outside the 24-hour customer service window) must use Meta-approved message templates. This document contains all templates used by the Kingken Global platform, organized by recipient type and use case.

Templates are sent via:
1. **WATI API** — triggered by Zapier zaps or Apps Script
2. **WATI Broadcast** — for bulk notifications to candidate groups
3. **WATI Dashboard** — for manual one-off sends by team members

---

## Template Submission Checklist

Before submitting a template for Meta approval:
- [ ] Category selected correctly (Utility / Marketing / Authentication)
- [ ] Language set to English
- [ ] All variables use `{{1}}`, `{{2}}` format (not custom names)
- [ ] No promotional language in Utility templates
- [ ] No phone numbers or URLs in template body (use header/footer instead)
- [ ] Template name uses lowercase with underscores only
- [ ] Test send completed before submitting for approval

---

## Category 1: Candidate / Worker Templates

---

### Template 1: `worker_acknowledgment`

**Category:** Utility
**Use case:** Sent automatically after a worker submits their application (via Google Form or WhatsApp Bot)
**Trigger:** Zapier Zap-01 or Apps Script `migrate-form-to-master.gs` on new Master Data row
**Variables:** {{1}} = Full Name, {{2}} = Position applied for, {{3}} = CandidateID

**Template body:**
```
Hello {{1}}! 👋

Thank you for applying to *Kingken Global Travel Agency Ltd*.

We have received your application for *{{2}}* and our team will review it within 2–3 business days.

Your Application Reference: *{{3}}*

We will contact you on this WhatsApp number with updates.

📧 info@kingkenglobal.com.ng
🌐 www.kingkenglobal.com.ng
```

**Footer:** Kingken Global Travel Agency Ltd

---

### Template 2: `application_status_update`

**Category:** Utility
**Use case:** Sent when a candidate's status changes in the Master Data or Pipeline sheet
**Trigger:** Apps Script `audit-log-on-edit.gs` on Status column change; or Zapier automation
**Variables:** {{1}} = Full Name, {{2}} = New Status, {{3}} = Next step description

**Template body:**
```
Hello {{1}}! 📋

We have an update on your Kingken Global application:

Current Status: *{{2}}*
Next Step: {{3}}

If you have questions, please reply to this message or contact us:
📧 info@kingkenglobal.com.ng
📱 +96569048174

— Kingken Global Recruitment Team
```

**Footer:** Kingken Global Travel Agency Ltd

**Status-to-Next Step mapping (for automation):**
| Status | Next Step Text |
|--------|---------------|
| Screened | Your profile has been reviewed. If approved, you will be contacted shortly for next steps. |
| Approved | Congratulations! You have been approved. Our team will contact you about available job matches. |
| Processing | Your placement is being processed. Please ensure all your documents are ready. |
| Deployed | Congratulations on your deployment! Please confirm safe arrival with your employer. |
| Rejected | Thank you for applying. At this time, your application does not match our current requirements. You may reapply in 3 months. |

---

### Template 3: `interview_invitation`

**Category:** Utility
**Use case:** Sent when a candidate has been shortlisted and an interview is scheduled
**Trigger:** Manual send by HR Officer via WATI dashboard, or Zapier when Pipeline Stage = "Interview"
**Variables:** {{1}} = Full Name, {{2}} = Position, {{3}} = Country/Employer, {{4}} = Date and Time, {{5}} = Interview format

**Template body:**
```
Hello {{1}}! 🎉

Congratulations! You have been *shortlisted* for a *{{2}}* role in *{{3}}*.

*Interview Details:*
📅 Date & Time: {{4}}
📞 Format: {{5}}

Please reply *CONFIRM* to confirm your attendance, or *DECLINE* if you are unable to attend.

Prepare to discuss your experience, availability, and document readiness.

— Kingken Global Recruitment Team
```

**Footer:** Kingken Global Travel Agency Ltd

---

### Template 4: `document_request`

**Category:** Utility
**Use case:** Sent when a candidate needs to submit specific documents to proceed
**Trigger:** Manual send by HR Officer or automated when Pipeline Column K (Documents Submitted) = "Partial"
**Variables:** {{1}} = Full Name, {{2}} = List of documents needed, {{3}} = Deadline date

**Template body:**
```
Hello {{1}}! 📂

To proceed with your job placement, we need the following documents from you:

{{2}}

*Please submit by:* {{3}}

You can:
• WhatsApp the documents to this number (+96569048174)
• Email to info@kingkenglobal.com.ng (subject: "Docs — [Your Name]")
• Drop off at our nearest office

If you need assistance obtaining any document, reply to this message and we will guide you.

— Kingken Global HR Team
```

**Footer:** Kingken Global Travel Agency Ltd

**Common document list values for {{2}}:**
```
• Valid international passport (scan of data page)
• Police clearance certificate
• Medical fitness certificate (from approved clinic)
• Passport photographs (6 copies, white background)
• Previous employment letter(s)
```

---

### Template 5: `deployment_confirmation`

**Category:** Utility
**Use case:** Sent when a candidate's deployment is confirmed and travel is arranged
**Trigger:** Manual send by HR Officer when Pipeline Stage = "Deployed" and travel confirmed
**Variables:** {{1}} = Full Name, {{2}} = Employer name, {{3}} = Country, {{4}} = Travel/start date, {{5}} = Emergency contact at Kingken Global

**Template body:**
```
Hello {{1}}! ✈️🎊

*Congratulations — your deployment is confirmed!*

Employer: *{{2}}*
Country: *{{3}}*
Start Date: *{{4}}*

*Important reminders before travel:*
• Ensure your passport and all documents are with you
• Carry a printed copy of your employment contract
• Save this number for emergencies: {{5}}

We wish you all the best in your new role! 🙏

For any urgent issue after arrival, contact us immediately:
📧 info@kingkenglobal.com.ng
📱 +96569048174

— Kingken Global Travel Agency Ltd
```

---

### Template 6: `medical_appointment_reminder`

**Category:** Utility
**Use case:** Reminds candidates of upcoming medical examination appointments
**Trigger:** Apps Script or Zapier, day before scheduled medical appointment
**Variables:** {{1}} = Full Name, {{2}} = Clinic name, {{3}} = Address, {{4}} = Appointment date and time

**Template body:**
```
Hello {{1}}! 🏥

This is a reminder about your *medical examination* for your Kingken Global job placement.

🏥 Clinic: {{2}}
📍 Address: {{3}}
📅 Date & Time: {{4}}

*Please bring:*
• Valid passport (original)
• 2 recent passport photographs
• Any previous medical records (optional but helpful)

Arrive 15 minutes early. The examination typically takes 2–3 hours.

Questions? Reply to this message or call: +96569048174

— Kingken Global HR Team
```

---

## Category 2: Employer Templates

---

### Template 7: `employer_welcome`

**Category:** Utility
**Use case:** Sent after an employer submits a hiring request (via Google Form or WhatsApp Bot)
**Trigger:** Zapier Zap-06 on new Employers Database row
**Variables:** {{1}} = Contact Person Name, {{2}} = Company Name, {{3}} = Number of workers requested, {{4}} = Position

**Template body:**
```
Hello {{1}} from *{{2}}*! 🌍

Thank you for submitting a hiring request to *Kingken Global Travel Agency Ltd*.

We have received your requirement for *{{3}} workers* ({{4}}).

Our COO will contact you on this number within *24 hours* to discuss your requirements and provide a service proposal.

📧 info@kingkenglobal.com.ng
🌐 www.kingkenglobal.com.ng
📱 +96569048174

Thank you for choosing Kingken Global! 🤝
```

---

### Template 8: `shortlist_ready`

**Category:** Utility
**Use case:** Notifies employer that a candidate shortlist has been prepared for their review
**Trigger:** Manual send by COO or Head of Recruitment when shortlist is shared
**Variables:** {{1}} = Contact Person Name, {{2}} = Company Name, {{3}} = Job position, {{4}} = Number of candidates in shortlist

**Template body:**
```
Hello {{1}}! 📋

Great news from *Kingken Global*!

We have prepared a shortlist of *{{4}} qualified candidates* for your *{{3}}* role at *{{2}}*.

Your shortlist has been sent to your email address. Please review and confirm your preferred candidates.

*Next steps after your selection:*
1. We initiate document collection
2. Medical & visa processing begins
3. Deployment in 6–10 weeks

For questions, reply to this message or contact our COO directly.

📧 info@kingkenglobal.com.ng
📱 +96569048174

— Kingken Global Recruitment Team
```

---

### Template 9: `payment_reminder`

**Category:** Utility
**Use case:** Reminds employer of an outstanding or upcoming invoice payment
**Trigger:** Zapier automation when Deals sheet Payment Due Date is within 7 days or past due
**Variables:** {{1}} = Contact Person Name, {{2}} = Invoice number, {{3}} = Amount due, {{4}} = Due date

**Template body:**
```
Hello {{1}},

This is a friendly reminder from *Kingken Global Travel Agency Ltd* regarding:

Invoice: *{{2}}*
Amount Due: *{{3}} USD*
Due Date: *{{4}}*

Please ensure payment is processed by the due date to avoid any delays to your worker deployment.

*Payment methods accepted:*
• Bank Transfer (USD)
• Western Union / MoneyGram
• Payment link (request from COO)

To confirm payment or discuss terms, please reply to this message.

📧 info@kingkenglobal.com.ng
📱 +96569048174

— Kingken Global Finance Team
```

---

## Template Management

### Submission Process

1. Log into WATI Dashboard
2. Go to **Templates → Create New Template**
3. Enter template name (lowercase, underscores only)
4. Select category: Utility / Marketing / Authentication
5. Set language: English
6. Enter template body with `{{1}}`, `{{2}}` variables
7. Submit for Meta review
8. Approval typically takes 24–48 hours
9. Once approved, template status shows as "Approved" in WATI

### Template Rejection Reasons and Fixes

| Rejection Reason | Fix |
|-----------------|-----|
| Contains promotional language in Utility | Move promotional content to Marketing template |
| Variable count doesn't match body | Ensure variables are sequential: {{1}}, {{2}}, {{3}} |
| URL in body | Move URL to footer or header |
| Too short / no clear utility purpose | Add more context about why message is being sent |
| Duplicate template name | Append `_v2` to name |

### Template Testing Checklist

Before going live with any template:
- [ ] Send test from WATI to personal number
- [ ] Verify all variable substitutions display correctly
- [ ] Check formatting (bold, line breaks) renders as expected
- [ ] Test with a long value in each variable field (edge case)
- [ ] Confirm Zapier/Apps Script can trigger the template with correct variable values

---

## Broadcast Campaigns

For bulk outreach to candidate groups, use WATI Broadcast:

| Campaign | Audience | Template | Frequency |
|----------|----------|----------|-----------|
| Weekly Job Updates | All "Approved" candidates | Custom broadcast | Weekly (Monday) |
| Document Reminder | Candidates with Partial documents | `document_request` | Bi-weekly |
| Deployment Countdown | Candidates in Visa stage | `application_status_update` | Weekly |
| Re-engagement | Candidates inactive > 30 days | Custom broadcast | Monthly |

**Broadcast limits:** WATI Growth plan allows up to 1,000 broadcasts/day. Schedule large campaigns across multiple days if needed.

---

*Maintained by: Head of Tech | Contact: info@kingkenglobal.com.ng | https://www.kingkenglobal.com.ng*
