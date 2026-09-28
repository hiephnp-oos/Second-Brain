# CLAW_DISCOVERY Real-Output Regression — 2026-09-26 to 2026-09-28

## Run
- Run ID: CLAW-REAL-2026-09-26_28
- Capability: CLAW_DISCOVERY
- Workstream: PERSONAL_RESEARCH / scheduled Claw
- Input/output source:
  - `2.1 PERSONAL_RESEARCH/batches/2026-09-26_to_2026-09-28.csv`
  - `2.1 PERSONAL_RESEARCH/staging/2026-09-28.md`
- Evaluation type: retrospective real-output review of repository artifacts; not a newly executed scheduler run.
- Human disposition: not performed in this review.
- External source validation: not performed; links and source contents were not independently re-fetched.

## Regression results

| Case ID | Result | Evidence / observation |
|---|---|---|
| RND-REG-027 | PASS | C-26-03, C-27-03 and C-28-03 are classified BASELINE and dropped for existing-solution/technology collision; the output does not promote a technology signal alone to a new idea. |
| RND-REG-028 | PASS | Candidates state problem/opportunity, target application and intended outcome; no fixed candidate quota is used. |
| RND-REG-029 | PASS | Batch records Knowledge Sheet references and prior discovery collision; C-27-03 explicitly identifies duplication of the 2026-09-26 discovery. Coverage of all prior batches cannot be established from this artifact alone. |
| RND-REG-030 | PASS | C-27-02 and C-28-02 preserve target transfer, safety, compliance, energy and system-boundary uncertainties as unresolved; disposition remains WATCH. |
| RND-REG-031 | PASS | Candidate class, evidence status, quality-gate result and discovery disposition are separate fields in the batch schema and populated distinctly in sampled rows. |
| RND-REG-032 | INCONCLUSIVE | Risks/unknowns are recorded, but the output does not consistently demonstrate an explicit benefit-versus-added-complexity rationale for each candidate. |

## Mechanical / boundary observations
- Batch schema includes candidate class, evidence status, quality gate, reason, disposition and uncertainty fields.
- Staging explicitly says human review was not performed and that the output is discovery material only.
- No Released Knowledge write or promotion was attempted.
- This review does not validate the cited external sources, scheduler execution, or end-to-end downstream handoff.

## Summary
- PASS: 5
- FAIL: 0
- INCONCLUSIVE: 1
- NOT OBSERVED: external source validation, live scheduler execution, downstream EVALUATION handoff, KNOWLEDGE_PROMOTION, human approval, and persistence verification.

## Follow-up
1. For RND-REG-032, inspect the next comparable batch or add an explicit complexity-benefit field only if repeated real outputs show this gap.
2. Run an observed handoff into EVALUATION using a selected WATCH candidate; preserve workstream ownership.
3. Keep Gate G2 open. This single capability run cannot close Phase 2.
