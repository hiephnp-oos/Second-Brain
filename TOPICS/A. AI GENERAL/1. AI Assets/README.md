# AI Assets

## Purpose

Central workspace for reusable AI assets across platforms.

This workstream manages prompts, GPTs, Gemini Gems, Claude Skills, Agents, and experiments in one simple structure so they can be reused, improved, versioned through Git history, and learned from across platforms.

## Structure

- `Prompts/` — reusable general prompts.
- `GPTs/` — custom GPTs.
- `Gemini Gems/` — custom Gemini Gems.
- `Claude Skills/` — Claude Skills.
- `Agents/` — agents and multi-step AI workflows.
- `Experiments/` — assets still being tested.
- `reference.md` — frequently reused external references and source links.
- `changelog.md` — important changes across AI assets.

Create a subfolder only when the first real asset needs it. Empty scaffolding is not required.

## Working Principles

- Keep the structure simple. Do not add a database, registry, graph, or separate versioning system unless real usage requires it.
- Use Git history for detailed version history.
- Keep durable, reusable assets here; temporary experiments stay in `Experiments/` until they become useful.
- A prompt may be reused across multiple platforms. GPTs, Gems, Skills, and Agents can build on shared prompts and lessons.
- Capture useful cross-platform lessons so an improvement in one asset can inform another.
- Keep authoritative external material in its original source; use `reference.md` for links that are repeatedly useful.
- For assets under test, distinguish testing state from current validated state.

## Asset lifecycle

`DRAFT → TESTING → VALIDATED → CURRENT → SUPERSEDED`

Use the simplest status that accurately describes the asset. Git history remains the detailed historical record.

## Simple Improvement Loop

`Reference → Prompt / Knowledge → GPT / Gem / Skill / Agent → Real Use → Lesson → Improvement`

## Status

The workstream is active. Add assets when they are actually created or migrated. Do not create empty category folders merely for symmetry.
