/**
 * ======================================================================================
 * FILE: SearchBOMcost.gs
 * MODULE: UI & Formatting
 * * DESCRIPTION:
 * - Tự động thay đổi định dạng số (Number Format) của vùng dữ liệu khi đổi loại tiền tệ.
 * - Hỗ trợ format số 0 thành dấu gạch ngang ("-") để bảng dữ liệu gọn gàng.
 * - Hỗ trợ cấu hình nhiều dải cột rời rạc (Ví dụ: G:J và L).
 * * DEPENDENCIES:
 * - Gọi thông qua hàm Router onEdit(e) tổng của hệ thống.
 * * TRIGGERS / USAGE:
 * - Sự kiện onEdit -> handleCurrencyFormatOnEdit_(e)
 * * AUTHOR: SheetScript Architect
 * LAST UPDATED: 09/07/2026 | VERSION: V1.5
 * * CHANGELOG:
 * - V1.5 - 09/07/26: Bổ sung vùng G2:J3. Nâng cấp logic cho phép cấu hình số dòng cố định (fixedRows).
 * - V1.4 - 09/07/26: Chuẩn hóa format chuỗi (xoá nháy kép ở dấu - để Sheets native support 100%). Thêm phân cách ngàn cho USD.
 * - V1.3 - 09/07/26: Đổi tên file/module. Cập nhật cấu trúc format 0 -> "-". Thêm vùng L7:L.
 * ======================================================================================
 */

const AUTO_FORMAT_CONFIG = {
  SHEET_NAME: 'Search BOM cost', 
  TARGET_CELL: 'A2',
  
  // Hỗ trợ mảng các vùng dữ liệu để format (Cột G->J và Cột L)
  FORMAT_RANGES: [
    { startRow: 2, startCol: 7, numCols: 4, fixedRows: 2 }, // Vùng G2:J3 (Cố định 2 dòng)
    { startRow: 7, startCol: 7, numCols: 4 }, // Cột G, H, I, J (Start: 7 kéo đến dòng cuối)
    { startRow: 7, startCol: 12, numCols: 1 } // Cột L (Start: 12 kéo đến dòng cuối)
  ],
  
  // Định dạng chuẩn Google Sheets: Số dương ; Số âm ; Số không
  FORMAT_VND: '#,##0;(#,##0);-',
  FORMAT_USD: '#,##0.000;(#,##0.000);-'
};

/**
 * Hàm Helper: Xử lý định dạng tiền tệ
 * @param {GoogleAppsScript.Events.SheetsOnEdit} e
 */
function handleCurrencyFormatOnEdit_(e) {
  // Bỏ qua nếu không có object sự kiện
  if (!e || !e.range) return;

  const sheet = e.source.getActiveSheet();
  
  // 1. Kiểm tra đúng tên sheet và đúng ô A2 (Điều kiện ĐỘC LẬP)
  if (sheet.getName() !== AUTO_FORMAT_CONFIG.SHEET_NAME || e.range.getA1Notation() !== AUTO_FORMAT_CONFIG.TARGET_CELL) {
    return; 
  }

  // 2. Lấy giá trị tiền tệ vừa chọn
  const currency = e.value ? e.value.toString().trim().toUpperCase() : '';
  
  // 3. Xác định định dạng tương ứng
  let numberFormat = '';
  if (currency === 'VND') {
    numberFormat = AUTO_FORMAT_CONFIG.FORMAT_VND;
  } else if (currency === 'USD') {
    numberFormat = AUTO_FORMAT_CONFIG.FORMAT_USD;
  } else {
    return; 
  }

  // 4. Xác định số dòng dữ liệu
  const lastRow = sheet.getLastRow();

  // 5. Quét và cập nhật từng vùng được cấu hình
  AUTO_FORMAT_CONFIG.FORMAT_RANGES.forEach(rangeConfig => {
    let numRows = rangeConfig.fixedRows;
    
    // Nếu không cài đặt fixedRows, tự động tính từ startRow đến dòng cuối cùng
    if (!numRows) {
      if (lastRow < rangeConfig.startRow) return; // Bỏ qua nếu không có data
      numRows = lastRow - rangeConfig.startRow + 1;
    }
    
    const targetRange = sheet.getRange(
      rangeConfig.startRow, 
      rangeConfig.startCol, 
      numRows, 
      rangeConfig.numCols
    );
    
    // Cập nhật định dạng số
    targetRange.setNumberFormat(numberFormat);
  });
}