# IDEA_REVIEW

## Purpose / Scope — Mục đích

Đánh giá ban đầu các idea R&D do nhóm đề xuất hoặc được chuyển từ PERSONAL_RESEARCH hay nguồn khác. Trọng tâm là xác định **Idea Validity** (idea có được hình thành đủ rõ để nhận diện và review hay chưa), vấn đề người dùng mà idea hướng đến và bằng chứng hiện có.

**Idea Validity không đồng nghĩa với Idea Feasibility.** Ở bước đầu, chỉ đánh giá validity; không yêu cầu chứng minh khả thi kỹ thuật, thiết kế chi tiết, kiểm tra cơ cấu, vật liệu, nhà cung cấp hoặc lập kế hoạch thử nghiệm. Chỉ mở rộng sang các nội dung này khi được yêu cầu hoặc khi kết quả review cho thấy cần thiết.

## Cấu trúc

Mỗi idea có một thư mục riêng, đặt theo tên ngắn gọn, dễ nhận diện:

`<IDEA_NAME>/`

- Dùng tên thư mục dạng ASCII, chữ thường, nối từ bằng dấu gạch ngang; tên đầy đủ của idea ghi trong báo cáo.
- Nếu trùng tên hoặc khó phân biệt, thêm mã idea ổn định vào tên thư mục.
- Mỗi lần review lưu thành một file Markdown trong thư mục idea. Báo cáo đầu tiên dùng tên `IDEA_REVIEW_YYYY-MM-DD.md`; các lần sau dùng ngày tương ứng.
- Không tạo thư mục con hoặc báo cáo phụ nếu chưa có nhu cầu thực tế.

## Nội dung review ban đầu

1. **Idea Validity — Đây có phải là một idea không?** Phân biệt idea với mô tả vấn đề, quan sát, yêu cầu tính năng hoặc giải pháp đã có. Nếu chưa rõ, nêu điểm cần làm rõ; không tự loại bỏ chỉ vì mô tả chưa hoàn chỉnh.
2. **Pain Point & User Benefit — Vấn đề và lợi ích cho người dùng:** Idea giải quyết khó khăn nào, cho nhóm người dùng nào và lợi ích dự kiến là gì? Phân biệt lợi ích được chứng minh với lợi ích giả định.
3. **Mô tả idea:** Diễn đạt ngắn gọn ý tưởng và cách nó dự kiến giải quyết vấn đề, chỉ dựa trên thông tin đầu vào.
4. **Khác biệt so với sản phẩm thị trường:** Nêu sản phẩm/giải pháp tương tự tìm được, điểm giống và khác. Không tìm thấy sản phẩm không đồng nghĩa với idea mới hoặc chưa từng tồn tại.
5. **Evidence — Bằng chứng tìm được:** Ghi nguồn, nội dung nguồn hỗ trợ và giới hạn của bằng chứng. Phân biệt bằng chứng, suy luận, giả định và điều chưa biết.

Phần kết luận ngắn gồm:

- **Initial Assessment:** Nhận định ban đầu về tính hợp lệ của idea; không phải kết luận feasibility.
- **Key Unknowns:** Thông tin còn thiếu có thể ảnh hưởng đến nhận định.
- **Recommended Next Action:** Bước tiếp theo phù hợp; có thể là làm rõ, tìm thêm bằng chứng, chuyển sang đánh giá sâu hơn hoặc tạm dừng.

Không chấm điểm hoặc xếp hạng idea ở bước này, trừ khi người dùng yêu cầu riêng.

## Quy tắc làm việc

- Áp dụng cùng một quy trình cho idea của team, idea cá nhân và idea từ PERSONAL_RESEARCH.
- Kiểm tra Knowledge liên quan khi phù hợp; không xem việc không có trong Knowledge là bằng chứng idea mới.
- Không bịa nguồn, bằng chứng, sản phẩm đối chiếu hoặc thông tin về người dùng.
- Gắn nhãn rõ nội dung là bằng chứng, suy luận, giả định, đề xuất hay chưa xác định khi điều đó ảnh hưởng đến kết luận.
- Chỉ mở rộng sang capability khác khi câu hỏi vượt khỏi review ban đầu hoặc người dùng yêu cầu.
- Không tự động chuyển idea sang POC, Deep Research hoặc Knowledge.
- **Mọi báo cáo và nội dung do IDEA_REVIEW tạo ra phải viết bằng tiếng Việt rõ ràng, tự nhiên, dễ hiểu với kỹ sư.** Giữ nguyên tên riêng, mã, tiêu chuẩn và thuật ngữ tiếng Anh cần thiết. Tham chiếu [VIETNAMESE_REWRITE](/TOPICS/E. RnD INNOVATION/1. CAPABILITIES/VIETNAMESE_REWRITE.md). Skill này chỉ biên tập ngôn ngữ, không bổ sung hoặc xác minh nội dung kỹ thuật.

## Routing / Working Rules — Định tuyến và quy tắc

Phương pháp dùng chung thuộc [1. CAPABILITIES](/TOPICS/E. RnD INNOVATION/1. CAPABILITIES/README.md). Review ban đầu không bắt buộc gọi EVALUATION, DEEP_RESEARCH hoặc VERIFICATION. Chỉ dùng khi câu hỏi và phạm vi thực sự cần.

## Handoff

`Nguồn idea (team / PERSONAL_RESEARCH) → IDEA_REVIEW/<IDEA_NAME>/ → review ban đầu → bước tiếp theo phù hợp`

Idea và báo cáo review là hồ sơ làm việc, không phải Released Knowledge. Mọi quyết định chuyển bước hoặc cập nhật Knowledge vẫn cần đúng quy trình và phê duyệt của con người.
