# Full Audit — Books 01–15

## Audit scope
This audit uses the supplied `BOOK.zip`. For every book, the PDF is treated as source of truth and the paired MD as extraction/working representation. The audit also checks cross-book duplication, hierarchy, source quality, and retrieval usefulness.

## Source integrity

| # | Book | PDF | MD | Assessment |
|---|---|---:|---:|---|
| 01 | Thinking Strategically | Present | Present | Full-source review |
| 02 | The Art of Strategy | Present | Present | Full-source review |
| 03 | A Course in Game Theory | Present | Present | Full-source review |
| 04 | The Strategy of Conflict | Present | Present | Full-source review |
| 05 | The Evolution of Cooperation | Present | Present | Full-source review |
| 06 | Thinking in Systems | Present | Present | Full-source review |
| 07 | Statistical Rethinking | 2 volumes | 2 volumes | Full-source review |
| 08 | Superforecasting | Present | Present | Full-source review |
| 09 | The Scout Mindset | Present | Present | **Partial/summary source** |
| 10 | Thinking, Fast and Slow | Present | Present | Full-source review; empirical caveat |
| 11 | Influence | Present | Present | Full-source review |
| 12 | Getting to Yes | Present | Present | Full-source review |
| 13 | Never Split the Difference | Present | Present | Full-source review; practitioner caveat |
| 14 | Thinking in Bets | Present | Present | Full-source review |
| 15 | Good Strategy, Bad Strategy | Present | Present | Full-source review |

## Structural audit

### 1. Strategic interaction
Books 1–5 are not five independent strategy books. They form a layered stack:

`practical game reasoning → practical game reasoning deepening → formal game theory → conflict/commitment → repeated cooperation`

Keep all five because their retrieval roles differ:
- 1–2: accessible operational reasoning.
- 3: formal foundation.
- 4: commitment, signaling, bargaining, conflict.
- 5: repeated interaction and cooperation.

### 2. Systems
Book 6 is complementary rather than redundant. Game theory models interaction between actors; systems thinking models feedback structures that generate persistent behavior.

### 3. Bayesian / forecasting
Books 7–8 form another coherent layer:
- 7 = model uncertainty and causal/statistical reasoning.
- 8 = applied forecasting process.
Do not collapse them into a generic “Bayesian thinking” file.

### 4. Epistemics / cognition
Books 9, 10, and 14 overlap strongly but have different jobs:
- 9 = attitude toward truth and motivated reasoning.
- 10 = cognitive mechanisms and biases.
- 14 = decision process under uncertainty and outcome bias.
Book 8 adds measurable forecasting discipline.

### 5. Influence / negotiation
Books 11–13 should remain separate:
- 11 explains persuasion heuristics.
- 12 gives principled negotiation structure.
- 13 gives tactical methods for difficult negotiations.
They are complementary, not duplicates.

### 6. Strategy
Book 15 sits above the game-theory layer:
- game theory asks how actors interact under specified rules;
- Rumelt asks what challenge the organization should diagnose and how to coordinate action around it.

## Duplicate-control decisions

Do **not** create separate duplicate notes for:
- “base rates” in every book;
- “uncertainty” in every book;
- “commitment” in every strategy book;
- “bias” as a generic category;
- “negotiation” as one merged framework.

Instead, retain each concept under the book that contributes its distinctive mechanism and use `FRAMEWORK_INDEX.md` for cross-book retrieval.

## Evidence / caution flags

1. Book 9 must remain marked partial because the supplied PDF/MD is a summary product, not the complete source.
2. Book 10 contains influential psychological findings; some individual findings have later replication or interpretation debates. Use the mechanisms as decision prompts, not immutable laws.
3. Book 13 is a practitioner framework. Tactical recommendations are not universal negotiation laws.
4. Book 5's tournament evidence is conditional on its environment and payoff structure.
5. Book 7 is technical; preserve reasoning principles rather than code-specific implementation details.

## Final hierarchy

```text
                    GENERAL THINKING
                           │
       ┌───────────────────┼───────────────────┐
       │                   │                   │
 Strategic Interaction   Evidence           Human Judgment
       │                   │                   │
     1–5                 7–8                9–10,14
       │                   │                   │
       ├──── conflict      └──── forecast     ├── epistemics
       │        4                 8            └── decision quality
       └──── cooperation
                5

       Systems 6
          │
          └── structure / feedback / leverage

       Influence & Negotiation 11–13
          │
          ├── influence 11
          ├── principled negotiation 12
          └── tactical negotiation 13

       Strategy 15
          │
          └── diagnosis → policy → coherent action
```

## Final audit conclusion

The 15-book set is coherent and useful as a compact thinking library. The main risk is not missing books; it is duplicate retrieval and treating every book as an equally authoritative source.

The final operating rule should therefore be:

**Route by problem → retrieve the smallest relevant framework → state assumptions → apply → observe outcome → update.**

Do not load all 15 books for every decision.
