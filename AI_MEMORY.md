# AI Working Memory

> Persistent working context for collaborating with the user across AI systems.
>
> **Read this file first.** It is a routing and working-context document, not a conversation archive.

GitHub is the persistence layer and source of truth. The system is deliberately minimal: one master memory file plus topic folders. It is not a personal knowledge-management platform or knowledge graph.

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
- `TOPICS/`: durable topic folders. Each topic folder uses `README.md` as its entry point; child workstream folders/files hold detailed recurring work as appropriate.

Git history provides historical versions. Do not create additional archive folders unless real scale requires them.

A conversation is not automatically memory. Promote information only when it is useful beyond the current task.

## 6. ACTIVE TOPICS

These are the currently recognized work areas, not an exhaustive list of everything the user does.

| Topic | Status | Entry point |
|---|---|---|
| AI General | Active | `TOPICS/AI GENERAL/README.md` |
| Construction | Active | `TOPICS/CONSTRUCTION/README.md` |
| Nuvio Setup | Active | `TOPICS/NUVIO SETUP/README.md` |
| Systems | Active | `TOPICS/SYSTEMS/README.md` |
| R&D Innovation | Active | `TOPICS/RnD INNOVATION/README.md` |
| R&D Database | Active | `TOPICS/RnD DATABASE/README.md` |
| Career | Active | `TOPICS/CAREER/README.md` |

R&D Innovation is intentionally organized as a parent topic folder with dedicated workstream subfolders. New recurring R&D workstreams may be added there without changing the overall memory architecture.

R&D Database is a migrated project source folder. Its project files are stored directly inside `TOPICS/RnD DATABASE/`; it is not a routing link to the old repository. The current project architecture is explicitly separated into `1_Frontend_UI`, `2_Library_Core`, and `3_Backend_Scanner`.

Career is organized as a parent topic with shared career-profile context and three parallel workstreams: `JOB_SEARCH`, `COMPANY_RADAR`, and `REMOTE_AI`. It is intentionally not a job database at the current stage. High-volume job records remain in external working tools until real usage demonstrates that a searchable database is justified.

A topic should be added only when recurring work creates enough durable context to justify a dedicated folder.

## 7. GLOBAL LESSONS

- Do not over-engineer before validating the underlying workflow or model.
- Separate durable memory from temporary conversation state.
- Prefer a small, stable structure and split it only when real scale requires it.
- Do not use conversation dumps as a substitute for distilled working context.
- Do not duplicate detailed project knowledge when the authoritative source already exists elsewhere.
- Prefer maintaining existing knowledge over creating duplicate new knowledge when a new finding refines, corrects, or supersedes something already stored.
- Surface possible contradictions and obsolete assumptions before writing durable memory.
- Use semantic connections for discovery, but do not silently convert inferred connections into authoritative relationships.
- A structural change is incomplete until all dependent registry, navigation, and workflow references are synchronized in the same change.
- Repository completion is defined by final state, not by successful AI/connector actions.
- Generic controls and executable validation are preferred over one-off rule patches when repeated failures are discovered.
- Optional GitHub features should be added only when they solve a demonstrated workflow problem; avoid infrastructure that can generate false failure signals.

## 8. GLOBAL DECISIONS

