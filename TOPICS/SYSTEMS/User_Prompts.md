# Prompt người dùng cho Second-Brain

Các prompt có thể tái sử dụng để tương tác với Second-Brain trên nhiều topic. Các prompt này được viết có chủ đích một cách rõ ràng và cụ thể để người dùng có thể nhắc lại những quy tắc vận hành quan trọng khi bắt đầu làm việc với một AI mới hoặc khi AI trước đó có dấu hiệu bỏ qua bước kiểm tra repository.

## Cách sử dụng

Các prompt trong tài liệu này được thiết kế để **sao chép và sử dụng trực tiếp**. Không cần cố rút ngắn prompt khi việc rút ngắn có thể làm mất một quy tắc quan trọng.

- Với công việc thông thường, dùng prompt phù hợp với loại nhiệm vụ.
- Với thay đổi GitHub hoặc thay đổi persistent memory, ưu tiên prompt có đầy đủ các bước kiểm tra.
- Khi AI bắt đầu đi chệch quy trình, có thể gửi lại prompt nhắc quy tắc thay vì tiếp tục để AI thực hiện sai.
- Các prompt này là **lớp củng cố cho AI**, không thay thế các quy tắc chuẩn trong `WORKFLOW.md` và `REPOSITORY_CONTRACT.md`.
- Các thuật ngữ kỹ thuật và mã phân loại như `ADD / UPDATE / REMOVE / NO_CHANGE` được giữ nguyên để thống nhất với workflow và validator.

## Bảng prompt tái sử dụng

| Mã | Prompt | Dùng khi |
|---|---|---|
| SB-01 | Đọc Second-Brain trước khi làm việc | Bắt đầu topic/nhiệm vụ mới |
| SB-02 | Tiếp tục công việc từ Second-Brain | Tiếp tục một topic/công việc đang có |
| SB-03 | Cập nhật Second-Brain theo đúng vòng đời repository | Cập nhật persistent memory |
| SB-04 | Xác định trạng thái mục tiêu trước khi sửa | Thay thế/di chuyển/dọn dẹp |
| SB-05 | Không quên xóa artifact cũ | Thay thế/đổi tên/di chuyển |
| SB-06 | Kiểm tra cả điều kiện dương và điều kiện âm | Dọn dẹp/tái cấu trúc |
| SB-07 | Đồng bộ toàn bộ repository bị ảnh hưởng | Thay đổi cấu trúc |
| SB-08 | Kiểm tra trạng thái cuối trước khi báo cáo hoàn tất | Thay đổi có rủi ro |
| SB-09 | Sử dụng đúng thứ tự ưu tiên của nguồn thông tin | Khi thông tin mâu thuẫn |
| SB-10 | Chỉ đọc ngữ cảnh nhỏ nhất nhưng đủ dùng | Truy xuất/nghiên cứu |
| SB-11 | Coi Handoff là trạng thái tạm thời | Chuyển giữa AI/hội thoại |
| SB-12 | Cải thiện cơ chế chung, không chỉ sửa lỗi đơn lẻ | Khi phát hiện lỗi của hệ thống |
| SB-13 | Giữ thay đổi nhiều file thành một thay đổi logic | Thay đổi nhiều file |
| SB-14 | Tuân thủ hợp đồng và cấu trúc repository | Bảo trì nói chung |
| SB-15 | Xác thực artifact dữ liệu theo quy ước của workstream | CSV/JSON/dataset/configuration |
| SB-16 | Prompt đầy đủ cho thay đổi Second-Brain | Thay đổi repository có rủi ro cao; dùng làm mặc định khi cần độ tin cậy cao |

## Nội dung prompt đầy đủ để sao chép

### SB-01 — Đọc Second-Brain trước khi làm việc

```text
Sử dụng Second-Brain cho nhiệm vụ này.

Trước khi làm việc:
1. Đọc `AI_MEMORY.md` trước.
2. Xác định topic liên quan.
3. Đọc `TOPICS/<topic>/README.md`.
4. Nếu topic có workstream liên quan, đọc README của workstream đó.
5. Chỉ đọc thêm artifact cần thiết cho nhiệm vụ hiện tại.
6. Xác định nguồn thông tin chuẩn cho phần việc đang làm.
7. Kiểm tra trạng thái repository thực tế trước khi đưa ra quyết định thay đổi.

Không bắt đầu sửa GitHub chỉ dựa trên giả định rằng repository đang ở trạng thái nào đó.
Không yêu cầu tôi nhắc lại thông tin đã có trong Second-Brain nếu thông tin đó đủ để tiếp tục công việc.
Sử dụng hội thoại hiện tại làm ngữ cảnh của nhiệm vụ và ưu tiên chỉ dẫn rõ ràng mới nhất của tôi.
```

