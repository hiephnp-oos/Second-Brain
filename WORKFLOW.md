# AI Memory Workflow

## Objective

Keep GitHub knowledge useful, current, and small enough for an AI to read and continue work.

The workflow exists to maintain the business goal: a new AI should be able to read the repository and continue a relevant topic without the user re-explaining established context.

## 1. Read before work

For a new task:

1. Read `AI_MEMORY.md`.
2. Identify the relevant topic file(s).
3. Read only the relevant topic file(s).
4. Follow authoritative project/source references when detailed facts are needed.
5. Use the current conversation together with memory. Explicit current user information takes precedence over older memory.

## 2. Decide whether something becomes memory

Do not turn every conversation detail into memory.

Promote information only when it is:

- durable;
- useful to future work;
- supported by the conversation or an authoritative source;
- not already represented adequately elsewhere.

Keep temporary task state in the conversation.

Do not store secrets, credentials, tokens, passwords, or unnecessary copies of source material.

## 3. Classify the change

Every proposed memory change should be classified as one of:

### ADD

New durable knowledge that is not already represented.

### UPDATE

Existing knowledge is changed, refined, corrected, or superseded.

### REMOVE

Existing knowledge is no longer valid or should no longer be retained.

### NO_CHANGE

The information is temporary, already known, unsupported, or not useful for future work.

## 4. Update the smallest correct scope

Use:

- `AI_MEMORY.md` for durable user-level or cross-topic context.
- `TOPICS/<topic>.md` for durable topic-specific context.

Prefer updating an existing entry over creating a duplicate.

Do not copy detailed project knowledge into this repository when an authoritative project repository or document already exists. Store enough context to route an AI to that source.

If a new topic becomes recurring and needs durable context, create a topic file and add it to the active-topics table in `AI_MEMORY.md`.

## 5. Validate before writing

Before committing an ADD, UPDATE, or REMOVE, check:

- Is the information actually durable?
- Is it supported by evidence or explicit user context?
- Does it duplicate existing memory?
- Does it contradict existing memory?
- Is it temporary task state instead?
- Is the scope correct: global memory or topic memory?
- Would a future AI interpret it correctly without the original conversation?

When information conflicts with older memory, prefer the newer explicit user decision or stronger evidence. Do not silently preserve both as if both were current.

## 6. Write memory for another AI

Memory should describe the working context clearly enough for another AI to act on it.

Prefer:

- concise statements;
- stable principles and decisions;
- practical working context;
- source/reference pointers when detail lives elsewhere.

Avoid:

- conversation transcripts;
- speculative conclusions presented as facts;
- one-off wording;
- unnecessary implementation detail;
- duplicated information across files.

## 7. Commit discipline

When a memory change is made:

1. Update only the required file(s).
2. Use a clear commit message.
3. Keep the repository in a readable, consistent state.
4. Git history provides the historical record; do not create manual archive copies.

## 8. Review

Periodically inspect the memory for:

- stale information;
- duplicate information;
- contradictions;
- incorrect topic placement;
- obsolete decisions;
- topics that are no longer useful.

A review is a quality check. It should not silently invent or rewrite project status.

## 9. Scope guard

Do not introduce a knowledge graph, Obsidian layer, vector database, RAG system, automatic ingestion of every conversation, complex ontology, or other infrastructure unless real usage demonstrates that the GitHub + Markdown workflow cannot meet the continuity goal.