- GitHub is the persistence layer and source of truth for this AI working context.
- The system is provider-independent so another AI can read it and continue working.
- The preferred structure is one master memory file plus topic folders, with one `README.md` entry point per topic.
- All topic READMEs use the standard core template defined in `WORKFLOW.md`.
- `WORKFLOW.md` is the authority for memory maintenance rules, topic README structure, consistency checks, retrieval/routing, and Handoff.
- `REPOSITORY_CONTRACT.md` defines repository invariants, source-of-truth hierarchy, and completion state.
- `TOPICS/SYSTEMS/User_Prompts.md` provides reusable user-side reinforcement prompts; it does not replace the canonical workflow rules.
- When topics are added, renamed, moved, merged, or removed, `AI_MEMORY.md` and all affected navigation/references must be updated together according to `WORKFLOW.md`.
- Memory maintenance uses ADD / UPDATE / REMOVE / NO_CHANGE and is defined in `WORKFLOW.md`.
- Memory quality, retrieval/routing, Handoff, and repository mutation lifecycle are operating rules within `WORKFLOW.md`; there is no separate required phase document.
- Periodic review is a quality check and derived report; it should not silently modify authoritative memory.
- No Obsidian, knowledge graph, vector database, RAG layer, or automatic ingestion of every conversation is required at the current stage.
- R&D Database V4 is maintained inside Second-Brain as a complete project source, organized into Bound Script frontend, standalone Library Core (`LibDNF`), and standalone Backend Scanner. The topic README is the architecture/deployment entry point; the code files are the detailed project source.
- Repository integrity is checked automatically by `scripts/validate_second_brain.py` through `.github/workflows/validate.yml`.
- Four GitHub-native controls are part of the operating model: GitHub Actions for automated validation, Issue Forms for structured change requests, Task Lists for execution/completion tracking, and Mermaid for visualizing workflows/architecture where useful.
- GitHub Pages and GitHub Rulesets were evaluated but are not part of the current operating model. Do not create or require them unless a future decision explicitly reintroduces them.
- Issue Forms and Task Lists are optional execution aids for changes that benefit from traceability; they do not replace `WORKFLOW.md` or `REPOSITORY_CONTRACT.md`.

## 9. HOW A NEW AI SHOULD ONBOARD

Follow this sequence:

1. Read `AI_MEMORY.md` first.
2. Identify which topic folder(s) are relevant to the current request.
3. Read the relevant `TOPICS/<topic>/README.md`.
4. If the topic contains child workstream folders, read only the relevant folder/file(s).
5. For repository maintenance, also read `WORKFLOW.md` and `REPOSITORY_CONTRACT.md` before mutating content.
6. If a topic README or artifact references an external project/repository/document, only use that source when needed for detailed facts. For `RnD DATABASE`, use the migrated project files inside the topic folder as the detailed source; do not redirect to the old repository as the primary source.
7. Use current conversation context together with this memory. New explicit user information takes precedence over older memory.
8. Do not assume that the listed active topics are exhaustive.
9. Do not claim a task is completed, blocked, or next unless the available context supports that conclusion.
10. When unsure whether information is durable, keep it in the current conversation rather than promoting it to memory.
11. Before reporting completion of repository work, verify the actual final GitHub state and perform applicable positive and negative checks.
12. For structured/high-risk changes, use the Issue Form and Task List controls when they materially improve traceability.

## 10. MEMORY MAINTENANCE

Add or update memory when new information materially changes how future AI sessions should work with the user or understand an ongoing topic.

Before promoting information into memory, ask:

- Is it durable?
- Will it help future work?
- Is it supported by evidence/context?
- Does it duplicate existing memory?
- Does it conflict with existing memory?
- Is it actually temporary task state?
- Does it belong at global, topic, or child-workstream scope?

When existing knowledge is present, prefer UPDATE over ADD when the new information refines, corrects, or supersedes it.

When a possible contradiction is found, do not silently preserve two statements as if both are current. Resolve using the latest explicit user decision or stronger evidence; Git history remains the historical record.

Avoid storing:
- transient conversation details;
- one-off wording choices;
- API keys, passwords, tokens, credentials, or secrets;
- confidential information that should not be shared across AI systems;
- large copies of source code or documents already stored elsewhere.

For exact update lifecycle, routing rules, consistency checklist, and Handoff model, use `WORKFLOW.md`. For repository invariants and source-of-truth priority, use `REPOSITORY_CONTRACT.md`.

## 11. PERIODIC REVIEW

A periodic review may use this repository to produce a work-status report covering:

- active topics;
- completed work;
- work in progress;
- unresolved or blocked items;
- neglected/stale areas;
- logical next steps supported by the available context;
- recurring memory/retrieval/handoff/consistency/validation failure modes observed during real use.

The review is a derived view, not authoritative memory. It must not infer project status from the existence of a topic folder or from a topic being marked Active.

## 12. FRESHNESS

Last reviewed: 2026-09-16

`Active` means the topic is a recognized ongoing area of work. It does not mean every item inside it is currently being worked on.

When freshness matters, inspect Git history or the referenced project/source rather than assuming that the text is current.

## 13. REFERENCES

Detailed information normally belongs in its authoritative project repository, document, or source. For projects explicitly migrated into Second-Brain, the migrated files inside the corresponding topic folder become the detailed project source. `RnD DATABASE` is currently such an internal project source.
