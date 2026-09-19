\# Branching Experience Discovery Questions



\## Overview



Conversational discovery with follow-up questions based on answers. NOT a static questionnaire - each answer informs the next question.



\## Multi-Job Context



When running discovery for multiple jobs (multi-job mode), provide context about which jobs the gap appears in:



\*\*Template:\*\*

```

"{SKILL} experience appears in {N} of your target jobs ({Company1}, {Company2}, ...).



This is a {HIGH/MEDIUM/LOW}-LEVERAGE gap - addressing it helps {N/some/one} application(s).



Current best match: {X}% confidence ('{best\_match\_text}')



{Standard branching question}"

```



\*\*Leverage Classification:\*\*

\- HIGH-LEVERAGE: Appears in 3+ jobs (critical gaps)

\- MEDIUM-LEVERAGE: Appears in 2 jobs (important gaps)

\- LOW-LEVERAGE: Appears in 1 job (job-specific gaps)



\*\*Example:\*\*



```

"Cross-functional leadership appears in 2 of your target jobs (Microsoft, Google).



This is a MEDIUM-LEVERAGE gap - addressing it helps 2 applications.



Current best match: 67% confidence ('Led team of 3 engineers on AI project')



Tell me about times you've led or coordinated across multiple teams or functions."

```



After providing context, proceed with standard branching patterns below.



\## Technical Skill Gap Pattern



\*\*Template:\*\*

```

INITIAL PROBE:

"I noticed the job requires {SKILL}. Have you worked with {SKILL} or {RELATED\_AREA}?"



BRANCH A - If YES (Direct Experience):

&#x20; → "Tell me more - what did you use it for?"

&#x20; → "What scale? {Relevant metric}?"

&#x20; → "Was this production or development/testing?"

&#x20; → "What specific challenges did you solve?"

&#x20; → "Any metrics on {performance/reliability/cost}?"

&#x20; → CAPTURE: Build detailed bullet



BRANCH B - If INDIRECT:

&#x20; → "What was your role in relation to the {SKILL} work?"

&#x20; → "Did you {action1}, {action2}, or {action3}?"

&#x20; → "What did you learn about {SKILL}?"

&#x20; → ASSESS: Transferable experience?

&#x20; → CAPTURE: Frame as support/enabling role if substantial



BRANCH C - If ADJACENT:

&#x20; → "Tell me about your {ADJACENT\_TECH} experience"

&#x20; → "Did you do {relevant\_activity}?"

&#x20; → ASSESS: Close enough to mention?

&#x20; → CAPTURE: Frame as related expertise



BRANCH D - If PERSONAL/LEARNING:

&#x20; → "Any personal projects, courses, or self-learning?"

&#x20; → "What did you build or deploy?"

&#x20; → "How recent was this?"

&#x20; → ASSESS: Strong enough if recent and substantive

&#x20; → CAPTURE: Consider if gap critical



BRANCH E - If COMPLETE NO:

&#x20; → "Any other {broader\_category} work?"

&#x20; → If yes: Explore that

&#x20; → If no: Move to next gap

```



\## Soft Skill / Experience Gap Pattern



\*\*Template:\*\*

```

INITIAL PROBE:

"The role emphasizes {SOFT\_SKILL}. Tell me about times you've {demonstrated\_that\_skill}."



BRANCH A - If STRONG EXAMPLE:

&#x20; → "What {entities} were involved?"

&#x20; → "What was the challenge?"

&#x20; → "How did you {drive\_outcome}?"

&#x20; → "What was the result? Metrics?"

&#x20; → "Any {obstacle} you had to navigate?"

&#x20; → CAPTURE: Detailed bullet with impact



BRANCH B - If VAGUE/UNCERTAIN:

&#x20; → "Let me ask differently - have you ever {reframed\_question}?"

&#x20; → "What was that situation?"

&#x20; → "How many {stakeholders}?"

&#x20; → "What made it challenging?"

&#x20; → CAPTURE: Help articulate clearly



BRANCH C - If PROJECT-SPECIFIC:

&#x20; → "Tell me more about that project"

&#x20; → "What was your role vs. others?"

&#x20; → "Who did you coordinate with?"

&#x20; → "How did you ensure alignment?"

&#x20; → ASSESS: Enough depth?

&#x20; → CAPTURE: Frame as leadership if substantial



BRANCH D - If VOLUNTEER/SIDE WORK:

&#x20; → "Interesting - tell me more"

&#x20; → "What was scope and timeline?"

&#x20; → "What skills relate to this job?"

&#x20; → "Measurable outcomes?"

&#x20; → ASSESS: Relevant enough?

&#x20; → CAPTURE: Include if demonstrates capability

```



