# Phase 3 — P3-A02 Test-Planning Boundary Analysis

**Plan action:** P3-A02 — Determine whether DEEP_RESEARCH / EVALUATION can handle test planning without boundary confusion  
**Inputs:** P3-A01 case register; current Phase 2 DEEP_RESEARCH and EVALUATION contracts  
**Status:** Analysis only; no CAP-06 decision or implementation approval

## 1. Question

Can the current capabilities express a useful next-test recommendation, or is there a distinct reusable responsibility for designing physical experiments?

## 2. Contract evidence

### DEEP_RESEARCH already covers
- Distinguishing desk-research feasibility from experimentally demonstrated performance (Procedure §5.9).
- Defining falsification/material-change evidence for claims (Procedure §5.4).
- Returning verification/test/specialist actions with rationale and what they resolve (Output §9).
- Routing physical testing to a human/specialist with question, evidence, limitation and required test (Handoff §11; Human gate §12).
- Explicitly refusing to imply that desk research proves physical performance (§8, §13).

**Boundary:** this is enough to identify *why* testing is needed and *what uncertainty* it should resolve. It does not define a reusable experimental-design method (factor selection, controls, response variables, sample/repeat strategy, acceptance criteria, measurement system, safety review, or protocol).

### EVALUATION already covers
- Criterion-level assessment and decision-critical unknowns (§5).
- Identifying next evidence and routing physical testing to human/specialist (§9, §11–13).
- Retaining final disposition with the workstream/human.

**Boundary:** EVALUATION can explain how a test result could affect a decision. It does not own experiment design, test execution, lab data, or technical approval.

## 3. Case-by-case fit

| P3-A01 case | DEEP_RESEARCH can identify unresolved question? | EVALUATION can connect result to decision? | Remaining test-design need |
|---|---|---|---|
| P3-CASE-01 spray/rinsing and fine mist | YES | YES, if a target outcome and baseline are supplied | Define measurable spray/rinse/mist responses, operating envelope, baseline/control and method |
| P3-CASE-02 thermal microbial-control transfer | YES | YES, if target conditions and safety constraints are supplied | Define thermal profile, delivered-water limits, system boundary, measurement and safety review |
| P3-CASE-03 localized microbial intervention | YES | YES, if efficacy/safety decision criteria are supplied | Define validated efficacy method, exposure conditions, controls, material and water-safety checks |
| P3-CASE-04 pressure-responsive flow paths | YES | YES, if comparison decision and baseline are supplied | Define pressure/flow matrix, spray responses, comparative baseline, repeatability and failure modes |

## 4. Root-cause finding

The current contracts do not show a gap in *recognizing* physical uncertainty or routing it. The potential gap is narrower: converting a physical uncertainty into a defensible, decision-linked test design. This is a different activity from desk research and evaluation, but the four cases alone do not establish its frequency, cross-workstream reuse, or whether a concise conditional reference would suffice.

## 5. P3-A02 conclusion

**Current capabilities are sufficient for test-need identification and decision linkage; they are not a defined experiment-design method.** No evidence supports adding test execution, lab-data ownership, or automatic test authorization to any capability.

Recommended boundary for P3-A03:
- Keep DEEP_RESEARCH responsible for evidence synthesis, uncertainty statement, and test question.
- Keep EVALUATION responsible for decision criteria and explaining how possible results affect the decision.
- Keep physical protocol design/execution and lab data with the qualified human/test owner.
- Assess whether a conditional, workstream-neutral test-design reference is reused across enough cases/workstreams to justify CAP-06. Do not create a capability folder yet.

## 6. Limitations

- Four cases are from one recent Claw batch, not a representative frequency sample.
- No lab/test owner was interviewed; actual local test-design workflow is not documented in these inputs.
- No test was designed or executed in this analysis.
- P3-A03 reuse/frequency evidence and P3-A04 human-approved disposition remain open.
