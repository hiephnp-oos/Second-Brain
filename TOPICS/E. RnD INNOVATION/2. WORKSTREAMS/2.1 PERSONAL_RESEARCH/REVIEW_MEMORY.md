# Human Review Memory — Personal Research / ADTD Claw

**Purpose:** Durable, AI-readable record of user-reviewed discovery decisions. Read before RS-12 convergence and semantic duplicate checks. This file records human decisions; it does not replace daily reports, IDEA_REVIEW, historical records, or the Knowledge Sheet.

## Decision rules

- Preserve the scope of each decision. A DROP rejects the reviewed candidate/delta; it does not automatically reject the entire problem domain or mechanism family.
- Before revisiting a DROP, state the exact material DELTA in user/product outcome, physical capability, or architecture, then check it against the recorded reason and relevant precedents. A cosmetic, naming, location, material, sensor, or geometry change alone is not a DELTA.
- A human-selected candidate may proceed even when its discovery disposition remains WATCH. Record the user's decision separately; do not silently rewrite WATCH as KEEP or as technical validation.
- After DROP/DUPLICATE, continue discovery by testing a genuine DELTA or searching a different direction until at least WATCH, unless a specific hard blocker and bounded search coverage are documented.
- Append new decisions with dates and source references through the normal Branch → PR → validation → merge workflow. Never silently overwrite prior decisions.

## Reviewed decisions

### C-24-02 — EverGlow™ Self-Healing Finish

- **Review date:** 2026-10-01 (user-confirmed)
- **User decision:** PROCEED — selected for further work.
- **Discovery origin:** 2026-09-24, Tech Push; PERSONAL_RESEARCH daily record: 2026-09-24.md.
- **Existing IDEA_REVIEW status:** VALID — KEEP (2026-09-29).
- **Scope:** Idea validity only; feasibility was not assessed.
- **Core concept:** Transfer self-healing polymer/topcoat technology to exposed faucet/handshower/accessory finishes to recover some minor surface damage and maintain premium appearance.
- **Known baseline / distinction:** Scratch resistance is not equivalent to self-healing. Automotive clearcoat and commercial self-healing coating precedents establish source technology, not bathroom-finish compatibility.
- **Key unknowns:** Warm-water healing, chemical/cleaner resistance, hardness, adhesion, appearance, durability over cycles, user value and willingness to pay in bathroom use.
- **Next boundary:** Continue through the existing IDEA_REVIEW workstream; do not infer feasibility or target-product validation from KEEP.
- **Sources:** ../2.2 IDEA_REVIEW/03-hiep-everglow-self-healing-finish/IDEA_REVIEW_2026-09-29.md; historical batch above.

### C-30-01 — Chỉ báo bảo dưỡng theo tình trạng cho bộ lọc xử lý nước vòi sen

- **Review date:** 2026-10-01 (user-confirmed)
- **User decision:** PROCEED — selected for further work.
- **Discovery disposition:** WATCH (2026-09-30); retain this status as the discovery/evidence status. User selection to proceed is a separate decision and does not validate feasibility.
- **Core concept:** Use measured flow and differential pressure trends to estimate filter condition and indicate maintenance, rather than relying only on a fixed replacement interval.
- **Meaningful DELTA to investigate:** Condition-based maintenance versus time-based replacement, with measurable improvement in replacement timing and/or avoidance of unexpected flow degradation.
- **Key unknowns:** Sensor cost, calibration across filter media and water conditions, reliability, maintenance burden, transferability to target shower architecture, and whether user value justifies added complexity.
- **Next boundary:** Targeted research/initial evaluation only; define target filter architecture and measurable comparison before any feasibility claim.
- **Source:** 2.1 PERSONAL_RESEARCH/2026-09-30.md, RS-12 C-30-01.

### C-01-01 — Tạm dừng vòi sen theo trạng thái đặt tay sen (PAUSA)

