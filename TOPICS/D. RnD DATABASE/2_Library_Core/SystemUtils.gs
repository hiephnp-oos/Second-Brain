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
 * LAST UPDATED: 05/09/2026 | VERSION: V1.1.0
 * * CHANGELOG:
 * - V1.1.0 - 05/09/26: Bổ sung lưu LIBRARY_SCRIPT_ID vào ScriptProperties để phục vụ Backup 3 luồng.
 * - V1.0.0 - 17/06/26: Khởi tạo SystemUtils.gs, gộp CacheUtils, Setup, và ErrorUtils.
 * ======================================================================================
 */

// ==========================================
// 1. CACHE UTILS (Lách giới hạn 100KB)
// ==========================================
function putChunkedCache_(cache, key, str, exp) {
  // 1 ký tự JS (UTF-16) chiếm khoảng 2 bytes. Giới hạn của Apps Script là 100KB (102,400 bytes).
  // Đặt chunkSize = 45000 ký tự (~90KB) để đảm bảo an toàn tuyệt đối không vượt ngưỡng.
  const chunkSize = 45000; 
  const chunks = Math.ceil(str.length / chunkSize);
  const idx = [];
  
  // Thời gian hết hạn mặc định là 6 giờ (21600s) nếu không được truyền vào
  const expiration = exp || 21600; 

  for (let i = 0; i < chunks; i++) {
    const k = `${key}_${i}`;
    cache.put(k, str.substring(i * chunkSize, (i + 1) * chunkSize), expiration);
    idx.push(k);
  }
  cache.put(`${key}_IDX`, JSON.stringify(idx), expiration);
}

function getChunkedCache_(cache, key) {
  const idxStr = cache.get(`${key}_IDX`);
  if (!idxStr) return null;
  
  try {
    const idx = JSON.parse(idxStr);
    let res = '';
    for (let i = 0; i < idx.length; i++) {
      const chunk = cache.get(idx[i]);
      if (!chunk) return null; // Nếu mất 1 chunk -> hỏng tính toàn vẹn dữ liệu, trả về null để load lại
      res += chunk;
    }
    return res;
  } catch (e) {
    console.warn(`Lỗi parse cache index cho key ${key}: ${e.message}`);
    return null;
  }
}

// ==========================================
// 2. ENVIRONMENT SETUP
// ==========================================
function setupScriptProperties() {
  const props = PropertiesService.getScriptProperties();
  
  props.setProperty('BACKEND_SCRIPT_ID', '1ruNxcjI8YfJb6iwV82W228mIT0hCw_69HhHpeLVdkh5C11EAV-5rqnP3');
  props.setProperty('TARGET_FILE_ID', '1Jm3n0Q1va-SUo8fexonH3_FMDlu4Ir4kVqw7KG40ahY');
  
  // [BỔ SUNG] Lưu luôn ID của chính Library này vào hệ thống
  props.setProperty('LIBRARY_SCRIPT_ID', '1991K35QY7Wu0DNaecmqFpZNg8LRDkPuVQgsYZP9Ysr0T1CTI8O8xzpdG');
  
  SpreadsheetApp.getUi().alert(
    "Setup hoàn tất", 
    "Đã ghi nhận BACKEND_SCRIPT_ID, TARGET_FILE_ID và LIBRARY_SCRIPT_ID vào Script Properties.\nBạn không cần chạy lại hàm này.", 
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

  // Ghi log tập trung nếu logAction tồn tại (từ file Export_And_Log.gs)
  if (typeof logAction === 'function') {
    logAction("ERROR", `[${context}] ${message}`);
  } else {
    console.error(`[${context}] ${message}`);
  }

  if (mode === "throw") {
    throw new Error(`${context}: ${message}`);
  } else if (mode === "toast") {
    try {
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      if (ss) {
        ss.toast(message, "Lỗi - " + context, 8);
      } else {
        console.warn("Không thể toast vì hệ thống không tìm thấy Active Spreadsheet.");
      }
    } catch (e) {
      console.error(`Toast failed: ${e.message}`);
    }
  } else {
    try {
      const ui = SpreadsheetApp.getUi();
      ui.alert("Lỗi (" + context + "): " + message);
    } catch (e) {
      // Fallback khi chạy ngầm (Trigger/Background/Standalone) không có giao diện
      console.warn(`UI alert failed (có thể đang chạy ngầm): ${e.message}`);
    }
  }
}