# Documentation: SheetScript Assistant GEM

**Project Team:** Hoang Nguyen Phuoc Hiep | Reviewer: Tayfun Buzkan (Senior Process Manager OE & PI, R&D LIXIL International)
**Lead:** Hoang Nguyen Phuoc Hiep — R&D Department, Danang Plant, LWT Vietnam
**Strategic Keywords:** Digital 5-S, Process Architecture, AI Prompt Engineering, Digitization, Voice of the Customer

---

## 1. Initial Situation & Problem Statement (Background)

R&D engineers at LIXIL DNF Plant spend significant time writing, debugging, and maintaining Google Apps Script automations for the DNF R&D Database — a multi-sheet production system covering BOM processing, Drive file management, material mapping, and reporting.

Without a dedicated AI assistant tuned to this environment, engineers face three recurring bottlenecks:

- **Generic AI output:** Standard AI tools do not understand Apps Script constraints (trigger types, quota limits, batch I/O rules), producing code that works in demos but fails in production.
- **Manual verification overhead:** Engineers must manually check generated code for common failure patterns — SpreadsheetApp calls inside loops, missing error handling on API calls, wrong trigger types — before deploying.
- **No shared knowledge baseline:** Each debugging session starts from scratch. Lessons from one script are not carried forward.

**Business impact:** Wasted engineering hours on rework, increased risk of production script failures, and a higher barrier for team members with lower scripting experience.

---

## 2. Strategic Approach & Solution (Process)

**Why:** Apply the "Voice of the Customer" principle — design the AI assistant around the actual failure modes encountered in production, not generic coding best practices.

**What:** A custom Gemini GEM (Google AI assistant) with a structured system prompt that encodes production engineering rules specific to Apps Script and the DNF R&D Database context.

**How — Iterative refinement across 13 versions (Jan–Aug 2026):**

| Phase | Version | Key Change | Trigger |
|---|---|---|---|
| Foundation | v3.6 | Core mode engine, batch-first, zero hallucination | Initial build |
| Foundation | v3.7–v3.8 | Production-first philosophy, STOP logic, runtime-aware safety | Unsolicited rewrites in production |
| Foundation | v4.0–v5.0 | Deterministic mode engine, invariants, backward compatibility | Mode guessing errors |
| Specialization | v7.0–v7.1 | Vietnamese language policy, pair-debugger tone, drift recovery | UX reset |
| Specialization | v7.2–v7.3 | BUILD GATE + Mini Design, batch-first enforcement, trigger compatibility | Production failures from unreviewed code |
| Specialization | v7.4–v7.6 | Anti-sycophancy, UrlFetchApp safety, UI hygiene, quota table | Code quality gaps in generated output |
| Governance | v7.7 | Consolidated to 21 sections, code/UI hygiene rules | Token bloat at ~985 lines |
| Governance | v7.8 | Identity anchor (jailbreak defense) + language detection | Tayfun feedback: hallucination & language bug |
| Governance | v7.9 | Chunked structure (6 blocks), lost-in-middle fix | Tayfun feedback: fragmentation & cognitive load |
| Governance | v7.9_fix | Language session scope clarified, sycophantic-before-block removed | Internal test regression |
| Governance | v8.0 | **Split architecture:** Instructions + Knowledge files | Platform token ceiling, chain-of-thought leak |

**Frameworks applied:**
- *Digital 5-S:* Each version cycle removed redundant rules, consolidated scattered sections, and reduced token count (v7.8 → v8.0: ~63% reduction).
- *Simplify before automate:* Tayfun's principle guided the shift from 24 sections to 6 logical blocks, then to a 2-file architecture.
- *Risk-mitigated phased rollout:* Each version was tested against a 9-case test suite before sharing — no version was distributed without passing critical tests.

**This structured prompt engineering approach directly reduces rework time and standardizes AI-assisted scripting quality across the team.**

---

## 3. MVP Testing & User Feedback (Current Status)

