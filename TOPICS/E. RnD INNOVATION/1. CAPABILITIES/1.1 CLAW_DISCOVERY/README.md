# CLAW_DISCOVERY

**Baseline:** [R&D Capability Architecture & Contract Baseline](../README.md)  
**Output owner:** Invoking Workstream; scheduled Claw output is owned by PERSONAL_RESEARCH.

## 1. Identity and purpose
Reusable capability for exploring a scoped problem, opportunity, technology signal, or evidence gap and producing traceable candidate solutions/findings. Discovery generates candidates; it does not make final idea disposition or promote authoritative Knowledge.

## 2. Use cases
1. Generate candidate product/technology responses to a defined user or product problem.
2. Explore a technology signal and assess whether it can enable a target capability under stated conditions.
3. Identify candidate opportunities from a material evidence gap, while distinguishing signal, mechanism, product capability, and standalone idea.

## 3. Trigger / non-trigger
**Trigger:** an R&D Workstream needs structured candidate generation from a defined problem, opportunity, constraint, or signal.

**Do not invoke merely because:** a known claim needs checking (VERIFICATION); broad evidence synthesis is needed (DEEP_RESEARCH); an identified candidate needs decision-criteria assessment (EVALUATION); or a finding is ready for Knowledge lifecycle review (KNOWLEDGE_PROMOTION).

**Ambiguity:** route by the primary task. If problem/outcome or target scope is missing and changes candidate generation, ask; otherwise state assumptions and bound discovery.

## 4. Inputs and preconditions
**Required:** scoped problem/opportunity/signal, target product/application or explicit exploratory boundary, constraints, and intended output.  
**Optional:** Knowledge Sheet context, prior daily candidates, competitor/supplier evidence, target user, strategic scope, technical constraints, and evidence gaps.

If scope or target boundary is unavailable, do not generate unbounded candidates. State the missing input and request only what changes the search.

## 5. Procedure
1. Confirm workstream, problem, desired outcome, target boundary, constraints, and decision/use context.
2. Inspect relevant Released Knowledge, candidate/test material, prior daily records, historical batch records, reviewed outcomes/lessons, and existing-solution evidence; preserve source authority and status. For recurring discovery, retrieve all available historical batch files and at least the previous 7 daily records before convergence; record unavailable sources explicitly.
3. Separate the observed problem/signal from proposed solution and mechanism.
4. Explore relevant solution spaces and generate candidates from distinct response principles, not superficial rewordings.
5. For each candidate, state target outcome, proposed capability, mechanism hypothesis, system boundary, and meaningful difference from baseline/existing solutions.
6. Check commercial precedent, prior art where relevant, Knowledge Sheet, prior daily records, and historical candidate records; record search scope and unresolved coverage. Compare candidates semantically by problem/outcome, mechanism, and target application; record matched IDs and whether each is a duplicate, related variant, or no match.
7. Assess evidence and transferability to the target conditions. Keep cross-industry concepts as transfer candidates until target evidence supports applicability.
8. Apply quality gates: material user/product outcome, meaningful delta, strategic fit, evidence traceability, complexity justified by benefit, and no duplicate/saturated candidate.
9. Classify candidate and claim states; preserve unknowns and conflicts. Do not turn a technology or mechanism alone into a standalone product idea.
10. Return structured candidates and evidence gaps to the invoking Workstream; route specific unresolved claims or broad conflicts only when warranted.

## 6. Method selection and depth control
- Start with the narrowest search space implied by the problem and constraints.
- Use divergent candidate generation only after the problem/outcome is clear.
- Use precedent/duplicate checks before treating a candidate as differentiated.
- Expand to adjacent industries only when the transfer mechanism and target relevance can be stated.
- Use deeper research for broad, fragmented, conflicting, or decision-critical gaps; use VERIFICATION for narrow claims.
- For scheduled Personal Research discovery, use the Iterative Discovery rule in RS-12: a DROP/DUPLICATE does not end the search. First test whether a materially different outcome, physical capability, or architecture can be defined; if not, return to RS-10/RS-11 to explore a genuinely different candidate space.
- Stop only when the requested discovery has produced one or more candidates at least at WATCH, or a documented hard blocker prevents responsible continuation. Do not fabricate candidates, weaken gates, or relabel a rejected candidate to satisfy the stop condition.
- A WATCH result is a discovery stopping threshold, not technical validation, feasibility approval, or automatic promotion to IDEA_REVIEW.

## 7. Tool boundary
Use current repository Knowledge and prompts plus external research tools only when available and authorized by the invoking Workstream. Do not imply access to paywalled sources, patent databases, supplier confirmation, physical testing, or live market data unless actually available. Record search limits. Never fabricate sources, product features, mechanisms, or test results.

## 8. Evidence and uncertainty
Use canonical states: `EVIDENCED`, `INFERRED`, `ASSUMPTION`, `UNKNOWN`, `PROPOSED`, `CONFLICTING`.

