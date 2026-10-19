/**
 * ======================================================================================
 * FILE: ExportCode.gs (BOUND SCRIPT)
 * MODULE: Backup & Maintenance
 * * DESCRIPTION:
 * - Script tự động sao lưu toàn bộ mã nguồn của hệ sinh thái DNF R&D Database.
 * - Trích xuất mã nguồn từ 3 dự án: Frontend (Bound), Library (Core), và Backend (Scanner).
 * - Tổng hợp thành một tập tin .txt duy nhất và lưu vào thư mục gốc của My Drive.
 * * DEPENDENCIES:
 * - LibDNF (Thư viện chứa hàm getSystemScriptIds).
 * - Google Workspace Services: ScriptApp, SpreadsheetApp, DriveApp, UrlFetchApp.
 * * TRIGGERS / USAGE:
 * - Kích hoạt thủ công thông qua Custom Menu (Ví dụ: System -> Backup Code To Drive).
 * * AUTHOR: SheetScript Architect
 * LAST UPDATED: 05/09/2026 | VERSION: V4.0.0
 * * CHANGELOG:
 * - V4.0.0 - 05/09/26: Nâng cấp kiến trúc Backup thu thập 3 luồng (Frontend, Library, Backend) qua cổng LibDNF.
 * - V3.2.0 - 17/06/26: Xóa bỏ hardcode BACKEND_SCRIPT_ID, chuyển sang đọc từ Script Properties. Áp dụng ErrorUtils.
 * - V3.1.0 - 28/05/26: [CLEANUP] Remove emojis from alerts/comments, convert success alert to toast per GAS anti AI slope rules.
 * - V3.0.1 - 08/04/26: Chuẩn hóa format documentation, loại bỏ ký tự đặc biệt.
 * - V3.0.0 - 08/04/26: Cập nhật chuẩn Standardized Documentation Header V3.
 * ======================================================================================
 */
function exportCodeToDrive() {
  const token = ScriptApp.getOAuthToken();
  const ui = SpreadsheetApp.getUi();
  
  // 1. Lấy tên file chính (Frontend)
  let mainScriptName = "Apps_Script_Backup";
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    if (ss) {
      mainScriptName = ss.getName();
    } else {
      mainScriptName = DriveApp.getFileById(ScriptApp.getScriptId()).getName();
    }
  } catch (e) {
    console.warn("Không lấy được tên file, sử dụng tên mặc định.");
  }

  // 2. Thu thập các Script ID từ Thư viện (LibDNF)
  let sysIds;
  try {
    sysIds = LibDNF.getSystemScriptIds();
  } catch (e) {
    ui.alert("Lỗi: Không thể kết nối tới Thư viện LibDNF.\n\nNguyên nhân: Bạn chưa đổi Tên định danh (Identifier) của thư viện thành 'LibDNF' hoặc chưa Deploy phiên bản mới nhất.");
    return;
  }
  
  if (!sysIds.backendId) {
    ui.alert("Lỗi: Chưa thiết lập BACKEND_SCRIPT_ID trên Thư viện.\nVui lòng mở Library và chạy hàm setupScriptProperties() trong SystemUtils.gs.");
    return;
  }
  
  // Khai báo danh sách 3 script cần backup (Bảo vệ trùng lặp ID)
  const frontendId = ScriptApp.getScriptId();
  const projectsToBackup = [
    { id: frontendId, label: mainScriptName + " (Frontend UI)" }
  ];

  if (sysIds.libraryId && sysIds.libraryId !== frontendId) {
    projectsToBackup.push({ id: sysIds.libraryId, label: "R&D Database GAS Library_v3 (Core Logic)" });
  }
  
  if (sysIds.backendId && sysIds.backendId !== frontendId && sysIds.backendId !== sysIds.libraryId) {
    projectsToBackup.push({ id: sysIds.backendId, label: "Document_Scanner (Backend/Drive)" });
  }

  // 3. Tạo định dạng ngày (DDMMMYY_HHmm)
  const now = new Date();
  const timeZone = Session.getScriptTimeZone();
  const dateStr = Utilities.formatDate(now, timeZone, "ddMMMyy_HHmm");

  const fileName = `${mainScriptName}_FULL_${dateStr}.txt`;
  
  // 4. Khởi tạo nội dung file text
  let fullContent = `BACKUP CODE ECOSYSTEM (FRONTEND + LIBRARY + BACKEND)\n`;
  fullContent += `Ngày xuất: ${dateStr} (Full Time: ${now.toLocaleString()})\n`;
  fullContent += "========================================\n";

  try {
    // 5. Duyệt qua từng project để fetch code
    projectsToBackup.forEach(project => {
      if (!project.id) return; 

      const url = `https://script.google.com/feeds/download/export?id=${project.id}&format=json`;
      
      const response = UrlFetchApp.fetch(url, {
        headers: { Authorization: "Bearer " + token },
        muteHttpExceptions: true
      });
      
      if (response.getResponseCode() !== 200) {
        throw new Error(`Không thể tải code của [${project.label}]. Lỗi HTTP: ${response.getResponseCode()}.\nBạn có quyền truy cập vào project này không?`);
      }

      const projectData = JSON.parse(response.getContentText());
      
      // Tạo banner phân tách giữa các Project
      fullContent += `\n// ========================================================\n`;
      fullContent += `// PROJECT TIER: ${project.label}\n`;
      fullContent += `// SCRIPT ID: ${project.id}\n`;
      fullContent += `// ========================================================\n\n`;

      // Nối nội dung từng file con
      if (projectData.files && Array.isArray(projectData.files)) {
        projectData.files.forEach(file => {
          let ext = 'gs';
          if (file.type === 'html') ext = 'html';
          if (file.type === 'json') ext = 'json';

          fullContent += `// --- START FILE: ${file.name}.${ext} ---\n`;
          fullContent += file.source + "\n";
          fullContent += `// --- END FILE: ${file.name}.${ext} ---\n\n`;
        });
      }
    });

    // 6. Tạo file mới trong My Drive
    const backupFile = DriveApp.createFile(fileName, fullContent, MimeType.PLAIN_TEXT);
    
    // 7. Thông báo thành công
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    if (ss) {
      ss.toast(
        `Đã tạo file: ${fileName}`,
        "Backup Thành công (3 Projects)",
        8
      );
    }
    
    // Ghi log qua Library
    LibDNF.logAction("BACKUP", `Exported Ecosystem Code to: ${backupFile.getUrl()}`);

  } catch (e) {
    console.error(e.toString());
    ui.alert("Lỗi trong quá trình backup:\n\n" + e.message);
  }
}

