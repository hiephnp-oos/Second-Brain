# Claw Discovery

Purpose:
- Run daily evidence-grounded idea discovery for R&D Innovation.
- Keep discovery separate from human-admitted ideas and authoritative Knowledge Sheet records.
- Use the released Personal Research prompts as execution contracts.

## Daily Flow

RS-10 Claw Market Pull Scout
→ RS-11 Claw Tech Push Scout
→ RS-12 Claw Idea Convergence

The two discovery lanes remain independent until convergence. Recombination is optional and must create a materially different user outcome, physical capability or architecture.

## Daily Staging Contract

Each daily scheduler run writes one discovery record to:

`staging/YYYY-MM-DD.md`

The daily record must preserve:
- run date
- RS-10 output
- RS-11 output
- RS-12 converged candidates
- evidence/source references
- evidence status
- main uncertainty
- KEEP / WATCH / DROP disposition
- batch status: UNBATCHED or BATCHED

Daily staging is operational state for the scheduler. It is not an approved Knowledge Sheet record.

## Three-Day Batch

When three new UNBATCHED daily runs are available, execute RS-13 Claw 3-Day Idea Batch.

Output:
`batches/YYYY-MM-DD_to_YYYY-MM-DD.csv`

After successful batch creation, mark only those three source daily records as BATCHED. Do not delete them because they are required for evidence traceability.

If fewer than three new daily runs are available, do not create a batch.

## Human Review

Three-day CSV outputs are discovery material, not approved ideas.

After human review, use:
- Idea Review/Prompt.csv for evidence-based idea review.
- Personal Research/Prompt.csv RS-03 to RS-09 for targeted external research.
- Knowledge Sheet only after human verification and the existing Knowledge Sheet promotion process.

## Evidence Rules

- Product existence does not prove hidden mechanism.
- Technology existence does not prove transferability.
- Supplier availability does not equal innovation.
- Missing evidence is UNKNOWN, not negative evidence.
- Patent absence does not prove novelty.
- Human review is the final admission authority.

## Operating Rule

Optimize for distinct, evidence-grounded opportunity seeds rather than idea volume. Zero qualified ideas is a valid result.
