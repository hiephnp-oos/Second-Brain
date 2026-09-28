# KNOWLEDGE_PROMOTION

**Baseline:** Inherits the shared contract standard and evidence vocabulary from [../README.md](../README.md). This file defines only Knowledge Promotion-specific behavior.

## 1. Identity and purpose
Move an eligible, reusable Knowledge Candidate from its invoking workstream into the authoritative Released Knowledge Sheet through a traceable, human-approved lifecycle. This is a controlled persistence capability, not an automatic consequence of research or verification.

## 2. Use cases
- Promote a reusable, evidence-supported finding into an existing Knowledge Sheet entity.
- Correct, extend, or supersede an existing record when evidence and human approval support the change.
- Hold or reject a candidate whose evidence, identity, schema, relationship, or authorization is insufficient.

## 3. Trigger / non-trigger
**Trigger:** the invoking workstream explicitly submits a Knowledge Candidate and requests promotion or a promotion-readiness review.

**Do not trigger:** merely because research/evaluation completed, a claim is EVIDENCED, a candidate appears in staging, or a scheduled batch produced an output. If the request is ambiguous, perform readiness review only; do not write.

## 4. Inputs and preconditions
Required: candidate finding and type; owning workstream and source artifact; claim-level evidence state; source-to-claim references; proposed Knowledge Sheet target/file; proposed relationships; reason the finding is reusable; and proposed change type (add/correct/extend/supersede).
Before execution, inspect the current Knowledge lifecycle contract and released CSV headers/ID conventions. Missing or inaccessible schema, source, owner, or approval means HOLD, not inference.

## Process

## 5. Procedure
1. **Establish ownership and destination.** Keep the candidate in its invoking workstream; target only the existing authoritative release structure.
2. **Check eligibility.** Confirm bounded, reusable finding; traceable sources; claim-level states; applicable research/verification gates; and explicit change intent.
3. **Check provenance.** Each material claim must map to a source, date/scope where available, and limitation. Source existence alone is not support.
4. **Check identity and duplicates.** Search the relevant released datasets for exact and near duplicates. Reuse stable IDs only for the same entity; never recycle IDs.
5. **Check contradictions and freshness.** Compare scope, definitions, dates, and evidence. Preserve unresolved conflict as CONFLICTING and hold. Determine whether an existing record should be corrected, extended, or superseded; do not silently overwrite.
6. **Validate proposed record.** Match the current CSV schema and canonical ID prefixes; verify all referenced Source IDs and relationship IDs exist. Empty relationship fields are allowed only when no verified relationship exists.
7. **Prepare review package.** Show before/after or proposed row, source-to-claim map, duplicate/contradiction findings, change type, impact, and unresolved limitations.
8. **Obtain explicit human approval.** Approval must identify the candidate and proposed change. Silence, prior approval of research, or a general instruction to research is not approval to release.
9. **Persist only after approval.** Write to the authoritative release only through an available, authorized tool. If write access is unavailable, return the approved change package without claiming it was committed.
10. **Verify after write.** Re-read the changed record and validate schema, unique/stable IDs, relationships, provenance, and release documentation/changelog as applicable. Record the resulting commit/release reference.

## 6. Method selection
Use readiness review when the user asks whether a candidate is promotable; do not write. Use controlled promotion only when the user explicitly requests it and the specific change has human approval. For a narrow source/claim gap, route to VERIFICATION; for broad/conflicting material gaps, DEEP_RESEARCH; for a decision on usefulness or priority, EVALUATION. Do not repeat those methods inside this capability.

## Tools / AI

## 7. Tool boundary
Use current repository files and CSV headers as schema authority, plus available source references and repository validation. Do not claim repository access, external source checking, atomic writes, or validation execution unless actually available and performed. If tools are unavailable, return a bounded review package and state what remains unverified.

## 8. Evidence and uncertainty
Apply the shared canonical states: EVIDENCED, INFERRED, ASSUMPTION, UNKNOWN, PROPOSED, CONFLICTING. Eligibility is not the same as approval or release. Only findings adequately supported for their stated scope may be proposed for release; inference may be recorded only where the existing schema explicitly supports it and it is clearly labeled. UNKNOWN or unresolved CONFLICTING material claims block promotion. Unsupported does not mean false.

## 9. Output contract
Return one of: **READY FOR HUMAN APPROVAL**, **HOLD**, **REJECT**, or **PROMOTED AND VERIFIED**. Include candidate/workstream reference; proposed file and row/ID; change type; claim/source map; duplicate and contradiction checks; schema/relationship checks; evidence states and limitations; approval status; persistence result/commit; and remaining actions. The invoking workstream owns the candidate and review artifact.

## 10. Quality gates
Before approval: eligibility, provenance, duplicate, contradiction, schema, ID, relationship, and impact checks are explicit. Before reporting success: human approval is evidenced, write actually occurred, and post-write reread/validation passed. A clean repository validator alone does not prove semantic correctness.

## Escalation

## 11. Handoffs
- Evidence gap → VERIFICATION or DEEP_RESEARCH with the exact unresolved claim and source gap.
- Decision about reuse/value → EVALUATION with candidate, context, and criteria needed.
- Hold/reject → invoking workstream with reason, evidence needed, and next action.
- Ready candidate → designated human approver with complete review package.
- Approved but no write access → invoking workstream with an implementation-ready change package.

## Human Verification Gate

## 12. Human gate
A human must explicitly approve the specific proposed authoritative change before any write. AI may prepare, check, and explain a proposal; it must not self-approve, infer approval, or autonomously release/supersede records.

## Failure Handling

## 13. Failure and stop conditions
Stop and HOLD on missing schema, source traceability, owner, approval, uncertain identity, unresolved material contradiction, invalid ID/relationship, or unavailable write access. Reject only when the candidate is out of scope, non-reusable, duplicate without a meaningful update, or otherwise ineligible with a stated rationale. If post-write validation fails, do not report success; preserve the failed state, identify the affected record, and request controlled correction/rollback by the authorized maintainer. Never silently delete history or reuse IDs.

## Promotion / Persistence

## 14. Persistence boundary
Candidate, research notes, and run outputs remain in the invoking workstream or Candidate/Test lifecycle. Only approved and verified changes enter `3. KNOWLEDGE/RELEASED/Release_23Sep2026/`. The released CSVs remain the data source of truth; this contract and changelog do not duplicate their data. Record the release/change reference in the existing changelog where applicable.

## 15. Examples and tests
Regression cases: RND-REG-010, RND-REG-011, and RND-REG-033–038 in [Project Improvement Regression/CASES.md](../../2. WORKSTREAMS/2.3 PROJECT_IMPROVEMENT/Regression/CASES.md). Controlled contract tests do not substitute for real-output validation.
