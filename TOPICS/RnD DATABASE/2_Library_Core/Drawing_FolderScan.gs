/**
 * ======================================================================================
 * FILE: Drawing_FolderScan.gs
 * MODULE: Drawing Data Synchronizer
 * * DESCRIPTION:
 * - Kết nối xuyên biên giới với Document Scanner Backend để lấy danh sách bản vẽ mới nhất.
 * - Xử lý ghi đè tốc độ cao bằng Sheets API, gán Hyperlink động.
 * - Tự động thiết lập khóa Admin an toàn (không ghi đè Owner) và tự động Reset Filter từ dòng 3.
 * * DEPENDENCIES:
 * - Config.gs (Lấy ID Backend, hàm applyStandardProtection).
 * * TRIGGERS / USAGE:
 * - Kích hoạt thủ công (Menu: Import -> Sync Drawing).
 * - Chạy ngầm tự động (Time-driven: 06:30 AM & 12:30 PM mỗi ngày).
 * * AUTHOR: SheetScript Architect / Hoàng Nguyên Phước Hiệp
 * LAST UPDATED: 28/05/2026 | VERSION: V5.5
 * * CHANGELOG:
 * - V5.5 - 28/05/26: [CLEANUP] Standardize file header, remove emojis from UI/cells, fix infinite error toast per GAS rules.
 * - V5.4 - 08/04/26: [TỐI ƯU] Xóa từ dòng 4 trở đi, giữ nguyên tên/format Header. Bỏ Log trùng lặp.
 * - V5.3 - 08/04/26: Bổ sung Auto Filter từ dòng 3. Fix lỗi Shadow Permission do đập khóa cũ.
 * ======================================================================================
 */

