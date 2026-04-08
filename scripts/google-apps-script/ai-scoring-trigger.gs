/**
 * @file ai-scoring-trigger.gs
 * @description Scores candidate records using the OpenAI API (gpt-4o) for the
 *              Kingken Global Recruitment Platform.
 * @company Kingken Global Travel Agency Ltd.
 *
 * SETUP
 * ──────
 * Before running, store your OpenAI API key via the helper function:
 *   setOpenAIKey()   — opens a prompt to enter the key, then saves it in
 *                      Script Properties under 'OPENAI_API_KEY'.
 *
 * Column map (Master Data sheet, 1-based):
 *   A=1  CandidateID
 *   B=2  FullName
 *   D=4  Phone
 *   E=5  Country
 *   F=6  Position
 *   G=7  ExperienceYears
 *   H=8  PassportAvailable
 *   L=12 AI_Score
 *   P=16 Notes
 */

// ─── Column Constants ────────────────────────────────────────────────────────

var AI_MASTER_SHEET    = 'Master Data';
var AI_COL_ID          = 1;
var AI_COL_NAME        = 2;
var AI_COL_COUNTRY     = 5;
var AI_COL_POSITION    = 6;
var AI_COL_EXPERIENCE  = 7;
var AI_COL_PASSPORT    = 8;
var AI_COL_SCORE       = 12;
var AI_COL_NOTES       = 16;

var OPENAI_ENDPOINT    = 'https://api.openai.com/v1/chat/completions';
var OPENAI_MODEL       = 'gpt-4o';
var API_RATE_DELAY_MS  = 1000; // ms between successive API calls

// ─── Public Functions ─────────────────────────────────────────────────────────

/**
 * Scores a single candidate row by calling the OpenAI API.
 *
 * @param {number} rowNumber 1-based row number in "Master Data" to score.
 * @return {void}
 */
function scoreCandidateWithAI(rowNumber) {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(AI_MASTER_SHEET);

  if (!sheet) {
    Logger.log('scoreCandidateWithAI: sheet not found – ' + AI_MASTER_SHEET);
    return;
  }
  if (rowNumber < 2) {
    Logger.log('scoreCandidateWithAI: invalid row number ' + rowNumber);
    return;
  }

  var candidate = _readCandidate(sheet, rowNumber);
  var result    = _callOpenAI(candidate);

  _writeResult(sheet, rowNumber, result);
}

/**
 * Finds all unscored rows (AI_Score column is empty) and scores them
 * sequentially with a rate-limiting pause between each API call.
 *
 * Displays a summary alert when finished.
 *
 * @return {void}
 */
function scoreAllUnscored() {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(AI_MASTER_SHEET);

  if (!sheet) {
    SpreadsheetApp.getUi().alert('Error: "' + AI_MASTER_SHEET + '" sheet not found.');
    return;
  }

  var lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    SpreadsheetApp.getUi().alert('No candidate rows found.');
    return;
  }

  var scoreCol = sheet.getRange(2, AI_COL_SCORE, lastRow - 1, 1).getValues();

  var scored  = 0;
  var errors  = 0;
  var skipped = 0;

  for (var i = 0; i < scoreCol.length; i++) {
    var rowNumber = i + 2; // 1-based
    var existing  = String(scoreCol[i][0]).trim();

    if (existing !== '' && existing !== 'SCORE_ERROR') {
      skipped++;
      continue;
    }

    try {
      var candidate = _readCandidate(sheet, rowNumber);
      var result    = _callOpenAI(candidate);
      _writeResult(sheet, rowNumber, result);
      scored++;
      Logger.log('Row ' + rowNumber + ' scored: ' + (result.score || 'error'));
    } catch (err) {
      Logger.log('Row ' + rowNumber + ' scoring error: ' + err.message);
      sheet.getRange(rowNumber, AI_COL_SCORE).setValue('SCORE_ERROR');
      errors++;
    }

    Utilities.sleep(API_RATE_DELAY_MS);
  }

  var summary =
    '🤖 AI Scoring Complete\n\n' +
    'Scored  : ' + scored  + '\n' +
    'Skipped : ' + skipped + ' (already scored)\n' +
    'Errors  : ' + errors  + '\n\n' +
    'Review "SCORE_ERROR" rows manually.';

  Logger.log(summary);
  SpreadsheetApp.getUi().alert(summary);
}

/**
 * Opens a UI prompt so the operator can enter and save the OpenAI API key
 * to Script Properties.
 *
 * Run this function once during initial setup.
 *
 * @return {void}
 */
function setOpenAIKey() {
  var ui       = SpreadsheetApp.getUi();
  var response = ui.prompt(
    'Set OpenAI API Key',
    'Paste your OpenAI API key (sk-…):',
    ui.ButtonSet.OK_CANCEL
  );

  if (response.getSelectedButton() === ui.Button.OK) {
    var key = response.getResponseText().trim();
    if (!key || key.indexOf('sk-') !== 0) {
      ui.alert('Invalid key format. Key should start with "sk-". Not saved.');
      return;
    }
    PropertiesService.getScriptProperties().setProperty('OPENAI_API_KEY', key);
    ui.alert('✅ OpenAI API key saved successfully in Script Properties.');
  } else {
    ui.alert('Cancelled. No changes made.');
  }
}

// ─── Private Helpers ─────────────────────────────────────────────────────────

