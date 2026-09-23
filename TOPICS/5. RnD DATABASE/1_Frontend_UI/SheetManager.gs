/**
 * ======================================================================================
 * FILE: SheetManager.gs
 * MODULE: Category Navigation Menu
 * * DESCRIPTION:
 * - Quét các sheet có màu tab chỉ định (Màu xanh), lưu bộ nhớ đệm vào DocumentProperties.
 * - Khởi tạo Custom Menu động dựa trên danh sách đã lưu để chuyển hướng cực nhanh.
 * * DEPENDENCIES:
 * - Không có.
 * * TRIGGERS / USAGE:
 * - Tự động khởi tạo cùng Menu chính (Trigger: onOpen).
 * - Nút "Update List" dùng để làm mới danh mục bộ nhớ đệm.
 * * AUTHOR: SheetScript Architect / Hoàng Nguyên Phước Hiệp
 * LAST UPDATED: 28/05/2026 | VERSION: V1.7
 * * CHANGELOG:
 * - V1.7 - 28/05/26: [CLEANUP] Remove emojis from UI and logs, convert success alert to toast, enforce trailing underscore for private helper, rename functions per GAS anti AI slope rules.
 * - V1.6 - 24/04/26: Tích hợp Auto-Sort (Alphabetical) khi update danh sách. Chuẩn hóa Public Function cho Menu.
 * - V1.5 - 08/04/26: Refactor logic lưu DocumentProperties, fix lỗi lag khi khởi tạo menu.
 * ======================================================================================
 */

const GREEN_HEX_LOWER_ = "#00b050";
const GREEN_LIST_KEY_ = "GREEN_SHEET_DATA_JSON"; // Đổi key vì cấu trúc dữ liệu thay đổi

/*************** 1. BUILD MENU: Category ***************/
function buildSheetManagementMenuToUi() {
  const ui = SpreadsheetApp.getUi();
  const menu = ui.createMenu("Category");

  const cachedDataJson = PropertiesService.getDocumentProperties().getProperty(GREEN_LIST_KEY_);
  
  if (!cachedDataJson) {
    menu.addItem("No data. Click Update below.", "noop");
    menu.addSeparator().addItem("Update List", "updateSheetCategoryList");
    menu.addToUi();
    return;
  }

  const cachedData = JSON.parse(cachedDataJson);

  if (cachedData.length === 0) {
    menu.addItem("(No green sheets found)", "noop");
  } else {
    for (let i = 0; i < cachedData.length; i++) {
      if (i >= 50) { 
        menu.addSeparator();
        menu.addItem(`... va ${cachedData.length - 50} sheet khac`, "noop");
        break; 
      }
      const item = cachedData[i];
      menu.addItem(`${item.name} (${item.count})`, `openGreenSheetByIndex${i}`);
    }
  }

  menu.addSeparator().addItem("Update List", "updateSheetCategoryList");
  menu.addToUi();
}

/*************** 2. UPDATE sheet list (BATCH READ OPTIMIZED) ***************/
function updateSheetCategoryList() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ssId = ss.getId();
  const sheets = ss.getSheets();
  
  const greenSheetNames = [];
  const greenData = []; 

  // 1. Chỉ quét màu Tab (Thao tác nhẹ, không đọc cell)
  for (let i = 0; i < sheets.length; i++) {
    const sheet = sheets[i];
    const color = sheet.getTabColor();
    if ((color || "").toLowerCase() === GREEN_HEX_LOWER_) {
      greenSheetNames.push(sheet.getName());
    }
  }

  if (greenSheetNames.length > 0) {
    // 2. GOM YÊU CẦU: Tạo danh sách các dải ô cần đọc (Cột B từ dòng 2 trở xuống)
    const ranges = greenSheetNames.map(name => `'${name.replace(/'/g, "''")}'!B2:B`);
    
    try {
      // 3. ZERO-LAG BATCH GET: Đọc tất cả các sheet xanh trong đúng 1 lệnh API
      const response = Sheets.Spreadsheets.Values.batchGet(ssId, { ranges: ranges });
      const valueRanges = response.valueRanges || [];
      
      // 4. Xử lý logic đếm trên RAM (In-Memory Processing)
      for (let i = 0; i < greenSheetNames.length; i++) {
        let count = 0;
        if (valueRanges[i] && valueRanges[i].values) {
          const values = valueRanges[i].values;
          for (let r = 0; r < values.length; r++) {
            if (values[r][0] !== "" && values[r][0] != null) count++;
          }
        }
        greenData.push({ name: greenSheetNames[i], count: count });
      }
    } catch (e) {
      console.warn("BatchGet API Failed, using Native Fallback: " + e.message);
      // Fallback an toàn nếu API quá tải (quá nhiều sheet)
      for (let i = 0; i < greenSheetNames.length; i++) {
        const sh = ss.getSheetByName(greenSheetNames[i]);
        if (sh) {
          let count = 0;
          const lr = sh.getLastRow();
          if (lr >= 2) {
            const vals = sh.getRange(2, 2, lr - 1, 1).getValues();
            for (let r = 0; r < vals.length; r++) {
              if (vals[r][0] !== "" && vals[r][0] != null) count++;
            }
          }
          greenData.push({ name: greenSheetNames[i], count: count });
        }
      }
    }
  }

  // >>> SẮP XẾP THEO THỨ TỰ ALPHABET (A-Z) VỚI NUMERIC SORT <<<
  greenData.sort((a, b) => a.name.localeCompare(b.name, 'vi', { numeric: true }));

  // Lưu Data
  PropertiesService.getDocumentProperties().setProperty(GREEN_LIST_KEY_, JSON.stringify(greenData));

  // Tái tạo Menu
  buildSheetManagementMenuToUi();

  // Chuyển thông báo thành công từ Alert sang Toast
  ss.toast(
    `Tim thay ${greenData.length} danh muc. Menu da duoc lam moi.`,
    "Update Complete",
    5
  );
}

