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
- 6.1 Extensive Games with Perfect Information → extensive-game model and perfect-information sequence.
- 6.2 Subgame Perfect Equilibrium → SPE credibility and one-deviation verification.
- 6.3 Two Extensions of the Definition of a Game → chance/simultaneous extensions and solution-boundary conditions.
- 6.4 The Interpretation of a Strategy → complete contingent strategy and off-path actions.
- 6.5 Two Notable Finite Horizon Games → Chain-Store and Centipede as backward-induction boundary cases.
- 6.6 Iterated Elimination of Weakly Dominated Strategies → forward-induction connection and elimination-order caution.
- Promoted: GT-MM-101 through GT-MM-107; GT-APP-64 through GT-APP-68; GT-L-80 through GT-L-84.

### Chapter 7 — Bargaining Games
- 7.1 Bargaining and Game Theory → bargaining as an extensive strategic interaction.
- 7.2 A Bargaining Game of Alternating Offers → proposer/respondent sequence and acceptance thresholds.
- 7.3 Subgame Perfect Equilibrium → backward solution and credible continuation behavior.
- 7.4 Variations and Extensions → impatience, outside options, and procedure dependence.
- Promoted: GT-MM-108 through GT-MM-111; GT-APP-69 and GT-APP-70; GT-L-85 and GT-L-86.

### Chapter 8 — Repeated Games
- 8.1 The Basic Idea → shadow of the future.
- 8.2 Infinitely Repeated Games vs. Finitely Repeated Games → horizon boundary.
- 8.3 Infinitely Repeated Games: Definitions → feasible/enforceable payoff structure.
- 8.4 Strategies as Machines → finite-state strategy representation.
- 8.5 Trigger Strategies: Nash Folk Theorems → trigger-based cooperation and patience.
- 8.6 Punishing for a Limited Length of Time → finite punishment under the limit-of-means criterion.
- 8.7 Punishing the Punisher → perfect folk-theorem structure under overtaking.
- 8.8 Rewarding Players Who Punish → perfect folk-theorem structure under discounting.
- 8.9 The Structure of Subgame Perfect Equilibria Under the Discounting Criterion → SPE structure.
- 8.10 Finitely Repeated Games → finite-horizon cooperation boundary and constituent-game equilibria.
- Promoted: GT-MM-112 through GT-MM-114; GT-APP-71 through GT-APP-73; GT-L-87 through GT-L-90.

### Chapter 9 — Complexity Considerations in Repeated Games
- 9.1 Introduction → complexity as an explicit strategic consideration.
- 9.2 Complexity and the Machine Game → finite-state implementation cost.
- 9.3 The Structure of the Equilibria of a Machine Game → equilibrium-machine structure.
- 9.4 The Case of Lexicographic Preferences → payoff-first/complexity-second preference structure.
- Promoted: GT-MM-115 and GT-MM-116; GT-APP-74; GT-L-91.

### Chapter 10 — Implementation Theory
- 10.1 Introduction → implementation as inverse mechanism design.
- 10.2 The Implementation Problem → choice rule versus mechanism/game form.
- 10.3 Implementation in Dominant Strategies → Gibbard-Satterthwaite boundary and restricted-domain mechanisms.
- 10.4 Nash Implementation → monotonicity and no-veto conditions.
- 10.5 Subgame Perfect Equilibrium Implementation → virtual SPE implementation and certainty/probability distinction.
- Promoted: GT-MM-117 through GT-MM-121; GT-APP-75 through GT-APP-78; GT-L-92 through GT-L-95.

### Part II acceptance result
All **29 substantive numbered sections** in the Part II bookmark are explicitly traceable to durable knowledge objects. Formal proofs, theorem derivations, and game-tree arithmetic remain source-level material rather than duplicated repository content.


## Part III traceability matrix

### Chapter 11 — Extensive Games with Imperfect Information
- 11.1 Extensive Games with Imperfect Information → information sets, imperfect information, and perfect recall.
- 11.2 Principles for the Equivalence of Extensive Games → representation-equivalence principles and preservation of reduced strategic form.
- 11.3 Framing Effects and the Equivalence of Extensive Games → boundary between formal strategic equivalence and behavior affected by framing.
- 11.4 Mixed and Behavioral Strategies → mixed/behavioral equivalence under perfect recall.
- 11.5 Nash Equilibrium → Nash equilibrium in extensive games with imperfect information.
- Promoted: GT-MM-122 through GT-MM-126; GT-APP-79 through GT-APP-83; GT-L-96 through GT-L-100.

### Chapter 12 — Sequential Equilibrium
- 12.1 Strategies and Beliefs → assessments, belief systems, structural consistency, and sequential rationality.
- 12.2 Sequential Equilibrium → consistency plus sequential rationality.
- 12.3 Games with Observable Actions: Perfect Bayesian Equilibrium → Bayesian updating and application-oriented equilibrium refinement.
- 12.4 Refinements of Sequential Equilibrium → additional restrictions on off-path beliefs and deviation interpretation.
- 12.5 Trembling Hand Perfect Equilibrium → robustness to small mistakes and the agent strategic-form construction.
- Promoted: GT-MM-127 through GT-MM-131; GT-APP-84 through GT-APP-88; GT-L-101 through GT-L-105.

### Part III acceptance result
All **10 substantive numbered sections** in the Part III bookmark are explicitly traceable to durable knowledge objects. Formal belief calculations, equilibrium proofs, and theorem derivations remain source-level material.

 
## Part IV traceability matrix

