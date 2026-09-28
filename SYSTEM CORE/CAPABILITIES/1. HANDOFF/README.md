# HANDOFF

## Purpose
Reusable session-continuity capability for transferring current task state between AI sessions without turning temporary handoff state into durable memory.

## Contract
- Trigger: a session must be continued by another AI or conversation.
- Input: current task, relevant topic/workstream, decisions, completed steps, unresolved items, and next action.
- Process: summarize only actionable continuity state; point to authoritative GitHub paths for durable facts.
- Output: a compact handoff using `Handoff_Template.md`.
- Validation: distinguish temporary task state from authoritative repository state; do not promote handoff claims without checking source of truth.
- Escalation: conflicting or missing durable information is resolved against current GitHub state before continuation.

## Boundary
Handoff is a reusable cross-topic capability. It does not own persistent memory and does not replace `AI_MEMORY.md`, `WORKFLOW.md`, or topic artifacts.
