function onOpen() {
  SpreadsheetApp.getUi().createMenu('Update').addItem('Drawing - Scan File','runFullScan').addItem('Rename - Setup UI','setupRenameSheetUI').addItem('Rename - Scan','scanRenameableCodes').addItem('Rename - Sync','runBatchRenameSync').addItem('Schedule Daily Scan','createDailyBackendTrigger').addToUi();
}