- Distinguish product existence, advertised function, internal mechanism, performance, target compatibility, feasibility, and novelty/IP.
- A technology signal or mechanism is not by itself a product idea.
- Cross-industry precedent does not establish transferability to the target.
- Absence of found evidence is not evidence of absence or proof of novelty.
- Candidate class/disposition fields used by a Workstream do not replace claim-level evidence states.
- Keep unresolved source conflicts and target-condition gaps explicit.

## 9. Output contract
Return, as applicable, for each candidate:
- Candidate ID and concise title
- Problem/opportunity and intended user/product outcome
- Candidate class (e.g. technology signal, technical enabler, product capability, standalone idea), using the invoking Workstream's schema
- Proposed response and mechanism hypothesis, clearly labeled
- Target boundary, operating conditions, constraints, and assumptions
- Meaningful delta versus baseline and known existing solutions
- Evidence/source links mapped to claims and evidence state
- Precedent/duplicate search scope and limitations
- Strategic fit and complexity/risk rationale
- Unknowns, transferability limits, and required verification/test
- Proposed next route and invoking Workstream ownership

Do not invent a universal score or disposition. Use the active Workstream's required output schema.

## 10. Validation and quality gates
- [ ] Problem, target, and intended outcome are explicit.
- [ ] Candidate is more than a technology name or mechanism.
- [ ] User/product outcome is material and observable/testable.
- [ ] Meaningful delta and existing-solution/duplicate checks are documented, including historical candidate sources checked and matched IDs.
- [ ] If a candidate is DROP/DUPLICATE, the search continues through a DELTA test or a genuinely new candidate until WATCH or a documented hard blocker; no artificial quota or fabricated candidate is used.
- [ ] Candidate class is not conflated with evidence state or disposition.
- [ ] Cross-industry transfer limits remain explicit.
- [ ] Added complexity is tied to a justified benefit.
- [ ] Strategic-scope fit is considered.
- [ ] Claims are traceable; hidden mechanisms are not inferred as facts.
- [ ] Output follows the invoking Workstream schema and remains workstream-owned.

## 11. Escalation and handoffs
| Condition | Route | Minimum payload |
|---|---|---|
| Narrow material claim/source needs checking | VERIFICATION | Claim, candidate ID, source, scope, decision impact |
| Broad/conflicting/fragmented evidence gap | DEEP_RESEARCH | Question, target boundary, claims, evidence checked, conflict/gap |
| Candidate needs criteria-based assessment | EVALUATION | Candidate, outcome, constraints, evidence, decision context |
| Reusable finding proposed for authoritative Knowledge | KNOWLEDGE_PROMOTION via Workstream | Finding, provenance, evidence state, limitations, reuse rationale |
| Candidate generation complete | Return to invoking Workstream | Candidate set, schema, evidence, unknowns, proposed next route |

## 12. Human verification gate
Human review is required before final KEEP/DROP or equivalent workstream disposition where required by the Workstream, and before any durable baseline or Released Knowledge change. Discovery output is not approval.

## 13. Failure handling and stop conditions
If scope, evidence access, or required target conditions are unavailable, return a bounded failure/inconclusive result and state the missing input. If no material outcome or meaningful delta is established, do not force a candidate; record the reason. Do not fabricate candidates to meet a count. Stop when the scope is answered or remaining uncertainty requires a specific test, source, or authority.

## 14. Persistence boundary
Execution output belongs to the invoking Workstream. For scheduled Claw, the canonical output location is `TOPICS/E. RnD INNOVATION/2. WORKSTREAMS/2.1 PERSONAL_RESEARCH/`. Exactly one scheduled execution runs per local date and creates or recovers `RUN_SLOT 01` in the date-specific daily record directly under PERSONAL_RESEARCH; the Workstream owns that record. There are no active RUN_SLOT 02/03 executions. If a matching slot already exists, verify it rather than duplicating it. No staging or batch workflow is used. This capability owns no Knowledge Sheet rows. Reusable findings enter KNOWLEDGE_PROMOTION through the Workstream and required human gate.

## 15. Examples and tests
- **Technology-only signal:** classify as a signal/enabler; do not elevate to standalone idea without outcome and delta.
- **Prior-batch duplicate:** identify prior candidate and preserve duplicate disposition under Workstream rules.
- **Cross-industry technology:** retain as transfer candidate until target-condition evidence exists.
- **Regression:** apply RND-REG-001–010 and relevant later cases in Project Improvement. Contract completeness is not functional PASS.


## Scheduler and cadence
The scheduler is a trigger/orchestration layer only; it does not redefine discovery methods, own outputs, or authorize Knowledge promotion. Scheduled Claw execution follows the cadence and run-date semantics defined by the active PERSONAL_RESEARCH scheduler contract. This capability does not establish a second cadence or override that source. The execution date recorded in an output must reflect the scheduled run's intended local date, not the previous UTC date or workflow start date. If the scheduler context is missing or ambiguous, do not infer a date; record the limitation and request clarification.

