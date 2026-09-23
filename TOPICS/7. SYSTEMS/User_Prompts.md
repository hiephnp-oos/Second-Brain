# Prompt người dùng cho Second-Brain

Các prompt có thể tái sử dụng để tương tác với Second-Brain trên nhiều topic. Các prompt này được viết có chủ đích một cách rõ ràng và cụ thể để người dùng có thể nhắc lại những quy tắc vận hành quan trọng khi bắt đầu làm việc với một AI mới hoặc khi AI trước đó có dấu hiệu bỏ qua bước kiểm tra repository.

## Cách sử dụng

Các prompt trong tài liệu này được thiết kế để **sao chép và sử dụng trực tiếp**. Không ưu tiên rút ngắn prompt nếu việc rút ngắn có thể làm mất một quy tắc quan trọng.

- Dùng prompt phù hợp với loại nhiệm vụ.
- Với thay đổi GitHub, thay đổi cấu trúc repository hoặc persistent memory, ưu tiên prompt đầy đủ.
- Khi AI bắt đầu bỏ qua quy trình, dùng prompt nhắc quy tắc để buộc AI quay lại kiểm tra repository trước khi tiếp tục.
- Các prompt này là **lớp củng cố cho AI**, không thay thế các quy tắc chuẩn trong `WORKFLOW.md` và `REPOSITORY_CONTRACT.md`.
- Các mã `ADD / UPDATE / REMOVE / NO_CHANGE` được giữ nguyên để thống nhất với workflow và validator.

## Bảng prompt tái sử dụng

