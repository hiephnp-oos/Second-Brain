# VERIFICATION

**Baseline:** [R&D Capability Architecture & Contract Baseline](../README.md)  
**Contract version:** Phase 2 implementation  
**Output owner:** Invoking Workstream

## 1. Identity and purpose
A reusable capability that checks whether specific material claims, sources, relationships, mechanisms, status, or findings are supported by available evidence. It performs bounded evidence checks; it does not establish universal truth, prove product feasibility, decide idea disposition, or approve Knowledge release.

## 2. Use cases
1. Check whether a named technology/product/function has a documented precedent and distinguish what is demonstrated from what remains unproven.
2. Check a proposed mechanism or technical relationship against primary/technical evidence and stated operating conditions.
3. Check supplier, specification, compatibility, or performance claims before they support a decision or reusable finding.

## 3. Trigger / non-trigger
**Trigger:** a decision depends on identifiable factual claims; a source, precedent, mechanism, supplier capability, or Knowledge relationship needs a bounded support check; or a workstream must distinguish direct support from inference/unknown/conflict.

**Do not invoke merely because:** the task is broad multi-part exploration (DEEP_RESEARCH); candidate generation (CLAW_DISCOVERY); decision/disposition against criteria (EVALUATION); or a simple explanation not dependent on disputed/decision-critical claims.

**Ambiguity:** state the exact claim and decision relevance. Ask only for context that changes what evidence counts (e.g., target application, operating conditions, market scope). Otherwise proceed with explicit assumptions.

## 4. Inputs and preconditions
**Required:** testable claim(s), decision/application context, and available sources or context to search.  
**Optional:** Knowledge Sheet IDs, prior findings, constraints, idea/candidate ID, source date or jurisdiction.

If underspecified, split compound claims or request the minimum decision-changing context. Do not silently broaden scope.

## Process
Follow the ordered procedure below; use the minimum sufficient evidence check and preserve unresolved states.

## Tools / AI
Use available repository/Knowledge context and research tools. Prefer original documents and inspect relevant passages/data; disclose unavailable access.

## Validation
Apply the quality gates in Section 10 before returning any result.

## Evidence State
Use the shared canonical claim states and keep them separate from verification outcomes as defined in Section 8.

## Human Verification Gate
Human/specialist review is required for consequential unresolved conflicts, physical testing, supplier confirmation, certification, legal/IP interpretation, or authoritative Released Knowledge changes.

## Promotion / Persistence
The invoking Workstream owns the result. VERIFICATION never writes to Released Knowledge; route a reusable candidate through KNOWLEDGE_PROMOTION after review.

## Failure Handling
Stop with UNKNOWN, NOT_VERIFIABLE, or CONFLICTING when evidence/access is insufficient; do not fabricate completion or negative conclusions.

## 5. Procedure
1. Frame each claim as a specific, bounded proposition; split existence, mechanism, performance, compatibility, qualification, and compliance.
2. Record the decision affected and relevant boundary conditions.
3. Inspect supplied Knowledge Sheet/prior work first; distinguish NOT FOUND from NOT LINKED.
4. Plan the minimum sufficient check; prefer primary sources (standards/regulatory sources, patent documents, manufacturer technical documents, literature, test reports, direct supplier documents as applicable).
5. For each source, record what it directly establishes, date/scope/type/limitations, and whether it supports the exact claim or only an adjacent one.
6. Cross-check proportionately when consequential, marketing-led, ambiguous, or conflicting; no arbitrary source-count requirement.
7. Resolve conflicts by comparing scope, definitions, dates, conditions, and source authority. Preserve unresolved material conflicts.
8. Assign claim epistemic state and verification outcome separately (Section 8).
9. State limits, unknowns, assumptions, and checks not performed; identify what evidence/test would change the result.
10. Return a workstream-owned result using Section 9.

## 6. Method selection and routing
Use a bounded check for narrow claims with identifiable evidence. Escalate to DEEP_RESEARCH when multiple interdependent claims, fragmented coverage, unresolved material conflicts, or high decision impact require broader synthesis. Route to EVALUATION only when evidence is sufficiently bounded and a decision against explicit criteria remains. Require human/specialist review for lab testing, supplier confirmation, legal/IP interpretation, or unavailable authority. Desk research cannot establish physical performance.

## 7. Tool boundary
Use available repository/Knowledge context and research tools; inspect original documents and relevant passages/data, not snippets alone. If access/full text/tooling is unavailable, disclose it and return NOT_VERIFIABLE where it blocks conclusion. Never fabricate citations, source IDs, tests, confirmations, or access.

