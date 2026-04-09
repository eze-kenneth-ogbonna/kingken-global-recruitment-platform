# WATI Setup Guide – Kingken Global WhatsApp Bot

**Platform:** WATI (WhatsApp Automation Tool for Individuals)  
**Company:** Kingken Global Travel Agency Ltd  
**WhatsApp Number:** +96569048174  
**Website:** https://www.kingkenglobal.com.ng

---

## Section 1 – Create WATI Account

### Steps:
1. Go to https://www.wati.io
2. Click "Start Free Trial" or "Sign Up"
3. Enter your business details:
   - Business Name: `Kingken Global Travel Agency Ltd`
   - Email: `info@kingkenglobal.com.ng`
   - Website: `https://www.kingkenglobal.com.ng`
   - Country: Kuwait (or your primary country of operation)
4. Choose a subscription plan:
   - **Recommended for MVP:** WATI Standard (supports up to 5 team members)
   - **For scaling:** WATI Pro (unlimited agents, advanced flows)
5. Complete payment and confirm email

### Post-Sign-Up:
- You will receive login credentials via email
- Log into the WATI dashboard at https://app.wati.io
- Note your WATI API endpoint URL and API key (you will need these for Zapier integration)

---

## Section 2 – Connect WhatsApp Business Number

### Prerequisites:
- A dedicated phone number for Kingken Global WhatsApp Business (e.g., +96569048174)
- This number must NOT be currently active on a personal WhatsApp account
- A Meta (Facebook) Business Manager account (see Section 3)

### Steps:
1. In WATI dashboard → Settings → WhatsApp Business API
2. Click "Connect WhatsApp Number"
3. Choose "Connect via Meta Business Manager"
4. You will be redirected to Meta's verification flow
5. Enter your phone number: `+96569048174`
6. Receive and enter the OTP sent to the number
7. Once connected, the number shows as "Active" in WATI

### Important:
- The WhatsApp number used here will only be accessible via WATI (not a standard WhatsApp app)
- Install WhatsApp Business on a separate device/SIM for any personal use
- Allow up to 24 hours for Meta to activate the number

---

## Section 3 – Meta Business Manager Setup

### Why This Is Needed:
Meta (Facebook) requires all WhatsApp Business API users to have a verified Meta Business Manager account.

### Steps:
1. Go to https://business.facebook.com
2. Create a new Business Manager account:
   - Business Name: `Kingken Global Travel Agency Ltd`
   - Business Email: `info@kingkenglobal.com.ng`
   - Business Website: `https://www.kingkenglobal.com.ng`
3. Verify your business:
   - Go to Business Settings → Security Centre → Business Verification
   - Upload: Business registration certificate or utility bill
   - Wait for approval (1–3 business days)
4. Create a WhatsApp Business App:
   - In Meta Business Manager → Apps → Create App
   - Choose "Business" type
   - Select "WhatsApp" as the product
5. Link the app to your WATI account using the credentials from Section 1

### WhatsApp Business Profile Setup in Meta:
- Profile name: `Kingken Global`
- Business category: `Staffing/Recruiting`
- Business description: `Gulf-region worker recruitment and placement services`
- Profile photo: Kingken Global logo
- Website: `https://www.kingkenglobal.com.ng`
- Email: `info@kingkenglobal.com.ng`

---

## Section 4 – Build Keyword Triggers

Keyword triggers automatically detect what a user wants and route them to the right flow.

### How to Add Keyword Triggers in WATI:
1. WATI Dashboard → Automation → Keyword Triggers
2. Click "Add New Trigger"
3. Enter the keyword(s) and select the action (send message or start flow)

### Core Keyword Triggers:

| Keyword(s) | Action | Response or Flow |
|-----------|--------|-----------------|
| `1`, `hire`, `employer`, `company`, `need workers`, `hiring` | Start Employer Flow | BOT_SCRIPT_EMPLOYER.md |
| `2`, `apply`, `job`, `worker`, `work`, `apply for job` | Start Worker Flow | BOT_SCRIPT_WORKER.md |
| `3`, `faq`, `question`, `info`, `information` | Send FAQ Menu | Category list from BOT_FAQ_RESPONSES.md |
| `4`, `human`, `agent`, `speak to someone`, `help` | Escalate to Human | Assign to available agent |
| `status`, `check status`, `my application` | Application Status Check | Ask for reference number |
| `cost`, `fee`, `price`, `how much` | Send FAQ 1.1 | Fee FAQ response |
| `documents`, `what documents`, `papers` | Send FAQ 2.2 | Documents FAQ response |
| `medical`, `GAMCA`, `health check` | Send FAQ 2.3 | Medical FAQ response |
| `hi`, `hello`, `hey`, `start`, `good morning`, `good evening` | Send Main Menu | Initial greeting message |
| `stop`, `unsubscribe`, `opt out` | Unsubscribe | "You have been unsubscribed. Reply START to re-subscribe." |

