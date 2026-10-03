# SUPPLIER_KNOWLEDGE_INTAKE

**Baseline:** Inherits the shared R&D capability contract and evidence vocabulary from [../README.md](../README.md). This capability owns supplier-document intake into the existing Knowledge BETA files through a PR-first workflow. It does not create a parallel supplier knowledge database.

## 1. Identity and purpose
Capture supplier-provided knowledge from PDF/PPTX documents accurately and incrementally, directly in a Draft PR based on current `main`. The PR branch is the single working state for review, updates, audit, and final merge.

## 2. Use cases
- Review a supplier catalog or meeting deck file-by-file and page-range-by-page-range.
- Add or update supplier knowledge in BETA while preserving provenance and technical detail.
- Complete a supplier intake batch with traceability, audit, changelog, CI, and merge verification.

## 3. Trigger / non-trigger
**Trigger:** user requests intake/review of supplier PDF/PPTX documents into R&D Knowledge.

**Do not trigger:** standalone idea discovery, broad market research without supplier documents, or Knowledge promotion unrelated to supplier-document intake. Do not create a separate Supplier_Knowledge.csv as a required staging artifact.

## 4. Inputs and preconditions
Required: supplier identity, document set, target Knowledge BETA, repository access, and user review/confirmation protocol. Before writing, inspect current `main`, capability baseline, Knowledge README/schema, current BETA CSV headers/IDs, changelog conventions, validator and PR template. Missing schema or access means HOLD.

## 5. Procedure
1. **Inventory:** enumerate all supplied files; record filename, type, page/slide count where available, and intended scope.
2. **PR first:** create a dedicated branch from current `main` and open a Draft PR before substantive review. Work directly on existing BETA files in that branch; do not copy BETA into a second parallel dataset.
3. **Baseline:** capture base commit and relevant BETA file versions. Keep `main` as the comparison baseline; do not edit RELEASED.
4. **Review each document:** process one file at a time and bounded page ranges. Extract claims, mechanisms, configurations, applications, performance figures, limitations, and relevant context. Preserve supplier terminology and details; do not silently summarize away subsystems or quantitative claims.
5. **Human gate:** present each page-range extraction for user review where requested. Apply corrections and only then persist that range's accepted changes directly to the PR branch.
6. **Model records:** search existing BETA records before adding. Choose ADD / UPDATE / COMBINE / NO CHANGE / FLAG based on entity identity, mechanism, function, application, and evidence—not name similarity alone. Preserve distinct source-specific configurations and claims.
7. **Source traceability during intake:** create/update the PDF/PPTX Source record as soon as its evidence is used; include file identity and precise page/slide range. Link material claims/records to the relevant Source. Supplier statements remain supplier-reported, not independently verified.
8. **Repeat:** complete all page ranges for the current file, then move to the next file. Keep a review manifest/checklist updated in the PR; it tracks progress only and is not a knowledge store.
9. **Completeness gate:** reconcile the full inventory and every page/slide range against review status, accepted changes, Source coverage, and PR diff. No file/range may be silently skipped.
10. **Related-source enrichment:** only after all supplier documents are reviewed, search for relevant supporting/related sources if in scope. Distinguish supplier claims from external evidence; do not treat lack of independent evidence alone as a reason to discard a supplier-provided record.
11. **Full audit:** inspect all changed records and their relationships across Sources, Tech_Radar, Market_Signal, Supplier_Tech, and any other affected BETA sheets. Check schema, IDs, duplicate/near-duplicate handling, dangling references, source-to-claim traceability, completeness against originals, consistency, and unintended changes.
12. **Resolve findings:** fix issues in the same PR and rerun affected audits. Unresolved material issues remain explicit and block completion.
13. **Changelog:** only after full audit passes, update changelog with accurate PR/status and scope. Never write a pending state after the PR is merged.
14. **Final gate:** run repository validation/CI, review final diff, confirm no RELEASED changes, and verify PR checks.
15. **Merge and verify:** merge only when the user has authorized merge and required gates pass. Re-read `main`; verify merge commit, expected files/records, changelog, and CI. Report actual state only.

## 6. Method selection
Use page-range review for long documents; use smaller ranges where tables/diagrams or dense technical content require it. Use targeted external-source research only after supplier-document capture is complete, unless the user explicitly requests earlier verification. Route explicit Knowledge lifecycle decisions to KNOWLEDGE_PROMOTION; this capability handles document intake and PR-based BETA maintenance, not RELEASED publication.

## 7. Tool boundary
Use repository-native files and validators as schema/contract authority. Use direct PDF/PPTX inspection when available. Do not claim a page was reviewed, a source verified, a PR updated, CI passed, or merge completed unless the action/result was observed. If a tool cannot inspect a document or write to the branch, stop and report the exact gap.

## 8. Evidence and uncertainty
Preserve supplier claims as supplier-provided/reported and link them to the supplier document/page. Do not label them independently verified unless independent evidence was checked. Keep conflicting values source- and scope-specific; do not reconcile unlike test conditions. Use shared epistemic states where the schema supports them. UNKNOWN is not false; no independent source found is not by itself a FLAG.

## 9. Output contract
Maintain in the PR: (a) direct BETA changes; (b) review manifest/checklist; (c) Source traceability; and (d) audit/changelog updates when gates are met. Each review result identifies document/page range, extraction, user corrections/approval, affected records, Source IDs, and unresolved items. The PR is the authoritative working state; no duplicate Supplier_Knowledge.csv is required.

## 10. Quality gates
- Every document and page/slide range is accounted for.
- Accepted extraction is reflected directly in PR changes; no second full review/reconciliation stage.
- Each used supplier document has a Source record and page-level traceability.
- Existing BETA records were searched before ADD; disposition is explicit.
- Claims, units, values, configurations, and limitations are preserved without unsupported reconciliation.
- Cross-sheet references and schema validate.
- Full semantic audit compares PR data against all reviewed originals.
- Changelog is updated only after audit passes and reflects actual state.
- CI passes; final diff is reviewed; RELEASED is unchanged.
- Post-merge verification is completed before reporting success.

## 11. Handoffs
- Specific source/claim verification → VERIFICATION with exact claim, scope, and gap.
- Broad conflicting/decision-critical research → DEEP_RESEARCH after supplier capture is complete.
- Explicit candidate promotion/release decision → KNOWLEDGE_PROMOTION under its own authorization gate.
- Unresolved physical performance → record unknown and required test; do not infer performance from catalog copy.

## 12. Human gate
User review/confirmation is required at the agreed extraction checkpoints and for material interpretation/disposition decisions. Merge requires explicit user authorization unless the user has explicitly authorized auto-merge for this exact workflow. Never infer approval from silence or CI.

## 13. Failure and stop conditions
HOLD on missing files, unreadable pages, uncertain source identity, schema ambiguity, inaccessible BETA, unresolved material conflicts, broken references, failed audit/CI, or absent required approval. Report exact file/range and blocked action. Do not claim completion or skip forward silently.

## 14. Persistence boundary
The invoking R&D workstream owns any run-specific report. BETA changes live directly on the PR branch. The review checklist is a progress-control artifact within the PR, not a parallel knowledge database. This capability never writes to RELEASED.

## 15. Examples and tests
The Solex catalog intake and PR #91 review/merge are the motivating regression case. Future regression should verify: PR-first operation; no duplicate staging database; per-file/page-range completeness; source capture during intake; no repeat full review at PR stage; supplier claims correctly attributed; full audit before changelog; and post-merge verification.

See [INTAKE_CHECKLIST.md](INTAKE_CHECKLIST.md) for the mandatory progress gates.
