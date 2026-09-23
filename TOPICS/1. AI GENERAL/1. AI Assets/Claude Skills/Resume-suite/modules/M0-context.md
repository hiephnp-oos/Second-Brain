\# M0 — Context Setup



Chạy tự động trước M1, M2, M3. Skip nếu context đã có trong session.

Ba sub-task đều default ON.



\---



\## 0A — Career Context Detection



Scan CV + JD để detect:



\*\*Career Change flag:\*\*

\- So sánh job titles/domains trong CV vs JD

\- Nếu domain shift rõ ràng (vd: Manufacturing → Product Management):

&#x20; set `CAREER\_CHANGE: true`

\- Nếu `CAREER\_CHANGE: true` → M1 scoring: weight transferable skills cao hơn,

&#x20; penalize direct-match gaps ít hơn



\*\*Employment Gap flag:\*\*

\- Scan CV dates cho gaps > 6 tháng

\- Nếu có → ghi nhận, không penalize match score

\- Trong M2, suggest reframing gap nếu relevant



\*\*Output block:\*\*

```

CAREER CONTEXT:

\- Transition: \[same domain / career change — specify]

\- Employment gaps: \[none / gap at YYYY–YYYY]

\- Scoring mode: \[standard / transferable-skills-weighted]

```



\---



\## 0B — Company Research (Quick)



Chạy nếu company name có trong input. Đây là quick scan — research sâu dùng M4.



\*\*Search:\*\* company industry, culture signals, tech stack từ job postings, recent news

\*\*Nếu không tìm được:\*\* note và skip, không block pipeline



\*\*Output block:\*\*

```

COMPANY CONTEXT:

\- Industry: \[...]

\- Culture signals: \[...]

\- Tech stack found: \[...]

\- Impact on scoring: \[...]

```



\---



\## 0C — Industry Detection



Detect industry từ JD + CV content.



\*\*Priority:\*\*

1\. Explicit label trong JD ("automotive", "faucet manufacturing")

2\. Cert/tool signals: IATF 16949, VDA 6.3 → Manufacturing/Automotive

3\. Tool signals: SAP, PFMEA, PPAP → Manufacturing/Supply Chain

4\. Fallback: "General" — không apply industry keyword layer



\*\*Supported tags:\*\*

`Manufacturing/Automotive` · `Technology/Software` · `Finance/Accounting`

`Healthcare` · `Marketing/Sales` · `General`



\*\*Output block:\*\*

```

INDUSTRY DETECTED: \[tag]

→ Industry keyword layer \[active / inactive] tại M3

```



\---



\## M0 Combined Output



```

─── M0: CONTEXT SETUP ────────────────────────────────



CAREER CONTEXT:

\- Transition: \[...]

\- Employment gaps: \[...]

\- Scoring mode: \[...]



COMPANY CONTEXT:

\- Industry: \[...]

\- Culture signals: \[...]

\- Tech stack found: \[...]



INDUSTRY DETECTED: \[...]

→ Industry keyword layer: \[active / inactive]



──────────────────────────────────────────────────────

→ Tiếp tục \[M1 / module đã chọn]?

```

