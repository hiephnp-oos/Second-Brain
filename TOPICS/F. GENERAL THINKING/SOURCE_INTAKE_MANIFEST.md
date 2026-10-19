# Core Reading Source Intake Manifest

**Authority:** Book PDF is canonical. Markdown is a retrieval/extraction aid. If they differ, PDF wins. Full copyrighted source text remains outside public GitHub.

Inventory: 18 PDFs + 17 Markdown parts represent 16 book identities; Statistical Rethinking has one aggregate PDF plus two split PDFs, with two split Markdown parts.

| ID | PDF | MD | Status |
|---|---:|---:|---|
|01|396 pp|5,790 lines|STRUCTURALLY ACCEPTED|
|02|550 pp|5,848 lines|STRUCTURALLY ACCEPTED|
|03|368 pp|9,322 lines|STRUCTURALLY ACCEPTED|
|04|394 pp|5,616 lines|STRUCTURALLY ACCEPTED|
|05|243 pp|4,028 lines|STRUCTURALLY ACCEPTED|
|06|235 pp|6,116 lines|STRUCTURALLY ACCEPTED|
|07|346+271 pp|16,654+7,123 lines|STRUCTURALLY ACCEPTED|
|08|224 pp|2,486 lines|STRUCTURALLY ACCEPTED|
|09|64 pp|1,006 lines|STRUCTURALLY ACCEPTED — SUMMARY SOURCE|
|10|533 pp|7,064 lines|STRUCTURALLY ACCEPTED|
|11|279 pp|3,158 lines|STRUCTURALLY ACCEPTED|
|12|90 pp|1,928 lines|STRUCTURALLY ACCEPTED|
|13|375 pp|3,630 lines|STRUCTURALLY ACCEPTED|
|14|247 pp|1,962 lines|STRUCTURALLY ACCEPTED|
|15|246 pp|3,436 lines|STRUCTURALLY ACCEPTED|
|16|223 pp|1,712 lines|REVIEWED — NORMALIZATION REQUIRED|

## PDF↔Markdown validation gate
Validate pairing, title/author, chapter hierarchy, reading order, paragraph/list/table/equation boundaries, footnotes/page markers, figures/diagrams, OCR corrections and traceability. Normalization must not become summarization.

`STRUCTURALLY ACCEPTED` allows controlled knowledge extraction; it does not make Markdown canonical. The summary-source state is explicitly scope-limited.

Cross-book findings: escaped headings, pipe-heavy regions, equations, code, figures and game trees require PDF-aware interpretation. Word-volume agreement is only a coverage signal.

Books 01–15 passed the PDF-first structural gate. Book 16 remains blocked.
## Direct archive recheck — 2026-10-19

Directly inspected the user-supplied `BOOK.zip`, then the follow-up `BOOK_FULL.zip`. The first archive contains **17 PDFs + 17 Markdown files**; `BOOK_FULL.zip` contains **18 PDFs + 17 Markdown files** for 16 book identities, adding the aggregate Statistical Rethinking PDF. Page counts, PDF SHA-256, Markdown line counts and Markdown SHA-256 below were recomputed from the supplied archive. TOC/content-list pages were rendered and visually inspected; all locators here are **physical 1-based PDF pages**, not printed locators.

