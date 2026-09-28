# DEEP_RESEARCH

## Purpose
Reusable R&D capability for broad, conflicting, high-risk, or decision-critical research that cannot be closed by the minimum sufficient research route.

## Contract
- Trigger: material evidence gap, conflicting sources, high-risk decision, or explicit deep-research request.
- Input: scoped question, decision context, known constraints, prior findings, and evidence gaps.
- Process: scope → source plan → multi-source investigation → contradiction analysis → synthesis → uncertainty statement.
- Output: auditable research synthesis with evidence, inference, unknowns, and implications separated.
- Validation: source quality, traceability, contradiction handling, and scope coverage are checked before conclusion.
- Escalation: unresolved material uncertainty remains explicit and is routed to human review when required.

## Capability Contract Completeness

- **Preconditions:** The question is broad, conflicting, high-risk, or decision-critical enough to justify deeper research.
- **Tools / AI:** Primary sources, technical documentation, patents, literature, and other traceable research sources.
- **Evidence State:** Separate evidence, inference, assumption, unknown, contradiction, and proposal throughout synthesis.
- **Escalation:** Unresolved material uncertainty routes to human review or additional targeted research.
- **Human Verification Gate:** Required before authoritative baseline or Knowledge Sheet promotion when material uncertainty remains.
- **Promotion / Persistence:** Persist synthesis in the invoking workstream artifact; promotion is handled by KNOWLEDGE_PROMOTION.
- **Failure Handling:** Return explicit unresolved-evidence state when scope cannot be closed; do not manufacture a conclusion.
