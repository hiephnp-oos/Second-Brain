# Nuvio Setup

Entry point and durable topic context for recurring work involving Nuvio stream configuration, playback behavior, stream selection, subtitles, and the upstream AIOStreams/TorBox stack.

## Scope

- Nuvio client and playback configuration.
- AIOStreams aggregation, filtering, sorting, and ranking.
- TorBox delivery and cached-stream behavior.
- HDR/SDR compatibility and subtitle handling.
- Troubleshooting, validated configuration changes, and stream-selection behavior.

## Architecture Context

For this project, use the following role boundaries:

- **Xperience** = catalog / discovery / home-screen organization.
- **Nuvio** = media client / playback UI.
- **AIOStreams** = stream aggregation, filtering, and ranking.
- **TorBox** = debrid delivery / cached torrent streaming.

Nuvio stream configuration should therefore be evaluated primarily from the playback and stream-selection perspective, while keeping AIOStreams filtering/ranking and TorBox delivery as separate layers.

## Working Context

The user iteratively builds Nuvio stream configuration rather than treating the default configuration as final. Configuration changes should be evaluated against actual playback experience, stream availability, compatibility, and interaction with AIOStreams/TorBox.

Known areas of interest include stream filtering, display/format decisions, HDR/SDR playback behavior, subtitle handling, and practical client-side troubleshooting.

## Working Principles

- Preserve a known-good Nuvio baseline before making changes.
- Separate Nuvio playback behavior from upstream AIOStreams ranking/filter behavior.
- Diagnose playback failures at the correct layer instead of changing multiple layers simultaneously.
- Prefer configuration changes that improve real viewing experience and reliability, not theoretical optimization alone.
- When testing stream-related changes, keep the comparison conditions controlled enough to identify which layer caused an improvement or regression.
- Do not store API keys, passwords, tokens, or other secrets in this topic file.

## Active Projects / References

- **AIOStreams configuration backups:** see the `AIOStreams Configuration Backups` section below for the Primary/Secondary backup inventory and integrity hashes.
- Primary AIOStreams instance: `https://aiostreamsfortheweebsstable.midnightignite.me/`
- Secondary AIOStreams instance: `https://aio.atbphosting.com/stremio/`
- Nuvio documentation: `https://nuvio.tv/docs`
- AIOStreams setup documentation: `https://docs.aiostreams.viren070.me/configuration/setup/`
- Project-local Nuvio documentation is available as a source file, but it is not currently a complete transcription of the rendered documentation; consult the authoritative site when current details matter.

## AIOStreams Configuration Backups

The two JSON files in this folder are the actual configuration snapshots. Their role is confirmed by the `addonName` inside each file.

- **Primary:** `aiostreams-config-2026-09-15.21-28-14.json` — SHA-256 `89e7ca3fd03e12c5d4d802119e4073c7218562e985fe8fea6cd6f04b9ca905c5`
- **Secondary:** `aiostreams-config-2026-09-15.21-28-43.json` — SHA-256 `3de4085eae22b55c46de0aed857d0228ec3e73b5144d804d14f2e2a3f4772f19`

Credentials are intentionally not stored in GitHub.

## Decisions

- Treat Nuvio as the playback/client layer in the project's overall architecture.
- Keep Nuvio stream configuration as a separate durable topic because it requires recurring tuning and troubleshooting independent of catalog organization.
- Keep detailed AIOStreams configuration snapshots as artifacts/backups rather than copying their contents into the topic README.
- Keep AIOStreams UUIDs and passwords outside GitHub; do not store credentials in the repository.
- Use Git history as the version history for configuration artifacts; do not create manual archive copies unless a separate backup policy requires them.
- Keep the AIOStreams backup inventory directly in this README to keep the Nuvio topic folder compact.

## Lessons

- AIOStreams configuration backups should be identifiable by role (Primary/Secondary) and integrity hash so the correct snapshot can be recovered without duplicating configuration into memory.
- Backup metadata should live with the topic README when a separate index file adds no operational value.
- Nuvio, AIOStreams, and TorBox should be diagnosed as separate layers; a playback issue is not automatically an AIOStreams ranking/filter issue.
- Configuration backup metadata belongs in the Nuvio topic, while secrets remain outside the repository.

## Routing

Use this topic for Nuvio-specific work. Keep Nuvio, AIOStreams, and TorBox responsibilities separated when diagnosing or changing the system. Use this README as the durable topic context, then route to the relevant configuration artifact/source when detailed settings are required.

## Next

Maintain the backup inventory when a new Primary/Secondary configuration snapshot becomes the known-good baseline. Record durable configuration decisions, validated troubleshooting findings, and stable stream-selection principles here as they are established through repeated project work.
