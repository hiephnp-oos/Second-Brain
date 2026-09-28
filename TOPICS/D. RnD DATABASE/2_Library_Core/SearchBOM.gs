/**
 * ======================================================================================
 * FILE: SearchBOM.gs
 * MODULE: Multilevel BOM Explorer
 * * DESCRIPTION:
 * - Xây dựng thuật toán đệ quy (Recursive) để tìm kiếm và xuất cấu trúc BOM đa tầng.
 * - Map linh kiện con, tính toán hệ số số lượng (Qty) thực tế.
 * - Gán công thức XLOOKUP/REGEX để lấy tự động Supplier, Hình ảnh, và Cost.
 * * DEPENDENCIES:
 * - Config.gs (Đọc tên sheet hệ thống, cấu hình BOM_SEARCH_LAYOUT).
 * - SystemUtils.gs (Xử lý Cache và báo lỗi). YÊU CẦU BẮT BUỘC.
 * - Yêu cầu: Bật "Google Sheets API" trong phần Services để tối ưu hiệu năng.
 * * TRIGGERS / USAGE:
 * - Kích hoạt tự động khi người dùng nhập/sửa mã tại ô F5 của sheet Search BOM (Trigger: onEdit).
 * * AUTHOR: SheetScript Architect / Hoàng Nguyên Phước Hiệp
 * LAST UPDATED: 17/06/2026 | VERSION: V3.1.2
 * * CHANGELOG:
 * - V3.1.2 - 17/06/26: Đưa trở lại onEdit (Simple Trigger) để đạt tốc độ phản hồi tức thì, cấu hình nuốt lỗi API để fallback ngầm về Native UI.
 * - V3.1.1 - 17/06/26: Xóa bỏ typeof guard cho các hàm cache, ép SystemUtils.gs thành hard dependency.
 * - V3.0.0 - 17/06/26: Xóa bỏ magic numbers, đọc cấu hình từ CONFIG. Chia nhỏ hàm generateMultiLevelBOM.
 * - V2.9.0 - 28/05/26: [CLEANUP] Remove emojis, standardize toasts, rename private helper and map variable per GAS anti AI slope rules.
 * - V2.8.0 - 13/04/26: [ENTERPRISE-GRADE] Cache Data Index (bomMap) bằng thuật toán Chunking.
 * ======================================================================================
 */

