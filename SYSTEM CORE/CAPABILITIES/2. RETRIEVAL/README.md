# RETRIEVAL

## Purpose
Reusable cross-topic retrieval/routing validation capability that checks whether an AI can locate the correct durable context from the repository.

## Contract
- Trigger: onboarding, routing review, or retrieval regression test.
- Input: a task/query and expected topic/workstream source.
- Process: `AI_MEMORY → Topic README → Workstream/Capability → Artifact`; record the minimum path needed to answer the task.
- Output: retrieval result plus any missing, stale, ambiguous, or duplicate routing signal.
- Validation: verify the selected source exists and is authoritative for the requested information.
- Escalation: ambiguous routing is reported for workflow/README improvement rather than silently guessed.

## Boundary
Retrieval is a routing/validation capability, not a search database, knowledge graph, or RAG engine.
