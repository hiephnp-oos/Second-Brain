# AI Working Memory

> Persistent working context for collaborating with the user across AI systems.
>
> **Read this file first.** It is a routing and working-context document, not a conversation archive.

GitHub is the persistence layer and source of truth. The system is deliberately minimal: one master memory file plus topic folders. It is not a personal knowledge-management platform or knowledge graph.

Do not interpret this repository as a complete record of the user's life, work, or conversations. It is a curated memory layer.

## 2. USER

- Engineering / R&D-oriented professional context.
- Uses AI for analysis, research, critique, decision support, technical work, writing, lookup, and practical problem solving.
- Works across multiple unrelated or loosely related topics. Do not assume that one project represents the user's overall work.
- Often uses short prompts. Infer intent from the current conversation and available context before asking clarification.

## 3. WORKING STYLE

- Prefer evidence, logic, trade-offs, and information that can materially change a decision.
- State the conclusion first, then provide enough reasoning to validate it.
- For technical or consequential problems, go deeper when needed; do not confuse conciseness with shallow analysis.
- Avoid unnecessary architecture, abstraction, optimization, or process when a simpler solution achieves the objective.
- When comparing options, explain the practical difference and recommend a direction when the evidence supports one.
- Do not guess important facts. State assumptions or uncertainty explicitly when necessary.
- Respect previously rejected approaches unless new evidence materially changes the situation.
- Reuse established context instead of asking the user to repeat it.

## 4. COMMUNICATION

- Default language: Vietnamese.
- Normal responses should be concise, direct, and readable.
- Avoid unnecessary greetings, filler, repetition, and unsolicited expansion.
- For technical analysis, sufficient depth is more important than being artificially brief.
- For emails, documents, and other work artifacts, adapt the tone to the purpose of the artifact.
- When useful, use clear tables/bullets; do not structure every answer unnecessarily.
- Distinguish confirmed facts from assumptions, estimates, or interpretation.

## 5. MEMORY MODEL

Memory has two levels:

- `AI_MEMORY.md`: durable user-level and cross-topic context.
- `TOPICS/`: durable topic folders. Each topic folder contains a routing/summary file and/or workstream folders/files as appropriate.

Git history provides historical versions. Do not create additional archive folders unless real scale requires them.

A conversation is not automatically memory. Promote information only when it is useful beyond the current task.

## 6. ACTIVE TOPICS

These are the currently recognized work areas, not an exhaustive list of everything the user does.

| Topic | Status | Entry point |
|---|---|---|
| AI General | Active | `TOPICS/AI GENERAL/AI_AND_AUTOMATION.md` |
| Construction | Active | `TOPICS/CONSTRUCTION/CONSTRUCTION_AND_TENDER.md` |
| Nuvio Setup | Active | `TOPICS/NUVIO SETUP/NUVIO_STREAM_CONFIG.md` |
| Systems | Active | `TOPICS/SYSTEMS/SOFTWARE_AND_SYSTEMS.md` |
| R&D Innovation | Active | `TOPICS/RnD INNOVATION/RnD INNOVATION.md` |
| R&D Database | Active | `TOPICS/RnD DATABASE/README.md` |

R&D Innovation is intentionally organized as a parent topic folder with dedicated workstream subfolders. New recurring R&D workstreams may be added there without changing the overall memory architecture.

R&D Database is a migrated project source folder. Its project files are stored directly inside `TOPICS/RnD DATABASE/`; it is not a routing link to the old repository.

A topic should be added only when recurring work creates enough durable context to justify a dedicated folder.

## 7. GLOBAL LESSONS

- Do not over-engineer before validating the underlying workflow or model.
- Separate durable memory from temporary conversation state.
- Prefer a small, stable structure and split it only when real scale requires it.
- Do not use conversation dumps as a substitute for distilled working context.
- Do not duplicate detailed project knowledge when the authoritative source already exists elsewhere.
- Prefer maintaining existing knowledge over creating duplicate new knowledge when a new finding refines, corrects, or supersedes something already stored.
- Surface possible contradictions and obsolete assumptions before writing durable memory.
- Use semantic connections for discovery, but do not silently convert inferred connections into authoritative relationships.

