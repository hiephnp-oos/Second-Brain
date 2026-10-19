# RnD Database Migration Manifest

Status: V4 ARCHIVAL BACKUP — SOURCE REFRESH
Date: 2026-10-17
Repository sync date: 2026-10-19
Source: `DNF_R&D_Database_V4_Hiep_FULL_17Oct26_1529.zip`
Previous source baseline: `DNF_R&D_Database_V4_Hiep_FULL_16Sep26_0738.zip`
Target: `Second-Brain/TOPICS/D. RnD DATABASE/`
Architecture: `1_Frontend_UI / 2_Library_Core / 3_Backend_Scanner`

## Migration scope

The V4 source refresh updates the three deployment layers in place. The directories remain separated by deployment role:

- `1_Frontend_UI/`: Bound Apps Script UI, menus, wrappers, manuals, and export/backup.
- `2_Library_Core/`: standalone `LibDNF` library and shared business logic.
- `3_Backend_Scanner/`: scanner-side configuration, scan, rename, and maintenance utilities.

The refreshed source includes `3_Backend_Scanner/MoveOld.gs` for moving files marked as old into their mapped archive folders.

## Archival purpose and handling

- This topic is an archival backup of the DNF R&D Database V4 source that has already run in mass production; it is not the active runtime deployment or a request to re-audit production logic.
- Preserve the received source and the three deployment layers. Do not refactor or rewrite implementation during routine archive maintenance.
- **Explicit user decision (2026-10-19):** retain the existing `MAINTENANCE_WEBHOOK` setting in `2_Library_Core/Config.gs` in this archival backup. Do not blank or remove it during routine cleanup. This is a narrow, topic-specific exception to the repository's general rule against storing credentials; it does not authorize adding other credentials.
- The repository is intended to be private. Changing visibility does not revoke the webhook or erase prior exposure while the repository was public. Credential revocation/rotation is a separate action and is not performed by this documentation update.

## Migration integrity

The migrated files under `TOPICS/D. RnD DATABASE/` are the current detailed source for this project in Second-Brain. Preserve the three-layer structure and do not flatten the three Apps Script projects into one directory.

For subsequent source refreshes:
1. Compare the uploaded package inventory against the existing three-layer tree.
2. Confirm all expected source files are represented and unintended deletions are understood.
3. Scan source-like files for credentials and webhook URLs.
4. Update this manifest and the topic README in the same PR.
5. Remove temporary upload/checklist artifacts before merge.
