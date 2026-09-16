/**
 * ======================================================================================
 * FILE: SearchBOMcost.gs
 * MODULE: UI & Formatting
 * * DESCRIPTION:
 * - Tự động thay đổi định dạng số (Number Format) của vùng dữ liệu khi đổi loại tiền tệ.
 * - Hỗ trợ format số 0 thành dấu gạch ngang ("-") để bảng dữ liệu gọn gàng.
 * - Hỗ trợ cấu hình nhiều dải cột rời rạc (Ví dụ: G:J và L).
 * ======================================================================================
 */
const AUTO_FORMAT_CONFIG = {
  SHEET_NAME: 'Search BOM cost',
  TARGET_CELL: 'A2',
  FORMAT_RANGES: [
    { startRow: 2, startCol: 7, numCols: 4, fixedRows: 2 },
    { startRow: 7, startCol: 7, numCols: 4 },
    { startRow: 7, startCol: 12, numCols: 1 }
  ],
  FORMAT_VND: '#,##0;(#,##0);-',
  FORMAT_USD: '#,##0.000;(#,##0.000);-'
};
function handleCurrencyFormatOnEdit_(e) {
  if (!e || !e.range) return;
  const sheet = e.source.getActiveSheet();
  if (sheet.getName() !== AUTO_FORMAT_CONFIG.SHEET_NAME || e.range.getA1Notation() !== AUTO_FORMAT_CONFIG.TARGET_CELL) return;
  const currency = e.value ? e.value.toString().trim().toUpperCase() : '';
  let numberFormat = '';
  if (currency === 'VND') numberFormat = AUTO_FORMAT_CONFIG.FORMAT_VND;
  else if (currency === 'USD') numberFormat = AUTO_FORMAT_CONFIG.FORMAT_USD;
  else return;
  const lastRow = sheet.getLastRow();
  AUTO_FORMAT_CONFIG.FORMAT_RANGES.forEach(rangeConfig => {
    let numRows = rangeConfig.fixedRows;
    if (!numRows) {
      if (lastRow < rangeConfig.startRow) return;
      numRows = lastRow - rangeConfig.startRow + 1;
    }
    sheet.getRange(rangeConfig.startRow, rangeConfig.startCol, numRows, rangeConfig.numCols).setNumberFormat(numberFormat);
  });
}