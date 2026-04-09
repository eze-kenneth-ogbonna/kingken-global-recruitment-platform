# Deployment Guide – Kingken Global Recruitment Platform

**Company:** Kingken Global Travel Agency Ltd  
**Document Type:** Deployment & Operations Guide  
**Version:** 1.0

---

## Environments

| Environment | Purpose | URL / Location |
|-------------|---------|---------------|
| **Development** | Testing new automations and changes | Separate Google Sheet: "KG Dev Environment" |
| **Staging** | Pre-launch testing with real-ish data | Separate Google Sheet: "KG Staging" |
| **Production** | Live business data | Main Google Sheet: "Kingken Global – Main" |

**Rules:**
- Never test directly in Production
- All Zapier changes must be tested in Dev/Staging first
- New bot scripts must be tested in a separate WATI "Test" flow before going live
- Changes to formulas in Google Sheets must be verified in Staging first

---

## Phase 1 – Go-Live Checklist (47 Steps)

### A. Google Workspace Setup (Steps 1–8)

- [ ] 1. Create Google Workspace account (workspace.google.com) with domain kingkenglobal.com.ng
- [ ] 2. Create team accounts: coo@, hr@, recruiter@, ops@, info@kingkenglobal.com.ng
- [ ] 3. Enable 2-Factor Authentication on all accounts
- [ ] 4. Set password policy: minimum 12 characters, must include numbers and symbols
- [ ] 5. Create shared Google Drive folder: "Kingken Global – Operations"
- [ ] 6. Create sub-folders: Candidates, Employers, Contracts, Reports, Templates
- [ ] 7. Set sharing permissions on each folder per RBAC matrix
- [ ] 8. Create Google Workspace admin account backup (second admin user)

### B. Google Sheets Setup (Steps 9–18)

- [ ] 9. Create main Google Sheet: "Kingken Global – Main"
- [ ] 10. Create 7 sheet tabs: Master Data, Employers, Job Requests, Pipeline, Deals, Tasks, Dashboard
- [ ] 11. Add column headers to each sheet per schema documentation
- [ ] 12. Apply data validation rules to all dropdown columns
- [ ] 13. Apply conditional formatting to all status columns
- [ ] 14. Add VLOOKUP formulas to all formula columns
- [ ] 15. Apply protected ranges to all ID columns
- [ ] 16. Add Dashboard formulas (all 27 KPI formulas)
- [ ] 17. Protect Dashboard sheet as view-only
- [ ] 18. Test all formulas with sample data (3–5 test rows)

### C. Google Forms Setup (Steps 19–24)

- [ ] 19. Create Worker Application Form (5 sections, 33 questions)
- [ ] 20. Link Worker Form responses to Google Sheets ("Worker Application Responses" sheet)
- [ ] 21. Set confirmation message for Worker Form
- [ ] 22. Create Employer Request Form (5 sections, 31 questions)
- [ ] 23. Link Employer Form responses to Google Sheets ("Employer Request Responses" sheet)
- [ ] 24. Set confirmation message for Employer Form

### D. Zapier Setup (Steps 25–30)

- [ ] 25. Create Zapier account and connect Google Workspace
- [ ] 26. Set up Zap 01: Worker Form → Master Data Sheet (with AI scoring trigger)
- [ ] 27. Set up Zap 02: Auto-reply WhatsApp to new worker (WATI)
- [ ] 28. Set up Zap 03: AI Scoring – OpenAI scores candidate → writes score to Master Data
- [ ] 29. Set up Zap 04: Team notification – new worker applied → WhatsApp HR officer
- [ ] 30. Set up Zap 05: Task creation – new pipeline stage → create task in Tasks sheet

### E. Zapier Setup Continued (Steps 31–34)

- [ ] 31. Set up Zap 06: Employer form → create Employer + Job Request rows
- [ ] 32. Test all 6 Zaps end-to-end with test form submissions
- [ ] 33. Verify all Google Sheet rows are created correctly
- [ ] 34. Enable all Zaps (set to "On")

### F. WATI / WhatsApp Bot Setup (Steps 35–40)

- [ ] 35. Create WATI account and connect WhatsApp Business number
- [ ] 36. Complete Meta Business Manager verification
- [ ] 37. Configure WhatsApp Business profile (name, logo, description)
- [ ] 38. Set up all keyword triggers (greeting, employer, worker, FAQ, escalation)
- [ ] 39. Build Employer Flow in WATI bot builder
- [ ] 40. Build Worker Flow in WATI bot builder

### G. Testing & Launch (Steps 41–47)

- [ ] 41. Run 10-scenario bot test checklist (see TESTING_GUIDE.md)
- [ ] 42. Verify Google Sheets rows created from each test submission
- [ ] 43. Verify auto-reply WhatsApp messages are received
- [ ] 44. Verify team notification messages are received by HR/COO
- [ ] 45. Share Worker Application Form link on WhatsApp and social media
- [ ] 46. Share Employer Request Form link with known employer contacts
- [ ] 47. Launch announcement: post on LinkedIn and Facebook

---

## Phase 2 – Glide / Softr Deployment

### Overview
Phase 2 adds a mobile app (Glide) and employer portal (Softr) on top of the existing Google Sheets data layer.

### Glide App Deployment (Candidate & Team App)

**Prerequisites:**
- Google Sheets Main database fully operational (Phase 1 complete)
- Glide Pro account (glideapps.com)

