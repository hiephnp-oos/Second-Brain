# Nuvio Stream Configuration

## Scope

Recurring work on building, tuning, troubleshooting, and maintaining Nuvio stream configuration, especially the interaction between Nuvio playback behavior and the upstream stream-delivery stack.

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

## References

- Nuvio documentation: `https://nuvio.tv/docs`
- Project-local Nuvio documentation is available as a source file, but it is not currently a complete transcription of the rendered documentation; consult the authoritative site when current details matter.
- AIOStreams setup documentation: `https://docs.aiostreams.viren070.me/configuration/setup/`

## Decisions

- Treat Nuvio as the playback/client layer in the project's overall architecture.
- Keep Nuvio stream configuration as a separate durable topic because it requires recurring tuning and troubleshooting independent of catalog organization.
- Detailed configuration snapshots and one-off experiments should remain in the current task/project artifacts rather than being copied wholesale into memory.

## Next

Add durable configuration decisions, validated troubleshooting findings, and stable stream-selection principles here as they are established through repeated project work.
