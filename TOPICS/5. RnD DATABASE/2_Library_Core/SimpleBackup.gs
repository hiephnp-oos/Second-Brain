/**
 * ======================================================================================
 * FILE: SimpleBackup.gs
 * MODULE: System Backup (Lite Version)
 * * DESCRIPTION:
 * - Hàm sao lưu mã nguồn siêu tốc. Chỉ xuất duy nhất mã nguồn của dự án hiện tại
 *   (nơi chứa đoạn code này). Không yêu cầu thiết lập Script Properties.
 * - File xuất ra có định dạng: TênFile_YYYYMMDD_HHmm.txt
 * ======================================================================================
 */

function simpleExportCode() {
  const scriptId = ScriptApp.getScriptId();
  const token = ScriptApp.getOAuthToken();
  const url = `https://script.google.com/feeds/download/export?id=${scriptId}&format=json`;

  try {
    const response = UrlFetchApp.fetch(url, {
      headers: { Authorization: "Bearer " + token },
      muteHttpExceptions: true
    });

    if (response.getResponseCode() !== 200) {
      throw new Error("Lỗi HTTP " + response.getResponseCode() + ": " + response.getContentText());
    }

    const projectData = JSON.parse(response.getContentText());
    let fullCode = "";

    projectData.files.forEach(file => {
      let ext = file.type === 'html' ? 'html' : 'gs';
      if (file.type === 'json') ext = 'json';

      fullCode += `\n// ========================================================\n`;
      fullCode += `// FILE: ${file.name}.${ext}\n`;
      fullCode += `// ========================================================\n\n`;
      fullCode += file.source + "\n\n";
    });

    const timeZone = Session.getScriptTimeZone();
    const dateStr = Utilities.formatDate(new Date(), timeZone, "yyyyMMdd_HHmm");
    let projectName = "AppsScript_Project";
    try {
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      if (ss) projectName = ss.getName();
    } catch (e) {
      projectName = DriveApp.getFileById(scriptId).getName();
    }

    const fileName = `${projectName}_${dateStr}.txt`;
    const backupFile = DriveApp.createFile(fileName, fullCode, MimeType.PLAIN_TEXT);

    try {
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      ss.toast(`Đã lưu file: ${fileName}`, "Backup Thành công", 8);
    } catch(e) {
      console.log(`Đã lưu file: ${backupFile.getUrl()}`);
    }
  } catch (error) {
    try {
      SpreadsheetApp.getUi().alert("Lỗi khi backup: " + error.message);
    } catch(e) {
      console.error("Lỗi khi backup: " + error.message);
    }
  }
}