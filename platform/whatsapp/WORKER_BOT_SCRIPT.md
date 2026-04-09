# Worker Registration Bot Script — WATI Configuration
# Kingken Global Recruitment Platform

**Bot Name:** Worker Application Bot
**Platform:** WATI (WhatsApp API Tool Interface)
**Trigger Keyword:** `APPLY` (exact and contains match)
**Purpose:** Guides job-seeking candidates through a complete application intake via WhatsApp — 7 steps collecting all data needed for the Master Data sheet
**Company:** Kingken Global Travel Agency Ltd.

---

## Overview

This bot is the primary intake channel for worker candidates who contact Kingken Global via WhatsApp. It collects the same fields as the Google Form (see `platform/forms/WORKER_APPLICATION_FORM.md`) in a conversational format, then triggers the Zapier webhook to create a Master Data row.

---

## Trigger Setup in WATI

1. Go to **WATI Dashboard → Automation → Keywords**
2. Add keyword: `APPLY` — Exact match → Start "Worker Registration" bot flow
3. Add keyword: `apply` — Contains match → Start "Worker Registration" bot flow
4. Add keyword: `job` — Contains match → Send quick menu (ask if APPLY or HIRE)
5. Add keyword: `jobs` — Contains match → Send quick menu

---

## Variables Used in This Flow

| Variable | Description | Collected In |
|----------|-------------|-------------|
| `{{full_name}}` | Candidate's full name | Message 2 |
| `{{phone}}` | WhatsApp phone number (auto-captured by WATI) | Auto |
| `{{country}}` | Country of origin | Message 3 |
| `{{position}}` | Job position applying for | Message 4 |
| `{{experience}}` | Years of experience | Message 5 |
| `{{passport_status}}` | Passport availability | Message 6 |
| `{{cv_submitted}}` | Whether CV was sent | Message 7 |
| `{{candidate_id}}` | Auto-assigned by Apps Script post-submission | Post-submit |

---

## Complete Bot Script

---

### Message 1 — Welcome (Auto-send on APPLY trigger)

```
Hello! 👋 Welcome to *Kingken Global Travel Agency Ltd* 🌍

We connect skilled African workers with verified employers in Kuwait, UAE, Qatar, and Saudi Arabia.

I'll help you submit your job application in just *7 quick steps* — takes about 5 minutes.

Type *START* to begin your application.
Type *FAQ* if you have questions first.
Type *HUMAN* to speak with a team member.
```

*Bot waits for: START / FAQ / HUMAN*
- If FAQ → route to FAQ Bot flow
- If HUMAN → trigger Human Handoff flow
- If START → proceed to Message 2

---

### Message 2 — Collect Full Name

```
Great! Let's get started. 📝

*Step 1 of 7 — Your Name*

Please type your *Full Name* (first and last name):

Example: Amara Johnson
```

*Bot waits for: text input*
*Save input as: `{{full_name}}`*
*Validation: minimum 3 characters*
*On invalid: "Please enter your full name (first and last). Try again:"*

---

### Message 3 — Collect Country of Origin

```
Thank you, *{{full_name}}*! ✅

*Step 2 of 7 — Your Country*

What is your country of origin / nationality?

1️⃣ Nigeria
2️⃣ Ghana
3️⃣ Kenya
4️⃣ Ethiopia
5️⃣ Uganda
6️⃣ Tanzania
7️⃣ Cameroon
8️⃣ Senegal
9️⃣ Other

Reply with the number (1–9):
```

*Bot waits for: 1–9*
*Map responses:*
- 1 → Nigeria
- 2 → Ghana
- 3 → Kenya
- 4 → Ethiopia
- 5 → Uganda
- 6 → Tanzania
- 7 → Cameroon
- 8 → Senegal
- 9 → Other

*Save as: `{{country}}`*
*On invalid: "Please reply with a number from 1 to 9:"*

---

### Message 4 — Collect Job Position

```
*Step 3 of 7 — Position*

What *job position* are you applying for?

1️⃣ Domestic Worker / Housemaid
2️⃣ Driver
3️⃣ Security Guard
4️⃣ Cleaner
5️⃣ Nanny / Childcare Worker
6️⃣ Caregiver (elderly care)
7️⃣ Cook / Chef
8️⃣ Waiter / Waitress
9️⃣ Office Assistant / Receptionist
🔟 Construction / Labourer
1️⃣1️⃣ Other

Reply with the number (1–11):
```

*Bot waits for: 1–11*
*Map to position names*
*Save as: `{{position}}`*
*On "Other": "Please type your specific position:"*

---

### Message 5 — Collect Experience

```
*Step 4 of 7 — Experience*

How many *years of experience* do you have in *{{position}}*?

1️⃣ Less than 1 year
2️⃣ 1–2 years
3️⃣ 3–5 years
4️⃣ 5–10 years
5️⃣ More than 10 years

Reply with the number (1–5):
```

*Bot waits for: 1–5*
*Map responses:*
- 1 → Less than 1 year (0)
- 2 → 1–2 years (2)
- 3 → 3–5 years (4)
- 4 → 5–10 years (7)
- 5 → More than 10 years (11)

*Save as: `{{experience}}`*

