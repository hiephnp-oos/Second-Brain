/**
 * ======================================================================================
 * FILE: Import.gs
 * MODULE: Master Data Ingestion
 * * DESCRIPTION:
 * - Module Core phụ trách kéo dữ liệu thô từ các file nguồn (ZMAT, ZBOM, ZCOST) qua ID.
 * - Tối ưu hóa tốc độ ghi cực đại bằng Google Sheets API (Batch Update).
 * - Tích hợp Auto Shrink/Expand (gọt dòng cột thừa) và thiết lập UI (Filter, Hide Cols).
 * * DEPENDENCIES:
 * - Config.gs (Sử dụng hàm applyStandardProtection, biến CONFIG).
 * - GlobalSearch.gs (Gọi hàm rebuildSearchIndex để clear cache).
 * * TRIGGERS / USAGE:
 * - Kích hoạt thủ công qua Menu (Menu: Sync ZMat / Sync ZBom / Sync ZCost).
 * * AUTHOR: SheetScript Architect / Hoàng Nguyên Phước Hiệp
 * LAST UPDATED: 28/05/2026 | VERSION: V4.9
 * * CHANGELOG:
 * - V4.9 - 28/05/26: [CLEANUP] Remove emojis from alerts/throws, standardize toast messages, add try/catch for cross-project permissions (openById), enforce trailing underscore for private helpers.
 * - V4.8 - 13/04/26: [AUDIT] Chuẩn hóa định dạng log (Unified Logging Format), loại bỏ text rườm rà, chuyển về chuẩn "Sync [Target] - Success".
 * - V4.7 - 13/04/26: [PERFORMANCE] Đồng bộ kiến trúc ẩn cột trong import_COST_core sang dùng Advanced API (batchHideColumns) để tránh giật lag UI.
 * - V4.6 - 10/04/26: [PERFORMANCE] Nâng cấp hàm batchHideColumns dùng Advanced Sheets API (batchUpdate) kết hợp thuật toán gom khối (Contiguous Block), triệt tiêu hoàn toàn vòng lặp native gây giật màn hình khi thiết lập UI.
 * - V4.5 - 10/04/26: [HOTFIX] Áp dụng quy tắc "Text Lock" (thêm nháy đơn ') cho TẤT CẢ các dữ liệu ngày tháng.
 * - V4.4 - 10/04/26: [HOTFIX] Mở rộng hàm cleanSAPCell xử lý tất cả Object Date.
 * - V4.2 - 10/04/26: Xử lý lỗi Google Sheets tự ép kiểu ngày Infinity.
 * - V4.1 - 09/04/26: Cập nhật hàm map dữ liệu để tự động dọn dẹp khoảng trắng thừa và đảo chiều dấu trừ (-) đặc thù của SAP ALV.
 * - V4.0 - 08/04/26: Khôi phục toàn sức mạnh Sheets API. Tích hợp All-in-one.
 * ======================================================================================
 */

// ==============================
// 1. CÁC HÀM IMPORT CHÍNH
// ==============================

function runWithLock(callback, taskName) {
  const lock = LockService.getScriptLock();
  let hasLock = false;
  try {
    hasLock = lock.tryLock(30000);
    if (hasLock) {
       callback();
    } else {
       const msg = `He thong dang ban xu ly tac vu khac. Vui long thu lai sau 30 giay. (${taskName})`;
       SpreadsheetApp.getUi().alert(msg);
       console.warn(msg);
    }
  } catch (e) {
    console.error(`Error in task ${taskName}: ${e.message}`);
    throw e;
  } finally {
    if (hasLock) {
      lock.releaseLock();
    }
  }
}

function import_BOM_and_MAT() {
  runWithLock(() => {
    const oldBomState = getBomStateMap_();
    import_BOM_core();
    import_MAT_core();
    if (typeof generateSmartBOM === 'function') {
      SpreadsheetApp.getActiveSpreadsheet().toast("Dang cap nhat cau truc Smart BOM...", "Smart BOM", -1);
      generateSmartBOM();
    }
    checkAndNotifyBomDelta_(oldBomState);
  }, "Import BOM & MAT");
}

