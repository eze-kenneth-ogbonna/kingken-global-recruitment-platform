# Kingken Global Recruitment Platform — MVP Launch Plan

> **Company:** Kingken Global Travel Agency Ltd
> **Website:** https://www.kingkenglobal.com.ng | **Email:** info@kingkenglobal.com.ng | **WhatsApp:** +96569048174

---

## Overview

This is the 14-day roadmap to launch the Minimum Viable Product (MVP) of the Kingken Global Recruitment Platform. Each phase has specific deliverables, success metrics, and owner assignments.

---

## 14-Day Launch Roadmap

### Days 1–2: Foundation

**Goal:** All accounts created, forms built, Google Sheets structured.

| Day | Task | Owner | Success Metric |
|-----|------|-------|----------------|
| Day 1 | Create Google account: `platform@kingkenglobal.com.ng` | Head of Tech | Account active and accessible |
| Day 1 | Create Google Workspace accounts for all team members | Head of Tech | All team emails working |
| Day 1 | Create Worker Application Google Form with all 7 fields | Head of Tech | Form shareable and collecting responses |
| Day 1 | Create Employer Registration Google Form with all 9 fields | Head of Tech | Form shareable and collecting responses |
| Day 1 | Create master spreadsheet: `Kingken Global Platform — Master Database` | Head of Tech | Spreadsheet exists |
| Day 2 | Create all 7 tabs in spreadsheet with correct headers | Head of Tech | All 7 tabs exist with headers in Row 1 |
| Day 2 | Freeze Row 1 on all tabs | Head of Tech | Headers remain visible when scrolling |
| Day 2 | Apply data validation to all Status columns | Head of Tech | Dropdown menus working on Status fields |
| Day 2 | Apply conditional formatting to Master Data column K | Head of Tech | Color coding visible |
| Day 2 | Share spreadsheet with correct permissions for all team members | Head of Tech | Team confirms access |
| Day 2 | Enter all 14 Dashboard formulas | Head of Tech | Dashboard shows values (0s initially) |

**Phase Success Metrics:**
- Both Google Forms accessible via shareable URL
- All 7 tabs in spreadsheet with correct headers
- All team members have Google Workspace accounts

---

### Days 3–5: No-Code App Build

**Goal:** All 6 Zapier automations active and tested.

| Day | Task | Owner | Success Metric |
|-----|------|-------|----------------|
| Day 3 | Create Zapier account (Starter plan minimum) | Head of Tech | Account active |
| Day 3 | Connect Google Sheets app in Zapier | Head of Tech | Sheets connected successfully |
| Day 3 | Connect Google Forms app in Zapier | Head of Tech | Forms connected |
| Day 3 | Connect Gmail app in Zapier | Head of Tech | Gmail authorized |
| Day 3 | Build Zap 01: Worker Form → Master Data | Head of Tech | Dummy submission appears in sheet |
| Day 4 | Build Zap 06: Employer Form → Employers sheet + Email COO | Head of Tech | Employer row created + COO email received |
| Day 4 | Connect OpenAI app in Zapier with API key | Head of Tech | OpenAI app authorized |
| Day 4 | Build Zap 03: AI Scoring pipeline | Head of Tech | AI score written to column L |
| Day 5 | Connect WATI app in Zapier | Head of Tech | WATI authorized |
| Day 5 | Build Zap 02: Auto-reply WhatsApp to worker | Head of Tech | WhatsApp message received within 60s |
| Day 5 | Build Zap 04: Team notification email | Head of Tech | Recruiter email received |
| Day 5 | Build Zap 05: Create Trello/Notion task | Head of Tech | Task card created |
| Day 5 | Test all 6 Zaps with complete end-to-end flow | Head of Tech | All 6 Zaps run without errors |

**Phase Success Metrics:**
- Submit a test worker form → row in Master Data → AI score → WhatsApp received → team notified → task created
- Submit a test employer form → row in Employers tab → COO email received
- 0 Zap errors in final test run

---

### Days 6–7: System Connection

**Goal:** AI scoring working reliably; WhatsApp bot deployed and functional.

| Day | Task | Owner | Success Metric |
|-----|------|-------|----------------|
| Day 6 | Test AI scoring with 10 diverse dummy candidates | Head of Tech | 10/10 score successfully (or error handled) |
| Day 6 | Validate JSON parsing — all 5 fields extracted correctly | Head of Tech | score, strengths, weaknesses, recommendation, summary extracted |
| Day 6 | Validate status auto-assignment based on score thresholds | Head of Tech | Score 80+ = Approved, 60-79 = Screened, <40 = Rejected |
| Day 6 | Submit all 4 WATI message templates for Meta approval | Head of Tech | Templates submitted (approval within 24–48h) |
| Day 6 | Configure WATI keyword automations (APPLY, HIRE, FAQ, HUMAN) | Head of Tech | Keywords respond correctly |
| Day 7 | Build Worker Bot flow in WATI (all 9 messages) | Head of Tech | Full worker flow tested end-to-end |
| Day 7 | Build Employer Bot flow in WATI (all 9 messages) | Head of Tech | Full employer flow tested |
| Day 7 | Build FAQ auto-responses (all 10 FAQs) | Head of Tech | All 10 FAQ numbers respond correctly |
| Day 7 | Configure human handoff (HUMAN/AGENT keywords) | Head of Tech | Handoff message sent + Operations Daily group notified |
| Day 7 | Connect WATI bot submissions to Zapier webhooks | Head of Tech | Bot submissions create rows in Google Sheets |

