# Personal Research

## Purpose

Personal engineering research for product/mechanism research, technology scouting, material/process and supplier research, patent/prior-art work, literature research, and deep investigation.

## Current Context

This is the maintainer-facing research workstream. It is the main route for external evidence work that supports personal engineering decisions or targeted research requested by other workstreams.

Project Improvement is maintained inside this workstream because it improves the research system, prompts, routing, tools, documentation, and regression process used by the maintainer.

## Working Rules

- Start from the decision and known constraints.
- Use KNOWN / WORKING / OPEN for important assumptions.
- Derive MUST / SHOULD / COULD when scope is unclear.
- Use the minimum sufficient research depth.
- Prefer primary and technical sources.
- Distinguish evidence from inference and recommendation.
- Do not claim novelty from absence of found prior art.
- Do not infer internal product mechanism from UX alone.
- For patents, inspect claims/family/status where material.
- For materials, do not generalize from generic chemistry to a specific grade without evidence.

## Artifact Routing

When creating or moving an artifact, classify its purpose before choosing its location:

- Product / mechanism / technology / material / process / supplier research → the relevant research workstream or research artifact location.
- Project health / workflow / prompt / routing / tool / governance / validation / regression / scheduler / architecture improvement → `2. Project Improvement/`.
- An implementation plan whose purpose is to improve the R&D Innovation system → `Project Improvement/`.
- A reference or fallback architecture intended to improve the R&D Innovation system → `Project Improvement/`.

Do not place system-improvement plans or architecture references at the R&D Innovation root merely because they concern R&D. The artifact's purpose determines its canonical location.

Before creating a new file, check the canonical location and existing artifacts for duplicates or conflicting source-of-truth documents.

## Routing

`Product / mechanism / technology / material / process / supplier` → engineering evidence research

`Patent / prior art / claims / CPC / IPC` → patent research

`Engineering mechanism / material / compatibility / degradation / reliability / testing` → literature research

`Broad / conflicting / high-risk / decision-critical` → deep research

`Project health / prompt / workflow / tool / governance / regression` → Project Improvement

## Prompt

Use `Prompt.csv` for research tasks. Use `2. Project Improvement/Prompt.csv` for project-review and maintenance tasks.

## Outputs

Research results stay in the conversation or designated research artifact unless they qualify for a Knowledge Candidate. Do not automatically copy every research result into the Knowledge Sheet.

Project Improvement proposals remain experimental until tested and human-verified.


## Child Folder Order

`1. Claw Discovery → 2. Project Improvement`

The order follows maintainer routing: discovery/output work first, then project/system improvement.
## Capability Contract — PERSONAL_RESEARCH

### Purpose
Research technology, market, supplier, competitor, patent, literature, mechanism, material, process, and technical signals needed to close a defined evidence gap.

### Trigger
Manual research request, routed research gap from Idea Review/Evaluate/Deep Analyze, or an approved scheduled research run.

### Input / Context
Research question or evidence gap; relevant Knowledge Sheet records; known constraints; prior research; current authoritative project context.

### Preconditions
The decision or research question is defined; the existing Knowledge Sheet context has been checked where relevant; scope is sufficient to select a research route.

### Process
Research Question → Source Discovery → Evidence Collection → Evidence Classification → Candidate Finding → Staging / Return Finding

Use the minimum sufficient route. Route patent/IP questions to patent research, engineering mechanism/material questions to technical literature or primary technical sources, and broad/high-risk/decision-critical questions to deep research.

### Tools / AI
Use available web/search, technical-document, patent, literature, GitHub, and research-skill capabilities. Provider-specific skill runtimes are not required.

### Output
A traceable research finding containing the question/gap, sources, evidence, evidence state, findings, remaining unknowns, and recommended next action. Reusable findings may become Knowledge Candidates.

### Validation
Every consequential claim has supporting evidence or is explicitly labeled. Search snippets are discovery aids, not final evidence. Absence of found evidence is not proof of non-existence or novelty. Product pages establish existence/advertised function, not hidden internal mechanism.

### Evidence State
Use EVIDENCE, INFERENCE, ASSUMPTION, UNKNOWN, and PROPOSAL explicitly where applicable. Preserve source traceability.

### Escalation
Escalate when scope is materially ambiguous, sources conflict, required evidence cannot be obtained, or the question is decision-critical and requires deeper investigation.

### Human Verification Gate
Human verification is required before a research finding becomes authoritative Knowledge Sheet content.

### Promotion / Persistence
Research output remains in the conversation or designated research artifact. A reusable result becomes a Knowledge Candidate and follows KNOWLEDGE_PROMOTION; it is not automatically written to the Knowledge Sheet.

### Failure Handling
Do not fill missing evidence with inference. Record the gap, retry only when a defined failure policy allows it, and return a limited result with explicit uncertainty when the evidence remains insufficient.

## Capability Contract — PERSONAL_RESEARCH

Purpose: research defined R&D evidence gaps using the minimum sufficient research route.

Trigger: manual request, routed research gap, or approved scheduled run.

Input / Context: research question or gap, Knowledge Sheet context, constraints, prior research, and current project context.

Preconditions: scope is defined and relevant existing Knowledge Sheet context has been checked.

Process: Research Question → Source Discovery → Evidence Collection → Evidence Classification → Candidate Finding → Staging / Return Finding.

Tools / AI: available web/search, technical-document, patent, literature, GitHub, and research-skill capabilities.

Output: traceable finding with question/gap, sources, evidence state, findings, unknowns, and next action.

Validation: consequential claims require supporting evidence or explicit uncertainty; search snippets are discovery aids only; absence of found evidence is not proof of novelty.

Evidence State: EVIDENCE, INFERENCE, ASSUMPTION, UNKNOWN, PROPOSAL.

Escalation: escalate material ambiguity, conflicting sources, unavailable evidence, or decision-critical questions requiring deeper research.

Human Verification Gate: required before a research finding becomes authoritative Knowledge Sheet content.

Promotion / Persistence: research remains in the conversation or research artifact; reusable findings become Knowledge Candidates and follow KNOWLEDGE_PROMOTION.

Failure Handling: record evidence gaps and return limited results with explicit uncertainty; never fill missing evidence with inference.
