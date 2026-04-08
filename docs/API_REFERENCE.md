# Kingken Global Recruitment Platform — API Reference

> **Company:** Kingken Global Travel Agency Ltd
> **Website:** https://www.kingkenglobal.com.ng | **Email:** info@kingkenglobal.com.ng
> **Version:** Phase 2 (Future Implementation)
> **Base URL:** `https://api.kingkenglobal.com.ng/v1`

---

## Overview

This document defines the RESTful API for the Kingken Global Recruitment Platform (Phase 2). The API enables programmatic access to candidate, employer, job, pipeline, deal, and dashboard data.

**Protocol:** HTTPS only
**Format:** JSON request and response bodies
**Authentication:** Bearer token (JWT)
**Rate Limit:** 100 requests per minute per API key
**Versioning:** URL-based (`/v1/`)

---

## Authentication

### Token-Based Authentication (JWT)

All protected endpoints require a valid JWT token in the `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

Tokens expire after **24 hours**. Use the refresh endpoint or re-authenticate.

### Roles and Permissions

| Role | API Access Level |
|------|----------------|
| `admin` | Full access to all endpoints |
| `coo` | Full read/write access; cannot delete |
| `recruiter` | Read/write on candidates and pipeline; read-only on employers and deals |
| `employer` | Read own jobs and candidates submitted to them only |
| `worker` | Read own profile and application status only |

---

## Error Codes

| HTTP Code | Code | Message | Description |
|-----------|------|---------|-------------|
| 400 | `VALIDATION_ERROR` | Validation failed | Missing or invalid request fields |
| 401 | `UNAUTHORIZED` | Authentication required | Missing or expired token |
| 403 | `FORBIDDEN` | Access denied | Role lacks permission for this action |
| 404 | `NOT_FOUND` | Resource not found | ID does not exist |
| 409 | `CONFLICT` | Duplicate entry | Record already exists |
| 422 | `UNPROCESSABLE` | Cannot process entity | Business logic violation |
| 429 | `RATE_LIMITED` | Too many requests | Exceeded 100 req/min |
| 500 | `INTERNAL_ERROR` | Internal server error | Unexpected server error |

### Standard Error Response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      { "field": "phone", "message": "Phone number must include country code" }
    ]
  },
  "timestamp": "2024-01-15T09:32:00Z"
}
```

---

## Pagination

All list endpoints support cursor-based pagination:

**Request parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `limit` | integer | 20 | Results per page (max 100) |
| `sort` | string | `created_at` | Field to sort by |
| `order` | string | `desc` | Sort direction: `asc` or `desc` |

**Response pagination object:**

```json
{
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 247,
    "total_pages": 13,
    "has_next": true,
    "has_prev": false
  }
}
```

---

## Authentication Endpoints

### POST /api/auth/register

Register a new user account on the platform.

**Authentication required:** No
**Rate limit:** 10 per hour per IP

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "role": "worker",
  "full_name": "Amara Osei",
  "phone": "+2348012345678",
  "country": "Nigeria"
}
```

**Request Fields:**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `email` | string | Yes | Valid email format |
| `password` | string | Yes | Min 8 chars, 1 uppercase, 1 number |
| `role` | string | Yes | `worker`, `employer`, `recruiter` |
| `full_name` | string | Yes | 2–100 characters |
| `phone` | string | Yes | E.164 format with country code |
| `country` | string | Yes | Country name or ISO code |

**Success Response (201 Created):**

```json
{
  "success": true,
  "data": {
    "user_id": "usr_abc123",
    "email": "user@example.com",
    "role": "worker",
    "full_name": "Amara Osei",
    "created_at": "2024-01-15T09:32:00Z"
  },
  "message": "Account created successfully. Please verify your email."
}
```

---

### POST /api/auth/login

Authenticate a user and receive a JWT access token.

**Authentication required:** No

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Success Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "Bearer",
    "expires_in": 86400,
    "expires_at": "2024-01-16T09:32:00Z",
    "user": {
      "user_id": "usr_abc123",
      "email": "user@example.com",
      "role": "worker",
      "full_name": "Amara Osei"
    }
  }
}
```