function import_BOM() {
  runWithLock(() => {
    const oldBomState = getBomStateMap_();
    import_BOM_core();
    if (typeof generateSmartBOM === 'function') {
      SpreadsheetApp.getActiveSpreadsheet().toast("Dang cap nhat cau truc Smart BOM...", "Smart BOM", -1);
      generateSmartBOM();
    }
    checkAndNotifyBomDelta_(oldBomState);
  }, "Import BOM");
}

function import_MAT() {
  runWithLock(() => {
    import_MAT_core();
    if (typeof generateSmartBOM === 'function') {
      SpreadsheetApp.getActiveSpreadsheet().toast("Dang cap nhat cau truc Smart BOM...", "Smart BOM", -1);
      generateSmartBOM();
    }
  }, "Import MAT");
}

function import_COST() {
  runWithLock(() => {
    import_COST_core();
  }, "Import COST");
}

// --- Tách logic Core ---

function import_BOM_core() {
  importAndWriteFullSheetFast(
    CONFIG.SHEETS.HOMEPAGE, 
    CONFIG.SYSTEM.SOURCE_ID_CELLS.BOM_MASTER, 
    CONFIG.SHEETS.SYS_BOM, 
    "Sheet1" 
  );
  logAction("IMPORT", `Sync ${CONFIG.SHEETS.SYS_BOM} - Success`);
  if (typeof rebuildSearchIndex === 'function') rebuildSearchIndex(); 
}

function import_MAT_core() {
  const targetSheet = CONFIG.SHEETS.SYS_MAT;
  const oldZfins = getZfinOldCodes_(targetSheet); 
  
  importAndWriteFullSheetFast(
    CONFIG.SHEETS.HOMEPAGE, 
    CONFIG.SYSTEM.SOURCE_ID_CELLS.MAT_MASTER, 
    targetSheet, 
    "Sheet1", 
    true 
  );
  
  const newZfins = getZfinOldCodes_(targetSheet); 
  const added = [];
  newZfins.forEach(code => { if (!oldZfins.has(code)) added.push(code); });
  
  logAction("IMPORT", `Sync ${targetSheet} - Success`);
  if (typeof rebuildSearchIndex === 'function') rebuildSearchIndex(); 
  
  if (typeof sendDeltaNotificationToChat === 'function') {
    sendDeltaNotificationToChat("ZVNMMMAT", added);
  }
}

