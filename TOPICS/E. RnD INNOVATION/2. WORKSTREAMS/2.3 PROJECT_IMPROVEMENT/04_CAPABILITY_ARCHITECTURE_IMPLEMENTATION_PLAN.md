# R&D Innovation — Capability Architecture & Implementation Plan

**Status:** Proposed / planning baseline  
**Owner:** 2.3 PROJECT_IMPROVEMENT  
**Scope:** Reusable capabilities under `1. CAPABILITIES/`, their workstream routing, Knowledge boundaries, and regression/validation  
**Decision rule:** This document guides implementation actions. It does not itself activate a new runtime, authorize Knowledge promotion, or change existing capability behavior.

**Execution status (2026-09-28):** P0, Phase 1, and all five Phase 2 capability contracts are merged. Controlled contract-level regression records exist for all five capabilities. PR #31 and post-merge repository validation passed (run `36393004711`). Real-output validation and live workstream integration remain open across Phase 2; therefore contract implementation is complete, but Gate G2 / overall Phase 2 acceptance is not yet closed. `1. CAPABILITIES/` remains the first baseline; downstream contracts inherit it.

## 1. Purpose and intended use

This plan defines the target architecture, implementation sequence, deliverables, acceptance criteria, and change controls for improving R&D Innovation capabilities.

Use it as the controlling plan for subsequent implementation actions. Each action must identify:
- the plan phase/action ID it implements;
- the source-of-truth files affected;
- the observed problem or evidence motivating the change;
- expected behavior before/after;
- tests and regression cases;
- dependencies and rollback approach.

Do not implement the entire plan in one broad refactor. Execute one bounded action or cohesive action group at a time, validate it, and then proceed.

### 1.1 Goals

1. Make capabilities operationally useful to AI, not merely descriptive contracts.
2. Make capability selection predictable through clear triggers, non-triggers, routing, and handoffs.
3. Preserve separation of reusable capability instructions, workstream execution/data ownership, and authoritative Knowledge.
4. Improve evidence quality, technical reasoning, output consistency, and failure handling.
5. Use progressive disclosure so core instructions remain concise and detailed methods are loaded only when needed.
6. Introduce testable behavior and real-output regression without creating an unnecessary Skill Engine or evaluation platform.
7. Add a new capability only when a distinct reusable responsibility is demonstrated and cannot be cleanly owned by an existing capability.

### 1.2 Non-goals

Unless later evidence and explicit approval justify a change, this plan does not introduce:
- a generic Skill/Capability Engine, orchestrator, or autonomous agent runtime;
- a new database, vector store, knowledge graph, RAG layer, or second Knowledge store;
- autonomous promotion to Released Knowledge or automatic baseline changes;
- a second scheduler or business-rule copy inside the scheduler;
- mandatory Claude-specific `SKILL.md` packaging;
- a universal numeric score or ranking for all R&D ideas;
- wholesale rewriting of workstreams or historical research outputs unrelated to the capability change.

## 2. Source basis and design interpretation

This plan uses:
1. The current R&D Innovation repository contracts, especially the topic README, five capability READMEs, workstream READMEs, Knowledge lifecycle, and Project Improvement regression artifacts.
2. Anthropic's *The Complete Guide to Building Skills for Claude* as a design reference for use-case-first planning, progressive disclosure, composability, actionable instructions, error handling, examples, triggering tests, functional tests, performance comparison, and iteration from observed failures.

The Anthropic guide describes Claude Skills and their packaging/runtime conventions. R&D CAPABILITIES are repository-level reusable contracts intended to guide multiple AI workflows. Therefore, adopt relevant design principles, not Claude-specific implementation requirements or assumptions about automatic skill loading.

### 2.1 Design principles

- **Use-case first:** define concrete tasks and expected results before writing instructions.
- **Trigger precision:** state when to invoke and when not to invoke a capability; avoid over-triggering and under-triggering.
- **Progressive disclosure:** keep `README.md` as the concise capability entry contract; put substantial methods, decision tables, examples, and templates in linked references only when they provide reusable value.
- **Composability:** capabilities must accept/produce explicit handoff artifacts and must not assume they are the only capability in use.
- **Tool honesty:** describe tools and access as available only when the current execution environment actually provides them. A capability must not imply it can run a physical test, browse a source, or write GitHub files without access/authorization.
- **Evidence discipline:** source existence, advertised product function, mechanism, performance, commercial availability, and target-application suitability are distinct claims.
- **Bounded reasoning:** define minimum sufficient research, stop conditions, and escalation routes.
- **Human agency:** AI may analyze and recommend routes; designated human approval controls material decisions and authoritative promotion.
- **Smallest effective change:** add complexity only to solve an observed or clearly evidenced need.
- **Test before promotion:** mechanical validation and semantic review are separate; neither substitutes for the other.

