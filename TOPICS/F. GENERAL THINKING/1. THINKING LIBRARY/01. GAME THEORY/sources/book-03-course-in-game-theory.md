# Source Traceability — GT-03

## Source

*A Course in Game Theory*

Authors: Martin J. Osborne and Ariel Rubinstein

Private intake pair:
- `03 - A Course in Game Theory.pdf`
- `03 - A Course in Game Theory.md`

The PDF is the source authority. The Markdown is an extraction/retrieval aid.

The full PDF and extracted text remain private and are not copied into this repository.

## Source structure verified

The PDF is 368 pages and contains 15 chapters across four major parts:

1. Introduction
2. Strategic Games
3. Mixed, Correlated, and Evolutionary Equilibrium
4. Rationalizability and Iterated Elimination of Dominated Actions
5. Knowledge and Equilibrium
6. Extensive Games with Perfect Information
7. Bargaining Games
8. Repeated Games
9. Complexity Considerations in Repeated Games
10. Implementation Theory
11. Extensive Games with Imperfect Information
12. Sequential Equilibrium
13. The Core
14. Stable Sets, the Bargaining Set, and the Shapley Value
15. The Nash Solution

The PDF contents also preserve the numbered subsection hierarchy within these chapters. The Markdown contains the same chapter sequence and section numbering, although several tables, equations, symbols, and headings are extraction-fragmented.

## PDF ↔ Markdown validation

Validation was PDF-first. The Markdown was used only to locate material and test whether the extracted representation remained traceable to the canonical PDF.

Validated:
- PDF page count: 368.
- Title and authors match the source identity.
- All 15 chapters are present in the same reading order.
- Numbered section structure is recoverable from the Markdown and matches the PDF contents.
- Representative formal material was checked against the PDF, including the strategic-game definition; Bayesian/private-information material; information-function conditions and common knowledge; extensive games and subgame perfection; repeated-game definitions and trigger strategies; implementation theory; sequential equilibrium and beliefs; the core; Shapley value; and the Nash bargaining solution.
- Strategic-game tables, equations, game trees, and result labels are present in the extraction but require source-aware reading. They are not treated as canonical Markdown structures.
- PDF and Markdown word volumes differ materially, so word-count matching was not used as an acceptance test for this mathematically dense source.

## Acceptance decision

Status: `STRUCTURALLY ACCEPTED` for controlled knowledge extraction.

Acceptance means the source pair is sufficiently traceable for controlled distillation. It does not mean the raw Markdown is a clean transcription.

## Knowledge boundary

Only distilled knowledge is promoted to the repository:
- concepts;
- mental models;
- source-derived applications;
- reusable lessons;
- source traceability.

The full source remains private.

## Primary routing

Primary framework: Game Theory

Cross-cutting lenses:
- Strategic Thinking
- Decision Frameworks
- supporting information/decision reasoning where relevant

## Relationship to GT-01 and GT-02

GT-03 is treated as a formal expansion of the earlier Game Theory sources, not a duplicate.

The incremental knowledge promoted here is:
- formal strategic and Bayesian game representation;
- rationalizability and iterative elimination logic;
- explicit common-knowledge structure;
- subgame-perfect reasoning;
- repeated-game strategy and equilibrium structure;
- implementation/mechanism design;
- sequential equilibrium and beliefs under imperfect information;
- coalitional stability and the core;
- Shapley value and other cooperative solution concepts;
- formal Nash bargaining solution.


## Part I traceability matrix

### Preface / Introduction
- Source scope: game theory, games versus solution concepts, rational behavior, steady-state versus deductive interpretations, and bounded rationality.
- Promoted: formal modeling boundary and interpretation boundary.

### Chapter 2 — Nash Equilibrium
- Sections: strategic games; Nash equilibrium; examples; existence; strictly competitive games; Bayesian games.
- Promoted: strategic-game representation, mutual best response, existence scope, strictly competitive structure, and type/signal/belief representation.
- Operational links: GT-MM-85 through GT-MM-89; GT-APP-56 through GT-APP-58 and GT-APP-62; GT-L-67 through GT-L-71.

