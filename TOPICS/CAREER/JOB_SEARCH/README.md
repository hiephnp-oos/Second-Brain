# Job Search

## Purpose / Scope

Routing and durable rules for recurring local/full-time job discovery and fit evaluation. Actual job records remain outside Second-Brain until scale demonstrates a need for a dedicated database.

## Current Context

This workstream targets roles aligned with the user's manufacturing engineering, R&D, quality, supplier quality, NPI, industrialization, validation, and related experience, with primary geographic focus on Da Nang / Quang Nam / Central Vietnam.

The workstream should combine current job-market evidence with the canonical `CAREER_PROFILE.md` rather than maintaining a second profile.

## Active Artifacts / References

- `../CAREER_PROFILE.md` — canonical cross-workstream career baseline.
- External job-tracking data may contain individual opportunities, application status, interview outcomes, and search history.
- Historical outcomes should be distilled into reusable rules when they materially affect future searches.

## Working Rules

- Prefer jobs the user has explicitly surfaced when they are relevant, while still supporting independent discovery.
- Do not fabricate missing qualifications, experience, metrics, or achievements.
- Treat mandatory requirements differently from preferred requirements.
- Treat explicit geographic, language, or role constraints as hard filters when they are documented as such.
- Before rejecting a borderline role, test credible transferable skills and evidence rather than assuming a gap makes the role impossible.
- Distinguish `APPLY / PRIORITIZE`, `CONSIDER / VERIFY`, `RISK`, and `REJECT` using evidence and explicit user decisions.
- When compensation is visible, compare it with the profile target; when it is not visible, mark it unknown rather than inferring a value.
- Do not recreate a large job archive inside this topic merely to preserve search history; Git history and the external tracker cover historical state until a database is justified.

## Decisions / Status

- This workstream is active and designed for recurring search cycles.
- It is intentionally a rules/routing layer rather than a job database.
- A future database may replace the external tracking layer when volume, retrieval, deduplication, historical analysis, or cross-search queries demonstrate that the current model is insufficient.

## Routing

Use this workstream for local/full-time job search, job-to-profile matching, application prioritization, and reuse of durable search exclusions/rules.

For company expansion signals route to `../COMPANY_RADAR/README.md`. For remote, contract, part-time, freelance, or AI-enabled opportunities route to `../REMOTE_AI/README.md`.

## Next

Run recurring searches using the current profile and rules. Promote only durable findings back into `CAREER_PROFILE.md` or this README.
