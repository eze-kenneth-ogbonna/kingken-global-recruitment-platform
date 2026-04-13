# API Layer

This directory contains the API gateway configuration and route definitions for the Kingken Global Recruitment Platform.

---

## 🎯 Purpose

The API layer serves as the single entry point for all client requests. It defines RESTful endpoints, manages request routing to the appropriate backend services, handles versioning, and documents available resources for both internal services and external consumers.

---

## 📐 Versioning Strategy

All API routes are versioned under `/api/v1/` to ensure backward compatibility as the platform evolves.

```
https://api.kingkenglobal.com.ng/api/v1/
```

Future GraphQL endpoints will be served at:

```
https://api.kingkenglobal.com.ng/graphql
```

---

## 🗂 Key Resource Groups

| Route Prefix | Description |
|---|---|
| `/api/v1/auth` | Authentication — login, register, refresh tokens, logout |
| `/api/v1/jobs` | Job listings — create, search, filter, apply |
| `/api/v1/workers` | Worker profiles — registration, documents, skills, availability |
| `/api/v1/employers` | Employer profiles — verification, job postings, applicant management |
| `/api/v1/applications` | Application lifecycle — submit, review, approve, reject |

---

## 🔒 Authentication

All protected routes require a valid JWT Bearer token in the `Authorization` header:

```
Authorization: Bearer <token>
```

Public routes (such as `/api/v1/auth/login` and `/api/v1/auth/register`) do not require authentication.

---

## 🛠 Tech Stack

| Technology | Role |
|---|---|
| Express.js | HTTP routing and middleware |
| OpenAPI / Swagger | API documentation and schema definitions |
| JWT | Request authentication |
| Rate Limiting | Abuse prevention (express-rate-limit) |

---

## 🔗 Related Directories

- [`backend/`](../backend/README.md) — Service layer that processes API requests
- [`security/`](../security/README.md) — Authentication and authorization policies