### SB-02 — Tiếp tục công việc từ Second-Brain

```text
Tiếp tục công việc này từ Second-Brain.

Đọc theo thứ tự:
`AI_MEMORY.md` → README của topic liên quan → README của workstream liên quan (nếu có) → artifact cần thiết.

Sử dụng hội thoại hiện tại làm ngữ cảnh của nhiệm vụ đang thực hiện.
Không yêu cầu tôi nhắc lại thông tin đã có trong repository nếu thông tin đó đủ để tiếp tục.
Không tự giả định trạng thái mới nhất của artifact; khi trạng thái repository có ý nghĩa đối với nhiệm vụ, hãy kiểm tra trực tiếp GitHub.

Nếu phát hiện khác biệt giữa hội thoại hiện tại và memory cũ, ưu tiên chỉ dẫn rõ ràng hiện tại của tôi.
```

### SB-03 — Cập nhật Second-Brain theo đúng vòng đời repository

```text
Cập nhật Second-Brain cho nhiệm vụ này theo đúng vòng đời repository.

1. Đọc `AI_MEMORY.md` và xác định topic/workstream liên quan.
2. Đọc `WORKFLOW.md` và `REPOSITORY_CONTRACT.md` trước khi thực hiện thay đổi repository.
3. Kiểm tra trạng thái GitHub hiện tại; không dựa vào trạng thái giả định.
4. Xác định rõ trạng thái hiện tại và trạng thái mục tiêu.
5. Phân loại thay đổi là `ADD / UPDATE / REMOVE / NO_CHANGE` đối với memory; với artifact thì xác định rõ create / update / replace / move / delete / no-change.
6. Liệt kê trong kế hoạch những file/folder phải tồn tại, phải thay đổi và phải bị xóa.
7. Thực hiện toàn bộ thao tác create/update/delete cần thiết.
8. Đồng bộ các README, registry, reference, workflow hoặc artifact phụ thuộc nếu bị ảnh hưởng.
9. Chạy validation hiện có.
10. Thực hiện cả kiểm tra dương và kiểm tra âm.
11. Đọc lại các file bị ảnh hưởng và kiểm tra cây repository cuối cùng.
12. Chỉ báo cáo hoàn tất khi trạng thái mục tiêu thực sự tồn tại trên GitHub.

Quy tắc bắt buộc:
- Một GitHub tool call thành công chỉ chứng minh thao tác đã được thực hiện, không chứng minh nhiệm vụ đã hoàn tất.
- Tạo file mới không đồng nghĩa file cũ đã được thay thế.
- Nếu trạng thái mục tiêu yêu cầu xóa artifact cũ, phải thực hiện xóa và kiểm tra lại.
- Nếu không thể hoàn thành chính xác, phải nêu rõ giới hạn thay vì báo cáo như đã hoàn tất.
```

### SB-04 — Xác định trạng thái mục tiêu trước khi sửa

```text
Trước khi sửa GitHub, hãy xác định rõ `trạng thái hiện tại → trạng thái mục tiêu`.

Tôi muốn bạn kiểm tra và xác định:
- File/folder nào phải tồn tại sau khi hoàn thành.
- File/folder nào cần cập nhật.
- File/folder nào cần tạo mới.
- File/folder nào cần đổi tên hoặc di chuyển.
- File/folder nào phải xóa vì lỗi thời, bị thay thế, tạm thời, placeholder hoặc trùng lặp.
- Reference/path nào phải thay đổi.
- README, registry, workflow hoặc tài liệu nào bị ảnh hưởng.

Không coi việc tạo artifact mới là hoàn thành nếu artifact cũ vẫn còn trong khi trạng thái mục tiêu yêu cầu nó biến mất.
Sau khi xác định target state, hãy thực hiện thay đổi và kiểm tra repository thực tế có đúng target state hay không.
```

