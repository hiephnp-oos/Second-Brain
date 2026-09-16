# DNF R&D Database V4

> Hệ thống quản lý dữ liệu R&D toàn diện: BOM, Material, Cost, Drawing trên Google Sheets + Apps Script

Tích hợp SAP | Tự động hóa BOM | Quản lý Bản vẽ | Audit & Maintenance

---

## Mục lục

- [Giới thiệu](#giới-thiệu)
- [Kiến trúc Hệ thống](#kiến-trúc-hệ-thống)
- [Cây Thư mục](#cây-thư-mục)
- [Mô-đun Chính](#mô-đun-chính)
- [Kỹ thuật Đáng chú ý](#kỹ-thuật-đáng-chú-ý)
- [Cài đặt & Triển khai](#cài-đặt--triển-khai)
- [Tác giả](#tác-giả)

---

## Giới thiệu

Hệ thống quản lý dữ liệu R&D (BOM, Material, Cost, Drawing) trên Google Sheets + Apps Script.

**Nguồn dữ liệu chính:** Tích hợp SAP qua các bảng chuẩn (ZVNPPBOM, ZVNMMMAT, ZVNCOPCCE)

**Chức năng nổi bật:**
- Nhập dữ liệu từ SAP tự động
- Xây dựng cây BOM đa tầng với tìm kiếm nâng cao
- So sánh BOM giữa các SKU
- Quản lý linh kiện thay thế (Sparepart)
- Đồng bộ tài liệu bản vẽ từ Drive
- Kiểm tra tính toàn vẹn dữ liệu (Data Audit)
- Backup & Restore tự động

---

## Kiến trúc Hệ thống

```
┌─────────────────────────────────────────┐
│     Frontend Project (Apps Script)       │
│   DNF_R&D_Database_V4 [Main Spreadsheet] │
└──────────────────┬──────────────────────┘
                   │ (via Drive API)
                   │
┌──────────────────▼──────────────────────┐
│     Backend Project (Apps Script)        │
│   Document_Scanner [Scanner Spreadsheet] │
└─────────────────────────────────────────┘
```

**Giao tiếp:** Cross-Project qua Drive API  
**Single Source of Truth:** Config.gs riêng (tên Sheet, ID file, danh sách Admin)

---

## Cây Thư mục

### Frontend Project Structure

```
DNF_R&D_Database_V4/
├── appsscript.json              Cấu hình Apps Script (API, runtime)
│
├── CONFIG
│   └── Config.gs                Khai báo hệ thống: tên Sheet, ID file, Admin
│
├── UI & NAVIGATION
│   ├── Menu.gs                  Custom Menu, điều hướng Sheet, export PDF/Sheet
│   ├── ExportForm.html          Dialog HTML cho export
│   ├── UserManual.html          Hướng dẫn sử dụng
│   └── MaintenanceManual.html   Hướng dẫn Maintenance cho Admin
│
├── DATA INGESTION
│   └── Import.gs                Nhập dữ liệu từ SAP, làm sạch dữ liệu
│
├── BOM ENGINE
│   ├── A.BOM.gs                 Extract & Transform BOM từ ZVNPPBOM
│   ├── SearchBOM.gs             Xây dựng cây BOM đa tầng, tìm kiếm
│   └── CompareBOM.gs            So sánh BOM giữa 2 SKU
│
├── SEARCH & CACHE
│   ├── Global Search.gs         Fuzzy Search engine với in-memory cache
│   └── Sidebar.html             UI Sidebar autocomplete
│
├── API & ROUTING
│   └── Router.gs                Central API Router (MVC pattern)
│
├── EXPORT & REPORTING
│   ├── Export_Sparepart.gs      Xuất báo cáo linh kiện thay thế Level 1
│   └── Drawing_FolderScan.gs    Đồng bộ dữ liệu bản vẽ từ Backend
│
└── MAINTENANCE & AUDIT
    ├── SystemHealth.gs          Dashboard kiểm tra sức khỏe hệ thống
    ├── Audit_Protection.gs      Audit bảo mật, tự động sửa quyền
    ├── SheetManager.gs          Quản lý Sheet, build menu động
    └── ExportCode.gs            Backup toàn bộ source code
```

### Backend Project Structure

```
Document_Scanner/
├── appsscript.json              Cấu hình Backend
│
├── CONFIG
│   └── Config.gs                Cấu hình routing, folder Drive
│
├── FOLDER SCANNING
│   ├── Scanner.gs               Quét đệ quy Drive, phân tích tên file
│   └── Rename.gs                Tool đổi tên hàng loạt (Sync & Reverse Lookup)
│
└── MENU
    └── Menu.gs                  Menu Backend: Get Drawing, Scan, Rename
```

---

## Mô-đun Chính

### Frontend

| Mô-đun | Chức năng | Công nghệ |
|--------|---------|----------|
| **Config.gs** | Khai báo tên Sheet, ID file, danh sách Admin | Centralized config |
| **Menu.gs** | Custom Menu, export PDF/Sheet, logging | Sheets API, Stackdriver |
| **Import.gs** | Nhập dữ liệu SAP, làm sạch dữ liệu | batchUpdate API |
| **A.BOM.gs** | ETL BOM thô, map mã cũ ↔ SAP | XLOOKUP, REGEX |
| **SearchBOM.gs** | Xây dựng cây BOM đa tầng đệ quy | onEdit trigger |
| **CompareBOM.gs** | So sánh 2 SKU, highlight thay đổi | Diff algorithm |
| **Global Search.gs** | Tìm kiếm mờ (Fuzzy) với in-memory cache | Turbo Cache |
| **Router.gs** | Điều phối API gọi từ HTML → GAS | MVC pattern |
| **Export_Sparepart.gs** | Xuất báo cáo linh kiện thay thế | Song song luồng |
| **Drawing_FolderScan.gs** | Đồng bộ bản vẽ từ Backend | Cross-project API |
| **SystemHealth.gs** | Quét 7 Zone kiểm tra dữ liệu | Audit & Healing |
| **SheetManager.gs** | Build menu Category động | DocumentProperties |
| **ExportCode.gs** | Backup source code | Manual versioning |

### Backend

| Mô-đun | Chức năng | Công nghệ |
|--------|---------|----------|
| **Scanner.gs** | Quét đệ quy Drive, bóc tách Version/Revision | Drive API v2 |
| **Rename.gs** | Đổi tên file hàng loạt với kiểm tra trùng | Zero-API Validation |
| **Menu.gs** | Menu riêng: Get Drawing, Scan, Rename | Custom UI |

---

## Kỹ thuật Đáng chú ý

### 1. Sheets API v4 batchUpdate

Tránh vòng lặp `getRange().setValue()` chậm bằng cách:
- Đóng gói write/format/merge thành JSON payload duy nhất
- Giảm quota consumption và tăng tốc độ thực thi
- Gửi toàn bộ update trong một lần request

### 2. Data/Layout Separation

Tách rõ luồng xử lý dữ liệu khỏi luồng định dạng:
- Xóa content → Ghi data → Build layout
- Dễ bảo trì và debug
- Giảm phức tạp logic

### 3. Cache Chunking

Quản lý bộ nhớ đệm hiệu quả:
- Băm JSON lớn thành chunk nhỏ, lưu vào CacheService
- In-memory store cho BOM Map và Search Index
- Versioning để invalidate cache cũ

### 4. Cross-project LockService

Đảm bảo tính nhất quán khi nhiều user chạy cùng lúc:
- `LockService.getScriptLock()` ở các luồng ghi nhạy
- Tránh race condition
- Áp dụng cho Export, Rename, Drawing Sync

### 5. Persistent Temp Sheet

Tối ưu Revision History:
- Tái sử dụng sheet tạm cố định thay vì tạo/xóa liên tục
- Giảm rác trong Revision History
- Hiệu năng cao khi export PDF/Sheet liên tục

### 6. Zero-API Validation

Tiết kiệm quota và tăng tốc độ:
- Kiểm tra hợp lệ trực tiếp trên dữ liệu RAM đã tải
- Không gọi thêm API (Rename.gs)
- Giảm độ trễ

---

## Cài đặt & Triển khai

### Bước 1: Tạo Projects

Tạo 1 project Apps Script gắn với Spreadsheet Frontend  
Tạo 1 project Apps Script gắn với Spreadsheet Backend (Document Scanner)

### Bước 2: Bật Advanced Services

Cả 2 project cần bật:
- Sheets API v4
- Drive API v2 (bắt buộc cho Drawing_FolderScan.gs, Scanner.gs, Rename.gs)

### Bước 3: Cài thư viện

Cài BetterLog (Library ID khai báo trong appsscript.json Frontend)

### Bước 4: Cấu hình

Cấu hình Config.gs Frontend:
- ADMINS: Danh sách quản trị viên
- LOG_FILE_ID: ID file lưu log
- SCANNER_BACKEND.FILE_ID: ID Spreadsheet Backend

Cấu hình Config.gs Backend:
- Routing folder Drive
- Tên Sheet cho Scanner

### Bước 5: Cấp quyền

Chạy menu "Auth" lần đầu để tự động cấp quyền  
Xác nhận các permission yêu cầu

### Bước 6: Khởi động

Frontend: Reload Google Sheets → Chọn menu "Get Data" → "Import from SAP"  
Backend: Menu "Get Drawing" → Quét Drive folders

---

## Quy trình Sử dụng Cơ bản

**Bước 1: Import dữ liệu từ SAP**

Menu → Get Data → Import from SAP  
Hệ thống tự động làm sạch dữ liệu và rebuild BOM Index

**Bước 2: Tìm kiếm & Xây dựng BOM**

Vào sheet "Search BOM" → Nhập mã sản phẩm ở ô F5  
Hệ thống tự động dựng cây BOM đa tầng

**Bước 3: So sánh BOM**

Menu → BOM Tools → Compare BOM  
Chọn 2 SKU để so sánh (Added/Removed/Changed/Same)

**Bước 4: Xuất báo cáo**

Menu → Export → Chọn format (PDF, Sheet, Sparepart List)  
Hệ thống tự động format và gửi đến khu vực chỉ định

**Bước 5: Kiểm tra Sức khỏe**

Menu → Maintenance → System Health Check  
Quét 7 Zone dữ liệu, báo cáo các vấn đề

---

## Bảo mật & Quyền hạn

**Admin Authorization**  
Danh sách Admin quản lý trong Config.gs

**Sheet Protection**  
Auto-protect các sheet quan trọng (Raw Data)

**Audit Trail**  
Tất cả thao tác ghi log vào file Log riêng

**Range Protection**  
Tự động khóa/mở các Range theo role

---

## Lịch sử Phiên bản

| Phiên bản | Ngày | Thay đổi chính |
|-----------|------|---------------|
| **V4.0** | Jun 2026 | Kiến trúc lại với API-first, Cache Engine, Audit Dashboard |
| **V3.x** | 2025 | BOM Engine, Search, Compare |
| **V2.x** | 2024 | Master Data Management |
| **V1.0** | 2023 | Ban đầu |

---

## Tác giả

**Hoàng Nguyên Phước Hiệp** — SheetScript Architect  
GitHub: [hiephnp-oos](https://github.com/hiephnp-oos)

**Phiên bản hiện tại:** V4.x (June 2026)

---

## Tài liệu Liên quan

- [UserManual.html](./UserManual.html) — Hướng dẫn sử dụng chi tiết
- [MaintenanceManual.html](./MaintenanceManual.html) — Hướng dẫn Maintenance
- [Google Sheets API Documentation](https://developers.google.com/sheets/api)
- [Google Drive API Documentation](https://developers.google.com/drive)
- [Google Apps Script Documentation](https://developers.google.com/apps-script)

---

## Hỗ trợ & Liên hệ

Nếu gặp vấn đề hoặc có câu hỏi:
1. Kiểm tra UserManual.html (hướng dẫn cơ bản)
2. Chạy System Health Check (kiểm tra dữ liệu)
3. Xem Logs (ghi nhật ký lỗi)
4. Liên hệ với Admin

---

Made with dedication for DNF R&D Department
