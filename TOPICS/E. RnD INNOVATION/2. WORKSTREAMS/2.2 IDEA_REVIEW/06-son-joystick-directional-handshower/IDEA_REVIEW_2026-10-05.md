# ĐÁNH GIÁ IDEA — Handshower điều khiển hướng phun bằng Joystick phía sau

- **Prompt:** IR-01 — Initial Idea Validity Review
- **Ngày review:** 2026-10-05
- **Idea:** Handshower tích hợp Joystick điều khiển hướng phun
- **Nguồn idea:** User-provided concept
- **Phạm vi:** Đánh giá ban đầu tính hợp lệ của idea và kiểm tra precedent thị trường/kỹ thuật theo yêu cầu; chưa kết luận feasibility chi tiết.
- **Trạng thái:** **WATCH**
- **Ghi chú bằng chứng:** Patent được sử dụng để xác định precedent kỹ thuật và vùng cần nghiên cứu thêm; không phải ý kiến pháp lý về novelty, patentability, infringement hoặc freedom-to-operate.

## 1. Idea Validity — Đây có phải là idea không?

**Có.**

Idea hiện được hiểu rõ như sau:

> Một handshower có **joystick đa trục đặt ở mặt sau**. Người dùng dùng 4 ngón tay để giữ handshower như bình thường và dùng ngón cái để điều khiển joystick. Sau khi chọn hướng, người dùng có thể thả ngón cái; joystick giữ vị trí đã chọn và spray tiếp tục phun theo hướng đó. Thân handshower và grip không cần thay đổi orientation đáng kể.

Điểm cốt lõi của idea không phải là:

> “Handshower có thể đổi hướng phun.”

Chức năng này đã có nhiều precedent.

Điểm cốt lõi là:

> **Tách việc giữ/định vị thân handshower khỏi việc điều khiển hướng vector phun bằng một control đa trục nằm ngay trong vùng ngón cái.**

Idea đủ rõ để review và có một hypothesis UX cụ thể để kiểm chứng.

## 2. Pain Point & User Benefit — Vấn đề và lợi ích cho người dùng cuối

### Pain point

Với handshower có hướng phun cố định tương đối với thân, người dùng phải thay đổi orientation của cả handshower để đưa nước sang vị trí khác.

Các giải pháp pivot/orientable head đã giảm vấn đề này, nhưng người dùng vẫn phải tác động lên head hoặc orientation của sản phẩm để thay đổi hướng phun.

Idea hướng tới một trường hợp khác:

> Người dùng muốn **giữ handshower ở orientation và grip thuận tiện**, nhưng vẫn muốn đưa spray tới vị trí mà orientation thông thường khó reach.

### Lợi ích dự kiến

- Giữ handshower ổn định bằng 4 ngón.
- Dùng ngón cái để điều chỉnh hướng phun.
- Sau khi điều chỉnh có thể thả ngón cái, không cần giữ lực liên tục.
- Không cần xoay lại toàn bộ handshower mỗi lần muốn thay đổi hướng.
- Có thể điều khiển hướng X/Y trực tiếp.
- Có thể hướng spray tới các vị trí ngoài centerline mà không thay đổi đáng kể tư thế cầm.

**EVIDENCE STATUS:** Đây là lợi ích dự kiến từ concept, chưa có user test chứng minh tốt hơn pivot head.

## 3. Mô tả idea

### Interaction dự kiến

| Thao tác của joystick | Phản ứng của spray |
|---|---|
| Neutral | Phun theo hướng danh định |
| Lên | Lệch hướng lên |
| Xuống | Lệch hướng xuống |
| Trái | Lệch hướng trái |
| Phải | Lệch hướng phải |
| Chéo | Lệch theo hướng trung gian |

### Cách sử dụng

1. Người dùng giữ handshower bằng 4 ngón như bình thường.
2. Ngón cái tiếp cận joystick phía sau.
3. Ngón cái nghiêng joystick theo hướng mong muốn.
4. Hướng spray thay đổi tương ứng.
5. Người dùng thả ngón cái.
6. Joystick giữ vị trí và spray tiếp tục theo hướng đã chọn.

