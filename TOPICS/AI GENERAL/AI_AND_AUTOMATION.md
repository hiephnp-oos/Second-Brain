# AI / Automation

## Scope

AI workflows, AI agents, persistent AI memory, automation between AI systems, scheduled reviews, and practical use of AI as a working tool.

## Current Context

The user is developing a persistent AI working-context system stored on GitHub so different AI systems can read durable context and continue relevant work without requiring the user to re-explain established context.

The system is deliberately minimal: GitHub is the persistence layer and source of truth; `AI_MEMORY.md` is the entry point; `TOPICS/*.md` contains durable topic context. It is not intended to become a knowledge-management platform or knowledge graph.

The memory workflow distinguishes durable knowledge from temporary conversation state and uses ADD / UPDATE / REMOVE / NO_CHANGE decisions before changing the repository.

The user also works with AI-assisted media/streaming systems, including AIOStreams, TorBox, Nuvio, AIOMetadata, BingeCat, stream ranking/filtering/templates, subtitles, proxy behavior, and related configuration. These are practical technical experiments rather than the definition of the user's overall work.

## Working Principles

- AI memory should capture persistent working context, not dump entire conversations.
- Separate user-level context from topic-specific context.
- GitHub is the source of truth; another AI should be able to read it and continue the relevant topic.
- Validate memory updates to prevent drift, duplication, speculation, or accidental overwriting of established preferences.
- Prefer simple workflows first and add automation only after the underlying memory structure proves useful.
- When troubleshooting an AI/software setup, distinguish configuration problems from limitations of the underlying service.

## Active Projects / References

### Second Brain / AI Working Memory

Repository: `hiephnp-oos/Second-Brain`

Current structure:
- `AI_MEMORY.md` — global user and working context.
- `TOPICS/*.md` — topic-specific persistent context.
- `WORKFLOW.md` — memory onboarding, promotion, update, validation, and review rules.

### AI Media / Streaming

Current work includes optimizing stream aggregation, ranking/filtering, metadata, subtitle presentation, proxy usage, and service integration. Preserve existing working configurations unless a change is intentional and validated.

## Decisions

- The system is intended as persistent working context shared across AI systems, not as literal model memory.
- GitHub is the persistence layer and source of truth.
- The preferred architecture is deliberately minimal: one master memory file plus topic files.
- Conversation details become memory only when they are durable and useful beyond the current task.
- No Obsidian, knowledge graph, vector database, RAG layer, or automatic ingestion of every conversation is required at the current stage.
- Periodic review is a quality check and derived view; it should not silently rewrite authoritative memory.

## Lessons

- Do not over-engineer the memory repository before validating the actual workflow.
- Handoff summaries and persistent AI memory serve different purposes; a handoff is session continuity, while memory is long-term working context.
- A memory file should be a distilled representation of useful persistent information, not a transcript archive.
- When comparing technical alternatives, evaluate practical impact and not only feature availability.

## Next

Use the repository with real conversations across AI systems. Refine memory only when real usage exposes a continuity, correctness, freshness, or maintainability problem.
