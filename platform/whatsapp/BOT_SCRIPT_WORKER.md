# WhatsApp Bot – Worker Conversation Script

**Bot Name:** Kingken Bot  
**Flow:** Worker Job Application  
**Platform:** WATI (WhatsApp Business API)  
**Company:** Kingken Global Travel Agency Ltd | +96569048174

---

## Flow Overview

```
Incoming Message
     ↓
Greeting + Intent Detection
     ↓
[If Worker intent detected]
     ↓
Name Collection
     ↓
Country & Position
     ↓
Experience & Passport
     ↓
CV Request
     ↓
Confirmation + Reference Number
     ↓
Auto-Reply with Reference
     ↓
Team Notification
     ↓
Follow-up Schedule
```

---

## 1. Initial Greeting + Intent Detection

**Trigger:** User selects option "2" from the main menu OR sends keywords:
- "job", "work", "vacancy", "apply", "worker", "looking for job", "employment", "opportunity", "Kuwait job", "Gulf job"

> 👋 *Welcome to Kingken Global!*
> 
> We help workers find jobs in Kuwait, UAE, Qatar, Saudi Arabia, and other Gulf countries. 🌍
> 
> I'll help you submit your application in just a few minutes.
> 
> Let's get started! Please type *START* or reply *1* to begin.

---

## 2. Full Name Collection

> 📝 *Great!* First, what is your *full name?*
> 
> Please type your full name as it appears on your passport or ID.
> 
> Example: *John Emmanuel Adeyemi*

**Save as:** `{{candidate_name}}`

---

**Error Recovery – Name:**

*If response is less than 3 characters or contains only numbers:*

> I didn't catch your name. Please type your *full name* clearly.
> 
> Example: *Mary Chinwe Okafor*

---

## 3. Country of Residence

> 🌍 *Where are you currently living?*
> 
> *1* – Nigeria
> *2* – Ghana
> *3* – Philippines
> *4* – Kenya
> *5* – Ethiopia
> *6* – Uganda
> *7* – Tanzania
> *8* – India
> *9* – Pakistan
> *0* – Other (type your country)

**Save as:** `{{current_country}}`

---

## 4. Desired Job Position

> 💼 *What type of job are you looking for?*
> 
> *1* – Construction Worker / Labourer
> *2* – Cleaning Staff
> *3* – Hospitality / Hotel Staff
> *4* – Security Guard
> *5* – Driver
> *6* – Healthcare / Nurse
> *7* – Factory Worker
> *8* – Electrician
> *9* – Plumber / Welder
> *0* – Other (please type your position)

**Save as:** `{{desired_position}}`

---

**Error Recovery – Position:**

*If response is unclear:*

> I didn't catch that. Please reply with a *number* from the list above, or type your desired job position.
> 
> Example: *3* or *Hotel Receptionist*

---

## 5. Years of Experience

> 📅 *How many years of experience do you have in {{desired_position}}?*
> 
> *1* – Less than 1 year
> *2* – 1–2 years
> *3* – 3–5 years
> *4* – 5–10 years
> *5* – More than 10 years

**Save as:** `{{experience_years}}`

---

## 6. Passport Status

> 🛂 *Do you have a valid passport?*
> 
> *1* – Yes, my passport is valid
> *2* – Yes, but my passport is expired
> *3* – No, I don't have a passport yet

**Save as:** `{{passport_status}}`

---

**If passport_status = "3" (No passport):**

> No problem! You can still apply.
> 
> Getting a passport is the first step. Here's what we recommend:
> 
> 🇳🇬 *Nigeria:* Apply at any NIS office or via https://portal.immigration.gov.ng
> 🇬🇭 *Ghana:* Apply at https://www.passportoffice.gov.gh
> 🇵🇭 *Philippines:* Apply at DFA: https://www.dfa.gov.ph
> 
> Once you have your passport, come back and apply again.
> 
> We'll keep your profile on file! Reply *CONTINUE* if you'd like to proceed anyway and our team will follow up.

---

**If passport_status = "2" (Expired):**

> We can still process your application, but please note:
> 
> ⚠️ Your passport *must be renewed before deployment*. Employers require a minimum of 12 months validity.
> 
> We recommend starting your renewal now while we process your application.
> 
> Let's continue! 👇

---

## 7. CV / Resume Request

> 📄 *Please send us your CV or Resume.*
> 
> You can:
> - 📎 *Upload a file* (PDF, Word, or image)
> - 📝 *Type a brief summary* if you don't have a CV
> 
> If typing, include: your name, experience, skills, and any certifications.

**Save as:** `{{cv_file}}` or `{{cv_text}}`

---

**If user sends an image instead of PDF:**

> Thank you! We received your document. 📄
> 
> For best results, please also send a PDF or Word version of your CV if you have one.
> 
> If you don't have one, no problem – our team will help you create a basic profile.

---

**If user has no CV:**

> No CV? No problem!
> 
> Please type a brief summary about yourself:
> 
> - Your name
> - Your experience (years + what you did)
> - Any special skills or training
> - Are you certified in anything?
> 
> Example: *"I'm John Okafor, I have 5 years experience as a construction labourer in Lagos. I can operate heavy machinery and have a valid driver's licence."*

---

## 8. Application Confirmation + Reference Number

> ✅ *Your application has been received!*
> 
> Here is a summary:
> 
> 👤 *Name:* {{candidate_name}}
> 🌍 *Country:* {{current_country}}
> 💼 *Position:* {{desired_position}}
> 📅 *Experience:* {{experience_years}}
> 🛂 *Passport:* {{passport_status}}
> 
> Is this correct?
> 
> *1* – Yes, submit my application
> *2* – No, I need to make a change

