# R&D Innovation — PERSONAL_RESEARCH Daily Report

**RUN_DATE:** `2026-11-25`  
**RUN_SLOT:** `01`  
**RUN_MODE:** `RE-RUN ĐỂ ĐÁNH GIÁ QUY TẮC MỚI (không phải lần chạy theo lịch)`  
**ARTIFACT_STATUS:** `DRAFT CHỜ REVIEW — KHÔNG THAY THẾ 2026-11-25.md (PR 195); KHÔNG ĐƯA VÀO main KHI CHƯA ĐƯỢC DUYỆT`

## Kết quả điều hành

| Kết quả | Số lượng |
|---|---:|
| KEEP | 0 |
| WATCH | 1 |
| DROP | 0 |
| Đủ điều kiện chuyển IDEA_REVIEW | 0 |
| Hướng nghiên cứu đóng trước khi hình thành candidate | 1 |
| Knowledge promotion | 0 |

Một candidate được giữ ở `WATCH` với trạng thái đóng `UNRESOLVED_EVIDENCE`: giữ lưu lượng cho nhánh ưu tiên khi nhiều cửa ra cùng hoạt động (`C-20261125-R2-01`, lớp `TECHNICAL ENABLER`). Đây chưa phải product idea. Nhu cầu có thật nhưng nguyên nhân gốc chủ yếu ở cấp hệ thống cấp nước, và hướng này liên quan trực tiếp tới `C-20261015-02`.

Bản chạy này áp dụng bộ quy tắc thử nghiệm mới (territory ledger, chuỗi nhu cầu, nhãn độ sâu bằng chứng, lớp tiền lệ, trạng thái kết quả tìm kiếm). Báo cáo chỉ nhằm đánh giá quy tắc, không nhằm tăng số KEEP.

## Phạm vi truy xuất lịch sử và giới hạn

- **Đã đọc từ `main`:** `README.md` gốc, `CLAW_DISCOVERY/README.md`, `2.1 PERSONAL_RESEARCH/README.md`, `Prompt.csv` (RS-10, RS-11, RS-12, GLOBAL; bản đã sửa ở nhánh quy tắc), `REVIEW_MEMORY.md`, các bản ghi `2026-10-13` đến `2026-10-19`.
- **Đã đọc từ nhánh chưa merge (không có trên `main`):** `2026-11-21` đến `2026-11-25` (các PR daily). Chỉ dùng để so sánh trùng lặp.
- **Không đọc được:** mọi bản ghi `2026-10-20` đến `2026-11-20`. Kiểm tra trùng lặp trong khoảng này là `UNKNOWN_COVERAGE`, không phải `NO_MATCH`.
- **Knowledge:** `RELEASED/Release_23Sep2026` tra bằng từ khóa trên Tech Radar, Competitor Tech, Sources. `BETA` không đối chiếu đầy đủ.
- **Chưa đọc:** `2.2 IDEA_REVIEW`, regression cases ngoài `CASES.md`, thư mục Drive "5. Claw Method History", báo cáo gốc N75.
- **Công cụ:** tìm kiếm và đọc trang web qua Firecrawl. Không có dữ liệu khiếu nại nội bộ, không có cơ sở dữ liệu sáng chế trả phí.

## RS-10 — Market Pull

### Territory của lần chạy

- **Territory:** hiệu năng phân bổ lưu lượng khi nhiều cửa ra (đầu mưa, vòi massage thân, tay sen) hoạt động đồng thời. Failure mode: cửa ra yếu hoặc không đều khi bật nhiều cửa.
- **Khác với 7 bản ghi gần nhất:** các bản `2026-11-21` đến `2026-11-25` xoay quanh dây sen xoắn, aroma, ổn định nhiệt độ, vi bọt, circularity, rò diverter, contrast shower, vệ sinh đường nước. Chỉ `C-20261015-02` (2026-10-15) chạm gần hướng này.
- **Next focus đề xuất:** hành vi sử dụng của người tắm ngồi/hạn chế vận động hoặc failure mode ở kết nối và ống mềm. Chưa khảo sát hôm nay.

### MP-01 — Cửa ra yếu hoặc không đều khi bật nhiều cửa