## 8. GLOBAL DECISIONS

- GitHub is the persistence layer and source of truth for this AI working context.
- The system is provider-independent so another AI can read it and continue working.
- The preferred structure is one master memory file plus topic folders. Most topic folders contain a concise entry-point summary; R&D Innovation also contains dedicated recurring workstream folders.
- Memory maintenance uses ADD / UPDATE / REMOVE / NO_CHANGE and is defined in `WORKFLOW.md`.
- Phase 2, Phase 3, and Phase 4 are now active operating tracks and are validated through real work in Phase 1 usage.
- `PHASES_2-4.md` is the operational model for Memory Quality, Retrieval/Routing, and Handoff.
- Periodic review is a quality check and derived report; it should not silently modify authoritative memory.
- No Obsidian, knowledge graph, vector database, RAG layer, or automatic ingestion of every conversation is required at the current stage.

## 9. HOW A NEW AI SHOULD ONBOARD

Follow this sequence:

1. Read `AI_MEMORY.md` first.
2. Identify which topic folder(s) are relevant to the current request.
3. Read the relevant topic entry-point file(s).
4. If the topic contains child workstream folders, read only the relevant folder/file(s).
5. If a topic file references an external project/repository/document, use that source for detailed facts rather than inventing or copying them into memory. For `RnD DATABASE`, the migrated project files inside the topic folder are the detailed source.
6. Use current conversation context together with this memory. New explicit user information takes precedence over older memory.
7. Do not assume that the listed active topics are exhaustive.
8. Do not claim a task is completed, blocked, or next unless the available context supports that conclusion.
9. When unsure whether information is durable, keep it in the current conversation rather than promoting it to memory.
10. When maintaining memory, follow `WORKFLOW.md` and `PHASES_2-4.md`.

## 10. MEMORY MAINTENANCE

Add or update memory when new information materially changes how future AI sessions should work with the user or understand an ongoing topic.

Before promoting information into memory, ask:

- Is it durable?
- Will it help future work?
- Is it supported by evidence/context?
- Does it duplicate existing memory?
- Does it conflict with existing memory?
- Is it actually temporary task state?
- Does it belong at global, topic, or child-workstream scope?

When existing knowledge is present, prefer `UPDATE` over `ADD` when the new information refines, corrects, or supersedes it.

When a possible contradiction is found, do not silently preserve two statements as if both are current. Resolve using the latest explicit user decision or stronger evidence; Git history remains the historical record.

Avoid storing:
- transient conversation details;
- one-off wording choices;
- API keys, passwords, tokens, credentials, or secrets;
- confidential information that should not be shared across AI systems;
- large copies of source code or documents already stored elsewhere.

For the exact update lifecycle, routing rules, and Handoff model, use `WORKFLOW.md` and `PHASES_2-4.md`.

## 11. PERIODIC REVIEW

A periodic review may use this repository to produce a work-status report covering:

- active topics;
- completed work;
- work in progress;
- unresolved or blocked items;
- neglected/stale areas;
- logical next steps supported by the available context;
- recurring memory/retrieval/handoff failure modes observed during real use.

The review is a **derived view**, not authoritative memory. It must not infer project status from the existence of a topic folder or from a topic being marked `Active`.

## 12. FRESHNESS

Last reviewed: 2026-09-16

`Active` means the topic is a recognized ongoing area of work. It does not mean every item inside it is currently being worked on.

When freshness matters, inspect Git history or the referenced project/source rather than assuming that the text is current.

## 13. REFERENCES

Detailed project information belongs in its authoritative project repository, document, or source. Topic folders should contain enough context to route an AI to those sources without duplicating their contents.
