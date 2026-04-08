/**
 * @file deduplicate-candidates.gs
 * @description Detects and flags duplicate candidate records in the
 *              Kingken Global Recruitment Platform Master Data sheet.
 * @company Kingken Global Travel Agency Ltd.
 */

/** @const {string} MASTER_SHEET Name of the primary candidate sheet */
var MASTER_SHEET = 'Master Data';
/** @const {string} REPORT_SHEET Name of the generated report sheet */
var REPORT_SHEET = 'Duplicate Report';
/** @const {string} DUP_MARKER   Value written into the Duplicates column */
var DUP_MARKER   = 'DUPLICATE - Review';

// Column indices (1-based) in Master Data
var COL_ID         = 1;   // A – CandidateID
var COL_FULL_NAME  = 2;   // B – FullName
var COL_PHONE      = 4;   // D – Phone
var COL_COUNTRY    = 5;   // E – Country
var COL_POSITION   = 6;   // F – Position

/**
 * Scans Master Data for duplicate candidates and flags them.
 *
 * Duplicate detection rules:
 *  - **High confidence**  : two rows share the same normalised phone number.
 *  - **Medium confidence**: two rows share the same (FullName + Country +
 *    Position) combination (case-insensitive).
 *
 * Actions taken:
 *  1. Adds a "Duplicates" column header to Master Data (col Q, index 17) if
 *     it does not already exist.
 *  2. Writes DUP_MARKER into that column for every flagged row.
 *  3. Creates / clears the "Duplicate Report" sheet and populates it with one
 *     row per duplicate pair.
 *  4. Shows a summary alert.
 *
 * @return {void}
 */
function findDuplicateCandidates() {
  var ss     = SpreadsheetApp.getActiveSpreadsheet();
  var master = ss.getSheetByName(MASTER_SHEET);

  if (!master) {
    SpreadsheetApp.getUi().alert('Error: Sheet "' + MASTER_SHEET + '" not found.');
    return;
  }

  var lastRow = master.getLastRow();
  if (lastRow < 2) {
    SpreadsheetApp.getUi().alert('No data rows found in "' + MASTER_SHEET + '".');
    return;
  }

  // ── Ensure "Duplicates" column exists ──────────────────────────────────────
  var dupColIndex = _ensureDupColumn(master);

  // ── Read all relevant columns in one batch ─────────────────────────────────
  var dataRange = master.getRange(2, 1, lastRow - 1, dupColIndex);
  var data      = dataRange.getValues();

  // Maps used for duplicate detection
  // phone (normalised)          → first-seen row index (0-based in data[])
  var phoneMap   = {};
  // "name|country|position" key → first-seen row index
  var comboMap   = {};

  // Duplicate pairs: { rowIndex, duplicateOfIndex, confidence, reason }
  var pairs = [];

  // Track which rows have already been flagged to avoid double-marking
  var flaggedRows = {};

  for (var i = 0; i < data.length; i++) {
    var phone    = _normalisePhone(String(data[i][COL_PHONE - 1]));
    var name     = String(data[i][COL_FULL_NAME - 1]).trim().toLowerCase();
    var country  = String(data[i][COL_COUNTRY   - 1]).trim().toLowerCase();
    var position = String(data[i][COL_POSITION  - 1]).trim().toLowerCase();
    var comboKey = name + '|' + country + '|' + position;

    // ── Phone duplicate (High) ───────────────────────────────────────────────
    if (phone && phone !== '') {
      if (phoneMap.hasOwnProperty(phone)) {
        var orig = phoneMap[phone];
        pairs.push({ row: i, dupOf: orig, confidence: 'High', reason: 'Same phone: ' + phone });
        flaggedRows[i]    = true;
        flaggedRows[orig] = true;
      } else {
        phoneMap[phone] = i;
      }
    }

    // ── Name + Country + Position duplicate (Medium) ─────────────────────────
    if (name && country && position) {
      if (comboMap.hasOwnProperty(comboKey) && !flaggedRows[i]) {
        var origCombo = comboMap[comboKey];
        pairs.push({ row: i, dupOf: origCombo, confidence: 'Medium', reason: 'Same Name + Country + Position' });
        flaggedRows[i]         = true;
        flaggedRows[origCombo] = true;
      } else if (!comboMap.hasOwnProperty(comboKey)) {
        comboMap[comboKey] = i;
      }
    }
  }

  // ── Write DUP_MARKER back into master data ─────────────────────────────────
  var dupColValues = dataRange.getValues(); // re-read to preserve existing data
  for (var ri in flaggedRows) {
    dupColValues[ri][dupColIndex - 1] = DUP_MARKER;
  }
  dataRange.setValues(dupColValues);

  // ── Build Duplicate Report sheet ───────────────────────────────────────────
  var report = _getOrCreateReportSheet(ss);
  _writeReportRows(report, data, pairs);

  var summary =
    '🔍 Duplicate Scan Complete\n\n' +
    'Total flagged rows : ' + Object.keys(flaggedRows).length + '\n' +
    'Duplicate pairs    : ' + pairs.length + '\n\n' +
    'No records were deleted.\n' +
    'Review "' + REPORT_SHEET + '" sheet for details.';

  Logger.log(summary);
  SpreadsheetApp.getUi().alert(summary);
}

