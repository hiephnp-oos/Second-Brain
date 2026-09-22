# Career Weekly Run Records

## Purpose

Lightweight weekly observability and learning layer for the Career Orchestrator.

This folder is **not** a job database and must not become an archive of all search results.

## Record

Create one file per ISO week:

`YYYY-W##.md`

The master Career scheduler creates or updates the current weekly record after Monday Weekly Career Synthesis.

## Required Content

Each weekly record should contain:

1. Week/date range.
2. Search/synthesis runs actually completed.
3. Job Search — concise meaningful findings.
4. Company Radar — concise meaningful findings.
5. Remote / AI — concise meaningful findings.
6. Quality observations: duplicates, evidence gaps, false rejects/accepts, repeated failure patterns.
7. Proposed reusable improvements.
8. Human-review items / unresolved questions.
9. Validation status.

## Persistence Rules

- Keep the record compact.
- Do not copy the full job/company/opportunity tables.
- Keep individual opportunity history in the external tracker.
- Record only evidence and observations actually produced by the run.
- Do not silently modify `CAREER_PROFILE.md`, workstream contracts, or scheduler rules from a run record.
- Proposed changes require human review before becoming authoritative baseline changes.

## Example Structure

```markdown
# Career Weekly Run — YYYY-W##

## Execution
- Search cycles completed:
- Weekly synthesis:
- Run status:

## Job Search
- Meaningful findings:
- Quality observations:

## Company Radar
- Meaningful findings:
- Quality observations:

## Remote / AI
- Meaningful findings:
- Quality observations:

## Cross-Workstream Learning
- Repeated failure patterns:
- Evidence gaps:
- Duplicates / stale-state issues:

## Proposed Improvements
- ...

## Human Review
- ...

## Validation
- Contract validation: PASS / FAIL
- Evidence state: ...
```
## Routing & State

- State: **Operational**
- Routing: Career scheduler → weekly run record → human review → reusable improvement proposal.
- Rules: Keep records lightweight; preserve external opportunity history in the tracker; do not promote proposed changes to authoritative Career rules without human review.
