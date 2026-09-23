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

Every Career capability follows:

`Trigger → Input/Context → Process → Tools → Output → Validation → Escalation`

### Trigger

- Scheduled execution on the master Career schedule.
- Manual execution when explicitly requested by the user.

### Input / Context

- `TOPICS/2. CAREER/CAREER_PROFILE.md`
- Relevant workstream README.
- `TOPICS/2. CAREER/IMPLEMENTATION_PLAN.md`
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
10. On the weekly synthesis run, create a compact weekly run record under `TOPICS/2. CAREER/4. RUNS/YYYY-W##.md`.

### Tools

Use the tools available to the execution environment. The architecture does not require a dedicated skill runtime, database, API key, or AI backend.

Typical tool classes:

- Web/search for current opportunities and company signals.
- GitHub for current Second-Brain rules/context.
- External tracker for high-volume transient opportunity records.
- GitHub for current Second-Brain rules/context and weekly run records.
- ChatGPT scheduled task as the recurring trigger.

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
- the weekly run record, when required, reflects only the outputs actually produced during the run;
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

Path: `TOPICS/2. CAREER/4. RUNS/YYYY-W##.md`

The record should capture:

- week and execution dates;
- which search cycles actually ran;
- concise findings from Job Search, Company Radar, and Remote / AI;
- meaningful changes and notable opportunities;
- quality observations such as duplicates, false rejects/accepts, evidence issues, or repeated failure patterns;
- proposed reusable rule/process improvements;
- explicit unresolved questions or human-review items;
- validation status.

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