function import_COST_core() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const homeSheet = ss.getSheetByName(CONFIG.SHEETS.HOMEPAGE);
  const targetSheet = CONFIG.SHEETS.SYS_COST;
  
  const oldCodes = getZfinOldCodes_(targetSheet); 
  
  const cellVal = homeSheet.getRange(CONFIG.SYSTEM.SOURCE_ID_CELLS.COST_MASTER).getValue().toString().trim();
  const fileIdMatch = cellVal.match(/[-\w]{25,}/);
  if (!fileIdMatch) throw new Error(`Spreadsheet ID not found or invalid at ${CONFIG.SHEETS.HOMEPAGE}!${CONFIG.SYSTEM.SOURCE_ID_CELLS.COST_MASTER}`);
  const fileId = fileIdMatch[0];

  let sourceSS;
  try {
    sourceSS = SpreadsheetApp.openById(fileId);
  } catch(e) {
    throw new Error(`Khong the truy cap file nguon ZCOST. Vui long kiem tra quyen chia se cua file ID: ${fileId}`);
  }

  const sourceSheet = sourceSS.getSheetByName("Sheet1");
  if (!sourceSheet) throw new Error(`Sheet 'Sheet1' not found in source file`);

  const lastRow = sourceSheet.getLastRow();
  const lastCol = sourceSheet.getLastColumn();
  
  if (lastRow === 0) {
    writeToSheetFast(targetSheet, [], []);
    return;
  }

  const allData = sourceSheet.getRange(1, 1, lastRow, lastCol).getValues();
  const header = allData[0].slice(0, 31).concat(["Material", "VOH", "FOH", "Total"]);
  
  const body = allData.slice(1).map(row => {
    return row.slice(0, 31).concat(["", "", "", ""]).map(cell => cleanSAPCell(cell));
  });

  if (body.length > 0) {
    body[0][31] = '=ARRAYFORMULA(IF(N2:N="", "", (T2:T+U2:U+V2:V+W2:W)/N2:N))'; 
    body[0][32] = '=ARRAYFORMULA(IF(N2:N="", "", Z2:Z/N2:N))';
    body[0][33] = '=ARRAYFORMULA(IF(N2:N="", "", AA2:AA/N2:N))';
    body[0][34] = '=ARRAYFORMULA(IF(AF2:AF="", "", AF2:AF+AG2:AG+AH2:AH))';
  }

  const sheet = writeToSheetRawOnly(targetSheet, header, body);
  try {
    batchHideColumns(sheet, [[9, 23]]); 
  } catch (e) {
    console.warn("Could not hide columns in Cost sheet: " + e.message);
  }
  
  const newCodes = getZfinOldCodes_(targetSheet); 
  const added = [];
  newCodes.forEach(code => { if (!oldCodes.has(code)) added.push(code); });
  
  logAction("IMPORT", `Sync ${targetSheet} - Success`);
  if (typeof rebuildSearchIndex === 'function') rebuildSearchIndex(); 
  
  if (typeof sendDeltaNotificationToChat === 'function') {
    sendDeltaNotificationToChat("ZVNCOPCCE", added);
  }
}


// ==============================
// 3. HÀM XỬ LÝ LOGIC CHUNG
// ==============================

/**
 * [HELPER] Xử lý chuẩn hóa và ép kiểu dữ liệu đọc từ SAP
 */
function cleanSAPCell(cell) {
  if (cell === null || cell === undefined || cell === "") return "";
  
  // 1. Quét thẳng Object Date: Format chuẩn và KHÓA LUÔN thành Text bằng dấu '
  if (Object.prototype.toString.call(cell) === '[object Date]') {
    return "'" + Utilities.formatDate(cell, Session.getScriptTimeZone(), "MM/dd/yyyy");
  }
  
  let val = cell.toString().trim();
  
  // 2. Bắt lỗi dự phòng nếu dữ liệu lọt vào dưới dạng chuỗi Text bị dính GMT
  if (val.includes("GMT+") || val.includes("Indochina Time")) {
    try {
      const parsedDate = new Date(val);
      if (!isNaN(parsedDate.getTime())) {
        return "'" + Utilities.formatDate(parsedDate, Session.getScriptTimeZone(), "MM/dd/yyyy");
      }
    } catch(e) {}
  }

  // 3. Xử lý số âm và trim khoảng trắng đặc thù từ SAP (VD: 123.45-)
  if (val.length > 1 && val.endsWith("-") && !isNaN(val.slice(0, -1))) {
    val = "-" + val.slice(0, -1);
  }
  
  return val;
}

