function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Menu') // Hoặc tên 'Menu' tùy bạn đặt
    .addItem('Get Drawing', 'runFullScan')
    .addSeparator()
    .addItem('1. Scan', 'scanRenameableCodes')
    .addItem('2. Rename', 'runBatchRenameSync')
    .addToUi();
}