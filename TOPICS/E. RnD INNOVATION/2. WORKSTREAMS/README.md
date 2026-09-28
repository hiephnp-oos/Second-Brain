# R&D Workstreams

## Authority and boundary

This folder contains workstream-specific context, routing, prompts, execution records, and outputs. It does not define reusable capability methods or own authoritative Knowledge.

- Shared capability contract: [../1. CAPABILITIES/README.md](../1.%20CAPABILITIES/README.md)
- Knowledge lifecycle and authority: [../3. KNOWLEDGE/README.md](../3.%20KNOWLEDGE/README.md)
- Parent R&D architecture: [../README.md](../README.md)

Capabilities are invoked by workstreams; folder order is navigation, not a mandatory pipeline. The invoking workstream owns each execution output.

## Workstream map

| Workstream | Owns | Entry point |
|---|---|---|
| 2.1 PERSONAL_RESEARCH | Research context, RS prompts, research artifacts, scheduled Claw staging and batches | [README](2.1%20PERSONAL_RESEARCH/README.md) · [Prompt.csv](2.1%20PERSONAL_RESEARCH/Prompt.csv) |
| 2.2 IDEA_REVIEW | Idea-specific review context, IR prompts, review records and dispositions | [README](2.2%20IDEA_REVIEW/README.md) · [Prompt.csv](2.2%20IDEA_REVIEW/Prompt.csv) |
| 2.3 PROJECT_IMPROVEMENT | System review, implementation plans, prompt/workflow changes, regression and validation records | [README](2.3%20PROJECT_IMPROVEMENT/README.md) · [Prompt.csv](2.3%20PROJECT_IMPROVEMENT/Prompt.csv) |

## Capability routing

| Need | Capability | Contract |
|---|---|---|
| Generate candidates from a scoped problem/signal | CLAW_DISCOVERY | [1.1](../1.%20CAPABILITIES/1.1%20CLAW_DISCOVERY/README.md) |
| Check specific material claims and relationships | VERIFICATION | [1.2](../1.%20CAPABILITIES/1.2%20VERIFICATION/README.md) |
| Synthesize broad, conflicting or decision-critical research | DEEP_RESEARCH | [1.3](../1.%20CAPABILITIES/1.3%20DEEP_RESEARCH/README.md) |
| Assess an identified candidate against decision criteria | EVALUATION | [1.4](../1.%20CAPABILITIES/1.4%20EVALUATION/README.md) |
| Review an explicit candidate for controlled Knowledge promotion | KNOWLEDGE_PROMOTION | [1.5](../1.%20CAPABILITIES/1.5%20KNOWLEDGE_PROMOTION/README.md) |

Use the narrowest sufficient capability. These are conditional routes, not a required linear sequence. Workstream Prompt.csv owns task-specific orchestration; capability README owns reusable method.

## End-to-end handoff contract

`Workstream input → selected capability(ies) → workstream-owned output → optional review/evaluation → optional Knowledge Candidate → human verification → Released Knowledge`

Each handoff must carry enough context to continue without assuming undocumented work: item/claim ID, result, source-to-claim links, epistemic state, limits, checks performed/not performed, next action, output owner, and approval state where applicable.

Knowledge promotion is never an automatic side effect. Staging, batches, research notes, and evaluation outputs remain non-authoritative until the Knowledge lifecycle is completed.

## Link and change rules

- Resolve repository links relative to the file containing the link; encode spaces as `%20` in Markdown URLs.
- Link to canonical entry points, not copied contract text.
- Workstream prompts may specialize routing and outputs but must not redefine capability methods, evidence states, or Knowledge authorization.
- When moving or renaming a file, update inbound links, parent indexes, prompt references, and validators in the same change.
- Validate links and referenced Prompt IDs after refactors; a syntactically present link is not proof that its target exists.
