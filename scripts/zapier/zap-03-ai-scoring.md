# Zap 03 — AI Score New Candidate via OpenAI

**Zap Name:** `Kingken - AI Score New Candidate via OpenAI`  
**Platform:** Kingken Global Recruitment Platform  
**Company:** Kingken Global Travel Agency Ltd.  
**Status:** Production

---

## Overview

Triggers on every new Master Data row, checks whether the AI_Score field is empty, sends the candidate's data to OpenAI (gpt-4o), parses the structured JSON response, then writes the numeric score and recommendation back to the Master Data sheet.

---

## Trigger

| Setting | Value |
|---|---|
| App | Google Sheets |
| Event | New Spreadsheet Row |
| Spreadsheet | *(Kingken Master Spreadsheet)* |
| Worksheet | **Master Data** |

---

## Filter — Only Continue if AI_Score is Empty

| Setting | Value |
|---|---|
| App | Filter by Zapier |
| Condition | AI_Score (column L) **is empty** |

Prevents re-scoring candidates that already have a score.

---

## Action 1 — OpenAI (Send Prompt)

| Setting | Value |
|---|---|
| App | OpenAI (GPT-4, DALL-E, Whisper) |
| Event | Send Prompt |
| Model | `gpt-4o` |
| Max Tokens | `600` |
| Temperature | `0.3` |

**System Message:**

```
You are a recruitment screening AI for Kingken Global Travel Agency Ltd, an international recruitment agency placing African workers in Kuwait, UAE, Qatar, Bahrain, Saudi Arabia, and Oman. Your role is to objectively evaluate candidate applications based on Gulf recruitment demand and return a structured JSON score. Always return ONLY valid JSON with no markdown code fences or extra text.
```

**User Prompt Template:**

```
Score the following candidate application from 0 to 100 based on their suitability for international Gulf placement.

CANDIDATE DATA:
  Name               : {{FullName}}
  Country of Origin  : {{Country}}
  Position Applied   : {{Position}}
  Years of Experience: {{ExperienceYears}}
  Passport Available : {{PassportAvailable}}

SCORING CRITERIA (total 100 points):
  1. Position Relevance (30 pts)
     - Roles in high Gulf demand (domestic worker, driver, cleaner, cook, security guard, construction worker, nanny/caregiver, factory worker): 25–30 pts
     - Roles with moderate demand: 15–24 pts
     - Roles with low Gulf demand: 0–14 pts

  2. Experience Level (25 pts)
     - 5+ years: 20–25 pts
     - 2–4 years: 12–19 pts
     - 1 year: 8–11 pts
     - 0 years (new entrant): 0–7 pts

  3. Passport Status (20 pts)
     - Passport available ("Yes"): 20 pts
     - Passport not available ("No"): 0 pts

  4. Communication Clarity (15 pts)
     - Infer from completeness and coherence of the data provided.
     - Complete, clear data: 12–15 pts
     - Partial data: 6–11 pts
     - Very sparse data: 0–5 pts

  5. Country / Corridor Strength (10 pts)
     - Strong Gulf placement corridors (Nigeria, Ghana, Ethiopia, Kenya, Uganda, Philippines): 8–10 pts
     - Moderate corridors (Tanzania, Cameroon, Senegal): 5–7 pts
     - Other countries: 0–4 pts

Return ONLY this JSON (no markdown, no code fences, no explanation):
{
  "score": <integer 0-100>,
  "strengths": ["<strength 1>", "<strength 2>"],
  "weaknesses": ["<weakness 1>", "<weakness 2>"],
  "recommendation": "<Approve|Review|Reject>",
  "summary": "<2 to 3 sentence professional summary of this candidate>"
}
```

---

## Action 2 — Code by Zapier (Parse JSON Response)

| Setting | Value |
|---|---|
| App | Code by Zapier |
| Event | Run JavaScript |

**Input data:**

| Variable Name | Value |
|---|---|
| `rawResponse` | OpenAI: Response Text (the full text output from Action 1) |