function generateMultiLevelBOM() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ssId = ss.getId();
  
  const outputSheet = ss.getSheetByName(CONFIG.SHEETS.SEARCH_RESULT); 
  if (!outputSheet) throw new Error(`Sheet "${CONFIG.SHEETS.SEARCH_RESULT}" không tồn tại.`);

  const startCode = outputSheet.getRange("F5").getValue().toString().trim();
  if (!startCode) return;

  // Đọc từ Config thay vì Hardcode
  const START_ROW = CONFIG.BOM_SEARCH_LAYOUT.START_ROW;
  const END_ROW = CONFIG.BOM_SEARCH_LAYOUT.END_ROW;
  const MAX_ROWS = CONFIG.BOM_SEARCH_LAYOUT.MAX_ROWS;

  // =========================================================================
  // CACHE INDEX ENGINE (KẾT HỢP CHUNKING)
  // =========================================================================
  const cache = CacheService.getScriptCache();
  const dataVersion = PropertiesService.getScriptProperties().getProperty("DATA_VERSION") || "v1";
  const cacheKey = `BOM_INDEX_${dataVersion}`;
  
  // Hard dependency vào SystemUtils.gs
  const cachedData = getChunkedCache_(cache, cacheKey);

  let parentToChildrenMap = {};

  if (cachedData) {
    // TRÚNG CACHE: Lấy Index (Bản đồ BOM) thẳng từ RAM
    parentToChildrenMap = JSON.parse(cachedData);
  } else {
    // KHÔNG CÓ CACHE: Đọc A.BOM 1 lần duy nhất và tiền xử lý
    const dataSheet = ss.getSheetByName(CONFIG.SHEETS.BOM); 
    if (!dataSheet) throw new Error(`Sheet "${CONFIG.SHEETS.BOM}" không tồn tại. Vui lòng chạy Smart BOM trước.`);

    const lastRow = dataSheet.getLastRow();
    const lastCol = dataSheet.getLastColumn();
    if (lastRow < 2) return; 

    const data = dataSheet.getRange(1, 1, lastRow, lastCol).getValues();
    const headers = data[0];
    const rows = data.slice(1);

    // Ánh xạ cột dựa trên tiêu đề
    const COL = {
      MATERIAL_OLD: headers.indexOf("Material (old code)"),
      COMPONENT: headers.indexOf("Component"),
      COMPONENT_DESC: headers.indexOf("Component desc."),
      COMPONENT_QTY: headers.indexOf("Component quantity"),
      COMPONENT_UNIT: headers.indexOf("Component unit"),
      COMPONENT_OLD: headers.indexOf("Component (old code)")
    };

    for (const key in COL) {
      if (COL[key] === -1) throw new Error(`Không tìm thấy cột: ${key}. Vui lòng kiểm tra tiêu đề trong sheet ${CONFIG.SHEETS.BOM}`);
    }

    // Tiền xử lý dữ liệu (Làm sạch Data ngay từ bước dựng Map)
    rows.forEach(r => {
      const parent = r[COL.MATERIAL_OLD].toString().trim();
      if (!parentToChildrenMap[parent]) parentToChildrenMap[parent] = [];
      parentToChildrenMap[parent].push({
        d: r[COL.COMPONENT_DESC].toString().trim(),
        o: r[COL.COMPONENT_OLD].toString().trim(),
        c: r[COL.COMPONENT].toString().trim(),
        q: parseFloat(r[COL.COMPONENT_QTY]) || 0,
        u: r[COL.COMPONENT_UNIT] ? r[COL.COMPONENT_UNIT].toString().trim() : ""
      });
    });

    // Lưu Cache Chỉ Mục 
    try {
      putChunkedCache_(cache, cacheKey, JSON.stringify(parentToChildrenMap), 21600); // 6 tiếng
    } catch(e) {
      if (typeof handleError_ === 'function') {
        handleError_(e, "generateMultiLevelBOM (Lưu Cache)", "toast");
      } else {
        console.warn("Lỗi lưu Cache Index: " + e.message);
      }
    }
  }

  // =========================================================================
  // XÂY DỰNG CÂY BOM & XUẤT KẾT QUẢ
  // =========================================================================
  
  // Tách logic đệ quy ra hàm helper
  const treeData = buildBOMTree_(startCode, parentToChildrenMap, MAX_ROWS);
  const result = treeData.result;
  const rowLevels = treeData.rowLevels;

  if (result.length === 0) {
    SpreadsheetApp.getUi().alert("Không tìm thấy BOM cho mã: " + startCode);
    return;
  }

  // Tách logic ghi sheet và format UI ra hàm helper
  writeBOMResultToSheet_(ssId, outputSheet, result, rowLevels, START_ROW, END_ROW, MAX_ROWS);

  SpreadsheetApp.getActive().toast("Da tim xong BOM cho ma: " + startCode, "Search Complete", 4);
  SpreadsheetApp.flush();
}

/**
 * HÀM HELPER: Xử lý logic đệ quy cây BOM thuần tuý trên RAM
 */
function buildBOMTree_(startCode, parentToChildrenMap, maxRows) {
  let result = [];
  let rowLevels = [];

  function buildTree(parentCode, prefix, level, qtyFactor) {
    if (level > 5 || !parentToChildrenMap[parentCode]) return;
    const children = parentToChildrenMap[parentCode];

    children.forEach((child, index) => {
      const numbering = prefix + (index + 1);
      const fullQty = child.q * qtyFactor;

      const indent = Array(5).fill("");
      if (level >= 2 && level <= 5) indent[level - 1] = "." + numbering;

      result.push([
        ...indent,
        child.d,
        "",
        child.o,
        child.c,
        child.o,
        "",
        fullQty || "",
        child.u
      ]);

      rowLevels.push(level);

      buildTree(child.o, numbering + ".", level + 1, fullQty);
    });
  }

  buildTree(startCode, "2.", 2, 1);

  if (result.length > maxRows) {
    SpreadsheetApp.getActive().toast(`BOM vượt quá ${maxRows} dòng! Hệ thống chỉ hiển thị phần đầu để bảo vệ cấu trúc bên dưới.`, "Cảnh báo", 8);
    result.splice(maxRows);
    rowLevels.splice(maxRows);
  }

  return { result, rowLevels };
}

