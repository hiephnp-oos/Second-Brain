/**
 * ======================================================================================
 * FILE: SystemHealth.gs
 * MODULE: System Maintenance Dashboard & Health Check
 * * DESCRIPTION:
 * - Khởi tạo và quản lý Sheet "Maintenance" (Nuke In-Place, an toàn cho Drawing).
 * - Các hàm Module độc lập: Quét Missing (Zone 2), Incomplete (Zone 3), Ghost (Zone 4) và System Audit (Zone 5).
 * - Tích hợp Zone 6 (Mã rác) và Zone 7 (Blocked BOMs) phục vụ test trên Maintenance2.
 * * DEPENDENCIES:
 * - Config.gs (Sử dụng CONFIG.SHEETS để truy xuất các bảng dữ liệu gốc).
 * - Audit_Protection.gs (Gọi hàm auditAllProtections cho Zone 5).
 * * TRIGGERS / USAGE:
 * - Kích hoạt thủ công từ Apps Script Editor (Dành cho System Admin).
 * * AUTHOR: SheetScript Architect / Hoàng Nguyên Phước Hiệp
 * LAST UPDATED: 28/05/2026 | VERSION: V1.8
 * * CHANGELOG:
 * - V1.8 - 28/05/26: [CLEANUP] Remove emojis, standardize toasts to no-accent text, rename Set/Map variables per GAS anti AI slope rules.
 * - V1.7 - 12/05/26: Cập nhật zone 6, zone 7
 * - V1.6 - 13/04/26: [PERFORMANCE] Thoát bẫy Recalculation (Zone 2 & 3). Xử lý Regex tìm Drawing trực tiếp trên RAM bằng JS và bảo toàn Hyperlink, triệt tiêu độ trễ UI do Sheets Engine.
 * - V1.5 - 09/04/26: [FIX] Revert Data Write về Native setValues để sửa lỗi Asynchronous Queue xóa đè data. Giữ lại UI Batch Update.
 * - V1.4 - 09/04/26: [PERFORMANCE] Áp dụng Batch Update API cho UI và API Values.update cho Data.
 * - V1.3 - 09/04/26: Tối ưu Memory I/O cho Zone 3 (Chỉ getFormulas cho cột Picture, giảm 95% RAM).
 * - V1.2 - 09/04/26: Nâng cấp Zone 3 - Sắp xếp Missing Fields theo ưu tiên.
 * - V1.1 - 09/04/26: Bổ sung Documentation Header chuẩn theo template.
 * - V1.0 - 08/04/26: Khởi tạo module SystemHealth, thiết kế giao diện 5 Zones.
 * ======================================================================================
 */

