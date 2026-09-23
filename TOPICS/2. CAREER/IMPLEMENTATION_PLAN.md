# Career Orchestrator Implementation Plan

## Business Goal

Build a recurring Career Opportunity System that discovers, evaluates, tracks, and learns from three parallel opportunity streams:

1. `JOB_SEARCH` — local/full-time roles.
2. `COMPANY_RADAR` — companies entering, expanding, or hiring in the target geography.
3. `REMOTE_AI` — remote/full-time and remote contract, part-time, freelance, or AI-enabled opportunities.

Second-Brain stores durable profile, rules, decisions, exclusions, workflow context, and lightweight weekly run records. High-volume opportunity records remain external until scale demonstrates that a searchable database is required.

## Target State

```text
                         CAREER PROFILE
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
         JOB SEARCH      COMPANY RADAR       REMOTE / AI
              │                │                │
              └────────────────┼────────────────┘
                               ▼
                     DISCOVERY + EVIDENCE
                               ▼
                      MATCHING + DECISION
                               ▼
                       EXTERNAL TRACKING
                               ▼
                         USER DECISION
                               ▼
                       FEEDBACK / LEARNING
                               └──────► PROFILE / RULES
```

The three workstreams remain logically independent. Scheduling is an execution layer only.

## Capability / Skill Pilot Layer

Career is the first pilot for the Second-Brain Capability/Skill execution pattern.

Each capability is defined by a separate execution contract:
- `JOB_SEARCH/PROMPT.md`
- `COMPANY_RADAR/PROMPT.md`
- `REMOTE_AI/PROMPT.md`

The shared execution and evaluation rules are defined in `CAREER_EXECUTION_CONTRACT.md`.

The master scheduler triggers capabilities; it does not contain their business logic.

### Production Prompt Reliability Layer

The Career pilot also validates a production-oriented prompt pattern for future Second-Brain Skills:

- Keep capability instructions modular; the scheduler remains orchestration only.
- Use concrete operational rules instead of generic personas.
- Define explicit input/context and output contracts.
- Use explicit enums/status states where structured output benefits from them.
- Define explicit fallback states for no-match and insufficient-evidence conditions.
- Re-inject critical invariants before high-impact actions in multi-turn execution.
- Perform a compact self-validation before reporting output.
- Treat self-validation as an execution guard, not as a replacement for deterministic repository validation or human approval.
- Prefer positive output invariants over long negative-prohibition lists.
- Do not promote empirical prompt heuristics such as a universal four-constraint ceiling, mandatory XML delimiters, or always placing format instructions at the end into global architecture rules.

The pilot should record recurring prompt failures and convert only repeated, material failures into reusable contract improvements.

## Pilot Success Criteria

The pilot is considered technically validated when:
1. the three capabilities execute independently under one scheduler;
2. each capability has a stable input/process/output contract;
3. current evidence and explicit exclusions are applied consistently;
4. outputs can be validated without changing the capability definition;
5. repeated failures can be converted into reusable rule improvements;
6. authoritative baseline changes remain human-approved;
7. no generic runtime or database is required to operate the pilot.

### Pilot Evaluation Loop

`Run → Validate → Record Failure Pattern → Propose Rule Change → Human Verify → Update GitHub`

Do not promote isolated misses into permanent rules.

## Implementation Phases

