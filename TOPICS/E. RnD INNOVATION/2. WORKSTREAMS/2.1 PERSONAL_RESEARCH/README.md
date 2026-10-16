# Personal Research

## Purpose

Independently discover new R&D ideas through product/mechanism research, technology scouting, material/process and supplier research, patent/prior-art work, literature research, and targeted investigation.

The sole output goal of this workstream is idea discovery. Ideas selected to proceed are handed to `../2.2 IDEA_REVIEW/` for idea-specific review.

## Working Rules

- Start from the decision and known constraints.
- Use KNOWN / WORKING / OPEN for important assumptions.
- Derive MUST / SHOULD / COULD when scope is unclear.
- Use the minimum sufficient research depth.
- Prefer primary and technical sources.
- Distinguish evidence from inference and recommendation.
- Do not claim novelty from absence of found prior art.
- Do not infer internal product mechanism from UX alone.
- For patents, inspect claims/family/status where material.
- For materials, do not generalize from generic chemistry to a specific grade without evidence.

## Prompts

Use `Prompt.csv` for Personal Research tasks. The prompt is the input; a separate INPUT folder is not required. Reusable methods are governed by [1. CAPABILITIES](../../1. CAPABILITIES/README.md).

## Daily Output — Persisted Markdown artifact

- The external schedule runs once per local date at 05:00 Asia/Ho_Chi_Minh and produces exactly one date-specific Markdown report containing `RUN_DATE` and `RUN_SLOT 01`.
- The expected canonical artifact is `YYYY-MM-DD.md` directly in this workstream, present on `main` after the scheduled PR is validated and merged.
- Required flow: read current main sources → run RS-10/11/12 → Vietnamese Rewrite and semantic/readability gates → create/update the date-specific file on a dedicated branch → open/reuse the matching PR → validate the exact one-file diff and required checks → merge only after all checks pass → read back the exact path from `main`.
- Never write directly to `main`. If any write/PR/check/merge/read-back step is blocked, return the complete Markdown report inline as recovery output, mark it `NOT_PERSISTED`, report the exact failed operation and URL/error, and do not claim a GitHub file exists. Retry the same blocked operation once only after re-reading current GitHub state; do not bypass safety controls.
- If a complete artifact for the date already exists, verify it and do not overwrite or duplicate it. Manual recovery must remain labelled `MANUAL RECOVERY`; scheduled provenance is independently verified or `NOT_VERIFIED`.
- There are no RUN_SLOT 02/03 executions in the active schedule. Any legacy three-slot records remain historical only.
- The report is for direct user review and is not an approved Knowledge Sheet record. No staging state, three-day consolidation, or batch output is used by the schedule.
- Previous Claw records are retained directly in this workstream root as historical reference. Do not use them as active workflow state or recreate `staging/` and `batches/`.

## Weekly Persistence Watchdog

- Every Monday at 08:00 Asia/Ho_Chi_Minh, the GitHub Actions watchdog summarizes the previous Monday-Sunday period.
- It counts date-specific daily reports actually present on `main`: complete, incomplete, and missing out of 7; manual-recovery reports are identified separately. A complete report returned without successful persistence is not a repository artifact and counts as missing.
- The weekly summary is recorded in a GitHub Issue and the Actions run summary. It checks repository artifacts only; it does not run Claw research or prove external scheduler execution.
- The external schedule is responsible for research and daily artifact persistence. The watchdog does not execute research or recover missing content.

The execution date is the calendar date of the current scheduled invocation in Asia/Ho_Chi_Minh, resolved from the active invocation/runtime date-time context. The scheduler is not required to expose a separate execution-timestamp field. If only the current date is available, use that local date; clock time is not needed for the filename. Never derive the date from a prior last-run timestamp, previous report, UTC date, or assumed date. If no usable current invocation date is available, report `RUN_DATE_UNAVAILABLE` and do not create or persist a date-specific artifact.

When an idea is selected to proceed, transfer it to `../2.2 IDEA_REVIEW/<IDEA_ID>/`. Do not turn every discovered idea into a review folder.

Research findings remain in the discovery artifact unless they qualify for a Knowledge Candidate. Do not automatically copy results into the Knowledge Sheet.

## Review Memory — Human-reviewed outcomes

Before RS-12, read [REVIEW_MEMORY.md](REVIEW_MEMORY.md). It is the durable record of user-reviewed candidate decisions and rejected mechanisms; it supplements, but does not replace, daily records, previous Claw records, IDEA_REVIEW artifacts, or regression cases. Preserve each decision's scope: a DROP rejects the reviewed candidate/delta, not automatically the entire problem domain. A later candidate may proceed only when its material DELTA is explicit and checked against the recorded reason. New user review decisions must be appended through the repository PR workflow; never overwrite historical decisions.

## Historical Learning and Duplicate Control

Before RS-12, every daily run must retrieve and compare against:
- Previous daily Claw Markdown records retained directly in this workstream root (read-only historical records). Legacy three-day CSV batch files have been removed; do not recreate or depend on them.
- Prior daily discovery records: at minimum the previous 7 calendar days, plus any older record explicitly referenced by a reviewed lesson or matching candidate.
- Relevant reviewed IDEA_REVIEW outcomes and Project Improvement regression cases.

The run must build a temporary comparison ledger (Candidate ID/title, problem/outcome, mechanism, fitting application, prior class/disposition, source path). For every new candidate, record `NO_MATCH`, `RELATED_VARIANT`, or `DUPLICATE`, matched prior IDs, and the material difference when retained. Similarity is semantic; title/keyword matching alone is insufficient. If a historical source cannot be read, disclose the exact gap and do not claim a complete duplicate check.

Historical DROP/WATCH/BASELINE records are not interchangeable: preserve the original disposition and extract reusable lessons without treating a prior rejection as proof that a new candidate is invalid.

## Language and Readability Contract

All user-facing daily report content must be natural Vietnamese and follow [VIETNAMESE_REWRITE.md](../../1. CAPABILITIES/VIETNAMESE_REWRITE.md). Translate ordinary headings and field labels while preserving their meaning and order. Keep canonical IDs, enum values, source titles, proper names, standards, patent identifiers, and necessary technical terms unchanged.

Before returning the report, inspect the rendered Markdown for Vietnamese labels, concise bullets, one main point per bullet, clear evidence/inference/unknown distinctions, and unnecessary English-Vietnamese mixing. Rewrite if the report is difficult to scan. This is a language/presentation requirement and must not change technical meaning, evidence state, or disposition.