/**
 * HÀM HELPER: Ghi kết quả và format UI (ClearContent + BatchUpdate API)
 */
function writeBOMResultToSheet_(ssId, outputSheet, result, rowLevels, startRow, endRow, maxRows) {
  const docProps = PropertiesService.getDocumentProperties();
  const lastRowsCount = parseInt(docProps.getProperty("LAST_BOM_ROWS") || maxRows.toString());
  // Chỉ Clear đủ số dòng của đợt chạy trước để giảm tải Render
  const clearCount = Math.min(maxRows, Math.max(result.length, lastRowsCount, 1));

  try {
    outputSheet.getRange(startRow, 1, clearCount, 6).clearContent();  // A:F
    outputSheet.getRange(startRow, 8, clearCount, 3).clearContent();  // H:J
    outputSheet.getRange(startRow, 12, clearCount, 2).clearContent(); // L:M
    outputSheet.getRange(startRow, 18, clearCount, 1).clearContent(); // R (Remark)
  } catch(e) {
    if (typeof handleError_ === 'function') {
      handleError_(e, "writeBOMResultToSheet_ (Clear Content)", "toast");
    } else {
      console.warn("Lỗi ClearContent: " + e.message);
    }
  }
  
  // Lưu lại lịch sử số dòng
  docProps.setProperty("LAST_BOM_ROWS", result.length.toString());

  if (result.length > 0) {
    const part1 = result.map(row => row.slice(0, 6));   // A:F
    const part2 = result.map(row => row.slice(7, 10));  // H:J
    const part3 = result.map(row => row.slice(11, 13)); // L:M

    outputSheet.getRange(startRow, 1, result.length, 6).setValues(part1);
    outputSheet.getRange(startRow, 8, result.length, 3).setValues(part2);
    outputSheet.getRange(startRow, 12, result.length, 2).setValues(part3);
  }

  // =========================================================================
  // FULL JSON PAYLOAD BATCH UPDATE (CHỈ UNHIDE VÀ HIDE)
  // =========================================================================
  const sheetId = outputSheet.getSheetId();
  const batchRequests = [];

  try {
    // Đặt lại trạng thái hiển thị toàn bộ bảng (Unhide All)
    batchRequests.push({
      updateDimensionProperties: {
        range: { sheetId: sheetId, dimension: "ROWS", startIndex: startRow - 1, endIndex: endRow },
        properties: { hiddenByUser: false },
        fields: "hiddenByUser"
      }
    });

    // Phân tích tập hợp các dòng cần Ẩn (Hide)
    const rowsToHide = [];
    result.forEach((row, i) => { 
      const missingUnit = !row[8];
      const isLevel3Plus = rowLevels[i] >= 3;
      if (missingUnit || isLevel3Plus) rowsToHide.push(startRow + i); 
    });
    
    for (let i = result.length; i < maxRows; i++) { 
      rowsToHide.push(startRow + i); 
    }

    if (rowsToHide.length > 0) {
      const hideGroups = getGaps_(rowsToHide);
      hideGroups.forEach(([start, count]) => {
        batchRequests.push({
          updateDimensionProperties: {
            range: { sheetId: sheetId, dimension: "ROWS", startIndex: start - 1, endIndex: start - 1 + count },
            properties: { hiddenByUser: true },
            fields: "hiddenByUser"
          }
        });
      });
    }

    if (batchRequests.length > 0) {
      SpreadsheetApp.flush(); // Ép đồng bộ Render UI
      Sheets.Spreadsheets.batchUpdate({ requests: batchRequests }, ssId);
    }

  } catch (error) {
    // CỐ TÌNH NUỐT LỖI (SILENT FALLBACK)
    // Bỏ gọi handleError_ ở đây để người dùng không bị làm phiền bởi Toast khi chạy qua Simple Trigger
    // console.warn("Chuyển sang Native UI: " + error.message);
    
    // BACKUP NATIVE UI
    outputSheet.showRows(startRow, maxRows);
    
    const rowsToHide = [];
    result.forEach((row, i) => { 
      if (!row[8] || rowLevels[i] >= 3) rowsToHide.push(startRow + i); 
    });
    for (let i = result.length; i < maxRows; i++) { 
      rowsToHide.push(startRow + i); 
    }
    
    if (rowsToHide.length > 0) {
      SpreadsheetApp.flush();
      const hideGroups = getGaps_(rowsToHide);
      hideGroups.forEach(([start, count]) => outputSheet.hideRows(start, count));
    }
  }
}

