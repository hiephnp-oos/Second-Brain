# DEEP_RESEARCH

**Baseline:** [R&D Capability Architecture & Contract Baseline](../README.md)  
**Contract version:** Phase 2 implementation  
**Output owner:** Invoking Workstream

## Contract validator alignment

This contract explicitly covers the required baseline controls:
- **Process:** Sections 5–6 define the ordered research process and depth selection.
- **Evidence state:** Section 8 defines canonical claim states and uncertainty.
- **Escalation:** Section 11 defines routing and escalation conditions.
- **Human verification gate:** Section 12 defines mandatory human/specialist review.
- **Promotion / persistence:** Section 14 defines ownership and persistence boundaries.
- **Failure handling:** Section 13 defines stop conditions and unresolved outcomes.

## 1. Identity and purpose
A reusable capability for investigating broad, interdependent, conflicting, high-risk, or decision-critical R&D questions that cannot be closed by minimum sufficient targeted verification. It produces an auditable synthesis and bounded next actions; it does not establish universal truth, execute physical tests, make idea dispositions, interpret legal rights, or approve Knowledge release.

## 2. Use cases
1. Investigate a technology transfer across source and target applications where several conditions (e.g., pressure, temperature, materials, contamination, package, durability) interact.
2. Reconcile fragmented or conflicting technical, supplier, patent, literature, and commercial evidence relevant to a decision.
3. Build a technical landscape or architecture comparison where multiple claims and evidence types must be synthesized with explicit limits.

## 3. Trigger / non-trigger
**Trigger:** broad/interdependent questions; material conflict not resolvable by a bounded check; high decision impact; fragmented evidence across source types; or explicit research synthesis request.

**Do not invoke merely because:** one narrow claim can be checked with minimum sufficient evidence (use VERIFICATION); the task is candidate generation (CLAW_DISCOVERY); a decision against explicit criteria is the primary task (EVALUATION); or a simple explanation/lookup is sufficient.

**Ambiguity:** define the decision, target application, boundaries, and what would change the decision. Ask only for missing context that materially changes scope or evidence requirements; otherwise state assumptions and proceed.

## 4. Inputs and preconditions
**Required:** research question, decision/use context, target application or scope, known constraints, and known evidence/gaps.  
**Optional:** Knowledge Sheet IDs, prior research, candidate/idea ID, target markets, time window, supplier/competitor set, operating conditions, depth/time constraints.

If scope is too broad, propose a bounded research question or split into work packages. Do not silently assume a market, application, or performance target.

## 5. Procedure
1. **Frame:** translate the request into decision-linked research questions; separate primary questions from supporting claims.
2. **Baseline:** inspect relevant Released Knowledge and prior work first; record what is found, not found, and not linked.
3. **Scope:** define target application, system boundary, conditions, geography/date where relevant, exclusions, and stop criteria.
4. **Map claims:** decompose into atomic claims; identify evidence needed and what would falsify or materially change each.
5. **Source plan:** prioritize primary/technical sources appropriate to each claim (standards/regulatory records, patents, manufacturer/supplier documents, test reports, peer-reviewed literature, credible market/product records). Use secondary sources for discovery/context, not as substitutes where primary evidence is available.
6. **Investigate:** inspect source documents and relevant passages/data, not snippets alone. Record source identity, date, scope, method, limitations, and source-to-claim fit. Distinguish source assertions from independently established evidence.
7. **Analyze:** compare mechanisms, architectures, boundary conditions, performance evidence, implementation constraints, competitor/supplier signals, and patent signals where relevant. Do not infer hidden mechanisms or target compatibility from product existence/UX.
8. **Resolve:** reconcile conflicts by scope, definitions, methods, dates, sample/population, and authority. Preserve unresolved material conflict; do not average incompatible evidence.
9. **Assess feasibility boundary:** distinguish demonstrated source capability, target transfer hypothesis, engineering plausibility, product feasibility, qualification/compliance, and physical validation. Desk research cannot establish lab performance.
10. **Synthesize:** answer each research question with evidence, inference, assumptions, unknowns, and confidence/limitations explicitly separated.
11. **Route:** identify targeted follow-up, VERIFICATION, EVALUATION, human/specialist review, or no handoff. Do not hand off merely to complete a pipeline.
12. **Return:** deliver a traceable workstream-owned report using Section 9.

## 6. Method selection and depth control
- Use **targeted verification** for a small number of bounded claims.
- Use **comparative synthesis** when multiple options share a defined decision frame.
- Use **mechanism/architecture analysis** when internal function or system interaction matters; require technical evidence and mark unsupported construction as UNKNOWN/PROPOSED.
- Use **transferability analysis** to compare source and target boundary conditions; classify transfer as demonstrated, partially supported, plausible/inferred, or unknown in prose, while retaining canonical epistemic states for claims.
- Use **patent/prior-art mapping** when relevant; identify documents, claims/families/status as available. Search results or absence of found documents do not establish novelty, freedom to operate, or legal interpretation.
- Scale source breadth to consequence and uncertainty. No arbitrary minimum source count. Stop when the decision question is sufficiently bounded or remaining gaps require authority/testing unavailable to desk research.

