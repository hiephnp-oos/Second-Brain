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
- The topic README contains the eight core sections defined by `WORKFLOW.md`.
- A topic README describes current routing/context, not a duplicate of all child artifacts.

### Workstream

- A recurring child workstream that needs routing has its own README.
- Workstream README describes the purpose, current state, routing, and authoritative artifacts for that workstream.
- A workstream README does not become a second global registry.

### Artifacts

- Every artifact has one intended current role.
- Replacement does not mean coexistence: when an old artifact is superseded, the old artifact is removed unless history/archival retention is explicitly part of the design.
- `.tmp`, `.temp`, `DELETE_ME`, placeholder, staging, and accidental duplicate artifacts must not remain in the final state.
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

## Change contract

For any repository mutation:

`Inspect → Target State → Classify → Mutate → Reconcile → Validate → Verify → Report`

A successful connector action is an implementation result, not completion evidence.

## Negative-state contract

For changes involving replacement, rename, cleanup, migration, or restructuring, the final state must demonstrate both:

- required state exists;
- forbidden/superseded state is absent.

This negative-state contract is specifically intended to prevent partial updates such as creating a new file while leaving the old file or placeholder behind.

## GitHub platform controls

Second-Brain uses GitHub's native capabilities as execution and verification layers without creating a second source of truth:

### GitHub Actions

`/.github/workflows/validate.yml` runs the executable repository validator on pushes to `main` and pull requests targeting `main`.

The validator checks structural invariants, topic README requirements, forbidden artifacts, local references, supported data contracts, and the presence of required platform controls.

A validation PASS is evidence that defined machine-checkable invariants hold at that moment. It is not a substitute for human/contextual verification.

### GitHub Rulesets

Rulesets are the enforcement layer for `main`. Repository governance should prevent validated changes from being bypassed through direct or unsafe mutation where practical.

Rulesets must remain aligned with the validation workflow. Do not introduce a required status check that the workflow does not actually publish.

### GitHub Pages

GitHub Pages under `docs/` is a presentation/navigation layer only. Repository Markdown remains the source of truth. Pages may add visual navigation, architecture maps, and future knowledge views without creating duplicate authoritative content.

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
5. final repository state has been verified.

## Scope and simplicity

Keep the system intentionally small. Add infrastructure only when repeated real usage demonstrates a limitation of the current GitHub + Markdown model. Prefer generic controls over one-off patches.
