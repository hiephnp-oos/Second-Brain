/**
 * ======================================================================================
 * FILE: Menu.gs
 * MODULE: UI & System Navigation
 * * DESCRIPTION:
 * - Khởi tạo Custom Menu trên thanh công cụ của Google Sheets.
 * - Quản lý điều hướng người dùng (Jump to Sheet), xử lý luồng xuất file (Export PDF/Sheet).
 * - Tích hợp hệ thống ghi Log tập trung (Centralized Logging) để theo dõi lịch sử thao tác.
 * * DEPENDENCIES:
 * - Config.gs (Lấy danh sách cấu hình Tên Sheet và ID Log).
 * - Yêu cầu bật "Google Sheets API" (Advanced Services) để tối ưu xuất file.
 * * TRIGGERS / USAGE:
 * - Tự động chạy khi mở file (Trigger: onOpen).
 * - Kích hoạt các hàm xuất file qua Menu.
 * * AUTHOR: SheetScript Architect / Hoàng Nguyên Phước Hiệp
 * LAST UPDATED: 05/09/2026 | VERSION: V2.9
 * * CHANGELOG:
 * - V2.9 - 05/09/26: [REFACTOR] Dọn dẹp file, chuyển toàn bộ logic xử lý (log, export, navigation) sang Library.
 * - V2.8 - 28/05/26: [CLEANUP] Remove emojis, standardize alerts/dialogs, refactor function names, enforce Flush/UrlFetch rules per GAS anti AI slope.
 * - V2.7 - 13/04/26: [AUDIT] Chuẩn hóa thông điệp log theo Unified Format (AUTH, EXPORT). Kế thừa cơ chế Append API siêu tốc của V2.6.
 * - V2.6.2 - 10/04/26: [TRUE PERSISTENCE] Fix lỗi logic tạo mới Temp Sheet. Tái sử dụng thực thụ SYS_TMP_EXPORT (chỉ clear và chép range) giúp triệt tiêu hoàn toàn rác sinh ra trong Revision History của file gốc.
 * - V2.6.1 - 10/04/26: [HOTFIX] Sửa lỗi 500 Internal Server Error khi xuất PDF. Dời lệnh hideSheet() xuống sau khi hoàn tất export API.
 * - V2.6 - 10/04/26: [ZERO-LAG PATCH] Áp dụng Pure JS tính tọa độ A1 Notation khử overhead object Range. Thay thế Native Log bằng Sheets API Append (Single Call). Nâng cấp luồng Export sử dụng Persistent Temp Sheet để giảm thiểu I/O và rác revision.
 * - V2.5 - 10/04/26: [PERFORMANCE] Tối ưu hóa API BatchUpdate cho refreshFormulas và batchHideRows. Xóa bỏ hoàn toàn vòng lặp Native gây lag và timeout.
 * - V2.4 - 08/04/26: Dọn dẹp hệ thống - Xóa bỏ phụ thuộc vào Unlock.gs sau khi hợp nhất logic.
 * - V2.3 - 08/04/26: Giải quyết trùng lặp authorizeAll (Issue 4) - Hợp nhất logic từ Unlock.gs V3.0.
 * - V2.2 - 08/04/26: Tối ưu logAction (Issue 6) - giảm API calls & tăng tốc độ ghi.
 * ======================================================================================
 */

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  const cache = CacheService.getUserCache();
  const props = PropertiesService.getUserProperties();

  // Kiểm tra trạng thái xác thực
  let authState = cache.get("authorized") || props.getProperty("authorized");
  const isAuthorized = (authState === "true" || authState === "yes");

  if (isAuthorized && !cache.get("authorized")) {
    cache.put("authorized", "true", 21600);
  }

  // Toàn bộ tên hàm gọi ở đây đều ánh xạ tới Wrappers.gs
  ui.createMenu('Menu')
    .addItem('Home', 'activateHomePage')
    .addItem('Search BOM', 'activateBomSearch')
    .addItem('Search RM', 'activateRmSearch')
    .addItem('BOM Cost', 'activateCostSearch')
    .addItem('BOM Compare', 'activateBomCompare')
    .addItem('Finder', 'showGlobalSearchSidebar')
    .addSeparator() 
    .addItem('User Manual', 'showUserManual')
    .addItem('Maintenance Manual', 'showMaintenanceManual')
    .addToUi();
  
  if (typeof buildSheetManagementMenuToUi === 'function') {
    buildSheetManagementMenuToUi();
  }

  ui.createMenu('Export')
    .addItem('Export BOM', 'showExportOptionsForm')
    .addItem('Export BOM Cost', 'showBomCostExportDialog')
    .addToUi();

  ui.createMenu('Import')
    .addItem('Sync ZMat', 'import_MAT')
    .addItem('Sync ZBom', 'import_BOM')
    .addItem('Sync ZMat & ZBom', 'import_BOM_and_MAT')
    .addItem('Sync ZCost', 'import_COST')
    .addItem('Sync Drawing', 'listMainFolderPDFFiles')
    .addToUi();

  if (!isAuthorized) {
    ui.createMenu('Auth')
      .addItem('Authorize System', 'authorizeAll')
      .addToUi();
  }
}

function authorizeAll() {
  const props = PropertiesService.getUserProperties();
  const cache = CacheService.getUserCache();

  SpreadsheetApp.getActiveSpreadsheet();
  DriveApp.getRootFolder();
  ScriptApp.getOAuthToken();
  UrlFetchApp.fetch("https://www.google.com");
  Session.getActiveUser().getEmail();

  try {
    Sheets.Spreadsheets.get(SpreadsheetApp.getActiveSpreadsheet().getId());
    Drive.Files.get(SpreadsheetApp.getActiveSpreadsheet().getId());
  } catch(e) {}

  props.setProperty("authorized", "yes");
  cache.put("authorized", "true", 21600);
 
  // Gọi hàm Ghi Log từ Library
  LibDNF.logAction("AUTH", "Unlock System - Success");
 
  const ui = SpreadsheetApp.getUi();
  ui.alert("Đã cấp quyền thành công.\nRemember to keep LIXIL in your heart, always");
  onOpen();
}

//design by Hiep