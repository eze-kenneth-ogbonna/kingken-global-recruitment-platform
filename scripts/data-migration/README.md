# Data Migration Scripts

This directory contains scripts for migrating, importing, and transforming data within the Kingken Global Recruitment Platform.

## Overview

Data migration scripts handle the movement of candidate and employer data between systems from legacy spreadsheets, CSV exports, or third-party platforms into the current Google Sheets database structure.

## Planned Scripts

| Script | Purpose | Status |
|---|---|---|
| import-candidates-csv.gs | Bulk import candidates from CSV into Candidates sheet | To build |
| migrate-legacy-data.gs | Transform old spreadsheet format to current schema | To build |
| export-candidates-report.gs | Export filtered candidate list to CSV for employer | To build |
| sync-placement-records.gs | Reconcile placement data across sheets | To build |

## Usage Guidelines

1. Always back up the target Google Sheet before running any migration script
2. Test on a staging sheet first, never run directly on production data
3. Log all migrations in the Audit Log sheet
4. Verify row counts before and after migration to confirm data integrity

## Data Schema Reference

All migration scripts must conform to the column structure defined in docs/GOOGLE_SHEETS_STRUCTURE.md

---

_Last updated: 2026-04-09_