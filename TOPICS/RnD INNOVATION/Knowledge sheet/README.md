# R&D Knowledge Sheet

## Purpose

The Knowledge Sheet is the structured R&D knowledge pool used as input for Claw Idea generation. It converts heterogeneous material into traceable, queryable knowledge and links user needs with technology, competitor precedent, supplier capability, and evidence.

Core principle:

`Material → Knowledge Pool → TEAM / AI Search-Connect-Analyze → Idea → Evaluate → Deep Analyze`

The Knowledge Sheet is not a fifth data table. It is the collection of linked sheets in this workstream.

## Current build

Release: **v1**  
Status: **Baseline / usable for Claw Idea**

Current entities:

- `Market_Signal`: 22 records
- `Competitor_Tech`: 22 records
- `Supplier_Tech`: 48 records
- `Tech_Radar`: 65 records
- `Source`: 351 records

The current Excel release is exported into CSV snapshots in this folder as `*_v1.csv`.

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

`Market_Signal → Tech_Radar → Supplier_Tech / Competitor_Tech`

Source references are maintained through `Source IDs`.

### Relation rule

Do not require reverse relation fields in `Supplier_Tech` or `Competitor_Tech`.

The authoritative technology traversal is through `Tech_Radar`. For example:

`MS-001 → TR-001 / TR-033 / TR-034 → ST-020 / ST-034 and CT-001 → SRC-*`

This is enough for AI to move from user problem to technology, supplier capability, competitor precedent, and evidence without duplicating relation metadata.

## Sheet definitions

### 1. Market_Signal

Purpose: convert market pull, customer pain points, and voice-of-customer inputs into structured user needs and unresolved gaps.

Fields:

`Market Signal ID | Product Area | Target User / Context | Need / Pain Point | Current / Existing Solution | Remaining Gap / DELTA | Required Function | Market Pull Class | Source IDs`

Guideline: describe the problem from the user's perspective. `Required Function` describes what the solution must achieve, not a specific technology.

### 2. Competitor_Tech

Purpose: capture competitor products, technologies, architectures, operating principles, differentiating capability, limitations, maturity, and links to market signals.

Fields:

`Competitor Tech ID | Competitor / Brand | Product / Platform | Product Area | User Function | Technology / Architecture | How It Works | Differentiating Capability | Limitation / Remaining Gap | Maturity | Related Market Signal IDs | Source ID`

Competitor evidence is used as precedent and boundary-setting. It is not automatically treated as proof that a technology is novel or available to LIXIL.

### 3. Supplier_Tech

Purpose: capture supplier / OEM / ODM technologies and capabilities found in supplier catalogs, presentations, and technical documents.

Fields:

`Supplier Tech ID | Supplier / Company | Technology / Component | Capability / Principle | Current Application | Maturity | Fitting Applicability | Key Constraints | Source ID`

Supplier technology is evidence of supplier capability, not proof of novelty. The current v1 file intentionally does not maintain a reverse `Tech Radar` relation here.

### 4. Tech_Radar

Purpose: capture technologies that can enable or inspire R&D, including cross-industry transfer technologies, mechanisms, material/process concepts, and relevant technologies already used in bathroom/shower products.

Fields:

`Tech ID | Technology | Source Industry | Maturity | Claw Role | Discovery Class | Nguyên lý / Cơ chế | Ứng dụng / Giá trị tiềm năng | Supplier Tech IDs | Competitor Tech IDs | Market Signal IDs | Source IDs`

`Tech_Radar` is the technology hub for the current Knowledge Pool.

### 5. Source

Purpose: centralize evidence and preserve traceability.

Fields:

`Source ID | Source Title | Type | URL | Evidence / Why Relevant`

`Source` is the authority for evidence IDs. A relationship field must reference an existing `SRC-*` ID.

## Build workflow

### Step 1 — Collect material

Build inputs from:

- Market Pull: consumer pain points, market needs, trends, voice of customer.
- Tech Push: emerging technologies, mechanisms, materials, processes, products.
- Competitor Technology.
- Supplier / OEM / ODM Technology.
- Patents, technical documents, and other evidence.

### Step 2 — Structure Market Signal

Convert raw market input into a user-centered problem statement.

For each signal, identify:

`User / Context → Pain Point → Existing Solution → Remaining Gap → Required Function`