function setupMaintenanceLayout() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetName = "Maintenance";
  let sheet = ss.getSheetByName(sheetName);

  ss.toast("Dang ve lai UI bang API Batch Update...", "UI Rebuild", -1);

  if (!sheet) {
    sheet = ss.insertSheet(sheetName, 0);
  } else {
    sheet.clear(); 
    sheet.clearNotes();
    sheet.clearFormats();
    sheet.clearConditionalFormatRules();
    if (sheet.getFilter()) sheet.getFilter().remove();
    
    try { 
      sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).shiftColumnGroupDepth(-8); 
    } catch(e) {}
    
    ss.setActiveSheet(sheet);
    ss.moveActiveSheet(1);
  }

  // Tổng số cột bây giờ là 36 (Zone 1 tăng thêm 1 cột)
  const currentCols = sheet.getMaxColumns();
  if (currentCols > 36) sheet.deleteColumns(37, currentCols - 36);
  else if (currentCols < 36) sheet.insertColumnsAfter(currentCols, 36 - currentCols);
  
  const currentRows = sheet.getMaxRows();
  if (currentRows > 100) sheet.deleteRows(101, currentRows - 100);

  const sheetId = sheet.getSheetId();
  const requests = [];
  const valueRequests = [];

  requests.push({
    updateSheetProperties: {
      properties: { sheetId: sheetId, gridProperties: { frozenRowCount: 3, hideGridlines: true } },
      fields: "gridProperties(frozenRowCount,hideGridlines)"
    }
  });

  requests.push({ updateDimensionProperties: { range: { sheetId: sheetId, dimension: "ROWS", startIndex: 0, endIndex: 1 }, properties: { pixelSize: 35 }, fields: "pixelSize" } });
  requests.push({ updateDimensionProperties: { range: { sheetId: sheetId, dimension: "ROWS", startIndex: 1, endIndex: 3 }, properties: { pixelSize: 25 }, fields: "pixelSize" } });

  requests.push({
    repeatCell: {
      range: { sheetId: sheetId, startRowIndex: 0, endRowIndex: sheet.getMaxRows(), startColumnIndex: 0, endColumnIndex: 36 },
      cell: { userEnteredFormat: { textFormat: { fontFamily: "Arial", fontSize: 10 }, verticalAlignment: "MIDDLE", wrapStrategy: "CLIP" } },
      fields: "userEnteredFormat(textFormat,verticalAlignment,wrapStrategy)"
    }
  });

  // TẤT CẢ ZONES ĐÃ OFFSET SANG PHẢI +1 SO VỚI BẢN TRƯỚC
  const zones = [
    { startCol: 1, numCols: 4, title: "TOTAL DRAWING: Audit", color: "#e6b8af", sub: ["Folder path", "Drawing Code", "Issue Type", "Action Required"] },
    { startCol: 6, numCols: 3, title: "B.MATERIAL: Unused items", color: "#f4c7c3", sub: ["Old Code (B.Mat)", "Description", "Status"] },
    { startCol: 10, numCols: 3, title: "B.MATERIAL: Missing information", color: "#fff2cc", sub: ["Old Code", "Description", "Drawing"] },
    { startCol: 14, numCols: 3, title: "B.MATERIAL: Incomplete information", color: "#fce5cd", sub: ["Component", "Missing Fields", "Drawing"] },
    { startCol: 18, numCols: 3, title: "A.BOM: Ghost components", color: "#d9d2e9", sub: ["Parent in BOM", "Ghost Component", "Ghost Error Reason"] },
    { startCol: 22, numCols: 6, title: "A.BOM: Blocked status & Cost date", color: "#d0e0e3", sub: ["Material", "Status Mat", "Mat Cost Date", "Component", "Status Comp", "Comp Cost Date"] },
    { startCol: 29, numCols: 3, title: "EXPORT: Input SKU here", color: "#d9ead3", sub: ["OLD", "NEW", "KIT"] },
    { startCol: 33, numCols: 3, title: "SYSTEM: Security audit", color: "#cfe2f3", sub: ["Sheet Name", "Protection Type", "Editors"] }
  ];

  const colorRed = hexToRgb_("#d32f2f");
  const borderMed = { style: "SOLID_MEDIUM", color: hexToRgb_("#666666") };
  const borderReg = { style: "SOLID", color: hexToRgb_("#999999") };
  const borderLight = { style: "SOLID", color: hexToRgb_("#cccccc") };

  zones.forEach(z => {
    const sc = z.startCol - 1;
    const ec = sc + z.numCols;

    const colLetter = (i) => getColLetter_(z.startCol + i);
    const countFormulas = [];
    for (let i = 0; i < z.numCols; i++) {
       countFormulas.push(`=COUNTIF(${colLetter(i)}4:${colLetter(i)}, "?*") + COUNT(${colLetter(i)}4:${colLetter(i)})`);
    }

    valueRequests.push({ range: `Maintenance!${colLetter(0)}1`, values: [[z.title]] });
    valueRequests.push({ range: `Maintenance!${colLetter(0)}2`, values: [z.sub] });
    valueRequests.push({ range: `Maintenance!${colLetter(0)}3`, values: [countFormulas] });

    requests.push({ mergeCells: { range: { sheetId: sheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: sc, endColumnIndex: ec }, mergeType: "MERGE_ALL" } });
    requests.push({
      repeatCell: {
        range: { sheetId: sheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: sc, endColumnIndex: ec },
        cell: { userEnteredFormat: { backgroundColor: hexToRgb_(z.color), textFormat: { bold: true, fontSize: 12 }, horizontalAlignment: "CENTER", borders: { top: borderMed, bottom: borderMed, left: borderMed, right: borderMed } } },
        fields: "userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,borders)"
      }
    });

    requests.push({
      repeatCell: {
        range: { sheetId: sheetId, startRowIndex: 1, endRowIndex: 2, startColumnIndex: sc, endColumnIndex: ec },
        cell: { userEnteredFormat: { backgroundColor: hexToRgb_("#eeeeee"), textFormat: { bold: true }, horizontalAlignment: "CENTER", borders: { top: borderReg, bottom: borderReg, left: borderReg, right: borderReg } } },
        fields: "userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,borders)"
      }
    });

    requests.push({
      repeatCell: {
        range: { sheetId: sheetId, startRowIndex: 2, endRowIndex: 3, startColumnIndex: sc, endColumnIndex: ec },
        cell: { userEnteredFormat: { backgroundColor: hexToRgb_("#f8f9fa"), textFormat: { bold: true, foregroundColor: colorRed }, horizontalAlignment: "CENTER", borders: { top: borderLight, bottom: borderLight, left: borderLight, right: borderLight } } },
        fields: "userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,borders)"
      }
    });

    requests.push({
      addDimensionGroup: {
        range: { sheetId: sheetId, dimension: "COLUMNS", startIndex: sc, endIndex: ec }
      }
    });
  });

  // Spacers cập nhật mốc toạ độ do đổi chỗ Zone
  const spacers = [5, 9, 13, 17, 21, 28, 32]; 
  spacers.forEach(col => {
    const sc = col - 1;
    requests.push({
      repeatCell: {
        range: { sheetId: sheetId, startRowIndex: 0, endRowIndex: sheet.getMaxRows(), startColumnIndex: sc, endColumnIndex: sc + 1 },
        cell: { userEnteredFormat: { backgroundColor: hexToRgb_("#f3f3f3") } },
        fields: "userEnteredFormat.backgroundColor"
      }
    });
  });

  requests.push({
    repeatCell: {
      range: { sheetId: sheetId, startRowIndex: 0, endRowIndex: sheet.getMaxRows(), startColumnIndex: 35, endColumnIndex: 36 },
      cell: { userEnteredFormat: { backgroundColor: hexToRgb_("#999999") } }, // Dark Gray 1
      fields: "userEnteredFormat.backgroundColor"
    }
  });

  // Tinh chỉnh lại mảng width bám sát thứ tự mới
  const widths = { 
    1:120, 2:150, 3:150, 4:150, 5:20, // Zone 1: Drawing Audit (4 cột)
    6:130, 7:250, 8:130, 9:20,   // Zone 2: Unused B.Mat
    10:120, 11:220, 12:100, 13:20, // Zone 3: Missing
    14:140, 15:200, 16:100, 17:20, // Zone 4: Incomplete
    18:130, 19:130, 20:150, 21:20, // Zone 5: Ghost
    22:120, 23:100, 24:120, 25:120, 26:100, 27:120, 28:20, // Zone 6: Blocked
    29:130, 30:130, 31:130, 32:20, // Zone 7: Export
    33:120, 34:120, 35:180, 36:20  // Zone 8: Security
  };
  
  Object.keys(widths).forEach(col => {
    requests.push({ updateDimensionProperties: { range: { sheetId: sheetId, dimension: "COLUMNS", startIndex: Number(col)-1, endIndex: Number(col) }, properties: { pixelSize: widths[col] }, fields: "pixelSize" } });
  });

  // Định dạng Text (@) ép riêng cho cột SKU luồng Export (cột 29 đến 31 -> Index 28-30)
  requests.push({
    repeatCell: {
      range: { sheetId: sheetId, startRowIndex: 3, endRowIndex: sheet.getMaxRows(), startColumnIndex: 28, endColumnIndex: 31 },
      cell: { userEnteredFormat: { numberFormat: { type: "TEXT" } } },
      fields: "userEnteredFormat.numberFormat"
    }
  });

  try {
    Sheets.Spreadsheets.batchUpdate({ requests: requests }, ss.getId());
    Sheets.Spreadsheets.Values.batchUpdate({ valueInputOption: "USER_ENTERED", data: valueRequests }, ss.getId());
    ss.toast("He thong Maintenance da duoc tai cau truc.", "Setup Complete", 5);
  } catch (e) {
    ss.toast("Loi API: " + e.message, "Setup Error", 8);
  }

  return sheet;
}

/** Helper: Convert màu Hex sang RGB cho BatchUpdate API */
function hexToRgb_(hex) {
  const cleanHex = hex.replace('#', '');
  return {
    red: parseInt(cleanHex.substring(0, 2), 16) / 255,
    green: parseInt(cleanHex.substring(2, 4), 16) / 255,
    blue: parseInt(cleanHex.substring(4, 6), 16) / 255
  };
}

