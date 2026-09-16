/**
 * ======================================================================================
 * FILE: Config.gs
 * MODULE: System Configuration & Utilities
 * * DESCRIPTION:
 * - Đóng vai trò "Single Source of Truth" (Nguồn dữ liệu duy nhất) cho toàn bộ hệ thống.
 * - Quản lý tập trung tên Sheet, ID File, định mức Cache, và danh sách ADMINS.
 * - Cung cấp các hàm Helper dùng chung để đảm bảo tính nhất quán khi code thay đổi.
 * * DEPENDENCIES:
 * - Không có.
 * * TRIGGERS / USAGE:
 * - Được gọi nội bộ bởi các module khác trong hệ thống.
 * * AUTHOR: SheetScript Architect / Lixil R&D Team
 * LAST UPDATED: 17/06/2026 | VERSION: V1.4.0
 * * CHANGELOG:
 * - V1.4.0 - 17/06/26: Cập nhật header theo template chuẩn, bổ sung BOM_SEARCH_LAYOUT.
 * - V1.3.0 - 28/05/26: [CLEANUP] Standardize file header and comments per GAS anti AI slope rules.
 * ======================================================================================
 */

var CONFIG = {
  // ==============================
  // 1. CẤU HÌNH TÊN FILE HỆ THỐNG (SYSTEM FILES)
  // ==============================
  FILES: {
    // -- HTML Templates (Giao diện Frontend) --
    TEMPLATE_EXPORT: "ExportForm",           
    TEMPLATE_SEARCH: "Sidebar",  
    TEMPLATE_MANUAL: "UserManual",           // [UPDATE] Đã bổ sung

    // -- Script Files (Backend Logic) --
    SCRIPT_CONFIG:  "Config.gs",             
    SCRIPT_MENU:    "Menu.gs",               
    SCRIPT_IMPORT:  "Import.gs",             
    SCRIPT_BOM:     "A.BOM.gs",              
    SCRIPT_SEARCHBOM: "SearchBOM.gs",        // [UPDATE] Đã bổ sung
    SCRIPT_COMPARE: "CompareBOM.gs",         
    SCRIPT_SEARCH:  "Global Search.gs",      // [UPDATE] Sửa lại cho khớp dấu cách
    SCRIPT_DRAWING: "Drawing_FolderScan.gs", 
    SCRIPT_SPAREPART: "Export_Sparepart.gs", // [UPDATE] Đã bổ sung
    
    // -- System Health & Audit (Nhóm mới) --
    SCRIPT_HEALTH:  "SystemHealth.gs",       // [UPDATE] Đã bổ sung
    SCRIPT_AUDIT:   "Audit_Protection.gs",   // [UPDATE] Đã bổ sung

    // -- Utility Files --
    // SCRIPT_UNLOCK: Đã xóa theo changelog V2.4 Menu.gs
    SCRIPT_MANAGER: "SheetManager.gs",       
    SCRIPT_BACKUP:  "ExportCode.gs"          
  },

  // ==============================
  // 2. CẤU HÌNH TÊN SHEET (SHEET NAMES)
  // ==============================
  SHEETS: {
    // Nhóm Master Data
    HOMEPAGE: "HomePage",      
    BOM:      "A.BOM",         
    MATERIAL: "B. Material",   
    COST_SEARCH: "Search BOM cost", 
    SEARCH_RM: "Search RM",
    DRAWING:  "Total Drawing", 
    SUPPLIER: "Supplier",       
    LOG:      "Log",
    
    // Nhóm Output/Tools
    SEARCH_RESULT:  "Search BOM",      
    COMPARISON:     "BOM Comparison",  
    
    // Nhóm Maintenance & Sparepart [UPDATE] Đã bổ sung
    MAINTENANCE:    "Maintenance",
    ZMAT_SPAREPART: "ZMAT Sparepart",
    ZBOM_SPAREPART: "ZBOM sparepart",

    // Nhóm Sheet ẩn (System Raw Data)
    SYS_BOM:  "ZVNPPBOM",    
    SYS_MAT:  "ZVNMMMAT",    
    SYS_COST: "ZVNCOPCCE"    
  },

  // ==============================
  // 3. CẤU HÌNH NGUỒN DỮ LIỆU & LOG
  // ==============================
  SYSTEM: {
    SOURCE_ID_CELLS: {
      BOM_MASTER:  "H8",  
      MAT_MASTER:  "H9",  
      COST_MASTER: "H10"  
    },
    LOG_FILE_ID: '1ZHvc7sz5A6NREplSuk2UVil4x4iPWqlMxQbTREyb7wg',
    MAX_LOG_ROWS: 2000
  },

  // ==============================
  // 4. CẤU HÌNH LOGIC NGHIỆP VỤ
  // ==============================
STATUS_MAPPING: {
    ACTIVE: ["2", "", "Blank", "Active"], 
    IN_PROGRESS: ["0", "1", "1A", "24", "2A", "2P", "2S", "96", "97", "B", "C", "In progress"],
    BLOCKED: ["01", "02", "03", "04", "05", "06", "13", "14", "15", "95", "98", "99", "Blocked"],
    ACTIVE_SAP_ONLY: ["3", "4", "5", "Active (SAP only)"],
    DISCONTINUED: ["Discontinued"] // Legacy fallback
  },

  // ==============================
  // 5. CẤU HÌNH HIỆU NĂNG (CACHING)
  // ==============================
  CACHE_TIME: {
    SUGGESTIONS: 21600,  
    BASIC_INFO:  21600,  
    RELATIONS:   21600,  
    EXTRA_INFO:  21600   
  },

  // ==============================
  // 5.5 CẤU HÌNH LAYOUT TÌM KIẾM
  // ==============================
  BOM_SEARCH_LAYOUT: {
    START_ROW: 16,
    END_ROW: 119,
    get MAX_ROWS() { return this.END_ROW - this.START_ROW + 1; }
  },

  // ==============================
  // 6. CẤU HÌNH QUẢN TRỊ & FOLDER
  // ==============================
  ADMINS: [
    "phuochiep.hoang@lixil.com",
    "viet.lequoc@lixil.com",
    "dangthanh.nguyen@lixil.com",
    "thuan.le@lixil.com",
    "dinhcong.nguyen@lixil.com"
  ],
    MAINTENANCE_WEBHOOK: "", 

  SCANNER_BACKEND: {
    FILE_ID: '1F_SM0dSGRrxkZAtPrPn-GMBN3DS7rnNb-3sCU5CJnK4', 
    SHEET_NAME: 'Sheet1'
  }
};