### SB-05 — Không quên xóa artifact cũ

```text
Hãy đặc biệt kiểm tra thao tác xóa.

Tạo một file mới không có nghĩa là file cũ đã được thay thế.
Nếu nhiệm vụ yêu cầu thay thế, đổi tên, di chuyển hoặc loại bỏ một artifact:
1. Xác định artifact cũ.
2. Tạo/cập nhật artifact mới nếu cần.
3. Cập nhật tất cả reference đang trỏ tới artifact cũ.
4. Xóa artifact cũ khi target state yêu cầu nó không còn tồn tại.
5. Kiểm tra lại GitHub để xác nhận artifact cũ thực sự đã biến mất.
6. Kiểm tra không còn reference đang hoạt động nào trỏ tới artifact cũ.
7. Kiểm tra không còn placeholder, file tạm hoặc duplicate phát sinh trong quá trình thay đổi.

Không được báo cáo hoàn tất chỉ vì thao tác create/update đã thành công.
```

### SB-06 — Kiểm tra cả điều kiện dương và điều kiện âm

```text
Sau khi thay đổi repository, hãy thực hiện hai loại kiểm tra.

KIỂM TRA DƯƠNG:
- File/folder bắt buộc có tồn tại không?
- Nội dung mới có đúng không?
- README/reference/registry bắt buộc có được cập nhật không?
- Artifact mới có đúng vai trò và đúng nguồn chuẩn không?

KIỂM TRA ÂM:
- Artifact cũ đã bị thay thế còn tồn tại không?
- Có file `.tmp`, `.temp`, `DELETE_ME`, placeholder hoặc staging không?
- Có duplicate artifact không?
- Có reference/path cũ còn tồn tại không?
- Có registry hoặc README nào vẫn trỏ tới trạng thái cũ không?
- Có artifact trung gian nào đáng lẽ phải biến mất nhưng vẫn còn không?

Chỉ báo cáo hoàn tất khi cả hai nhóm kiểm tra phù hợp với trạng thái mục tiêu.
```

### SB-07 — Đồng bộ toàn bộ repository bị ảnh hưởng

```text
Đừng chỉ sửa file trực tiếp được tôi nhắc tới. Hãy kiểm tra toàn bộ các lớp bị ảnh hưởng bởi thay đổi này.

Kiểm tra:
- `AI_MEMORY.md`
- README của topic
- README của workstream
- README gốc
- `WORKFLOW.md`
- `REPOSITORY_CONTRACT.md`
- artifact con
- reference/path
- registry/index
- validator hoặc quy tắc kiểm tra nếu thay đổi này làm phát sinh một invariant mới

Chỉ cập nhật những lớp thực sự bị ảnh hưởng; không tạo thêm nội dung chỉ để đối xứng.
Nhưng không được để một lớp phụ thuộc giữ trạng thái cũ trong khi source đã thay đổi.

Sau khi đồng bộ, kiểm tra lại repository cuối cùng và xác nhận không còn reference hoặc tài liệu nào mâu thuẫn với trạng thái mới.
```

### SB-08 — Kiểm tra trạng thái cuối trước khi báo cáo hoàn tất

```text
Không báo cáo hoàn tất ngay sau khi thực hiện GitHub tool call.

Hãy:
1. Đọc lại các file đã thay đổi.
2. Kiểm tra cây thư mục cuối cùng.
3. Kiểm tra các file bắt buộc có tồn tại.
4. Kiểm tra các file đã bị thay thế/xóa không còn tồn tại khi target state yêu cầu.
5. Kiểm tra reference/path không bị lỗi.
6. Kiểm tra README/registry/workflow đã đồng bộ nếu bị ảnh hưởng.
7. Chạy validator nếu có.
8. Kiểm tra cả điều kiện dương và điều kiện âm.

Chỉ sau khi các kiểm tra phù hợp đều đạt mới báo cáo hoàn tất.
Báo cáo kết quả repository thực tế, không chỉ liệt kê những thao tác AI đã cố gắng thực hiện.
Nếu có giới hạn khiến trạng thái mục tiêu chưa đạt, phải nói rõ giới hạn đó.
```

### SB-09 — Sử dụng đúng thứ tự ưu tiên của nguồn thông tin

