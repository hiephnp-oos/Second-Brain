# R&D Innovation

## Scope

R&D engineering, innovation research, technology scouting, competitor/supplier technology, patents, mechanisms, idea generation, evaluation, and related workflows for bathroom, shower, faucet, and adjacent mechanical products.

## Current Context

R&D Innovation separates reusable capabilities from the workstreams that execute them.

Capabilities provide reusable execution ability. Workstreams own business context, execution outputs, and workstream-specific routing. The Knowledge Sheet is the authoritative structured knowledge layer.

## Status

- State: Active
- Summary: R&D Innovation currently has six active reusable capabilities, three workstreams, and one working BETA Knowledge Sheet and one current authoritative release. CAP-06 `EXPERIMENT_DESIGN` remains DEFER.
- Direction: Keep research evidence traceable, minimize repeated work, and improve the system from observed results rather than adding complexity by default.
- Last reviewed: 2026-09-28

## Working Principles

- Prefer primary, technical, and directly relevant evidence.
- Distinguish evidence, inference, assumption, proposal, and unknown.
- Existing Knowledge Sheet relationships are authoritative only when supported by current source data.
- Absence from the Knowledge Sheet or search results is not proof of novelty.
- Research only to the depth needed for the decision.
- BETA is updated only in explicitly requested batches; publishing to the authoritative Knowledge Sheet requires a separate explicit release decision.
- Capabilities do not own execution output; the invoking workstream owns its outputs.

## Active Projects / References

- Capability contracts: 1. CAPABILITIES/
- Workstream contracts and execution: [2. WORKSTREAMS/](2. WORKSTREAMS/README.md)
- Knowledge lifecycle and authoritative data: [3. KNOWLEDGE/](3. KNOWLEDGE/README.md) · [BETA](3. KNOWLEDGE/BETA/README.md) · [Released v2](3. KNOWLEDGE/RELEASED/Release_23Sep2026/README.md)
- R&D system-improvement record: 2. WORKSTREAMS/2.3 PROJECT_IMPROVEMENT/

## Capability Architecture Baseline

`1. CAPABILITIES/README.md` is the first and authoritative baseline for shared R&D capability boundaries, evidence vocabulary, contract fields, routing conventions, and handoff rules. Every current/future capability contract must conform to it. Any contract folder introduced later under Workstreams, Knowledge, or another layer must follow and reference this baseline; it may add local execution detail but must not fork or redefine shared capability rules. See the baseline for authority, exception, and change-impact rules.

## Capability Map

| Capability | Role | Used by |
|---|---|---|
| CLAW_DISCOVERY | Structured discovery / candidate generation | Personal Research, Idea Review |
| VERIFICATION | Evidence and claim verification | Personal Research, Idea Review, Project Improvement |
| DEEP_RESEARCH | Broad/conflicting/high-risk research | Personal Research, Idea Review |
| EVALUATION | Structured technical/decision evaluation | Idea Review, other R&D workstreams |
| KNOWLEDGE_PROMOTION | Controlled, requested updates into BETA; never publishes releases | Personal Research, Idea Review |
| SUPPLIER_KNOWLEDGE_INTAKE | PR-first supplier PDF/PPTX intake into Knowledge BETA with provenance and audit | Supplier document intake requests |

Capability contracts live under 1. CAPABILITIES/. They contain reusable instructions and validation boundaries, not daily output records.

## Active Workstreams

| Order | Workstream | Purpose | Output owner |
|---|---|---|---|
| 2.1 | PERSONAL_RESEARCH | Personal engineering research, external investigation, and scheduled Claw discovery | 2.1 PERSONAL_RESEARCH/ |
| 2.2 | IDEA_REVIEW | Evidence-based review and development of existing ideas | 2.2 IDEA_REVIEW/ and designated review artifacts |
| 2.3 | PROJECT_IMPROVEMENT | Improve prompts, workflow, tooling, architecture, and validation | 2.3 PROJECT_IMPROVEMENT/ |

The Knowledge layer contains BETA/ (working copy) and RELEASED/ (published snapshots). BETA starts as a copy of Release_23Sep2026; only explicit batch requests update it.

## Core R&D Workflow

