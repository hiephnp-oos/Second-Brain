# R&D Knowledge Sheet

## Purpose

This README is the release documentation and contract entry point for the authoritative R&D Knowledge Sheet data.

The Knowledge Sheet is the released structured R&D knowledge layer feeding R&D capabilities.

## Status

- State: RELEASED
- Role: Authoritative Knowledge Sheet

## Current baseline

Release: **v2**  
Status: **Current authoritative baseline**

Current data source of truth:
- `Market_Signal_v2.csv`
- `Competitor_Tech_v2.csv`
- `Supplier_tech_v2.csv`
- `Tech_radar_v2.csv`
- `Sources_v2.csv`

Do not reconstruct or rewrite those datasets from this README.

## Workflow

`Candidate / Test → Evidence Check → Duplicate Check → Contradiction Check → Human Verification → Released Knowledge`

Before new external research, check the existing Knowledge Sheet and define the gap. Research only what is needed to resolve a material uncertainty.

A reusable finding may become a **Knowledge Candidate**, containing:
- candidate type
- finding
- evidence/source
- mechanism/technology
- relationship to existing knowledge
- why reusable
- verification needed
- proposed update

Human review is required before write-back.

## Data contracts

Canonical IDs:
- Market Signal: `MS-XXX`
- Competitor Tech: `CT-XXX`
- Supplier Tech: `ST-XXX`
- Tech Radar: `TR-XXX`
- Source: `SRC-XXX`

IDs are unique and stable. Do not reuse deleted IDs or invent alternate formats.

Relationship IDs and Source IDs must point to existing valid records. Empty relationship fields are allowed when no verified relationship exists.

## Evidence discipline

Supplier claims establish supplier capability only; they do not prove novelty. Competitor evidence establishes precedent and boundary conditions. Absence of a record or relationship is not proof of novelty.

## Team usage

NotebookLM is the primary team query layer for existing Knowledge Sheet content. Custom Gemini can reason over the provided Knowledge Sheet and released prompts. External web research is performed by the maintainer when a material evidence gap remains.

## Claw

Typical traversal:

`User Problem → Tech Radar → Supplier / Competitor precedent → Evidence → Gap → Idea`

Proposed semantic connections must be labeled as inference/candidate rather than existing relationships.

## Prompt

Use `Prompt.csv` in this folder for released Knowledge Sheet search and knowledge tasks.

## Capability Boundary

The Knowledge Sheet is not an execution Capability. It is the authoritative structured knowledge layer consumed by R&D capabilities.

Promotion:
`Candidate → Evidence Check → Duplicate Check → Contradiction Check → Human Verification → Promote → Validate`

Discovery/staging output is never authoritative Knowledge Sheet state.

## Validation

Validate CSV structure, IDs, relationships, and source traceability before a release. Generic repository validation does not replace semantic review of the dataset.

## Capability Contract — KNOWLEDGE_PROMOTION

Purpose: promote verified reusable R&D findings into the authoritative Knowledge Sheet.

Trigger: explicit Knowledge Candidate proposal after research or evaluation.

Input / Context: candidate, supporting evidence, source links, existing records, and relationships.

Preconditions: evidence is traceable and target schema is known.

Process: Candidate → Evidence Check → Duplicate Check → Contradiction Check → Human Verification → Promote → Validate.

Tools / AI: Knowledge Sheet CSVs, relationship rules, GitHub, research tools.

Output: verified Knowledge Sheet record or explicit hold/rejection with reason.

Validation: IDs, relationships, source traceability, schema, duplicates, and contradictions are checked after promotion.

Evidence State: only verified evidence becomes authoritative; INFERENCE, ASSUMPTION, UNKNOWN, PROPOSAL remain non-authoritative until verified.

Escalation: conflicting evidence, uncertain identity, weak sources, or material claims → human review.

Human Verification Gate: mandatory; uncertain research cannot be promoted automatically.

Promotion / Persistence: only human-verified candidates enter the Knowledge Sheet source of truth.

Failure Handling: hold/reject missing evidence, duplicates, contradictions, invalid relationships, or schema errors.
