# Changelog

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

Future dataset releases should use the authoritative exported CSV files directly. Preserve CSV contents and IDs; do not rewrite, normalize, merge, translate, or reconstruct records unless explicitly requested. Use the next release suffix (`_v2`, `_v3`, ...) for substantive dataset changes and record the change here.
