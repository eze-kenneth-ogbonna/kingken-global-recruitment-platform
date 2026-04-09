# Rollout Checklist

This checklist must be completed before deploying any release to production.

## Pre-Deployment

- [ ] All CI checks passing (lint, tests, validation)
- [ ] Code reviewed and approved by at least one maintainer
- [ ] Changelog / release notes updated
- [ ] Environment variables and secrets verified for target environment
- [ ] Database migrations tested in staging environment
- [ ] Feature flags configured correctly

## Infrastructure

- [ ] Infrastructure changes reviewed (`infrastructure/TECH_STACK.md` up to date)
- [ ] Cloud resources provisioned and health-checked
- [ ] CDN / DNS changes propagated (if applicable)
- [ ] SSL/TLS certificates valid and not expiring soon

## Security

- [ ] Dependency audit run (`npm audit` / `pip audit` or equivalent)
- [ ] No hardcoded secrets or credentials in codebase
- [ ] Authentication and authorization flows tested
- [ ] GDPR / data compliance checks passed (critical for African talent ↔ global employer data)

## Testing

- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] Smoke tests run against staging
- [ ] Cross-region functionality verified (African ↔ global connectivity)

## Deployment

- [ ] Deployment plan documented and communicated to team
- [ ] Rollback plan defined and tested
- [ ] Deployment window scheduled (low-traffic period preferred)
- [ ] Monitoring and alerting configured

## Post-Deployment

- [ ] Application health checks passing
- [ ] Key user flows verified in production
- [ ] Logs and error rates reviewed
- [ ] Team notified of successful rollout
- [ ] Rollout tagged in version control

---

_Last updated: 2026-04-09_