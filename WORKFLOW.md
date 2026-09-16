# AI Memory Workflow

## Objective

Keep GitHub knowledge useful, current, consistent, and small enough for an AI to read and continue work.

The repository is the source of truth for completion. AI/connector actions are implementation steps only.

The operating lifecycle is:

`READ → ROUTE → INSPECT → TARGET STATE → CLASSIFY → CHANGE → RECONCILE → VALIDATE → VERIFY → REPORT`

Canonical repository invariants are defined in `REPOSITORY_CONTRACT.md`.

## 0. GitHub control layer

Second-Brain uses a small set of GitHub-native controls. They support execution and verification; they do not replace the Markdown source of truth.

### GitHub Actions

`.github/workflows/validate.yml` runs `scripts/validate_second_brain.py` on `main` pushes and pull requests targeting `main`.

The validator checks required files, topic README structure, active-topic routing, forbidden artifacts, local references, supported CSV contracts, and required repository controls.

A validation PASS is evidence that machine-checkable invariants hold at that moment. It does not replace final contextual verification.

### Issue Forms

`.github/ISSUE_TEMPLATE/change_request.yml` is the standardized request format for changes that benefit from explicit traceable requirements.

Use it when a request is multi-step, affects repository architecture, requires cleanup/negative-state checks, or needs acceptance criteria that should remain visible beyond a chat turn. Do not force an Issue Form onto ordinary low-risk work when direct conversation is sufficient.

### Task Lists

Use Markdown/GitHub task lists for multi-step execution and completion tracking.

A task list answers: "Have all required steps for this change been completed?" It does not redefine canonical requirements. `WORKFLOW.md` and `REPOSITORY_CONTRACT.md` remain authoritative, while GitHub Actions enforce machine-verifiable requirements.

Recommended checklist for meaningful repository mutations:

- [ ] Inspect current repository state
- [ ] Define target state
- [ ] Identify creates / updates / replacements / moves / deletes
- [ ] Synchronize dependent references and canonical documents
- [ ] Remove obsolete / duplicate / temporary artifacts
- [ ] Run automated validation
- [ ] Perform positive verification
- [ ] Perform negative verification
- [ ] Report final state

## 1. Read before work

1. Read `AI_MEMORY.md`.
2. Identify the relevant topic folder(s) from the active-topic registry.
3. Read `TOPICS/<topic>/README.md`.
4. If a relevant child workstream exists, read its README before deeper artifacts.
5. For repository maintenance or structural changes, read `WORKFLOW.md` and `REPOSITORY_CONTRACT.md`.
6. Follow authoritative project/source references when detailed facts are needed.
7. Inspect the actual repository state before deciding what to create, update, move, or delete.
8. Use current conversation context together with memory; current explicit user information takes precedence.

## 2. Topic / Workstream / Artifact model

Use three practical levels:

```text
TOPIC
└── WORKSTREAM
    └── ARTIFACT
```

A topic is a recurring area with enough durable context to justify `TOPICS/<topic>/README.md`.

A workstream is a recurring or non-trivial sub-area that benefits from independent routing/context. Do not create workstream READMEs merely for symmetry.

An artifact is detailed working material such as a prompt, CSV, JSON, code file, research document, configuration, or template. Artifacts are not automatically memory.

## 3. Standard topic structure

Every topic under `TOPICS/` must have:

```text
TOPICS/<topic>/
└── README.md
    ├── Scope
    ├── Current Context
    ├── Working Principles
    ├── Active Projects / References
    ├── Decisions
    ├── Lessons
    ├── Routing
    └── Next
```

The eight core sections are mandatory and must remain recognizable and in this order. Topic-specific sections may be added when they materially improve routing or understanding.

A topic README is the single primary entry point and should describe routing/context rather than duplicate all child artifacts.

## 4. Workstream README

A recurring non-trivial workstream may use:

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

Keep it concise. It is a routing layer, not a second global registry.

## 5. Memory decisions

Do not turn every conversation detail into memory.

Promote information only when it is durable, useful to future work, supported by context/evidence, and not already represented adequately elsewhere.

Use:

- `ADD` — new durable knowledge.
- `UPDATE` — existing knowledge is refined, corrected, or superseded.
- `REMOVE` — existing knowledge is no longer valid or should not be retained.
- `NO_CHANGE` — temporary, already known, unsupported, or not useful for future work.

Do not store secrets, credentials, tokens, passwords, or unnecessary confidential material.

