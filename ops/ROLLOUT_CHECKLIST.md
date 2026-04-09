# Master Rollout Checklist – Kingken Global Recruitment Platform

**Company:** Kingken Global Travel Agency Ltd  
**Document Type:** Go-Live Checklist  
**Version:** 1.0  
**Total Items:** 49 checkboxes across 6 phases

---

## How to Use This Checklist

- Work through each phase in order
- Check off items as they are completed
- Do not proceed to the next phase until all items in the current phase are complete
- Assign each item to a responsible team member and add a completion date

---

## Phase 1 – Foundation (14 items)

*Goal: Set up all technical infrastructure before any team or client activities.*

- [ ] 1. Register domain: kingkenglobal.com.ng and configure DNS
- [ ] 2. Create Google Workspace account for the organisation
- [ ] 3. Create team email accounts (coo@, hr@, ops@, info@, recruiter@)
- [ ] 4. Enable 2-Factor Authentication on all Google accounts
- [ ] 5. Create main Google Sheet "Kingken Global – Main" with all 7 sheet tabs
- [ ] 6. Add all column headers, formulas, and data validations to each sheet
- [ ] 7. Apply protected ranges to all ID columns and formula columns
- [ ] 8. Set up Dashboard with all 27 KPI formulas and protect the sheet
- [ ] 9. Create Worker Application Form (5 sections, all fields)
- [ ] 10. Create Employer Request Form (5 sections, all fields)
- [ ] 11. Link both forms to Google Sheets response sheets
- [ ] 12. Create WATI account and connect WhatsApp Business number (+96569048174)
- [ ] 13. Complete Meta Business Manager verification for WhatsApp API
- [ ] 14. Create Zapier account and connect to Google Workspace and WATI

---

## Phase 2 – Team Setup (10 items)

*Goal: Get the team trained and ready to operate the platform.*

- [ ] 15. Conduct platform orientation session with all team members
- [ ] 16. Assign Google Sheet access permissions per RBAC matrix
- [ ] 17. Share access to WATI with HR Officers and COO
- [ ] 18. Train HR Officers on pipeline management (Pipeline sheet walkthrough)
- [ ] 19. Train recruiters on using Master Data sheet and candidate submission
- [ ] 20. Train COO on Dashboard reading and daily task management
- [ ] 21. Build and test Employer conversation flow in WATI
- [ ] 22. Build and test Worker application flow in WATI
- [ ] 23. Set up all 6 Zapier automations (Zaps 01–06) and test each one
- [ ] 24. Set up all keyword triggers in WATI (greeting, employer, worker, FAQ, escalation)

---

## Phase 3 – MVP Launch (8 items)

*Goal: Open the platform to the first real users (candidates and employers).*

- [ ] 25. Run full 10-scenario bot test checklist (see TESTING_GUIDE.md)
- [ ] 26. Submit 5 test worker applications and verify all data flows work correctly
- [ ] 27. Submit 2 test employer requests and verify Employers and Job Requests sheets populate
- [ ] 28. Verify auto-reply messages are sent to workers and employers
- [ ] 29. Verify team notification messages reach HR and COO via WhatsApp
- [ ] 30. Publish Worker Application Form link on the website
- [ ] 31. Share Worker Form link in initial WhatsApp broadcast to candidate network
- [ ] 32. Share Employer Form link with first 5 target employer contacts

---

## Phase 4 – First Revenue (6 items)

*Goal: Achieve the first successful paid placement and invoice.*

- [ ] 33. Onboard first active employer (status changed from Lead to Active in Employers sheet)
- [ ] 34. Create first Job Request row for the employer
- [ ] 35. Shortlist and submit first set of candidates to employer
- [ ] 36. Get employer approval and advance at least 1 candidate to "Selected" stage
- [ ] 37. Create first Deal row and issue Invoice INV-2026-001 to employer
- [ ] 38. Record first payment received in Deals sheet (Amount Paid column)

---

## Phase 5 – Scale (6 items)

*Goal: Expand operations to multiple employers and countries simultaneously.*

- [ ] 39. Reach 100 active candidates in Master Data sheet
- [ ] 40. Onboard 10 active employers across at least 2 countries
- [ ] 41. Deploy first batch of workers (minimum 5 confirmed deployments)
- [ ] 42. Upgrade Zapier plan to accommodate increasing automation volume
- [ ] 43. Hire or assign additional HR Officers to manage growing pipeline
- [ ] 44. Implement weekly and monthly reporting schedule (Dashboard + CEO summary)

---

## Phase 6 – Platform (5 items)

*Goal: Build app-layer on top of Google Sheets for improved user experience.*

- [ ] 45. Evaluate Glide vs Softr vs custom development for app layer (see SAAS_ARCHITECTURE.md)
- [ ] 46. Deploy candidate-facing Glide app connected to Master Data sheet
- [ ] 47. Deploy employer-facing Softr portal connected to Employers and Job Requests sheets
- [ ] 48. Set up Uptime monitoring for all portals (UptimeRobot or similar)
- [ ] 49. Complete NDPR/GDPR compliance review and update privacy policy on website

---

## Summary Table

| Phase | Items | Goal |
|-------|-------|------|
| Phase 1 – Foundation | 14 | Technical setup |
| Phase 2 – Team Setup | 10 | Team readiness |
| Phase 3 – MVP Launch | 8 | First users |
| Phase 4 – First Revenue | 6 | First payment |
| Phase 5 – Scale | 6 | Growth |
| Phase 6 – Platform | 5 | App layer |
| **Total** | **49** | |

---

## Rollout Owner

| Phase | Owner | Target Date |
|-------|-------|-------------|
| Foundation | COO + Ops Manager | Week 1–2 |
| Team Setup | COO | Week 2–3 |
| MVP Launch | COO + HR Lead | Week 3–4 |
| First Revenue | COO + Ops Manager | Month 2 |
| Scale | COO + Full Team | Month 3–6 |
| Platform | CEO + COO + Tech | Month 7–12 |
