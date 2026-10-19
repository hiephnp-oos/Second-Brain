/**
 * ======================================================================================
 * FILE: Library_Entry.gs (STANDALONE LIBRARY)
 * - Cung cấp các cổng API công khai để Bound Script có thể xin phép truy xuất.
 * - Quản lý tập trung luồng xử lý Trigger onEdit từ nhiều nơi gửi về.
 * * CHANGELOG:
 * - V1.1.0 - 05/09/26: Bổ sung getSystemScriptIds để cấp phát ID cho module Export Backup.
 * - V1.0.0 - 05/09/26: Khởi tạo cổng giao tiếp.
 * ======================================================================================
 */

/**
 * [API] Cấp quyền cho Bound Script đọc cấu hình CONFIG (Tên Sheet, Cột...)
 * Bound Script gọi: LibDNF.getSystemConfig()
 */
function getSystemConfig() {
  return typeof CONFIG !== 'undefined' ? CONFIG : {};
}

/**
 * [ROUTER] Bộ định tuyến sự kiện onEdit
 * Nhận Object "e" từ Bound Script và chia bài cho các module chuyên trách trong Library
 */
function systemOnEdit(e) {
  if (!e || !e.range) return;
  const range = e.range;
  const sheet = range.getSheet();
  const config = getSystemConfig();
  
  // 1. Phân luồng cho chức năng Search BOM (Sửa ô F5 tại sheet Search BOM)
  if (config.SHEETS && sheet.getName() === config.SHEETS.SEARCH_RESULT && range.getRow() === 5 && range.getColumn() === 6) {
    const value = range.getValue().toString().trim();
    if (value && typeof generateMultiLevelBOM === 'function') {
      // Vì đang đứng chung Context Library, gọi trực tiếp hàm nội bộ
      generateMultiLevelBOM(); 
    }
  }

  // 2. Phân luồng cho chức năng Tự động Format Tiền tệ
  if (typeof handleCurrencyFormatOnEdit_ === 'function') {
    handleCurrencyFormatOnEdit_(e);
  }
}

/**
 * [API] Trả về thông tin các Script ID để phục vụ việc Backup 3 luồng
 * Bound Script gọi: LibDNF.getSystemScriptIds()
 */
function getSystemScriptIds() {
  const props = PropertiesService.getScriptProperties();
  return {
    libraryId: props.getProperty('LIBRARY_SCRIPT_ID') || null,
    backendId: props.getProperty('BACKEND_SCRIPT_ID') || null
  };
}