/**
 * ======================================================================================
 * FILE: Export_And_Log.gs (STANDALONE LIBRARY)
 * - Chứa logic Ghi Log và Xuất File (PDF/Sheet).
 * - Đã dọn dẹp các hàm gọi giao diện (UI/HTML) để tránh lỗi Library không tìm thấy file.
 * ======================================================================================
 */

const LOG_FILE_ID = CONFIG.SYSTEM.LOG_FILE_ID; 
const MAX_LOG_ROWS = CONFIG.SYSTEM.MAX_LOG_ROWS;

// ==============================
// HAM GHI LOG TUY BIEN
// ==============================
function logAction(actionType, details) {
  try {
    const now = Utilities.formatDate(new Date(), "Asia/Bangkok", "yyyy-MM-dd HH:mm:ss");
    let userEmail = Session.getActiveUser().getEmail() || "System/Trigger"; 
    
    const rowData = [[now, userEmail, actionType, details]];
    
    Sheets.Spreadsheets.Values.append({
      values: rowData
    }, LOG_FILE_ID, "Sheet1!A:D", {
      valueInputOption: "USER_ENTERED"
    });
    
  } catch (e) {
    console.warn("Logging API failed: " + e.message);
  }
}

// ==============================
// NAVIGATION HELPER
// ==============================
function activateHomePage() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEETS.HOMEPAGE);
  if (sheet) {
    sheet.activate();
  } else {
    SpreadsheetApp.getUi().alert('Sheet "' + CONFIG.SHEETS.HOMEPAGE + '" khong ton tai. Vui long kiem tra lai.');
  }
}

function activateBomSearch() { jumpToSheet(CONFIG.SHEETS.SEARCH_RESULT); } 
function activateRmSearch() { jumpToSheet(CONFIG.SHEETS.SEARCH_RM || "Search RM"); }
function activateCostSearch() { jumpToSheet(CONFIG.SHEETS.COST_SEARCH); }   
function activateBomCompare() { jumpToSheet(CONFIG.SHEETS.COMPARISON); }    

function jumpToSheet(name) {
  if (!name) {
    SpreadsheetApp.getUi().alert("Sheet name is undefined in Config.");
    return;
  }
  const s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
  s ? SpreadsheetApp.setActiveSheet(s) : SpreadsheetApp.getUi().alert('Sheet "' + name + '" khong ton tai. Vui long kiem tra lai.');
}

