# Rollout Checklist

This checklist must be completed before deploying any release to production.

## Pre-Deployment

- [ ] All CI checks passing (lint, tests, validation)
- [ ] Code reviewed and approved by at least one maintainer
- [ ] Changelog / release notes updated
- [ ] Environment variables and secrets verified for target environment
- [ ] Database migrations tested in staging environment
- [ ] Feature flags configured correctly
- [ ] `APP_BASE_URL` is set to the HTTPS production URL
- [ ] `HEALTHCHECK_URL`, `FRONTEND_URL`, and `OPS_STATUS_URL` are configured where applicable

## Infrastructure

- [ ] Infrastructure changes reviewed (`infrastructure/TECH_STACK.md` up to date)
- [ ] Cloud resources provisioned and health-checked
- [ ] VPS has Docker Engine and Docker Compose installed
- [ ] Production deployment path exists: `~/kingken`
- [ ] CDN / DNS changes propagated, if applicable
- [ ] DNS for `kingkenglobal.com.ng` and `www.kingkenglobal.com.ng` points to the production VPS
- [ ] SSL/TLS certificates valid and not expiring soon
- [ ] HTTPS enforced for all public traffic

## Security

- [ ] Dependency audit run (`npm audit` / `pip audit` or equivalent)
- [ ] No hardcoded secrets or credentials in codebase
- [ ] Authentication and authorization flows tested
- [ ] Administrator MFA enabled before live recruitment intake
- [ ] Audit logging verified for authentication, records, files, reports, and integrations
- [ ] File upload controls verified before accepting CV, passport, certificate, contract, or employer documents
- [ ] Malware scanning enabled before production document intake
- [ ] Scheduled encrypted backups enabled and restore-tested
- [ ] GDPR / data compliance checks passed for African talent and global employer data
- [ ] Legal/data-protection approval recorded before storing real candidate, employer, passport, CV, or contract data

## Zoho Recruit Integration

- [ ] Zoho OAuth client created and approved
- [ ] `ZOHO_CLIENT_ID`, `ZOHO_CLIENT_SECRET`, and `ZOHO_REFRESH_TOKEN` configured as production secrets
- [ ] `ZOHO_RECRUIT_ENABLED=true` set only after credentials are ready
- [ ] `ZOHO_AUTO_PUSH_APPLICATIONS=false` for initial go-live
- [ ] Super administrator email verified as `kingkenglobal@gmail.com`
- [ ] Super administrator user ID verified as `912010524`
- [ ] Manual candidate test sync passed using test data only
- [ ] Zoho sync audit log entry verified
- [ ] Automatic push enabled only after management and compliance approval

## Testing

- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] Smoke tests run against staging
- [ ] Cross-region functionality verified (African ↔ global connectivity)
- [ ] Server-side form validation verified
- [ ] Privacy notice acceptance verified before personal-data intake
- [ ] Email notification delivery verified

## Deployment

- [ ] Deployment plan documented and communicated to team
- [ ] Rollback plan defined and tested
- [ ] Deployment window scheduled (low-traffic period preferred)
- [ ] Monitoring and alerting configured
- [ ] CD workflow completed successfully
- [ ] Production verification workflow completed successfully

## Post-Deployment

- [ ] Application health checks passing
- [ ] Public HTTPS home page verified
- [ ] Public HTTPS health endpoint verified
- [ ] Public ops status endpoint verified, if enabled
- [ ] Admin login tested
- [ ] My Account page tested
- [ ] Key user flows verified in production
- [ ] Candidate application form tested with test data
- [ ] Employer request form tested with test data
- [ ] Zoho manual candidate sync tested with test data
- [ ] Logs and error rates reviewed
- [ ] Backup job completed after deployment
- [ ] Team notified of successful rollout
- [ ] Rollout tagged in version control
- [ ] Production intake enabled only after legal/data-protection approval

---

_Last updated: 2026-04-14_
