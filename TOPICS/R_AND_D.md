# R&D / Innovation

## Scope

R&D, engineering, innovation research, technology scouting, competitor technology, supplier/OEM/ODM technology, patents, mechanisms, and evaluation of technology opportunities.

## Current Context

The user works across practical R&D and innovation activities, including technology scouting, supplier/OEM/ODM research, competitor benchmarking, patent review, mechanism/structure analysis, and evaluation of whether a technology is genuinely useful or differentiated.

A recurring R&D workstream involves innovation research for LIXIL. In this context, LIXIL includes American Standard, INAX, and GROHE. Supplier/OEM/ODM technology evidence is collected and evaluated across multiple source files.

The user also works on R&D knowledge-sharing workflows and on systems that organize R&D information for reuse.

## Working Principles

- Distinguish genuinely new innovation from technologies that are already widely implemented.
- When evaluating a technology candidate, consider evidence, mechanism/structure, competitor adoption, supplier availability, patent landscape, and practical applicability.
- Prefer concrete evidence over marketing claims.
- Keep candidate evaluation traceable to its source/reference.
- When screening a large candidate list, prioritize technologies with clear structure/mechanism, competitor evidence, patent/source evidence, and a credible route to implementation.
- Do not treat a supplier's technology description alone as proof of novelty or innovation value.
- When designing R&D sharing/workflows, account for existing team practices and workload instead of assuming a blank slate.

## Active Projects / References

### LIXIL R&D / Innovation Research

Persistent context includes technology scouting and evaluation involving LIXIL brands and supplier/OEM/ODM technologies.

### R&D Knowledge Sharing

The user has been developing proposals to increase useful technical sharing within the team. Existing sharing occurs but is relatively limited, so the objective is to increase useful topics without creating excessive workload.

### R&D Data / Knowledge Systems

The user has worked on systems for organizing BOM/material/cost/drawing and other R&D information. Detailed implementation belongs in the relevant software repository.

### R&D Knowledge Sheet / Knowledge Pool

A current R&D workflow is being formalized as a linked Knowledge Sheet that feeds the downstream Claw Idea process. The working chain is:

`Material → Knowledge Sheet → TEAM / AI Search-Connect-Analyze → Idea → Evaluate → Deep Analyze`

The Knowledge Sheet is intended to consolidate four evidence/technology views and two control/reference views:

1. `Market_Signal`
2. `Competitor_Tech`
3. `Supplier_Tech`
4. `Tech_Radar`
5. `Source`
6. `ID_Convention`

The four substantive sheets are cross-linked by stable IDs so that market needs, competitor implementations, supplier technologies, and external/transferable technologies can be combined by the Claw Idea process. Detailed records themselves belong in the research artifacts/Google Sheet output rather than this memory file.

## R&D Knowledge Sheet Structure

### Market_Signal

Purpose: convert customer/market inputs into structured user needs and unresolved gaps.

Core fields:

`Market Signal ID | Product Area | Target User / Context | Need / Pain Point | Current / Existing Solution | Remaining Gap / DELTA | Required Function | Source ID`

The pain point should be expressed from the user's perspective. Existing solutions and the remaining gap should describe why the current solution does not fully satisfy the need.

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

A record may reference multiple sources using semicolon-separated IDs, e.g. `SRC-001;SRC-007`.

### ID_Convention

Purpose: define the mandatory ID format so AI/member contributors do not invent inconsistent identifiers.

Canonical prefixes and examples:

| Entity | Prefix | Format | Example |
|---|---|---|---|
| Market Signal | MS | MS-XXX | MS-001 |
| Competitor Tech | CT | CT-XXX | CT-001 |
| Supplier Tech | ST | ST-XXX | ST-001 |
| Tech Radar | TR | TR-XXX | TR-001 |
| Source | SRC | SRC-XXX | SRC-001 |

Rules:

- IDs are generated according to this convention; contributors must not invent alternate prefixes or formats.
- IDs are unique and stable. Do not reuse an ID after deletion/obsolescence.
- Relationship fields may contain multiple IDs separated by `;`.
- Relationship references must point only to existing valid IDs.
- Do not use company names, technology names, or row numbers as IDs.
- Updating a record does not change its ID.
- If the same technology/market entity is evidenced by multiple sources, keep one entity ID and link multiple `Source ID` values.

## Knowledge Sheet Build Workflow

The current implementation plan is:

1. `Market_Signal`: build first from Market Pull, customer pain points, voice of customer, existing solution evidence, and supporting external research. Structure `Pain Point → Need → Existing Solution → Remaining Gap / DELTA → Required Function`.
2. `Competitor_Tech`: build from competitor catalog/evidence and external sources where needed. Identify technology/architecture, mechanism, differentiating capability, limitations, maturity, and links to `Market_Signal` and `Tech_Radar`.
3. `Supplier_Tech`: build from the existing supplier/OEM/ODM source collection. Normalize supplier technology into capability/principle, current application, maturity, fitting applicability, constraints, and links to `Tech_Radar`.
4. `Tech_Radar`: build from external technology scouting, cross-industry transfer opportunities, and relevant existing shower/faucet technologies. Link back to supplier, competitor, and market-signal records where applicable.
5. `Source`: register the evidence used by the four substantive sheets and reference it through `Source ID`.
6. `ID_Convention`: act as the shared naming/control rule for stable identifiers and relationships.
7. Cross-link and validation: check ID uniqueness, broken links, duplicate technologies/entities, source traceability, consistency of relationships, and that supplier claims are not presented as independent proof of novelty.

The output is intended to be CSV-compatible for import into Google Sheets. The first implementation should remain simple; do not add additional infrastructure or ontology unless actual usage demonstrates a need.

## Decisions

- Detailed candidate data should remain in the relevant research/source artifacts rather than being copied into this memory file.
- Candidate evaluation should preserve source evidence and distinguish competitor evidence from supplier claims.
- R&D workflow proposals should improve usefulness without creating disproportionate recurring workload.
- The Knowledge Sheet will use six linked sheets: `Market_Signal`, `Competitor_Tech`, `Supplier_Tech`, `Tech_Radar`, `Source`, and `ID_Convention`.
- Every substantive record must be traceable to one or more `Source ID` values.
- Stable ID conventions are mandatory; contributors should not create ad-hoc IDs.

## Lessons

- Do not treat a supplier's technology description alone as proof of novelty or innovation value.
- Avoid duplicating detailed project research in the global AI memory.
- When discussing an innovation workflow, account for workload and the team's existing sharing activities rather than assuming a blank slate.
- Keep the first Knowledge Sheet implementation simple enough to validate the workflow before adding complexity.

## Next

Continue enriching this file only with persistent R&D context that changes how future AI work should be performed.