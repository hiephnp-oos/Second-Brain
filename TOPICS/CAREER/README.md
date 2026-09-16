# Career

## Scope

Durable working context for career planning, job discovery, company radar, remote/AI opportunities, career-fit analysis, and the rules used to evaluate opportunities. This topic is a routing and decision-context layer, not a job database.

## Current Context

The career workflow currently operates through three parallel workstreams:

- `JOB_SEARCH` — local/full-time roles aligned with the user's engineering, quality, R&D, NPI, industrialization, supplier-quality, validation, and related manufacturing background.
- `COMPANY_RADAR` — companies entering, expanding, or increasing hiring activity in Da Nang / Quang Nam and nearby Central Vietnam locations where they may create relevant opportunities.
- `REMOTE_AI` — remote, contract, part-time, freelance, or AI-enabled roles that can leverage the user's engineering background and AI capabilities, including work compatible with evenings alongside the current 9–5 role when no suitable local full-time move exists.

Actual job records, search results, status history, and high-volume opportunity data remain outside Second-Brain at this stage. The current persistence layer is intended for durable profile, rules, decisions, exclusions, and workflow context.

## Working Principles

- Preserve one canonical career profile and avoid duplicating it across workstreams.
- Separate durable evaluation rules from temporary job-search results.
- Do not invent skills, experience, metrics, qualifications, salary history, or achievements.
- Distinguish a hard blocker from a risk, a preference, and an item requiring verification.
- Reuse prior decisions and exclusions unless new evidence materially changes them.
- Prefer evidence from the actual job description, company source, or other authoritative source before making a fit/exclusion decision.
- Job Search and Remote/AI use different evaluation logic; remote opportunities must consider AI leverage, remote feasibility, engagement type, and compatibility with the user's current working schedule.
- Keep Second-Brain small until real job-search scale demonstrates that a searchable job database is necessary.

## Active Projects / References

### Career Profile

`TOPICS/CAREER/CAREER_PROFILE.md` is the stable baseline for geography, target role families, compensation direction, core capabilities, constraints, and other durable career-fit context.

### Job Search

`TOPICS/CAREER/JOB_SEARCH/README.md` contains the routing and matching rules for local/full-time opportunity discovery and evaluation.

### Company Radar

`TOPICS/CAREER/COMPANY_RADAR/README.md` contains the rules for detecting relevant company expansion, entry, facilities, and hiring signals in the target geography.

### Remote / AI

`TOPICS/CAREER/REMOTE_AI/README.md` contains the rules for remote, contract, part-time, freelance, and AI-enabled opportunity discovery and evaluation.

### External working data

Search result records and application tracking may continue to live in the user's working tools, such as Google Sheets. Second-Brain should store only the durable context needed to interpret, query, or continue that workflow.

## Decisions

- Career is a first-class Second-Brain topic because the workflow is recurring and requires durable routing/context.
- The initial Career structure is intentionally not a database.
- The three workstreams operate in parallel rather than as sequential stages.
- A future job database is allowed when real data volume and query needs demonstrate that the Markdown/Google Sheet model is no longer sufficient; that future transition should be treated as a deliberate architecture change rather than pre-built now.
- The first database use case, if later justified, should support storage and retrieval patterns similar to the R&D Innovation Knowledge Sheet rather than merely accumulating a large folder of job files.

## Lessons

- Do not turn a recurring workflow into a database solely because the workflow exists.
- Preserve high-value durable rules in Second-Brain while keeping high-volume ephemeral records external until scale justifies migration.
- Historical job outcomes are useful only when distilled into reusable decision rules, exclusions, or profile constraints.
- A successful search action or connector result is not evidence that a career task is complete; the resulting data/state must be verified where persistence is involved.

## Routing

For career work, start here and then route to the smallest relevant workstream:

```text
CAREER
├── CAREER_PROFILE.md
├── JOB_SEARCH/README.md
├── COMPANY_RADAR/README.md
└── REMOTE_AI/README.md
```

Use `CAREER_PROFILE.md` for stable cross-workstream constraints. Use exactly one workstream README for the primary task unless a request explicitly spans multiple workstreams.

## Next

Operate the three workstreams against real searches and update only durable career context. Reassess the database transition when job/opportunity volume, query complexity, history retention, or cross-search analysis creates a demonstrated limitation in the current model.