### Tips for Keyword Triggers:
- Add multiple variations of the same keyword (e.g., `job`, `jobs`, `find job`, `looking for job`)
- Keyword matching in WATI is case-insensitive by default
- Set a "Default/Fallback" trigger for unrecognised messages

---

## Section 5 – Create Conversation Flows

Conversation flows are multi-step automated chat sequences.

### How to Create a Flow in WATI:
1. WATI Dashboard → Automation → Chat Bot Flow
2. Click "Create New Flow"
3. Name the flow (e.g., "Employer Registration Flow")
4. Use the drag-and-drop builder to add steps

### Employer Flow Steps (refer to BOT_SCRIPT_EMPLOYER.md):
1. **Send Message:** Initial employer greeting
2. **Ask Question:** Company Name → save to custom attribute `company_name`
3. **Send Button Message:** Country selection (6 options + Other)
4. **Ask Question:** Industry
5. **Ask Question:** Job position
6. **Ask Question:** Number of workers
7. **Ask Question:** Salary
8. **Ask Question:** Start date
9. **Ask Question:** Contact person details
10. **Send Message:** Summary + confirmation
11. **Branch:** If "1" (Yes) → proceed; If "2" → return to change step
12. **Send Message:** Thank you + reference number
13. **Trigger Zapier Webhook:** Save to Google Sheets (see Section 6)

### Worker Flow Steps (refer to BOT_SCRIPT_WORKER.md):
1. **Send Message:** Worker greeting
2. **Ask Question:** Full name → save to `candidate_name`
3. **Send Button Message:** Country of residence
4. **Send Button Message:** Desired job position
5. **Send Button Message:** Years of experience
6. **Send Button Message:** Passport status
7. **Ask Question:** Request CV upload (file input)
8. **Send Message:** Confirmation summary
9. **Branch:** Confirm or edit
10. **Send Message:** Reference number + next steps
11. **Trigger Zapier Webhook:** Save to Google Sheets

### Setting Custom Attributes:
- In WATI, custom attributes store user-provided data (name, position, etc.)
- Go to Settings → Custom Attributes → Add Attribute
- Create attributes: `company_name`, `candidate_name`, `desired_position`, `workers_count`, etc.
- In the flow, use "Save to attribute" after each question step

---

## Section 6 – Connect to Google Sheets via Zapier

### Overview:
When a user completes a flow, WATI sends data to Zapier via a webhook, which then writes the data to Google Sheets.

### Step-by-Step Setup:

**In Zapier:**
1. Create a new Zap
2. Trigger: "Webhooks by Zapier" → Catch Hook
3. Copy the webhook URL provided by Zapier
4. Action: Google Sheets → Create Spreadsheet Row
5. Select the target sheet (e.g., "Master Data" for workers, "Employers" for employers)
6. Map the fields (WATI attributes → Sheet columns)

