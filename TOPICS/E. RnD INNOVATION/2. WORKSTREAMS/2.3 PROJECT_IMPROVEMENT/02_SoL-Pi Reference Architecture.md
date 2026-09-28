
# SoL-Pi Reference Architecture

## Status

- Lifecycle: REFERENCE / DEFERRED
- Current implementation: NONE
- Activation: evidence-driven only
- Independence: independent of `01_RND_IMPLEMENTATION_PLAN.md`
- Source reference: NVlabs/SoL-Pi
- Repository: https://github.com/NVlabs/SoL-Pi
- Purpose: preserve a detailed, reusable plan for selectively adapting SoL-Pi agent-harness principles to R&D Innovation if the current R&D implementation later demonstrates a material harness limitation.

This document is a reference architecture, not an execution instruction. Merely having this file does not activate SoL-Pi-inspired behavior.

## 1. Why this document exists

R&D Innovation may later encounter problems that are not primarily caused by prompts, workstream logic, evidence rules, or capability contracts. Examples include repeated replay of large research observations, excessive context growth, redundant validation turns, or loss of traceability during context reduction.

SoL-Pi is retained as a reference architecture for that class of problem.

This document intentionally stands alone from the R&D capability implementation plan. The current implementation path remains governed by:

`TOPICS/6. RnD INNOVATION/1. Personal Research/2. Project Improvement/01_RND_IMPLEMENTATION_PLAN.md`

If that implementation path proves ineffective in real use, this document provides a separate, pre-defined route for investigating harness-level improvements without reconstructing SoL-Pi from memory.

## 2. Source architecture

SoL-Pi is an NVIDIA Research project that extends Pi with agent-harness optimization mechanisms. The reference repository is:

https://github.com/NVlabs/SoL-Pi

Primary source areas to consult before any future adaptation:

- README.md — project purpose, architecture summary, installation and mechanism overview.
- docs/compatibility.md — compatibility boundaries and Pi API dependencies.
- docs/configuration.md — configuration model and validation expectations.
- docs/installation.md — installation / activation behavior.
- SECURITY.md — trust boundaries and security considerations.
- examples/ — configuration and usage examples.
- issues / pull requests — known limitations, regressions, compatibility changes, and implementation evolution.

Important rule: always re-read the current upstream repository before implementing any adaptation. This document is a planning baseline, not a frozen copy of the upstream implementation.

## 3. What SoL-Pi contributes conceptually

SoL-Pi should be treated as a reference for an agent harness, not as a required application framework.

Its important architectural ideas for R&D Innovation are:

1. Action Fusion
2. ObservationPack
3. Evidence-Preserving Reducer
4. Online Context Compact

These mechanisms address different classes of runtime inefficiency. They should not be collapsed into one generic "optimization layer".

### 3.1 Action Fusion

Concept:

Combine an action and its immediate validation when the execution semantics allow this, reducing unnecessary intermediate agent turns while preserving verification.

R&D interpretation:

`Research Action → Immediate Evidence / Result Validation`

Examples:
- search candidate → open candidate → validate that the source actually supports the claim;
- extract finding → verify quotation against source;
- create structured artifact → validate schema before treating it as complete.

Do not use Action Fusion to skip validation. The purpose is fewer redundant turns, not weaker verification.

### 3.2 ObservationPack

Concept:

Store large tool observations outside the active conversational context and retain a stable handle or compact representation that can be recalled when exact evidence is required.

R&D interpretation:

`Raw Research Output → Archived Evidence Pack → Evidence ID / Handle → Selective Recall`

Potential use cases:
- large patent extraction;
- long technical PDFs;
- many search results;
- supplier documentation;
- large product-comparison evidence sets.

Desired properties:
- original evidence remains retrievable;
- active context contains only the useful projection;
- recall can request a specific source, section, page, claim, figure, or excerpt;
- no lossy summary is silently treated as the original evidence.

### 3.3 Evidence-Preserving Reducer

Concept:

Reduce a large observation to a smaller representation only when the reduced representation retains traceability to the original evidence and can be validated against it.

R&D interpretation:

`Original Evidence → Reduced Evidence Receipt → Validation → Finding`

