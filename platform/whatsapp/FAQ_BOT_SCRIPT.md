# FAQ Bot Script — WATI Configuration
# Kingken Global Recruitment Platform

**Bot Name:** FAQ & Help Bot
**Platform:** WATI (WhatsApp API Tool Interface)
**Trigger Keyword:** `FAQ`, `HELP`, `INFO`
**Purpose:** Provides instant answers to the 10 most common questions from workers and employers — reduces human workload and improves response time
**Company:** Kingken Global Travel Agency Ltd.

---

## Overview

The FAQ bot handles common questions from both workers and employers without human intervention. It is triggered by the keywords `FAQ`, `HELP`, or `INFO` and presents a numbered menu. Users select a question number and receive an instant answer. At the end of any answer, users can return to the menu or escalate to a human agent.

---

## Trigger Setup in WATI

1. Go to **WATI Dashboard → Automation → Keywords**
2. Add keyword: `FAQ` — Exact match → Start "FAQ Bot" flow
3. Add keyword: `faq` — Contains match → Start "FAQ Bot" flow
4. Add keyword: `HELP` — Exact match → Start "FAQ Bot" flow
5. Add keyword: `help` — Contains match → Start "FAQ Bot" flow
6. Add keyword: `INFO` — Exact match → Start "FAQ Bot" flow

---

## FAQ Main Menu

*Send when FAQ/HELP/INFO keyword is triggered:*

```
📋 *Kingken Global — Help Centre*

Hello! 👋 How can we help you today?

Reply with the number for your question:

*For Job Seekers (Workers):*
1️⃣ How long does the recruitment process take?
2️⃣ What documents do I need?
3️⃣ How much does it cost to apply?
4️⃣ How do I track my application?
5️⃣ What jobs are available?

*For Employers:*
6️⃣ How does the service work?
7️⃣ What are your service fees?
8️⃣ How are workers screened / vetted?
9️⃣ What countries do you recruit from?

*General:*
🔟 Contact details and business hours

Or type:
• *APPLY* — Submit a job application (workers)
• *HIRE* — Request workers (employers)
• *HUMAN* — Speak with our team
```

*Bot waits for: 1–10 or keyword*

---

## FAQ Responses

### Response 1 — Recruitment Process Timeline

*Trigger: User replies "1"*

```
⏱ *How Long Does the Process Take?*

The full recruitment process typically takes:

📋 *Step 1 — Application & Screening:* 3–7 days
✅ *Step 2 — Approval & Matching:* 3–7 days
📂 *Step 3 — Document Collection:* 1–3 weeks
🏥 *Step 4 — Medical Examination:* 1–2 weeks
🛂 *Step 5 — Visa Processing:* 4–8 weeks
✈️ *Step 6 — Travel Arrangements:* 1–2 weeks

⏳ *Total estimated time: 6–12 weeks*

Times vary depending on the country, visa type, and how quickly documents are submitted.

_Reply *MENU* to return to the help menu_
_Reply *HUMAN* to speak with our team_
```

---

### Response 2 — Required Documents

*Trigger: User replies "2"*

```
📂 *Documents Required for Workers*

✅ Valid international passport (minimum 6 months remaining)
✅ Passport photographs (6 copies, white background, recent)
✅ Medical fitness certificate (from approved clinic)
✅ Police clearance / criminal record certificate
✅ CV / Resume (we can help you create one if needed)
✅ Educational certificates (if applicable)
✅ Previous employment letters (if available)
✅ Bank account details (for salary payments)

📌 *Additional documents may be required* depending on the destination country and employer. Our team will guide you through each step.

🏥 *We can help you* find a certified clinic for your medical and advise on how to obtain police clearance.

_Reply *MENU* to return to the help menu_
_Reply *APPLY* to start your application_
```

---

### Response 3 — Application Cost (Workers)

*Trigger: User replies "3"*