**Error Response (401):**

```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid email or password"
  }
}
```

---

### POST /api/auth/logout

Invalidate the current JWT token (server-side blacklist).

**Authentication required:** Yes

**Request Body:** None required

**Success Response (200 OK):**

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## Candidate Endpoints

### GET /api/candidates

List all candidates with optional filtering and pagination.

**Authentication required:** Yes (roles: `admin`, `coo`, `recruiter`)

**Query Parameters:**

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `status` | string | Filter by status | `Approved` |
| `country` | string | Filter by country of origin | `Nigeria` |
| `position` | string | Filter by position | `Domestic+Worker` |
| `ai_score_min` | integer | Minimum AI score | `60` |
| `ai_score_max` | integer | Maximum AI score | `100` |
| `recruiter` | string | Filter by assigned recruiter | `Sarah+O.` |
| `page` | integer | Page number | `1` |
| `limit` | integer | Results per page | `20` |

**Request Example:**

```
GET /api/candidates?status=Approved&country=Nigeria&ai_score_min=70&page=1&limit=20
Authorization: Bearer eyJhbGci...
```

**Success Response (200 OK):**

```json
{
  "success": true,
  "data": [
    {
      "candidate_id": "CAND-0001",
      "full_name": "Amara Osei",
      "phone": "+2348012345678",
      "country": "Nigeria",
      "position": "Domestic Worker",
      "experience": "3-5 years",
      "passport": "Yes - Valid",
      "cv_link": "https://drive.google.com/file/d/...",
      "status": "Approved",
      "ai_score": 78,
      "ai_summary": "Experienced domestic worker with valid passport.",
      "recruiter": "Sarah O.",
      "created_at": "2024-01-15T09:32:00Z",
      "updated_at": "2024-01-16T14:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 247,
    "total_pages": 13,
    "has_next": true,
    "has_prev": false
  }
}
```

---

### POST /api/candidates

Register a new candidate.

**Authentication required:** No (public) or Yes (for admin submission)

**Request Body:**

```json
{
  "full_name": "Amara Osei",
  "phone": "+2348012345678",
  "email": "amara@example.com",
  "country": "Nigeria",
  "position": "Domestic Worker",
  "experience": "3-5 years",
  "passport": "Yes - Valid",
  "cv_link": "https://drive.google.com/file/d/...",
  "source": "google_form"
}
```

**Success Response (201 Created):**

```json
{
  "success": true,
  "data": {
    "candidate_id": "CAND-0248",
    "status": "New",
    "message": "Application received. AI screening will complete within 2 minutes.",
    "created_at": "2024-01-15T09:32:00Z"
  }
}
```

---

### GET /api/candidates/:id

Get full details of a single candidate by CandidateID.

**Authentication required:** Yes

**Path Parameters:** `id` — CandidateID (e.g., `CAND-0001`)

**Request Example:**

```
GET /api/candidates/CAND-0001
Authorization: Bearer eyJhbGci...
```