**Chuỗi nhu cầu**

| Bước | Nội dung | Trạng thái |
|---|---|---|
| Hành vi / failure mode | Hệ sen có đầu mưa, tay sen và nhiều vòi massage; khi bật nhiều cửa cùng lúc, lưu lượng ở từng cửa giảm và phân bổ không đều. | `EVIDENCED` (xem bằng chứng nhu cầu) |
| Hệ quả | Tia vòi massage mất cảm giác "đập", người dùng thất vọng với chất lượng tia. | `EVIDENCED` ở mức lời kể người dùng |
| Required function | Duy trì lưu lượng danh định cho cửa ưu tiên khi nguồn cấp không đủ cho tất cả cửa. | `INFERRED` |
| Engineering contradiction | Tổng lưu lượng danh định của các cửa vượt công suất nguồn/van, nhưng người dùng muốn bật đồng thời. | `INFERRED` |

**Hạng bằng chứng nhu cầu: `RECURRING`** (3 nguồn độc lập, đều đọc toàn văn, đều là diễn đàn tại Mỹ, năm 2008 đến 2017).

- Terry Love, 2017: hệ sáu đầu phun trên ống 1/2 inch, "áp thấp và dòng không đều". Chuyên gia nhận định ống 1/2 inch không đủ nguồn cho cả sáu đầu.
- Houzz, 2008: panel gồm tay sen, đầu mưa và sáu vòi massage; người dùng không hài lòng với áp ở vòi massage. Một người dùng khác báo cáo khi bật hai chế độ thì mỗi đầu giảm khoảng 30 đến 40 phần trăm (số ước lượng của người dùng, chưa kiểm chứng). Người hỏi cho biết hệ của họ chỉ cho dùng một cửa tại một thời điểm.
- plbg.com, năm không ghi: bốn vòi massage cộng đầu mưa 10 inch trên van 1/2 inch; người dùng quan sát che một vòi thì các vòi khác mạnh lên. Chuyên gia cho rằng giới hạn là công suất của van.

**Giới hạn của bằng chứng nhu cầu:** nguồn cũ, mẫu nhỏ, thiên về người tự lắp, không có dữ liệu định lượng về tỷ lệ hệ nhiều cửa ra hoặc tần suất khiếu nại. Dữ liệu khiếu nại nội bộ: `UNKNOWN` (không được cung cấp). Cả ba chuyên gia trong diễn đàn đều quy nguyên nhân về công suất đường ống/van, tức cấp hệ thống, không phải lỗi của fitting.

**Giải pháp hiện có (BEST EXISTING SOLUTION)**

| Giải pháp | Bằng chứng | Độ sâu |
|---|---|---|
| Tăng cỡ ống và van (ví dụ van nhiệt 3/4 inch kết hợp van điều lượng 3/4 inch) | Tài liệu Moen MF2917 nêu 3/4 inch ExactTemp: 17,0 gpm tại 45 psig; van 1/2 inch Moentrol ở cửa sen: 4,4 gpm tại 60 psig (khác áp thử, chỉ để so cỡ độ lớn) | `FULL_TEXT` (tài liệu hãng, bản 2010, `VENDOR_CLAIM`) |
| Bộ điều khiển số nhiều cửa ra có cài đặt lưu lượng theo từng cửa | Cùng tài liệu: ioDIGITAL nhiều cửa ra, 4 cửa full-flow 18,0 gpm tại 45 psig; một cửa ở chế độ Eco 1,7 gpm, Full-Flow 7,1 gpm | `FULL_TEXT` (tài liệu hãng, bản 2010, `VENDOR_CLAIM`); hành vi bù động hiện nay: `UNKNOWN` |
| Thiết kế chỉ cho một cửa hoạt động tại một thời điểm | Houzz (2008); quy định Washington | `FULL_TEXT` |
| Bơm tăng áp | Diễn đàn plbg.com | Cấp hệ thống, không phải fitting |
| Bộ hạn chế lưu lượng bù áp tại từng cửa ra | Chuyên gia plbg.com nói vòi massage có bộ hạn chế bù áp; trang Neoperl chỉ ở mức đoạn tóm tắt | `TITLE_OR_SNIPPET` cho Neoperl; không quyết định |

