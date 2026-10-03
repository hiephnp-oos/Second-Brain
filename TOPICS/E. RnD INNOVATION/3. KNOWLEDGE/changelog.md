# Changelog

## beta-2026-10-03

Promoted and audited Solex supplier knowledge across six reviewed PDFs in BETA.

- Consolidated the Water System platform into `ST-061`; removed duplicate `ST-084`. Added subsystem records `ST-089`–`ST-096), preserving supplier-provided specifications and claims with source traceability.
- Consolidated Height-Adjustable Rain Showerhead evidence into `ST-036`, retaining source-specific configurations and differing supplier claims without reconciliation; removed duplicate `ST-087`.
- Separated Digitally Controlled Thermostatic Valve / DualMaster Concealed Box into `ST-088` and `TR-077`; kept kitchen ThermoHybrid `ST-070` distinct.
- Expanded `SRC-366` with page-range and subsystem-level coverage.
- Preserved Market Signal records; supplier claims were not treated as independently verified market evidence.
- Validated BETA CSV structure, IDs, and ST / CT / MS / SRC references; no malformed rows, duplicate IDs, blank IDs, or dangling references were found.
- No RELEASED artifacts changed. PR #91 remains pending owner confirmation; this changelog entry documents the BETA candidate on the PR branch, not a merged release.

## beta-2026-10-01

Updated the BETA Agent–Prompt–Knowledge operating contract.

- Added `Knowledge Sheet Input Mode` to each Prompt.csv template: `KS_REQUIRED`, `KS_OPTIONAL`, or `KS_NOT_USED`.
- Clarified that requested idea counts (including 5–10) are adjustable target ranges, not mandatory quotas; quality and evidence gates take precedence.
- Added Agent instructions to report actual Knowledge Sheet retrieval scope, tables read, data gaps, and relationship checks; do not overstate coverage.
- No Knowledge Sheet data/schema or RELEASED artifacts changed.


## v2 — 2026-09-15

Updated and locked the Knowledge Sheet dataset for the next Claw Idea stage.

- Replaced the v1 active CSV set with the authoritative v2 snapshots: `Market_Signal_v2.csv`, `Competitor_Tech_v2.csv`, `Supplier_tech_v2.csv`, `Tech_radar_v2.csv`, and `Sources_v2.csv`.
- v2 dataset size: 22 Market Signals, 46 Competitor Tech, 58 Supplier Tech, 70 Tech Radar, 354 Sources.
- Preserved canonical IDs and stable relationship references; do not renumber existing IDs to remove gaps.
- Updated Competitor_Tech with the expanded competitor technology set and TOTO technology block.
- Updated Supplier_Tech with additional supplier/OEM/ODM technology records.
- Updated Tech_Radar with additional technology clusters and refreshed Supplier / Competitor / Market / Source relations.
- Supplier_Tech v2 uses `Source ID` as the primary evidence/traceability field; the separate `Key Constraints` field used in v1 documentation is not part of the v2 schema. Constraints and validation requirements are checked from the linked source during evaluation/deep analysis.
- Updated the Knowledge Sheet documentation to describe v2 as the current authoritative baseline and next input for Claw Idea generation.

## v1 — 2026-09-15

Initial released Knowledge Sheet baseline.

- Established the linked Knowledge Pool structure for `Market_Signal`, `Competitor_Tech`, `Supplier_Tech`, `Tech_Radar`, and `Source`.
- Standardized canonical IDs: `MS-*`, `CT-*`, `ST-*`, `TR-*`, `SRC-*`.
- Established `Tech_Radar` as the technology relation hub.
- Confirmed that reverse `Competitor_Tech → Tech_Radar` and `Supplier_Tech → Tech_Radar` relations are not required.
- Validated current relation IDs and removed broken competitor references from the Tech Radar dataset before release.
- Released the five authoritative CSV snapshots in this folder as v1: `market_signal_v1.csv`, `competitor_tech_v1.csv`, `supplier_tech_v1.csv`, `tech_radar_v1.csv`, and `source_v1.csv`.
- v1 dataset size: 22 Market Signals, 22 Competitor Tech, 48 Supplier Tech, 65 Tech Radar, 351 Sources.
- The five CSV files are the source-of-truth data artifacts for v1; documentation is maintained separately and must not be used to reconstruct CSV contents.
- Removed the temporary `Exported_Sheets_v1.zip` repository artifact after the individual CSV files were committed.

## Release handling rule

Future dataset releases should use the authoritative exported CSV files directly. Preserve CSV contents and IDs; do not rewrite, normalize, merge, translate, or reconstruct records unless explicitly requested. Use the next release suffix (`_v3`, ...) for substantive dataset changes and record the change here.
