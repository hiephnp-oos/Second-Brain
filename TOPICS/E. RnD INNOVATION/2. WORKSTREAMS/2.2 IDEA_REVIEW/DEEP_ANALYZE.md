# DEEP_ANALYZE Capability

## Purpose
Perform deeper technical investigation for selected R&D ideas where the decision requires stronger evidence.

## Trigger
An evaluated idea requires deeper technical investigation or an explicit decision-critical research request is made.

## Input / Context
Selected idea, evaluation, Knowledge Sheet records, research findings, constraints, and open questions.

## Preconditions
The investigation question is defined and the decision requiring deeper evidence is known.

## Process
Mechanism → Architecture → Technical feasibility → Existing solutions → Competitor evidence → Supplier technology → Patent landscape → Risks → Open questions → Verification needs.

## Tools / AI
Primary technical sources, product/engineering documentation, patents, literature, supplier/competitor evidence, Knowledge Sheet, GitHub, and available research capabilities.

## Output
Deep analysis with source traceability, mechanism/architecture findings, feasibility boundaries, competitor/supplier evidence, patent signals, technical risks, assumptions, unknowns, and verification actions.

## Validation
Separate observed evidence from inference and proposal. Product UX does not prove hidden mechanism. Patent conclusions require appropriate evidence and human verification.

## Evidence State
EVIDENCE, INFERENCE, ASSUMPTION, UNKNOWN, PROPOSAL.

## Escalation
Escalate unresolved contradictions, insufficient evidence, or legal/IP questions requiring professional interpretation.

## Human Verification Gate
Required before patent/IP conclusions are treated as authoritative decisions and before verified findings are promoted into the Knowledge Sheet.

## Promotion / Persistence
Deep-analysis findings remain research outputs unless selected for Knowledge Candidate promotion through KNOWLEDGE_PROMOTION.

## Failure Handling
Stop or return a bounded result when critical evidence cannot be established. Record the open question instead of inferring the missing mechanism or feasibility limit.
