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
- **AIOStreams** = stream aggregation, filtering, sorting, and ranking.
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
- Do not store API keys, passwords, tokens, private URLs, or other secrets in this topic file.

## Active Projects / References

- `AIOStreams_Backup_Index.md` — inventory and integrity hashes for the current Primary and Secondary AIOStreams JSON backups.
- Primary AIOStreams instance: `https://aiostreamsfortheweebsstable.midnightignite.me/`
- Secondary AIOStreams instance: `https://aio.atbphosting.com/stremio/`
- Nuvio documentation: `https://nuvio.tv/docs`
- AIOStreams setup documentation: `https://docs.aiostreams.viren070.me/configuration/setup/`
- Project-local Nuvio documentation is available as a source file, but it is not currently a complete transcription of the rendered documentation; consult the authoritative site when current details matter.

## Decisions

- Treat Nuvio as the playback/client layer in the project's overall architecture.
- Keep Nuvio stream configuration as a separate durable topic because it requires recurring tuning and troubleshooting independent of catalog organization.
- Keep detailed AIOStreams configuration snapshots as artifacts/backups rather than copying their contents into the topic README.
- Keep AIOStreams UUIDs and passwords outside GitHub; do not store credentials in the repository.
- Use Git history as the version history for configuration artifacts; do not create manual archive copies unless a separate backup policy requires them.

## Lessons

- AIOStreams configuration backups should be identifiable by role (Primary/Secondary) and integrity hash so the correct snapshot can be recovered without duplicating configuration into memory.
- Nuvio, AIOStreams, and TorBox should be diagnosed as separate layers; a playback issue is not automatically an AIOStreams ranking/filter issue.
- Configuration backup metadata belongs in the Nuvio topic, while secrets remain outside the repository.

## Routing

Use this topic for Nuvio-specific work. Keep Nuvio, AIOStreams, and TorBox responsibilities separated when diagnosing or changing the system. Use this README as the durable topic context, then route to `AIOStreams_Backup_Index.md` for backup identity/integrity information and to the relevant configuration artifact/source when detailed settings are required.

## Next

Maintain the backup inventory when a new Primary/Secondary configuration snapshot becomes the known-good baseline. Record durable configuration decisions, validated troubleshooting findings, and stable stream-selection principles here as they are established through repeated project work.