## 6. Source-of-truth hierarchy

When information conflicts, use this order unless the current user explicitly overrides it:

1. Current explicit user instruction.
2. Authoritative project/source data.
3. Current workstream artifact.
4. Topic README.
5. `AI_MEMORY.md`.
6. Handoff/current task state.
7. AI inference.

Inference must be labeled as inference and cannot silently become authoritative memory.

## 7. Target-state planning

Before mutating GitHub, determine the intended final repository state.

Identify:

- files/folders that must exist;
- files/folders that must be updated;
- files/folders that must be removed because they are obsolete, temporary, duplicate, placeholder, or superseded;
- references that must change;
- workflow/template/registry documents that may be affected;
- whether the change is local to one topic or changes repository architecture.

For replacement operations explicitly model:

`current state → target state`

Do not treat `new file created` as equivalent to `old file replaced`.

## 8. Update the smallest correct scope

Use:

- `AI_MEMORY.md` for durable global/cross-topic context and the canonical active-topic registry.
- `TOPICS/<topic>/README.md` for durable topic context and routing.
- Workstream README for recurring sub-area routing/context.
- Child artifacts for detailed work, data, prompts, configurations, and project source.
- Root `README.md` for human-oriented repository overview/navigation, not a second topic registry.

When a new topic becomes recurring:

1. Create `TOPICS/<topic>/`.
2. Create its `README.md` using the standard template.
3. Add it to the active-topic table in `AI_MEMORY.md`.
4. Update root `README.md` when repository architecture/navigation is affected.
5. Update `WORKFLOW.md` in the same logical change if a workflow rule changes.

When a topic/workstream is renamed, moved, merged, split, or removed, update the registry and all affected references in the same logical change.

`RnD DATABASE` is an explicitly migrated project source, so its detailed files intentionally live under `TOPICS/RnD DATABASE/`.

## 9. Repository consistency rule — mandatory

A repository change is not complete when only the obvious file was updated.

**One authoritative source per fact + minimum duplication + synchronized dependents.**

For a structural or memory-maintenance change, check all affected layers:

| Change | Required update/check |
|---|---|
| New topic | Topic README + `AI_MEMORY.md` |
| Rename/move topic | Path + `AI_MEMORY.md` + affected references |
| Remove topic | Remove path + `AI_MEMORY.md` + affected references |
| New workstream | Workstream artifacts/README as needed + topic routing |
| Workstream rename/move | Path + references + topic README |
| Topic template/rule change | `WORKFLOW.md` + affected READMEs + `REPOSITORY_CONTRACT.md` when invariants change |
| Global memory change | `AI_MEMORY.md` + affected topic/workstream context |
| Topic knowledge change | Topic/workstream/artifact; update `AI_MEMORY.md` only when global/cross-topic |
| Artifact replacement | New artifact + references + delete old artifact + verify absence |
| Issue Form change | `.github/ISSUE_TEMPLATE/` + workflow/contract when behavior changes |
| Validation rule change | `scripts/validate_second_brain.py` + workflow/contract docs |
| Handoff only | Current conversation/Handoff; no durable write unless justified |

Minimum final check:

1. Every topic folder has `README.md`.
2. Every active topic in `AI_MEMORY.md` points to the correct README.
3. Topic README core sections are present and ordered.
4. Relevant workstreams have usable routing information.
5. Renamed/deleted/superseded files no longer appear in active references.
6. Temporary, placeholder, duplicate, and obsolete artifacts are absent when required.
7. If the process/template changed, `WORKFLOW.md` and `REPOSITORY_CONTRACT.md` are aligned.
8. If repository architecture/navigation changed, root `README.md` is aligned.
9. The final tree matches the target state rather than intended actions.
10. Automated validation passes when available.

If any applicable answer is `No`, the change is incomplete.

## 10. Mandatory change lifecycle

Every GitHub mutation that changes repository content must follow:

### READ / ROUTE

Read authoritative current files, identify the smallest useful context path, and determine the relevant topic/workstream.

### INSPECT

Inspect the actual repository state before deciding what to mutate.

### TARGET STATE

Define the desired final state, including deletions/replacements and dependent references.

### CLASSIFY

Classify memory and artifact changes before writing.

### CHANGE

Apply all required creates, updates, moves/deletes, and reference changes. Deletion is a first-class operation, not optional cleanup.

### RECONCILE

