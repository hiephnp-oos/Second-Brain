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

Shared capability rules are governed by [`1. CAPABILITIES/README.md`](../../1. CAPABILITIES/README.md). This workstream may specialize task routing but must not redefine reusable methods.

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

## Contract ownership

This README owns IDEA_REVIEW workstream context, routing, and output expectations. Reusable methods are owned only by the shared [capability baseline](../../1.%20CAPABILITIES/README.md) and the linked capability contracts above. Do not maintain a parallel IDEA_REVIEW capability procedure here.

For material claims, use the canonical claim states from the shared baseline: EVIDENCED, INFERRED, ASSUMPTION, UNKNOWN, PROPOSED, or CONFLICTING. Record verification outcome separately (for example SUPPORTED, PARTIALLY_SUPPORTED, CONFLICTING, UNSUPPORTED, or NOT_VERIFIABLE). Do not use VERIFIED as an epistemic state.

Knowledge promotion remains a separate controlled capability and requires human verification before any Released Knowledge write.
