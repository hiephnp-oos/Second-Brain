# Second-Brain User Prompts

Reusable prompts for interacting with Second-Brain across topics. These prompts are intentionally explicit so the user can repeat the critical operating rules when starting work with a new AI or when a previous AI has shown signs of skipping repository verification.

## How to use

Copy the smallest prompt that matches the task. For higher-risk repository changes, use the full mutation prompt rather than relying on conversational shorthand.

## Prompt Library

| ID | Prompt | Use when |
|---|---|---|
| SB-01 | **Read Second-Brain before work.** Read `AI_MEMORY.md` first, route to the relevant topic `README.md`, then the smallest relevant workstream/artifact. Do not start changing GitHub until you understand the current repository state and the source of truth for the requested task. | Any new topic/task |
| SB-02 | **Continue this topic from Second-Brain.** Read `AI_MEMORY.md` → relevant topic README → relevant workstream/artifact. Use the current conversation as active task context. Do not ask me to repeat information already present in the repository. | Continue existing work |
| SB-03 | **Update Second-Brain using the repository lifecycle.** Inspect current state → define target state → classify ADD/UPDATE/REMOVE/NO_CHANGE → mutate → reconcile dependent references → verify positive and negative conditions → report the resulting repository state. A successful tool call is not proof of completion. | Any memory update |
| SB-04 | **Use target-state thinking.** Before modifying GitHub, explicitly determine what files/folders must exist, what must change, what must be deleted because it is obsolete/superseded/temporary/duplicate, and what references must be synchronized. Treat `current state → target state` as the definition of the task. | Replace/migrate/cleanup |
| SB-05 | **Do not forget deletion.** Creating a new file does not replace an old file. When the requested target state removes or replaces an artifact, perform the required delete and then verify that the old artifact is absent and no active reference still points to it. | Replace/rename/move |
| SB-06 | **Run negative verification.** After the change, verify not only that required files exist, but also that obsolete files, `.tmp`, placeholders, `DELETE_ME`, duplicate artifacts, stale paths, and superseded references are absent when the target state requires their absence. | Cleanup/restructure |
| SB-07 | **Synchronize the repository, not just the obvious file.** Check all affected layers: `AI_MEMORY.md`, topic/workstream README, root `README.md`, `WORKFLOW.md`, child artifacts, references, and registries. Update only the layers actually affected, but do not leave a dependent layer stale. | Structural changes |
| SB-08 | **Verify before saying completed.** Re-read the final affected files and inspect the final repository tree. Report completion only when the requested target state is demonstrably true from GitHub as it exists now. If something could not be completed exactly, state the limitation instead of implying success. | High-risk changes |
| SB-09 | **Use the source-of-truth hierarchy.** Current explicit user instruction overrides older memory. Then prefer authoritative project/source data, current topic/workstream artifacts, topic README, `AI_MEMORY.md`, Handoff, and finally AI inference. Label inference as inference and do not silently turn it into durable knowledge. | Conflicting information |
| SB-10 | **Keep the smallest useful context.** Start at `AI_MEMORY.md`, route to the smallest relevant topic/workstream, and read only the files needed for the task. Do not read the whole repository unless a full audit is explicitly required. | Research/retrieval |
| SB-11 | **Treat Handoff as temporary state.** Read the Handoff after routing to the relevant topic/workstream. Use it to continue the current task, but validate any proposed persistent-memory changes against `WORKFLOW.md` before writing them to GitHub. | Switching AI/conversation |
| SB-12 | **Improve the generic system, not just the symptom.** When a failure is discovered, first check whether an existing generic rule or validation should already have prevented it. Strengthen the generic workflow or validator only when a real control is missing. Do not create one-off patches for isolated mistakes. | Feedback/failure review |
| SB-13 | **For multi-file changes, keep the logical change atomic.** Prefer one coherent commit for one logical repository change when practical. For structural/high-risk changes, use a branch and validation before merging when that reduces risk without unnecessary process. | Multi-file changes |
| SB-14 | **Respect repository contracts.** Do not invent duplicate registries, parallel authoritative summaries, or unnecessary archive copies. Follow the topic/workstream structure and README conventions defined in `WORKFLOW.md`. | General maintenance |
| SB-15 | **Validate data artifacts according to their local contract.** For structured datasets/configurations, validate IDs, references, schemas, headers, versions, integrity metadata, or other project-specific invariants defined by that workstream before reporting completion. | CSV/JSON/data projects |
| SB-16 | **Second-Brain full mutation prompt.** Read `AI_MEMORY.md` and `WORKFLOW.md`; route to the relevant topic/workstream; inspect the current repository state; define the exact target state; identify ADD/UPDATE/REMOVE/NO_CHANGE; perform all required creates/updates/deletes; reconcile references and READMEs; run positive and negative verification; then inspect the final tree and only after that report the actual resulting state. Never equate a successful GitHub action with task completion. | High-risk/reliable default |

## Recommended reusable prompts

### Standard topic work

```text
Use Second-Brain for this task.

Read `AI_MEMORY.md` first, route to the smallest relevant topic/workstream, and read only the context needed for the current request.

Before changing anything, inspect the current repository state and identify the authoritative source.
Do not rely on what you expect the repository to contain.
Continue the work from the current conversation plus the repository state.
```

### Reliable GitHub mutation

```text
Update Second-Brain for this task.

1. Read `AI_MEMORY.md` and `WORKFLOW.md`.
2. Route to the smallest relevant topic/workstream.
3. Inspect the current GitHub state before writing.
4. Define the target state explicitly: what must exist, change, move, and be deleted.
5. Classify the change as ADD / UPDATE / REMOVE / NO_CHANGE.
6. Perform all required create/update/delete operations.
7. Reconcile dependent READMEs, registries, references, workflow rules, and indexes.
8. Run positive checks and negative checks. In particular, verify that obsolete, duplicate, temporary, placeholder, and superseded artifacts are absent when they should be absent.
9. Re-read the affected files and inspect the final repository tree.
10. Report the resulting repository state, not merely the actions attempted.

Do not claim completion until the final state is verified from GitHub.
```

### Repeat when AI starts drifting

```text
STOP and re-read the Second-Brain rules.

Read `AI_MEMORY.md` → `WORKFLOW.md` → relevant topic/workstream README.

The repository final state is the definition of completion.
Creating a new file does not replace an old file.
A successful GitHub tool call does not prove completion.
For replacements/cleanup, verify both presence of required files and absence of obsolete/duplicate/temporary files.
Synchronize all affected references and registries before reporting completion.
```

## Design rule

These prompts are a reinforcement layer, not a replacement for `WORKFLOW.md`. The canonical rules remain in the repository. Repeating a prompt should make the AI re-enter the correct operating mode; it should not create a second source of truth.
