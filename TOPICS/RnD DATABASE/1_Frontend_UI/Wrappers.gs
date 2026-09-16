/**
 * ======================================================================================
 * FILE: Wrappers.gs (BOUND SCRIPT)
 * - Đóng vai trò Cầu nối (Bridge) giữa Giao diện (HTML/Sheet) và Logic Lõi (Library).
 * - QUAN TRỌNG: Tên định danh của Thư viện phải được đặt đúng là "LibDNF" trong mục Libraries.
 * ======================================================================================
 */
function showGlobalSearchSidebar() { const html = HtmlService.createHtmlOutputFromFile('Sidebar').setTitle('Fuzzy Search'); SpreadsheetApp.getUi().showSidebar(html); }
function showUserManual() { const html = HtmlService.createHtmlOutputFromFile('UserManual').setWidth(1300).setHeight(800); SpreadsheetApp.getUi().showModalDialog(html, 'Huong dan su dung he thong'); }
function showMaintenanceManual() { const config = LibDNF.getSystemConfig(); const templateName = (config && config.FILES && config.FILES.TEMPLATE_MAINTENANCE) ? config.FILES.TEMPLATE_MAINTENANCE : 'MaintenanceManual'; const html = HtmlService.createHtmlOutputFromFile(templateName).setWidth(1300).setHeight(800); SpreadsheetApp.getUi().showModalDialog(html, 'Huong dan duy tri he thong'); }
function showExportOptionsForm() { const config = LibDNF.getSystemConfig(); const html = HtmlService.createTemplateFromFile(config.FILES.TEMPLATE_EXPORT || "ExportForm"); html.exportType = "bom"; SpreadsheetApp.getUi().showModalDialog(html.evaluate(), "Export BOM"); }
function showBomCostExportDialog() { const result = LibDNF.exportBomCostSheet(); const config = LibDNF.getSystemConfig(); const html = HtmlService.createTemplateFromFile(config.FILES.TEMPLATE_EXPORT || "ExportForm"); html.exportType = result.exportType; html.fileUrl = result.fileUrl; html.elapsed = result.elapsed; SpreadsheetApp.getUi().showModalDialog(html.evaluate(), "BOM Cost Export"); }
function getProductSuggestions(query) { return LibDNF.getProductSuggestions(query); }
function getBasicInfo(code) { return LibDNF.getBasicInfo(code); }
function getBOMRelations(sapCode, keyForBOM) { return LibDNF.getBOMRelations(sapCode, keyForBOM); }
function getExtraDetails(keyForBOM) { return LibDNF.getExtraDetails(keyForBOM); }
function runSelectedExport(options) { return LibDNF.runSelectedExport(options); }
function activateHomePage() { LibDNF.activateHomePage(); }
function activateBomSearch() { LibDNF.activateBomSearch(); }
function activateRmSearch() { LibDNF.activateRmSearch(); }
function activateCostSearch() { LibDNF.activateCostSearch(); }
function activateBomCompare() { LibDNF.activateBomCompare(); }
function import_MAT() { LibDNF.import_MAT(); }
function import_BOM() { LibDNF.import_BOM(); }
function import_BOM_and_MAT() { LibDNF.import_BOM_and_MAT(); }
function import_COST() { LibDNF.import_COST(); }
function listMainFolderPDFFiles() { LibDNF.listMainFolderPDFFiles(); }
function onEdit(e) { if (!e || !e.range) return; LibDNF.systemOnEdit(e); }
function runAllHealthChecksBackground() { LibDNF.runAllHealthChecksBackground(); }
function createBiDailyHealthCheckTrigger() { const handlerName = 'runAllHealthChecksBackground'; const triggers = ScriptApp.getProjectTriggers(); for (let i = 0; i < triggers.length; i++) { if (triggers[i].getHandlerFunction() === handlerName) ScriptApp.deleteTrigger(triggers[i]); } ScriptApp.newTrigger(handlerName).timeBased().everyDays(7).atHour(5).create(); SpreadsheetApp.getActiveSpreadsheet().toast("Đã thiết lập chạy ngầm Health Check (5h sáng, 7 ngày/lần).", "Trigger Setup", 8); LibDNF.logAction("TRIGGER", "Thiết lập lịch chạy ngầm System Health"); }
function createDualDailyTriggers() { const handlerName = 'listMainFolderPDFFiles'; const triggers = ScriptApp.getProjectTriggers(); for (let i = 0; i < triggers.length; i++) { if (triggers[i].getHandlerFunction() === handlerName) ScriptApp.deleteTrigger(triggers[i]); } ScriptApp.newTrigger(handlerName).timeBased().atHour(6).nearMinute(30).everyDays(1).create(); ScriptApp.newTrigger(handlerName).timeBased().atHour(12).nearMinute(30).everyDays(1).create(); SpreadsheetApp.getActiveSpreadsheet().toast("Đã thiết lập lịch kéo dữ liệu Drawing (6h30 & 12h30).", "Trigger Setup", 8); LibDNF.logAction("TRIGGER", "Thiết lập lịch kéo dữ liệu (6h & 12h)"); }
function setupMaintenanceLayout() { LibDNF.setupMaintenanceLayout(); }
function checkZone1_DrawingAudit() { LibDNF.checkZone1_DrawingAudit(); }
function checkZone2_MissingBMat() { LibDNF.checkZone2_MissingBMat(); }
function checkZone3_IncompleteBMat() { LibDNF.checkZone3_IncompleteBMat(); }
function checkZone4_GhostBOM() { LibDNF.checkZone4_GhostBOM(); }
function checkZone5_SecurityAudit() { LibDNF.checkZone5_SecurityAudit(); }
function checkZone6_UnusedBMat() { LibDNF.checkZone6_UnusedBMat(); }
function checkZone7_BlockedBOM() { LibDNF.checkZone7_BlockedBOM(); }
function exportLevel1Sparepart() { LibDNF.exportLevel1Sparepart(); }
function auditAllProtections() { LibDNF.auditAllProtections(); }
function restoreBOMFormulas() { LibDNF.restoreBOMFormulas(); }
function simpleExportCode() { LibDNF.simpleExportCode(); }
function CtrK() { var ui = SpreadsheetApp.getActiveSpreadsheet(); if(ui) ui.toast("Phím tắt này đã được vô hiệu hóa ở phiên bản mới.", "Thông báo", 3); }
function m1() {}
function cut() {}
function copyJ1() {}
function UntitledMacro() {}