/** Helper: Convert Index sang Column Letter (Ex: 1 -> A, 27 -> AA) */
function getColLetter_(colIndex) {
  let temp, letter = '';
  while (colIndex > 0) {
    temp = (colIndex - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    colIndex = (colIndex - temp - 1) / 26;
  }
  return letter;
}

// =======================================================================
// HELPER: Hàm hỗ trợ Expand Row An Toàn
// =======================================================================
function ensureRowsSafe_(sheet, requiredRows) {
  const currentMaxRows = sheet.getMaxRows();
  if (requiredRows > currentMaxRows) {
    sheet.insertRowsAfter(currentMaxRows, requiredRows - currentMaxRows + 5); 
  }
}

// =======================================================================
// MODULE 0: ZONE 1 - DRAWING AUDIT (UNUSED & MISNAMED)
// =======================================================================
function checkZone1_DrawingAudit() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("Maintenance");

  if (!sheet) {
    ss.toast("Vui long khoi tao layout truoc.", "Missing Layout", 5);
    return;
  }

  ss.toast("Dang quet du lieu Total Drawing...", "Zone 1 Scan", -1);

  const matData = ss.getSheetByName(CONFIG.SHEETS.SYS_MAT).getDataRange().getValues();
  const bomData = ss.getSheetByName(CONFIG.SHEETS.SYS_BOM).getDataRange().getValues();
  const aBomData = ss.getSheetByName(CONFIG.SHEETS.BOM).getDataRange().getValues();

  // Tập hợp mã hợp lệ (Used/Active)
  const activeCompSet = new Set();
  
  // [PATCH] Helper chuẩn hóa mã dự phòng (cắt hậu tố @) để đối chiếu với bản vẽ
  const cleanBaseCode = (c) => c.replace(/\u00A0/g, " ").trim().replace(/@.*/, "").replace(/\.$/, "");

  // Bước 1: Tìm Status Column trong ZVNMMMAT
  let statusColIdx = -1;
  const matHeaders = matData[0];
  for (let i = 0; i < matHeaders.length; i++) {
    if (String(matHeaders[i]).trim().toLowerCase() === "status") {
      statusColIdx = i;
      break;
    }
  }
  if (statusColIdx === -1) statusColIdx = matHeaders.length - 1;

  // Bước 2: Thêm các mã Standalone Active từ ZVNMMMAT vào Whitelist
  for (let i = 1; i < matData.length; i++) {
    const sap = String(matData[i][0]).trim();
    const old = String(matData[i][3]).trim();
    const rawStatus = String(matData[i][statusColIdx]).trim();

    let isActive = false;
    if (typeof CONFIG !== 'undefined' && CONFIG.STATUS_MAPPING) {
      if (CONFIG.STATUS_MAPPING.ACTIVE.includes(rawStatus) || CONFIG.STATUS_MAPPING.ACTIVE_SAP_ONLY.includes(rawStatus)) {
        isActive = true;
      }
    } else {
       if (rawStatus === "Active" || rawStatus === "2" || rawStatus === "") isActive = true;
    }

    if (isActive) {
      // [PATCH] Nạp cả mã gốc và mã đã cắt @ vào RAM
      if (sap) {
        activeCompSet.add(sap);
        activeCompSet.add(cleanBaseCode(sap));
      }
      if (old) {
        activeCompSet.add(old);
        activeCompSet.add(cleanBaseCode(old));
      }
    }
  }

  // Bước 3: Tìm ZFIN từ SYS_BOM và lọc con từ A.BOM
  const zfinSapSet = new Set();
  for (let i = 1; i < bomData.length; i++) {
    if (String(bomData[i][4]).trim().toUpperCase() === "ZFIN") {
      zfinSapSet.add(String(bomData[i][0]).trim());
    }
  }

  const zfinOldCodeSet = new Set();
  for (let i = 1; i < matData.length; i++) {
    const sap = String(matData[i][0]).trim();
    const old = String(matData[i][3]).trim();
    if (sap && zfinSapSet.has(sap) && old) {
      zfinOldCodeSet.add(old);
    }
  }

  for (let i = 1; i < aBomData.length; i++) {
    const parentOld = String(aBomData[i][9]).trim(); 
    const compOld = String(aBomData[i][10]).trim();  
    if (zfinOldCodeSet.has(parentOld)) {
      // [PATCH] Nạp cả mã gốc và mã đã cắt @ vào RAM
      if (compOld) {
        activeCompSet.add(compOld);     
        activeCompSet.add(cleanBaseCode(compOld));     
      }
      if (parentOld) {
        activeCompSet.add(parentOld); 
        activeCompSet.add(cleanBaseCode(parentOld)); 
      }
    }
  }

  // Bước 4: Quét Total Drawing
  const drawingSheet = ss.getSheetByName(CONFIG.SHEETS.DRAWING);
  if (!drawingSheet || drawingSheet.getLastRow() < 4) {
    ss.toast("Khong co du lieu trong Total Drawing.", "Scan Error", 5);
    return;
  }

  const drawData = drawingSheet.getRange(4, 1, drawingSheet.getLastRow() - 3, 9).getValues();
  
  const misnamedTracker = new Map();
  const rawResults = [];

  for (let i = 0; i < drawData.length; i++) {
    const fileType = String(drawData[i][0]).trim(); 
    const code = String(drawData[i][3]).trim();     
    if (!code) continue;

    if (!misnamedTracker.has(code)) {
      misnamedTracker.set(code, { count: 1, fType: fileType });
    } else {
      misnamedTracker.get(code).count++;
    }

    // Lúc này code bản vẽ sẽ tự động tìm thấy bản tương ứng không có @ trong RAM
    if (!activeCompSet.has(code)) {
      rawResults.push({ 
        fType: fileType,
        code: code, 
        type: "Unused in BOM", 
        action: "Move to Old Folder" 
      });
    }
  }

  for (const [code, info] of misnamedTracker.entries()) {
    if (info.count > 1) {
      rawResults.push({ 
        fType: info.fType,
        code: code, 
        type: "Wrong name format", 
        action: "Rename on Drive" 
      });
    }
  }

  const uniqueResultsMap = new Map();
  rawResults.forEach(item => {
    const key = `${item.fType}_${item.code}_${item.type}`;
    uniqueResultsMap.set(key, [item.fType, item.code, item.type, item.action]);
  });

  const finalData = Array.from(uniqueResultsMap.values());

  // Sắp xếp: Unused lên trước Wrong name, sau đó xếp 11.1 trước 11.2
  finalData.sort((a, b) => {
    if (a[2] !== b[2]) return a[2].localeCompare(b[2]); // Issue Type (U trước W)
    if (a[0] !== b[0]) return a[0].localeCompare(b[0]); // Folder (11.1 trước 11.2)
    return String(a[1]).localeCompare(String(b[1]));    // Code
  });

  ensureRowsSafe_(sheet, finalData.length + 3);
  sheet.getRange(4, 1, Math.max(sheet.getMaxRows() - 3, 1), 4).clearContent().setNumberFormat("@");

  if (finalData.length > 0) {
    sheet.getRange(4, 1, finalData.length, 4).setValues(finalData);
  }
  
  sheet.getRange("A1").setNote(`Last Scan: ${Utilities.formatDate(new Date(), "GMT+7", "HH:mm:ss dd/MM")}`);
  ss.toast(`Quet xong Zone 1! Phat hien ${finalData.length} issues.`, "Scan Complete", 5);
}