**Phase Success Metrics:**
- Worker applies via WhatsApp → row created in Master Data with AI score
- Employer registers via WhatsApp → row in Employers tab → COO notified
- Human handoff works when "HUMAN" is typed

---

### Days 8–9: Business Features

**Goal:** Website live, Dashboard complete, team fully briefed.

| Day | Task | Owner | Success Metric |
|-----|------|-------|----------------|
| Day 8 | Create Wix account and begin building website | Head of Tech | Wix account active |
| Day 8 | Build Home page with all 8 sections | Head of Tech | Home page complete |
| Day 8 | Build For Workers page with embedded Worker Form | Head of Tech | Form loads and submits correctly |
| Day 8 | Build For Employers page with embedded Employer Form | Head of Tech | Form loads and submits correctly |
| Day 8 | Build About Us, Jobs Board, Apply Now, Contact, Privacy Policy | Head of Tech | All 8 pages published |
| Day 8 | Connect domain: `kingkenglobal.com.ng` | Head of Tech | Domain connected; DNS propagated |
| Day 9 | Install Google Analytics (GA4) tracking code | Head of Tech | Real-time visitor shows in GA4 |
| Day 9 | Install Facebook Pixel | Head of Tech | Pixel helper shows PageView event |
| Day 9 | Add WhatsApp chat widget to all pages | Head of Tech | Widget links to +96569048174 |
| Day 9 | Brief all team members on CRM (30-min walkthrough) | COO + Head of Recruitment | Team confirms understanding |
| Day 9 | Brief all team members on daily reporting format | COO | First test report received from each team member |
| Day 9 | Set up Trello/Notion board for task management | Head of Tech | Board accessible to all recruiters |

**Phase Success Metrics:**
- Website live at www.kingkenglobal.com.ng with HTTPS
- All forms accessible and submitting to Google Sheets
- All team members have submitted a test daily report
- Dashboard shows real data from test submissions

---

### Days 10–11: Testing

**Goal:** Full system dry run with simulated real candidates and employers.

| Day | Task | Owner | Success Metric |
|-----|------|-------|----------------|
| Day 10 | Full test with 3 dummy worker applications (different profiles) | Head of Tech + Head of Recruitment | All 3 scored, replied, tasks created |
| Day 10 | Test high-score candidate (80+): status = Approved, positive WhatsApp | Head of Tech | Correct auto-response sent |
| Day 10 | Test mid-score candidate (60–79): status = Screened, manual review | Head of Tech | Recruiter notification sent |
| Day 10 | Test low-score candidate (0–39): status = Rejected, rejection WhatsApp | Head of Tech | Rejection message received |
| Day 10 | Test employer form → employer row → COO email | Head of Tech | Full flow works |
| Day 10 | Identify and document any issues | Head of Tech | Issues list created |
| Day 11 | Fix all identified issues from Day 10 | Head of Tech | Issues resolved |
| Day 11 | Recruiter dry run: Screen 5 test candidates using CRM | Head of Recruitment + Recruiters | Recruiters confirm they understand the process |
| Day 11 | COO dry run: Create 1 job request, match 2 candidates, open 1 deal | COO | Job Request + Deal row created in Sheets |
| Day 11 | Confirm all WhatsApp templates are Meta-approved | Head of Tech | All 4 templates showing "Approved" in WATI |

**Phase Success Metrics:**
- End-to-end test: 3 workers, 1 employer, 1 job request, 1 deal — all recorded correctly
- 0 critical issues outstanding
- All team members comfortable using the system

---

### Days 12–14: Soft Launch

**Goal:** First real candidates, first employer contacts, first ads running.