### Chapter 3 — Mixed, Correlated, and Evolutionary Equilibrium
- Sections: mixed strategy Nash equilibrium; interpretations; correlated equilibrium; evolutionary equilibrium.
- Promoted: mixed-strategy interpretation, correlated coordination, and evolutionary selection.
- Operational links: GT-MM-90 through GT-MM-92; GT-APP-59; GT-L-72 and GT-L-73.

### Chapter 4 — Rationalizability and Iterated Elimination of Dominated Actions
- Sections: rationalizability; iterated strict dominance; iterated weak dominance.
- Promoted: rationalizability boundary, strict-dominance simplification, and weak-dominance order dependence.
- Operational links: GT-MM-93 through GT-MM-95; GT-APP-60; GT-L-74 and GT-L-75.

### Chapter 5 — Knowledge and Equilibrium
- Sections: model of knowledge; common knowledge; posterior disagreement; knowledge and solution concepts; Electronic Mail Game.
- Promoted: state-space information, common knowledge, epistemic assumptions behind solution concepts, and the fragility of coordination under almost-common knowledge.
- Operational links: GT-MM-96 through GT-MM-100; GT-APP-61 and GT-APP-63; GT-L-76 through GT-L-79.

### Acceptance rule
Part I is accepted when each substantive section leaves a durable reasoning distinction or operational model, while formal proofs and equations remain source-level material. Chapter 5 is retained as a reasoning boundary rather than a full formal epistemic-game-theory treatment.


## Part II traceability matrix

### Chapter 6 — Extensive Games with Perfect Information
- Sections: extensive-game model; subgame perfect equilibrium; chance/simultaneous extensions; interpretation of strategy; Chain-Store and Centipede; iterated weak-dominance elimination and forward induction.
- Promoted: sequential structure, SPE credibility, one-deviation property, backward induction, model-extension boundaries, off-path strategy interpretation, forward induction.
- Operational links: GT-MM-101 through GT-MM-107; GT-APP-64 through GT-APP-68; GT-L-80 through GT-L-84.

### Chapter 7 — Bargaining Games
- Sections: bargaining model; alternating offers; SPE characterization; variations/extensions.
- Promoted: procedure dependence, impatience, efficient agreement, acceptance thresholds, outside options.
- Operational links: GT-MM-108 through GT-MM-111; GT-APP-69 and GT-APP-70; GT-L-85 and GT-L-86.

### Chapter 8 — Repeated Games
- Sections: basic idea; finite versus infinite repetition; definitions; strategies as machines; trigger strategies; Nash/perfect folk theorems under multiple payoff criteria; SPE structure; finitely repeated games.
- Promoted: enforceability/minmax boundary, trigger strategies, credible punishment, patience, Nash versus perfect folk theorems, finite-horizon boundary, and machine representation.
- Operational links: GT-MM-112 through GT-MM-114; GT-APP-71 through GT-APP-73; GT-L-87 through GT-L-90.

### Chapter 9 — Complexity Considerations in Repeated Games
- Sections: complexity; machine game; equilibrium structure; lexicographic preferences.
- Promoted: finite-state strategy representation, payoff/complexity tradeoff, introductory/cycling phases, and sensitivity to the complexity criterion.
- Operational links: GT-MM-115 and GT-MM-116; GT-APP-74; GT-L-91.

### Chapter 10 — Implementation Theory
- Sections: implementation problem; dominant-strategy implementation; Nash implementation; SPE implementation.
- Promoted: inverse mechanism-design framing, Gibbard-Satterthwaite boundary, Groves mechanisms under restricted domains, Nash monotonicity/no-veto conditions, and virtual SPE implementation.
- Operational links: GT-MM-117 through GT-MM-121; GT-APP-75 through GT-APP-78; GT-L-92 through GT-L-95.

### Acceptance rule
Part II is accepted when each chapter leaves a durable sequential/mechanism-design reasoning layer and the major formal boundary conditions are retained, while proofs, theorem derivations, and game-tree arithmetic remain source-level material.
