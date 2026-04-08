/**
 * @file dashboard-refresh.gs
 * @description Refreshes the Dashboard sheet KPI formulas and sets up a
 *              daily time-driven trigger for the Kingken Global Recruitment
 *              Platform.
 * @company Kingken Global Travel Agency Ltd.
 *
 * Dashboard layout
 * ─────────────────
 *  Col A  = Labels      Col B = Formula values
 *  Row 1  = Timestamp header
 *  Row 2  = Total Candidates       Row 3  = New
 *  Row 4  = Screened               Row 5  = Approved
 *  Row 6  = Rejected               Row 7  = Processing
 *  Row 8  = Deployed               Row 9  = Total Employers
 *  Row 10 = Active Employers       Row 11 = Open Job Requests
 *  Row 12 = Total Deals            Row 13 = Total Revenue
 *  Row 14 = Total Paid             Row 15 = Balance Due
 *  Row 16 = Conversion Rate %      Row 17 = Avg AI Score
 */

/** @const {string} DASH_SHEET Name of the Dashboard sheet */
var DASH_SHEET = 'Dashboard';

/**
 * KPI definition: each entry maps a row number to a label and the formula
 * that should be applied to column B of that row.
 *
 * @const {Array<{row: number, label: string, formula: string}>}
 */
var KPI_DEFINITIONS = [
  {
    row: 2, label: 'Total Candidates',
    formula: "=COUNTA('Master Data'!A2:A)"
  },
  {
    row: 3, label: 'New',
    formula: "=COUNTIF('Master Data'!K2:K,\"New\")"
  },
  {
    row: 4, label: 'Screened',
    formula: "=COUNTIF('Master Data'!K2:K,\"Screened\")"
  },
  {
    row: 5, label: 'Approved',
    formula: "=COUNTIF('Master Data'!K2:K,\"Approved\")"
  },
  {
    row: 6, label: 'Rejected',
    formula: "=COUNTIF('Master Data'!K2:K,\"Rejected\")"
  },
  {
    row: 7, label: 'Processing',
    formula: "=COUNTIF('Master Data'!K2:K,\"Processing\")"
  },
  {
    row: 8, label: 'Deployed',
    formula: "=COUNTIF('Master Data'!K2:K,\"Deployed\")"
  },
  {
    row: 9, label: 'Total Employers',
    formula: "=IFERROR(COUNTA(Employers!A2:A),0)"
  },
  {
    row: 10, label: 'Active Employers',
    formula: "=IFERROR(COUNTIF(Employers!F2:F,\"Active\"),0)"
  },
  {
    row: 11, label: 'Open Job Requests',
    formula: "=IFERROR(COUNTIF('Job Requests'!F2:F,\"Open\"),0)"
  },
  {
    row: 12, label: 'Total Deals',
    formula: "=IFERROR(COUNTA(Deals!A2:A),0)"
  },
  {
    row: 13, label: 'Total Revenue (₦)',
    formula: "=IFERROR(SUM(Deals!E2:E),0)"
  },
  {
    row: 14, label: 'Total Paid (₦)',
    formula: "=IFERROR(SUM(Deals!F2:F),0)"
  },
  {
    row: 15, label: 'Balance Due (₦)',
    formula: "=IFERROR(B13-B14,0)"
  },
  {
    row: 16, label: 'Conversion Rate %',
    formula: "=IFERROR(ROUND((B5/B2)*100,1),0)"
  },
  {
    row: 17, label: 'Avg AI Score',
    formula: "=IFERROR(ROUND(AVERAGEIF('Master Data'!L2:L,\">0\",'Master Data'!L2:L),1),0)"
  }
];

/** @const {Array<number>} Currency rows that should be formatted as ₦ amounts */
var CURRENCY_ROWS = [13, 14, 15];

// ─── Public Functions ─────────────────────────────────────────────────────────

/**
 * Forces recalculation of all 16 KPI cells on the Dashboard sheet.
 *
 * Steps:
 *  1. Creates the Dashboard sheet if it does not exist.
 *  2. Writes all label/formula pairs.
 *  3. Applies currency and percentage formatting.
 *  4. Applies conditional formatting to the Avg AI Score cell.
 *  5. Logs the refresh timestamp to cell A1.
 *
 * @return {void}
 */
