/**
 * ======================================================================================
 * FILE: Export_Sparepart.gs
 * MODULE: Sparepart Level 1 Exporter
 * * DESCRIPTION:
 * - Module Export chuyên sâu xử lý song song 2 luồng SKU (OLD và NEW).
 * - Roll-up gộp cụm linh kiện, xử lý logic số nhiều (Pluralization: 1 pc -> 2 pcs).
 * - Ghost Copy Dual: Bốc hình ảnh trực tiếp từ B.Material (OLD) và ZMAT (NEW) sang file Report.
 * - Đọc dữ liệu Input từ Sheet "Maintenance" (A:OLD, B:NEW) từ dòng 4.
 * * DEPENDENCIES:
 * - File Target ID (Lấy từ Script Properties).
 * - Yêu cầu phân quyền Editor trên thư mục xuất file.
 * * TRIGGERS / USAGE:
 * - Kích hoạt thủ công (Gắn nút bấm trên tab Input_SKU).
 * * AUTHOR: SheetScript Architect / Hoàng Nguyên Phước Hiệp
 * LAST UPDATED: 17/06/2026 | VERSION: V6.6.0
 * * CHANGELOG:
 * - V6.6.0 - 17/06/26: Xóa bỏ hardcode TARGET_FILE_ID, chuyển sang đọc từ Script Properties. Áp dụng ErrorUtils.
 * - V6.5.0 - 28/05/26: [CLEANUP] Standardize alerts, toasts, remove emojis from HTML dialog string, and rename Maps per GAS anti AI slope rules.
 * - V6.4.0 - 08/04/26: Fix nguồn ảnh luồng NEW trỏ về ZMAT Sparepart, tối ưu API Batch Update.
 * ======================================================================================
 */

