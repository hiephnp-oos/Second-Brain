const LOG_SHEET_NAME = "SystemLogs";

function onOpen(e) {
  writeLog("Mở file", "N/A", e);
}

function onEdit(e) {
  if (!e || !e.range) return;
  const sheet = e.range.getSheet();
  const sheetName = sheet.getName();
  if (sheetName === LOG_SHEET_NAME) return;
  const action = `Chỉnh sửa sheet [${sheetName}]`;
  let details = `Ô: ${e.range.getA1Notation()}`;
  if (e.range.getNumRows() === 1 && e.range.getNumColumns() === 1) {
    const oldValue = e.oldValue === undefined ? "trống" : e.oldValue;
    const newValue = e.value === undefined ? "trống/xóa" : e.value;
    details += ` | Đổi từ: '${oldValue}' -> Thành: '${newValue}'`;
  } else {
    details += ` | Thay đổi nhiều ô cùng lúc (Copy/Paste dải ô hoặc xóa)`;
  }
  writeLog(action, details, e);
}

function writeLog(action, details, event) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const logSheet = ss.getSheetByName(LOG_SHEET_NAME);
  if (!logSheet) return;
  let email = "";
  try {
    email = Session.getActiveUser().getEmail();
    if (!email && event && event.user) email = event.user.getEmail();
  } catch (error) {}
  if (!email) email = "Ẩn danh / Không thể lấy email (@gmail.com)";
  logSheet.appendRow([new Date(), email, action, details]);
}