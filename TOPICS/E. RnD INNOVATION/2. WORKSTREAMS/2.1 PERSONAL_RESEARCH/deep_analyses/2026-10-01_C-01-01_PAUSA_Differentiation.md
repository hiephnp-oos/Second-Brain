# Deep Analyze — C-01-01: Differentiation beyond PAUSA

**Ngày:** 2026-10-01  
**Workstream:** PERSONAL_RESEARCH  
**Candidate:** C-01-01 — Tạm dừng vòi sen theo trạng thái đặt tay sen  
**Decision question:** Có thể mở rộng C-01-01 thành một concept sản phẩm có DELTA thực chất so với PAUSA và các tiền lệ kỹ thuật gần nhất không?  
**Research depth:** Comparative mechanism / architecture analysis; desk research only.

## 1. Executive conclusion

**Kết luận hiện tại: Chưa tìm thấy DELTA đủ mạnh để phục hồi C-01-01 thành PRODUCT IDEA độc lập.** Cơ chế lõi “dock tay sen → tự động dừng/giảm dòng; nhấc tay sen → khôi phục dòng” đã có trong PAUSA và còn có tiền lệ sáng chế trực tiếp về handshower cradle điều tiết dòng theo trạng thái dock.

Việc thay Hall sensor bằng cơ cấu cơ khí, thay kiểu dock, hoặc cho phép pause một phần thay vì đóng hoàn toàn chưa tạo khác biệt đủ rõ: các biến thể này đã xuất hiện trong tài liệu PAUSA hoặc patent đối chiếu.

**Disposition đề xuất:** giữ C-01-01 = DROP như candidate sản phẩm độc lập; giữ MP-01 (giảm nước trong khoảng tạm ngừng thao tác) = WATCH như giả thuyết nhu cầu chưa xác thực. Không thay đổi trạng thái trên daily record trong báo cáo này.

## 2. Baseline: PAUSA đang giải quyết điều gì?

Theo trang dự án James Dyson Award 2026, PAUSA mô tả:
- Đặt tay sen vào dock để pause dòng; nhấc tay sen để resume.
- Dock và núm điều khiển dùng Hall sensor; giao diện không có lỗ xuyên để bảo vệ điện tử khỏi nước.
- Dòng nước nhấp nháy định kỳ để báo thời gian; núm lưu lượng có điểm dừng Eco cần thao tác xoay thêm để vượt qua.
- Mục tiêu là giảm nước trong các giai đoạn không cần dòng liên tục, đồng thời thay đổi thói quen người dùng.

**Giới hạn:** Đây là concept thiết kế được công bố, không phải xác nhận sản phẩm thương mại hay kết quả thử nghiệm độc lập. Mức tiết kiệm công bố trên trang dự án là claim của nhóm thiết kế, chưa được xác minh độc lập.

Nguồn: https://www.jamesdysonaward.org/en-US/2026/project/pausa

## 3. Tiền lệ kỹ thuật làm hẹp khoảng trống

### 3.1 Kohler — Pausing Handshower Cradle

US20240183136A1 mô tả cradle, waterway body và actuator điều tiết dòng khi tay sen được đặt vào dock. Nội dung bao gồm:
- Cơ cấu cơ khí: cradle xoay/di chuyển dưới trọng lượng tay sen, tác động plunger để giảm hoặc chặn dòng.
- Cấu hình điện tử: switch/controller và cảm biến vị trí, bao gồm cảm biến từ.
- Điều chỉnh mức giảm dòng: từ giảm một phần đến dừng hoàn toàn.
- Mô tả việc duy trì dòng nhỏ/điều kiện nhiệt độ trong một số cấu hình.

Patent được cấp US12534893B2 ngày 2026-01-27 theo nguồn tra cứu. Đây là tiền lệ cơ chế rất gần; báo cáo không đưa ra kết luận về phạm vi quyền hoặc freedom-to-operate.

Nguồn:
- https://patents.google.com/patent/US20240183136A1/en
- https://patents.justia.com/patent/12534893

### 3.2 Điều khiển theo vị trí người dùng — các tiền lệ khác

- US20250333939A1 mô tả điều khiển lưu lượng dựa trên vị trí/occupancy của người dùng so với vùng phun: giảm lưu lượng khi người dùng ra khỏi vùng phun và tăng lại khi họ bước vào.
- US11045828B2 mô tả hệ thống dùng occupancy, nhiệt độ, áp suất và van để giảm/dừng dòng khi khu vực tắm không có người, sau đó khôi phục khi phát hiện người dùng.

Các tiền lệ này không giống giao diện dock của PAUSA, nhưng cho thấy “tự động pause/giảm nước theo trạng thái sử dụng” là một không gian kỹ thuật đã có nhiều hướng triển khai.

Nguồn:
- https://patents.google.com/patent/US20250333939A1/en
- https://patents.google.com/patent/US11045828B2/en

## 4. Kiểm tra các hướng tạo khác biệt

