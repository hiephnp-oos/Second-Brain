# Career

## Scope

Durable working context for the Career Orchestrator: career planning, job discovery, company radar, remote/AI opportunities, career-fit analysis, reusable decision rules, and lightweight weekly run records. This topic is a routing and decision-context layer, not a job database.

## Current Context

The workflow operates through three parallel capabilities:

- `JOB_SEARCH` — local/full-time roles with priority Quality / SQE / Project Quality, then Project Manager, Assistant / Assistant PM, then R&D / Engineering.
- `COMPANY_RADAR` — companies entering, expanding, building facilities, or increasing hiring activity in Da Nang, Quang Nam, Hue, Quang Tri and relevant nearby areas.
- `REMOTE_AI` — remote full-time plus remote contract, part-time, freelance, and AI-enabled work leveraging engineering/quality/project capabilities.

The three capabilities retain independent search and matching logic but are executed by one master scheduler to respect platform task limits. The scheduler is a trigger/orchestration layer only; it does not replace capability contracts.

Current geography priority is Da Nang → Quang Nam → Hue → Quang Tri. Roles farther from Da Nang require stronger compensation/conditions. Remote is acceptable when matching is strong and compensation is high.

Trading and manufacturing environments are both acceptable.

## Status

- State: Building
- Summary: Career is the first Capability/Skill pilot. The canonical profile, three workstreams, execution contracts, one master recurring scheduler, and lightweight weekly run-record layer are configured. Real-market execution is used to validate quality and discover repeated failure modes.
- Direction: Run the three independent capabilities through the master scheduler, evaluate outputs, and improve reusable rules only when repeated evidence justifies change.
- Last reviewed: 2026-09-21

## Working Principles

- Preserve one canonical career profile and avoid duplicating it across workstreams.
- Current explicit user requirements override older career memory.
- Do not invent skills, experience, metrics, qualifications, salary, or achievements.
- Distinguish hard blockers, preferences, risks, transferable capability, and unknowns.
- Before rejecting borderline roles, investigate credible transferable evidence.
- Verify current job/company evidence before treating it as confirmed.
- Keep high-volume opportunity records external; GitHub stores only durable context and lightweight weekly run/synthesis records.
- Job Search and Remote/AI use different matching logic.
- Scheduler consolidation must not collapse or weaken workstream-specific search, matching, verification, or output contracts.
- AI may discover, analyze, classify, and propose; authoritative Career baseline changes require human approval.
- Repeated failure patterns should improve reusable rules; one-off misses should not automatically create new rules.

## Active Projects / References

### Career Profile

`TOPICS/CAREER/CAREER_PROFILE.md` is the canonical baseline for roles, geography, compensation, capabilities, language constraints, and explicit exclusions.

### Execution Contract

`TOPICS/CAREER/CAREER_EXECUTION_CONTRACT.md` defines the shared Trigger → Input → Process → Tools → Output → Validation → Escalation model, human approval gate, and capability-level evaluation model.

### Implementation Plan

`TOPICS/CAREER/IMPLEMENTATION_PLAN.md` defines the business goal, target state, implementation phases, output contracts, matching principles, master-scheduler cadence, and database trigger.

### Weekly Run Records

`TOPICS/CAREER/RUNS/README.md` defines the lightweight weekly output/staging artifact. It records execution coverage, meaningful findings, quality/failure patterns, and proposed improvements without becoming a job database.

### Job Search

`TOPICS/CAREER/JOB_SEARCH/README.md` defines local/full-time discovery, matching and the established output table. `PROMPT.md` is the released execution contract for this capability.

### Company Radar

`TOPICS/CAREER/COMPANY_RADAR/README.md` defines company-signal discovery and the established output table. `PROMPT.md` is the released execution contract for this capability.

### Remote / AI

`TOPICS/CAREER/REMOTE_AI/README.md` defines remote/full-time and remote side-work discovery, the separate matching model, and the output table. `PROMPT.md` is the released execution contract for this capability.

## Decisions

- Career is a first-class Second-Brain topic because the workflow is recurring and requires durable routing/context.
- Career is the first pilot for capability-oriented execution; R&D Innovation follows after real Career usage validates the pattern.
- The three capabilities operate in parallel rather than as sequential stages.
- The capabilities are orchestrated by one daily master schedule; internal cadence rules determine which capabilities execute on each run.
- Explicit exclusions currently include Premo Vietnam, LIXIL Vietnam, GGEC, and UAC.
- Current compensation screening uses a general target of `> USD 1,000/month`, with a `> 20,000,000 VND/month` working floor for manufacturing roles in Da Nang/Quang Nam; `1 USD = 26,500 VND` for screening.
- A future job/opportunity database is allowed only when volume, query complexity, deduplication, historical analysis, or cross-search needs demonstrate that the Markdown/external-tracker model is insufficient.
- High-volume/transient search output is not automatically committed to Second-Brain.
- A compact weekly run record is committed to `TOPICS/CAREER/RUNS/` to preserve execution observability and reusable learning without storing the full job archive.

## Lessons

- Do not turn a recurring workflow into a database solely because it exists.
- Do not create a new rule after every individual search failure; strengthen the reusable baseline when a repeated failure mode is demonstrated.
- Preserve durable rules in Second-Brain while keeping transient/high-volume results external.
- A successful search or connector action is not evidence that the resulting career state is correct; verify the output/state.
- Consolidating schedulers is safe only when execution cadence is separated from capability logic and the output contracts remain unchanged.
- A capability contract is useful only when it clarifies execution and validation; do not build a generic runtime layer before repeated use demonstrates the need.

## Routing

```text
CAREER
├── CAREER_PROFILE.md
├── CAREER_EXECUTION_CONTRACT.md
├── IMPLEMENTATION_PLAN.md
├── RUNS/
│   └── README.md
├── JOB_SEARCH/
│   ├── README.md
│   └── PROMPT.md
├── COMPANY_RADAR/
│   ├── README.md
│   └── PROMPT.md
└── REMOTE_AI/
    ├── README.md
    └── PROMPT.md
```

Use `CAREER_PROFILE.md` for cross-workstream criteria, `CAREER_EXECUTION_CONTRACT.md` for shared execution/validation rules, `IMPLEMENTATION_PLAN.md` for system/business workflow, `RUNS/` for weekly execution history and synthesis, and the smallest relevant workstream README + `PROMPT.md` for execution.

## Next

Run the master scheduler against real market data, capture output-quality failures, evaluate each capability using the shared validation model, and promote only repeated, material improvements. Review the database trigger only after real usage generates sufficient volume or query complexity.