## 3. Current baseline and architecture boundaries

### 3.1 Current layers

| Layer | Owns | Must not own |
|---|---|---|
| `1. CAPABILITIES/` | Reusable instructions, methods, decision rules, input/output contracts, validation and handoff behavior | Batch outputs, idea records, research reports, user-specific execution data |
| `2. WORKSTREAMS/` | Business context, task execution, workstream-specific prompts/routing, user inputs and execution outputs | Duplicated canonical capability methodology |
| `3. KNOWLEDGE/` | Candidate/test knowledge and human-verified Released Knowledge | Raw workstream execution logs or unapproved findings |
| `2.3 PROJECT_IMPROVEMENT/` | Architecture plans, implementation actions, observed failures, regression and improvement records | Normal product/technology research unrelated to improving the system |

The authoritative Knowledge release currently referenced by the topic is `3. KNOWLEDGE/RELEASED/Release_23Sep2026/`. Candidate/test material remains non-authoritative under `3. KNOWLEDGE/CANDIDATE_TEST/`.

### 3.2 Existing capabilities

| ID | Capability | Primary responsibility | Main boundary to preserve |
|---|---|---|---|
| CAP-01 | CLAW_DISCOVERY | Explore solution/technology space and produce traceable candidates | Does not make final idea disposition or promote Knowledge |
| CAP-02 | VERIFICATION | Validate specific claims and evidence relationships | Does not replace broad investigation or make product decisions |
| CAP-03 | DEEP_RESEARCH | Investigate broad, conflicting, high-risk, or decision-critical questions | Does not claim physical validation or legal/IP conclusions |
| CAP-04 | EVALUATION | Compare an identified target against decision-relevant criteria | Does not force a score or own the workstream's final decision |
| CAP-05 | KNOWLEDGE_PROMOTION | Govern eligibility and controlled promotion to Released Knowledge | Does not treat verified as automatically approved/released |

The exact current contracts remain in each capability's `README.md`. This plan does not silently supersede them; implementation actions must update affected contracts explicitly and consistently.

### 3.3 Known architecture risks to investigate

These are audit questions, not pre-judged defects:
- Trigger overlap between VERIFICATION and DEEP_RESEARCH.
- Whether CLAW_DISCOVERY has enough method guidance to distinguish a technology signal, technical enabler, product capability, and standalone idea.
- Whether EVALUATION selects criteria based on decision context rather than applying a universal checklist.
- Whether KNOWLEDGE_PROMOTION clearly separates evidence-verified, human-approved, and released states.
- Whether capabilities have enough explicit negative triggers and handoff conditions.
- Whether workstream prompts duplicate methods that should be referenced from capabilities.
- Whether references/templates would reduce README complexity or merely create file sprawl.
- Whether a separate EXPERIMENT_DESIGN capability is justified by recurring physical-validation tasks.

## 4. Target capability architecture

### 4.1 Target contract model

Every capability must have a concise entry contract with these fields:

1. **Identity and purpose** — the reusable job it performs.
2. **Use cases** — 2–3 concrete supported tasks and expected result.
3. **Trigger / non-trigger** — positive signals, exclusions, and ambiguity handling.
4. **Inputs and preconditions** — required, optional, and missing-input behavior.
5. **Procedure** — ordered, actionable steps; distinguish mandatory from conditional steps.
6. **Method selection** — criteria for choosing a method, source strategy, or analysis depth.
7. **Tool boundary** — allowed/available tools and fallback if unavailable.
8. **Evidence and uncertainty** — canonical state labels and what each state means for this task.
9. **Output contract** — required fields, format, traceability, and owner.
10. **Quality gates** — observable checks before returning output.
11. **Handoffs** — destination, trigger, and minimum handoff payload.
12. **Human gate** — decisions/actions requiring human approval.
13. **Failure and stop conditions** — explicit bounded outcomes; no invented completion.
14. **Persistence boundary** — where execution output belongs; no capability-owned run data.
15. **Examples and tests** — links to references/test cases, not a large example dump in the entry README.

Shared terms and schemas should be defined once in the appropriate R&D system contract and referenced. Do not create duplicate enums or slightly different versions in each capability.

### 4.2 Three-level instruction layout

Use only when content volume justifies it:

- **Level 1 — Capability index/routing:** concise catalog of capabilities, trigger summary, and links.
- **Level 2 — Capability README:** operational entry contract, core workflow, key gates, and references.
- **Level 3 — References/templates:** reusable deep methodology, decision matrices, examples, output templates, and test fixtures.

