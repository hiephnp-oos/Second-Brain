# AI Memory Workflow

## Objective

Keep GitHub knowledge useful, current, consistent, and small enough for an AI to read and continue work.

The business goal is simple: a new AI should be able to read the repository and continue a relevant topic without the user re-explaining established context.

The operating loop is:

`Conversation / Source → Knowledge → Routing → Continuation`

## 1. Read before work

For a new task:

1. Read `AI_MEMORY.md`.
2. Identify the relevant topic folder(s) from the active-topic registry.
3. Read `TOPICS/<topic>/README.md`.
4. If needed, read only the relevant child workstream/project source.
5. Follow authoritative project/source references when detailed facts are needed.
6. Use the current conversation together with memory. Explicit current user information takes precedence over older memory.

## 2. Standard topic structure

Every topic under `TOPICS/` must follow this structure:

```text
TOPICS/<topic>/
└── README.md                 ← mandatory topic entry point
    ├── Scope
    ├── Current Context
    ├── Working Principles
    ├── Active Projects / References
    ├── Decisions
    ├── Lessons
    ├── Routing
    └── Next
```

The eight core sections are the standard template for all topic READMEs.

Rules:

- `README.md` is mandatory and is the single primary entry point for the topic.
- Keep the eight core sections recognizable and in this order.
- Topic-specific sections may be inserted between the core sections when they materially improve routing or understanding.
- Do not create a second topic-level README or a parallel topic summary file containing the same role.
- Child folders/files contain detailed recurring work, project source, data, prompts, or artifacts; they do not replace the topic README.
- A project/source README may contain additional technical sections, but it must still use the same core topic sections when it is also the topic entry point.

## 3. Topic README template

Use this template when creating or restructuring a topic. Preserve useful existing content; do not rewrite merely for wording.

```markdown
# <Topic Name>

<Entry-point purpose: one concise sentence describing what belongs here.>

## Scope

<What recurring work belongs in this topic.>

## Current Context

<Durable context another AI needs to understand the topic.>

## Working Principles

- <Stable working rule>
- <Stable working rule>

## Active Projects / References

<Relevant projects, repositories, documents, or child workstreams.>

## Decisions

- <Durable decision>

## Lessons

- <Reusable lesson>

## Routing

<When to use this topic and where to look next.>

## Next

<What should be maintained or done when future work establishes new durable context.>
```

The template is a structure, not a requirement to fill every section with large amounts of text. Keep each topic README concise and durable.

## 4. Decide whether something becomes memory

Do not turn every conversation detail into memory.

Promote information only when it is:

- durable;
- useful to future work;
- supported by the conversation or an authoritative source;
- not already represented adequately elsewhere.

Keep temporary task state in the conversation or Handoff.

Do not store secrets, credentials, tokens, passwords, or unnecessary copies of source material.

Before writing, distinguish:

- confirmed fact;
- explicit user decision;
- supported inference;
- assumption / unknown.

## 5. Classify the change

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

## 6. Update the smallest correct scope

Use:

- `AI_MEMORY.md` for durable user-level or cross-topic context and the canonical active-topic registry.
- `TOPICS/<topic>/README.md` for durable topic context and routing.
- Child workstream folders/files for detailed recurring work.
- Authoritative project/source repositories for detailed project knowledge unless that project has explicitly been migrated into Second-Brain.

If a new topic becomes recurring:

1. Create `TOPICS/<topic>/`.
2. Create `TOPICS/<topic>/README.md` using the standard template.
3. Add the topic to the active-topics table in `AI_MEMORY.md`.
4. If the repository architecture itself changed, update the root `README.md`.
5. If the change introduces or changes a workflow rule, update `WORKFLOW.md` in the same change.

If a topic is renamed, moved, merged, split, or removed, update the canonical registry and all affected references in the same change.

For `RnD DATABASE`, the project was explicitly migrated into Second-Brain, so its detailed project files intentionally live under `TOPICS/RnD DATABASE/`.

## 7. Repository consistency rule — mandatory

A memory change is **not complete** when only the obvious file was updated.

The key design rule is: **one authoritative registry, minimum duplication**.

- `AI_MEMORY.md` is the canonical registry of active topics.
- `TOPICS/<topic>/README.md` is the canonical entry point for that topic.
- `WORKFLOW.md` is the authority for process and template rules.
- Root `README.md` is repository overview/navigation, not a second topic registry.

Before finishing any structural or memory-maintenance change, check the affected layers:

| Change | Required update/check |
|---|---|
| New topic | Topic `README.md` + `AI_MEMORY.md` |
| Rename/move topic | Topic path + `AI_MEMORY.md` + affected references; root `README.md` only if repository architecture/navigation text changes |
| Remove topic | Remove topic + `AI_MEMORY.md` + affected references; root `README.md` only if repository architecture/navigation text changes |
| New child workstream | Child folder/files + topic `README.md` |
| Topic structure/template rule changes | `WORKFLOW.md` + all affected topic READMEs + root `README.md` if its documented architecture/template description changes |
| Global memory change | `AI_MEMORY.md` + relevant topic README when topic routing/context is affected |
| Topic knowledge change | Relevant topic `README.md` or child artifact; update `AI_MEMORY.md` only if cross-topic/global |
| Handoff only | Handoff/current conversation; do not update durable memory unless a durable change is identified |

Minimum final check:

1. Does every topic folder have `README.md`?
2. Does `AI_MEMORY.md` list every active topic and point to the correct README?
3. Does every topic README follow the standard core template?
4. Do renamed/deleted files still appear in references?
5. If the rule/template changed, is `WORKFLOW.md` aligned with the actual structure?
6. If repository architecture/navigation changed, is root `README.md` aligned?
7. Are there unnecessary duplicate registries or summary files that can drift?

If any applicable answer is `No`, the change is incomplete.

This rule exists specifically to prevent the failure mode where an AI updates one layer and forgets the dependent registry, navigation page, or workflow rule.

## 8. Memory quality check before writing

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

## 9. Retrieval / routing

Use the smallest useful context path:

`AI_MEMORY.md → Topic README → Workstream → Relevant artifact → Authoritative source`

For internally migrated projects, the final source step may terminate inside the topic folder. This is the current model for `RnD DATABASE`.

Rules:

1. Start from `AI_MEMORY.md`.
2. Route to the smallest relevant topic.
3. Read the topic README before deeper files.
4. If child workstreams exist, route to the relevant workstream before reading broader material.
5. Read only files needed for the current task.
6. Follow explicit IDs and references when they exist.
7. Semantic reasoning may discover candidate connections that are not explicitly linked.
8. Candidate/inferred connections must be labeled as such and verified before becoming durable relationships.
9. Do not treat the existence of a file, folder, or ID as proof that the information is current.
10. When freshness matters, inspect Git history or the authoritative source.

## 10. Handoff

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

A Handoff is not automatically stored in GitHub. Store only durable knowledge or decisions that belong in persistent memory.

A reusable Handoff prompt is maintained in `TOPICS/SYSTEMS/Handoff_Template.md`.

## 11. Write memory for another AI

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

## 12. Commit discipline

When a memory or structure change is made:

1. Update all files required by the consistency rule.
2. Use a clear commit message describing the change.
3. Verify the final repository structure and references.
4. Keep the repository readable and internally consistent.
5. Git history provides the historical record; do not create manual archive copies.

Prefer completing a logically related consistency update in one change rather than leaving the repository temporarily inconsistent.

## 13. Validation / recurring failure modes

Real work is the test environment.

When a recurring failure is observed, capture it only when it is actionable for improving the workflow. Examples:

- wrong topic/workstream selected;
- useful context existed but was not retrieved;
- duplicate memory was created instead of updating existing knowledge;
- contradiction was missed;
- Handoff lost a decision or unresolved issue;
- one repository layer was updated while a dependent layer was left stale;
- topic README/template drifted from the workflow;
- root navigation became stale after an architecture change.

The current failure is explicitly recognized as a **consistency/drift failure**: an AI may correctly modify the topic files but forget to update the root navigation or workflow rules. The prevention mechanism is now:

`Canonical registry + Standard topic README + Mandatory consistency checklist + Final verification`

Do not create a permanent failure log for isolated events. Add a structured record only when repeated patterns justify it.

## 14. Review

Periodically inspect the memory for:

- stale information;
- duplicate information;
- contradictions;
- incorrect topic placement;
- obsolete decisions;
- topics/workstreams that are no longer useful;
- recurring retrieval or Handoff failures;
- structural drift between the canonical registry, workflow rules, and topic READMEs.

A review is a quality check. It should not silently invent or rewrite project status.

## 15. Scope guard

Do not introduce a knowledge graph, Obsidian layer, vector database, RAG system, automatic ingestion of every conversation, complex ontology, or other infrastructure unless repeated real usage demonstrates that the GitHub + Markdown workflow cannot meet the continuity goal.