---

### Message 6 — Collect Passport Status

```
*Step 5 of 7 — Passport*

Do you currently have an *international passport*?

1️⃣ Yes — my passport is valid (6+ months remaining)
2️⃣ Yes — but it expires within 6 months
3️⃣ Yes — but it is expired
4️⃣ No — I don't have one yet
5️⃣ No — I am applying for one

Reply with the number (1–5):
```

*Bot waits for: 1–5*
*Map to passport status text*
*Save as: `{{passport_status}}`*

---

### Message 7 — CV Submission

```
*Step 6 of 7 — CV / Resume*

Do you have a *CV or Resume* you can share with us?

1️⃣ Yes — I will send it now (PDF or Word document)
2️⃣ Yes — I will email it later (info@kingkenglobal.com.ng)
3️⃣ No — I don't have one yet

Reply with 1, 2, or 3:
```

*If user replies 1:*
```
Please send your CV now as a *PDF or Word document* (not a photo). 📎

When you send the file, I will confirm receipt and proceed to the next step.
```
*Bot waits for file attachment → save link → set `{{cv_submitted}}` = true*

*If user replies 2:*
```
No problem! Please email your CV to *info@kingkenglobal.com.ng* with your name in the subject line.

Your application will be reviewed even without the CV. ✅
```
*Set `{{cv_submitted}}` = false → proceed to Message 8*

*If user replies 3:*
```
That's okay! Our team can still review your application.

If you'd like help creating a simple CV, reply *CV HELP* and we'll guide you.

Continuing without CV... ✅
```
*Set `{{cv_submitted}}` = false → proceed to Message 8*

---

### Message 8 — Preferred Destination (Quick)

```
*Step 7 of 7 — Destination*

Which countries are you *open to working in*?

1️⃣ Kuwait only
2️⃣ UAE only
3️⃣ Qatar only
4️⃣ Saudi Arabia only
5️⃣ Open to any Gulf country
6️⃣ Open to any destination

Reply with the number (1–6):
```

*Bot waits for: 1–6*
*Map to destination text*
*Save as: `{{destination}}`*

---

### Message 9 — Submission Confirmation

```
✅ *Application Submitted Successfully!*

Here's a summary of your application:

👤 Name: *{{full_name}}*
🌍 Origin: *{{country}}*
💼 Position: *{{position}}*
⏱ Experience: *{{experience}}*
🛂 Passport: *{{passport_status}}*
📎 CV: *{{cv_submitted}}*
📍 Destination: *{{destination}}*

Your application has been sent to our recruitment team.

*What happens next:*
1. Our AI system will review your application
2. A recruiter will contact you within *2–3 business days*
3. If approved, we will discuss available positions with you

📱 Questions? WhatsApp us: *+96569048174*
📧 info@kingkenglobal.com.ng
🌐 www.kingkenglobal.com.ng

Thank you for choosing Kingken Global! 🙏🌟
```

*Trigger: POST webhook to Zapier with all collected variables → Zapier creates Master Data row → WATI sends `worker_acknowledgment` template when CandidateID is assigned*

---

## Error Handling

| Scenario | Bot Response |
|----------|-------------|
| User sends unrecognized input (1st time) | "I didn't understand that. Please reply with the number shown in the menu." |
| User sends unrecognized input (2nd time) | "Let me rephrase the question. [Repeat question with options]" |
| User sends unrecognized input (3rd time) | Trigger Human Handoff: "I'm having trouble understanding. Connecting you with a team member now..." |
| User types STOP or CANCEL during flow | "Your application has been cancelled. Type APPLY anytime to restart. We're here if you need us! 😊" |
| User types BACK | "I'll take you back to the previous step. [Repeat previous message]" |
| Network timeout (> 24 hours since last message) | Send reminder: "Hi {{full_name}}! 👋 You started an application with us. Type CONTINUE to pick up where you left off, or APPLY to start fresh." |

---

## Post-Submission Webhook Payload

```json
{
  "source": "whatsapp_worker_bot",
  "full_name": "{{full_name}}",
  "phone": "{{phone}}",
  "country": "{{country}}",
  "position": "{{position}}",
  "experience": "{{experience}}",
  "passport_status": "{{passport_status}}",
  "cv_submitted": "{{cv_submitted}}",
  "destination": "{{destination}}",
  "timestamp": "{{submission_time}}",
  "wati_contact_id": "{{contact_id}}"
}
```

*Zapier Zap-01 receives this payload and creates a row in the Master Data sheet with Status = `New`.*

---

## WATI Flow Setup Instructions

1. In WATI Dashboard, go to **Bot → Create New Bot Flow**
2. Name the flow: `Worker Registration Flow`
3. Set trigger: Keyword = `APPLY`
4. Add each message as a sequential "Send Message" node
5. Add "Collect Input" nodes where variables are gathered
6. Add "Condition" nodes for option branching (e.g. CV yes/no)
7. Add final "Webhook" node at the end pointing to your Zapier webhook URL
8. Enable the flow and test with a test WhatsApp number

---

*Maintained by: Head of Tech | Contact: info@kingkenglobal.com.ng | https://www.kingkenglobal.com.ng*
