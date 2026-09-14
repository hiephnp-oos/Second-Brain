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
Relevant TOPICS/*.md
      ↓
AI continues the work
      ↓
New durable knowledge?
   ┌──┴──┐
  No    Yes
  │      │
  │   ADD / UPDATE / REMOVE
  │      │
  │   update the correct topic
  │      │
  └──────┴──→ GitHub remains the source of truth
```

## Repository structure

```text
AI_MEMORY.md
TOPICS/
├── AI_AND_AUTOMATION.md
├── CONSTRUCTION_AND_TENDER.md
├── R_AND_D.md
└── SOFTWARE_AND_SYSTEMS.md
WORKFLOW.md
```

## Onboarding a new AI

1. Read `AI_MEMORY.md`.
2. Identify the relevant topic(s).
3. Read only those topic files.
4. Follow referenced authoritative project/source repositories for detailed facts.
5. Combine repository knowledge with the current conversation; current explicit user information takes precedence.
6. Continue the work from the established context.

## Memory maintenance

A conversation is not automatically memory.

Promote information only when it is durable and useful beyond the current task. Before updating memory, decide whether the information should be **ADD**, **UPDATE**, **REMOVE**, or **NO_CHANGE**.

Use `WORKFLOW.md` for the maintenance rules.

## Scope boundary

Keep the system deliberately small. Do not add Obsidian, a knowledge graph, vector database, RAG layer, automatic ingestion of all conversations, or other infrastructure unless real usage demonstrates that the simpler GitHub-based workflow is insufficient.

Git history already provides historical versions. Detailed project knowledge should stay in its authoritative project repository instead of being copied into this memory layer.