**PROPOSED:** Cơ chế giữ vị trí joystick chưa được xác nhận bằng prototype.

### Range mục tiêu ban đầu

**PROPOSED: ±10° theo X/Y.**

Không nên hiểu đây là “góc mở rộng của spray cone”. Mục tiêu là **độ lệch trục phun**, từ đó mở rộng vùng target mà người dùng có thể tiếp cận.

Ví dụ, với độ lệch ±10°:

| Khoảng cách từ nozzle tới target | Độ dịch chuyển xấp xỉ |
|---:|---:|
| 0,30 m | 5,3 cm |
| 0,50 m | 8,8 cm |
| 0,70 m | 12,3 cm |
| 1,00 m | 17,6 cm |

Do đó, ở khoảng cách sử dụng khoảng 0,5–0,7 m, ±10° có thể tạo khoảng dịch chuyển target khoảng 9–12 cm.

Đây là cơ sở hình học, không phải bằng chứng rằng người dùng sẽ cảm nhận mức dịch chuyển này là đủ hữu ích.

## 4. Khác biệt so với sản phẩm/giải pháp thị trường

Kết quả tìm kiếm cho thấy cần phân biệt các nhóm precedent sau:

| Precedent | Cách điều khiển | Có điều khiển hướng phun? | Có joystick? | Mức gần với idea |
|---|---|---:|---:|---|
| Waterpik ShowerCare | Pivot toàn bộ head | Có | Không | **Chức năng trực tiếp / khác interaction** |
| Speakman Neo Anystream | Xoay spray face | Không phải directional steering | Không | **Liền kề** |
| EP4644623A1 | Orient head tương đối với handle | Có | Không | **Chức năng trực tiếp / khác interaction** |
| US 4,881,282 | Joystick + cable điều khiển shower head | Có | Có | **Kiến trúc rất gần / khác package** |
| US20110192915A1 | Joystick điều khiển chức năng water outlet | Có | Có | **Precedent joystick / khác mục tiêu** |
| Delta CN122215427A | Rear button/joystick-button trên handshower, điều khiển các hướng outlet | Có theo các outlet | Có dạng joystick button | **Tương tác rất gần / chưa chứng minh continuous 2-axis** |
| Idea hiện tại | Rear multi-axis joystick → spray-vector control | Có | Có | **Concept mục tiêu** |

### 4.1 Waterpik — pivoting head

Waterpik ShowerCare có **180° pivoting head**, cho phép điều chỉnh hướng spray và hỗ trợ đưa nước tới vị trí mong muốn.

