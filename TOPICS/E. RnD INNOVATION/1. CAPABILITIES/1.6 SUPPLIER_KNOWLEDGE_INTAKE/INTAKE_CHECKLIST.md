# Supplier Knowledge Intake — Progress Checklist

Use this checklist in the intake PR. Mark an item complete only when the evidence/action is visible in the PR or repository. Keep it updated throughout execution; it is a control record, not a knowledge database.

## A. Setup — PR first
- [ ] Supplier, scope, and intended BETA destination confirmed.
- [ ] All PDF/PPTX files inventoried; filename and page/slide count recorded.
- [ ] Current `main` and relevant BETA schemas/IDs inspected.
- [ ] Dedicated branch created from current `main`.
- [ ] Draft PR opened before substantive document review.
- [ ] Existing BETA files edited directly on PR branch; no parallel Supplier_Knowledge.csv created.
- [ ] PR base commit and baseline recorded.

## B. Per-document / per-range review
Repeat this section for every file and every page/slide range.
- [ ] Original file and exact range inspected.
- [ ] Extraction captures technologies, subsystems, mechanisms, configurations, applications, quantitative claims, conditions, and limitations relevant to the range.
- [ ] Supplier wording/claims and attribution preserved; no unsupported interpretation.
- [ ] User corrections/confirmation recorded where required.
- [ ] Existing BETA records searched; disposition recorded: ADD / UPDATE / COMBINE / NO CHANGE / FLAG.
- [ ] Changes applied directly to the PR branch after review.
- [ ] Source record created/updated during intake with document identity and page/slide range.
- [ ] Affected records linked to the correct Source ID(s).
- [ ] Range marked complete only after PR diff and source links are checked.

## C. Supplier-document completeness gate
- [ ] Every inventoried file has a final status.
- [ ] Every page/slide range is accounted for; unreadable/excluded ranges have explicit reasons.
- [ ] No reviewed extraction remains unapplied to the PR.
- [ ] No PR change lacks a traceable document/source or documented rationale.
- [ ] Supplier claims are not presented as independently verified without separate evidence.
- [ ] Distinct configurations/conditions remain separate where scopes differ.
- [ ] User review issues are resolved or explicitly held.

## D. Related-source enrichment
- [ ] All supplier documents completed before broad external enrichment begins (unless user explicitly authorized otherwise).
- [ ] Relevant external sources searched only where useful/in scope.
- [ ] External evidence is distinguished from supplier-provided claims.
- [ ] Source-to-claim links and evidence limitations recorded.
- [ ] No record flagged solely because independent corroboration was not found.

## E. Full audit
- [ ] All affected BETA sheets audited: Sources, Tech_Radar, Market_Signal, Supplier_Tech, and any other changed sheet.
- [ ] CSV headers/schema and row structure valid.
- [ ] IDs unique, stable, and correctly prefixed; no accidental ID reuse.
- [ ] No duplicate/near-duplicate records without explicit disposition.
- [ ] No dangling Source IDs or cross-sheet references.
- [ ] Source-to-claim traceability and page/slide ranges complete.
- [ ] Technical details, values, units, test conditions, configurations, and limitations match originals.
- [ ] Conflicting source-specific claims preserved; no unsupported reconciliation.
- [ ] Market_Signal inclusion has a documented rationale; supplier claims are not automatically treated as market signals.
- [ ] No unintended changes outside agreed scope.
- [ ] Findings fixed and affected checks rerun; unresolved material issues block completion.

## F. Finalization and merge
- [ ] Full semantic audit passed (not merely structural validation).
- [ ] Changelog updated only after audit passes.
- [ ] Changelog accurately states PR status and scope; no stale pending status.
- [ ] Repository validator/CI completed; result recorded.
- [ ] Final PR diff reviewed; RELEASED unchanged.
- [ ] Required user authorization to merge is present.
- [ ] PR merged; merge commit recorded.
- [ ] `main` re-read and expected files/records verified.
- [ ] Changelog and CI verified on `main`.
- [ ] Completion report states verified results and any remaining limitations.

## Per-file manifest
| File | Page/slide count | Ranges reviewed | Source ID(s) | PR records updated | Status / blocker |
|---|---:|---|---|---|---|
|  |  |  |  |  |  |

**Status values:** NOT STARTED / IN REVIEW / WAITING USER / BLOCKED / COMPLETE.
