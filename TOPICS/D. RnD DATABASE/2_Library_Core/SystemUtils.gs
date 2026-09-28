/**
 * ======================================================================================
 * FILE: SystemUtils.gs
 * MODULE: Core System Utilities
 * * DESCRIPTION:
 * - Tập hợp các hàm tiện ích dùng chung cho toàn bộ hệ thống (Cache, Setup, Error Handling).
 * - Cung cấp cơ chế Chunking để lách giới hạn 100KB của CacheService, setup biến môi trường, và xử lý lỗi đồng nhất.
 * * DEPENDENCIES:
 * - Không có.
 * * TRIGGERS / USAGE:
 * - Được gọi nội bộ bởi các module khác trong hệ thống.
 * - setupScriptProperties(): Kích hoạt thủ công 1 lần duy nhất từ Apps Script Editor.
 * * AUTHOR: SheetScript Architect / Hoàng Nguyên Phước Hiệp
 * LAST UPDATED: 17/06/2026 | VERSION: V1.0.0
 * * CHANGELOG:
 * - V1.0.0 - 17/06/26: Khởi tạo SystemUtils.gs, gộp CacheUtils, Setup, và ErrorUtils.
 * ======================================================================================
 */

// ==========================================
// 1. CACHE UTILS (Lách giới hạn 100KB)
// ==========================================
function putChunkedCache_(cache, key, str, exp) {
  const chunkSize = 90000; // An toàn dưới 100KB
  const chunks = Math.ceil(str.length / chunkSize);
  const idx = [];
  for (let i = 0; i < chunks; i++) {
    const k = key + '_' + i;
    cache.put(k, str.substring(i * chunkSize, (i + 1) * chunkSize), exp);
    idx.push(k);
  }
  cache.put(key + '_IDX', JSON.stringify(idx), exp);
}

function getChunkedCache_(cache, key) {
  const idxStr = cache.get(key + '_IDX');
  if (!idxStr) return null;
  const idx = JSON.parse(idxStr);
  let res = '';
  for (let i = 0; i < idx.length; i++) {
    const chunk = cache.get(idx[i]);
    if (!chunk) return null;
    res += chunk;
  }
  return res;
}

// ==========================================
// 2. ENVIRONMENT SETUP
// ==========================================
function setupScriptProperties() {
  const props = PropertiesService.getScriptProperties();
  
  props.setProperty('BACKEND_SCRIPT_ID', '1CTe3JAKlf-WdQj4F3siNaMrneJDz8fZReiJMZAGx45ALUSq6BD1RFJ3K');
  props.setProperty('TARGET_FILE_ID', '1Jm3n0Q1va-SUo8fexonH3_FMDlu4Ir4kVqw7KG40ahY');
  
  SpreadsheetApp.getUi().alert(
    "Setup hoàn tất", 
    "Đã ghi nhận BACKEND_SCRIPT_ID và TARGET_FILE_ID vào Script Properties.\nBạn không cần chạy lại hàm này.", 
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

// ==========================================
// 3. ERROR HANDLER
// ==========================================
/**
 * Xử lý lỗi thống nhất
 * @param {Error|string} err - lỗi gốc
 * @param {string} context - tên hàm/module đang xảy ra lỗi
 * @param {string} mode - "alert" | "toast" | "throw" (mặc định "alert")
 */
function handleError_(err, context, mode) {
  mode = mode || "alert";
  const message = (err && err.message) ? err.message : String(err);

  // Ghi log tập trung nếu logAction tồn tại (Menu.gs)
  if (typeof logAction === 'function') {
    logAction("ERROR", `[${context}] ${message}`);
  } else {
    console.error(`[${context}] ${message}`);
  }

  if (mode === "throw") {
    throw new Error(`${context}: ${message}`);
  } else if (mode === "toast") {
    SpreadsheetApp.getActiveSpreadsheet().toast(message, "Lỗi - " + context, 8);
  } else {
    SpreadsheetApp.getUi().alert("Lỗi (" + context + "): " + message);
  }
}