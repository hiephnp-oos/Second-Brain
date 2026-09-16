# R&D Innovation

Entry point and durable topic context for recurring R&D innovation work related to bathroom, shower, faucet, and adjacent product technologies.

## Scope

R&D engineering, innovation research, technology scouting, competitor technology, supplier/OEM/ODM technology, patents, mechanisms, idea generation, evaluation, and supporting workflows.

## Topic Structure

This topic is organized as a parent folder so each recurring R&D workstream can keep its own artifacts while this README remains the routing and summary layer.

| Folder | Purpose |
|---|---|
| `Knowledge sheet/` | Structured R&D knowledge collection and linked evidence across market signals, competitor technology, supplier technology, technology radar, sources, and ID conventions. |
| `Bi-weekly review/` | Recurring bi-weekly review outputs, findings, decisions, and follow-ups. |
| `ADTD Prompting/` | ADTD prompting methods, prompt assets, evaluations, and reusable prompting workflows for R&D innovation research. |
| `Existing Ideas/` | Existing innovation ideas, evaluation, development status, evidence, and related artifacts. |

Add new R&D workstream folders here as the need emerges. Update this section so a new AI can discover and route to the new folder without assuming a fixed four-folder structure.

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

## Knowledge Sheet Summary

The current R&D Knowledge Sheet workflow uses six linked views:

1. `Market_Signal`
2. `Competitor_Tech`
3. `Supplier_Tech`
4. `Tech_Radar`
5. `Source`
6. `ID_Convention`

The working chain is:

`Material → Knowledge Sheet → TEAM / AI Search-Connect-Analyze → Idea → Evaluate → Deep Analyze`

The four substantive sheets are cross-linked by stable IDs so market needs, competitor implementations, supplier technologies, and external/transferable technologies can be combined by the Claw Idea process. Detailed records and research artifacts should remain in the Knowledge sheet folder or their authoritative external source rather than being duplicated here.

### Market_Signal

Purpose: convert customer/market inputs into structured user needs and unresolved gaps.

Core fields:

`Market Signal ID | Product Area | Target User / Context | Need / Pain Point | Current / Existing Solution | Remaining Gap / DELTA | Required Function | Source ID`

### Competitor_Tech

Purpose: structure competitor products/technologies and connect them to market signals and the technology radar.

Core fields:

`Competitor Tech ID | Competitor / Brand | Product / Platform | Product Area | User Function | Technology / Architecture | How It Works | Differentiating Capability | Limitation / Remaining Gap | Maturity | Related Market Signal IDs | Related Tech Radar IDs | Source ID`

### Supplier_Tech

Purpose: structure supplier/OEM/ODM technologies currently available in the collected supplier evidence.

Core fields:

`Supplier Tech ID | Supplier / Company | Technology / Component | Capability / Principle | Current Application | Maturity | Fitting Applicability | Key Constraints | Tech Radar IDs | Source ID`

Supplier descriptions are evidence of supplier capability, not proof of novelty or innovation by themselves.

### Tech_Radar

Purpose: capture external technologies, cross-industry technologies with transfer potential to shower/faucet applications, and relevant technologies already used in shower/faucet products.

Core fields:

`Tech ID | Technology | Source Industry | Maturity | Claw Role | Discovery Class | Principle / Mechanism | Application / Potential Value | Supplier Tech IDs | Competitor Tech IDs | Market Signal IDs | Source ID`

### Source

Purpose: centralize evidence and preserve traceability instead of repeating source details in every record.

Fields:

`Source ID | Source Title | Type | URL | Evidence / Why Relevant`

### ID_Convention

Canonical prefixes:

| Entity | Prefix | Format | Example |
|---|---|---|---|
| Market Signal | MS | MS-XXX | MS-001 |
| Competitor Tech | CT | CT-XXX | CT-001 |
| Supplier Tech | ST | ST-XXX | ST-001 |
| Tech Radar | TR | TR-XXX | TR-001 |
| Source | SRC | SRC-XXX | SRC-001 |

IDs are unique and stable. Relationship references point only to existing valid IDs. Do not reuse an ID after deletion/obsolescence, and do not invent alternate prefixes or formats.

## Build / Maintenance Direction

The R&D topic should remain a routing and durable-context layer. Detailed project data belongs in the relevant child folder or authoritative external artifact.

When a new recurring R&D workstream is introduced:

1. Create a dedicated folder under `TOPICS/RnD INNOVATION/`.
2. Put the relevant working files/artifacts in that folder.
3. Add the folder to the structure table above.
4. Add only the durable context required for another AI to understand and route the work.

## Decisions

- Detailed candidate data should remain in the relevant research/source artifacts rather than being copied into this parent memory file.
- Candidate evaluation should preserve source evidence and distinguish competitor evidence from supplier claims.
- R&D workflow proposals should improve usefulness without creating disproportionate recurring workload.
- The R&D topic is organized as a parent folder with dedicated workstream subfolders so future recurring work can be added without flattening all files into one topic directory.