**Steps:**
1. Sign up at glideapps.com
2. Create new app → "From Google Sheets" → select main sheet
3. Design screens:
   - **Worker View:** Application status screen, update profile, upload documents
   - **HR View:** Pipeline management, stage updates, candidate profiles
   - **COO View:** Dashboard overview, task management
4. Set up user roles in Glide (Worker / HR / COO)
5. Configure row-level access (workers see only their own data)
6. Add Glide actions:
   - Update pipeline stage
   - Add notes to a candidate
   - Create a task
7. Publish as PWA (Progressive Web App) — share link with team
8. Optionally publish to iOS/Android app stores

### Softr Portal Deployment (Employer Portal)

**Prerequisites:**
- Google Sheets Main database with Employers and Job Requests sheets
- Softr Professional account (softr.io)

**Steps:**
1. Sign up at softr.io
2. Create new app → connect to Google Sheets
3. Design portal screens:
   - Employer login page
   - View submitted job requests
   - View matched candidate shortlists (anonymised until deal signed)
   - Download invoice
4. Set up Softr authentication:
   - Enable email/password login
   - Restrict access: only verified employer email addresses
   - Row-level filtering: each employer sees only their own records
5. Customise branding: Kingken Global logo, colours (#0066CC blue)
6. Test with 2–3 pilot employers before full rollout
7. Publish portal at: employers.kingkenglobal.com.ng (or subdomain)

---

## Phase 3 – AWS Architecture

### Overview
Phase 3 is a full custom SaaS platform deployed on AWS (see SAAS_ARCHITECTURE.md for full architecture diagram).

### AWS Services Used

| Service | Purpose |
|---------|---------|
| EC2 (t3.medium × 2) | Application servers (Node.js + Python) |
| RDS PostgreSQL | Primary database |
| ElastiCache Redis | Session cache and performance |
| S3 | File storage (CVs, documents, images) |
| CloudFront | CDN for fast global access |
| API Gateway | API endpoint management |
| Route 53 | DNS management |
| WAF | Web Application Firewall |
| Secrets Manager | API key and credentials management |
| CloudWatch | Monitoring, logs, alerts |
| SES | Transactional email sending |

### Deployment Steps (High Level)

1. **Infrastructure as Code:** Set up Terraform scripts for all AWS resources
2. **CI/CD Pipeline:** GitHub Actions → build → test → deploy to AWS
3. **Database migration:** Migrate data from Google Sheets to PostgreSQL
4. **API development:** Build REST APIs for all platform operations
5. **Frontend deployment:** Deploy Next.js app to S3 + CloudFront
6. **Mobile app:** React Native app submitted to App Store and Play Store
7. **DNS:** Configure Route 53 for all subdomains
8. **SSL certificates:** AWS Certificate Manager for HTTPS
9. **Load testing:** Run load test before launch (simulate 500 concurrent users)
10. **Go live:** Gradual rollout starting with internal team

---

## Rollback Procedures

### Google Sheets Rollback
1. Go to File → Version history → See version history
2. Find the last good version (before the error)
3. Click "Restore this version"
4. Verify data is correct
5. Notify team of the rollback

### Zapier Zap Rollback
1. In Zapier, go to the affected Zap
2. Click "Task History" to see recent runs
3. For failed tasks, click "Replay" to re-run
4. If Zap logic changed incorrectly, click "Version History" in Zap editor
5. Restore previous version of the Zap

### WATI Bot Rollback
1. In WATI, go to the affected Chat Bot Flow
2. WATI doesn't have native version history — keep manual backups
3. **Best practice:** Before editing any flow, screenshot or document the existing flow
4. To roll back, recreate the previous flow manually from documentation

### AWS Rollback (Phase 3)
1. All deployments via CI/CD pipeline with automatic rollback on failed health check
2. Manual rollback: run `terraform apply` with previous version tag
3. Database rollback: restore from automated RDS snapshot (point-in-time recovery)

---

## Health Checks

### Daily Health Checks (5 minutes, by Ops Manager):
- [ ] Open Google Sheets — all sheets load without errors
- [ ] Check Zapier Task History — no failed tasks in the last 24 hours
- [ ] Send test message to WhatsApp bot — receive expected response
- [ ] Open Dashboard — all 27 KPI formulas show numbers (not errors)
- [ ] Check WATI Dashboard — no queued messages unprocessed

### Weekly Health Checks (15 minutes, by COO):
- [ ] Review Zapier task usage — are we within plan limits?
- [ ] Check WATI API status — any errors or rate limit warnings?
- [ ] Verify Google Drive storage — still within quota?
- [ ] Test one complete worker flow end-to-end
- [ ] Test one complete employer flow end-to-end
- [ ] Verify all team members can access their assigned sheets

---

## Monitoring Setup

For full monitoring details, see `ops/MONITORING_GUIDE.md`.

### Quick Setup:

**Zapier Monitoring:**
1. Zapier Dashboard → Task History → filter by "Error"
2. Set up Zapier alert Zap: if any Zap errors → send email to ops@kingkenglobal.com.ng

**Google Sheets Monitoring:**
1. Add a "Last Updated" cell to each key sheet
2. Formula: `=NOW()` in a timestamp cell, updated by Zapier on each write
3. If timestamp is stale, it indicates data flow may be broken

**WATI Monitoring:**
1. WATI Dashboard → Analytics → daily conversation count
2. Set WATI email alerts for high volume or low response rate

**Uptime Monitoring (Phase 2+):**
1. Use UptimeRobot (free) to monitor website and any portals
2. Configure alerts: email + WhatsApp notification if site goes down
3. Target uptime: 99.5%