Do not create empty `references/` or `templates/` folders. Do not split content solely to match a prescribed folder pattern. A reference file is justified when it is reusable, substantial, independently maintainable, or needed only conditionally.

### 4.3 Composability and handoff contract

A capability handoff must include, as applicable:
- task/question and decision context;
- current finding/claim/idea identifier;
- evidence/source references;
- established facts vs inference/assumption/unknown/proposal;
- unresolved question or conflict;
- constraints and completed checks;
- requested next action and expected output;
- owning workstream and persistence destination.

A capability must not assume the next capability ran. It must state what has and has not been completed. Workstream routing remains the orchestration source of truth; capability order is conditional, not a mandatory linear pipeline.

## 5. Capability-specific target and implementation requirements

### 5.1 CAP-01 — CLAW_DISCOVERY

**Target outcome:** generate distinct, decision-relevant candidates from a scoped problem/opportunity without turning every technology signal into a product idea.

Required improvements:
- Define supported discovery modes: problem-first, technology/supplier-first, competitor/market signal, Knowledge-gap-first, and cross-industry transfer.
- Define mode selection and required input for each mode.
- Add a problem/opportunity framing step: user/product outcome, target product/system boundary, constraints, strategic scope where supplied, and evidence gap.
- Define Knowledge traversal: search relevant released records and prior workstream/batch candidates before generating duplicates.
- Separate candidate types: technology signal, technical enabler, product/system capability, standalone product idea, variant/baseline/duplicate as applicable to current workstream schema.
- Require a meaningful delta and observable/testable outcome before presenting a standalone product idea.
- Require a mechanism hypothesis to be labeled as proposed unless supported by evidence.
- Define candidate generation breadth without arbitrary quota; zero qualified candidates is valid.
- Define early precedent screening and when to route to VERIFICATION or DEEP_RESEARCH.
- Preserve workstream ownership of staging/batches and all generated records.

Expected output contract (adapt to the invoking Prompt schema; do not create a competing schema):
- scoped opportunity/problem;
- candidate and classification;
- proposed response/mechanism;
- intended user/product outcome and measurable signal;
- meaningful delta vs known solution;
- evidence/source references and evidence states;
- constraints, assumptions, unknowns;
- precedent/duplicate check;
- disposition or next route only where authorized by the workstream.

Tests:
- problem-first request;
- technology signal without product outcome;
- existing baseline solution;
- cross-industry transfer with unknown target fit;
- no qualified candidates;
- repeated candidate in prior batch;
- unrelated task that must not trigger discovery.

### 5.2 CAP-02 — VERIFICATION

**Target outcome:** determine exactly which claim is supported, by what evidence, and with what limitations.

Required improvements:
- Decompose compound statements into independently verifiable claims.
- Identify claim type: existence, advertised function, mechanism, performance, commercial availability, compliance, or target-application suitability.
- Define evidence needed for each claim type.
- Prefer primary/technical evidence while preserving the repository's evidence hierarchy.
- Assess source identity, authority, date, scope, directness, and whether the source actually supports the claim.
- Distinguish corroboration from repeated copies of the same source.
- Record contradictory evidence and scope limitations.
- Define outcomes such as supported/verified, partially supported, conflicting, unsupported, and unknown, mapping them to the canonical R&D evidence vocabulary without creating incompatible enums.
- Define when verification is sufficient and when to escalate to DEEP_RESEARCH or human/supplier confirmation.
- Explicitly state that absence of evidence is not evidence of absence and search snippets are not consequential evidence.

Expected output:
- claim register;
- evidence table with source-to-claim mapping;
- result/state per claim;
- limitation/conflict;
- confidence rationale without false precision;
- unresolved question and next route.

Tests:
- primary source supports only part of a claim;
- multiple secondary pages repeat one source;
- product existence used to infer hidden mechanism;
- advertised performance lacks test method;
- conflicting manufacturer documents;
- no accessible source;
- simple translation/formatting task that must not trigger verification.

### 5.3 CAP-03 — DEEP_RESEARCH

**Target outcome:** execute a bounded investigation that answers a decision-relevant question and makes residual uncertainty explicit.

Required improvements:
- Add a research brief: question, decision supported, scope, constraints, known facts, prior work, and unresolved gaps.
- Use a research plan with sub-questions, evidence required, source classes, and stop conditions.
- Select research pattern conditionally: technology landscape, patent/prior-art signal, supplier capability, competitor architecture, technical mechanism, feasibility boundary, or technology transfer.
- Define search coverage and source diversity appropriate to the question; do not impose arbitrary source counts.
- Build a claim/evidence map to avoid unsupported synthesis.
- Analyze mechanism/architecture only to the level supported by evidence.
- Compare alternatives using common dimensions where comparison is meaningful.
- Separate desk-research feasibility from experimentally demonstrated performance.
- Include contradiction analysis, unknowns, assumptions, and falsification/verification needs.
- Define minimum sufficient research and stop conditions.
- Escalate legal/IP interpretation and other specialist conclusions rather than assert them.

