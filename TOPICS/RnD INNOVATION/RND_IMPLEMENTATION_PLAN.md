# R&D Innovation — Future Implementation Plan

## Purpose

Define the implementation plan for applying the validated Capability/Skill execution pattern to R&D Innovation after the Career pilot is proven in real use.

This document is a plan, not the active R&D execution layer.

## Why R&D Follows Career

Career is the pilot because its boundaries, outputs, and recurring cadence are clearer. R&D Innovation has a deeper evidence and reasoning chain and should inherit only proven patterns rather than introduce a generic framework first.

## Target Architecture

`Material → Knowledge Check → Research → Knowledge Candidate → Claw Idea → Idea Review → Evaluate → Deep Analyze → Human Verification → Knowledge Promotion`

The execution layer is capability-based:

- Knowledge Sheet capability
- Personal Research capability
- Claw Idea capability
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

## Phase 4 — Scheduler Integration

Only after capability contracts are stable, connect recurring tasks.

Scheduling is an execution trigger, not the workflow source of truth.

Prefer the smallest number of schedules that preserves workstream cadence and output quality.

Do not make the R&D system dependent on event-triggered GitHub automation when the available ChatGPT plan cannot provide that architecture reliably.

## Phase 5 — Evaluation & Regression

Evaluate each capability using real outputs.

Measure:

- evidence quality;
- unsupported-claim rate;
- duplicate knowledge rate;
- false novelty claims;
- mechanism overclaiming;
- research usefulness;
- idea quality;
- reviewer correction rate;
- repeated failure patterns.

Create regression examples only for recurring, material failures.

Do not introduce a database or dedicated evaluation service until real usage demonstrates that Markdown + Prompt.csv + Git history + manual/ChatGPT evaluation is insufficient.

## Phase 6 — Promotion to Baseline

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
