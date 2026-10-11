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

The user iteratively builds Nuvio stream configuration rather than treating the default configuration as final. Configuration changes should be evaluated against actual playback experience, stream availability, compatibility, and interaction with AIOStreams/TorBox.

Known areas of interest include stream filtering, display/format decisions, HDR/SDR playback behavior, subtitle handling, and practical client-side troubleshooting.

## Status

- State: Frozen
- Summary: A known-good Nuvio/AIOStreams/TorBox setup and backup baseline has been established.
- Direction: Do not tune the setup proactively; update only when a new requirement, regression, compatibility issue, or new known-good baseline appears.
- Last reviewed: 2026-10-11

## Working Principles

- Preserve a known-good Nuvio baseline before making changes.
- Separate Nuvio playback behavior from upstream AIOStreams ranking/filter behavior.
- Diagnose playback failures at the correct layer instead of changing multiple layers simultaneously.
- Prefer configuration changes that improve real viewing experience and reliability, not theoretical optimization alone.
- When testing stream-related changes, keep the comparison conditions controlled enough to identify which layer caused an improvement or regression.
- Do not store API keys, passwords, tokens, or other secrets in this topic file.

## Active Projects / References

- **AIOStreams configuration backups:** see the `AIOStreams Configuration Backups` section below for the HDR/SDR backup inventory and integrity hashes.
- HDR AIOStreams instance: `https://aiostreamsfortheweebsstable.midnightignite.me/`
- SDR AIOStreams instance: `https://aio.atbphosting.com/stremio/`
- Nuvio documentation: `https://nuvio.tv/docs`
- AIOStreams setup documentation: `https://docs.aiostreams.viren070.me/configuration/setup/`
- Project-local Nuvio documentation is available as a source file, but it is not currently a complete transcription of the rendered documentation; consult the authoritative site when current details matter.

## AIOStreams Configuration Backups

The two JSON files in this folder are the actual configuration snapshots. Their role is confirmed by the `addonName` inside each file. HDR is the primary profile: resolution-first ranking, shared release-quality scoring, subtitles, and P2P/HTTP fallback. SDR is a compatibility profile: same resolution-first ranking and first three Sequential Groups, no subtitle providers, P2P remains enabled, and HTTP stream type is excluded. The profiles differ in visual-tag preferences and SDR-only visual exclusion. Both use TorBox and the same 61 ranked stream expressions. The obsolete `nuvio-instant` variant marked not for v5 has been removed from both.

- **Global sort (both):** resolution → streamExpressionScore → SeaDex → quality → visual tag → audio tag → language → subtitle → bitrate.
- **HDR:** `aiostreams-config-2026-09-15.21-28-14.json` — SHA-256 `13aeb3480884e7ed95b3abe650c656573aa1fed71809a49dbafb001d5e9a432b`
- **SDR:** `aiostreams-config-2026-09-15.21-28-43.json` — SHA-256 `3f07408d74d5f71a8088eb7da2f15636dcb5a33d956b17de10232bb33a7f9dbf`

Credentials are intentionally not stored in GitHub.

## Decisions

- Treat Nuvio as the playback/client layer in the project's overall architecture.
- Keep Nuvio stream configuration as a separate durable topic because it requires recurring tuning and troubleshooting independent of catalog organization.
- Keep detailed AIOStreams configuration snapshots as artifacts/backups rather than copying their contents into the topic README.
- Keep AIOStreams UUIDs and passwords outside GitHub; do not store credentials in the repository.
- Use Git history as the version history for configuration artifacts; do not create manual archive copies unless a separate backup policy requires them.
- Keep the AIOStreams backup inventory directly in this README to keep the Nuvio topic folder compact.
- Rank by resolution first, then release-expression score and SeaDex; do not add a separate cached-status sort key.
- Keep HDR as the primary profile for subtitle providers and HTTP/P2P fallback. SDR is a visual-compatibility profile with P2P enabled but no subtitle providers or HTTP stream type.

## Lessons

- AIOStreams configuration backups should be identifiable by role (HDR/SDR) and integrity hash so the correct HDR or SDR snapshot can be recovered without duplicating configuration into memory.
- Backup metadata should live with the topic README when a separate index file adds no operational value.
- Nuvio, AIOStreams, and TorBox should be diagnosed as separate layers; a playback issue is not automatically an AIOStreams ranking/filter issue.
- Configuration backup metadata belongs in the Nuvio topic, while secrets remain outside the repository.

## Routing

Use this topic for Nuvio-specific work. Keep Nuvio, AIOStreams, and TorBox responsibilities separated when diagnosing or changing the system. Use this README as the durable topic context, then route to the relevant configuration artifact/source when detailed settings are required.

## Next

Maintain the backup inventory when a new HDR/SDR configuration snapshot becomes the known-good baseline. Record durable configuration decisions, validated troubleshooting findings, and stable stream-selection principles here as they are established through repeated project work.