Expected output:
- research brief and plan;
- source/evidence map;
- findings grouped by sub-question;
- mechanism/architecture analysis and evidence boundary;
- comparison, if relevant;
- feasibility boundary, not an unsupported binary verdict;
- contradictions, assumptions, unknowns;
- next verification/experiment actions;
- concise decision-oriented synthesis.

Tests:
- broad question with no decision context;
- narrow factual claim better handled by VERIFICATION;
- conflicting technical sources;
- patent search with no result (must not claim novelty);
- product page with unknown internal mechanism;
- research scope expands without decision value;
- physical performance question that desk research cannot settle.

### 5.4 CAP-04 — EVALUATION

**Target outcome:** provide transparent decision support using criteria appropriate to the decision, with no forced or falsely objective ranking.

Required improvements:
- Identify the decision and decision owner before selecting criteria.
- Select a fit-for-purpose framework rather than applying every criterion to every idea.
- Separate gates (must-pass constraints) from comparative criteria.
- Define criterion-level evidence, applicability, and unknown handling.
- Distinguish technical feasibility, product value, differentiation/precedent, integration/manufacturing constraints, risk, and strategic fit where relevant.
- Define when qualitative assessment is sufficient and when a numeric score is justified; disclose weighting and avoid unsupported precision.
- Make trade-offs and sensitivity explicit.
- Route evidence gaps to VERIFICATION/DEEP_RESEARCH; route physical uncertainty to proposed EXPERIMENT_DESIGN only if approved/available.
- Keep final disposition with the owning workstream/human where required.
- Do not convert missing data into a negative score or a forced KEEP/DROP.

Expected output:
- decision question and owner;
- selected criteria and rationale;
- gate results;
- evidence/state per criterion;
- trade-offs and key risks;
- unknowns and decision sensitivity;
- decision-support conclusion and next route;
- explicit boundary on what the analysis does not establish.

Tests:
- criteria insufficient to decide;
- two ideas with different evidence maturity;
- no meaningful product delta;
- strong value but unresolved feasibility;
- user asks for a score without defined scale;
- decision is a simple factual lookup, not evaluation.

### 5.5 CAP-05 — KNOWLEDGE_PROMOTION

**Target outcome:** safely move eligible reusable knowledge from workstream-owned candidate artifacts into the authoritative Released Knowledge Sheet.

Required improvements:
- Define candidate eligibility and required provenance.
- Separate evidence-checked, human-approved, and released states.
- Define atomic record and relationship requirements according to existing Knowledge Sheet schemas.
- Check duplicates, near-duplicates, contradictions, stale records, and supersession.
- Validate source references, IDs, schema, required fields, and relationship integrity.
- Define hold/reject reasons and return route to owning workstream.
- Require explicit human approval before write/promotion.
- Define change impact: whether an update supersedes, corrects, extends, or adds a record.
- Preserve an audit/change record without duplicating the full Knowledge database.
- Define post-write verification and rollback/correction path.

Expected output:
- promotion decision: eligible / hold / reject;
- record-level change proposal;
- evidence and provenance;
- duplicate/contradiction check;
- approval state;
- exact target and change summary;
- post-write validation result.

Tests:
- candidate lacks primary evidence;
- verified but not human-approved;
- duplicate existing record;
- conflict with Released Knowledge;
- schema/ID failure;
- source link unavailable;
- valid correction/supersession;
- request to promote staging automatically.

### 5.6 CAP-06 — EXPERIMENT_DESIGN (proposed, not yet approved)

**Decision status:** candidate capability only. Do not create or activate until Phase 2 confirms recurring demand, distinct ownership, and non-overlap with existing contracts.

**Problem addressed:** desk research can identify physical-performance uncertainty that cannot be resolved from available information. A reusable method may be needed to turn that uncertainty into a controlled test plan.

Potential scope:
- translate uncertainty into a falsifiable hypothesis;
- define test objective, scope, sample, controls, variables, boundary conditions, and measurement;
- define test method and equipment needs only to the level supported by available domain knowledge;
- define acceptance criteria before testing;
- identify safety, compliance, and resource review needs;
- define data capture, analysis approach, limitations, and decision rule;
- return a test plan to the owning workstream.

Explicit exclusions:
- does not execute physical tests;
- does not fabricate test data;
- does not certify compliance;
- does not own laboratory records;
- does not automatically decide product release or Knowledge promotion.

