# AI Memory Workflow

## Objective

Keep GitHub knowledge useful, current, consistent, and small enough for an AI to read and continue work.

The business goal is simple: a new AI should be able to read the repository and continue a relevant topic without the user re-explaining established context.

The repository itself is the source of truth for completion. AI/connector actions are implementation steps only.

The operating lifecycle is:

`READ → ROUTE → INSPECT → TARGET STATE → CLASSIFY → CHANGE → RECONCILE → VALIDATE → VERIFY → REPORT`

Canonical repository invariants are defined in `REPOSITORY_CONTRACT.md`.

## 1. Read before work

For a new task:

1. Read `AI_MEMORY.md`.
2. Identify the relevant topic folder(s) from the active-topic registry.
3. Read `TOPICS/<topic>/README.md`.
4. If the topic has a relevant child workstream, read its README before deeper artifacts.
5. For repository maintenance or structural changes, read `WORKFLOW.md` and `REPOSITORY_CONTRACT.md`.
6. Follow authoritative project/source references when detailed facts are needed.
7. Inspect the current repository state before deciding what must be created, updated, moved, or deleted.
8. Use the current conversation together with memory. Current explicit user information takes precedence over older memory.

## 2. Topic / Workstream / Artifact model

Use three practical levels:

```text
TOPIC
└── WORKSTREAM
    └── ARTIFACT
```

### Topic

A recurring area of work with enough durable context to justify `TOPICS/<topic>/README.md`.

Every active topic has one canonical topic-level entry point.

### Workstream

A recurring sub-area inside a topic that benefits from its own routing/context. A workstream may contain a README and detailed artifacts.

Do not create workstream READMEs merely for symmetry. Create them when the workstream is recurring, non-trivial, or needs independent routing/context.

### Artifact

A prompt, CSV, JSON, code file, research document, configuration, template, or other detailed working material. Artifacts are not automatically memory.

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
- Topic-specific sections may be inserted when they materially improve routing or understanding.
- Do not create a second topic-level README or a parallel topic summary file with the same role.
- Child workstream folders/files contain detailed recurring work, project source, data, prompts, or artifacts; they do not replace the topic README.

## 4. Workstream README

A recurring or non-trivial workstream should use:

```text
<workstream>/
└── README.md
    ├── Purpose / Scope
    ├── Current Context
    ├── Active Artifacts / References
    ├── Working Rules
    ├── Decisions / Status
    ├── Routing
    └── Next
```

This is a routing template, not a requirement to create large documentation. Keep it concise.

A workstream README is allowed to use a different technical structure when the folder is itself an authoritative project/source package, but it must remain clear enough for an AI to route to the right artifacts.

## 5. Topic README template

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

The template is structural, not a requirement to fill every section with large amounts of text. Keep each topic README concise and durable.

## 6. Decide whether something becomes memory

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

## 7. Classify the change

For memory, classify the decision as:

### ADD

New durable knowledge not already represented.

### UPDATE

Existing knowledge is changed, refined, corrected, or superseded.

### REMOVE

Existing knowledge is no longer valid or should no longer be retained.

### NO_CHANGE

The information is temporary, already known, unsupported, or not useful for future work.

For repository artifacts, additionally classify the operation as create / update / replace / move / delete / no-change.

Prefer `UPDATE` over `ADD` when new information refines existing knowledge.

## 8. Source-of-truth hierarchy

When information conflicts, use this order unless the current user explicitly overrides it:

1. Current explicit user instruction.
2. Authoritative project/source data.
3. Current workstream artifact.
4. Topic README.
5. `AI_MEMORY.md`.
6. Handoff/current task state.
7. AI inference.

Inference must be labeled as inference and cannot silently become authoritative memory.

## 9. Target-state planning

Before mutating GitHub, determine the intended final repository state.

At minimum, identify:

- files/folders that must exist;
- files/folders that must be updated;
- files/folders that must be removed because they are obsolete, temporary, duplicate, placeholder, or superseded;
- references that must change;
- workflow/template/registry documents that may be affected;
- whether the change is local to one topic or changes repository architecture.

For replacement operations, explicitly model:

`current state → target state`

Do not treat `new file created` as equivalent to `old file replaced`.

## 10. Update the smallest correct scope

Use:

- `AI_MEMORY.md` for durable user-level or cross-topic context and the canonical active-topic registry.
- `TOPICS/<topic>/README.md` for durable topic context and routing.
- Workstream README for recurring sub-area routing/context.
- Child artifacts for detailed work, data, prompts, configurations, and project source.
- Authoritative external repositories/documents for detailed source unless the project has explicitly been migrated into Second-Brain.

If a new topic becomes recurring:

1. Create `TOPICS/<topic>/`.
2. Create `TOPICS/<topic>/README.md` using the standard template.
3. Add the topic to the active-topics table in `AI_MEMORY.md`.
4. Update root `README.md` only when its documented repository architecture/navigation is affected.
5. If the change introduces or changes a workflow rule, update `WORKFLOW.md` in the same logical change.

If a topic/workstream is renamed, moved, merged, split, or removed, update the registry and all affected references in the same logical change.

