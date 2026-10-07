# Core Reading Source Intake Manifest

## Intake contract

- Intake method: Firecrawl PDF Inspector.
- Primary source files: user-provided PDF files in the private BOOK intake.
- Extracted files: user-provided Markdown files generated from the PDF Inspector output.
- Repository boundary: full PDF files and full extracted book text are not committed to this public repository.
- Evidence state: source text is source material; it is not automatically verified knowledge.
- Current gate: structural QA before downstream distillation.
- Review mode: all 16 books are reviewed one-by-one in PR #134 before the PR is merged.
- Review order: 01 → 16. Each book is assessed against the same structural QA gate before moving to the next book.
- Review scope: source fidelity and extraction structure only; no summarization, interpretation, or knowledge distillation during this gate.

## Inventory and review status

| ID | Source PDF | Extracted Markdown | Review status | Initial finding |
|---|---|---|---|---|
| 01 | 01 - Thinking Strategically.pdf | 01 - Thinking Strategically.md | REVIEWED — NORMALIZATION REQUIRED | Title-page hierarchy, heading levels, OCR artifacts, malformed tables/code blocks, footnote/page-marker handling, and diagram/game-tree representation require structural cleanup. |
| 02 | 02 - The Art of Strategy.pdf | 02 - The Art of Strategy.md | PENDING | — |
| 03 | 03 - A Course in Game Theory.pdf | 03 - A Course in Game Theory.md | PENDING | — |
| 04 | 04 - The Strategy of Conflict.pdf | 04 - The Strategy of Conflict.md | PENDING | — |
| 05 | 05 - The Evolution of Cooperation.pdf | 05 - The Evolution of Cooperation.md | PENDING | — |
| 06 | 06 - Thinking in Systems.pdf | 06 - Thinking in Systems.md | PENDING | — |
| 07 | 07 - Statistical Rethinking.pdf | 07 - Statistical Rethinking_01.md + 07 - Statistical Rethinking_02.md | PENDING | — |
| 08 | 08 - Superforecasting.pdf | 08 - Superforecasting.md | PENDING | — |
| 09 | 09 - The Scout Mindset.pdf | 09 - The Scout Mindset.md | PENDING | — |
| 10 | 10 - Thinking, Fast and Slow.pdf | 10 - Thinking, Fast and Slow.md | PENDING | — |
| 11 | 11 - Influence.pdf | 11 - Influence.md | PENDING | — |
| 12 | 12 - Getting to Yes.pdf | 12 - Getting to Yes.md | PENDING | — |
| 13 | 13 - Never Split the Difference.pdf | 13 - Never Split the Difference.md | PENDING | — |
| 14 | 14 - Thinking in Bets.pdf | 14 - Thinking in Bets.md | PENDING | — |
| 15 | 15 - Good Strategy, Bad Strategy.pdf | 15 - Good Strategy, Bad Strategy.md | PENDING | — |
| 16 | 16 - The Checklist Manifesto.pdf | 16 - The Checklist Manifesto.md | PENDING | — |

## Review protocol

For each book, compare the supplied Markdown against the source PDF and record only structural/extraction findings:

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

## Structural QA findings from the supplied extraction

The current batch contains extraction artifacts that require document-aware review.

- Heading syntax/levels are not reliable indicators of the source hierarchy.
- Title pages and contents can be fragmented into multiple Markdown headings.
- Tables, code blocks, figures, footnotes, equations, and page markers require document-aware review before structural normalization.
- OCR artifacts can alter names, words, punctuation, or hyphenation and must be corrected only when the PDF evidence supports the correction.
- The extraction layer must preserve the author's wording and ordering. Structural cleanup must not become summarization or interpretation.

## Book 01 review notes — Thinking Strategically

The source PDF and extracted Markdown are traceable to the same title and chapter structure, but the Markdown is not structurally clean.

Observed issues:

- Title-page content is fragmented into incorrect heading levels and OCR-corrupted text (for example the author line is malformed).
- Contents hierarchy is distorted: parts and chapters do not consistently map to semantic heading levels.
- Chapter headings are sometimes character-split or otherwise corrupted.
- Some ordinary prose is emitted as fenced code blocks.
- Some prose is emitted as malformed one-column Markdown tables.
- Footnote markers/page artifacts are mixed into body text and require separation.
- Strategic-game tables and diagrams/game trees are not represented as faithful structural objects and require source-aware reconstruction or explicit placeholders.
- Reading order is broadly recoverable, so the file is usable as source material but not yet suitable as a clean canonical source.

Decision: `REVIEWED — NORMALIZATION REQUIRED`. Do not distill knowledge from this file until structural normalization and PDF↔Markdown validation are complete.

## Pilot implication

Book 01 remains the reference case for defining the normalization contract, but the same review gate is now applied sequentially to all 16 books inside PR #134. After all 16 are reviewed, normalization/distillation can proceed using the evidence collected in this PR rather than opening a separate intake PR for each book.