/*************** 3. OPEN sheet by index ***************/
function openGreenSheetByIndex_(index) {
  const cachedDataJson = PropertiesService.getDocumentProperties().getProperty(GREEN_LIST_KEY_);
  if (!cachedDataJson) return;
  
  const cachedData = JSON.parse(cachedDataJson);
  if (index >= cachedData.length) return;

  const targetName = cachedData[index].name;
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(targetName);
  
  if (sh) {
    ss.setActiveSheet(sh);
  } else {
    SpreadsheetApp.getUi().alert(`Sheet "${targetName}" khong con ton tai hoac da bi doi ten. Vui long chay Update.`);
  }
}

/*************** 4. STATIC DISPATCHERS (Chuẩn hóa thành Public Function) ***************/
function openGreenSheetByIndex0() { openGreenSheetByIndex_(0); }
function openGreenSheetByIndex1() { openGreenSheetByIndex_(1); }
function openGreenSheetByIndex2() { openGreenSheetByIndex_(2); }
function openGreenSheetByIndex3() { openGreenSheetByIndex_(3); }
function openGreenSheetByIndex4() { openGreenSheetByIndex_(4); }
function openGreenSheetByIndex5() { openGreenSheetByIndex_(5); }
function openGreenSheetByIndex6() { openGreenSheetByIndex_(6); }
function openGreenSheetByIndex7() { openGreenSheetByIndex_(7); }
function openGreenSheetByIndex8() { openGreenSheetByIndex_(8); }
function openGreenSheetByIndex9() { openGreenSheetByIndex_(9); }
function openGreenSheetByIndex10() { openGreenSheetByIndex_(10); }
function openGreenSheetByIndex11() { openGreenSheetByIndex_(11); }
function openGreenSheetByIndex12() { openGreenSheetByIndex_(12); }
function openGreenSheetByIndex13() { openGreenSheetByIndex_(13); }
function openGreenSheetByIndex14() { openGreenSheetByIndex_(14); }
function openGreenSheetByIndex15() { openGreenSheetByIndex_(15); }
function openGreenSheetByIndex16() { openGreenSheetByIndex_(16); }
function openGreenSheetByIndex17() { openGreenSheetByIndex_(17); }
function openGreenSheetByIndex18() { openGreenSheetByIndex_(18); }
function openGreenSheetByIndex19() { openGreenSheetByIndex_(19); }
function openGreenSheetByIndex20() { openGreenSheetByIndex_(20); }
function openGreenSheetByIndex21() { openGreenSheetByIndex_(21); }
function openGreenSheetByIndex22() { openGreenSheetByIndex_(22); }
function openGreenSheetByIndex23() { openGreenSheetByIndex_(23); }
function openGreenSheetByIndex24() { openGreenSheetByIndex_(24); }
function openGreenSheetByIndex25() { openGreenSheetByIndex_(25); }
function openGreenSheetByIndex26() { openGreenSheetByIndex_(26); }
function openGreenSheetByIndex27() { openGreenSheetByIndex_(27); }
function openGreenSheetByIndex28() { openGreenSheetByIndex_(28); }
function openGreenSheetByIndex29() { openGreenSheetByIndex_(29); }
function openGreenSheetByIndex30() { openGreenSheetByIndex_(30); }
function openGreenSheetByIndex31() { openGreenSheetByIndex_(31); }
function openGreenSheetByIndex32() { openGreenSheetByIndex_(32); }
function openGreenSheetByIndex33() { openGreenSheetByIndex_(33); }
function openGreenSheetByIndex34() { openGreenSheetByIndex_(34); }
function openGreenSheetByIndex35() { openGreenSheetByIndex_(35); }
function openGreenSheetByIndex36() { openGreenSheetByIndex_(36); }
function openGreenSheetByIndex37() { openGreenSheetByIndex_(37); }
function openGreenSheetByIndex38() { openGreenSheetByIndex_(38); }
function openGreenSheetByIndex39() { openGreenSheetByIndex_(39); }
function openGreenSheetByIndex40() { openGreenSheetByIndex_(40); }
function openGreenSheetByIndex41() { openGreenSheetByIndex_(41); }
function openGreenSheetByIndex42() { openGreenSheetByIndex_(42); }
function openGreenSheetByIndex43() { openGreenSheetByIndex_(43); }
function openGreenSheetByIndex44() { openGreenSheetByIndex_(44); }
function openGreenSheetByIndex45() { openGreenSheetByIndex_(45); }
function openGreenSheetByIndex46() { openGreenSheetByIndex_(46); }
function openGreenSheetByIndex47() { openGreenSheetByIndex_(47); }
function openGreenSheetByIndex48() { openGreenSheetByIndex_(48); }
function openGreenSheetByIndex49() { openGreenSheetByIndex_(49); }

function noop() {}

//design by Hiep