Keep `Market Pull Class` to distinguish active signals from watch/baseline items.

### Step 3 — Structure competitor technology

Capture what the competitor actually does, how it works, what user capability it creates, what limits it has, and which market signals it addresses.

Exclude internal LIXIL brands from the external competitor list when the working definition of competitor is external to LIXIL. In this context LIXIL includes American Standard, INAX, and GROHE.

### Step 4 — Structure supplier technology

Extract concrete supplier capabilities from the source catalogs/documents. Record practical applicability and constraints. Do not infer novelty simply because the supplier presents the technology as new.

### Step 5 — Build / refine Tech Radar

Start with candidate technology concepts from internet research, technical material, supplier/competitor evidence, and transfer opportunities.

Filter or merge technologies when they are too generic, too weak for R&D transfer, duplicative, or better represented as one mechanism family.

Each Tech Radar record should explain:

`Technology → Principle / Mechanism → Potential Application / Value → Maturity → Claw Role → Discovery Class`

### Step 6 — Link entities by canonical IDs

Use stable IDs only:

- `MS-xxx` = Market Signal
- `CT-xxx` = Competitor Tech
- `ST-xxx` = Supplier Tech
- `TR-xxx` = Tech Radar
- `SRC-xxx` = Source

The preferred traversal is:

`Market Signal → Tech Radar → Supplier / Competitor → Source`

Do not create duplicate reverse relations merely to make the graph symmetrical.

### Step 7 — Validate

Before release, check:

1. All entity IDs are unique.
2. Relationship IDs point to existing master IDs.
3. Source references point to existing `Source` records.
4. No obsolete competitor IDs remain after competitor list changes.
5. No arbitrary new ID format is introduced.
6. Empty relation fields are allowed when no verified relationship exists.
7. Evidence remains traceable.

## Claw Idea usage

The Knowledge Pool is an input to Claw Idea, not the final idea list.

A typical query should allow AI to traverse:

`User Problem → Relevant Tech Radar → Supplier Capability → Competitor Precedent → Evidence → Remaining Gap`

Example:

`MS-001` asks how to maintain useful shower spray performance under low / fluctuating pressure.

AI can traverse to technologies such as pressure-compensating emitters, pressure-responsive nozzles, fixed fluidic spray shaping, or spray-zone routing; then inspect linked supplier capabilities, competitor precedent, and sources before generating combinations.

The goal is not to deep-analyze every record. Use the Knowledge Pool to generate and connect ideas first, then evaluate promising ideas using user value, technical feasibility, novelty, business potential, and evidence.

## ID conventions

Canonical ID formats:

| Entity | Prefix | Example |
|---|---|---|
| Market Signal | MS | `MS-001` |
| Competitor Tech | CT | `CT-001` |
| Supplier Tech | ST | `ST-001` |
| Tech Radar | TR | `TR-001` |
| Source | SRC | `SRC-001` |

Rules:

- IDs are unique and stable.
- Do not reuse deleted IDs.
- Do not renumber records just to remove gaps.
- Relationship fields use canonical IDs only.
- Multiple IDs in a CSV relationship cell are separated by `;`.
- `Source` is the authority for `SRC-*` IDs.

## Folder structure

```text
TOPICS/
└── RnD INNOVATION/
    └── Knowledge sheet/
        ├── README.md
        ├── changelog.md
        ├── market_signal_v1.csv
        ├── competitor_tech_v1.csv
        ├── supplier_tech_v1.csv
        ├── tech_radar_v1.csv
        └── source_v1.csv
```

The folder is the durable workstream location. The parent `TOPICS/RnD INNOVATION/RnD INNOVATION.md` remains the routing layer; detailed knowledge belongs here or in the authoritative source documents.

## Maintenance workflow

When new material arrives:

1. Add or update the relevant knowledge records.
2. Preserve evidence in `Source`.
3. Link only verified relations.
4. Re-run relation and ID validation.
5. Release the updated CSV set as the next version.
6. Record the change in `changelog.md`.

Source master should be finalized after the other sheets are finalized, because later sheets may introduce additional evidence.

## Current decision

The v1 Knowledge Sheet is considered usable for the next stage: Claw Idea generation, evaluation, and subsequent deep analysis of selected ideas.