Synchronize README, registry, references, workflow, and other dependent layers. Remove temporary/placeholder artifacts that were only part of the working process.

### VALIDATE

Run applicable automated and artifact-specific validation, including repository contract checks, topic/README structure, local references, CSV schema, IDs, and workstream-specific integrity.

GitHub Actions should execute the machine-checkable repository validator automatically.

### VERIFY

Re-read affected files and inspect the final repository tree. Perform both positive verification (required state exists) and negative verification (forbidden/obsolete/superseded state is absent).

Replacement, cleanup, rename, migration, and restructuring require negative verification explicitly.

### REPORT

Report the resulting state, not merely actions attempted. State what exists, what was removed, what references were synchronized, and any limitation preventing exact completion.

Never claim that a file was deleted, renamed, migrated, synchronized, or validated solely because a connector call succeeded.

## 11. GitHub connector operating constraints

Treat the GitHub connector as an execution interface, not as completion truth.

- `create_file` creates a new file and does not replace another file.
- `update_file` updates an existing file only.
- `delete_file` is required to remove an obsolete file.
- The connector has no generic rename/move primitive; implement the equivalent state transition explicitly.
- Do not assume a new canonical artifact invalidates an old artifact.
- Do not leave `.tmp`, `.temp`, placeholder, `DELETE_ME`, staging, or accidental duplicate artifacts unless explicitly part of the target design.
- When multiple file operations form one logical change, prefer one coherent commit when practical.
- After multi-step mutation, verify the complete final state rather than stopping after an individual successful action.

## 12. Risk-based execution

### Low risk

Single-file correction, small durable-memory update, typo/wording change.

→ Direct main change + validation when available.

### Medium risk

New workstream, multiple related files, dataset/configuration release, backup replacement.

→ Target-state planning + validation + final tree verification.

### High risk

Topic move/rename, architecture change, mass migration, workflow/contract change, security-sensitive change.

→ Prefer branch → change → validation → verification → merge when practical.

Do not add branch/PR ceremony to ordinary low-risk memory maintenance unless it materially reduces risk.

## 13. Artifact lifecycle and versioning

Use lifecycle status when it helps distinguish current from experimental artifacts:

`DRAFT → TESTING → VALIDATED → CURRENT → SUPERSEDED`

Do not create manual archive copies merely to preserve history. Git history is the default historical record.

Use explicit version numbers only when the user or workstream needs a recognizable release baseline. Do not version every wording change.

For datasets/configurations:

- keep one clearly identified current baseline;
- preserve prior versions in Git history unless a separate retention policy exists;
- store integrity metadata when recovery depends on exact bytes.

## 14. Workstream-specific data contracts

Some workstreams contain stronger invariants than generic Markdown.

Examples:

- R&D Knowledge Sheet: stable IDs, valid relationship references, source traceability, CSV structure.
- R&D Database: expected three-layer migration architecture and source inventory when migration occurs.
- AI configuration assets: schema integrity, role/variant labeling, and no credentials.

These local contracts must be documented in the workstream README and validated when the artifact is changed.

## 15. Retrieval / routing

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
8. Candidate/inferred connections must be labeled and verified before becoming durable relationships.
9. File existence is not proof of currency.
10. When freshness matters, inspect Git history or the authoritative source.

`TOPICS/SYSTEMS/Retrieval_Test.md` is the lightweight retrieval test. Repeated retrieval failure should strengthen the generic routing/control model before adding retrieval infrastructure.

## 16. Handoff

When a conversation needs continuation by another AI or conversation, produce a compact Handoff rather than a transcript.

A Handoff contains:

1. Current objective / question.
2. Established context needed for continuation.
3. Decisions made.
4. Important findings / evidence.
5. Open issues / uncertainty.
6. Immediate next step.
7. Proposed durable-memory changes: ADD / UPDATE / REMOVE / NO_CHANGE.

The receiving AI should read `AI_MEMORY.md`, route to the relevant topic/workstream, read the Handoff/current task state, give current explicit user information highest priority, and continue from the immediate next step.

Handoff is temporary continuation state, not automatically persistent memory.

## 17. User prompt reinforcement layer

`TOPICS/SYSTEMS/User_Prompts.md` contains reusable prompts that reinforce critical repository rules when starting work with a new AI or when an AI has shown signs of skipping repository verification.

These prompts reinforce the canonical rules; they do not override `WORKFLOW.md` or `REPOSITORY_CONTRACT.md`.
