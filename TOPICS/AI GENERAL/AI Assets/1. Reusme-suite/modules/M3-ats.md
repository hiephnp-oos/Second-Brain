\# M3 — ATS Flag Check + Industry Keywords



Requires: CV + JD + M0 industry tag

Chạy sau M2 (nếu trong full pipeline) hoặc standalone.



\---



\## 3A — Standard ATS Check



\### 🔴 Hard flags (gây parsing failures hoặc keyword misses)

\- Missing keywords xuất hiện verbatim trong JD

\- Job titles không match bất kỳ variant nào trong JD

\- Skills section bị chôn sâu hoặc không có

\- Date format inconsistency (vd: mix "Jan 2023" và "01/2023")

\- Tables, columns, text boxes

\- Non-standard section headers (vd: "What I've Done" thay vì "Experience")

\- Contact info đặt trong header/footer của file



\### 🟡 Soft flags (giảm match quality, không fatal)

\- JD keywords có trong CV nhưng chỉ 1 lần, bị chôn sâu

\- Action verbs lặp quá nhiều

\- Summary không mirror JD language

\- Skills nhắc trong bullets nhưng không có trong Skills section riêng

\- \*\*Acronym missing:\*\* important keyword xuất hiện lần đầu chỉ dưới 1 dạng (acronym hoặc full name) — recommend thêm dạng còn lại: `Statistical Process Control (SPC)`

\- \*\*Skill not embedded:\*\* skill quan trọng chỉ có trong Skills section, không có bullet nào demonstrate usage trong context thực tế → suggest embed vào bullet

\- \*\*Acronym format:\*\* keyword quan trọng xuất hiện lần đầu mà không có cả full name lẫn acronym

&#x20; → Recommend: `Full Name (ACRONYM)` hoặc `ACRONYM (Full Name)` để ATS detect cả hai

&#x20; → Ví dụ: `Customer Relationship Management (CRM)`, `Statistical Process Control (SPC)`

\- \*\*Skill embedding:\*\* skill liệt kê trong Skills section nhưng không có bullet nào demonstrate practical usage

&#x20; → Flag để move context vào bullet (không xóa Skills section — giữ cho ATS)

&#x20; → Ví dụ: "SAP listed in Skills but no bullet shows how/where it was used"



\### 🟢 Working well

Nêu 2–3 điểm cụ thể CV đang làm tốt cho ATS. Không generic.



\---



\## 3B — Lightweight Sweep (tích hợp từ Stage 3 cũ)



Chạy sau khi M2 edits được approve, trước khi output final.

Scope hẹp — chỉ fix inconsistency do merge edits tạo ra.



| Check | Tìm gì |

|-------|--------|

| Tone inconsistency | Edited bullets sound khác untouched bullets |

| Repeated phrases | Cùng verb/phrase xuất hiện 3+ lần |

| Summary alignment | Summary còn match CV sau edits không |

| Leftover AI patterns | Untouched sections còn AI buzzwords clash với phần đã clean |



\*\*Không làm:\*\*

\- Không re-edit bullets user đã reject ở M2

\- Không introduce new content

\- Không chạy full humanizer trên toàn bộ CV (dùng M7 cho việc đó)



\*\*Output nếu không có vấn đề:\*\*

```

M3 sweep: không phát hiện inconsistency.

```



\*\*Output nếu có vấn đề:\*\*

```

─── M3 SWEEP ─────────────────────────────────────────

TONE INCONSISTENCY: \[section/bullet] — Fix: \[mô tả]

REPEATED PHRASES: "\[phrase]" xuất hiện Nx → suggest: \[alternatives]

SUMMARY ALIGNMENT: Summary nhắc \[X] nhưng bullet đã pruned — Fix: removed

──────────────────────────────────────────────────────

```



\---



\## 3C — Industry Keyword Layer



Chỉ chạy nếu M0 detect industry khác "General".

Load keyword list từ `references/industry-keywords.md` cho industry tương ứng.



Với mỗi industry keyword, check CV và JD:



| Symbol | Meaning |

|--------|---------|

| ✅ | Có trong CV |

| ⚠️ | Thiếu trong CV (và cả JD) — ATS vẫn có thể scan |

| ℹ️ | Có nhưng weak hoặc mislabeled |

| — | Không relevant với role này |



Format per keyword:

```

⚠️ \[Keyword]

&#x20;  Gì: \[1 câu mô tả]

&#x20;  Trong CV: \[có / thiếu / weak — note cụ thể]

&#x20;  Recommendation: \[1 dòng — chỉ recommend nếu user có real experience]

```



\---



\## 3D — ATS Summary + User Confirmation



```

─── ATS SUMMARY ──────────────────────────────────────



🔴 Hard flags:       N issues

🟡 Soft flags:       N issues

🟢 Working well:     N items

⚠️  Industry gaps:   N keywords



──────────────────────────────────────────────────────

ATS EDITS PROPOSED:



STRUCTURAL (apply trực tiếp):

&#x20; \[ ] Fix date format: standardize to "Mon YYYY"

&#x20; \[ ] Di chuyển Skills section lên trên Projects



CONTENT (sẽ qua M3 sweep sau khi approve):

&#x20; \[ ] Thêm "(ERP)" sau SAP trong Skills

&#x20; \[ ] Thêm "Lean / 5S" vào Skills nếu có kinh nghiệm thực



Confirm edits nào muốn apply.

Structural → apply ngay.

Content → qua sweep → vào output.

──────────────────────────────────────────────────────

```



\---



\## 3E — Final Output



Default: text trong chat.

User request `.md` → xuất file.

User request PDF → route sang M8.



\*\*Change Log (đi kèm output):\*\*

```

─── CHANGE LOG ───────────────────────────────────────



APPLIED:

&#x20; M2 edits approved: \[N bullets rewritten, N pruned]

&#x20; M3 sweep: \[fixes / "no issues found"]

&#x20; M3 ATS structural: \[list]

&#x20; M3 ATS content: \[list]



PENDING (cần action của bạn):

&#x20; - \[needs metric]: "\[bullet]" → thêm số liệu cụ thể

&#x20; - Industry keywords: \[list] — thêm nếu có kinh nghiệm



SKIPPED (user rejected):

&#x20; - Edit #N: \[mô tả ngắn]



──────────────────────────────────────────────────────

```



\*\*Interview Module (conditional unlock):\*\*

Unlock chỉ khi: Match Score ≥ 70% + ít nhất 1 full optimization round + user yêu cầu.

Prompt: \*"Bạn có muốn đánh giá khả năng pass vòng HR / Hiring Manager và chuẩn bị câu hỏi phỏng vấn không?"\*

