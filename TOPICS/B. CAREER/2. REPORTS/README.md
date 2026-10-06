# Career Reports and Decision Memory

## Purpose
Weekly reports record current-cycle findings. `CAREER_SUMMARY.md` is the historical decision memory reused by every future search. Neither is a high-volume database.

## Canonical Artifacts
- `CAREER_SUMMARY.md` — master historical decision memory.
- `YYYY-W##.md` — one current-cycle review artifact per ISO week.

## Weekly Lifecycle
1. Search current evidence.
2. Read `CAREER_SUMMARY.md` before discovery.
3. Deduplicate and verify.
4. Merge new/materially changed records into Summary.
5. Write the weekly report.
6. Re-read and validate the exact path.
7. User reviews Summary and records `Action` / `Reason`.
8. Future searches reuse those decisions.

Existing user `Action` / `Reason` values must not be silently overwritten.

## Weekly Output Schemas
### Job Search
`Job Title | Date Found | Week Found | Company | Location | Job URL | Salary | Matching Score | Status | Key Missing Skills | Suggest Action | Decision | Reason`

### Company Radar
`Company | Industry / Tier | Signal / Date | Evidence | Hiring Outlook | Decision Maker | Last Verified | Next Action | Decision | Reason`

### Remote / AI
`Job / Project Title | Date Found | Week Found | Work Type | Company / Platform | Remote Scope | Job URL | Compensation | Matching Score | Status | Key Missing Skills | Schedule Fit | Suggest Action | Decision | Reason`

Use explicit `NO_MATCH`, `NO_SIGNAL`, or `NOT_RUN` when applicable.

## Summary Contract
`CAREER_SUMMARY.md` contains three master tables, `Explicit Exclusions`, and `Reusable Lessons`.

User-owned: `Decision`, `Reason`.
AI-owned: discovery, evidence, matching, `Suggest Action`, deduplication, proposed lessons.

AI must not fabricate a user decision.

## Historical Reports
W39–W41 remain historical recovery evidence and are not rewritten solely for schema cosmetics. New/current reports use the refactored schema.

## Validation
- Summary exists at the canonical path.
- Weekly report exists at the expected path.
- Declared schemas are respected.
- Existing user decisions are preserved.
- Exclusions are consistent with Profile.
- No obsolete Summary path remains.
- Missing stream execution is explicit.
- Exact paths are re-read after write.

## Routing
Profile → stable baseline
Execution Contract → shared lifecycle
Capability README/PROMPT → capability logic
CAREER_SUMMARY → historical decisions/lessons
YYYY-W## → current-cycle evidence
Implementation Plan → refactor roadmap only
