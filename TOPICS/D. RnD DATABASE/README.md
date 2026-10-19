# R&D Database

Entry point and durable topic context for the DNF R&D Database V4 project migrated into Second-Brain.

## Scope

R&D data management system development and maintenance covering BOM, Material, Cost, Drawing, Search, Compare, Sparepart, Audit, Maintenance, SAP integration, automation, and related Google Sheets / Apps Script implementation.

## Current Context

The DNF R&D Database is a Google Sheets + Google Apps Script system. The project source has been explicitly migrated into Second-Brain, so `TOPICS/D. RnD DATABASE/` is the detailed project source rather than only a link to the old repository.

The current architecture is V4 and is intentionally separated into three deployment layers: Bound Script frontend, standalone `LibDNF` library core, and standalone Backend Scanner.

## Status

- State: Maintenance
- Summary: The V4 DNF R&D Database has been migrated into Second-Brain with the three-layer architecture established.
- Direction: Maintain the migrated source and architecture; make implementation changes when concrete database requirements or defects require them.
- Last reviewed: 2026-10-19

## Working Principles

- Treat this topic as an archival backup of the V4 system that has already run in mass production, not as an active development or runtime-audit workstream.
- Preserve the source and its three deployment layers as received. Do not refactor production logic or perform routine runtime/functional audits unless the user explicitly requests them or a concrete backup-integrity issue is identified.
- UI, core library, and scanner files remain separated under `1_Frontend_UI`, `2_Library_Core`, and `3_Backend_Scanner` to preserve recoverability and traceability.
- Public API and deployment details are retained as source context; they do not imply that runtime behavior has been revalidated.
- **User-approved archival exception (2026-10-19):** preserve the existing `MAINTENANCE_WEBHOOK` setting in this archived source as explicitly requested. Do not remove or blank it during routine cleanup. This exception is specific to this backup and does not authorize adding other credentials.
- The repository is intended to be private. Private visibility reduces future public access but does not invalidate or erase prior exposure of a credential.

## Active Projects / References

### Deployment architecture

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

### Bound Script → Library

Frontend giữ UI, trigger và bridge functions. Business logic chính nằm trong `LibDNF`.

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

`Library_Entry.gs` là cổng API công khai. Frontend nên gọi Library thông qua các public function được expose tại đây thay vì phụ thuộc trực tiếp vào implementation bên trong Library.

### Main modules

| Layer | Module | Role |
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

### Configuration / deployment

Frontend khai báo `LibDNF` trong `1_Frontend_UI/appsscript.json`. Library có project riêng và được phát hành/phiên bản hóa độc lập. Backend Scanner có project và cấu hình riêng.

Các ID Spreadsheet/Folder có thể nằm trong Config. Ngoại lệ lưu trữ đã được user phê duyệt cho giá trị `MAINTENANCE_WEBHOOK` hiện có được ghi rõ trong Working Principles; không suy rộng ngoại lệ này sang credential mới.

### Source of Truth

Toàn bộ source hiện tại được lưu trực tiếp dưới:

`TOPICS/D. RnD DATABASE/`

Cấu trúc bên trong thư mục này phải phản ánh đúng deployment architecture `1_Frontend_UI / 2_Library_Core / 3_Backend_Scanner`, không flatten các project thành một thư mục chung.

## Decisions

- `TOPICS/D. RnD DATABASE/` là source chi tiết của dự án trong Second-Brain vì dự án đã được explicitly migrated.
- Business logic chính nằm trong `LibDNF`; frontend là UI/bridge layer và Backend Scanner là project độc lập.
- `Library_Entry.gs` là public API gateway của Library.
- Không flatten ba project/layer thành một codebase chung.

## Lessons

- Phân tách UI, business logic và scanner giúp thay đổi từng lớp mà không phá kiến trúc còn lại.
- Khi sửa nghiệp vụ, kiểm tra Library trước thay vì thêm logic lớn vào Bound Script.
- Source migrated phải giữ đúng cấu trúc triển khai để AI có thể định vị code theo vai trò.

## Routing

Use this topic for any task specifically concerning the DNF R&D Database.

Start with this README to understand the architecture, then route to the relevant project layer:

`1_Frontend_UI/` → UI, menu, trigger, bridge

`2_Library_Core/` → business logic and shared APIs

`3_Backend_Scanner/` → Drawing scan, rename, and scanner scheduling

Use the files inside this topic as the detailed source. Do not redirect project work to the old repository unless the user explicitly asks for historical/external comparison.

## Next

Maintain this README when the project's architecture, deployment model, durable development rules, or routing changes. Keep detailed implementation in the corresponding project source files.

## Version

- Database architecture: V4
- Migration source: `DNF_R&D_Database_V4_Hiep_FULL_17Oct26_1529.zip`
- Migration date: 17/10/2026
- Repository sync date: 19/10/2026
- Additional backend module: `3_Backend_Scanner/MoveOld.gs`
- Architecture: `Bound Script → LibDNF → Backend Scanner`
