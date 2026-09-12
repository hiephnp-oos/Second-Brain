# AI / Automation

## Scope

AI workflows, AI agents, custom GPTs, persistent AI memory, automation between AI systems, scheduled reviews, and practical use of AI as a working tool.

## Current Context

The user is developing a persistent AI working-context system stored on GitHub so different AI systems can understand the user's working style, active work, decisions, lessons, and relevant context without depending on a single conversation or AI provider.

A related goal is to automate memory updates and periodic reviews rather than manually maintaining all context.

The user also works with AI-assisted media/streaming systems, including AIOStreams, TorBox, Nuvio, AIOMetadata, BingeCat, stream ranking/filtering/templates, subtitles, proxy behavior, and related configuration. These are practical technical experiments rather than the definition of the user's overall work.

## Working Principles

- AI memory should capture persistent working context, not dump entire conversations.
- Separate user-level context from topic-specific context.
- Validate memory updates to prevent drift, duplication, speculation, or accidental overwriting of established preferences.
- Periodic review should read memory and report status; it should not silently rewrite memory.
- Prefer simple workflows first and add automation only after the underlying memory structure proves useful.
- When troubleshooting an AI/software setup, distinguish configuration problems from limitations of the underlying service.

## Active Projects / References

### Second Brain / AI Working Memory

Repository: `hiephnp-oos/Second-Brain`

Current structure:
- `AI_MEMORY.md` — global user and working context.
- `TOPICS/*.md` — topic-specific persistent context.

### AI Media / Streaming

Current work includes optimizing stream aggregation, ranking/filtering, metadata, subtitle presentation, proxy usage, and service integration. Preserve existing working configurations unless a change is intentional and validated.

## Decisions

- The system is intended as persistent working context shared across AI systems, not as literal model memory.
- GitHub is the persistence layer and source of truth.
- The current preferred architecture is deliberately minimal.
- Periodic review should derive status from memory/context rather than silently changing the source of truth.

## Lessons

- Do not over-engineer the memory repository before validating the actual workflow.
- Handoff summaries and persistent AI memory serve different purposes; a handoff is session continuity, while memory is long-term working context.
- A memory file should be a distilled representation of useful persistent information, not a transcript archive.
- When comparing technical alternatives, evaluate practical viewing/performance impact and not only feature availability.

## Next

- Refine the memory schema using real conversations.
- Identify which information should be persistent versus temporary.
- Design a safe memory-update workflow.
- Design a periodic review workflow after the memory structure is stable.
