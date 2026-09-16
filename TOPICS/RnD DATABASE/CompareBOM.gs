/**
 * ======================================================================================
 * FILE: CompareBOM.gs
 * MODULE: BOM Comparison Tool
 * * DESCRIPTION:
 * - So sánh cấu trúc (Component, Qty, Desc) của 2 mã BOM bất kỳ.
 * - Phân loại và Highlight trạng thái khác biệt (Added, Removed, Changed, Same).
 * - Tối ưu tốc độ xuất báo cáo bằng Batch Update API, bảo tồn định dạng Hyperlink cột Drawing.
 * * DEPENDENCIES:
 * - Config.gs (Đọc biến hệ thống).
 * * TRIGGERS / USAGE:
 * - Kích hoạt thủ công (Gắn vào Nút bấm/Macro trên sheet BOM Comparison).
 * * AUTHOR: SheetScript Architect / Hoàng Nguyên Phước Hiệp
 * LAST UPDATED: 17/06/2026 | VERSION: V4.3.0
 * * CHANGELOG:
 * - V4.3.0 - 17/06/26: Áp dụng Decomposition tách logic ra hàm buildComparisonResult_. Cập nhật xử lý lỗi tập trung qua ErrorUtils.
 * - V4.2 - 11/06/26: [FEATURE] Thêm cột Unit cho cả 2 vế. Cập nhật ARRAYFORMULA nhân STD Cost với Qty thực tế.
 * - V4.1 - 28/05/26: [CLEANUP] Remove emojis from alerts/comments, rename Map variables and private helpers per GAS anti AI slope rules.
 * - V4.0 - 24/04/26: So sánh ngang hàng giữa 2 SKU
 * - V3.1 - 13/04/26: [CRITICAL BUGFIX] Sửa lỗi Race Condition gây blank sheet do `clearContent` (Native) chạy đè lên `Values.update` (REST API). Bọc nháy đơn an toàn cho range string.
 * - V3.0 - 13/04/26: [ZERO-LAG] Chuyển đổi sang kiến trúc RAM Indexing. Tái sử dụng `BOM_INDEX` từ SearchBOM giúp tốc độ so sánh đạt ngưỡng tức thời. Bỏ deleteRows để chống giật UI.
 * - V2.6 - 13/04/26: [UX IMPROVEMENT] Phục hồi tính năng cắt gọt dòng thừa (Shrink to fit) để bảng báo cáo luôn hiển thị vừa khít với dữ liệu, không để lại các dòng trống (blank rows) gây mất thẩm mỹ ở cuối bảng.
 * - V2.5 - 13/04/26: [ZERO-LAG] Chuyển đổi sang kiến trúc RAM Indexing. Tái sử dụng `BOM_INDEX` từ SearchBOM giúp tốc độ so sánh đạt ngưỡng tức thời.
 * - V2.4 - 10/04/26: [PERFORMANCE] Tối ưu hóa UI bằng Advanced Sheets API (batchUpdate).
 * - V2.3 - 09/04/26: Cập nhật Custom Number Format cho cột Qty và Diff.
 * - V2.2 - 08/04/26: Fix lỗi mất màu header, bảo tồn hyperlink và tối ưu tốc độ ghi API.
 * ======================================================================================
 */

