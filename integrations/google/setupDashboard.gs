/**
 * setupDashboard.gs
 *
 * Google Apps Script — run once from script.google.com (in the same project
 * that is bound to your linked Google Sheet) to:
 *   1. Rename the auto-created responses sheet to "Form Responses 1" if needed.
 *   2. Create (or reset) a "Dashboard" sheet with summary formulas.
 *
 * Column layout assumed in "Form Responses 1":
 *   A  Timestamp
 *   B  Full Name
 *   C  Phone Number
 *   D  Nationality
 *   E  Position Applying For
 *   F  Years of Experience
 *   G  Passport Available?
 *   H  CV Upload (Drive link)
 *
 * Additional columns added manually AFTER the form response columns:
 *   I  Amount charged (manually entered per applicant)
 *   J  Amount paid    (manually entered per applicant)
 *   I  Balance        (formula: =H-I per row on the responses sheet, or =B3-B4 total on Dashboard)
 *
 * Usage:
 *   1. Open the Google Sheet linked to your form.
 *   2. Click Extensions → Apps Script.
 *   3. Paste this file's contents into the editor.
 *   4. Run setupDashboard().
 */

// ── Configurable column references ──────────────────────────────────────────
/** Column letter that holds the "Amount Charged" values in Form Responses. */
const AMOUNT_COL = 'I';

/** Column letter that holds the "Amount Paid" values in Form Responses. */
const PAID_COL = 'J';

/** Name of the raw responses sheet (Google Forms default). */
const RESPONSES_SHEET_NAME = 'Form Responses 1';

/** Name of the summary sheet to create. */
const DASHBOARD_SHEET_NAME = 'Dashboard';
// ────────────────────────────────────────────────────────────────────────────

/**
 * Creates or resets the Dashboard sheet with summary KPI formulas.
 */
function setupDashboard() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Verify the responses sheet exists.
  const responsesSheet = ss.getSheetByName(RESPONSES_SHEET_NAME);
  if (!responsesSheet) {
    const msg =
      'Sheet "' + RESPONSES_SHEET_NAME + '" not found.\n' +
      'Please link the Google Form to this spreadsheet first, then re-run setupDashboard().';
    Logger.log('❌ ' + msg);
    SpreadsheetApp.getUi().alert(msg);
    return;
  }

  // Remove existing Dashboard sheet (if any) so we always start clean.
  let dashboardSheet = ss.getSheetByName(DASHBOARD_SHEET_NAME);
  if (dashboardSheet) {
    ss.deleteSheet(dashboardSheet);
  }

  // Create the Dashboard sheet after the responses sheet.
  dashboardSheet = ss.insertSheet(DASHBOARD_SHEET_NAME, ss.getNumSheets());

  // ── Column headers ─────────────────────────────────────────────────────────
  dashboardSheet.getRange('A1').setValue('Metric');
  dashboardSheet.getRange('B1').setValue('Value');

  const headers = dashboardSheet.getRange('A1:B1');
  headers.setFontWeight('bold');
  headers.setBackground('#1a73e8');
  headers.setFontColor('#ffffff');

  // ── KPI rows ───────────────────────────────────────────────────────────────
  const rows = [
    [
      'Total Applicants',
      // Count non-empty rows in column A (Timestamp) of the responses sheet,
      // excluding the header row.
      "=COUNTA('" + RESPONSES_SHEET_NAME + "'!A2:A)"
    ],
    [
      'Total Revenue (Amount Charged)',
      "=SUM('" + RESPONSES_SHEET_NAME + "'!" + AMOUNT_COL + '2:' + AMOUNT_COL + ')'
    ],
    [
      'Total Paid',
      "=SUM('" + RESPONSES_SHEET_NAME + "'!" + PAID_COL + '2:' + PAID_COL + ')'
    ],
    [
      'Outstanding Balance',
      // Balance = Total Revenue − Total Paid
      '=B3-B4'
    ],
    [
      'Passport Holders',
      // Count applicants who answered "Yes" to Passport Available? (column G)
      "=COUNTIF('" + RESPONSES_SHEET_NAME + "'!G2:G,\"Yes\")"
    ],
    [
      'No Passport',
      "=COUNTIF('" + RESPONSES_SHEET_NAME + "'!G2:G,\"No\")"
    ],
  ];

  dashboardSheet.getRange(2, 1, rows.length, 2).setValues(rows);

  // ── Status breakdown heading ───────────────────────────────────────────────
  const statusStartRow = rows.length + 3;
  dashboardSheet.getRange(statusStartRow, 1).setValue('Payment Status Breakdown');
  dashboardSheet.getRange(statusStartRow, 1).setFontWeight('bold');

  dashboardSheet.getRange(statusStartRow + 1, 1).setValue('Pending (Amount Paid = 0)');
  dashboardSheet.getRange(statusStartRow + 1, 2).setFormula(
    "=COUNTIF('" + RESPONSES_SHEET_NAME + "'!" + PAID_COL + '2:' + PAID_COL + ',0)'
  );

  dashboardSheet.getRange(statusStartRow + 2, 1).setValue('Paid in Full');
  dashboardSheet.getRange(statusStartRow + 2, 2).setFormula(
    // "Paid in Full" = rows where Paid >= Amount Charged (and Amount Charged > 0)
    "=SUMPRODUCT(('" + RESPONSES_SHEET_NAME + "'!" + PAID_COL + '2:' + PAID_COL + ">0)*" +
    "('" + RESPONSES_SHEET_NAME + "'!" + PAID_COL + '2:' + PAID_COL + ">=" +
    "'" + RESPONSES_SHEET_NAME + "'!" + AMOUNT_COL + '2:' + AMOUNT_COL + '))'
  );

  dashboardSheet.getRange(statusStartRow + 3, 1).setValue('Partial Payment');
  dashboardSheet.getRange(statusStartRow + 3, 2).setFormula(
    "=SUMPRODUCT(('" + RESPONSES_SHEET_NAME + "'!" + PAID_COL + '2:' + PAID_COL + '>0)*' +
    "('" + RESPONSES_SHEET_NAME + "'!" + PAID_COL + '2:' + PAID_COL + '<' +
    "'" + RESPONSES_SHEET_NAME + "'!" + AMOUNT_COL + '2:' + AMOUNT_COL + '))'
  );

  // ── Formatting ─────────────────────────────────────────────────────────────
  dashboardSheet.setColumnWidth(1, 260);
  dashboardSheet.setColumnWidth(2, 200);

  // Currency format for revenue / paid / balance rows.
  dashboardSheet.getRange('B3:B5').setNumberFormat('₦#,##0.00');

  // Auto-resize remaining columns.
  dashboardSheet.autoResizeColumn(1);

  Logger.log('✅ Dashboard sheet created successfully in "' + ss.getName() + '".');
}

/**
 * Adds a custom menu item to the spreadsheet so operators can re-run
 * setupDashboard() without opening the Apps Script editor.
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Kingken Tools')
    .addItem('Rebuild Dashboard', 'setupDashboard')
    .addToUi();
}