| Mã | Prompt có thể sao chép trực tiếp | Dùng khi |
|---|---|---|
| **SB-01** | **Đọc Second-Brain trước khi làm việc.** Đọc `AI_MEMORY.md` trước. Từ đó xác định topic phù hợp, đọc `TOPICS/<topic>/README.md`, sau đó chỉ đọc workstream/file cần thiết cho nhiệm vụ hiện tại. Trước khi thay đổi GitHub, phải kiểm tra trạng thái repository thực tế và xác định nguồn thông tin có thẩm quyền. Không được bắt đầu thay đổi dựa trên giả định về những gì repository đang có. | Bắt đầu topic hoặc nhiệm vụ mới |
| **SB-02** | **Tiếp tục công việc từ Second-Brain.** Đọc `AI_MEMORY.md` → topic `README.md` → workstream/file liên quan. Kết hợp context của conversation hiện tại với trạng thái hiện tại trên GitHub. Không yêu cầu tôi lặp lại thông tin đã có trong repository nếu thông tin đó đủ để tiếp tục công việc. Nếu thông tin mâu thuẫn, áp dụng thứ tự nguồn sự thật được quy định trong `REPOSITORY_CONTRACT.md`. | Tiếp tục công việc đang có |
| **SB-03** | **Cập nhật Second-Brain theo đúng vòng đời repository.** Kiểm tra trạng thái hiện tại → xác định trạng thái mục tiêu → phân loại `ADD / UPDATE / REMOVE / NO_CHANGE` → thực hiện thay đổi → đồng bộ các tham chiếu/phụ thuộc → kiểm tra điều kiện phải có và điều kiện phải không còn → đọc lại các file bị ảnh hưởng → kiểm tra cây repository cuối cùng → chỉ sau đó báo cáo kết quả. Một thao tác GitHub thành công chỉ chứng minh thao tác đã được thực hiện, không chứng minh nhiệm vụ đã hoàn thành. | Cập nhật persistent memory hoặc repository |
| **SB-04** | **Lập kế hoạch theo trạng thái mục tiêu.** Trước khi sửa GitHub, xác định rõ trạng thái cuối cùng cần đạt: file/folder nào phải tồn tại, file nào phải được cập nhật, di chuyển hoặc đổi tên, file nào phải bị xóa vì đã lỗi thời/bị thay thế/trùng lặp/tạm thời, và những README, registry, index hoặc reference nào phải đồng bộ. Xem `current state → target state` là định nghĩa của nhiệm vụ, không chỉ là danh sách thao tác cần thực hiện. | Thay thế, di chuyển, đổi tên hoặc dọn dẹp |
| **SB-05** | **Không được quên xóa artifact cũ.** Việc tạo file mới không đồng nghĩa file cũ đã được thay thế. Nếu trạng thái mục tiêu yêu cầu artifact cũ không còn tồn tại, phải thực hiện thao tác xóa/di chuyển phù hợp, sau đó kiểm tra rằng artifact cũ thực sự không còn và không còn reference đang hoạt động trỏ tới nó. | Replace / rename / move |
| **SB-06** | **Thực hiện kiểm tra trạng thái âm.** Sau khi thay đổi, không chỉ kiểm tra những thứ bắt buộc phải tồn tại mà còn phải kiểm tra những thứ bắt buộc phải biến mất. Với các nhiệm vụ thay thế hoặc dọn dẹp, kiểm tra artifact lỗi thời, duplicate, `.tmp`, `.temp`, placeholder, `DELETE_ME`, staging artifact, path cũ và reference cũ. Chỉ coi nhiệm vụ hoàn tất khi cả điều kiện có và điều kiện không còn đều đạt yêu cầu của trạng thái mục tiêu. | Cleanup / restructure / migration |
| **SB-07** | **Đồng bộ toàn bộ repository, không chỉ file đang sửa.** Sau một thay đổi có ảnh hưởng cấu trúc hoặc routing, kiểm tra các lớp có thể bị ảnh hưởng: `AI_MEMORY.md`, topic README, workstream README, root `README.md`, `WORKFLOW.md`, `REPOSITORY_CONTRACT.md`, artifact con, registry, index và reference. Chỉ cập nhật những lớp thực sự bị ảnh hưởng, nhưng không được để một lớp phụ thuộc vẫn trỏ tới trạng thái cũ. | Thay đổi cấu trúc hoặc routing |
| **SB-08** | **Kiểm tra trước khi nói đã hoàn thành.** Sau khi thực hiện thay đổi, đọc lại các file bị ảnh hưởng và kiểm tra cây repository cuối cùng. Chỉ báo cáo “đã hoàn thành” khi trạng thái cuối cùng trên GitHub thực sự chứng minh được yêu cầu đã đạt. Nếu còn phần chưa thực hiện được hoặc chưa thể xác minh, phải nói rõ phần đó thay vì ngầm hiểu là đã hoàn thành. | Thay đổi có rủi ro cao |
| **SB-09** | **Áp dụng thứ tự nguồn sự thật.** Khi có thông tin mâu thuẫn, ưu tiên theo thứ tự: (1) chỉ dẫn hiện tại của người dùng; (2) dữ liệu/source có thẩm quyền; (3) artifact hiện tại của workstream; (4) topic README; (5) `AI_MEMORY.md`; (6) Handoff hoặc trạng thái tạm thời của task; (7) suy luận của AI. Suy luận phải được nhận diện là suy luận và không được tự động trở thành persistent memory có thẩm quyền. | Thông tin mâu thuẫn hoặc không chắc chắn |
| **SB-10** | **Chỉ đọc context nhỏ nhất cần thiết.** Bắt đầu từ `AI_MEMORY.md`, xác định topic, đọc topic README, sau đó đi xuống workstream hoặc artifact nhỏ nhất cần cho nhiệm vụ. Không đọc toàn bộ repository nếu nhiệm vụ hiện tại không yêu cầu full audit. Nếu cần full audit thì phải mở rộng phạm vi một cách có chủ đích. | Tra cứu hoặc tiếp tục công việc thông thường |
| **SB-11** | **Coi Handoff là trạng thái tạm thời.** Sau khi định tuyến tới topic/workstream, đọc Handoff nếu cần để tiếp tục nhiệm vụ hiện tại. Handoff dùng để chuyển trạng thái công việc giữa AI/conversation, không phải persistent memory. Nếu Handoff đề xuất thay đổi memory, phải đối chiếu với `WORKFLOW.md` và source hiện tại trước khi ghi vào GitHub. | Chuyển giữa AI hoặc conversation |
| **SB-12** | **Sửa hệ thống tổng quát, không chỉ sửa triệu chứng.** Khi phát hiện lỗi, trước tiên kiểm tra xem một rule, workflow hoặc validator hiện có đáng lẽ đã phải ngăn lỗi đó hay chưa. Nếu đã có control nhưng chưa hoạt động đúng, sửa control đó. Chỉ bổ sung rule hoặc validator mới khi thực sự thiếu control. Không tạo patch riêng lẻ chỉ để xử lý một trường hợp mà không cải thiện hệ thống chung. | Khi phát hiện lỗi lặp lại hoặc lỗi quy trình |
| **SB-13** | **Giữ thay đổi nhiều file thành một thay đổi logic nhất quán.** Khi một nhiệm vụ làm thay đổi nhiều file có liên quan, xử lý chúng như một thay đổi logic duy nhất khi có thể. Sau cùng phải kiểm tra toàn bộ trạng thái liên quan thay vì coi từng thao tác file là nhiệm vụ độc lập. Với thay đổi cấu trúc hoặc rủi ro cao, chỉ dùng branch/validation bổ sung khi nó thực sự giảm rủi ro mà không tạo complexity không cần thiết. | Thay đổi nhiều file |
| **SB-14** | **Tôn trọng contract của repository.** Không tự tạo thêm registry, summary, archive hoặc cấu trúc song song nếu repository chưa có nhu cầu thực tế. Tuân thủ cấu trúc topic/workstream, quy ước README và các invariant đã được định nghĩa trong `WORKFLOW.md` và `REPOSITORY_CONTRACT.md`. Git history là nơi lưu lịch sử mặc định. | Bảo trì repository nói chung |
| **SB-15** | **Kiểm tra artifact dữ liệu theo contract cục bộ.** Với CSV, JSON hoặc cấu hình có cấu trúc, kiểm tra schema, header, ID, reference, version, integrity metadata và các invariant khác mà workstream đó quy định. Không chỉ kiểm tra file có tồn tại; phải kiểm tra dữ liệu bên trong vẫn hợp lệ theo contract trước khi báo cáo hoàn thành. | CSV / JSON / dữ liệu có cấu trúc |
| **SB-16** | **Prompt đầy đủ để thay đổi Second-Brain an toàn.** Đọc `AI_MEMORY.md` và `WORKFLOW.md`. Xác định topic/workstream nhỏ nhất liên quan và đọc context cần thiết. Kiểm tra trạng thái GitHub hiện tại trước khi sửa. Xác định rõ trạng thái mục tiêu: file/folder nào phải tồn tại, cập nhật, di chuyển hoặc xóa. Phân loại thay đổi thành `ADD / UPDATE / REMOVE / NO_CHANGE`. Thực hiện toàn bộ thao tác create/update/delete cần thiết. Đồng bộ các README, registry, index, reference và path phụ thuộc. Kiểm tra cả trạng thái dương và trạng thái âm, đặc biệt xác nhận artifact cũ, duplicate, temporary, placeholder và reference lỗi thời đã biến mất khi trạng thái mục tiêu yêu cầu. Đọc lại các file bị ảnh hưởng và kiểm tra cây repository cuối cùng. Chỉ sau khi xác minh trạng thái thực tế trên GitHub mới báo cáo kết quả. Không bao giờ coi việc GitHub connector/action trả về thành công là bằng chứng rằng nhiệm vụ đã hoàn thành. | Prompt mặc định cho thay đổi repository hoặc nhiệm vụ rủi ro cao |

