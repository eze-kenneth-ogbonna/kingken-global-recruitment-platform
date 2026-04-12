# Setup Guide

A guide to setup the project environment and run the Kingken Global Recruitment Platform locally.

## Prerequisites

- Node.js (version 14.x or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/eze-kenneth-ogbonna/kingken-global-recruitment-platform.git
   cd kingken-global-recruitment-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm start
   ```
   This opens the app in your browser at `http://localhost:3000`.

## Project Structure

```
frontend/               ← All HTML pages, CSS, and JavaScript
├── index.html          ← Landing page (starting point)
├── about.html          ← About Us page
├── services.html       ← Services page
├── jobs.html           ← Browse Jobs / Apply page
├── hire.html           ← Hire Workers page (employer request form)
├── contact.html        ← Contact page
├── signup.html         ← Worker signup form → Worker Dashboard
├── worker-dashboard.html    ← Worker dashboard
├── job-details.html         ← Job detail view with Apply button
├── apply-success.html       ← Post-apply confirmation screen
├── employer-dashboard.html  ← Employer dashboard
├── post-job.html            ← Post a Job form
├── candidates.html          ← Candidate list for employers
├── admin-dashboard.html     ← Admin overview dashboard
├── admin-users.html         ← Manage Users (workers + employers)
├── admin-payments.html      ← Payments and revenue tracker
├── css/
│   └── style.css       ← Shared stylesheet
└── js/
    └── main.js         ← Shared JavaScript (navigation, tabs, etc.)
```

## User Flows (Clickable Prototype)

### Worker Flow
Landing → **Apply for Jobs** → Signup → Worker Dashboard → Job Details → **Apply Now** → Confirmation

### Employer Flow
Landing → **Hire Workers** → Hire Form → Employer Dashboard → Post Job → Candidate List

### Admin Flow
Admin Dashboard → Manage Users → Payments

## Design System

| Token       | Value     | Use             |
|-------------|-----------|-----------------|
| `--blue`    | `#1A56DB` | Primary actions |
| `--gold`    | `#D97706` | Premium accents |
| Font        | Poppins   | All text        |