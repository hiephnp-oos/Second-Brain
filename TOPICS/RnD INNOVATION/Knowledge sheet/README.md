# R&D Knowledge Sheet

## Purpose

The Knowledge Sheet is the structured R&D knowledge pool used as input for Claw Idea generation. It converts heterogeneous material into traceable, queryable knowledge and links user needs with technology, competitor precedent, supplier capability, and evidence.

Core principle:

`Material → Knowledge Pool → TEAM / AI Search-Connect-Analyze → Idea → Evaluate → Deep Analyze`

## Current build

Release: **v2**  
Status: **Current authoritative baseline / ready for Claw Idea**

The authoritative v2 dataset is the five CSV files committed in this folder:

- `Market_Signal_v2.csv`
- `Competitor_Tech_v2.csv`
- `Supplier_tech_v2.csv`
- `Tech_radar_v2.csv`
- `Sources_v2.csv`

Current entities:

- `Market_Signal`: 22 records
- `Competitor_Tech`: 46 records
- `Supplier_Tech`: 58 records
- `Tech_Radar`: 70 records
- `Source`: 354 records

These five CSV files are the data source of truth for v2. Do not reconstruct or rewrite their contents from README/changelog/context. Future releases should use the next version suffix for substantive dataset changes.

## Architecture

```text
Market Pull / Voice of Customer ──→ Market_Signal ──┐
                                                     │
Internet / Tech Push ─────────────→ Tech_Radar ──────┤
                                                     │
Competitor Catalog ────────────────→ Competitor_Tech ┤
                                                     │
Supplier / OEM / ODM Catalog ─────→ Supplier_Tech ──┤
                                                     ↓
                                               Knowledge Pool
                                                     │
                                                     ↓
                                                    TEAM
                                                     ↑
                                              AI Prompting
                                                     │
                                                     ↓
                                      Search / Connect / Analyze
                                                     │
                                                     ↓
                                                    IDEA
```

`Source` / evidence is the traceability layer behind the records.

The practical technology relation is centered on `Tech_Radar`:

`Market_Signal → Tech_Radar → Supplier_Tech / Competitor_Tech → Source`

`Tech_Radar` is the technology relation hub. Reverse `Supplier_Tech → Tech_Radar` and `Competitor_Tech → Tech_Radar` fields are not required for traversal.

## Sheet definitions

### Market_Signal

Purpose: convert market pull, customer pain points, and voice-of-customer inputs into structured user needs and unresolved gaps.

Fields:

`Market Signal ID | Product Area | Target User / Context | Need / Pain Point | Current / Existing Solution | Remaining Gap / DELTA | Required Function | Market Pull Class | Source IDs`

### Competitor_Tech

Purpose: capture competitor products, technologies, architectures, operating principles, differentiating capability, limitations, maturity, and links to market signals.

Fields:

`Competitor Tech ID | Competitor / Brand | Product / Platform | Product Area | User Function | Technology / Architecture | How It Works | Differentiating Capability | Limitation / Remaining Gap | Maturity | Related Market Signal IDs | Source ID`

Competitor evidence is precedent and boundary-setting. It is not automatically proof of novelty or availability to LIXIL.

### Supplier_Tech

Purpose: capture supplier / OEM / ODM technologies and capabilities found in supplier catalogs, presentations, and technical documents.

Fields:

`Supplier Tech ID | Supplier / Company | Technology / Component | Capability / Principle | Current Application | Maturity | Fitting Applicability | Source ID`

Supplier technology is evidence of supplier capability, not proof of novelty. `Source ID` is the primary traceability link; constraints and validation requirements should be checked in the linked source and handled during evaluation/deep analysis rather than duplicated as a separate supplier field.

### Tech_Radar

Purpose: capture technologies that can enable or inspire R&D, including cross-industry transfer technologies, mechanisms, material/process concepts, and relevant technologies already used in bathroom/shower products.

Fields:

`Tech ID | Technology | Source Industry | Maturity | Claw Role | Discovery Class | Nguyên lý / Cơ chế | Ứng dụng / Giá trị tiềm năng | Supplier Tech IDs | Competitor Tech IDs | Market Signal IDs | Source IDs`

### Source

Purpose: centralize evidence and preserve traceability.

Fields:

`Source ID | Source Title | Type | URL | Evidence / Why Relevant`

`Source` is the authority for `SRC-*` evidence references.

## Build workflow

1. Collect Material from Market Pull, Tech Push, Competitor Technology, Supplier/OEM/ODM Technology, patents, technical documents, and other evidence.
2. Structure Market Signals as `User / Context → Pain Point → Existing Solution → Remaining Gap → Required Function`.
3. Structure competitor technology by actual function, mechanism, differentiation, limitation, maturity, and related market signal.
4. Structure supplier technology by concrete capability and practical fitting applicability; use the linked source as evidence.
5. Build/refine Tech Radar by grouping transferable mechanisms and technology families rather than duplicating products.
6. Link entities using canonical IDs only.
7. Validate IDs, relations, source traceability, and CSV structure before a release.

## Validation rules

- All entity IDs are unique and stable.
- Relationship IDs point to existing master IDs.
- Source references point to existing `Source` records.
- Do not reuse deleted IDs or renumber records merely to remove gaps.
- Empty relationship fields are allowed when no verified relationship exists.
- CSV headers and column counts must be consistent for every row.
- Evidence remains traceable through `Source ID`.

## Executable validation

Repository validation also runs from `scripts/validate_second_brain.py` through `.github/workflows/validate.yml`. The validator checks CSV structure and base ID format/uniqueness automatically.

For Knowledge Sheet changes, workstream-specific validation remains authoritative: relationship IDs, source references, and semantic correctness must be checked against the actual five CSV datasets. Passing the generic repository validator does not prove semantic correctness.

## Claw Idea usage

The Knowledge Pool is an input to Claw Idea, not the final idea list.

Typical traversal:

`User Problem → Relevant Tech Radar → Supplier Capability → Competitor Precedent → Evidence → Remaining Gap`

Generate and connect ideas first. Evaluate promising ideas using user value, technical feasibility, novelty, business potential, and evidence. Deep-analyze only selected ideas.

## ID conventions

| Entity | Prefix | Example |
|---|---|---|
| Market Signal | MS | `MS-001` |
| Competitor Tech | CT | `CT-001` |
| Supplier Tech | ST | `ST-001` |
| Tech Radar | TR | `TR-001` |
| Source | SRC | `SRC-001` |

IDs are unique and stable. Multiple IDs in a CSV relationship cell are separated by `;`.

## Folder structure

```text
TOPICS/
└── RnD INNOVATION/
    └── Knowledge sheet/
        ├── README.md
        ├── changelog.md
        ├── Market_Signal_v2.csv
        ├── Competitor_Tech_v2.csv
        ├── Supplier_tech_v2.csv
        ├── Tech_radar_v2.csv
        └── Sources_v2.csv
```

Older v1 snapshots remain available in Git history and are not part of the current active release.

## Current decision

The v2 Knowledge Sheet is the current authoritative baseline and is ready for Claw Idea generation, evaluation, and subsequent deep analysis of selected ideas.
