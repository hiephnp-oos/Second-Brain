# Job Search Capability

## Purpose

Discover and evaluate current local/full-time roles using the canonical Career Profile.

## Input

- Career Profile
- Current web/job-market evidence
- Prior cycle state when available

## Task

1. Search priority roles.
2. Apply geography and compensation constraints.
3. Apply explicit exclusions.
4. Separate mandatory, preferred, transferable, and unknown requirements.
5. Verify material listing details.
6. Deduplicate repeated listings where possible.
7. Produce the standard job output table.

## Output Contract

`Priority | Matching (%) | Job Title | Job Group | Company | Location | Employment Type | Salary | Posted | Status | CV Fit / Evidence | Gaps / Risks | Location Fit | Recommended Action | Direct Link | Verified`

## Rules

- Do not fabricate qualifications, experience, metrics, salary, or status.
- Unknown salary is not automatic rejection.
- A missing preferred skill is not automatic rejection.
- Hard blockers override high title similarity.
- Use current evidence, not stale assumptions.

## Validation

Return only roles whose material facts can be supported by current evidence, and label uncertainty explicitly.