/**
 * Reads candidate data from a single row.
 *
 * @private
 * @param  {GoogleAppsScript.Spreadsheet.Sheet} sheet      Master Data sheet.
 * @param  {number}                             rowNumber  1-based row.
 * @return {Object} Candidate field object.
 */
function _readCandidate(sheet, rowNumber) {
  var maxCol = Math.max(AI_COL_SCORE, AI_COL_NOTES);
  var row    = sheet.getRange(rowNumber, 1, 1, maxCol).getValues()[0];

  return {
    id:         String(row[AI_COL_ID         - 1] || ''),
    name:       String(row[AI_COL_NAME       - 1] || ''),
    country:    String(row[AI_COL_COUNTRY    - 1] || ''),
    position:   String(row[AI_COL_POSITION   - 1] || ''),
    experience: String(row[AI_COL_EXPERIENCE - 1] || 'Not specified'),
    passport:   String(row[AI_COL_PASSPORT   - 1] || 'Not specified'),
    existingNotes: String(row[AI_COL_NOTES   - 1] || '')
  };
}

/**
 * Builds the prompt and calls the OpenAI Chat Completions API.
 *
 * @private
 * @param  {Object} candidate Candidate data object.
 * @return {Object}           Parsed JSON result from OpenAI.
 * @throws {Error}            If the API call fails or returns invalid JSON.
 */
function _callOpenAI(candidate) {
  var apiKey = PropertiesService.getScriptProperties().getProperty('OPENAI_API_KEY');
  if (!apiKey) throw new Error('OPENAI_API_KEY not set. Run setOpenAIKey() first.');

  var systemMessage =
    'You are a recruitment screening AI for Kingken Global Travel Agency Ltd, ' +
    'an international recruitment agency placing African workers in Kuwait, UAE, ' +
    'Qatar, and other Gulf countries. Evaluate candidate applications objectively ' +
    'and return ONLY valid JSON with no markdown code blocks.';

  var userMessage =
    'Score the following candidate application from 0–100.\n\n' +
    'Candidate:\n' +
    '  Name              : ' + candidate.name       + '\n' +
    '  Country           : ' + candidate.country    + '\n' +
    '  Position          : ' + candidate.position   + '\n' +
    '  Years of Experience: ' + candidate.experience + '\n' +
    '  Passport Available: ' + candidate.passport   + '\n\n' +
    'Scoring criteria:\n' +
    '  - Position relevance (30 pts): Is the candidate applying for a role that ' +
    '    matches Gulf demand (domestic worker, driver, cleaner, cook, security, ' +
    '    construction, nanny, factory)?\n' +
    '  - Experience level (25 pts): Years of relevant experience. 0 = new entrant, ' +
    '    5+ = experienced.\n' +
    '  - Passport status (20 pts): Passport available = full marks, not available = 0.\n' +
    '  - Communication clarity (15 pts): Infer from the data quality provided.\n' +
    '  - Country / availability (10 pts): Is the source country a strong corridor ' +
    '    for Gulf placement?\n\n' +
    'Return ONLY this JSON object (no markdown, no extra text):\n' +
    '{\n' +
    '  "score": <integer 0-100>,\n' +
    '  "strengths": ["<strength1>", "<strength2>"],\n' +
    '  "weaknesses": ["<weakness1>", "<weakness2>"],\n' +
    '  "recommendation": "<Approve|Review|Reject>",\n' +
    '  "summary": "<2-3 sentence summary>"\n' +
    '}';

  var payload = {
    model: OPENAI_MODEL,
    messages: [
      { role: 'system', content: systemMessage },
      { role: 'user',   content: userMessage   }
    ],
    temperature: 0.3,
    max_tokens:  500
  };

  var options = {
    method:             'post',
    contentType:        'application/json',
    headers:            { Authorization: 'Bearer ' + apiKey },
    payload:            JSON.stringify(payload),
    muteHttpExceptions: true
  };

  var response   = UrlFetchApp.fetch(OPENAI_ENDPOINT, options);
  var statusCode = response.getResponseCode();
  var bodyText   = response.getContentText();

  if (statusCode !== 200) {
    throw new Error('OpenAI API error ' + statusCode + ': ' + bodyText.substring(0, 200));
  }

  var body    = JSON.parse(bodyText);
  var content = body.choices[0].message.content.trim();

  // Strip accidental markdown code fences if present
  content = content.replace(/^```[a-z]*\n?/i, '').replace(/\n?```$/i, '').trim();

  return JSON.parse(content);
}

/**
 * Writes the AI scoring result back to the sheet.
 * Only writes to Notes if the Notes cell is currently empty.
 *
 * @private
 * @param  {GoogleAppsScript.Spreadsheet.Sheet} sheet      Master Data sheet.
 * @param  {number}                             rowNumber  1-based row.
 * @param  {Object}                             result     Parsed OpenAI JSON.
 * @return {void}
 */
function _writeResult(sheet, rowNumber, result) {
  // Write AI Score
  sheet.getRange(rowNumber, AI_COL_SCORE).setValue(result.score || 0);

  // Write Notes only if empty
  var existingNotes = String(sheet.getRange(rowNumber, AI_COL_NOTES).getValue()).trim();
  if (!existingNotes) {
    var noteText =
      result.recommendation + ': ' + result.summary + '\n' +
      'Strengths: '  + (result.strengths  || []).join('; ') + '\n' +
      'Weaknesses: ' + (result.weaknesses || []).join('; ');
    sheet.getRange(rowNumber, AI_COL_NOTES).setValue(noteText);
  }
}