function compareBOM() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // [CONFIG INTEGRATION]
  const RESULT_SHEET_NAME = CONFIG.SHEETS.COMPARISON; 
  const COST_RAW_SHEET = CONFIG.SHEETS.SYS_COST;    

  let resultSheet = ss.getSheetByName(RESULT_SHEET_NAME);
  if (!resultSheet) {
    resultSheet = ss.insertSheet(RESULT_SHEET_NAME);
  }

  // Đọc B1, B2 (Vùng nhập liệu của User)
  const [bom1Raw, bom2Raw] = resultSheet.getRange("B1:B2").getValues();
  const bom1 = String(bom1Raw[0]).trim();
  const bom2 = String(bom2Raw[0]).trim();

  if (!bom1 || !bom2) {
    SpreadsheetApp.getUi().alert("Vui long nhap du BOM code tai B1 va B2");
    return;
  }

  // =======================================================
  // DATA LAYER: TRUY XUẤT TỪ RAM CACHE (BOM_INDEX)
  // =======================================================
  let index;
  try {
    index = getBomIndex_(); 
  } catch (e) {
    if (e.message === "BOM_INDEX_MISSING") {
      SpreadsheetApp.getUi().alert("Du lieu BOM_INDEX chua san sang.\n\nVui long go thu 1 ma ben tab 'Search BOM' de he thong nap du lieu vao RAM, sau do quay lai day thu lai.");
      return;
    }
    if (typeof handleError_ === 'function') {
      handleError_(e, "compareBOM (getBomIndex_)", "alert");
    } else {
      throw e;
    }
    return;
  }

  const list1 = index[bom1] || [];
  const list2 = index[bom2] || [];
  
  // =======================================================
  // LOGIC COMPARE ĐƯỢC TÁCH RA HÀM HELPER
  // =======================================================
  const outputBody = buildComparisonResult_(list1, list2);

  // =======================================================
  // GHI DỮ LIỆU & TỐI ƯU SHRINK/EXPAND (TỪ DÒNG 5 TRỞ ĐI)
  // =======================================================
  const startDataRow = 5; 
  const totalCols = 16; // Cập nhật: 16 cột do thêm 2 cột Unit
  const neededRows = startDataRow + outputBody.length - 1; 
  const currentRows = resultSheet.getMaxRows();

  // Xác định trạng thái đã setup UI tĩnh (Header) chưa
  const isInitialized = resultSheet.getRange("O3").getValue() === "RESULTS";

  // Gỡ filter cũ (nếu có) trước khi sửa cấu trúc
  if (resultSheet.getFilter()) {
    resultSheet.getFilter().remove();
  }

  // Co giãn số dòng cho khít với dữ liệu
  if (currentRows < neededRows) {
    resultSheet.insertRowsAfter(currentRows, neededRows - currentRows); 
  } else if (currentRows > neededRows) {
    resultSheet.deleteRows(neededRows + 1, currentRows - neededRows);
  }

  const finalMaxRows = resultSheet.getMaxRows();

  // Tẩy Content CHỈ VÙNG BODY (Giữ nguyên Header)
  if (finalMaxRows >= startDataRow) {
    resultSheet.getRange(startDataRow, 1, finalMaxRows - startDataRow + 1, totalCols).clearContent();
  }

  // Ghi Headers tĩnh và động (Row 3, 4) bằng SetValues (Siêu nhanh)
  const headers = [
    [`BOM 1: ${bom1}`, "", "", "", "", "", "", `BOM 2: ${bom2}`, "", "", "", "", "", "", "RESULTS", ""],
    ["No.", "Component", "Description", "STD cost", "Qty", "Unit", "", "No.", "Component", "Description", "STD cost", "Qty", "Unit", "", "Diff", "Status"]
  ];
  resultSheet.getRange("A3:P4").setValues(headers);

  // Ghi Data Body vào dòng 5 trở đi
  if (outputBody.length > 0) {
    resultSheet.getRange(startDataRow, 1, outputBody.length, totalCols).setValues(outputBody);
  }

  SpreadsheetApp.flush();

  // =======================================================
  // UI BATCH UPDATE PAYLOAD
  // =======================================================
  const sheetId = resultSheet.getSheetId();
  const batchRequests = [];

  const colorBlue = { red: 0.788, green: 0.855, blue: 0.973 };
  const colorYellow = { red: 1, green: 0.949, blue: 0.8 };
  const colorGray = { red: 0.9, green: 0.9, blue: 0.9 };
  const colorWhite = { red: 1, green: 1, blue: 1 };
  const colorDarkEmpty = { red: 0.8, green: 0.8, blue: 0.8 }; 
  const borderSolid = { style: "SOLID", color: { red: 0, green: 0, blue: 0 } };

  // 1. NHÓM SETUP TĨNH (CHỈ CHẠY 1 LẦN NẾU SHEET CHƯA SETUP)
  if (!isInitialized) {
    // Default Font cho toàn sheet
    batchRequests.push({
      repeatCell: {
        range: { sheetId: sheetId, startRowIndex: 2, endRowIndex: 1000, startColumnIndex: 0, endColumnIndex: totalCols },
        cell: { userEnteredFormat: { textFormat: { fontFamily: "Arial", fontSize: 10 }, verticalAlignment: "MIDDLE" } },
        fields: "userEnteredFormat(textFormat(fontFamily,fontSize),verticalAlignment)"
      }
    });

    // Merge Cells Header
    batchRequests.push(
      { mergeCells: { range: { sheetId: sheetId, startRowIndex: 2, endRowIndex: 3, startColumnIndex: 0, endColumnIndex: 6 }, mergeType: "MERGE_ALL" } },
      { mergeCells: { range: { sheetId: sheetId, startRowIndex: 2, endRowIndex: 3, startColumnIndex: 7, endColumnIndex: 13 }, mergeType: "MERGE_ALL" } },
      { mergeCells: { range: { sheetId: sheetId, startRowIndex: 2, endRowIndex: 3, startColumnIndex: 14, endColumnIndex: 16 }, mergeType: "MERGE_ALL" } }
    );

    // Tô màu Header
    batchRequests.push(
      { repeatCell: { range: { sheetId: sheetId, startRowIndex: 2, endRowIndex: 4, startColumnIndex: 0, endColumnIndex: 6 }, cell: { userEnteredFormat: { backgroundColor: colorBlue, textFormat: { bold: true }, horizontalAlignment: "CENTER" } }, fields: "userEnteredFormat(backgroundColor,textFormat.bold,horizontalAlignment)" } },
      { repeatCell: { range: { sheetId: sheetId, startRowIndex: 2, endRowIndex: 4, startColumnIndex: 7, endColumnIndex: 13 }, cell: { userEnteredFormat: { backgroundColor: colorYellow, textFormat: { bold: true }, horizontalAlignment: "CENTER" } }, fields: "userEnteredFormat(backgroundColor,textFormat.bold,horizontalAlignment)" } },
      { repeatCell: { range: { sheetId: sheetId, startRowIndex: 2, endRowIndex: 4, startColumnIndex: 14, endColumnIndex: 16 }, cell: { userEnteredFormat: { backgroundColor: colorGray, textFormat: { bold: true }, horizontalAlignment: "CENTER" } }, fields: "userEnteredFormat(backgroundColor,textFormat.bold,horizontalAlignment)" } }
    );

    // Tẩy màu cột Spacer (G, N) -> Index 6 và 13
    [6, 13].forEach(colIdx => {
      batchRequests.push({ repeatCell: { range: { sheetId: sheetId, startRowIndex: 2, endRowIndex: 1000, startColumnIndex: colIdx, endColumnIndex: colIdx + 1 }, cell: { userEnteredFormat: { backgroundColor: colorWhite } }, fields: "userEnteredFormat.backgroundColor" } });
    });

    // Viền khung Header
    batchRequests.push(
      { updateBorders: { range: { sheetId: sheetId, startRowIndex: 2, endRowIndex: 4, startColumnIndex: 0, endColumnIndex: 6 }, top: borderSolid, bottom: borderSolid, left: borderSolid, right: borderSolid, innerHorizontal: borderSolid, innerVertical: borderSolid } },
      { updateBorders: { range: { sheetId: sheetId, startRowIndex: 2, endRowIndex: 4, startColumnIndex: 7, endColumnIndex: 13 }, top: borderSolid, bottom: borderSolid, left: borderSolid, right: borderSolid, innerHorizontal: borderSolid, innerVertical: borderSolid } },
      { updateBorders: { range: { sheetId: sheetId, startRowIndex: 2, endRowIndex: 4, startColumnIndex: 14, endColumnIndex: 16 }, top: borderSolid, bottom: borderSolid, left: borderSolid, right: borderSolid, innerHorizontal: borderSolid, innerVertical: borderSolid } }
    );
  }

  // 2. NHÓM ĐỊNH DẠNG ĐỘNG (LUÔN CHẠY ĐỂ CẬP NHẬT BODY)
  
  // Tẩy trắng Data Body (Cách ly cột G, N khỏi bị reset)
  batchRequests.push(
    { repeatCell: { range: { sheetId: sheetId, startRowIndex: 4, endRowIndex: finalMaxRows, startColumnIndex: 0, endColumnIndex: 6 }, cell: { userEnteredFormat: { backgroundColor: colorWhite, textFormat: { bold: false, foregroundColor: { red: 0, green: 0, blue: 0 } } } }, fields: "userEnteredFormat(backgroundColor,textFormat(bold,foregroundColor))" } },
    { repeatCell: { range: { sheetId: sheetId, startRowIndex: 4, endRowIndex: finalMaxRows, startColumnIndex: 7, endColumnIndex: 13 }, cell: { userEnteredFormat: { backgroundColor: colorWhite, textFormat: { bold: false, foregroundColor: { red: 0, green: 0, blue: 0 } } } }, fields: "userEnteredFormat(backgroundColor,textFormat(bold,foregroundColor))" } },
    { repeatCell: { range: { sheetId: sheetId, startRowIndex: 4, endRowIndex: finalMaxRows, startColumnIndex: 14, endColumnIndex: 16 }, cell: { userEnteredFormat: { backgroundColor: colorWhite, textFormat: { bold: false, foregroundColor: { red: 0, green: 0, blue: 0 } } } }, fields: "userEnteredFormat(backgroundColor,textFormat(bold,foregroundColor))" } }
  );

  // Borders Body
  batchRequests.push(
    { updateBorders: { range: { sheetId: sheetId, startRowIndex: 4, endRowIndex: finalMaxRows, startColumnIndex: 0, endColumnIndex: 6 }, top: borderSolid, bottom: borderSolid, left: borderSolid, right: borderSolid, innerHorizontal: borderSolid, innerVertical: borderSolid } },
    { updateBorders: { range: { sheetId: sheetId, startRowIndex: 4, endRowIndex: finalMaxRows, startColumnIndex: 7, endColumnIndex: 13 }, top: borderSolid, bottom: borderSolid, left: borderSolid, right: borderSolid, innerHorizontal: borderSolid, innerVertical: borderSolid } },
    { updateBorders: { range: { sheetId: sheetId, startRowIndex: 4, endRowIndex: finalMaxRows, startColumnIndex: 14, endColumnIndex: 16 }, top: borderSolid, bottom: borderSolid, left: borderSolid, right: borderSolid, innerHorizontal: borderSolid, innerVertical: borderSolid } }
  );

  // Number Formats Body
  const applyNumberFormat = (cols, type, pattern) => {
    cols.forEach(c => {
      const formatConfig = { type: type };
      if (pattern) formatConfig.pattern = pattern;
      batchRequests.push({ repeatCell: { range: { sheetId: sheetId, startRowIndex: 4, endRowIndex: finalMaxRows, startColumnIndex: c, endColumnIndex: c + 1 }, cell: { userEnteredFormat: { numberFormat: formatConfig } }, fields: "userEnteredFormat.numberFormat" } });
    });
  };
  applyNumberFormat([0, 7], "TEXT");                        
  applyNumberFormat([3, 10], "NUMBER", '#,##0');             
  applyNumberFormat([4, 11], "NUMBER", '#,##0.000;-#,##0.000;"-"'); 
  applyNumberFormat([14], "NUMBER", '+#,##0;-#,##0;"-"');   

  // Row Highlights & Xám Ô Trống
  const dataRowCount = outputBody.length; 
  if (dataRowCount > 0) {
    let currentStatus = outputBody[0][15] !== "Same" ? "Diff" : "Same";
    let blockStart = 4; 
    let blockCount = 1;

    const addFormatBlock = (startR, countR, statusType) => {
      if (statusType === "Diff") {
        batchRequests.push({
          repeatCell: {
            range: { sheetId: sheetId, startRowIndex: startR, endRowIndex: startR + countR, startColumnIndex: 0, endColumnIndex: totalCols },
            cell: { userEnteredFormat: { textFormat: { bold: true, foregroundColor: {red: 192/255, green: 0, blue: 0} } } },
            fields: "userEnteredFormat.textFormat(bold,foregroundColor)"
          }
        });
      }
    };

    for (let i = 1; i < outputBody.length; i++) {
      const rowStatus = outputBody[i][15] !== "Same" ? "Diff" : "Same";
      if (rowStatus === currentStatus) {
        blockCount++;
      } else {
        addFormatBlock(blockStart, blockCount, currentStatus);
        blockStart = blockStart + blockCount;
        blockCount = 1;
        currentStatus = rowStatus;
      }
    }
    if (blockCount > 0) addFormatBlock(blockStart, blockCount, currentStatus);

    // Tô xám Block trống liên kề (Xám đậm)
    let emptyLeftStart = -1, emptyLeftCount = 0;
    let emptyRightStart = -1, emptyRightCount = 0;

    for (let i = 0; i < outputBody.length; i++) {
       const status = outputBody[i][15];
       const sheetRowIndex = i + 4; // Data bắt đầu từ rowIndex 4 (Row 5)

       if (status === "Added") {
          if (emptyLeftStart === -1) { emptyLeftStart = sheetRowIndex; emptyLeftCount = 1; }
          else { emptyLeftCount++; }
       } else {
          if (emptyLeftCount > 0) {
             batchRequests.push({ repeatCell: { range: { sheetId: sheetId, startRowIndex: emptyLeftStart, endRowIndex: emptyLeftStart + emptyLeftCount, startColumnIndex: 0, endColumnIndex: 6 }, cell: { userEnteredFormat: { backgroundColor: colorDarkEmpty } }, fields: "userEnteredFormat.backgroundColor" } });
             emptyLeftStart = -1; emptyLeftCount = 0;
          }
       }

       if (status === "Removed") {
          if (emptyRightStart === -1) { emptyRightStart = sheetRowIndex; emptyRightCount = 1; }
          else { emptyRightCount++; }
       } else {
          if (emptyRightCount > 0) {
             batchRequests.push({ repeatCell: { range: { sheetId: sheetId, startRowIndex: emptyRightStart, endRowIndex: emptyRightStart + emptyRightCount, startColumnIndex: 7, endColumnIndex: 13 }, cell: { userEnteredFormat: { backgroundColor: colorDarkEmpty } }, fields: "userEnteredFormat.backgroundColor" } });
             emptyRightStart = -1; emptyRightCount = 0;
          }
       }
    }
    if (emptyLeftCount > 0) batchRequests.push({ repeatCell: { range: { sheetId: sheetId, startRowIndex: emptyLeftStart, endRowIndex: emptyLeftStart + emptyLeftCount, startColumnIndex: 0, endColumnIndex: 6 }, cell: { userEnteredFormat: { backgroundColor: colorDarkEmpty } }, fields: "userEnteredFormat.backgroundColor" } });
    if (emptyRightCount > 0) batchRequests.push({ repeatCell: { range: { sheetId: sheetId, startRowIndex: emptyRightStart, endRowIndex: emptyRightStart + emptyRightCount, startColumnIndex: 7, endColumnIndex: 13 }, cell: { userEnteredFormat: { backgroundColor: colorDarkEmpty } }, fields: "userEnteredFormat.backgroundColor" } });
  }

  // =======================================================
  // THỰC THI BATCH UPDATE VÀ FILTER
  // =======================================================
  if (batchRequests.length > 0) {
    try {
      Sheets.Spreadsheets.batchUpdate({ requests: batchRequests }, ss.getId());
    } catch (e) {
      if (typeof handleError_ === 'function') {
        handleError_(e, "compareBOM (Batch Update UI)", "alert");
      } else {
        console.warn("API Failed: " + e.message);
        SpreadsheetApp.getUi().alert("Loi khi cap nhat giao dien: " + e.message);
      }
      return;
    }
  }

  if (!resultSheet.getFilter()) {
    resultSheet.getRange(4, 1, finalMaxRows - 3, totalCols).createFilter();
  }

  // Bơm công thức XLOOKUP nhân với Qty ($E$5:$E và $L$5:$L)
  const d5 = resultSheet.getRange("D5");
  const k5 = resultSheet.getRange("K5"); // Đã dịch từ J5 sang K5 do chèn thêm cột Unit
  
  // Công thức: IFERROR(XLOOKUP(...) * QTY, "#NA") -> Nếu Lookup trả về #NA thì phép nhân sinh lỗi, IFERROR sẽ bắt và trả về #NA chuẩn chỉ.
  const formulaD5 = `=ARRAYFORMULA((IF($B$5:$B<>"",IFERROR(XLOOKUP($B$5:$B,'${COST_RAW_SHEET}'!$G$2:$G,'${COST_RAW_SHEET}'!$AI$2:$AI,"#NA") * $E$5:$E, "#NA"),"")))`;
  const formulaK5 = `=ARRAYFORMULA((IF($I$5:$I<>"",IFERROR(XLOOKUP($I$5:$I,'${COST_RAW_SHEET}'!$G$2:$G,'${COST_RAW_SHEET}'!$AI$2:$AI,"#NA") * $L$5:$L, "#NA"),"")))`;
  
  if (d5.getFormula() !== formulaD5) d5.setFormula(formulaD5);
  if (k5.getFormula() !== formulaK5) k5.setFormula(formulaK5);

  SpreadsheetApp.flush();
  SpreadsheetApp.getActive().toast("So sanh hoan tat", "Compare Complete", 5);
}

