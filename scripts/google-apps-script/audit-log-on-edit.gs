/**
 * @file audit-log-on-edit.gs
 * @description Installable onEdit trigger that logs every sensitive column
 *              change to an "Audit Log" sheet in the Kingken Global Recruitment
 *              Platform spreadsheet.
 * @company Kingken Global Travel Agency Ltd.
 *
 * INSTALLATION
 * ─────────────
 * This is an *installable* trigger (not a simple trigger) because it calls
 * Session.getActiveUser().getEmail() which requires elevated OAuth scope.
 *
 * To install:
 *  1. Open Apps Script editor → Triggers (clock icon) → + Add Trigger.
 *  2. Function: onEditAuditLog | Event source: Spreadsheet | Event type: On edit.
 *  3. Save. Authorise when prompted.
 */

// ─── Constants ────────────────────────────────────────────────────────────────

/** @const {string} TRACKED_SHEET Master sheet that is audited */
var AUDIT_TRACKED_SHEET = 'Master Data';
/** @const {string} AUDIT_SHEET   Destination sheet for log entries */
var AUDIT_SHEET_NAME    = 'Audit Log';

/**
 * Columns that are tracked, keyed by 1-based column index.
 * Sensitive business fields only.
 * @const {Object.<number, string>}
 */
var TRACKED_COLUMNS = {
  4:  'Phone',
  6:  'Position',
  11: 'Status',
  12: 'AI_Score',
  13: 'AssignedTo',
  15: 'VisaStatus',
  16: 'Notes'
};

/** @const {number} CANDIDATE_ID_COL Column A holds the CandidateID */
var CANDIDATE_ID_COL = 1;

/** @const {Array<string>} AUDIT_HEADERS Column headers for the Audit Log */
var AUDIT_HEADERS = [
  'Timestamp',
  'EditorEmail',
  'SheetName',
  'RowNumber',
  'CandidateID',
  'ColumnName',
  'OldValue',
  'NewValue'
];

// ─── Main Trigger Function ────────────────────────────────────────────────────

/**
 * Installable onEdit trigger handler.
 *
 * Logs every edit on a tracked column in "Master Data" to the "Audit Log"
 * sheet.  Handles both single-cell and multi-cell (range) edits.
 *
 * @param {GoogleAppsScript.Events.SheetsOnEdit} e The edit event object.
 * @return {void}
 */
function onEditAuditLog(e) {
  try {
    if (!e || !e.range) return;

    var sheet = e.range.getSheet();
    if (sheet.getName() !== AUDIT_TRACKED_SHEET) return;

    var ss        = SpreadsheetApp.getActiveSpreadsheet();
    var auditSheet = _getOrCreateAuditSheet(ss);

    var range       = e.range;
    var startRow    = range.getRow();
    var startCol    = range.getColumn();
    var numRows     = range.getNumRows();
    var numCols     = range.getNumColumns();
    var timestamp   = new Date();
    var editorEmail = _safeGetEmail();
    var sheetName   = sheet.getName();

    // Collect new values from the edited range
    var newValues = range.getValues();

    // Collect old values – available only for single-cell edits via e.oldValue
    // For multi-cell edits we record empty string as old value.
    var isSingleCell = (numRows === 1 && numCols === 1);

    var logEntries = [];

    for (var r = 0; r < numRows; r++) {
      var absoluteRow = startRow + r;
      if (absoluteRow < 2) continue; // skip header row

      var candidateId = _getCandidateId(sheet, absoluteRow);

      for (var c = 0; c < numCols; c++) {
        var absoluteCol = startCol + c;

        if (!TRACKED_COLUMNS.hasOwnProperty(absoluteCol)) continue;

        var columnName = TRACKED_COLUMNS[absoluteCol];
        var newValue   = newValues[r][c];
        var oldValue   = isSingleCell ? (e.oldValue !== undefined ? e.oldValue : '') : '';

        // Skip if value did not change (relevant for batch range edits)
        if (String(oldValue) === String(newValue)) continue;

        logEntries.push([
          timestamp,
          editorEmail,
          sheetName,
          absoluteRow,
          candidateId,
          columnName,
          oldValue,
          newValue
        ]);
      }
    }

    if (logEntries.length > 0) {
      var nextRow = auditSheet.getLastRow() + 1;
      auditSheet.getRange(nextRow, 1, logEntries.length, AUDIT_HEADERS.length)
        .setValues(logEntries);
    }

  } catch (err) {
    // Never surface an error to the user during a live edit
    Logger.log('onEditAuditLog error: ' + err.message + '\n' + err.stack);
  }
}

// ─── Setup Helper ─────────────────────────────────────────────────────────────

/**
 * Protects the Audit Log sheet so that only spreadsheet Editors (admins) can
 * edit it; all other users get view-only access.
 *
 * Run this function once after deployment.
 *
 * @return {void}
 */
function protectAuditLog() {
  var ss         = SpreadsheetApp.getActiveSpreadsheet();
  var auditSheet = _getOrCreateAuditSheet(ss);
  var protection = auditSheet.protect().setDescription('Audit Log – read only');

  // Remove all existing editors except the current user
  var me = Session.getEffectiveUser();
  protection.addEditor(me);
  protection.removeEditors(protection.getEditors().filter(function (e) {
    return e.getEmail() !== me.getEmail();
  }));

  // Prevent anyone except editors from modifying
  if (protection.canDomainEdit()) {
    protection.setDomainEdit(false);
  }

  SpreadsheetApp.getUi().alert('Audit Log sheet is now protected.');
}

// ─── Private Helpers ─────────────────────────────────────────────────────────

/**
 * Returns the Audit Log sheet, creating it with headers if it does not exist.
 *
 * @private
 * @param  {GoogleAppsScript.Spreadsheet.Spreadsheet} ss Active spreadsheet.
 * @return {GoogleAppsScript.Spreadsheet.Sheet}
 */
function _getOrCreateAuditSheet(ss) {
  var sheet = ss.getSheetByName(AUDIT_SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(AUDIT_SHEET_NAME);
    var headerRange = sheet.getRange(1, 1, 1, AUDIT_HEADERS.length);
    headerRange.setValues([AUDIT_HEADERS]);
    headerRange
      .setFontWeight('bold')
      .setBackground('#37474F')
      .setFontColor('#FFFFFF');
    sheet.setFrozenRows(1);
    Logger.log('Created "' + AUDIT_SHEET_NAME + '" sheet.');
  }
  return sheet;
}

/**
 * Safely retrieves the active user's email.  Returns an empty string if the
 * scope is unavailable (simple trigger context).
 *
 * @private
 * @return {string} Email address or empty string.
 */
function _safeGetEmail() {
  try {
    return Session.getActiveUser().getEmail() || '';
  } catch (err) {
    return '';
  }
}

/**
 * Reads the CandidateID from column A of the given row.
 *
 * @private
 * @param  {GoogleAppsScript.Spreadsheet.Sheet} sheet The master sheet.
 * @param  {number}                             row   1-based row number.
 * @return {string} CandidateID value or empty string.
 */
function _getCandidateId(sheet, row) {
  try {
    return String(sheet.getRange(row, CANDIDATE_ID_COL).getValue());
  } catch (err) {
    return '';
  }
}
