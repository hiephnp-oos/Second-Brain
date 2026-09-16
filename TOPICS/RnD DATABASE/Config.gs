// DNF-R-D-database Config.gs
// Migrated from hiephnp-oos/DNF-R-D-database/main
// NOTE: Secrets/credentials from the source repository must not be copied into persistent AI memory or public source when identifiable as credentials.

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
    MAX_LOG_ROWS: 2000
  },
  STATUS_MAPPING: {
    ACTIVE: ["2", "", "Blank", "Active"],
    IN_PROGRESS: ["0", "1", "1A", "24", "2A", "2P", "2S", "96", "97", "B", "C", "In progress"],
    BLOCKED: ["01", "02", "03", "04", "05", "06", "13", "14", "15", "95", "98", "99", "Blocked"],
    ACTIVE_SAP_ONLY: ["3", "4", "5", "Active (SAP only)"],
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
  ADMINS: []
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
  if (admins.length > 0) protection.addEditors(admins);
  const currentEditors = protection.getEditors();
  currentEditors.forEach(user => {
    const email = user.getEmail();
    if (!admins.includes(email)) {
      try { protection.removeEditor(email); } catch(e) {}
    }
  });
  if (protection.canDomainEdit()) protection.setDomainEdit(false);
  if (unprotectedA1Notations && unprotectedA1Notations.length > 0) {
    const ranges = unprotectedA1Notations.map(a1 => sheet.getRange(a1));
    protection.setUnprotectedRanges(ranges);
  }
}

// Secret credentials intentionally omitted from migrated source.