**In WATI:**
1. In the conversation flow, after the confirmation step
2. Add a "Send API Request" step (or use WATI's native Zapier integration)
3. Method: POST
4. URL: paste the Zapier webhook URL
5. Body (JSON):
```json
{
  "candidate_name": "{{candidate_name}}",
  "current_country": "{{current_country}}",
  "desired_position": "{{desired_position}}",
  "experience_years": "{{experience_years}}",
  "passport_status": "{{passport_status}}",
  "phone": "{{phone}}"
}
```
6. Save and test

### Zapier Field Mapping (Worker → Master Data Sheet):
| WATI Attribute | Sheet Column |
|---------------|-------------|
| `candidate_name` | Full Name |
| `current_country` | Country |
| `desired_position` | Desired Position |
| `experience_years` | Experience |
| `passport_status` | Passport Status |
| `phone` | Phone / WhatsApp |
| (Auto-generated) | CandidateID |
| (Hardcoded: "New") | Status |
| (Today's date) | Date Registered |

---

## Section 7 – Test the Bot (10-Scenario Test Checklist)

Before going live, test all scenarios:

| # | Test Scenario | Expected Result | Pass/Fail |
|---|--------------|----------------|-----------|
| 1 | Send "hello" | Receive main menu with 4 options | ☐ |
| 2 | Reply "1" (Employer flow) | Start employer data collection | ☐ |
| 3 | Reply "2" (Worker flow) | Start worker application flow | ☐ |
| 4 | Complete full employer flow | Receive confirmation + reference number | ☐ |
| 5 | Complete full worker flow | Receive application reference | ☐ |
| 6 | Send unrecognised message | Receive fallback/error recovery message | ☐ |
| 7 | Send "fee" keyword | Receive FAQ 1.1 (fees response) | ☐ |
| 8 | Send "4" or "help" | Get escalated to human agent | ☐ |
| 9 | Go inactive for 20 min | Receive timeout reminder message | ☐ |
| 10 | Check Google Sheet after completing flow | New row created with correct data | ☐ |

### Testing Tips:
- Use a personal WhatsApp number to test (not the business number)
- Test from both Android and iOS devices
- Test all dropdown/button options in each flow
- Verify Google Sheets rows are created correctly after each test

---

## Section 8 – Go Live

### Pre-Launch Checklist:
- [ ] WATI account created and active
- [ ] WhatsApp Business number connected and verified
- [ ] Meta Business Manager verified
- [ ] All keyword triggers set up
- [ ] Employer flow tested and working
- [ ] Worker flow tested and working
- [ ] Google Sheets integration tested
- [ ] Zapier zaps active and tested
- [ ] Team members added to WATI with correct roles
- [ ] Escalation routing set up (human handover)
- [ ] Business profile photo and description set

### Announce Go-Live:
1. Post on Facebook/Instagram: "WhatsApp us at +96569048174 for job applications"
2. Send WhatsApp broadcast to existing contacts
3. Add WhatsApp link to website header
4. Add to email signatures

---

## Section 9 – Monitor WATI Dashboard

### Daily Monitoring (5 minutes):
1. WATI Dashboard → Conversations
2. Review all unread/open conversations
3. Check "Pending" conversations (bot couldn't handle → needs human)
4. Review "Resolved" count for the day

### Weekly Monitoring:
1. WATI Dashboard → Analytics
2. Check:
   - Total conversations this week
   - Messages sent vs received
   - Average response time
   - Most triggered keywords
   - Completion rate for each flow (how many users finish vs drop off)
3. Identify flow steps where users drop off and improve those messages

### Key Metrics to Track:
| Metric | Target | Warning Threshold |
|--------|--------|------------------|
| Response time (bot) | < 5 seconds | > 30 seconds |
| Flow completion rate | > 60% | < 40% |
| Human escalation rate | < 20% | > 40% |
| Unrecognised messages | < 15% | > 30% |
| New conversations / week | Growing | Declining 2+ weeks |

---

## Section 10 – Human Escalation Setup

### What Is Human Escalation?
When the bot cannot handle a conversation (user requests help, sends confusing messages, etc.), the conversation is assigned to a human team member (agent) in WATI.

### Setup Steps:
1. Add team members to WATI:
   - WATI Dashboard → Settings → Team Members
   - Add COO and HR officers with their emails
   - Assign roles: Admin (COO), Agent (HR Officers)
2. Set escalation trigger in flows:
   - After 3 unrecognised messages in a row → auto-assign to human
   - When user sends keyword "HELP" → assign to available agent
3. Configure agent availability:
   - Each agent sets their status (Online/Away/Offline) in WATI
   - When all agents are offline → send "Our team will respond within [hours]" message
4. Set WATI notifications:
   - Agents receive push notifications when a conversation is assigned to them
   - COO gets email alerts for high-priority escalations

### Human Handover Message to User:
> I'm connecting you with a member of our team now. 👤
> 
> Please hold – someone will be with you shortly.
> 
> If urgent: 📞 +96569048174

### SLA (Service Level Agreement) for Human Response:
| Priority | Response Time |
|----------|--------------|
| Urgent (deployed worker issue) | Within 30 minutes |
| High (employer inquiry) | Within 2 hours |
| Standard (worker application) | Within 24 hours |
| General inquiry | Within 48 hours |
