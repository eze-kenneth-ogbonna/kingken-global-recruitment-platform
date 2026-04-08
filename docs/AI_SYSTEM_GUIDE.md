# Kingken Global Recruitment Platform — AI System Guide

> **Company:** Kingken Global Travel Agency Ltd
> **Website:** https://www.kingkenglobal.com.ng | **Email:** info@kingkenglobal.com.ng

---

## Overview

The AI system automates candidate screening and employer-candidate matching using OpenAI GPT. Every new candidate submission is scored automatically, freeing recruiters to focus on high-value activities rather than manual CV reviews.

---

## 1. Architecture

```
Worker Submits Form
        │
        ▼
Google Forms (Worker Application)
        │
        ▼ (Zap 01)
Google Sheets — Master Data Tab
  (New row created: Status = "New")
        │
        ├──▶ (Zap 02) WhatsApp auto-reply to candidate
        │
        ├──▶ (Zap 04) Notify recruiter
        │
        └──▶ (Zap 03) AI Scoring Pipeline
                  │
                  ▼
            Zapier Formatter
          (Build structured prompt)
                  │
                  ▼
            OpenAI GPT API
          (Evaluate candidate)
                  │
                  ▼
           JSON Response parsed
        {score, strengths, weaknesses,
         recommendation, summary}
                  │
                  ▼
         Google Sheets Update
    Column L: AI_Score (0–100)
    Column M: AI_Summary (text)
    Column K: Status (auto-set based on score)
                  │
                  ▼
       Auto-response triggered
    (based on score threshold)
```

---

## 2. Candidate Screening Prompt Template

This is the exact prompt sent to OpenAI for every new candidate. Copy this into Zapier's OpenAI action field.

```
You are a professional recruitment screening AI working for Kingken Global Travel Agency Ltd, an international recruitment agency that places African workers in Gulf Cooperation Council (GCC) countries including Kuwait, UAE, and Qatar.

Your task is to evaluate a candidate's suitability for overseas placement based on their application details.

Candidate Information:
- Full Name: {{Full_Name}}
- Country of Origin: {{Country}}
- Position Applied For: {{Position}}
- Years of Experience: {{Experience}}
- Passport Available: {{Passport}}
- CV Submitted: {{CV_Link_or_No}}

Evaluation Criteria (assign points as follows):
1. Work experience relevance (0–40 points): How well does their stated experience match the position?
2. Passport availability (0–20 points): Valid passport = 20, Expired = 10, Not available = 0
3. Country alignment (0–20 points): Is this nationality in demand for the applied position in Gulf countries?
4. Document readiness (0–20 points): Was a CV submitted = 20, no CV = 0

Rules:
- Return ONLY a valid JSON object. No markdown, no extra text, no code blocks.
- Score must be an integer between 0 and 100.
- Strengths and weaknesses must each be arrays of strings.
- Recommendation must be one of: "Approve", "Manual Review", or "Reject".

Return this exact JSON structure:
{
  "score": 75,
  "strengths": ["5+ years domestic work experience", "Valid passport ready"],
  "weaknesses": ["No CV submitted"],
  "recommendation": "Manual Review",
  "summary": "Experienced domestic worker from Nigeria with valid passport. Missing CV reduces readiness score."
}
```

---

## 3. AI Scoring Thresholds

| Score Range | Category | Automatic Action | Status Set In Sheet |
|-------------|----------|-----------------|---------------------|
| 80–100 | High Priority | Auto-approved for recruiter review | `Approved` |
| 60–79 | Manual Review | Flagged for recruiter to evaluate | `Screened` |
| 40–59 | Low Priority | Added to queue; reviewed when capacity allows | `New` |
| 0–39 | Reject | Auto-rejection response sent | `Rejected` |

### Zapier Conditional Logic for Status Update

Set up a **Filter** or **Path** in Zap 03 to write the correct status:

```
If score >= 80:
  Set Status (col K) = "Approved"
  Trigger auto-approval WhatsApp to candidate

If score >= 60 AND score < 80:
  Set Status (col K) = "Screened"
  Notify recruiter for manual review

If score >= 40 AND score < 60:
  Set Status (col K) = "New"
  Add to low-priority queue

If score < 40:
  Set Status (col K) = "Rejected"
  Send rejection WhatsApp to candidate
```

---

## 4. Score Columns in Master Data

| Column | Header | Purpose |
|--------|--------|---------|
| L | AI_Score | Integer 0–100 from OpenAI response |
| M | AI_Summary | One-sentence summary from OpenAI |
| K | Status | Auto-set based on score thresholds |

### How AI_Score is Written

The Zap 03 pipeline:
1. OpenAI returns JSON text in response field.
2. Zapier Formatter (Utilities → Line Itemizer or Text → Extract Pattern) parses the JSON.
3. The `score` value is mapped to column L of the candidate's row in Master Data.
4. The `summary` value is mapped to column M.
5. A conditional action sets column K based on the score.

---

## 5. Employer-Candidate Matching Prompt

When a new Job Request is created, the Head of Recruitment can trigger a matching prompt to find the best candidates for the role.