| # | Phase | Status | Purpose |
|---|---|---|---|
| 1 | Career Foundation | COMPLETE | Canonical profile + three workstreams. |
| 2 | Search Specification | COMPLETE | Lock role, geography, salary, exclusions, evidence and output rules. |
| 3 | Job Search Capability | PILOT | Execute through the released capability contract; validate discovery, matching, deduplication and result output. |
| 4 | Company Radar Capability | PILOT | Execute through the released capability contract; validate signal discovery, evidence thresholds and output. |
| 5 | Remote / AI Capability | PILOT | Execute the separate remote/AI matching model and validate schedule/compensation/deliverable fit. |
| 6 | Master Scheduling | COMPLETE | One daily scheduler orchestrates the three search workstreams and weekly synthesis within platform task limits. |
| 7 | Weekly Run Record | COMPLETE | Persist one compact weekly execution/synthesis record for observability and learning without storing the full job archive. |
| 8 | External Tracking | NEXT | Use Google Sheets/external tools for opportunity records and application history. |
| 9 | Weekly Synthesis | COMPLETE | Weekly consolidated view is included in the master scheduler and runs on the weekly cadence. |
| 10 | Feedback Loop | ACTIVE | Convert repeated user decisions and real failure patterns into durable rules instead of ad-hoc rule additions. |
| 11 | Capability Quality Review | ACTIVE | Measure relevance, false rejects, false accepts, duplicates, evidence quality, signal quality and usefulness. |
| 12 | Career Database Trigger | FUTURE | Introduce only when volume/query/history requirements demonstrate the current model is insufficient. |
| 13 | Career Database | FUTURE | If justified, support searchable job/company/opportunity history and cross-search analysis similar to the R&D Innovation Knowledge Sheet pattern. |

## Search Priority

### Job Search

1. Quality / Supplier Quality (SQE) / Project Quality
2. Project Manager / Project Management
3. Assistant / Assistant Project Manager
4. R&D / Engineering

Trading and manufacturing are both acceptable environments.

### Geography

Priority order: Da Nang → Quang Nam → Hue → Quang Tri.

For locations farther from Da Nang, compensation should increase enough to justify the additional distance/relocation burden. Remote is acceptable when role matching is strong and compensation is high.

### Compensation

Default target: `> USD 1,000/month` using `26,500 VND/USD` for screening calculations.

For manufacturing roles in Da Nang/Quang Nam, compensation may be below USD 1,000 when local market level is lower, but the working floor is `> 20,000,000 VND/month`.

Unknown salary is not an automatic rejection; label it as unknown and assess the other evidence.

### Explicit Exclusions

Do not return or prioritize opportunities from:

- Premo Vietnam
- LIXIL Vietnam
- GGEC
- UAC

These exclusions are user decisions and apply across relevant search workstreams unless the user explicitly changes them.

## Standard Job / Company Output

Job Search and Company Radar should produce a compact table matching the established working format, with enough fields to support action without creating a duplicate database inside Second-Brain.

### Job Search minimum fields

`Priority | Matching (%) | Job Title | Job Group | Company | Location | Employment Type | Salary | Posted | Status | CV Fit / Evidence | Gaps / Risks | Location Fit | Recommended Action | Direct Link | Verified`

### Company Radar minimum fields

`Priority | Company | Location | Signal | Signal Strength | Evidence / Source | Relevant Role Potential | Salary / Market Signal | Fit to Career Profile | Risk / Uncertainty | Recommended Action | Direct Link | Verified`

## Matching Principles

- Current explicit user requirements override older memory.
- Use the actual JD/company evidence before deciding.
- Separate mandatory requirements, preferred requirements, transferable capability, and unknowns.
- Do not fabricate missing experience, skills, metrics, salary, or achievements.
- Do not reject borderline opportunities solely because one preferred skill is missing; test transferable evidence first.
- A company expansion signal is not proof that a suitable vacancy exists.
- Deduplicate repeated opportunities and preserve the latest verified state.
- Do not confuse search freshness with decision certainty.

## Remote / AI Model

Remote / AI is a separate matching model, not a copy of traditional ATS scoring.

Evaluate:

- Engineering / manufacturing / quality domain fit
- AI capability leverage
- Deliverable fit
- Evidence from the resume and demonstrated work
- Remote feasibility
- Engagement type
- Compensation
- Schedule compatibility
- Communication / English requirement
- Skill-gap bridgeability

Search categories should include:

1. AI training / evaluation / technical SME using engineering or manufacturing knowledge.
2. Technical documentation / technical writing / SOP / quality-document work.
3. CAD / engineering drawing / DFM documentation.
4. Quality / ISO / PPAP / PFMEA / Control Plan / 8D documentation or consulting work where remote delivery is realistic.
5. Project coordination / technical project support / operations documentation.
6. AI-assisted engineering, research, data, workflow, automation, or process-improvement work.
7. Remote full-time engineering/quality/project roles when matching and compensation are strong.

For side work alongside the current 9–5, use the reference availability from the supplied Remote Job Matching material: approximately `21:00–00:00 ICT`, `2–4 days/week`, around `6–12 hours/week`. This is a working baseline and should be verified if it changes.

Remote work requiring substantial synchronous daytime availability is a constraint for side work but not for a remote full-time opportunity.

## Operating Cadence and Master Scheduler

The intended recurring model is implemented through **one daily master schedule** because the platform limits the number of independent scheduled tasks.

### Master scheduler

- Runs daily at approximately 09:00 ICT.
- Uses `SEARCH_ANCHOR = 2026-09-20` as the current search-cycle anchor.
- On a search day, when `(current_date - SEARCH_ANCHOR) mod 3 = 0`, execute all three search workstreams:
  - Job Search
  - Company Radar
  - Remote / AI
- On non-search days, do not perform the three search cycles merely because the master schedule ran.
- Every Monday, execute Weekly Career Synthesis using the latest outputs/state from all three workstreams.
- Every Monday, after synthesis and validation, write/update exactly one compact weekly run record at `TOPICS/2. CAREER/RUNS/YYYY-W##.md`.
- The weekly run record is an observability/learning artifact, not a job archive.
- Weekly synthesis is independent of whether Monday is a search day; if both conditions are true in the future, perform the search cycle and then synthesis in the same master run.

Consolidation changes only the scheduler. It must not merge the workstream prompts, matching models, evidence requirements, exclusions, or output contracts.

### Execution order on a search day

1. Read the current Career context and workstream READMEs.
2. Run Job Search and Company Radar as independent workstreams.
3. Run Remote / AI using its separate matching model.
4. Keep outputs separated according to each workstream's output contract.
5. If Monday, synthesize the meaningful changes after the search outputs are available.
6. Validate the synthesis against actual outputs/state.
7. If Monday, write/update the compact weekly run record in `TOPICS/2. CAREER/RUNS/`.
8. Do not create a high-volume job database or write transient search results into Second-Brain.

### Cadence invariants

- Job Search: every 3 days.
- Company Radar: every 3 days.
- Remote / AI: every 3 days.
- Weekly synthesis: once per week.
- Weekly run record: once per week, after weekly synthesis.
- One scheduler does not imply one shared matching model.

Scheduling must respect the available automation/task capacity.

## Weekly Run Record Contract

Each `TOPICS/2. CAREER/RUNS/YYYY-W##.md` file should remain compact and contain:

1. Week/date range.
2. Search/synthesis runs actually completed.
3. Job Search — concise meaningful findings.
4. Company Radar — concise meaningful findings.
5. Remote / AI — concise meaningful findings.
6. Quality observations: duplicates, evidence gaps, false rejects/accepts, repeated failure patterns.
7. Proposed reusable improvements.
8. Human-review items / unresolved questions.
9. Validation status.

Do not copy the full opportunity tables into the weekly record. Keep individual opportunity history in the external tracker.

## Completion Definition

The Career Orchestrator is considered operational when:

1. The three workstreams use the current Career Profile.
2. Each workstream can discover and evaluate opportunities independently.
3. Job Search and Company Radar return the established table format.
4. Remote / AI uses its separate matching logic.
5. Explicit exclusions are applied consistently.
6. Results can be copied into the external tracker without Second-Brain becoming a job database.
7. Recurring execution is configured within platform limits.
8. User feedback can improve durable rules without creating a new rule after every individual failure.

A future database is an evidence-triggered architecture change, not part of the initial implementation.