function importAndWriteFullSheetFast(homeSheetName, cellRef, targetSheetName, sourceSheetName, useStatusFormula = false) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const homeSheet = ss.getSheetByName(homeSheetName);
  
  const cellVal = homeSheet.getRange(cellRef).getValue().toString().trim();
  const fileIdMatch = cellVal.match(/[-\w]{25,}/);
  if (!fileIdMatch) throw new Error(`Spreadsheet ID not found at ${homeSheetName}!${cellRef}`);
  const fileId = fileIdMatch[0];

  let sourceSS;
  try {
    sourceSS = SpreadsheetApp.openById(fileId);
  } catch(e) {
    throw new Error(`Khong the truy cap file nguon. Vui long kiem tra quyen chia se cua file ID: ${fileId}`);
  }

  const srcName = sourceSheetName || "Sheet1";
  const sourceSheet = sourceSS.getSheetByName(srcName);
  if (!sourceSheet) throw new Error(`Sheet '${srcName}' not found in source file`);

  const lastRow = sourceSheet.getLastRow();
  const lastCol = sourceSheet.getLastColumn();
  
  if (lastRow === 0 || lastCol === 0) {
    writeToSheetFast(targetSheetName, [], []);
    return;
  }

  const allData = sourceSheet.getRange(1, 1, lastRow, lastCol).getValues();
  const rawObjects = arrayToObjects_(allData);
  const sampleObj = rawObjects[0];
  
  const dChainKey = Object.keys(sampleObj).find(k => /DChain(-spec)?(.*status)?/i.test(k));
  const headerRow = allData[0].map(h => h === null ? "" : h.toString());
  const includeStatus = !!dChainKey; 
  const header = includeStatus ? [...headerRow, "Status"] : headerRow;

  let dchainIndex = -1;
  if (dChainKey) {
    dchainIndex = headerRow.findIndex(h => h.trim() === dChainKey);
  }

  const body = allData.slice(1).map(row => {
    const base = row.map(cell => cleanSAPCell(cell));
    
    if (includeStatus) {
      const dchainVal = (dchainIndex !== -1) ? row[dchainIndex] : "";
      base.push(useStatusFormula ? "" : getStatusFromDChain(dchainVal));
    }
    return base;
  });

  if (useStatusFormula && includeStatus && body.length > 0) {
      // 1. Lọc bỏ chuỗi rỗng "" để tránh sinh ra lỗi Regex '||'
      const activeCodes = CONFIG.STATUS_MAPPING.ACTIVE.filter(c => c !== "");
      
      // Helper: Escape special chars cho Regex trong Apps Script string literal
      // (Dùng \\\\ để kết quả trong Sheets giữ được \)
      const escapeRegex = (arr) => arr.map(str => str.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\\\$&")).join("|");
      
      // 2. Build Regex tự động cho tất cả các nhóm (thêm (?i) để không phân biệt hoa thường)
      const activeRegex = "(?i)^(" + escapeRegex(activeCodes) + ")$";
      const inProgRegex = "(?i)^(" + escapeRegex(CONFIG.STATUS_MAPPING.IN_PROGRESS) + ")$";
      const disconRegex = "(?i)^(" + escapeRegex(CONFIG.STATUS_MAPPING.DISCONTINUED) + ")$";
      const blockedRegex = "(?i)^(" + escapeRegex(CONFIG.STATUS_MAPPING.BLOCKED) + ")$";
      const sapOnlyRegex = "(?i)^(" + escapeRegex(CONFIG.STATUS_MAPPING.ACTIVE_SAP_ONLY) + ")$"; // Mới
      
      // 3. Xây dựng chuỗi công thức động (thêm 1 tầng IF)
      const formula = `=ARRAYFORMULA(
      IF(T2:T="", "Active",
      IF(REGEXMATCH(TO_TEXT(T2:T), "${activeRegex}"), "Active",
      IF(REGEXMATCH(TO_TEXT(T2:T), "${sapOnlyRegex}"), "Active (SAP only)",
      IF(REGEXMATCH(TO_TEXT(T2:T), "${inProgRegex}"), "In progress",
      IF(REGEXMATCH(TO_TEXT(T2:T), "${blockedRegex}"), "Blocked",
      IF(REGEXMATCH(TO_TEXT(T2:T), "${disconRegex}"), "Discontinued", "TBD")))))))`;
      
      // Ép công thức vào dòng đầu tiên của cột Status
      body[0][body[0].length - 1] = formula.trim().replace(/\n\s+/g, ""); // Dọn dẹp khoảng trắng
  }

  writeToSheetFast(targetSheetName, header, body);
}

// ==============================
// 4. HÀM GHI DỮ LIỆU TỐI ƯU (ALL-IN-ONE VIP)
// ==============================

