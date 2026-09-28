# Career Weekly Review

## Purpose

Provide one weekly review artifact for the user to review the three independent Career streams. This is a review surface, not a job database or a duplicate archive.

## Record

Create or update one file per ISO week: `YYYY-W##.md`, after Monday Weekly Career Synthesis.

## Required Review Format

Create exactly **one weekly report file per ISO week**. That single report must contain exactly three primary result tables, in this order:

1. **Job Search** — use the exact 16-column schema in `1. CAPABILITIES/1.1 JOB_SEARCH/README.md`.
2. **Company Radar** — use the exact 13-column schema in `1. CAPABILITIES/1.2 COMPANY_RADAR/README.md`.
3. **Remote / AI** — use the exact 16-column schema in `1. CAPABILITIES/1.3 REMOTE_AI/README.md`.

Copy only opportunities/signals that were actually found and reviewed in the reporting period. Preserve evidence, direct links, uncertainty and verification state. Do not compress multiple opportunities into narrative bullets or merge the three streams into one table.

If a stream has no qualifying result, include one explicit status row in that stream's table (for example, `NO_MATCH` or `NO_SIGNAL`) and leave non-applicable cells as `—`. If a stream did not execute, state `NOT_RUN`; never present it as an empty successful search.

## Report Metadata and Review Notes

Before the tables, include week/date range, execution dates, which streams ran, synthesis status, and report validation status.

After the three tables, include only:
- Cross-stream quality observations (duplicates, evidence gaps, false accepts/rejects, stale results).
- Proposed reusable improvements (not automatically promoted).
- Questions requiring the user's review.

## Persistence Rules

- Keep the report concise; the three tables are the primary review artifact.
- Do not store the full search archive or duplicate the external tracker.
- Record only evidence actually produced by the run.
- Do not silently modify `CAREER_PROFILE.md`, capability contracts, or scheduler rules.
- Proposed changes require human review before becoming authoritative.
- Validate table headers against the capability README schemas before writing the weekly file.

## Template

```markdown
# Career Weekly Review — YYYY-W##

## Execution
- Week:
- Search cycles completed:
- Job Search / Company Radar / Remote-AI status:
- Weekly synthesis:
- Validation:

## 1. Job Search
| [exact 16 columns from Job Search README] |

## 2. Company Radar
| [exact 13 columns from Company Radar README] |

## 3. Remote / AI
| [exact 16 columns from Remote / AI README] |

## Cross-Stream Quality Observations
- ...

## Proposed Improvements
- ...

## User Review
- ...
```

## Routing

- State: **Operational**
- Routing: Career master scheduler → three independent outputs → three-table weekly review → user review → approved reusable improvement.