```text
Khi có thông tin mâu thuẫn, sử dụng thứ tự ưu tiên sau:

1. Chỉ dẫn rõ ràng mới nhất của người dùng.
2. Dữ liệu dự án/nguồn thông tin authoritative.
3. Artifact hiện tại của workstream.
4. README của topic.
5. `AI_MEMORY.md`.
6. Handoff/trạng thái nhiệm vụ hiện tại.
7. Suy luận của AI.

Không được biến suy luận thành dữ liệu authoritative mà không nói rõ.
Nếu không chắc chắn, đánh dấu là suy luận/giả định/chưa xác minh.
Khi thông tin mới sửa hoặc thay thế memory cũ, hãy cập nhật đúng scope thay vì tạo thêm một statement song song gây mâu thuẫn.
```

### SB-10 — Chỉ đọc ngữ cảnh nhỏ nhất nhưng đủ dùng

```text
Hãy sử dụng Second-Brain theo nguyên tắc ngữ cảnh nhỏ nhất nhưng đủ dùng.

Bắt đầu từ:
`AI_MEMORY.md → Topic README → Workstream README → Relevant artifact`

Chỉ đọc sâu hơn khi nhiệm vụ cần.
Không đọc toàn bộ repository nếu không cần thiết.
Không bỏ qua Topic README chỉ vì bạn đã biết tên file cần sửa.

Nếu nhiệm vụ là audit toàn bộ repository, khi đó mới mở rộng phạm vi đọc theo yêu cầu audit.
Mục tiêu là đủ context để làm đúng, không phải đọc càng nhiều càng tốt.
```

### SB-11 — Coi Handoff là trạng thái tạm thời

```text
Sử dụng Handoff như trạng thái tạm thời để tiếp tục công việc, không coi Handoff là nguồn authoritative cao hơn repository.

Sau khi route tới topic/workstream:
1. Đọc Handoff nếu có.
2. Dùng Handoff để hiểu mục tiêu, quyết định, phát hiện và next step của nhiệm vụ đang tiếp tục.
3. Đối chiếu thông tin quan trọng với repository và nguồn authoritative khi cần.
4. Nếu Handoff đề xuất thay đổi persistent memory, phân loại `ADD / UPDATE / REMOVE / NO_CHANGE` và kiểm tra theo `WORKFLOW.md` trước khi ghi.
5. Không tự động đưa toàn bộ nội dung Handoff vào memory.

Handoff phục vụ continuity của nhiệm vụ; GitHub repository mới là source of truth của persistent memory.
```

### SB-12 — Cải thiện cơ chế chung, không chỉ sửa lỗi đơn lẻ

```text
Khi phát hiện một lỗi trong Second-Brain hoặc trong cách AI thao tác với repository, đừng chỉ tạo một patch cho lỗi hiện tại.

Trước tiên hãy kiểm tra:
1. Rule hiện tại có quy định ngăn lỗi này chưa?
2. Repository contract có invariant tương ứng chưa?
3. Validator có thể tự động phát hiện lỗi này không?
4. Nếu đã có rule/validator, tại sao nó không ngăn hoặc phát hiện được lỗi?
5. Nếu thực sự thiếu control, hãy bổ sung control ở tầng generic phù hợp.

Ưu tiên theo thứ tự:
`Invariant → Validator → Workflow rule → User prompt reinforcement`

Không tạo một rule riêng chỉ để xử lý một lỗi biệt lập nếu một control generic có thể ngăn cả nhóm lỗi tương tự.
```

### SB-13 — Giữ thay đổi nhiều file thành một thay đổi logic

```text
Đây là một thay đổi logic có thể ảnh hưởng nhiều file.

Hãy xử lý như một thay đổi thống nhất:
- Xác định toàn bộ file bị ảnh hưởng trước khi sửa.
- Xác định target state cho toàn bộ thay đổi.
- Thực hiện đầy đủ create/update/delete.
- Đồng bộ reference và tài liệu phụ thuộc.
- Validate sau khi hoàn thành toàn bộ logical change.
- Verify repository cuối cùng.

Khi công cụ và tình huống cho phép, ưu tiên một commit thống nhất cho một logical change.
Với thay đổi cấu trúc hoặc rủi ro cao, cân nhắc branch → validate → verify → merge nếu điều đó thực sự làm giảm rủi ro.
Không tạo thêm quy trình nếu không mang lại lợi ích rõ ràng.
```

