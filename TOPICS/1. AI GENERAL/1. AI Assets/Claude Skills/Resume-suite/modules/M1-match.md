\# M1 — CV ↔ JD Match Analysis



Requires: CV + JD + M0 context



\---



\## 1.1 Match Score (0–100%)



So sánh CV trực tiếp với JD requirements. Không infer requirements ngoài JD.

Nếu `CAREER\_CHANGE: true` từ M0 → weight transferable skills cao hơn.



```

Match Score: XX%

```



Mỗi điểm tăng/giảm phải nêu:

\- JD yêu cầu gì

\- CV có / không có gì



\---



\## 1.2 JD Requirement Coverage Map



Với mỗi explicit JD requirement:



| Status | Meaning |

|--------|---------|

| ✅ Covered | Bằng chứng rõ trong CV |

| ⚠️ Partial | Có nhắc nhưng mỏng hoặc gián tiếp |

| ❌ Missing | Không có bằng chứng |



Không infer requirements JD không nêu.



\---



\## 1.3 Section-Level Fit Score



Score từng section CV theo JD relevance:

\- Summary · Experience · Skills · Projects (nếu có)



Brief note per section: đang làm tốt gì, thiếu gì.



\---



\## 1.4 Bullet Relevance Tags



Tag từng bullet trong Experience:



| Tag | Meaning |

|-----|---------|

| \[HIGH] | Khớp trực tiếp với JD requirement |

| \[MED] | Relevant nhưng gián tiếp hoặc partial |

| \[LOW] | Không relevant với JD này — candidate for pruning |



Format:

```

\[Company] — \[Role]:

\[HIGH] Led R\&D projects through Stage Gate... → matches: NPD process

\[MED]  Designed packaging concepts... → partial: DFM breadth

\[LOW]  Coordinated pallet layouts... → ngoài scope JD

```



\---



\## 1.4b — Structural Flag: Summary Section



Scan CV header area:

\- Nếu CV có \*\*Summary section\*\* mà nội dung là claim-only (không có outcome, metric, hoặc differentiator cụ thể):

&#x20; → Flag một lần:

&#x20; ```

&#x20; ⚠️ STRUCTURAL NOTE: Summary hiện tại thiên về self-description.

&#x20;    Consider converting to a "Career Highlights" block (3–5 bullet outcomes).

&#x20;    → Effect: recruiter scan nhanh hơn, impact density cao hơn.

&#x20;    Muốn restructure? Tôi sẽ draft tại M2.

&#x20; ```

\- Nếu Summary đã có outcomes / metrics / differentiators → không flag, không đề xuất.

\- Flag này chỉ xuất hiện \*\*một lần\*\* tại M1. Không lặp ở M2, M3.



\---



\## 1.5 Gap Summary Block



```

─── GAP SUMMARY ──────────────────────────────────────



CRITICAL GAPS (❌ Missing, JD requires):    N items

&#x20; - \[list]



PARTIAL GAPS (⚠️ Thin coverage):            N items

&#x20; - \[list]



LOW-relevance bullets:                      N items

&#x20; → Recommend pruning hoặc convert trong M2



─── VERDICT ──────────────────────────────────────────

Match Score: XX%



PROCEED          → Score ≥ 70%, gaps addressable trong M2

STRENGTHEN FIRST → Score ≥ 70% nhưng có critical gap cần

&#x20;                  user input trước (vd: thiếu metric, thiếu skill)

DO NOT APPLY     → Score < 70%, quá nhiều critical gaps



──────────────────────────────────────────────────────

```



\## 1.6 Structural Flag — Summary Quality



Scan Summary/Profile section (if present):



\*\*Claim-only signals\*\* (any 2+ present → flag):

\- Phrases: "responsible for", "experience in", "focused on", "strong background", "skilled in" without supporting metric

\- No USD / % / count / time metrics anywhere in Summary

\- No specific outcomes mentioned



\*\*If claim-only detected:\*\*

```

─── STRUCTURAL NOTE ──────────────────────────────────

⚠️  Summary is claim-heavy with no measurable outcomes.

&#x20;   Recommend: Convert to "Career Highlights" format.

&#x20;   Career Highlights = \[X]+ years → win 1 (metric) → win 2 (metric)

&#x20;                      → differentiator → optional humanizing factor

&#x20;   This will be addressed in M2 if you proceed.

──────────────────────────────────────────────────────

```



If Summary already outcome-dense → no flag.

If CV has Career Highlights section already → no flag.



\---



\*\*GATE:\*\*

\- Score < 70% → dừng. Giải thích gaps. Hỏi user có muốn tiếp không.

\- Score ≥ 70% → đề nghị tiếp tục M2.

\- "STRENGTHEN FIRST" → list những gì user cần cung cấp trước.

