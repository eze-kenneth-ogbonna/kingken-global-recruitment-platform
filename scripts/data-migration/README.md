# Data Migration Scripts

This directory contains scripts for migrating candidate and employer data into the Kingken Global platform.

## Overview

Data migration is required when:

- Importing legacy candidate records from spreadsheets or previous systems
- Bulk-loading employer contacts at onboarding
- Migrating from Phase 1 (Google Sheets) to Phase 2 (PostgreSQL database)

## Phase 1 — Google Sheets Migration

During MVP, all data lives in Google Sheets. Migration scripts here handle:

- Deduplicating imported candidate records
- Normalising phone numbers to E.164 format (+234XXXXXXXXXX)
- Validating required fields before import
- Assigning candidate IDs and status defaults

## Phase 2 — Database Migration (Planned Q3 2026)

When the platform moves to PostgreSQL, this directory will contain:

- SQL migration files (numbered sequentially, e.g., `001_create_candidates.sql`)
- Seed data scripts for staging/production environments
- Rollback scripts for every migration

## Scripts Planned

| Script | Purpose | Status |
|---|---|---|
| `import-candidates-from-sheet.gs` | Bulk import from legacy Google Sheet | 🔧 Planned |
| `deduplicate-by-phone.gs` | Remove duplicate entries by phone number | 🔧 Planned |
| `normalize-country-codes.gs` | Standardise phone numbers to E.164 | 🔧 Planned |
| `validate-required-fields.gs` | Flag records missing Name/Phone/Role | 🔧 Planned |

## Usage

All Phase 1 migration scripts are Google Apps Script (.gs) files.
Deploy them via the Google Apps Script editor bound to your master spreadsheet.

See [`docs/SETUP_GUIDE.md`](../../docs/SETUP_GUIDE.md) for step-by-step instructions.

---

_Last updated: 2026-04-09_