/**
 * HÀM HELPER: Gom logic tính toán so sánh, sort, và chuyển đổi mảng ngang
 * private — không gọi trực tiếp từ client/dialog
 */
function buildComparisonResult_(list1, list2) {
  const compToDetailsMap1 = new Map();
  const compToDetailsMap2 = new Map();

  list1.forEach(item => compToDetailsMap1.set(item.o, { qty: item.q, desc: item.d, unit: item.u }));
  list2.forEach(item => compToDetailsMap2.set(item.o, { qty: item.q, desc: item.d, unit: item.u }));

  const components = Array.from(new Set([...compToDetailsMap1.keys(), ...compToDetailsMap2.keys()]));
  const rows = [];
  
  components.forEach(comp => {
    const item1 = compToDetailsMap1.get(comp);
    const item2 = compToDetailsMap2.get(comp);

    const q1 = item1 ? item1.qty : 0;
    const q2 = item2 ? item2.qty : 0;
    const desc = item1 ? item1.desc : (item2 ? item2.desc : "");
    const unit = item1 ? item1.unit : (item2 ? item2.unit : "");

    let status = "Same";
    if (item1 && !item2) status = "Removed";
    else if (!item1 && item2) status = "Added";
    else if (q1 !== q2) status = "Changed";

    const diff = q2 - q1; 
    rows.push([comp, desc, unit, q1, q2, diff, status]);
  });

  const regexCache = {
    numPattern: /^(\d+)([A-Z]?)-(\d+)(.*)/,
    aPattern: /^A-(\d{4,5})(.*)/,
    bPattern: /^B-(\d+)(.*)/,
    prefixPattern: /^([A-Z]{1,4})(\d*)-(.*)/
  };

  function getSortKey_(comp) {
    const upper = comp.toUpperCase();
    if (/^\d/.test(upper)) {
      const match = upper.match(regexCache.numPattern);
      if (match) {
        const subVerCode = (match[2] && match[2] !== "") ? match[2].charCodeAt(0) : -1;
        return [1, parseInt(match[1]), subVerCode, parseInt(match[3]), match[4] || ""];
      }
    }
    if (upper.startsWith("A-")) {
      const match = upper.match(regexCache.aPattern);
      if (match) return [2, parseInt(match[1]), match[2] || ""];
    }
    if (upper === "CL-1") return [3, 0];
    if (upper.startsWith("B-")) {
      const match = upper.match(regexCache.bPattern);
      if (match) return [4, parseInt(match[1]), match[2] || ""];
    }
    const prefixMatch = upper.match(regexCache.prefixPattern);
    if (prefixMatch) {
      return [5, prefixMatch[1], parseInt(prefixMatch[2] || "0"), /LOT/.test(prefixMatch[3]) ? 1 : 0, prefixMatch[3]];
    }
    return [6, upper];
  }

  const statusOrder = { "Same": 1, "Changed": 2, "Added": 3, "Removed": 4 };

  rows.sort((a, b) => {
    const sA = statusOrder[a[6]] || 99;
    const sB = statusOrder[b[6]] || 99;
    if (sA !== sB) return sA - sB;

    const keyA = getSortKey_(a[0]);
    const keyB = getSortKey_(b[0]);
    for (let i = 0; i < Math.max(keyA.length, keyB.length); i++) {
      if (keyA[i] === undefined) return -1;
      if (keyB[i] === undefined) return 1;
      if (keyA[i] < keyB[i]) return -1;
      if (keyA[i] > keyB[i]) return 1;
    }
    return 0;
  });

  const outputBody = [];
  let counter1 = 1;
  let counter2 = 1;

  rows.forEach((r) => {
    const comp = r[0], desc = r[1], unit = r[2], q1 = r[3], q2 = r[4], diff = r[5], status = r[6];
    let left = ["", "", "", "", "", ""];
    let right = ["", "", "", "", "", ""];

    if (status === "Same" || status === "Changed") {
      const itemNo1 = "'" + String(counter1 * 10).padStart(4, '0');
      const itemNo2 = "'" + String(counter2 * 10).padStart(4, '0');
      left = [itemNo1, comp, desc, "", q1, unit];
      right = [itemNo2, comp, desc, "", q2, unit];
      counter1++; 
      counter2++;
    } else if (status === "Removed") {
      const itemNo1 = "'" + String(counter1 * 10).padStart(4, '0');
      left = [itemNo1, comp, desc, "", q1, unit];
      counter1++;
    } else if (status === "Added") {
      const itemNo2 = "'" + String(counter2 * 10).padStart(4, '0');
      right = [itemNo2, comp, desc, "", q2, unit];
      counter2++;
    }

    outputBody.push([...left, "", ...right, "", diff, status]);
  });

  return outputBody;
}
//design by Hiep