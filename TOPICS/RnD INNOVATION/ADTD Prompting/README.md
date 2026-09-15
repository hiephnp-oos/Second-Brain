# ADTD Prompting

Dedicated space for ADTD prompting methods, prompt assets, evaluations, and reusable prompting workflows used in R&D innovation research.

## Current Context

The R&D Innovation AI Claw is being developed as the operational AI layer for the R&D idea-generation workflow. Its working model is:

`Knowledge Sheet → Search / Connect / Claw → R&D Idea → Verify → Evaluate → Deep Analyze → POC / Action Plan / One-Pager`

The Claw uses the R&D Knowledge Sheet as its primary structured knowledge base and Web Search as the external evidence layer. The Knowledge Sheet should be checked first; Web Search is used to complement, verify, update, and fill gaps.

The current Custom Gem instruction establishes these durable rules:

- Knowledge Sheet is mandatory when available and must be treated as the primary R&D knowledge base.
- Canonical IDs are strict: `MS-XXX`, `CT-XXX`, `ST-XXX`, `TR-XXX`, `SRC-XXX`. Do not invent IDs or present invented relationships as established data.
- Existing relationship IDs must be semantically validated. An existing ID link is traceability, not automatic proof of technical equivalence. Ambiguous or inconsistent links should be flagged, not silently corrected.
- In addition to explicit relationships, the Claw may perform semantic search across the Knowledge Sheet to discover relevant records that are not explicitly linked. These must be labeled as potential / inferred / candidate connections, not established relationships.
- Absence from the Knowledge Sheet is not evidence of global novelty. External competitor/product/patent checking is required when novelty matters.
- Evidence must be distinguished as Knowledge Sheet evidence, Web evidence, inference, assumption, or unknown.
- Ideas should be driven by meaningful user value and opportunity, not by arbitrary technical combinations.
- Evaluation prioritizes User Value, Technical Feasibility, Novelty / Differentiation, Business Potential, and Evidence Strength.
- Dead-end ideas should be rejected rather than forced into POC, Action Plan, or One-Pager.
- POC and Action Plan should reduce decision-relevant uncertainty rather than create unnecessary work.
- One-Pager output is concise, management-friendly English by default and follows the established five-section structure.

## Current Usage Status

This Claw instruction is a working baseline and is intentionally not treated as final. The team will use it for a period of time and then review actual outputs, failure modes, and workflow effectiveness before making the next update.

Detailed prompt assets and evaluations should remain in this workstream rather than being duplicated in the parent R&D topic memory.
