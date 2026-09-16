/**
 * ======================================================================================
 * FILE: GlobalSearch.gs
 * MODULE: Global Finder & In-Memory Cache Engine
 * * DESCRIPTION:
 * - Backend xử lý logic tìm kiếm Fuzzy Search cho giao diện Sidebar HTML.
 * - [V4.0] Xóa bỏ hoàn toàn sự phụ thuộc vào TextFinder. Chuyển đổi kiến trúc sang
 * "In-Memory Array Processing" (Tìm kiếm trên bộ nhớ RAM) kết hợp Turbo Cache, 
 * đạt tốc độ phản hồi gần như thời gian thực (Zero-lag).
 * - Quản lý Cache Invalidation (hủy cache cũ) bằng hệ thống Versioning.
 * * DEPENDENCIES:
 * - Config.gs (Đọc thời gian Cache và tên Sheet).
 * * TRIGGERS / USAGE:
 * - Kích hoạt UI qua Menu (Menu: Menu -> Finder).
 * - Các hàm tìm kiếm được gọi ngầm (google.script.run) từ Sidebar.html.
 * * AUTHOR: SheetScript Architect / Hoàng Nguyên Phước Hiệp
 * LAST UPDATED: 28/05/2026 | VERSION: V4.2
 * * CHANGELOG:
 * - V4.2 - 28/05/26: [CLEANUP] Remove emojis from comments, rename Set variables per GAS anti AI slope rules.
 * - V4.1 - 13/04/26: [AUDIT] Nuke log chạy ngầm (rebuildSearchIndex) để tránh spam hệ thống log tập trung, chuyển về lưu console nội bộ.
 * - V4.0 - 08/04/26: [AUDIT FIX] Thay thế TextFinder bằng In-Memory Array Search. Tối ưu cực đại.
 * - V3.1 - 08/04/26: Sửa Issue 5 - Tối ưu hiệu năng tìm kiếm bằng cách giới hạn Range theo getLastRow().
 * ======================================================================================
 */

/**
 * Hiển thị Sidebar Tìm kiếm
 */
function showGlobalSearchSidebar() {
  const html = HtmlService.createHtmlOutputFromFile('Sidebar')
      .setTitle('Fuzzy Search'); 
  SpreadsheetApp.getUi().showSidebar(html);
}

// ==========================================
// TURBO CACHE CORE (QUẢN LÝ PHIÊN BẢN)
// ==========================================

function getDataVersion_() {
  return PropertiesService.getScriptProperties().getProperty("DATA_VERSION") || "v1";
}

function rebuildSearchIndex() {
  const newVersion = new Date().getTime().toString(); 
  PropertiesService.getScriptProperties().setProperty("DATA_VERSION", newVersion);
  
  // Chỉ log vào console nội bộ của Apps Script, không bắn ra file Log của User để tránh spam
  console.log("Index rebuilt (Cache Invalidation) - Version: " + newVersion);
}

// ==========================================
// IN-MEMORY SEARCH (XỬ LÝ TRÊN RAM - V4.0)
// ==========================================

/**
 * Gợi ý sản phẩm khi gõ (Suggestions)
 */
function getProductSuggestions(query) {
  if (!query) return [];
  
  const version = getDataVersion_();
  const cacheKey = `SUGGEST_${version}_${query.toLowerCase().trim()}`;
  
  const cache = CacheService.getScriptCache();
  const cachedResult = cache.get(cacheKey);
  if (cachedResult) return JSON.parse(cachedResult);

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEETS.SYS_MAT); 
  if (!sheet) return [];

  const lastRow = sheet.getLastRow();
  if (lastRow === 0) return [];

  // Bốc dữ liệu lên RAM (Chỉ lấy Cột A đến D)
  const data = sheet.getRange(1, 1, lastRow, 4).getValues();
  const suggestionCodeSet = new Set();
  const queryLower = query.toLowerCase().trim();
  
  // Quét trực tiếp trên RAM (Nhanh gấp 10 lần TextFinder)
  for (let i = 0; i < data.length; i++) {
    if (suggestionCodeSet.size >= 10) break;
    
    const sapCode = String(data[i][0]);       // Cột A
    const oldCode = String(data[i][3] || ""); // Cột D
    
    if (sapCode.toLowerCase().includes(queryLower)) {
      suggestionCodeSet.add(sapCode);
    } else if (oldCode.toLowerCase().includes(queryLower)) {
      suggestionCodeSet.add(oldCode);
    }
  }
  
  const result = Array.from(suggestionCodeSet);
  if (result.length > 0) {
    cache.put(cacheKey, JSON.stringify(result), CONFIG.CACHE_TIME.SUGGESTIONS);
  }
  
  return result;
}

