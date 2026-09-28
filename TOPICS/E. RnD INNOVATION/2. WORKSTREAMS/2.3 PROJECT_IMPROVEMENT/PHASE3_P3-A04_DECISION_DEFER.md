# Phase 3 — P3-A04 Decision: Defer EXPERIMENT_DESIGN

**Date:** 2026-09-28  
**Decision:** DEFER — do not create standalone CAP-06 or introduce a conditional reference method at this time.  
**Decision owner:** Human (user-approved)

## Basis

P3-A01 collected four physical-uncertainty cases, all from one Claw batch and one workstream. P3-A02 found that DEEP_RESEARCH and EVALUATION can identify unresolved physical questions and route them to qualified people, but neither defines a reusable experiment-design method. P3-A03 found signals of verification needs across at least two workstreams, but no completed experiment plans, physical test executions, lab results, or reliable evidence of recurring demand and distinct ownership.

This evidence supports preserving the existing boundary, but does not establish sufficient recurring use to justify a new capability or a shared method now.

## Scope and consequences

- P3-A05: **NOT ACTIVATED**; no CAP-06 implementation.
- P3-A06: **NOT ACTIVATED**; no routing or workstream handoff changes.
- Existing responsibilities remain: DEEP_RESEARCH frames the unresolved question and evidence boundary; EVALUATION links evidence gaps to decision context; qualified human/test owner controls protocol design and execution.
- No physical testing, lab-data ownership, Knowledge promotion, or runtime behavior is authorized by this decision.
- Phase 2 Gate G2 remains independently open; this decision does not close it.

## Reopen criteria

Reassess only when actual usage provides evidence such as:
1. completed experiment plans or protocols from real work;
2. repeated demand across distinct workstreams or cases;
3. a demonstrably reusable method with clear ownership that current capabilities cannot cleanly provide; and
4. a concrete handoff failure or measurable rework attributable to the current boundary.

At reassessment, compare standalone capability, conditional reference method, and continued defer. Do not infer demand from hypothetical appeal or the number of unresolved questions alone.

## Validation boundary

This is a governance decision record based on the merged P3-A01–A03 assessments. It does not claim physical validation or operational testing.
