# R&D Innovation

## Scope

R&D engineering, innovation research, technology scouting, competitor/supplier technology, patents, mechanisms, idea generation, evaluation, and related workflows for bathroom, shower, faucet, and adjacent mechanical products.

## Current Context

The topic uses an evidence-driven flow:

`Material → Knowledge Sheet → Claw Idea → Idea Review → Evaluate → Deep Analyze`

The project also improves its own prompts, workflows, tool selection, workstream design, and validation through Project Improvement & Governance under `Personal Research/`.

## Status

- State: Active
- Summary: R&D innovation capability is organized into Personal Research, Knowledge Sheet + Claw, Idea Review, and the maintainer Project Improvement capability.
- Direction: Keep research evidence traceable, minimize repeated work, and improve the system from observed results rather than adding complexity by default.
- Last reviewed: 2026-09-19

## Working Principles

- Prefer primary, technical, and directly relevant evidence.
- Distinguish evidence, inference, assumption, proposal, and unknown.
- Existing Knowledge Sheet relationships are facts only when supported by current source data.
- Semantic candidate connections are useful for discovery but are not automatically written back as relationships.
- Absence from the Knowledge Sheet or search results is not proof of novelty.
- Research only to the depth needed for the decision.
- Do not duplicate detailed knowledge unnecessarily.
- Human verification is required before promoting a Knowledge Candidate into the authoritative Knowledge Sheet.

## Active Workstreams

| Workstream | Purpose | Primary tools |
|---|---|---|
| `Knowledge sheet/` | Structured reusable knowledge, evidence, IDs, and relationships. | ChatGPT Project + Web + GitHub; NotebookLM for team use |
| `Personal Research/` | Personal engineering research, external investigation, and maintainer project improvement/governance. | ChatGPT Project + Web + GitHub |
| `Idea Review/` | Evidence-based review and development of existing ideas. | NotebookLM + Custom Gemini + released Prompt.csv |

Project Improvement is a maintainer capability under `Personal Research/Project Improvement/`, not a separate top-level workstream.

`Knowledge sheet/Prompt.csv` is the team-released prompt library. The other Prompt.csv files are maintainer/workstream task interfaces.

## Core R&D Workflow

`Material → Claw Idea → Idea Review → Evaluate → Deep Analyze`

Material may come from Market Pull, Tech Push, Competitor Technology, Supplier/OEM/ODM Technology, patents, technical documents, literature, and other evidence.

### Knowledge Sheet + Claw

Before external research:
1. Check the relevant Knowledge Sheet.
2. Identify the actual gap.
3. Research only the gap that can change the decision.
4. Synthesize evidence.
5. Create a Knowledge Candidate when the result is reusable.
6. Human review is required before Knowledge Sheet write-back.

Claw connects:
- Market Signal
- Technology
- Competitor
- Supplier
- Mechanism

Ideas should state the knowledge connections and evidence supporting them.

### Idea Review

Idea Review is the unified successor to the former `Existing Ideas/` and `Bi-weekly review/` workstreams.

Review questions:
- Is the evidence sufficient?
- Does the technology really exist?
- Is the mechanism reasonable?
- Is there competitor adoption or a relevant commercial precedent?
- Is there supplier / technology support?
- Is there a gap in the Knowledge Sheet?
- What additional research is needed?
- Does the idea need modification?

The review may be triggered by a new idea, updated evidence, a review cycle, or a specific decision need.

### Evaluate

Evaluate ideas using the criteria appropriate to the decision, with emphasis on User Value, Technical Feasibility, Novelty/Differentiation, Business Potential, and Evidence.

Do not force every idea into deep analysis.

### Deep Analyze

Use deeper research for selected ideas, covering user problem/value, existing solutions, mechanism, feasibility, technical risks, patent/IP landscape, applications, assumptions, and verification needs.

## Research Routing

Use the minimum sufficient route:

- Product / mechanism / technology / material / process / supplier → engineering evidence research.
- Patent / prior art / CPC/IPC / claims / family / status → patent research.
- Engineering science / performance / compatibility / degradation / reliability / testing → technical literature research.
- Broad, conflicting, high-risk, exhaustive, or decision-critical questions → deep research.
- Project health / prompt / workflow / tool / governance / regression → Personal Research/Project Improvement.

For unclear scope, derive **MUST / SHOULD / COULD** internally. Ask only when an unresolved point materially blocks reliable work.

## Evidence Rules

Preferred evidence order:

1. Manufacturer / primary source
2. Technical documentation
3. Patent / drawing
4. Standard / authoritative technical publication
5. Peer-reviewed or specialist literature
6. Reputable distributor / industry source
7. Retail / marketplace / blog / forum

Product pages establish existence or advertised function, not hidden internal mechanism. Generic material knowledge does not prove a specific commercial grade. Search snippets are discovery aids, not consequential evidence.

## Tool Selection

- Personal research → ChatGPT Project + Web
- Existing structured knowledge → NotebookLM
- Team/shared reasoning → Custom Gemini
- Persistent source of truth → GitHub
- Repeatable task → local/released `Prompt.csv`
- Knowledge maintenance → ChatGPT Project + Web + GitHub
- Project improvement → ChatGPT Project + GitHub + Regression

Do not create a parallel research database.

## Project Improvement & Governance

Project Improvement is nested under `Personal Research/` and uses the same maintainer toolchain.

Use observed results, failures, feedback, and regression tests to improve:
- workstream design
- prompts
- research routing
- tool selection
- documentation
- validation

Cycle:

`Observe → Identify Gap → Propose Change → Test → Human Verify → Promote to Baseline`

No improvement becomes baseline automatically.

## Visualization

Use Mermaid only when it materially improves understanding, review, or logic checking. Use tables or text when clearer. Visualization is presentation only, never a second source of truth.

## Decisions

- This topic has three active workstreams: Knowledge Sheet, Personal Research, and Idea Review.
- Idea Review is the unified successor to `Existing Ideas/` and `Bi-weekly review/`.
- Project Improvement & Governance is a maintainer capability nested under Personal Research.
- `Knowledge sheet/Prompt.csv` is the team-released prompt library; maintainer/workstream prompts remain in their relevant workstream folders.
- Prompt assets are colocated with the workstream or maintainer capability they serve.
- `ADTD Prompting/` is retired; its useful prompt assets are redistributed to the relevant workstreams.
- Git history is the historical record; do not create manual archive copies unless explicitly required.
- Knowledge Sheet remains the reusable structured knowledge layer; research output is not automatically promoted into it.

## Lessons

- Evidence quality matters more than volume.
- Research should stop when additional work is unlikely to change the decision.
- Inferred connections are useful for discovery but must not silently become authoritative relationships.
- Workflow complexity should be justified by repeated real usage.

## Routing

`Knowledge sheet/` → reusable knowledge and evidence

`Personal Research/` → personal research, external investigation, and Project Improvement

`Idea Review/` → evidence review, gap identification, targeted research requests, and idea modification

## Next

Use the workstream READMEs and local `Prompt.csv` files as the entry points for detailed recurring work. Project Improvement tasks are under `Personal Research/Project Improvement/`. Keep this README focused on durable routing, architecture, and current state.