Input / Problem / Signal → Workstream → Reusable Capability → Workstream Output → Verification / Evaluation → Knowledge Candidate → Human Verification → Knowledge Sheet

A workstream may consume multiple capabilities, and a capability may be reused by multiple workstreams. Folder order is navigation metadata, not mandatory execution sequence.

## Claw Discovery

CLAW_DISCOVERY is a reusable capability. Its scheduled execution currently belongs to PERSONAL_RESEARCH.

Execution outputs are owned by:
TOPICS/E. RnD INNOVATION/2. WORKSTREAMS/2.1 PERSONAL_RESEARCH/

- One date-specific daily discovery record is written directly under PERSONAL_RESEARCH/ and reviewed by the user.
- One scheduled execution runs per local date at 05:00 Asia/Ho_Chi_Minh and writes `RUN_SLOT 01` to that daily record.
- No staging or batch workflow is used. Existing staging/ and batches/ folders are legacy historical records only; do not write new outputs there.

Daily records are workstream outputs, not capability definition artifacts or authoritative Knowledge Sheet records.

## Knowledge Sheet

3. KNOWLEDGE/BETA/ is the working dataset; 3. KNOWLEDGE/RELEASED/Release_23Sep2026/ remains the official team-shared snapshot.

BETA updates are controlled, explicit batch operations under KNOWLEDGE_PROMOTION. Research and schedule outputs are never automatically written back. Release publication is a separate user decision.

## Prompt Execution Contract

When a task requires current repository information or references a Prompt ID:

1. Access the current GitHub repository.
2. Resolve the Prompt ID against the correct workstream Prompt.csv.
3. Use the full released prompt as the task-specific contract.
4. Read only the relevant capability/workstream context.
5. Follow the prompt's declared input, output, evidence, and validation rules.
6. Do not reconstruct current prompt text from memory when the repository version exists.
7. Preserve UNKNOWN / INFERRED / ASSUMPTION / PROPOSED states explicitly.

## Evidence Rules

Preferred evidence order:

1. Manufacturer / primary source
2. Technical documentation
3. Patent / drawing
4. Standard / authoritative technical publication
5. Peer-reviewed or specialist literature
6. Reputable distributor / industry source
7. Retail / marketplace / blog / forum

Search snippets are discovery aids, not consequential evidence. Product pages establish existence or advertised function, not hidden internal mechanism.

## Project Improvement

2.3 PROJECT_IMPROVEMENT/ owns system-improvement artifacts including prompts, workflow, routing, tooling, governance, validation, regression, scheduler, implementation-plan, and architecture-improvement work.

Cycle: Observe → Identify Gap → Propose Change → Test → Human Verify → Promote

The SoL-Pi and future-improvement documents remain reference tracks; their existence does not activate a new runtime architecture.

## Decisions

- Capabilities and workstreams are separate architectural layers.
- Workstreams own execution context and output; reusable capabilities do not.
- CLAW_DISCOVERY is reusable R&D capability; its scheduled output is owned by PERSONAL_RESEARCH.
- SUPPLIER_KNOWLEDGE_INTAKE is the sixth active reusable R&D capability; CAP-06 `EXPERIMENT_DESIGN` remains DEFER.
- PROJECT_IMPROVEMENT is a first-class R&D workstream.
- Knowledge Sheet remains the authoritative structured knowledge layer.
- Human verification remains mandatory before authoritative promotion.

## Lessons

- A folder hierarchy must not imply that a capability owns the output of every workflow that uses it.
- Physical refactors must update semantic contracts, routing, schedulers, and validators together.
- Deterministic validation must check architectural boundaries, not only file existence.

## Routing

- Product / mechanism / technology / material / process / supplier research → 2.1 PERSONAL_RESEARCH/
- Existing idea evaluation → 2.2 IDEA_REVIEW/
- Project/workflow/prompt/tool/architecture/validation improvement → 2.3 PROJECT_IMPROVEMENT/
- Working knowledge updates → 3. KNOWLEDGE/BETA/; published knowledge → 3. KNOWLEDGE/RELEASED/
- Reusable discovery/evidence/evaluation/promotion ability → 1. CAPABILITIES/

## Next

Use the workstream README and the relevant capability contract as the execution entry point. Use Project Improvement when observed failures justify changes to the system.