For `RnD DATABASE`, the project was explicitly migrated into Second-Brain, so its detailed project files intentionally live under `TOPICS/RnD DATABASE/`.

## 11. Repository consistency rule — mandatory

A repository change is not complete when only the obvious file was updated.

The key design rule is:

**one authoritative source per fact + minimum duplication + synchronized dependents**

Canonical roles:

- `AI_MEMORY.md` — global memory + active-topic registry.
- `WORKFLOW.md` — operating process and templates.
- `REPOSITORY_CONTRACT.md` — invariants, source-of-truth hierarchy, completion contract.
- `TOPICS/<topic>/README.md` — topic entry point.
- Workstream README — recurring sub-area routing/context.
- Root `README.md` — human-oriented repository overview/navigation; not a second topic registry.

For a structural or memory-maintenance change, check the affected layers:

| Change | Required update/check |
|---|---|
| New topic | Topic README + `AI_MEMORY.md` |
| Rename/move topic | Path + `AI_MEMORY.md` + affected references |
| Remove topic | Remove path + `AI_MEMORY.md` + affected references |
| New workstream | Workstream artifacts/README as needed + topic README routing |
| Workstream rename/move | Path + workstream references + topic README |
| Topic template/rule change | `WORKFLOW.md` + affected READMEs + `REPOSITORY_CONTRACT.md` when invariants change |
| Global memory change | `AI_MEMORY.md` + affected topic/workstream context |
| Topic knowledge change | Topic/workstream/artifact; update `AI_MEMORY.md` only when global/cross-topic |
| Artifact replacement | New artifact + references + delete old artifact + verify absence |
| Handoff only | Current conversation/Handoff; no durable write unless justified |

Minimum final check:

1. Every topic folder has `README.md`.
2. Every active topic in `AI_MEMORY.md` points to the correct README.
3. Topic README core sections are present and ordered.
4. Relevant workstreams have usable routing information.
5. Renamed/deleted/superseded files no longer appear in active references.
6. Temporary, placeholder, duplicate, and obsolete artifacts are absent when the target state requires their removal.
7. If the process/template changed, `WORKFLOW.md` and `REPOSITORY_CONTRACT.md` are aligned.
8. If repository architecture/navigation changed, root `README.md` is aligned.
9. The final tree matches the target state rather than the AI's intended actions.
10. Automated validation passes when available.

If any applicable answer is `No`, the change is incomplete.

## 12. Mandatory change lifecycle

Every GitHub mutation that changes repository content must follow:

### Phase A — READ / ROUTE

Read the authoritative current files, identify the smallest useful context path, and determine the relevant topic/workstream.

### Phase B — INSPECT

Inspect the actual repository state before deciding what to mutate.

### Phase C — TARGET STATE

Define the desired final state, including deletions/replacements and dependent references.

### Phase D — CLASSIFY

Classify memory and artifact changes before writing.

### Phase E — CHANGE

Apply all required creates, updates, moves/deletes, and reference changes.

Deletion is a first-class operation, not optional cleanup.

### Phase F — RECONCILE

Synchronize README, registry, references, workflow, and other dependent layers. Remove temporary/placeholder artifacts that were only part of the working process.

### Phase G — VALIDATE

Run applicable automated and artifact-specific validation. Examples:

- repository contract validator;
- topic/README structure check;
- local reference check;
- CSV schema/column check;
- ID/reference integrity check;
- configuration schema/integrity check;
- migration inventory check.

### Phase H — VERIFY

Re-read affected files and inspect the final repository tree.

Perform both:

- **Positive verification** — required state exists and is correct.
- **Negative verification** — forbidden/obsolete/superseded state is absent where required.

Replacement, cleanup, rename, migration, and restructuring tasks require negative verification explicitly.

### Phase I — REPORT

Report the resulting state, not merely the actions attempted. State what exists, what was removed, what references were synchronized, and any limitation preventing exact completion.

Never claim that a file was deleted, renamed, migrated, synchronized, or validated solely because a connector call succeeded.

## 13. GitHub connector operating constraints

Treat the GitHub connector as an execution interface, not as completion truth.

- `create_file` creates a new file and does not replace another file.
- `update_file` updates an existing file only.
- `delete_file` is required to remove an obsolete file.
- The connector does not provide a generic rename/move primitive; implement the equivalent state transition explicitly.
- Do not assume a new canonical artifact invalidates an old artifact.
- Do not leave `.tmp`, `.temp`, placeholder, `DELETE_ME`, staging, or accidental duplicate artifacts unless explicitly part of the target design.
- When multiple file operations form one logical change, prefer one coherent commit when practical.
- After multi-step mutation, verify the complete final state rather than stopping after an individual successful tool action.

## 14. Risk-based execution

### Low risk

Single-file content correction, small durable-memory update, typo/wording change.

→ Direct main change + validation when available.

### Medium risk

New workstream, multiple related files, dataset/configuration release, backup replacement.

→ Target-state planning + validation + final tree verification.

### High risk

Topic move/rename, architecture change, mass migration, workflow/contract change, security-sensitive change.

