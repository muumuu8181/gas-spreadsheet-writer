/**
 * Form Backend - Handle form submissions and data processing
 */

/**
 * Process form submission
 * @param {Object} formData - Data from the HTML form
 */
function submitForm(formData) {
  try {
    // Get or create the submissions sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName('Form Submissions');

    if (!sheet) {
      sheet = ss.insertSheet('Form Submissions');
      setupFormSheet(sheet);
    }

    // Add timestamp
    const timestamp = new Date();

    // Prepare row data
    const rowData = [
      timestamp,
      formData.firstName,
      formData.lastName,
      formData.email,
      formData.phone || '',
      formData.department,
      formData.contactMethod,
      formData.startDate || '',
      formData.comments || '',
      formData.newsletter ? 'Yes' : 'No',
      formData.terms ? 'Agreed' : 'Not Agreed',
      'Pending' // Status
    ];

    // Append to sheet
    sheet.appendRow(rowData);

    // Send confirmation email (optional)
    if (formData.newsletter) {
      sendConfirmationEmail(formData);
    }

    // Log submission
    console.log('Form submitted:', formData);

    return {
      success: true,
      message: 'Form submitted successfully',
      id: Utilities.getUuid()
    };

  } catch (error) {
    console.error('Form submission error:', error);
    throw new Error('Failed to submit form: ' + error.message);
  }
}

/**
 * Setup the form submissions sheet with headers
 */
function setupFormSheet(sheet) {
  const headers = [
    'Timestamp',
    'First Name',
    'Last Name',
    'Email',
    'Phone',
    'Department',
    'Contact Method',
    'Start Date',
    'Comments',
    'Newsletter',
    'Terms',
    'Status'
  ];

  // Add headers
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Format headers
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#f0f0f0');

  // Set column widths
  sheet.setColumnWidth(1, 180); // Timestamp
  sheet.setColumnWidth(4, 200); // Email
  sheet.setColumnWidth(9, 300); // Comments

  // Freeze header row
  sheet.setFrozenRows(1);
}

/**
 * Send confirmation email
 */
function sendConfirmationEmail(formData) {
  const subject = 'Form Submission Confirmation';
  const body = `
Dear ${formData.firstName} ${formData.lastName},

Thank you for submitting your information. We have received your form submission with the following details:

Department: ${formData.department}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Start Date: ${formData.startDate || 'Not specified'}

We will process your request and contact you via your preferred method (${formData.contactMethod}).

Best regards,
The Team
  `;

  // In production, uncomment the following line:
  // GmailApp.sendEmail(formData.email, subject, body);

  console.log('Email would be sent to:', formData.email);
}

/**
 * Show form as a dialog
 */
function showFormDialog() {
  const html = HtmlService.createHtmlOutputFromFile('form-template')
    .setWidth(650)
    .setHeight(700);

  SpreadsheetApp.getUi()
    .showModalDialog(html, 'Data Entry Form');
}

/**
 * Show form as a sidebar
 */
function showFormSidebar() {
  const html = HtmlService.createHtmlOutputFromFile('form-template')
    .setTitle('Data Entry')
    .setWidth(400);

  SpreadsheetApp.getUi().showSidebar(html);
}