**Success Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "candidate_id": "CAND-0001",
    "full_name": "Amara Osei",
    "phone": "+2348012345678",
    "email": "amara@example.com",
    "country": "Nigeria",
    "position": "Domestic Worker",
    "experience": "3-5 years",
    "passport": "Yes - Valid",
    "cv_link": "https://drive.google.com/file/d/...",
    "status": "Approved",
    "ai_score": 78,
    "ai_summary": "Strong candidate with relevant experience.",
    "ai_details": {
      "strengths": ["3-5 years domestic work experience", "Valid passport"],
      "weaknesses": ["No formal training certificate"],
      "recommendation": "Approve"
    },
    "recruiter": "Sarah O.",
    "notes": "Passed phone screening. Collecting documents.",
    "created_at": "2024-01-15T09:32:00Z",
    "updated_at": "2024-01-16T14:00:00Z",
    "pipeline": [
      {
        "stage": "New",
        "date": "2024-01-15"
      },
      {
        "stage": "Screened",
        "date": "2024-01-16"
      }
    ]
  }
}
```

---

### PUT /api/candidates/:id

Update an existing candidate record.

**Authentication required:** Yes (roles: `admin`, `coo`, `recruiter`)

**Request Body (partial update supported):**

```json
{
  "status": "Processing",
  "recruiter": "Sarah O.",
  "notes": "Passport copy received. Waiting for medical."
}
```

**Success Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "candidate_id": "CAND-0001",
    "status": "Processing",
    "updated_at": "2024-01-17T10:00:00Z"
  },
  "message": "Candidate record updated successfully"
}
```

---

### DELETE /api/candidates/:id

Soft-delete (archive) a candidate. Record is retained but marked as archived.

**Authentication required:** Yes (roles: `admin`, `coo` only)

**Success Response (200 OK):**

```json
{
  "success": true,
  "message": "Candidate CAND-0001 has been archived"
}
```

---

## Employer Endpoints

### GET /api/employers

List all employer records.

**Authentication required:** Yes (roles: `admin`, `coo`)

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | Filter by status (Lead, Active, Closed) |
| `country` | string | Filter by employer country |

**Success Response (200 OK):**

```json
{
  "success": true,
  "data": [
    {
      "employer_id": "EMP-0001",
      "company_name": "Al Noor Services LLC",
      "contact_person": "Mohammed Al-Rashid",
      "whatsapp": "+96512345678",
      "country": "Kuwait",
      "position_needed": "Domestic Worker",
      "workers_required": "6-10",
      "status": "Active",
      "coo_assigned": "James K.",
      "created_at": "2024-01-14T11:00:00Z"
    }
  ],
  "pagination": { "page": 1, "limit": 20, "total": 18 }
}
```

---

### POST /api/employers

Register a new employer.

**Authentication required:** No (public registration) or Yes

**Request Body:**

```json
{
  "company_name": "Al Noor Services LLC",
  "contact_person": "Mohammed Al-Rashid",
  "whatsapp": "+96512345678",
  "country": "Kuwait",
  "position_needed": "Domestic Worker",
  "workers_required": "6-10",
  "salary_budget": 400,
  "start_date": "2024-03-01",
  "source": "employer_form"
}
```

**Success Response (201 Created):**

```json
{
  "success": true,
  "data": {
    "employer_id": "EMP-0019",
    "status": "Lead",
    "message": "Registration received. Our COO will contact you within 24 hours.",
    "created_at": "2024-01-15T11:00:00Z"
  }
}
```

---

### GET /api/employers/:id

Get details of a specific employer.

**Success Response:** Full employer object including notes, job requests linked, and deal history.

---

### PUT /api/employers/:id

Update employer record (status, notes, COO assigned).

**Success Response:** Updated employer object.

---

## Job Endpoints

### POST /api/jobs

Post a new job request.

**Authentication required:** Yes (roles: `admin`, `coo`)

**Request Body:**

```json
{
  "employer_id": "EMP-0001",
  "job_title": "Live-In Domestic Worker",
  "country": "Kuwait",
  "workers_needed": 5,
  "nationality_pref": "Nigerian",
  "salary": 380,
  "start_date": "2024-03-15",
  "notes": "Must speak basic English"
}
```

**Success Response (201 Created):**

```json
{
  "success": true,
  "data": {
    "job_id": "JOB-0013",
    "status": "Open",
    "employer_id": "EMP-0001",
    "created_at": "2024-01-15T12:00:00Z"
  }
}
```

---

### GET /api/jobs

List job requests with filters.

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | Open, Matching, Filled, Closed |
| `country` | string | Destination country |
| `position` | string | Job title keyword |

