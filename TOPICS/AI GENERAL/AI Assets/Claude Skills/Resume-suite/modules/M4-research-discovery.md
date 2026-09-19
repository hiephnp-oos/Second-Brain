\# M4 — Research \& Discovery



Hai phase độc lập, có thể chạy riêng hoặc cùng nhau.

\- \*\*Phase R\*\* (Research): company research + role benchmarking → Success Profile

\- \*\*Phase D\*\* (Discovery): branching session → surface kinh nghiệm chưa document



Requires: JD (cả hai phase). Company name (Phase R). CV với gap analysis (Phase D).



\---



\## PHASE R — Company Research \& Role Benchmarking



\### R1 — Job Description Parsing



Extract từ JD:

1\. \*\*Explicit requirements\*\* (must-have vs nice-to-have)

2\. \*\*Technical keywords\*\* và domain terminology

3\. \*\*Implicit preferences\*\* (cultural signals, hidden requirements)

4\. \*\*Red flags\*\* (overqualification risks, mismatches)

5\. \*\*Role archetype\*\* (IC technical / people leadership / cross-functional)



\---



\### R2 — Company Research



\*\*Web search queries:\*\*

```

1\. "{company\_name} mission values culture"

2\. "{company\_name} engineering blog"

3\. "{company\_name} recent news product launches"

4\. "{company\_name} team structure"

```



Tổng hợp: mission/values, cultural priorities, business model, company stage.



\*\*Nếu search không có kết quả hữu ích:\*\*

```

⚠️ Không tìm được thông tin công ty — fallback sang JD-only analysis.

Bạn có thêm context về company culture hoặc team structure không?

(Optional — có thể skip)

```



\---



\### R3 — Role Benchmarking



\*\*Strategy:\*\*

```

1\. Search: "site:linkedin.com {job\_title} {company\_name}"

2\. Fetch: Top 3–5 profiles

3\. Fallback: similar company nếu ít kết quả

```



Analyze patterns: common backgrounds, emphasized skills, terminology dùng để mô tả work tương tự, notable accomplishments.



\---



\### R4 — Success Profile Synthesis



Combine R1 + R2 + R3:



```

\## Success Profile: {Role} tại {Company}



\### Core Requirements (Must-Have)

\- {Requirement}: {Evidence từ JD/research}



\### Valued Capabilities (Nice-to-Have)

\- {Capability}: {Tại sao relevant trong context này}



\### Cultural Fit Signals

\- {Value}: {Cách demonstrate}



\### Narrative Themes

\- {Theme}: {Ví dụ từ similar role holders}



\### Terminology Map

User's term → Company-preferred term



\### Risk Factors

\- {Concern}: {Mitigation strategy}

```



\*\*Checkpoint:\*\*

```

Dưới đây là Success Profile dựa trên research:



{SUCCESS\_PROFILE\_SUMMARY}



Key findings:

\- {Finding 1}

\- {Finding 2}

\- {Finding 3}



Profile này có đúng với hiểu biết của bạn không?

Muốn điều chỉnh gì không trước khi tiếp tục?

```



Chờ user confirm trước khi tiếp tục.



\---



\## PHASE D — Experience Discovery Session



Mục đích: surface kinh nghiệm thực sự của user chưa được document trong CV.

Không bịa. Không phóng đại. Chỉ giúp user diễn đạt những gì họ thực sự đã làm.



\### D1 — Xác định gaps cần explore



Nếu có M1 output → dùng gap list từ M1.

Nếu không có M1 → parse JD và hỏi user về areas họ muốn explore.



Classify gaps:

\- \*\*HIGH-LEVERAGE\*\*: Appear trong critical JD requirements

\- \*\*MEDIUM-LEVERAGE\*\*: Nice-to-have hoặc implicit

\- \*\*LOW-LEVERAGE\*\*: Job-specific, minor



\---



\### D2 — Branching Interview



Với mỗi gap, conduct conversational branching (xem `references/branching-questions.md`).



\*\*Nguyên tắc:\*\*

\- Hỏi 1 câu tại một thời điểm — không dội câu hỏi

\- Branch dựa trên câu trả lời của user

\- Quantify khi có thể: "Có metric nào không?"

\- Biết khi nào nên dừng — không exhaust user

\- User có thể skip bất kỳ gap nào



\*\*Mở đầu mỗi gap:\*\*

```

"{SKILL/EXPERIENCE} là một trong những gaps so với JD.



Leverage: {HIGH/MEDIUM/LOW} — {giải thích tại sao relevant}

Best match hiện tại trong CV của bạn: {quote bullet nếu có} ({score}%)



{Branching question — xem references/branching-questions.md}

```



\---



\### D3 — Capture \& Articulate



Với mỗi kinh nghiệm được discover:



```

\## Kinh nghiệm được discover: {Mô tả ngắn}

\- Context: {Ở đâu / khi nào}

\- Scope: {Scale, duration, impact}

\- Addresses gap: {Gap nào}

\- Draft bullet: "{Achievement-focused bullet}"

\- Confidence: {Mức độ fill gap — High/Medium/Low}

```



\---



\### D4 — Integration Decision



Sau discovery session:

```

Tôi đã capture {N} kinh nghiệm mới. Với mỗi kinh nghiệm:



1\. THÊM VÀO CV — Integrate ngay vào CV draft

2\. GHI NHỚ — Không thêm vào CV lần này nhưng có thể dùng sau

3\. BỎ QUA — Không đủ relevant



Quyết định cho từng kinh nghiệm?

```



\---



\## M4 OUTPUT



\*\*Phase R output:\*\* Success Profile document (text trong chat)

\*\*Phase D output:\*\* Discovered experiences + draft bullets (text trong chat)



Nếu user muốn save → xuất `.md`.

Nếu muốn integrate discovered bullets vào CV → route sang M2 (edit) hoặc M8 (render).

