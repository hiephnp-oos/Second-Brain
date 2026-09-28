# Knowledge Lifecycle

## Purpose and authority

This folder owns the lifecycle of structured R&D knowledge. It does not own reusable capability methods or raw workstream execution logs.

- Shared capability baseline: [../1. CAPABILITIES/README.md](../1. CAPABILITIES/README.md)
- Workstream routing and output ownership: [../2. WORKSTREAMS/README.md](../2. WORKSTREAMS/README.md)
- Parent R&D architecture: [../README.md](../README.md)

## Lifecycle

`Workstream output → Knowledge Candidate → evidence check → duplicate check → contradiction check → human verification → Released Knowledge → schema/relationship validation`

Candidate/Test is non-authoritative. Released is authoritative. No discovery, verification, evaluation, scheduler, or prompt execution may write directly to Released Knowledge without explicit human verification and the KNOWLEDGE_PROMOTION contract.

## Locations

| State | Location | Authority |
|---|---|---|
| Candidate / experimental | [CANDIDATE_TEST](CANDIDATE_TEST/README.md) | Non-authoritative |
| Current released dataset | [Release_23Sep2026](RELEASED/Release_23Sep2026/README.md) | Authoritative v2 |

## Released v2 data contract

The five CSV snapshots in the release README are the data source of truth. Preserve canonical IDs and existing records; do not reconstruct data from documentation. Relationships must resolve to existing IDs. Empty relationships are allowed when no verified relationship exists. Source-to-claim traceability must be preserved.

Every CSV must have non-empty unique headers and consistent row width. Schema/data changes require impact review of prompts, consumers, relationships, and validators, followed by human verification before release.

## Release handling

Use the current release README and [changelog](changelog.md). A substantive dataset change creates the next versioned release; do not silently mutate the meaning of a released snapshot. The current v2 remains authoritative until a new release is explicitly verified and designated.
