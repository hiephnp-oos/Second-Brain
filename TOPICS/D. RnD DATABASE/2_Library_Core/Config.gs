/**
 * ======================================================================================
 * FILE: Config.gs
 * MODULE: System Configuration & Utilities
 * * DESCRIPTION:
 * - Đóng vai trò "Single Source of Truth" (Nguồn dữ liệu duy nhất) cho toàn bộ hệ thống.
 * - Quản lý tập trung tên Sheet, ID File, định mức Cache, và danh sách ADMINS.
 * - Cung cấp các hàm Helper dùng chung để đảm bảo tính nhất quán khi code thay đổi.
 * - [V2.0] Hoạt động dưới dạng Standalone Library Script thay vì Bound Script.
 * * DEPENDENCIES:
 * - Không có.
 * * TRIGGERS / USAGE:
 * - Được gọi nội bộ bởi các module khác trong hệ thống thông qua Public API của Library.
 * * AUTHOR: SheetScript Architect / Lixil R&D Team
 * LAST UPDATED: 07/09/2026 | VERSION: V2.0
 * * CHANGELOG:
 * - V2.0 - 07/09/26: [ARCHITECTURE] Chuyển đổi kiến trúc từ Bound Script sang Library Script để phục vụ gọi chéo (cross-script).
 * - V1.4.0 - 17/06/26: Cập nhật header theo template chuẩn, bổ sung BOM_SEARCH_LAYOUT.
 * - V1.3.0 - 28/05/26: [CLEANUP] Standardize file header and comments per GAS anti AI slope rules.
 * ======================================================================================
 */

var CONFIG = {
  FILES: {
    TEMPLATE_EXPORT: "ExportForm",
    TEMPLATE_SEARCH: "Sidebar",
    TEMPLATE_MANUAL: "UserManual",
    SCRIPT_CONFIG: "Config.gs",
    SCRIPT_MENU: "Menu.gs",
    SCRIPT_IMPORT: "Import.gs",
    SCRIPT_BOM: "A.BOM.gs",
    SCRIPT_SEARCHBOM: "SearchBOM.gs",
    SCRIPT_COMPARE: "CompareBOM.gs",
    SCRIPT_SEARCH: "Global Search.gs",
    SCRIPT_DRAWING: "Drawing_FolderScan.gs",
    SCRIPT_SPAREPART: "Export_Sparepart.gs",
    SCRIPT_HEALTH: "SystemHealth.gs",
    SCRIPT_AUDIT: "Audit_Protection.gs",
    SCRIPT_MANAGER: "SheetManager.gs",
    SCRIPT_BACKUP: "ExportCode.gs"
  },

  SHEETS: {
    HOMEPAGE: "HomePage",
    BOM: "A.BOM",
    MATERIAL: "B. Material",
    COST_SEARCH: "Search BOM cost",
    SEARCH_RM: "Search RM",
    DRAWING: "Total Drawing",
    SUPPLIER: "Supplier",
    LOG: "Log",
    SEARCH_RESULT: "Search BOM",
    COMPARISON: "BOM Comparison",
    MAINTENANCE: "Maintenance",
    ZMAT_SPAREPART: "ZMAT Sparepart",
    ZBOM_SPAREPART: "ZBOM sparepart",
    SYS_BOM: "ZVNPPBOM",
    SYS_MAT: "ZVNMMMAT",
    SYS_COST: "ZVNCOPCCE"
  },

  SYSTEM: {
    SOURCE_ID_CELLS: {
      BOM_MASTER: "H8",
      MAT_MASTER: "H9",
      COST_MASTER: "H10"
    },
    LOG_FILE_ID: '1ZHvc7sz5A6NREplSuk2UVil4x4iPWqlMxQbTREyb7wg',
    MAX_LOG_ROWS: 2000
  },

  STATUS_MAPPING: {
    ACTIVE: ["2", "", "Blank", "Active"],
    IN_PROGRESS: ["0", "1", "1A", "24", "2A", "2P", "2S", "96", "97", "B", "C", "In progress"],
    BLOCKED: ["01", "02", "03", "04", "05", "06", "13", "14", "15", "95", "98", "99", "4", "Blocked"],
    ACTIVE_SAP_ONLY: ["3", "5", "Active (SAP only)"],
    DISCONTINUED: ["Discontinued"]
  },

  CACHE_TIME: {
    SUGGESTIONS: 21600,
    BASIC_INFO: 21600,
    RELATIONS: 21600,
    EXTRA_INFO: 21600
  },

  BOM_SEARCH_LAYOUT: {
    START_ROW: 16,
    END_ROW: 119,
    get MAX_ROWS() { return this.END_ROW - this.START_ROW + 1; }
  },

  ADMINS: [
    "phuochiep.hoang@lixil.com",
    "viet.lequoc@lixil.com",
    "dangthanh.nguyen@lixil.com",
    "thuan.le@lixil.com"
  ],
  MAINTENANCE_WEBHOOK: "",

  SCANNER_BACKEND: {
    FILE_ID: '1MExatrxC7A8CgSio0iOV6mTB0KNH3eazLzA_xiDXOTE',
    SHEET_NAME: 'Sheet1'
  }
};

function isAdmin() {
  var me = Session.getEffectiveUser().getEmail();
  return CONFIG.ADMINS.includes(me);
}

function getStatusFromDChain(code) {
  if (code === null || code === undefined || code.toString().trim() === "") return "Active";
  const strCode = code.toString().trim().toUpperCase();
  const activeCodes = CONFIG.STATUS_MAPPING.ACTIVE.map(c => c.toUpperCase());
  if (activeCodes.includes(strCode) || strCode === "BLANK") return "Active";
  const inProgressCodes = CONFIG.STATUS_MAPPING.IN_PROGRESS.map(c => c.toUpperCase());
  if (inProgressCodes.includes(strCode)) return "In progress";
  const blockedCodes = CONFIG.STATUS_MAPPING.BLOCKED.map(c => c.toUpperCase());
  if (blockedCodes.includes(strCode)) return "Blocked";
  const discoCodes = CONFIG.STATUS_MAPPING.DISCONTINUED.map(c => c.toUpperCase());
  if (discoCodes.includes(strCode)) return "Discontinued";
  return "TBD";
}

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
      try { protection.removeEditor(email); } catch(e) {}
    }
  });
  if (protection.canDomainEdit()) protection.setDomainEdit(false);
  if (unprotectedA1Notations && unprotectedA1Notations.length > 0) {
    protection.setUnprotectedRanges(unprotectedA1Notations.map(a1 => sheet.getRange(a1)));
  }
}

//design by Hiep