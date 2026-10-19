/**
 * HƯỚNG DẪN CÀI ĐẶT:
 * 1. Tạo một sheet mới trong file của bạn, đặt tên chính xác là: SystemLogs
 * 2. Ẩn sheet SystemLogs đi (Click chuột phải vào tên sheet -> Hide).
 * 3. Khóa sheet SystemLogs (Data > Protect sheets and ranges -> Chọn SystemLogs -> Restrict who can edit -> Only You).
 * 4. Dán toàn bộ code này vào Extensions > Apps Script và Lưu lại.
 */

const LOG_SHEET_NAME = "SystemLogs";

/**
 * Ghi log khi có người mở file
 */
function onOpen(e) {
  writeLog("Mở file", "N/A", e);
}

/**
 * Ghi log khi có người chỉnh sửa file
 */
function onEdit(e) {
  // Nếu không có event object hoặc không xác định được vùng sửa thì bỏ qua
  if (!e || !e.range) return;
  
  const sheet = e.range.getSheet();
  const sheetName = sheet.getName();
  
  // Không ghi log nếu họ đang thao tác trong chính sheet Log để tránh vòng lặp vô tận
  if (sheetName === LOG_SHEET_NAME) return;
  
  const action = `Chỉnh sửa sheet [${sheetName}]`;
  let details = `Ô: ${e.range.getA1Notation()}`;
  
  // Kiểm tra nếu sửa 1 ô hay nhiều ô
  if (e.range.getNumRows() === 1 && e.range.getNumColumns() === 1) {
    const oldValue = e.oldValue === undefined ? "trống" : e.oldValue;
    const newValue = e.value === undefined ? "trống/xóa" : e.value;
    details += ` | Đổi từ: '${oldValue}' -> Thành: '${newValue}'`;
  } else {
    details += ` | Thay đổi nhiều ô cùng lúc (Copy/Paste dải ô hoặc xóa)`;
  }
  
  writeLog(action, details, e);
}

/**
 * Hàm phụ trợ để ghi dữ liệu vào sheet Logs
 */
function writeLog(action, details, event) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const logSheet = ss.getSheetByName(LOG_SHEET_NAME);
  
  // Nếu không tìm thấy sheet log thì dừng lại
  if (!logSheet) return;
  
  let email = "";
  
  // Cố gắng lấy email của người đang thao tác
  try {
    email = Session.getActiveUser().getEmail();
    // Nếu rỗng, thử lấy từ event object (hoạt động trong một số trường hợp Workspace)
    if (!email && event && event.user) {
      email = event.user.getEmail();
    }
  } catch (error) {
    // Bỏ qua lỗi
  }
  
  if (!email) {
    email = "Ẩn danh / Không thể lấy email (@gmail.com)";
  }
  
  const timestamp = new Date();
  
  // Ghi một dòng mới vào sheet ẩn
  logSheet.appendRow([timestamp, email, action, details]);
}