| Day | Task | Owner | Success Metric |
|-----|------|-------|----------------|
| Day 12 | Share Worker Form link in 5 WhatsApp groups (community networks) | Country Managers | 10+ real submissions received |
| Day 12 | Direct outreach to 10 employer contacts in Kuwait/UAE (COO's network) | COO | 3+ responses |
| Day 12 | Create first Facebook awareness ad (workers) — $20/day budget | COO / Head of Tech | Ad live and serving impressions |
| Day 12 | Post on company Facebook and Instagram pages | COO | Posts published |
| Day 13 | Process all real candidate applications from Day 12 | Recruiters | All candidates screened and status updated |
| Day 13 | Follow up with Day 12 employer outreach contacts | COO | 1+ employer confirms interest |
| Day 13 | Review first 24 hours of Facebook ad performance | COO | Impressions, clicks, leads tracked |
| Day 14 | Review all platform data in Dashboard | COO | KPIs showing real data |
| Day 14 | Send first weekly report to CEO | COO | CEO confirms receipt |
| Day 14 | Hold first team standup meeting | COO | All team members present |
| Day 14 | Create first employer Job Request if employer confirmed | Head of Recruitment | JOB-0001 created in Sheets |

**Phase Success Metrics:**
- 20+ real candidate applications in Master Data
- 1+ employer actively discussing requirements
- At least 1 Facebook ad running with measurable impressions
- Daily reporting system functioning (all team submitting reports)

---

## Go-to-Market Strategy

### Channel 1: Direct Outreach (Free — Days 12–30)

**Workers:**
- Share form link in 20+ Nigerian/Ghanaian/Kenyan WhatsApp community groups
- Post in Facebook groups: "Jobs Abroad Nigeria", "International Jobs Ghana", etc.
- Partner with local churches, mosques, community centers
- Country Managers distribute physical flyers in Lagos, Accra, Nairobi

**Employers:**
- COO contacts known business owners in Kuwait/UAE via personal WhatsApp
- Cold outreach on LinkedIn to HR managers in Gulf companies
- Partner with other recruitment agencies who lack African talent pipelines
- Email cold outreach to Gulf hospitality companies

### Channel 2: Facebook Ads ($300–600/month)

- Awareness video ads targeting Africa (worker audience)
- Lead form ads targeting Gulf business owners (employer audience)
- Retargeting ads for website visitors
- See full strategy in `SALES_FUNNEL_GUIDE.md`

### Channel 3: WhatsApp Groups and Broadcasts

- Create broadcast lists of interested candidates
- Share weekly job updates with candidates who messaged previously
- Country Managers manage local WhatsApp communities (100–500 members each)

### Channel 4: Partner Agencies

- Identify 3–5 local sub-agents in each country (Nigeria, Ghana, Kenya)
- Offer 10–15% referral fee per successful placement from their referrals
- Provide them with the Worker Form link and basic training

### Channel 5: Google Ads (Phase 2 — Month 2+)

- Activate search campaigns targeting high-intent keywords
- Budget: $300–500/month
- See keyword strategy in `SALES_FUNNEL_GUIDE.md`

---

## Budget Estimate: First Month

| Item | Min (USD) | Max (USD) |
|------|-----------|-----------|
| Zapier (Starter plan) | $20 | $50 |
| WATI (WhatsApp) | $49 | $99 |
| OpenAI API | $10 | $50 |
| Website — Wix Business | $17 | $35 |
| Google Workspace | $12 | $18 |
| Facebook Ads | $300 | $600 |
| Google Ads (optional Month 1) | $0 | $300 |
| Canva Pro (ad creatives) | $15 | $15 |
| Miscellaneous (travel, flyers) | $50 | $100 |
| **Total** | **$473** | **$1,267** |
| **Recommended budget** | **$500** | **$1,000** |

---

## Success Metrics by Phase

| Phase | Key Metric | Target |
|-------|-----------|--------|
| Days 1–2: Foundation | Forms and Sheets ready | 100% of infrastructure built |
| Days 3–5: Automation | Zap success rate | 100% on test runs |
| Days 6–7: AI & Bot | AI scoring accuracy | Valid JSON for 95%+ of submissions |
| Days 8–9: Business | Website live | HTTPS, forms working, team briefed |
| Days 10–11: Testing | System reliability | 0 critical bugs in dry run |
| Days 12–14: Soft Launch | Real applications | 20+ candidates, 1+ employer confirmed |

### 30-Day Post-Launch Targets

| Metric | 30-Day Target |
|--------|--------------|
| Total candidate applications | 100+ |
| Workers approved for placement | 30+ |
| Workers deployed | 5+ |
| Active employers | 5+ |
| Revenue invoiced | $5,000+ |
| Revenue collected | $2,500+ |
| Daily reporting compliance | 95%+ |

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| WATI templates not approved | Medium | High | Submit early; have backup email auto-reply |
| OpenAI API downtime | Low | Medium | Manual screening fallback; status set to "New" |
| Zapier quota exceeded | Medium | Medium | Upgrade plan; monitor usage weekly |
| Facebook ads rejected | Medium | High | Have backup creatives; follow Meta ad policies |
| Domain DNS not propagating | Low | Medium | Use Wix temporary URL until domain connects |
| No employer responses in Week 2 | Medium | High | Escalate COO outreach; activate LinkedIn outreach |
| Team not submitting reports | Medium | High | COO enforces accountability from Day 1 |
| Low quality candidate applications | Medium | High | Improve form questions; increase AI score threshold |

---

*Maintained by: COO | Contact: info@kingkenglobal.com.ng | https://www.kingkenglobal.com.ng*