// ==============================
// EXPORT FUNCTIONS
// ==============================
function runSelectedExport(options) {
  const start = new Date();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEETS.SEARCH_RESULT); 
  
  if (!sheet) throw new Error('Sheet "' + CONFIG.SHEETS.SEARCH_RESULT + '" not found.');

  const dateStr = Utilities.formatDate(new Date(), ss.getSpreadsheetTimeZone(), "ddMMyy");
  const H15 = sheet.getRange("H15").getDisplayValue().trim();
  const I15 = sheet.getRange("I15").getDisplayValue().trim();
  
  if (!H15 || !I15) throw new Error("Required cells (H15 or I15) are missing.");

  const formulas = sheet.getRange("A1:Z100").getFormulas();
  for (let row of formulas) {
    for (let formula of row) {
      if (formula.includes("#REF!")) throw new Error("Found #REF! error. Please fix it before exporting.");
    }
  }

  const fileBaseName = `${H15}_${I15}_${dateStr}_BOM`;
  const result = {};

  if (options.exportPDF || options.exportSheet) {
    let tempCopy = ss.getSheetByName("SYS_TMP_EXPORT");
    
    if (!tempCopy) {
      tempCopy = sheet.copyTo(ss).setName("SYS_TMP_EXPORT");
    } else {
      tempCopy.showSheet();
      tempCopy.clear();
      sheet.getDataRange().copyTo(tempCopy.getRange(1, 1));
    }
    
    tempCopy.showRows(1, tempCopy.getMaxRows());
    tempCopy.showColumns(1, tempCopy.getMaxColumns());
    
    tempCopy.getDataRange().copyTo(tempCopy.getRange(1, 1), { contentsOnly: true });
    
    const checkValues = tempCopy.getRange("C15:H119").getValues();
    const hideFlags = checkValues.map(row => {
      const isLevel3Plus = row[0] !== "" || row[1] !== "" || row[2] !== "";
      const hasMaterial = row[5] !== "";
      return [hasMaterial && !isLevel3Plus];
    });
    
    batchHideRows(tempCopy, 15, hideFlags);
    
    if (options.exportPDF) {
      if (tempCopy.getLastColumn() >= 19) tempCopy.hideColumn(tempCopy.getRange("S1"));
      
      const pdfUrl = `https://docs.google.com/spreadsheets/d/${ss.getId()}/export?format=pdf&gid=${tempCopy.getSheetId()}&range=A1:Z100&portrait=true&fitw=true&sheetnames=false&printtitle=false&pagenumbers=false&gridlines=false&fzr=false`;
      const token = ScriptApp.getOAuthToken();
      
      const response = UrlFetchApp.fetch(pdfUrl, { 
        headers: { Authorization: 'Bearer ' + token },
        muteHttpExceptions: true 
      });
      
      if (response.getResponseCode() !== 200) {
        throw new Error('API error ' + response.getResponseCode() + ': ' + response.getContentText());
      }
      
      const pdfBlob = response.getBlob().setName(fileBaseName + ".pdf");
      const pdfFile = DriveApp.createFile(pdfBlob);
      result.pdfUrl = pdfFile.getUrl();
    }

    if (options.exportSheet) {
      const newFile = SpreadsheetApp.create(fileBaseName);
      tempCopy.copyTo(newFile).setName(fileBaseName);
      newFile.deleteSheet(newFile.getSheets()[0]); 
      result.sheetUrl = newFile.getUrl();
    }

    tempCopy.hideSheet();
  }

  result.elapsed = `${((new Date() - start) / 60000).toFixed(2)} mins`;
  logAction("EXPORT", `Export ${getExportTypeString(options)} (${fileBaseName}) - Success`);
  
  SpreadsheetApp.flush();
  return result;
}

function getExportTypeString(options) {
  const types = [];
  if (options.exportPDF) types.push("PDF");
  if (options.exportSheet) types.push("Sheet");
  return types.join(" + ");
}

function batchHideRows(sheet, startRowIndex, values) {
  if (!values || !values.length) return;
  const rowsToHide = [];
  for (let i = 0; i < values.length; i++) {
    if (!values[i][0]) rowsToHide.push(startRowIndex + i);
  }
  if (!rowsToHide.length) return;

  const ssId = sheet.getParent().getId();
  const sheetId = sheet.getSheetId();
  const requests = [];

  rowsToHide.sort((a, b) => a - b);
  let start = rowsToHide[0], count = 1;

  const addHideRequest = (st, ct) => {
    requests.push({
      updateDimensionProperties: {
        range: { sheetId: sheetId, dimension: "ROWS", startIndex: st - 1, endIndex: st - 1 + ct },
        properties: { hiddenByUser: true },
        fields: "hiddenByUser"
      }
    });
  };

  for (let i = 1; i < rowsToHide.length; i++) {
    if (rowsToHide[i] === rowsToHide[i - 1] + 1) { 
      count++; 
    } else { 
      addHideRequest(start, count);
      start = rowsToHide[i]; 
      count = 1; 
    }
  }
  addHideRequest(start, count);

  try {
    Sheets.Spreadsheets.batchUpdate({ requests: requests }, ssId);
  } catch (e) {
    console.warn("Fallback to Native batchHideRows: " + e.message);
    start = rowsToHide[0]; count = 1;
    for (let i = 1; i < rowsToHide.length; i++) {
      if (rowsToHide[i] === rowsToHide[i - 1] + 1) { count++; } 
      else { sheet.hideRows(start, count); start = rowsToHide[i]; count = 1; }
    }
    sheet.hideRows(start, count);
  }
}

