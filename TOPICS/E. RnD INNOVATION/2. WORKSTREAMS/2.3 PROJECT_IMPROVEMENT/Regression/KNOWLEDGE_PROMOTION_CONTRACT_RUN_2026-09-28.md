# KNOWLEDGE_PROMOTION Contract-Level Regression — 2026-09-28

## Run
- Run ID: KNOWLEDGE-PROMOTION-CONTRACT-2026-09-28
- Capability: KNOWLEDGE_PROMOTION
- Contract commit: `de6aa468e49dbf47e06fac49daa54e0cf26b6175` (PR #31)
- Evaluator: controlled fixture review
- Baseline: shared capability contract, Knowledge lifecycle, and RND-REG-033–038
- Input: six synthetic promotion fixtures; no real candidate promotion output was supplied.

## Method and limitation
Each fixture checks whether the contract prescribes safe, bounded behavior. This is contract-level regression, not evidence of correct handling of actual Knowledge records or improved real-world promotion. Real-output regression is NOT OBSERVED.

## Results
| Case | Result | Observation |
|---|---|---|
| RND-REG-033 | PASS | Workstream/Candidate-Test material remains non-authoritative; only approved and validated changes enter Released Knowledge. |
| RND-REG-034 | PASS | Explicit approval of the specific candidate and proposed change is required before write. |
| RND-REG-035 | PASS | Missing source-to-claim provenance results in HOLD; source existence alone is insufficient. |
| RND-REG-036 | PASS | Exact/near duplicates and contradictions are checked; unresolved conflict is held and change type is explicit. |
| RND-REG-037 | PASS | Canonical IDs and existing relationship/source IDs must be validated; IDs are not recycled. |
| RND-REG-038 | PASS | Ready/approved is distinguished from persisted; post-write reread and validation are required before success. |

## Summary
- Controlled cases: 6/6 PASS.
- PR-head repository validator: PASS, workflow run `36392924173` (contract-only head); this report adds a new commit and requires a fresh run.
- Real-output regression: NOT OBSERVED.
- No claim of operational effectiveness or correctness on actual Knowledge data is made.

## Follow-up
Apply RND-REG-033–038 to the next actual candidate promotion before claiming real-output effectiveness.