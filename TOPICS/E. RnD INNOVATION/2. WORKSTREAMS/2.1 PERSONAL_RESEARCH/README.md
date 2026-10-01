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

## Daily Output

- One canonical daily discovery record: `YYYY-MM-DD.md` directly in this workstream.
- Exactly one scheduled execution runs per local date at 05:00 Asia/Ho_Chi_Minh and writes `RUN_SLOT 01`.
- There are no RUN_SLOT 02/03 executions in the active schedule. Any legacy three-slot records remain historical only.
- The user reviews the daily record directly. It is not an approved Knowledge Sheet record. No staging state, three-day consolidation, or batch output is used for new runs.
- Existing `staging/` and `batches/` contents are legacy historical records only; do not write new files there or use them as active workflow state.

The execution date is resolved from the actual scheduler execution timestamp in Asia/Ho_Chi_Minh; filenames use that resolved date.

When an idea is selected to proceed, transfer it to `../2.2 IDEA_REVIEW/<IDEA_ID>/`. Do not turn every discovered idea into a review folder.

Research findings remain in the discovery artifact unless they qualify for a Knowledge Candidate. Do not automatically copy results into the Knowledge Sheet.

## Review Memory — Human-reviewed outcomes

Before RS-12, read [REVIEW_MEMORY.md](REVIEW_MEMORY.md). It is the durable record of user-reviewed candidate decisions and rejected mechanisms; it supplements, but does not replace, daily records, historical batches, IDEA_REVIEW artifacts, or regression cases. Preserve each decision's scope: a DROP rejects the reviewed candidate/delta, not automatically the entire problem domain. A later candidate may proceed only when its material DELTA is explicit and checked against the recorded reason. New user review decisions must be appended through the repository PR workflow; never overwrite historical decisions.

## Historical Learning and Duplicate Control

Before RS-12, every daily run must retrieve and compare against:
- All legacy CSV files currently present in `batches/` (read-only historical records).
- Prior daily discovery records: at minimum the previous 7 calendar days, plus any older record explicitly referenced by a reviewed lesson or matching candidate.
- Relevant reviewed IDEA_REVIEW outcomes and Project Improvement regression cases.

The run must build a temporary comparison ledger (Candidate ID/title, problem/outcome, mechanism, fitting application, prior class/disposition, source path). For every new candidate, record `NO_MATCH`, `RELATED_VARIANT`, or `DUPLICATE`, matched prior IDs, and the material difference when retained. Similarity is semantic; title/keyword matching alone is insufficient. If a historical source cannot be read, disclose the exact gap and do not claim a complete duplicate check.

Historical DROP/WATCH/BASELINE records are not interchangeable: preserve the original disposition and extract reusable lessons without treating a prior rejection as proof that a new candidate is invalid.

## Scheduled Output PR — Conditional Auto-Merge

The daily scheduler may auto-merge only its own date-specific discovery-output PR, and only when every condition below is verified:

1. The PR is for the current resolved local run date and its branch/PR was created by that run.
2. The complete changed-file set contains exactly one added or updated file: this workstream's `YYYY-MM-DD.md` matching the run date. No other path, deletion, rename, or system/prompt/memory change is allowed.
3. The report contains the required `RUN_DATE`, `RUN_SLOT 01`, execution status, evidence/duplicate-check fields, and Vietnamese user-facing content; read-back from the PR branch succeeds.
4. The repository's required validation checks have completed successfully. A pending, skipped, missing, or failed required check is not a pass.
5. The PR is open, non-draft, mergeable, targets `main`, has no unresolved blocking review/change request, and GitHub permits the merge.
6. Immediately before merge, re-fetch the PR and verify its head SHA and changed-file set have not changed. Merge using the expected head SHA, then re-read the exact daily path from `main` and verify the merged content and commit.

If any condition is false or cannot be verified, do not merge; leave the PR open and report the exact blocker and URL. Do not enable repository-wide auto-merge or grant the scheduler authority to merge arbitrary PRs.

All changes to prompts, capabilities, workflow rules, review memory, Knowledge, IDEA_REVIEW decisions, or other system/baseline files remain subject to explicit human review and merge. Auto-merge is limited to the single daily report artifact; it does not approve its ideas for downstream work or Knowledge promotion.

## Language and Readability Contract

All user-facing daily report content must be natural Vietnamese and follow [VIETNAMESE_REWRITE.md](../../1. CAPABILITIES/VIETNAMESE_REWRITE.md). Translate ordinary headings and field labels while preserving their meaning and order. Keep canonical IDs, enum values, source titles, proper names, standards, patent identifiers, and necessary technical terms unchanged.

Before persistence, inspect the rendered Markdown for Vietnamese labels, concise bullets, one main point per bullet, clear evidence/inference/unknown distinctions, and unnecessary English-Vietnamese mixing. Rewrite before PR if the report is difficult to scan. This is a language/presentation requirement and must not change technical meaning, evidence state, or disposition.