| Hướng mở rộng | Khác PAUSA? | Đánh giá DELTA sau đối chiếu |
|---|---|---|
| Thay Hall sensor bằng cơ cấu cơ khí/plunger | Khác kiến trúc cảm biến | Không đủ: patent Kohler đã mô tả cơ cấu cradle/plunger cơ khí |
| Pause một phần, duy trì trickle để giữ nhiệt | Khác mức điều tiết | Không đủ: patent Kohler mô tả điều chỉnh từ giảm một phần đến dừng và duy trì nhiệt trong cấu hình nhất định |
| Tự động pause theo vị trí người dùng, không cần dock | Khác input/control | Khác PAUSA, nhưng đã có tiền lệ occupancy-based shower control; chưa có DELTA riêng cho C-01-01 |
| Thêm phản hồi thời gian, Eco mode hoặc hướng dẫn hành vi | Khác chi tiết giao diện | Không đủ: PAUSA đã mô tả flow feedback và Eco detent |
| Dock điều khiển phối hợp nhiều outlet/zone thay vì chỉ pause | Có thể tạo khác biệt cấp hệ thống | **PROPOSED / UNKNOWN:** có thể thay đổi kết quả người dùng, nhưng chưa xác định use case, lợi ích, kiến trúc, hoặc khoảng trống so với hệ thống diverter/zone control hiện có |
| Đo và tối ưu lượng nước/ năng lượng theo từng giai đoạn tắm | Có thể chuyển trọng tâm từ cơ cấu pause sang kết quả hệ thống | **PROPOSED / UNKNOWN:** cần xác thực nhu cầu, baseline và khả năng đo; không thể nhận là DELTA chỉ bằng cách thêm app/sensor |

## 5. Cơ hội tái định nghĩa — chỉ là giả thuyết, chưa phải idea được chấp nhận

Nếu muốn tiếp tục khai thác nhu cầu MP-01, hướng khác biệt cần chuyển khỏi “dock tự pause” sang một kết quả cấp hệ thống mà PAUSA không trực tiếp mô tả, ví dụ:

**Adaptive shower-zone / outlet orchestration:** điều phối các outlet theo giai đoạn sử dụng và trạng thái người dùng, với mục tiêu duy trì tiện nghi cần thiết trong khi giảm nước/năng lượng đo được; dock chỉ là một input tùy chọn, không còn là cơ chế sản phẩm cốt lõi.

Điều kiện để hướng này trở thành candidate:
1. Xác định use case cụ thể (ví dụ người dùng chuyển giữa handshower và overhead, hoặc cần tạm ngừng một outlet nhưng tiếp tục chức năng khác).
2. Chỉ rõ kết quả nào tốt hơn so với pause toàn hệ thống, pause tại handshower, hoặc điều khiển outlet thông thường.
3. Đo được nước và năng lượng tiết kiệm, thời gian chờ, ổn định nhiệt độ, lỗi khởi động lại và thao tác người dùng.
4. Kiểm tra prior art cho kiến trúc outlet/zone coordination trước khi gọi là khác biệt.
5. Chứng minh lợi ích bù được van, đường nước, cảm biến, điều khiển và yêu cầu an toàn bổ sung.

Không nên dùng hướng này để đổi tên C-01-01 rồi giữ lại như một idea đã hợp lệ. Nếu có bằng chứng nhu cầu và kiến trúc mới, hãy tạo candidate mới có DELTA riêng.

## 6. Ma trận bằng chứng và giới hạn

| Claim | Trạng thái | Cơ sở | Giới hạn |
|---|---|---|---|
| PAUSA mô tả dock đặt/nhấc tay sen để pause/resume | EVIDENCED | Trang dự án PAUSA | Concept công bố; không chứng minh hiệu năng thương mại |
| PAUSA dùng Hall sensor và có flow feedback/Eco detent | EVIDENCED | Trang dự án PAUSA | Mô tả của nhóm thiết kế |
| Patent Kohler mô tả cradle-actuated flow reduction/stop và cơ cấu plunger | EVIDENCED | US20240183136A1 / US12534893B2 | Không phải ý kiến pháp lý; chưa phân tích toàn bộ family/claims/status |
| Occupancy-based flow control đã được mô tả trong patent | EVIDENCED | US20250333939A1; US11045828B2 | Không đánh giá hiệu năng thực tế hoặc quyền còn hiệu lực |
| C-01-01 hiện không có DELTA vật chất đã chứng minh | INFERRED | So sánh candidate với PAUSA và các tiền lệ trên | Kết luận trong phạm vi desk research; không phải kết luận novelty/IP |
| Điều phối nhiều outlet/zone có thể tạo một concept khác | PROPOSED | Suy luận thiết kế từ khoảng cách chức năng với PAUSA | Chưa xác minh nhu cầu, precedent, feasibility hay lợi ích |

## 7. Decision & next action

**Decision đề xuất:**
- C-01-01: **DROP — không phục hồi dưới dạng dock-based automatic pause idea.**
- MP-01: **WATCH — chỉ tiếp tục nếu có bằng chứng độc lập về hành vi/lượng nước bị lãng phí và mức độ quan trọng với người dùng.**
- Hướng outlet/zone orchestration: chưa tạo candidate; chỉ mở research nếu người dùng muốn theo đuổi và có use case cụ thể.

**Nghiên cứu tiếp theo tối thiểu nếu mở lại:** phỏng vấn/quan sát người dùng hoặc khảo sát định lượng về hành vi để nước chảy trong lúc tạm ngừng; sau đó xác định một use case mà pause đơn thuần không giải quyết. Không làm prototype/feasibility cho C-01-01 hiện tại trước khi có DELTA và pain point rõ hơn.

**Không thực hiện:** cập nhật Knowledge Sheet, tuyên bố novelty, kết luận FTO, hoặc thay đổi trạng thái DROP trong daily record. Human review cần xác nhận trước mọi thay đổi disposition.