**Điều kiện quy định (EVIDENCED):** điều khoản `WAC 51-56-0400` (đã đọc trích dẫn trực tiếp) giới hạn tổng lưu lượng của mọi cửa ra do một van điều khiển ở 1,8 gpm tại 80 psi, hoặc hệ phải được thiết kế để chỉ một cửa hoạt động tại một thời điểm. Điều này cho thấy nhu cầu đồng thời bị giới hạn tại bang này. Quy định tại thị trường mục tiêu của ADTD: `UNKNOWN`.

**REMAINING LIMITATION:** khi nguồn không đủ cho tổng lưu lượng danh định, các cửa cùng thiếu và phân bổ không do người dùng kiểm soát; không có giải pháp thụ động nào trong các nguồn đã đọc nêu cơ chế ưu tiên cửa. Đây là `INFERRED`.

**MEANINGFUL DELTA (tiềm năng):** phân bổ lưu lượng ưu tiên hoặc theo tỷ lệ cố định giữa các cửa đang hoạt động, thụ động, không cần van số. Chưa được chứng minh.

**Disposition RS-10:** `WATCH`, trạng thái đóng `UNRESOLVED_EVIDENCE`. Lý do chưa đóng: tài liệu hiện hành của valve số nhiều cửa ra chưa được đọc, và tính nguyên nhân hệ thống so với fitting chưa được tách bạch.

### Hướng Market Pull đã đóng trước khi hình thành candidate

- **Bơm tăng áp / nâng cỡ đường ống:** giải pháp cấp hệ thống, đã được người dùng review DROP theo mẫu "water-system solution" (`REVIEW_MEMORY.md`, các mục 2026-09-23, 2026-09-24, 2026-09-28). Không tạo candidate. Kết quả tìm kiếm: `BASELINE` ở mức hệ thống; không đóng hướng fitting-level.

## RS-11 — Tech Push

Tìm theo chức năng: "chia lưu lượng cố định hoặc ưu tiên giữa các nhánh bất kể tải ở từng nhánh".

### TP-01 — Bộ chia dòng bù áp (tín hiệu từ thủy lực công nghiệp)

- **Source application:** thủy lực di động. Catalog Prince RD-200 mô tả van chia một dòng vào thành hai dòng ra gần bằng nhau (hoặc theo tỷ lệ với ống van đặc biệt) và duy trì tỷ lệ chia khi tải hai cổng ra khác nhau, miễn là dòng vào nằm trong dải cho phép. Độ sâu: `FULL_TEXT` (catalog hai trang, `VENDOR_CLAIM`).
- **Boundary conditions đã nêu trong catalog:** dải dòng 4 đến 30 gpm, chất lỏng dầu, áp tối đa 3000 psi. Sai số chia, độ giảm áp tối thiểu, giới hạn nhiệt độ: không nêu (`UNKNOWN`).
- **Liên hệ Knowledge:** `TR-055` (RELEASED, `WATCH`, `TRANSFER SIGNAL`) đã ghi cơ chế này.
- **Transfer viability so với fitting:** dải lưu lượng và áp lệch xa điều kiện sen (khoảng dưới 3 gpm mỗi cửa, 20 đến 80 psi). Nước nhiễm cặn, nhiệt độ nước nóng, tiếp xúc nước uống, kích thước, độ ồn, độ giảm áp: `UNKNOWN`. Thương mại hóa trong thủy lực không chứng minh dùng được trong sen.

**Capability Delta card**

