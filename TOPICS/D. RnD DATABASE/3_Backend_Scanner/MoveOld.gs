/**
 * ======================================================================================
 * FILE: MoveOld.gs
 * MODULE: Backup & Maintenance
 * DESCRIPTION: Tự động di chuyển các bản vẽ (11.1) có ghi chú "Old" vào 9 thư mục _Old.
 * - Đọc cấu hình Mapping từ Sheet3 (B2:D10).
 * - Bóc tách File ID từ Hyperlink, dùng Drive API v2 để chuyển đổi Parent Folder.
 * - Ghi chú "Moved" vào cột H.
 * DEPENDENCIES: Yêu cầu bật "Drive API v2" (Advanced Services).
 * TRIGGERS / USAGE: Kích hoạt thủ công qua Nút bấm (Drawing) trên Sheet3.
 * ======================================================================================
 */

function moveOldFiles() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Sheet3");
  const ui = SpreadsheetApp.getUi();

  if (!sheet) {
    ui.alert("Lỗi: Không tìm thấy Sheet3.");
    return;
  }

  const response = ui.alert(
    "Xác nhận di chuyển", 
    "Hệ thống sẽ chuyển các bản vẽ có Remark 'Old' vào thư mục _Old tương ứng.\nBạn có chắc chắn muốn tiến hành?", 
    ui.ButtonSet.YES_NO
  );
  if (response !== ui.Button.YES) return;

  ss.toast("Đang phân tích cấu hình 9 thư mục _Old...", "Move Old Files", -1);

  // 1. Nạp cấu hình Mapping (B2:D10) vào RAM
  const configData = sheet.getRange("B2:D10").getValues();
  const oldFolderMap = {};
  
  for (let i = 0; i < configData.length; i++) {
    const parentGroup = String(configData[i][0]).trim(); // B: 11.1.1_Release
    const childGroup = String(configData[i][1]).trim();  // C: 1. 1-7
    const url = String(configData[i][2]).trim();         // D: Link _Old
    
    const match = url.match(/[-\w]{25,}/);
    if (parentGroup && childGroup && match) {
      oldFolderMap[`${parentGroup}|${childGroup}`] = match[0]; // Lưu ID thư mục _Old
    }
  }

  // 2. Đọc dữ liệu vùng thực thi (A12:H)
  const lastRow = sheet.getLastRow();
  if (lastRow < 12) {
    ss.toast("Không có dữ liệu bản vẽ nào ở dưới dòng 11.", "Hoàn tất", 3);
    return;
  }

  const dataRange = sheet.getRange(12, 1, lastRow - 11, 8); // Cột A đến H
  const data = dataRange.getValues();
  const richTexts = dataRange.getRichTextValues(); 

  // Map cấu hình cột tương ứng với Parent Group
  const PARENT_MAPPING = {
    2: "11.1.1_Release",     // Cột C (Index 2): Released
    3: "11.1.2_2D Drawing",  // Cột D (Index 3): 2D & pdf
    4: "11.1.3_3D Drawing"   // Cột E (Index 4): 3D & Corel
  };

  const parentNameCache = {}; 
  let successCount = 0;
  const statusUpdates = [];   

  // 3. Duyệt qua từng dòng và xử lý move file
  for (let r = 0; r < data.length; r++) {
    const remark = String(data[r][6]).trim().toLowerCase(); // Cột G (Remark)
    const currentStatus = String(data[r][7]).trim();        // Cột H (Status)

    if (remark.includes("old") && currentStatus !== "Moved") {
      let rowSuccess = true;
      let filesProcessedInRow = 0;

      // Quét 3 cột chứa Link (C, D, E)
      for (const colIdx of [2, 3, 4]) {
        let url = richTexts[r][colIdx].getLinkUrl();
        if (!url) url = String(data[r][colIdx]); // Fallback nếu là chuỗi URL thuần

        const fileIdMatch = url.match(/[-\w]{25,}/);
        
        if (fileIdMatch) {
          const fileId = fileIdMatch[0];
          filesProcessedInRow++;

          try {
            // Lấy ID thư mục hiện tại của file
            const file = Drive.Files.get(fileId, { fields: "parents", supportsAllDrives: true });
            if (!file.parents || file.parents.length === 0) continue;
            
            const currentParentId = file.parents[0].id;

            // Đọc tên thư mục con hiện tại (1. 1-7, 2. A-B, 3. Product)
            if (!parentNameCache[currentParentId]) {
              const parentFolder = Drive.Files.get(currentParentId, { fields: "title", supportsAllDrives: true });
              parentNameCache[currentParentId] = parentFolder.title.trim();
            }
            
            const childName = parentNameCache[currentParentId]; 
            const parentGroup = PARENT_MAPPING[colIdx];         

            // Tra cứu ID thư mục _Old tương ứng từ Cấu hình B2:D10
            const targetKey = `${parentGroup}|${childName}`;
            const targetFolderId = oldFolderMap[targetKey];

            // Tiến hành lệnh di chuyển
            if (targetFolderId && targetFolderId !== currentParentId) {
              Drive.Files.patch({}, fileId, {
                addParents: targetFolderId,
                removeParents: currentParentId,
                supportsAllDrives: true
              });
              successCount++;
            } else if (!targetFolderId) {
              rowSuccess = false;
            }
          } catch (e) {
            console.error(`Lỗi move file ${fileId}: ${e.message}`);
            rowSuccess = false;
          }
        }
      }

      // Đánh dấu kết quả vào Mảng
      if (filesProcessedInRow > 0 && rowSuccess) {
        statusUpdates.push(["Moved"]);
      } else if (filesProcessedInRow > 0 && !rowSuccess) {
        statusUpdates.push(["Lỗi (Check Log)"]);
      } else {
        statusUpdates.push([currentStatus]);
      }
    } else {
      statusUpdates.push([currentStatus]); // Giữ nguyên nếu không thỏa mãn "old"
    }
  }

  // 4. Trả kết quả Status xuống cột H
  if (statusUpdates.length > 0) {
    sheet.getRange(12, 8, statusUpdates.length, 1).setValues(statusUpdates);
    SpreadsheetApp.flush();
  }

  ss.toast(`Đã di chuyển thành công ${successCount} file vào các thư mục _Old.`, "Dọn dẹp hoàn tất", 8);
}