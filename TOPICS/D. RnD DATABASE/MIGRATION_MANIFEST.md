# RnD Database Migration Manifest

Status: ARCHITECTURE MIGRATION
Date: 2026-09-16
Source: DNF_R&D_Database_V4_Hiep_FULL_16Sep26_0738.zip
Target: Second-Brain/TOPICS/5. RnD DATABASE/
Architecture: 1_Frontend_UI / 2_Library_Core / 3_Backend_Scanner

The RnD Database is maintained in Second Brain as a 3-layer project structure. The database README documents the Bound Script ↔ LibDNF ↔ Backend Scanner relationship.

Security handling: the Google Chat webhook credential from the source configuration is intentionally not stored in Second Brain. The Library Config webhook field is blank and must be supplied securely at runtime.

Note: the GitHub source repository `hiephnp-oos/DNF-R-D-database` remains a legacy flat baseline. The uploaded V4 package is the architecture reference for this migration.

## Migration integrity

The migrated source tree under `TOPICS/5. RnD DATABASE/` is the current detailed project source. Validate the expected three-layer structure and compare future migrations against the source package inventory before replacing the current baseline.

Do not treat this manifest as a substitute for an actual source-file inventory. When a fresh migration is performed, generate or update the inventory from the source package before replacing the current tree.