→ Prefer branch → change → validation → verification → merge when practical.

Do not add branch/PR ceremony to ordinary low-risk memory maintenance unless it materially reduces risk.

## 15. Artifact lifecycle and versioning

Use explicit lifecycle status when it helps distinguish current from experimental artifacts:

`DRAFT → TESTING → VALIDATED → CURRENT → SUPERSEDED`

Do not create manual archive copies merely to preserve history. Git history is the default historical record.

Use explicit version numbers only when the user or workstream needs a recognizable release baseline (for example, Knowledge Sheet v2). Do not version every wording change.

For datasets/configurations:

- keep one clearly identified current baseline;
- preserve prior versions in Git history unless a separate retention policy exists;
- store integrity metadata when recovery depends on exact bytes.

## 16. Workstream-specific data contracts

Some workstreams contain structured source material with stronger invariants than generic Markdown.

Examples:

- R&D Knowledge Sheet: stable IDs, valid relationship references, source traceability, CSV structure.
- R&D Database: expected three-layer migration architecture and source inventory when migration occurs.
- AI configuration assets: schema integrity, role/variant labeling, and no credentials.

These local contracts must be documented in the workstream README and validated when the artifact is changed.

## 17. Retrieval / routing

Use the smallest useful context path:

`AI_MEMORY.md → Topic README → Workstream README → Relevant artifact → Authoritative source`

Rules:

1. Start from `AI_MEMORY.md`.
2. Route to the smallest relevant topic.
3. Read the topic README before deeper files.
4. If a recurring workstream exists, read its README before broader artifact sets.
5. Read only files needed for the current task.
6. Follow explicit IDs and references when they exist.
7. Semantic reasoning may discover candidate connections that are not explicitly linked.
8. Candidate/inferred connections must be labeled as such and verified before becoming durable relationships.
9. File existence is not proof of currency.
10. When freshness matters, inspect Git history or the authoritative source.

`TOPICS/SYSTEMS/Retrieval_Test.md` is the lightweight retrieval test. Repeated retrieval failure should strengthen the generic routing/control model before adding new retrieval infrastructure.

## 18. Handoff

When a conversation needs continuation by another AI or conversation, produce a compact Handoff rather than a transcript.

A Handoff contains:

1. Current objective / question.
2. Established context needed for continuation.
3. Decisions made.
4. Important findings / evidence.
5. Open issues / uncertainty.
6. Immediate next step.
7. Proposed durable-memory changes: ADD / UPDATE / REMOVE / NO_CHANGE.

The receiving AI should:

1. Read `AI_MEMORY.md`.
2. Route to the relevant topic/workstream.
3. Read the Handoff/current task state.
4. Give current explicit user information highest priority.
5. Continue from the immediate next step.

Handoff is temporary continuation state, not automatically persistent memory.

Reusable handoff prompt: `TOPICS/SYSTEMS/Handoff_Template.md`.

## 19. User prompt reinforcement layer

`TOPICS/SYSTEMS/User_Prompts.md` contains copy/reuse prompts for starting work, continuing topics, mutation, target-state planning, deletion, negative verification, and re-reading the core rules.

These prompts are a user-side reinforcement layer. They are not a second source of truth. Canonical rules remain in `WORKFLOW.md` and `REPOSITORY_CONTRACT.md`.

When an AI starts drifting or has recently made a partial update, the user may explicitly repeat the relevant prompt before continuing. The AI must still read the canonical repository rules.

## 20. Validation / recurring failure modes

Real work is the test environment. Treat repeated failures as workflow defects that should improve generic controls.

Known failure classes include:

- wrong topic/workstream selected;
- useful context existed but was not retrieved;
- duplicate memory created instead of updating existing knowledge;
- contradiction missed;
- Handoff lost a decision or unresolved issue;
- dependent repository layer left stale;
- topic/workstream README drifted from the actual structure;
- replacement artifact created while old artifact remained;
- temporary/placeholder artifacts leaked into final state;
- completion reported without verification;
- artifact schema/reference/ID integrity failed;
- migrated source inventory diverged from expected source.

When a new failure is discovered:

1. Identify the failed invariant/control.
2. Check whether current rules already cover it.
3. If they do, improve enforcement/validation rather than adding duplicate prose.
4. If they do not, add one generic rule or executable check.
5. Re-test the control against the repository.

Do not create a permanent failure log for isolated mistakes.

## 21. Review

Periodically inspect:

- stale information;
- duplicate information;
- contradictions;
- incorrect topic placement;
- obsolete decisions;
- unused workstreams;
- repeated retrieval/Handoff/consistency failures;
- structural drift between canonical documents and actual repository state;
- repeated GitHub execution problems that suggest missing automation or validation;
- public/security exposure that should not be present.

A review is a quality check. It must not invent or silently rewrite project status.

## 22. Scope guard

Do not introduce a knowledge graph, Obsidian layer, vector database, RAG system, automatic ingestion of every conversation, complex ontology, or other infrastructure unless repeated real usage demonstrates that the GitHub + Markdown model cannot meet the continuity goal.

Prefer generic controls, executable validation, and simple repository conventions first.
