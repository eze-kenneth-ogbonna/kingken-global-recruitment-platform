/**
 * @file normalize-phones.gs
 * @description Normalizes phone numbers in the Master Data sheet for
 *              Kingken Global Recruitment Platform.
 * @company Kingken Global Travel Agency Ltd.
 */

/** @const {Object.<string, string>} DIAL_CODES Map of country name to dial code */
var DIAL_CODES = {
  'nigeria':              '+234',
  'ghana':                '+233',
  'kenya':                '+254',
  'ethiopia':             '+251',
  'uganda':               '+256',
  'tanzania':             '+255',
  'kuwait':               '+965',
  'uae':                  '+971',
  'united arab emirates': '+971',
  'qatar':                '+974',
  'saudi arabia':         '+966',
  'bahrain':              '+973',
  'oman':                 '+968',
  'egypt':                '+20',
  'cameroon':             '+237',
  'senegal':              '+221'
};

/** @const {number} PHONE_COL  Column D (1-indexed) */
var PHONE_COL   = 4;
/** @const {number} COUNTRY_COL Column E (1-indexed) */
var COUNTRY_COL = 5;
/** @const {number} NOTES_COL  Column P (1-indexed) */
var NOTES_COL   = 16;
/** @const {string} SHEET_NAME Name of the master data sheet */
var SHEET_NAME  = 'Master Data';

/**
 * Normalizes all phone numbers in the Master Data sheet.
 *
 * For each row the function:
 *  1. Strips whitespace, dashes, parentheses from the raw phone string.
 *  2. Looks up the dial code for the country in column E.
 *  3. If the number already starts with '+', leaves it unchanged.
 *  4. If the number starts with '0', strips the leading zero then prepends
 *     the dial code.
 *  5. Otherwise prepends the dial code directly.
 *  6. Writes the normalized value back to column D.
 *  7. Appends the original value to the Notes column if a change was made.
 *
 * On completion, displays a UI alert with the change summary.
 *
 * @return {void}
 */
function normalizeAllPhones() {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    SpreadsheetApp.getUi().alert('Error: Sheet "' + SHEET_NAME + '" not found.');
    Logger.log('normalizeAllPhones: sheet not found – ' + SHEET_NAME);
    return;
  }

  var lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    SpreadsheetApp.getUi().alert('No data rows found in "' + SHEET_NAME + '".');
    return;
  }

  // Fetch phone, country, and notes columns in one batch read
  var phoneRange   = sheet.getRange(2, PHONE_COL,   lastRow - 1, 1);
  var countryRange = sheet.getRange(2, COUNTRY_COL, lastRow - 1, 1);
  var notesRange   = sheet.getRange(2, NOTES_COL,   lastRow - 1, 1);

  var phones    = phoneRange.getValues();
  var countries = countryRange.getValues();
  var notes     = notesRange.getValues();

  var changeCount   = 0;
  var errorCount    = 0;
  var skippedCount  = 0;

  for (var i = 0; i < phones.length; i++) {
    try {
      var rawPhone = String(phones[i][0]).trim();

      if (!rawPhone || rawPhone === '') {
        skippedCount++;
        continue;
      }

      var country    = String(countries[i][0]).trim().toLowerCase();
      var dialCode   = DIAL_CODES[country] || null;
      var normalized = _stripFormatting(rawPhone);

      if (normalized.charAt(0) === '+') {
        // Already has country code prefix – validate digits and leave as-is
        phones[i][0] = normalized;
        continue;
      }

      if (!dialCode) {
        Logger.log('Row ' + (i + 2) + ': unknown country "' + country + '", skipping.');
        skippedCount++;
        continue;
      }

      var finalPhone;
      if (normalized.charAt(0) === '0') {
        finalPhone = dialCode + normalized.substring(1);
      } else {
        finalPhone = dialCode + normalized;
      }

      if (finalPhone !== rawPhone) {
        // Preserve the original in Notes
        var existingNote = String(notes[i][0]).trim();
        var noteTag      = '[original phone: ' + rawPhone + ']';
        if (existingNote.indexOf('[original phone:') === -1) {
          notes[i][0] = existingNote
            ? existingNote + ' ' + noteTag
            : noteTag;
        }
        phones[i][0] = finalPhone;
        changeCount++;
        Logger.log('Row ' + (i + 2) + ': ' + rawPhone + ' → ' + finalPhone);
      }
    } catch (err) {
      Logger.log('Row ' + (i + 2) + ' error: ' + err.message);
      errorCount++;
    }
  }

  // Batch write all changes back
  phoneRange.setValues(phones);
  notesRange.setValues(notes);

  var summary =
    '✅ Phone Normalization Complete\n\n' +
    'Changed:  ' + changeCount  + '\n' +
    'Skipped:  ' + skippedCount + '\n' +
    'Errors:   ' + errorCount   + '\n\n' +
    'Original values preserved in Notes column.';

  Logger.log(summary);
  SpreadsheetApp.getUi().alert(summary);
}

// ─── Private Helpers ─────────────────────────────────────────────────────────

/**
 * Removes spaces, dashes, parentheses, and dots from a phone string.
 *
 * @private
 * @param  {string} raw Raw phone number string.
 * @return {string}     Cleaned phone number string.
 */
function _stripFormatting(raw) {
  return raw.replace(/[\s\-().]/g, '');
}