**Test methodology:** 9-case parallel test suite run across v7.7, v7.8, Test Dummy (Tayfun's proposed compact version), and v7.9/v8.0.

| Test Area | What was tested |
|---|---|
| Identity security | Persona injection resistance (cold session + long session drift) |
| Language policy | Session language consistency across multi-turn conversations |
| Rule recall | "Lost in the Middle" — technical rules surviving long prompts |
| BUILD gate | Design review enforced before code generation |
| Business logic | BOM data loss diagnosis, Drive batch scale risk assessment |
| Code quality | Batch-first, CONFIG discipline, trigger compatibility, UrlFetchApp safety |

**Results summary (v8.0 candidate):**

- Identity anchor: PASS — persona injection blocked in cold session and after 7-turn technical thread
- Language policy: PASS — session language correctly detected and maintained
- Rule recall: PASS — all 3 BOM filter stages identified (v7.8 had partially missed these)
- BUILD gate: PASS — design review enforced before code generation
- Business logic: PASS+ — v8.0 additionally identified resume mechanism and timeout safeguard risks not caught by earlier versions
- Code quality: PASS — batch-first, CONFIG, error handling, no emoji violations

**Soft observations from Tayfun's review:**
> "Fantastic work — you've really gained a solid footing in the AI space. Great system prompts and the correct file format."

> "You never walk alone."

**Remaining open item:** v8.0 is currently in candidate status. Full regression test pending before production promotion.

---

## 4. Outlook & Continuous Improvement (Next Steps)

**Immediate (in progress):**
- Complete v8.0 regression test (9-case suite) and promote to production if no critical failures
- Fill and submit this documentation template to Tayfun for LIXIL AI knowledge base

**Short term:**
- Share approved v8.0 with LIXIL team members working on similar Apps Script systems
- Extend Knowledge file to cover DNF R&D Database V4-specific patterns (BOM ETL, Drive Rename, CONFIG schema)

**Medium term:**
- Build a lightweight onboarding guide so other engineers can configure a personal GEM without starting from scratch
- Add a regression test protocol to the Knowledge file so future maintainers can validate patches systematically

**Long term:**
- Contribute the 2-file Instructions/Knowledge architecture as a reusable template for other LIXIL AI tools
- Explore whether the test suite can be partially automated via scripted prompt injection tests

**These next steps align with LIXIL's standardization principle — one validated approach, documented and reusable, rather than each engineer reinventing the same solution independently.**

---

## 5. Version Changelog & Key Metrics

### Prompt Size Evolution

| Version | Lines | Token est. | Structure | Key capability added |
|---|---|---|---|---|
| v3.6 | 146 | ~500 | Flat | Core mode engine, batch-first |
| v4.0 | 456 | ~1,600 | 10+ sections | Deterministic mode, response structure |
| v5.0 | 355 | ~1,300 | 8 sections | Invariants, STOP priority |
| v7.0 | 385 | ~1,400 | Flat | Vietnamese policy, pair-debugger tone |
| v7.2 | 640 | ~2,300 | 10 sections | BUILD GATE, Mini Design, batch rule |
| v7.6 | 985 | ~3,500 | 18 sections | UI hygiene, UrlFetchApp, quota table |
| v7.7 | ~300 | ~1,100 | 21 sections | Consolidated, hygiene rules |
| v7.8 | 510 | ~3,800 | 24 sections | Identity anchor, language detection |
| v7.9 | 264 | ~1,400 | 6 blocks | Chunked, lost-in-middle fix |
| v8.0 | 2 files | ~2,200 total | 11 + 14 sections | Split architecture, authority layers |

### Key Lessons Learned

| Lesson | Version where learned |
|---|---|
| More rules ≠ better adherence — prompt can exceed effective context window | v7.6 → v7.7 |
| Hardcoded language policy breaks multi-user deployment | v7.7 (Tayfun feedback) |
| No identity anchor = exploitable via persona injection | v7.7 (Tayfun feedback) |
| 24 sections in one file → "Lost in the Middle" rule drop | v7.8 (test T6) |
| "First message" is ambiguous — Gemini may interpret per-request | v7.9 (test T2) |
| Splitting behavior from technical reference improves both maintainability and adherence | v8.0 |
| "Simplify before automate" applies to prompt engineering too | v7.9 architecture |

---

## Attachments

**System Prompts:**
- `SheetScript_GEM_v7.7.md` — Baseline single-file prompt
- `SheetScript_GEM_v7.8.md` — Identity anchor + language detection patch
- `Testdummy_Systemprompt_AppScript.md` — Tayfun's compact reference version
- `01-SheetScript-GEM-v8.0-Instructions.txt` — v8.0 behavior & workflow file
- `02-SheetScript-GEM-v8.0-Knowledge.txt` — v8.0 technical reference file

**Test Evidence:**
- SheetScript_TestSuite_v1.md — 9-case test suite with scoring criteria
- V7_9_test_result.txt — v7.9 parallel test results
- V7_9_Fix_test_result.txt — v7.9_fix regression results
- Jailbraked_Output.md — v7.7 jailbreak failure evidence
- Language_Confusion.md — v7.7 language policy failure evidence

**Development Changelog:**
- SheetScript_GEM_Changelog.md — Full version history v3.6 → v8.0 with patch notes

**Feedback Thread:**
- Email chain: Tayfun Buzkan ↔ Hiep Hoang (Jul 21 – Aug 6, 2026)

---

*LIXIL | Confidential*
