# Handoff Template

Use this template when ending a conversation, switching AI, or moving work to a new conversation.

A Handoff is a state-transfer artifact, not a transcript. Keep only information needed to continue the work.

## Handoff Prompt

```text
HANDOFF

Topic / Workstream:

1. Current objective / question
- 

2. Established context needed to continue
- 

3. Decisions made in this conversation
- 

4. Important findings / evidence
- 

5. Open issues / uncertainty
- 

6. Immediate next step
- 

7. Proposed persistent-memory changes
- ADD:
- UPDATE:
- REMOVE:
- NO_CHANGE:

Instructions for the receiving AI:
- Read Second-Brain AI_MEMORY.md first.
- Read the relevant topic entry point and child workstream as needed.
- Use this Handoff as temporary continuation state, not as authoritative memory.
- Current explicit user instructions take precedence over the Handoff and older memory.
- Do not claim completion, resolution, or certainty beyond the evidence available.
- If a proposed memory change is durable, validate it against existing memory before writing it.
- Continue from the Immediate next step.
```

## Memory Delta Rule

The Handoff should propose memory changes, not silently write them. The receiving AI should apply `ADD / UPDATE / REMOVE / NO_CHANGE` using `WORKFLOW.md` before changing persistent memory.

## Good Handoff Characteristics

- compact;
- decision-focused;
- evidence-aware;
- explicit about uncertainty;
- points to the correct topic/workstream;
- identifies the next action clearly.

## Bad Handoff Characteristics

- full conversation transcript;
- repeated background already present in `AI_MEMORY.md`;
- unsupported conclusions;
- large copies of source documents;
- temporary details that will not help future work.
