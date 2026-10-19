/**
 * ======================================================================================
 * FILE: Rename.gs
 * MODULE: Batch Rename Tool (Sync & Reverse Lookup)
 * * DESCRIPTION:
 * - Tự động tìm File 2D và đổi tên theo File Released dựa vào Code trên Sheet2.
 * - Tích hợp UI Dropdown (Data Validation) và Trigger onEdit lọc thư mục động (Cascading Dropdown).
 * - Xác thực tên chuẩn trực tiếp trên RAM (Zero-API Validation) tối ưu tối đa tốc độ quét.
 * * DEPENDENCIES:
 * - Config.gs (Đọc cấu hình thư mục, tên sheet).
 * - Yêu cầu bật Google Drive API v2 (Advanced Services).
 * * TRIGGERS / USAGE:
 * - Kích hoạt thủ công qua Menu (Update -> 1. Scan / 2. Rename).
 * - Tự động chạy cập nhật danh sách Path khi sửa ô A1 trên Sheet2 (Trigger: onEdit).
 * * AUTHOR: SheetScript Architect / Hoàng Nguyên Phước Hiệp
 * LAST UPDATED: 28/05/2026 | VERSION: V3.3
 * * CHANGELOG:
 * - V3.3 - 28/05/26: [CLEANUP] Remove emojis, standardize toasts/alerts to no-accent text, replace success alerts with toasts, rename variables per GAS anti AI slope rules.
 * - V3.2 - 25/05/26: [UI/UX] Mở rộng hiển thị 4 cột (Code, Released Name, 2D Name, Status) tận dụng dữ liệu RAM từ Sheet1, không tốn API.
 * - V3.1 - 23/05/26: [BUGFIX] Vá lỗi query Drive API tự tìm thấy chính nó. Thêm Sleep API throttling chống Rate Limit.
 * - V3.0 - 23/05/26: [ZERO-API] Đổi cơ chế check tên file sang kiểm tra trực tiếp row index trên RAM. Thêm Auto-Dropdown & Data Validation.
 * - V2.0 - 23/05/26: Chuyển đổi từ HTML Dialog sang kiến trúc Sync + Toast. Thêm tham số fields: "title" để tối ưu tốc độ API.
 * - V1.0 - 23/05/26: Khởi tạo module Batch Rename hỗ trợ Client-side Chunking.
 * ======================================================================================
 */

// ==========================================
// BƯỚC 0: TẠO DROPDOWN LIST (DATA VALIDATION)
// ==========================================
function setupRenameSheetUI() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet1Name = (typeof CONFIG !== 'undefined') ? CONFIG.SHEET_NAME : 'Sheet1';
  const sheet1 = ss.getSheetByName(sheet1Name);
  
  if (!sheet1) {
    SpreadsheetApp.getUi().alert("Loi: Khong tim thay " + sheet1Name);
    return;
  }
  
  let sheet2 = ss.getSheetByName("Sheet2");
  if (!sheet2) {
    sheet2 = ss.insertSheet("Sheet2");
  }
  
  // Lấy dữ liệu từ cột A của Sheet1 để làm Root
  const lastRow = sheet1.getLastRow();
  if (lastRow < 2) {
    ss.toast("Sheet1 chua co du lieu.", "Setup Info", 3);
    return;
  }
  
  const data = sheet1.getRange(2, 1, lastRow - 1, 1).getValues();
  const rootFolderSet = new Set();
  
  data.forEach(row => {
    if (row[0]) rootFolderSet.add(String(row[0]).trim());
  });
  
  // Áp dụng Data Validation cho A1 (Folder root)
  if (rootFolderSet.size > 0) {
    const rootRule = SpreadsheetApp.newDataValidation()
      .requireValueInList(Array.from(rootFolderSet).sort(), true) // true = hiển thị dropdown
      .setAllowInvalid(false) // Không cho phép nhập bậy
      .build();
    sheet2.getRange("A1").setDataValidation(rootRule);
  }
  
  // Xóa trắng ô A2 và Validation cũ để bắt người dùng chọn lại luồng mới
  sheet2.getRange("A2").clearDataValidations().clearContent();
  sheet2.getRange("A1").clearContent();
  
  ss.toast("Da nap danh muc! Hay chon A1 de he thong tu loc danh sach A2.", "Setup Complete", 5);
}

