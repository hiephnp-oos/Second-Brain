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

## Routing

`Product / mechanism / technology / material / process / supplier` → engineering evidence research

`Patent / prior art / claims / CPC / IPC` → patent research

`Engineering mechanism / material / compatibility / degradation / reliability / testing` → literature research

`Broad / conflicting / high-risk / decision-critical` → deep research

`Project health / prompt / workflow / tool / governance / regression` → Project Improvement

## Prompt

Use `Prompt.csv` for research tasks. Use `Project Improvement/Prompt.csv` for project-review and maintenance tasks.

## Outputs

Research results stay in the conversation or designated research artifact unless they qualify for a Knowledge Candidate. Do not automatically copy every research result into the Knowledge Sheet.

Project Improvement proposals remain experimental until tested and human-verified.
