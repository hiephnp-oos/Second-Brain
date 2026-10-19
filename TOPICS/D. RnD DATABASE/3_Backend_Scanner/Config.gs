/**
 * ======================================================================================
 * FILE: Config.gs (Scanner Backend)
 * MODULE: Backend Configuration Engine
 * * DESCRIPTION:
 * - Nơi lưu cấu hình Mapping giữa Thư mục Drive (ID) và Cột đích trên Sheet.
 * - Khai báo các Rule mở rộng file (.pdf, .dwg) và đường dẫn Folder (Routing).
 * * DEPENDENCIES:
 * - Không có.
 * * TRIGGERS / USAGE:
 * - Gọi ngầm bởi Scanner.gs.
 * * AUTHOR: SheetScript Architect / Lixil R&D Team
 * LAST UPDATED: 28/05/2026 | VERSION: V10.1
 * * CHANGELOG:
 * - V10.1 - 28/05/26: [CLEANUP] Change CONFIG declaration from const to var per GAS anti AI slope rules, standardize header.
 * ======================================================================================
 */

var CONFIG = {
  SHEET_NAME: 'Sheet1', 
  LOG_ID: '1ZHvc7sz5A6NREplSuk2UVil4x4iPWqlMxQbTREyb7wg', // Đã chuyển LOG_ID vào đây
  ALLOWED_EXTENSIONS: ['.pdf', '.dwg', '.x_t', '.spt', '.sldprt', '.xlsx', '.cdr', '.gsheet'],
  
  // ================= 11.1 DRAWING =================
  DRAWING: {
    type: '11.1_Drawing',
    
    // Khai báo 1 lần duy nhất danh sách thư mục con
    subFolders: ['1. 1-7', '2. A-B', '3. Product'], 
    
    // Ánh xạ nhanh: 'ID Thư Mục' : 'Cột Đích'
    folders: {
      '1or4kyf26KmAJ3i-B3A14Yn28SZfMUeZb': 'Released',  // 11.1.1_Release
      '1R77bcaL_Rum012SY0peRSqPyEHDAeR88': '2D & pdf',  // 11.1.2_2D_Drawing 
      '1JHGxw6LUCgPWRa5hMsUM-JGUr_9NoO00': '3D & Corel' // 11.1.3_3D_Drawing
    }
  },

  // ================= 11.2 ACCESSORY =================
  ACCESSORY: {
    type: '11.2_Accessory',
    
    // Tạo Template dùng chung cho các rule giống nhau
    DEFAULT_TARGETS: { '1. Release': 'Released', '2. PDF': '2D & pdf', '3. Corel': '3D & Corel' },
    
    folders: {
      '1yJqPJiWd0seGQzD4chAycrjCxZCZ4-y4': {
        pathName: '11.2.1_Box&Lot',
        targets: 'DEFAULT' // Gõ 'DEFAULT' là bot tự hiểu lấy template trên
      },
      '1DFJClXCiOwcqQecPdcX6mpaalEIxOXJr': {
        pathName: '11.2.2_Package manual',
        targets: { '1. Release': 'Released', '2. Sheet': '3D & Corel' } // Trừ thằng này dị biệt thì gõ tay
      },
      '1jBjXvIDmEIHM70xzERNyyzBrF_oj1EwU': {
        pathName: '11.2.3_User manual',
        targets: 'DEFAULT'
      },
      '1aYg_Pw3AxeSF6VwXM0A-ibjv-guzmMwe': {
        pathName: '11.2.4_Label',
        targets: 'DEFAULT'
      }
    }
  }
};