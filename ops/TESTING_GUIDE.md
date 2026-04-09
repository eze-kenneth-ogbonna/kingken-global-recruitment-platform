# Testing Guide – Kingken Global Recruitment Platform

**Company:** Kingken Global Travel Agency Ltd  
**Document Type:** Testing & Quality Assurance Guide  
**Version:** 1.0

---

## Overview

This guide covers all testing activities for the Kingken Global recruitment platform. Testing must be completed before any new feature or automation goes live.

---

## 1. Google Form Testing

### Worker Application Form

**Test each section by submitting a complete test application.**

| Test # | Action | Expected Result | Pass/Fail |
|--------|--------|----------------|-----------|
| F-W-01 | Submit complete valid form | Confirmation message displayed | ☐ |
| F-W-02 | Submit with required fields blank | Form prevents submission; shows error | ☐ |
| F-W-03 | Enter invalid phone format | Validation error shown | ☐ |
| F-W-04 | Upload a PDF CV | File accepted; confirmation message appears | ☐ |
| F-W-05 | Upload an unsupported file type | File rejected; error message shown | ☐ |
| F-W-06 | Check response in linked Google Sheet | New row appears with all fields populated | ☐ |
| F-W-07 | Test conditional logic (passport questions) | Q10/11 only appear when passport = Yes | ☐ |
| F-W-08 | Test from mobile device (Android) | Form renders correctly; all fields usable | ☐ |
| F-W-09 | Test from mobile device (iOS) | Form renders correctly; all fields usable | ☐ |
| F-W-10 | Submit via WhatsApp-shared link | Link opens correctly; form submits | ☐ |

### Employer Request Form

| Test # | Action | Expected Result | Pass/Fail |
|--------|--------|----------------|-----------|
| F-E-01 | Submit complete valid form | Confirmation message displayed | ☐ |
| F-E-02 | Submit with company name blank | Form prevents submission | ☐ |
| F-E-03 | Submit with invalid email | Validation error shown | ☐ |
| F-E-04 | Enter workers required = 0 | Validation rejects; minimum 1 required | ☐ |
| F-E-05 | Check response in linked Google Sheet | New row created with all fields | ☐ |

---

## 2. Google Sheets Automation Testing

### VLOOKUP Formula Tests

