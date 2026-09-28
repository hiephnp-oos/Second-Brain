# R&D Innovation — Future Improvement Reference Architecture

## Status

- Lifecycle: REFERENCE / DEFERRED
- Current implementation: NONE
- Activation: evidence-driven only
- Role: future improvement reference after the current R&D improvement sequence has been exercised
- Independence: independent reference; does not override `01_RND_IMPLEMENTATION_PLAN.md` or `02_SoL-Pi Reference Architecture.md`

This document preserves reusable improvement patterns discovered from external systems and research methodologies.

It is **not an active execution instruction**.

The existence of this document must not change the current R&D Innovation improvement process.

---

## 1. Current improvement sequence

The current process remains unchanged.

The intended sequence is:

```text
Review Batch #2
    ↓
RND_IMPLEMENTATION_PLAN.md
    ↓
Implement / test the validated improvement
    ↓
Review Batch #3
    ↓
SoL-Pi Reference Architecture.md
    ↓
Observe subsequent real usage
    ↓
Future Improvement Reference Architecture.md
    ↓
Evaluate only if a demonstrated remaining problem maps to a reference pattern
```

The sequence is deliberately incremental.

Do not apply multiple architectural improvements at the same time merely because several potentially useful frameworks have been identified.

This preserves causal attribution:

```text
Observed failure
→ One improvement direction
→ Test
→ Batch comparison
→ Human verification
→ Promote / reject
```

The future-improvement references remain dormant until the current implementation has produced enough real evidence to justify another change.

---

## 2. Purpose

This document answers:

> If R&D Innovation has already exercised the current implementation plan and the SoL-Pi reference path, what other proven or promising patterns should be considered before inventing a new architecture?

The main reference patterns currently retained are:

1. Research Pass — research-quality and uncertainty-reduction discipline.
2. Autoresearch — experiment, regression, and iterative-improvement discipline.

These references operate at different layers.

```text
Research Pass
    ↓
Research quality / epistemic discipline

Autoresearch
    ↓
Improvement / experiment discipline

SoL-Pi
    ↓
Runtime / harness efficiency

RND_IMPLEMENTATION_PLAN
    ↓
R&D capability execution architecture
```

They should not be merged into one framework.

---

# 3. Reference A — Research Pass

## 3.1 Source

Primary reference:

- Repository: https://github.com/MagicalDealer/research-pass
- Canonical methodology: `RESEARCH_PASS.md`
- Benchmark: `benchmark/ALPHA_BENCHMARK.md`
- Testing protocol: `TESTING_PROTOCOL.md`
- Experimental hypotheses: `EXPERIMENTAL_HYPOTHESES.md`

Before future adoption, re-read the current upstream repository. This document is not a frozen copy of Research Pass.

## 3.2 Core contribution

Research Pass is a research methodology intended to reduce meaningful uncertainty rather than maximize information volume.

Its central principle is:

> Optimize for coverage of the explanation space, not coverage of the internet.

Important behaviors include:

- choosing research depth appropriate to the question;
- translating a surface question into the underlying problem;
- freezing the starting belief for substantial investigations;
- generating rival hypotheses;
- expanding expert vocabulary;
- searching by research function;
- tracing source lineage;
- evaluating evidence at claim level;
- searching counter-evidence and failures;
- investigating contradictions;
- triangulating independent evidence;
- applying context before turning evidence into a decision;
- stopping at saturation + decision sufficiency;
- preserving uncertainty during synthesis.

## 3.3 Potential R&D value

The strongest potential fit is Personal Research and Idea Review.

Potentially useful areas include:

- mechanism research;
- technology existence verification;
- competitor technology research;
- supplier technology research;
- patent/prior-art investigation;
- transferability analysis;
- failure analysis;
- current-state technology checks;
- deep analysis of promising ideas.

Research Pass can strengthen the quality of the research process without changing the R&D business workflow.

## 3.4 Candidate patterns

### A. Research depth routing

Use the smallest sufficient research depth:

```text
Quick Check
    ↓
Targeted Pass
    ↓
Full Research Pass
```

R&D interpretation:

- Quick Check — one factual verification or simple status check.
- Targeted Pass — one decision-relevant uncertainty.
- Full Pass — multiple plausible mechanisms, significant uncertainty, high decision impact, or repeated strategic use.

Do not convert every R&D question into Full Research.

### B. Rival hypotheses

For difficult questions, preserve multiple explanations:

```text
Observation
   ↓
H1 / H2 / H3
   ↓
Evidence for / against
   ↓
Discriminating evidence
   ↓
Surviving explanation(s)
```

This is particularly relevant to mechanism and failure research.

### C. Search by function

Separate research activities where useful:

- Background
- Mechanism
- Empirical evidence
- Primary source
- Current state
- Counter-evidence
- Failure
- Historical
- Analogue
- User/product-specific evidence

The purpose is to prevent one undifferentiated search from becoming the entire research method.

### D. Source lineage

Important claims should be traced toward the original or strongest available evidence where practical.

Repeated derivative sources must not be treated as independent confirmation.

### E. Failure search

Search explicitly for:

- failed implementations;
- negative results;
- abandoned technologies;
- postmortems;
- edge cases;
- unintended consequences.

### F. Saturation + decision sufficiency

Stop when:

- major plausible explanations have been investigated;
- important evidence lanes have been sampled;
- consequential counter-evidence has been sought;
- important claims have been verified;
- additional searches mostly reproduce known mechanisms;
- remaining uncertainty is understood;
- another unresolved branch is unlikely to materially change the decision.

## 3.5 What not to import

Do not automatically import:

- the full Research Pass mega-prompt;
- all 39 sections of the methodology;
- multi-agent Research Pass;
- cross-vendor agent orchestration;
- a separate research runtime;
- a separate research database;
- a new scoring system.

The reusable asset is the **research doctrine**, not the complete implementation.

## 3.6 Activation condition

Consider adopting a Research Pass pattern only if real R&D usage demonstrates recurring problems such as:

- research is repeatedly too shallow;
- important rival explanations are missed;
- searches remain trapped in initial terminology;
- source repetition is mistaken for independent evidence;
- failure/counter-evidence is systematically under-searched;
- research repeatedly stops before decision sufficiency;
- researchers over-research simple questions;
- important research conclusions lack sufficient traceability.

A single weak research result is not enough to justify a framework change.

---

# 4. Reference B — Autoresearch

## 4.1 Source

Primary reference:

- Repository: https://github.com/uditgoenka/autoresearch
- Current skill architecture: `.claude/skills/autoresearch/SKILL.md`
- System architecture: `docs/system-architecture.md`
- Project overview / PDR: `docs/project-overview-pdr.md`

Before future adoption, re-read the current upstream repository. This document records reusable principles, not the upstream runtime.

## 4.2 Core contribution

Autoresearch provides an iterative improvement discipline based on:

```text
Baseline
→ One focused change
→ Verify
→ Keep / Reject / Rework
→ Log
→ Repeat
```

Important principles include:

- baseline before change;
- one focused change per iteration;
- mechanical verification where possible;
- regression comparison;
- explicit keep/discard decisions;
- bounded iteration;
- plateau detection;
- independent verification for high-impact changes;
- preserving experiment history.

## 4.3 Potential R&D value

The strongest fit is Project Improvement and regression testing.

It should reinforce, not replace:

```text
Observe
→ Identify Gap
→ Propose Change
→ Test
→ Human Verify
→ Promote
```

The R&D version should remain human-controlled.

## 4.4 Candidate patterns

### A. Baseline before change

Record the current behavior/output before introducing a learning change.

### B. One meaningful change

Prefer one material improvement per experiment where practical.

If several rules are changed simultaneously, causal attribution becomes weak.

### C. Mechanical verification

Where a property can be checked mechanically, prefer an explicit check over subjective judgment.

Examples:

- schema validation;
- required-field validation;
- duplicate detection;
- evidence-state validation;
- output-format validation;
- regression examples;
- count/rate comparisons.

Mechanical checks do not replace human review of research quality.

### D. Regression gate

Compare candidate behavior against the baseline.

For R&D this may include:

- unsupported-claim rate;
- false novelty;
- duplicate/baseline leakage;
- technical-enabler-as-product;
- weak user outcome;
- insufficient transferability;
- evidence quality;
- reviewer correction rate.