// ==========================================
// BƯỚC 0.5: TỰ ĐỘNG CẬP NHẬT DROPDOWN (ON EDIT TRIGGER)
// ==========================================
function onEdit(e) {
  if (!e || !e.range) return;
  const range = e.range;
  const sheet = range.getSheet();
  
  // Chỉ kích hoạt tự động khi người dùng sửa đúng ô A1 trên Sheet2
  if (sheet.getName() === "Sheet2" && range.getRow() === 1 && range.getColumn() === 1) {
    const selectedRoot = range.getValue();
    const cellA2 = sheet.getRange("A2");
    
    // Ngay khi A1 đổi, phải xóa sạch A2 để tránh nhầm lẫn
    cellA2.clearContent().clearDataValidations();
    
    if (!selectedRoot) return;
    
    const ss = e.source;
    const sheet1Name = (typeof CONFIG !== 'undefined') ? CONFIG.SHEET_NAME : 'Sheet1';
    const sheet1 = ss.getSheetByName(sheet1Name);
    if (!sheet1) return;
    
    const lastRow = sheet1.getLastRow();
    if (lastRow < 2) return;
    
    const data = sheet1.getRange(2, 1, lastRow - 1, 2).getValues();
    const folderPathSet = new Set();
    
    // Lọc các Path tương ứng với Root vừa chọn
    for (let i = 0; i < data.length; i++) {
      if (String(data[i][0]).trim() === String(selectedRoot).trim() && data[i][1]) {
        folderPathSet.add(String(data[i][1]).trim());
      }
    }
    
    // Áp dụng dropdown mới cho A2
    if (folderPathSet.size > 0) {
      const pathRule = SpreadsheetApp.newDataValidation()
        .requireValueInList(Array.from(folderPathSet).sort(), true)
        .setAllowInvalid(false)
        .build();
      cellA2.setDataValidation(pathRule);
      ss.toast(`Da tim thay ${folderPathSet.size} Folder Path. Ban co the chon o A2.`, "Update Dropdown", 3);
    }
  }
}

// ==========================================
// BƯỚC 1: QUÉT VÀ LIỆT KÊ MÃ (LỌC TÊN CHUẨN TRÊN RAM)
// ==========================================
function scanRenameableCodes() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();
  const lock = LockService.getScriptLock();
  
  if (!lock.tryLock(10000)) {
    ss.toast("He thong dang ban. Vui long cho tien trinh truoc hoan tat.", "System Busy", 5);
    return;
  }

  try {
    const sheet2 = ss.getSheetByName("Sheet2");
    
    if (!sheet2) {
      ui.alert("Loi: Khong tim thay tab 'Sheet2'.");
      return;
    }

    // Tự động nhảy sang Sheet2
    ss.setActiveSheet(sheet2);
    
    const root = sheet2.getRange("A1").getValue();
    const path = sheet2.getRange("A2").getValue();
    if (!root || !path) {
      ui.alert("Loi: Thieu Root (A1) hoac Path (A2) tren Sheet2.");
      return;
    }
    
    ss.toast("Dang phan tich cau truc dong tu Sheet1...", "Scanning", -1);
    
    const sheet1Name = (typeof CONFIG !== 'undefined') ? CONFIG.SHEET_NAME : 'Sheet1';
    const codeToDataMap = buildLookupMap_(ss.getSheetByName(sheet1Name), root, path);
    const keys = Object.keys(codeToDataMap);
    
    // --- THÊM DATA VALIDATION A1 & A2 ---
    if (keys.length === 0) {
      ss.toast("Da huy quet.", "Scan Cancelled", 2); 
      ui.alert("Loi nhap lieu", `Khong tim thay ma nao thuoc Root: "${root}" va Path: "${path}" tren Sheet1.\n\nVui long kiem tra lai chinh ta hoac dam bao ban da chay 'Drawing (Scan File)'.`, ui.ButtonSet.OK);
      return;
    }
    
    const codesToRename = [];
    
    // Lọc các code có đủ 2 file VÀ nằm ở 2 dòng khác nhau (Do Scanner tách dòng vì sai tên)
    for (const code of keys) {
      const mappedData = codeToDataMap[code];
      
      if (mappedData.releasedLink && mappedData.link2D) {
        // Nếu Released và 2D nằm khác dòng trên Sheet1 -> Tên khác nhau -> Cần đổi
        if (mappedData.releasedRow !== mappedData.link2DRow) {
          codesToRename.push([
            code, 
            mappedData.releasedName, // Tên file mẫu chuẩn
            mappedData.link2DName,   // Tên file 2D hiện tại đang bị lệch
            "Cho xac nhan"
          ]);
        }
      }
    }
    
    // Xóa danh sách cũ trên Sheet2 (từ dòng 3 trở đi, xóa 4 cột)
    const lastRow = sheet2.getLastRow();
    if (lastRow >= 3) {
      sheet2.getRange(3, 1, lastRow - 2, 4).clearContent();
      sheet2.getRange(3, 1, lastRow - 2, 4).clearFormat();
    }
    
    // Ghi tiêu đề Header vào dòng 3
    const headers = [["Code", "Released", "2D & pdf", "Status"]];
    sheet2.getRange(3, 1, 1, 4)
          .setValues(headers)
          .setFontWeight("bold")
          .setBackground("#cfe2f3"); // Màu xanh nhạt cho Header
    
    // Ghi danh sách mới bắt đầu từ dòng 4
    if (codesToRename.length > 0) {
      sheet2.getRange(4, 1, codesToRename.length, 4).setValues(codesToRename);
      sheet2.autoResizeColumns(1, 4); // Tự động căn chỉnh độ rộng 4 cột
      ss.toast(`Quet xong! Phat hien ${codesToRename.length} file sai ten. Hay bam Dong Bo.`, "Scan Complete", 8);
    } else {
      ss.toast("Tuyet voi! Toan bo file 2D trong thu muc nay deu da chuan ten (cung dong tren Sheet1), khong can dong bo.", "Scan Complete", 8);
    }
    
    SpreadsheetApp.flush();
    
  } finally {
    lock.releaseLock();
  }
}

