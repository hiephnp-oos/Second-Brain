# DNF R&D Database V4

Hệ thống quản lý dữ liệu R&D trên Google Sheets + Google Apps Script, gồm BOM, Material, Cost, Drawing, Search, Compare, Sparepart, Audit và Maintenance.

## Kiến trúc

V4 được tổ chức thành 3 lớp triển khai độc lập:

```text
DNF R&D Database
│
├── 1_Frontend_UI
│   └── Bound Script gắn với Spreadsheet chính
│       ├── Menu / Navigation
│       ├── HTML UI
│       ├── Wrappers.gs
│       ├── SheetManager.gs
│       └── ExportCode.gs
│
├── 2_Library_Core
│   └── Standalone Apps Script Library: LibDNF
│       ├── Library_Entry.gs       → Public API / Gateway
│       ├── Config.gs              → Single Source of Truth
│       ├── BOM / Search / Compare
│       ├── Import / Drawing / Sparepart
│       ├── Cost / Export / Logging
│       ├── System Health / Audit
│       └── Backup / Utilities
│
└── 3_Backend_Scanner
    └── Standalone Apps Script gắn với Spreadsheet Scanner
        ├── Scanner.gs
        ├── Rename.gs
        ├── Config.gs
        └── Menu.gs
```

## Bound Script ↔ Library

Frontend chỉ giữ UI, trigger và các hàm bridge. Business logic chính nằm trong LibDNF.

```text
Google Sheets / HTML
        ↓
1_Frontend_UI
        ↓
Wrappers.gs
        ↓
LibDNF
        ↓
Library_Entry.gs
        ↓
Core Modules
        ↓
Google Sheets / Drive
```

`Library_Entry.gs` là cổng API công khai. Frontend nên gọi Library thông qua các public function được expose tại đây, thay vì phụ thuộc trực tiếp vào implementation bên trong Library.

## Vai trò từng lớp

### 1_Frontend_UI — Bound Script

Gắn với Spreadsheet chính. Chịu trách nhiệm:
- Custom Menu và navigation.
- Render HTML dialog/sidebar.
- Nhận simple trigger như `onEdit`.
- Tạo time-driven trigger ở context của Spreadsheet.
- Bridge request từ UI sang LibDNF.

Không đặt business logic lớn tại đây.

### 2_Library_Core — LibDNF

Standalone Apps Script Library chứa logic dùng chung:
- Import dữ liệu SAP.
- Xây dựng và tìm kiếm BOM.
- Compare BOM.
- Global Search.
- BOM Cost.
- Drawing / Sparepart.
- System Health và Audit.
- Export và Logging.
- Backup và utility.

Đây là nơi ưu tiên sửa khi thay đổi nghiệp vụ hoặc logic hệ thống.

### 3_Backend_Scanner — Standalone Scanner

Project riêng cho tác vụ Drive/Drawing:
- Quét thư mục và file.
- Chuẩn hóa dữ liệu Drawing.
- Batch Rename và Reverse Lookup.
- Chạy schedule độc lập.

## Module chính

| Lớp | Module | Vai trò |
|---|---|---|
| Frontend | `Menu.gs` | Menu và điều hướng |
| Frontend | `Wrappers.gs` | Bridge Bound Script → LibDNF |
| Frontend | `ExportForm.html` | UI export |
| Frontend | `Sidebar.html` | UI tìm kiếm |
| Library | `Library_Entry.gs` | Public API / Router |
| Library | `Config.gs` | Cấu hình trung tâm |
| Library | `Import.gs` | Nhập dữ liệu SAP |
| Library | `A.BOM.gs` | BOM ETL |
| Library | `SearchBOM.gs` | Dựng và tìm BOM |
| Library | `CompareBOM.gs` | So sánh BOM |
| Library | `GlobalSearch.gs` | Tìm kiếm toàn hệ thống |
| Library | `SearchBOMcost.gs` | Định dạng và xử lý Cost |
| Library | `Export_Sparepart.gs` | Xuất Sparepart |
| Library | `Drawing_FolderScan.gs` | Đồng bộ Drawing |
| Library | `SystemHealth.gs` | Health Check |
| Library | `Audit_Protection.gs` | Audit / Protection |
| Library | `SystemLogs.gs` | Activity Log |
| Library | `Export_And_Log.gs` | Export + system log |
| Library | `SimpleBackup.gs` | Backup nhanh |
| Backend | `Scanner.gs` | Drive Scanner |
| Backend | `Rename.gs` | Batch Rename |

## Nguyên tắc phát triển

1. UI thay đổi → `1_Frontend_UI`.
2. Business logic thay đổi → `2_Library_Core`.
3. Drawing Scanner / Rename thay đổi → `3_Backend_Scanner`.
4. Thay đổi Public API → cập nhật `Library_Entry.gs` và kiểm tra `Wrappers.gs`.
5. Không đưa business logic trở lại Bound Script chỉ để xử lý lỗi cục bộ.
6. Không commit credential, webhook token hoặc secret vào repository.

## Cấu hình và triển khai

Frontend khai báo `LibDNF` trong `1_Frontend_UI/appsscript.json`. Library có project riêng và được phát hành/phiên bản hóa độc lập. Backend Scanner có project và cấu hình riêng.

Các ID Spreadsheet/Folder có thể nằm trong Config; credential nhạy cảm phải được cấp tại runtime hoặc qua cơ chế quản lý secret phù hợp.

## Source of Truth trong Second Brain

Toàn bộ source hiện tại được lưu trực tiếp dưới:

`TOPICS/RnD DATABASE/`

Cấu trúc bên trong thư mục này phải phản ánh đúng deployment architecture `1_Frontend_UI / 2_Library_Core / 3_Backend_Scanner`, không flatten các project thành một thư mục chung.

## Version

- Database architecture: V4
- Migration source: file `DNF_R&D_Database_V4_Hiep_FULL_16Sep26_0738.zip`
- Migration date: 16/09/2026
- Architecture: `Bound Script → LibDNF → Backend Scanner`
