# R&D Workstreams

## Purpose

This layer organizes three workstreams by business purpose. It owns task-specific context, prompts, execution records, and outputs; reusable methods belong to `1. CAPABILITIES/`, while authoritative Knowledge belongs to `3. KNOWLEDGE/`.

## Workstream map

| Workstream | Purpose | Entry point |
|---|---|---|
| 2.1 PERSONAL_RESEARCH | Discover ideas independently; maintain discovery staging and three-day batches. Ideas selected to proceed move to IDEA_REVIEW. | [README](2.1 PERSONAL_RESEARCH/README.md) · [Prompt.csv](2.1 PERSONAL_RESEARCH/Prompt.csv) |
| 2.2 IDEA_REVIEW | Review selected ideas. Each idea gets its own folder containing its related review records. The internal template is defined when an idea enters review. | [README](2.2 IDEA_REVIEW/README.md) · [Prompt.csv](2.2 IDEA_REVIEW/Prompt.csv) |
| 2.3 PROJECT_IMPROVEMENT | Maintain future plans intended to improve R&D Innovation. | [README](2.3 PROJECT_IMPROVEMENT/README.md) |

## Routing

## Capability routing

| Need | Capability | Contract |
|---|---|---|
| Generate candidates from a scoped problem/signal | CLAW_DISCOVERY | [1.1](../1. CAPABILITIES/1.1 CLAW_DISCOVERY/README.md) |
| Check specific material claims and relationships | VERIFICATION | [1.2](../1. CAPABILITIES/1.2 VERIFICATION/README.md) |
| Synthesize broad, conflicting or decision-critical research | DEEP_RESEARCH | [1.3](../1. CAPABILITIES/1.3 DEEP_RESEARCH/README.md) |
| Assess an identified candidate against decision criteria | EVALUATION | [1.4](../1. CAPABILITIES/1.4 EVALUATION/README.md) |
| Review an explicit candidate for controlled Knowledge promotion | KNOWLEDGE_PROMOTION | [1.5](../1. CAPABILITIES/1.5 KNOWLEDGE_PROMOTION/README.md) |

Use only the capabilities needed for the task. These routes are conditional, not a mandatory linear sequence. Workstream Prompt.csv owns task-specific orchestration; capability README owns reusable methods.

## Handoff

`PERSONAL_RESEARCH batch → selected idea → IDEA_REVIEW/<IDEA_ID>/ → optional Knowledge Candidate → human verification → Released Knowledge`

A handoff carries the idea ID, source/evidence links, epistemic state, known limits, checks performed/not performed, next action, and approval state where applicable. Promotion is never automatic. Staging, batches, and review records are non-authoritative until the Knowledge lifecycle is completed.

## Change rules

- Link to canonical entry points rather than copying capability or Knowledge contracts.
- Workstream prompts may specialize routing and outputs but must not redefine capability methods, evidence states, or Knowledge authorization.
- When moving files, update inbound links, parent indexes, prompt references, and validators in the same change.
- Validate links and referenced Prompt IDs after refactors.
