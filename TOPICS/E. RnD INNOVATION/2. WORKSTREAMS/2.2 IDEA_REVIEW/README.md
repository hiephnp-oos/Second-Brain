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

## Capability Contract

**Purpose:** evidence-based evaluation of existing R&D ideas.

**Trigger:** explicit review request or routed downstream work.

**Input / Context:** idea, current Knowledge Sheet context, prior evidence, and research findings.

**Process:** evidence → technology → mechanism → competitor/precedent → supplier → Knowledge Gap → research need → modification/next action.

**Output:** decision-support review with explicit evidence states.

**Validation:** no invented evidence; VERIFIED / INFERRED / WORKING ASSUMPTION / UNKNOWN / PROPOSED remain distinct.

**Persistence:** review output does not automatically alter authoritative Idea or Knowledge Sheet state.

## Review Flow

`Idea → Evidence Check → Technology Check → Mechanism Check → Competitor / Precedent Check → Supplier / Technology Support Check → Knowledge Sheet Gap Check → Research Need → Idea Modification / Next Action`

The steps are applied as needed; they are not a mandatory heavy checklist for every idea.

## Tool Use

Team-facing work uses NotebookLM + Custom Gemini + the released `../3. KNOWLEDGE/3.1 KNOWLEDGE_SHEET/Prompt.csv`.

When deeper external research is required, the maintainer uses `../2.1 PERSONAL_RESEARCH/` and returns a concise verified result.

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

## Capability Contract — IDEA_REVIEW

Purpose: review an R&D idea for duplication, existing solutions, weak problem framing, unsupported mechanisms, poor evidence, and novelty signals.

Trigger: new idea, updated evidence, review cycle, or explicit decision need.

Input / Context: idea, Knowledge Sheet records, evidence, and review history.

Preconditions: idea is identifiable and relevant Knowledge Sheet context is checked.

Process: Idea → Knowledge Check → Evidence Check → Technology → Mechanism → Competitor / Precedent → Supplier Support → Gap → Research Need → Disposition.

Tools / AI: released Idea Review prompts, Knowledge Sheet, targeted research, GitHub.

Output: review with evidence, technology, mechanism, competitor/supplier support, gaps, research needed, modifications, and KEEP / WATCH / DROP / NEEDS_RESEARCH.

Validation: no invented records or evidence; distinguish evidence from inference; absence is not proof of novelty.

Evidence State: VERIFIED / EVIDENCED, INFERRED, WORKING ASSUMPTION, UNKNOWN, PROPOSED.

Escalation: evidence gap → PERSONAL_RESEARCH; consequential evaluation → EVALUATE / DEEP_ANALYZE.

Human Verification Gate: required before authoritative Knowledge Sheet or baseline changes.

Promotion / Persistence: disposition is a workflow state, not permanent knowledge.

Failure Handling: preserve unverifiable claims as UNKNOWN and define required research.
