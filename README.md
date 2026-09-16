# Second-Brain

## Purpose

This repository is a provider-independent AI working-context layer.

The goal is simple: let a new AI read the user's durable working knowledge from GitHub and continue the relevant topic without requiring the user to re-explain established context.

This is **not** a conversation archive, a personal knowledge-management platform, or a knowledge graph.

## How it works

```text
GitHub knowledge
      ↓
AI_MEMORY.md
      ↓
Relevant TOPICS/<topic>/README.md
      ↓
Relevant child workstream / project source, when needed
      ↓
AI continues the work
      ↓
New durable knowledge?
   ┌──┴──┐
  No    Yes
  │      │
  │   ADD / UPDATE / REMOVE
  │      │
  │   update the correct scope
  │      │
  └──────┴────→ GitHub remains the source of truth
```

Operating principle:

`Conversation / Source → Knowledge → Routing → Continuation`

## Repository structure

The structure is intentionally small and has three layers:

```text
AI_MEMORY.md                 ← global memory + topic registry
WORKFLOW.md                  ← rules, templates, consistency checks
TOPICS/
├── AI GENERAL/README.md
├── CONSTRUCTION/README.md
├── NUVIO SETUP/README.md
├── SYSTEMS/README.md
├── RnD INNOVATION/README.md
└── RnD DATABASE/README.md
```

Topic-specific child folders and project files live below each topic README as needed. The topic README is always the entry point and durable routing/summary layer.

`AI_MEMORY.md` is the global topic registry. This root README is the repository navigation/overview page. When topics are added, renamed, moved, or removed, both must be updated in the same change.

## Standard topic README

Every topic folder must contain exactly one primary entry point:

`TOPICS/<topic>/README.md`

All topic READMEs use the same core template defined in `WORKFLOW.md`:

1. Scope
2. Current Context
3. Working Principles
4. Active Projects / References
5. Decisions
6. Lessons
7. Routing
8. Next

Topic-specific sections may be inserted when necessary, but the core sections should remain recognizable so another AI can route and read the topic consistently.

## Onboarding a new AI

1. Read `AI_MEMORY.md`.
2. Identify the relevant topic folder(s).
3. Read the relevant `TOPICS/<topic>/README.md`.
4. If needed, read only the relevant child workstream/project source.
5. Follow authoritative references when detailed facts are required.
6. Combine repository knowledge with the current conversation; current explicit user information takes precedence.
7. If a Handoff exists, use it as temporary continuation state after routing to the relevant topic/workstream.
8. Continue the work from the established context.

## Memory maintenance

A conversation is not automatically memory.

Promote information only when it is durable and useful beyond the current task. Before updating memory, classify the change as **ADD / UPDATE / REMOVE / NO_CHANGE**.

Update the smallest correct scope. Do not create duplicate memory when existing content can be refined.

For any structural or memory change, follow the consistency checklist in `WORKFLOW.md` before considering the change complete.

## Scope boundary

Keep the system deliberately small. Do not add Obsidian, a knowledge graph, vector database, RAG layer, automatic ingestion of all conversations, or other infrastructure unless repeated real usage demonstrates that the simpler GitHub-based workflow is insufficient.

Git history already provides historical versions. Detailed project knowledge should stay in its authoritative project source unless the project has explicitly been migrated into Second-Brain.