// =======================================================================
// MODULE 1: ZONE 2 - MISSING IN B.MATERIAL
// =======================================================================
function checkZone2_MissingBMat() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Maintenance");
  if (!sheet) {
    ss.toast("Vui long khoi tao layout truoc.", "Missing Layout", 5);
    return;
  }
  
  ss.toast("Dang quet du lieu cac ma thieu...", "Zone 2 Scan", -1);
  
  const matData = ss.getSheetByName(CONFIG.SHEETS.SYS_MAT).getDataRange().getValues();
  const bomData = ss.getSheetByName(CONFIG.SHEETS.SYS_BOM).getDataRange().getValues();
  const aBomData = ss.getSheetByName(CONFIG.SHEETS.BOM).getDataRange().getValues();
  const bMatData = ss.getSheetByName(CONFIG.SHEETS.MATERIAL).getDataRange().getValues();

  const bMatCompSet = new Set();
  for (let i = 1; i < bMatData.length; i++) {
    const val = String(bMatData[i][0]).trim();
    if (val) bMatCompSet.add(val);
  }

  const zfinSapSet = new Set();
  for (let i = 1; i < bomData.length; i++) {
    if (String(bomData[i][4]).trim().toUpperCase() === "ZFIN") zfinSapSet.add(String(bomData[i][0]).trim());
  }

  const zfinOldCodeSet = new Set(); 
  const oldCodeToInfoMap = new Map();
  for (let i = 1; i < matData.length; i++) {
    const sap = String(matData[i][0]).trim();
    const old = String(matData[i][3]).trim();
    const desc = String(matData[i][6]).trim();
    if (sap) {
      if (old) oldCodeToInfoMap.set(old, { sap: sap, desc: desc });
      if (zfinSapSet.has(sap) && old) zfinOldCodeSet.add(old); 
    }
  }

  const requiredCompOldSet = new Set(); 
  for (let i = 1; i < aBomData.length; i++) {
    const parentOld = String(aBomData[i][9]).trim(); 
    const compOld = String(aBomData[i][10]).trim();  
    if (zfinOldCodeSet.has(parentOld) && compOld) requiredCompOldSet.add(compOld);
  }

  const missingCompToInfoMap = new Map(); 
  requiredCompOldSet.forEach(comp => {
    if (!bMatCompSet.has(comp)) missingCompToInfoMap.set(comp, [comp, (oldCodeToInfoMap.get(comp) || { desc: "" }).desc]);
  });
  zfinOldCodeSet.forEach(zfin => {
    if (!bMatCompSet.has(zfin)) missingCompToInfoMap.set(zfin, [zfin, (oldCodeToInfoMap.get(zfin) || { desc: "" }).desc]);
  });

  const missingData = Array.from(missingCompToInfoMap.values());
  
  missingData.sort((a, b) => String(a[0]).localeCompare(String(b[0])));
  
  ensureRowsSafe_(sheet, missingData.length + 3);
  
  sheet.getRange(4, 10, Math.max(sheet.getMaxRows() - 3, 1), 3).clearContent().setNumberFormat("@");
  
  if (missingData.length > 0) {
    const drawSheet = ss.getSheetByName('Total Drawing');
    const drawLastRow = Math.max(4, drawSheet ? drawSheet.getLastRow() : 4);
    const drawRange = drawSheet ? drawSheet.getRange("D4:G" + drawLastRow) : null;
    
    const drawVals = drawRange ? drawRange.getValues() : [];
    const drawForms = drawRange ? drawRange.getFormulas() : [];

    const finalData = missingData.map(row => {
      let comp = row[0] || "";
      let foundLink = "";
      
      if (comp) {
        const cleanComp = comp.replace(/@.*|\.$/g, "").trim().replace(/\u00A0/g, " ");
        const regexStr = "(^|[^A-Z0-9-])" + cleanComp.replace(/([\\^$.*+?()[\]{}|-])/g, "\\$1") + "(?:@[A-Z0-9_-]+)?([^A-Z0-9-]|$)";
        const regex = new RegExp(regexStr, "i");
        
        for (let d = 0; d < drawVals.length; d++) {
          if (regex.test(drawVals[d][0])) {
            foundLink = drawForms[d][3] ? drawForms[d][3] : drawVals[d][3]; 
            break;
          }
        }
      }
      return [row[0], row[1], foundLink]; 
    });

    sheet.getRange(4, 10, finalData.length, 3).setValues(finalData);
  }
  
  sheet.getRange("J1").setNote(`Last Scan: ${Utilities.formatDate(new Date(), "GMT+7", "HH:mm:ss dd/MM")}`);
  ss.toast("Da cap nhat cac ma thieu: Tim thay " + missingData.length + " ma.", "Scan Complete", 5);
}

