# R&D Capabilities — Architecture & Contract Baseline

**Status:** Phase 1 baseline  
**Owner:** `1. CAPABILITIES/`  
**Applies to:** all current and future reusable R&D capabilities and any downstream contract folders  
**Controlling source:** this file defines the shared architecture and contract conventions. Individual capability READMEs define capability-specific behavior.

## 1. Authority and inheritance

`1. CAPABILITIES/` is the **first and authoritative baseline** for reusable R&D capability architecture.

- The shared boundaries, evidence vocabulary, capability contract fields, routing conventions, and handoff minimums are defined here first.
- Existing and future capability contracts under `1. CAPABILITIES/<capability>/` must conform to this baseline.
- Any later contract folder created under a Workstream, Knowledge, or another layer must **follow and reference this baseline**. It may add local execution details, but must not redefine, fork, weaken, or silently override shared capability rules.
- If a downstream contract needs an exception, document the reason, scope, owner, and approval in that contract and update this baseline only if the rule is intended to change globally.
- A downstream folder is not a second source of truth. Workstreams own execution context and outputs; Knowledge owns lifecycle-governed records; neither owns reusable capability methodology.
- Changes to this baseline require impact review of all five capability READMEs, active workstream prompts/routing, Knowledge boundaries, and relevant regression/validator rules.

This is an architecture and instruction contract, not a runtime engine. Folder order is navigation metadata, not mandatory execution order.

## Cross-cutting language skill

[VIETNAMESE_REWRITE.md](VIETNAMESE_REWRITE.md) is the reusable language-only standard for Vietnamese R&D outputs. It preserves meaning, technical terminology, evidence level, uncertainty, limitations, decisions, and structure. It must not research, fact-check, add technical content, or change conclusions. Workstreams may require Vietnamese output and reference this skill; they remain owners of their reports.

## 2. Layer boundary contract (P1-A01)

| Layer | Owns | Must not own |
|---|---|---|
| `1. CAPABILITIES/` | Reusable methods, trigger rules, inputs, procedures, output/handoff contracts, quality gates, failure behavior | Workstream run data, idea dispositions, research reports, daily/batch outputs |
| `2. WORKSTREAMS/` | Business/task context, user inputs, Prompt.csv, routing, execution and resulting artifacts | A competing copy of reusable capability methodology |
| `3. KNOWLEDGE/` | Candidate/test knowledge and human-verified Released Knowledge lifecycle | Raw execution logs or unapproved findings treated as authoritative |
| `2.3 PROJECT_IMPROVEMENT/` | System improvement plans, decisions, regression and validation records | Normal product/technology research unrelated to system improvement |

**Ownership rules**
1. The invoking workstream owns every execution output, even when one or more capabilities produced it.
2. A capability may return a proposed next route; it does not take ownership of the destination workstream's records.
3. Knowledge promotion is a controlled lifecycle transition, not an automatic side effect of research, verification, or evaluation.
4. Human approval remains mandatory before authoritative Released Knowledge or durable baseline changes.
5. A scheduler or prompt may trigger work and specify task context; it does not redefine capability methods or own the resulting data.

## 3. Shared evidence vocabulary (P1-A02)

Use the following canonical **epistemic state** for each material claim/finding. State what the available evidence warrants, not what the workflow hopes to establish.

| Canonical state | Meaning | Use |
|---|---|---|
| `EVIDENCED` | Identifiable evidence directly supports the stated claim within a defined scope. It does not imply universal truth or that every aspect is independently verified. | Record the supported claim and source-to-claim link. |
| `INFERRED` | A reasoned conclusion derived from evidence, but not directly established by it. | State the inference and its premises. |
| `ASSUMPTION` | A working premise adopted for analysis without sufficient supporting evidence. | State why it is needed and how it can be checked. |
| `UNKNOWN` | Available information is insufficient to establish the claim. | Preserve the gap; do not convert it to false or negative. |
| `PROPOSED` | A suggested concept, mechanism, explanation, or action not yet established as fact. | Label as a proposal/hypothesis. |
| `CONFLICTING` | Material sources or evidence support incompatible claims, scopes, or interpretations. | Preserve both sides, scope/date, and the resolution needed. |

### 3.1 State vs verification outcome

Epistemic state and verification outcome are related but **not interchangeable**.

- `EVIDENCED` describes the status of a claim's support.
- Verification outcome describes what a verification task concluded, for example: `SUPPORTED`, `PARTIALLY_SUPPORTED`, `CONFLICTING`, `UNSUPPORTED`, or `NOT_VERIFIABLE`.
- A source can exist without supporting the claim. Product existence does not establish hidden mechanism, performance, compliance, or target-application suitability.
- `UNSUPPORTED` means the inspected evidence does not support the claim; it does not automatically mean the claim is false.
- `NOT_VERIFIABLE` and `UNKNOWN` must not be reported as PASS or converted into a negative finding.
- Human approval, Knowledge eligibility, and Released status are lifecycle/authorization states, not evidence states.

