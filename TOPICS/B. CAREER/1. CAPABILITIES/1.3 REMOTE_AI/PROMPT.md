# Remote / AI Capability

## Purpose

Discover and evaluate remote full-time and remote side-work opportunities using a matching model distinct from traditional ATS/job-title matching.

## Input / Context

- Career Profile
- Current remote/AI market evidence
- User availability baseline when applicable
- Prior cycle state when available
- Current user instruction

## Search Tool Routing

- Use Exa for semantic/adjacent discovery across AI evaluation, technical SME, documentation, engineering, quality, and project-support opportunities.
- Use Parallel Search for broad discovery across job boards, freelance platforms, and employer listings.
- Use ChatGPT Native Search for independent discovery and fallback.
- Use Tavily only for targeted gaps in eligibility, engagement, compensation, schedule, or source conflicts.
- Use Firecrawl selectively to extract a known relevant listing/platform page when material terms are not visible in search results.
- Deduplicate across sources and verify eligibility/terms on the original platform or employer source.
- Apply the shared routing and tool-state rules in `CAREER_EXECUTION_CONTRACT.md`.

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

## Matching Model

Calculate Matching (%) using this weighted screening model:

- Domain / engineering / quality fit: 25%
- Deliverable / task fit: 20%
- AI leverage or AI-enabled value: 15%
- Evidence / delivery credibility: 15%
- Remote feasibility: 10%
- Compensation / commercial fit: 10%
- Schedule compatibility: 5%

The score is a screening aid, not an automatic decision. Apply hard blockers separately; mark a component unknown when evidence is missing and do not silently redistribute its weight. Explain material uncertainty in Gaps / Risks.

## Output Contract

Use:

`Priority | Matching (%) | Job / Project Title | Work Type | Platform / Company | Location / Remote Scope | Engagement | Budget / Salary | Posted | Status | CV / Capability Fit | Gaps / Risks | Schedule Fit | Recommended Action | Direct Link | Verified`

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
- every row follows the exact 16-column output contract shared with the README and weekly report;
- verification state is explicit.

If validation fails, correct the output or return the appropriate fallback state instead of reporting success.
