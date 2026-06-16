# Integrations Layer

This directory contains third-party service integration modules for the Kingken Global Recruitment Platform.

---

## Purpose

The integrations layer connects the platform to external services required for recruitment operations, communications, identity verification, business automation, and employer/candidate workflow support. Each integration is isolated into its own module to improve maintainability and replaceability.

---

## Integration Categories

### Zoho Recruit

Candidate and recruitment workflow synchronization with Zoho Recruit.

- Scaffold: `integrations/zoho/`
- Backend implementation: `backend/src/integrations/zoho-recruit.ts`
- Admin test endpoint: `POST /admin/zoho-recruit/test-candidate`
- Go-live mode: manual sync first, automatic sync only after HTTPS, admin authentication, and legal/data-protection approval.

### Payment Gateways

Processing worker placement fees, employer subscription payments, and service charges.

- Examples: Paystack, Flutterwave, Stripe

### Email Service

Transactional emails for account verification, application status updates, and notifications.

- Provider: SMTP / future SendGrid support

### SMS Service

OTP verification, application alerts, and critical workflow notifications via SMS.

- Provider: Twilio or equivalent provider

### Identity Verification

KYC checks and identity document validation for workers and employers.

- Examples: Smile Identity, Onfido, Jumio

### Embassy & Government APIs

Possible future integration with embassy and immigration APIs for visa application tracking and work permit processing.

---

## Key Folders

```text
integrations/
├── zoho/             # Zoho Recruit client scaffolding and documentation
├── payment/          # Future payment gateway clients and transaction handlers
├── email/            # Future email service clients and template rendering
├── sms/              # Future SMS service clients and message dispatchers
├── identity/         # Future identity verification and KYC integration clients
```

---

## Security rules

- Do not commit API keys, OAuth secrets, refresh tokens, SMTP passwords, or Zoho credentials.
- Store production integration values in GitHub Secrets or the production environment.
- Use test data only until legal/data-protection approval is complete.
- Keep automatic recruitment-data push disabled until manual test sync succeeds.

---

## Related Directories

- [`backend/`](../backend/README.md) — Backend services that invoke integrations
- [`automation/`](../automation/README.md) — Automated workflows that trigger integrations
- [`docs/go-live/`](../docs/go-live/README.md) — Production readiness and go-live guidance