/**
 * HÀM 1: Lấy thông tin cơ bản
 */
function getBasicInfo(exactCode) {
  const version = getDataVersion_();
  const cacheKey = `BASIC_${version}_${exactCode.trim()}`;
  
  const cache = CacheService.getScriptCache();
  const cachedResult = cache.get(cacheKey);
  if (cachedResult) return JSON.parse(cachedResult);

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetMaster = ss.getSheetByName(CONFIG.SHEETS.SYS_MAT);
  if (!sheetMaster) return null;

  const lastRow = sheetMaster.getLastRow();
  if (lastRow === 0) return null;

  // Bốc dữ liệu lên RAM (Cột A đến H)
  const data = sheetMaster.getRange(1, 1, lastRow, 8).getValues();
  const exactLower = exactCode.toLowerCase().trim();
  let result = null;

  // Quét trên RAM để lấy thông tin khớp 100%
  for (let i = 0; i < data.length; i++) {
    const sapCode = String(data[i][0]);
    const oldCode = String(data[i][3] || "");
    
    if (sapCode.toLowerCase() === exactLower || oldCode.toLowerCase() === exactLower) {
      result = {
        sapCode: sapCode,
        oldCode: oldCode,
        descEN: data[i][6],
        descVI: data[i][7],
        keyForBOM: oldCode ? oldCode : sapCode
      };
      break;
    }
  }
  
  if (result) {
    cache.put(cacheKey, JSON.stringify(result), CONFIG.CACHE_TIME.BASIC_INFO);
  }
  
  return result;
}

/**
 * HÀM 2: Cấu trúc BOM (Thẻ Đỏ)
 */
function getBOMRelations(sapCode, keyForBOM) {
  const version = getDataVersion_();
  const cacheKey = `RELATION_${version}_${sapCode}_${keyForBOM}`;
  
  const cache = CacheService.getScriptCache();
  const cachedResult = cache.get(cacheKey);
  if (cachedResult) return JSON.parse(cachedResult);

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetBOM = ss.getSheetByName(CONFIG.SHEETS.BOM);
  const sheetZFIN = ss.getSheetByName(CONFIG.SHEETS.SYS_BOM);
  
  const result = { parents: [], children: [], isZFIN: false };
  if (!sheetBOM) return result;

  // Bước 1: Xác định ZFIN (Quét RAM)
  if (sheetZFIN && sapCode) {
    const lrZFIN = sheetZFIN.getLastRow();
    if (lrZFIN > 0) {
      const zfinData = sheetZFIN.getRange(1, 1, lrZFIN, 5).getValues(); // Đến cột E
      const targetSapLower = sapCode.toLowerCase().trim();
      for (let i = 0; i < zfinData.length; i++) {
        if (String(zfinData[i][0]).toLowerCase().trim() === targetSapLower) {
          const type = String(zfinData[i][4]).trim().toUpperCase(); 
          if (type === "ZFIN") result.isZFIN = true;
          break;
        }
      }
    }
  }

  const parentSapSet = new Set();
  const childSapSet = new Set();
  const lrBOM = sheetBOM.getLastRow();

  // Bước 2: Tìm Quan hệ BOM (Quét RAM toàn bộ A.BOM)
  if (lrBOM > 0) {
    const bomData = sheetBOM.getRange(1, 1, lrBOM, 11).getValues(); // Đến cột K
    const keyLower = keyForBOM.toLowerCase().trim();

    for (let i = 0; i < bomData.length; i++) {
      const colF = String(bomData[i][5] || "").toLowerCase().trim();  // Index 5 (Cột F)
      const colJ = String(bomData[i][9] || "").toLowerCase().trim();  // Index 9 (Cột J)
      const colK = String(bomData[i][10] || "").toLowerCase().trim(); // Index 10 (Cột K)

      if (result.isZFIN) {
        // ZFIN: Lấy con (J = key -> lưu K)
        if (colJ === keyLower && bomData[i][10]) {
          childSapSet.add(String(bomData[i][10]));
        }
      } else {
        // LINH KIỆN: Lấy mẹ (K = key hoặc F = key -> lưu J)
        if ((colK === keyLower || colF === keyLower) && bomData[i][9]) {
          parentSapSet.add(String(bomData[i][9]));
        }
      }
    }
  }

  result.parents = Array.from(parentSapSet);
  result.children = Array.from(childSapSet);
  
  cache.put(cacheKey, JSON.stringify(result), CONFIG.CACHE_TIME.RELATIONS);
  return result;
}

