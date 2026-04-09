# WhatsApp Bot – Employer Conversation Script

**Bot Name:** Kingken Bot  
**Flow:** Employer Inquiry & Job Request  
**Platform:** WATI (WhatsApp Business API)  
**Company:** Kingken Global Travel Agency Ltd | +96569048174

---

## Flow Overview

```
Incoming Message
     ↓
Initial Greeting + Intent Detection
     ↓
[If Employer intent detected]
     ↓
Company Info Collection
     ↓
Job Requirements Collection
     ↓
Contact Details Confirmation
     ↓
Summary + Confirmation
     ↓
CRM Save (Google Sheets via Zapier)
     ↓
Team Notification (WhatsApp to COO)
     ↓
Thank You + Next Steps
```

---

## 1. Initial Greeting + Intent Detection

**Trigger:** Any incoming message on the Kingken Global WhatsApp number

> 👋 *Welcome to Kingken Global Travel Agency Ltd!*
> 
> We help Gulf-region companies find skilled and experienced workers from Africa and Asia. 🌍
> 
> Please reply with a number to continue:
> 
> *1* – I am an Employer / Company looking for workers
> *2* – I am a Worker looking for a job
> *3* – I have a general inquiry
> *4* – Speak to a team member

---

**If reply = "1" → Route to Employer Flow (this script)**  
**If reply = "2" → Route to Worker Flow (BOT_SCRIPT_WORKER.md)**  
**If reply = "3" → Route to FAQ flow (BOT_FAQ_RESPONSES.md)**  
**If reply = "4" → Escalate to human (COO)**

**Keyword triggers that auto-route to Employer Flow:**
- "employer", "hire", "hiring", "workers needed", "recruit", "vacancy", "vacancy", "company", "looking for workers", "need staff", "require workers"

---

## 2. Company Name Collection

> 🏢 *Great! Let's get your worker request started.*
> 
> First, what is the *full name of your company or organisation?*

**Expected input:** Text (company name)  
**Save as:** `{{company_name}}`

---

**Error Recovery – Company Name:**

*If user sends a number, image, or very short reply (< 3 characters):*

> I didn't quite catch that. Please type your *company's full name*, for example:
> 
> *"Al-Rashid Construction LLC"* or *"Gulf Facilities Management"*

---

## 3. Country of Operation

> 🌍 *Which country is your company based in?*
> 
> *1* – Kuwait  
> *2* – UAE (United Arab Emirates)  
> *3* – Qatar  
> *4* – Saudi Arabia  
> *5* – Bahrain  
> *6* – Oman  
> *7* – Other (please specify)

**Expected input:** Number 1–7 or text  
**Save as:** `{{company_country}}`

---

## 4. Industry / Sector

> 🏗️ *What industry does {{company_name}} operate in?*
> 
> *1* – Construction
> *2* – Cleaning & Facilities
> *3* – Hospitality & Hotels
> *4* – Logistics & Transport
> *5* – Healthcare
> *6* – Manufacturing
> *7* – Security
> *8* – Oil & Gas
> *9* – Other

**Save as:** `{{industry}}`

---

## 5. Job Position Required

> 💼 *What job position(s) do you need workers for?*
> 
> Please type the job title, for example:
> *"Cleaning Supervisor"*, *"Construction Labour"*, *"Kitchen Staff"*, *"Driver"*

**Save as:** `{{job_title}}`

---

## 6. Number of Workers Required

> 👷 *How many workers do you need for the {{job_title}} position?*
> 
> Please reply with a number only, for example: *10* or *25*

**Expected input:** Integer  
**Save as:** `{{workers_count}}`

**Error Recovery – Workers Count:**

*If user sends text or non-number:*

> I didn't catch that. Please reply with the *number of workers needed*, for example:
> *10* or *50*

---

## 7. Salary / Package

> 💵 *What is the monthly salary you are offering (in USD)?*
> 
> Please enter the amount, for example: *300* or *500*

**Save as:** `{{salary_usd}}`

---

## 8. Required Start Date

> 📅 *When do you need workers to start?*
> 
> Please tell us your preferred start date or timeframe, for example:
> *"15 March 2026"* or *"Within 2 months"*

**Save as:** `{{start_date}}`

---

## 9. Contact Person Details

> 👤 *Who is the right person for our team to contact?*
> 
> Please reply with:
> *Name – Job Title – Email*
> 
> For example:
> *Mohammed Al-Rashid – HR Manager – hr@company.com*

**Save as:** `{{contact_name}}`, `{{contact_title}}`, `{{contact_email}}`

---

## 10. Confirmation Step

> ✅ *Thank you! Here is a summary of your request:*
> 
> 🏢 *Company:* {{company_name}}
> 🌍 *Country:* {{company_country}}
> 🏗️ *Industry:* {{industry}}
> 💼 *Position:* {{job_title}}
> 👷 *Workers Needed:* {{workers_count}}
> 💵 *Salary:* ${{salary_usd}}/month
> 📅 *Start Date:* {{start_date}}
> 👤 *Contact:* {{contact_name}} ({{contact_title}})
> 
> Is this correct?
> 
> *1* – Yes, submit my request
> *2* – No, I need to make a change

