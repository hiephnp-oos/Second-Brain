# Second-Brain Repository Contract

This file defines the repository invariants that must remain true regardless of which AI or connector performs the work. `WORKFLOW.md` defines how to operate; this file defines the state that must be true.

## Core invariants

### Root

- `AI_MEMORY.md` exists and is the canonical global memory/topic registry.
- `WORKFLOW.md` exists and is the canonical process/template/validation authority.
- `README.md` exists and provides human-readable repository orientation.
- `TOPICS/` contains the active topic folders.

### Topic

- Every active topic has exactly one topic-level entry point: `TOPICS/<topic>/README.md`.
- The topic README contains the nine core sections defined by `WORKFLOW.md`, including a lifecycle `State` plus `Summary`, `Direction`, and `Last reviewed`. `Active Workstreams` is accepted as the `Active Projects / References` core slot when the topic is organized primarily around workstreams.
- A topic README describes current routing/context, not a duplicate of all child artifacts.
- Topic lifecycle state is one of `Building`, `Active`, `Maintenance`, `Frozen`, `Paused`, or `Archived`.

### Workstream

- A recurring child workstream that needs routing has its own README.
- Workstream README describes the purpose, current state, routing, and authoritative artifacts for that workstream.
- A workstream README does not become a second global registry.

### Artifacts

- Every artifact has one intended current role.
- Replacement does not mean coexistence: when an old artifact is superseded, the old artifact is removed unless history/archival retention is explicitly part of the design.
- `.tmp`, `.temp`, `DELETE_ME`, placeholder, and accidental duplicate artifacts must not remain in the final state.
- Operational state directories are allowed only when explicitly defined by their owning workstream contract; they are not treated as accidental temporary artifacts.
- Git history is the default historical archive. Do not create manual archive copies merely to preserve previous versions.

### References

- Active references point to existing paths or authoritative external sources.
- Deleted/renamed/superseded paths are removed from active references.
- A reference to a file is not proof that the file is current; freshness must be checked when it matters.

### Memory

- Persistent memory is concise and durable.
- Temporary task state belongs in conversation/Handoff unless explicitly promoted.
- `ADD / UPDATE / REMOVE / NO_CHANGE` is used for memory decisions.
- Secrets, credentials, tokens, passwords, and unnecessary confidential material are excluded.

## Source-of-truth hierarchy

When information conflicts, use this order unless the user explicitly overrides it:

1. Current explicit user instruction.
2. Authoritative project/source data.
3. Current workstream artifact.
4. Topic README.
5. `AI_MEMORY.md`.
6. Handoff/current task state.
7. AI inference.

Inference must be labeled as inference and cannot silently become authoritative memory.

## Operational state

Operational state is permitted only when it has a documented owner, purpose, lifecycle, and retention rule in the relevant workstream README. The current approved operational staging directory is `TOPICS/6. RnD INNOVATION/1. Personal Research/1. Claw Discovery/staging/`; its records are scheduler state and are intentionally retained for evidence traceability.

## Change contract

For any repository mutation:

`Inspect → Target State → Classify → Reconcile → Pre-flight → Atomic Mutate → Validate → Verify → Report`

A successful connector action is an implementation result, not completion evidence.

## Atomic publication contract

- One logical multi-file change must be published as one atomic commit whenever practical.
- `main` must not be intentionally left at a known-incomplete intermediate state.
- Preferred sequence: build target tree → preflight validate → create one commit → update branch reference → wait for Actions validation → verify final state.
- If the execution interface cannot publish atomically, use a temporary branch/worktree and publish only the validated final state to `main`.
- A successful individual file operation is not evidence that the logical change is complete.

## Negative-state contract

For changes involving replacement, rename, cleanup, migration, or restructuring, the final state must demonstrate both:

- required state exists;
- forbidden/superseded state is absent.

This negative-state contract is specifically intended to prevent partial updates such as creating a new file while leaving the old file or placeholder behind.

## GitHub platform controls

Second-Brain uses GitHub's native capabilities as execution and verification layers without creating a second source of truth:

### GitHub Actions

`/.github/workflows/validate.yml` runs the executable repository validator on pushes to `main` and pull requests targeting `main`. Direct GitHub web uploads are therefore supported for valid low-risk single-file changes; the resulting commit is validated after publication.

The validator checks structural invariants, topic README/status requirements, forbidden artifacts, local references, supported data contracts, and required repository controls.

A validation PASS is evidence that defined machine-checkable invariants hold at that moment. It is not a substitute for human/contextual verification.

### AI Semantic Review

AI Semantic Review is an advisory PR review performed by ChatGPT through the GitHub repository connection. It may inspect the PR diff together with the relevant repository source-of-truth files and report semantic findings. It does not mutate repository content and does not replace deterministic validation or final-state verification.

No OpenAI API key is required for this review model. ChatGPT subscription access and OpenAI API access are separate products and billing systems.

### Issue Forms

`.github/ISSUE_TEMPLATE/change_request.yml` is the standardized change-request input for structured Second-Brain work. It captures target, objective, evidence, affected dependent layers, acceptance criteria, and completion checks.

Issue Forms do not replace direct conversation for ordinary low-risk work. They are available when a change benefits from explicit traceable requirements.

### Task Lists

Task lists/checklists are execution controls used to make completion criteria explicit. They track work; they do not define repository invariants. Canonical requirements remain in `WORKFLOW.md` and this contract, while automated checks enforce machine-verifiable requirements.

## Completion contract

A repository mutation is complete only when:

1. the target state is achieved;
2. obsolete/superseded state is absent where required;
3. affected references and canonical documents are synchronized;
4. automated validation passes when applicable;
5. the published logical change is atomic when the change spans multiple files, unless a branch-based workflow is explicitly used;
6. final repository state has been verified.

## Scope and simplicity

Keep the system intentionally small. Add infrastructure only when repeated real usage demonstrates a limitation of the current GitHub + Markdown model. Prefer generic controls over one-off patches.


### Folder ordering

- Ordered topic and routed workstream folders use numeric prefixes in the form `N. NAME`.
- Numeric order represents canonical workflow/navigation sequence; it is not alphabetical order.
- `AI_MEMORY.md` is the canonical topic order registry; affected topic/workstream README routing trees must remain synchronized.
- A reorder, rename, insertion, removal, or move of an ordered folder is incomplete until all affected references and validator rules are synchronized and the old path is absent.
- Supporting folders that are not routing stages may remain unnumbered.