// =======================================================================
// MODULE 2: ZONE 3 - INCOMPLETE B.MATERIAL
// =======================================================================
function checkZone3_IncompleteBMat() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Maintenance");
  if (!sheet) {
    ss.toast("Vui long khoi tao layout truoc.", "Missing Layout", 5);
    return;
  }

  ss.toast("Dang quet cac component thieu thong tin...", "Zone 3 Scan", -1);

  const bMatSheet = ss.getSheetByName(CONFIG.SHEETS.MATERIAL);
  const lastRow = bMatSheet.getLastRow();
  if (lastRow < 4) {
    ss.toast("Khong du du lieu B.Material", "Scan Error", 5);
    return;
  }

  const bMatData = bMatSheet.getDataRange().getValues();
  const picFormulas = bMatSheet.getRange(1, 13, lastRow, 1).getFormulas();

  const compToIncompleteInfoMap = new Map();

  for (let i = 3; i < bMatData.length; i++) { 
    const comp = String(bMatData[i][0]).trim();
    if (comp) {
      const cat = String(bMatData[i][7]).trim();      
      const type = String(bMatData[i][8]).trim();     
      const material = String(bMatData[i][11]).trim();
      
      const formulaStr = (i < picFormulas.length && picFormulas[i]) ? String(picFormulas[i][0]) : "";
      const hasPic = (String(bMatData[i][12]).trim() !== "" || formulaStr.trim() !== ""); 

      const missing = [];
      if (!cat) missing.push("Category");
      if (!type) missing.push("Type");
      if (!material) missing.push("Material");
      if (!hasPic) missing.push("Picture");

      if (missing.length > 0) {
        compToIncompleteInfoMap.set(comp, { comp: comp, missingArr: missing, missingStr: missing.join(", ") });
      }
    }
  }

  let rawData = Array.from(compToIncompleteInfoMap.values());
  rawData.sort((a, b) => {
    const getPriority = (arr) => {
      if (arr.includes("Picture")) return 1;
      if (arr.includes("Material")) return 2;
      return 3;
    };
    const prioA = getPriority(a.missingArr);
    const prioB = getPriority(b.missingArr);
    
    if (prioA !== prioB) return prioA - prioB; 
    if (a.missingArr.length !== b.missingArr.length) return a.missingArr.length - b.missingArr.length;
    return a.comp.localeCompare(b.comp);
  });

  const incompleteData = rawData.map(item => [item.comp, item.missingStr]);

  ensureRowsSafe_(sheet, incompleteData.length + 3);
  
  sheet.getRange(4, 14, Math.max(sheet.getMaxRows() - 3, 1), 3).clearContent().setNumberFormat("@");

  if (incompleteData.length > 0) {
    const drawSheet = ss.getSheetByName('Total Drawing');
    const drawLastRow = Math.max(4, drawSheet ? drawSheet.getLastRow() : 4);
    const drawRange = drawSheet ? drawSheet.getRange("D4:G" + drawLastRow) : null;
    
    const drawVals = drawRange ? drawRange.getValues() : [];
    const drawForms = drawRange ? drawRange.getFormulas() : [];

    const finalData = incompleteData.map(row => {
      let comp = row[0] || "";
      let foundLink = "";
      
      if (comp) {
        const cleanComp = comp.replace(/@.*|\.$/g, "").trim().replace(/\u00A0/g, " ");
        const regexStr = "(^|[^A-Z0-9-])" + cleanComp.replace(/([\\^$.*+?()[\]{}|-])/g, "\\$1") + "(?:@[A-Z0-9_-]+)?([^A-Z0-9-]|$)";
        const regex = new RegExp(regexStr, "i");
        
        for (let d = 0; d < drawVals.length; d++) {
          if (regex.test(drawVals[d][0])) {
            foundLink = drawForms[d][3] ? drawForms[d][3] : drawVals[d][3]; 
            break;
          }
        }
      }
      return [row[0], row[1], foundLink]; 
    });

    sheet.getRange(4, 14, finalData.length, 3).setValues(finalData);
  }
  
  sheet.getRange("N1").setNote(`Last Scan: ${Utilities.formatDate(new Date(), "GMT+7", "HH:mm:ss dd/MM")}`);
  ss.toast("Da cap nhat: Tim thay " + incompleteData.length + " ma.", "Scan Complete", 5);
}

// =======================================================================
// MODULE 3: ZONE 4 - GHOST IN A.BOM
// =======================================================================
function checkZone4_GhostBOM() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Maintenance");
  if (!sheet) {
    ss.toast("Vui long khoi tao layout truoc.", "Missing Layout", 5);
    return;
  }

  ss.toast("Dang quet du lieu Ghosts...", "Zone 4 Scan", -1);

  const matData = ss.getSheetByName(CONFIG.SHEETS.SYS_MAT).getDataRange().getValues();
  const bomData = ss.getSheetByName(CONFIG.SHEETS.SYS_BOM).getDataRange().getValues();

  const sapToOldCodeMap = new Map();
  for (let i = 1; i < matData.length; i++) {
    const sap = String(matData[i][0]).trim();
    if (sap) sapToOldCodeMap.set(sap, String(matData[i][3]).trim()); 
  }

  const ghostKeyToInfoMap = new Map();

  for (let i = 1; i < bomData.length; i++) {
    const row = bomData[i];
    if ((String(row[4]).toUpperCase() !== "ZFIN" && String(row[4]).toUpperCase() !== "ZSEM") || String(row[5]) !== "1") continue;
    
    const parentSap = String(row[0]).trim();
    const compSap = String(row[13]).trim();

    if (parentSap && !sapToOldCodeMap.has(parentSap)) {
      const key = `PARENT_${parentSap}`;
      if (!ghostKeyToInfoMap.has(key)) ghostKeyToInfoMap.set(key, [parentSap, "N/A", "Parent missing in ZVNMMMAT"]);
      continue; 
    }

    if (compSap && !sapToOldCodeMap.has(compSap)) {
      const parentOld = sapToOldCodeMap.get(parentSap) || parentSap;
      const key = `COMP_${parentOld}_${compSap}`;
      if (!ghostKeyToInfoMap.has(key)) ghostKeyToInfoMap.set(key, [parentOld, compSap, "Missing in ZVNMMMAT"]);
    }
  }

  const ghostData = Array.from(ghostKeyToInfoMap.values());

  ensureRowsSafe_(sheet, ghostData.length + 3);
  
  sheet.getRange(4, 18, Math.max(sheet.getMaxRows() - 3, 1), 3).clearContent().setNumberFormat("@");

  if (ghostData.length > 0) {
    sheet.getRange(4, 18, ghostData.length, 3).setValues(ghostData);
  }
  
  sheet.getRange("R1").setNote(`Last Scan: ${Utilities.formatDate(new Date(), "GMT+7", "HH:mm:ss dd/MM")}`);
  ss.toast("Da cap nhat: Tim thay " + ghostData.length + " loi.", "Scan Complete", 5);
}