## Prompt đầy đủ theo tình huống

### 1. Bắt đầu làm việc với Second-Brain

```text
Tôi muốn làm việc với Second-Brain cho nhiệm vụ hiện tại.

Trước khi làm bất kỳ thay đổi nào:
1. Đọc `AI_MEMORY.md` trước.
2. Xác định topic phù hợp với nhiệm vụ.
3. Đọc `TOPICS/<topic>/README.md`.
4. Nếu topic có workstream con, chỉ đọc workstream/file cần thiết cho nhiệm vụ hiện tại.
5. Nếu nhiệm vụ liên quan đến thay đổi repository, đọc thêm `WORKFLOW.md` và `REPOSITORY_CONTRACT.md`.
6. Kiểm tra trạng thái repository thực tế trên GitHub; không dựa vào giả định hoặc trạng thái mà AI nghĩ repository đang có.

Sau đó mới bắt đầu xử lý nhiệm vụ.
```

### 2. Thay đổi repository / GitHub

```text
Hãy cập nhật Second-Brain cho nhiệm vụ này và tuân thủ đầy đủ quy trình repository.

1. Đọc `AI_MEMORY.md` và `WORKFLOW.md`.
2. Định tuyến tới topic/workstream nhỏ nhất liên quan.
3. Đọc trạng thái hiện tại trên GitHub trước khi thay đổi.
4. Xác định rõ TARGET STATE: cuối cùng repository phải có gì, thay đổi gì, di chuyển gì và không còn gì.
5. Phân loại thay đổi: `ADD / UPDATE / REMOVE / NO_CHANGE`.
6. Thực hiện toàn bộ thao tác create/update/delete cần thiết.
7. Đồng bộ tất cả README, registry, index, reference và path phụ thuộc bị ảnh hưởng.
8. Kiểm tra trạng thái dương: các file/folder/reference bắt buộc phải có đều tồn tại và đúng nội dung.
9. Kiểm tra trạng thái âm: artifact lỗi thời, duplicate, temporary, placeholder, `DELETE_ME`, staging và reference cũ không còn tồn tại khi trạng thái mục tiêu yêu cầu loại bỏ.
10. Đọc lại các file bị ảnh hưởng và kiểm tra cây repository cuối cùng.
11. Chỉ báo cáo trạng thái thực tế đã xác minh trên GitHub. Không coi một GitHub action thành công là bằng chứng hoàn thành.
```

