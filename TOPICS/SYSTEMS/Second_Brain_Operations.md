# Second-Brain Operations

## Purpose

Operational guide for reliable AI interaction with Second-Brain. This document is a compact execution aid; canonical rules remain in `WORKFLOW.md` and `REPOSITORY_CONTRACT.md`.

## Standard lifecycle

`READ → ROUTE → INSPECT → TARGET STATE → CLASSIFY → RECONCILE → PRE-FLIGHT → ATOMIC CHANGE → VALIDATE → VERIFY → REPORT`

### READ

Read `AI_MEMORY.md` first. For repository mutations or structural work, also read `WORKFLOW.md` and `REPOSITORY_CONTRACT.md`.

### ROUTE

Select the smallest relevant path:

`AI_MEMORY → Topic README → Workstream README → Relevant artifact`

### INSPECT

Inspect the actual GitHub state before deciding what needs to change. Do not rely on an assumed state from the conversation.

### TARGET STATE

Define the desired final repository state before mutation:

- what must exist;
- what must be updated;
- what must be deleted;
- what references must change;
- what rules/templates/registries may be affected.

### CLASSIFY

For memory: `ADD / UPDATE / REMOVE / NO_CHANGE`.
For artifacts: create / update / replace / move / delete / no-change.

### CHANGE

Apply all required file and reference changes. Deletion is a first-class operation.

For multi-file logical changes, prefer a coherent commit when practical.

### RECONCILE

Bring all dependent files to the same final state. This includes README, registry, references, workstream metadata, and workflow documents when affected.

### PRE-FLIGHT

Validate the complete target state as far as the available checks allow before publishing. Confirm required files exist, references resolve, obsolete state is identified for removal, and defined data/structure contracts are internally consistent.

### ATOMIC CHANGE

Publish one logical multi-file change as one commit whenever practical. Do not intentionally leave `main` at a known-incomplete intermediate state.

Deletion is a first-class operation, not optional cleanup.

### VALIDATE

Run executable repository validation when available. Validate local data contracts such as CSV schema, IDs, configuration structure, or migration inventory when defined.

### VERIFY

Perform both:

Positive checks — required state exists.

Negative checks — obsolete, duplicate, placeholder, temporary, or superseded state is absent where required.

### REPORT

Describe the resulting repository state. Never report completion solely because a tool action succeeded.

## Risk levels

### Low risk

Single-topic content correction, small durable-memory update, typo/wording correction.

→ Direct main change + validation.

### Medium risk

New workstream, multiple related files, data release, configuration update.

→ Target-state planning + validation + final tree verification.

### High risk

Topic rename/move, architecture change, mass migration, workflow/contract change, security-sensitive change.

→ Prefer branch → change → validation → verification → merge when practical.

## When AI starts drifting

Use `TOPICS/SYSTEMS/User_Prompts.md`, especially:

- SB-03 reliable mutation;
- SB-04 target-state thinking;
- SB-05 deletion;
- SB-06 negative verification;
- SB-08 completion verification;
- SB-16 full mutation prompt.

## Completion definition

A task is complete only when the final GitHub repository state satisfies the requested target state and validation/verification pass.

`Tool success ≠ Task completion`