| ID | PDF | Pages | PDF SHA-256 | Paired MD | MD lines | MD SHA-256 | Visually checked TOC/list page |
|---|---|---:|---|---|---:|---|---|
| 01 | `01 - Thinking Strategically.pdf` | 396 | `160f0f98d2227be072355397c776045ccb9cbd9314a4fbc3e1a1f8c9d6dfa872` | `01 - Thinking Strategically.md` | 5790 | `d62ccd56c3359d23d80c472cd9b1d76bdf723bc69332b62a188d56497206d27d` | p.8 |
| 02 | `02 - The Art of Strategy.pdf` | 550 | `2feef26987bf4f1a62ad7b76bc0661050176fe66342af0c92e1768cbe4e4422f` | `02 - The Art of Strategy.md` | 5848 | `99d62d4306cf2f30141267888e5181f33752ef5a5e4c0ccdd2259c656f2fffee` | p.8 |
| 03 | `03 - A Course in Game Theory.pdf` | 368 | `70733e532ffbcd7a010f5c9fc041ddb07eab56f9caacd860e2ad4578fccd22c8` | `03 - A Course in Game Theory.md` | 9322 | `a5ea281b64ebf222a51cb2251095aa33c4aca52d4d84b37b5ebc360fc2894722` | pp.5–9 |
| 04 | `04 - The Strategy of Conflict.pdf` | 394 | `185b477cfe4b1c4de67d413adcec84fcae9b0b519b583a4706cece9cf8c4373e` | `04 - The Strategy of Conflict.md` | 5616 | `3f024fd4cb834a107ff8065f82c308ede488e3d25430265a7f2c43415d7e852c` | p.4 |
| 05 | `05 - The Evolution of Cooperation.pdf` | 243 | `e816ca61aebd84159747d248fedd6d5ff318c471c36bcc31b1ac6bf9aebcd3c1` | `05 - The Evolution of Cooperation.md` | 4028 | `0140e0a4eeb1c469d94bdea1e3918acda0cffc988e61cb69a359f1501a4d99f1` | pp.5–6 |
| 06 | `06 - Thinking in Systems.pdf` | 235 | `7c36a258dfa10af3069a9b877b276914581788147f038c1509386783e1a99e4d` | `06 - Thinking in Systems.md` | 6116 | `e879047ec3eecf37d5afa9751dfae48dd48029e87339de858a7928b03428e74d` | p.8 |
| 07 | `07 - Statistical Rethinking.pdf` (aggregate) | 617 | `a1557fc384f68731d1360f2d6272910c080d18901a934c427193dae787b6ebc7` | — (aggregate anchor; no separate MD) | — | — | — |
| 07a | `07 - Statistical Rethinking_01.pdf` | 346 | `69ff648ee126b1d06326c44c1cd4f610bcebb5115b8e2a1b45962c750a21701f` | `07 - Statistical Rethinking_01.md` | 16654 | `b0f4eb9ac21a375788e22ef4f77285c682b9e0520aa9fd4f598e2161d46e3dfc` | pp.3–5 |
| 07b | `07 - Statistical Rethinking_02.pdf` | 271 | `5f9b4a1caeea248605789a002736a094fce4c1efc8fb41fbea12143534cf101a` | `07 - Statistical Rethinking_02.md` | 7123 | `af7806464d86c7d2208a708c5a8c81ab1e9b02c133e9b5ad3fdcbaaf2be70155` | none; continuation split |
| 08 | `08 - Superforecasting.pdf` | 224 | `ca472105ea7137e56be706677d4bfbfb37ac035531c67f0bef68fcb37d38febb` | `08 - Superforecasting.md` | 2486 | `073bb292d5c2d385ce735a8a065bae0cd2201b130e3be6bb02cd13322bce98c0` | p.7 |
| 09 | `09 - The Scout Mindset.pdf` | 64 | `0b239d84bfcb06f9682c52df4fba5665980daac40e79ea9b4b98145ef4236c0d` | `09 - The Scout Mindset.md` | 1006 | `29bedc235c6e4c44379c5cdbbfc8a483daadcd6481657a27bd21e42ac0ba7443` | p.6; summary content list only |
| 10 | `10 - Thinking, Fast and Slow.pdf` | 533 | `2ebd90d54b93c2ac2f55187976f513bffc59e41c72a7ea710a7ba27b05ce5aa5` | `10 - Thinking, Fast and Slow.md` | 7064 | `af3099a5679b0a0a0e55c400895d673b40567e17d4eff43a2d3959b1adfe5267` | p.4 |
| 11 | `11 - Influence.pdf` | 279 | `b71d64837c821dd1673a02ef4444d26c7af302fd8ca2125a57124d358f5d31b0` | `11 - Influence.md` | 3158 | `b44553ba35aa0874c613bf8d025619b378f8bde8683d8b25b197d5a10c46da20` | p.5 |
| 12 | `12 - Getting to Yes.pdf` | 90 | `234a934b4e617a411ff21eaf79aa59c0d8546153bb138a79d18cb571ba7778e1` | `12 - Getting to Yes.md` | 1928 | `037d2f3e0f14668fbca050a768b385d2cfff8e2c9dd51bebccf7c9418961f29c` | p.3 |
| 13 | `13 - Never Split the Difference.pdf` | 375 | `195d8af289e9d60fa233c94c12a5038a0d4b016d94875c0e4c87b8d456f6b841` | `13 - Never Split the Difference.md` | 3630 | `38bf0055814ee37413569554e2dbbb8145a5100b53f1e881951046a1ffb88179` | p.5 |
| 14 | `14 - Thinking in Bets.pdf` | 247 | `bbf361977cc2c3e15ecd8009e4f9af11ab5c91edcee1b0e022dc7901c6a9e264` | `14 - Thinking in Bets.md` | 1962 | `78f67ca17dc5ed129c05f04fc07f932804744af153d834d779fe52b59d770e80` | pp.6–8 |
| 15 | `15 - Good Strategy, Bad Strategy.pdf` | 246 | `b57d5b01849e7443ec31fced8fa7db03920ffa71f74b924496dc15d31d36660d` | `15 - Good Strategy, Bad Strategy.md` | 3436 | `f09c6c86a698c57256e1450136358f0de4af8feb796bd49c6f77ce23a5273e12` | p.7 |
| 16 | `16 - The Checklist Manifesto.pdf` | 223 | `9ed30d0915c5599f1cbc574d886b21768750dea20aacdd3abf5e58df9293be91` | `16 - The Checklist Manifesto.md` | 1712 | `15bf539e8aaf4477c28cc0ceed20fc1d238bfb422c78d0fcb16d11322b3d1b56` | pp.9–10 |

