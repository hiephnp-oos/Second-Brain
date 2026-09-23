# Systems

Entry point and durable topic context for recurring work involving software, technical systems, repositories, scripting, architecture, debugging, configuration, integrations, and Second-Brain system support.

## Scope

Software development, GitHub repositories, scripting, system architecture, debugging, configuration, integrations, technical implementation, maintainability, and Second-Brain retrieval/handoff workflow support.

## Current Context

The user works on practical software and technical systems alongside engineering work. This includes designing and reviewing code, understanding existing repositories, improving workflows, integrating services, and troubleshooting implementation issues.

One known project is the DNF R&D Database, a Google Sheets + Apps Script based R&D data management system involving BOM, Material, Cost, Drawing, SAP integration, search, automation, auditing, and maintenance. It is an important project but only one part of the user's broader work. The project now has its own `TOPICS/RnD DATABASE/` topic and should be routed there for detailed work.

The user also works on configuration-heavy software/services, where templates, ranking logic, metadata, proxy behavior, and integrations may need iterative tuning.

## Status

- State: Active
- Summary: Second-Brain operations, GitHub workflow, validation, retrieval, handoff, and technical system maintenance are actively being improved.
- Direction: Harden the operating model so repository changes are atomic, validated, synchronized, and easier for any AI to execute correctly.
- Last reviewed: 2026-09-19

## Working Principles

- Understand the existing architecture before changing it.
- Prefer minimal, maintainable changes that solve the actual problem.
- Preserve existing behavior unless a change is intentional.
- When debugging, identify the actual cause rather than masking symptoms.
- Consider edge cases, performance, maintainability, and integration boundaries when they materially affect the solution.
- Keep sensitive configuration out of public source or persistent AI memory.
- For configuration changes, explain what each setting changes and whether it affects performance or behavior.
- For Second-Brain maintenance, treat repository state as the source of completion truth and follow `REPOSITORY_CONTRACT.md` and `WORKFLOW.md`.

## Active Projects / References

### DNF R&D Database

Repository: `hiephnp-oos/DNF-R-D-database`

The project includes BOM, Material, Cost, Drawing, SAP integration, search, automation, auditing, and maintenance workflows. Detailed project source is now migrated into `TOPICS/RnD DATABASE/` in Second-Brain.

### Second Brain

Repository: `hiephnp-oos/Second-Brain`

This repository is the persistent AI working-context layer, not a conventional software project.

Core control documents:
- `AI_MEMORY.md` — global routing and durable context.
- `WORKFLOW.md` — operating lifecycle and maintenance rules.
- `REPOSITORY_CONTRACT.md` — repository invariants and source-of-truth hierarchy.
- `TOPICS/SYSTEMS/User_Prompts.md` — reusable prompts for reliable interaction with Second-Brain.
- `.github/workflows/validate.yml` — automated repository validation on pushes and pull requests.
- `scripts/validate_second_brain.py` — executable repository contract checks.

## Decisions

- Software project details should remain in their own repositories or their explicitly migrated topic source; this README stores only persistent context needed by an AI working with the user.
- Avoid treating DNF R&D Database as the user's only or primary software activity.
- A topic-specific project should be routed to its dedicated topic instead of duplicating detailed project context here.
- Second-Brain maintenance uses explicit target-state planning, reconciliation, positive + negative verification, and executable validation rather than relying only on prose instructions.
- Reusable user prompts reinforce the canonical workflow but do not replace `WORKFLOW.md` or `REPOSITORY_CONTRACT.md`.

## Lessons

- Do not treat one software project as representative of the user's entire work.
- Avoid unnecessary refactoring when a targeted change is sufficient.
- When changing configuration, preserve a known-good baseline so changes can be evaluated independently.
- A GitHub tool action is an implementation step, not completion evidence; final repository state must be verified.
- Repeated failures should strengthen generic controls or validation rather than produce one-off rule patches.

## Second-Brain System Artifacts

### Handoff Template

`Handoff_Template.md` is the reusable format for transferring temporary conversation state between AI systems or conversations. A Handoff is not persistent memory and should propose, rather than silently apply, ADD / UPDATE / REMOVE / NO_CHANGE memory changes.

### Retrieval Test

`Retrieval_Test.md` is the lightweight validation procedure for retrieval/routing. It tests whether an AI can find the smallest useful context path without reading the whole repository. Recurring retrieval failures should inform workflow improvements; isolated mistakes do not require permanent logging.

### User Prompt Library

`User_Prompts.md` contains reusable prompts for starting work, continuing a topic, performing reliable GitHub mutations, repeating critical rules, and reinforcing verification when an AI begins to drift. Use these prompts across topics as an interaction layer; the repository contracts remain canonical.

### Repository Validation

`REPOSITORY_CONTRACT.md`, `scripts/validate_second_brain.py`, and `.github/workflows/validate.yml` define the executable integrity layer for the repository. The validator checks root structure, topic registration, topic README sections, forbidden artifacts, local references, CSV structure, and R&D Knowledge Sheet IDs.

## Routing

Use this topic for general software/system work. For a specific project with its own topic, route to that topic instead of duplicating project detail here. For Second-Brain continuity or maintenance work, read `AI_MEMORY.md` → `WORKFLOW.md` → `REPOSITORY_CONTRACT.md`, then use `Handoff_Template.md`, `Retrieval_Test.md`, `User_Prompts.md`, or the validation tooling as appropriate.

## Next

Use the repository with real AI sessions. Refine the workflow only when real usage exposes a continuity, correctness, freshness, retrieval, maintainability, or validation problem. Prefer generic controls and executable checks over one-off patches.
