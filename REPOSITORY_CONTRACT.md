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

## Scope and simplicity

Keep the system intentionally small. Add infrastructure only when repeated real usage demonstrates a limitation of the current GitHub + Markdown model. Prefer generic controls over one-off patches.