## 8. Evidence and uncertainty
Follow the shared baseline vocabulary: `EVIDENCED`, `INFERRED`, `ASSUMPTION`, `UNKNOWN`, `PROPOSED`, `CONFLICTING`.

**Claim epistemic state** (one per material claim): EVIDENCED = direct support within scope; INFERRED = reasoned but not directly established; ASSUMPTION = working premise; UNKNOWN = insufficient information; PROPOSED = unestablished suggestion; CONFLICTING = incompatible material evidence remains.

**Verification outcome** (separate field): `SUPPORTED`, `PARTIALLY_SUPPORTED`, `CONFLICTING`, `UNSUPPORTED`, `NOT_VERIFIABLE`.

UNSUPPORTED means inspected evidence does not support the claim, not that it is false. NOT_VERIFIABLE/UNKNOWN is not PASS or negative evidence. A source existing does not mean it supports the claim; product existence does not prove hidden mechanism, performance, compatibility, qualification, or compliance. EVIDENCED is not synonymous with independently verified.

## 9. Output contract
Return, as applicable:
- Task/claim ID and decision affected
- Scope, application, conditions, date/market/jurisdiction
- Atomic claim breakdown
- Verification outcome and epistemic state per claim
- Evidence trail: source/link/identifier, date/type, relevant passage/data, source-to-claim fit
- What is established and what is not established
- Conflict/gap and checks not performed
- Next action/route with rationale, or explicit no-handoff
- Invoking Workstream and persistence destination; approval status if relevant

Keep evidence and inference separate. Do not omit decision-critical uncertainty.

## 10. Quality gates
- [ ] Every conclusion maps to an explicit claim.
- [ ] Compound claims are split where evidence differs.
- [ ] Material claims have traceable source-to-claim links or explicit UNKNOWN/NOT_VERIFIABLE.
- [ ] Scope/date/limitations are recorded where material.
- [ ] Existence, mechanism, performance, compatibility, qualification and compliance are not conflated.
- [ ] Claim state and verification outcome are distinct.
- [ ] Missing evidence is not treated as evidence of absence.
- [ ] Conflicts and unperformed checks remain visible.
- [ ] Escalation is justified; no automatic broad research.
- [ ] Result remains owned by the invoking Workstream.

## 11. Handoffs
| Condition | Route | Minimum payload |
|---|---|---|
| Bounded claim answered | Return to invoking Workstream | Claim, scope, outcome/state, sources, limits |
| Broad/interdependent unresolved gap | DEEP_RESEARCH | Claims, decision impact, checked sources, conflict/gap, covered scope |
| Evidence bounded; decision remains | EVALUATION | Findings, uncertainty, constraints, decision question |
| Lab/supplier/legal/IP authority needed | Human/specialist | Exact unresolved claim, why AI evidence is insufficient, required authority/test |
| Reusable finding proposed | KNOWLEDGE_PROMOTION via Workstream | Finding, provenance, state/outcome, reuse rationale, limits; no automatic write |

Do not hand off merely to complete a pipeline. State no-handoff when the bounded question is answered.

## 12. Human gate
Human/specialist review is required for consequential unresolved conflict, proprietary supplier confirmation, physical testing, certification, legal/IP interpretation, or authoritative Released Knowledge/baseline changes. VERIFICATION never approves promotion or product release.

## 13. Failure and stop conditions
Stop with an explicit unresolved result when the claim is not testable without missing context, access/evidence is unavailable, the minimum check is insufficient, conflict remains material, or the requested conclusion exceeds desk research. Use UNKNOWN/NOT_VERIFIABLE/CONFLICTING as appropriate; do not fabricate completion or negative conclusions.

## 14. Persistence boundary
The invoking Workstream owns the result and its canonical destination. VERIFICATION owns no batch, idea record, Knowledge Sheet row, or Released file. Never write to Released Knowledge. Reusable findings may be proposed through KNOWLEDGE_PROMOTION after workstream review and required human approval.

## 15. Examples and tests
- **Existence:** evidence that a showerhead uses UV-LED may establish product/function existence; it does not establish microbial efficacy, dose, safety, or performance unless directly supported.
- **Mechanism:** UX/handle behavior alone does not prove internal construction; seek technical documentation, patent claims, teardown, or mark UNKNOWN/NOT_VERIFIABLE.
- **Supplier compatibility:** verify exact grade, certification scope, conditions and date; a general material-family statement is insufficient.

**Regression:** capability-specific trigger, functional, boundary and failure cases must be recorded in existing Project Improvement Regression artifacts. This contract change alone does not claim functional PASS.