Create this capability only if evidence shows that experiment planning is recurring across at least two workstreams or repeated material cases and cannot be handled cleanly as a conditional method in DEEP_RESEARCH/EVALUATION. Otherwise retain it as a reference method, not a separate capability.

## 6. Routing and selection model

### 6.1 Routing principles

- Start from the user's requested outcome and owning workstream, not from folder order.
- Invoke the smallest sufficient set of capabilities.
- Use VERIFICATION for bounded claim checks; use DEEP_RESEARCH when the question requires multi-part investigation, synthesis, or contradiction resolution.
- Discovery generates candidates; Evaluation supports decisions; Knowledge Promotion governs authoritative writes.
- Physical test design is a separate route only after uncertainty is shown to require empirical testing.
- Do not invoke every capability by default.
- A capability may return a bounded result and stop; no forced pipeline completion.

### 6.2 Initial routing matrix

| User/workstream need | Primary route | Conditional next route | Do not invoke by default |
|---|---|---|---|
| Generate candidate solutions from a scoped problem | CLAW_DISCOVERY | VERIFICATION / EVALUATION | KNOWLEDGE_PROMOTION |
| Check one material claim/source | VERIFICATION | DEEP_RESEARCH if unresolved/material | CLAW_DISCOVERY |
| Investigate a broad technical question | DEEP_RESEARCH | VERIFICATION / EVALUATION | CLAW_DISCOVERY |
| Decide whether an existing idea merits further work | EVALUATION | VERIFICATION / DEEP_RESEARCH / experiment design | KNOWLEDGE_PROMOTION |
| Prepare reusable finding for Released Knowledge | KNOWLEDGE_PROMOTION | VERIFICATION if evidence gap | CLAW_DISCOVERY |
| Plan physical validation | Proposed EXPERIMENT_DESIGN | EVALUATION after results | KNOWLEDGE_PROMOTION before review |
| Improve the capability/workflow system | PROJECT_IMPROVEMENT workstream | relevant capability as needed | treating improvement plan as product research |

This matrix is a design baseline. Phase 1 must reconcile it with actual Prompt.csv IDs and workstream instructions before any routing changes.

### 6.3 Handoff rules

Each route must specify:
- entry condition;
- minimum input payload;
- what prior work is trusted and what must be rechecked;
- expected return artifact;
- owner and persistence path;
- completion/stop condition.

Do not pass an entire workstream folder or all Knowledge data by default. Retrieve only relevant context, consistent with progressive disclosure.

## 7. Implementation phases and action register

Execute in the order below. Each action is a bounded pull request or cohesive change set. The action plan is authoritative for sequencing; implementation PRs must reference action IDs.

### Phase 0 — Baseline and dependency audit

**Objective:** establish the actual repository state before changing capability contracts.

| Action | Work | Deliverable | Acceptance |
|---|---|---|---|
| P0-A01 | Read current topic README, all capability READMEs, all three workstream READMEs, Prompt.csv files, Knowledge lifecycle, regression files, and validator rules | Baseline inventory | Every relevant source path and owner recorded |
| P0-A02 | Build capability-to-workstream-to-prompt map | Routing/dependency matrix | Every active prompt has an identified owner and capability route, or an explicit gap |
| P0-A03 | Compare duplicated instructions and conflicting enums/output schemas | Duplication/conflict register | Findings cite exact files/sections; no speculative cleanup |
| P0-A04 | Record baseline test cases and representative real outputs | Baseline package | Existing regression cases retained; missing coverage marked NOT OBSERVED |
| P0-A05 | Audit validator coverage and known CI state | Validation map | Structural checks, semantic human checks, and unavailable checks clearly separated |

**Gate G0:** no capability rewrite begins until baseline paths, ownership, and active prompt dependencies are known. Any unrelated CI failure is recorded separately; it must not be silently treated as PASS or used to expand scope.

### Phase 1 — Architecture and contract standard

**Objective:** settle boundaries and a reusable contract format before expanding individual capability content.

| Action | Work | Deliverable | Acceptance |
|---|---|---|---|
| P1-A01 | Confirm definitions of Capability, Workstream, Knowledge, and Project Improvement | Boundary contract | No output/data ownership ambiguity |
| P1-A02 | Define shared evidence vocabulary and mapping from existing states | Evidence contract | No incompatible per-capability enums |
| P1-A03 | Define capability contract template | Contract standard | All 15 contract fields in §4.1 covered or explicitly N/A |
| P1-A04 | Define trigger/non-trigger and routing conventions | Routing standard | Positive, negative, ambiguity, and handoff rules documented |
| P1-A05 | Define output/handoff minimum payload | Handoff standard | Invoking workstream retains output ownership |
| P1-A06 | Decide reference/template split per capability | Target file map | Each proposed file has a clear purpose; no empty or duplicate files |
| P1-A07 | Decide EXPERIMENT_DESIGN disposition | Add / embed / defer decision record | Decision cites observed use cases and overlap analysis |

