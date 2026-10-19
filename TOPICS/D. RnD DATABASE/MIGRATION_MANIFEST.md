# RnD Database Migration Manifest

Status: V4 SOURCE REFRESH
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

## Security handling

- `MAINTENANCE_WEBHOOK` in `2_Library_Core/Config.gs` is intentionally blank in the repository.
- Do not commit Google Chat webhook URLs, keys, tokens, or other credentials.
- Configure required webhook values outside version-controlled source through an approved secure runtime/configuration mechanism.
- A credential that was previously committed or exposed must be rotated/revoked separately; removing it from the current source does not invalidate it.

## Migration integrity

The migrated files under `TOPICS/D. RnD DATABASE/` are the current detailed source for this project in Second-Brain. Preserve the three-layer structure and do not flatten the three Apps Script projects into one directory.

For subsequent source refreshes:
1. Compare the uploaded package inventory against the existing three-layer tree.
2. Confirm all expected source files are represented and unintended deletions are understood.
3. Scan source-like files for credentials and webhook URLs.
4. Update this manifest and the topic README in the same PR.
5. Remove temporary upload/checklist artifacts before merge.
