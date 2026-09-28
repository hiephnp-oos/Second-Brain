# Personal Research

## Purpose

Independently discover new R&D ideas through product/mechanism research, technology scouting, material/process and supplier research, patent/prior-art work, literature research, and targeted investigation.

The sole output goal of this workstream is idea discovery. Ideas selected to proceed are handed to `../2.2 IDEA_REVIEW/` for idea-specific review.

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

## Prompts

Use `Prompt.csv` for Personal Research tasks. The prompt is the input; a separate INPUT folder is not required. Reusable methods are governed by [1. CAPABILITIES](../../1. CAPABILITIES/README.md).

## Outputs

- `staging/` — daily discovery records; operational state, not approved Knowledge.
- `batches/` — three-day consolidated idea-discovery outputs.

These folders live directly under this workstream. Do not create an additional `OUTPUT/CLAW_DISCOVERY/` layer.

The execution date is resolved from the actual scheduler execution timestamp in Asia/Ho_Chi_Minh; filenames use that resolved date.

When an idea is selected to proceed, transfer it to `../2.2 IDEA_REVIEW/<IDEA_ID>/`. Do not turn every discovered idea into a review folder.

Research findings remain in the discovery artifact unless they qualify for a Knowledge Candidate. Do not automatically copy results into the Knowledge Sheet.
