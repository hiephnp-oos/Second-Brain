# VERIFICATION Functional Regression — 2026-09-28

## Run

- Run ID: VER-REG-20260928-01
- Execution date: 2026-09-28
- Capability: VERIFICATION
- Contract: `1. CAPABILITIES/1.2 VERIFICATION/README.md` (Phase 2)
- Evaluator: ChatGPT-assisted contract test; human review required for semantic promotion
- Baseline: Phase 1 shared capability contract + VERIFICATION Phase 2 contract
- Input/output source: controlled test fixtures documented below; not a real supplier/product research batch

## Test method and limitation

Each fixture was passed through the VERIFICATION contract as an execution simulation: identify claim(s), choose state/outcome, define source-to-claim boundary, and decide routing/stop behavior. PASS means the contract yields the expected behavior for this fixture. It does **not** mean the underlying real-world technology claim was researched or verified. No external source was inspected in this run.

## Functional test cases

| Test ID | Input fixture | Expected behavior | Observed behavior | Result |
|---|---|---|---|---|
| VER-F01 | “A product page advertises UV-LED in a showerhead; therefore it disinfects water effectively.” | Split product/function existence from efficacy; marketing page cannot establish efficacy without performance evidence. | The claim is split into existence/function and efficacy. Efficacy is UNKNOWN / NOT_VERIFIABLE absent test evidence; no efficacy conclusion is inferred from the product page. | PASS |
| VER-F02 | “The handle moves in two directions; therefore the mixer contains an integrated axial diverter cartridge.” | Do not infer hidden mechanism from UX alone; seek direct technical evidence or preserve unknown. | Internal mechanism remains UNKNOWN / NOT_VERIFIABLE; requested evidence is technical drawing, patent claim, teardown, or equivalent direct documentation. | PASS |
| VER-F03 | “Supplier says polymer family X is suitable; therefore exact grade Y is compliant for potable water at condition Z.” | Separate family-level statement from exact grade, certification scope, and conditions. | Claim is decomposed; family-level evidence does not support grade Y / condition Z. Outcome PARTIALLY_SUPPORTED only if family claim itself is evidenced; exact suitability remains NOT_VERIFIABLE. | PASS |
| VER-F04 | “No matching product was found in the searched repository.” | Distinguish NOT FOUND from non-existence; do not treat absence in repository as negative evidence. | Result is scoped to repository search only; existence remains UNKNOWN, not UNSUPPORTED. | PASS |
| VER-F05 | Two sources report incompatible operating limits under apparently different test conditions. | Compare scope/method/date; preserve material conflict if not reconcilable; escalate only with rationale. | Conditions are compared; unresolved material disagreement receives CONFLICTING state/outcome and a targeted escalation payload. | PASS |
| VER-F06 | Narrow claim has one directly relevant, inspectable primary technical document with matching conditions and no material conflict. | Apply bounded check; no arbitrary source count and no automatic DEEP_RESEARCH handoff. | Claim is marked EVIDENCED / SUPPORTED within the document's scope; returns to invoking Workstream with limitations and no handoff. | PASS |
| VER-F07 | User asks for broad market landscape involving multiple technologies, markets, and interdependent claims. | Do not force VERIFICATION to conduct broad synthesis; route to DEEP_RESEARCH. | Scope exceeds bounded check; handoff includes claims, decision impact, covered scope, and known gaps. | PASS |
| VER-F08 | Evidence cannot be accessed or full text is unavailable, and the missing content is necessary to decide. | Disclose access limitation; return NOT_VERIFIABLE; do not imply inspection. | NOT_VERIFIABLE is returned with exact missing access and next evidence needed. | PASS |
| VER-F09 | Bounded claim is supported, but user asks whether the idea should be KEEP/DROP. | Verification does not decide disposition; route to EVALUATION only with explicit criteria. | Evidence result is returned separately; disposition is not assigned by VERIFICATION. | PASS |
| VER-F10 | Reusable finding appears suitable for Knowledge Sheet. | No direct write/promotion; route through owning Workstream and KNOWLEDGE_PROMOTION with human gate. | Persistence boundary is preserved; no Released Knowledge write occurs. | PASS |

## Regression cases

| Case ID | Result | Evidence / observation | Source location |
|---|---|---|---|
| RND-REG-008 | PASS | VER-F01/02 reject mechanism/performance overreach from existence, marketing, or UX evidence. | This run, VER-F01–02 |
| RND-REG-009 | PASS | VER-F01–05 keep claim state distinct from verification outcome; UNKNOWN/NOT_VERIFIABLE is not negative evidence. | This run, VER-F01–05 |
| RND-REG-013 | PASS | VER-F01/03/05/08 demonstrate separate epistemic state and outcome, including partial and inaccessible evidence. | This run, VER-F01/03/05/08 |
| RND-REG-014 | PASS | VER-F01/02/03 enforce source-to-claim fit and reject adjacent-claim overreach. | This run, VER-F01–03 |
| RND-REG-015 | PASS | VER-F06 remains bounded; VER-F07 escalates only because scope is broad/interdependent. | This run, VER-F06–07 |

## Mechanical checks

- Contract sections and required gates present: PASS (manual structural review)
- Claim state / outcome vocabulary separated: PASS
- Persistence and human gate preserved: PASS
- Workstream routing boundaries present: PASS
- Repository validator / CI: pending PR run
- Real external-source verification: NOT OBSERVED
- Real Workstream output integration: INCONCLUSIVE (fixtures only)

## Summary

### Observed improvements
The Phase 2 contract gives deterministic handling for common boundary failures: claim splitting, source-to-claim fit, NOT FOUND vs non-existence, uncertainty vs negative evidence, bounded routing, and persistence ownership.

### Failures
No failure observed in the controlled fixtures. This is not evidence that all real executions will comply.

### Limitations / open validation
1. No real research task with inspected external sources was executed.
2. No live Prompt.csv execution was run; integration is assessed from contract/routing artifacts only.
3. Human review is still required to accept semantic behavior in subsequent real runs.

### Decision
- Functional contract regression: PASS for the 10 controlled fixtures and 5 applicable regression cases.
- Real-world / production regression: NOT YET ESTABLISHED.
- Capability readiness: contract-level PASS; proceed to DEEP_RESEARCH only with the above limitation carried forward.
- Human decision: REVIEW REQUIRED before treating this as empirical validation.

## Promotion

This run records test evidence only. It does not change the shared baseline or promote any Knowledge.