```
You are a recruitment matching AI for Kingken Global Travel Agency Ltd.

Job Request Details:
- Job Title: {{Job_Title}}
- Country: {{Country}}
- Number of Workers Needed: {{Workers_Needed}}
- Preferred Nationality: {{Nationality_Pref}}
- Salary Budget: {{Salary}} USD/month

Available Approved Candidates (AI Score >= 60):
{{List_of_Candidates_JSON}}

Each candidate entry has:
- CandidateID, Name, Country, Position, Experience, AI_Score

Task:
Rank the top 5 most suitable candidates for this job request.
Return ONLY a JSON array:
[
  {
    "rank": 1,
    "candidateId": "CAND-0001",
    "name": "Amara Osei",
    "match_score": 92,
    "reason": "Strong domestic work experience, same nationality as preferred, valid passport."
  },
  ...
]
```

**How to trigger:** Manually via a Google Apps Script button on the Job Requests tab, or via a Zapier webhook when a new Job Request row is created with Status = `Open`.

---

## 6. Auto-Response System Based on Score

After AI scoring completes, a second Zapier action sends a customized WhatsApp response.

### High Priority (Score 80–100)

```
Hello {{Name}}! 🎉

Great news! Your application to Kingken Global has been reviewed and you have been
*pre-approved* for consideration for a {{Position}} role.

Our team will contact you within 24 hours to discuss next steps.

Please ensure you have the following ready:
✅ Valid passport
✅ Recent passport photograph
✅ Medical fitness certificate (if available)

Questions? WhatsApp: +96569048174
```

### Manual Review (Score 60–79)

```
Hello {{Name}}! 👋

Thank you for your application to Kingken Global.

Your application is currently under review by our recruitment team. We will contact you
within 3–5 business days with an update.

If you have not yet submitted your CV, please do so to strengthen your application:
📎 Submit here: {{Form_Link}}

Questions? WhatsApp: +96569048174
— Kingken Global Team
```

### Reject (Score 0–39)

```
Hello {{Name}},

Thank you for applying to Kingken Global Travel Agency Ltd.

After reviewing your application, we are unable to proceed at this time as your profile
does not meet our current placement requirements.

We encourage you to:
• Gain more experience in your field
• Obtain a valid passport
• Re-apply in 6 months

We wish you the very best in your career journey.
— Kingken Global Team
info@kingkenglobal.com.ng
```

---

## 7. Error Handling and Fallback

### Scenario: OpenAI Returns Invalid JSON

**Detection:** Zapier Formatter fails to parse the response.

**Fallback actions:**
1. Set AI_Score to `-1` (sentinel value indicating error).
2. Set AI_Summary to `AI scoring failed — manual review required`.
3. Set Status to `New` (default — does not auto-reject or auto-approve).
4. Send email to Head of Tech: `AI scoring failed for CandidateID {{ID}}`.

### Scenario: OpenAI API Down / Rate Limited

**Fallback actions:**
1. Zapier retries the Zap up to 3 times at 5-minute intervals.
2. If all retries fail, the row remains with Status = `New`.
3. Head of Tech is notified via email.
4. Recruiter screens candidate manually.

### Scenario: Score Outside 0–100 Range

**Prevention:** Add a Zapier Filter after JSON parse:
- If `score < 0` → set to `0`
- If `score > 100` → set to `100`

### Error Log

All AI errors should be tracked in a new tab called `AI_Error_Log` with columns:
```
A: Timestamp | B: CandidateID | C: Error Type | D: Raw OpenAI Response | E: Resolved (Y/N)
```

---

## 8. OpenAI API Configuration

| Setting | Recommended Value | Reason |
|---------|------------------|--------|
| Model | `gpt-4o-mini` | Cost-efficient, fast, accurate for structured tasks |
| Temperature | `0.3` | Low randomness for consistent scoring |
| Max Tokens | `500` | Enough for the full JSON response |
| Top P | `1.0` | Default; no change needed |
| Frequency Penalty | `0` | Default |
| Presence Penalty | `0` | Default |

### Cost Management

- Monitor usage at [platform.openai.com/usage](https://platform.openai.com/usage)
- Set a monthly spend limit under **Billing → Usage Limits**
- Recommended limit: $50/month initially
- Each candidate screening request costs approximately $0.001–0.003 with gpt-4o-mini

---

## 9. Future Enhancements (Phase 2 and Beyond)

### Resume / CV Parser

When candidates upload a CV to Google Drive via the form, a PDF parser can extract structured data:

**Tools:** Amazon Textract, Affinda Resume Parser, or custom Python script
**Flow:** CV uploaded → Drive webhook → Parser extracts JSON → Merged with form data → Enhanced AI prompt

### AI Interview Question Generator

Based on the candidate's position and experience, generate tailored interview questions:

```
Prompt: "Generate 5 interview questions for a {{Position}} candidate with {{Experience}}
of experience applying for a role in {{Country}}. Focus on practical scenarios."
```

Output stored in candidate's Notes column or a separate Interview tab.

### Automated Employer Matching Report

Weekly batch job: for each Open Job Request, run the matching prompt against all Approved candidates and email the COO a ranked shortlist PDF.

### Sentiment Analysis on Notes

Analyze recruiter notes for flags (e.g., "candidate seems unreliable", "family issues") to assist with pipeline quality scoring.

### Multilingual Support

Support French (for Cameroon, Senegal) in auto-response messages using OpenAI translation:
```
Translate the following to French: {{English_Message}}
```

---

*Maintained by: Head of Tech | Contact: info@kingkenglobal.com.ng | https://www.kingkenglobal.com.ng*
