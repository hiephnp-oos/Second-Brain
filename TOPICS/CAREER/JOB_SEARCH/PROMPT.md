# Job Search Capability

## Purpose

Discover and evaluate current local/full-time roles using the canonical Career Profile.

## Input / Context

- Career Profile
- Current web/job-market evidence
- Prior cycle state when available
- Current user instruction

## Task

1. Search the priority role groups.
2. Apply geography and compensation constraints.
3. Apply explicit exclusions.
4. Separate mandatory, preferred, transferable, and unknown requirements.
5. Verify material listing details.
6. Deduplicate repeated listings where possible.
7. Produce the standard job output table.

## Output Contract

Use these fields exactly:

`Priority | Matching (%) | Job Title | Job Group | Company | Location | Employment Type | Salary | Posted | Status | CV Fit / Evidence | Gaps / Risks | Location Fit | Recommended Action | Direct Link | Verified`

Allowed `Verified` states: `VERIFIED` | `PARTIAL` | `UNKNOWN`.

Allowed `Status` values should use the current external tracker vocabulary when one exists; do not invent a new status merely for one run.

## Rules

- Do not fabricate qualifications, experience, metrics, salary, posting date, or status.
- Unknown salary is not automatic rejection; label it as unknown.
- A missing preferred skill is not automatic rejection.
- Hard blockers override title similarity.
- Use current evidence, not stale assumptions.
- Distinguish verified facts, inference, and unknowns.
- If a material field cannot be verified, preserve the opportunity and mark the uncertainty rather than inventing the value.

## Fallback / Escalation

- `NO_MATCH`: no role meets the search contract with sufficient evidence.
- `INSUFFICIENT_EVIDENCE`: potentially relevant role exists but a material decision field cannot be verified.
- Escalate when source conflict could materially change the assessment.

## Validation

Before output, check:

- current evidence was used;
- exclusions were applied;
- mandatory/preferred/transferable/unknown requirements are separated;
- no unsupported qualification or salary was introduced;
- every returned row satisfies the output contract;
- material uncertainty is explicitly labelled;
- duplicate/stale listings are handled where prior state exists.

If validation fails, correct the output or return the appropriate fallback state instead of reporting success.
