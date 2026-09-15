# Second Brain — Phase 2–4 Operating Model

## Purpose

This document defines the first operational implementation of Phase 2 (Memory Quality), Phase 3 (Retrieval / Routing), and Phase 4 (Handoff).

The business goal remains:

> A new AI should be able to read the repository and continue relevant work without the user re-explaining established context.

The operating loop is:

`Conversation / Source → Knowledge → Routing → Continuation`

The three phases run in parallel. Phase 1 real-world usage remains the validation environment for all three.

## Phase 2 — Memory Quality

### Objective

Make durable memory more useful without turning the repository into a conversation archive.

### Core rule

A conversation does not become memory automatically. The AI must first distill durable knowledge, then determine whether the correct action is:

`ADD | UPDATE | REMOVE | NO_CHANGE`

### Maintenance sequence

1. Identify candidate durable knowledge.
2. Find existing memory that covers the same topic or decision.
3. Prefer `UPDATE` over `ADD` when existing knowledge should be refined.
4. Check for contradiction, obsolescence, or duplicate representation.
5. Preserve the smallest correct scope.
6. Validate that another AI could interpret the result without the original conversation.
7. Write only after the proposal is evidence-supported.

### Quality checks

- Durable: useful beyond the current task.
- Supported: based on explicit user context or authoritative evidence.
- Non-duplicative: does not restate existing knowledge unnecessarily.
- Non-contradictory: superseded decisions are replaced or clearly marked as historical through Git history.
- Routable: future AI can discover where the knowledge belongs.
- Actionable: wording tells another AI how the knowledge affects future work.

### Inspired by references

Use the useful part of LLM Wiki / AI Second Brain patterns:

- compile knowledge instead of storing raw conversation;
- update existing knowledge when new evidence changes it;
- surface contradictions before writing;
- treat maintenance as a recurring AI task;
- keep an explicit schema/workflow that disciplines the AI.

Do not adopt:

- Obsidian vault architecture;
- conversation-export archive as the memory layer;
- automatic ingestion of every conversation;
- full automated linting infrastructure.

## Phase 3 — Retrieval / Routing

### Objective

Reduce the amount of repository context an AI must read while increasing the probability of finding the correct knowledge.

### Current routing hierarchy

`AI_MEMORY.md → TOPIC → Workstream → Relevant artifact → Authoritative source`

### Retrieval rules

1. Start from `AI_MEMORY.md`.
2. Route to the smallest relevant topic.
3. If the topic has workstreams, route to the specific workstream before reading broader files.
4. Read only artifacts relevant to the current task.
5. Follow explicit IDs / references when available.
6. Use semantic reasoning to discover candidate connections, but label them as inferred/candidate rather than established relationships.
7. Never convert an inferred connection into an authoritative relationship without evidence.

### R&D Innovation example

The Knowledge Sheet already provides explicit ID-based traversal:

`MS → TR → ST / CT → SRC`

For example:

`TR-015 → MS-003 → ST-021 → SRC-044`

The AI may also find a semantically relevant record that is not explicitly linked. Such a result must be treated as a candidate connection and verified before being written back to the Knowledge Sheet.

### Inspired by references

Use the useful part of relationship/claim discovery:

- discover relevant concepts that are not linked yet;
- separate deterministic/existing links from semantic candidates;
- use claims and source references to improve reasoning.

Do not adopt:

- a knowledge graph database;
- implicit graph generation as authoritative memory;
- graph visualization as a required component;
- a new entity/claim database at the current scale.

## Phase 4 — Handoff

### Objective

Allow a conversation to stop and another AI/conversation to continue with minimal context loss.

### Handoff output

A Handoff is a compact state-transfer artifact, not a transcript.

It should capture only what the next AI needs:

1. Current objective / question.
2. Established context that matters for continuation.
3. Decisions made in this conversation.
4. Important findings / evidence.
5. Open issues or uncertainties.
6. Immediate next step.
7. Proposed durable-memory changes, classified as `ADD / UPDATE / REMOVE / NO_CHANGE`.

### Handoff sequence

`Current conversation → Distill state → Check existing memory → Propose memory delta → Validate → Continue`

A Handoff may be kept in the conversation or used as an explicit transfer prompt. It should not be stored permanently unless it contains durable knowledge that belongs in the repository.

### Next-AI onboarding with Handoff

The receiving AI should:

1. Read `AI_MEMORY.md`.
2. Route to the relevant topic/workstream.
3. Read the Handoff/current task state.
4. Use the current conversation as the highest-priority fresh context.
5. Continue from the stated next step.

### Inspired by references

Use the useful pattern of turning conversation/history into structured, reusable context.

Do not adopt:

- permanent storage of every conversation;
- automatic history ingestion as the canonical memory;
- external messaging/channel systems as a dependency of Handoff.

## Validation Strategy

Phase 1 real-world usage validates Phases 2–4 together.

For each meaningful task, observe:

- Did the AI find the correct topic/workstream quickly?
- Did it reuse existing knowledge instead of asking for it again?
- Did memory updates improve future work?
- Did Handoff preserve the real state of the work?
- Did the AI introduce duplicate or contradictory memory?
- Did retrieval produce too much irrelevant context?

Record recurring failure modes before adding architecture.

## Stop Rule

Do not add a new retrieval engine, graph, vector database, automatic ingestion pipeline, or complex ontology unless repeated real-world usage demonstrates that GitHub + Markdown + the routing/maintenance rules above cannot meet the continuity goal.
