# EVALUATION

**Baseline:** [R&D Capability Architecture & Contract Baseline](../README.md)  
**Contract version:** Phase 2 implementation  
**Output owner:** Invoking Workstream

## 1. Identity and purpose
A reusable capability that assesses an identified idea, candidate, or finding against decision-relevant criteria and available evidence. It produces bounded decision support, not an autonomous disposition, universal score, proof of novelty, or approval to release Knowledge.

## 2. Use cases
1. Assess whether a product idea addresses a material user/product outcome and whether its proposed mechanism is plausible within stated constraints.
2. Compare a candidate with relevant existing solutions using explicit criteria and evidence, without unsupported overall ranking.
3. Identify decision-critical risks, unknowns, and next evidence needed before a workstream makes a disposition.

## 3. Trigger / non-trigger
**Trigger:** an identifiable idea/finding must be assessed against criteria for a stated decision or use context.

**Do not invoke merely because:** a factual claim needs a bounded evidence check (VERIFICATION); broad conflicting research remains unresolved (DEEP_RESEARCH); new candidates are needed (CLAW_DISCOVERY); or a reusable finding is ready for lifecycle review (KNOWLEDGE_PROMOTION).

**Ambiguity:** identify the decision, target application, and criteria that could change the conclusion. Ask only for missing decision-critical context; otherwise state assumptions and proceed.

## 4. Inputs and preconditions
**Required:** evaluation target, decision/use context, relevant constraints, and available evidence. Criteria may be supplied or derived transparently from the decision context.  
**Optional:** candidate/idea ID, Released Knowledge references, prior evaluations, target market, operating conditions, comparison set, and weighting rationale.

If the target or decision cannot be identified, request the minimum missing context. Missing evidence is not a reason to invent values or force a disposition.

## 5. Process
1. Frame the decision question and identify the target and intended application.
2. Inspect relevant Released Knowledge, prior evaluations, and supplied evidence; record access gaps.
3. Define decision-relevant criteria and explain their relevance. Separate mandatory constraints from preferences.
4. Break the target into material claims; route narrow unresolved claims to VERIFICATION and broad unresolved evidence questions to DEEP_RESEARCH when needed.
5. Assess criterion by criterion: evidence, state, applicability, limitations, and consequence.
6. Evaluate technical/mechanism plausibility, precedent/differentiation, user/product outcome, complexity, implementation constraints, and risks only where relevant.
7. Distinguish demonstrated facts from inference, assumptions, and proposed hypotheses. Do not infer novelty from no precedent found.
8. Synthesize trade-offs and decision-critical unknowns. Use a score only if the user/workstream defines a meaningful scale and weighting; explain its limits.
9. State the decision-support conclusion and viable alternatives without making the workstream's final decision.
10. Route justified follow-up or return the result to the invoking Workstream with an explicit no-handoff where appropriate.

## 6. Method selection and depth control
- Use criterion-by-criterion assessment for a single target.
- Use side-by-side comparison only when options share the same decision frame and evidence basis.
- Use qualitative states where evidence or scales are not comparable; do not manufacture numeric precision.
- Use sensitivity analysis only when changing an assumption/weight could materially change the decision.
- Stop when the decision question is sufficiently bounded or remaining uncertainty requires evidence/authority unavailable to desk research.

## 7. Tools / AI boundary
Use repository context, Released Knowledge, supplied material, and available research tools. Inspect underlying sources where possible. If access or full text is unavailable, disclose it. Never fabricate sources, test results, supplier confirmation, patent status, or calculations. Tool availability does not confer authority to approve decisions or modify Released Knowledge.

## 8. Evidence and uncertainty
Use canonical states: `EVIDENCED`, `INFERRED`, `ASSUMPTION`, `UNKNOWN`, `PROPOSED`, `CONFLICTING`.

