# Job Search

## Purpose / Scope

Recurring discovery and evaluation of local/full-time career opportunities. The target output is an actionable table that can be copied into the user's external tracker; Second-Brain does not store the high-volume job archive.

## Current Context

Target role priority:

1. Quality — Manufacturing Quality, Supplier Quality / SQE, Project Quality.
2. Project Manager / Project Management.
3. Assistant / Assistant Project Manager.
4. R&D / Engineering.

Trading and manufacturing environments are both acceptable.

Geography priority: Da Nang → Quang Nam → Hue → Quang Tri. Roles farther from Da Nang require stronger compensation/conditions to justify the location burden. Business travel is acceptable. Remote full-time can be considered when matching is strong and compensation is high.

Use `../CAREER_PROFILE.md` as the single career baseline.

## Active Artifacts / References

- `../CAREER_PROFILE.md` — canonical profile and constraints.
- `../IMPLEMENTATION_PLAN.md` — Career Orchestrator business workflow and target state.
- External job-tracking data may contain individual opportunities, application status, interview outcomes, and search history.

## Working Rules

- Search independently while giving user-supplied opportunities appropriate priority when relevant.
- Apply the explicit exclusions in `CAREER_PROFILE.md`: Premo Vietnam, LIXIL Vietnam, GGEC, UAC.
- Do not fabricate qualifications, experience, metrics, salary, or achievements.
- Separate mandatory requirements, preferred requirements, transferable capability, and unknowns.
- Before rejecting a borderline role, investigate credible transferable evidence.
- Salary target is generally `> USD 1,000/month`; use `26,500 VND/USD` for conversion. For manufacturing roles in Da Nang/Quang Nam, allow below USD 1,000 when justified by local market level, but apply a working floor of `> 20,000,000 VND/month`.
- Unknown salary is not a rejection reason.
- Evaluate location together with compensation; farther from Da Nang should require stronger compensation/conditions.
- Verify current job status, location, salary, language requirements, and other material facts before presenting them as confirmed.
- Deduplicate repeated listings and use the latest verified state.

## Matching / Decision

Use the shared decision categories:

- `APPLY / PRIORITIZE`
- `CONSIDER / VERIFY`
- `RISK`
- `REJECT`

Do not reduce matching to title similarity. Assess actual scope, quality/engineering evidence, project ownership, transferable skills, location, compensation, language, and hard blockers.

A high match does not override a hard blocker. A missing preferred skill does not automatically create a rejection.

## Target Output Table

Use the established compact table format:

`Priority | Matching (%) | Job Title | Job Group | Company | Location | Employment Type | Salary | Posted | Status | CV Fit / Evidence | Gaps / Risks | Location Fit | Recommended Action | Direct Link | Verified`

Keep the table decision-oriented. Avoid unnecessary narrative outside the fields needed to act.

## Cadence

Intended recurring search cadence: every 3 days. The search should look for new/relevant opportunities since the previous cycle while rechecking material status changes when useful.

## Decisions / Status

- Operates in parallel with Company Radar and Remote / AI.
- Current persistence remains external for job records.
- Future database transition is triggered by demonstrated volume, retrieval, deduplication, historical-analysis, or cross-search limitations.

## Routing

Use this workstream for specific local/full-time job discovery, matching, prioritization, and application decisions. Route company expansion/entry signals to `../COMPANY_RADAR/README.md`. Route remote/contract/part-time/freelance/AI-enabled work to `../REMOTE_AI/README.md`.

## Next

Implement recurring search using the current profile, exclusions, matching rules, evidence verification, and target output table.
