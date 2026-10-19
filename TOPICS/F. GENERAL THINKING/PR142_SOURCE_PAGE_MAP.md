# PR #142 — Source Page Map (Stage 0)

**Canonical source:** PDF. All page numbers below are physical 1-based PDF page positions unless explicitly labelled printed locator. This is a structural navigation map only, not semantic-review evidence.

## Inventory and source-map coverage

| Book | PDF pages | TOC/content-list physical pages | Source locator | Mapping outcome / limitation |
|---|---:|---|---|---|
| 01 Thinking Strategically | 396 | 8 | PDF bookmark export (21 entries) | All entries in range; heading-only title pages and next-page title continuations accounted for |
| 02 The Art of Strategy | 550 | 8 | PDF bookmark export (22 entries) | All entries in range; chapter 7 title locator at p.185, title follows on p.186 |
| 03 A Course in Game Theory | 368 | 5–9 | PDF bookmark export (117 entries) | All 117 entries matched target physical pages |
| 04 The Strategy of Conflict | 394 | 4 | PDF bookmark export (73 entries) | All 73 entries matched target physical pages |
| 05 The Evolution of Cooperation | 243 | 5–6 | PDF bookmark export (32 entries) | All entries in range; notes/back matter use section-opening pages |
| 06 Thinking in Systems | 235 | 8 | PDF bookmark export (82 entries) | All 82 entries matched target physical pages |
| 07 Statistical Rethinking — split 01 | 346 | 3–5 | PDF bookmark export (73 entries) | All entries in range; chart/equation-heavy pages may not expose heading text |
| 07 Statistical Rethinking — split 02 | 271 | continuation | PDF bookmark export (47 entries) | All 47 entries matched target physical pages relative to split; aggregate mapping uses +346 page offset |
| 08 Superforecasting | 224 | 7 | PDF bookmark export (22 entries) | All entries in range; front matter/title-page entries may be image-only |
| 09 The Scout Mindset | 64 | 6 | Supplied summary content list | Summary source only; not a full-book chapter map |
| 10 Thinking, Fast and Slow | 533 | 4–6 | TOC headings; physical start headings verified from PDF text | TOC does not print page locators; physical starts mapped below |
| 11 Influence | 279 | 5 | TOC printed locators + chapter headings | Printed-to-physical mapping verified below |
| 12 Getting to Yes | 90 | 3 | TOC printed locators + section headings | Printed-to-physical mapping verified below |
| 13 Never Split the Difference | 375 | 5 | TOC chapter headings + physical chapter headings | Electronic-edition pagination differs from other editions; physical PDF pages are authoritative |
| 14 Thinking in Bets | 247 | 6–8 | TOC chapter headings + physical chapter headings | TOC does not consistently provide page locators; physical starts mapped below |
| 15 Good Strategy, Bad Strategy | 246 | 7 | TOC chapter headings + physical chapter headings | TOC does not consistently provide page locators; physical starts mapped below |
| 16 The Checklist Manifesto | 223 | 9–10 | TOC printed locators + chapter headings | Physical starts mapped; remains outside Books 01–15 core scope |

## Physical chapter/section starts for sources without bookmark exports

- **Book 10 — Thinking, Fast and Slow:** Introduction p.7; chapters 1–9: pp.21, 33, 41, 52, 61, 72, 79, 89, 97; chapters 10–18: pp.108, 118, 128, 136, 144, 153, 163, 172, 182; chapters 19–24: pp.195, 204, 216, 227, 238, 248; chapters 25–34: pp.261, 270, 281, 292, 302, 314, 326, 334, 345, 354; chapters 35–38: pp.367–368, 377, 382, 389. Chapter 35 has a section/title transition across pp.367–368.
- **Book 11 — Influence:** Introduction p.8; chapters 1–7: pp.11, 23, 53, 97, 136, 167, 188; notes p.221; bibliography/index are in the back matter.
- **Book 12 — Getting to Yes:** Introduction p.6; sections/chapters 1–8: pp.7, 13, 23, 31, 42, 50, 54, 64; conclusion p.71; “Ten Questions” section p.72.
- **Book 13 — Never Split the Difference:** chapters 1–10: pp.8, 36, 70, 102, 130, 152, 188, 216, 249, 281. The PDF itself notes that electronic-edition pagination does not match the edition used for other locators.
- **Book 14 — Thinking in Bets:** introduction/content begins before chapter 1; chapters 1–6: pp.12, 38, 66, 98, 123, 141; notes begin p.189.
- **Book 15 — Good Strategy, Bad Strategy:** chapters 1–18: pp.19, 25, 32, 48, 60, 72, 77, 84, 89, 100, 106, 112, 123, 137, 151, 160, 169, 180; notes begin p.194.
- **Book 16 — The Checklist Manifesto:** chapters 1–9: pp.27, 44, 60, 84, 98, 126, 148, 170, 199; notes begin p.208.

## Statistical Rethinking aggregate/split identity

- Aggregate PDF: 617 pages, SHA-256 `a1557fc384f68731d1360f2d6272910c080d18901a934c427193dae787b6ebc7`.
- Split PDFs: 346 + 271 = 617 pages.
- Normalized extracted text: 617/617 corresponding physical page positions match, zero text mismatches.
- Rendered page-image SHA-256: all 15 corresponding page positions without extractable text match.
- Split 02 local physical page 1 maps to aggregate physical page 347; do not apply a single printed-page offset to other locators without checking the actual page label.

## Stage 0 boundary

This map closes the archive-identity and structural-navigation inputs. It does **not** assert PDF↔Markdown semantic equivalence, visual/equation completeness, or any book review batch completion. Book 09 remains summary-limited. Book 16 remains outside the Books 01–15 completion scope.