### Chapter 13 — The Core
- 13.1 Coalitional Games with Transferable Payoff → TU coalition value and redistribution.
- 13.2 The Core → blocking coalitions and coalition-stable allocations.
- 13.3 Nonemptiness of the Core → existence boundary for stable allocations.
- 13.4 Markets with Transferable Payoff → market/core relationship under the relevant assumptions.
- 13.5 Coalitional Games without Transferable Payoff → NTU coalition feasible sets.
- 13.6 Exchange Economies → coalition feasibility in exchange-economy settings.
- Promoted: GT-MM-132 through GT-MM-136; GT-APP-89 through GT-APP-92; GT-L-106 through GT-L-110.

### Chapter 14 — Stable Sets, the Bargaining Set, and the Shapley Value
- 14.1 Two Approaches → alternative coalition-solution approaches.
- 14.2 The Stable Sets of von Neumann and Morgenstern → internal and external stability.
- 14.3 The Bargaining Set, Kernel, and Nucleolus → objections, counter-objections, and coalition excess criteria.
- 14.4 The Shapley Value → marginal-contribution allocation.
- Promoted: GT-MM-137 through GT-MM-140; GT-APP-93 through GT-APP-96; GT-L-111 through GT-L-113.

### Chapter 15 — The Nash Solution
- 15.1 Bargaining Problems → feasible set and disagreement point.
- 15.2 The Nash Solution: Definition and Characterization → Nash bargaining product and characterization.
- 15.3 An Axiomatic Definition → axiomatic properties of the solution.
- 15.4 The Nash Solution and the Bargaining Game of Alternating Offers → strategic foundation under appropriate assumptions.
- 15.5 An Exact Implementation of the Nash Solution → exact mechanism/implementation target.
- Promoted: GT-MM-141 through GT-MM-144; GT-APP-97 through GT-APP-100; GT-L-114 through GT-L-117.

### Part IV acceptance result
All **15 substantive numbered sections** in the Part IV bookmark are explicitly traceable to durable knowledge objects. Formal proofs, coalition-value calculations, and theorem derivations remain source-level material.


## Source provenance — re-verified from supplied BOOK.zip

This full-book re-verification uses the user-supplied intake pair:
- `03 - A Course in Game Theory.pdf`
- `03 - A Course in Game Theory.md`

The supplied PDF contains 368 pages and the supplied Markdown identifies the same 1994 MIT Press work by Martin J. Osborne and Ariel Rubinstein (2011-01-19 electronic version). The PDF is the source authority; Markdown is only an extraction/retrieval aid.

The user-supplied TOC was reconciled with the supplied PDF. The user page numbers are the physical/PDF page positions; the printed book page numbers in the PDF contents are offset because the front matter is unnumbered/roman-numbered. The section hierarchy and reading order match.

No web-hosted PDF was used as source authority for this re-verification.

## Full-book re-verification matrix

The coverage unit is each named substantive numbered section. Preface, Notes, part headings, List of Results, References, and Index are structural/support material and are not counted as substantive coverage units.

| Part | Chapters | Substantive sections | Before source re-verification | After source re-verification |
|---|---|---:|---:|---:|
| Introduction | Ch1 | 7 | 0/7 = 0% | **7/7 = 100%** |
| I Strategic Games | Ch2–5 | 18 | 0/18 = 0% | **18/18 = 100%** |
| II Extensive Games with Perfect Information | Ch6–10 | 29 | 0/29 = 0% | **29/29 = 100%** |
| III Extensive Games with Imperfect Information | Ch11–12 | 10 | 0/10 = 0% | **10/10 = 100%** |
| IV Coalitional Games | Ch13–15 | 15 | 0/15 = 0% | **15/15 = 100%** |
| **Total** | **Ch1–15** | **79** | **0/79 = 0%** | **79/79 = 100%** |

### Section-level verification

- Ch1: 1.1–1.7 → **7/7**.
- Ch2: 2.1–2.6 → **6/6**.
- Ch3: 3.1–3.4 → **4/4**.
- Ch4: 4.1–4.3 → **3/3**.
- Ch5: 5.1–5.5 → **5/5**.
- Ch6: 6.1–6.6 → **6/6**.
- Ch7: 7.1–7.4 → **4/4**.
- Ch8: 8.1–8.10 → **10/10**.
- Ch9: 9.1–9.4 → **4/4**.
- Ch10: 10.1–10.5 → **5/5**.
- Ch11: 11.1–11.5 → **5/5**.
- Ch12: 12.1–12.5 → **5/5**.
- Ch13: 13.1–13.6 → **6/6**.
- Ch14: 14.1–14.4 → **4/4**.
- Ch15: 15.1–15.5 → **5/5**.

### Content validation boundary

The verification checks that each substantive section has a durable source-derived reasoning distinction and an operational mapping in the existing GT-03 knowledge layer. Formal proofs, theorem derivations, payoff arithmetic, game trees, and long mathematical examples remain source-level material rather than duplicated repository content.

The supplied PDF was also checked for the representative formal structures already claimed by the source matrix: strategic games and Nash equilibrium; mixed/correlated/evolutionary equilibrium; rationalizability and dominance elimination; knowledge/common knowledge; extensive games and subgame perfection; bargaining and repeated games; complexity and implementation; imperfect-information games and sequential equilibrium; the core and cooperative solution concepts; and the Nash bargaining solution.

### Acceptance result — BOOK.zip re-verification

**Introduction: 7/7 = 100%**

**Part I: 18/18 = 100%**

**Part II: 29/29 = 100%**

**Part III: 10/10 = 100%**

**Part IV: 15/15 = 100%**

**Book 3 total: 79/79 = 100%**

The previous structural acceptance remains valid, but this entry supersedes its source-validation status: Book 3 is now explicitly re-verified against the user-supplied `BOOK.zip` source pair.
