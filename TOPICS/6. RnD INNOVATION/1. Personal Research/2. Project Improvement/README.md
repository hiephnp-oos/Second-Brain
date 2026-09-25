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

This is a maintainer capability under `1. Personal Research/`, not a separate top-level workstream.

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

- `01_RND_IMPLEMENTATION_PLAN.md` — first applied improvement path: deferred implementation plan for the validated R&D capability/skill execution pattern. It is an execution plan and is not the current execution layer.
- `02_SoL-Pi Reference Architecture.md` — second applied/reference path: independent architecture for selectively adapting SoL-Pi agent-harness principles when later evidence shows a material harness problem. It is intentionally independent from `01_RND_IMPLEMENTATION_PLAN.md` and does not activate or require any SoL-Pi implementation.
- `03_Future Improvement Reference Architecture.md` — third applied/reference path: future improvement architecture retained as a later option; it does not activate the architecture merely by existing.

Both documents are planning/reference artifacts. Neither changes the current R&D baseline merely by existing.

## Artifact Placement Rule

`2. Project Improvement/` is the canonical location for artifacts whose primary purpose is to improve how R&D Innovation operates.

This includes workflow, workstream, prompt, routing, tool, governance, validation, regression, scheduler, capability/skill execution, implementation-plan, and architecture-improvement artifacts.

Therefore:
- implementation plans for improving the R&D Innovation system belong here;
- reference/fallback architectures for improving the R&D Innovation system belong here;
- normal research outputs and product/technology evidence do not belong here unless they are specifically part of a project-improvement record.

### Placement Check

Before creating or moving an artifact:

1. Classify the artifact's primary purpose.
2. Identify the owning workstream.
3. Check the canonical location above.
4. Check for an existing artifact serving the same role.
5. Create/update only after the location and source-of-truth role are clear.

The artifact's purpose, not its filename or the fact that it concerns R&D, determines placement.


## Improvement History

Use this section to follow the actual improvement sequence. Numbering reflects application order, not file creation date.

| No. | Artifact | Status | Purpose / trigger |
|---|---|---|---|
| 01 | `01_RND_IMPLEMENTATION_PLAN.md` | Active experimental path | Applied after review of Claw Batch #2; added Strategic Scope / Tier 1 alignment, Product Architecture Trace, Technology ≠ Innovation, Positive Delta Discovery, transfer-candidate handling, and Tier 1 discovery focus for Batches #3–#4. |
| 02 | `02_SoL-Pi Reference Architecture.md` | Reference / fallback | Independent reference architecture to use only if the R&D implementation path later demonstrates a material harness limitation. |
| 03 | `03_Future Improvement Reference Architecture.md` | Future reference | Additional future-improvement reference retained for later evidence-driven evaluation; not part of the current execution baseline. |

### Follow Rule

Follow the numbered sequence when reviewing or deciding the next improvement:

`01 → observe/test → human review → 02 if needed → 03 if needed`

Do not interpret the numbering as an instruction to implement every artifact. Each later architecture remains conditional on evidence from the preceding stage and human verification.
