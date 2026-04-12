# Integrations Layer

This directory contains all third-party service integration modules for the Kingken Global Recruitment Platform.

---

## 🎯 Purpose

The integrations layer connects the platform to external services required for payments, communications, identity verification, and embassy/government API interactions. Each integration is isolated into its own module to ensure maintainability and replaceability.

---

## 🔌 Integration Categories

### 💳 Payment Gateways
Processing worker placement fees, employer subscription payments, and service charges.
- Examples: Paystack, Flutterwave, Stripe

### 📧 Email Service
Transactional emails for account verification, application status updates, and notifications.
- Provider: SendGrid

### 📱 SMS Service
OTP verification, application alerts, and critical workflow notifications via SMS.
- Provider: Twilio

### 🪪 Identity Verification
KYC (Know Your Customer) checks and identity document validation for workers and employers.
- Examples: Smile Identity, Onfido, Jumio

### 🏛 Embassy & Government APIs
Integration with embassy and immigration APIs for visa application tracking and work permit processing.

---

## 🏗 Key Folders

```
integrations/
├── payment/          # Payment gateway clients and transaction handlers
├── email/            # Email service clients and template rendering
├── sms/              # SMS service clients and message dispatchers
├── identity/         # Identity verification and KYC integration clients
```

---

## 🛠 Tech Stack

| Technology | Role |
|---|---|
| Axios | HTTP client for outbound API calls |
| Node.js | Runtime for integration service modules |
| SendGrid SDK | Email delivery |
| Twilio SDK | SMS messaging |

---

## 🔗 Related Directories

- [`backend/`](../backend/README.md) — Backend services that invoke integrations
- [`automation/`](../automation/README.md) — Automated workflows that trigger integrations
