# R&D Innovation

Entry point and durable topic context for recurring R&D innovation work related to bathroom, shower, faucet, and adjacent product technologies.

## Scope

R&D engineering, innovation research, technology scouting, competitor technology, supplier/OEM/ODM technology, patents, mechanisms, idea generation, evaluation, and supporting workflows.

## Current Context

The user works across practical R&D and innovation activities, including technology scouting, supplier/OEM/ODM research, competitor benchmarking, patent review, mechanism/structure analysis, and evaluation of whether a technology is genuinely useful or differentiated.

A recurring R&D workstream involves innovation research for LIXIL. In this context, LIXIL includes American Standard, INAX, and GROHE. Supplier/OEM/ODM technology evidence is collected and evaluated across multiple source files.

The user also works on R&D knowledge-sharing workflows and systems that organize R&D information for reuse.

## Working Principles

- Distinguish genuinely new innovation from technologies that are already widely implemented.
- When evaluating a technology candidate, consider evidence, mechanism/structure, competitor adoption, supplier availability, patent landscape, and practical applicability.
- Prefer concrete evidence over marketing claims.
- Keep candidate evaluation traceable to its source/reference.
- When screening a large candidate list, prioritize technologies with clear structure/mechanism, competitor evidence, patent/source evidence, and a credible route to implementation.
- Do not treat a supplier's technology description alone as proof of novelty or innovation value.
- When designing R&D sharing/workflows, account for existing team practices and workload instead of assuming a blank slate.

## Active Projects / References

### R&D Innovation workstreams

This topic is organized as a parent folder so each recurring R&D workstream can keep its own artifacts while this README remains the routing and durable-context layer.

| Folder | Purpose |
|---|---|
| `Knowledge sheet/` | Structured R&D knowledge collection and linked evidence across market signals, competitor technology, supplier technology, technology radar, sources, and ID conventions. |
| `Bi-weekly review/` | Recurring bi-weekly review outputs, findings, decisions, and follow-ups. |
| `ADTD Prompting/` | ADTD prompting methods, prompt assets, evaluations, and reusable prompting workflows for R&D innovation research. |
| `Existing Ideas/` | Existing innovation ideas, evaluation, development status, evidence, and related artifacts. |

Add new R&D workstream folders here as the need emerges. Update this table when a new recurring workstream is created.

### Knowledge Sheet

The current R&D Knowledge Sheet workflow uses six linked views:

1. `Market_Signal`
2. `Competitor_Tech`
3. `Supplier_Tech`
4. `Tech_Radar`
5. `Source`
6. `ID_Convention`

The working chain is:

`Material → Knowledge Sheet → TEAM / AI Search-Connect-Analyze → Idea → Evaluate → Deep Analyze`

The four substantive sheets are cross-linked by stable IDs so market needs, competitor implementations, supplier technologies, and external/transferable technologies can be combined by the Claw Idea process. Detailed records and research artifacts should remain in the Knowledge Sheet folder or their authoritative external source rather than being duplicated here.

### Sheet roles

**Market_Signal** — records customer/market needs, pain points, current solutions, remaining gaps, and required functions.

**Competitor_Tech** — structures competitor products/technologies and connects them to market signals and the technology radar.

**Supplier_Tech** — structures supplier/OEM/ODM technologies currently available in collected supplier evidence. Supplier descriptions are evidence of supplier capability, not proof of novelty.

**Tech_Radar** — captures external and cross-industry technologies with transfer potential, plus relevant technologies already used in shower/faucet products.

**Source** — centralizes evidence and preserves traceability.

**ID_Convention** — defines stable IDs and relationship references.

Canonical prefixes:

| Entity | Prefix | Format | Example |
|---|---|---|---|
| Market Signal | MS | MS-XXX | MS-001 |
| Competitor Tech | CT | CT-XXX | CT-001 |
| Supplier Tech | ST | ST-XXX | ST-001 |
| Tech Radar | TR | TR-XXX | TR-001 |
| Source | SRC | SRC-XXX | SRC-001 |

IDs are unique and stable. Relationship references point only to existing valid IDs. Do not reuse an ID after deletion/obsolescence, and do not invent alternate prefixes or formats.

## Decisions

- Detailed candidate data should remain in the relevant research/source artifacts rather than being copied into this parent memory file.
- Candidate evaluation should preserve source evidence and distinguish competitor evidence from supplier claims.
- R&D workflow proposals should improve usefulness without creating disproportionate recurring workload.
- The R&D topic is organized as a parent folder with dedicated workstream subfolders so future recurring work can be added without flattening all files into one topic directory.

## Lessons

- Supplier claims are useful evidence of capability but are not, by themselves, proof of novelty or innovation value.
- Competitor evidence, mechanism/structure, source traceability, and practical applicability should be checked together when screening technology candidates.
- Knowledge-sharing workflows should reduce repeated work rather than create a new administrative burden for the team.

## Routing

Use this topic for R&D innovation, technology scouting, competitor/supplier technology, patent/mechanism research, and innovation ideation.

Route to the smallest relevant child workstream:

`Knowledge sheet/` → structured knowledge and evidence

`ADTD Prompting/` → prompting methods and reusable prompt assets

`Existing Ideas/` → existing idea records and evaluation

`Bi-weekly review/` → recurring review outputs

For a new recurring workstream, create a child folder and register it in the table above.

## Next

Maintain this README as the durable routing and summary layer. Add only stable R&D context here; keep detailed candidate records, research evidence, and working artifacts in the relevant child workstream.