// =======================================================================
// MODULE 4: ZONE 5 - SECURITY AUDIT
// =======================================================================
function checkZone5_SecurityAudit() {
  if (typeof auditAllProtections === 'function') {
    SpreadsheetApp.getActiveSpreadsheet().toast("Dang tien hanh kiem toan bao mat...", "Security Audit", -1);
    auditAllProtections(); 
  } else {
    SpreadsheetApp.getUi().alert("Loi: Khong tim thay ham auditAllProtections() trong he thong.");
  }
}

// =======================================================================
// MODULE 5: ZONE 6 - UNUSED B.MATERIAL
// =======================================================================
function checkZone6_UnusedBMat() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("Maintenance");

  if (!sheet) {
    ss.toast("Vui long khoi tao layout truoc.", "Missing Layout", 5);
    return;
  }

  ss.toast("Dang quet du lieu cheo tren RAM...", "Zone 6 Scan", -1);

  const matData = ss.getSheetByName(CONFIG.SHEETS.SYS_MAT).getDataRange().getValues();
  const bomData = ss.getSheetByName(CONFIG.SHEETS.SYS_BOM).getDataRange().getValues();
  const aBomData = ss.getSheetByName(CONFIG.SHEETS.BOM).getDataRange().getValues();
  const bMatData = ss.getSheetByName(CONFIG.SHEETS.MATERIAL).getDataRange().getValues();

  // [PATCH] Helper chuẩn hóa mã dự phòng (cắt hậu tố @)
  const cleanBaseCode = (c) => c.replace(/\u00A0/g, " ").trim().replace(/@.*/, "").replace(/\.$/, "");

  const zfinSapSet = new Set();
  for (let i = 1; i < bomData.length; i++) {
    if (String(bomData[i][4]).trim().toUpperCase() === "ZFIN") {
      zfinSapSet.add(String(bomData[i][0]).trim());
    }
  }

  const zfinOldCodeSet = new Set();
  const oldCodeToDescMap = new Map();
  for (let i = 1; i < matData.length; i++) {
    const sap = String(matData[i][0]).trim();
    const old = String(matData[i][3]).trim();
    const desc = String(matData[i][6]).trim();

    if (old) oldCodeToDescMap.set(old, desc);
    if (sap && zfinSapSet.has(sap) && old) {
      zfinOldCodeSet.add(old);
    }
  }

  const activeCompSet = new Set();
  for (let i = 1; i < aBomData.length; i++) {
    const parentOld = String(aBomData[i][9]).trim(); 
    const compOld = String(aBomData[i][10]).trim();  
    
    if (zfinOldCodeSet.has(parentOld)) {
      // [PATCH] Nạp cả mã gốc VÀ mã đã cắt đuôi @ vào bộ nhớ "Active"
      if (compOld) {
        activeCompSet.add(compOld);
        activeCompSet.add(cleanBaseCode(compOld)); 
      }
      if (parentOld) {
        activeCompSet.add(parentOld);
        activeCompSet.add(cleanBaseCode(parentOld));
      }
    }
  }

  const unusedList = [];
  for (let i = 1; i < bMatData.length; i++) {
    const compInBMat = String(bMatData[i][0]).trim();
    if (compInBMat && compInBMat.toUpperCase() !== "MATERIAL") { 
      if (!activeCompSet.has(compInBMat)) {
        const desc = oldCodeToDescMap.get(compInBMat) || "N/A";
        unusedList.push([compInBMat, desc, "Unused in ZFIN BOM"]);
      }
    }
  }

  ensureRowsSafe_(sheet, unusedList.length + 3);
  sheet.getRange(4, 6, Math.max(sheet.getMaxRows() - 3, 1), 3).clearContent().setNumberFormat("@");

  if (unusedList.length > 0) {
    sheet.getRange(4, 6, unusedList.length, 3).setValues(unusedList);
  }
  
  sheet.getRange("A1").setNote(`Last Scan: ${Utilities.formatDate(new Date(), "GMT+7", "HH:mm:ss dd/MM")}`);
  ss.toast("Quet xong! Phat hien " + unusedList.length + " ma rac.", "Scan Complete", 5);
}