```
💰 *What Does It Cost to Apply?*

✅ *Kingken Global does NOT charge workers any recruitment fees.*

Our service is *completely free* for job seekers.

We are paid by the employers — not by you.

⚠️ *Important warning:* Be cautious of any agent who asks you to pay for a job placement. This is against our company policy and may be a sign of fraud.

If you have been asked to pay a fee by someone claiming to represent Kingken Global, please contact us immediately:

📧 info@kingkenglobal.com.ng
📱 +96569048174

_Reply *MENU* to return to the help menu_
_Reply *APPLY* to start your free application_
```

---

### Response 4 — Track Application

*Trigger: User replies "4"*

```
📍 *How to Track Your Application*

To check your application status, send us a message with:

1. Your *Full Name*
2. Your *Phone Number* used to apply

Send it in this format:
"STATUS [Your Name] [Phone Number]"

Example: STATUS Amara Johnson +2348012345678

Our team will respond with your current status within *1 business day*.

Alternatively:
📧 Email: info@kingkenglobal.com.ng
   Subject: "Application Status — [Your Name]"

_Reply *MENU* to return to the help menu_
_Reply *HUMAN* to speak with a team member now_
```

---

### Response 5 — Available Jobs

*Trigger: User replies "5"*

```
💼 *Available Job Categories*

We currently place workers in these roles:

🏠 *Domestic Worker / Housemaid*
🚗 *Driver* (personal & commercial)
🛡️ *Security Guard*
🧹 *Cleaner* (residential & commercial)
👶 *Nanny / Childcare Worker*
🤲 *Caregiver* (elderly & disabled)
👨‍🍳 *Cook / Chef*
🍽️ *Waiter / Waitress*
🏢 *Office Assistant / Receptionist*
🏗️ *Construction Worker / Labourer*
🏭 *Factory Worker*

📍 *Destinations:* Kuwait 🇰🇼 | UAE 🇦🇪 | Qatar 🇶🇦 | Saudi Arabia 🇸🇦

New positions are added regularly. Even if your role isn't listed, apply and we'll match you to the best available opportunity.

_Reply *APPLY* to submit your application_
_Reply *MENU* to return to the help menu_
```

---

### Response 6 — How the Service Works (Employers)

*Trigger: User replies "6"*

```
🤝 *How Our Service Works (For Employers)*

Here's our simple 5-step process:

*Step 1:* Submit your hiring requirements via our form or WhatsApp bot (type *HIRE*)

*Step 2:* Our COO contacts you within 24 hours to confirm requirements and discuss terms

*Step 3:* We source, screen, and shortlist candidates from our African talent database

*Step 4:* You review the shortlist and select your preferred candidates

*Step 5:* We handle all documentation, medical, visa, and travel arrangements

*Payment terms:*
• 50% service fee deposit when candidates are selected
• 50% balance upon worker arrival

*Timeline:* Typically 6–12 weeks from request to deployment.

_Reply *HIRE* to submit a hiring request_
_Reply *7* to see our fee structure_
_Reply *MENU* to return to the help menu_
```

---

### Response 7 — Service Fees (Employers)

*Trigger: User replies "7"*

```
💰 *Service Fees (For Employers)*

Our fees are based on:
• Number of workers placed
• Position type
• Destination country
• Contract duration

*Typical fee range:* $300 – $1,500 per worker (one-time placement fee)

Fees are quoted individually after we understand your specific requirements.

*What's included in the fee:*
✅ Full candidate sourcing and screening
✅ AI scoring and manual interview
✅ Document verification
✅ Medical coordination
✅ Visa application support
✅ Travel arrangement coordination
✅ Post-placement support (30 days)

*What you pay separately:*
• Worker's monthly salary (to worker directly)
• Any government visa fees
• Worker's flights (arrangement supported by us)

For a custom quote, contact our COO:
📧 info@kingkenglobal.com.ng
📱 +96569048174

_Reply *HIRE* to submit a hiring request_
_Reply *MENU* to return to the help menu_
```

---

### Response 8 — Worker Vetting Process

*Trigger: User replies "8"*

