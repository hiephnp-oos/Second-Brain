# CLAW_DISCOVERY

## Purpose
Reusable R&D discovery capability for generating technology/solution candidates from a defined problem, constraint, or evidence gap using the Knowledge Sheet and external research.

## Contract
- Trigger: Personal Research, Idea Review, or another R&D workstream needs structured discovery.
- Input: problem/opportunity, constraints, relevant Knowledge Sheet context, and evidence gap.
- Process: route → traverse relevant knowledge/evidence → generate candidates → classify evidence state → return traceable candidates.
- Output: candidate ideas/findings with evidence, mechanism, and explicit uncertainty.
- Validation: do not treat inferred relationships or absence of evidence as verified fact; use defined evidence states and quality gates.
- Persistence: execution outputs are owned by the invoking workstream. For the scheduled Claw flow, outputs live under `TOPICS/E. RnD INNOVATION/2. WORKSTREAMS/2.1 PERSONAL_RESEARCH/OUTPUT/CLAW_DISCOVERY/`.


## Output Boundary

This capability defines discovery behavior only. It must not contain `staging/`, `batches/`, reports, or other execution output. Scheduled Claw output is owned by `PERSONAL_RESEARCH`.

## Capability Contract Completeness

- **Preconditions:** A scoped problem, opportunity, or evidence gap exists and relevant Knowledge Sheet context is available.
- **Tools / AI:** Knowledge Sheet, repository-defined prompts, and approved external research sources as required by the invoking workstream.
- **Evidence State:** Candidate output distinguishes EVIDENCE, INFERENCE, ASSUMPTION, UNKNOWN, and PROPOSED states.
- **Escalation:** Route material evidence gaps or conflicting findings to VERIFICATION or DEEP_RESEARCH.
- **Human Verification Gate:** Required before promotion into authoritative knowledge or a durable baseline.
- **Promotion / Persistence:** Execution output remains owned by the invoking workstream; promotion into the Knowledge Sheet uses KNOWLEDGE_PROMOTION.
- **Failure Handling:** Fail explicitly when required scope or evidence is unavailable; do not fabricate candidates, mechanisms, or evidence.

## Routing
This capability is reusable by Personal Research, Idea Review, and future R&D workstreams.

## Scheduler Contract
The scheduler is a trigger/orchestration layer only. Follow repository-defined cadence and execution date semantics. Staging is not an approved Knowledge Sheet record.
