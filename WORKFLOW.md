# AI Memory Workflow

## Objective

Keep GitHub knowledge useful, current, consistent, and small enough for an AI to read and continue work.

The business goal is simple: a new AI should be able to read the repository and continue a relevant topic without the user re-explaining established context.

The operating loop is:

`Read → Plan → Change → Reconcile → Verify → Report`

The key principle is **repository state, not tool actions, is the definition of completion**. Creating or updating a file is only an implementation step. A task is complete only when the final repository state satisfies the requested outcome and all affected references/rules remain consistent.

## 1. Read before work

For a new task:

1. Read `AI_MEMORY.md`.
2. Identify the relevant topic folder(s) from the active-topic registry.
3. Read `TOPICS/<topic>/README.md`.
4. If needed, read only the relevant child workstream/project source.
5. Follow authoritative project/source references when detailed facts are needed.
6. Inspect the current repository state before deciding what must be created, updated, moved, or deleted.
7. Use the current conversation together with memory. Explicit current user information takes precedence over older memory.

## 2. Plan the repository change before writing

Before mutating GitHub, determine the intended final state.

At minimum, identify:

- files/folders that must exist;
- files/folders that must be updated;
- files/folders that must be removed because they are obsolete, temporary, duplicate, placeholder, or superseded;
- references that must change;
- workflow/template/registry documents that may be affected;
- whether the change is local to one topic or changes repository architecture.

For replacement operations, explicitly model:

`old state → target state`

Do not treat “new file created” as equivalent to “old file replaced”.

## 3. Standard topic structure

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

## 4. Topic README template

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

## 5. Decide whether something becomes memory

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

## 6. Classify the change

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

## 7. Update the smallest correct scope

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

## 8. Repository consistency rule — mandatory

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
4. Do renamed/deleted/superseded files no longer appear in active references?
5. Are temporary files, placeholder files, duplicates, and obsolete artifacts removed when the requested end-state requires their removal?
6. If the rule/template changed, is `WORKFLOW.md` aligned with the actual structure?
7. If repository architecture/navigation changed, is root `README.md` aligned?
8. Are there unnecessary duplicate registries or summary files that can drift?
9. Can the requested final state be demonstrated from the repository as it exists now, without relying on what the AI intended to do?

If any applicable answer is `No`, the change is incomplete.

## 9. Mandatory change lifecycle

Every GitHub mutation that changes repository content must follow this lifecycle:

### Phase A — Inspect

Read the authoritative current files and inspect the relevant directory/state.

### Phase B — Plan

Write down the target state internally, including deletions/replacements and dependent references.

### Phase C — Mutate

Apply the required creates, updates, and deletes.

For replacement or cleanup tasks, deletion is a first-class operation, not an optional cleanup step.

### Phase D — Reconcile

After mutation, reconcile the repository against the target state:

- update references to new paths/names;
- remove references to deleted/superseded artifacts;
- synchronize README/index/registry/workflow files when applicable;
- remove temporary files and placeholders that were only part of the working process;
- ensure the folder contains only the artifacts that belong in the requested final state.

### Phase E — Verify

Re-read the affected files and inspect the final repository state.

Verify both:

1. **Positive checks** — required files/content exist and are correct.
2. **Negative checks** — obsolete, duplicate, placeholder, temporary, or superseded items are absent.

A task involving replacement, cleanup, rename, migration, or restructuring must include negative checks explicitly.

### Phase F — Report

Report completion only after verification passes.

The final report should describe the resulting state, not merely the actions attempted. For example:

- what now exists;
- what was removed;
- what references were synchronized;
- any limitation that prevented exact completion.

Never claim a file was deleted, renamed, migrated, or synchronized solely because a delete/update/create action was attempted. Verify the resulting repository state first.

## 10. GitHub connector operating constraints

When working through the GitHub connector, treat the connector as an execution interface, not as the source of truth for completion.

Important:

- `create_file` creates a new file; it does not replace or remove another file.
- `update_file` updates an existing file only.
- `delete_file` is required to remove an obsolete file.
- The connector does not provide a generic rename/move primitive; perform the equivalent state transition explicitly and then verify it.
- Do not assume that creating a new canonical artifact automatically invalidates the old one.
- Do not leave `.tmp`, placeholder, `DELETE_ME`, staging, or duplicate artifacts unless they are explicitly part of the target design.
- When multiple operations are required, verify after the full logical change rather than after each individual tool action and then stopping early.

## 11. Memory quality check before writing

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

## 12. Retrieval / routing

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

## 13. Handoff

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

## 14. Write memory for another AI

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

## 15. Commit discipline

When a memory or structure change is made:

1. Update all files required by the consistency rule.
2. Use a clear commit message describing the change.
3. Verify the final repository structure and references.
4. Keep the repository readable and internally consistent.
5. Git history provides the historical record; do not create manual archive copies.

Prefer completing a logically related consistency update in one change rather than leaving the repository temporarily inconsistent.

## 16. Validation / recurring failure modes

Real work is the test environment, but repeated failures should strengthen the generic process rather than produce one-off patches.

The following failure modes are treated as workflow defects:

- wrong topic/workstream selected;
- useful context existed but was not retrieved;
- duplicate memory was created instead of updating existing knowledge;
- contradiction was missed;
- Handoff lost a decision or unresolved issue;
- one repository layer was updated while a dependent layer was left stale;
- topic README/template drifted from the workflow;
- root navigation became stale after an architecture change;
- a new/replacement artifact was created but the old artifact remained;
- temporary or placeholder files leaked into the final repository state;
- completion was reported without verifying the resulting repository state.

The prevention model is:

`Inspect → Plan target state → Mutate → Reconcile → Positive + Negative verification → Report`

When a new recurring failure is discovered, first determine whether an existing generic rule can already prevent it. Add a new rule only when the current workflow genuinely lacks the control.

Do not create a permanent failure log for isolated events. Add a structured record only when repeated patterns justify it.

## 17. Review

Periodically inspect the memory for:

- stale information;
- duplicate information;
- contradictions;
- incorrect topic placement;
- obsolete decisions;
- topics/workstreams that are no longer useful;
- recurring retrieval or Handoff failures;
- structural drift between the canonical registry, workflow rules, and topic READMEs;
- repeated GitHub execution errors that indicate a missing generic control.

A review is a quality check. It should not silently invent or rewrite project status.

## 18. Scope guard

Do not introduce a knowledge graph, Obsidian layer, vector database, RAG system, automatic ingestion of every conversation, complex ontology, or other infrastructure unless repeated real usage demonstrates that the GitHub + Markdown workflow cannot meet the continuity goal.