/**
 * Thuật toán gom các index rời rạc thành các mảng liên tiếp
 */
function getGaps_(rows) {
  if (!rows.length) return [];
  rows.sort((a, b) => a - b);
  const groups = [];
  let start = rows[0], count = 1;
  for (let i = 1; i < rows.length; i++) {
    if (rows[i] === rows[i - 1] + 1) count++;
    else {
      groups.push([start, count]);
      start = rows[i];
      count = 1;
    }
  }
  groups.push([start, count]);
  return groups;
}

/**
 * Sự kiện trigger tự động khi sửa ô F5
 * TRẢ VỀ SIMPLE TRIGGER ĐỂ ĐẠT TỐC ĐỘ PHẢN HỒI TỨC THÌ
 */
function onEdit(e) {
  if (!e || !e.range) return;
  const range = e.range;
  const sheet = range.getSheet(); 
  
  if (sheet.getName() === CONFIG.SHEETS.SEARCH_RESULT && range.getRow() === 5 && range.getColumn() === 6) {
    const value = range.getValue().toString().trim();
    if (value) generateMultiLevelBOM();
  }
}

/**
 * =========================================================================
 * [V2.7] HÀM ADMIN: KHÔI PHỤC CÔNG THỨC MẢNG
 * =========================================================================
 */
function restoreBOMFormulas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const outputSheet = ss.getSheetByName(CONFIG.SHEETS.SEARCH_RESULT); 
  
  if (!outputSheet) {
    SpreadsheetApp.getUi().alert(`Không tìm thấy sheet "${CONFIG.SHEETS.SEARCH_RESULT}"!`);
    return;
  }

  const sheetBOM = CONFIG.SHEETS.BOM;
  const sheetMat = CONFIG.SHEETS.MATERIAL;
  const sheetDraw = CONFIG.SHEETS.DRAWING;
  const sheetSupp = CONFIG.SHEETS.SUPPLIER; 

  ss.toast("Đang khôi phục công thức gốc...", "Admin Tool", -1);

  outputSheet.getRange("F15:I15").setFormulas([[
    `=XLOOKUP($F$5,'${sheetBOM}'!J:J,'${sheetBOM}'!B:B)`,
    `=ArrayFormula(XLOOKUP($H$15:$H$119,'${sheetMat}'!$A:$A,'${sheetMat}'!$M:$M,""))`,
    `=B12`,
    `=G12`
  ]]);
  
  // Đã cập nhật công thức cột N (vị trí index 3) trỏ sang cột B và F của sheet Supplier
  outputSheet.getRange("K16:Q16").setFormulas([[
    `=ArrayFormula(XLOOKUP($H$16:$H$119,'${sheetMat}'!$A:$A,'${sheetMat}'!$L:$L,""))`,
    "", "", 
    `=ArrayFormula(IFERROR(ifs(REGEXMATCH($H$16:$H$119,"@"),"DNF",REGEXMATCH($H$16:$H$119,"SE3"),"CONG TY CP phat trien KHCN Vina"),XLOOKUP($H$16:$H$119,'${sheetSupp}'!$B:$B,'${sheetSupp}'!$F:$F,"")))`,
    `=ArrayFormula(IFERROR(LEFT($H$16:$H$119, FIND("@", $H$16:$H$119) - 1),$H$16:$H$119))`,
    `=ArrayFormula("R" & IF(LEN(XLOOKUP($H$16:$H$119,'${sheetMat}'!$A:$A,'${sheetMat}'!$E:$E,""))=0,"1",RIGHT(XLOOKUP($H$16:$H$119,'${sheetMat}'!$A:$A,'${sheetMat}'!$E:$E,""))))`,
    `=ArrayFormula(IF(REGEXMATCH($K$16:$K$119, "^(Decal|Carton|Paper|TESA 62934|Silica|Fabric)$"), "N", "Y"))`
  ]]);

  outputSheet.getRange("S15").setFormula(`=BYROW(H15:H$119,LAMBDA(a,IF(a="","",IFERROR(INDEX(FILTER('${sheetDraw}'!$G$4:$G,REGEXMATCH('${sheetDraw}'!$D$4:$D,"(?i)(^|[^A-Z0-9-])" & REGEXREPLACE(REGEXREPLACE(TRIM(SUBSTITUTE(a,CHAR(160)," ")),"@.*|\\.$","" ),"([\\\\^$.*+?()\\[\\]{}|\\-])","\\\\$1") & "(?:@[A-Z0-9_-]+)?([^A-Z0-9-]|$)")),1),""))))`);

  SpreadsheetApp.flush();
  ss.toast("Đã khôi phục toàn bộ công thức mảng (ArrayFormula) thành công!", "Admin Tool", 5);
}

