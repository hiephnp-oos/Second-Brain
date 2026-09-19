\---

name: resume-suite

description: >

&#x20; Bộ công cụ CV toàn diện: optimize CV theo JD, ATS check, humanize, research

&#x20; company/role, discovery session, và render PDF đẹp (Template 1 màu / Template 2 B\&W).

&#x20; Dùng khi user có CV draft sẵn và muốn: check/optimize CV, humanize nội dung,

&#x20; ATS audit, research công ty/role, surface kinh nghiệm ẩn, hoặc xuất PDF.

&#x20; Trigger on: "check CV", "optimize resume", "ATS check", "humanize CV",

&#x20; "research company", "discovery session", "xuất PDF", "render resume",

&#x20; "tạo PDF", hoặc bất kỳ kết hợp nào của CV + JD + intent.

&#x20; Luôn dùng skill này thay cho cv-optimizer, cv-optimizer-v2, resume-builder,

&#x20; hoặc resume-tailoring — resume-suite là bản hợp nhất của tất cả.

compatibility: "tools: bash\_tool, create\_file, present\_files, web\_search, web\_fetch | python\_packages: weasyprint, pymupdf"

\---



\# Resume Suite — Orchestrator



User luôn có CV draft sẵn. Skill không build resume từ đầu.

Output M1–M7: text / `.md` trong chat. Output M8: PDF file.



\---



\## INVARIANTS (không bao giờ vi phạm)



\- Không bịa đặt skill, metric, hoặc thành tích

\- Không inflate seniority — execution work stays execution work

\- Mọi score thay đổi phải trace được về JD requirement cụ thể

\- Phân tích bằng tiếng Việt; nội dung CV theo ngôn ngữ user yêu cầu (default: English)

\- Không qua gate nào mà không có user confirm



\---



\## INPUTS



| Input | Required | Ghi chú |

|-------|----------|---------|

| CV (text / markdown) | Với M1–M3, M7–M8 | Nếu thiếu → hỏi |

| JD | Với M1, M2, M3, M4 | Nếu thiếu → hỏi |

| Company name | Không | Dùng cho M4 research |

| Accent color | Không | Chỉ M8 — default T1: `#1a6fa8`, T2: `#1155cc` |

| Photo | Không | Chỉ M8 Template 1 — default `assets/default\_photo.jpg` |



\---



\## ROUTE MAP



Orchestrator đọc intent từ user input và route đến đúng module.

Không load module không cần thiết.



\### Nhóm A — Optimize CV (có JD)



| Signal | Route | Modules |

|--------|-------|---------|

| "check CV", "optimize", "match score", paste CV+JD | Full optimize | M0 → M1 → M2 → M3 |

| "chỉ match/score", "quick check" | Match only | M0 → M1 |

| "chỉ sửa bullets", "edit CV", "rewrite" | Edit only (cần M1 output trước) | M2 |

| "ATS check", "ATS only", "keyword audit" | ATS only | M0 → M3 |

| "full pipeline" | Tất cả | M0 → M1 → M2 → M3 → M7 → M8 |



\### Nhóm B — Humanize



| Signal | Route | Modules |

|--------|-------|---------|

| "humanize", "bỏ AI writing", "make human", "remove AI" | Humanize only | M7 |

| "humanize rồi xuất PDF" | Humanize + render | M7 → M8 |

| "optimize rồi humanize" | Full + humanize | M0 → M1 → M2 → M3 → M7 |



\### Nhóm C — Research \& Discovery



| Signal | Route | Modules |

|--------|-------|---------|

| "research company", "tìm hiểu công ty" | Research only | M4 (Phase R) |

| "discovery session", "kinh nghiệm ẩn", "surface experience" | Discovery only | M4 (Phase D) |

| "research + discovery" | Cả hai | M4 (Phase R → D) |

| "research rồi optimize" | Research → optimize | M4 → M0 → M1 → M2 → M3 |

| "humanize + research company" | Custom combo | M7 + M4 (Phase R) |

| "research + ATS check" | Research + ATS | M4 (Phase R) → M3 |



\### Nhóm D — Render PDF



| Signal | Route | Modules |

|--------|-------|---------|

| "xuất PDF", "render PDF", "tạo PDF", "build resume" | Render only | M8 |

| "optimize rồi xuất PDF" | Optimize → render | M0 → M1 → M2 → M3 → M8 |

| "humanize rồi render" | Humanize → render | M7 → M8 |



\### Nhóm E — Custom Combo



| Signal | Route | Modules |

|--------|-------|---------|

| User chỉ định module cụ thể | Theo yêu cầu | Load chỉ module đó |

| "chỉ cần X và Y" | Combo | Load X + Y |

| Không rõ intent | Hỏi 1 câu | Xem mục \*\*Fallback\*\* |



\### Fallback — Không rõ intent



Hỏi đúng 1 câu, không hỏi thêm:



```

Bạn muốn làm gì với CV này?

(1) Optimize / check match với JD

(2) Humanize — bỏ AI writing patterns

(3) ATS audit

(4) Research công ty / role

(5) Discovery session — surface kinh nghiệm chưa document

(6) Xuất PDF đẹp

(7) Combo — chỉ định cụ thể

```



\---



\## MODULE INDEX



| Module | File | Chức năng |

|--------|------|-----------|

| M0 | `modules/M0-context.md` | Context setup: career detect, company detect, industry detect |

| M1 | `modules/M1-match.md` | CV↔JD match score + bullet tags + gap summary |

| M2 | `modules/M2-edit.md` | Surgical edits (STAR, pre-humanized) + user gate |

| M3 | `modules/M3-ats.md` | ATS flags + industry keyword layer |

| M4 | `modules/M4-research-discovery.md` | Company research + role benchmark + discovery session |

| M7 | `modules/M7-humanize.md` | Humanizer sweep (document-level) |

| M8 | `modules/M8-render.md` | Color picker + HTML build + PDF render |



\*\*Thứ tự load:\*\* Đọc module file khi cần, không load trước.

M0 luôn chạy trước M1, M2, M3 nếu chưa có context.

M0 skip nếu context đã có từ lượt trước trong cùng session.



\---



\## OUTPUT RULES



\- M1 → M7: output text trong chat (hoặc `.md` nếu user yêu cầu save)

\- M8: output PDF file tới `/mnt/user-data/outputs/` — không xuất HTML

\- HTML chỉ được build để render PDF, không present ra user

\- Sau mỗi module: hỏi user muốn tiếp tục module nào tiếp theo

&#x20; (trừ khi route đã rõ và user đã confirm toàn bộ flow)

