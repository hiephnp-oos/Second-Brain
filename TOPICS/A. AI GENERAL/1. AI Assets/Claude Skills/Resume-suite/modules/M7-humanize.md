\# M7 — Humanizer Sweep



Document-level humanizer pass. Dùng standalone hoặc sau M2/M3.

Load rules từ `references/humanizer-rules.md`.



\---



\## Scope



\*\*Làm:\*\*

\- Remove AI writing patterns trong toàn bộ CV

\- Fix tone inconsistency giữa các sections

\- Flag repeated action verbs

\- Align summary với body sau edits



\*\*Không làm:\*\*

\- Không introduce new content

\- Không touch technical acronyms, tool names, date formats

\- Không re-edit bullets user đã explicitly reject ở M2

\- Không convert bullet structure sang prose

\- Không add first-person "I"



\---



\## M7.1 — Document Scan



Scan toàn bộ CV theo checklist:



| Check | Pattern cần remove |

|-------|--------------------|

| Buzzwords | "dynamic", "passionate", "results-driven", "synergy", "leverage", "spearhead", "cutting-edge", "innovative", "transformative", "robust" |

| Inflation language | "played a pivotal role in transforming...", "instrumental in...", "marking a key milestone..." |

| Vague claims | "significantly improved efficiency" → quantify hoặc remove |

| Filler openers | "Responsible for...", "Tasked with..." → start with verb |

| Promotional | "groundbreaking", "world-class", "best-in-class" |

| Excessive hedging | "seeking to leverage synergies..." |

| Generic conclusions | "passionate about making an impact" |

| Rule of three padding | "efficient, effective, and impactful" → pick one hoặc quantify |

| Vague attributions | "Industry-recognized" không có specifics |



\---



\## M7.2 — Output Format



\*\*Nếu không có vấn đề:\*\*

```

M7 sweep: Không phát hiện AI patterns đáng kể.

CV đã clean.

```



\*\*Nếu có vấn đề:\*\*

```

─── M7 HUMANIZER SWEEP ───────────────────────────────



BUZZWORDS FOUND:

\- \[Section/bullet]: "results-driven" → suggest: remove hoặc replace bằng specific outcome

\- \[Section/bullet]: "spearheaded" → suggest: verb cụ thể hơn (led, built, launched)



INFLATION LANGUAGE:

\- \[Section]: "instrumental in transforming..." → rewrite: "\[specific action] resulted in..."



VAGUE CLAIMS:

\- \[Bullet]: "significantly improved efficiency" → \[needs metric] flag



REPEATED VERBS:

\- "Led" xuất hiện 5× trong Experience → suggest varying: managed, directed, coordinated



SUMMARY ISSUES:

\- Summary: 3 buzzwords detected → suggest rewrite



──────────────────────────────────────────────────────

Áp dụng tất cả? Hoặc review từng item?

```



\---



\## M7.3 — DO NOT TOUCH List



| Element | Rule |

|---------|------|

| Bullet point structure | Giữ nguyên |

| Bold company names, titles, headers | Giữ nguyên |

| Title Case cho job titles | Giữ nguyên |

| Date ranges (2022–2024) | Giữ nguyên chính xác |

| Technical acronyms (PPAP, FMEA, IQ/OQ) | Giữ nguyên |

| Tool names (SolidWorks, SAP, AutoCAD) | Giữ nguyên |

| Parallel bullet structure | Giữ nguyên |



\---



\## M7.4 — After Sweep



Output CV đã clean vào chat.

User request `.md` → xuất file.

User request PDF → route sang M8.

