/**
 * @file normalize-phones.gs
 * @description Normalizes phone numbers in the Master Data sheet for
 *              Kingken Global Recruitment Platform.
 * @company Kingken Global Travel Agency Ltd.
 */

/** @const {Object.<string, string>} DIAL_CODES Map of country name to dial code */
const DIAL_CODES = {
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
const PHONE_COL   = 4;
/** @const {number} COUNTRY_COL Column E (1-indexed) */
const COUNTRY_COL = 5;
/** @const {number} NOTES_COL  Column P (1-indexed) */
const NOTES_COL   = 16;
/** @const {string} SHEET_NAME Name of the master data sheet */
const SHEET_NAME  = 'Master Data';

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
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    SpreadsheetApp.getUi().alert('Error: Sheet "' + SHEET_NAME + '" not found.');
    Logger.log('normalizeAllPhones: sheet not found – ' + SHEET_NAME);
    return;
  }

  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    SpreadsheetApp.getUi().alert('No data rows found in "' + SHEET_NAME + '".');
    return;
  }

  // Fetch phone, country, and notes columns in one batch read
  const phoneRange   = sheet.getRange(2, PHONE_COL,   lastRow - 1, 1);
  const countryRange = sheet.getRange(2, COUNTRY_COL, lastRow - 1, 1);
  const notesRange   = sheet.getRange(2, NOTES_COL,   lastRow - 1, 1);

  const phones    = phoneRange.getValues();
  const countries = countryRange.getValues();
  const notes     = notesRange.getValues();

  let changeCount   = 0;
  let errorCount    = 0;
  let skippedCount  = 0;

  for (let i = 0; i < phones.length; i++) {
    try {
      const rawPhone = String(phones[i][0]).trim();

      if (!rawPhone || rawPhone === '') {
        skippedCount++;
        continue;
      }

      const country    = String(countries[i][0]).trim().toLowerCase();
      const dialCode   = DIAL_CODES[country] || null;
      const normalized = _stripFormatting(rawPhone);

      if (normalized.charAt(0) === '+') {
        // Already has country code prefix – apply formatting cleanup if needed
        if (normalized !== rawPhone) {
          const existingNote = String(notes[i][0]).trim();
          const noteTag      = '[original phone: ' + rawPhone + ']';
          if (existingNote.indexOf('[original phone:') === -1) {
            notes[i][0] = existingNote
              ? existingNote + ' ' + noteTag
              : noteTag;
          }
          phones[i][0] = normalized;
          changeCount++;
          Logger.log('Row ' + (i + 2) + ': ' + rawPhone + ' → ' + normalized);
        }
        continue;
      }

      if (!dialCode) {
        Logger.log('Row ' + (i + 2) + ': unknown country "' + country + '", skipping.');
        skippedCount++;
        continue;
      }

      let finalPhone;
      if (normalized.charAt(0) === '0') {
        finalPhone = dialCode + normalized.substring(1);
      } else {
        finalPhone = dialCode + normalized;
      }

      if (finalPhone !== rawPhone) {
        // Preserve the original in Notes
        const existingNote = String(notes[i][0]).trim();
        const noteTag      = '[original phone: ' + rawPhone + ']';
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

  const summary =
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
