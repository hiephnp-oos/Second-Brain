function onOpen() {
  const ui = SpreadsheetApp.getUi();
  const cache = CacheService.getUserCache();
  const props = PropertiesService.getUserProperties();
  let authState = cache.get("authorized") || props.getProperty("authorized");
  const isAuthorized = (authState === "true" || authState === "yes");
  if (isAuthorized && !cache.get("authorized")) cache.put("authorized", "true", 21600);
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
  if (typeof buildSheetManagementMenuToUi === 'function') buildSheetManagementMenuToUi();
  ui.createMenu('Export').addItem('Export BOM', 'showExportOptionsForm').addItem('Export BOM Cost', 'showBomCostExportDialog').addToUi();
  ui.createMenu('Import').addItem('Sync ZMat', 'import_MAT').addItem('Sync ZBom', 'import_BOM').addItem('Sync ZMat & ZBom', 'import_BOM_and_MAT').addItem('Sync ZCost', 'import_COST').addItem('Sync Drawing', 'listMainFolderPDFFiles').addToUi();
  if (!isAuthorized) ui.createMenu('Auth').addItem('Authorize System', 'authorizeAll').addToUi();
}
function authorizeAll() {
  const props = PropertiesService.getUserProperties();
  const cache = CacheService.getUserCache();
  SpreadsheetApp.getActiveSpreadsheet(); DriveApp.getRootFolder(); ScriptApp.getOAuthToken(); UrlFetchApp.fetch("https://www.google.com"); Session.getActiveUser().getEmail();
  try { Sheets.Spreadsheets.get(SpreadsheetApp.getActiveSpreadsheet().getId()); Drive.Files.get(SpreadsheetApp.getActiveSpreadsheet().getId()); } catch(e) {}
  props.setProperty("authorized", "yes"); cache.put("authorized", "true", 21600);
  LibDNF.logAction("AUTH", "Unlock System - Success");
  SpreadsheetApp.getUi().alert("Đã cấp quyền thành công.\nRemember to keep LIXIL in your heart, always");
  onOpen();
}