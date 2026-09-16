/**
 * ======================================================================================
 * FILE: A.BOM.gs
 * MODULE: Smart BOM ETL (Extract, Transform, Load)
 *
 * DESCRIPTION:
 * - Trích xuất (Extract) dữ liệu BOM thô từ ZVNPPBOM và Master Data từ ZVNMMMAT.
 * - Sàng lọc (Transform) loại bỏ các Parent SAP lỗi, map mã Old Code, làm sạch @.
 * - Đổ dữ liệu (Load) ra sheet "A.BOM" phục vụ Finder và công cụ Compare.
 * - Hỗ trợ Auto Reset Filter và thiết lập khóa Admin tự động.
 *
 * DEPENDENCIES:
 * - Config.gs (Sử dụng CONFIG, applyStandardProtection).
 *
 * TRIGGERS / USAGE:
 * - Chạy ngầm tự động (Auto-trigger) ngay sau khi Import BOM/MAT hoàn tất.
 *
 * AUTHOR: SheetScript Architect / Hoàng Nguyên Phước Hiệp
 * LAST UPDATED: 28/05/2026 | VERSION: V4.3
 * ======================================================================================
 */

function generateSmartBOM() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();
  if (typeof CONFIG === 'undefined') {
    ui.alert("Loi: Khong tim thay Config.gs. Vui long kiem tra lai.");
    return;
  }
  const BOM_SHEET_NAME = CONFIG.SHEETS.SYS_BOM;
  const MAT_SHEET_NAME = CONFIG.SHEETS.SYS_MAT;
  const TARGET_SHEET_NAME = CONFIG.SHEETS.BOM;
  if (typeof logAction === 'function') logAction("SMART BOM", "Bắt đầu tái tạo cấu trúc BOM...");
  ss.toast("Dang xu ly du lieu BOM... Vui long doi.", "Smart BOM Generator", -1);
  try { const check = Sheets.Spreadsheets; }
  catch (e) { ui.alert("CHUA BAT SERVICE!\nVui long bat 'Google Sheets API' trong muc Services."); return; }
  const sheetBom = ss.getSheetByName(BOM_SHEET_NAME);
  const sheetMat = ss.getSheetByName(MAT_SHEET_NAME);
  if (!sheetBom || !sheetMat) {
    ui.alert("Loi: Khong tim thay sheet nguon (" + BOM_SHEET_NAME + " hoac " + MAT_SHEET_NAME + ")");
    return;
  }
  const lastRowMat = sheetMat.getLastRow();
  if (lastRowMat < 2) { ui.alert("Loi: Sheet Material rong!"); return; }
  const matData = sheetMat.getRange(2, 1, lastRowMat - 1, 4).getValues();
  const sapToOldCodeMap = new Map();
  for (let i = 0; i < matData.length; i++) {
    const r = matData[i];
    const sapCode = String(r[0]).trim();
    const oldCode = String(r[3]).trim();
    if (sapCode) sapToOldCodeMap.set(sapCode, oldCode);
  }
  const lastRowBom = sheetBom.getLastRow();
  if (lastRowBom < 2) { ui.alert("Loi: Sheet BOM rong!"); return; }
  const bomData = sheetBom.getRange(2, 1, lastRowBom - 1, 18).getValues();
  const badParentSapSet = new Set();
  for (let i = 0; i < bomData.length; i++) {
    const row = bomData[i];
    const type = String(row[4]).toUpperCase();
    const altBom = String(row[5]);
    if ((type !== "ZFIN" && type !== "ZSEM") || altBom !== "1") continue;
    const compSap = String(row[13]).trim();
    if (!sapToOldCodeMap.has(compSap)) badParentSapSet.add(String(row[0]).trim());
  }
  const cleanData = [];
  let ghostParentCount = 0;
  let ghostCompCount = 0;
  for (let i = 0; i < bomData.length; i++) {
    const row = bomData[i];
    const type = String(row[4]).toUpperCase();
    const altBom = String(row[5]);
    if ((type !== "ZFIN" && type !== "ZSEM") || altBom !== "1") continue;
    const parentSap = String(row[0]).trim();
    if (badParentSapSet.has(parentSap)) { ghostCompCount++; continue; }
    const compSap = String(row[13]).trim();
    const parentOld = sapToOldCodeMap.get(parentSap) || "";
    const compOld = sapToOldCodeMap.get(compSap) || "";
    if (!parentOld) { ghostParentCount++; continue; }
    let compOldNoAt = compOld;
    if (compOldNoAt.includes("@")) compOldNoAt = compOldNoAt.split("@")[0];
    const cleanRow = [row[0],row[2],row[8],row[9],row[12],row[13],row[14],row[16],row[17],parentOld,compOld,compOldNoAt].map(val => val === undefined ? "" : val);
    cleanData.push(cleanRow);
  }
  if (cleanData.length === 0) {
    ui.alert("Canh bao: Khong tim thay du lieu phu hop (Kiem tra lai dieu kien loc AltBom/Category).");
    return;
  }
  let targetSheet = ss.getSheetByName(TARGET_SHEET_NAME);
  let isNewSheet = false;
  if (!targetSheet) { targetSheet = ss.insertSheet(TARGET_SHEET_NAME); isNewSheet = true; }
  const headers = ["Material", "Material Description", "Base quantity", "Base unit of measure", "Item Number", "Component", "Component desc.", "Component quantity", "Component unit", "Material (old code)", "Component (old code)", "Component (old code) no @"];
  const allValues = [headers, ...cleanData];
  const totalRows = allValues.length;
  const totalCols = headers.length;
  if (targetSheet.getFilter()) targetSheet.getFilter().remove();
  if (!isNewSheet && targetSheet.getLastRow() > 0) targetSheet.getDataRange().clearContent();
  SpreadsheetApp.flush();
  const rangeStr = `'${TARGET_SHEET_NAME}'!A1`;
  try { Sheets.Spreadsheets.Values.update({ values: allValues }, ss.getId(), rangeStr, {valueInputOption: "USER_ENTERED"}); }
  catch (e) { console.warn("API Update failed, fallback to setValues: " + e.message); targetSheet.getRange(1, 1, totalRows, totalCols).setValues(allValues); }
  SpreadsheetApp.flush();
  if (isNewSheet) {
    const sheetId = targetSheet.getSheetId();
    const requests = [];
    requests.push({"repeatCell":{"range":{"sheetId":sheetId,"startRowIndex":0,"endRowIndex":1},"cell":{"userEnteredFormat":{"textFormat":{"bold":true},"horizontalAlignment":"CENTER"}},"fields":"userEnteredFormat(textFormat,horizontalAlignment)"}});
    requests.push({"updateSheetProperties":{"properties":{"sheetId":sheetId,"gridProperties":{"frozenRowCount":1}},"fields":"gridProperties.frozenRowCount"}});
    requests.push({"repeatCell":{"range":{"sheetId":sheetId,"startRowIndex":1,"endRowIndex":totalRows},"cell":{"userEnteredFormat":{"numberFormat":{"type":"TEXT"},"wrapStrategy":"CLIP"}},"fields":"userEnteredFormat(numberFormat,wrapStrategy)"}});
    const currentMaxCols = targetSheet.getMaxColumns();
    if (currentMaxCols > totalCols) requests.push({"deleteDimension":{"range":{"sheetId":sheetId,"dimension":"COLUMNS","startIndex":totalCols,"endIndex":currentMaxCols}}});
    if (requests.length > 0) { try { Sheets.Spreadsheets.batchUpdate({ requests: requests }, ss.getId()); } catch(e) {} }
  }
  applyStandardProtection(targetSheet, `Protected ${TARGET_SHEET_NAME}`, ['A1']);
  if (!targetSheet.getFilter()) targetSheet.getRange(1, 1, totalRows, totalCols).createFilter();
  const totalRemoved = ghostParentCount + ghostCompCount;
  const msg = "Hoan tat! " + cleanData.length + " dong sach. Da xoa " + totalRemoved + " dong.";
  if (typeof logAction === 'function') logAction("SMART BOM", msg);
  ss.toast(msg, "Smart BOM Generator", 5);
  if (typeof rebuildSearchIndex === 'function') rebuildSearchIndex();
  if (typeof warmUpBomIndex === 'function') { ss.toast("Dang nap du lieu BOM vao RAM Cache...", "Cache Warming", 2); warmUpBomIndex(); }
}

//design by Hiep