// =======================================================================
// MODULE 6: ZONE 7 - BLOCKED BOM & COSTING DATE
// =======================================================================
function checkZone7_BlockedBOM() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("Maintenance");

  if (!sheet) {
    ss.toast("Vui long khoi tao layout truoc.", "Missing Layout", 5);
    return;
  }

  ss.toast("Dang quet du lieu Blocked BOM...", "Zone 7 Scan", -1);

  const matSheet = ss.getSheetByName(CONFIG.SHEETS.SYS_MAT);
  const bomSheet = ss.getSheetByName(CONFIG.SHEETS.SYS_BOM);
  const costSheet = ss.getSheetByName(CONFIG.SHEETS.SYS_COST);

  if (!matSheet || !bomSheet || !costSheet) {
    ss.toast("Loi: Khong tim thay du cac sheet he thong.", "Scan Error", 8);
    return;
  }

  const matData = matSheet.getDataRange().getValues();
  const bomData = bomSheet.getDataRange().getValues();
  const costData = costSheet.getDataRange().getValues();

  let statusColIdx = -1;
  const matHeaders = matData[0];
  for (let i = 0; i < matHeaders.length; i++) {
    if (String(matHeaders[i]).trim().toLowerCase() === "status") {
      statusColIdx = i;
      break;
    }
  }
  if (statusColIdx === -1) statusColIdx = matHeaders.length - 1;

  const sapToStatusMap = new Map();
  const sapToOldCodeMap = new Map();

  for (let i = 1; i < matData.length; i++) {
    const sap = String(matData[i][0]).trim();
    const old = String(matData[i][3]).trim(); 
    const rawStatus = String(matData[i][statusColIdx]).trim();

    let status = rawStatus;
    if (typeof CONFIG !== 'undefined' && CONFIG.STATUS_MAPPING) {
      if (CONFIG.STATUS_MAPPING.BLOCKED.includes(rawStatus)) status = "Blocked";
      else if (CONFIG.STATUS_MAPPING.ACTIVE.includes(rawStatus)) status = "Active";
      else if (CONFIG.STATUS_MAPPING.ACTIVE_SAP_ONLY.includes(rawStatus)) status = "Active"; 
      else if (CONFIG.STATUS_MAPPING.IN_PROGRESS.includes(rawStatus)) status = "In progress";
      else if (CONFIG.STATUS_MAPPING.DISCONTINUED.includes(rawStatus)) status = "Discontinued";
    }

    if (sap) {
      sapToOldCodeMap.set(sap, old || sap);
      sapToStatusMap.set(sap, status);
    }
  }

  const sapToCostDateMap = new Map();
  for (let i = 1; i < costData.length; i++) {
    const sap = String(costData[i][5]).trim();
    let costDateStr = String(costData[i][3]).trim();
    if (sap && costDateStr) {
      costDateStr = costDateStr.replace(/^'/, "");
      sapToCostDateMap.set(sap, costDateStr);
    }
  }

  const results = [];
  const processedKeySet = new Set(); 

  for (let i = 1; i < bomData.length; i++) {
    const type = String(bomData[i][4]).trim().toUpperCase(); 
    const altBom = String(bomData[i][5]).trim(); 

    if ((type === "ZFIN" || type === "ZSEM") && altBom === "1") {
      const parentSap = String(bomData[i][0]).trim(); 
      const compSap = String(bomData[i][13]).trim(); 

      const parentStatus = sapToStatusMap.get(parentSap) || "N/A";
      const compStatus = sapToStatusMap.get(compSap) || "N/A";

      if (parentStatus === "Blocked" || compStatus === "Blocked") {
        const key = `${parentSap}_${compSap}`;
        if (!processedKeySet.has(key)) {
          processedKeySet.add(key);

          const parentOld = sapToOldCodeMap.get(parentSap) || parentSap;
          const compOld = sapToOldCodeMap.get(compSap) || compSap;
          const parentCostDate = sapToCostDateMap.get(parentSap) || "";
          const compCostDate = sapToCostDateMap.get(compSap) || "";

          results.push([
            parentOld,
            parentStatus,
            parentCostDate,
            compOld,
            compStatus,
            compCostDate
          ]);
        }
      }
    }
  }

  results.sort((a, b) => {
    const aMatBlocked = a[1] === "Blocked" ? 1 : 0;
    const bMatBlocked = b[1] === "Blocked" ? 1 : 0;
    if (aMatBlocked !== bMatBlocked) return bMatBlocked - aMatBlocked; 

    const aCompBlocked = a[4] === "Blocked" ? 1 : 0;
    const bCompBlocked = b[4] === "Blocked" ? 1 : 0;
    if (aCompBlocked !== bCompBlocked) return bCompBlocked - aCompBlocked;

    const isDateOutdated = (dateStr) => {
      if (!dateStr) return 0;
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return 0; 
      return d.getFullYear() <= 2025 ? 1 : 0;
    };
    
    const aDateOutdated = Math.max(isDateOutdated(a[2]), isDateOutdated(a[5]));
    const bDateOutdated = Math.max(isDateOutdated(b[2]), isDateOutdated(b[5]));
    if (aDateOutdated !== bDateOutdated) return bDateOutdated - aDateOutdated; 

    return String(a[0]).localeCompare(String(b[0]));
  });

  ensureRowsSafe_(sheet, results.length + 3);
  sheet.getRange(4, 22, Math.max(sheet.getMaxRows() - 3, 1), 6).clearContent().setNumberFormat("@");

  if (results.length > 0) {
    sheet.getRange(4, 22, results.length, 6).setValues(results);
  }

  sheet.getRange("V1").setNote(`Last Scan: ${Utilities.formatDate(new Date(), "GMT+7", "HH:mm:ss dd/MM")}`);
  ss.toast("Quet xong Zone 7! Tim thay " + results.length + " cap BOM loi.", "Scan Complete", 5);
}

function runAllHealthChecksBackground() {
  console.log("Bat dau chay ngam System Health Check...");
  try {
    checkZone1_DrawingAudit();
    checkZone6_UnusedBMat();
    checkZone2_MissingBMat();
    checkZone3_IncompleteBMat();
    checkZone4_GhostBOM();
    checkZone7_BlockedBOM();
    checkZone5_SecurityAudit();
    
    console.log("Hoan tat chay ngam toan bo Zones.");
    
    if (typeof logAction === 'function') {
      logAction("SYSTEM HEALTH", "Auto-scan toàn bộ Zones hoàn tất (Background).");
    }

    // [MỚI] GỌI HÀM BẮN THÔNG BÁO GOOGLE CHAT
    sendHealthCheckSummaryChat();

  } catch (e) {
    console.error("Loi khi chay ngam Health Check: " + e.message);
  }
}

/**
 * [MỚI] Hàm đọc dữ liệu tóm tắt và bắn thông báo qua Google Chat Webhook
 */
function sendHealthCheckSummaryChat() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Maintenance");
  if (!sheet) return;

  const fileUrl = ss.getUrl() + "#gid=" + sheet.getSheetId();

  const getCount = (colIndex) => {
    const val = sheet.getRange(3, colIndex).getValue();
    return (isNaN(val) || val === "") ? 0 : Number(val);
  };

  const stats = {
    unused: getCount(6),
    missing: getCount(10),
    incomplete: getCount(14),
    ghost: getCount(18),
    blocked: getCount(22),
    security: getCount(33)
  };

  // --- BÓC TÁCH SỐ LIỆU ĐỘC LẬP CHO ZONE 1 (DRAWING - 4 CỘT) ---
  let drawWrong = 0, drawOld = 0;
  let accWrong = 0, accOld = 0;
  
  const maxRow = Math.max(sheet.getLastRow(), 4);
  const zone1Data = sheet.getRange(4, 1, maxRow - 3, 4).getValues();
  
  zone1Data.forEach(row => {
    const fileType = String(row[0]).trim();
    const issueType = String(row[2]).trim();
    
    if (!issueType) return; // Bỏ qua dòng trống
    
    const isDrawing = fileType.includes("11.1_Drawing");
    const isAccessory = fileType.includes("11.2_Accessory");
    
    if (issueType === "Unused in BOM") {
      if (isDrawing) drawOld++;
      if (isAccessory) accOld++;
    } else if (issueType === "Wrong name format") {
      if (isDrawing) drawWrong++;
      if (isAccessory) accWrong++;
    }
  });

  const totalDrawingIssues = drawWrong + drawOld + accWrong + accOld;
  const totalIssues = totalDrawingIssues + stats.unused + stats.missing + stats.incomplete + stats.ghost + stats.blocked + stats.security;
  
  const nowStr = Utilities.formatDate(new Date(), "GMT+7", "dd/MM/yyyy HH:mm");
  const icon = totalIssues > 0 ? "🚨" : "✅";
  const statusText = totalIssues > 0 ? "Phát hiện dữ liệu cần xử lý" : "Hệ thống hoạt động ổn định";

  // Format tin nhắn chuyên nghiệp, phân rã Zone 1
  const messageText = `${icon} *BÁO CÁO HỆ THỐNG (SYSTEM HEALTH)*\n` +
                      `Thời gian hoàn tất: *${nowStr}*\n` +
                      `Trạng thái: *${statusText}*\n\n` +
                      `*TỔNG HỢP KẾT QUẢ:*\n` +
                      `• 11.1_Drawing: *${drawWrong}* sai tên | *${drawOld}* mã rác/cũ\n` +
                      `• 11.2_Accessory: *${accWrong}* sai tên | *${accOld}* mã rác/cũ\n` +
                      `• B.Material - Mã không sử dụng: *${stats.unused}* (Cần xóa)\n` +
                      `• B.Material - Mã mới cần thêm: *${stats.missing}* (Cần bổ sung)\n` +
                      `• B.Material - Mã Thiếu thông tin (hình ảnh, phân loại): *${stats.incomplete}* (Cần cập nhật)\n` +
                      `• A.BOM - Mã lỗi cấu trúc (Ghost): *${stats.ghost}* (Cần kiểm tra Master Data)\n` +
                      `• A.BOM - Trạng thái Blocked: *${stats.blocked}* (Cần rà soát)\n` +
                      `• Phân quyền bảo mật (Security): *${stats.security}* (Đã xử lý)\n\n` +
                      `👉 <${fileUrl}|TRUY CẬP DASHBOARD>`;

  if (typeof sendSystemAlertToChat === 'function') {
    sendSystemAlertToChat(messageText);
  }
}

