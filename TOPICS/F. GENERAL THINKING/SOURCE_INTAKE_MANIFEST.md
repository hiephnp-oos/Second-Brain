# Core Reading Source Intake Manifest

## Intake contract

- Intake method: Firecrawl PDF Inspector.
- Primary source files: user-provided PDF files in the private BOOK intake.
- Extracted files: user-provided Markdown files generated from the PDF Inspector output.
- Repository boundary: full PDF files and full extracted book text are not committed to this public repository.
- Evidence state: source text is source material; it is not automatically verified knowledge.
- Current gate: structural QA before downstream distillation.

## Inventory

| ID | Source PDF | Extracted Markdown | Initial status |
|---|---|---|---|
| 01 | 01 - Thinking Strategically.pdf | 01 - Thinking Strategically.md | STRUCTURAL_QA_PENDING |
| 02 | 02 - The Art of Strategy.pdf | 02 - The Art of Strategy.md | STRUCTURAL_QA_PENDING |
| 03 | 03 - A Course in Game Theory.pdf | 03 - A Course in Game Theory.md | STRUCTURAL_QA_PENDING |
| 04 | 04 - The Strategy of Conflict.pdf | 04 - The Strategy of Conflict.md | STRUCTURAL_QA_PENDING |
| 05 | 05 - The Evolution of Cooperation.pdf | 05 - The Evolution of Cooperation.md | STRUCTURAL_QA_PENDING |
| 06 | 06 - Thinking in Systems.pdf | 06 - Thinking in Systems.md | STRUCTURAL_QA_PENDING |
| 07 | 07 - Statistical Rethinking.pdf | 07 - Statistical Rethinking_01.md + 07 - Statistical Rethinking_02.md | STRUCTURAL_QA_PENDING |
| 08 | 08 - Superforecasting.pdf | 08 - Superforecasting.md | STRUCTURAL_QA_PENDING |
| 09 | 09 - The Scout Mindset.pdf | 09 - The Scout Mindset.md | STRUCTURAL_QA_PENDING |
| 10 | 10 - Thinking, Fast and Slow.pdf | 10 - Thinking, Fast and Slow.md | STRUCTURAL_QA_PENDING |
| 11 | 11 - Influence.pdf | 11 - Influence.md | STRUCTURAL_QA_PENDING |
| 12 | 12 - Getting to Yes.pdf | 12 - Getting to Yes.md | STRUCTURAL_QA_PENDING |
| 13 | 13 - Never Split the Difference.pdf | 13 - Never Split the Difference.md | STRUCTURAL_QA_PENDING |
| 14 | 14 - Thinking in Bets.pdf | 14 - Thinking in Bets.md | STRUCTURAL_QA_PENDING |
| 15 | 15 - Good Strategy, Bad Strategy.pdf | 15 - Good Strategy, Bad Strategy.md | STRUCTURAL_QA_PENDING |
| 16 | 16 - The Checklist Manifesto.pdf | 16 - The Checklist Manifesto.md | STRUCTURAL_QA_PENDING |

## Structural QA findings from the supplied extraction

The Firecrawl outputs are not yet normalized enough to be treated as clean source Markdown.

- Most files contain escaped Markdown heading markers such as \## rather than active Markdown headings.
- Statistical Rethinking_02.md is the notable exception in the current batch: it contains active heading markers.
- Thinking Strategically should therefore not be compared only by raw heading counts; the escaped syntax must first be interpreted as extraction structure.
- Tables, code blocks, figures, footnotes, equations, and page markers require document-aware review before structural normalization.
- The extraction layer must preserve the author's wording and ordering. Structural cleanup must not become summarization or interpretation.

## Acceptance gate

A source is ready for distillation only when:

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

## Pilot

Thinking Strategically is the pilot source. Its normalized source becomes the reference standard for the remaining books before batch scaling.