Do not optimize one metric in isolation.

### E. Keep / Reject / Rework

An improvement experiment should be allowed to:

- KEEP;
- REWORK;
- REJECT;
- remain INCONCLUSIVE.

A change does not become baseline simply because it was implemented.

### F. Bounded improvement

Improvement loops must have a stop condition.

Examples:

- evidence is sufficient;
- regression passes;
- failure is resolved;
- remaining improvement is not material;
- plateau is reached;
- complexity exceeds benefit.

## 4.5 What not to import

Do not automatically import:

- autonomous orchestrator runtime;
- shell-command safety framework;
- Claude hooks;
- Git-as-runtime-memory;
- autonomous deployment/shipping pipeline;
- `orchestrator-state.json`;
- cross-platform plugin distribution;
- autonomous infinite loops.

These solve software-agent runtime problems that are not currently demonstrated R&D bottlenecks.

---

# 5. Relationship to existing R&D architecture

The references must remain subordinate to the current R&D architecture.

```text
R&D Business Logic
        ↓
Capability / Prompt Contract
        ↓
Research / Improvement Method
        ↓
Optional Harness Pattern
        ↓
Tool Execution
        ↓
Evidence
        ↓
Human Verification
        ↓
Promotion
```

Research Pass may improve the research method.

Autoresearch may improve the improvement method.

SoL-Pi may improve the execution harness.

None of them may redefine:

- what an R&D idea is;
- Discovery Quality Gate rules;
- evidence-state semantics;
- Knowledge Sheet authority;
- Idea Review authority;
- human promotion authority;
- the current business workflow.

---

# 6. Future improvement decision gate

Before activating any pattern from this document, answer:

### 1. What observed problem remains?

Describe it using real R&D outputs.

### 2. Is it a business-logic problem, research-quality problem, improvement-process problem, or harness problem?

Route accordingly.

```text
Business / capability problem
→ RND_IMPLEMENTATION_PLAN

Research-quality problem
→ Research Pass reference

Improvement / regression problem
→ Autoresearch reference

Runtime / context / harness problem
→ SoL-Pi reference
```

### 3. Is the problem recurring?

One isolated failure is normally insufficient.

### 4. Is the problem material?

The problem should affect:

- decision quality;
- evidence quality;
- output reliability;
- traceability;
- repeatability;
- maintenance;
- execution efficiency.

### 5. Does the reference directly address the observed failure?

Do not adopt a pattern because it is technically interesting.

### 6. Is there a simpler solution?

Always test the smallest local fix first.

### 7. Can the improvement be tested?

Define a before/after comparison or representative regression cases.

### 8. Can the improvement be rolled back?

Do not introduce an irreversible architectural change as the first experiment.

---

# 7. Standard future-improvement loop

When this document is activated, use:

```text
OBSERVE
  ↓
Identify recurring material failure
  ↓
CLASSIFY
  ↓
Map to Research Pass / Autoresearch / SoL-Pi / local fix
  ↓
Define smallest change
  ↓
Define regression / verification
  ↓
TEST
  ↓
Compare against baseline
  ↓
HUMAN VERIFY
  ↓
KEEP / REWORK / REJECT
  ↓
PROMOTE only if justified
```

Never skip directly from:

```text
Interesting reference
→ Architecture change
```

---

# 8. Experiment record

For any future architecture-level improvement, preserve at least:

- Improvement ID
- Observed problem
- Evidence / examples
- Root-cause hypothesis
- Reference pattern
- Why the pattern is relevant
- Alternative simpler solutions considered
- Proposed change
- Scope
- Expected improvement
- Regression criteria
- Result
- Remaining uncertainty
- Human verification status
- Decision: KEEP / REWORK / REJECT / INCONCLUSIVE
- Baseline change, if any

Do not create a separate database for this unless real usage demonstrates that existing GitHub/Markdown history is insufficient.

---

# 9. Research Pass adoption checklist

Before adopting a Research Pass-derived rule:

