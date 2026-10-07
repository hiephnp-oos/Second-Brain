# Source Traceability — GT-02

## Source

*The Art of Strategy: A Game Theorist's Guide to Success in Business and Life*

Authors: Avinash K. Dixit and Barry J. Nalebuff

Private intake pair:
- `02 - The Art of Strategy.pdf`
- `02 - The Art of Strategy.md`

The PDF is the source authority. The Markdown is an extraction/retrieval aid.

The full PDF and extracted text remain private and are not copied into this repository.

## Source structure verified

The PDF is 550 pages and contains:
- Preface;
- Introduction: How Should People Behave in Society?;
- Part I: Chapters 1–4;
- Part II: Chapters 5–7 plus Epilogue to Part II: A Nobel History;
- Part III: Chapters 8–14;
- Further Reading;
- Workouts;
- Notes.

The Markdown contains the same major structure and all 14 chapter titles.

Chapter sequence verified in both source representations:
1. Ten Tales of Strategy
2. Games Solvable by Backward Reasoning
3. Prisoners' Dilemmas and How to Resolve Them
4. A Beautiful Equilibrium
5. Choice and Chance
6. Strategic Moves
7. Making Strategies Credible
8. Interpreting and Manipulating Information
9. Cooperation and Coordination
10. Auctions, Bidding, and Contests
11. Bargaining
12. Voting
13. Incentives
14. Case Studies

## PDF ↔ Markdown validation

The PDF was treated as the canonical source representation. The Markdown was tested as the extraction used for retrieval.

Validation evidence:
- PDF metadata reports 550 pages and the same title/author as the Markdown.
- PDF text extraction: approximately 161.4k words.
- Markdown extraction: approximately 161.5k words.
- The two representations are therefore within approximately 0.1% by word count; this is a coverage signal, not proof of semantic identity.
- Title and author markers are present in both.
- All 14 chapter titles are present in both.
- Representative chapter anchors were verified across Part I, Part II, and Part III.
- Representative content was cross-checked for backward reasoning, mixed strategies, commitment, information asymmetry, signaling/screening, winner's curse, Vickrey auction, cooperation, bargaining, voting, and incentive design.
- The Markdown contains extraction artifacts such as escaped headings and formatting fragments. These are not treated as canonical source text.
- The PDF remains authoritative whenever PDF and Markdown representations differ.

## Part I traceability — controlled review map

Part I was reviewed as an incremental extension of GT-01, not as a second copy of the same material.

| Chapter | Durable reasoning retained | Incremental GT-02 contribution | Status |
|---|---|---|---|
| Ch. 1 — Ten Tales of Strategy | strategic interaction, anticipation, commitment, unpredictability, cooperation/conflict | infer objectives from the structure of the game; strategic sacrifice; explicit attention to human motives and meta-game reasoning | COVERED |
| Ch. 2 — Games Solvable by Backward Reasoning | sequential moves, game trees, backward induction | solvability boundary conditions; behavioral limits of backward reasoning; distinction between normative strategy and observed behavior; complex-tree limits | COVERED |
| Ch. 3 — Prisoners' Dilemmas and How to Resolve Them | dominant incentives, defection/cooperation, repeated interaction, enforcement | broader cross-domain framing of the dilemma; explicit resolution conditions and monitoring/enforcement logic | COVERED |
| Ch. 4 — A Beautiful Equilibrium | Nash equilibrium, best responses, coordination | multiple equilibria, focal-point selection, Battle of the Sexes, Chicken, and the distinction between equilibrium existence and equilibrium selection | COVERED |

Acceptance rule for Part I: every chapter must leave at least one durable reasoning mechanism, one operational model or application, and source traceability. Narrative examples are not duplicated as separate models when the underlying mechanism is already represented.


## Part II traceability — controlled review map

| Chapter | Durable reasoning retained | Incremental GT-02 contribution | Status |
|---|---|---|---|
| Ch. 5 — Choice and Chance | mixed strategies and unpredictability | payoff-derived mixing, indifference condition, individual-action unpredictability, skill-change effects, deliberate chance | COVERED |
| Ch. 6 — Strategic Moves | unconditional moves, threats, promises, warnings, assurances | preemptive response rules, deterrent vs compellent distinction, timing transformation, move vs credibility separation | COVERED |
| Ch. 7 — Making Strategies Credible | commitment, credibility, reputation, contracts, delegation | eightfold path, three underlying mechanisms, chance as commitment, incremental commitment, mandated agents | COVERED |
| Epilogue to Part II | historical development and further-reading context | retained as context, not promoted as reusable mental models | COVERED AS CONTEXT |

Acceptance rule for Part II: every substantive chapter must leave a durable reasoning mechanism, an operational model or application, and source traceability. Historical/further-reading material is retained only as context.

## Acceptance decision

Status: `STRUCTURALLY ACCEPTED` for controlled knowledge extraction.

This acceptance means the PDF/Markdown pair is sufficiently traceable for controlled distillation. It does not mean the raw Markdown extraction is a clean canonical transcription.

## Knowledge boundary

The repository stores only distilled knowledge:
- concepts;
- mental models;
- source-derived applications;
- reusable lessons;
- source traceability.

It does not store:
- the full book;
- a reconstructed full transcription;
- long verbatim passages;
- a replacement for the private source.

## Primary routing

Primary framework: Game Theory

Cross-cutting lenses:
- Strategic Thinking
- Decision Frameworks
- supporting Psychology / Information reasoning where relevant

## Relationship to GT-01

GT-02 is treated as an extension, not a duplicate of GT-01.

The main incremental knowledge promoted from GT-02 is:
- information asymmetry and common knowledge;
- signaling and screening;
- winner's curse and auction mechanism design;
- richer treatment of cooperation and positive-sum games;
- broader mechanism/incentive design;
- information as a strategic variable;
- expanded applications of bargaining, voting, and risk sequencing.