function exportLevel1Sparepart() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();
  const lock = LockService.getScriptLock();
  
  if (!lock.tryLock(30000)) {
    ui.alert("He thong dang ban xuat file cho mot nguoi dung khac. Vui long thu lai sau 30 giay.");
    return;
  }

  try {
    const props = PropertiesService.getScriptProperties();
    const TARGET_FILE_ID = props.getProperty('TARGET_FILE_ID');
    
    if (!TARGET_FILE_ID) {
      ui.alert("Lỗi: Chưa thiết lập Script Properties. Vui lòng chạy hàm setupScriptProperties() trong SystemUtils.gs trước.");
      return;
    }

    // 1. KIỂM TRA & ĐỌC SHEET INPUT TỪ "Maintenance"
    const INPUT_SHEET_NAME = "Maintenance";
    let inputSheet = ss.getSheetByName(INPUT_SHEET_NAME);
    
    if (!inputSheet) {
      if (typeof setupMaintenanceLayout === 'function') setupMaintenanceLayout();
      ui.alert(`Da tao sheet "${INPUT_SHEET_NAME}".\n\nVui long dan ma (Tu dong 4), sau do chay lai.`);
      return;
    }
    
    const lastRowInput = inputSheet.getLastRow();
    if (lastRowInput < 4) {
      ui.alert("Khu vuc INPUT SKU dang trong. Vui long nhap du lieu tu dong 4.");
      return;
    }
    
    // Đọc 2 cột X, Y (Cột 24, 25) do Zone Input đã bị dời vị trí
    const inputData = inputSheet.getRange(4, 24, lastRowInput - 3, 2).getValues();
    
    const oldList = [...new Set(inputData.map(r => String(r[0]).trim()).filter(Boolean))];
    const newList = [...new Set(inputData.map(r => String(r[1]).trim()).filter(Boolean))];

    ss.toast(`Dang phan tich ${oldList.length} OLD va ${newList.length} NEW SKUs...`, "System Scan", -1);

    // ==========================================
    // TẠO COMBINED LIST TRƯỚC KHI LOAD DATA
    // ==========================================
    const combinedList = [
      ...oldList.map(sku => ({ sku: sku, type: 'OLD' })),
      ...newList.map(sku => ({ sku: sku, type: 'NEW' }))
    ];

    // 2. LOAD HỆ THỐNG DATA
    const matSheet = ss.getSheetByName(CONFIG.SHEETS.SYS_MAT);
    const bomSheet = ss.getSheetByName(CONFIG.SHEETS.SYS_BOM);
    const bMatSheet = ss.getSheetByName(CONFIG.SHEETS.MATERIAL || "B. Material");
    
    const zBomSheet = ss.getSheetByName("ZBOM sparepart"); // Sheet mới cho list NEW (Lấy Text)
    const zMatSheet = ss.getSheetByName("ZMAT Sparepart"); // Sheet nguồn hình ảnh cho NEW (Lấy Ảnh)
    
    if (!matSheet || !bomSheet || !zBomSheet || !zMatSheet) {
      ui.alert("Loi: Thieu sheet he thong (ZVNMMMAT, ZVNPPBOM, ZBOM sparepart hoac ZMAT Sparepart)."); 
      return;
    }
    
    const matData = matSheet.getDataRange().getValues();
    const bomData = bomSheet.getDataRange().getValues();
    const zBomData = zBomSheet.getDataRange().getValues();
    
    // BỘ DỊCH MÃ (CHUNG)
    const sapToMatInfoMap = new Map();
    const inputCodeToSapMap = new Map(); 

    for (let i = 1; i < matData.length; i++) {
      const sapCode = String(matData[i][0]).trim(); 
      const matType = String(matData[i][2]).trim().toUpperCase(); 
      const oldCode = String(matData[i][3]).trim(); 
      const desc = String(matData[i][6]).trim();    

      if (sapCode) {
        sapToMatInfoMap.set(sapCode, { oldCode: oldCode, desc: desc, matType: matType });
        inputCodeToSapMap.set(sapCode.toUpperCase(), sapCode);
        if (oldCode) inputCodeToSapMap.set(oldCode.toUpperCase(), sapCode); 
      }
    }

    // MAP THÔNG TIN SKU
    const skuToDetailsMap = new Map();      
    const sapToUserSkusMap = new Map(); // Dùng cho luồng OLD

    combinedList.forEach(item => {
      const upperSku = item.sku.toUpperCase();
      const sap = inputCodeToSapMap.get(upperSku) || item.sku; 
      const info = sapToMatInfoMap.get(sap) || { oldCode: "N/A", desc: "N/A" };
      skuToDetailsMap.set(item.sku, { oldCode: info.oldCode, desc: info.desc, sapCode: sap });

      if (item.type === 'OLD') {
        if (!sapToUserSkusMap.has(sap)) sapToUserSkusMap.set(sap, []);
        sapToUserSkusMap.get(sap).push(item.sku);
      }
    });

    // =======================================================
    // 3. QUÉT DỮ LIỆU (TÁCH 2 LUỒNG)
    // =======================================================
    const oldSkuToComponentsMap = {}; 
    const newSkuToComponentsMap = {};

    // LUỒNG 1: QUÉT BOM CŨ (OLD)
    for (let i = 1; i < bomData.length; i++) {
      const row = bomData[i];
      const type = String(row[4]).toUpperCase();
      const altBom = String(row[5]);
      const parentSap = String(row[0]).trim(); 
      
      if ((type === "ZFIN" || type === "ZSEM") && altBom === "1" && sapToUserSkusMap.has(parentSap)) {
        const compSap = String(row[13]).trim();
        const compOldCode = sapToMatInfoMap.has(compSap) ? sapToMatInfoMap.get(compSap).oldCode : "";
        
        const compInfo = sapToMatInfoMap.get(compSap);
        if (compInfo && compInfo.matType === "ZPCK") continue;
        if (compOldCode.toUpperCase().startsWith("UM-")) continue;

        const compDesc = String(row[14]).trim();
        const rawQty = parseFloat(row[16]) || 0;
        const unit = String(row[17]).trim();
        
        const relatedSkus = sapToUserSkusMap.get(parentSap);
        relatedSkus.forEach(userSku => {
          if (!oldSkuToComponentsMap[userSku]) oldSkuToComponentsMap[userSku] = {};
          if (!oldSkuToComponentsMap[userSku][compSap]) {
            oldSkuToComponentsMap[userSku][compSap] = { desc: compDesc, oldCode: compOldCode, qty: rawQty, unit: unit };
          } else {
            oldSkuToComponentsMap[userSku][compSap].qty += rawQty;
          }
        });
      }
    }

    // LUỒNG 2: QUÉT BOM MỚI (NEW) TỪ "ZBOM sparepart" (Chỉ lấy Data Text)
    const validNewSkusSet = new Set(newList);
    for (let i = 1; i < zBomData.length; i++) {
      const productOldCode = String(zBomData[i][1]).trim(); // Cột B
      
      if (validNewSkusSet.has(productOldCode)) {
        const compSap = String(zBomData[i][2]).trim(); // Cột C
        const compOldCode = String(zBomData[i][3]).trim(); // Cột D
        const desc = String(zBomData[i][4]).trim(); // Cột E
        
        // Mặc định số lượng là 1pc cho mỗi dòng tìm thấy
        if (!newSkuToComponentsMap[productOldCode]) newSkuToComponentsMap[productOldCode] = {};
        if (!newSkuToComponentsMap[productOldCode][compSap]) {
          newSkuToComponentsMap[productOldCode][compSap] = { desc: desc, oldCode: compOldCode, qty: 1, unit: 'pc' };
        } else {
          newSkuToComponentsMap[productOldCode][compSap].qty += 1; // Cộng dồn nếu lặp linh kiện
        }
      }
    }

    // =======================================================
    // 4. GHOST COPY HÌNH ẢNH (DUAL SOURCES: B.Material & ZMAT Sparepart)
    // =======================================================
    let targetFile;
    try {
      targetFile = SpreadsheetApp.openById(TARGET_FILE_ID);
    } catch (e) {
      if (typeof handleError_ === 'function') {
        handleError_(e, "exportLevel1Sparepart (Mở file đích)", "alert");
      } else {
        ui.alert("Loi: Khong the mo file dich. Vui long kiem tra quyen truy cap.");
      }
      return;
    }

    let tempBMatSheetId = null;  let tempBMatSheet = null;
    let tempZMatSheetId = null;  let tempZMatSheet = null;
    
    const oldCodeToPicDataMap = new Map(); 
    const newCodeToPicDataMap = new Map(); 

    ss.toast("Dang dong bo thu vien hinh anh (OLD & NEW)...", "Image Sync", -1);
    
    // Ghost B.Material (Cho OLD)
    if (bMatSheet) {
      tempBMatSheet = bMatSheet.copyTo(targetFile);
      tempBMatSheet.setName("TMP_BMAT_" + new Date().getTime());
      tempBMatSheetId = tempBMatSheet.getSheetId();

      const bVals = bMatSheet.getDataRange().getValues();
      const bForms = bMatSheet.getDataRange().getFormulas();
      for (let i = 0; i < bVals.length; i++) {
        const code = String(bVals[i][0]).trim(); // Cột A
        if (code && bVals[i].length >= 13) {
          const hasImg = (String(bVals[i][12]).trim() !== "" || String(bForms[i][12]).trim() !== "");
          oldCodeToPicDataMap.set(code, { row: i, hasImage: hasImg }); 
        }
      }
    }

    // Ghost ZMAT Sparepart (Cho NEW) - Đọc từ Cột C và Cột S
    if (zMatSheet) {
      tempZMatSheet = zMatSheet.copyTo(targetFile);
      tempZMatSheet.setName("TMP_ZMAT_" + new Date().getTime());
      tempZMatSheetId = tempZMatSheet.getSheetId();

      const zMatVals = zMatSheet.getDataRange().getValues();
      const zMatForms = zMatSheet.getDataRange().getFormulas();
      
      for (let i = 0; i < zMatVals.length; i++) {
        if (zMatVals[i].length >= 19) { // Đảm bảo mảng đủ dài đến Cột S (Index 18)
          const code = String(zMatVals[i][2]).trim(); // Cột C (Index 2) là Old Code
          if (code) {
            const hasImg = (String(zMatVals[i][18]).trim() !== "" || String(zMatForms[i][18]).trim() !== "");
            newCodeToPicDataMap.set(code, { row: i, hasImage: hasImg }); 
          }
        }
      }
    }

    // =======================================================
    // 5. CHUẨN BỊ API PAYLOAD
    // =======================================================
    const addSheetRequests = [];
    const mergeAndStyleRequests = [];
    const imagePasteRequests = [];
    const borderRequests = [];
    const valueRequests = [];
    
    const colorRed = { red: 1.0, green: 0.0, blue: 0.0 };
    const borderSolid = { style: "SOLID", color: { red: 0, green: 0, blue: 0 } };
    const randomIdBase = Math.floor(Math.random() * 80000000) + 10000000;

    const missingImageTrackerMap = new Map();
    const SUMMARY_SHEET_ID = 8888888;
    addSheetRequests.push({ addSheet: { properties: { sheetId: SUMMARY_SHEET_ID, title: "SUMMARY", gridProperties: { columnCount: 3 } } } });

    // FORMAT CŨ: Không phân biệt OLD/NEW
    const summaryValues = [
      ["DANH SACH SKU DA XUAT", "", ""],
      ["#", "Ma SKU (Old Code)", "Link Toi Sheet"]
    ];

    combinedList.forEach((item, index) => {
      const sku = item.sku;
      const type = item.type;
      
      let safeSheetName = sku.substring(0, 31);
      const sheetId = randomIdBase + index; 
      const parentInfo = skuToDetailsMap.get(sku);
      
      addSheetRequests.push({
        addSheet: { properties: { sheetId: sheetId, title: safeSheetName, gridProperties: { columnCount: 10 } } }
      });
      
      summaryValues.push([
        index + 1,
        `${sku} (${parentInfo.sapCode})`,
        `=HYPERLINK("#gid=${sheetId}", "${sku}")`
      ]);

      const dataDict = type === 'OLD' ? oldSkuToComponentsMap : newSkuToComponentsMap;
      const components = dataDict[sku] ? Object.keys(dataDict[sku]) : [];
      
      const sheetValues = [
        [`=HYPERLINK("#gid=${SUMMARY_SHEET_ID}", "${sku} Sparepart list")`, "", "", "", "", ""],
        ["Product Article No.:", "", `${sku} (${parentInfo.sapCode})`, "", "", ""],
        ["Product Description:", "", `${parentInfo.desc}`, "", "", ""],
        ["Spare parts explode Drawing List Overview (VN Provide)", "", "", "", "", ""],
        ["#", "Spare part Article NO.", "Description", "Supplier (VN) Code", "Q'ty", "Picture"]
      ];
      
      components.forEach((compSap, i) => {
        const c = dataDict[sku][compSap];
        
        // --- LOGIC PLURALIZATION (Q'ty pc/pcs) ---
        let qtyStr = "";
        const u = (c.unit || "").toLowerCase();
        if (u === 'pc' || u === 'pcs' || u === '') {
          qtyStr = c.qty > 1 ? `${c.qty} pcs` : `${c.qty} pc`;
        } else {
          qtyStr = `${c.qty} ${u}`;
        }
        
        sheetValues.push([i + 1, compSap, c.desc, c.oldCode, qtyStr, ""]); 
        
        // --- XỬ LÝ HÌNH ẢNH THEO LUỒNG ---
        let hasImageInDB = false;
        const destRowIndex = 5 + i; // Dòng 6 thực tế => Index 5

        if (type === 'OLD') {
          const sourcePicData = oldCodeToPicDataMap.get(c.oldCode) ?? oldCodeToPicDataMap.get(compSap);
          if (sourcePicData && tempBMatSheetId !== null) {
            hasImageInDB = sourcePicData.hasImage;
            imagePasteRequests.push({
              copyPaste: {
                source: { sheetId: tempBMatSheetId, startRowIndex: sourcePicData.row, endRowIndex: sourcePicData.row + 1, startColumnIndex: 12, endColumnIndex: 13 }, // B.Material cột M (12)
                destination: { sheetId: sheetId, startRowIndex: destRowIndex, endRowIndex: destRowIndex + 1, startColumnIndex: 5, endColumnIndex: 6 }, // Cột F (5)
                pasteType: "PASTE_NORMAL"
              }
            });
          }
        } else if (type === 'NEW') {
          // Trích xuất hình ảnh từ ZMAT Sparepart thay vì ZBOM sparepart
          const sourcePicData = newCodeToPicDataMap.get(c.oldCode);
          if (sourcePicData && tempZMatSheetId !== null) {
            hasImageInDB = sourcePicData.hasImage;
            imagePasteRequests.push({
              copyPaste: {
                source: { sheetId: tempZMatSheetId, startRowIndex: sourcePicData.row, endRowIndex: sourcePicData.row + 1, startColumnIndex: 18, endColumnIndex: 19 }, // ZMAT Sparepart cột S (Index 18)
                destination: { sheetId: sheetId, startRowIndex: destRowIndex, endRowIndex: destRowIndex + 1, startColumnIndex: 5, endColumnIndex: 6 },
                pasteType: "PASTE_NORMAL"
              }
            });
          }
        }

        // TRACKING THIẾU ẢNH (CHỈ DÀNH CHO LUỒNG OLD THEO YÊU CẦU)
        if (!hasImageInDB && type === 'OLD') {
          const trackKey = `OLD_${compSap}`; 
          if (!missingImageTrackerMap.has(trackKey)) {
            missingImageTrackerMap.set(trackKey, { 
              oldCode: c.oldCode, 
              desc: c.desc, 
              source: "B.Material"
            });
          }
        }
      });
      
      if (components.length === 0) sheetValues.push(["", "Khong tim thay Component nao", "", "", "", ""]);
      valueRequests.push({ range: `'${safeSheetName}'!A1`, values: sheetValues });
      
      // --- FORMAT TỪNG SHEET ---
      const lastRowIndex = sheetValues.length;
      
      mergeAndStyleRequests.push(
        { mergeCells: { range: { sheetId: sheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 6 }, mergeType: "MERGE_ALL" } }, 
        { mergeCells: { range: { sheetId: sheetId, startRowIndex: 1, endRowIndex: 2, startColumnIndex: 0, endColumnIndex: 2 }, mergeType: "MERGE_ALL" } }, 
        { mergeCells: { range: { sheetId: sheetId, startRowIndex: 1, endRowIndex: 2, startColumnIndex: 2, endColumnIndex: 6 }, mergeType: "MERGE_ALL" } }, 
        { mergeCells: { range: { sheetId: sheetId, startRowIndex: 2, endRowIndex: 3, startColumnIndex: 0, endColumnIndex: 2 }, mergeType: "MERGE_ALL" } }, 
        { mergeCells: { range: { sheetId: sheetId, startRowIndex: 2, endRowIndex: 3, startColumnIndex: 2, endColumnIndex: 6 }, mergeType: "MERGE_ALL" } }, 
        { mergeCells: { range: { sheetId: sheetId, startRowIndex: 3, endRowIndex: 4, startColumnIndex: 0, endColumnIndex: 6 }, mergeType: "MERGE_ALL" } }  
      );

      mergeAndStyleRequests.push({ repeatCell: { range: { sheetId: sheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 6 }, cell: { userEnteredFormat: { textFormat: { bold: true, fontSize: 16 }, horizontalAlignment: "CENTER", verticalAlignment: "MIDDLE" } }, fields: "userEnteredFormat(textFormat,horizontalAlignment,verticalAlignment)" } });
      mergeAndStyleRequests.push({ repeatCell: { range: { sheetId: sheetId, startRowIndex: 1, endRowIndex: 3, startColumnIndex: 0, endColumnIndex: 2 }, cell: { userEnteredFormat: { textFormat: { bold: true, fontSize: 11 } } }, fields: "userEnteredFormat.textFormat" } });
      mergeAndStyleRequests.push({ repeatCell: { range: { sheetId: sheetId, startRowIndex: 1, endRowIndex: 3, startColumnIndex: 2, endColumnIndex: 6 }, cell: { userEnteredFormat: { textFormat: { foregroundColor: colorRed, fontSize: 11 } } }, fields: "userEnteredFormat.textFormat" } });
      mergeAndStyleRequests.push({ repeatCell: { range: { sheetId: sheetId, startRowIndex: 3, endRowIndex: 4, startColumnIndex: 0, endColumnIndex: 6 }, cell: { userEnteredFormat: { textFormat: { bold: true, foregroundColor: colorRed, fontSize: 11 } } }, fields: "userEnteredFormat.textFormat" } });
      mergeAndStyleRequests.push({ repeatCell: { range: { sheetId: sheetId, startRowIndex: 4, endRowIndex: 5, startColumnIndex: 0, endColumnIndex: 6 }, cell: { userEnteredFormat: { textFormat: { bold: true }, horizontalAlignment: "CENTER", verticalAlignment: "MIDDLE" } }, fields: "userEnteredFormat(textFormat,horizontalAlignment,verticalAlignment)" } });
      mergeAndStyleRequests.push({ repeatCell: { range: { sheetId: sheetId, startRowIndex: 5, endRowIndex: lastRowIndex, startColumnIndex: 0, endColumnIndex: 6 }, cell: { userEnteredFormat: { horizontalAlignment: "CENTER", verticalAlignment: "MIDDLE" } }, fields: "userEnteredFormat(horizontalAlignment,verticalAlignment)" } });

      borderRequests.push({ updateBorders: { range: { sheetId: sheetId, startRowIndex: 0, endRowIndex: 4, startColumnIndex: 0, endColumnIndex: 6 }, top: borderSolid, bottom: borderSolid, left: borderSolid, right: borderSolid, innerHorizontal: borderSolid, innerVertical: borderSolid } });
      borderRequests.push({ updateBorders: { range: { sheetId: sheetId, startRowIndex: 4, endRowIndex: lastRowIndex, startColumnIndex: 0, endColumnIndex: 6 }, top: borderSolid, bottom: borderSolid, left: borderSolid, right: borderSolid, innerHorizontal: borderSolid, innerVertical: borderSolid } });

      const colWidths = [40, 150, 250, 150, 80, 100];
      colWidths.forEach((w, colIdx) => {
        mergeAndStyleRequests.push({ updateDimensionProperties: { range: { sheetId: sheetId, dimension: "COLUMNS", startIndex: colIdx, endIndex: colIdx + 1 }, properties: { pixelSize: w }, fields: "pixelSize" } });
      });
      
      if (lastRowIndex > 5) {
        mergeAndStyleRequests.push({ updateDimensionProperties: { range: { sheetId: sheetId, dimension: "ROWS", startIndex: 5, endIndex: lastRowIndex }, properties: { pixelSize: 60 }, fields: "pixelSize" } });
      }
    });

    // --- BỔ SUNG VALUE & FORMAT CHO SHEET SUMMARY ---
    const skuTableEnd = summaryValues.length;

    summaryValues.push(["", "", ""]);
    summaryValues.push(["", "", ""]);

    const missingImgStartRow = summaryValues.length;
    // FORMAT CŨ: "DANH SÁCH LINH KIỆN THIẾU HÌNH ẢNH (BỔ SUNG TẠI B.MATERIAL)"
    summaryValues.push(["DANH SACH LINH KIEN THIEU HINH ANH (BO SUNG TAI B.MATERIAL)", "", ""]);
    summaryValues.push(["#", "Ma Linh Kien (Old Code)", "Mo ta (Description)"]);

    let missingCount = 0;
    missingImageTrackerMap.forEach((info, key) => {
      missingCount++;
      const compSap = key.split("_")[1];
      const displayCode = info.oldCode ? info.oldCode : compSap;
      summaryValues.push([missingCount, displayCode, info.desc]); // Hiển thị Description thay vì Source
    });

    if (missingCount === 0) {
      summaryValues.push(["-", "Tuyet voi! Tat ca linh kien deu da co hinh anh.", ""]);
    }

    const sumLastRow = summaryValues.length;
    valueRequests.push({ range: `'SUMMARY'!A1`, values: summaryValues });

    // FORMAT SUMMARY TÁCH 2 BẢNG
    mergeAndStyleRequests.push(
      { mergeCells: { range: { sheetId: SUMMARY_SHEET_ID, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 3 }, mergeType: "MERGE_ALL" } },
      { repeatCell: { range: { sheetId: SUMMARY_SHEET_ID, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 3 }, cell: { userEnteredFormat: { textFormat: { bold: true, fontSize: 14 }, horizontalAlignment: "CENTER", verticalAlignment: "MIDDLE", backgroundColor: { red: 0.85, green: 0.92, blue: 0.83 } } }, fields: "userEnteredFormat(textFormat,horizontalAlignment,verticalAlignment,backgroundColor)" } },
      { repeatCell: { range: { sheetId: SUMMARY_SHEET_ID, startRowIndex: 1, endRowIndex: 2, startColumnIndex: 0, endColumnIndex: 3 }, cell: { userEnteredFormat: { textFormat: { bold: true }, horizontalAlignment: "CENTER", verticalAlignment: "MIDDLE", backgroundColor: { red: 0.9, green: 0.9, blue: 0.9 } } }, fields: "userEnteredFormat(textFormat,horizontalAlignment,verticalAlignment,backgroundColor)" } },
      { repeatCell: { range: { sheetId: SUMMARY_SHEET_ID, startRowIndex: 2, endRowIndex: skuTableEnd, startColumnIndex: 0, endColumnIndex: 3 }, cell: { userEnteredFormat: { verticalAlignment: "MIDDLE" } }, fields: "userEnteredFormat.verticalAlignment" } },
      { repeatCell: { range: { sheetId: SUMMARY_SHEET_ID, startRowIndex: 2, endRowIndex: skuTableEnd, startColumnIndex: 0, endColumnIndex: 1 }, cell: { userEnteredFormat: { horizontalAlignment: "CENTER" } }, fields: "userEnteredFormat.horizontalAlignment" } }
    );
    borderRequests.push(
      { updateBorders: { range: { sheetId: SUMMARY_SHEET_ID, startRowIndex: 0, endRowIndex: skuTableEnd, startColumnIndex: 0, endColumnIndex: 3 }, top: borderSolid, bottom: borderSolid, left: borderSolid, right: borderSolid, innerHorizontal: borderSolid, innerVertical: borderSolid } }
    );

    mergeAndStyleRequests.push(
      { mergeCells: { range: { sheetId: SUMMARY_SHEET_ID, startRowIndex: missingImgStartRow, endRowIndex: missingImgStartRow + 1, startColumnIndex: 0, endColumnIndex: 3 }, mergeType: "MERGE_ALL" } },
      { repeatCell: { range: { sheetId: SUMMARY_SHEET_ID, startRowIndex: missingImgStartRow, endRowIndex: missingImgStartRow + 1, startColumnIndex: 0, endColumnIndex: 3 }, cell: { userEnteredFormat: { textFormat: { bold: true, fontSize: 13, foregroundColor: colorRed }, horizontalAlignment: "CENTER", verticalAlignment: "MIDDLE", backgroundColor: { red: 0.98, green: 0.85, blue: 0.85 } } }, fields: "userEnteredFormat(textFormat,horizontalAlignment,verticalAlignment,backgroundColor)" } },
      { repeatCell: { range: { sheetId: SUMMARY_SHEET_ID, startRowIndex: missingImgStartRow + 1, endRowIndex: missingImgStartRow + 2, startColumnIndex: 0, endColumnIndex: 3 }, cell: { userEnteredFormat: { textFormat: { bold: true }, horizontalAlignment: "CENTER", verticalAlignment: "MIDDLE", backgroundColor: { red: 0.9, green: 0.9, blue: 0.9 } } }, fields: "userEnteredFormat(textFormat,horizontalAlignment,verticalAlignment,backgroundColor)" } },
      { repeatCell: { range: { sheetId: SUMMARY_SHEET_ID, startRowIndex: missingImgStartRow + 2, endRowIndex: sumLastRow, startColumnIndex: 0, endColumnIndex: 3 }, cell: { userEnteredFormat: { verticalAlignment: "MIDDLE" } }, fields: "userEnteredFormat.verticalAlignment" } },
      { repeatCell: { range: { sheetId: SUMMARY_SHEET_ID, startRowIndex: missingImgStartRow + 2, endRowIndex: sumLastRow, startColumnIndex: 0, endColumnIndex: 1 }, cell: { userEnteredFormat: { horizontalAlignment: "CENTER" } }, fields: "userEnteredFormat.horizontalAlignment" } }
    );
    
    if (missingCount === 0) { 
      mergeAndStyleRequests.push({ mergeCells: { range: { sheetId: SUMMARY_SHEET_ID, startRowIndex: missingImgStartRow + 2, endRowIndex: sumLastRow, startColumnIndex: 1, endColumnIndex: 3 }, mergeType: "MERGE_ALL" } });
    }
    
    borderRequests.push(
      { updateBorders: { range: { sheetId: SUMMARY_SHEET_ID, startRowIndex: missingImgStartRow, endRowIndex: sumLastRow, startColumnIndex: 0, endColumnIndex: 3 }, top: borderSolid, bottom: borderSolid, left: borderSolid, right: borderSolid, innerHorizontal: borderSolid, innerVertical: borderSolid } }
    );

    // CHỈNH SIZE CHO CỘT TƯƠNG ỨNG STYLE CŨ
    mergeAndStyleRequests.push(
      { updateDimensionProperties: { range: { sheetId: SUMMARY_SHEET_ID, dimension: "COLUMNS", startIndex: 0, endIndex: 1 }, properties: { pixelSize: 50 }, fields: "pixelSize" } },
      { updateDimensionProperties: { range: { sheetId: SUMMARY_SHEET_ID, dimension: "COLUMNS", startIndex: 1, endIndex: 2 }, properties: { pixelSize: 280 }, fields: "pixelSize" } },
      { updateDimensionProperties: { range: { sheetId: SUMMARY_SHEET_ID, dimension: "COLUMNS", startIndex: 2, endIndex: 3 }, properties: { pixelSize: 300 }, fields: "pixelSize" } }
    );

    // =======================================================
    // 6. THỰC THI GHI ĐÈ FILE ĐÍCH
    // =======================================================
    try {
      const tmpProcessSheet = targetFile.insertSheet("TMP_PROCESS_" + new Date().getTime());
      
      const oldSheets = targetFile.getSheets();
      oldSheets.forEach(s => {
        const sId = s.getSheetId();
        if (sId !== tmpProcessSheet.getSheetId() && sId !== tempBMatSheetId && sId !== tempZMatSheetId) {
          targetFile.deleteSheet(s);
        }
      });

      ss.toast(`Dang render ${combinedList.length} Tabs & Paste hinh anh...`, "Rendering", -1);

      Sheets.Spreadsheets.batchUpdate({ requests: addSheetRequests.concat(mergeAndStyleRequests) }, TARGET_FILE_ID);
      Sheets.Spreadsheets.Values.batchUpdate({ valueInputOption: "USER_ENTERED", data: valueRequests }, TARGET_FILE_ID);
      
      const finalRequests = imagePasteRequests.concat(borderRequests);
      if (finalRequests.length > 0) {
        Sheets.Spreadsheets.batchUpdate({ requests: finalRequests }, TARGET_FILE_ID);
      }
      
      // Cleanup
      targetFile.deleteSheet(tmpProcessSheet);
      if (tempBMatSheet) targetFile.deleteSheet(tempBMatSheet);
      if (tempZMatSheet) targetFile.deleteSheet(tempZMatSheet);
      
    } catch (err) {
      if (typeof handleError_ === 'function') {
        handleError_(err, "exportLevel1Sparepart (Thực thi API)", "alert");
      } else {
        ui.alert("Loi trong qua trinh xuat de API: " + err.message);
      }
      if (tempBMatSheet) try { targetFile.deleteSheet(tempBMatSheet); } catch(e){}
      if (tempZMatSheet) try { targetFile.deleteSheet(tempZMatSheet); } catch(e){}
      return;
    }
    
    ss.toast("Da hoan tat tien trinh xu ly.", "Export Complete", 5);

    const html = HtmlService.createHtmlOutput(`
      <div style="font-family: Arial; padding: 20px; text-align: center;">
        <h3 style="color: #0F9D58;">CAP NHAT THANH CONG!</h3>
        <p>Da xuat <b>${combinedList.length}</b> tabs (${oldList.length} OLD + ${newList.length} NEW).</p>
        ${missingCount > 0 ? `<p style="color:red;font-size:13px;">Co ${missingCount} linh kien thieu hinh anh!</p>` : `<p style="color:#0F9D58;font-size:13px;">100% linh kien da co hinh anh!</p>`}
        <a href="${targetFile.getUrl()}" target="_blank" style="display:inline-block; padding:10px 20px; background:#1a73e8; color:white; text-decoration:none; border-radius:5px; font-weight:bold; margin-top:10px; font-size:13px;">MO FILE TAI DAY</a>
      </div>
    `).setWidth(350).setHeight(220);
    
    ui.showModalDialog(html, "Export Complete");
  } finally {
    lock.releaseLock();
  }
}

//design by Hiep