[Waterpik ShowerCare — product reference](https://www.waterpik.com/shower-heads/products/FN-20032320-FAB/)

Điều này xác nhận:

- pain point về hướng phun là có thật;
- directional handshower không phải chức năng mới.

Khác biệt với idea:

> Waterpik dùng chuyển động của chính head; idea muốn giữ grip/body tương đối ổn định và dùng thumb control để thay đổi spray direction.

### 4.2 Speakman Neo Anystream

Speakman Neo sử dụng cơ chế xoay spray face để thay đổi spray pattern.

[Speakman Neo Hand Shower](https://speakman.com/products/neo-hand-shower)

Đây là precedent cho việc người dùng thao tác trực tiếp với phần spray face, nhưng không phải precedent cho joystick điều khiển hướng vector phun.

**Mức gần:** liền kề.

### 4.3 EP4644623A1 — Orientable handheld shower

Patent này mô tả handshower có head có thể định hướng tương đối với handle. Functional objective rất gần: giảm việc phải di chuyển toàn bộ handshower để thay đổi hướng nước.

[EP4644623A1 — Orientable handheld shower](https://patents.google.com/patent/EP4644623A1/en)

**Điểm giống:** giải quyết cùng functional objective.

**Điểm khác:** không chứng minh rear joystick interaction.

### 4.4 US 4,881,282 — Joystick điều khiển hướng shower head

Patent mô tả joystick điều khiển một shower head có khả năng pivot thông qua cơ cấu yoke/cable.

[US 4,881,282 — Adjustable shower head](https://patents.justia.com/patent/4881282)

Điểm giống quan trọng:

> **Hướng joystick → hướng shower head tương ứng.**

Điểm khác:

- joystick là điều khiển từ xa;
- dùng cable/yoke;
- không phải rear joystick tích hợp trên handheld shower;
- không phải exact package của idea hiện tại.

Do đó, “joystick điều khiển hướng shower spray” không thể coi là hoàn toàn mới.

### 4.5 US20110192915A1 — Shower with joystick function

Patent của Xiamen Solex mô tả shower có joystick để điều khiển các water outlet/sealing columns.

[US20110192915A1 — Shower with joystick function](https://patentsencyclopedia.com/inventor/huasong-zhou-xiamen-cn-1/)

Precedent này cho thấy:

> **Joystick + shower water control** đã tồn tại trong patent literature từ ít nhất năm 2011.

Giới hạn so sánh:

- trọng tâm là điều khiển outlet/function;
- không chứng minh rear-mounted 2-axis continuous joystick điều khiển spray vector.

### 4.6 Delta CN122215427A — Rear control trên handheld shower

Đây là precedent rất gần về interaction.

Patent application của Delta Faucet Company mô tả handheld shower có control ở phần rear. Hồ sơ có các embodiment điều khiển nước giữa các outlet có hướng khác nhau và đề cập **“joystick button”**.

[CN122215427A — Handheld shower assembly](https://eureka.patsnap.com/patent/CN122215427A)

Điểm giống:

- handheld shower;
- rear control;
- water direction/function;
- joystick-button precedent.

Giới hạn:

> Chưa có bằng chứng trong phạm vi tìm kiếm hiện tại cho thấy patent này mô tả đúng **continuous 2-axis joystick → continuous spray-vector steering** như idea hiện tại.

Do đó, exact combination vẫn là **UNKNOWN**, không được kết luận là mới.

## 5. Evidence — Bằng chứng tìm được

### EVIDENCED

1. **Directional/orientable handshower đã tồn tại.**
   - Waterpik ShowerCare: pivoting head.
   - EP4644623A1: orientable handheld shower.

2. **Joystick điều khiển hướng shower head đã có precedent.**
   - US 4,881,282.

3. **Joystick điều khiển chức năng water outlet của shower đã có precedent.**
   - US20110192915A1.

4. **Rear control trên handheld shower đã có precedent.**
   - Delta CN122215427A có rear control và embodiment “joystick button”.

5. **Các cơ cấu pivot/tilt có thể tạo directional spray.**
   - Đây là một nhóm precedent kỹ thuật đã tồn tại; vì vậy bản thân “tilt spray face” không phải điểm mới đã được chứng minh.

6. **Commercial market search hiện chưa tìm thấy exact product** có đủ các yếu tố:
   - rear-mounted multi-axis joystick;
   - thumb operation;
   - continuous X/Y spray-vector control;
   - handheld shower package.

Điểm 6 chỉ có nghĩa:

> **NOT FOUND IN THIS SEARCH**

Không có nghĩa:

> “Không tồn tại trên thị trường.”

### INFERRED

Idea có thể tạo một interaction model khác pivot head:

> **Tay/grip = giữ vị trí**  
> **Joystick = điều khiển hướng spray**

Nếu mapping X/Y trực tiếp, liên tục và dễ học, differentiation tiềm năng nằm ở **interaction architecture**, không phải ở chức năng directional spray cơ bản.

### PROPOSED

- Joystick đặt ở vùng thumb reach.
- Same-direction mapping: đẩy joystick lên → spray lên.
- Joystick giữ vị trí sau khi thả ngón cái.
- Range ban đầu ±10° X/Y.
- Mục tiêu chính là tăng **reachable target envelope**, không phải tăng physical spray cone.

### UNKNOWN

- Joystick có thực sự dễ và nhanh hơn pivot head không?
- Một tay có thể điều khiển chính xác trong điều kiện sử dụng thực tế không?
- Có xảy ra accidental input khi grip không?
- Continuous control có tạo giá trị đủ lớn so với 4/8 preset directions không?
- ±10° có đủ tạo lợi ích cảm nhận không?
- Exact commercial precedent còn thiếu hay không?
- Exact patent combination có tồn tại hay không?
- UX advantage có đủ lớn để justify thêm complexity không?

## 6. Initial Assessment — Nhận định ban đầu về validity

### 6.1 Validity

**VALID IDEA.**

Concept hiện đã rõ, có:

- user interaction cụ thể;
- pain point cụ thể;
- expected benefit cụ thể;
- một khác biệt interaction có thể kiểm chứng.

### 6.2 Differentiation

Differentiation không nên dựa trên các tuyên bố:

- “Directional shower là mới.”
- “Joystick shower là mới.”
- “Rear control trên handshower là mới.”
- “Tilt spray face là mới.”

Các precedent đã tìm thấy làm yếu các tuyên bố này.

Differentiation tiềm năng nên tập trung vào:

> **Rear-mounted, thumb-operated, position-retaining, multi-axis joystick cho phép điều khiển độc lập vector phun trong khi người dùng duy trì grip ổn định.**

**Status: PROPOSED / UNKNOWN.**

### 6.3 Advantage so với pivot head

Advantage quan trọng nhất cần chứng minh:

> Người dùng có thể đưa spray tới cùng một target **nhanh hơn, chính xác hơn hoặc ít thay đổi grip hơn** so với pivot head.

Không nên tuyên bố joystick tốt hơn pivot head trước khi có user test.

### 6.4 Assisted bathing

Assisted bathing là use case hợp lý nhưng **không phải differentiation mới** vì các sản phẩm pivot đã hướng tới use case này.

Advantage của joystick chỉ có ý nghĩa nếu người dùng/người hỗ trợ có thể giữ handshower ổn định và redirect spray bằng thumb dễ hơn pivot.

### 6.5 Disposition

**WATCH**

Chưa DROP vì:

- UX hypothesis rõ;
- có thể prototype/test nhanh;
- exact commercial combination chưa được tìm thấy trong phạm vi search hiện tại.

Chưa nâng lên mức phát triển sâu vì:

- prior art khá gần;
- advantage so với pivot chưa được chứng minh;
- IP status chưa rõ.

## 7. Key Unknowns — Thông tin còn thiếu ảnh hưởng đến nhận định

### 7.1 UX Delta

**Câu hỏi:** Joystick có thực sự dễ hơn pivot head không?

Cần so sánh cùng một task:

> Đưa spray từ target A → target B.

Đo:

- thời gian redirect;
- số lần thay đổi grip;
- độ chính xác;
- độ ổn định;
- cảm nhận dễ sử dụng.

### 7.2 Điều khiển bằng một tay

Concept hiện tại giả định:

- 4 ngón giữ handshower;
- ngón cái điều khiển joystick.

Điều này **có thể thực hiện về mặt interaction concept**, nhưng chưa chứng minh ergonomic trong điều kiện wet/slippery và có lực từ hose.

### 7.3 Accidental input — hiểu rõ vấn đề

**Accidental input** là việc spray tự đổi hướng khi người dùng không chủ định điều chỉnh.

Ví dụ:

- lòng bàn tay tì vào joystick;
- ngón cái chạm joystick khi đổi grip;
- lực kéo của hose truyền vào cơ cấu;
- người dùng bóp grip mạnh làm joystick dịch chuyển.

Các biện pháp có thể xem xét ở giai đoạn concept:

- joystick nằm trong recess;
- vùng neutral/deadband;
- lực detent đủ rõ;
- giới hạn hành trình;
- vị trí joystick chỉ thuận tiện khi chủ động dùng ngón cái.

Đây mới là **PROPOSED**, chưa được kiểm chứng.

### 7.4 Continuous hay preset?

Câu hỏi không phải “continuous có tốt hơn về lý thuyết hay không”, mà là:

> Người dùng có cần mọi góc trong vùng ±10° hay chỉ cần 4/8 hướng cố định?

Continuous có thể cho target chính xác hơn nhưng có thể làm cơ cấu và interaction phức tạp hơn.

**Khuyến nghị:** giữ continuous ±10° làm concept mục tiêu để test differentiation, nhưng UX test nên so sánh với 4/8 preset.

### 7.5 Mapping

Mapping đề xuất:

> joystick lên → spray lên  
> joystick trái → spray trái

Có thể có learning curve ban đầu, nhưng same-direction mapping được xem là dễ hiểu hơn mapping ngược.

**Status:** INFERRED, chưa có user test.

### 7.6 Range

**PROPOSED: ±10° X/Y.**

±10° không lớn hơn đáng kể so với một số cơ cấu ball-joint commercial đã có range khoảng ±16–18°. Vì vậy advantage không nằm ở “góc lớn hơn”.

Advantage tiềm năng nằm ở:

> **Có thể đạt độ lệch khoảng ±10° mà vẫn giữ orientation của grip.**

### 7.7 Spray quality

Mục tiêu của idea không phải làm physical spray cone lớn hơn.

Mục tiêu là:

> **Tăng vùng target có thể reach bằng cách thay đổi hướng trục spray.**

Do đó cần phân biệt:

- **spray coverage:** diện tích vùng nước bao phủ;
- **reachable target envelope:** vùng mà người dùng có thể đưa spray tới.

Idea chủ yếu muốn tăng **reachable target envelope**.

### 7.8 Mechanical architecture

Hai hướng chính cần xem xét sau khi UX được chứng minh:

**A. Tilt spray face**

Joystick → linkage/cam → spray-face cartridge nghiêng.

Ưu điểm tiềm năng:

- mapping trực tiếp;
- waterway chính có thể giữ tương đối cố định;
- ít phải thay đổi đường nước bên trong.

Nhược điểm cần kiểm chứng:

- sealing;
- limescale;
- durability;
- appearance;
- spray pattern khi nghiêng.

**B. Internal flow redirection**

Joystick → cơ cấu bên trong → thay đổi hướng dòng nước.

Ưu điểm tiềm năng:

- spray face có thể giữ cố định.

Rủi ro tiềm năng:

- pressure loss;
- turbulence;
- flow distribution;
- spray uniformity;
- sealing/clearance;
- scale và độ bền cơ cấu.

**Đánh giá sơ bộ:** nếu idea vượt qua UX screening, **tilt spray face** là hướng nên prototype trước. Đây là đề xuất kiến trúc, chưa phải kết luận feasibility.

### 7.9 Market precedent completeness

Search hiện tại:

- đã tìm thấy nhiều precedent chức năng;
- đã tìm thấy precedent joystick;
- đã tìm thấy rear control trên handheld shower;
- chưa tìm thấy exact commercial product của combination hiện tại.

**Status:** NOT FOUND IN THIS SEARCH, không phải negative evidence.

### 7.10 Patent/IP

**Freedom-to-operate (FTO)** nghĩa là đánh giá xem một sản phẩm cụ thể có nguy cơ nằm trong phạm vi claim của patent còn hiệu lực tại thị trường mục tiêu hay không.

FTO khác với novelty.

Hiện tại:

- không thể nói idea an toàn về IP;
- không thể nói idea vi phạm patent;
- chưa đủ cơ sở để kết luận novelty/patentability.

Nếu idea vượt qua UX screening, cần một patent search riêng tập trung vào:

- rear-mounted control;
- multi-axis joystick;
- spray-direction control;
- continuous directional steering;
- handheld shower packaging;
- patent family và legal status;
- claim mapping.

**Status: UNKNOWN.**

## 8. Recommended Next Action — Bước tiếp theo đề xuất

Không nên đi ngay vào detailed mechanical feasibility.

Bước tiếp theo có giá trị nhất là **UX screening**.

### Test A — So sánh interaction

So sánh:

1. Handshower thông thường.
2. Handshower có pivot head.
3. Handshower có rear joystick.

Cùng một task:

> Đưa spray từ target A → target B.

Đánh giá:

- thời gian redirect;
- số lần thay đổi tay/grip;
- độ chính xác;
- độ ổn định;
- accidental input;
- mức dễ sử dụng.

### Test B — Range

Test:

- 0°;
- ±5°;
- ±10°.

Mục tiêu:

> Xác định ±10° có tạo lợi ích cảm nhận rõ hay không.

### Test C — Continuous vs preset

So sánh:

- 4 hướng;
- 8 hướng;
- continuous 2-axis.

Nếu continuous không tạo lợi ích rõ, có thể giảm complexity bằng preset.

### Test D — Sau khi UX vượt qua

Nếu joystick cho thấy advantage rõ so với pivot:

1. Prototype **tilt spray face** trước.
2. Đánh giá spray quality, sealing, durability và scale.
3. Chỉ nghiên cứu **internal flow redirection** nếu tilt spray face không phù hợp.
4. Thực hiện dedicated patent landscape/claim-level screening.

### Stop condition

**Giữ WATCH và không đầu tư sâu** nếu:

- user không thấy improvement rõ so với pivot;
- thao tác joystick chậm hơn;
- accuracy không tốt hơn;
- accidental input đáng kể;
- hoặc complexity tăng nhưng user value không tăng tương ứng.

## 9. Kết luận

**WATCH**

Lý do giữ idea không còn là:

> “Chưa có ai làm joystick cho shower.”

Research cho thấy giả định này **không đúng**.

Lý do giữ idea là:

> **Có thể tồn tại một UX advantage khi joystick đa trục phía sau cho phép người dùng điều khiển vector phun độc lập với orientation của handshower, trong khi vẫn giữ grip ổn định bằng một tay.**

Đây là hypothesis cụ thể và có thể kiểm chứng bằng prototype UX.

Nếu test chứng minh người dùng:

- redirect spray nhanh hơn;
- chính xác hơn;
- ít thay đổi grip hơn;
- và không gặp accidental input đáng kể,

idea mới có cơ sở để chuyển sang phân tích cơ khí và IP sâu hơn.

## Reference links

### Sản phẩm / precedent thị trường

- [Waterpik ShowerCare — Pivoting Hand Held Shower Head](https://www.waterpik.com/shower-heads/products/FN-20032320-FAB/)
- [Speakman Neo Hand Shower — Anystream](https://speakman.com/products/neo-hand-shower)
- [Delta Faucet — Hand Shower reference](https://www.deltafaucet.com/bathroom/product/75107.html)

### Patent / precedent kỹ thuật

- [US 4,881,282 — Adjustable shower head](https://patents.justia.com/patent/4881282)
- [US20110192915A1 — Shower with joystick function](https://patentsencyclopedia.com/inventor/huasong-zhou-xiamen-cn-1/)
- [EP4644623A1 — Orientable handheld shower](https://patents.google.com/patent/EP4644623A1/en)
- [CN122215427A — Handheld shower assembly, Delta Faucet Company](https://eureka.patsnap.com/patent/CN122215427A)
- [US 7,455,247 — Bodyspray having adjustable spray orientation](https://patents.justia.com/patent/7455247)

**Evidence status summary:**

- Directional/orientable handshower: **EVIDENCED**
- Joystick directional shower control: **EVIDENCED — patent precedent**
- Rear joystick/button on handheld shower: **EVIDENCED — patent precedent**
- Exact continuous 2-axis rear joystick spray-vector control as a commercial product: **NOT FOUND IN THIS SEARCH**
- Advantage over pivot head: **UNKNOWN**
- Exact combination novelty/IP: **UNKNOWN**
- Current disposition: **WATCH**

**Confidence: Cao**
