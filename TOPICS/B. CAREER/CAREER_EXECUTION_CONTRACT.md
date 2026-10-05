# Career Execution Contract

## Purpose

Define the reusable execution contract for the Career pilot. The contract separates durable career knowledge, workstream logic, scheduling, evaluation, weekly observability, and human-approved changes.

## Capability Model

Career exposes three independent capabilities:

1. `JOB_SEARCH`
2. `COMPANY_RADAR`
3. `REMOTE_AI`

The master scheduler is a trigger/orchestration layer. It is not a fourth matching model.

## Common Execution Contract

### Global Capability alignment

The reusable Capability contract is defined in `SYSTEM CORE/WORKFLOW.md`. This file contains Career-specific deltas only.

Non-mutating run:
`Trigger → Context → Execute → Validate → Output`

Material mutation:
`Dry-run → Review Gate → Mutate → Post-update Validate → Verify → Promote / Commit`

The master scheduler remains trigger/orchestration only; it does not replace the three capability contracts.

### Master Scheduler Boundary

The external scheduler owns only:
- invocation of the Career capability contract;
- the documented recurring trigger;
- no role, geography, salary, exclusion, search-category, matching, verification, output-schema, or weekly-synthesis business rules.

All business logic remains in this contract and the three workstream contracts. If scheduler behavior needs to change, update the repository contract first, then synchronize the external trigger.

The scheduler must not introduce a second copy of any Career rule. Its prompt should point to this contract and instruct the executor to follow the current repository baseline.

Every Career capability follows:

`Trigger → Input/Context → Process → Tools → Output → Validation → Escalation`

### Trigger

- Scheduled execution through the external master Career trigger.
- Manual execution when explicitly requested by the user.

### Input / Context

- `TOPICS/B. CAREER/CAREER_PROFILE.md`
- Relevant workstream README.
- `TOPICS/B. CAREER/IMPLEMENTATION_PLAN.md`
- Current external market evidence.
- Previous cycle output when available for freshness/deduplication.
- Current user instruction overrides older durable context.

### Process

1. Read current Career context.
2. Route to exactly the relevant workstream contract.
3. Discover current external evidence.
4. Apply workstream-specific matching/radar logic.
5. Verify material claims.
6. Deduplicate against the available prior cycle state.
7. Produce the declared output contract.
8. Run the validation checklist.
9. Escalate material uncertainty instead of inventing facts.
10. On the weekly synthesis run, create/update the single compact weekly run record under `TOPICS/B. CAREER/2. REPORTS/YYYY-W##.md`. Weekly persistence is mandatory even if one or more search capabilities fail or are unavailable: continue the synthesis with the available evidence and mark affected streams `NOT_RUN` (or the applicable explicit fallback state) rather than aborting the weekly report.

### Tools

Use the tools available to the execution environment. The architecture does not require a dedicated skill runtime, database, API key, or AI backend.

Typical tool classes:

- Web/search for current opportunities and company signals.
- GitHub for current Second-Brain rules/context and weekly run records.
- External tracker for high-volume transient opportunity records.
- External scheduled task as the recurring trigger only; it does not own Career business logic.

### Search Tool Routing

Search tools are execution resources, not independent evidence authorities. Use only tools actually available in the current runtime; installation in the ChatGPT UI does not prove scheduled-task availability. Record actual tool use and distinguish `USED`, `NOT_USED`, `UNAVAILABLE`, and `FAILED`. Never claim a tool was used unless the call succeeded.

Default routing:
- **Parallel Search** — broad discovery across current jobs, company signals, and opportunity platforms.
- **Exa** — semantic and adjacent-category discovery where keyword search may miss relevant opportunities; prioritize Company Radar and Remote / AI.
- **ChatGPT Native Search** — independent discovery, fallback when connectors are unavailable, and targeted cross-checks.
- **Tavily** — targeted follow-up for a specific evidence gap or source conflict; not a mandatory second search for every result.
- **Firecrawl** — selective extraction of a known relevant page after discovery; not broad default crawling.

Routing rules:
1. Start with the smallest suitable set of available discovery tools; do not run all tools for every query.
2. Deduplicate candidates across tools before deeper verification.
3. Verify material claims against the employer/platform/official source or another credible primary source where possible. Search snippets are leads, not sufficient evidence for consequential claims.
4. Invoke Tavily only when a material field remains unresolved or sources conflict. Invoke Firecrawl only when page extraction materially helps.
5. Stop searching when evidence is sufficient for the declared output; preserve unresolved fields as unknown.
6. If a connector is unavailable in a scheduled run, continue with available native search where feasible and record the limitation. Do not silently lower verification standards.
7. Keep search-tool metadata in run/report metadata, not in the fixed opportunity table schemas.

### Output

Outputs are decision-oriented and remain outside Second-Brain when they are high-volume/transient.

Durable changes belong in GitHub only when they change:

- profile baseline;
- reusable decision rules;
- workstream contracts;
- scheduler/business workflow;
- implementation architecture.

### Validation

Before reporting a successful run, verify:

- current evidence is actually current;
- explicit exclusions are applied;
- mandatory vs preferred requirements are separated;
- unknowns are labelled;
- no qualification or salary is invented;
- output matches the workstream schema;
- duplicate/stale opportunities are handled where prior state exists;
- the weekly review, when required, contains exactly three capability-specific tables with the exact declared schemas and only outputs actually produced during the run;
- material claims have supporting evidence.

### Escalation

Escalate instead of guessing when:

- salary or location materially changes the decision but cannot be verified;
- language requirements are ambiguous;
- a company signal cannot establish whether a vacancy exists;
- the role depends on a capability not supported by the canonical career profile;
- external source conflict changes the decision;
- a durable rule appears to require changing the baseline.

## Production Prompt / Capability Contract

Career capabilities use a modular execution pattern rather than one monolithic prompt.

Each capability should keep five layers explicit:

1. **Operational rules** — concrete task rules, not generic personas.
2. **Input/context contract** — canonical profile, current evidence, and prior-cycle state where applicable.
3. **Output contract** — fixed fields/enums where structured output is required.
4. **Fallback / escalation states** — explicit behavior when evidence is missing, conflicting, or insufficient.
5. **Validation** — a compact pre-output compliance check before reporting results or proposing durable changes.

### Production Prompt Invariants

- Load only the relevant capability contract and context needed for the task.
- Re-state critical invariants immediately before high-impact actions when a multi-turn workflow could cause context drift.
- Prefer positive output invariants and explicit allowed values over long lists of negative prohibitions.
- Use explicit enums/status values for structured outputs where practical.
- Never infer a missing fact merely to satisfy the output schema; use the declared fallback/unknown state.
- Do not expose hidden chain-of-thought. Request concise rationale/evidence fields when reasoning needs to be auditable.
- Self-validation is a gate, not a substitute for deterministic repository validation or human approval.
- Prompt length is not an optimization target by itself; split instructions when separation improves routing and execution reliability.
- Do not treat claims such as a universal four-constraint limit or mandatory XML formatting as architecture rules. Use them only when a concrete capability benefits from them.

### Standard Capability Flow

`Load Contract → Load Relevant Context → Execute → Validate → Output / Escalate`

A capability must fail explicitly when its required evidence or input is unavailable rather than silently filling gaps with inference.

## Weekly Run Record

Path: `TOPICS/B. CAREER/2. REPORTS/YYYY-W##.md`

Every Monday, create or update **exactly one weekly report file** at `TOPICS/B. CAREER/2. REPORTS/YYYY-W##.md`. That single report must contain exactly three result tables, in this order: Job Search, Company Radar, Remote / AI. Each table must use the exact column schema declared by its capability README. Include only results actually produced; use an explicit `NO_MATCH`, `NO_SIGNAL`, or `NOT_RUN` row/status when applicable. Keep the three tables separate within the same report; do not create one report per capability or merge the streams into one table.

Before the tables, record week/date range, actual execution coverage, synthesis status, and validation status. After the tables, include concise cross-stream quality observations, proposed improvements, and user-review items.

Do not use the weekly record to silently change `CAREER_PROFILE.md`, workstream contracts, or other baseline files.

## Human Approval Gate

AI may:

- discover;
- compare;
- classify;
- summarize;
- detect repeated failure patterns;
- propose changes.

AI must not silently promote a proposed baseline change into authoritative Career memory.

`AI detects/analyzes/proposes → Human reviews → GitHub baseline changes only after approval`

## Evaluation Model

The Career pilot is evaluated at capability level rather than by infrastructure.

### JOB_SEARCH

Check:

- relevance of returned roles;
- false rejects;
- false accepts;
- exclusion compliance;
- duplicate rate;
- evidence quality;
- usefulness of recommended actions.

### COMPANY_RADAR

Check:

- signal quality;
- evidence strength;
- distinction between signal and confirmed vacancy;
- false positive rate;
- geography relevance;
- usefulness for downstream job search.

### REMOTE_AI

Check:

- match quality against the separate remote/AI model;
- side-work schedule compatibility;
- compensation realism;
- deliverable fit;
- false rejects/accepts;
- evidence quality.

### Feedback Loop

Repeated failure patterns are candidates for rule improvement.

One-off search misses do not automatically create new durable rules.

The weekly run record is the primary lightweight history for reviewing these patterns across runs.

## Baseline Change Lifecycle

`Observe → Identify Gap → Propose Change → Human Verify → Promote`

Git history remains the historical record. The current files remain the source of truth.

## Complete Capability Contract Fields

Purpose: execute the Career workstreams as reusable operational capabilities.

Trigger: scheduled run or explicit manual request.

Input / Context: CAREER_PROFILE.md, workstream README, implementation plan, current market evidence, and prior cycle output where applicable.

Preconditions: current Career context is loaded and the relevant workstream is selected.

Process: load context → route → collect evidence → execute workstream logic → validate → output or escalate.

Tools / AI: available search, web, GitHub, tracker, and scheduled-task tools; no dedicated runtime is required.

Output: workstream-specific structured result or weekly run record when required.

Validation: current evidence, exclusions, unknowns, schema, duplicates, and material claims are checked before reporting success.

Evidence State: distinguish verified information, inference, assumption, and unknown; do not invent missing facts.

Escalation: route material uncertainty or baseline-change needs to the appropriate human review path.

Human Verification Gate: required before authoritative Career baseline changes.

Promotion / Persistence: transient opportunity outputs remain in the operational tracker; durable rules and baseline changes enter GitHub only after approval.

Failure Handling: preserve unknowns, report missing evidence, and do not fabricate fields to satisfy output schemas.


## Scheduler Persistence / Verification

On Monday, the weekly run record is a required durable output. The sequence is `Execute search/synthesis → Write GitHub record → Re-read exact path → Validate → Verify final repository state → Report`. A successful search or synthesis is not evidence that the weekly record exists.