An R&D evidence receipt should, where applicable, preserve:
- evidence ID;
- claim/finding;
- source;
- exact supporting excerpt or exact technical reference;
- source location;
- evidence status;
- archive/recall pointer.

Failure behavior:
- if reduction cannot be validated, retain the original observation;
- do not upgrade evidence status;
- do not convert missing support into a negative conclusion;
- do not let a summary become the authoritative source.

### 3.4 Online Context Compact

Concept:

When completed work no longer needs its full working context, compact it while retaining the information needed to continue and the ability to recover exact prior evidence.

R&D interpretation:

`Subtask Complete → Freeze Finding → Preserve Evidence IDs → Compact Active Context → Continue`

A compacted R&D subtask should normally retain:
- completed finding;
- evidence status;
- source/evidence IDs;
- decision impact;
- remaining uncertainty;
- unresolved actions;
- recall path to detailed evidence.

The archive remains the evidence store; the active context remains the working state.

## 4. R&D target architecture

Do not create a new top-level workstream.

Treat the SoL-Pi-inspired layer as a maintainer/runtime-harness capability supporting the existing workstreams.

```text
R&D Innovation
├── Knowledge Sheet
├── Personal Research
│   └── Project Improvement
├── Idea Review
└── Optional R&D Harness Patterns
    ├── Action control
    ├── Observation management
    ├── Evidence management
    └── Context lifecycle
```

The harness must not become a second source of truth for business logic.

Business workflow remains in existing R&D architecture and Prompt.csv contracts.

## 5. Required separation of concerns

```text
Business / Research Logic
    ↓
Capability / Prompt Contract
    ↓
R&D Harness Pattern
    ↓
Tool / Web / GitHub / File execution
    ↓
Evidence
```

The harness is not allowed to redefine:
- what an R&D idea is;
- what qualifies as a technology signal;
- evidence-state semantics;
- Claw Quality Gate rules;
- Knowledge Sheet authority;
- Idea Review decisions;
- human promotion authority.

It only changes how execution is managed.

## 6. Evidence model

Any future SoL-Pi-inspired implementation must preserve the current R&D evidence discipline.

Canonical states:

- VERIFIED / EVIDENCED
- INFERRED
- WORKING ASSUMPTION
- UNKNOWN
- PROPOSED

Required distinctions:

- product existence does not prove hidden mechanism;
- advertised function does not prove internal architecture;
- generic material knowledge does not prove a specific commercial grade;
- not finding a patent does not establish novelty;
- missing evidence is not negative evidence;
- search snippets are discovery aids, not consequential evidence.

A harness optimization is invalid if it makes any of these distinctions less reliable.

## 7. Evidence Pack proposal

If ObservationPack is justified by real use, implement the smallest R&D equivalent.

Suggested record:

```text
Evidence Pack
- Pack ID
- Created date
- Research task / parent task
- Source type
- Source URL / document reference
- Source title
- Retrieval date
- Raw artifact location
- Relevant sections / pages
- Evidence excerpts
- Evidence status
- Linked findings
- Open uncertainty
```

Stable IDs should be used for internal references.

The Evidence Pack is an archive/reference object, not a Knowledge Sheet record.

Do not automatically promote Evidence Packs into the Knowledge Sheet.

## 8. Evidence Receipt proposal

When a large observation is reduced, create a compact receipt rather than an unsupported summary.

Suggested structure:

```text
Evidence Receipt
- Receipt ID
- Evidence Pack ID
- Claim / Finding
- Exact support
- Source
- Location
- Evidence status
- Relevance / decision impact
- Verification result
```

Optional hash/integrity metadata may be added only when exact byte-level recovery is materially useful.

Do not introduce hashes merely for theoretical completeness.

## 9. Research task state

If context compaction becomes necessary, use a small state model:

```text
PLANNED
→ ACTIVE
→ BLOCKED
→ VERIFIED
→ CLOSED
```

A closed subtask should leave:
- final finding;
- evidence IDs;
- evidence status;
- unresolved uncertainty;
- next downstream action.

Closed does not mean deleted.

## 10. Action contract

Future harness actions should be explicit enough to validate.

Suggested shape:

```text
Action
- Action ID
- Purpose
- Inputs
- Tool
- Expected output
- Evidence requirement
- Validation rule
- Failure behavior
```

