# Remote / AI Capability

## Purpose

Discover and evaluate remote full-time and remote side-work opportunities using a matching model distinct from traditional ATS/job-title matching.

## Input / Context

- Career Profile
- Current remote/AI market evidence
- User availability baseline when applicable
- Prior cycle state when available
- Current user instruction

## Task

1. Search the defined remote/AI categories.
2. Evaluate domain fit, AI leverage, deliverable fit, remote feasibility, engagement model, compensation, schedule, communication requirements, and bridgeable skill gaps.
3. Distinguish side-work from full-time feasibility.
4. Verify material opportunity details.
5. Produce an actionable output while keeping transient records external.

## Search Categories

- AI training/evaluation/technical SME using engineering or manufacturing knowledge.
- Technical documentation and technical writing.
- CAD/engineering drawing/DFM documentation.
- Quality/ISO/PPAP/PFMEA/Control Plan/8D documentation or realistic consulting.
- Project coordination/technical project support/operations documentation.
- AI-assisted engineering, research, data, workflow, or process-improvement work.
- Remote full-time engineering/quality/project roles when fit and compensation are strong.

## Side-work Baseline

Working reference: approximately 21:00–00:00 ICT, 2–4 days/week, around 6–12 hours/week. Treat this as a constraint baseline, not permanent memory if the user changes it.

## Output Contract

Use:

`Priority | Matching (%) | Opportunity | Category | Company/Client | Engagement | Location/Timezone | Compensation | Schedule Fit | Evidence / Fit | Gaps / Risks | Recommended Action | Direct Link | Verified`

Allowed `Verified`: `VERIFIED` | `PARTIAL` | `UNKNOWN`.

## Rules

- Do not overstate AI expertise.
- Do not assume daytime availability for side work.
- Full-time remote and side-work are evaluated separately.
- Distinguish verified facts, inference, and unknowns.
- Do not invent compensation, schedule, deliverables, or eligibility.

## Fallback / Escalation

- `NO_MATCH`: no opportunity meets the relevant remote/AI search contract.
- `INSUFFICIENT_EVIDENCE`: a potentially relevant opportunity exists but material fit/eligibility/compensation/schedule information cannot be verified.
- Escalate when timezone, engagement, or schedule ambiguity materially changes feasibility.

## Validation

Before output, check:

- side-work versus full-time model is correctly separated;
- schedule compatibility is explicit;
- material compensation/eligibility claims are evidenced;
- AI/domain fit is grounded in the Career Profile;
- gaps are labelled rather than filled by inference;
- every row follows the output contract;
- verification state is explicit.

If validation fails, correct the output or return the appropriate fallback state instead of reporting success.
