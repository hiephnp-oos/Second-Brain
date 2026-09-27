# Claw Discovery

## Purpose / Scope

Run evidence-grounded Claw discovery without promoting discovery output directly into authoritative memory.

- Run daily evidence-grounded idea discovery for R&D Innovation.
- Keep discovery separate from human-admitted ideas and authoritative Knowledge Sheet records.
- Use the released Personal Research prompts as execution contracts.

## Capability Contract

**Purpose:** discover evidence-grounded R&D opportunity seeds.

**Trigger:** daily external scheduler or manual request.

**Cadence:** daily; create a 3-day batch only when three new UNBATCHED daily runs are available.

**Input / Context:** active R&D scope, Knowledge Sheet, prior Claw learning, and released RS-10/RS-11/RS-12/RS-13 prompts.

**Process:** RS-10 Market Pull → RS-11 Tech Push → RS-12 Convergence → Discovery Quality Gate → daily staging.

**Output:** `staging/YYYY-MM-DD.md`.

**Validation:** evidence/source traceability, quality gate, execution-date integrity, and explicit non-promotion to authoritative knowledge.

**Persistence:** staging only; downstream review/promotion is separate.

## Daily Flow

RS-10 Claw Market Pull Scout
→ RS-11 Claw Tech Push Scout
→ RS-12 Claw Idea Convergence
→ Discovery Quality Gate

The two discovery lanes remain independent until convergence. Recombination is optional and must create a materially different user outcome, physical capability or architecture.

## Daily Staging Contract

Each daily scheduler run writes one discovery record to:

`staging/YYYY-MM-DD.md` (where YYYY-MM-DD is the actual scheduler execution date resolved in Asia/Ho_Chi_Minh)

The daily record must preserve:
- run date
- RS-10 output
- RS-11 output
- RS-12 converged candidates
- evidence/source references
- evidence status
- main uncertainty
- candidate class
- quality gate result and reason
- KEEP / WATCH / DROP disposition
- batch status: UNBATCHED or BATCHED

Daily staging is operational state for the scheduler. It is not an approved Knowledge Sheet record.

## Three-Day Batch

When three new UNBATCHED daily runs are available, execute RS-13 Claw 3-Day Idea Batch.

Output:
`batches/YYYY-MM-DD_to_YYYY-MM-DD.csv`

After successful batch creation, mark only those three source daily records as BATCHED. Batch admission must preserve the Quality Gate result; failed/blocked candidates must not be promoted merely to fill the batch. Do not delete them because they are required for evidence traceability.

If fewer than three new daily runs are available, do not create a batch.

## Learning Loop

Human review of each three-day batch is an experimental feedback signal for Claw quality. Record recurring failure patterns and test proposed rules/workflow changes on the next batch before promoting them to baseline.

Batch #2 learning is experimentally applied in Batches #3 and #4: apply Strategic Scope / Tier 1 alignment before deeper evaluation; trace technology → physical capability → product architecture → measurable outcome; reject out-of-scope candidates; search for unresolved DELTA rather than only baseline collision; preserve evidenced cross-industry transfer candidates when strategically relevant; use canonical single Candidate_Class values.

Current Tier 1 discovery bias: Showering Innovation & Technology, especially Wellness / Circularity and relevant premium differentiation; Bathroom Fittings Design / CMF differentiation. These are discovery priors, not mandatory coverage targets.

For Batch #2, explicitly test the Batch #1 learning classes:
- technology-first ideas with weak product outcome;
- known/commercial/patent baseline leakage;
- duplicate or saturated variants;
- technical enablers presented as standalone ideas;
- weak/non-testable user value;
- insufficient transferability;
- complexity without clear benefit justification;
- installation/maintenance/CI-only ideas without a clear product/user outcome.

## Human Review

Three-day CSV outputs are discovery material, not approved ideas.

After human review, use:
- 2. Idea Review/Prompt.csv for evidence-based idea review.
- 1. Personal Research/Prompt.csv RS-03 to RS-09 for targeted external research.
- 3. Knowledge Sheet only after human verification and the existing Knowledge Sheet promotion process.