### Statistical Rethinking aggregate/split reconciliation

The follow-up `BOOK_FULL.zip` contains the 617-page aggregate `07 - Statistical Rethinking.pdf`, SHA-256 `a1557fc384f68731d1360f2d6272910c080d18901a934c427193dae787b6ebc7`, matching the exact hash in the prior inventory. The split PDFs are 346 and 271 pages (617 total); their hashes remain listed above.

A per-page text-extraction comparison was run between the aggregate and the concatenated split PDFs: **617/617 page positions matched after whitespace normalization; 0 extracted-text mismatches**. Fifteen page positions on each side yielded no extractable text. Rendered page-image SHA-256 fingerprints were compared for all 15 positions and **all 15 matched** between aggregate and the corresponding split page. Aggregate availability, extracted-text alignment (617/617), and non-text page-image alignment (15/15) are verified. Chapter/subsection starts still need reconciliation against TOC locators before closing Stage 0.

### Stage 0 evidence boundary

- **Verified:** current archive filenames, all 17 PDF page counts and PDF hashes, all 17 Markdown line counts and hashes, and visual presence/structure of the TOC/content-list pages listed above.
- Book 09 has a summary content list, not a canonical full-book TOC; summary-source limitation remains.
- Book 07 split 02 is a continuation file beginning inside Chapter 11; it is not expected to contain a full TOC.
- **Stage 0 closed:** source page map is recorded in `PR142_SOURCE_PAGE_MAP.md`; all 489 supplied bookmark locators are in range and were reconciled against physical PDF text/adjacent title pages; physical chapter/section starts are mapped for Books 10–16 where bookmarks were not supplied; Book 09 is explicitly mapped as summary-only; Statistical Rethinking aggregate/split text and image identity checks passed.
- **Not part of Stage 0 closure:** systematic semantic-unit and PDF↔Markdown visual/equation reconciliation. Those remain required in the relevant book-review stages. TOC/source-map completion must not be mistaken for semantic book review.
### Follow-up archive validation — `BOOK_FULL.zip`

- Archive SHA-256: `b1c5cff93eb3c2cd97a06522ff0917283c059a1c079ad8b5e4060b7800b4cd79`.
- Contents: 18 PDFs, 17 Markdown files, 9 PDF bookmark exports, and one folder-structure note; 16 book identities.
- Recomputed SHA-256 matched the recorded value for all 18 PDFs, including the 617-page Statistical Rethinking aggregate. No PDF hash mismatches.
- The supplied bookmark exports cover Books 01–08 (Statistical Rethinking split into 07a/07b). Their page locators were checked against physical PDF pages: 489 bookmark entries are in range; 464 titles/locators match text on the target page, 25 require adjacent-page/title-page interpretation, and no remaining entries are unresolved after inspecting the lone Book 02 combined chapter/epilogue locator at physical page 185 (chapter title page follows at physical page 186).
- TOC/content-list pages for Books 01–16 were located and visually inspected where present. Book 09 remains summary-only; Book 07 split 02 is a continuation without a repeated full TOC.
- Source map recorded and read back: `PR142_SOURCE_PAGE_MAP.md`. It captures bookmark coverage for Books 01–08, physical starts for Books 10–16, and the Book 09 summary limitation. Printed locators were reconciled to physical page positions where provided; TOCs without printed locators are mapped by physical chapter-heading starts.
- **Stage 0: PASS** for inventory, source identity, TOC/source-map inputs, and Statistical Rethinking aggregate/split alignment. This does not assert semantic PDF↔Markdown equivalence or close any book-review batch.
