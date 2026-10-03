# Second-Brain Repository Contract

This file defines the repository invariants that must remain true regardless of which AI or connector performs the work. `SYSTEM CORE/WORKFLOW.md` defines how to operate; this file defines the state that must be true.

## Core invariants

### Root

- `AI_MEMORY.md` exists and is the canonical global memory/topic registry.
- `SYSTEM CORE/WORKFLOW.md` exists and is the canonical process/template/validation authority.
- `README.md` exists and provides human-readable repository orientation.
- `TOPICS/` contains the active topic folders.

### Topic

- Every active topic has exactly one topic-level entry point: `TOPICS/<topic>/README.md`.
- The topic README contains the nine core sections defined by `SYSTEM CORE/WORKFLOW.md`, including a lifecycle `State` plus `Summary`, `Direction`, and `Last reviewed`. `Active Workstreams` is accepted as the `Active Projects / References` core slot when the topic is organized primarily around workstreams.
- A topic README describes current routing/context, not a duplicate of all child artifacts.
- Topic lifecycle state is one of `Building`, `Active`, `Maintenance`, `Frozen`, `Paused`, or `Archived`.

### Capability / Workstream Boundary

- Capability folders contain reusable execution contracts and supporting instructions.
- Workstream folders contain business-context execution logic and workstream-owned outputs.
- A capability may be reused by multiple workstreams.
- A workstream may consume multiple capabilities.
- Operational output, staging, batches, and reports must not be stored inside a reusable capability folder.

## Workstream

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

## Capability and lifecycle invariants

- Capability is a reusable, provider-independent execution unit; existing workstreams may be its boundary.
- Staging is intermediate/unvalidated state and never authoritative merely because it exists.
- Material mutations use Dry-run / target-state review where preview is possible, followed by post-update validation and final verification.
- Conflicting authoritative information must not be silently overwritten (Contradiction handling).
- Health/lint should target demonstrated failure modes before broader infrastructure is added.
- External schedules are triggers; repository documentation defines expected cadence and behavior, but no external schedule is considered synchronized without direct verification.

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

Operational state is permitted only when it has a documented owner, purpose, lifecycle, and retention rule in the relevant workstream README. Personal Research has no active staging or batch directories. Previous Claw records are retained directly in `TOPICS/E. RnD INNOVATION/2. WORKSTREAMS/2.1 PERSONAL_RESEARCH/` as historical reference; they are not active scheduler state.

## Change contract

For any repository mutation:

`Inspect → Target State → Classify → Reconcile → Pre-flight → Atomic Mutate → Validate → Verify → Report`

A successful connector action is an implementation result, not completion evidence.

## Atomic publication contract

- **Mandatory path:** every repository content mutation, including single-file and low-risk changes, must use a dedicated branch → PR to `main` → diff review → applicable validation → merge.
- Never write directly to `main` unless the user explicitly authorizes a direct-main exception for that specific change.
- Risk determines review depth, not whether a PR is required.
- Keep one logical change in one coherent commit whenever practical; do not expose known-incomplete intermediate states on `main`.
- Preferred sequence: inspect current `main` → create task branch → build target state → preflight validate → commit to task branch → open PR → review diff and checks → merge only after verification → re-read final `main` state.
- If branch/PR creation or validation is unavailable, stop before publishing to `main` and report the blocker. Do not silently fall back to direct-main writes.
- A successful individual file operation or PR creation is not evidence that the logical change is complete.
- **Atomic mutation tool rule:** do not publish sequential per-file contents writes directly to `main`. Build the complete target tree on the task branch and publish a coherent commit.

## Negative-state contract

For changes involving replacement, rename, cleanup, migration, or restructuring, the final state must demonstrate both:

- required state exists;
- forbidden/superseded state is absent.

This negative-state contract is specifically intended to prevent partial updates such as creating a new file while leaving the old file or placeholder behind.

## GitHub platform controls

Second-Brain uses GitHub's native capabilities as execution and verification layers without creating a second source of truth:

### GitHub Actions

`/.github/workflows/validate.yml` runs the executable repository validator on pushes to `main` and pull requests targeting `main`. PR validation is the required pre-merge gate for every repository mutation; a low-risk single-file change is not exempt.

The validator checks structural invariants, topic README/status requirements, forbidden artifacts, local references, supported data contracts, and required repository controls.