function exportBomCostSheet() {
  const start = new Date();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const mainSheet = ss.getSheetByName(CONFIG.SHEETS.COST_SEARCH);

  if (!mainSheet) throw new Error('Sheet "' + CONFIG.SHEETS.COST_SEARCH + '" not found.');

  const B2 = mainSheet.getRange("B2").getDisplayValue().trim();
  const C2 = mainSheet.getRange("C2").getDisplayValue().trim();
  const dateStr = Utilities.formatDate(new Date(), ss.getSpreadsheetTimeZone(), "ddMMyy");

  if (!B2 || !C2) throw new Error('Missing B2 or C2 in ' + CONFIG.SHEETS.COST_SEARCH);

  const exportName = `${B2}_${C2}_${dateStr}_BOM_COST`;
  const newFile = SpreadsheetApp.create(exportName);
  const defaultSheet = newFile.getSheets()[0];

  const sheetsToCopyNames = [
    CONFIG.SHEETS.COST_SEARCH, 
    CONFIG.SHEETS.SYS_MAT, 
    CONFIG.SHEETS.SYS_BOM, 
    CONFIG.SHEETS.SYS_COST
  ];
  
  let copiedCount = 0;
  for (let name of sheetsToCopyNames) {
    const src = ss.getSheetByName(name);
    if (src) {
      src.copyTo(newFile).setName(name);
      copiedCount++;
    }
  }

  if (copiedCount > 0) newFile.deleteSheet(defaultSheet);

  const copiedMain = newFile.getSheetByName(CONFIG.SHEETS.COST_SEARCH);
  if (copiedMain) {
    refreshFormulas(copiedMain);
    copiedMain.getRange("B2").clearDataValidations();
  }

  logAction("EXPORT", `Export BOM Cost (${exportName}) - Success`);

  return {
    fileUrl: newFile.getUrl(),
    elapsed: `${((new Date() - start) / 60000).toFixed(2)} mins`,
    exportType: "bomcost"
  };
}

function getColLetter_(colIndex) {
  let temp, letter = '';
  while (colIndex > 0) {
    temp = (colIndex - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    colIndex = (colIndex - temp - 1) / 26;
  }
  return letter;
}

function refreshFormulas(sheet) {
  const range = sheet.getDataRange();
  const formulas = range.getFormulas();
  const batchData = [];
  const sheetName = sheet.getName();

  for (let r = 0; r < formulas.length; r++) {
    let c = 0;
    while (c < formulas[r].length) {
      if (formulas[r][c]) {
        let startCol = c;
        let rowFormulas = [];
        
        while (c < formulas[r].length && formulas[r][c]) {
          rowFormulas.push(formulas[r][c]);
          c++;
        }
        
        const colStartStr = getColLetter_(startCol + 1);
        const colEndStr = getColLetter_(startCol + rowFormulas.length);
        const a1Start = `${colStartStr}${r + 1}`;
        const a1End = `${colEndStr}${r + 1}`;
        
        const notation = rowFormulas.length > 1 ? `${a1Start}:${a1End}` : a1Start;

        batchData.push({
          range: `${sheetName}!${notation}`,
          values: [rowFormulas]
        });
      } else {
        c++;
      }
    }
  }

  if (batchData.length > 0) {
    try {
      Sheets.Spreadsheets.Values.batchUpdate({
        valueInputOption: "USER_ENTERED",
        data: batchData
      }, sheet.getParent().getId());
    } catch (e) {
      console.warn("API Values.batchUpdate failed, using Native loop: " + e.message);
      for (let r = 0; r < formulas.length; r++) {
        for (let c = 0; c < formulas[r].length; c++) {
          if (formulas[r][c]) {
            sheet.getRange(r + 1, c + 1).setFormula(formulas[r][c]);
          }
        }
      }
    }
  }
}