// ==========================================
// BƯỚC 2: CHẠY ĐỒNG BỘ TÊN (RENAME)
// ==========================================
// BƯỚC 2: CHẠY ĐỒNG BỘ TÊN (RENAME)
// ==========================================
function runBatchRenameSync() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();
  const lock = LockService.getScriptLock();
  
  const sheet2 = ss.getSheetByName("Sheet2");
  
  if (!sheet2) {
    ui.alert("Loi: Khong tim thay tab 'Sheet2'.");
    return;
  }

  // Tự động nhảy sang Sheet2
  ss.setActiveSheet(sheet2);
  
  const lastRow = sheet2.getLastRow();
  if (lastRow < 4) { 
    ui.alert("Loi: Danh sach Code trong. Vui long quet ma (Buoc 1) truoc.");
    return;
  }
  
  const count = lastRow - 3; 

  const confirmResponse = ui.alert(
    'Xac nhan Dong bo', 
    `He thong se doi ten thuc te cho ${count} file tren Drive.\nBan co chac chan muon tiep tuc?`, 
    ui.ButtonSet.YES_NO
  );
  
  if (confirmResponse !== ui.Button.YES) {
    ss.toast("Da huy thao tac.", "Cancelled", 3);
    return;
  }

  if (!lock.tryLock(30000)) {
    ui.alert("Canh bao: He thong dang ban chay mot tien trinh khac. Vui long thu lai sau.");
    return;
  }

  try {
    const root = sheet2.getRange("A1").getValue();
    const path = sheet2.getRange("A2").getValue();
    
    ss.toast("Dang tai du lieu...", "Syncing", -1);
    
    const sheet1Name = (typeof CONFIG !== 'undefined') ? CONFIG.SHEET_NAME : 'Sheet1';
    const codeToDataMap = buildLookupMap_(ss.getSheetByName(sheet1Name), root, path);
    const keys = Object.keys(codeToDataMap);
    
    if (keys.length === 0) {
      ss.toast("Da huy.", "Cancelled", 2); 
      ui.alert("Loi nhap lieu", "Sai thong tin Root (A1) hoac Path (A2).", ui.ButtonSet.OK);
      return;
    }

    const codeRange = sheet2.getRange(4, 1, count, 1); 
    const codeValues = codeRange.getValues();
    
    let successCount = 0;
    
    for (let i = 0; i < count; i++) {
      const targetCode = codeValues[i][0] ? String(codeValues[i][0]).trim().toUpperCase() : "";
      
      const targetCell = sheet2.getRange(i + 4, 4); 
      
      if (!targetCode) {
        targetCell.setValue("Bo qua - O Code trong");
        continue;
      }
      
      if (i % 5 === 0) {
         ss.toast(`Dang doi ten: ${i + 1}/${count} file...`, "Renaming", -1);
      }
      
      const mappedData = codeToDataMap[targetCode];
      if (!mappedData) {
        targetCell.setValue("Loi - Khong tim thay Code nay trong Sheet1");
        continue;
      }
      
      const idReleased = extractFileId_(mappedData.releasedLink);
      const id2D = extractFileId_(mappedData.link2D);
      
      if (!idReleased || !id2D) {
        targetCell.setValue("Loi - Thieu file lien ket tren Sheet1");
        continue;
      }
      
      /* STREAMING_CHUNK:Implementing Double-Check Verification for API Patch... */
      try {
        const releasedFile = Drive.Files.get(idReleased, { supportsAllDrives: true, fields: "title" });
        const baseNameReleased = releasedFile.title.lastIndexOf('.') !== -1 
          ? releasedFile.title.substring(0, releasedFile.title.lastIndexOf('.')) 
          : releasedFile.title;
        
        const file2D = Drive.Files.get(id2D, { supportsAllDrives: true, fields: "title, parents" });
        const current2DName = file2D.title;
        const extIndex = current2DName.lastIndexOf('.');
        const ext2D = extIndex !== -1 ? current2DName.substring(extIndex) : '';
        
        const new2DName = baseNameReleased + ext2D;
        
        if (current2DName === new2DName) {
           targetCell.setValue("Bo qua - Ten da chuan");
        } else {
           let isDuplicate = false;
           if (file2D.parents && file2D.parents.length > 0) {
             const parentId = file2D.parents[0].id;
             const safeName = new2DName.replace(/'/g, "\\'");
             
             const query = `title = '${safeName}' and '${parentId}' in parents and trashed = false`;
             
             const searchResult = Drive.Files.list({
               q: query,
               maxResults: 10,
               supportsAllDrives: true,
               includeItemsFromAllDrives: true
             });
             
             if (searchResult.items && searchResult.items.length > 0) {
               isDuplicate = searchResult.items.some(item => item.id !== id2D);
             }
           }

           if (isDuplicate) {
             targetCell.setValue("Can kiem tra thu cong - Da co file trung ten trong thu muc");
             targetCell.setFontColor("#ff0000"); 
           } else {
             // [VÁ LỖI CỐT LÕI]: Hứng kết quả trả về từ API Patch thay vì chạy mù
             const updatedFile = Drive.Files.patch({title: new2DName}, id2D, { supportsAllDrives: true, fields: "title" });
             
             // Double-check: Đảm bảo tên file trên Server thực sự đã đổi
             if (updatedFile && updatedFile.title === new2DName) {
               targetCell.setValue("Da dong bo: " + new2DName);
               targetCell.setFontColor("#000000");
               
               sheet2.getRange(i + 4, 3).setValue(new2DName).setFontColor("#009900"); 
               successCount++;
             } else {
               targetCell.setValue("Loi he thong - API khong luu duoc ten moi");
               targetCell.setFontColor("#ff0000");
             }
           }
        }
      } catch (e) {
        targetCell.setValue("Loi API: " + e.message);
      }
      
      SpreadsheetApp.flush(); 
      Utilities.sleep(300);
    }
  
    ss.toast(`Da doi ten thanh cong ${successCount}/${count} file!`, "Sync Complete", 8);
    
  } finally {
    lock.releaseLock();
  }
}

