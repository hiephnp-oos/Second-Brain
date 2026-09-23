/**
 * ======================================================================================
 * FILE: ExportCode.gs
 * MODULE: Backup & Maintenance
 * * DESCRIPTION:
 * - Script tự động sao lưu toàn bộ mã nguồn của hệ thống DNF R&D Database.
 * - Trích xuất mã nguồn từ cả hai dự án: Frontend (file hiện tại) và Backend (Document_Scanner) 
 * thông qua Google Apps Script API. Tổng hợp toàn bộ nội dung thành một tập tin .txt 
 * duy nhất (kèm định dạng thời gian) và lưu trữ trực tiếp vào thư mục gốc của My Drive.
 * * DEPENDENCIES:
 * - Google Workspace Services: ScriptApp, SpreadsheetApp, DriveApp, UrlFetchApp.
 * - Backend Script ID (Lấy từ Script Properties).
 * * TRIGGERS / USAGE:
 * - Kích hoạt thủ công thông qua Custom Menu (Ví dụ: System -> Backup Code To Drive).
 * * AUTHOR: SheetScript Architect / Hoàng Nguyên Phước Hiệp
 * LAST UPDATED: 17/06/2026 | VERSION: V3.2.0
 * * CHANGELOG:
 * - V3.2.0 - 17/06/26: Xóa bỏ hardcode BACKEND_SCRIPT_ID, chuyển sang đọc từ Script Properties. Áp dụng ErrorUtils.
 * - V3.1.0 - 28/05/26: [CLEANUP] Remove emojis from alerts/comments, convert success alert to toast per GAS anti AI slope rules.
 * - V3.0.1 - 08/04/26: Chuẩn hóa format documentation, loại bỏ ký tự đặc biệt.
 * - V3.0.0 - 08/04/26: Cập nhật chuẩn Standardized Documentation Header V3.
 * ======================================================================================
 */
function exportCodeToDrive() {
  const token = ScriptApp.getOAuthToken();
  
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
    Logger.log("Không lấy được tên file, sử dụng tên mặc định.");
  }

  // 2. Khai báo danh sách các script cần backup (Lấy từ Script Properties)
  const props = PropertiesService.getScriptProperties();
  const BACKEND_SCRIPT_ID = props.getProperty('BACKEND_SCRIPT_ID');
  
  if (!BACKEND_SCRIPT_ID) {
    SpreadsheetApp.getUi().alert("Lỗi: Chưa thiết lập Script Properties. Vui lòng chạy hàm setupScriptProperties() trong SystemUtils.gs trước.");
    return;
  }
  
  const projectsToBackup = [
    { id: ScriptApp.getScriptId(), label: mainScriptName + " (Frontend)" },
    { id: BACKEND_SCRIPT_ID, label: "Document_Scanner (Backend)" } 
  ];

  // 3. Tạo định dạng ngày (DDMMMYY)
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[now.getMonth()];
  const year = String(now.getFullYear()).slice(-2);
  const dateStr = `${day}${month}${year}`;

  const fileName = `${mainScriptName}_FULL_${dateStr}.txt`;
  
  // 4. Khởi tạo nội dung file text
  let fullContent = `BACKUP CODE MULTIPLE PROJECTS\n`;
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
        throw new Error(`Không thể tải code của ${project.label}. Lỗi HTTP: ` + response.getResponseCode());
      }

      const projectData = JSON.parse(response.getContentText());
      
      // Tạo banner phân tách giữa Frontend và Backend
      fullContent += `\n// ========================================================\n`;
      fullContent += `// PROJECT TIER: ${project.label}\n`;
      fullContent += `// ========================================================\n\n`;

      // Nối nội dung từng file con
      projectData.files.forEach(file => {
        let ext = 'gs';
        if (file.type === 'html') ext = 'html';
        if (file.type === 'json') ext = 'json';

        fullContent += `// --- START FILE: ${file.name}.${ext} ---\n`;
        fullContent += file.source + "\n";
        fullContent += `// --- END FILE: ${file.name}.${ext} ---\n\n`;
      });
    });

    // 6. Tạo file mới trong My Drive
    DriveApp.createFile(fileName, fullContent, MimeType.PLAIN_TEXT);
    
    // 7. Thông báo thành công
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    if (ss) {
      ss.toast(
        `Ten file: ${fileName} | Vi tri: My Drive (Thu muc goc)`,
        "Backup Complete",
        5
      );
    }

  } catch (e) {
    if (typeof handleError_ === 'function') {
      handleError_(e, "exportCodeToDrive", "alert");
    } else {
      Logger.log(e.toString());
      SpreadsheetApp.getUi().alert("Loi trong qua trinh backup: " + e.toString());
    }
  }
}

//design by Hiep