- [ ] The failure is recurring.
- [ ] The failure is material.
- [ ] Existing R&D research rules are insufficient.
- [ ] The missing behavior is clearly identified.
- [ ] The Research Pass pattern directly addresses it.
- [ ] A smaller local change was considered.
- [ ] Representative research cases are available.
- [ ] Before/after quality can be compared.
- [ ] Human verification is defined.
- [ ] No unnecessary new runtime/framework is introduced.

---

# 10. Autoresearch adoption checklist

Before adopting an Autoresearch-derived improvement pattern:

- [ ] A recurring improvement/regression problem exists.
- [ ] A baseline can be defined.
- [ ] A focused change can be isolated.
- [ ] Verification can be performed.
- [ ] Representative regression cases exist.
- [ ] Keep/reject criteria are explicit.
- [ ] The experiment is bounded.
- [ ] Human verification remains authoritative.
- [ ] No autonomous runtime is required merely to use the principle.
- [ ] Complexity remains justified by observed benefit.

---

# 11. Architecture non-goals

This document must not become:

- a generic agent framework;
- a generic Skill Engine;
- a second R&D workflow;
- a second scheduler;
- a second knowledge database;
- a prompt-version database;
- an autonomous baseline updater;
- a multi-agent platform;
- a runtime abstraction layer;
- a replacement for Prompt.csv;
- a replacement for GitHub as source of truth.

If one of these becomes necessary, create a separate evidence-backed Project Improvement proposal rather than silently expanding this reference.

---

# 12. Relationship between the three reference documents

The intended hierarchy is:

```text
RND_IMPLEMENTATION_PLAN.md
    │
    │ current implementation path
    ↓
SoL-Pi Reference Architecture.md
    │
    │ future harness-level fallback
    ↓
Future Improvement Reference Architecture.md
    │
    ├── Research Pass
    │     └── research-quality fallback
    │
    └── Autoresearch
          └── improvement/regression fallback
```

This is a **reference hierarchy**, not an automatic execution chain.

The system must not execute all three sequentially.

The current process remains:

```text
Batch Review
→ current improvement plan
→ next real batch
→ observe
→ next justified reference
```

---

# 13. Promotion rule

A reference-derived pattern may become part of the R&D baseline only after:

1. a real problem is observed;
2. the problem is shown to be material;
3. the reference pattern is mapped to that problem;
4. a minimal adaptation is designed;
5. representative cases are tested;
6. regression is acceptable;
7. complexity is justified;
8. human verification is completed;
9. the change is explicitly promoted.

The reference document itself never changes the baseline.

---

# 14. Stop conditions

Stop future-improvement investigation when:

- the observed problem is solved;
- a simpler local solution is sufficient;
- evidence does not show meaningful improvement;
- the reference pattern does not fit the actual failure;
- the adaptation adds more complexity than value;
- remaining uncertainty is not material;
- the current R&D architecture is already sufficient.

The objective is not to maximize architectural sophistication.

The objective is to improve R&D Innovation only where real evidence justifies the change.

---

# 15. Source register

### Research Pass

Primary:
- https://github.com/MagicalDealer/research-pass

Important upstream references:
- `RESEARCH_PASS.md`
- `TESTING_PROTOCOL.md`
- `TESTER_GUIDE.md`
- `benchmark/ALPHA_BENCHMARK.md`
- `EXPERIMENTAL_HYPOTHESES.md`

### Autoresearch

Primary:
- https://github.com/uditgoenka/autoresearch

Important upstream references:
- `.claude/skills/autoresearch/SKILL.md`
- `docs/system-architecture.md`
- `docs/project-overview-pdr.md`
- `AGENTS.md`

### R&D Innovation internal references

- `TOPICS/6. RnD INNOVATION/1. Personal Research/2. Project Improvement/01_RND_IMPLEMENTATION_PLAN.md`
- `TOPICS/6. RnD INNOVATION/1. Personal Research/2. Project Improvement/02_SoL-Pi Reference Architecture.md`
- `TOPICS/6. RnD INNOVATION/1. Personal Research/2. Project Improvement/README.md`

---

# 16. Final rule

> Do not improve the R&D architecture because a better architecture exists.

> Improve it only when real R&D usage demonstrates a material problem that the current architecture does not solve adequately.

> Then adopt the smallest validated pattern that solves that problem, verify it against representative outputs, and promote it only after human verification.
