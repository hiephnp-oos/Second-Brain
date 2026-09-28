# Company Radar

## Purpose / Scope

Recurring discovery of companies whose entry, expansion, new facilities, investment, or hiring activity may create relevant career opportunities. The target output is an actionable company-signal table, not a company database.

## Current Context

Geography priority: Da Nang → Quang Nam → Hue → Quang Tri. Companies farther from Da Nang require stronger compensation/conditions or a clearly stronger opportunity rationale.

Target role priority for company signals follows the Career Profile: Quality / SQE / Project Quality → Project Manager → Assistant / Assistant Project Manager → R&D / Engineering.

Trading and manufacturing companies are both valid targets.

Use `../CAREER_PROFILE.md` as the single career baseline.

## Active Artifacts / References

- `../CAREER_PROFILE.md` — canonical profile, role priorities, geography, compensation and exclusions.
- `../IMPLEMENTATION_PLAN.md` — Career Orchestrator business workflow and output contract.
- External research/search outputs may contain current company evidence and individual vacancy details.

## Working Rules

- Exclude or deprioritize Premo Vietnam, LIXIL Vietnam, GGEC, and UAC according to the explicit Career Profile decisions.
- Search for concrete signals: new factory/facility, investment, production expansion, engineering/quality organization growth, hiring waves, supplier ecosystem expansion, or market entry.
- Prefer multiple credible signals where practical: official company announcements, investment/facility evidence, current job postings, and credible business reporting.
- Distinguish signal strength from confirmed job availability; an expansion signal does not prove a vacancy exists.
- Distinguish confirmed facts from inference and clearly label uncertainty.
- Assess potential against the user's target roles, geography, compensation direction, and transferable capabilities.
- Do not infer salary or a future vacancy without evidence.
- Deduplicate repeated company signals and update the latest verified state.

## Target Output Table

Use the established compact table format:

`Priority | Company | Location | Signal | Signal Strength | Evidence / Source | Relevant Role Potential | Salary / Market Signal | Fit to Career Profile | Risk / Uncertainty | Recommended Action | Direct Link | Verified`

## Cadence

Intended recurring radar cadence: every 3 days. Focus on new signals and meaningful changes since the previous cycle.

## Decisions / Status

- Operates in parallel with Job Search and Remote / AI.
- Company Radar is a leading-indicator layer; it should not duplicate the job tracker.
- A future database may include company-signal history only when demonstrated query/history needs justify it.

## Routing

Use this workstream for company entry, expansion, new facilities, investment, regional hiring waves, and companies worth monitoring. Route confirmed vacancies to `../JOB_SEARCH/README.md`; route remote/AI opportunities to `../REMOTE_AI/README.md`.

## Next

Implement recurring company-signal discovery and produce the standard table with evidence and explicit uncertainty.
