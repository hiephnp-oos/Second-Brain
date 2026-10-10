# F. GENERAL THINKING — Architecture Proposal v2

## Architecture model
External Source → Source Intake → Structural Normalization → PDF↔Markdown Validation → Concepts → Mental Models → Applications → Synthesis → Reflection → Reusable Lessons → Personal Principles.

The repository materializes the durable knowledge lifecycle as four numbered layers:

1. THINKING LIBRARY — framework-owned knowledge.
2. SYNTHESIS — cross-framework knowledge.
3. REFLECTION — experience-derived knowledge.
4. PERSONAL PRINCIPLES — durable personal rules.

The lifecycle is conceptual; the numbered folders are physical boundaries. Concepts, mental models, applications and lessons remain inside their owning framework library rather than becoming duplicate root-level folders.

## Framework taxonomy
Current physical libraries: Game Theory, Systems Thinking, Bayesian Thinking, Critical Thinking, Psychology, Negotiation, Decision Frameworks, Strategic Thinking.

Decision Frameworks and Strategic Thinking were initially cross-cutting; Books 14 and 15 met the materialization rule through durable concepts and recurring routing demand.

## Reading-set relationship
The reading set is source selection, not architecture. Books route to one primary owner plus supporting lenses. Book 09 is summary-source limited; Book 16 remains pending.

## Repository structure
F root contains routing/intake/audit artifacts and the four numbered knowledge lifecycle layers.

1. THINKING LIBRARY contains eight physical framework libraries. Every library uses README, concepts, mental-models, applications, lessons and source traceability.

2. SYNTHESIS contains only knowledge that emerges from combining multiple framework libraries. It must not duplicate framework definitions.

3. REFLECTION contains situation-specific application reviews and experience-derived lessons. It is not a second source library.

4. PERSONAL PRINCIPLES contains only validated user-owned rules promoted from repeated or materially significant reflection. It is not a book-summary layer.

Do not create additional root knowledge layers without a demonstrated boundary problem.

## Boundary rules
- Framework-owned knowledge → 1. THINKING LIBRARY.
- Cross-framework knowledge → 2. SYNTHESIS.
- Experience-derived knowledge → 3. REFLECTION.
- Durable personal rules → 4. PERSONAL PRINCIPLES.
- Source selection/intake/audit/routing remain F-root control artifacts.
- One durable concept has one owner; supporting frameworks cross-link rather than copy.
- Reflection does not rewrite a framework because one application produced an unexpected result.
- Personal principles require experience evidence; book advice alone is insufficient.

## Per-book semantic audit gate

Source-structure acceptance and semantic content audit are separate states. A successful PDF↔Markdown structural gate does not authorize a claim that the book was audited semantically line by line.

A full semantic audit must account for every substantive source unit in the canonical PDF: paragraphs, bullets, examples, figures/diagrams, tables, equations/model specifications, notes and bibliography entries. Each unit must have a stable source locator, a concise statement of its meaning, a mapping or explicit disposition (e.g. illustration/paratext with no separate knowledge promotion), a fidelity/nuance check, and a result of VERIFIED / FIX REQUIRED / NOT APPLICABLE. Visual content not represented faithfully in extracted text must be inspected in the PDF itself.

Report separate denominators for:
- source-structure gate;
- substantive semantic units reviewed;
- source-to-framework mappings verified;
- unresolved findings;
- notes/bibliography checked for presence versus content.

Do not infer semantic completeness from heading coverage, item counts, file presence, or passing CI. The exact phrase “semantic line-by-line audit complete” is allowed only when the source-unit ledger is complete, every substantive unit has a disposition, all material fixes are resolved, repository mappings have been re-read, and validation passes. If any condition is unmet, status must remain NOT VERIFIED / IN PROGRESS and downstream book progression is blocked.

## Promotion gate
Intake → structural review → normalization → PDF↔Markdown validation → STRUCTURALLY ACCEPTED → distillation → framework promotion → synthesis/experience promotion as justified.

No knowledge extraction before source acceptance. No synthesis promotion when a framework-local note is sufficient. No personal principle promotion from a single unvalidated recommendation.

## Source of truth
ARCHITECTURE_PROPOSAL_V2.md = F architecture; CORE_READING_SET.md = source selection; SOURCE_INTAKE_MANIFEST.md = intake status; framework files = promoted framework knowledge; Synthesis files = promoted cross-framework knowledge; Reflection = experience-derived evidence; Personal Principles = validated personal rules; AI_MEMORY = cross-topic routing.

PDF is canonical; Markdown never overrides it.

## Migration
The retired BOOKS/01–15 layer is not part of the completed architecture. Book 16 remains a pending source-intake item and is outside the current 01–15 completion scope.