function writeToSheetFast(sheetName, header, body) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ssId = ss.getId();
  let sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  } else {
    const protections = sheet.getProtections(SpreadsheetApp.ProtectionType.SHEET);
    protections.forEach(p => p.remove());
    sheet.clearContents(); 
  }

  const allValues = [header, ...body];
  const totalRows = allValues.length;
  const totalCols = header.length;

  if (totalRows === 0) return sheet;

  // --- 1. SHRINK/EXPAND CỰC KỲ SẠCH SẼ ---
  const maxRows = sheet.getMaxRows();
  const maxCols = sheet.getMaxColumns();

  if (maxRows < totalRows) {
    sheet.insertRowsAfter(maxRows, totalRows - maxRows);
  } else if (maxRows > totalRows) {
    sheet.deleteRows(totalRows + 1, maxRows - totalRows);
  }

  if (maxCols < totalCols) {
    sheet.insertColumnsAfter(maxCols, totalCols - maxCols);
  } else if (maxCols > totalCols && totalCols > 0) {
    sheet.deleteColumns(totalCols + 1, maxCols - totalCols);
  }

  SpreadsheetApp.flush(); 

  // --- 2. BƠM API SIÊU TỐC (GIỮ NGUYÊN NATIVE TYPE) ---
  const rangeStr = `${sheetName}!A1`;
  const valueRange = { values: allValues };
  
  try {
    Sheets.Spreadsheets.Values.update(valueRange, ssId, rangeStr, {valueInputOption: "USER_ENTERED"});
  } catch (e) {
    console.error("API Error (Fallback): " + e.message);
    sheet.getRange(1, 1, totalRows, totalCols).setValues(allValues);
  }

  // --- 3. AUTO UI (KHÔNG CẦN CHẠY TAY BẤT CỨ LỆNH NÀO) ---
  // Đã sửa [20, 20] thành [21, 19] để không ẩn cột T (cột số 20)
  if (sheetName === CONFIG.SHEETS.SYS_MAT) batchHideColumns(sheet, [[9, 5], [17, 1], [18, 1], [21, 19], [41, 24], [67, 18]]);
  if (sheetName === CONFIG.SHEETS.SYS_BOM) batchHideColumns(sheet, [[11, 2], [16, 1], [19, 1], [23, 6]]);
  
  applyStandardProtection(sheet, `Protected ${sheetName}`, ['A1']);

  if (sheet.getFilter()) {
    sheet.getFilter().remove();
  }
  sheet.getRange(1, 1, totalRows, totalCols).createFilter();

  sheet.getRange("A1").setNote(`Last updated: ${new Date().toLocaleString()}`);
  ss.toast(`Sheet "${sheetName}" cap nhat thanh cong`, "Import Success", 5);

  return sheet;
}

function writeToSheetRawOnly(sheetName, header, body) {
  return writeToSheetFast(sheetName, header, body);
}

// ==============================
// 5. TIỆN ÍCH ẨN CỘT (V4.6 - BATCH UPDATE OPTIMIZED)
// ==============================
function batchHideColumns(sheet, ranges) {
  if (!ranges || ranges.length === 0) return;
  
  let mergedRanges = [];
  ranges.sort((a, b) => a[0] - b[0]);

  let currentStart = ranges[0][0];
  let currentEnd = currentStart + ranges[0][1] - 1;

  for (let i = 1; i < ranges.length; i++) {
    const [start, numCols] = ranges[i];
    const end = start + numCols - 1;

    if (start <= currentEnd + 1) {
      currentEnd = Math.max(currentEnd, end);
    } else {
      mergedRanges.push([currentStart, currentEnd - currentStart + 1]);
      currentStart = start;
      currentEnd = end;
    }
  }
  mergedRanges.push([currentStart, currentEnd - currentStart + 1]);

  const ssId = sheet.getParent().getId();
  const sheetId = sheet.getSheetId();
  const requests = [];

  // Tạo JSON Payload đóng gói toàn bộ lệnh ẩn cột
  mergedRanges.forEach(([startCol, numCols]) => {
    requests.push({
      updateDimensionProperties: {
        range: { 
          sheetId: sheetId, 
          dimension: "COLUMNS", 
          // Advanced API dùng index bắt đầu từ 0 (A=0, B=1...)
          startIndex: startCol - 1, 
          endIndex: startCol - 1 + numCols 
        },
        properties: { hiddenByUser: true },
        fields: "hiddenByUser"
      }
    });
  });

  if (requests.length > 0) {
    try {
      Sheets.Spreadsheets.batchUpdate({ requests: requests }, ssId);
    } catch (e) {
      console.warn("API batchHideColumns Error (Fallback): " + e.message);
      // Fallback lùi về Native API nếu Workspace chặn
      mergedRanges.forEach(([startCol, numCols]) => {
        try {
          sheet.hideColumns(startCol, numCols);
        } catch (err) {
          console.warn(`Cannot hide columns at ${startCol}: ${err}`);
        }
      });
    }
  }
}

