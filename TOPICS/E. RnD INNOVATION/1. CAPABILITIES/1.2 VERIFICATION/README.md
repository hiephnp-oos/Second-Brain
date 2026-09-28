# VERIFICATION

## Purpose
Reusable R&D capability for checking whether a material claim, source, relationship, mechanism, status, or candidate finding is adequately supported.

## Contract
- Trigger: a finding or decision depends on evidence that must be checked.
- Input: claim/finding, source set, existing Knowledge Sheet records, and decision context.
- Process: identify claim → inspect primary/technical evidence → cross-check conflicts → classify verified/inference/assumption/unknown.
- Output: verification result with evidence trail and unresolved gaps.
- Validation: material claims require traceable evidence; uncertainty is preserved explicitly.
- Escalation: conflicting or weak evidence routes to deeper research or human review.

## Capability Contract Completeness

- **Preconditions:** The claim/finding and its relevant evidence sources are identifiable.
- **Tools / AI:** Primary/technical sources, Knowledge Sheet records, and targeted external verification.
- **Evidence State:** Return VERIFIED, INFERENCE, ASSUMPTION, UNKNOWN, or CONFLICTING with traceable evidence.
- **Escalation:** Conflicting or weak evidence routes to DEEP_RESEARCH or human review.
- **Human Verification Gate:** Required when evidence remains materially conflicting or the result changes authoritative knowledge.
- **Promotion / Persistence:** Results remain with the invoking workstream; verified reusable findings may enter KNOWLEDGE_PROMOTION.
- **Failure Handling:** Fail or escalate when evidence cannot support the claim; absence of evidence is not verification.
