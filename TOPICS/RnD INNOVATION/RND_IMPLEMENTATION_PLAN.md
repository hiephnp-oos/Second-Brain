# R&D Innovation — Future Implementation Plan

## Purpose

Define the implementation plan for applying the validated Capability/Skill execution pattern to R&D Innovation after the Career pilot is proven in real use.

This document is a plan, not the active R&D execution layer.

## Why R&D Follows Career

Career is the pilot because its boundaries, outputs, and recurring cadence are clearer. R&D Innovation has a deeper evidence and reasoning chain and should inherit only proven patterns rather than introduce a generic framework first.

## Target Architecture

`Material → Knowledge Check → Research → Knowledge Candidate → Claw Discovery → Discovery Quality Gate → Idea Review → Evaluate → Deep Analyze → Human Verification → Knowledge Promotion`

The execution layer is capability-based:

- Knowledge Sheet capability
- Personal Research capability
- Claw Idea capability
- Discovery Quality Gate capability
- Idea Review capability
- Evaluation capability
- Deep Analysis capability
- Knowledge Promotion gate

Each capability remains independently routable and keeps its own evidence/output contract.

## Inherited Production Prompt Pattern

R&D Innovation will inherit the production prompt reliability pattern proven through the Career pilot rather than designing a separate prompt framework.

Future R&D capability contracts should therefore include:

- modular capability-specific instructions instead of a monolithic R&D prompt;
- explicit input/context and output contracts;
- explicit evidence-state enums;
- explicit fallback states such as `NO_MATCH`, `INSUFFICIENT_EVIDENCE`, or capability-specific equivalents;
- a compact pre-output validation checklist;
- re-injection of critical invariants immediately before high-impact actions in multi-turn workflows;
- positive output invariants rather than excessive negative prohibitions;
- human verification for durable promotion or material baseline changes.

These are implementation principles, not a requirement to introduce a generic Skill Engine.

Career must first be exercised with real outputs. R&D should copy only patterns that survive that validation and avoid importing unvalidated prompt heuristics as hard rules.

## Required Capability Contract

Each future R&D capability should define:

1. Trigger
2. Inputs/context
3. Task/process
4. Tool selection
5. Output contract
6. Evidence requirements
7. Validation checks
8. Escalation conditions
9. Human verification gate

Do not create a generic Skill Engine unless repeated real usage demonstrates that multiple capabilities need runtime-level abstraction.

## Phase 0 — Baseline Audit

Verify the current R&D Innovation source of truth:

- topic README;
- workstream READMEs;
- Prompt.csv libraries;
- Knowledge Sheet workflow;
- Personal Research workflow;
- Idea Review workflow;
- current GitHub validation;
- evidence hierarchy;
- current human-verification rules.

Acceptance: no duplicate or contradictory execution contract remains.

## Phase 1 — Capability Mapping

Map existing R&D work into explicit capabilities without changing the business logic.

### Knowledge Sheet

Input: material/current knowledge.

Process: check existing knowledge → identify decision-changing gap → research → synthesize → create candidate.

Output: Knowledge Candidate with evidence state.

Validation: source quality, contradiction check, evidence sufficiency, human review.

### Personal Research

Input: question/gap.

Process: formulate research target → discover evidence → test claims → synthesize.

Output: Research result / evidence pack.

Validation: evidence traceability, uncertainty labels, no unsupported conclusion.

### Claw Idea

Input: material/knowledge/research.

Process: identify problem/opportunity → mechanism hypothesis → candidate idea.

Output: idea candidate.

Validation: distinction between evidence and hypothesis.


### Discovery Quality Gate

The Claw discovery layer must distinguish:

- technology signal;
- technical enabler;
- product capability;
- standalone product idea.

A technology or mechanism must not become a standalone idea solely because it is novel in the fitting context, exists in another industry, has a plausible transfer path, or is technically interesting.

Before a candidate enters the three-day batch, apply:

1. **User / Product Outcome**
   - What materially improves for the user or product?
   - The benefit must be observable or testable, not only described as “potentially better”.