**Gate G1:** human review approves the contract standard, routing model, and CAP-06 disposition before capability implementation.

### Phase 2 — Core capability implementation

**Execution status (2026-09-28):** All five Phase 2 capability contracts are merged and have controlled contract-level regression records. RND-REG-033–038 and the KNOWLEDGE_PROMOTION report are recorded. Real-output and live workstream integration tests remain NOT OBSERVED / open; do not claim operational effectiveness or close Gate G2 until follow-up evidence is recorded.

**Objective:** upgrade one capability at a time using the approved standard.

Recommended order:
1. VERIFICATION — stabilizes evidence interpretation used by others.
2. DEEP_RESEARCH — defines bounded investigation and research methods.
3. EVALUATION — consumes evidence and supports decisions.
4. CLAW_DISCOVERY — uses established evidence/routing rules to generate better candidates.
5. KNOWLEDGE_PROMOTION — governs the final authoritative boundary.

This order is a dependency recommendation, not a claim that discovery is less important.

For each capability, execute the same action sequence:

| Action | Work | Acceptance |
|---|---|---|
| Cx-A01 | Define 2–3 concrete use cases and expected results | Each use case has trigger, input, steps, output, and exclusions |
| Cx-A02 | Write trigger and non-trigger rules | Obvious, paraphrased, and unrelated requests can be distinguished |
| Cx-A03 | Define required/optional inputs and missing-input behavior | No hidden assumptions; ask only for decision-changing missing inputs |
| Cx-A04 | Write actionable core procedure | Ordered steps and conditional branches are executable by an AI |
| Cx-A05 | Add reusable method/reference only where needed | README remains navigable; references are linked and independently useful |
| Cx-A06 | Define output and handoff contract | Output is traceable and workstream-owned |
| Cx-A07 | Define quality gates, failure states, stop and escalation | No fabricated completion; unresolved state remains explicit |
| Cx-A08 | Add examples and capability-specific tests | Examples cover normal, boundary, and failure cases |
| Cx-A09 | Update invoking workstream and prompt references | No stale path, duplicate method, or contradictory routing |
| Cx-A10 | Run structural, reference, and semantic review | All applicable tests recorded; no unverified PASS |

**Gate G2:** a capability is not complete because its README exists. It must pass trigger, functional, boundary, and integration tests, or have clearly marked NOT OBSERVED/INCONCLUSIVE cases with an agreed follow-up.

### Phase 3 — Capability extension decision and implementation

**Execution status (2026-09-28):** P3-A01 through P3-A03 are complete and merged. P3-A04 human decision: **DEFER** (recorded in `PHASE3_P3-A04_DECISION_DEFER.md`). P3-A05 and P3-A06 are not activated; no CAP-06 folder, conditional method, or routing change is authorized. Phase 3 is closed as deferred, with a defined evidence trigger for reopening.

**Objective:** decide whether CAP-06 is justified.

| Action | Work | Acceptance |
|---|---|---|
| P3-A01 | Collect real cases where desk research cannot resolve physical uncertainty | Case register with source/output references |
| P3-A02 | Identify whether current DEEP_RESEARCH/EVALUATION can handle test planning without boundary confusion | Overlap analysis |
| P3-A03 | Check reuse across workstreams and expected frequency | Reuse evidence, not hypothetical appeal |
| P3-A04 | Decide add standalone capability, add conditional reference, or defer | Human-approved decision | **Completed: DEFER.** See decision record.
| P3-A05 | If approved, implement CAP-06 with same contract/test standard | No test execution or lab-data ownership implied |
| P3-A06 | Integrate routing and workstream handoffs | No duplicate experiment instructions |

**Gate G3:** no new capability folder is created before P3-A04 approval.

### Phase 4 — Testing and evaluation

