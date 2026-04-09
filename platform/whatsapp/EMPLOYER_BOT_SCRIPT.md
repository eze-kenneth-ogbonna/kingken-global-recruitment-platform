# Employer Registration Bot Script — WATI Configuration
# Kingken Global Recruitment Platform

**Bot Name:** Employer Hiring Request Bot
**Platform:** WATI (WhatsApp API Tool Interface)
**Trigger Keyword:** `HIRE` (exact and contains match)
**Purpose:** Guides employers through a structured hiring request intake — 7 steps collecting company and job requirement details — then notifies COO immediately
**Company:** Kingken Global Travel Agency Ltd.

---

## Overview

This bot handles inbound employer contacts who reach out via WhatsApp. It collects company details and job requirements, then triggers Zapier Zap-06 to:
- Create a record in the Employers Database sheet
- Create a record in the Job Requests sheet
- Send an immediate WhatsApp alert to the COO

---

## Trigger Setup in WATI

1. Go to **WATI Dashboard → Automation → Keywords**
2. Add keyword: `HIRE` — Exact match → Start "Employer Hiring Request" bot flow
3. Add keyword: `hire` — Contains match → Start "Employer Hiring Request" bot flow
4. Add keyword: `hiring` — Contains match → Start "Employer Hiring Request" bot flow
5. Add keyword: `workers` — Contains match → Send quick intro asking if HIRE or FAQ

---

## Variables Used in This Flow

| Variable | Description | Collected In |
|----------|-------------|-------------|
| `{{company_name}}` | Employer's company name | Message 2 |
| `{{contact_name}}` | Name of the contact person | Message 3 |
| `{{country}}` | Country employer is based in | Message 4 |
| `{{position_required}}` | Job position(s) needed | Message 5 |
| `{{workers_needed}}` | Number of workers required | Message 6 |
| `{{salary_budget}}` | Monthly salary budget per worker | Message 7 |
| `{{timeline}}` | When workers need to start | Message 8 |
| `{{phone}}` | WhatsApp number (auto-captured by WATI) | Auto |
| `{{employer_id}}` | Auto-assigned by Apps Script post-submission | Post-submit |

---

## Complete Bot Script

---

### Message 1 — Welcome (Auto-send on HIRE trigger)

```
Hello! 👋 Welcome to *Kingken Global Travel Agency Ltd* 🌍

We specialize in placing skilled, verified African workers with employers in Kuwait, UAE, Qatar, and Saudi Arabia.

I'll collect your hiring requirements in *7 steps* — our COO will contact you within *24 hours*.

Type *START* to begin.
Type *FAQ* for frequently asked questions.
Type *HUMAN* to speak directly with our team.
```

*Bot waits for: START / FAQ / HUMAN*
- If FAQ → route to FAQ Bot flow
- If HUMAN → trigger Human Handoff flow
- If START → proceed to Message 2

---

### Message 2 — Collect Company Name

```
*Step 1 of 7 — Company Name*

Please enter your *Company Name*:

Example: Al-Mansour Cleaning Services W.L.L.
```

*Bot waits for: text input*
*Save as: `{{company_name}}`*
*Validation: minimum 3 characters*
*On invalid: "Please enter your full company name. Try again:"*

---

### Message 3 — Collect Contact Person Name

```
Thank you! ✅

*Step 2 of 7 — Contact Person*

Please enter the *full name* of the person our team should contact:

Example: Ahmed Al-Mansour
```

*Bot waits for: text input*
*Save as: `{{contact_name}}`*

---

### Message 4 — Collect Company Country

```
*Step 3 of 7 — Location*

Which *country* is your company based in?

1️⃣ Kuwait
2️⃣ UAE — Dubai
3️⃣ UAE — Abu Dhabi
4️⃣ UAE — Sharjah
5️⃣ UAE — Other
6️⃣ Qatar
7️⃣ Saudi Arabia
8️⃣ Other

Reply with the number (1–8):
```

*Bot waits for: 1–8*
*Map to country/location text*
*Save as: `{{country}}`*
*On invalid: "Please reply with a number from 1 to 8:"*

---

### Message 5 — Collect Position Required

```
*Step 4 of 7 — Position*

What *job position(s)* do you need to fill?

1️⃣ Domestic Worker / Housemaid
2️⃣ Driver (personal)
3️⃣ Driver (commercial / heavy vehicle)
4️⃣ Security Guard
5️⃣ Cleaner (residential or commercial)
6️⃣ Nanny / Childcare Worker
7️⃣ Caregiver (elderly care)
8️⃣ Cook / Chef
9️⃣ Office Assistant / Receptionist
🔟 Construction Worker / Labourer
1️⃣1️⃣ Factory Worker
1️⃣2️⃣ Multiple positions / Other

Reply with the number (1–12):
```

*Bot waits for: 1–12*
*Map to position description text*
*Save as: `{{position_required}}`*

*If user selects 12 (Multiple positions):*
```
Please describe the positions you need:

(Example: "5 Domestic Workers + 2 Drivers + 3 Security Guards")
```
*Wait for text input → save as `{{position_required}}`*

---

### Message 6 — Collect Number of Workers

```
*Step 5 of 7 — Headcount*

How many *workers* do you need in total?

1️⃣ 1 worker
2️⃣ 2–5 workers
3️⃣ 6–10 workers
4️⃣ 11–20 workers
5️⃣ 21–50 workers
6️⃣ More than 50 workers

Reply with the number (1–6):
```