The implementation may remain implicit in prompt/tool execution if explicit runtime infrastructure is unnecessary.

Do not create an Action framework merely for naming's sake.

## 11. Context compaction policy

Compaction should be need-driven, not schedule-driven.

Consider compaction when one or more are observed:
- repeated replay of large tool output;
- completed subtasks occupying material context;
- context pressure affecting instruction adherence;
- redundant rereading of the same evidence;
- agent turns increasing without corresponding information gain.

Do not compact merely because context exists.

Before compaction verify:
1. the subtask is complete or intentionally paused;
2. required findings have been recorded;
3. evidence references are stable;
4. open uncertainty is preserved;
5. exact evidence remains recoverable.

After compaction verify:
1. next action is unambiguous;
2. required invariants are still present;
3. evidence can be recalled;
4. no finding was silently upgraded or removed.

## 12. Research reducer policy

The reducer should optimize information density, not simply token count.

Bad:

`100 pages → 10-line summary`

Acceptable:

`100 pages → evidence archive + validated receipts + decision-relevant findings`

A reduction is successful only if:
- traceability remains;
- material caveats remain;
- uncertainty remains visible;
- evidence status remains unchanged unless new evidence justifies a change.

If validation fails, retain the larger source representation.

## 13. Action Fusion policy

Use only where the tool semantics make validation deterministic enough.

Good candidates:
- artifact generation + schema validation;
- search candidate + source-open verification;
- extraction + exact-source verification.

Bad candidates:
- combining independent research questions;
- skipping a source check because a search result looked convincing;
- fusing speculative synthesis with acceptance;
- combining actions when failure recovery becomes unclear.

The test is: fewer redundant turns without losing verification quality.

## 14. Harness metrics

Do not add telemetry infrastructure initially.

Measure manually or from available outputs only when a real problem appears.

Useful metrics:
- repeated-observation rate;
- repeated-search / reread rate;
- context-growth symptoms;
- validation-turn duplication;
- research completion quality;
- unsupported-claim rate;
- evidence traceability after reduction;
- reviewer correction rate;
- task completion efficiency.

Avoid optimizing token count alone.

## 15. Activation gate

This architecture remains inactive until evidence demonstrates a harness-level problem.

Activation evidence should come from real R&D usage after the current capability implementation has been exercised.

Examples of qualifying evidence:
- repeated research outputs are too large to manage reliably;
- agents repeatedly replay or reread the same evidence;
- context growth produces measurable execution drift;
- summaries lose traceability;
- redundant validation turns materially slow research;
- completed subtasks materially degrade active-context quality.

One isolated inconvenience is not sufficient.

## 16. Adoption decision

Use this sequence:

```text
Observe
→ Identify harness problem
→ Map problem to SoL-Pi mechanism
→ Define smallest R&D adaptation
→ Define regression test
→ Test
→ Human Verify
→ Promote only if justified
```

Possible outcomes:

- NO_CHANGE
- ADOPT_PATTERN
- ADAPT_PATTERN
- REJECT_PATTERN

Never use "ADOPT_SOL-PI" as a blanket status.

## 17. Mapping matrix

| Observed R&D problem | Reference pattern | Smallest likely adaptation |
|---|---|---|
| Large research output repeatedly replayed | ObservationPack | Evidence Pack + stable ID |
| Summary loses source traceability | Evidence-Preserving Reducer | Evidence Receipt + source verification |
| Completed subtask pollutes context | Online Context Compact | Research subtask compaction |
| Repeated action then validation turns | Action Fusion | Combined action/verification contract |
| Context pressure causes drift | Online Context Compact | Explicit compaction boundary + invariant re-injection |
| No material harness problem | None | NO_CHANGE |

## 18. Interaction with RND_IMPLEMENTATION_PLAN.md

This document is intentionally independent.

`01_RND_IMPLEMENTATION_PLAN.md` answers:

> How should R&D Innovation implement and validate the capability/skill execution pattern?

This document answers:

> If real usage later reveals a runtime/harness limitation, how can R&D Innovation selectively use SoL-Pi as a reference without importing the whole framework?

Neither document automatically overrides the other.

Preferred sequencing:

