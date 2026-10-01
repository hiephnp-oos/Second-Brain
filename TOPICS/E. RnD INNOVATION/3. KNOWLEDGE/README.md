# Knowledge Lifecycle

## Purpose and authority

This folder owns the lifecycle of structured R&D knowledge. It separates the working dataset from the immutable team-facing releases.

## Two knowledge states

| State | Location | Meaning |
|---|---|---|
| Working dataset | [BETA](BETA/README.md) | Independent working copy initialized from Release_23Sep2026; non-authoritative and updated only on explicit user request |
| Published snapshot | [Release_23Sep2026](RELEASED/Release_23Sep2026/README.md) | Existing official dataset shared with the team; preserve unchanged |

BETA has the same five CSV datasets and schema as the release baseline. It may evolve through requested update batches sourced from specified Claw outputs, Idea Reviews, internet research, supplier catalogs, or other named inputs. The ADTD Claw schedule only records/discovers ideas; it does not update BETA.

## Update and release are separate operations

`BETA_UPDATE`: on explicit request, identify the exact input sources and scope; inspect evidence, provenance, duplicates, contradictions, IDs, relationships, and schema; prepare a change summary; then update BETA only. Never write directly to RELEASED during this operation.

`KNOWLEDGE_RELEASE`: only when separately requested, review BETA as a whole, validate it against the release contract, obtain explicit approval, and create a new versioned snapshot under RELEASED. Do not mutate an existing release. Release_23Sep2026 remains official until a later release is approved and designated.

## Data integrity

Preserve canonical IDs and source-to-claim traceability. Relationships must resolve to existing IDs; empty relationships are allowed where no verified relationship exists. Every CSV must have non-empty unique headers and consistent row width. Do not reconstruct records from documentation. Record batch provenance and a before/after summary for each BETA update.

BETA changes do not imply release approval. Evidence verification, BETA update approval, and publication approval are distinct decisions.
