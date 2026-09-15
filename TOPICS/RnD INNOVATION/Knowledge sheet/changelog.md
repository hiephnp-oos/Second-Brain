# Changelog

## v1 — 2026-09-15

Initial released Knowledge Sheet baseline.

- Established the linked Knowledge Pool structure for `Market_Signal`, `Competitor_Tech`, `Supplier_Tech`, `Tech_Radar`, and `Source`.
- Standardized canonical IDs: `MS-*`, `CT-*`, `ST-*`, `TR-*`, `SRC-*`.
- Established `Tech_Radar` as the technology relation hub.
- Confirmed that reverse `Competitor_Tech → Tech_Radar` and `Supplier_Tech → Tech_Radar` relations are not required.
- Validated current relation IDs and removed broken competitor references from the Tech Radar dataset before release.
- Released the five CSV snapshots from the approved Excel Knowledge Sheet as v1.
