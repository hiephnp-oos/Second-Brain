# Career Flow Refactor — Implementation Plan

## Objective
Refactor Career into one simple lifecycle without a new database, runtime, or rule layer:
SEARCH → DEDUPLICATE / VERIFY → WEEKLY OUTPUT → MERGE INTO CAREER_SUMMARY → USER REVIEW → DECISION + REASON → REUSE

## Problems Being Fixed
- Weekly search, historical state and user review are not one lifecycle.
- CAREER_SUMMARY.md is referenced but absent.
- Rules and schemas are repeated across Profile, Contract, capability READMEs/PROMPTs and Implementation Plan.
- Weekly tables do not directly optimize the user decision.
- Historical decisions are not in one compact master decision memory.
- Company Radar is a signal workflow; Job Search and Remote / AI are opportunity workflows.
- Durable rules, decisions, exclusions and transient results are mixed.
- External scheduler can drift if it owns duplicated business rules.

## Target Ownership
| Layer | Owns | Does not own |
|---|---|---|
| CAREER_PROFILE.md | Stable user baseline, priorities, constraints, durable exclusions | Search procedure/schema |
| CAREER_EXECUTION_CONTRACT.md | Shared lifecycle, invariants, validation, escalation | Role-specific rules |
| Capability README | Capability scope, business rules, output contract | Full execution prompt |
| Capability PROMPT | Execution procedure | Repository-wide rules |
| 2. REPORTS/README.md | Weekly/Summary persistence contract | Matching logic |
| CAREER_SUMMARY.md | Historical records, user decisions, reasons, exclusions fast-read, lessons | Search procedure/profile |
| IMPLEMENTATION_PLAN.md | Architecture, migration, acceptance, status | Production business rules |
| SYSTEM CORE | Repository-wide mechanics | Career rules |
| External scheduler | Trigger | Career business logic |

### Single Owner Rule
Every operational or business rule has one canonical owner. Other documents reference it rather than redefining it. Any fast-read derived view is explicitly non-authoritative.

## Summary Model
2. REPORTS/CAREER_SUMMARY.md is mandatory historical decision memory. It contains three master tables, Explicit Exclusions, and Reusable Lessons. It is not an archive; Git history remains the archive.

AI owns discovery, evidence, matching, Suggest Action, deduplication and proposed lessons. User owns Decision, Reason, and authoritative baseline changes.

Existing user decisions must survive automated merges unless the user explicitly changes them. Previously reviewed opportunities are not resurfaced unless material evidence or status changes.

## Output Contracts
### Job Search
Job Title | Date Found | Week Found | Company | Location | Job URL | Salary | Matching Score | Status | Key Missing Skills | Suggest Action | Decision | Reason

### Company Radar
Company | Industry / Tier | Signal / Date | Evidence | Hiring Outlook | Decision Maker | Last Verified | Next Action | Decision | Reason

### Remote / AI
Job / Project Title | Date Found | Week Found | Work Type | Company / Platform | Remote Scope | Job URL | Compensation | Matching Score | Status | Key Missing Skills | Suggest Action | Decision | Reason

Rows must be decision-ready. Company Radar must never imply a vacancy without evidence.

## Weekly Lifecycle
1. Load Profile.
2. Load Summary before discovery.
3. Load recent weekly evidence only when needed.
4. Execute capability.
5. Deduplicate and verify.
6. Produce current-cycle output.
7. Merge new/materially changed records into Summary while preserving user decisions.
8. Write one ISO weekly report for the current cycle.
9. User reviews Summary and fills/updates Action / Reason.
10. Future searches reuse those decisions.
11. Promote repeated cross-stream patterns to Profile only after human approval.

Weekly persistence remains mandatory even if a capability fails; use NOT_RUN / fallback state rather than disappearing.

## Implementation Phases
### Phase 1 — Source-of-truth model
- Establish Single Owner Rule.
- Define Summary vs weekly semantics.
- Make Implementation Plan roadmap/acceptance only.

### Phase 2 — Summary
- Create 2. REPORTS/CAREER_SUMMARY.md.
- Seed relevant W39–W41 opportunities/signals.
- Use PENDING_REVIEW where no explicit user decision exists.
- Add compact Explicit Exclusions and Reusable Lessons.
- Never fabricate decisions.

### Phase 3 — Capability Contracts
- Job Search: 13-column decision-ready table.
- Company Radar: 10-column signal/decision table.
- Remote / AI: 14-column decision-ready table.
- Remove obsolete schema references.

### Phase 4 — Execution Contract
- Summary is mandatory historical input.
- Merge-to-Summary is part of normal execution.
- Preserve Action/Reason.
- Keep weekly persistence/failure handling.
- Remove Implementation Plan as an execution dependency.

### Phase 5 — Topic/Report Documentation
- Update routing and ownership.
- Define weekly reports as current-cycle evidence.
- Define Summary as durable decision memory.
- Keep exclusions/lessons compact.

### Phase 6 — Historical Compatibility
- Do not rewrite W39–W41 solely for schema cosmetics.
- New/current weekly reports use the new schema.

### Phase 7 — Validation
- Canonical Summary exists.
- References resolve.
- No obsolete schemas remain in active capability contracts.
- Summary and weekly contracts do not conflict.
- Implementation Plan has no hidden production rule.
- Exclusions are consistent with Profile.
- Repository validator passes.

### Phase 8 — Scheduler Sync After Merge
- Update external Career scheduler to point to the merged contract.
- Remove duplicated Career business rules from scheduler prompt.
- Preserve existing cadence.
- Verify weekly persistence and Summary merge.
- Do not create another schedule.

## Acceptance Criteria
- Search → Deduplicate → Merge → User Review → Reuse is one coherent lifecycle.
- Summary is mandatory historical input.
- Weekly output is current-cycle evidence.
- Summary contains three master tables plus Explicit Exclusions and Reusable Lessons.
- Job Search and Remote/AI rows are directly actionable.
- Company Radar separates signal from vacancy.
- User Action/Reason are preserved.
- Every production rule has one canonical owner.
- Implementation Plan is roadmap/acceptance only.
- No new database/runtime/memory layer is introduced.
- Repository validation passes.
- Scheduler is synchronized only after repository merge.

## Stop Rule
Stop when the acceptance criteria are met and the next real Career run demonstrates the lifecycle end-to-end. Do not add infrastructure unless real usage proves the Markdown model insufficient.