## Evidence Rules

- Product existence does not prove hidden mechanism.
- Technology existence does not prove transferability.
- Supplier availability does not equal innovation.
- Missing evidence is UNKNOWN, not negative evidence.
- Patent absence does not prove novelty.
- Human review is the final admission authority.

## Operating Rule

Optimize for distinct, evidence-grounded opportunity seeds rather than idea volume. Zero qualified ideas is a valid result.

## Execution Date Integrity

The scheduler execution date is the source of truth for daily staging. RUN_DATE MUST be resolved from the actual execution timestamp in Asia/Ho_Chi_Minh (UTC+07:00). Never infer it from the previous staging file, conversation context, UTC date, or an existing filename. Never overwrite a prior day's staging record when the resolved date differs. If the execution timestamp cannot be resolved reliably, do not write a daily staging record; report the date as UNKNOWN.
## Capability Contract — CLAW_DISCOVERY

### Purpose
Generate evidence-grounded R&D opportunity/idea candidates from research evidence.

### Trigger
Daily external scheduler or explicit manual execution. A 3-day batch is formed only when the required unbatched daily runs are available.

### Input / Context
Research evidence; relevant Knowledge Sheet context; prior learning; current RS prompt set and Claw Discovery scope.

### Preconditions
Current research scope is known; relevant Knowledge Sheet context is checked; evidence is available for the proposed opportunity.

### Process
Research Evidence → Problem / Opportunity → Existing Solution → Gap → Proposed Response → Technology Mechanism → Evidence → Candidate Idea → Staging

### Tools / AI
Use the released Claw/RS prompts, available web/search research tools, GitHub for current rules, and the Knowledge Sheet as the structured baseline.

### Output
A candidate R&D idea with problem/opportunity, existing solution, gap, proposed response, technology mechanism, evidence/source traceability, and explicit candidate status.

### Validation
Evidence must be traceable. Existing solution and mechanism claims must not be invented. A candidate in staging is not validated knowledge and is not an authoritative Knowledge Sheet record.

### Evidence State
Distinguish VERIFIED / EVIDENCED, INFERRED, WORKING ASSUMPTION, UNKNOWN, and PROPOSED according to the existing R&D prompt conventions.

### Escalation
Route material evidence gaps to PERSONAL_RESEARCH and material idea-evaluation questions to IDEA_REVIEW/EVALUATE.

### Human Verification Gate
Human review is required before candidate knowledge or authoritative relationships are promoted.

### Promotion / Persistence
Persist daily execution output in the existing staging/YYYY-MM-DD.md path. Promotion to authoritative knowledge is handled only through KNOWLEDGE_PROMOTION.

### Failure Handling
If evidence is insufficient, preserve the candidate with an explicit gap or reject it from promotion. Do not manufacture evidence to complete the output schema.

## Capability Contract — CLAW_DISCOVERY

Purpose: generate evidence-grounded R&D idea candidates.

Trigger: daily scheduled run or explicit manual execution.

Input / Context: research evidence, Knowledge Sheet context, prior learning, RS prompts, and Claw scope.

Preconditions: scope and relevant Knowledge Sheet context are available.

Process: Research Evidence → Problem / Opportunity → Existing Solution → Gap → Proposed Response → Technology Mechanism → Evidence → Candidate Idea → Staging.

Tools / AI: released Claw/RS prompts, research tools, GitHub, and Knowledge Sheet.

Output: candidate idea with problem, solution, gap, response, mechanism, evidence, and status.

Validation: trace evidence; do not invent solution or mechanism claims; staging is not authoritative knowledge.

Evidence State: VERIFIED / EVIDENCED, INFERRED, WORKING ASSUMPTION, UNKNOWN, PROPOSED.

Escalation: evidence gaps → PERSONAL_RESEARCH; evaluation questions → IDEA_REVIEW or EVALUATE.

Human Verification Gate: required before promotion to authoritative knowledge.

Promotion / Persistence: keep execution output in the existing staging path; promotion uses KNOWLEDGE_PROMOTION.

Failure Handling: record insufficient evidence explicitly; never manufacture evidence.