| Mục | Nội dung | Trạng thái |
|---|---|---|
| Giới hạn vật lý hiện tại | Khi tổng lưu lượng danh định vượt công suất nguồn, mọi cửa cùng thiếu; mức thiếu từng cửa chưa có số đo | `INFERRED`; trị số `UNKNOWN` |
| Năng lực mới | Giữ lưu lượng cho cửa ưu tiên, chia phần dư theo tỷ lệ, không cần điện hoặc van số | `PROPOSED` |
| Ngưỡng kiểm thử | Sai lệch tỷ lệ lưu lượng theo áp nguồn trong dải 20 đến 80 psi và 0,5 đến 3 gpm mỗi cửa (ngưỡng do báo cáo đề xuất, chưa có số liệu hỗ trợ) | `PROPOSED` |
| Vì sao sản phẩm hiện có chưa làm được | Chưa chứng minh. Valve số (Mira, Moen) làm bằng điều khiển chủ động; bộ hạn chế bù áp từng cửa chưa được đọc toàn văn | `UNKNOWN` |
| Thành phần bị ảnh hưởng | Manifold/diverter của hệ nhiều cửa ra | `PROPOSED` |

**Disposition RS-11:** `WATCH` ở mức tín hiệu chuyển giao. Thiếu bằng chứng để nâng thành năng lực cấp fitting.

## RS-12 — Hội tụ và kiểm tra trùng lặp

### Sổ đối chiếu ngữ nghĩa

| Candidate ID | Problem / Outcome Family | Cơ chế | Đối chiếu | Kết quả kiểm tra trùng | Lớp | Disposition |
|---|---|---|---|---|---|---|
| `C-20261125-R2-01` | Hiệu năng nhiều đầu ra; giữ lưu lượng nhánh ưu tiên | Bộ chia dòng bù áp thụ động | `C-20261015-02` (daily 2026-10-15, ghi DUPLICATE/DROP, chưa có quyết định review của người dùng trong `REVIEW_MEMORY.md`); `TR-055` (RELEASED); `CT-012`, `CT-015` (RELEASED); `SRC-288` đến `SRC-291` | `RELATED_VARIANT` (không đọc được 2026-10-20 đến 2026-11-20: `UNKNOWN_COVERAGE` cho khoảng đó) | `TECHNICAL ENABLER` | `WATCH` |

### C-20261125-R2-01 — Ưu tiên lưu lượng thụ động giữa nhiều cửa ra

- **Discovery lane:** Market Pull + Tech Push. **Lớp:** `TECHNICAL ENABLER`.
- **Problem / opportunity:** cửa ra yếu hoặc không đều khi bật nhiều cửa (xem MP-01).
- **Existing solution / source technology:** valve số điều khiển theo tổ hợp cửa (Mira); manifold giới hạn tổng lưu lượng (Delta); nâng cỡ ống/van; bộ chia dòng bù áp trong thủy lực (`TR-055`).
- **DELTA / transferable capability:** phân bổ ưu tiên thụ động tại fitting, không cần van số. Chưa được chứng minh.
- **Proposed product/system response (`PROPOSED`):** bộ chia dòng ưu tiên đặt tại manifold hoặc diverter của hệ nhiều cửa ra.
- **User benefit / testable outcome (`PROPOSED`):** lưu lượng cửa ưu tiên giữ trong dung sai khi số cửa bật thay đổi và áp nguồn dao động.
- **Fitting application:** manifold / diverter.
- **Evidence status:** nhu cầu `RECURRING`; kiến trúc `PLAUSIBLE BUT UNVERIFIED`; tính khả thi trong điều kiện sen `UNKNOWN`.

**Phân loại tiền lệ quyết định (đã đọc yêu cầu bảo hộ)**