**Success Response:** Array of job objects with pagination.

---

### GET /api/jobs/:id

Get full details of a job request including matched candidates.

**Success Response:** Full job object including `matched_candidates` array.

---

### GET /api/jobs/match

AI-powered job-candidate matching endpoint. Returns ranked candidates for a given job.

**Authentication required:** Yes (roles: `admin`, `coo`, `recruiter`)

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `job_id` | string | Yes | JobID to match against |
| `limit` | integer | No | Number of matches to return (default 5) |
| `min_score` | integer | No | Minimum AI score threshold (default 60) |

**Request Example:**

```
GET /api/jobs/match?job_id=JOB-0013&limit=5&min_score=65
Authorization: Bearer eyJhbGci...
```

**Success Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "job_id": "JOB-0013",
    "job_title": "Live-In Domestic Worker",
    "country": "Kuwait",
    "matches": [
      {
        "rank": 1,
        "candidate_id": "CAND-0001",
        "full_name": "Amara Osei",
        "country": "Nigeria",
        "ai_score": 78,
        "match_score": 92,
        "match_reason": "Strong domestic work experience. Nigerian nationality preferred by employer. Valid passport ready.",
        "status": "Approved"
      },
      {
        "rank": 2,
        "candidate_id": "CAND-0007",
        "full_name": "Grace Nkemdirim",
        "country": "Nigeria",
        "ai_score": 82,
        "match_score": 89,
        "match_reason": "Excellent experience and high AI score. Minor concern: only 1 reference provided.",
        "status": "Approved"
      }
    ],
    "total_matches": 5,
    "processing_time_ms": 1240
  }
}
```

---

## Pipeline Endpoints

### GET /api/pipeline

Get all pipeline entries with optional filters.

**Authentication required:** Yes

**Query Parameters:**

| Parameter | Description |
|-----------|-------------|
| `stage` | Filter by pipeline stage |
| `recruiter` | Filter by recruiter name |
| `job_id` | Filter by specific job |

**Success Response:** Array of pipeline entries with pagination.

---

### PUT /api/pipeline/:id

Update a pipeline entry's stage and notes.

**Authentication required:** Yes (roles: `admin`, `coo`, `recruiter`)

**Request Body:**

```json
{
  "stage": "Visa Applied",
  "notes": "Visa submitted to Kuwait embassy on 15/01/2024",
  "next_action": "Wait for embassy decision",
  "next_action_date": "2024-02-28"
}
```

**Success Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "pipeline_id": "PIPE-0001",
    "candidate_id": "CAND-0001",
    "job_id": "JOB-0013",
    "stage": "Visa Applied",
    "stage_date": "2024-01-15",
    "updated_at": "2024-01-15T14:00:00Z"
  }
}
```

---

## Deal Endpoints

### GET /api/deals

List all deals.

**Authentication required:** Yes (roles: `admin`, `coo`)

**Query Parameters:** `status`, `employer_id`, `payment_status`

**Success Response:** Array of deal objects with pagination.

---

### POST /api/deals

Create a new placement deal.

**Authentication required:** Yes (roles: `admin`, `coo`)

**Request Body:**

```json
{
  "employer_id": "EMP-0001",
  "candidate_id": "CAND-0001",
  "job_id": "JOB-0013",
  "service_fee": 1500,
  "notes": "50% upfront agreed"
}
```

**Success Response (201 Created):**

```json
{
  "success": true,
  "data": {
    "deal_id": "DEAL-0016",
    "status": "Open",
    "service_fee": 1500,
    "amount_paid": 0,
    "amount_due": 1500,
    "payment_status": "Open",
    "created_at": "2024-01-15T15:00:00Z"
  }
}
```

---

### PUT /api/deals/:id/payment

Record a payment received against a deal.

**Authentication required:** Yes (roles: `admin`, `coo`)

**Request Body:**

