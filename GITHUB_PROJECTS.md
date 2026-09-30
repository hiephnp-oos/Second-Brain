# GitHub Projects — Execution Layer

GitHub Projects is the execution-tracking layer for Second-Brain. It is intentionally separate from the repository's knowledge model.

## Boundary

- Issues, pull requests, and Project views track execution state.
- Markdown files remain the source of truth for knowledge, workflow rules, capability contracts, and durable outputs.
- Project fields must not become a second authoritative copy of topic knowledge.
- Project automation may change execution status, but must not write back into canonical Markdown unless a separate repository mutation explicitly follows the normal Branch → PR → Validate → Verify lifecycle.

## Recommended project

Create one user-level Project named **Second-Brain Operations** and add this repository.

Recommended views:

| View | Purpose | Main filter/grouping |
|---|---|---|
| Board | Current execution | Status columns: Todo / In Progress / Review / Done |
| Table | Planning and traceability | Group by topic; sort by Priority then Status |
| Roadmap | Milestones | Group by topic; use target dates only when real deadlines exist |

Recommended fields:

- Status: Todo / In Progress / Review / Done
- Topic: AI General / Career / Nuvio Setup / R&D Database / R&D Innovation / System Core
- Workstream: free text or a controlled field when needed
- Priority: Low / Medium / High
- Target Date: date
- Change Type: Content / Workflow / Validation / Security / Presentation

## Operating rule

Use Projects to answer **what is being executed and where it is in the lifecycle**. Use the repository to answer **what is true and what the system actually contains**.
