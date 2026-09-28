# KNOWLEDGE_PROMOTION

## Purpose
Reusable R&D capability for promoting verified reusable findings into the authoritative Knowledge Sheet.

## Contract
- Trigger: an explicit Knowledge Candidate is ready after research or evaluation.
- Input: candidate, supporting evidence, source links, existing records, and relationships.
- Process: evidence check → duplicate check → contradiction check → human verification → promote → validate.
- Output: authoritative Knowledge Sheet record or explicit hold/rejection with reason.
- Validation: IDs, relationships, source traceability, schema, duplicates, and contradictions are checked.
- Human gate: mandatory before authoritative promotion.

## Capability Contract Completeness

- **Preconditions:** A Knowledge Candidate has traceable evidence and has passed applicable research/evaluation gates.
- **Tools / AI:** Authoritative Knowledge Sheet files, schema/ID validation, source references, and duplicate/relationship checks.
- **Evidence State:** Only adequately supported findings may be promoted; unresolved inference, assumption, unknown, or conflict remains outside authoritative knowledge.
- **Escalation:** Route duplicate, contradiction, schema, or evidence conflicts to the owning workstream and human review.
- **Human Verification Gate:** Mandatory before authoritative promotion.
- **Promotion / Persistence:** Successful promotion writes the authoritative Knowledge Sheet record; held candidates remain in the invoking workstream artifact.
- **Failure Handling:** Abort promotion on failed evidence, schema, ID, relationship, duplicate, or contradiction checks; report the blocking reason.
