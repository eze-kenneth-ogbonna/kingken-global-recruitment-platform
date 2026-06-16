# Zoho Integration Scaffold

This directory contains the lightweight Zoho integration scaffold for the KINGKEN Global Recruitment Platform.

The production backend integration for Zoho Recruit lives under `backend/src/integrations/zoho-recruit.ts` and exposes authenticated admin test-sync endpoints. This folder documents the external integration contract and provides a simple standalone client scaffold for future automation jobs.

## Purpose

The Zoho integration is intended to support controlled synchronization from KINGKEN recruitment workflows into Zoho Recruit after production approval.

Initial supported flow:

1. Candidate or staff record is validated by the KINGKEN backend.
2. Administrator runs a manual candidate test sync.
3. The platform obtains a Zoho OAuth access token using a refresh token.
4. A candidate record is created in Zoho Recruit.
5. The sync attempt is recorded in the audit log.
6. Automatic push remains disabled until test synchronization and compliance approval are complete.

## Environment variables

Configure these values through GitHub Secrets, server environment variables, or the production `.env.deploy` file. Do not commit real values.

```env
ZOHO_RECRUIT_ENABLED=false
ZOHO_ACCOUNTS_BASE_URL=https://accounts.zoho.com
ZOHO_RECRUIT_API_BASE_URL=https://recruit.zoho.com/recruit/v2
ZOHO_CLIENT_ID=
ZOHO_CLIENT_SECRET=
ZOHO_REFRESH_TOKEN=
ZOHO_CANDIDATE_MODULE=Candidates
ZOHO_JOB_OPENINGS_MODULE=Job_Openings
ZOHO_AUTO_PUSH_APPLICATIONS=false
ZOHO_SUPER_ADMIN_EMAIL=kingkenglobal@gmail.com
ZOHO_SUPER_ADMIN_USER_ID=912010524
ZOHO_SYNC_NOTIFY_EMAIL=kingkenglobal@gmail.com
```

## Go-live rule

Start with manual sync only:

```env
ZOHO_RECRUIT_ENABLED=true
ZOHO_AUTO_PUSH_APPLICATIONS=false
```

Enable automatic application push only after:

- CI passes.
- HTTPS is verified.
- Admin authentication is verified.
- Zoho test candidate sync succeeds.
- Legal/data-protection approval is recorded.

## Manual backend endpoint

Authenticated administrators can use the backend endpoint:

```text
POST /admin/zoho-recruit/test-candidate
```

Use test data only until production approval is complete.