function arrayToObjects_(data) {
  if (!data || data.length < 2) return [];
  const headers = data[0].map(String);
  const body = data.slice(1);
  
  return body.map(row => {
    const obj = {};
    headers.forEach((header, index) => {
      const cleanHeader = header.trim();
      if (index < row.length) {
        obj[cleanHeader] = row[index];
      }
    });
    return obj;
  });
}

/**
 * Trích xuất Old Code của ZFIN (Bỏ qua mã khuyết Old Code)
 * private - không gọi từ Menu
 */
function getZfinOldCodes_(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  const resultSet = new Set();
  if (!sheet || sheet.getLastRow() < 2) return resultSet;

  const data = sheet.getDataRange().getValues();

  if (sheetName === CONFIG.SHEETS.SYS_MAT) {
    for (let i = 1; i < data.length; i++) {
      if (String(data[i][2]).trim().toUpperCase() === "ZFIN") {
        const oldCode = String(data[i][3]).trim();
        if (oldCode) resultSet.add(oldCode);
      }
    }
  } else if (sheetName === CONFIG.SHEETS.SYS_COST) {
    const masterOldCodes = getZfinOldCodes_(CONFIG.SHEETS.SYS_MAT); 
    for (let i = 1; i < data.length; i++) {
      const oldCode = String(data[i][6]).trim(); // Cột G
      if (oldCode && masterOldCodes.has(oldCode)) resultSet.add(oldCode);
    }
  }
  return resultSet;
}

function getBomStateMap_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEETS.BOM); 
  const map = new Map();
  if (!sheet || sheet.getLastRow() < 2) return map;

  // 1. Lấy danh sách ZFIN chuẩn từ ZVNMMMAT để làm màng lọc
  const masterZfins = getZfinOldCodes_(CONFIG.SHEETS.SYS_MAT);

  // 2. Quét A.BOM
  const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 11).getValues();
  for (let i = 0; i < data.length; i++) {
    const parentOld = String(data[i][9]).trim(); 
    const compOld = String(data[i][10]).trim();  
    const qty = parseFloat(data[i][7]) || 0;     
    const unit = String(data[i][8]).trim().toUpperCase(); 

    if (!parentOld) continue;
    
    // [QUAN TRỌNG] Nếu mã mẹ không nằm trong danh sách ZFIN (tức là ZSEM) -> Bỏ qua
    if (!masterZfins.has(parentOld)) continue;

    if (!map.has(parentOld)) map.set(parentOld, []);
    map.get(parentOld).push(`${compOld}|${qty}|${unit}`);
  }

  // 3. Hash dữ liệu
  for (const [key, arr] of map.entries()) {
    arr.sort();
    map.set(key, arr.join(';;'));
  }
  return map;
}

function checkAndNotifyBomDelta_(oldBomStateMap) {
  const newBomStateMap = getBomStateMap_();
  const added = [];
  const modified = [];

  newBomStateMap.forEach((newHash, parentOld) => {
    if (!oldBomStateMap.has(parentOld)) {
      added.push(parentOld);
    } else if (oldBomStateMap.get(parentOld) !== newHash) {
      modified.push(parentOld);
    }
  });

  if (typeof sendDeltaNotificationToChat === 'function') {
    sendDeltaNotificationToChat("ZVNPPBOM", added, modified);
  }
}
//design by Hiep