*Bot waits for: 1–6*
*Map responses:*
- 1 → 1 worker (1)
- 2 → 2–5 workers (5)
- 3 → 6–10 workers (10)
- 4 → 11–20 workers (20)
- 5 → 21–50 workers (50)
- 6 → More than 50 (prompt for exact number)

*If 6 selected:*
```
Please type the *exact number* of workers you need:
```
*Save as: `{{workers_needed}}`*

---

### Message 7 — Collect Salary Budget

```
*Step 6 of 7 — Salary Budget*

What is your *estimated monthly salary* per worker (in USD)?

1️⃣ $200 – $300
2️⃣ $300 – $400
3️⃣ $400 – $600
4️⃣ $600 – $800
5️⃣ $800+
6️⃣ Not yet decided / open to proposal

Reply with the number (1–6):
```

*Bot waits for: 1–6*
*Map to salary range text*
*Save as: `{{salary_budget}}`*

---

### Message 8 — Collect Timeline

```
*Step 7 of 7 — Start Date*

When do you need the workers to *start*?

1️⃣ As soon as possible (within 4 weeks)
2️⃣ Within 1–2 months
3️⃣ Within 2–3 months
4️⃣ Within 3–6 months
5️⃣ Flexible / no specific deadline

Reply with the number (1–5):
```

*Bot waits for: 1–5*
*Map to timeline text*
*Save as: `{{timeline}}`*

---

### Message 9 — Submission Confirmation

```
✅ *Hiring Request Received!*

Here's a summary of your requirements:

🏢 Company: *{{company_name}}*
👤 Contact: *{{contact_name}}*
🌍 Location: *{{country}}*
💼 Position: *{{position_required}}*
👥 Workers: *{{workers_needed}}*
💰 Salary: *{{salary_budget}} USD/month*
📅 Start: *{{timeline}}*

Our *COO* will contact you on this WhatsApp number within *24 hours* to discuss next steps and provide a service proposal.

📧 info@kingkenglobal.com.ng
🌐 www.kingkenglobal.com.ng
📱 +96569048174

Thank you for choosing Kingken Global! We look forward to serving you. 🤝🌟
```

*Trigger: POST webhook to Zapier with all collected variables → Zapier runs Zap-06:*
1. *Create row in Employers Database (Status = Lead)*
2. *Create row in Job Requests (Status = Open)*
3. *Send COO WhatsApp alert*
4. *Create "Contact employer" task in Tasks sheet*

---

## Error Handling

| Scenario | Bot Response |
|----------|-------------|
| User sends unrecognized input (1st time) | "I didn't understand that. Please reply with the number shown above." |
| User sends unrecognized input (2nd time) | "Let me repeat the question. [Repeat with options]" |
| User sends unrecognized input (3rd time) | Trigger Human Handoff: "Connecting you with a team member now..." |
| User types STOP during flow | "Request cancelled. Type HIRE anytime to start again. Thank you! 😊" |
| User types BACK | "Let me take you back to the previous question. [Repeat previous message]" |
| Timeout > 24 hours | Reminder: "Hi! 👋 You started a hiring request with Kingken Global. Type CONTINUE to resume or HIRE to start fresh." |

---

## Post-Submission Webhook Payload

```json
{
  "source": "whatsapp_employer_bot",
  "company_name": "{{company_name}}",
  "contact_name": "{{contact_name}}",
  "contact_phone": "{{phone}}",
  "country": "{{country}}",
  "position_required": "{{position_required}}",
  "workers_needed": "{{workers_needed}}",
  "salary_budget": "{{salary_budget}}",
  "timeline": "{{timeline}}",
  "timestamp": "{{submission_time}}",
  "wati_contact_id": "{{contact_id}}"
}
```

*Zapier Zap-06 receives this payload and:*
1. *Creates or updates employer in Employers Database with Status = `Lead`*
2. *Creates job request in Job Requests with Status = `Open`*
3. *Sends COO WhatsApp notification via WATI template `employer_welcome`*
4. *Creates high-priority task in Tasks sheet*

---

## COO Alert Message (Sent Immediately After Submission)

*Sent to COO WhatsApp (+96569048174):*

```
🚨 *NEW EMPLOYER LEAD*

Company: {{company_name}}
Contact: {{contact_name}}
Phone: {{phone}}
Country: {{country}}
Position: {{position_required}}
Workers Needed: {{workers_needed}}
Budget: {{salary_budget}}/month
Timeline: {{timeline}}

⚡ ACTION REQUIRED: Contact within 24 hours
```

---

## WATI Flow Setup Instructions

1. In WATI Dashboard, go to **Bot → Create New Bot Flow**
2. Name the flow: `Employer Hiring Request Flow`
3. Set trigger: Keyword = `HIRE`
4. Add each message as a sequential "Send Message" node
5. Add "Collect Input" nodes for each variable
6. Add "Condition" nodes for branching (e.g. workers > 50)
7. Add "Webhook" node at end pointing to Zapier webhook URL
8. Enable the flow and test with a test employer number

---

*Maintained by: Head of Tech | Contact: info@kingkenglobal.com.ng | https://www.kingkenglobal.com.ng*