function listMainFolderPDFFiles() {
 const ss = SpreadsheetApp.getActiveSpreadsheet();
 const lock = LockService.getScriptLock();

 try {
  // 1. KHÓA AN TOÀN (LOCK SERVICE)
  if (!lock.tryLock(30000)) {
   if (ss) ss.toast("He thong dang ban. Vui long thu lai sau 30s.", "Sync Locked", 5);
   return;
  }
 
  if (typeof CONFIG === 'undefined') throw new Error("Thiếu Config.gs");
  if (ss) ss.toast("Dang keo du lieu tu Backend...", "Drawing Sync", -1);
 
  const startTime = new Date();
  const backendId = CONFIG.SCANNER_BACKEND.FILE_ID;
  const backendSheetName = CONFIG.SCANNER_BACKEND.SHEET_NAME;
  const sheetName = CONFIG.SHEETS.DRAWING;

  // 2. KẾT NỐI BACKEND BỐC DỮ LIỆU
  let finalData = [];
  try {
   const backendSS = SpreadsheetApp.openById(backendId);
   const backendSheet = backendSS.getSheetByName(backendSheetName);
   const maxRow = backendSheet.getLastRow();
  
   if (maxRow > 1) {
    const dataRange = backendSheet.getRange(2, 1, maxRow - 1, 9);
    const values = dataRange.getValues();
    const formulas = dataRange.getFormulas();
   
    // ZERO-LAG OPTIMIZATION: Direct Indexing theo cấu trúc cố định
    const totalRows = values.length;
    finalData = new Array(totalRows); // Khởi tạo mảng tĩnh để tăng tốc RAM
   
    for (let r = 0; r < totalRows; r++) {
     const rowVal = values[r];
     const rowForm = formulas[r];
    
     finalData[r] = [
      // Cột A-F: Thuần Text (Ép kiểu an toàn)
      rowVal[0] != null ? rowVal[0].toString() : "",
      rowVal[1] != null ? rowVal[1].toString() : "",
      rowVal[2] != null ? rowVal[2].toString() : "",
      rowVal[3] != null ? rowVal[3].toString() : "",
      rowVal[4] != null ? rowVal[4].toString() : "",
      rowVal[5] != null ? rowVal[5].toString() : "",
     
      // Cột G-I: Ưu tiên Formula (Hyperlink), fallback Value
      rowForm[6] || (rowVal[6] != null ? rowVal[6].toString() : ""),
      rowForm[7] || (rowVal[7] != null ? rowVal[7].toString() : ""),
      rowForm[8] || (rowVal[8] != null ? rowVal[8].toString() : "")
     ];
    }
   }
  } catch (e) {
   throw new Error("Loi ket noi Backend: " + e.message);
  }
  // 3. CHUẨN BỊ SHEET FRONTEND
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) sheet = ss.insertSheet(sheetName);

  const totalRows = finalData.length;

  // Chỉ clear vùng dữ liệu cũ (Từ dòng 4 trở xuống, giữ Header dòng 3)
  const currentLastRow = sheet.getLastRow();
  if (currentLastRow >= 4) {
   sheet.getRange(4, 1, currentLastRow - 3, 9).clear();
  }

  // 4. GHI DỮ LIỆU TỐC ĐỘ CAO (SHEETS API)
  if (totalRows > 0) {
   const requiredRows = 3 + totalRows;
   const currentMaxRows = sheet.getMaxRows();

   // Cơ chế phình to (Expand)
   if (requiredRows > currentMaxRows) {
    sheet.insertRowsAfter(currentMaxRows, requiredRows - currentMaxRows);
   }
   // Cơ chế thu nhỏ (Shrink) - Cắt bỏ dòng thừa
   else if (currentMaxRows > requiredRows) {
    sheet.deleteRows(requiredRows + 1, currentMaxRows - requiredRows);
   }

   // Format Text & UI
   sheet.getRange(4, 4, totalRows, 1).setNumberFormat('@'); // Cột CODE
   sheet.getRange(4, 6, totalRows, 1).setNumberFormat('@'); // Cột Release day
   sheet.getRange(4, 1, totalRows, 9)
     .setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP)
     .setVerticalAlignment("middle");

   SpreadsheetApp.flush();

   // Batch Update qua Sheets API
   const rangeStr = `${sheetName}!A4`;
   const valueRange = { values: finalData };
   try {
    Sheets.Spreadsheets.Values.update(valueRange, ss.getId(), rangeStr, {valueInputOption: "USER_ENTERED"});
   } catch (e) {
    sheet.getRange(4, 1, totalRows, 9).setValues(finalData); // Fallback
   }
  }
  SpreadsheetApp.flush();

  // 5. BATCH FORMATTING (Chỉ set độ rộng cột để tránh user kéo lệch, bỏ format màu header)
  const sheetId = sheet.getSheetId();
  const requests = [];

  const colWidths = [120, 150, 280, 130, 80, 110, 130, 130, 130];
  colWidths.forEach((width, index) => {
   requests.push({
    "updateDimensionProperties": {
     "range": { "sheetId": sheetId, "dimension": "COLUMNS", "startIndex": index, "endIndex": index + 1 },
     "properties": { "pixelSize": width },
     "fields": "pixelSize"
    }
   });
  });

  if (requests.length > 0) Sheets.Spreadsheets.batchUpdate({ requests: requests }, ss.getId());

  // 6. THIẾT LẬP BẢO VỆ & ADMIN
  const currentProtections = sheet.getProtections(SpreadsheetApp.ProtectionType.SHEET);
  if (currentProtections.length === 0) {
   applyStandardProtection(sheet, `Protected ${sheetName}`, ['A1:A2']);
  }

  // Reset & Apply Filter từ dòng 3
  try {
   if (sheet.getFilter()) {
    sheet.getFilter().remove();
   }
   // Filter từ dòng 3 (Header) xuống hết Data (tổng số dòng là totalRows + 1 dòng Header)
   if (totalRows >= 0) {
    sheet.getRange(3, 1, totalRows + 1, 9).createFilter();
   }
  } catch (e) {
   console.warn("Lỗi khi set Filter: " + e.message);
  }

  // 7. KẾT THÚC & GHI LOG
  if (typeof rebuildSearchIndex === 'function') rebuildSearchIndex();
  // CACHE WARMING
  if (typeof warmUpBomIndex === 'function') {
   warmUpBomIndex();
   // Không cần log ra bảng user để tránh spam, chỉ cần log console ngầm là đủ
  }
  const endTime = new Date();
  const durationInMinutes = ((endTime - startTime) / 60000).toFixed(2);
  const formattedTime = Utilities.formatDate(endTime, Session.getScriptTimeZone(), "dd/MM/yyyy HH:mm");
 
  sheet.getRange('A1').setValue(`Last updated: ${formattedTime}`).setFontWeight('bold');
  sheet.getRange('A2').setValue(`Tong so ban ve: ${totalRows} | Thoi gian tai: ${durationInMinutes} phut`).setFontWeight('bold');

  // Single Logging thông qua Menu.gs (Tránh trùng lặp)
  const logMsg = `[FRONTEND] Đã kéo ${totalRows} bản vẽ từ Backend. Time: ${durationInMinutes}m`;
  if (typeof logAction === 'function') logAction("IMPORT DRAWING", logMsg);

  if (ss) ss.toast("Da cap nhat xong bang Drawing.", "Drawing Sync", 5);

 } catch (err) {
  // Sửa toast vô hạn thành toast tự đóng sau 8s để tránh treo UI
  if (ss) ss.toast("Loi: " + err.message, "Sync Error", 8);
  console.error(err);
 } finally {
  lock.releaseLock();
 }
}

function createDualDailyTriggers() {
 const triggers = ScriptApp.getProjectTriggers();
 for (const trigger of triggers) {
  if (trigger.getHandlerFunction() === 'listMainFolderPDFFiles') ScriptApp.deleteTrigger(trigger);
 }
 ScriptApp.newTrigger('listMainFolderPDFFiles').timeBased().atHour(6).nearMinute(30).everyDays(1).create();
 ScriptApp.newTrigger('listMainFolderPDFFiles').timeBased().atHour(12).nearMinute(30).everyDays(1).create();
 if (typeof logAction === 'function') logAction("TRIGGER", "Thiết lập lịch kéo dữ liệu (6h & 12h)");
}

//design by Hiep