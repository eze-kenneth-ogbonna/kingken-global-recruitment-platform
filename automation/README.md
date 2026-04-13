# Automation Layer

This directory contains background jobs, cron tasks, and AI-powered matching automation for the Kingken Global Recruitment Platform.

---

## 🎯 Purpose

The automation layer handles all asynchronous, scheduled, and background processing tasks. This includes AI-driven job matching, automated communication campaigns, document processing pipelines, and periodic data maintenance jobs. It enables the platform to scale operations without manual intervention.

---

## ⚙️ Automation Categories

### 🤖 AI Job Matching
Scheduled jobs that analyze worker profiles against active job listings and produce match scores, enabling employers to be surfaced the most relevant candidates automatically.

### 📬 Automated Email Campaigns
Triggered and scheduled email workflows for onboarding sequences, application status updates, re-engagement campaigns, and employer follow-ups.

### 📄 Document Processing
Background processing of uploaded worker identity documents, including OCR extraction, verification status updates, and flagging for manual review.

### 🔄 Data Maintenance
Periodic jobs for archiving expired listings, recalculating match scores, syncing external employer data, and cleaning up stale sessions.

---

## 🏗 Key Folders

```
automation/
├── jobs/             # Individual background job definitions and handlers
├── cron/             # Scheduled cron task configurations and runners
├── queues/           # Message queue producers and consumers (e.g., Bull/BullMQ)
```

---

## 🛠 Tech Stack

| Technology | Role |
|---|---|
| BullMQ | Redis-backed job queues for background processing |
| node-cron | Cron-style task scheduling |
| Redis | Queue broker and caching layer |
| OpenAI / custom ML | AI scoring for job matching |

---

## 🔗 Related Directories

- [`backend/`](../backend/README.md) — Triggers and consumes automation jobs
- [`integrations/`](../integrations/README.md) — Integration clients invoked by automation jobs
- [`infrastructure/`](../infrastructure/README.md) — Queue and worker infrastructure provisioning