/**
 * HÀM 3: Chi phí & Bản vẽ
 */
function getExtraDetails(keyForBOM) {
  const version = getDataVersion_();
  const cacheKey = `EXTRA_${version}_${keyForBOM}`;
  
  const cache = CacheService.getScriptCache();
  const cachedResult = cache.get(cacheKey);
  if (cachedResult) return JSON.parse(cachedResult);

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const result = { cost: "N/A", drawing: null };
  const keyLower = keyForBOM.toLowerCase().trim();

  // 1. Lấy Cost (Quét RAM)
  const sheetCost = ss.getSheetByName(CONFIG.SHEETS.SYS_COST);
  if (sheetCost) {
    const lrCost = sheetCost.getLastRow();
    if (lrCost > 0) {
      const costData = sheetCost.getRange(1, 6, lrCost, 30).getValues(); // F đến AI (Index 0 đến 29)
      for (let i = 0; i < costData.length; i++) {
        const fCol = String(costData[i][0]).toLowerCase().trim();
        const gCol = String(costData[i][1]).toLowerCase().trim();
        if (fCol === keyLower || gCol === keyLower) {
          result.cost = costData[i][29]; // Cột AI
          break;
        }
      }
    }
  }

  // 2. Lấy Bản vẽ (Tối ưu hóa: Tìm vị trí trước, bốc công thức sau)
  const sheetDrawing = ss.getSheetByName(CONFIG.SHEETS.DRAWING);
  if (sheetDrawing) {
    const lrDraw = sheetDrawing.getLastRow();
    if (lrDraw > 0) {
      const drawCodeData = sheetDrawing.getRange(1, 4, lrDraw, 1).getValues(); // Chỉ đọc cột D
      const keyLowerSplit = keyLower.includes("@") ? keyLower.split("@")[0] : keyLower;
      
      let foundRow = -1;
      // Quét RAM tìm dòng chứa mã
      for (let i = 0; i < drawCodeData.length; i++) {
        const code = String(drawCodeData[i][0]).toLowerCase().trim();
        if (code === keyLower || code === keyLowerSplit) {
          foundRow = i + 1; // getRange dùng 1-based index
          break;
        }
      }

      // Chỉ lấy công thức ĐÚNG 1 DÒNG ĐÓ thay vì hàng nghìn dòng (Speed up cực đại)
      if (foundRow > 0) {
        const rowFormulas = sheetDrawing.getRange(foundRow, 7, 1, 3).getFormulas()[0]; // G, H, I
        const rowVals = sheetDrawing.getRange(foundRow, 7, 1, 3).getValues()[0];
        
        const extractHyperlink = (formula, val) => {
          if (formula && formula.toUpperCase().includes('HYPERLINK')) {
            const match = formula.match(/HYPERLINK\("([^"]+)"/i);
            return match ? match[1] : val;
          }
          return val;
        };

        let finalLink = extractHyperlink(rowFormulas[0], rowVals[0]) 
                     || extractHyperlink(rowFormulas[1], rowVals[1]) 
                     || extractHyperlink(rowFormulas[2], rowVals[2]);

        result.drawing = finalLink;
      }
    }
  }

  cache.put(cacheKey, JSON.stringify(result), CONFIG.CACHE_TIME.EXTRA_INFO);
  return result;
}

//design by Hiep