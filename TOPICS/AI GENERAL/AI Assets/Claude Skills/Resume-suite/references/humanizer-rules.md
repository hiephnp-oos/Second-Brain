\# Humanizer Rules — CV Context



Used by Stage 2 (pre-check per edit) and Stage 3 (document sweep).

CV has different rules from prose — respect structure while removing AI patterns.



\---



\## What TO fix



\### Remove these AI patterns:

\- Buzzwords: "dynamic", "passionate", "results-driven", "synergy", "leverage",

&#x20; "spearhead", "cutting-edge", "innovative", "transformative", "robust"

\- Significance inflation: "played a pivotal role in transforming...",

&#x20; "marking a key milestone...", "instrumental in..."

\- Vague claims: "significantly improved efficiency" → quantify or remove

\- Copula avoidance: "serves as lead architect" → "lead architect"

\- Filler openers: "Responsible for...", "Tasked with..." → start with verb

\- Promotional language: "groundbreaking", "world-class", "best-in-class"

\- Excessive hedging in summary: "seeking to leverage synergies..."

\- Generic conclusions: "passionate about making an impact"

\- Negative parallelism: "Not just X but Y" → state the point directly

\- Vague attributions: "Industry-recognized", "Award-winning" without specifics

\- Rule of three padding: "efficient, effective, and impactful" → pick one or quantify



\### Add voice (where applicable):

\- Specific numbers over vague claims

\- Concrete outcomes over activity descriptions

\- Real constraints or tradeoffs where relevant

\- STAR structure: Action + context + measurable Result



\---



\## What NOT to touch in a CV



| Element | Rule |

|---------|------|

| Bullet point structure | Keep — do not convert to prose |

| Bold for company names, job titles, headers | Keep |

| Title Case for job titles | Keep |

| Date ranges with em dash (2022–2024) | Keep exactly |

| Technical acronyms (PPAP, FMEA, IQ/OQ) | Keep exactly as-is |

| Tool names (SolidWorks, SAP, AutoCAD) | Keep exactly as-is |

| First-person "I" | CVs omit it — do not add |

| Parallel structure in bullet lists | Keep — do not vary for the sake of variety |



\---



\## Stage 2 Per-Edit Check



Before showing a suggested edit to user, verify:

1\. Does the suggested text contain any pattern from "Remove" list above? → fix

2\. Does it touch anything in "Not to touch" list? → revert that part

3\. Does it have a clear Action verb at start? → if not, rewrite opener

4\. Does it have a Result or metric? → if not, flag `\[needs metric]`



\---



\## Stage 3 Document-Level Check



After all approved edits are assembled into full CV:

1\. Scan for tone inconsistency between edited and unedited bullets

2\. Flag repeated action verbs (3+ times in same role) — suggest variation

3\. Check summary still reflects post-edit CV content

4\. Scan untouched sections for leftover AI patterns that now clash with clean sections



Scope is narrow — only fix what Stage 2 approvals created as inconsistency.

Do not re-edit user-rejected bullets.

