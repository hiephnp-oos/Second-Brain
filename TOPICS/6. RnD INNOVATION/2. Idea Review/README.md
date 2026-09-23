# Idea Review

## Purpose

Review and develop existing R&D ideas using the latest available Knowledge Sheet and evidence.

The purpose is to determine whether an idea is sufficiently supported, what is still unknown, and what action is needed next.

Core review questions:
- Is the idea supported by sufficient evidence?
- Does the proposed technology actually exist?
- Is the mechanism technically reasonable?
- Is there competitor adoption or a relevant commercial precedent?
- Is there supplier / technology support?
- Is there a gap in the Knowledge Sheet?
- What additional research is needed?
- Does the idea need to be modified?

## Working Rules

- Treat the idea as a hypothesis, not established fact.
- Check the relevant Knowledge Sheet context first.
- Verify important commercial, technology, mechanism, material, supplier and patent claims.
- Separate verified facts, inference, assumptions, proposed changes and unknowns.
- Identify only evidence gaps that can materially affect the idea.
- Do not automatically force an idea into POC or Deep Analyze.
- Modify the idea when evidence materially challenges or improves the original concept.
- Create a Knowledge Candidate when a reusable finding is discovered.
- Do not automatically change the authoritative Knowledge Sheet or idea record from a review.

## Review Flow

`Idea → Evidence Check → Technology Check → Mechanism Check → Competitor / Precedent Check → Supplier / Technology Support Check → Knowledge Sheet Gap Check → Research Need → Idea Modification / Next Action`

The steps are applied as needed; they are not a mandatory heavy checklist for every idea.

## Tool Use

Team-facing work uses NotebookLM + Custom Gemini + the released `3. Knowledge sheet/Prompt.csv`.

When deeper external research is required, the maintainer uses `1. Personal Research/` and returns a concise verified result.

## Outputs

A review should leave a concise decision-support record containing, as applicable:
- evidence status
- technology existence/status
- mechanism assessment
- competitor / precedent evidence
- supplier / technology support
- Knowledge Sheet gaps
- additional research required
- proposed idea modifications
- next action
- Knowledge Candidates

## Prompt

Use `Prompt.csv` in this folder for Idea Review tasks.
