# F. GENERAL THINKING — PR #142 Book Review Execution Plan

Execution companion to the review plan agreed for PR #142. This file and the ledger are maintained on the existing PR branch.

## Evidence and completion rules
- Canonical source: each supplied book PDF. Paired Markdown is only a retrieval aid.
- Keep PDF physical page (1-based) separate from printed page/locator.
- Record each substantive paragraph/claim, example, figure/table/diagram/equation, note, and relevant reference with an explicit disposition: ADD / UPDATE / REMOVE / NO_CHANGE / NOT_APPLICABLE.
- Any NOT_APPLICABLE entry must state why it has no separate knowledge promotion.
- Structural or TOC coverage is not semantic completion. Record separate structural, semantic-unit, visual/equation, and repository-mapping coverage.
- Reconcile one-owner framework knowledge with Synthesis (cross-framework), Reflection (experience-derived), and Personal Principles (validated user-owned rules). Do not reintroduce retired book-level duplicate folders.
- Read back every changed target file against the ledger and PDF evidence. Preserve qualifications, assumptions, limitations, notation, causal direction and source-quality constraints.
- Do not claim a check passed unless it was actually run and its result recorded here or in linked evidence.
- Book 09 is limited to the supplied summary. Book 16 requires a distinct scope decision and is excluded from the Books 01–15 completion claim.
- PR #142 remains open and draft until the user reviews it; do not merge.

## Stage status
| Stage | Scope | Gate | Current status |
|---|---|---|---|
| 0 | Inventory, identity, PDF/MD pairing, TOC/source maps, Statistical Rethinking aggregate/split reconciliation | All files hashed/page-counted; PDF TOCs checked; missing/visual extraction issues recorded; baseline ledger exists | IN PROGRESS |
| 1 | Books 01–05 | Each batch closed with unit dispositions, evidence and read-back | NOT VERIFIED |
| 2 | Book 06 — Thinking in Systems | Full source-unit ledger; diagrams and equations checked; all issues dispositioned; all four framework target files read back; links/references validated | BLOCKED / IN PROGRESS |
| 3 | Books 07–10 | Starts only after Book 06 PASS; Statistical Rethinking alignment gate first | BLOCKED |
| 4 | Books 11–13 | Chapter and back-matter disposition plus PDF TOC verification | NOT STARTED |
| 5 | Books 14–15 | Full section/example coverage and overlap decisions | NOT STARTED |
| 6 | Book 16 | Explicit scope approval separate from core Books 01–15 | OUT OF CORE SCOPE |
| 7 | Cross-layer / full-topic review | Traceability, ownership, duplicates, links, README, validator and PR status reconciled | NOT STARTED |

## Stage 0 — source inventory baseline
The local supplied archive contains Books 01–16, with PDF/Markdown pairs for Books 01–08 and 10–16; Book 09 is a summary source. Statistical Rethinking is supplied as one aggregate PDF plus two split PDFs and matching Markdown extracts. The local inventory/recheck artifacts are working evidence only; they must be reconciled into a stable repository ledger/source map before Stage 0 is called PASS.

Verified PDF facts from the local inventory:
| ID | Source | PDF pages | SHA-256 |
|---|---|---:|---|
| 01 | Thinking Strategically | 396 | 160f0f98d2227be072355397c776045ccb9cbd9314a4fbc3e1a1f8c9d6dfa872 |
| 02 | The Art of Strategy | 550 | 2feef26987bf4f1a62ad7b76bc0661050176fe66342af0c92e1768cbe4e4422f |
| 03 | A Course in Game Theory | 368 | 70733e532ffbcd7a010f5c9fc041ddb07eab56f9caacd860e2ad4578fccd22c8 |
| 04 | The Strategy of Conflict | 394 | 185b477cfe4b1c4de67d413adcec84fcae9b0b519b583a4706cece9cf8c4373e |
| 05 | The Evolution of Cooperation | 243 | e816ca61aebd84159747d248fedd6d5ff318c471c36bcc31b1ac6bf9aebcd3c1 |
| 06 | Thinking in Systems | 235 | 7c36a258dfa10af3069a9b877b276914581788147f038c1509386783e1a99e4d |
| 07 | Statistical Rethinking (aggregate) | 617 | a1557fc384f68731d1360f2d6272910c080d18901a934c427193dae787b6ebc7 |
| 07a | Statistical Rethinking split 01 | 346 | 69ff648ee126b1d06326c44c1cd4f610bcebb5115b8e2a1b45962c750a21701f |
| 07b | Statistical Rethinking split 02 | 271 | 5f9b4a1caeea248605789a002736a094fce4c1efc8fb41fbea12143534cf101a |
| 08 | Superforecasting | 224 | ca472105ea7137e56be706677d4bfbfb37ac035531c67f0bef68fcb37d38febb |
| 09 | The Scout Mindset summary | 64 | 0b239d84bfcb06f9682c52df4fba5665980daac40e79ea9b4b98145ef4236c0d |
| 10 | Thinking, Fast and Slow | 533 | 2ebd90d54b93c2ac2f55187976f513bffc59e41c72a7ea710a7ba27b05ce5aa5 |
| 11 | Influence | 279 | b71d64837c821dd1673a02ef4444d26c7af302fd8ca2125a57124d358f5d31b0 |
| 12 | Getting to Yes | 90 | 234a934b4e617a411ff21eaf79aa59c0d8546153bb138a79d18cb571ba7778e1 |
| 13 | Never Split the Difference | 375 | 195d8af289e9d60fa233c94c12a5038a0d4b016d94875c0e4c87b8d456f6b841 |
| 14 | Thinking in Bets | 247 | bbf361977cc2c3e15ecd8009e4f9af11ab5c91edcee1b0e022dc7901c6a9e264 |
| 15 | Good Strategy, Bad Strategy | 246 | b57d5b01849e7443ec31fced8fa7db03920ffa71f74b924496dc15d31d36660d |
| 16 | The Checklist Manifesto | 223 | 9ed30d0915c5599f1cbc574d886b21768750dea20aacdd3abf5e58df9293be91 |