\## Recent Work Probe Pattern



\*\*Template:\*\*

```

INITIAL PROBE:

"What have you been working on in the last 6 months that isn't in your resumes yet?"



BRANCH A - If DESCRIBES PROJECT:

&#x20; → "Tell me more - what was your role?"

&#x20; → "What technologies/methods?"

&#x20; → "What problem were you solving?"

&#x20; → "What was the impact?"

&#x20; → CHECK: "Does this address {gap\_area}?"

&#x20; → CAPTURE: Create bullet if substantive



BRANCH B - If MENTIONS MULTIPLE:

&#x20; → "Let's explore each. Starting with {first}..."

&#x20; → Go through systematically

&#x20; → Prioritize by gap relevance

&#x20; → CAPTURE: Multiple bullets if relevant



BRANCH C - If "NOTHING NEW":

&#x20; → "What about small improvements, process changes, learning?"

&#x20; → "New tools or technologies?"

&#x20; → "Mentoring, teaching, knowledge sharing?"

&#x20; → "Anything that might seem too small?"

&#x20; → CAPTURE: Even small items can fill gaps

```



\## Key Principles



\*\*1. Start Broad, Go Narrow:\*\*

\- Initial question is open-ended

\- Follow-ups drill into specifics based on what they share

\- Don't ask about details they already covered



\*\*2. Listen and Branch Dynamically:\*\*

\- Promising answer → explore deeper

\- "No" answer → try adjacent probe or move on

\- Unclear → rephrase or provide examples

\- Stuck → offer concrete scenarios



\*\*3. Adapt to Communication Style:\*\*

\- Verbose: "What's the key takeaway?"

\- Terse: Provide examples, "Was it like X or Y?"

\- Uncertain: Validate, offer prompts



\*\*4. Recognize When to Move On:\*\*

\- After 2-3 attempts with nothing → gracefully move on

\- Don't exhaust user forcing content that doesn't exist

\- Some gaps okay - flag for cover letter



\*\*5. Cross-Reference During Discovery:\*\*

\- "Earlier you mentioned {X}, does that relate here too?"

\- "This sounds similar to {Y} - connected?"

\- Build connections user might not see



\## Example Complete Flow



```

SKILL: "I see the job requires CI/CD experience. Have you worked with CI/CD pipelines?"



USER: "Yes, I set up GitHub Actions for my side project."



SKILL: "Tell me more about that - what does the pipeline do?" \[BRANCH: Depth]



USER: "It runs tests and deploys to cloud when I push code."



SKILL: "What testing framework do you use?" \[BRANCH: Technical details]



USER: "pytest for my Python code."



SKILL: "Excellent. What's deployed - is this a production app?" \[BRANCH: Impact/scale]



USER: "Yeah, it's a tool used by 3 nonprofits right now."



SKILL: "That's substantial! Have you dealt with any flaky tests or reliability issues?"

&#x20;     \[BRANCH: Real-world challenges]



USER: "Actually yes, I had to add retries for some API-dependent tests."



SKILL: "Perfect - that shows practical troubleshooting. Any metrics on build time

&#x20;     or deployment frequency?" \[BRANCH: Quantify]



USER: "Deploys take about 3 minutes, and I deploy several times a week."



\[CAPTURED: Complete picture - hands-on CI/CD, pytest, flaky test handling,

production deployment. Directly fills gap with concrete details.]

```

