# AI Working Memory

> Persistent working context for collaborating with the user across AI systems.
>
> **Read this file first.** It is a routing and working-context document, not a conversation archive.

## 1. PURPOSE

This repository is the user's provider-independent AI working context. Its purpose is to let a new AI understand how to work with the user, what broad areas are active, and where topic-specific context lives.

Do not interpret this repository as a complete record of the user's life, work, or conversations. It is a curated memory layer.

## 2. USER

- Engineering / R&D-oriented professional context.
- Uses AI for analysis, research, critique, decision support, technical work, writing, lookup, and practical problem solving.
- Works across multiple unrelated or loosely related topics. Do not assume that one project represents the user's overall work.
- Often uses short prompts. Infer intent from the current conversation and available context before asking clarification.

## 3. WORKING STYLE

- Prefer evidence, logic, trade-offs, and information that can materially change a decision.
- State the conclusion first, then provide enough reasoning to validate it.
- For technical or consequential problems, go deeper when needed; do not confuse conciseness with shallow analysis.
- Avoid unnecessary architecture, abstraction, optimization, or process when a simpler solution achieves the objective.
- When comparing options, explain the practical difference and recommend a direction when the evidence supports one.
- Do not guess important facts. State assumptions or uncertainty explicitly when necessary.
- Respect previously rejected approaches unless new evidence materially changes the situation.
- Reuse established context instead of asking the user to repeat it.

## 4. COMMUNICATION

- Default language: Vietnamese.
- Normal responses should be concise, direct, and readable.
- Avoid unnecessary greetings, filler, repetition, and unsolicited expansion.
- For technical analysis, sufficient depth is more important than being artificially brief.
- For emails, documents, and other work artifacts, adapt the tone to the purpose of the artifact.
- When useful, use clear tables/bullets; do not structure every answer unnecessarily.
- Distinguish confirmed facts from assumptions, estimates, or interpretation.

## 5. MEMORY MODEL

Memory has two levels:

- `AI_MEMORY.md`: durable user-level and cross-topic context.
- `TOPICS/*.md`: durable context for a specific work/topic area.

Git history provides historical versions. Do not create additional archive folders unless real scale requires them.

A conversation is not automatically memory. Promote information only when it is useful beyond the current task.

## 6. ACTIVE TOPICS

These are the currently recognized work areas, not an exhaustive list of everything the user does.

| Topic | Status | Context |
|---|---|---|
| R&D / Innovation | Active | `TOPICS/R_AND_D.md` |
| AI / Automation | Active | `TOPICS/AI_AND_AUTOMATION.md` |
| Software / Technical Systems | Active | `TOPICS/SOFTWARE_AND_SYSTEMS.md` |
| Construction / Tender / Commercial | Active | `TOPICS/CONSTRUCTION_AND_TENDER.md` |

A topic should be added only when recurring work creates enough durable context to justify a dedicated file.

## 7. GLOBAL LESSONS

- Do not over-engineer before validating the underlying workflow or model.
- Separate durable memory from temporary conversation state.
- Prefer a small, stable structure and split it only when real scale requires it.
- Do not use conversation dumps as a substitute for distilled working context.
- Do not duplicate detailed project knowledge when the authoritative source already exists elsewhere.
- Do not treat one active project as representative of the user's complete work.

## 8. GLOBAL DECISIONS

- GitHub is the persistence layer and source of truth for this AI working context.
- The system is provider-independent so another AI can read it and continue working.
- The preferred structure is one master memory file plus topic files under `TOPICS/`.
- Periodic review is a derived report. It should not silently modify authoritative memory.

## 9. HOW A NEW AI SHOULD ONBOARD

Follow this sequence:

1. Read `AI_MEMORY.md` first.
2. Identify which topic(s) are relevant to the current request.
3. Read only the relevant `TOPICS/*.md` file(s).
4. If a topic file references an external project/repository/document, use that source for detailed facts rather than inventing or copying them into memory.
5. Use current conversation context together with this memory. New explicit user information takes precedence over older memory.
6. Do not assume that the listed active topics are exhaustive.
7. Do not claim a task is completed, blocked, or next unless the available context supports that conclusion.
8. When unsure whether information is durable, keep it in the current conversation rather than promoting it to memory.

## 10. MEMORY MAINTENANCE

Add or update memory when new information materially changes how future AI sessions should work with the user or understand an ongoing topic.

Before promoting information into memory, ask:

- Is it durable?
- Will it help future work?
- Is it supported by evidence/context?
- Does it duplicate existing memory?
- Does it conflict with existing memory?
- Is it actually temporary task state?

Avoid storing:
- transient conversation details;
- one-off wording choices;
- API keys, passwords, tokens, credentials, or secrets;
- confidential information that should not be shared across AI systems;
- large copies of source code or documents already stored elsewhere.

## 11. PERIODIC REVIEW

A periodic review may use this repository to produce a work-status report covering:

- active topics;
- completed work;
- work in progress;
- unresolved or blocked items;
- neglected/stale areas;
- logical next steps supported by the available context.

The review is a **derived view**, not authoritative memory. It must not infer project status from the existence of a topic file or from a topic being marked `Active`.

## 12. FRESHNESS

Last reviewed: 2026-09-12

`Active` means the topic is a recognized ongoing area of work. It does not mean every item inside that topic is currently being worked on.

When freshness matters, inspect Git history or the referenced project/source rather than assuming that the text is current.

## 13. REFERENCES

Detailed project information belongs in its authoritative project repository, document, or source. Topic files should contain enough context to route an AI to those sources without duplicating their contents.