### 3.2 Legacy state mapping

When updating existing contracts, map legacy terms as follows. Do not retain parallel enums for the same meaning.

| Legacy term | Canonical treatment |
|---|---|
| `EVIDENCE`, `EVIDENCED`, `VERIFIED` (when used as a claim state) | `EVIDENCED`; use a separate verification outcome if needed |
| `INFERENCE`, `INFERRED` | `INFERRED` |
| `ASSUMPTION`, `WORKING ASSUMPTION` | `ASSUMPTION` |
| `UNKNOWN` | `UNKNOWN` |
| `PROPOSAL`, `PROPOSED` | `PROPOSED` |
| `CONTRADICTION`, `CONFLICTING` | `CONFLICTING` |
| `VERIFIED / EVIDENCED` (combined workstream label) | Split: claim state `EVIDENCED`; verification outcome recorded separately |
| `UNSUPPORTED` | Verification outcome, not an epistemic state; claim state remains based on what is known |

The canonical terms apply to material claims/findings, not every sentence. Keep source date, scope, provenance, and limitations alongside the state.

## 4. Capability contract standard (P1-A03)

Each capability README is the operational entry contract. It must cover all fields below, or explicitly mark a field `N/A` with a reason. A concise contract is preferred; substantial reusable methods may be linked as references only when justified.

| # | Required field | Minimum content |
|---:|---|---|
| 1 | Identity and purpose | Reusable job and boundary |
| 2 | Use cases | 2–3 concrete supported tasks and expected results |
| 3 | Trigger / non-trigger | Positive triggers, exclusions, ambiguity handling |
| 4 | Inputs and preconditions | Required/optional inputs; missing-input behavior |
| 5 | Procedure | Ordered actionable steps; mandatory vs conditional |
| 6 | Method selection | How to choose depth, method, or source strategy |
| 7 | Tool boundary | Available/allowed tools and fallback if unavailable |
| 8 | Evidence and uncertainty | Canonical state use and claim limitations |
| 9 | Output contract | Required fields, traceability, output owner |
| 10 | Quality gates | Observable checks before returning output |
| 11 | Handoffs | Destination, trigger, minimum payload |
| 12 | Human gate | Approval-dependent decisions/actions |
| 13 | Failure and stop conditions | Bounded outcomes, escalation, no fabricated completion |
| 14 | Persistence boundary | Workstream-owned destination; no capability-owned run data |
| 15 | Examples and tests | Links to relevant tests/examples, or explicit planned/not yet observed status |

Do not add boilerplate just to fill fields. Mark `N/A` only when the capability genuinely does not need that behavior. A README's existence or completeness checklist is not proof of functional quality.

## 5. Trigger, non-trigger and routing standard (P1-A04)

### 5.1 Selection rules

1. Route first to the **workstream** by the primary purpose of the user's task.
2. Invoke a capability only when its reusable responsibility is needed to complete that task.
3. Use the narrowest capability sufficient for the question; escalate only when the evidence gap, breadth, risk, or decision impact warrants it.
4. A prompt may invoke multiple capabilities, sequentially or conditionally. This is not a mandatory linear pipeline.
5. Workstream Prompt.csv and README own task-specific routing. Capability README owns reusable method and its trigger boundary.
6. If two capabilities appear applicable, select by the distinction in their responsibility; do not duplicate the same method in both. If still ambiguous, preserve uncertainty and ask only for context that changes the route.

### 5.2 Routing distinctions

| Capability | Invoke when | Do not invoke merely because |
|---|---|---|
| `CLAW_DISCOVERY` | The task needs generation/exploration of candidate solutions, technologies, or opportunities from a scoped problem/signal | The user asks to verify or summarize a known claim |
| `VERIFICATION` | One or more specific material claims/sources/relationships need a bounded support check | The task is broad exploration with multiple unresolved sub-questions |
| `DEEP_RESEARCH` | The question is broad, conflicting, high-risk, or decision-critical and cannot be closed by minimum sufficient targeted checking | A single narrow claim can be checked directly |
| `EVALUATION` | An identified idea/finding must be assessed against decision-relevant criteria | A simple factual lookup or evidence check is sufficient |
| `KNOWLEDGE_PROMOTION` | An explicit reusable Knowledge Candidate is proposed for controlled promotion | Research output merely exists or a claim is marked EVIDENCED |

### 5.3 Handoff / escalation rules

- Specific unresolved claim or source issue → `VERIFICATION`.
- Broad, material, conflicting, or decision-critical gap that targeted verification cannot close → `DEEP_RESEARCH`.
- Research/verification is sufficiently bounded and an explicit decision question remains → `EVALUATION`.
- New candidates are needed → `CLAW_DISCOVERY`; discovery does not itself decide final disposition.
- Reusable finding is proposed for authoritative Knowledge → `KNOWLEDGE_PROMOTION`, subject to eligibility and human approval.
- Physical performance uncertainty is not resolved by desk research. Capture the unknown and required experiment; do not imply an experiment capability exists until separately approved.
- Human/specialist review is required where authority, lab testing, supplier confirmation, or legal/IP interpretation exceeds available evidence or tools.

