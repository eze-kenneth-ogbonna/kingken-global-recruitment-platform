# Zap 04 — Notify Team on New Candidate Lead

**Zap Name:** `Kingken - Notify Team on New Candidate Lead`  
**Platform:** Kingken Global Recruitment Platform  
**Company:** Kingken Global Travel Agency Ltd.  
**Status:** Production

---

## Overview

Sends an instant WhatsApp alert to the COO and a formatted HTML email to the operations inbox whenever a new candidate row with Status = "New" appears in Master Data. Ensures the team is aware of inbound leads in real time.

---

## Trigger

| Setting | Value |
|---|---|
| App | Google Sheets |
| Event | New Spreadsheet Row |
| Spreadsheet | *(Kingken Master Spreadsheet)* |
| Worksheet | **Master Data** |

---

## Filter — Only Continue if Status = "New"

| Setting | Value |
|---|---|
| App | Filter by Zapier |
| Condition | Status (column K) **exactly matches** `New` |

---

## Action 1 — WATI (Send Message to COO)

| Setting | Value |
|---|---|
| App | WATI |
| Event | Send Session Message *(or Send Template Message if outside 24-hr window)* |
| To (WhatsApp number) | `+96569048174` *(COO number — hard-coded)* |

**Message body:**

```
🔔 *New Candidate Alert!*

*ID:* {{CandidateID}}
*Name:* {{FullName}}
*Position:* {{Position}}
*Country:* {{Country}}
*Experience:* {{ExperienceYears}} years
*Passport:* {{PassportAvailable}}
*AI Score:* {{AI_Score}}

👉 Review in Master Data sheet.
```

> **Note on WATI session vs template:** If the COO regularly messages the WATI number, use a **Session Message** (free-form). If the COO is a first-time or inactive contact, you must use an approved **Template Message** named `team_new_candidate_alert`. Submit this template for Meta approval before go-live.

**Approved template content for `team_new_candidate_alert`:**

```
🔔 New Candidate Alert!

ID: {{1}}
Name: {{2}}
Position: {{3}}
Country: {{4}}
AI Score: {{5}}

Review the Master Data sheet to action this candidate.
— Kingken Global System
```

| Variable | Value |
|---|---|
| `{{1}}` | CandidateID |
| `{{2}}` | FullName |
| `{{3}}` | Position |
| `{{4}}` | Country |
| `{{5}}` | AI_Score |

---

## Action 2 — Gmail (Send Email to Operations Inbox)

| Setting | Value |
|---|---|
| App | Gmail |
| Event | Send Email |
| To | `info@kingkenglobal.com.ng` |
| From Name | Kingken Global Recruitment System |
| Subject | `New Lead: {{FullName}} – {{Position}} ({{Country}})` |
| Body Type | HTML |

**Email body (HTML):**

```html
<h2 style="color:#1a73e8;">🔔 New Candidate Lead</h2>

<table style="border-collapse:collapse; width:100%; font-family:Arial,sans-serif; font-size:14px;">
  <tr style="background:#f0f4ff;">
    <td style="padding:8px; font-weight:bold; width:40%;">Candidate ID</td>
    <td style="padding:8px;">{{CandidateID}}</td>
  </tr>
  <tr>
    <td style="padding:8px; font-weight:bold;">Full Name</td>
    <td style="padding:8px;">{{FullName}}</td>
  </tr>
  <tr style="background:#f0f4ff;">
    <td style="padding:8px; font-weight:bold;">Position Applied</td>
    <td style="padding:8px;">{{Position}}</td>
  </tr>
  <tr>
    <td style="padding:8px; font-weight:bold;">Country</td>
    <td style="padding:8px;">{{Country}}</td>
  </tr>
  <tr style="background:#f0f4ff;">
    <td style="padding:8px; font-weight:bold;">Years Experience</td>
    <td style="padding:8px;">{{ExperienceYears}}</td>
  </tr>
  <tr>
    <td style="padding:8px; font-weight:bold;">Passport Available</td>
    <td style="padding:8px;">{{PassportAvailable}}</td>
  </tr>
  <tr style="background:#f0f4ff;">
    <td style="padding:8px; font-weight:bold;">AI Score</td>
    <td style="padding:8px;"><strong>{{AI_Score}}</strong></td>
  </tr>
  <tr>
    <td style="padding:8px; font-weight:bold;">Application Date</td>
    <td style="padding:8px;">{{Timestamp}}</td>
  </tr>
</table>

<p style="margin-top:20px;">
  <a href="https://docs.google.com/spreadsheets" 
     style="background:#1a73e8; color:#fff; padding:10px 20px; text-decoration:none; border-radius:4px;">
    Open Master Data Sheet
  </a>
</p>

<p style="font-size:12px; color:#777; margin-top:30px;">
  This notification was generated automatically by the Kingken Global Recruitment Platform.<br>
  Kingken Global Travel Agency Ltd. | info@kingkenglobal.com.ng | +965 690 48174
</p>
```

---

## Testing Instructions

1. Add a test row to Master Data with Status = `New`, a valid CandidateID, FullName, Position, Country, and AI_Score.
2. In Zapier, click **Test Zap**.
3. Verify Action 1 sends a WhatsApp message to `+96569048174`.
4. Verify Action 2 sends an HTML email to `info@kingkenglobal.com.ng`.
5. Check both destinations for correct field values.
6. Delete the test row from Master Data.

---

## Common Errors and Fixes

| Error | Cause | Fix |
|---|---|---|
| WATI: `Message not sent – outside session window` | No active 24-hr conversation with COO number | Switch to a template message (`team_new_candidate_alert`) for the COO alert |
| WATI: `Invalid number` | COO number format incorrect | Ensure the number is stored as `+96569048174` (E.164 format, no spaces) |
| Gmail: `Sending limit reached` | Too many emails in short burst | Add a Zapier **Delay** step of 2 minutes before the Gmail action, or use a dedicated sending account |
| Email body shows `{{CandidateID}}` as literal text | Field mapping not connected | In the Gmail body, use the **insert field** picker to map dynamic values — don't type them manually |
| Filter blocks all rows | AI_Score empty when Zap fires (before Zap 03 runs) | Move this Zap to trigger on row **update** instead of row **creation**, so it fires after Zap 03 has written the score |
