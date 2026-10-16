# Nuvio Setup

Entry point and durable topic context for recurring work involving Nuvio stream configuration, playback behavior, stream selection, subtitles, and the upstream AIOStreams/TorBox stack.

## Scope

- Nuvio client and playback configuration.
- AIOStreams aggregation, filtering, sorting, and ranking.
- TorBox delivery and cached-stream behavior.
- HDR/SDR compatibility and subtitle handling.
- Troubleshooting, validated configuration changes, and stream-selection behavior.

## Current Context

For this project, use the following role boundaries:

- **Xperience** = catalog / discovery / home-screen organization.
- **Nuvio** = media client / playback UI.
- **AIOStreams** = stream aggregation, filtering, and ranking.
- **TorBox** = debrid delivery / cached torrent streaming.

Nuvio stream configuration should therefore be evaluated primarily from the playback and stream-selection perspective, while keeping AIOStreams filtering/ranking and TorBox delivery as separate layers.

Known areas of interest include stream filtering, display/format decisions, HDR/SDR playback behavior, subtitle handling, and practical client-side troubleshooting.

## Status

- State: Frozen
- Summary: HDR and SDR AIOStreams profile snapshots dated 2026-10-16 have been received; repository publication is in progress.
- Direction: Do not tune the setup proactively; update only when a new requirement, regression, compatibility issue, or new known-good baseline appears.
- Last reviewed: 2026-10-16

## Working Principles

- Preserve a known-good Nuvio baseline before making changes.
- Separate Nuvio playback behavior from upstream AIOStreams ranking/filter behavior.
- Diagnose playback failures at the correct layer instead of changing multiple layers simultaneously.
- Prefer configuration changes that improve real viewing experience and reliability, not theoretical optimization alone.
- When testing stream-related changes, keep the comparison conditions controlled enough to identify which layer caused an improvement or regression.
- Do not store API keys, passwords, tokens, or other secrets in this topic file.

## Active Projects / References

- **AIOStreams configuration backups:** see the `AIOStreams Configuration Backups` section below for HDR/SDR snapshots and integrity hashes.
- HDR AIOStreams instance: `https://aiostreamsfortheweebsstable.midnightignite.me/`
- SDR AIOStreams instance: `https://aio.atbphosting.com/stremio/`
- Nuvio documentation: `https://nuvio.tv/docs`
- AIOStreams setup documentation: `https://docs.aiostreams.viren070.me/configuration/setup/`
- Project-local Nuvio documentation is not a complete transcription of the rendered documentation; consult the authoritative site when current details matter.

## AIOStreams Configuration Backups

The intended new artifacts are `HDR_aiostreams-config-2026-10-16.09-51-07.json` and `SDR_aiostreams-config-2026-10-16.09-51-39.json`, uploaded for the 2026-10-16 baseline. **These files are not yet safe restore backups**: the current GitHub branch has incomplete JSON payloads, and the complete uploaded bytes have not been committed.

- **HDR profile (uploaded source SHA-256):** `b1f99973157ae16e25172f5a0df7873e2860e2ac02943ea46b14c7864baa0a3c`
- **SDR profile (uploaded source SHA-256):** `325b966126f87e13db9daa709974dc05188ae442bd66abbd3c1cf2c9d071eea6`

Profile inspection of the uploaded source files:

| Setting | HDR | SDR |
|---|---|---|
| Active service | TorBox | TorBox |
| Preferred visual tags | HDR, HDR10, HDR10+, HLG, DV, HDR+DV, 10bit, IMAX, SDR, Upscaled, AI | SDR |
| Preferred subtitles | Vietnamese, English | None |
| Preferred stream types | debrid, p2p, http | debrid, p2p |
| Sequential Groups | 4 | 3 |
| Ranked stream expressions | 61 | 61 |
| Enabled presets | 15 | 9 |
| Global sort | resolution → streamExpressionScore → SeaDex → quality → visualTag → audioTag → language → subtitle → bitrate | resolution → streamExpressionScore → SeaDex → quality → visualTag → audioTag → language → bitrate |

The HDR uploaded snapshot contains a legacy `nuvio-instant` variant marked not for v5; the uploaded SDR snapshot has no `variants` list. These are observations of the uploaded source files, not assertions that the repository backups have been successfully published.

Credentials are intentionally not stored in GitHub.

## Decisions

- Treat Nuvio as the playback/client layer in the project's overall architecture.
- Keep detailed AIOStreams snapshots as artifacts/backups rather than copying full configuration payloads into the topic README.
- Keep AIOStreams UUIDs and passwords outside GitHub; do not store credentials in the repository.
- Use Git history as the version history for configuration artifacts; do not create manual archive copies unless a separate backup policy requires them.
- Keep the backup inventory directly in this README to keep the Nuvio topic folder compact.
- Diagnose Nuvio, AIOStreams, and TorBox as separate layers.

## Lessons

- AIOStreams backups must be identifiable by role, timestamp, and integrity hash; verify the exact committed bytes before treating them as restore points.
- Backup metadata should live with the topic README when a separate index file adds no operational value.
- A playback issue is not automatically an AIOStreams ranking/filter issue.

## Routing

Use this topic for Nuvio-specific work. Keep Nuvio, AIOStreams, and TorBox responsibilities separated when diagnosing or changing the system. Use this README as the durable topic context, then route to the relevant configuration artifact/source when detailed settings are required.

## Next

Next action: replace the incomplete JSON files with the exact uploaded bytes, verify parseability and SHA-256 against the source values above, then update this inventory. Keep this topic Frozen unless a new requirement, regression, compatibility issue, or verified baseline requires change.