A validation PASS is evidence that defined machine-checkable invariants hold at that moment. It is not a substitute for human/contextual verification.

### AI Semantic Review

AI Semantic Review is an advisory PR review performed by ChatGPT through the GitHub repository connection. It may inspect the PR diff together with the relevant repository source-of-truth files and report semantic findings. It does not mutate repository content and does not replace deterministic validation or final-state verification.

No OpenAI API key is required for this review model. ChatGPT subscription access and OpenAI API access are separate products and billing systems.

### Issue Forms

`.github/ISSUE_TEMPLATE/change_request.yml` is the standardized change-request input for structured Second-Brain work. It captures target, objective, evidence, affected dependent layers, acceptance criteria, and completion checks.

Issue Forms do not replace direct conversation for ordinary low-risk work. They are available when a change benefits from explicit traceable requirements.

### Task Lists

Task lists/checklists are execution controls used to make completion criteria explicit. They track work; they do not define repository invariants. Canonical requirements remain in `SYSTEM CORE/WORKFLOW.md` and this contract, while automated checks enforce machine-verifiable requirements.

### GitHub Projects

`GITHUB_PROJECTS.md` defines the execution-tracking boundary for the user-level **Second-Brain Operations** project. Projects track issue/PR status, topic/workstream visibility, priority, dates, and milestones only. Markdown remains the source of truth; Project fields must not become a second authoritative copy of repository knowledge or capability contracts.

The actual Project board is account-level GitHub state. It is not required for repository validation and must not write canonical Markdown or bypass the normal Branch → PR → Validate / Review → Merge lifecycle.

### Security

`SECURITY.md` defines the security reporting/baseline boundary. Public-repository secret scanning is GitHub-managed, and `.github/dependabot.yml` requests weekly GitHub Actions dependency updates. Security findings and dependency maintenance remain within the normal repository mutation lifecycle when repository changes are required.

## Completion contract

A repository mutation is complete only when:

1. the target state is achieved;
2. obsolete/superseded state is absent where required;
3. affected references and canonical documents are synchronized;
4. automated validation passes when applicable;
5. the change was made through a task branch and PR, reviewed, validated as applicable, and merged only after verification;
6. final repository state has been verified.

## Scope and simplicity

Keep the system intentionally small. Add infrastructure only when repeated real usage demonstrates a limitation of the current GitHub + Markdown model. Prefer generic controls over one-off patches.


### Folder ordering

- Ordered topic and routed workstream folders use numeric prefixes in the form `N. NAME`.
- Numeric order represents canonical workflow/navigation sequence; it is not alphabetical order.
- `AI_MEMORY.md` is the canonical topic order registry; affected topic/workstream README routing trees must remain synchronized.
- A reorder, rename, insertion, removal, or move of an ordered folder is incomplete until all affected references and validator rules are synchronized and the old path is absent.
- Supporting folders that are not routing stages may remain unnumbered.

### Capability contract completeness

Each active reusable Capability contract must satisfy its owning capability baseline. For R&D Innovation, the required contract is the shared 15-field standard defined in `TOPICS/E. RnD INNOVATION/1. CAPABILITIES/README.md`: Identity and purpose, Use cases, Trigger / non-trigger, Inputs and preconditions, Procedure, Method selection, Tool boundary, Evidence and uncertainty, Output contract, Quality gates, Handoffs, Human gate, Failure and stop conditions, Persistence boundary, Examples and tests.

Generic active capabilities outside R&D retain the 13 operational fields unless their owning topic defines a stricter contract.

The minimum execution lifecycle is: Trigger → Input → Execute → Output → Validate → Verify → Persist / Promote.

For R&D Innovation, six active reusable capabilities are CLAW_DISCOVERY, VERIFICATION, DEEP_RESEARCH, EVALUATION, KNOWLEDGE_PROMOTION, and SUPPLIER_KNOWLEDGE_INTAKE. CAP-06 `EXPERIMENT_DESIGN` remains DEFER and is not an active capability. Workstreams are PERSONAL_RESEARCH, IDEA_REVIEW, and PROJECT_IMPROVEMENT. Capabilities do not own execution output; the invoking workstream owns its outputs.

## Scheduled Output Persistence Invariant

Execution success and persistence success are separate states. Required scheduled output must exist at its contract-defined path and be re-read and validated before success is reported. Missing output means the scheduled run is incomplete. Multi-file scheduled mutations follow the atomic publication contract.
