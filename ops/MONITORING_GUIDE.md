# Monitoring Guide – Kingken Global Recruitment Platform

**Company:** Kingken Global Travel Agency Ltd  
**Document Type:** Operational Monitoring  
**Version:** 1.0

---

## Overview

This guide defines what to monitor, how often, and what action to take when metrics fall below targets.

---

## 1. Daily Morning Check (5 Points – 10 Minutes)

**Who:** Operations Manager (or COO if Ops Manager unavailable)  
**When:** Every working day, 8:00 AM  
**Time Required:** 10 minutes

| # | Check | How to Check | Target | Action if Issue |
|---|-------|-------------|--------|----------------|
| 1 | Google Sheets accessible | Open all 7 sheet tabs | All tabs load < 3 seconds | See P1 Playbook in INCIDENT_RESPONSE.md |
| 2 | Zapier has no errors | Zapier → Task History → filter by Error | 0 errors in last 24 hours | See P3 Playbook |
| 3 | WhatsApp bot responds | Send "hello" to +96569048174 | Response received < 5 seconds | See P4 Playbook |
| 4 | Dashboard shows data | Open Dashboard tab | All KPI cells show numbers (not #REF or #N/A) | Fix broken formula or reconnect sheet |
| 5 | New applications received | Check Master Data for new rows | Any new rows since yesterday | Assign to HR Officer for review |

### Morning Check Summary Template (WhatsApp to COO):
> 🌅 *Morning Check – [Date]*
> 
> ✅ Sheets: OK / ❌ ISSUE
> ✅ Zapier: OK / ❌ ISSUE
> ✅ Bot: OK / ❌ ISSUE
> ✅ Dashboard: OK / ❌ ISSUE
> 📋 New applications: [number]
> 📋 New employer requests: [number]
> 
> *Operations Manager*

---

## 2. Weekly Review (10 Items – 30 Minutes)

**Who:** COO  
**When:** Every Monday morning  
**Time Required:** 30 minutes

| # | Review Item | Where to Check | Action if Below Target |
|---|------------|---------------|----------------------|
| 1 | Total new candidates this week | Dashboard B3 (New This Week) | Increase marketing; boost WhatsApp outreach |
| 2 | Zapier task volume vs plan limit | Zapier → Dashboard → Task Usage | Upgrade Zapier plan if near limit |
| 3 | WATI conversation count | WATI → Analytics → This Week | If very low, check bot is active and keywords trigger |
| 4 | Pipeline stage distribution | Pipeline sheet → filter by Stage | If many candidates stuck in one stage, investigate bottleneck |
| 5 | Overdue tasks | Tasks sheet → filter Due Date < Today, Status ≠ Done | Follow up with assigned team members |
| 6 | Pending documents (Partial) | Pipeline → filter Documents Submitted = Partial | HR to follow up with candidates |
| 7 | Medical results pending | Pipeline → filter Medical Clearance = Pending | Check if results expected soon; escalate if overdue |
| 8 | Unpaid invoices | Deals → filter Payment Status = Unpaid | Send payment reminders to employers |
| 9 | Employer lead conversion | Employers → count Lead vs Active | Review and follow up with Lead employers |
| 10 | Team task completion rate | Tasks → Done this week / Total tasks | Discuss in Monday team standup |

---

## 3. Monthly Review (8 Items – 60 Minutes)

**Who:** CEO + COO  
**When:** First Monday of each month  
**Time Required:** 60 minutes

| # | Review Item | Where to Check | Benchmark |
|---|------------|---------------|-----------|
| 1 | Total candidates registered this month | Master Data – filter by month | Growing month-over-month |
| 2 | Total workers deployed this month | Pipeline – filter Deployment Status = Confirmed | At least 5/month (MVP); 20+/month (scale) |
| 3 | Total revenue invoiced this month | Deals – sum Total Deal Value for this month | > $10,000 (MVP target) |
| 4 | Revenue collected vs invoiced | Deals – Total Paid / Total Deal Value | > 70% collection rate |
| 5 | Cost per acquisition (marketing) | Marketing spend / New candidates | Track and reduce over time |
| 6 | Platform tool costs vs revenue | Monthly tool costs vs revenue | Keep tool costs < 5% of revenue |
| 7 | Team workload balance | Tasks – count by Assigned To | No team member > 2× average |
| 8 | Data quality review | Spot-check 10 random rows for accuracy | All spot-checked rows accurate |

---

## 4. Key Metrics with Targets and Warning Thresholds

### Candidate Metrics

| Metric | Target | Warning | Critical |
|--------|--------|---------|---------|
| New candidates / week | ≥ 20 | 10–20 | < 10 |
| Application completion rate | ≥ 70% | 50–70% | < 50% |
| Avg AI Score | ≥ 6.5 | 5.0–6.5 | < 5.0 |
| Time from Apply to Screening (days) | ≤ 3 days | 3–7 days | > 7 days |
| Time from Screening to Deployed (weeks) | ≤ 8 weeks | 8–12 weeks | > 12 weeks |
| Document submission rate | ≥ 80% | 60–80% | < 60% |
| Medical pass rate | ≥ 85% | 70–85% | < 70% |

### Employer Metrics

| Metric | Target | Warning | Critical |
|--------|--------|---------|---------|
| Lead to Active conversion rate | ≥ 40% | 20–40% | < 20% |
| New employer leads / month | ≥ 5 | 2–5 | < 2 |
| Days to first shortlist after job request | ≤ 14 days | 14–21 days | > 21 days |
| Employer satisfaction (repeat orders) | ≥ 60% repeat | 40–60% | < 40% |

### Revenue Metrics

| Metric | Target | Warning | Critical |
|--------|--------|---------|---------|
| Monthly invoiced revenue | ≥ $10,000 | $5,000–10,000 | < $5,000 |
| Collection rate | ≥ 70% | 50–70% | < 50% |
| Outstanding balance age | ≤ 30 days avg | 30–60 days | > 60 days |
| Deals closed / month | ≥ 3 | 1–3 | 0 |

### Platform Metrics

| Metric | Target | Warning | Critical |
|--------|--------|---------|---------|
| Zapier error rate | 0% | < 5% | ≥ 5% |
| Bot response time | < 5 seconds | 5–30 seconds | > 30 seconds |
| Bot flow completion rate | ≥ 60% | 40–60% | < 40% |
| Google Sheets load time | < 3 seconds | 3–10 seconds | > 10 seconds |
| Platform uptime | ≥ 99.5% | 98–99.5% | < 98% |

---

## 5. Google Sheets Monitoring

### What to Monitor:
1. **Formula errors:** Any cell showing `#REF!`, `#N/A`, `#DIV/0!`, `#ERROR!`
   - **Check:** Open Dashboard and scan for error cells
   - **Fix:** Review the formula; check if referenced sheet/column was renamed or deleted
2. **Data volume:** Number of rows in each sheet
   - **Check monthly:** If any sheet approaches 10,000 rows, consider archiving older data
3. **Sheet load speed:** Slow loading suggests too many complex formulas
   - **Fix:** Convert some formula ranges from entire-column references (A:A) to bounded ranges (A2:A5000)
4. **Access audit:** Who has access to each sheet
   - **Check quarterly:** Share → Manage access → remove anyone no longer on the team

### Google Sheets Health Indicators:

| Indicator | Healthy | Needs Attention |
|-----------|---------|----------------|
| Dashboard loads in | < 3 seconds | > 5 seconds |
| Error cells in Dashboard | 0 | Any |
| Master Data rows | < 5,000 | > 8,000 (consider archiving) |
| Pipeline rows | < 2,000 | > 5,000 |
| Users with Edit access | ≤ 10 | > 15 |

---

## 6. Zapier Monitoring

### Daily:
1. Go to Zapier Dashboard → Task History
2. Filter by status: Error
3. For each error: read the error message and determine if it was a temporary issue or a configuration problem
4. **Replay** temporary errors (network timeouts, API rate limits)
5. **Fix** configuration errors (broken sheet references, expired auth)

### Weekly:
1. Zapier Dashboard → Task Usage
   - Are we using > 80% of our monthly task allocation? → Upgrade plan
2. Review each Zap's success rate (Tasks Successful / Total Tasks)
   - Any Zap with < 95% success rate needs investigation

### Alert Setup:
1. Zapier → Settings → Notifications
2. Enable "Email me when a Zap has consecutive errors"
3. Set: "Email me when a Zap has 3 consecutive errors"
4. Notification email: ops@kingkenglobal.com.ng

---

## 7. WATI Monitoring

### Daily:
1. WATI Dashboard → Conversations → Pending
   - Any conversations stuck in "Pending" (bot couldn't handle) → manually respond
2. WATI Dashboard → Conversations → Open
   - Any conversations open for > 2 hours without a response → escalate to HR/COO

### Weekly Analytics Review:
1. WATI → Analytics → select date range (last 7 days)
2. Review:
   - Total incoming messages
   - Total outgoing messages (bot + agents)
   - Average first response time
   - Top triggered keywords (shows what users ask about most)
   - Flow completion rates (% of users who complete employer/worker flows)
3. Record metrics in weekly monitoring log

### WATI Key Metrics:

| Metric | Target | Alert Threshold |
|--------|--------|----------------|
| First response time (bot) | < 5 seconds | > 30 seconds |
| Flow completion rate | > 60% | < 40% |
| Unresolved conversations > 24hrs | 0 | Any |
| API errors per week | 0 | > 3 |
| Message delivery failure rate | < 1% | > 5% |

---

## 8. Dashboard Alert Thresholds

Set up alerts for when KPIs fall outside target ranges. These can be monitored manually or via a Zapier "watchdog" Zap.

### Manual Alert Check (Daily – 2 minutes):
1. Open Dashboard
2. Check if any of these critical KPIs are at 0 when they shouldn't be:
   - B3 (New This Week) — should be > 0 on most days
   - B13 (Open Jobs) — should always be > 0 to ensure active recruitment
   - B29 (Open Tasks) — should be > 0 (team should always have work)

### Zapier Watchdog Zap (Automated Alert):
Set up a Zap that runs daily and sends a WhatsApp alert if key metrics fall below targets:

1. **Trigger:** Schedule → Every day at 9:00 AM
2. **Action 1:** Google Sheets → Lookup Spreadsheet Row → Dashboard sheet
3. **Action 2:** Filter → Only continue if B29 (Open Tasks) = 0 (red flag)
4. **Action 3:** WATI → Send WhatsApp message to COO:
   > ⚠️ Dashboard Alert: No open tasks today. Please review team workload.

---

## 9. KPI Reporting Schedule

| Report | Frequency | Owner | Recipients | Format |
|--------|-----------|-------|-----------|--------|
| Morning Status | Daily | Ops Manager | COO | WhatsApp message |
| Weekly KPI Summary | Weekly (Monday) | COO | CEO | WhatsApp message |
| Monthly Performance Report | Monthly | COO | CEO, Board | Google Sheet export + summary |
| Quarterly Business Review | Quarterly | CEO | Board, Investors | PowerPoint + Dashboard screenshot |

### Monthly Report Template (WhatsApp/Email to CEO):

> 📊 *Kingken Global – Monthly Report: [Month Year]*
> 
> **CANDIDATES**
> 🆕 New this month: [number]
> ✅ Deployed: [number]
> 📋 In Pipeline: [number]
> 
> **REVENUE**
> 💰 Total Invoiced: $[amount]
> 💵 Total Collected: $[amount]
> ⏳ Outstanding: $[amount]
> 
> **EMPLOYERS**
> 🏢 Active Employers: [number]
> 📋 Open Job Requests: [number]
> 
> **TEAM**
> ✅ Tasks Done: [number]
> ⚠️ Blocked Tasks: [number]
> 
> **HIGHLIGHTS**
> - [Key achievement 1]
> - [Key achievement 2]
> 
> **ISSUES**
> - [Any major issues this month]
> 
> Full report in Google Sheets Dashboard.
> *COO – Kingken Global*