function removeUnusedBMat() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  // 1. Chốt chặn an toàn: Yêu cầu xác nhận từ con người
  const response = ui.alert(
    "⚠️ XÁC NHẬN XÓA DỮ LIỆU",
    "Hệ thống sẽ XÓA VĨNH VIỄN các mã linh kiện rác (tại Zone 6) khỏi sheet B.Material.\nHành động này KHÔNG THỂ hoàn tác.\n\nBạn có chắc chắn muốn tiếp tục?",
    ui.ButtonSet.YES_NO
  );
  
  if (response !== ui.Button.YES) {
    ss.toast("Đã hủy thao tác xóa dữ liệu.", "Đã hủy", 3);
    return;
  }

  const maintenanceSheet = ss.getSheetByName("Maintenance");
  if (!maintenanceSheet) {
    ui.alert("Lỗi: Không tìm thấy sheet Maintenance.");
    return;
  }

  // 2. Thu thập danh sách mã rác từ Zone 6 (Cột A)
  const lastRowMaint = maintenanceSheet.getLastRow();
  if (lastRowMaint < 4) {
    ss.toast("Không có dữ liệu Unused B.Mat để xóa.", "Thông báo", 3);
    return;
  }

  const unusedData = maintenanceSheet.getRange(4, 1, lastRowMaint - 3, 1).getValues();
  const unusedSet = new Set();
  
  unusedData.forEach(row => {
    const code = String(row[0]).trim();
    if (code) unusedSet.add(code);
  });

  if (unusedSet.size === 0) {
    ss.toast("Không có mã rác nào cần xóa.", "Thông báo", 3);
    return;
  }

  // 3. Quét tìm vị trí các dòng cần xóa bên B.Material
  const bMatSheet = ss.getSheetByName(CONFIG.SHEETS.MATERIAL);
  if (!bMatSheet) {
    ui.alert(`Lỗi: Không tìm thấy sheet ${CONFIG.SHEETS.MATERIAL}`);
    return;
  }

  const bMatData = bMatSheet.getDataRange().getValues();
  const rowsToDelete = [];

  for (let i = 0; i < bMatData.length; i++) {
    const compInBMat = String(bMatData[i][0]).trim();
    if (compInBMat && unusedSet.has(compInBMat)) {
      rowsToDelete.push(i + 1); // Lưu lại index hệ thống (bắt đầu từ 1)
    }
  }

  if (rowsToDelete.length === 0) {
    ss.toast("Không tìm thấy mã tương ứng trong B.Material để xóa.", "Thông báo", 3);
    return;
  }

  ss.toast(`Đang tiến hành xóa ${rowsToDelete.length} dòng khỏi B.Material...`, "Cleaning", -1);

  // 4. Thuật toán gom nhóm dòng (Chunking) để xóa qua API
  rowsToDelete.sort((a, b) => a - b);
  const groups = [];
  let startRow = rowsToDelete[0];
  let countRows = 1;

  for (let i = 1; i < rowsToDelete.length; i++) {
    if (rowsToDelete[i] === rowsToDelete[i - 1] + 1) {
      countRows++;
    } else {
      groups.push({ start: startRow, count: countRows });
      startRow = rowsToDelete[i];
      countRows = 1;
    }
  }
  groups.push({ start: startRow, count: countRows });

  // BẮT BUỘC ĐẢO NGƯỢC (Xóa từ dưới lên) để tránh lệch tọa độ các block bên dưới
  groups.reverse();
  const requests = [];
  const sheetId = bMatSheet.getSheetId();

  groups.forEach(group => {
    requests.push({
      deleteDimension: {
        range: {
          sheetId: sheetId,
          dimension: "ROWS",
          startIndex: group.start - 1, // API dùng index bắt đầu từ 0
          endIndex: group.start - 1 + group.count
        }
      }
    });
  });

  // 5. Thực thi xóa
  try {
    Sheets.Spreadsheets.batchUpdate({ requests: requests }, ss.getId());
  } catch (e) {
    console.warn("API batchUpdate failed for delete rows. Fallback to native. " + e.message);
    // Fallback: Xóa bằng hàm Native từ dưới lên trên
    for (let i = rowsToDelete.length - 1; i >= 0; i--) {
      bMatSheet.deleteRow(rowsToDelete[i]);
    }
  }

  // 6. Xóa dữ liệu cũ trên Zone 6 để báo hiệu đã dọn dẹp xong
  maintenanceSheet.getRange(4, 1, lastRowMaint - 3, 3).clearContent();

  // Ghi log hệ thống
  if (typeof logAction === 'function') {
    logAction("CLEANUP", `Đã xóa vĩnh viễn ${rowsToDelete.length} mã rác khỏi B.Material`);
  }

  ss.toast(`Hoàn tất! Đã xóa sạch ${rowsToDelete.length} mã rác.`, "Clean Complete", 8);
}