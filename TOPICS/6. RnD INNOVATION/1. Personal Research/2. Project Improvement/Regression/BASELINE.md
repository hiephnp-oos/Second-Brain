# R&D Regression Baseline

## Baseline scope

The current baseline uses the two most recent completed Claw batches available in the repository:

- `2026-09-20_to_2026-09-22.csv`
- `2026-09-23_to_2026-09-25.csv`

This document records what is known about those runs. It is not a performance scorecard.

## Observed schema change

Batch `2026-09-20_to_2026-09-22` uses the earlier Claw batch contract.

Batch `2026-09-23_to_2026-09-25` adds explicit:

- `Candidate_Class`
- `Quality_Gate_Result`
- `Quality_Gate_Reason`

Therefore the two batches are not a controlled A/B comparison for overall quality.

## Useful baseline observations

The first batch contains concrete negative examples for:

- baseline technology presented as a candidate;
- duplicate/prior-art collision;
- technology with unresolved transferability;
- technically plausible mechanisms with unresolved product value.

The second batch demonstrates explicit Quality Gate decisions, including:

- `FAIL` for existing-solution / meaningful-delta problems;
- `WATCH` where transferability or measurable benefit remains unresolved;
- `DROP` for baseline/duplicate candidates.

These observations establish regression expectations, not proof of improvement.

## What the next comparable runs must establish

Batches #3 and #4 should be evaluated using the same `Regression/CASES.md` contract.

The comparison should focus on whether the current experimental rules:

- reduce repeated baseline/duplicate leakage;
- preserve valid transfer candidates instead of rejecting them prematurely;
- make user/product DELTA explicit;
- reduce unsupported mechanism claims;
- preserve evidence-state distinctions;
- preserve staging and human-promotion boundaries;
- avoid suppressing valid opportunities.

Do not optimize for KEEP count alone.

## Promotion threshold

No regression observation automatically changes the R&D baseline.

A rule/prompt/workflow change requires:

1. observed failure or improvement;
2. sufficient evidence that the pattern is material;
3. comparison against subsequent real outputs;
4. human verification;
5. explicit promotion.