/**
 * ======================================================================================
 * TÍNH NĂNG MỚI: Export toàn bộ hệ sinh thái thành file ZIP (.gs, .html, .json)
 * - Tự động tạo thư mục phân loại cho Frontend, Library và Backend bên trong file nén.
 * ======================================================================================
 */
function exportCodeAsZipToDrive() {
  const token = ScriptApp.getOAuthToken();
  const ui = SpreadsheetApp.getUi();
  
  // 1. Lấy tên file chính (Frontend)
  let mainScriptName = "Apps_Script_Backup";
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    if (ss) {
      mainScriptName = ss.getName();
    } else {
      mainScriptName = DriveApp.getFileById(ScriptApp.getScriptId()).getName();
    }
  } catch (e) {
    console.warn("Không lấy được tên file, sử dụng tên mặc định.");
  }

  // 2. Thu thập các Script ID từ Thư viện (LibDNF)
  let sysIds;
  try {
    sysIds = LibDNF.getSystemScriptIds();
  } catch (e) {
    ui.alert("Lỗi: Không thể kết nối tới Thư viện LibDNF.\n\nNguyên nhân: Bạn chưa đổi Tên định danh (Identifier) của thư viện thành 'LibDNF' hoặc chưa Deploy phiên bản mới nhất.");
    return;
  }
  
  if (!sysIds.backendId) {
    ui.alert("Lỗi: Chưa thiết lập BACKEND_SCRIPT_ID trên Thư viện.\nVui lòng mở Library và chạy hàm setupScriptProperties() trong SystemUtils.gs.");
    return;
  }
  
  const frontendId = ScriptApp.getScriptId();
  const projectsToBackup = [
    { id: frontendId, folderName: "1_Frontend_UI" }
  ];

  if (sysIds.libraryId && sysIds.libraryId !== frontendId) {
    projectsToBackup.push({ id: sysIds.libraryId, folderName: "2_Library_Core" });
  }
  
  if (sysIds.backendId && sysIds.backendId !== frontendId && sysIds.backendId !== sysIds.libraryId) {
    projectsToBackup.push({ id: sysIds.backendId, folderName: "3_Backend_Scanner" });
  }

  // 3. Tạo định dạng ngày (DDMMMYY_HHmm)
  const now = new Date();
  const timeZone = Session.getScriptTimeZone();
  const dateStr = Utilities.formatDate(now, timeZone, "ddMMMyy_HHmm");
  const zipFileName = `${mainScriptName}_FULL_${dateStr}.zip`;
  
  const allBlobs = [];

  try {
    // 4. Duyệt qua từng project để fetch code
    projectsToBackup.forEach(project => {
      if (!project.id) return; 

      const url = `https://script.google.com/feeds/download/export?id=${project.id}&format=json`;
      
      const response = UrlFetchApp.fetch(url, {
        headers: { Authorization: "Bearer " + token },
        muteHttpExceptions: true
      });
      
      if (response.getResponseCode() !== 200) {
        throw new Error(`Không thể tải code của [${project.folderName}]. Lỗi HTTP: ${response.getResponseCode()}.\nBạn có quyền truy cập vào project này không?`);
      }

      const projectData = JSON.parse(response.getContentText());
      
      // 5. Chuyển đổi file code thành Blob và đưa vào mảng
      if (projectData.files && Array.isArray(projectData.files)) {
        projectData.files.forEach(file => {
          let ext = 'gs';
          if (file.type === 'html') ext = 'html';
          if (file.type === 'json') ext = 'json';

          // Tạo đường dẫn ảo để chia thư mục trong file ZIP
          const filePath = `${project.folderName}/${file.name}.${ext}`;
          
          const blob = Utilities.newBlob(file.source, MimeType.PLAIN_TEXT, filePath);
          allBlobs.push(blob);
        });
      }
    });

    // 6. Nén tất cả các Blob thành 1 file ZIP duy nhất
    const zipBlob = Utilities.zip(allBlobs, zipFileName);

    // 7. Tạo file ZIP trong My Drive
    const backupFile = DriveApp.createFile(zipBlob);
    
    // 8. Thông báo thành công
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    if (ss) {
      ss.toast(
        `Đã tạo file ZIP: ${zipFileName}`,
        "Backup Thành công (3 Projects)",
        8
      );
    }
    
    // Ghi log qua Library
    LibDNF.logAction("BACKUP", `Exported Ecosystem Code (ZIP) to: ${backupFile.getUrl()}`);

  } catch (e) {
    console.error(e.toString());
    ui.alert("Lỗi trong quá trình backup ZIP:\n\n" + e.message);
  }
}