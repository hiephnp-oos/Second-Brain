# R&D Regression Cases

These cases are the minimum recurring/material checks for R&D Innovation real-output evaluation.

They are regression expectations, not automatic semantic scores.

| ID | Failure class | Applies to | Expected behavior | Evidence from baseline |
|---|---|---|---|---|
| RND-REG-001 | Technology presented as innovation | CLAW_DISCOVERY / IDEA_REVIEW | A technology or mechanism alone must not become a standalone product idea without a material user/product outcome and meaningful DELTA. | Batch #1 C-20260921-C03 was classified DROP / BASELINE because no distinct benefit was established. |
| RND-REG-002 | Existing-solution collision | CLAW_DISCOVERY / IDEA_REVIEW | Check commercial precedent, prior art, Knowledge Sheet, and prior batches before treating an idea as new. | Batch #1 C-20260922-C03 was dropped as duplicate; Batch #2 contains multiple explicit existing-solution failures. |
| RND-REG-003 | Prior-batch duplicate | CLAW_DISCOVERY | A materially repeated candidate should be identified as duplicate/saturated rather than regenerated as a new discovery. | Batch #2 C-23-02 explicitly references the 2026-09-21 prior candidate and is marked DROP / DUPLICATE. |
| RND-REG-004 | Weak user/product outcome | CLAW_DISCOVERY / IDEA_REVIEW | The benefit must be observable/testable and materially relevant; technical novelty alone is insufficient. | Batch #1 C-20260921-C03 and C-20260922-C03 provide negative examples. |
| RND-REG-005 | Transferability overclaim | CLAW_DISCOVERY / PERSONAL_RESEARCH | Cross-industry technology remains a transfer candidate when target-environment evidence is unresolved. Unknown transfer limits must remain explicit. | Batch #1 C-20260920-C02/C04 and Batch #2 C-24-02 preserve unresolved transferability. |
| RND-REG-006 | Complexity without justified benefit | CLAW_DISCOVERY / IDEA_REVIEW | Added BOM, seals, moving parts, sensors, energy, manufacturing, noise, packaging, or reliability risk must have an identified benefit that justifies the complexity. | Defined in the Discovery Quality Gate; future runs must verify whether the rule is actually applied. |
| RND-REG-007 | Strategic-scope leakage | CLAW_DISCOVERY | Technically credible problems outside the active strategic/product scope should not consume discovery capacity as standalone ideas. | Batch #2 implementation plan records C-24-01 as a test signal for scope gating. |
| RND-REG-008 | Unsupported mechanism / hidden-mechanism claim | CLAW_DISCOVERY / PERSONAL_RESEARCH / DEEP_ANALYZE | Product existence or advertised function must not be converted into an unverified internal mechanism. Missing evidence remains UNKNOWN / PROPOSED. | Canonical evidence rules in R&D README and capability contracts. |
| RND-REG-009 | Evidence-state collapse | All R&D capabilities | VERIFIED/EVIDENCED, INFERRED, ASSUMPTION, UNKNOWN, and PROPOSED must remain distinguishable. | Required by all six capability contracts and Prompt contracts. |
| RND-REG-010 | Staging treated as source of truth | CLAW_DISCOVERY / KNOWLEDGE_PROMOTION | Staging is intermediate candidate state. It must not be treated as authoritative Knowledge Sheet state. | Repository contract and Claw capability contract. |
| RND-REG-011 | Promotion without human verification | KNOWLEDGE_PROMOTION | A reusable candidate must pass evidence, duplicate, contradiction, and human verification gates before Knowledge Sheet promotion. | Knowledge Promotion contract explicitly requires the human gate. |
| RND-REG-012 | Evidence gap silently filled | PERSONAL_RESEARCH / EVALUATE / DEEP_ANALYZE | If a material criterion cannot be established, record UNKNOWN/open question and route for further research instead of inventing a value. | Capability failure-handling contracts. |

## How to use the cases

For each batch/run, record:

- PASS — observed behavior satisfies the case.
- FAIL — observed behavior violates the case.
- NOT OBSERVED — the case was not exercised by the run.
- INCONCLUSIVE — evidence is insufficient to determine pass/fail.

Do not convert NOT OBSERVED into PASS.

A case should become a permanent baseline regression case only when the failure pattern is recurring/material or the case protects a critical invariant.