1. Evaluate Batch #2.
2. Execute the current R&D implementation plan if still justified.
3. Exercise the resulting system with real work.
4. Observe actual failure patterns.
5. Only then decide whether the SoL-Pi reference architecture is needed.

Exception:

If the R&D implementation plan fails because of a clear harness-level problem that maps directly to a SoL-Pi mechanism, use this document as an independent investigation path. Do not rewrite the R&D implementation plan merely to force SoL-Pi into it.

## 19. What must not be imported by default

Do not introduce merely because SoL-Pi contains it:

- Pi runtime;
- a generic agent framework;
- a new runtime engine;
- a separate evidence database;
- a vector database;
- a telemetry platform;
- token-pricing/economics infrastructure;
- automatic baseline promotion;
- hidden context-management state;
- a second scheduler;
- a parallel source of truth.

Any such addition requires separate evidence and justification.

## 20. Tooling assumption for the current R&D environment

The intended reference environment is:

- ChatGPT Go for reasoning and execution;
- connected GitHub for persistent source of truth and repository mutation;
- Web Search for current external evidence;
- existing R&D Project / Knowledge Sheet / Prompt.csv artifacts.

This is sufficient to **refer to and selectively adapt the architecture**.

It is not equivalent to embedding the Pi runtime or reproducing SoL-Pi's native runtime hooks.

Do not claim that R&D Innovation "runs SoL-Pi" unless a future implementation actually installs and executes SoL-Pi.

## 21. Upstream verification requirement

Before any future implementation:
- re-read the current SoL-Pi README;
- inspect current architecture/mechanism documentation;
- inspect current compatibility documentation;
- inspect relevant open issues/pull requests;
- verify that the referenced mechanism still exists and behaves as documented;
- compare the current R&D baseline before changing anything.

Upstream source takes precedence over this reference document for SoL-Pi-specific factual claims.

## 22. Expected implementation pattern if activated

A minimal implementation should normally proceed in this order:

### Stage A — Diagnose

Document the observed failure with concrete examples.

### Stage B — Map

Identify the smallest SoL-Pi principle that addresses the failure.

### Stage C — Design

Define:
- current behavior;
- target behavior;
- required artifact changes;
- evidence preservation;
- validation;
- rollback.

### Stage D — Prototype

Implement only the smallest adaptation.

### Stage E — Regression

Compare before/after outputs using representative cases.

### Stage F — Human verification

Review:
- evidence quality;
- traceability;
- research quality;
- complexity;
- compatibility;
- failure recovery.

### Stage G — Promote

Only then update the current R&D baseline.

## 23. Stop conditions

Stop the SoL-Pi adoption effort when any of these is true:

- the observed problem is solved;
- the remaining problem is not material;
- the adaptation adds more complexity than benefit;
- evidence cannot demonstrate improvement;
- existing R&D mechanisms already solve the problem adequately;
- a simpler non-SoL-Pi solution is sufficient.

The objective is not to reproduce SoL-Pi. The objective is to improve R&D Innovation with the smallest justified architecture change.

## 24. Source register

Primary:
- NVIDIA Research — SoL-Pi repository: https://github.com/NVlabs/SoL-Pi

Upstream files to verify before implementation:
- https://github.com/NVlabs/SoL-Pi/blob/main/README.md
- https://github.com/NVlabs/SoL-Pi/blob/main/docs/compatibility.md
- https://github.com/NVlabs/SoL-Pi/blob/main/docs/configuration.md
- https://github.com/NVlabs/SoL-Pi/blob/main/SECURITY.md
- https://github.com/NVlabs/SoL-Pi/issues
- https://github.com/NVlabs/SoL-Pi/pulls

R&D Innovation internal references:
- `TOPICS/6. RnD INNOVATION/1. Personal Research/2. Project Improvement/01_RND_IMPLEMENTATION_PLAN.md`
- `TOPICS/6. RnD INNOVATION/1. Personal Research/2. Project Improvement/README.md`
- `TOPICS/6. RnD INNOVATION/1. Personal Research/README.md`
- `TOPICS/6. RnD INNOVATION/README.md`

## 25. Final rule

Do not implement SoL-Pi because it is technically interesting.

Implement only the smallest reference-derived pattern that solves a demonstrated R&D Innovation problem while preserving evidence, traceability, simplicity, and human verification.
