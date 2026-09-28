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
- Do not automatically change the released Knowledge Sheet or idea record from a review.

## Capability Routing

Shared capability rules are governed by [`1. CAPABILITIES/README.md`](../../1.%20CAPABILITIES/README.md). This workstream may specialize task routing but must not redefine reusable methods.

IDEA_REVIEW is the workstream that owns idea-specific inputs, review records, and dispositions. It invokes reusable capabilities rather than redefining them:

- `../../1. CAPABILITIES/1.4 EVALUATION/README.md` — reusable evaluation contract.
- `../../1. CAPABILITIES/1.3 DEEP_RESEARCH/README.md` — reusable deep research contract.
- `../../1. CAPABILITIES/1.2 VERIFICATION/README.md` — invoke for bounded checks of material claims in IR-02 through IR-06 and when IR-01 identifies a decision-relevant evidence gap. Use the capability's claim-state and verification-outcome distinction; do not copy its procedure into this workstream.


Capability definitions are maintained only in `1. CAPABILITIES`. This workstream owns the execution context and resulting records.

## Review Flow

`Idea → Evidence Check → Technology Check → Mechanism Check → Competitor / Precedent Check → Supplier / Technology Support Check → Knowledge Sheet Gap Check → Research Need → Idea Modification / Next Action`

The steps are applied as needed; they are not a mandatory heavy checklist for every idea.

## Tool Use

Team-facing work uses NotebookLM + Custom Gemini + the released `../3. KNOWLEDGE/RELEASED/Release_23Sep2026/Prompt.csv`.

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

Evidence State: follow the shared capability baseline. Use EVIDENCED / INFERRED / ASSUMPTION / UNKNOWN / PROPOSED / CONFLICTING for claims; record verification outcome separately. Do not use VERIFIED as an epistemic state.

Escalation: evidence gap → PERSONAL_RESEARCH; structured evaluation → EVALUATION capability; deeper investigation → DEEP_RESEARCH capability.

Human Verification Gate: required before released Knowledge Sheet or baseline changes.

Promotion / Persistence: disposition is a workflow state, not permanent knowledge.

Failure Handling: preserve unverifiable claims as UNKNOWN and define required research.
