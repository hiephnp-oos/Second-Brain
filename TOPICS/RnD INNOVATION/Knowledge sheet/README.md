# R&D Knowledge Sheet

## Purpose

This README is the routing and contract entry point for the authoritative R&D Knowledge Sheet data.

The Knowledge Sheet is the reusable structured R&D knowledge layer feeding Claw Idea generation.

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

`Material → structured knowledge → verified relationships → Claw Idea`

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

Use `Prompt.csv` in this folder for Knowledge Sheet and Claw tasks. Do not create a separate global prompt repository.

## Validation

Validate CSV structure, IDs, relationships, and source traceability before a release. Generic repository validation does not replace semantic review of the dataset.