---

**If reply = "2" (change needed):**

> No problem! What would you like to change?
> 
> *1* – Company name
> *2* – Country
> *3* – Job position
> *4* – Number of workers
> *5* – Salary
> *6* – Start date
> *7* – Contact details

→ Route back to the relevant step based on selection.

---

## 11. CRM Save Trigger

*[Internal – No message sent to user]*

**Action:** Zapier Zap triggered:
- Write row to Google Sheets → Employers sheet (EmployerID, Company, Country, Industry, Contact, Phone, Email, WhatsApp, Status=Lead)
- Write row to Google Sheets → Job Requests sheet (JobID, EmployerID, Job Title, Workers Required, Salary, Country, Start Date, Status=Open)

---

## 12. Team Notification Trigger

*[Internal – Message sent to COO WhatsApp]*

**Notification message to COO (+96569048174):**

> 🔔 *NEW EMPLOYER REQUEST RECEIVED*
> 
> 🏢 Company: {{company_name}}
> 🌍 Country: {{company_country}}
> 💼 Position: {{job_title}}
> 👷 Workers: {{workers_count}}
> 💵 Salary: ${{salary_usd}}/month
> 📅 Start: {{start_date}}
> 👤 Contact: {{contact_name}} – {{contact_email}}
> 
> Please review and assign a recruiter. 👇
> 📋 Open Job Requests Sheet: [link]

---

## 13. Thank You + Next Steps

> 🎉 *Your request has been submitted successfully!*
> 
> *Reference Number:* EMP-{{date}}-{{ID}}
> 
> *What happens next:*
> 
> 1️⃣ Our team will review your request within *24 hours*
> 2️⃣ You will receive a formal proposal with our *fee structure*
> 3️⃣ Once agreed, we'll begin *matching candidates immediately*
> 4️⃣ You'll receive a shortlist within *7–14 business days*
> 
> For urgent inquiries, call or WhatsApp us directly:
> 📞 *+96569048174*
> 📧 info@kingkenglobal.com.ng
> 🌐 www.kingkenglobal.com.ng
> 
> *Thank you for choosing Kingken Global!* 🌍

---

## Error Recovery Scripts

### Generic / Unrecognised Input:

> Hmm, I didn't understand that. 😅
> 
> Please reply with a *number from the menu* or type your answer clearly.
> 
> Need help? Type *HELP* to connect with a team member.

### Timeout (User inactive for 30 minutes):

> 👋 Are you still there?
> 
> Your session is about to expire. Reply with *RESUME* to continue where you left off, or *RESTART* to start over.

### Session Restart:

> No problem! Let's start fresh.
> 
> Reply *1* to begin a new request.

---

## Escalation to COO

**When to escalate to human (COO):**
- User types "HELP", "HUMAN", "SPEAK TO SOMEONE", "CALL ME"
- User sends more than 3 unrecognised messages in a row
- User mentions a complaint ("problem", "issue", "unhappy", "complaint")
- User is a repeat employer requesting priority treatment

**Escalation message to user:**

> I'm connecting you with a member of our team now. 👤
> 
> *Please hold* – someone will be with you shortly.
> 
> If urgent, call us directly: 📞 *+96569048174*

**Notification to COO:**

> ⚡ *ESCALATION ALERT*
> 
> An employer has requested to speak with a team member.
> 
> WhatsApp: {{user_phone}}
> Company: {{company_name}} (if collected)
> 
> Please take over this conversation within 5 minutes.

---

## Cold Employer Re-Engagement Scripts

### Day 3 Follow-Up (No Response After Initial Contact)

**Trigger:** 3 days after employer submitted request with no further interaction

> 👋 Hello {{contact_name}}!
> 
> This is Kingken Global following up on your worker request for {{company_name}}.
> 
> We noticed you haven't heard back from us yet. Our team is ready to help you find the right workers fast!
> 
> Would you like to:
> 
> *1* – Continue with your original request
> *2* – Update your requirements
> *3* – Speak to our team directly
> 
> We look forward to working with you! 🌍

---

### Day 7 Follow-Up (Still No Response)

**Trigger:** 7 days after initial submission, no active interaction

> 🔔 Hi {{contact_name}},
> 
> We still have your worker request on file at Kingken Global. We don't want you to miss out on the right candidates!
> 
> *{{company_name}}* – {{job_title}} × {{workers_count}} workers
> 
> Companies across Kuwait, UAE, and Qatar are currently filling similar positions with our candidates.
> 
> To proceed, simply reply:
> *YES* – to reactivate your request
> *STOP* – if you no longer need our services
> 
> Thank you,
> *Kingken Global Team* | +96569048174

---

### Re-Engagement After "Paused" Status

> 🌟 Hello {{contact_name}}!
> 
> We see that your worker request was previously on hold. We wanted to let you know that we currently have *qualified {{job_title}} candidates available* for immediate deployment.
> 
> Interested in reviewing candidate profiles?
> 
> Reply *YES* and we'll send you 3 top candidate profiles immediately.
> Reply *LATER* if you'd prefer to hear from us next month.
> 
> *Kingken Global* | info@kingkenglobal.com.ng | +96569048174
