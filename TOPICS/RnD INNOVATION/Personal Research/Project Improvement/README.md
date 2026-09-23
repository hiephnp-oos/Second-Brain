# Project Improvement

## Purpose

Improve the R&D Innovation Project itself rather than perform normal product research.

Scope:
- Personal Research
- Knowledge Sheet + Claw
- Existing Ideas + Bi-weekly Review
- prompts
- routing
- tool selection
- documentation
- validation/regression

This is a maintainer capability under `Personal Research/`, not a separate top-level workstream.

## Improvement Cycle

`Observe → Identify Gap → Propose Change → Test → Human Verify → Promote to Baseline`

## Working Rules

- Base changes on observed output, failure, feedback, or regression evidence.
- State the problem, affected scope, proposed change, expected benefit, risks, and test.
- Prefer the smallest change that solves the demonstrated problem.
- Check backward impact on other workstreams.
- Do not promote a change automatically.
- Keep experimental work separate from current baseline until verified.

## Prompt

Use `Prompt.csv` in this folder for project-review and improvement tasks.

## Records

Use `Improvement Records/` for reviewed proposals and test outcomes. Use `Regression/` for regression cases/results when persistent records are useful.

## Implementation References

- `RND_IMPLEMENTATION_PLAN.md` — deferred implementation plan for the validated R&D capability/skill execution pattern. It is an execution plan and is not the current execution layer.
- `SoL-Pi Reference Architecture.md` — independent reference architecture for selectively adapting SoL-Pi agent-harness principles to R&D Innovation when later evidence shows a material harness problem. It is intentionally independent from `RND_IMPLEMENTATION_PLAN.md` and does not activate or require any SoL-Pi implementation.

Both documents are planning/reference artifacts. Neither changes the current R&D baseline merely by existing.