| Tiền lệ | Độ sâu | Lớp | Khớp tính năng |
|---|---|---|---|
| `US12163319B2` (Kohler Mira, hiệu lực): hệ có valve trộn số, mỗi bộ cửa ra có van riêng, valve số điều chỉnh nhiệt độ và lưu lượng của dòng chính tùy bộ cửa đang hoạt động | `CLAIMS_OR_SPEC_READ` (đã đọc yêu cầu bảo hộ độc lập 1) | `ALTERNATIVE` (cùng outcome giữ lưu lượng khi đổi tổ hợp cửa, khác kiến trúc: chủ động, dựa vào valve số) | Khớp: lưu lượng phụ thuộc tổ hợp cửa. Khác: điều khiển điện tử. Việc bảo hộ phân bổ ưu tiên thụ động: không thấy trong yêu cầu 1 (`UNKNOWN` với các yêu cầu còn lại) |
| `US20210039118A1` (Delta, hiệu lực): manifold có thiết bị hạn chế dòng đặt trước các van chọn cửa, giới hạn tổng lưu lượng theo ngưỡng bất kể chế độ | `CLAIMS_OR_SPEC_READ` (yêu cầu 1) | `ALTERNATIVE` (cùng nhóm outcome tuân thủ tổng lưu lượng, không phân bổ giữa cửa) | Khác: giới hạn tổng, không ưu tiên nhánh |
| `US11505926B2` (Delta): điều khiển chuyển chế độ gộp | `CLAIMS_OR_SPEC_READ` (yêu cầu 1) | `ADJACENT` | Không liên quan phân bổ lưu lượng |
| `US4095610A`: van cân bằng áp suất trộn nóng lạnh | `ABSTRACT_ONLY` | Chưa phân loại (không quyết định) | — |
| `US9032564` (Delta, hệ sen điện tử): trang không tải được | `UNKNOWN` | Chưa đọc | — |

**DELTA đã kiểm tra:** so với `C-20261015-02`, bản cũ đóng bằng nhãn DUPLICATE. Trong lần này, hai bằng sáng chế dùng làm tiền lệ được đọc yêu cầu bảo hộ và chỉ đạt lớp `ALTERNATIVE`, chưa phải `DIRECT`; nên nhãn DUPLICATE chưa đủ cơ sở ở mức yêu cầu bảo hộ cho hai tài liệu này. Báo cáo gốc N75 không tìm thấy, nên mức khớp với N75 vẫn `UNKNOWN`. Đây không phải kết luận rằng hướng mới.

**Quality Gate:** `WATCH`. Lý do: nhu cầu lặp lại nhưng nguyên nhân gốc thiên về cấp hệ thống; DELTA ở dạng thụ động còn là giả thuyết; thêm bộ chia làm tăng BOM và độ giảm áp mà lợi ích chưa định lượng; tiền lệ DIRECT chưa xác nhận.

**Search outcome:** `UNKNOWN` (chưa đủ độ sâu). Không có kết quả nào đủ để ghi `BASELINE`.
**Closure basis:** `UNRESOLVED_EVIDENCE`.

**Kiểm tra phản chứng:** tìm sáng chế về phân bổ lưu lượng tự động giữa nhiều cửa ra của sen. Kết quả (Mira, Delta) không phải phân bổ ưu tiên thụ động và không bác bỏ DELTA, nhưng cũng chưa xác nhận. Không tìm thấy tài liệu hãng nào nêu bù động theo cửa ở mức đủ để đóng hướng.

**Decision-critical gap và cách đóng**

| Gap | Vì sao quyết định | Bằng chứng cần để đóng | Loại nguồn |
|---|---|---|---|
| Hành vi bù lưu lượng thực tế của valve số nhiều cửa ra hiện hành | Nếu đã bù theo từng cửa, outcome đã có baseline | Tài liệu kỹ thuật hiện hành của Moen ioDIGITAL, Kohler Anthem, hansgrohe | Tài liệu nhà sản xuất |
| Bộ hạn chế bù áp từng cửa có đủ không | Nếu đủ trong dải làm việc, nhu cầu ưu tiên chỉ còn ở cấp nguồn | Tài liệu Neoperl PCR và thông số dải lưu lượng | Tài liệu nhà sản xuất |
| Yêu cầu bảo hộ đầy đủ của `US9032564`, `SRC-288` đến `SRC-290`, báo cáo N75 | Xác định `DIRECT` hay `ALTERNATIVE` | Toàn văn yêu cầu bảo hộ | Sáng chế, Knowledge |
| Quy mô nhu cầu | Quyết định hướng có đáng làm không | Dữ liệu khiếu nại/bảo hành nội bộ, tỷ lệ hệ nhiều cửa ra | Dữ liệu nội bộ (nếu có) |

**Điều kiện mở lại / đóng hướng**