2. **Existing-Solution Check**
   - Is the same outcome already adequately solved by a commercial product, relevant patent/prior art, or established technical solution?
   - Existing-solution collision should be detected before further idea elaboration.

3. **Meaningful Delta**
   - Is the difference in user outcome, physical capability, or architecture?
   - Mechanism, material, location, or geometry variation alone is insufficient unless it creates a material outcome/capability change.

4. **Product vs Technical Enabler**
   - Is this a standalone product/system capability?
   - If it is mainly a technical enabler, route it to Tech Radar / Knowledge Sheet rather than force a standalone product idea.

5. **Complexity Justification**
   - If the candidate adds BOM, seals, moving parts, actuators, sensors, energy, packaging, manufacturing, noise, or reliability risk, identify the benefit that justifies the added complexity.
   - If the benefit does not justify the complexity, classify as WATCH, DROP, BASELINE, or technical enabler.

6. **Transferability**
   - For Tech Push candidates, test whether the source capability is credible under fitting conditions: water, pressure, temperature, wet environment, debris/scale, chemicals, potable-water contact where relevant, package, manufacturing, cost, noise, and durability.

Recommended discovery dispositions remain:

- KEEP
- WATCH
- DROP

with recurrence/baseline/variant/enabler classification preserved separately.

Zero qualified candidates is a valid discovery result.

### Idea Review

Input: idea candidate + current Knowledge Sheet.

Process: evidence sufficiency → technology existence → mechanism reasonableness → competitor precedent → supplier/technology support → knowledge gap → research need → idea refinement.

Output: review decision and missing-evidence actions.

Validation: every important claim is classified as verified/evidenced, inferred, assumption, unknown, or proposed.

### Evaluate

Input: reviewed idea.

Process: apply decision-relevant criteria.

Output: evaluation result + rationale.

Validation: criteria are explicit for the decision; do not deep-analyze every idea by default.

### Deep Analyze

Input: ideas that justify deeper work.

Process: user problem/value → existing solutions → mechanism → feasibility → risks → patent/IP → applications → assumptions → verification plan.

Output: analysis package.

Validation: evidence traceability, explicit assumptions, unresolved risks.

### Knowledge Promotion

Input: verified reusable findings.

Process: reconcile with existing Knowledge Sheet → update rather than duplicate → human verification → promote.

Output: authoritative Knowledge Sheet update.

Validation: no duplicate knowledge, no unresolved contradiction, source quality acceptable.

## Phase 2 — Evidence & Validation Contract


### Discovery Validation Contract

The Claw must not equate “technology exists” with “innovation exists”.

Before batch admission, the candidate must preserve:

- evidence for the problem/outcome;
- evidence for the existing solution or source technology;
- explicit remaining DELTA;
- proposed response;
- user/product benefit;
- mechanism;
- fitting insertion point;
- uncertainty;
- discovery disposition;
- classification as NEW / RECURRING SIGNAL / VARIANT / DUPLICATE / BASELINE / TECHNICAL ENABLER where applicable.

Human review remains the final admission authority.


Standardize evidence states:

- VERIFIED / EVIDENCED
- INFERRED
- WORKING ASSUMPTION
- UNKNOWN
- PROPOSED

Preserve the existing evidence hierarchy:

1. Manufacturer / primary source
2. Technical documentation
3. Patents / drawings
4. Standards
5. Peer-reviewed / specialist literature
6. Reputable distributor / industry source
7. Retail / blog / forum

Search snippets remain discovery aids, not final evidence.

## Phase 3 — Human Verification Gates

Require explicit human verification before:

- promoting a Knowledge Candidate;
- changing durable baseline knowledge;
- treating a speculative mechanism as established;
- making a patent/IP conclusion material to the project;
- changing a released prompt or workflow contract.

AI can discover, analyze, classify, and propose. Human approval controls authoritative promotion.

## Phase 4 — Production Skill Contract Adoption

Before scheduler integration, implement the validated Career prompt pattern across the selected R&D capabilities.

Acceptance:
- capability instructions are independently routable;
- inputs/context are explicit;
- outputs are structured enough to validate;
- evidence states use the canonical enum set;
- fallback/escalation behavior is explicit;
- self-validation exists for high-impact outputs;
- no hidden or implicit baseline promotion is introduced.