/**
 * [SHARED HELPER] Đọc BOM Index từ RAM. Throw Error nếu Cache Miss.
 * Dùng chung cho SearchBOM và CompareBOM.
 */
function getBomIndex_() {
  const cache = CacheService.getScriptCache();
  const dataVersion = PropertiesService.getScriptProperties().getProperty("DATA_VERSION") || "v1";
  const cacheKey = `BOM_INDEX_${dataVersion}`;
  
  // Gọi trực tiếp, ép SystemUtils.gs thành dependency bắt buộc
  const cached = getChunkedCache_(cache, cacheKey);
  if (!cached) {
    throw new Error("BOM_INDEX_MISSING");
  }
  
  return JSON.parse(cached);
}

/**
 * [CACHE WARMING] Chủ động dựng lại Cache BOM_INDEX ngầm.
 * Phục vụ cho Trigger hoặc chạy ngay sau khi Import Master Data.
 */
function warmUpBomIndex() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const dataSheet = ss.getSheetByName(CONFIG.SHEETS.BOM); 
  if (!dataSheet) return false;

  const lastRow = dataSheet.getLastRow();
  const lastCol = dataSheet.getLastColumn();
  if (lastRow < 2) return false;

  const data = dataSheet.getRange(1, 1, lastRow, lastCol).getValues();
  const headers = data[0];
  const rows = data.slice(1);

  const COL = {
    MATERIAL_OLD: headers.indexOf("Material (old code)"),
    COMPONENT: headers.indexOf("Component"),
    COMPONENT_DESC: headers.indexOf("Component desc."),
    COMPONENT_QTY: headers.indexOf("Component quantity"),
    COMPONENT_UNIT: headers.indexOf("Component unit"),
    COMPONENT_OLD: headers.indexOf("Component (old code)")
  };

  // Guard check: Đảm bảo format sheet A.BOM không bị đổi
  for (const key in COL) {
    if (COL[key] === -1) {
      console.warn(`Cache Warming thất bại: Thiếu cột ${key} trong A.BOM`);
      return false;
    }
  }

  let parentToChildrenMap = {};
  rows.forEach(r => {
    const parent = r[COL.MATERIAL_OLD].toString().trim();
    if (!parentToChildrenMap[parent]) parentToChildrenMap[parent] = [];
    parentToChildrenMap[parent].push({
      d: r[COL.COMPONENT_DESC].toString().trim(),
      o: r[COL.COMPONENT_OLD].toString().trim(),
      c: r[COL.COMPONENT].toString().trim(),
      q: parseFloat(r[COL.COMPONENT_QTY]) || 0,
      u: r[COL.COMPONENT_UNIT] ? r[COL.COMPONENT_UNIT].toString().trim() : ""
    });
  });

  const cache = CacheService.getScriptCache();
  let dataVersion = PropertiesService.getScriptProperties().getProperty("DATA_VERSION");
  if (!dataVersion) {
    dataVersion = new Date().getTime().toString();
    PropertiesService.getScriptProperties().setProperty("DATA_VERSION", dataVersion);
  }
  const cacheKey = `BOM_INDEX_${dataVersion}`;

  try {
    // Gọi trực tiếp, ép SystemUtils.gs thành dependency bắt buộc
    putChunkedCache_(cache, cacheKey, JSON.stringify(parentToChildrenMap), 21600); // Tồn tại trong 6 tiếng
    console.log(`[CACHE WARMING] Đã làm ấm thành công BOM_INDEX_${dataVersion}`);
    return true;
  } catch(e) {
    if (typeof handleError_ === 'function') {
      handleError_(e, "warmUpBomIndex", "toast");
    } else {
      console.warn("Lỗi lưu Cache Index (Warmup): " + e.message);
    }
    return false;
  }
}