/**
 * Hàm tiện ích: Kiểm tra user hiện tại có phải Admin không
 */
function isAdmin() {
  var me = Session.getEffectiveUser().getEmail();
  return CONFIG.ADMINS.includes(me);
}

/**
 * Hàm tiện ích: Map trạng thái D-Chain
 */
function getStatusFromDChain(code) {
  if (code === null || code === undefined || code.toString().trim() === "") {
      return "Active"; // Bắt case "Blank"
  }
  
  const strCode = code.toString().trim().toUpperCase();

  // Active
  const activeCodes = CONFIG.STATUS_MAPPING.ACTIVE.map(c => c.toUpperCase());
  if (activeCodes.includes(strCode) || strCode === "BLANK") return "Active";
  
  // In progress
  const inProgressCodes = CONFIG.STATUS_MAPPING.IN_PROGRESS.map(c => c.toUpperCase());
  if (inProgressCodes.includes(strCode)) return "In progress";

  // Blocked
  const blockedCodes = CONFIG.STATUS_MAPPING.BLOCKED.map(c => c.toUpperCase());
  if (blockedCodes.includes(strCode)) return "Blocked";
  
  // Discontinued (Giữ lại để tương thích ngược dù bảng mới không có)
  const discoCodes = CONFIG.STATUS_MAPPING.DISCONTINUED.map(c => c.toUpperCase());
  if (discoCodes.includes(strCode)) return "Discontinued";

  return "TBD"; // Trả về TBD nếu xuất hiện mã lạ
}

/**
 * [HELPER] Chuẩn hóa việc khóa Sheet cho Admin (V1.2 - Strict Mode)
 */
function applyStandardProtection(sheet, description, unprotectedA1Notations = ['A1']) {
  if (!sheet) return;

  const protections = sheet.getProtections(SpreadsheetApp.ProtectionType.SHEET);
  protections.forEach(p => p.remove());

  const protection = sheet.protect().setDescription(description);
  const admins = CONFIG.ADMINS;
  protection.addEditors(admins); 

  const currentEditors = protection.getEditors();
  currentEditors.forEach(user => {
    const email = user.getEmail();
    if (!admins.includes(email)) {
      try {
        protection.removeEditor(email);
      } catch(e) {
        // Bỏ qua nếu là Owner
      }
    }
  });

  if (protection.canDomainEdit()) {
    protection.setDomainEdit(false);
  }

  if (unprotectedA1Notations && unprotectedA1Notations.length > 0) {
    const ranges = unprotectedA1Notations.map(a1 => sheet.getRange(a1));
    protection.setUnprotectedRanges(ranges);
  }
}

//design by Hiep