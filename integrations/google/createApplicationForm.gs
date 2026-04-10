/**
 * createApplicationForm.gs
 *
 * Google Apps Script — run once from script.google.com to create the
 * Kingken Global Recruitment Application Form with all required fields.
 *
 * Usage:
 *   1. Open https://script.google.com and create a new project.
 *   2. Paste this file's contents into the editor.
 *   3. Run createApplicationForm().
 *   4. The form URL is logged in the Execution log.
 */

/**
 * Creates the Kingken Global Recruitment Application Form.
 * @returns {GoogleAppsScript.Forms.Form} The created form.
 */
function createApplicationForm() {
  const form = FormApp.create('Kingken Global Recruitment Application Form');

  form.setDescription(
    'Welcome to the Kingken Global Recruitment Platform.\n' +
    'Please fill in all fields accurately. Your information will be ' +
    'reviewed by our recruitment team.\n\n' +
    'Website: https://www.kingkenglobal.com.ng\n' +
    'Contact: info@kingkenglobal.com.ng'
  );

  form.setCollectEmail(false);
  form.setAllowResponseEdits(false);
  form.setLimitOneResponsePerUser(false);

  // 1. Full Name
  form.addTextItem()
    .setTitle('Full Name')
    .setHelpText('Enter your full legal name as it appears on your passport or ID.')
    .setRequired(true);

  // 2. Phone Number (with country code)
  const phoneValidation = FormApp.createTextValidation()
    .requireTextMatchesPattern('^\\+?[0-9 \\-]{7,20}$')
    .build();

  form.addTextItem()
    .setTitle('Phone Number (with country code)')
    .setHelpText('Example: +2348012345678')
    .setValidation(phoneValidation)
    .setRequired(true);

  // 3. Nationality
  form.addTextItem()
    .setTitle('Nationality')
    .setHelpText('Enter your country of citizenship.')
    .setRequired(true);

  // 4. Position Applying For
  form.addTextItem()
    .setTitle('Position Applying For')
    .setHelpText('Enter the job title or role you are applying for.')
    .setRequired(true);

  // 5. Years of Experience
  const experienceValidation = FormApp.createTextValidation()
    .requireWholeNumber()
    .requireNumberGreaterThanOrEqualTo(0)
    .build();

  form.addTextItem()
    .setTitle('Years of Experience')
    .setHelpText('Enter the total number of years of relevant work experience.')
    .setValidation(experienceValidation)
    .setRequired(true);

  // 6. Passport Available?
  form.addMultipleChoiceItem()
    .setTitle('Passport Available?')
    .setChoiceValues(['Yes', 'No'])
    .setRequired(true);

  // 7. Upload CV
  form.addFileUploadItem()
    .setTitle('Upload CV')
    .setHelpText('Upload your CV in PDF or Word format (max 10 MB).')
    .setAllowedFileTypes([DriveApp.getMimeType('pdf'), DriveApp.getMimeType('doc')])
    .setMaxFileSize(10 * 1024 * 1024) // 10 MB
    .setRequired(true);

  const formUrl = form.getPublishedUrl();
  const editUrl = form.getEditUrl();

  Logger.log('✅ Form created successfully.');
  Logger.log('Published URL: ' + formUrl);
  Logger.log('Edit URL:      ' + editUrl);
  Logger.log('Form ID:       ' + form.getId());

  return form;
}
