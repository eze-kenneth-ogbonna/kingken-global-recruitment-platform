# Zap 02 — Auto Reply to Worker on Application

**Zap Name:** `Kingken - Auto Reply to Worker on Application`  
**Platform:** Kingken Global Recruitment Platform  
**Company:** Kingken Global Travel Agency Ltd.  
**Status:** Production

---

## Overview

Automatically sends an acknowledgement email (via Gmail) and a WhatsApp confirmation (via WATI) to every new candidate whose row lands in Master Data with Status = "New". This ensures candidates feel informed within minutes of applying.

---

## Trigger

| Setting | Value |
|---|---|
| App | Google Sheets |
| Event | New Spreadsheet Row |
| Spreadsheet | *(Kingken Master Spreadsheet)* |
| Worksheet | **Master Data** |

**Setup steps:**
1. Select **Google Sheets → New Spreadsheet Row**.
2. Connect your Google account.
3. Select the Master Spreadsheet and **Master Data** worksheet.
4. Test trigger — Zapier pulls the most recent row.

---

## Filter — Only Continue if Status = "New"

| Setting | Value |
|---|---|
| App | Filter by Zapier |
| Condition | Status (column K) **exactly matches** `New` (case-sensitive) |

This prevents auto-replies firing for rows updated to "Screened", "Approved", etc.

---

## Action 1 — Gmail (Send Email)

| Setting | Value |
|---|---|
| App | Gmail |
| Event | Send Email |

**Email fields:**

| Field | Value |
|---|---|
| To | *(leave blank if no email collected — skip this action if no email column)* |
| From Name | Kingken Global Travel Agency Ltd. |
| Subject | `Application Received – Kingken Global Recruitment` |
| Body Type | HTML |

**Email body (HTML):**

```html
<p>Dear <strong>{{FullName}}</strong>,</p>

<p>Thank you for submitting your application to <strong>Kingken Global Travel Agency Ltd.</strong> We have received your interest in the position of <strong>{{Position}}</strong> and are excited to begin the review process.</p>

<h3>What Happens Next</h3>
<ol>
  <li><strong>AI Screening (within 24 hours):</strong> Your application will be processed by our automated screening system, which evaluates your experience and qualifications.</li>
  <li><strong>Recruiter Review (within 3 business days):</strong> One of our recruitment officers will personally review your profile and contact you if you meet the criteria for the role.</li>
  <li><strong>Interview / Verification:</strong> Qualified candidates will be contacted to schedule a screening interview and document verification.</li>
</ol>

<h3>What to Prepare</h3>
<ul>
  <li>A clear scanned copy of your <strong>international passport</strong> (if available).</li>
  <li>An updated <strong>CV / Resume</strong> (1–2 pages).</li>
  <li>Any relevant <strong>certificates or references</strong>.</li>
</ul>

<h3>Contact Us</h3>
<p>If you have any questions, please reach us via:</p>
<ul>
  <li>📧 Email: <a href="mailto:info@kingkenglobal.com.ng">info@kingkenglobal.com.ng</a></li>
  <li>📱 WhatsApp: +965 690 48174</li>
  <li>🌐 Website: www.kingkenglobal.com.ng</li>
</ul>

<p>We look forward to supporting your journey to a better career abroad.</p>

<p>Warm regards,<br>
<strong>Kingken Global Travel Agency Ltd.</strong><br>
International Recruitment Division<br>
Kuwait · UAE · Qatar · Saudi Arabia</p>
```

---

## Action 2 — WATI (Send Template Message)

| Setting | Value |
|---|---|
| App | WATI |
| Event | Send Template Message |

**WATI fields:**

| Field | Value |
|---|---|
| To (WhatsApp number) | `{{Phone}}` (from Master Data column D — must be in E.164 format, e.g. `+2348012345678`) |
| Template Name | `worker_confirmation` |
| Broadcast Name | `auto_reply_new_application_{{CandidateID}}` |

**Template variables (mapped in WATI dashboard):**

| Variable | Value |
|---|---|
| `{{1}}` — Candidate name | `{{FullName}}` |
| `{{2}}` — Position applied for | `{{Position}}` |
| `{{3}}` — Response time | `3 business days` |

**Pre-approved WATI template content** (submit this in WATI for approval):

```
Hello {{1}}, 

Thank you for applying for the *{{2}}* position with Kingken Global Travel Agency Ltd. 🌍

Your application has been received and is under review. Our team will contact you within *{{3}}* if you qualify.

Please have your passport copy and CV ready.

For enquiries, WhatsApp us at +965 690 48174.

— Kingken Global Team
```

> ℹ️ WATI only allows sending template messages to users who have not previously messaged you (24-hour window rule). Ensure the `worker_confirmation` template is **approved by Meta** before activating this Zap.

---

## Testing Instructions

1. Manually add a test row to Master Data with:
   - Status = `New`
   - FullName = `Test Candidate`
   - Phone = your own WhatsApp number (in E.164 format)
   - Position = `Driver`
2. In Zapier, click **Test Zap**.
3. Verify the email action shows green.
4. Check your WhatsApp for the template message.
5. Check your email inbox (if email column is populated).
6. Delete the test row from Master Data.

---

## Common Errors and Fixes

| Error | Cause | Fix |
|---|---|---|
| WATI: `Invalid phone number format` | Phone stored without `+` prefix | Run `normalizeAllPhones()` in Apps Script before activating this Zap to ensure E.164 format |
| WATI: `Template not found` | Template name mismatch | In WATI dashboard, confirm the template name is exactly `worker_confirmation` (lowercase, underscore) |
| WATI: `Template not approved` | Meta approval pending | Submit the template in WATI → Templates → Add and wait 24–48 hrs for Meta approval |
| Gmail: `No recipients` | No email address in sheet | Add an Email column to Master Data. If not collecting email via form, remove the Gmail action entirely |
| Filter not stopping old rows | Trigger pulling non-"New" rows | Double-check the Filter condition is set to **exactly matches** (not **contains**) |
| Zap fires on every existing row | Zap turned on with backlog of rows | Turn the Zap on only after test rows are cleared. Use Zapier's "Skip existing rows" option when first enabling |