**Execution status (2026-09-28):** Phase 4 regression framework alignment is merged (PR #36, `49cb0fe`). Validator coverage hardening is merged (PR #37, `534c7cd`): CI run `36396822011` passed before merge; post-merge CI was not returned by the available workflow query. The validator now requires all 38 regression IDs in the catalog and run template, plus the performance-comparison section. This is mechanical coverage, not semantic or real-output capability acceptance. Next: execute and record real-output runs by capability using the aligned template; do not infer PASS from controlled fixtures or retrospective artifact review. G2 remains open.

**Objective:** prove that the capability instructions improve behavior, not merely documentation completeness.

Three separate test layers:

1. **Trigger tests:** correct use, paraphrases, unrelated requests, and overlap boundaries.
2. **Functional tests:** required steps, evidence handling, output contract, tool fallback, error/stop behavior.
3. **Performance comparison:** compare against the documented baseline on the same or materially comparable task.

Minimum evaluation record per test:
- case ID and capability version/commit;
- input and available context;
- expected behavior;
- observed output reference;
- mechanical result;
- semantic reviewer result;
- PASS / FAIL / NOT OBSERVED / INCONCLUSIVE;
- defect and next action.

Use the existing `2.3 PROJECT_IMPROVEMENT/Regression/` artifacts. Extend them only for recurring/material failure modes or critical invariants. Do not create a parallel test database.

### Phase 5 — Workstream integration and hardening

**Objective:** ensure the capability architecture works in real R&D workflows.

| Action | Work | Acceptance |
|---|---|---|
| P5-A01 | Integrate Personal Research routes and scheduled Claw contract | Scheduler remains trigger-only; outputs remain workstream-owned |
| P5-A02 | Integrate Idea Review routes | Idea-specific data stays in Idea Review; reusable methods are referenced |
| P5-A03 | Integrate Project Improvement routes | System-improvement artifacts remain in Project Improvement |
| P5-A04 | Audit Knowledge Candidate/Released boundary | No staging or unapproved candidate is treated as authoritative |
| P5-A05 | Search for stale links, duplicated methods, old names, and conflicting enums | No active stale reference |
| P5-A06 | Run full repository validator and relevant real-output regression | Mechanical and semantic results separately reported |
| P5-A07 | Update topic README capability map and implementation history | Documentation reflects only merged/verified state |

**Gate G5:** integration is accepted only when source files, routing, prompts, Knowledge boundary, and validation artifacts agree.

### Phase 6 — Baseline promotion and maintenance

**Objective:** promote only tested changes and keep the architecture maintainable.

- Record human decision: promote, revise, hold, or reject.
- Update the relevant capability/workstream contract and change history together.
- Keep experimental instructions separate until accepted.
- Retain regression cases that protect material recurring failures.
- Remove obsolete instructions only after all references are migrated and validated.
- Re-run affected tests after every material change.
- Review capability usefulness from observed execution, not file count or word count.

**Gate G6:** no baseline promotion without human verification and traceable test evidence.

## 8. Test and acceptance framework

### 8.1 Universal test dimensions

| Dimension | PASS means |
|---|---|
| Trigger precision | Invokes for intended use cases and avoids unrelated tasks |
| Scope control | Does not take ownership of workstream data or decisions outside its contract |
| Input discipline | Detects missing decision-critical input and handles optional context correctly |
| Method execution | Performs the required steps and selects conditional methods appropriately |
| Evidence integrity | Does not upgrade inference/assumption/unknown to fact |
| Output contract | Returns required fields, traceability, and explicit uncertainty |
| Handoff | Routes only when justified and includes minimum handoff context |
| Failure handling | Stops/escalates explicitly rather than fabricating success |
| Human gate | Does not perform approval-dependent action without approval |
| Maintainability | No duplicated source of truth, stale reference, or unnecessary abstraction |

### 8.2 Result vocabulary

- **PASS:** observed behavior satisfies the test.
- **FAIL:** observed behavior violates the test.
- **NOT OBSERVED:** the execution did not exercise the behavior.
- **INCONCLUSIVE:** evidence is insufficient to determine the result.

Do not convert missing data, unrun tests, empty API results, or absent observations into PASS.

### 8.3 Performance measures

Use measures only where observable and decision-relevant. Potential measures:
- unsupported consequential claim rate;
- claim-to-source traceability;
- duplicate/baseline leakage;
- candidate meaningful-delta rate;
- reviewer correction rate;
- unnecessary capability invocation rate;
- unresolved questions correctly preserved;
- output-contract completion;
- rework/back-and-forth required;
- time or token use when reliably measurable.

Do not optimize for a single metric such as number of KEEP ideas, number of sources, or output length. Establish baseline and comparable task conditions before claiming improvement.

## 9. Repository implementation and change-control rules

Every implementation action must:

1. Read current `main` and relevant files immediately before editing.
2. Identify the plan action ID and exact affected paths.
3. Make the smallest cohesive change.
4. Update cross-references, capability map, workstream routing, prompt contracts, and validator rules where affected.
5. Search for old paths/names and duplicated contracts.
6. Run relevant local/repository validation available in the environment.
7. Open a PR with scope, rationale, changed files, tests, known limitations, and action IDs.
8. Check the PR head's GitHub **check-runs** and workflow runs; do not rely only on legacy combined commit status.
9. Treat any required check failure as a hard gate: do not merge or report PASS.
10. After merge, verify the merge commit and current `main` tree, then re-check required checks.
11. Report separate outcomes for structure, semantic review, CI, merge, and post-merge verification.

If checks are absent or API results are empty, report **NOT OBSERVED / unavailable**, not PASS. A merge is not evidence that checks passed. If a pre-existing unrelated failure is explicitly deferred, record it with owner, scope, and follow-up; do not silently waive a relevant gate.

### 9.1 Rollback

For a change that degrades behavior:
- identify the last accepted capability contract/version;
- revert or amend the smallest affected change;
- preserve the failed test as a regression case if material;
- do not delete the observed failure record;
- re-run the affected tests and repository checks.

## 10. Risks and mitigations

| Risk | Consequence | Mitigation |
|---|---|---|
| Over-documentation | Higher context cost, slower maintenance | Progressive disclosure; split only reusable/substantial methods |
| Capability overlap | Wrong routing and duplicate work | Explicit triggers, non-triggers, handoffs, boundary tests |
| Overly strict gates | Valid candidates suppressed | Test false negatives; allow WATCH/UNKNOWN/INCONCLUSIVE and human review |
| Overly loose gates | Unsupported claims and weak ideas | Evidence mapping and critical invariant regression |
| Workstream/capability duplication | Drift between instructions | Single-source ownership and reference links |
| Universal scoring | False precision and incomparable ideas | Decision-specific criteria; scoring only with defined scale/weights |
| Premature CAP-06 | More maintenance without reuse | Evidence-based go/no-go gate |
| Claude-specific coupling | Poor portability across AI surfaces | Adopt design principles, not runtime assumptions |
| Mechanical validator overreach | False failures or false confidence | Scope validator rules precisely; semantic checks remain human-reviewed |
| Merge despite failed checks | Broken baseline | Required-check hard gate and post-merge verification |

## 11. Decision log

Decisions that must be explicitly recorded during implementation:

| Decision ID | Question | Default pending evidence |
|---|---|---|
| DEC-01 | Is a shared capability contract standard needed? | Yes, concise and referenced |
| DEC-02 | Should capability methods be split into references? | Only when progressive disclosure materially helps |
| DEC-03 | Should EXPERIMENT_DESIGN be a standalone capability? | Defer until Phase 3 evidence |
| DEC-04 | Should capabilities have numeric quality scores? | No universal score; use task-specific metrics only |
| DEC-05 | Should R&D use Claude `SKILL.md` format? | No; preserve repository-native contracts unless a portability use case is approved |
| DEC-06 | Should capability execution be automated by a generic engine? | No, absent demonstrated runtime-level need |
| DEC-07 | Who approves Released Knowledge changes? | Human approval remains mandatory |

## 12. Definition of done

The architecture expansion is complete only when all applicable conditions are met:

### Architecture
- [ ] Capability/workstream/Knowledge boundaries are explicit and consistent.
- [ ] Every capability has concrete use cases, triggers, non-triggers, inputs, procedure, output, gates, handoffs, and failure behavior.
- [ ] Routing is unambiguous for active workstream prompts.
- [ ] CAP-06 has an evidence-based add/embed/defer decision.

### Implementation
- [ ] Core capabilities are upgraded in bounded changes.
- [ ] Reusable methods are separated only where justified.
- [ ] Workstream prompts reference capabilities rather than duplicate their reusable methods.
- [ ] Output ownership and Knowledge promotion boundaries remain intact.

### Validation
- [ ] Trigger, functional, boundary, and integration tests are recorded.
- [ ] Real-output regression is performed for relevant cases.
- [ ] PASS / FAIL / NOT OBSERVED / INCONCLUSIVE are used honestly.
- [ ] No relevant required CI check is failing or unverified at acceptance.
- [ ] Post-merge main state is verified.

### Governance
- [ ] Human decisions and baseline promotions are recorded.
- [ ] No generic engine, second source of truth, or unapproved autonomous promotion is introduced.
- [ ] Topic README and Project Improvement history reflect the actual merged state.

## 13. Execution rule

P0-A01 through P0-A05 are complete as the baseline audit. Phase 1 (P1-A01 through P1-A07) establishes the shared architecture and contract standard in `1. CAPABILITIES/README.md`. The next implementation action after Phase 1 approval is Phase 2: upgrade one existing capability at a time, beginning with VERIFICATION, then DEEP_RESEARCH, EVALUATION, CLAW_DISCOVERY, and KNOWLEDGE_PROMOTION. Do not rewrite all five in one broad change. Later contract folders must follow the `1. CAPABILITIES/` baseline.

The plan is a guide for controlled implementation, not permission to perform every listed change. If evidence shows an action is unnecessary, record **DEFER / NOT NEEDED** with rationale rather than implementing it for completeness.
