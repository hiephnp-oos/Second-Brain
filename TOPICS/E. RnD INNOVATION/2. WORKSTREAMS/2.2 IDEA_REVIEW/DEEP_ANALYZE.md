# DEEP_RESEARCH

## Purpose
Reusable capability for deeper technical investigation when a question is broad, conflicting, high-risk, or decision-critical and cannot be closed by minimum sufficient research.

## Trigger
A workstream has a material evidence gap, conflicting evidence, or an explicit need for deeper technical investigation.

## Input / Context
Scoped research question, decision context, constraints, existing released Knowledge Sheet context, prior findings, and unresolved evidence gaps.

## Preconditions
The question and the decision it supports are explicit. Known evidence and remaining gaps are identified before starting.

## Process
Scope → source plan → targeted/multi-source investigation → contradiction analysis → mechanism / architecture analysis → feasibility boundaries → synthesis → uncertainty statement → verification needs.

## Tools / AI
Primary and technical sources, manufacturer/supplier documentation, patents, literature, competitor evidence, released Knowledge Sheet, targeted research tools, and GitHub.

## Output
Auditable research synthesis containing:
- source traceability
- established evidence
- mechanism / architecture findings
- feasibility boundaries
- competitor / supplier evidence
- patent signals where relevant
- risks and constraints
- assumptions
- unknowns
- verification actions
- explicit unresolved questions

## Validation
Separate evidence from inference, assumption, unknown, contradiction, and proposal. Product existence or UX does not prove hidden mechanism. Absence of found prior art does not prove novelty.

## Evidence State
EVIDENCE, INFERENCE, ASSUMPTION, UNKNOWN, CONTRADICTION, PROPOSAL.

## Escalation
Unresolved material contradictions or evidence gaps require additional targeted research or human review. Legal/IP interpretation is escalated rather than asserted.

## Human Verification Gate
Required before material findings are promoted into released Knowledge or used to change a durable project baseline.

## Promotion / Persistence
Research output remains owned by the invoking workstream. Reusable verified findings may become a Knowledge Candidate and enter KNOWLEDGE_PROMOTION.

## Failure Handling
Stop with an explicit bounded result when critical evidence cannot be established. Record the unresolved question instead of manufacturing a mechanism, feasibility conclusion, or precedent.

## Boundary
This file defines a reusable capability contract. Research outputs belong to the invoking workstream and are not stored in the capability folder.
