# Software / Technical Systems

## Scope

Software development, GitHub repositories, scripting, system architecture, debugging, configuration, integrations, and technical implementation.

## Current Context

The user works on practical software and technical systems alongside engineering work. This includes designing and reviewing code, understanding existing repositories, improving workflows, integrating services, and troubleshooting implementation issues.

One known project is the DNF R&D Database, a Google Sheets + Apps Script based R&D data management system involving BOM, Material, Cost, Drawing, SAP integration, search, automation, auditing, and maintenance. It is an important project but only one part of the user's broader work.

The user also works on configuration-heavy software/services, where templates, ranking logic, metadata, proxy behavior, and integrations may need iterative tuning.

## Working Principles

- Understand the existing architecture before changing it.
- Prefer minimal, maintainable changes that solve the actual problem.
- Preserve existing behavior unless a change is intentional.
- When debugging, identify the actual cause rather than masking symptoms.
- Consider edge cases, performance, maintainability, and integration boundaries when they materially affect the solution.
- Keep sensitive configuration out of public source or persistent AI memory.
- For configuration changes, explain what each setting changes and whether it affects performance or behavior.

## Active Projects / References

### DNF R&D Database

Repository: `hiephnp-oos/DNF-R-D-database`

The project includes BOM, Material, Cost, Drawing, SAP integration, search, automation, auditing, and maintenance workflows.

### Second Brain

Repository: `hiephnp-oos/Second-Brain`

This repository is the persistent AI working-context layer, not a conventional software project.

## Decisions

- Software project details should remain in their own repositories; this topic file stores only persistent context needed by an AI working with the user.
- Avoid treating DNF R&D Database as the user's only or primary software activity.

## Lessons

- Do not treat one software project as representative of the user's entire work.
- Avoid unnecessary refactoring when a targeted change is sufficient.
- When changing configuration, preserve a known-good baseline so changes can be evaluated independently.

## Next

Maintain persistent technical working context here as future software/system work establishes it.
