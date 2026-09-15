# AI Assets

## Purpose

Central workspace for reusable AI assets across platforms.

This workstream manages prompts, GPTs, Gemini Gems, Claude Skills, Agents, and early experiments in one simple structure so they can be reused, improved, versioned through Git history, and learned from across platforms.

## Structure

- `Prompts/` — reusable general prompts.
- `GPTs/` — custom GPTs.
- `Gemini Gems/` — custom Gemini Gems.
- `Claude Skills/` — Claude Skills.
- `Agents/` — agents and multi-step AI workflows.
- `Experiments/` — assets still being tested.
- `reference.md` — frequently reused external references and source links.
- `changelog.md` — important changes across AI assets.

## Working Principles

- Keep the structure simple. Do not add a database, registry, graph, or separate versioning system unless real usage requires it.
- Use Git history for detailed version history.
- Keep durable, reusable assets here; temporary experiments stay in `Experiments/` until they become useful.
- A prompt may be reused across multiple platforms. GPTs, Gems, Skills, and Agents are implementations or workflows that can build on shared prompts and lessons.
- Capture useful cross-platform lessons so an improvement in one asset can inform another.
- Keep authoritative external material in its original source; use `reference.md` for links that are repeatedly useful.

## Simple Improvement Loop

`Reference → Prompt / Knowledge → GPT / Gem / Skill / Agent → Real Use → Lesson → Improvement`

## Status

Initial structure established. Add assets only when they are actually created or migrated into this workstream.