**JavaScript code:**

```javascript
// Strip any accidental markdown code fences
let cleaned = inputData.rawResponse
  .replace(/^```[a-z]*\n?/i, '')
  .replace(/\n?```$/i, '')
  .trim();

let parsed;
try {
  parsed = JSON.parse(cleaned);
} catch (e) {
  // Fallback: return safe defaults if JSON is malformed
  output = [{
    score:          '0',
    strengths:      'Unable to parse AI response',
    weaknesses:     'Parsing error: ' + e.message,
    recommendation: 'Review',
    summary:        'AI scoring failed. Manual review required.'
  }];
  return;
}

const score          = Number(parsed.score          || 0);
const recommendation = String(parsed.recommendation || 'Review');
const summary        = String(parsed.summary        || '');
const strengths      = Array.isArray(parsed.strengths)  ? parsed.strengths.join('; ')  : String(parsed.strengths  || '');
const weaknesses     = Array.isArray(parsed.weaknesses) ? parsed.weaknesses.join('; ') : String(parsed.weaknesses || '');

const notesValue = recommendation + ': ' + summary
  + '\nStrengths: '  + strengths
  + '\nWeaknesses: ' + weaknesses;

output = [{ score, recommendation, summary, strengths, weaknesses, notesValue }];
```

**Output variables used in next steps:**

- `score` — numeric score (0–100)
- `notesValue` — formatted notes string

---

## Action 3 — Google Sheets (Update Spreadsheet Row)

| Setting | Value |
|---|---|
| App | Google Sheets |
| Event | Update Spreadsheet Row |
| Spreadsheet | *(Kingken Master Spreadsheet)* |
| Worksheet | **Master Data** |
| Row | Google Sheets trigger: Row Number |

**Field update mapping:**

| Column | Field | Value |
|---|---|---|
| L | AI_Score | Code: `score` |
| P | Notes | Code: `notesValue` |
| N | LastUpdated | `{{zap_meta_human_now}}` |

> **Note:** Only update Notes (column P) if it is currently empty. To achieve this, add a Filter before this action: Notes **is empty**. Otherwise the Zap will overwrite manually written notes.

---

## Testing Instructions

1. Add a test row to Master Data with:
   - FullName = `Amara Osei`
   - Country = `Ghana`
   - Position = `Domestic Worker`
   - ExperienceYears = `3`
   - PassportAvailable = `Yes`
   - AI_Score = *(leave blank)*
2. In Zapier, click **Test Zap**.
3. Verify Action 1 returns a JSON string in the OpenAI response.
4. Verify Action 2 parses the JSON and shows `score`, `recommendation`, etc. in the output.
5. Verify Action 3 writes the score to column L and notes to column P.
6. Open Master Data and confirm the row was updated.
7. Delete the test row when done.

---

## Common Errors and Fixes

| Error | Cause | Fix |
|---|---|---|
| OpenAI: `API timeout` | Request took longer than Zapier's 30s limit | Retry — gpt-4o is usually under 10s. If persistent, switch to `gpt-4o-mini` for faster responses |
| Code step: `SyntaxError: Unexpected token` | OpenAI returned markdown-wrapped JSON | The code already strips code fences. If still failing, log `inputData.rawResponse` and inspect the raw output format |
| Sheets: `Row not found` | Row number from trigger is stale | Ensure you're using the **Row Number** field from the Google Sheets trigger (not hardcoded). The Row Number is the actual spreadsheet row index |
| Filter stopping all rows | AI_Score column has spaces or formula leftovers | Clear column L for unscored rows using Edit → Find & Replace → replace single spaces with nothing |
| `401 Unauthorized` on OpenAI | API key expired or invalid | Reconnect the OpenAI app in Zapier → My Apps → OpenAI |
| Score written as text, not number | Zapier treating number as string | In the Sheets Update action, ensure the AI_Score field is mapped directly to the Code output `score` variable |
