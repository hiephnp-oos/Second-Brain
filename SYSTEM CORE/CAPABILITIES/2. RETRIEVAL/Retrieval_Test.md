# Retrieval Test

## Purpose

Lightweight test for Phase 3 Retrieval / Routing. The goal is to verify that an AI can find the smallest useful context path from the repository without reading the whole repository.

## Test Procedure

For a real user request:

1. Start with `AI_MEMORY.md` only.
2. State the selected topic.
3. State the selected workstream, when applicable.
4. Read only the files needed to answer the request.
5. Identify whether the answer came from:
   - durable memory;
   - topic/workstream knowledge;
   - authoritative external source;
   - current conversation;
   - inferred candidate connection.
6. Check whether a relevant file was missed or excessive context was read.

## Pass Criteria

A retrieval path passes when:

- the correct topic is selected;
- the correct workstream is selected when one exists;
- the required authoritative artifact is found;
- irrelevant broad context is not required;
- inferred relationships are not treated as established facts;
- the answer can be traced back to its supporting file/source.

## R&D Innovation Test

For an R&D query involving a user problem, test the path:

`AI_MEMORY → RnD INNOVATION → Knowledge sheet → relevant entity type(s) → Source`

For technology connection tasks, test:

`Market_Signal → Tech_Radar → Supplier_Tech / Competitor_Tech → Source`

A semantic match that is absent from the explicit CSV relationship fields is a candidate connection only. Verify before changing the Knowledge Sheet.

## Failure Categories

Record recurring failures only:

- `ROUTE_WRONG_TOPIC`
- `ROUTE_WRONG_WORKSTREAM`
- `RETRIEVAL_MISSED_CONTEXT`
- `RETRIEVAL_TOO_BROAD`
- `RELATION_INFERRED_AS_FACT`
- `SOURCE_TRACEABILITY_MISSED`

Do not create a permanent record for isolated mistakes.

## Stop Rule

Do not add a retrieval engine or search infrastructure from this test alone. Upgrade architecture only when repeated real usage shows the current GitHub + Markdown routing model cannot meet the continuity goal.
