# Core Reading Source Intake Manifest

## Intake contract

- Intake method: Firecrawl PDF Inspector.
- Primary source files: user-provided PDF files in the private BOOK intake.
- Extracted files: user-provided Markdown files generated from the PDF Inspector output.
- Repository boundary: full PDF files and full extracted book text are not committed to this public repository.
- Evidence state: source text is source material; it is not automatically verified knowledge.
- Current gate: structural QA before downstream distillation.
- Review mode: all 16 books are reviewed one-by-one in PR #134 before the PR is merged.
- Review order: 01 → 16. Each book is assessed against the same structural QA gate.
- Review scope: source fidelity and extraction structure only; no summarization, interpretation, or knowledge distillation during this gate.

## Inventory and review status

| ID | Source PDF | Extracted Markdown | Review status | Key finding |
|---|---|---|---|---|
| 01 | 01 - Thinking Strategically.pdf | 01 - Thinking Strategically.md | REVIEWED — NORMALIZATION REQUIRED | 468 escaped headings; fragmented title/contents hierarchy; OCR artifacts; malformed table/prose blocks; footnote/page-marker and game-tree handling require cleanup. |
| 02 | 02 - The Art of Strategy.pdf | 02 - The Art of Strategy.md | REVIEWED — NORMALIZATION REQUIRED | 323 escaped headings; title/contents hierarchy fragmented; chapter headings split/over-nested; source has 550 pages and the extraction needs hierarchy/reading-order validation. |
| 03 | 03 - A Course in Game Theory.pdf | 03 - A Course in Game Theory.md | REVIEWED — NORMALIZATION REQUIRED | 144 escaped headings and 562 pipe-bearing lines; mathematical/table structure needs source-aware normalization; hierarchy must preserve numbered sections and results. |
| 04 | 04 - The Strategy of Conflict.pdf | 04 - The Strategy of Conflict.md | REVIEWED — NORMALIZATION REQUIRED | 46 escaped headings; TOC/subheading hierarchy needs recovery; 82 pipe-bearing lines and OCR/fragment artifacts require validation. |
| 05 | 05 - The Evolution of Cooperation.pdf | 05 - The Evolution of Cooperation.md | REVIEWED — NORMALIZATION REQUIRED | 48 escaped headings; 267 pipe-bearing lines; chapter/part hierarchy and table/figure handling require source comparison. |
| 06 | 06 - Thinking in Systems.pdf | 06 - Thinking in Systems.md | REVIEWED — NORMALIZATION REQUIRED | 134 escaped headings; 205 pipe-bearing lines; part/chapter hierarchy and systems diagrams/tables need source-aware reconstruction. |
| 07 | 07 - Statistical Rethinking.pdf | 07 - Statistical Rethinking_01.md + 07 - Statistical Rethinking_02.md | REVIEWED — NORMALIZATION REQUIRED | Part 01 has 141 escaped headings and 1,998 pipe-bearing lines; Part 02 has active headings but 2,016 pipe-bearing lines. Mathematical notation, equations, R/Stan code, tables, and chapter hierarchy need careful validation across the split. |
| 08 | 08 - Superforecasting.pdf | 08 - Superforecasting.md | REVIEWED — NORMALIZATION REQUIRED | 107 escaped headings; title/section hierarchy is extraction-driven rather than source-faithful and needs recovery. |
| 09 | 09 - The Scout Mindset.pdf | 09 - The Scout Mindset.md | REVIEWED — NORMALIZATION REQUIRED | 107 escaped headings in a short 64-page source; title/front-matter and section hierarchy require normalization and source traceability checks. |
| 10 | 10 - Thinking, Fast and Slow.pdf | 10 - Thinking, Fast and Slow.md | REVIEWED — NORMALIZATION REQUIRED | 276 escaped headings; 275 pipe-bearing lines; contents/appendix structure and table/footnote handling need normalization. |
| 11 | 11 - Influence.pdf | 11 - Influence.md | REVIEWED — NORMALIZATION REQUIRED | 140 escaped headings; title/front matter and chapter hierarchy require recovery; source has 279 pages and extraction structure is not canonical. |
| 12 | 12 - Getting to Yes.pdf | 12 - Getting to Yes.md | REVIEWED — NORMALIZATION REQUIRED | 107 escaped headings; 190 pipe-bearing lines; title/contents hierarchy and list/table boundaries require validation. |
| 13 | 13 - Never Split the Difference.pdf | 13 - Never Split the Difference.md | REVIEWED — NORMALIZATION REQUIRED | 206 escaped headings; chapter headings are fragmented/over-nested; contents and chapter/subheading hierarchy need recovery. |
| 14 | 14 - Thinking in Bets.pdf | 14 - Thinking in Bets.md | REVIEWED — NORMALIZATION REQUIRED | 91 escaped headings; heading levels are extraction artifacts and must be normalized against the 247-page source. |
| 15 | 15 - Good Strategy, Bad Strategy.pdf | 15 - Good Strategy, Bad Strategy.md | REVIEWED — NORMALIZATION REQUIRED | 174 escaped headings; title/front matter and chapter hierarchy require recovery before distillation. |
| 16 | 16 - The Checklist Manifesto.pdf | 16 - The Checklist Manifesto.md | REVIEWED — NORMALIZATION REQUIRED | 21 escaped headings, 30 code-fence lines, and 5 pipe-bearing lines; front matter and prose/code boundary require cleanup. |

## Review protocol

For each book, compare the supplied Markdown against the supplied source PDF and record only structural/extraction findings:

