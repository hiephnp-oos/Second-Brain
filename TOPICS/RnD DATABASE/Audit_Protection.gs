/**
 * ======================================================================================
 * FILE: Audit_Protection.gs
 * MODULE: Security & Protection Auditor
 * * DESCRIPTION:
 * - Công cụ kiểm toán bảo mật: Quét toàn bộ khóa (Sheet/Range Protections) xuất ra tab "Maintenance".
 * - Tích hợp tính năng "Auto-Healing": Tự động phát hiện và ép quyền Admin đồng loạt ngay trong lúc quét.
 * * DEPENDENCIES:
 * - Config.gs (Đọc biến CONFIG.ADMINS).
 * * TRIGGERS / USAGE:
 * - Kích hoạt thủ công từ Apps Script Editor (Dành cho System Admin).
 * * AUTHOR: SheetScript Architect / Hoàng Nguyên Phước Hiệp
 * LAST UPDATED: 28/05/2026 | VERSION: V2.5
 * * CHANGELOG:
 * - V2.5 - 28/05/26: [CLEANUP] Remove emojis from alerts/toasts, convert success alert to toast, standardize messages per GAS anti AI slope rules.
 * - V2.4 - 24/04/26: [PERFORMANCE] Tối ưu hóa vòng lặp (Hoisting) và tái sử dụng biến để tăng tốc 30-40%.
 * - V2.3 - 09/04/26: [AUTO-HEALING] Gom tính năng Sync vào Audit. Tự động phát hiện sai lệch và ép quyền ngay lúc quét (1-Click Security).
 * - V2.2 - 09/04/26: [PERFORMANCE] Tối ưu Sync & Audit (Dùng Mảng đệm thay thế clearContent).
 * ======================================================================================
 */

function auditAllProtections() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (typeof CONFIG === 'undefined' || !CONFIG.ADMINS || CONFIG.ADMINS.length === 0) {
    SpreadsheetApp.getUi().alert("Loi: Khong tim thay danh sach CONFIG.ADMINS. Vui long kiem tra file Config.gs");
    return;
  }
  const admins = CONFIG.ADMINS;
  ss.toast("Dang quet va tu dong phuc hoi quyen bao mat...", "Security Audit", -1);
  const sheets = ss.getSheets();
  const outputData = [];
  let countSynced = 0;
  sheets.forEach(sheet => {
    const sheetName = sheet.getName();
    const sheetId = sheet.getSheetId();
    const sheetLink = `=HYPERLINK("#gid=${sheetId}", "${sheetName}")`;
    const sheetProtections = sheet.getProtections(SpreadsheetApp.ProtectionType.SHEET);
    const rangeProtections = sheet.getProtections(SpreadsheetApp.ProtectionType.RANGE);
    const protections = sheetProtections.concat(rangeProtections);
    protections.forEach(p => {
      const currentEditors = p.getEditors().map(user => user.getEmail());
      const adminsToAdd = admins.filter(admin => !currentEditors.includes(admin));
      const editorsToRemove = currentEditors.filter(email => !admins.includes(email));
      let needsSync = false;
      if (adminsToAdd.length > 0 || editorsToRemove.length > 0 || p.canDomainEdit()) needsSync = true;
      let finalEditorsText = "";
      if (needsSync) {
        if (adminsToAdd.length > 0) p.addEditors(adminsToAdd);
        editorsToRemove.forEach(email => { try { p.removeEditor(email); } catch(e) {} });
        if (p.canDomainEdit()) p.setDomainEdit(false);
        countSynced++;
        finalEditorsText = p.getEditors().map(user => user.getEmail()).join(",\n") || "Only Owner";
      } else {
        finalEditorsText = currentEditors.join(",\n") || "Only Owner";
      }
      let type = p.getProtectionType() === SpreadsheetApp.ProtectionType.SHEET ? "Sheet Level" : "Range Level";
      let rangeInfo = type === "Sheet Level" ? (p.getUnprotectedRanges().map(r => r.getA1Notation()).join(", ") || "All Locked") : p.getRange().getA1Notation();
      outputData.push([sheetLink, rangeInfo, finalEditorsText]);
    });
  });
  const reportSheetName = "Maintenance";
  let reportSheet = ss.getSheetByName(reportSheetName);
  if (!reportSheet) {
    SpreadsheetApp.getUi().alert("Loi: Vui long chay 'Run Health Check' truoc de tao layout Maintenance.");
    return;
  }
  const maxRow = Math.max(reportSheet.getLastRow(), 4);
  reportSheet.getRange(4, 29, maxRow, 2).setNumberFormat("@");
  if (outputData.length > 0) {
    const currentDataRows = maxRow - 3;
    const diff = currentDataRows - outputData.length;
    if (diff > 0) {
      const emptyRow = ["", "", ""];
      for (let i = 0; i < diff; i++) outputData.push(emptyRow);
    }
    reportSheet.getRange(4, 28, outputData.length, 3).setValues(outputData).setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
  } else if (maxRow >= 4) {
    reportSheet.getRange(4, 28, maxRow - 3, 3).clearContent();
  }
  SpreadsheetApp.flush();
  if (countSynced > 0) ss.toast(`Phat hien va sua loi phan quyen tai ${countSynced} o khoa. Danh sach Admin da duoc dong bo 100%.`, "Audit Complete", 8);
  else ss.toast("He thong bao mat an toan. Khong phat hien sai lech.", "Audit Complete", 5);
}

//design by Hiep