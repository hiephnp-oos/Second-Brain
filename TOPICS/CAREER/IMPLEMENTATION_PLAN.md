# Career Orchestrator Implementation Plan

## Business Goal

Build a recurring Career Opportunity System that discovers, evaluates, tracks, and learns from three parallel opportunity streams:

1. `JOB_SEARCH` — local/full-time roles.
2. `COMPANY_RADAR` — companies entering, expanding, or hiring in the target geography.
3. `REMOTE_AI` — remote/full-time and remote contract, part-time, freelance, or AI-enabled opportunities.

Second-Brain stores durable profile, rules, decisions, exclusions, and workflow context. High-volume opportunity records remain external until scale demonstrates that a searchable database is required.

## Target State

```text
CAREER PROFILE
      │
      ├──────────────┬──────────────┐
      ▼              ▼              ▼
 JOB SEARCH     COMPANY RADAR    REMOTE / AI
      │              │              │
      └──────────────┼──────────────┘
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

## Implementation Phases

| # | Phase | Status | Purpose |
|---|---|---|---|
| 1 | Career Foundation | COMPLETE | Canonical profile + three workstreams. |
| 2 | Search Specification | COMPLETE | Lock role, geography, salary, exclusions, evidence and output rules. |
| 3 | Job Search Engine | NEXT | Define recurring discovery, matching, deduplication and result-table workflow. |
| 4 | Company Radar Engine | NEXT | Define signal discovery, evidence thresholds, company-to-opportunity routing and result table. |
| 5 | Remote / AI Engine | NEXT | Implement separate remote/AI matching model and search categories. |
| 6 | Parallel Scheduling | NEXT | Run the three search workstreams independently on a recurring cadence. |
| 7 | External Tracking | NEXT | Use Google Sheets/external tools for opportunity records and application history. |
| 8 | Weekly Synthesis | NEXT | Produce one weekly consolidated view of meaningful changes and actions. |
| 9 | Feedback Loop | FUTURE | Convert user decisions and real outcomes into durable rules instead of ad-hoc rule additions. |
| 10 | Search Quality Review | FUTURE | Measure relevance, false rejects, false accepts, duplicates, evidence quality and usefulness. |
| 11 | Career Database Trigger | FUTURE | Introduce only when volume/query/history requirements demonstrate the current model is insufficient. |
| 12 | Career Database | FUTURE | If justified, support searchable job/company/opportunity history and cross-search analysis similar to the R&D Innovation Knowledge Sheet pattern. |

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

## Operating Cadence

The intended recurring model is:

- Job Search: every 3 days.
- Company Radar: every 3 days.
- Remote / AI: every 3 days.
- Weekly synthesis: once per week.

Scheduling must respect the available automation/task capacity. If the platform cannot support all four schedules independently, combine weekly synthesis into an existing recurring run rather than creating an unsupported fourth schedule.

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
