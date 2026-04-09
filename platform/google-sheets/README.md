# Google Sheets — Platform Data Layer

This directory contains documentation, templates, and configuration references for the Google Sheets infrastructure powering the Kingken Global Recruitment Platform (Phase 1 MVP).

## Overview

Google Sheets serves as the **core database** for Phase 1. It is the single source of truth for:

- Candidate records and application status
- Employer requests and job orders
- Placement tracking and commission records
- Audit logs and activity history

## Sheet Structure

See [`docs/GOOGLE_SHEETS_STRUCTURE.md`](../../docs/GOOGLE_SHEETS_STRUCTURE.md) for the full schema of every sheet tab, including column definitions, data types, and validation rules.

## Key Sheets

| Sheet Tab | Purpose |
|---|---|
| `Candidates` | All registered candidates — name, phone, skills, status, AI score |
| `Employers` | Employer contacts and job requests |
| `Placements` | Confirmed placements and commission tracking |
| `Pipeline` | Active recruitment pipeline per role |
| `Audit Log` | Automated change history (written by `audit-log-on-edit.gs`) |
| `Dashboard` | KPI summary refreshed by `dashboard-refresh.gs` |

## Automation

Google Apps Scripts bound to this spreadsheet automate:

- AI candidate scoring (`scripts/google-apps-script/ai-scoring-trigger.gs`)
- Audit logging on every edit (`scripts/google-apps-script/audit-log-on-edit.gs`)
- Dashboard data refresh (`scripts/google-apps-script/dashboard-refresh.gs`)
- Phone number normalisation (`scripts/google-apps-script/normalize-phones.gs`)
- Candidate deduplication (`scripts/google-apps-script/deduplicate-candidates.gs`)

## Access Control

- **Owner:** Kenneth Ogbonna (Platform Admin)
- **Editors:** Recruitment team leads only
- **Viewers:** Reporting stakeholders (read-only access via shared link)

Never share the master sheet with edit access outside the core team.

## Backup Policy

Export a full copy of the master sheet every Friday to Google Drive:
`Drive > Kingken Global > Backups > YYYY-MM-DD_master-sheet.xlsx`

---

_Last updated: 2026-04-09_