## 6. Output and handoff minimum (P1-A05)

Every capability result returned to a workstream must include, as applicable:

1. **Task context:** question/problem and decision supported.
2. **Identity:** idea/claim/finding/candidate ID or a clear label.
3. **Result:** concise finding and the work performed.
4. **Evidence:** source references and source-to-claim relationship.
5. **State:** canonical epistemic state for material claims.
6. **Limits:** scope, assumptions, unknowns, conflicts, and checks not performed.
7. **Completed checks:** what was checked and what was not checked.
8. **Next action:** requested handoff, destination, or explicit no-handoff rationale.
9. **Ownership:** invoking workstream and its designated persistence destination.
10. **Approval state:** whether a human decision is required/pending; never imply approval.

Only include fields relevant to the task, but do not omit decision-critical uncertainty or provenance. A handoff must be self-contained enough for the next capability/workstream to act without assuming unrecorded steps. The sender must state what has and has not been established.

## 7. Target file map (P1-A06)

### Baseline now

| Path | Role | Authority |
|---|---|---|
| `1. CAPABILITIES/README.md` | Shared architecture and contract baseline | Authoritative for shared capability rules |
| `1. CAPABILITIES/1.x <CAPABILITY>/README.md` | Capability-specific operational contract | Must conform to baseline; owns only its method |
| `2. WORKSTREAMS/<workstream>/README.md` | Workstream context, routing, output ownership | May add local detail; cannot redefine shared capability rules |
| `2. WORKSTREAMS/<workstream>/Prompt.csv` | Task-specific execution contract | Invokes/references capability; owns task/output specifics |
| `3. KNOWLEDGE/README.md` and lifecycle folders | Knowledge state and promotion boundary | Owns Knowledge lifecycle, not reusable capability methods |

### Reference/template split decision

- Do **not** create a generic `CONTRACTS/`, `references/`, or `templates/` folder in this phase.
- Keep the shared baseline in `1. CAPABILITIES/README.md`; do not duplicate it in workstreams or Knowledge.
- Keep each existing capability's concise operational contract in its existing README during Phase 1.
- Add a capability-specific reference only in Phase 2 when a substantial, reusable method would otherwise make its README difficult to navigate or is conditionally needed.
- Any future contract folder elsewhere must inherit this baseline and link back to it. Its local contract may specialize, not fork, shared rules.
- No empty folders or placeholder files.

## 8. Capability extension decision (P1-A07)

**Decision: DEFER standalone `EXPERIMENT_DESIGN` capability.**

Rationale:
- P0 identified physical-validation uncertainty as a boundary to preserve, but did not establish a sufficiently documented set of recurring real cases, reuse frequency, or demonstrated overlap failure in current DEEP_RESEARCH/EVALUATION.
- Creating a sixth capability now would be speculative and add maintenance/routing cost before reuse is demonstrated.
- Current capabilities must explicitly preserve physical uncertainty and identify the experiment needed; they must not claim to design/execute/validate physical tests beyond their evidence and tool access.

Reopen only when Project Improvement records actual cases with source/output references, recurring cross-workstream need, and an overlap analysis showing why a conditional method inside an existing capability is insufficient. A later decision must choose add / embed / continue defer and receive human approval before any new capability folder is created.

## 9. Phase 1 acceptance and change control

Phase 1 is complete when:
- [x] P1-A01 layer boundaries are explicit.
- [x] P1-A02 canonical evidence vocabulary and legacy mapping are explicit.
- [x] P1-A03 all 15 capability contract fields are defined.
- [x] P1-A04 trigger, non-trigger, ambiguity, and routing conventions are defined.
- [x] P1-A05 minimum output/handoff payload is defined.
- [x] P1-A06 target file map and reference split are decided without creating duplicate folders.
- [x] P1-A07 CAP-06 disposition is recorded as DEFER with rationale and reopen criteria.

This completes the **architecture standard**, not the implementation of the five capability contracts. Phase 2 must update one capability at a time, then update affected workstream routing/prompts and tests.

Every change to this baseline must identify the plan action ID, affected paths, compatibility/migration impact, tests, and approval state. Never report semantic or functional PASS based only on structural checks.


## Supplier Knowledge Intake

[1.6 SUPPLIER_KNOWLEDGE_INTAKE](1.6 SUPPLIER_KNOWLEDGE_INTAKE/README.md) defines the PR-first supplier PDF/PPTX intake workflow and its mandatory [progress checklist](1.6 SUPPLIER_KNOWLEDGE_INTAKE/INTAKE_CHECKLIST.md). It works directly in BETA on a Draft PR and does not create a parallel supplier knowledge database.
