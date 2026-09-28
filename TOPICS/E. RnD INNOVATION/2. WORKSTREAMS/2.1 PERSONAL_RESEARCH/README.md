# Personal Research

## Purpose

Personal engineering research for product/mechanism research, technology scouting, material/process and supplier research, patent/prior-art work, literature research, and deep investigation.

## Current Context

This is the maintainer-facing research workstream. It is the main route for external evidence work that supports personal engineering decisions or targeted research requested by other workstreams.

Project Improvement is a separate first-class workstream under ../2.3 PROJECT_IMPROVEMENT/. This workstream can consume Project Improvement capabilities and artifacts when a research-system problem is observed.

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

Classify an artifact by its primary purpose before choosing its location:

- Product / mechanism / technology / material / process / supplier research → this workstream and its research artifacts.
- Scheduled Claw Discovery execution output → OUTPUT/CLAW_DISCOVERY/.
- Project health / workflow / prompt / routing / tool / governance / validation / regression / architecture improvement → ../2.3 PROJECT_IMPROVEMENT/.
- Authoritative reusable knowledge → ../3. KNOWLEDGE/3.1 KNOWLEDGE_SHEET/.

Capabilities provide reusable execution logic; they do not own the resulting output.

Before creating a new file, check the canonical location and existing artifacts for duplicates or conflicting source-of-truth documents.

## Routing

`Product / mechanism / technology / material / process / supplier` → engineering evidence research

`Patent / prior art / claims / CPC / IPC` → patent research

`Engineering mechanism / material / compatibility / degradation / reliability / testing` → literature research

`Broad / conflicting / high-risk / decision-critical` → deep research

`Project health / prompt / workflow / tool / governance / regression` → Project Improvement

## Prompt

Use Prompt.csv for Personal Research tasks. Reusable R&D capability contracts are under ../../1. CAPABILITIES/.

## Outputs

Scheduled Claw Discovery output is owned by this workstream:

OUTPUT/CLAW_DISCOVERY/

The staging records are operational state, not an approved Knowledge Sheet record. The execution date is resolved from the actual scheduler execution timestamp in Asia/Ho_Chi_Minh; filenames must use that resolved date.

- staging/ — daily unvalidated discovery records.
- batches/ — RS-13 three-day consolidation outputs.

Research findings remain in the conversation or designated research artifact unless they qualify for a Knowledge Candidate. Do not automatically copy every research result into the Knowledge Sheet.


## Child Folder Order

OUTPUT/CLAW_DISCOVERY/ is the execution-output area owned by this workstream.
