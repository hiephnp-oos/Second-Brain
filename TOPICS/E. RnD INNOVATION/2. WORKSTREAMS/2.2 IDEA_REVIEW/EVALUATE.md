# EVALUATE Capability

## Purpose
Evaluate candidate ideas against technical and business criteria without converting assumptions into facts.

## Trigger
An idea passes Idea Review or an explicit evaluation decision is required.

## Input / Context
Candidate idea, Idea Review result, Knowledge Sheet evidence, research findings, constraints, and decision context.

## Preconditions
The idea has a defined problem/opportunity and enough evidence to perform a bounded evaluation. Missing evidence remains explicit.

## Process
Customer/problem relevance → Technical feasibility → Differentiation → Evidence quality → Implementation complexity → Potential value → Patent/novelty signal → Supplier feasibility → Evaluation synthesis.

## Tools / AI
Knowledge Sheet, released Idea Review prompts, targeted research, patent/technical research when needed, and GitHub.

## Output
Criterion-by-criterion evaluation, evidence and uncertainty labels, key risks, missing evidence, and a proposed next route: hold, research, or Deep Analyze.

## Validation
Every criterion is supported by evidence or labeled as inference, assumption, unknown, or proposal. No score is presented as objective fact when the evidence does not support it.

## Evidence State
EVIDENCE, INFERENCE, ASSUMPTION, UNKNOWN, PROPOSAL.

## Escalation
Route unresolved evidence gaps to PERSONAL_RESEARCH and selected technically consequential ideas to DEEP_ANALYZE.

## Human Verification Gate
Required before an evaluation is used to change authoritative Knowledge Sheet content or baseline architecture.

## Promotion / Persistence
Evaluation remains decision-support work. Reusable verified findings become Knowledge Candidates and use KNOWLEDGE_PROMOTION.

## Failure Handling
If a criterion cannot be evaluated reliably, mark it UNKNOWN and identify the evidence required rather than filling the gap.
