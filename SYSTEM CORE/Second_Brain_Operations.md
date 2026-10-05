# Second-Brain Operations

## Purpose

Compact execution reference. Canonical lifecycle and repository rules are defined in:

- `SYSTEM CORE/WORKFLOW.md`
- `SYSTEM CORE/REPOSITORY_CONTRACT.md`

Do not duplicate global workflow rules here.

## Standard lifecycle

Canonical lifecycle reference:

`READ → ROUTE → INSPECT → TARGET STATE → CLASSIFY → RECONCILE → PRE-FLIGHT → ATOMIC CHANGE → VALIDATE → VERIFY → REPORT`

The detailed lifecycle definition is maintained in `SYSTEM CORE/WORKFLOW.md`.

## Execution boundary

Capability owns business logic.

Scheduler only triggers execution and provides context.

Repository is source of truth for final state.

## Durable repository change

```text
Inspect
→ Define target state
→ Apply atomic change
→ Validate
→ Verify
→ Report
```

## Completion rule

Tool success is not task completion.

A change is complete only when the final repository state matches the target state and required validation/verification passes.