- Assign state per material claim/criterion, not to the evaluation as a whole.
- Keep evidence state separate from evaluation conclusion or workstream disposition.
- A source assertion is not automatically independent confirmation.
- Absence of a found precedent does not establish novelty or freedom to operate.
- Do not conflate existence, mechanism, performance, target compatibility, feasibility, qualification/compliance, and legal/IP conclusions.
- Preserve conflicts and unknowns that could change the decision.

## 9. Output contract
Return, as applicable:
- Evaluation ID/title, target, invoking Workstream, and decision/use context
- Scope, application, constraints, assumptions, and comparison set
- Criteria with rationale; mandatory constraints distinguished from preferences
- Criterion-level finding, evidence/source, epistemic state, applicability, and limitation
- Technical feasibility, user/product outcome, precedent/differentiation, complexity, and risk where relevant
- Trade-offs, sensitivity to assumptions, unknowns, and evidence gaps
- Decision-support conclusion and alternatives; no autonomous final disposition
- Next action/route or explicit no-handoff, with rationale
- Output destination and human approval status

## 10. Validation and quality gates
- [ ] Target and decision context are explicit.
- [ ] Criteria are relevant and explained; no hidden universal checklist.
- [ ] Mandatory constraints are distinct from preferences.
- [ ] Material findings map to evidence or explicit uncertainty.
- [ ] Evidence state is not confused with score, conclusion, or disposition.
- [ ] Comparisons use a shared frame; incomparable evidence is not forced into a ranking.
- [ ] Novelty, feasibility, compliance, and performance are not overclaimed.
- [ ] Score/weights, if used, are defined and limitations stated.
- [ ] Decision-critical unknowns and next evidence are visible.
- [ ] Workstream retains final decision and output ownership.

## 11. Escalation and handoffs
| Condition | Route | Minimum payload |
|---|---|---|
| Narrow factual claim unresolved | VERIFICATION | Claim, decision impact, scope, sources checked, exact gap |
| Broad/interdependent or materially conflicting evidence unresolved | DEEP_RESEARCH | Decision question, claims, constraints, checked sources, conflict/gap |
| New candidate solutions needed | CLAW_DISCOVERY | Validated problem/outcome, constraints, evidence, open questions |
| Evaluation supports a proposed reusable finding | KNOWLEDGE_PROMOTION via owning Workstream | Finding, provenance, state, limitations, reuse rationale |
| Evidence sufficient; workstream disposition remains | Return to invoking Workstream | Criterion findings, trade-offs, uncertainty, alternatives |
| Lab, supplier, certification, or legal/IP authority needed | Human/specialist | Exact question, evidence reviewed, limitation, required authority/test |

Do not hand off merely to complete a pipeline.

## 12. Human verification gate
Human/workstream owner retains the final disposition. Human/specialist review is required for consequential unresolved technical risks, physical testing, supplier confirmation, certification/compliance authority, legal/IP interpretation, and durable baseline or Released Knowledge changes.

## 13. Failure handling and stop conditions
Return a bounded inconclusive/unknown result when criteria are missing or unsuitable, evidence is inaccessible, material conflicts remain, or the requested conclusion exceeds available evidence. State what was checked, what remains unresolved, and the minimum next evidence needed. Do not force a score or disposition.

## 14. Promotion / persistence
The invoking Workstream owns evaluation outputs and their canonical destination. EVALUATION owns no idea record, batch, or Knowledge Sheet row. Reusable findings may be proposed through KNOWLEDGE_PROMOTION after workstream review and required human approval. Never write directly to Released Knowledge.

## 15. Examples and tests
- **Insufficient criteria:** identify decision-changing missing criteria; do not invent universal weights.
- **No precedent found:** report search scope and NOT FOUND; do not claim novelty.
- **Incomparable options:** state why evidence is not comparable; avoid overall ranking.
- **Regression:** capability-specific cases belong in Project Improvement Regression artifacts. Contract completeness alone is not functional PASS.

