\# M2 — Surgical CV Edits



Requires: CV + JD + M1 bullet tags (nếu không có M1 output → chạy M1 trước)



\---



\## 2.1 Pre-processing



1\. Pull bullet relevance tags từ M1

2\. Load `references/bullet-philosophy.md` — checklist bổ sung cho toàn bộ edits

3\. Load humanizer rules từ `references/humanizer-rules.md`

4\. Classify từng bullet: \*\*Duty\*\* vs \*\*Accomplishment\*\* (internal, không show)

&#x20;  - Duty: mô tả trách nhiệm, activity, process → mandatory rewrite

&#x20;  - Accomplishment: có outcome, metric, hoặc business impact → refine only

5\. Priority order: Duty bullets → \[LOW] → \[MED] → \[HIGH]

6\. Check bullet order trong mỗi role: strongest bullet phải đứng đầu

&#x20;  - Rank: metric achievement > outcome achievement > complex execution > standard execution > documentation/support

&#x20;  - Nếu order sai → propose reorder as 1 edit (label: REORDER, no content change)

7\. Check Summary: nếu M1 flagged claim-only → add Career Highlights conversion as Edit #1



\---



\## 2.2 Proposed Changes



Mỗi edit phải:

\- \*\*Nhỏ và cụ thể\*\* — một thay đổi, một cải tiến

\- \*\*Traceable\*\* — "Addresses JD requirement: X"

\- \*\*Interview-safe\*\* — không phóng đại, không bịa

\- \*\*Pre-humanized\*\* — text đề xuất đã pass humanizer rules trước khi show



\*\*Pre-edit classification (internal, không show):\*\*

Trước khi propose edit, classify bullet hiện tại:

\- \*\*Duty\*\* — mô tả trách nhiệm / task ("Responsible for...", "Coordinate with...", "Support...") → mandatory rewrite sang outcome-first

\- \*\*Accomplishment\*\* — có outcome hoặc operational improvement → refine only, không over-edit



\*\*Bullet Formula check (internal):\*\*

```

\[Outcome verb] + \[context/JD keyword] + by/through + \[method/tool/detail]

```

\- Lead word: first 3–5 words có phải outcome verb không?

&#x20; (Reduced / Improved / Led / Delivered / Generated / Accelerated / Optimized...)

\- Nếu không → rewrite để outcome lên đầu ("Lead with the punch")



\*\*STAR check (internal, trước khi show):\*\*

\- Action: bắt đầu bằng strong verb? ✓/✗

\- Result: có outcome hoặc metric? ✓/✗

\- Nếu Result thiếu → flag `\[needs metric]` visible



\*\*Quantification quality check (internal):\*\*

\- Có số → thêm check: số này có business meaning không?

&#x20; - Weak: "Managed 12 suppliers" (count only, no impact)

&#x20; - Strong: "Reduced supplier lead time 20% across 12 vendors"

\- Nếu số không có business meaning → suggest reframe hoặc flag `\[needs context]`



Format per edit:

```

── EDIT #N ────────────────────────────────────────────

Section:   Experience / Skills / Summary / Career Highlights

Relevance: \[HIGH / MED / LOW → action taken]

Type:      \[Duty→Outcome rewrite / Accomplishment refine / Prune / New section]

Current:   "..."

Suggested: "..."           ← humanizer-checked

STAR:      Action ✓ | Result ✓  (hoặc \[needs metric])

Lead:      Outcome-first ✓  (hoặc flag nếu không)

Quant:     \[Strong / Weak — note nếu số thiếu business meaning]

Why:       JD requirement addressed: \[...]

Impact:    keyword coverage / role clarity / ATS readability

Evidence:  Strong / Medium / Weak

───────────────────────────────────────────────────────

```



\*\*\[LOW] bullet handling:\*\*

\- Prunable (không có value dù rewrite) → suggest REMOVE + reason

\- Convertible → suggest rewrite toward JD relevance



Không full-rewrite trừ khi user yêu cầu.



\---



\## 2.2b — Career Highlights Draft (conditional)



Chỉ chạy nếu:

1\. M1 đã flag Summary là claim-only, \*\*và\*\*

2\. User confirm muốn restructure (tại M1 flag hoặc bất kỳ lúc nào)



\*\*Draft structure (5 bullets, tối đa):\*\*

```

CAREER HIGHLIGHTS



• \[X]+ years in \[domain(s)] — lấy từ CV, dùng "+" để tạo perception advantage

• \[Top achievement 1] — outcome-first, có metric nếu có

• \[Top achievement 2] — outcome-first, có metric nếu có  

• \[Key technical differentiator] — cert, tool, rare skill, hoặc industry exposure

• \[Humanizing / memorability factor — optional] — transferable signal, không hobby generic

```



\*\*Rules:\*\*

\- Không bịa — mọi bullet đều trace được về CV content

\- Không giữ Summary cũ nếu user chọn replace

\- Nếu user chọn giữ Summary → Career Highlights là section bổ sung phía trên Summary

\- Propose → user confirm → pass sang M3 / M7 / M8 như content bình thường



\---



\## 2.3 User Confirmation Gate



```

─── M2 SUMMARY ───────────────────────────────────────

Total edits proposed:  N

&#x20; Rewrites:            N

&#x20; Prune (remove):      N

&#x20; \[needs metric]:      N  ← cần input của bạn trước khi finalize



Confirm từng edit: "ok N" để approve, "skip N" để bỏ.

Hoặc: "ok all" / "ok all except N, M"



Với \[needs metric] bullets: cung cấp số liệu thực tế để tôi

hoàn thiện trước khi pass sang M3.

──────────────────────────────────────────────────────

```



Không tiếp tục M3 cho đến khi user confirm.



\---



\## 2.4 After Confirmation



\- Apply approved edits

\- Mark rejected edits là skipped (giữ nguyên bản gốc)

\- `\[needs metric]` bullets: nếu user cung cấp metric → insert và finalize;

&#x20; nếu skip → giữ flag visible trong M3 changelog

\- Pass assembled CV sang M3 (sweep) hoặc M7 (humanize) tùy route

