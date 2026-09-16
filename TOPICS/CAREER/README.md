# Career

## Scope

Durable working context for the Career Orchestrator: career planning, job discovery, company radar, remote/AI opportunities, career-fit analysis, and reusable decision rules. This topic is a routing and decision-context layer, not a job database.

## Current Context

The workflow operates through three parallel workstreams:

- `JOB_SEARCH` — local/full-time roles with priority Quality / SQE / Project Quality, then Project Manager, Assistant / Assistant PM, then R&D / Engineering.
- `COMPANY_RADAR` — companies entering, expanding, building facilities, or increasing hiring activity in Da Nang, Quang Nam, Hue, Quang Tri and relevant nearby areas.
- `REMOTE_AI` — remote full-time plus remote contract, part-time, freelance, and AI-enabled work leveraging engineering/quality/project capabilities.

Current geography priority is Da Nang → Quang Nam → Hue → Quang Tri. Roles farther from Da Nang require stronger compensation/conditions. Remote is acceptable when matching is strong and compensation is high.

Trading and manufacturing environments are both acceptable.

## Working Principles

- Preserve one canonical career profile and avoid duplicating it across workstreams.
- Current explicit user requirements override older career memory.
- Do not invent skills, experience, metrics, qualifications, salary, or achievements.
- Distinguish hard blockers, preferences, risks, transferable capability, and unknowns.
- Before rejecting borderline roles, investigate credible transferable evidence.
- Verify current job/company evidence before treating it as confirmed.
- Keep high-volume opportunity records in the external tracker until real scale demonstrates a database need.
- Job Search and Remote/AI use different matching logic.

## Active Projects / References

### Career Profile

`TOPICS/CAREER/CAREER_PROFILE.md` is the canonical baseline for roles, geography, compensation, capabilities, language constraints, and explicit exclusions.

### Implementation Plan

`TOPICS/CAREER/IMPLEMENTATION_PLAN.md` defines the business goal, target state, implementation phases, output contracts, matching principles, cadence, and database trigger.

### Job Search

`TOPICS/CAREER/JOB_SEARCH/README.md` defines local/full-time discovery, matching and the established output table.

### Company Radar

`TOPICS/CAREER/COMPANY_RADAR/README.md` defines company-signal discovery and the established output table.

### Remote / AI

`TOPICS/CAREER/REMOTE_AI/README.md` defines remote/full-time and remote side-work discovery, the separate matching model, and the output table.

## Decisions

- Career is a first-class Second-Brain topic because the workflow is recurring and requires durable routing/context.
- The three workstreams operate in parallel rather than as sequential stages.
- Explicit exclusions currently include Premo Vietnam, LIXIL Vietnam, GGEC, and UAC.
- Current compensation screening uses a general target of `> USD 1,000/month`, with a `> 20,000,000 VND/month` working floor for manufacturing roles in Da Nang/Quang Nam; `1 USD = 26,500 VND` for screening.
- A future job/opportunity database is allowed only when volume, query complexity, deduplication, historical analysis, or cross-search needs demonstrate that the Markdown/external-tracker model is insufficient.

## Lessons

- Do not turn a recurring workflow into a database solely because it exists.
- Do not create a new rule after every individual search failure; strengthen the reusable baseline when a repeated failure mode is demonstrated.
- Preserve durable rules in Second-Brain while keeping transient/high-volume results external.
- A successful search or connector action is not evidence that the resulting career state is correct; verify the output/state.

## Routing

```text
CAREER
├── CAREER_PROFILE.md
├── IMPLEMENTATION_PLAN.md
├── JOB_SEARCH/README.md
├── COMPANY_RADAR/README.md
└── REMOTE_AI/README.md
```

Use `CAREER_PROFILE.md` for cross-workstream criteria, `IMPLEMENTATION_PLAN.md` for the system/business workflow, and the smallest relevant workstream README for execution rules.

## Next

Implement the three recurring search engines against real market data, then configure scheduling and external tracking within platform/tool limits. Review the database trigger only after real usage generates sufficient volume or query complexity.