### 3. Khi AI bắt đầu bỏ qua quy trình

```text
DỪNG. Không tiếp tục sửa repository theo trạng thái hiện tại.

Hãy đọc lại:
`AI_MEMORY.md` → `WORKFLOW.md` → `REPOSITORY_CONTRACT.md` → topic/workstream README liên quan.

Nhớ rằng:
- Trạng thái cuối cùng của repository là định nghĩa của việc hoàn thành.
- Không được dựa vào giả định về trạng thái repository; phải kiểm tra GitHub thực tế.
- Tạo file mới không đồng nghĩa file cũ đã được thay thế.
- Một GitHub action thành công không chứng minh nhiệm vụ đã hoàn thành.
- Với replace/rename/cleanup/migration phải kiểm tra cả thứ bắt buộc tồn tại và thứ bắt buộc biến mất.
- Phải đồng bộ các README, registry, index và reference bị ảnh hưởng.
- Chỉ báo cáo “hoàn thành” sau khi đã đọc lại file và kiểm tra trạng thái cuối cùng.

Sau khi kiểm tra lại, hãy tiếp tục nhiệm vụ từ trạng thái thực tế của repository.
```

## Nguyên tắc thiết kế

Các prompt này là **lớp củng cố ở phía người dùng** để giúp AI quay lại đúng operating mode khi cần. Chúng không phải source of truth thứ hai.

Source of truth của hệ thống vẫn là:

`AI_MEMORY.md` → `WORKFLOW.md` → `REPOSITORY_CONTRACT.md` → topic/workstream artifacts hiện tại.

Mục tiêu của prompt library là giúp người dùng có thể copy một prompt đầy đủ vào AI mới hoặc gửi lại khi AI bắt đầu bỏ qua các bước kiểm tra quan trọng.