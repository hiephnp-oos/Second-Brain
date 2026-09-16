# Company Radar

## Purpose / Scope

Durable routing and evaluation rules for discovering companies that are entering, expanding, building facilities, or increasing hiring activity in the user's target geography and may create relevant career opportunities.

## Current Context

The radar focuses primarily on Da Nang, Quang Nam, and nearby Central Vietnam industrial/manufacturing ecosystems. Signals may include new facilities, investment, production expansion, engineering organization growth, hiring waves, supplier ecosystem changes, and other evidence that a relevant opportunity may emerge.

The workstream is a signal-detection layer. It should not become a permanent company database unless demonstrated scale later requires one.

## Active Artifacts / References

- `../CAREER_PROFILE.md` — canonical role, geography, capability, and constraint baseline.
- External research/search outputs may contain current company evidence and individual opportunity details.
- Durable company-selection or monitoring rules belong here; transient search results remain external until promoted.

## Working Rules

- Prefer evidence of actual company activity over speculative opportunity assumptions.
- Distinguish company signal strength from job availability; an expansion signal does not prove a suitable vacancy exists.
- Prioritize companies whose activity is geographically compatible with the career profile.
- Use multiple credible signals when possible: official announcements, facility/investment evidence, hiring activity, credible business reporting, or current job postings.
- Surface uncertainty explicitly when the company, facility, role, timing, or hiring implication is not confirmed.
- Reuse durable exclusions and explicit user decisions from the career profile instead of rediscovering them independently in every search cycle.

## Decisions / Status

- This workstream operates in parallel with Job Search and Remote / AI.
- It is intended to identify emerging opportunity sources, not to duplicate the job-tracking database.
- Company radar data may later feed a searchable career database if real usage shows that repeated signal history and cross-company querying are valuable enough to justify migration.

## Routing

Use this workstream for company entry/expansion signals, new factories/facilities, regional hiring waves, and identifying companies worth monitoring for future career opportunities.

For specific open roles and matching, route to `../JOB_SEARCH/README.md`. For remote/contract/AI-enabled opportunities, route to `../REMOTE_AI/README.md`.

## Next

Run recurring company-radar searches and promote only durable monitoring criteria, exclusions, or company-level decisions into this topic.
