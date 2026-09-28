# Phase 3 P3-A03 — Reuse and Frequency Assessment

**Status:** Evidence review complete; decision deferred to P3-A04  
**Plan action:** P3-A03 — Check reuse across workstreams and expected frequency  
**Baseline reviewed:** `main` at merge `e690565c4ac483fe63d3cfd8997c9e926bfab9a7`  
**Scope:** Existing repository evidence only. This is not a forecast of future demand.

## 1. Question
Does the need to convert unresolved physical uncertainty into a controlled experiment/test plan recur across workstreams often enough, and with sufficiently distinct ownership, to justify a standalone EXPERIMENT_DESIGN capability (CAP-06)?

## 2. Evidence reviewed

| Source | Observed evidence | What it establishes | Limitation |
|---|---|---|---|
| P3-A01 case register | Four physical-uncertainty cases, all derived from the 2026-09-26 to 2026-09-28 Claw batch | Several candidate questions may ultimately require empirical validation | One batch, one workstream; cases are not executed test plans |
| Personal Research `Prompt.csv` (RS-11 / Claw prompts) | Captures physical principle, mechanism, boundary conditions, demonstrated capability, transfer risks and measurable outcome; asks for unknowns/verification needs | Discovery routinely surfaces physical uncertainty as a research signal | No reusable test-design procedure or count of actual test-plan requests |
| Idea Review `Prompt.csv` (IR-03) | Mechanism check asks what should be experimentally or technically verified; distinguishes plausibility from proven feasibility | Idea Review can identify and record a verification need | Does not define experimental design; “technically verified” is broader than physical testing |
| Idea Review README | Routes evidence gaps to Personal Research and reusable work to capabilities | Existing routing recognizes evidence/research gaps | No documented handoff for a structured experiment plan |
| DEEP_RESEARCH contract | Separates desk research from physical validation; routes physical testing to human/specialist with question, evidence and limitation | Existing capability can identify the need and prepare a bounded handoff | Does not own protocol design |
| EVALUATION contract | Connects criteria, evidence and unresolved risk to decision; routes lab/specialist needs to human/specialist | Existing capability can explain decision relevance of test evidence | Does not own protocol design |
| Knowledge lifecycle README | Workstream outputs are not automatically promoted; Released is human-verified | Test plans/results do not become authoritative Knowledge automatically | No evidence of recurring experiment records in Knowledge lifecycle |

## 3. Cross-workstream reuse assessment

| Workstream | Evidence of physical uncertainty / verification need | Evidence of reusable experiment-plan demand | Assessment |
|---|---|---|---|
| Personal Research / Claw Discovery | Present in prompt requirements and four P3-A01 cases | No actual test-plan artifact or repeated request observed | Need signal observed; frequency not established |
| Idea Review | IR-03 explicitly records experimental/technical verification needs | No actual experiment-plan output or repeated case series observed | Potential consumer; reuse not established |
| Project Improvement | P3-A01/A02/A03 are architecture assessments | These are system-improvement analyses, not product experiment-design executions | Not evidence of operational demand |
| Knowledge | Lifecycle separates candidate from released knowledge | No experiment plan/result records identified in reviewed lifecycle entry point | Not observed |

The four cases must not be counted as four independent workstream instances: they come from one Claw batch and one workstream. The prompts show cross-workstream potential (Personal Research and Idea Review), but not demonstrated repeated use of a shared test-design method.

## 4. Frequency and ownership

- **Observed minimum:** one batch containing four uncertainty cases.
- **Independent workstreams with explicit verification-need language:** at least two (Personal Research and Idea Review).
- **Observed completed experiment plans:** none in the reviewed evidence.
- **Observed physical test executions / lab results:** none in the reviewed evidence.
- **Historical frequency or forward demand rate:** NOT OBSERVED; repository evidence does not support a numeric estimate.
- **Distinct ownership:** plausible but not proven. Existing contracts own research synthesis and decision linkage; a test owner/lab specialist retains physical execution. No repository evidence identifies a recurring internal owner for protocol design.

## 5. P3-A03 finding

**Result: INCONCLUSIVE for standalone CAP-06; evidence supports a shared method need, but not a standalone capability.**

The repository demonstrates that more than one workstream can identify physical verification needs. It does not demonstrate recurring completed test-planning work across those workstreams, nor a frequency that justifies a separate capability. Current contracts already identify the boundary and hand off to human/specialist; the missing element is a reusable protocol-design method, not proven autonomous capability ownership.

## 6. Options to carry into P3-A04

1. **Standalone CAP-06:** currently lacks sufficient reuse/frequency evidence. Would require additional real cases or explicit owner/user evidence.
2. **Conditional reference method:** plausible low-complexity option if the human decision is to standardize a lightweight test-plan handoff without adding a capability folder.
3. **Defer:** retain current boundary and collect real test-plan requests/results during normal work.

No option is approved by this assessment. P3-A04 requires the human-approved decision. No CAP-06 folder, routing activation, Knowledge promotion, or test execution is introduced here.

## 7. Evidence gaps / next evidence that would change the decision

- A real experiment-design request and its resulting plan, with source/workstream reference.
- Repeated cases from a second workstream, or multiple material cases over time, showing the same reusable method.
- Confirmation from the responsible engineering/lab owner about who designs, approves and executes protocols.
- Evidence that a conditional reference inside DEEP_RESEARCH/EVALUATION would be insufficient or cause boundary confusion.

## 8. Review boundary

This is a repository evidence review, not an exhaustive interview or historical search outside the current repository. “Not observed” means not found in the reviewed source set; it does not establish that such work never occurs.