- **Review date:** 2026-10-01 (user-confirmed)
- **User decision:** DROP — deep analysis không tạo được khác biệt thực chất so với PAUSA và các tiền lệ gần.
- **Discovery disposition:** DROP as a standalone new product idea. Keep PAUSA and related prior art as reference baselines; do not reopen by superficial variation.
- **Core rejected mechanism:** Docking/placing the handshower triggers automatic pause or flow reduction; removing it resumes flow.
- **Deep-analysis finding:** Changing Hall sensing to a mechanical plunger, changing dock form, partial pause/trickle, or adding feedback/Eco behavior did not establish sufficient DELTA. The analysis also identified close cradle-actuated flow-control prior art.
- **Re-entry condition:** Only a genuinely different use case and material outcome/architecture beyond dock-triggered pause, supported by evidence and a fresh precedent check, may be considered as a new candidate. Do not rename C-01-01 to revive it.
- **PR #75:** https://github.com/hiephnp-oos/Second-Brain/pull/75 — closed without merge by user decision. Its deep-analysis branch/report is reference material, not an accepted repository change. The DROP decision is recorded here based on the user's review.
- **Source:** 2.1 PERSONAL_RESEARCH/2026-10-01.md; PR #75 deep-analysis report on its closed branch.




### C-32-01 — Shower Thermal Energy Awareness

- **Review date:** 2026-10-02 (user-confirmed)
- **User decision:** WATCH — giữ lại để theo dõi/nghiên cứu có giới hạn; chưa đủ mạnh để trở thành product idea, nhưng cũng chưa đủ yếu để DROP.
- **Discovery disposition:** WATCH (2026-10-02); preserve this status. The user decision confirms WATCH, not product validation or approval to proceed to IDEA_REVIEW.
- **Core concept:** Estimate thermal energy per shower session from flow and temperature measurements, then provide simple user feedback.
- **Current classification:** TECHNICAL ENABLER / WATCH — not yet a validated product idea.
- **Meaningful DELTA:** Energy-based feedback rather than time- or volume-based feedback. This is currently a difference in information output; meaningful behavioral or outcome differentiation has not been demonstrated.
- **Key unknowns:** Availability of commercial products with session-level thermal-energy feedback; measurement accuracy and sensor configuration; whether energy feedback reduces consumption more than timer/ordinary smart feedback; sensor BOM, durability, maintenance and user acceptance.
- **Next boundary:** Limited targeted research only. Benchmark concrete smart-shower products and validate a sensing/estimation setup against a reference meter before considering IDEA_REVIEW or fitting integration. Do not initiate broad deep analysis without new decision-relevant evidence.
- **Source:** 2.1 PERSONAL_RESEARCH/2026-10-02.md, RS-12 C-32-01; direct user review in conversation dated 2026-10-02.


## Update log

- 2026-10-01: Initial memory created from user's review of ADTD Claw outputs dated 2026-09-29, 2026-09-30 and 2026-10-01. Two candidates selected to proceed: C-24-02 and C-30-01. C-01-01 dropped after deep analysis; PR #75 not merged.
- 2026-10-02: Added user-confirmed WATCH decision for C-32-01. Preserved its discovery classification as a technical enabler, not a validated product idea; next step is limited targeted research only.


### 2026-10-06 — Batch review: ADTD Claw candidates 2026-09-20 to 2026-09-28

- **Review date:** 2026-10-06 (user-confirmed).
- **Scope:** User-reviewed DROP decisions from the Claw candidates listed below. These decisions are reusable filters for future Claw discovery; they do not automatically reject an entire problem domain or mechanism family unless the recorded scope says so.

#### User decisions