| Test # | Sheet | Action | Expected Result | Pass/Fail |
|--------|-------|--------|----------------|-----------|
| S-01 | Job Requests | Enter valid Employer ID in column B | Column C auto-populates company name | ☐ |
| S-02 | Job Requests | Enter invalid/non-existent Employer ID | Column C shows blank (not #N/A) | ☐ |
| S-03 | Pipeline | Enter valid Candidate ID in column B | Column C shows candidate name | ☐ |
| S-04 | Pipeline | Enter valid Job ID in column D | Columns E and F auto-populate | ☐ |
| S-05 | Deals | Enter valid Employer ID in column B | Column C shows company name | ☐ |
| S-06 | Deals | Enter 10 in E2 and 500 in F2 | G2 shows 5000 | ☐ |
| S-07 | Deals | Enter 3000 in G2, 1000 in K2 | L2 shows 2000; M2 shows "Partial" | ☐ |
| S-08 | Deals | Set K2 = G2 (fully paid) | M2 shows "Paid" | ☐ |
| S-09 | Deals | Set K2 = 0 | M2 shows "Unpaid" | ☐ |
| S-10 | Employers | Add confirmed deployment to Pipeline | Employers!K updates count automatically | ☐ |

### Dashboard Formula Tests

| Test # | KPI Label | Verification Method | Pass/Fail |
|--------|-----------|-------------------|-----------|
| D-01 | Total Candidates | Count rows in Master Data manually; compare | ☐ |
| D-02 | New This Week | Add a row with today's date; counter increments | ☐ |
| D-03 | Active Employers | Set 3 employers to Active; Dashboard shows 3 | ☐ |
| D-04 | Total Deal Value | Sum Deals!G manually; compare to B16 | ☐ |
| D-05 | Total Paid | Sum Deals!K manually; compare to B17 | ☐ |
| D-06 | Total in Pipeline | Count Pipeline rows; compare to B23 | ☐ |
| D-07 | Confirmed Deployed | Set 2 Pipeline rows to Confirmed; B24 shows 2 | ☐ |
| D-08 | Open Tasks | Add 3 "To Do" tasks; B29 shows 3 | ☐ |
| D-09 | Blocked Tasks | Set 1 task to Blocked; B31 shows 1 | ☐ |
| D-10 | Conversion Rate | Set B19=5, B12=10; B21 shows 50% | ☐ |

---

## 3. Zapier Zap Testing (5 Scenarios Each)

### Zap 01 – Worker Form → Master Data Sheet

| Test # | Scenario | Expected Result | Pass/Fail |
|--------|---------|----------------|-----------|
| Z1-01 | Submit complete worker form | New row in Master Data sheet within 2 minutes | ☐ |
| Z1-02 | Submit form with minimal fields | Row created with available data; optional fields blank | ☐ |
| Z1-03 | Submit second form (different applicant) | Second new row created; no data overwrite | ☐ |
| Z1-04 | Check CandidateID format | Format is KENG-YYYYMMDD-NNNN | ☐ |
| Z1-05 | Check default status | Status column shows "New" | ☐ |

### Zap 02 – Auto-Reply to Worker (WhatsApp)

| Test # | Scenario | Expected Result | Pass/Fail |
|--------|---------|----------------|-----------|
| Z2-01 | Submit worker form from test number | WhatsApp reply received within 5 minutes | ☐ |
| Z2-02 | Reply includes applicant name | Message contains correct name from form | ☐ |
| Z2-03 | Reply includes reference number | Message includes KENG-YYYYMMDD-NNNN reference | ☐ |
| Z2-04 | Reply sent to correct WhatsApp number | Message goes to form submitter's number | ☐ |
| Z2-05 | Send without WhatsApp number provided | No crash; Zap skips WhatsApp step gracefully | ☐ |

### Zap 03 – AI Scoring

| Test # | Scenario | Expected Result | Pass/Fail |
|--------|---------|----------------|-----------|
| Z3-01 | New candidate with strong profile | AI Score between 7–10 written to Master Data!P | ☐ |
| Z3-02 | New candidate with weak profile (no experience) | AI Score between 1–4 | ☐ |
| Z3-03 | Score format | Number between 0.0 and 10.0 | ☐ |
| Z3-04 | OpenAI error (invalid key) | Zap fails gracefully; COO notified | ☐ |
| Z3-05 | Score updates correctly in sheet | Column P shows score after Zap runs | ☐ |

### Zap 04 – Team Notification

| Test # | Scenario | Expected Result | Pass/Fail |
|--------|---------|----------------|-----------|
| Z4-01 | New worker application submitted | HR Officer receives WhatsApp notification | ☐ |
| Z4-02 | Notification includes candidate name and position | Message body contains correct data | ☐ |
| Z4-03 | Notification sent to correct HR number | Delivered to assigned HR WhatsApp | ☐ |
| Z4-04 | New employer submitted | COO receives separate notification | ☐ |
| Z4-05 | Notification timing | Delivered within 3 minutes of form submission | ☐ |

### Zap 05 – Task Creation

| Test # | Scenario | Expected Result | Pass/Fail |
|--------|---------|----------------|-----------|
| Z5-01 | Candidate stage changes to "Selected" | New task created in Tasks sheet | ☐ |
| Z5-02 | Task has correct title | "Collect documents for [Candidate Name]" | ☐ |
| Z5-03 | Task assigned to correct HR Officer | Assigned To matches pipeline HR Officer column | ☐ |
| Z5-04 | Task Due Date is set | Due Date = today + 3 days | ☐ |
| Z5-05 | Task Status is "To Do" | Default status on creation | ☐ |

---

## 4. WhatsApp Bot Testing (10 Conversation Scripts)

Run each conversation script manually from a test WhatsApp number.

| Test # | Conversation Script | Expected Outcome | Pass/Fail |
|--------|-------------------|-----------------|-----------|
| B-01 | Send "hello" | Receive main menu (4 options) | ☐ |
| B-02 | Complete full employer flow (all questions) | Receive confirmation + reference number | ☐ |
| B-03 | Complete full worker flow (all questions) | Receive application reference number | ☐ |
| B-04 | Send unrecognised message 3 times | Receive fallback + HELP escalation offer | ☐ |
| B-05 | Type "fee" keyword | Receive FAQ 1.1 response about fees | ☐ |
| B-06 | Type "documents" keyword | Receive document requirements FAQ | ☐ |
| B-07 | Type "4" or "help" | Receive escalation message + COO notified | ☐ |
| B-08 | Go inactive for 20 minutes | Receive timeout message | ☐ |
| B-09 | Select option "2" in employer confirmation (make a change) | Return to correct step for editing | ☐ |
| B-10 | Send CV file (PDF) during worker flow | File accepted; confirmation continues | ☐ |

---

## 5. AI Scoring Testing (5 Candidate Profiles)

Test the AI scoring system with 5 diverse candidate profiles to validate scoring accuracy.

### Profile 1 – Strong Candidate
- **Name:** Test Candidate A
- **Position:** Electrician
- **Experience:** 7 years
- **Passport:** Valid
- **Certifications:** City & Guilds Level 3, SafePass
- **Expected AI Score:** 8–10
- **Actual Score:** _____ | Pass/Fail: ☐

### Profile 2 – Average Candidate
- **Name:** Test Candidate B
- **Position:** Construction Labour
- **Experience:** 2 years
- **Passport:** Valid
- **Certifications:** None
- **Expected AI Score:** 5–7
- **Actual Score:** _____ | Pass/Fail: ☐

### Profile 3 – Weak Candidate
- **Name:** Test Candidate C
- **Position:** Cleaning Staff
- **Experience:** Less than 1 year
- **Passport:** Expired
- **Certifications:** None
- **Expected AI Score:** 2–4
- **Actual Score:** _____ | Pass/Fail: ☐

### Profile 4 – Healthcare Specialist
- **Name:** Test Candidate D
- **Position:** Registered Nurse
- **Experience:** 5 years
- **Passport:** Valid (2+ years remaining)
- **Certifications:** RN License, BLS, ACLS
- **Expected AI Score:** 9–10
- **Actual Score:** _____ | Pass/Fail: ☐

### Profile 5 – Entry Level
- **Name:** Test Candidate E
- **Position:** Hospitality Staff
- **Experience:** None (fresh graduate)
- **Passport:** Valid
- **Certifications:** Diploma in Hotel Management
- **Expected AI Score:** 4–6
- **Actual Score:** _____ | Pass/Fail: ☐

---

## 6. Dashboard Formula Verification (All 27 KPIs)

Complete each verification step to confirm all dashboard formulas are accurate.

### Setup:
1. Create a "Test Data" copy of the main sheet
2. Add known test data to each sheet
3. Manually calculate expected values
4. Compare to Dashboard formula results

| # | KPI | Manual Expected | Dashboard Shows | Match? |
|---|-----|----------------|----------------|--------|
| 1 | Total Candidates | Count Master Data rows | B2 | ☐ |
| 2 | New This Week | Count rows with date 7 days ago to today | B3 | ☐ |
| 3 | Approved | Count Status="Approved" | B4 | ☐ |
| 4 | Deployed | Count Status="Deployed" | B5 | ☐ |
| 5 | Pending Screening | Count Status="New" | B6 | ☐ |
| 6 | Avg AI Score | Average of non-blank P column | B7 | ☐ |
| 7 | High Scorers | Count P >= 8 | B8 | ☐ |
| 8 | Total Employers | Count Employers rows | B10 | ☐ |
| 9 | Active Employers | Count Employers Status="Active" | B11 | ☐ |
| 10 | Total Job Requests | Count Job Requests rows | B12 | ☐ |
| 11 | Open Jobs | Count Job Requests Status="Open" | B13 | ☐ |
| 12 | Total Workers Requested | Sum Job Requests!E | B14 | ☐ |
| 13 | Total Deal Value | Sum Deals!G | B16 | ☐ |
| 14 | Total Paid | Sum Deals!K | B17 | ☐ |
| 15 | Total Balance | Sum Deals!L | B18 | ☐ |
| 16 | Paid Deals | Count Deals Status="Paid" | B19 | ☐ |
| 17 | Unpaid Deals | Count Deals Status="Unpaid" | B20 | ☐ |
| 18 | Conversion Rate | B19/B12 as percentage | B21 | ☐ |
| 19 | Total in Pipeline | Count Pipeline rows | B23 | ☐ |
| 20 | Confirmed Deployed | Count Pipeline!O="Confirmed" | B24 | ☐ |
| 21 | Visa In Progress | Count Pipeline!M="In Progress" | B25 | ☐ |
| 22 | Medical Pending | Count Pipeline!L="Pending" | B26 | ☐ |
| 23 | Rejected | Count Pipeline!H="Rejected" | B27 | ☐ |
| 24 | Open Tasks | Count Tasks Status="To Do" | B29 | ☐ |
| 25 | In Progress Tasks | Count Tasks Status="In Progress" | B30 | ☐ |
| 26 | Blocked Tasks | Count Tasks Status="Blocked" | B31 | ☐ |
| 27 | Done This Week | Count Tasks Done + Due Date in last 7 days | B32 | ☐ |

---

## 7. UAT Plan (User Acceptance Testing)

### Participants:
- CEO
- COO
- 1 HR Officer
- 1 Recruiter
- 1 test employer (real business contact)
- 1 test worker applicant (known contact)

### UAT Scenarios:
1. Test worker applies via WhatsApp bot → HR reviews in pipeline
2. Test employer submits request via form → COO reviews in Job Requests
3. HR advances a candidate through 3 pipeline stages
4. COO views Dashboard — all KPIs reflecting test data
5. Ops Manager creates a Deal and marks partial payment

### UAT Sign-Off Criteria:
- All 5 UAT scenarios complete without errors
- All team members report the system is "easy to use"
- No critical bugs identified
- Dashboard shows accurate data

---

## 8. Regression Testing

Run regression testing after every major change (new Zap, new form field, sheet restructure).

### Regression Test Checklist:

- [ ] Submit test worker form → verify Master Data row created
- [ ] Submit test employer form → verify Employers + Job Requests rows created
- [ ] Check all VLOOKUP formulas still work
- [ ] Check all Dashboard KPI formulas still show numbers (not errors)
- [ ] Send "hello" to WhatsApp bot → receive main menu
- [ ] Check Zapier task history → no errors in last 24 hours

---

## 9. Performance Testing

### Google Sheets Performance:
- **Target:** Sheet loads in < 3 seconds with 1,000 rows
- **Test:** Add 1,000 test rows to Master Data; measure load time
- **Action if slow:** Remove unnecessary formulas; split into multiple sheets

### Zapier Performance:
- **Target:** Each Zap completes in < 2 minutes
- **Test:** Submit form and measure time until Sheet row appears
- **Action if slow:** Upgrade Zapier plan; reduce steps in Zap

### WhatsApp Bot Performance:
- **Target:** Bot responds in < 5 seconds to any keyword
- **Test:** Time multiple keyword triggers across different sessions
- **Action if slow:** Review WATI plan limits; optimise flow complexity

### WATI Concurrent User Test:
- **Target:** Handle 50 simultaneous conversations without degradation
- **Test:** Coordinate team to send 50 messages simultaneously
- **Action if degraded:** Upgrade WATI plan or contact WATI support
