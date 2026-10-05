# Second-Brain Operations

## Purpose

Compact execution reference. Canonical lifecycle and repository rules are defined in:

- `SYSTEM CORE/WORKFLOW.md`
- `SYSTEM CORE/REPOSITORY_CONTRACT.md`

Do not duplicate global workflow rules here.

## Standard lifecycle

```text
1. Read
2. Route
3. Execute
4. Target + Reconcile if durable change
5. Publish
6. Validate
7. Verify
8. Report
```

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
