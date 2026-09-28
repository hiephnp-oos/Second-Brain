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
function getSystemConfig() { return typeof CONFIG !== 'undefined' ? CONFIG : {}; }
function systemOnEdit(e) {
  if (!e || !e.range) return;
  const range = e.range;
  const sheet = range.getSheet();
  const config = getSystemConfig();
  if (config.SHEETS && sheet.getName() === config.SHEETS.SEARCH_RESULT && range.getRow() === 5 && range.getColumn() === 6) {
    const value = range.getValue().toString().trim();
    if (value && typeof generateMultiLevelBOM === 'function') generateMultiLevelBOM();
  }
  if (typeof handleCurrencyFormatOnEdit_ === 'function') handleCurrencyFormatOnEdit_(e);
}
function getSystemScriptIds() {
  const props = PropertiesService.getScriptProperties();
  return { libraryId: props.getProperty('LIBRARY_SCRIPT_ID') || null, backendId: props.getProperty('BACKEND_SCRIPT_ID') || null };
}