// ─── Private Helpers ─────────────────────────────────────────────────────────

/**
 * Ensures a "Duplicates" header exists in the last-used column + 1.
 * Returns the 1-based column index of the Duplicates column.
 *
 * @private
 * @param  {GoogleAppsScript.Spreadsheet.Sheet} sheet The master sheet.
 * @return {number} 1-based column index.
 */
function _ensureDupColumn(sheet) {
  var lastCol  = sheet.getLastColumn();
  var headers  = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  var dupIndex = -1;

  for (var c = 0; c < headers.length; c++) {
    if (String(headers[c]).trim().toLowerCase() === 'duplicates') {
      dupIndex = c + 1; // 1-based
      break;
    }
  }

  if (dupIndex === -1) {
    dupIndex = lastCol + 1;
    sheet.getRange(1, dupIndex).setValue('Duplicates');
    Logger.log('Created "Duplicates" column at index ' + dupIndex);
  }
  return dupIndex;
}

/**
 * Returns an existing "Duplicate Report" sheet or creates a fresh one.
 *
 * @private
 * @param  {GoogleAppsScript.Spreadsheet.Spreadsheet} ss The active spreadsheet.
 * @return {GoogleAppsScript.Spreadsheet.Sheet}
 */
function _getOrCreateReportSheet(ss) {
  var sheet = ss.getSheetByName(REPORT_SHEET);
  if (sheet) {
    sheet.clearContents();
  } else {
    sheet = ss.insertSheet(REPORT_SHEET);
  }

  // Write headers
  var headers = ['CandidateID', 'FullName', 'Phone', 'Duplicate Of (CandidateID)', 'Confidence', 'Reason'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#4A90D9')
    .setFontColor('#FFFFFF');

  return sheet;
}

/**
 * Writes one report row per duplicate pair.
 *
 * @private
 * @param  {GoogleAppsScript.Spreadsheet.Sheet} report The report sheet.
 * @param  {Array<Array<*>>}                    data   Master data rows (0-based).
 * @param  {Array<Object>}                      pairs  Duplicate pair objects.
 * @return {void}
 */
function _writeReportRows(report, data, pairs) {
  if (pairs.length === 0) return;

  var rows = pairs.map(function (p) {
    var r = data[p.row];
    var o = data[p.dupOf];
    return [
      String(r[COL_ID        - 1]),
      String(r[COL_FULL_NAME - 1]),
      String(r[COL_PHONE     - 1]),
      String(o[COL_ID        - 1]),
      p.confidence,
      p.reason
    ];
  });

  report.getRange(2, 1, rows.length, 6).setValues(rows);

  // Colour-code by confidence
  for (var i = 0; i < rows.length; i++) {
    var colour = pairs[i].confidence === 'High' ? '#FADADD' : '#FFF3CD';
    report.getRange(i + 2, 1, 1, 6).setBackground(colour);
  }
}

/**
 * Strips formatting characters and leading zeros from a phone string for
 * comparison purposes.
 *
 * @private
 * @param  {string} phone Raw phone string.
 * @return {string}       Normalised phone string.
 */
function _normalisePhone(phone) {
  return phone.replace(/[\s\-().+]/g, '').replace(/^0+/, '');
}
