# Kingken Global — Technology Stack

Complete tech stack documentation for all 3 phases.

## Phase 1 — MVP (Current, 2026)

| Layer | Tool | Plan/Version | Purpose | Est. Monthly Cost |
|-------|------|-------------|---------|------------------|
| Data Collection | Google Forms | Free | Worker & employer intake | $0 |
| Database / CRM | Google Sheets | Free (Workspace $6/user/mo) | Master data, pipeline, deals | $6-18 |
| Automation | Zapier | Professional ($49/mo) | End-to-end workflow automation | $49 |
| AI Engine | OpenAI GPT-4o | Pay-as-you-go | Candidate scoring & matching | ~$30 |
| Messaging | WATI WhatsApp API | Growth ($49/mo) | Bot, notifications, alerts | $49 |
| Website | Wix | Business ($23/mo) | Public-facing platform | $23 |
| No-code App | Glide (optional) | Starter ($25/mo) | Mobile app for workers | $25 |
| Scripts | Google Apps Script | Free | Sheet automation | $0 |
| Version Control | GitHub | Free | Code and docs | $0 |
| **Total Phase 1** | | | | **~$176-200/mo** |

## Phase 2 — Real Platform (Planned Q3 2026)

| Layer | Tool | Purpose |
|-------|------|---------|
| Frontend | React.js + Next.js | Employer & Worker portals |
| UI Library | TailwindCSS + shadcn/ui | Consistent design system |
| Backend | Node.js + Express.js | REST API |
| Database | PostgreSQL (AWS RDS) | Production database |
| File Storage | AWS S3 | CV uploads, documents |
| Auth | Auth0 | SSO, role-based auth |
| Email | SendGrid | Transactional emails |
| Payments | Stripe + Flutterwave | Subscription + local payments |
| Hosting | AWS EC2 / GCP Cloud Run | Backend API |
| CDN | Cloudflare | Global performance + DDoS |
| Monitoring | Datadog + Sentry | Performance + error tracking |
| CI/CD | GitHub Actions | Automated deployment |
| Container | Docker | Consistent environments |
| **Est. Monthly Cost** | | **~$800-1200/mo** |

## Phase 3 — Global Scale (2027+)

| Layer | Tool |
|-------|------|
| Mobile | React Native (iOS + Android) |
| Architecture | Microservices (Docker + Kubernetes) |
| ML/AI | Custom fine-tuned GPT + scikit-learn matching |
| Search | Elasticsearch |
| Queue | RabbitMQ / AWS SQS |
| Analytics | Mixpanel + Google Analytics 4 |
| Payments | Stripe + Flutterwave + local gateways |
| Compliance | Region-specific modules (GDPR, NDPR, Kuwait Labor Law) |
| **Est. Monthly Cost** | **~$3,000-8,000/mo** |

## Migration Path: Phase 1 → Phase 2

| Concern | Phase 1 (Current) | Phase 2 |
|---------|------------------|---------|
| Database | Google Sheets (10M cell limit) | PostgreSQL (unlimited) |
| Authentication | Google Account | Auth0 JWT |
| API | Google Apps Script | Node.js REST API |
| Automation | Zapier (task limits) | Custom webhooks + cron |
| AI | OpenAI via Zapier | Direct OpenAI SDK |
| Hosting | Google + Wix | AWS/GCP |
| Payments | Manual invoice | Stripe/Flutterwave |
| Scalability | ~5,000 candidates | 100,000+ candidates |