### SB-14 — Tuân thủ hợp đồng và cấu trúc repository

```text
Hãy tuân thủ cấu trúc và hợp đồng hiện tại của Second-Brain.

Không tự tạo:
- registry trùng lặp;
- bản tổng hợp song song có tính authoritative;
- archive copy không cần thiết;
- README thứ hai có cùng vai trò với README chuẩn;
- folder/file chỉ để làm cấu trúc trông đối xứng.

Tuân thủ `WORKFLOW.md` và `REPOSITORY_CONTRACT.md`.

Nguyên tắc source of truth:
- `AI_MEMORY.md` = memory và registry topic toàn cục.
- `TOPICS/<topic>/README.md` = entry point chuẩn của topic.
- Workstream/artifact = chi tiết công việc.
- `WORKFLOW.md` = cách vận hành.
- `REPOSITORY_CONTRACT.md` = trạng thái/invariant phải đúng.
- Git history = lịch sử mặc định.

Nếu đề xuất thay đổi kiến trúc, hãy kiểm tra các lớp phụ thuộc trước khi thực hiện.
```

### SB-15 — Xác thực artifact dữ liệu theo quy ước của workstream

```text
Đây là một artifact dữ liệu có cấu trúc. Không chỉ kiểm tra file có tồn tại.

Hãy kiểm tra các invariant được workstream định nghĩa, phù hợp với loại artifact:
- schema/header;
- số cột và cấu trúc dữ liệu;
- ID duy nhất và đúng format;
- relationship/reference có trỏ tới ID tồn tại không;
- version/current baseline;
- source/evidence traceability;
- metadata toàn vẹn nếu có;
- configuration structure;
- migration inventory nếu đây là migration.

Không tự sửa dữ liệu sai chỉ để validator PASS nếu chưa xác định rõ ý định đúng.
Nếu phát hiện lỗi semantic mà validator không thể kiểm tra, phải nêu rõ để con người quyết định.
Chỉ báo cáo hoàn tất sau khi validation và verification phù hợp với artifact đã đạt.
```

### SB-16 — Prompt đầy đủ cho thay đổi Second-Brain