The exact TOC and page/printed-locator mapping still needs visual validation for every book; Book 06 PDF embedded TOC has been inspected and records Introduction at physical PDF page 18, Chapter One p.28, Chapter Two p.52, Chapters Three–Seven at p.92/103/128/162/183, Appendix p.204, Notes p.221, bibliography p.225, acknowledgments p.228, author p.230 and index p.232. These values are physical outline destinations, not proof that every content unit has been reviewed.

## Statistical Rethinking split-PDF gate
Aggregate source is the pagination anchor. The split files have 346 + 271 = 617 physical pages, matching the aggregate count, but that alone does not prove page identity or absence of duplicate/missing pages. Compare normalized per-page text and, where text comparison is insufficient, visual/page fingerprints across aggregate and split PDFs. Map all chapter boundaries separately against aggregate and split page numbers; do not apply one constant offset. Close this gate only with documented boundary and mismatch results.

## Book 06 mandatory semantic gate
Current repository source-traceability explicitly states the full semantic audit is NOT YET VERIFIED. Existing section-level tables, approximately 883 candidate text blocks, nine model headings and counts such as 67 notes or 17 bibliography entries are not sufficient denominators. Required batches:
- B06-A: front matter, TOC, Introduction and definitions.
- B06-B: Chapter One; every substantive section, example, figure and feedback diagram.
- B06-C: Chapter Two; each systems-zoo model, graph, diagram, setup and assumption.
- B06-D: Chapter Three; resilience, self-organization, hierarchy and supporting evidence.
- B06-E: Chapter Four; event/behavior/structure, nonlinearity, boundaries, limits, delays, bounded rationality.
- B06-F: Chapter Five; each of eight traps and each proposed way out as separately traceable units.
- B06-G: Chapter Six; all 12 leverage points, source order, definitions, caveats and examples.
- B06-H: Chapter Seven; all 15 guidelines and their supporting reasoning/qualifications.
- B06-I: Appendix glossary, principles, trap summaries, leverage-point list, guidelines and every equation/model specification.
- B06-J: Notes, bibliography, acknowledgments, author bio, index, credits and relevant paratext.
- B06-K: cross-chapter deduplication, issue disposition, links/references and full read-back of concepts.md, mental-models.md, applications.md, lessons.md and book-06 traceability.

The target framework files currently contain a number of useful distilled items (including SYS-MM-62/63 and SYS-L-26/27) but they are not evidence of a completed semantic audit. Review source by source and preserve meaningful distinctions. In particular, model equation catalog entries are indexes, not equation verification; no numerical simulation validation should be implied unless performed.

## Batch closure log
| Batch | Source coverage denominator | VERIFIED | ADD | UPDATE | REMOVE | NO_CHANGE | NOT_APPLICABLE | Open fixes | Result / evidence |
|---|---:|---:|---:|---:|---:|---:|---:|---|---|
| Stage 0 | TBD | 0 | 0 | 0 | 0 | 0 | 0 | TOC/visual mappings; PDF/MD comparison; Statistical Rethinking per-page matching | IN PROGRESS |
| B01-A–B01-E | TBD | 0 | 0 | 0 | 0 | 0 | 0 | Create source-unit ledger from PDF, reconcile to existing files | NOT VERIFIED |
| B02-A–B02-E | TBD | 0 | 0 | 0 | 0 | 0 | 0 | Create source-unit ledger from PDF, reconcile to existing files | NOT VERIFIED |
| B03-A–B03-G | TBD | 0 | 0 | 0 | 0 | 0 | 0 | Create source-unit ledger from PDF, reconcile to existing files | NOT VERIFIED |
| B04-A–B04-G | TBD | 0 | 0 | 0 | 0 | 0 | 0 | Create source-unit ledger from PDF, reconcile to existing files | NOT VERIFIED |
| B05-A–B05-F | TBD | 0 | 0 | 0 | 0 | 0 | 0 | Create source-unit ledger from PDF, reconcile to existing files | NOT VERIFIED |
| B06-A–B06-K | TBD | 0 | 0 | 0 | 0 | 0 | 0 | Full semantic-unit and visual/equation review is open | BLOCKED / IN PROGRESS |

## Execution record
- Initial repository state was reviewed; Books 01–15 were only marked structurally accepted in the core manifest.
- Book 06 target's explicit semantic status remains open; downstream Book 07 is blocked.
- Next eligible action: build a fully reconciled source-unit ledger and verify source-map inputs before making claims of batch completion.