```
✅ *Our Worker Vetting & Screening Process*

Every Kingken Global candidate goes through:

*1. AI Scoring* — Automated analysis of experience, skills, and document readiness (0–100 score)

*2. Recruiter Review* — Manual review by a senior recruiter; borderline cases reviewed by Head of Recruitment

*3. Phone / Video Interview* — Direct interview to verify skills and communication

*4. Document Verification* — Passport, certificates, and references checked

*5. Background Check* — Police clearance certificate reviewed

*6. Medical Fitness Assessment* — From an approved medical clinic

*7. Skills Assessment* — Practical skills interview where applicable

*8. Pre-Departure Orientation* — Briefing on employer expectations, destination country laws, and worker rights

We only forward verified, qualified, and prepared workers to employers.

_Reply *HIRE* to request workers_
_Reply *MENU* to return to the help menu_
```

---

### Response 9 — Source Countries

*Trigger: User replies "9"*

```
🌍 *Countries We Recruit Workers From*

🇳🇬 *Nigeria* — Primary source (Lagos, Abuja, Port Harcourt, Kano)
🇬🇭 *Ghana* — Accra, Kumasi
🇰🇪 *Kenya* — Nairobi, Mombasa
🇪🇹 *Ethiopia* — Addis Ababa
🇺🇬 *Uganda* — Kampala
🇹🇿 *Tanzania* — Dar es Salaam
🇨🇲 *Cameroon* — Yaoundé, Douala
🇸🇳 *Senegal* — Dakar

*Destination countries:*
🇰🇼 Kuwait | 🇦🇪 UAE | 🇶🇦 Qatar | 🇸🇦 Saudi Arabia

We have local Country Managers in Nigeria, Ghana, and Kenya who conduct in-person screening and document support.

_Reply *HIRE* to request workers_
_Reply *MENU* to return to the help menu_
```

---

### Response 10 — Contact Details & Hours

*Trigger: User replies "10"*

```
📞 *Contact Kingken Global*

🌐 Website: www.kingkenglobal.com.ng
📧 Email: info@kingkenglobal.com.ng
📱 WhatsApp: +96569048174

🕐 *Business Hours:*
Monday – Friday: 8:00 AM – 6:00 PM
Saturday: 9:00 AM – 2:00 PM
Sunday: Closed (urgent messages replied next day)

*Time zones:* We operate on WAT (West Africa Time) and Gulf Standard Time. Messages received outside business hours are replied to on the next business day.

*Office locations:*
🇰🇼 Kuwait (HQ)
🇳🇬 Nigeria (Lagos)
🇬🇭 Ghana (Accra)
🇰🇪 Kenya (Nairobi)

_Reply *APPLY* to apply for a job_
_Reply *HIRE* to request workers_
_Reply *HUMAN* to speak with our team now_
```

---

## Post-Answer Navigation

After each FAQ response, the bot checks for the user's next input:

| User Input | Action |
|------------|--------|
| `MENU` | Return to FAQ main menu |
| `APPLY` | Route to Worker Registration Bot flow |
| `HIRE` | Route to Employer Registration Bot flow |
| `HUMAN` | Trigger Human Handoff flow |
| 1–10 | Answer the selected FAQ |
| Other | "I didn't understand that. Reply with a number (1–10), MENU, APPLY, HIRE, or HUMAN." |

---

## WATI Flow Setup Instructions

1. In WATI Dashboard, go to **Bot → Create New Bot Flow**
2. Name the flow: `FAQ & Help Bot`
3. Set trigger: Keywords `FAQ`, `HELP`, `INFO`
4. Create the main menu "Send Message" node
5. Add a "Collect Input" node waiting for 1–10 or keyword
6. Add 10 "Condition" branches (one per FAQ number)
7. In each branch, add a "Send Message" node with the FAQ response
8. After each response, add a "Collect Input" node for navigation (MENU / APPLY / HIRE / HUMAN)
9. Add routing to appropriate flows based on navigation input
10. Test all 10 FAQ paths with a test number before going live

---

*Maintained by: Head of Tech | Contact: info@kingkenglobal.com.ng | https://www.kingkenglobal.com.ng*
