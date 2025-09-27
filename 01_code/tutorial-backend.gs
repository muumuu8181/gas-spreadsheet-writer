/**
 * Tutorial Backend - GAS Server Functions
 * These functions are called from the HTML frontend
 */

// ==========================================
// Basic Operations
// ==========================================

/**
 * Write a value to a specific cell
 */
function writeToCell(cellRef, value) {
  const sheet = SpreadsheetApp.getActiveSheet();
  sheet.getRange(cellRef).setValue(value);
  return true;
}

/**
 * Read data from a range
 */
function readFromRange(range) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = sheet.getRange(range).getValues();
  return data;
}

/**
 * Format cells with background color
 */
function formatCells(range, color) {
  const sheet = SpreadsheetApp.getActiveSheet();
  sheet.getRange(range).setBackground(color);
  return true;
}

// ==========================================
// Data Operations
// ==========================================

/**
 * Create a chart from data
 */
function createChart(range, chartType) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const dataRange = sheet.getRange(range);

  const chart = sheet.newChart()
    .setChartType(Charts.ChartType[chartType])
    .addRange(dataRange)
    .setPosition(5, 5, 0, 0)
    .build();

  sheet.insertChart(chart);
  return true;
}

/**
 * Find and replace text in the sheet
 */
function findAndReplace(findText, replaceText) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const textFinder = sheet.createTextFinder(findText);
  const occurrences = textFinder.findAll();

  textFinder.replaceAllWith(replaceText);
  return occurrences.length;
}

/**
 * Sort data in a range
 */
function sortData(range, column) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const dataRange = sheet.getRange(range);
  dataRange.sort(column);
  return true;
}

// ==========================================
// Automation Functions
// ==========================================

/**
 * Send an email
 */
function sendEmail(to, subject) {
  const body = `This is a test email from GAS Tutorial.\n\nSent at: ${new Date()}`;

  // In production, use GmailApp.sendEmail(to, subject, body);
  // For tutorial, we'll just log it
  console.log(`Email would be sent to: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Body: ${body}`);

  // Simulate email sending
  return true;
}

/**
 * Create a time-based trigger
 */
function setTrigger(functionName, intervalMinutes) {
  // Delete existing triggers for this function
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === functionName) {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  // Create new trigger
  ScriptApp.newTrigger(functionName)
    .timeBased()
    .everyMinutes(intervalMinutes)
    .create();

  return true;
}

/**
 * Create a folder in Google Drive
 */
function createFolder(folderName) {
  const folder = DriveApp.createFolder(folderName);
  return folder.getUrl();
}

// ==========================================
// Advanced Operations
// ==========================================

/**
 * Make an API request
 */
function makeApiRequest(url) {
  try {
    const response = UrlFetchApp.fetch(url);
    const data = JSON.parse(response.getContentText());
    return data;
  } catch (error) {
    throw new Error(`API request failed: ${error.message}`);
  }
}

/**
 * Run a batch operation
 */
function runBatchOperation(numRows) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = [];

  // Generate sample data
  for (let i = 1; i <= numRows; i++) {
    data.push([
      `Item ${i}`,
      Math.floor(Math.random() * 100),
      new Date(),
      `Status ${i % 3 === 0 ? 'Active' : 'Pending'}`
    ]);
  }

  // Write all data at once (efficient)
  const startRow = sheet.getLastRow() + 1;
  sheet.getRange(startRow, 1, numRows, 4).setValues(data);

  return true;
}

/**
 * Run performance test
 */
function runPerformanceTest() {
  const results = [];

  // Test 1: Single cell writes
  const start1 = new Date().getTime();
  const sheet = SpreadsheetApp.getActiveSheet();
  for (let i = 0; i < 10; i++) {
    sheet.getRange(1, 1).setValue(i);
  }
  const time1 = new Date().getTime() - start1;
  results.push(`Single cell writes (10x): ${time1}ms`);

  // Test 2: Batch write
  const start2 = new Date().getTime();
  const data = [];
  for (let i = 0; i < 10; i++) {
    data.push([i]);
  }
  sheet.getRange(1, 1, 10, 1).setValues(data);
  const time2 = new Date().getTime() - start2;
  results.push(`Batch write (10 rows): ${time2}ms`);

  // Test 3: Formula calculation
  const start3 = new Date().getTime();
  sheet.getRange('A1').setFormula('=SUM(1:1000)');
  SpreadsheetApp.flush();
  const time3 = new Date().getTime() - start3;
  results.push(`Formula calculation: ${time3}ms`);

  return results.join('\n');
}

// ==========================================
// UI Management
// ==========================================

/**
 * Open the tutorial sidebar
 */
function showTutorial() {
  const html = HtmlService.createHtmlOutputFromFile('tutorial')
    .setTitle('GAS Tutorial')
    .setWidth(400);

  SpreadsheetApp.getUi().showSidebar(html);
}

/**
 * Open tutorial as dialog
 */
function showTutorialDialog() {
  const html = HtmlService.createHtmlOutputFromFile('tutorial')
    .setWidth(800)
    .setHeight(600);

  SpreadsheetApp.getUi()
    .showModalDialog(html, 'GAS Tutorial Dashboard');
}

/**
 * Initialize menu on open
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('📚 Tutorial')
    .addItem('Show Tutorial Sidebar', 'showTutorial')
    .addItem('Show Tutorial Dialog', 'showTutorialDialog')
    .addSeparator()
    .addItem('Run Sample Data Setup', 'setupSampleData')
    .addItem('Clear All Data', 'clearAllData')
    .addToUi();
}

/**
 * Setup sample data for tutorial
 */
function setupSampleData() {
  const sheet = SpreadsheetApp.getActiveSheet();

  // Clear existing data
  sheet.clear();

  // Add headers
  const headers = ['Product', 'Price', 'Quantity', 'Total'];
  sheet.getRange(1, 1, 1, 4).setValues([headers]);
  sheet.getRange(1, 1, 1, 4).setFontWeight('bold');

  // Add sample data
  const sampleData = [
    ['Apple', 1.50, 10, '=B2*C2'],
    ['Banana', 0.75, 25, '=B3*C3'],
    ['Orange', 2.00, 15, '=B4*C4'],
    ['Grape', 3.50, 8, '=B5*C5'],
    ['Mango', 4.00, 5, '=B6*C6']
  ];

  sheet.getRange(2, 1, 5, 4).setValues(sampleData);

  // Add total row
  sheet.getRange(8, 1).setValue('Total:');
  sheet.getRange(8, 1).setFontWeight('bold');
  sheet.getRange(8, 4).setFormula('=SUM(D2:D6)');
  sheet.getRange(8, 4).setFontWeight('bold');

  // Format
  sheet.getRange(2, 2, 5, 1).setNumberFormat('$#,##0.00');
  sheet.getRange(2, 4, 6, 1).setNumberFormat('$#,##0.00');

  SpreadsheetApp.getActiveSpreadsheet().toast('Sample data created!', 'Success', 3);
}

/**
 * Clear all data from the sheet
 */
function clearAllData() {
  const sheet = SpreadsheetApp.getActiveSheet();
  sheet.clear();
  SpreadsheetApp.getActiveSpreadsheet().toast('All data cleared!', 'Success', 3);
}