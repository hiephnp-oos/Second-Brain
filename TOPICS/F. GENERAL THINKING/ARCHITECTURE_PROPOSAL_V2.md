# F. GENERAL THINKING — Architecture Proposal v2

## Purpose

Define the durable architecture for General Thinking before source normalization and knowledge distillation. The architecture is intentionally independent of the current reading list.

## 1. Architecture model

General Thinking is a reusable reasoning layer, not a second domain knowledge base.

\`\`\`
External Source
      ↓
Source Intake
      ↓
Structural Normalization
      ↓
PDF ↔ Markdown Validation
      ↓
Concepts
      ↓
Mental Models
      ↓
Applications
      ↓
Reflection
      ↓
Reusable Lessons
      ↓
Personal Principles
\`\`\`

Not every source must progress through every layer. Promotion is based on demonstrated reuse value.

## 2. Framework taxonomy

### Thinking Library

These are framework/body-of-knowledge areas that can own durable concepts and mental models:

1. Game Theory
2. Systems Thinking
3. Bayesian Thinking
4. Critical Thinking
5. Psychology
6. Negotiation

A physical framework folder is created only when real content justifies it.

### Cross-cutting synthesis

These are routing/synthesis lenses that may combine multiple frameworks:

- Decision Frameworks / Decision Theory
- Strategic Thinking

They remain in \`THINKING_MAP.md\` and \`FRAMEWORK_INDEX.md\` before a dedicated library folder is justified.

This prevents the taxonomy from being forced to match the reading list.

## 3. Core Reading Set relationship

The Core Reading Set is a current source selection, not the architecture.

A book may map to one primary framework and one or more supporting lenses. Books do not require one-to-one folder ownership.

Current primary routing:

| Book | Primary framework / lens |
|---|---|
| Thinking Strategically | Game Theory / Strategic Thinking |
| The Art of Strategy | Game Theory / Strategic Thinking |
| A Course in Game Theory | Game Theory |
| The Strategy of Conflict | Game Theory / Strategic Thinking |
| The Evolution of Cooperation | Game Theory |
| Thinking in Systems | Systems Thinking |
| Statistical Rethinking | Bayesian Thinking |
| Superforecasting | Bayesian Thinking |
| The Scout Mindset | Critical Thinking |
| Thinking, Fast and Slow | Critical Thinking / Psychology |
| Influence | Psychology |
| Getting to Yes | Negotiation |
| Never Split the Difference | Negotiation |
| Thinking in Bets | Decision Frameworks / Bayesian Thinking |
| Good Strategy, Bad Strategy | Strategic Thinking |
| The Checklist Manifesto | Decision / Execution / Reliability |

## 4. Repository structure

The durable structure is intentionally staged:

\`\`\`
TOPICS/F. GENERAL THINKING/
├── README.md
├── THINKING_MAP.md
├── FRAMEWORK_INDEX.md
├── CORE_READING_SET.md
├── SOURCE_INTAKE_MANIFEST.md
├── ARCHITECTURE_PROPOSAL_V2.md
└── 1. THINKING LIBRARY/
    └── README.md
\`\`\`

Framework folders are materialized only when their content is ready:

\`\`\`
1. THINKING LIBRARY/
└── 01. GAME THEORY/
    ├── README.md
    ├── concepts.md
    ├── mental-models.md
    ├── applications.md
    ├── lessons.md
    └── sources/
\`\`\`

The same contract applies to other framework folders when justified.

Do not create empty Phase 2/3 directories merely to make the tree look complete.

## 5. Knowledge layer contract

Each materialized framework may use:

- \`README.md\` — scope, use/non-use, boundaries, routing.
- \`concepts.md\` — distilled source concepts.
- \`mental-models.md\` — reusable reasoning models/checklists.
- \`applications.md\` — concrete applications/cases.
- \`lessons.md\` — reusable lessons.
- \`sources/\` — source metadata and traceability only; no full copyrighted book text.

Source content and user interpretation remain distinct.

## 6. Intake and promotion gates

A source follows:

1. Intake inventory.
2. Structural review.
3. Normalization.
4. PDF↔Markdown validation.
5. \`STRUCTURALLY ACCEPTED\`.
6. Knowledge distillation.
7. Human/application validation where relevant.
8. Promotion into durable concepts and mental models.

No knowledge distillation is allowed before the source reaches \`STRUCTURALLY ACCEPTED\`.

## 7. Materialization rule

Create a physical framework folder only when at least one of the following is true:

- durable concepts have been distilled;
- reusable mental models exist;
- the framework is becoming a recurring routing destination;
- multiple sources or applications justify a stable knowledge boundary.

Do not create folders solely because a framework appears in the index.

## 8. Source-of-truth rules

- \`ARCHITECTURE_PROPOSAL_V2.md\` defines the intended F architecture.
- \`CORE_READING_SET.md\` defines the current source selection.
- \`SOURCE_INTAKE_MANIFEST.md\` defines source intake/review status.
- Framework files become authoritative only after promotion.
- \`AI_MEMORY.md\` remains the cross-topic routing layer.
- Full copyrighted source text remains outside the public repository.

## 9. Migration from the previous proposal

The previous proposal treated Decision Theory and Strategic Thinking as possible library folders. V2 treats them as cross-cutting synthesis layers until real content justifies physical materialization.

The previous proposal also listed many future folders. V2 keeps those concepts as staged capabilities rather than empty directories.

This is a deliberate simplification, not a reduction in intended capability.