Only proceed when Career evidence shows the pattern improves reliability without adding unnecessary complexity.

## Phase 5 — Scheduler Integration

Only after capability contracts are stable, connect recurring tasks.

Scheduling is an execution trigger, not the workflow source of truth.


The current Claw cadence remains:

- daily RS-10 → RS-11 → RS-12 discovery/staging;
- three-day RS-13 consolidation when three new UNBATCHED daily runs are available.

Keep the scheduler lightweight. It should trigger the current GitHub-defined capability contracts and should not contain a second copy of the business rules.

Prefer the smallest number of schedules that preserves workstream cadence and output quality.

Do not make the R&D system dependent on event-triggered GitHub automation when the available ChatGPT plan cannot provide that architecture reliably.

## Phase 6 — Evaluation & Regression

Evaluate each capability using real outputs.


For Claw, compare batches before and after a learning change.

Measure:

- evidence quality;
- unsupported-claim rate;
- duplicate knowledge rate;
- false novelty claims;
- mechanism overclaiming;
- technical-enabler-as-product rate;
- baseline/known-solution leakage;
- weak-user-outcome rate;
- insufficient-transferability rate;
- research usefulness;
- idea quality;
- reviewer correction rate;
- repeated failure patterns.

Do not judge the learning patch by KEEP count alone. A smaller batch with stronger distinct opportunities is an improvement if it reduces false novelty, baseline leakage, duplicates, and weak-value candidates without suppressing valid opportunities.


Create regression examples only for recurring, material failures.

Do not introduce a database or dedicated evaluation service until real usage demonstrates that Markdown + Prompt.csv + Git history + manual/ChatGPT evaluation is insufficient.


## Claw Learning & Regression Loop

Human review of Claw batches is treated as observed system performance.

Process:

`Batch Output → Human Review → Failure Pattern Identification → Learning Rule → Experimental Prompt / Workflow Change → Next Batch → Compare Results → Human Verify → Promote to Baseline`

Batch #1 lesson classes should be tracked as learning signals, not automatically hardened into permanent rules:

- technology-first ideas with weak product outcome;
- known/commercial/patent baseline solutions;
- duplicate or saturated variants;
- technical enablers presented as standalone products;
- weak or non-testable user value;
- insufficient technology-transfer evidence;
- added complexity without clear benefit justification;
- installation/maintenance/CI ideas outside the intended product-innovation scope.

The Batch #2 experiment must explicitly test whether the Discovery Quality Gate reduces these failure classes.

Do not promote a lesson to permanent baseline from one rejected candidate alone. Promote only when the pattern is material, generalizable, tested on subsequent outputs, and does not introduce unacceptable regression.

## Phase 7 — Promotion to Baseline

Use:

`Observe → Identify Gap → Propose Change → Test → Human Verify → Promote`

No prompt/rule/knowledge change becomes baseline automatically.

## Deliverables

When R&D implementation starts, expected repository changes are:

- capability-level execution contracts;
- synchronized workstream READMEs;
- updated Prompt.csv contracts where still needed;
- explicit evaluation/validation criteria;
- preserved evidence hierarchy;
- scheduler integration only after contracts stabilize;
- removal of duplicate or obsolete execution text.

## Completion Criteria

R&D Innovation implementation is complete when:

1. every recurring R&D workstream has one clear capability contract;
2. routing is unambiguous;
3. evidence state is explicit;
4. human promotion gates are explicit;
5. outputs are structured enough to validate;
6. no duplicate source of truth is introduced;
7. scheduled execution, if used, triggers capabilities without redefining them;
8. real usage demonstrates acceptable output quality;
9. repeated failure modes feed rule improvements;
10. GitHub reflects the final verified state.

## Explicit Non-Goals

Do not introduce, at this stage:

- generic Skill Engine;
- RAG/vector database;
- autonomous baseline promotion;
- duplicated knowledge stores;
- a separate prompt-version database;
- AI-powered GitHub Actions requiring a dedicated API key.

These may be reconsidered only when demonstrated scale or failure patterns justify them.
