# DEEP_RESEARCH Contract-Level Regression — 2026-09-28

## Run
- Run ID: DR-CONTRACT-2026-09-28
- Capability: DEEP_RESEARCH
- Contract: Phase 2, merged in PR #28; merge commit `8ac45447f14ca005013c2fdb42078367fd328e28`
- Evaluator: ChatGPT, controlled fixture review
- Baseline compared with: `1. CAPABILITIES/README.md`, DEEP_RESEARCH contract, RND-REG-016–021
- Input/output source: six explicit synthetic test fixtures below; no external research execution or production workstream output was supplied.

## Test method and limitation
This is a controlled contract-level functional regression: each case supplies a bounded scenario and checks whether the contract specifies a behavior that can be applied without inventing evidence. It validates instruction coverage and routing logic, not model performance on real research sources. Real-output regression remains NOT OBSERVED and is not represented as PASS.

## Regression results

| Case ID | Result | Fixture and observation |
|---|---|---|
| RND-REG-016 | PASS | Fixture: request asks whether a cross-industry shower technology can transfer to a target product but gives no target pressure/chemical conditions. Contract requires decision context, target boundary, conditions, and stop criteria; it directs clarification only for materially decision-changing context, otherwise explicit assumptions. Open boundary is preserved. |
| RND-REG-017 | PASS | Fixture: supplier brochure asserts a function; no test data is available. Contract distinguishes source assertion from direct evidence, requires source-to-claim fit, and separates inference/assumption/unknown. It does not permit the brochure assertion to become demonstrated performance. |
| RND-REG-018 | PASS | Fixture: product exists and advertises a function, with no internal drawing or performance test. Contract explicitly separates existence, advertised function, mechanism, performance, compatibility, qualification/compliance, feasibility, and novelty/IP. Unsupported dimensions remain UNKNOWN/INFERRED as applicable. |
| RND-REG-019 | PASS | Fixture: supplier datasheet and independent report show different results under different conditions. Contract requires comparison of scope, definitions, methods, dates, population, and authority; incompatible evidence is preserved as CONFLICTING rather than averaged. |
| RND-REG-020 | PASS | Fixture: desk research finds a claimed pressure-performance benefit but no target-condition test. Contract states desk research cannot establish lab performance and routes the exact unresolved claim to physical test/specialist review. |
| RND-REG-021 | PASS | Fixture: one narrow factual claim remains after a broad research request. Contract routes a narrow claim to VERIFICATION; completed evidence with a decision remaining to EVALUATION; answered scope returns to the invoking Workstream with explicit no-handoff. |

## Summary
- Controlled contract-level cases: 6/6 PASS.
- Mechanical repository validation on PR head `78b3c1040a986db192bcafa16aa867f8428dd1cc`: PASS (workflow run `36389918088`).
- Post-merge validation: NOT OBSERVED at time of record; no workflow run was returned for merge commit.
- Real-output regression using an actual DEEP_RESEARCH execution and inspectable external sources: NOT OBSERVED.
- No claim is made that the capability has demonstrated improved real-world research quality.

## Decision / follow-up
Contract-level regression is accepted as passing for the six controlled fixtures. Keep real-output validation open and evaluate the next actual DEEP_RESEARCH execution against RND-REG-016–021 before claiming operational effectiveness or promoting further behavior changes.