- **Reopen condition:** bằng chứng thử cho thấy bộ chia thụ động giữ tỷ lệ lưu lượng trong dung sai ở 20 đến 80 psi và dưới 3 gpm mỗi cửa, với độ giảm áp chấp nhận được.
- **Đóng hướng (`BASELINE`) nếu:** tài liệu hiện hành cho thấy valve số hoặc bộ hạn chế bù áp đã đảm bảo lưu lượng từng cửa trong dải làm việc, hoặc yêu cầu bảo hộ đọc đầy đủ cho thấy tiền lệ `DIRECT`.
- **Đề nghị với người review:** xem xét lại nhãn `DUPLICATE` của `C-20261015-02` khi đã có đủ nguồn ở mức yêu cầu bảo hộ.

### Dừng tìm kiếm

- **Phạm vi hôm nay:** một territory (phân bổ lưu lượng nhiều cửa ra), ba diễn đàn, một tài liệu hãng, một quy định, năm sáng chế (ba đã đọc yêu cầu bảo hộ, một chỉ đọc tóm tắt, một không tải được), một catalog thủy lực.
- **Lý do dừng:** chạm ngưỡng đọc sâu tối đa ba nguồn quyết định cho candidate ở biên WATCH. Phần còn lại cần tài liệu hãng hiện hành và toàn văn sáng chế mà phiên này chưa truy cập được.
- **Không phải hard blocker.** Một trang sáng chế không tải được.

## Nguồn chính

- [Terry Love — Fixing low pressure and uneven flow to multi head body sprayers (2017)](https://terrylove.com/forums/index.php?threads/fixing-low-pressure-and-uneven-flow-to-multi-head-body-sprayers.70301/)
- [Houzz — Low Water Pressure with Body sprays on a shower panel](https://www.houzz.com/discussions/2515926/low-water-pressure-with-body-sprays-on-a-shower-panel)
- [plbg.com — Lack of Water Pressure from Body Sprays](https://www.plbg.com/forum/read.php?1,431435)
- [Moen — Shower Valve Options (MF2917)](https://assets.moen.com/moencom/documents/literature-center/MF2917.pdf)
- [WAC 51-56-0400](https://app.leg.wa.gov/wac/default.aspx?cite=51-56-0400)
- [US12163319B2 — Shower head with multiple valves and multiple outlets](https://patents.google.com/patent/US12163319B2/en)
- [US20210039118A1 — Flow restricting and diverting manifold for multiple function showerhead systems](https://patents.google.com/patent/US20210039118A1/en)
- [US11505926B2 — Multiple function shower systems including consolidated mode switching controls](https://patents.google.com/patent/US11505926B2/en)
- [US4095610A — Pressure equalizing shower valve](https://patents.google.com/patent/US4095610A/en)
- [Prince Manufacturing — Model RD-200 pressure compensated proportional flow divider](https://www.princehyd.com/portals/0/Literature/catalogSect-ModelRD200PD0-30GPM.pdf)

## Provenance và giới hạn

- Báo cáo do lần chạy lại để đánh giá quy tắc tạo ra; chưa có người review. Không cập nhật Knowledge Sheet, `REVIEW_MEMORY.md` hay file nào khác.
- Bằng chứng nhu cầu đến từ diễn đàn, mang tính định tính, nguồn cũ. Số 30 đến 40 phần trăm là ước lượng của một người dùng.
- Tài liệu Moen là bản 2010 (`VENDOR_CLAIM`), có thể không phản ánh sản phẩm hiện hành.
- Trích yêu cầu bảo hộ được diễn giải từ trang Google Patents; chỉ đọc yêu cầu độc lập 1 của từng tài liệu. Tình trạng pháp lý là tín hiệu từ trang, không phải kết luận pháp lý. Báo cáo không đánh giá tự do hoạt động hay tính mới.
- Báo cáo `2026-10-20` đến `2026-11-20` không đọc được; các bản `2026-11-21` đến `2026-11-25` chỉ có trên nhánh chưa merge.
- Không tự chuyển trạng thái sang `IDEA_REVIEW`.

**ĐỘ TIN CẬY: Thấp** — nhu cầu lặp lại trong ba nguồn nhưng cũ và định tính; DELTA thụ động chưa có bằng chứng thực nghiệm; độ phủ lịch sử và tài liệu hãng hiện hành chưa đầy đủ.
