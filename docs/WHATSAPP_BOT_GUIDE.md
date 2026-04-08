# Kingken Global Recruitment Platform — WhatsApp Bot Guide

> **Company:** Kingken Global Travel Agency Ltd
> **WhatsApp:** +96569048174
> **Website:** https://www.kingkenglobal.com.ng | **Email:** info@kingkenglobal.com.ng

---

## Overview

The WhatsApp bot automates candidate intake and employer registration through conversational flows on WhatsApp. It runs on **WATI** (WhatsApp API Tool Interface) and handles worker applications, employer registrations, FAQ responses, and human handoffs.

---

## 1. WATI Account Setup

### Step-by-Step Account Creation

1. Go to [wati.io](https://wati.io) and sign up for the **Starter** or **Growth** plan.
2. On the onboarding screen, select **Connect New Number**.
3. Enter your WhatsApp Business number: **+96569048174**.
4. You will need a **Facebook Business Manager** account:
   - Go to [business.facebook.com](https://business.facebook.com)
   - Create or log in to your business account
   - Verify your business identity with legal documents
5. In WATI, follow the Meta verification flow:
   - Connect Facebook Business Manager
   - Add the phone number to your WhatsApp Business Account
   - Verify via SMS or phone call
6. Once verified, the number shows as **Active** in the WATI dashboard.
7. Set your Business Profile:
   - **Display Name:** Kingken Global Travel Agency Ltd
   - **Category:** Business Services
   - **Description:** International recruitment connecting African workers with Gulf employers
   - **Email:** info@kingkenglobal.com.ng
   - **Website:** https://www.kingkenglobal.com.ng

### Number Verification Timeline

| Step | Duration |
|------|----------|
| Meta Business verification | 1–3 business days |
| Phone number approval | 1–2 business days |
| Message template approval | 24–48 hours per template |
| **Total setup time** | **3–5 business days** |

---

## 2. Message Template Submission for Meta Approval

All outbound messages that initiate a conversation must be pre-approved templates.

### Templates to Submit

#### Template 1: `worker_acknowledgment`
- **Category:** Utility
- **Language:** English

```
Hello {{1}}! 👋

Thank you for applying to *Kingken Global Travel Agency Ltd*.

We have received your application for *{{2}}* and our team will review it within 2–3 business days.

Your Application Ref: {{3}}

📧 info@kingkenglobal.com.ng
🌐 www.kingkenglobal.com.ng
```

**Variables:** {{1}} = Full Name, {{2}} = Position, {{3}} = CandidateID

---

#### Template 2: `employer_welcome`
- **Category:** Utility

```
Hello {{1}} from *{{2}}*! 🌍

Thank you for registering with Kingken Global Travel Agency Ltd.

We have received your request for *{{3}} workers* ({{4}}).

Our COO will contact you within 24 hours.

📧 info@kingkenglobal.com.ng
🌐 www.kingkenglobal.com.ng
```

**Variables:** {{1}} = Contact Name, {{2}} = Company, {{3}} = Workers Needed, {{4}} = Position

---

#### Template 3: `status_update`
- **Category:** Utility

```
Hello {{1}}! 📋

Update on your Kingken Global application:

Status: *{{2}}*
Next Step: {{3}}

Questions? Reply to this message.
— Kingken Global Team
```

**Variables:** {{1}} = Name, {{2}} = New Status, {{3}} = Next action description

---

#### Template 4: `interview_invitation`
- **Category:** Utility

```
Hello {{1}}! 🎉

Congratulations! You have been shortlisted for a *{{2}}* role in *{{3}}*.

Interview Date: {{4}}
Interview Format: {{5}}

Please confirm your attendance by replying *CONFIRM* or *DECLINE*.

— Kingken Global Recruitment Team
```

**Variables:** {{1}} = Name, {{2}} = Position, {{3}} = Country, {{4}} = Date/Time, {{5}} = Format (call/video/in-person)

---

## 3. Keyword Triggers Setup

In WATI dashboard, go to **Automation → Keywords** and add:

| Keyword | Trigger Type | Action |
|---------|-------------|--------|
| `APPLY` | Exact match | Start Worker Registration flow |
| `apply` | Contains | Start Worker Registration flow |
| `HIRE` | Exact match | Start Employer Registration flow |
| `hire` | Contains | Start Employer Registration flow |
| `FAQ` | Exact match | Send FAQ menu message |
| `faq` | Contains | Send FAQ menu message |
| `HUMAN` | Exact match | Trigger human handoff |
| `AGENT` | Exact match | Trigger human handoff |
| `HELP` | Exact match | Send welcome menu |

---

## 4. Worker Bot Full Script

This is the complete conversational flow triggered by `APPLY`.

---

**Message 1 — Greeting (Auto-send on APPLY keyword)**
```
Hello! 👋 Welcome to *Kingken Global Travel Agency Ltd* 🌍

We connect talented African workers with employers in Kuwait, UAE, and Qatar.

I'll help you submit your job application in just a few steps.

Please type *START* to begin, or *FAQ* if you have questions first.
```

---

**Message 2 — Collect Full Name (after START)**
```
Great! Let's get started. 📝

*Step 1 of 7*

Please type your *Full Name* (first and last name):
```

*Wait for user input → Save as: full_name*

---

**Message 3 — Collect Phone Number**
```
Thank you, {{full_name}}! ✅

*Step 2 of 7*

Please provide your *WhatsApp phone number* including your country code.
Example: +2348012345678
```

*Wait for user input → Save as: phone*

---

**Message 4 — Collect Country/Nationality**
```
*Step 3 of 7*

What is your *country of origin / nationality*?

Please select:
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

*Wait for user input → Map number to country name → Save as: country*

---

**Message 5 — Collect Position**
```
*Step 4 of 7*

What *position* are you applying for?

1️⃣ Domestic Worker
2️⃣ Driver
3️⃣ Security Guard
4️⃣ Cleaner
5️⃣ Nanny
6️⃣ Caregiver
7️⃣ Cook
8️⃣ Office Assistant
9️⃣ Labourer
🔟 Other

Reply with the number (1–10):
```

*Wait for user input → Save as: position*

---

**Message 6 — Collect Experience**
```
*Step 5 of 7*

How many *years of experience* do you have in {{position}}?

1️⃣ Less than 1 year
2️⃣ 1–2 years
3️⃣ 3–5 years
4️⃣ 5+ years

Reply with the number (1–4):
```

*Wait for user input → Save as: experience*

---

**Message 7 — Collect Passport Status**
```
*Step 6 of 7*

Do you currently have a *valid passport*?

1️⃣ Yes — my passport is valid
2️⃣ Yes — but it is expired
3️⃣ No — I don't have one yet

Reply with the number (1–3):
```

*Wait for user input → Save as: passport_status*

---

**Message 8 — CV Confirmation**
```
*Step 7 of 7*

Do you have a *CV / Resume* you can send us?

1️⃣ Yes — I will send it now
2️⃣ No — I don't have one

Reply 1 or 2:
```

*If user replies 1:*
```
Please send your CV now as a *PDF or Word document* (not a photo).

When you send the file, I will confirm receipt. 📎
```

*If user replies 2:*
```
No problem! Our team can still review your application. 
We recommend creating a simple CV — we can help guide you if needed.
```

---

**Message 9 — Submission Confirmation**
```
✅ *Application Submitted Successfully!*

Here's a summary of your application:

👤 Name: {{full_name}}
📱 Phone: {{phone}}
🌍 Country: {{country}}
💼 Position: {{position}}
⏱ Experience: {{experience}}
🛂 Passport: {{passport_status}}

Our team will review your application and contact you within *2–3 business days*.

Your reference: *PENDING* (will be sent after review)

For updates, WhatsApp us: *+96569048174*
📧 info@kingkenglobal.com.ng

Thank you for choosing Kingken Global! 🙏
```

*Trigger: Zapier webhook → Create row in Master Data*

---

## 5. Employer Bot Full Script

Triggered by `HIRE` keyword.

---

**Message 1 — Greeting**
```
Hello! 👋 Welcome to *Kingken Global Travel Agency Ltd* 🌍

We specialize in placing skilled African workers in Kuwait, UAE, and Qatar.

I'll collect your hiring requirements and our COO will contact you within *24 hours*.

Type *START* to begin:
```

---

**Message 2 — Company Name**
```
*Step 1 of 7*

Please enter your *Company Name*:
```

*Save as: company_name*

---

**Message 3 — Contact Person**
```
*Step 2 of 7*

Please enter the *Contact Person's Full Name* (person we should speak with):
```

*Save as: contact_person*

---

**Message 4 — Country**
```
*Step 3 of 7*

Which *country* is your company located in?

1️⃣ Kuwait
2️⃣ UAE — Dubai
3️⃣ UAE — Abu Dhabi
4️⃣ UAE — Sharjah
5️⃣ Qatar
6️⃣ Saudi Arabia
7️⃣ Other

Reply with the number (1–7):
```

*Save as: country*

---

**Message 5 — Position Required**
```
*Step 4 of 7*

What *job position(s)* do you need to fill?
(Example: Domestic Worker, Driver, Security Guard, Nanny, Cleaner)

Please type your answer:
```

*Save as: position_required*

---

**Message 6 — Number of Workers**
```
*Step 5 of 7*

How many *workers* do you need?

1️⃣ 1–5 workers
2️⃣ 6–10 workers
3️⃣ 11–20 workers
4️⃣ 21–50 workers
5️⃣ 50+ workers

Reply with the number (1–5):
```

*Save as: workers_needed*

---

**Message 7 — Budget**
```
*Step 6 of 7*

What is your *estimated monthly salary* budget per worker (in USD)?
(Example: 300, 400, 500)

Type the amount or reply *SKIP* if not yet decided:
```

*Save as: salary_budget*

---

**Message 8 — Timeline**
```
*Step 7 of 7*

When do you need the workers to *start*?

1️⃣ As soon as possible (within 1 month)
2️⃣ Within 2–3 months
3️⃣ Within 3–6 months
4️⃣ Flexible / No rush

Reply with the number (1–4):
```

*Save as: timeline*

---

**Message 9 — Submission Confirmation**
```
✅ *Your hiring request has been received!*

Summary:
🏢 Company: {{company_name}}
👤 Contact: {{contact_person}}
🌍 Country: {{country}}
💼 Position: {{position_required}}
👥 Workers: {{workers_needed}}
💰 Budget: {{salary_budget}} USD/month
📅 Timeline: {{timeline}}

Our *COO* will contact you on this WhatsApp number within *24 hours*.

📧 info@kingkenglobal.com.ng
🌐 www.kingkenglobal.com.ng
📱 +96569048174

Thank you for choosing Kingken Global! 🌟
```

*Trigger: Zapier webhook → Create row in Employers sheet + Email COO*

---

## 6. FAQ Auto-Responses

Triggered by `FAQ` keyword. Send this menu first:

```
📋 *Kingken Global — FAQ Menu*

Reply with the number for your question:

1️⃣ How long does the process take?
2️⃣ What documents are needed?
3️⃣ What are the fees?
4️⃣ How do I track my application?
5️⃣ What countries do you recruit for?
6️⃣ What jobs are available?
7️⃣ How are workers vetted?
8️⃣ What payment methods do you accept?
9️⃣ Contact details
🔟 How do I cancel?

Or type *APPLY* to apply now | *HIRE* to hire workers
```

### FAQ Responses

**1 — How long does the process take?**
```
⏱ *Processing Timeline*

The recruitment process typically takes:
• Screening & approval: 3–7 days
• Document collection: 1–3 weeks
• Visa processing: 4–8 weeks
• Travel arrangements: 1–2 weeks

*Total: 6–12 weeks* from application to deployment.

Timelines vary by country and visa type.
```

**2 — What documents are needed?**
```
📂 *Required Documents (Workers)*

✅ Valid international passport (min 6 months validity)
✅ Passport photographs (6 copies, white background)
✅ Medical fitness certificate
✅ Police clearance certificate
✅ CV/Resume
✅ Educational certificates (if applicable)
✅ Previous employment letters (if available)

Our team will guide you through each document step by step.
```

**3 — What are the fees?**
```
💰 *Fee Information*

*For Workers:*
Kingken Global does NOT charge workers recruitment fees. Our service is free for candidates.

*For Employers:*
Service fees are based on the number of workers, position, and country. Our COO will provide a detailed quote after your requirements are confirmed.

Contact us for a custom quote:
📧 info@kingkenglobal.com.ng
```

**4 — How do I track my application?**
```
📍 *Track Your Application*

To check your application status:
1. WhatsApp us your *Full Name* and *Phone Number* at +96569048174
2. Our team will respond with your current status within 1 business day.

Or email: info@kingkenglobal.com.ng with subject "Application Status — [Your Name]"
```

**5 — What countries do you recruit for?**
```
🌍 *Countries We Work With*

*We place workers in:*
��🇼 Kuwait
🇦🇪 UAE (Dubai, Abu Dhabi, Sharjah)
🇶🇦 Qatar
🇸🇦 Saudi Arabia (selected roles)

*We recruit workers from:*
🇳🇬 Nigeria | 🇬🇭 Ghana | 🇰🇪 Kenya
🇪🇹 Ethiopia | 🇺🇬 Uganda | 🇹🇿 Tanzania
🇨🇲 Cameroon | 🇸🇳 Senegal
```

**6 — What jobs are available?**
```
💼 *Available Job Categories*

We currently place workers in these roles:
🏠 Domestic Workers (housemaids, housekeepers)
🚗 Drivers (personal, commercial)
🛡 Security Guards
🧹 Cleaners (residential & commercial)
👶 Nannies & Childcare Workers
🤲 Caregivers (elderly care)
👨‍🍳 Cooks
🏢 Office Assistants
🏗 Labourers (construction support)

New positions are added regularly.
Type *APPLY* to submit your application.
```

**7 — How are workers vetted?**
```
✅ *Our Worker Vetting Process*

Every candidate is screened through our multi-step process:

1. Application review by our AI scoring system
2. Manual review by a senior recruiter
3. Document verification (passport, certificates)
4. Background / reference check
5. Medical fitness assessment
6. Skills interview (video or in-person)
7. Orientation briefing before deployment

We only send verified, qualified, and prepared workers to our employer clients.
```

**8 — Payment methods?**
```
💳 *Payment Methods (Employers)*

We accept:
🏦 Bank Transfer (USD preferred)
💵 Western Union / MoneyGram
📱 Mobile Money (for African partners)
💳 Debit/Credit Card (via secure payment link)

Payment terms: 50% upfront deposit, 50% upon worker arrival.

Contact COO for invoice: info@kingkenglobal.com.ng
```

**9 — Contact details**
```
📞 *Contact Kingken Global*

🌐 Website: www.kingkenglobal.com.ng
📧 Email: info@kingkenglobal.com.ng
📱 WhatsApp: +96569048174

🕐 Business Hours:
Monday–Friday: 8:00 AM – 6:00 PM (WAT/Gulf time)
Saturday: 9:00 AM – 2:00 PM
Sunday: Closed (urgent messages replied next day)

Offices: Kuwait | Nigeria | Ghana | Kenya
```

**10 — How to cancel?**
```
❌ *Cancellation Policy*

*Workers:* You may withdraw your application at any time by replying CANCEL or contacting us. No fees apply.

*Employers:* Cancellations must be submitted in writing to info@kingkenglobal.com.ng. Please refer to your service agreement for terms regarding deposits.

To cancel, contact us:
📧 info@kingkenglobal.com.ng
📱 WhatsApp: +96569048174
```

---

## 7. Human Handoff Conditions

The bot automatically escalates to a human agent when:

| Trigger | Condition | Action |
|---------|-----------|--------|
| Keyword `HUMAN` | User types word "human" | Send handoff message + alert team |
| Keyword `AGENT` | User types word "agent" | Send handoff message + alert team |
| Keyword `COMPLAINT` | User types "complaint" or "problem" | Priority escalation to COO |
| Angry sentiment | User types "angry", "furious", "scam" | Escalate to Head of Operations |
| Unrecognized input (3x) | Bot cannot process response 3 times in a row | Auto-escalate to human |

### Handoff Message

```
I'm connecting you with a *Kingken Global team member* right now. 👤

Please hold — someone will respond within *15 minutes* during business hours
(Mon–Fri 8AM–6PM, Sat 9AM–2PM WAT).

For urgent matters: 📧 info@kingkenglobal.com.ng

— Kingken Global Bot
```

**Internal Notification (sent to team WhatsApp group):**
```
🚨 HUMAN HANDOFF REQUIRED
Customer: {{phone_number}}
Reason: {{trigger_type}}
Last message: "{{last_message}}"
Time: {{timestamp}}
Action: Please respond immediately
```

---

## 8. Zapier Integration

### Bot Submission → Master Data

When the Worker Bot completes (Message 9 sent), WATI triggers a Zapier webhook:

**Webhook payload:**
```json
{
  "source": "whatsapp_bot",
  "full_name": "Amara Osei",
  "phone": "+2348012345678",
  "country": "Nigeria",
  "position": "Domestic Worker",
  "experience": "3-5 years",
  "passport": "Yes - Valid",
  "cv_submitted": false,
  "timestamp": "2024-01-15T09:32:00Z"
}
```

**Zapier action:** Create row in Master Data with Status = `New` and Source = `WhatsApp Bot`.

### Bot Submission → Employers Sheet

When the Employer Bot completes, similar webhook triggers Zap 06 to add employer to the Employers tab.

---

## 9. Bot Maintenance and Testing

### Monthly Test Checklist

- [ ] Send `APPLY` from test number — confirm full flow completes
- [ ] Send `HIRE` from test number — confirm employer flow completes
- [ ] Send `FAQ` — confirm all 10 responses work
- [ ] Send `HUMAN` — confirm handoff notification reaches team
- [ ] Verify all Zapier webhooks still active
- [ ] Check WATI template status (confirm still approved)
- [ ] Test with non-Latin characters (French, Swahili inputs)

### Common Issues and Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| Bot not responding to APPLY | Keyword automation paused | Check WATI → Automation → Keywords |
| Template message fails | Template de-approved by Meta | Re-submit template for approval |
| Webhook not triggering Zapier | WATI webhook URL expired | Update URL in WATI webhook settings |
| Bot loop (repeating question) | Flow variable not saved | Check WATI bot flow logic |

---

*Maintained by: Head of Tech | Contact: info@kingkenglobal.com.ng | https://www.kingkenglobal.com.ng*
