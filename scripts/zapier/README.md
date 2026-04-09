# Zapier Automation Scripts

This directory contains Zapier workflow configurations and documentation for the Kingken Global Recruitment Platform.

## Overview

Zapier is the **automation backbone** of Phase 1 (MVP). It connects:

- **Google Forms** → Google Sheets (candidate/employer data ingestion)
- **Google Sheets** → WATI (WhatsApp notifications triggered by status changes)
- **WATI** → Google Sheets (bot response logging)
- **Google Sheets** → Email (recruiter alerts and employer updates)

## Planned Zaps

| Zap Name | Trigger | Action | Status |
|---|---|---|---|
| New Candidate Registration | Google Forms submission | Append row to Candidates sheet + send WhatsApp welcome | 🔧 To configure |
| Candidate Status Change | Google Sheets row updated (Status column) | Send WhatsApp notification via WATI | 🔧 To configure |
| New Employer Request | Google Forms submission | Append row to Employers sheet + notify recruiter | 🔧 To configure |
| Placement Confirmed | Google Sheets row updated (Placement = Confirmed) | Send confirmation WhatsApp to candidate + employer | 🔧 To configure |
| Weekly Report | Schedule (every Monday 08:00 WAT) | Email ops/WEEKLY_REVIEW_TEMPLATE.md summary to team | 🔧 To configure |
| Daily Digest | Schedule (every day 07:00 WAT) | Email ops/DAILY_CHECKLIST.md summary to recruiter | 🔧 To configure |

## How to Export and Store Zap Configs

Zapier does not natively export configs as files, but document each Zap here:

1. **Take a screenshot** of each Zap's trigger and action steps
2. **Create a markdown file** per Zap (e.g., `zap-candidate-registration.md`) describing:
   - Trigger app and event
   - Filter conditions (if any)
   - Action app and event
   - Field mappings
3. Commit the markdown files to this directory for version control

## Setup Instructions

See [`docs/AUTOMATION_GUIDE.md`](../../docs/AUTOMATION_GUIDE.md) for full Zapier setup instructions.

## Environment Variables Required

All Zapier webhooks and API keys should be stored in Zapier's built-in credential manager — **never commit real credentials here**.

Reference `.env.example` at the root for the variable names used.

---

_Last updated: 2026-04-09_