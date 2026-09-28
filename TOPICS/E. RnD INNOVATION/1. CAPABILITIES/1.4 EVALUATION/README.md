# EVALUATION

## Purpose
Reusable R&D capability for evaluating ideas or findings against technical feasibility, evidence quality, constraints, differentiation / precedent, risks, practical relevance, and decision needs.

## Trigger
A workstream needs a structured evaluation of an idea or finding.

## Input / Context
Idea or finding, relevant released Knowledge Sheet context, evidence, constraints, and evaluation criteria.

## Preconditions
The evaluation target and decision context are identifiable. Missing evidence remains explicit.

## Process
Context → evidence check → technical / mechanism feasibility → differentiation / precedent → complexity / risk → value / practicality → uncertainty synthesis → next route.

## Tools / AI
Released Knowledge Sheet, relevant workstream prompts, technical / product evidence, targeted research, patents when relevant, and GitHub.

## Output
Decision-support evaluation with criterion-level evidence, uncertainty, key risks, evidence gaps, and a recommended next route for the owning workstream.

## Validation
Separate evidence, inference, assumption, unknown, and proposal. Do not infer novelty from absence of found prior art. Do not present unsupported numeric scores as objective facts.

## Evidence State
EVIDENCE, INFERENCE, ASSUMPTION, UNKNOWN, PROPOSAL.

## Escalation
Route unresolved evidence gaps to VERIFICATION or DEEP_RESEARCH. Route technically consequential unresolved questions to the appropriate deeper research path.

## Human Verification Gate
Required before evaluation findings change released Knowledge or a durable project baseline.

## Promotion / Persistence
Evaluation remains a workstream decision-support output. Reusable verified findings may become a Knowledge Candidate and enter KNOWLEDGE_PROMOTION.

## Failure Handling
When criteria or evidence are insufficient, mark the affected conclusion UNKNOWN and state the evidence required. Do not force a conclusion.

## Boundary
This file is the single source of truth for the reusable EVALUATION capability. Workstreams invoke it and own their evaluation outputs; they must not duplicate this capability contract.