```text
Cập nhật Second-Brain cho nhiệm vụ này. Hãy ưu tiên độ chính xác và tính đầy đủ hơn tốc độ hoặc việc rút ngắn quy trình.

PHẦN 1 — ĐỌC VÀ ĐỊNH TUYẾN
1. Đọc `AI_MEMORY.md`.
2. Xác định topic liên quan.
3. Đọc `TOPICS/<topic>/README.md`.
4. Nếu có workstream liên quan, đọc README của workstream đó.
5. Đọc `WORKFLOW.md` và `REPOSITORY_CONTRACT.md` vì đây là thay đổi repository.
6. Chỉ đọc các artifact cần thiết để hiểu nhiệm vụ.
7. Xác định nguồn thông tin authoritative.

PHẦN 2 — KIỂM TRA TRẠNG THÁI HIỆN TẠI
8. Kiểm tra trạng thái GitHub thực tế trước khi sửa.
9. Không dựa vào giả định, trạng thái từ conversation cũ hoặc việc bạn nghĩ file đang tồn tại.
10. Nếu nhiệm vụ liên quan đến thay thế/di chuyển/dọn dẹp, kiểm tra cả artifact cũ và artifact mới.

PHẦN 3 — XÁC ĐỊNH TARGET STATE
11. Xác định rõ `trạng thái hiện tại → trạng thái mục tiêu`.
12. Xác định:
   - file/folder phải tồn tại;
   - file/folder phải cập nhật;
   - file/folder phải tạo;
   - file/folder phải di chuyển/đổi tên;
   - file/folder phải xóa vì lỗi thời, bị thay thế, tạm thời, placeholder hoặc duplicate;
   - reference/path phải cập nhật;
   - README/registry/workflow/validator phải cập nhật nếu bị ảnh hưởng.
13. Không coi `create new file` là `replace old file`.

PHẦN 4 — PHÂN LOẠI THAY ĐỔI
14. Với memory, phân loại `ADD / UPDATE / REMOVE / NO_CHANGE`.
15. Với artifact, phân loại create / update / replace / move / delete / no-change.
16. Ưu tiên UPDATE khi thông tin mới sửa, tinh chỉnh hoặc thay thế thông tin hiện có; không tạo duplicate memory.

PHẦN 5 — THỰC HIỆN
17. Thực hiện toàn bộ thao tác create/update/delete cần thiết.
18. Nếu cần thay thế artifact, phải thực hiện cả phần xóa artifact cũ khi target state yêu cầu.
19. Cập nhật reference/path sau khi đổi tên hoặc di chuyển.
20. Đồng bộ README, registry, workflow, contract hoặc validator nếu thay đổi làm chúng bị ảnh hưởng.

PHẦN 6 — RECONCILE
21. Đối chiếu repository với target state.
22. Kiểm tra không còn artifact cũ, placeholder, `.tmp`, `.temp`, `DELETE_ME`, staging hoặc duplicate không thuộc target state.
23. Kiểm tra không còn reference trỏ tới path cũ.
24. Kiểm tra không có lớp tài liệu nào bị bỏ lại ở trạng thái cũ.

PHẦN 7 — VALIDATE
25. Chạy validator hiện có nếu có.
26. Kiểm tra schema/ID/reference/configuration/data contract phù hợp với artifact.
27. Nếu validator không kiểm được semantic correctness, thực hiện kiểm tra thủ công cần thiết.

PHẦN 8 — VERIFY
28. Đọc lại các file bị ảnh hưởng.
29. Kiểm tra cây repository cuối cùng.
30. Thực hiện kiểm tra DƯƠNG: những gì phải tồn tại có tồn tại và đúng không?
31. Thực hiện kiểm tra ÂM: những gì phải biến mất có thực sự biến mất không?
32. Kiểm tra target state có thực sự đạt được trên GitHub hay chỉ mới được AI dự định đạt.

PHẦN 9 — BÁO CÁO
33. Chỉ sau khi verification đạt mới báo cáo hoàn tất.
34. Báo cáo trạng thái repository thực tế:
   - hiện đang có gì;
   - đã thay đổi gì;
   - đã xóa gì;
   - reference/README/registry nào đã đồng bộ;
   - validation/verification nào đã thực hiện;
   - giới hạn còn lại nếu có.
35. Không báo cáo hoàn tất chỉ vì GitHub tool call thành công.

Quy tắc cốt lõi:
`Final repository state > tool actions`
`Tool success ≠ Task completion`
`Current state → Target state → Change → Reconcile → Validate → Verify`
```

## Prompt nhắc lại khi AI bắt đầu đi chệch hướng

```text
DỪNG và đọc lại quy tắc Second-Brain trước khi tiếp tục.

Đọc:
`AI_MEMORY.md` → `WORKFLOW.md` → `REPOSITORY_CONTRACT.md` → README của topic/workstream liên quan.

Nhắc lại các nguyên tắc bắt buộc:
- Trạng thái cuối cùng của repository là định nghĩa của việc hoàn tất.
- GitHub tool call thành công không phải bằng chứng đã hoàn tất.
- Tạo file mới không có nghĩa file cũ đã được thay thế.
- Với thay thế/dọn dẹp/di chuyển, phải kiểm tra cả file bắt buộc phải có và file cũ phải biến mất.
- Phải đồng bộ reference, README và registry bị ảnh hưởng.
- Phải thực hiện cả kiểm tra dương và kiểm tra âm.
- Chỉ báo cáo hoàn tất sau khi kiểm tra trạng thái repository thực tế.

Bây giờ hãy quay lại trạng thái hiện tại, xác định target state và tiếp tục theo đúng lifecycle.
```

## Nguyên tắc thiết kế

Các prompt này là **lớp củng cố để người dùng chủ động nhắc AI**, không phải nguồn thông tin chuẩn thứ hai.

Nguồn chuẩn vẫn là:

`AI_MEMORY.md` → `WORKFLOW.md` → `REPOSITORY_CONTRACT.md` → Topic/Workstream → Artifact

Việc lặp lại prompt không tạo ra một workflow mới. Mục đích của prompt là buộc AI quay lại đúng operating mode, đọc lại nguồn chuẩn và thực hiện đầy đủ các bước kiểm tra cần thiết.

Prompt có thể dài. Với mục đích sao chép/tái sử dụng, **độ đầy đủ và khả năng ngăn AI bỏ sót bước quan trọng được ưu tiên hơn độ ngắn**.
