# Security Layer

This directory contains authentication policies, authorization rules, and compliance configurations for the Kingken Global Recruitment Platform.

---

## 🎯 Purpose

The security layer defines and enforces the platform's security model, covering how users are authenticated, what actions each role is permitted to perform, and how the platform meets its data protection and compliance obligations. Security controls apply across all layers of the application.

---

## 🔐 Security Model

### Authentication
All users authenticate via JWT (JSON Web Tokens). Upon successful login, the server issues a signed access token and a refresh token.

- Access tokens are short-lived (15 minutes)
- Refresh tokens are long-lived (7 days) and rotated on use
- Tokens are signed using RS256 asymmetric keys

### Role-Based Access Control (RBAC)
The platform enforces RBAC with the following roles:

| Role | Description |
|---|---|
| `worker` | Registered job seeker — can view jobs, apply, manage their own profile |
| `employer` | Verified hiring organization — can post jobs, review applicants, issue contracts |
| `admin` | Platform administrator — full access to all resources and user management |
| `compliance_officer` | Read-only access to audit logs and compliance reports |

### Data Encryption
- Passwords are hashed using bcrypt (minimum 12 salt rounds)
- Sensitive fields (e.g., passport numbers, document data) are encrypted at rest using AES-256
- All data in transit is encrypted via TLS 1.2+

### GDPR Compliance
The platform handles personal data of workers from Africa destined for international employment, requiring strict adherence to GDPR and local data protection regulations:

- Data minimization: only required data is collected
- Right to erasure: workers can request account and data deletion
- Data processing agreements in place with all third-party integrations
- Audit logs maintained for all data access and modification events

---

## 🏗 Key Folders

```
security/
├── auth/             # Authentication logic — token generation, validation, refresh
├── rbac/             # Role definitions, permission matrices, and access guards
├── compliance/       # GDPR policies, audit log schemas, and data retention rules
```

---

## 🔗 Related Directories

- [`backend/`](../backend/README.md) — Applies security middleware to all API requests
- [`api/`](../api/README.md) — Route-level authorization rules
- [`infrastructure/`](../infrastructure/README.md) — Network security, TLS, and secrets management
