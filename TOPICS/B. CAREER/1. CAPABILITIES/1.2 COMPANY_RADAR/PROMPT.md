# Company Radar Capability

## Purpose

Detect companies with meaningful expansion, entry, facility, investment, hiring, or other signals that may generate career opportunities in the target geography.

## Input / Context

- Career Profile
- Current company/market evidence
- Prior radar state when available
- Current user instruction

## Task

1. Search target geographies for credible company signals.
2. Verify the signal using primary or high-quality evidence where possible.
3. Separate signal strength from confirmed vacancy.
4. Estimate relevant role potential without inventing an opening.
5. Apply explicit company exclusions.
6. Produce the standard company-radar output table.

## Output Contract

Use these fields exactly:

`Priority | Company | Location | Signal | Signal Strength | Evidence / Source | Relevant Role Potential | Salary / Market Signal | Fit to Career Profile | Risk / Uncertainty | Recommended Action | Direct Link | Verified`

Allowed `Signal Strength`: `STRONG` | `MEDIUM` | `WEAK` | `UNKNOWN`.

Allowed `Verified`: `VERIFIED` | `PARTIAL` | `UNKNOWN`.

## Rules

- Company expansion is not proof of a suitable vacancy.
- Do not invent hiring activity, salary, project status, or role openings.
- Prioritize evidence that materially changes the opportunity assessment.
- Clearly label inferred role potential as inference.
- Distinguish verified signal from inferred opportunity potential.

## Fallback / Escalation

- `NO_SIGNAL`: no credible company signal meets the search contract.
- `INSUFFICIENT_EVIDENCE`: a potentially relevant signal exists but cannot be verified sufficiently.
- Escalate when conflicting sources materially change the signal interpretation.

## Validation

Before output, check:

- every material signal has supporting evidence;
- signal strength is separated from vacancy confirmation;
- exclusions were applied;
- inferred role potential is labelled;
- salary/hiring claims are not fabricated;
- every row follows the output contract;
- verification state is explicit.

If validation fails, correct the output or return the appropriate fallback state instead of reporting success.