1. Title/author metadata is coherent.
2. Contents/chapter hierarchy is structurally recoverable.
3. Reading order is coherent.
4. Paragraph boundaries are intact.
5. Lists/tables/equations are not materially corrupted.
6. Footnotes and page markers can be distinguished from body text.
7. Figures/diagrams are identified and their logical role is preserved.
8. Extraction artifacts are removed without changing meaning.
9. Source/page traceability remains possible.
10. No interpretation or summary has been silently introduced.

A book is `REVIEWED — NORMALIZATION REQUIRED` when the source can be understood and traced, but the extracted Markdown is not yet safe for downstream knowledge extraction. It becomes `STRUCTURALLY ACCEPTED` only after normalization and validation.

## Cross-book findings

- 15 of the 16 Markdown files use escaped heading markers rather than active Markdown headings. Statistical Rethinking_02.md is the exception.
- Heading levels are not reliable source hierarchy indicators and must be reconstructed from the PDF/contents.
- Tables and pipe-heavy regions need document-aware inspection; pipe characters alone must not be assumed to represent valid Markdown tables.
- Code fences can represent extraction artifacts rather than source code and must be classified before normalization.
- OCR artifacts occur in several sources and must be corrected only when the PDF evidence supports the correction.
- Mathematical notation, equations, R/Stan code, figures, diagrams, and game trees require special handling rather than generic Markdown cleanup.
- Source wording and ordering must be preserved. Structural cleanup must not become summarization or interpretation.

## Book 01 review notes — Thinking Strategically

The source PDF and extracted Markdown are traceable to the same title and chapter structure, but the Markdown is not structurally clean.

Observed issues:

- Title-page content is fragmented into incorrect heading levels and OCR-corrupted text.
- Contents hierarchy is distorted: parts and chapters do not consistently map to semantic heading levels.
- Chapter headings are sometimes character-split or otherwise corrupted.
- Some prose regions are emitted as malformed structural blocks rather than ordinary paragraphs.
- Footnote markers/page artifacts are mixed into body text and require separation.
- Strategic-game tables and diagrams/game trees are not represented as faithful structural objects and require source-aware reconstruction or explicit placeholders.
- Reading order is broadly recoverable, so the file is usable as source material but not yet suitable as a clean canonical source.

Decision: `REVIEWED — NORMALIZATION REQUIRED`. Do not distill knowledge from this file until structural normalization and PDF↔Markdown validation are complete.

## Pilot implication

All 16 books have now passed the same review gate inside PR #134. The next phase is to define/apply the normalization contract and validate the normalized source set before any knowledge distillation. No separate PR per book is required.

## Architecture reconciliation

The source intake is governed by \`ARCHITECTURE_PROPOSAL_V2.md\`.

The Core Reading Set is a source selection and is deliberately decoupled from the permanent framework taxonomy. The initial Thinking Library has six physical-library candidates: Game Theory, Systems Thinking, Bayesian Thinking, Critical Thinking, Psychology, and Negotiation. Decision Frameworks and Strategic Thinking remain cross-cutting synthesis lenses until real content justifies physical folders.

## Source normalization contract

Normalization is a source-fidelity operation, not summarization.

Allowed:
- activate escaped Markdown heading markers when the source structure supports the change;
- restore heading hierarchy from the PDF contents and page structure;
- normalize paragraph, list, table, footnote, equation, code, and figure boundaries;
- correct OCR only when the source PDF provides direct evidence;
- preserve wording, ordering, numbers, examples, citations, and source/page traceability;
- represent diagrams/game trees with faithful placeholders or structural representations when the original visual cannot be embedded.

Forbidden:
- summarizing or paraphrasing the author;
- adding interpretation or modern examples;
- deleting substantive repetition because it appears redundant;
- inventing missing text;
- silently correcting claims using outside knowledge;
- turning normalization into knowledge distillation.

A normalized source is accepted only when the normalized Markdown can be traced back to the PDF without material semantic loss.

## PDF↔Markdown validation gate

Validation is performed against the supplied private PDF/Markdown pair before any source is promoted to \`STRUCTURALLY ACCEPTED\`.

Required checks:
1. PDF and Markdown pairing is complete.
2. Title/author identity is consistent.
3. Page/reading order is recoverable.
4. Major contents/chapter hierarchy is recoverable.
5. Paragraph/list/table/equation/code boundaries are materially preserved.
6. Footnotes/page markers are distinguishable from body text.
7. Figures/diagrams/game trees are identified.
8. OCR repairs are source-supported.
9. No full source text is added to the public repository.
10. The normalized artifact remains traceable to its private source.

### Current private validation result

- 16 PDFs and 17 Markdown parts were found in the supplied \`BOOK.zip\`.
- All 16 book identities and the split Statistical Rethinking pair are present.
- A safe mechanical normalization baseline was generated privately for all 17 Markdown parts; escaped heading markers were activated where present without rewriting source wording.
- The baseline is **not** considered structurally accepted. Several books still require source-aware hierarchy, table/equation/code/figure handling identified in the review notes.
- Therefore all 16 books remain \`REVIEWED — NORMALIZATION REQUIRED\`.
- No full PDF or full extracted book text is committed to this public repository.

The next promotion gate is source-aware structural normalization followed by the validation checks above. Knowledge distillation remains blocked until that gate passes.

## Architecture decision

The V2 architecture is now the target state for the remainder of this intake. Do not create future empty framework/application/reflection folders merely for symmetry.
