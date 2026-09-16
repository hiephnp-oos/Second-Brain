# AI Memory Workflow

## Objective

Keep GitHub knowledge useful, current, and small enough for an AI to read and continue work.

The workflow exists to maintain the business goal: a new AI should be able to read the repository and continue a relevant topic without the user re-explaining established context.

The operating loop is:

`Conversation / Source → Knowledge → Routing → Continuation`

Phase 2 (Memory Quality), Phase 3 (Retrieval / Routing), and Phase 4 (Handoff) run in parallel and are validated through real work.

## 1. Read before work

For a new task:

1. Read `AI_MEMORY.md`.
2. Identify the relevant topic folder(s).
3. Read only the relevant topic entry-point file(s).
4. If needed, read only the relevant child workstream folder/file(s).
5. Follow authoritative project/source references when detailed facts are needed.
6. Use the current conversation together with memory. Explicit current user information takes precedence over older memory.

## 2. Decide whether something becomes memory

Do not turn every conversation detail into memory.

Promote information only when it is:

- durable;
- useful to future work;
- supported by the conversation or an authoritative source;
- not already represented adequately elsewhere.

Keep temporary task state in the conversation.

Do not store secrets, credentials, tokens, passwords, or unnecessary copies of source material.

Before writing, distinguish:

- confirmed fact;
- explicit user decision;
- supported inference;
- assumption / unknown.

Only durable knowledge that belongs in the memory layer should be promoted.

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

Prefer `UPDATE` over `ADD` when the new information refines existing knowledge.

## 4. Update the smallest correct scope

Use:

- `AI_MEMORY.md` for durable user-level or cross-topic context.
- `TOPICS/<topic>/` for durable topic-specific context.
- A topic entry-point file for routing/summary context.
- Child workstream folders/files for detailed recurring work within a topic.

Prefer updating an existing entry over creating a duplicate.

Do not copy detailed project knowledge into the memory layer when an authoritative project repository or document already exists.

Exception: when a project is explicitly migrated into Second-Brain as an internal project source, the migrated project files are intentionally stored under its topic folder and become the detailed source for that topic. `RnD DATABASE` is currently such a project. Its architecture and deployment model are documented in `TOPICS/RnD DATABASE/README.md`.

If a new topic becomes recurring and needs durable context:

1. Create a topic folder under `TOPICS/`.
2. Add a concise entry-point file for that topic.
3. Add the topic to the active-topics table in `AI_MEMORY.md`.

If a topic needs a new recurring workstream:

1. Create a child folder under the topic folder.
2. Add the relevant working files/artifacts there.
3. Register the child folder in the topic entry-point file when discovery depends on it.

## 5. Memory quality check before writing

For every ADD / UPDATE / REMOVE, check:

- Is the information actually durable?
- Is it supported by evidence or explicit user context?
- Does it duplicate existing memory?
- Does it contradict existing memory?
- Is it temporary task state instead?
- Is the scope correct: global memory, topic summary, or child workstream?
- Would a future AI interpret it correctly without the original conversation?
- Does the change improve future work enough to justify storing it?

When information conflicts with older memory, prefer the newer explicit user decision or stronger evidence. Do not silently preserve two statements as if both are current. Git history remains the historical record.

Possible contradiction or uncertainty should be surfaced before writing when it could materially change future behavior.

## 6. Retrieval / routing

Use the smallest useful context path:

`AI_MEMORY.md → Topic → Workstream → Relevant artifact → Authoritative source`

For internally migrated projects, the final `Authoritative source` step may terminate inside the topic folder rather than an external repository. This is the current model for `RnD DATABASE`.

Rules:

1. Start from `AI_MEMORY.md`.
2. Route to the smallest relevant topic.
3. If child workstreams exist, route to the relevant workstream before reading broader material.
4. Read only files needed for the current task.
5. Follow explicit IDs and references when they exist.
6. Semantic reasoning may discover candidate connections that are not explicitly linked.
7. Candidate/inferred connections must be labeled as such and verified before becoming durable relationships.
8. Do not treat the existence of a file, folder, or ID as proof that the information is current.
9. When freshness matters, inspect Git history or the authoritative source.

For R&D Knowledge Sheet work, the normal explicit traversal is:

`MS → TR → ST / CT → SRC`

Semantic discovery may suggest a new candidate connection, but it must not silently alter the authoritative relationship fields.

## 7. Handoff

When a conversation needs to be continued by another AI or another conversation, produce a compact Handoff rather than a transcript.

A Handoff should contain only:

1. Current objective / question.
2. Established context needed for continuation.
3. Decisions made.
4. Important findings / evidence.
5. Open issues / uncertainty.
6. Immediate next step.
7. Proposed durable-memory changes: `ADD / UPDATE / REMOVE / NO_CHANGE`.

The receiving AI should:

1. Read `AI_MEMORY.md`.
2. Route to the relevant topic/workstream.
3. Read the Handoff/current task state.
4. Give current explicit user information highest priority.
5. Continue from the stated next step.

A Handoff is not automatically stored in GitHub. Store only the durable knowledge or decision that belongs in persistent memory.

A reusable Handoff prompt is maintained in:

`TOPICS/SYSTEMS/Handoff_Template.md`

## 8. Write memory for another AI

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

## 9. Commit discipline

When a memory change is made:

1. Update only the required file(s).
2. Use a clear commit message.
3. Keep the repository in a readable, consistent state.
4. Git history provides the historical record; do not create manual archive copies.

## 10. Phase 1 validation / failure modes

Real work is the test environment for Phases 2–4.

When a recurring failure is observed, capture it only when it is actionable for improving the workflow. Examples:

- wrong topic/workstream selected;
- useful context existed but was not retrieved;
- duplicate memory was created instead of updating existing knowledge;
- contradiction was missed;
- Handoff lost a decision or unresolved issue;
- retrieval required reading too much irrelevant context.

Do not create a permanent failure log for isolated events. Add a structured record only when repeated patterns justify it.

## 11. Review

Periodically inspect the memory for:

- stale information;
- duplicate information;
- contradictions;
- incorrect topic placement;
- obsolete decisions;
- topics/workstreams that are no longer useful;
- recurring retrieval or Handoff failures.

A review is a quality check. It should not silently invent or rewrite project status.

## 12. Scope guard

Do not introduce a knowledge graph, Obsidian layer, vector database, RAG system, automatic ingestion of every conversation, complex ontology, or other infrastructure unless repeated real usage demonstrates that the GitHub + Markdown workflow cannot meet the continuity goal.

## 13. Phase operating model

The three phases are operational rules within this workflow:

- Phase 2 — Memory Quality: distill durable knowledge, compare against existing memory, prefer UPDATE, detect duplication/contradiction, then write the smallest correct change.
- Phase 3 — Retrieval / Routing: route through the smallest useful context path; use explicit IDs/references first and treat semantic matches as candidate connections until verified.
- Phase 4 — Handoff: transfer task state as a compact continuation artifact; Handoff is temporary state, not persistent memory.

These phases are validated through real usage rather than by adding new infrastructure. Detailed reusable Handoff instructions are in `TOPICS/SYSTEMS/Handoff_Template.md`; retrieval testing is in `TOPICS/SYSTEMS/Retrieval_Test.md`.