## 7. Tools / AI boundary
Use repository/Released Knowledge and available research tools. Prefer original documents and inspect relevant passages/data. If access, full text, or tool capability is unavailable, disclose it and mark affected claims UNKNOWN / NOT_VERIFIABLE. Never fabricate sources, citations, tests, supplier confirmations, patent status, or access. Tool output is evidence only to the extent its underlying source and scope are inspectable.

## 8. Evidence and uncertainty
Follow the shared baseline vocabulary: `EVIDENCED`, `INFERRED`, `ASSUMPTION`, `UNKNOWN`, `PROPOSED`, `CONFLICTING`.

- Assign state per material claim/finding, not to the report as a whole.
- Keep verification outcome (if a bounded verification task was performed) separate from epistemic state.
- Separate: existence; advertised function; internal mechanism; performance; target compatibility; qualification/compliance; product feasibility; novelty/IP.
- A source's assertion is not automatically independent confirmation.
- Missing evidence is not evidence of absence. No found precedent does not prove novelty.
- Transferability from another industry remains an inference/hypothesis until target conditions are supported.
- Do not convert desk research into proof of physical performance or certification.

## 9. Output contract
Return, as applicable:
- Research ID/title, invoking Workstream, decision/use context
- Research questions, scope, boundaries, exclusions, date/market/conditions
- Executive synthesis and direct answer per question
- Claim/evidence matrix: atomic claim, state, source(s), relevant passage/data, source-to-claim fit, limitations
- Technical mechanism / architecture and demonstrated vs inferred elements
- Comparative findings and decision-relevant trade-offs, without unsupported ranking
- Transferability / feasibility boundaries and assumptions
- Competitor / supplier / patent signals where relevant, with scope and caveats
- Conflicts, unknowns, evidence gaps, and checks not performed
- Verification/test/specialist actions needed, with rationale and what they resolve
- Next route or explicit no-handoff; output destination owned by invoking Workstream
- Human approval status where relevant

## 10. Quality gates
- [ ] Research questions connect to an explicit decision/use context.
- [ ] Scope, system boundary, conditions, and exclusions are stated.
- [ ] Relevant Knowledge/prior work was checked or access limitation disclosed.
- [ ] Material conclusions map to traceable sources or explicit uncertainty.
- [ ] Primary/technical evidence is preferred where appropriate; source limitations are visible.
- [ ] Source assertion, direct evidence, inference, assumption, and proposal are distinct.
- [ ] Conflicting evidence is reconciled or explicitly preserved.
- [ ] Existence, mechanism, performance, compatibility, feasibility, qualification, compliance, and novelty are not conflated.
- [ ] No unsupported source count, confidence, novelty, or feasibility claim.
- [ ] Stop/handoff is justified and self-contained.
- [ ] Output remains owned by invoking Workstream; no automatic Knowledge write.

## 11. Handoffs
| Condition | Route | Minimum payload |
|---|---|---|
| Narrow unresolved factual claim | VERIFICATION | Atomic claim, decision impact, scope, sources checked, exact gap |
| Evidence synthesis complete; decision against criteria remains | EVALUATION | Findings, criteria/question, constraints, uncertainty |
| New solution candidates are needed | CLAW_DISCOVERY | Validated problem/signal, constraints, evidence and open questions |
| Physical test, supplier authority, certification, or legal/IP interpretation needed | Human/specialist | Exact claim/question, evidence reviewed, limitation, required test/authority |
| Reusable finding proposed | KNOWLEDGE_PROMOTION via owning Workstream | Finding, provenance, state, reuse rationale, limitations; no automatic write |
| Research question answered within scope | Return to invoking Workstream | Synthesis, traceability, limits, explicit no-handoff |

## 12. Human gate
Human/specialist review is required for consequential unresolved conflicts, physical testing, supplier confirmation, certification/compliance authority, legal/IP interpretation, and authoritative Released Knowledge or durable baseline changes. DEEP_RESEARCH does not approve product release or Knowledge promotion.

## 13. Failure and stop conditions
Return a bounded unresolved result when critical sources are inaccessible, scope cannot be made decision-relevant, evidence remains materially conflicting, target conditions are unknown, or the requested conclusion exceeds desk research. State what was and was not checked, what remains UNKNOWN/NOT_VERIFIABLE/CONFLICTING, and the minimum next evidence needed. Do not fabricate a definitive answer to satisfy the request.

## 14. Persistence boundary
The invoking Workstream owns research outputs and their canonical destination. DEEP_RESEARCH owns no batch, idea record, Knowledge Sheet row, or Released file. Never write directly to Released Knowledge. Reusable findings may be proposed through KNOWLEDGE_PROMOTION after workstream review and required human approval.

## 15. Examples and tests
- **Transfer:** a technology works in an adjacent industry; source conditions are documented but fitting pressure/scale/chemical exposure are not. Report source capability as EVIDENCED and target transfer as INFERRED/UNKNOWN; specify tests/evidence needed.
- **Conflict:** supplier datasheet and independent test report use different conditions. Compare methods and preserve non-comparable results rather than declaring one universally correct.
- **Patent:** no relevant document found in searched databases. Report search scope and NOT FOUND; do not conclude novelty or freedom to operate.
- **Regression:** capability-specific trigger, synthesis, evidence-boundary, handoff, and failure cases belong in existing Project Improvement Regression artifacts. Contract completeness alone is not functional PASS.