// ==========================================
// PRIVATE HELPERS — Xử lý logic ngầm
// ==========================================

function buildLookupMap_(sheet1, targetRoot, targetPath) {
  const codeToDataMap = {};
  if (!sheet1) return codeToDataMap;
  
  const lastRow = sheet1.getLastRow();
  if (lastRow < 2) return codeToDataMap;
  
  const metaValues = sheet1.getRange(2, 1, lastRow - 1, 4).getValues();
  const linkFormulas = sheet1.getRange(2, 7, lastRow - 1, 2).getFormulas();
  const linkValues = sheet1.getRange(2, 7, lastRow - 1, 2).getValues();
  
  for (let i = 0; i < metaValues.length; i++) {
    const r = metaValues[i][0];
    const p = metaValues[i][1];
    const code = metaValues[i][3];
    
    if (r == targetRoot && p == targetPath && code) {
      const codeStr = String(code).trim().toUpperCase();
      
      if (!codeToDataMap[codeStr]) {
        // [CẢI TIẾN] Lưu thêm biến Row để theo dõi file có nằm cùng 1 dòng không
        codeToDataMap[codeStr] = { 
          releasedLink: "", link2D: "", 
          releasedRow: -1, link2DRow: -1,
          releasedName: "", link2DName: "" 
        };
      }
      
      const gLink = linkFormulas[i][0] || linkValues[i][0];
      const hLink = linkFormulas[i][1] || linkValues[i][1];
      
      if (gLink) {
        codeToDataMap[codeStr].releasedLink = gLink;
        codeToDataMap[codeStr].releasedRow = i;
        codeToDataMap[codeStr].releasedName = metaValues[i][2]; // Lấy BaseFileName ở cột C
      }
      if (hLink) {
        codeToDataMap[codeStr].link2D = hLink;
        codeToDataMap[codeStr].link2DRow = i;
        codeToDataMap[codeStr].link2DName = metaValues[i][2]; // Lấy BaseFileName ở cột C
      }
    }
  }
  return codeToDataMap;
}

function extractFileId_(text) {
  if (!text) return null;
  const match = text.match(/[-\w]{25,}/);
  return match ? match[0] : null;
}