```json
{
  "amount_paid": 750,
  "payment_date": "2024-02-15",
  "payment_method": "Bank Transfer",
  "reference": "TXN-20240215-001",
  "notes": "First installment received"
}
```

**Success Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "deal_id": "DEAL-0016",
    "service_fee": 1500,
    "amount_paid": 750,
    "amount_due": 750,
    "payment_status": "Partial",
    "updated_at": "2024-02-15T10:00:00Z"
  },
  "message": "Payment of $750 recorded. Remaining balance: $750"
}
```

---

## Dashboard Endpoint

### GET /api/dashboard

Retrieve all KPI metrics in a single request. Used to populate the admin dashboard.

**Authentication required:** Yes (roles: `admin`, `coo`, `recruiter`)

**Request Example:**

```
GET /api/dashboard
Authorization: Bearer eyJhbGci...
```

**Success Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "candidates": {
      "total": 247,
      "new": 18,
      "screened": 42,
      "approved": 35,
      "processing": 15,
      "visa_applied": 8,
      "deployed": 22,
      "complete": 87,
      "rejected": 20,
      "average_ai_score": 73.4
    },
    "employers": {
      "total": 18,
      "lead": 3,
      "contacted": 4,
      "active": 8,
      "closed": 3
    },
    "jobs": {
      "open": 12,
      "matching": 5,
      "filled": 6,
      "closed": 8
    },
    "deals": {
      "total": 34,
      "total_service_fees_usd": 28500,
      "total_collected_usd": 19750,
      "outstanding_balance_usd": 8750,
      "payment_conversion_rate": 0.71
    },
    "generated_at": "2024-01-15T16:00:00Z",
    "period": "all_time"
  }
}
```

---

## Rate Limiting

| Tier | Requests/Minute | Requests/Hour |
|------|----------------|---------------|
| Public (unauthenticated) | 10 | 100 |
| Standard (authenticated) | 100 | 2,000 |
| Admin | 500 | 10,000 |

**Rate limit headers in response:**

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1705322460
```

**When exceeded (429):**

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMITED",
    "message": "Rate limit exceeded. Please wait 60 seconds.",
    "retry_after": 60
  }
}
```

---

## Webhook Events (Future)

The API will support outbound webhooks for real-time event notifications:

| Event | Trigger |
|-------|---------|
| `candidate.created` | New candidate registered |
| `candidate.scored` | AI scoring completed |
| `candidate.status_changed` | Status updated |
| `employer.registered` | New employer submitted form |
| `deal.payment_received` | Payment recorded on a deal |
| `pipeline.stage_changed` | Candidate moves to new pipeline stage |

---

## SDK and Integration Notes

### JavaScript / Node.js Example

```javascript
const axios = require('axios');

const API_BASE = 'https://api.kingkenglobal.com.ng/v1';
const token = 'your_jwt_token_here';

async function getCandidates(status = 'Approved') {
  const response = await axios.get(`${API_BASE}/candidates`, {
    params: { status, limit: 20 },
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}

async function updateCandidateStatus(candidateId, newStatus, notes) {
  const response = await axios.put(
    `${API_BASE}/candidates/${candidateId}`,
    { status: newStatus, notes },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
}
```

### Python Example

```python
import requests

API_BASE = 'https://api.kingkenglobal.com.ng/v1'
headers = {'Authorization': 'Bearer your_jwt_token_here'}

def get_dashboard():
    response = requests.get(f'{API_BASE}/dashboard', headers=headers)
    response.raise_for_status()
    return response.json()['data']

def create_candidate(candidate_data):
    response = requests.post(
        f'{API_BASE}/candidates',
        json=candidate_data,
        headers=headers
    )
    response.raise_for_status()
    return response.json()['data']
```

---

*This API is planned for Phase 2 implementation. Current MVP uses Google Sheets + Zapier automation.*
*Maintained by: Head of Tech | Contact: info@kingkenglobal.com.ng | https://www.kingkenglobal.com.ng*
