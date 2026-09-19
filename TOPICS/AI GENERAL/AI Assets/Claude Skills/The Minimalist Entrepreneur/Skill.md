---
name: minimalist-entrepreneur
description: This skill should be used when users are building, validating, or growing a small business using a minimalist, community-first approach. It routes user intent to the appropriate stage of the business lifecycle and loads the corresponding reference module.
---

# Minimalist Entrepreneur

## Overview

Provide a structured, stage-based system for building a business following the principles of *The Minimalist Entrepreneur*.  
Route user intent to the correct lifecycle stage and load the corresponding reference module for execution.

---

## Core Principle

Operate using a **community-first, manual-first, profit-first** approach:

- Start from people, not ideas
- Validate demand before building
- Deliver value manually before automation
- Avoid unnecessary scaling and complexity

---

## Routing Engine

Classify user intent, then load the appropriate reference file from `references/`.

### 1. Idea / Direction Unclear
**Trigger signals:**
- No business idea yet
- Exploring opportunities
- Looking for direction

**Action:**
Load:
```
references/find-community.md
```

---

### 2. Idea Validation
**Trigger signals:**
- Has an idea but unsure if viable
- Asking about demand, problem-solution fit

**Action:**
Load:
```
references/validate-idea.md
```

---

### 3. MVP Definition
**Trigger signals:**
- Wants to build first product
- Unsure what to include in MVP

**Action:**
Load:
```
references/mvp.md
```

---

### 4. Manual Delivery (Pre-MVP Execution)
**Trigger signals:**
- Wants to test without coding
- Delivering service manually
- Building workflows before product

**Action:**
Load:
```
references/processize.md
```

---

### 5. First Customers
**Trigger signals:**
- Has product/service but no users
- Needs first 10–100 customers

**Action:**
Load:
```
references/first-customers.md
```

---

### 6. Pricing
**Trigger signals:**
- Setting or adjusting price
- Unsure how to monetize

**Action:**
Load:
```
references/pricing.md
```

---

### 7. Marketing / Growth
**Trigger signals:**
- Has early traction
- Wants to scale audience or acquisition

**Action:**
Load:
```
references/marketing-plan.md
```

---

### 8. Scaling Decisions
**Trigger signals:**
- Hiring, spending, expansion decisions
- Concern about sustainability

**Action:**
Load:
```
references/grow-sustainably.md
```

---

### 9. Company Culture / Team
**Trigger signals:**
- Preparing to hire
- Defining values or culture

**Action:**
Load:
```
references/company-values.md
```

---

### 10. Decision Check (Global)
**Trigger signals:**
- Any uncertainty
- Evaluating a decision
- Asking “should I do this?”

**Action:**
Load:
```
references/minimalist-review.md
```

---

## Execution Rules

- Always select **one primary module** based on dominant intent
- Load additional modules only if strictly necessary
- Do not merge multiple stages unless user explicitly spans them
- Prefer earlier-stage modules if ambiguity exists

---

## Fallback Logic

If user intent is unclear:

1. Default to:
```
references/find-community.md
```

2. Ask targeted clarification:
- “What stage are you at: idea, validation, or already have customers?”

---

## Output Behavior

- Use the loaded reference module as the **primary reasoning framework**
- Do not expose routing logic to user
- Deliver answers aligned with minimalist principles:
  - Simple
  - Practical
  - Demand-driven