| Discovery date | Candidate | User decision / lesson |
|---|---|---|
| 2026-09-20 | C-01 | **DROP** — magnetic dock architecture does not create sufficient differentiation versus the existing landscape to qualify as a new product. |
| 2026-09-20 | C-02 | **DROP** — technical approach is not attractive versus simpler landscape solutions. A mechanical pin/nozzle element that protrudes/retracts to clear scale is a simpler precedent. |
| 2026-09-20 | C-03 | **DROP** — surface/wettability design alone is insufficient differentiation to qualify as a new technology/product. |
| 2026-09-21 | C-03 | **DROP** — no clear user pain point. |
| 2026-09-22 | C-01 | **DROP** — low-effort snap selector does not create sufficient new-product differentiation. |
| 2026-09-22 | C-02 | **DROP** — pressure-decoupled selector does not create sufficient new-product differentiation. |
| 2026-09-22 | C-03 | **DROP** — self-draining/vacuum-break concept overlaps with existing cold-water/drain technologies in the landscape; Solex iDrain is a knowledge-beta reference. |
| 2026-09-23 | C-01 | **DROP** — pressure-isolated outlet switching does not create a sufficiently differentiated new product. |
| 2026-09-23 | C-03 | **DROP** — capillary/wettability-based drainage is not sufficiently differentiated. |
| 2026-09-24 | C-01 | **DROP** — outside the target product scope: water-system technology rather than faucet/shower product technology. |
| 2026-09-25 | C-01 | **DROP** — low-loss isolated outlet selector does not create sufficient differentiation. |
| 2026-09-25 | C-02 | **DROP** — pressure-adaptive spray/nozzle is considered a spray variation, not sufficient new-product differentiation. |
| 2026-09-26 | C-02 | **DROP** — low-aerosol is an automatic drop direction unless a materially new product architecture/outcome is identified. |
| 2026-09-26 | C-03 | **DROP** — cold-water drainage already has multiple market technologies; Solex iDrain is a knowledge-beta reference. |
| 2026-09-27 | C-01 | **DROP** — combining low-aerosol and low-retention is still not sufficiently differentiated; low-aerosol direction is an automatic drop unless a materially new DELTA is demonstrated. |
| 2026-09-27 | C-02 | **DROP** — water-system application rather than the target faucet/shower product scope; C27-01 is retained only as a test/reference report. |
| 2026-09-27 | C-03 | **DROP** — direct low-aerosol outlet is not sufficiently differentiated; low-aerosol direction is an automatic drop unless a materially new DELTA is demonstrated. |
| 2026-09-28 | C-01 | **DROP** — uniform large-droplet spray is not sufficiently differentiated. |
| 2026-09-28 | C-02 | **DROP** — safe-temperature delivery interface is not sufficiently differentiated. |
| 2026-09-28 | C-03 | **DROP** — pressure-regulated droplet energy/spray behavior is not sufficiently differentiated. |
| 2026-10-01 | C-01-01 | **DROP** — already recorded above; PAUSA/manual pause landscape resolves the pain point better, and predictive temperature restart is not sufficiently feasible. |

#### Reusable lessons for future Claw discovery

1. **New-product differentiation is a primary gate.** A technically interesting mechanism is not enough. If the concept remains only a different geometry, spray pattern, surface treatment, operating-force reduction, or minor valve architecture without a materially different user outcome/product architecture, prefer DROP.
2. **Pain-point existence is a hard gate.** If a candidate has no concrete user/product pain point, DROP rather than generating a technology-first idea around it.
3. **Check landscape before elevating a mechanism to product idea.** If the same user outcome is already solved by a simpler, more robust or more direct commercial mechanism, the candidate needs a genuine DELTA to survive.
4. **Prefer product-domain relevance.** Water-system technologies outside the faucet/shower product boundary should be filtered out unless the project scope explicitly expands.
5. **Treat low-aerosol as a low-value default direction.** Do not continue low-aerosol concepts as independent product ideas unless a materially new architecture, user outcome or application-specific DELTA is demonstrated.
6. **Do not overvalue technical novelty without user value.** A new way of producing a spray, controlling pressure, changing droplet behavior, or draining water is not automatically a new product.
7. **Before revisiting a DROP, require a material DELTA.** The DELTA should be in user outcome, physical capability, product architecture, or application; superficial geometry/material/sensor/name changes do not reopen the candidate.
8. **Landscape simplicity matters.** When a candidate requires a complex active mechanism but a simple passive/mechanical solution already addresses the same pain point, the complex concept should normally be dropped unless it provides a clearly superior outcome.
9. **Knowledge references can close a direction.** Existing knowledge such as Solex iDrain can be used as a baseline precedent; absence of a new DELTA is sufficient to stop further discovery in that direction.

- **Source:** User review supplied on 2026-10-06; pasted review table attached to the conversation.
- **Next boundary:** Future RS-12/Claw convergence should read these lessons before proposing or re-proposing candidates. Do not automatically suppress an entire technology family when a future candidate demonstrates a material DELTA.