function refreshDashboard() {
  try {
    var ss   = SpreadsheetApp.getActiveSpreadsheet();
    var dash = _getOrCreateDashboard(ss);

    // Batch write all KPI labels and formulas
    KPI_DEFINITIONS.forEach(function (kpi) {
      dash.getRange(kpi.row, 1).setValue(kpi.label);
      dash.getRange(kpi.row, 2).setFormula(kpi.formula);
    });

    // Format currency rows
    CURRENCY_ROWS.forEach(function (row) {
      dash.getRange(row, 2).setNumberFormat('₦#,##0.00');
    });

    // Format conversion rate as percentage display (value is already 0-100)
    dash.getRange(16, 2).setNumberFormat('0.0"%"');

    // Conditional formatting for Avg AI Score (row 17):
    //  green ≥ 70, amber 40–69, red < 40
    _applyScoreConditionalFormat(dash);

    // Timestamp
    var ts = 'Last refreshed: ' + Utilities.formatDate(
      new Date(),
      Session.getScriptTimeZone(),
      'dd-MMM-yyyy HH:mm:ss'
    );
    dash.getRange(1, 1).setValue(ts);
    dash.getRange(1, 2).setValue('');

    Logger.log('Dashboard refreshed at ' + ts);
  } catch (err) {
    Logger.log('refreshDashboard error: ' + err.message);
  }
}

/**
 * Creates a daily time-driven trigger that runs refreshDashboard at 08:00
 * (script time zone).
 *
 * Safe to call multiple times – checks for an existing trigger first.
 *
 * @return {void}
 */
function setupDashboardTrigger() {
  var FUNCTION_NAME = 'refreshDashboard';

  // Remove any existing trigger for this function to avoid duplicates
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === FUNCTION_NAME) {
      ScriptApp.deleteTrigger(t);
    }
  });

  ScriptApp.newTrigger(FUNCTION_NAME)
    .timeBased()
    .everyDays(1)
    .atHour(8)
    .create();

  SpreadsheetApp.getUi().alert(
    '✅ Daily dashboard trigger set for 08:00 every day.'
  );
  Logger.log('Dashboard trigger created: daily at 08:00');
}

// ─── Private Helpers ─────────────────────────────────────────────────────────

/**
 * Returns the Dashboard sheet, creating and styling it if it does not exist.
 *
 * @private
 * @param  {GoogleAppsScript.Spreadsheet.Spreadsheet} ss Spreadsheet.
 * @return {GoogleAppsScript.Spreadsheet.Sheet}
 */
function _getOrCreateDashboard(ss) {
  var dash = ss.getSheetByName(DASH_SHEET);
  if (!dash) {
    dash = ss.insertSheet(DASH_SHEET, 0); // insert as first tab
    Logger.log('Created "' + DASH_SHEET + '" sheet.');
  }

  // Style column A as a label column
  dash.getRange('A:A').setFontWeight('bold').setBackground('#E8F0FE');
  // Style column B as value column
  dash.getRange('B:B').setHorizontalAlignment('right');

  // Freeze header row
  dash.setFrozenRows(1);

  // Set column widths
  dash.setColumnWidth(1, 220);
  dash.setColumnWidth(2, 180);

  return dash;
}

/**
 * Applies a 3-colour conditional format to the Avg AI Score cell (B17).
 *
 * @private
 * @param  {GoogleAppsScript.Spreadsheet.Sheet} dash Dashboard sheet.
 * @return {void}
 */
function _applyScoreConditionalFormat(dash) {
  var range  = dash.getRange('B17');
  var rules  = dash.getConditionalFormatRules();

  // Remove any existing rules on B17 to avoid stacking
  var filtered = rules.filter(function (rule) {
    var ranges = rule.getRanges();
    return !ranges.some(function (r) { return r.getA1Notation() === 'B17'; });
  });

  // Green: score >= 70
  var green = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberGreaterThanOrEqualTo(70)
    .setBackground('#C6EFCE')
    .setFontColor('#276221')
    .setRanges([range])
    .build();

  // Amber: score 40–69
  var amber = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberBetween(40, 69)
    .setBackground('#FFEB9C')
    .setFontColor('#9C5700')
    .setRanges([range])
    .build();

  // Red: score < 40
  var red = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberLessThan(40)
    .setBackground('#FFC7CE')
    .setFontColor('#9C0006')
    .setRanges([range])
    .build();

  filtered.push(green, amber, red);
  dash.setConditionalFormatRules(filtered);
}