---

**If reply = "2" (correction needed):**

> What would you like to change?
> 
> *1* – My name
> *2* – My country
> *3* – The job position
> *4* – My experience
> *5* – Passport status
> *6* – My CV / summary

---

## 9. Auto-Reply with Reference Number

*[Triggered after confirmation]*

**Action (internal):** Zapier creates candidate record in Master Data sheet, generates Candidate ID.

> 🎉 *Application Submitted Successfully!*
> 
> Your *Application Reference Number* is:
> 
> 📋 *KENG-{{date}}-{{ID}}*
> 
> *Please save this number* – you will need it for all future communications with our team.
> 
> *What happens next:*
> 
> 1️⃣ Our HR team will review your profile within *48 hours*
> 2️⃣ If shortlisted, you will be contacted for a *screening call*
> 3️⃣ Successful candidates move to *document collection*
> 4️⃣ Medical, visa processing, and deployment follow
> 
> 📞 For questions: +96569048174
> 📧 Email: info@kingkenglobal.com.ng
> 🌐 www.kingkenglobal.com.ng
> 
> *Thank you for applying with Kingken Global!* 🌍

---

## 10. Team Notification

*[Internal – sent to HR Officer WhatsApp after application is submitted]*

> 🔔 *NEW WORKER APPLICATION*
> 
> 👤 Name: {{candidate_name}}
> 🌍 Country: {{current_country}}
> 💼 Position: {{desired_position}}
> 📅 Experience: {{experience_years}}
> 🛂 Passport: {{passport_status}}
> 📋 Ref: KENG-{{date}}-{{ID}}
> 
> Please review and update the pipeline within 48 hours.
> 📋 Open Master Data: [link]

---

## Error Recovery Scripts

### Unrecognised Input:

> Hmm, I didn't understand that. 😅
> 
> Please reply with a *number from the options*, or type your answer clearly.
> 
> If you need help, type *HELP* to speak with a team member.

### Timeout – User Inactive for 20 Minutes:

> 👋 *Are you still there, {{candidate_name}}?*
> 
> Your application is not yet complete. Reply *CONTINUE* to pick up where you left off, or *RESTART* to start over.

### User Sends Unsupported File Type:

> Sorry, I can't process that file type. 😓
> 
> Please send your CV as:
> - 📄 PDF
> - 📝 Word document (.doc or .docx)
> - 🖼️ Image (JPG or PNG)
> 
> Or just *type your experience* in a message and we'll record it.

---

## Follow-Up Scripts

### Day 3 Follow-Up (No HR Update)

**Trigger:** 3 days after application submitted, Stage still = "Applied"

> 👋 Hello {{candidate_name}}!
> 
> This is Kingken Global following up on your job application.
> 
> 📋 *Reference:* {{application_reference}}
> 💼 *Position:* {{desired_position}}
> 
> Your application is currently under review. Our HR team will contact you soon for a screening call.
> 
> Do you have any questions?
> 
> *1* – Yes, I have a question
> *2* – No, I'll wait for your call
> *3* – I want to update my application

---

### Day 7 Follow-Up (Still in Applied Stage)

**Trigger:** 7 days after application, Stage still = "Applied" or "Screening"

> 🔔 Hello {{candidate_name}},
> 
> We wanted to give you an update on your Kingken Global application.
> 
> 📋 Ref: {{application_reference}}
> 
> Our team is actively working on matching candidates to open positions. We are reviewing profiles for {{desired_position}} roles in {{preferred_country}}.
> 
> You will be notified as soon as a suitable vacancy is confirmed for your profile.
> 
> 💡 *Tip:* Make sure your CV is up to date and your passport is valid to speed up processing.
> 
> Reply *STATUS* to get your current application status.
> 
> Thank you for your patience 🙏
> *Kingken Global* | +96569048174

---

### Rejection Script (Candidate Not Suitable)

**Trigger:** HR Officer marks Stage = "Rejected" in Pipeline sheet → Zapier sends this message

> Hello {{candidate_name}},
> 
> Thank you for your interest in working with Kingken Global.
> 
> After carefully reviewing your profile, we regret to inform you that we are unable to match you with a suitable position at this time.
> 
> This may be due to:
> - Current availability of positions matching your profile
> - Qualification or experience requirements
> - Passport or documentation status
> 
> We encourage you to:
> ✅ Renew or obtain a valid passport
> ✅ Gain additional experience or certifications
> ✅ Reapply in 3–6 months when new positions open
> 
> Your profile will remain in our database and we will contact you if a suitable vacancy arises.
> 
> We wish you the very best.
> 
> *Kingken Global Team*
> 📞 +96569048174 | 📧 info@kingkenglobal.com.ng

---

## Escalation to HR Team

**Trigger keywords:** "HELP", "SPEAK TO SOMEONE", "CALL ME", "HUMAN", "PROBLEM", "ISSUE"

> I'm connecting you with one of our HR officers now. 👤
> 
> Someone will message you back shortly.
> 
> If urgent, call: 📞 *+96569048174*

**Internal notification to HR:**

> ⚡ *WORKER ESCALATION*
> 
> {{candidate_name}} has requested human assistance.
> WhatsApp: {{user_phone}}
> Ref: {{application_reference}}
> 
> Please respond within 10 minutes.
