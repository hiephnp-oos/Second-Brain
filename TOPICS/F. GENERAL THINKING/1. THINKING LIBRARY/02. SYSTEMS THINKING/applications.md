# Systems Thinking — Applications

## SYS-APP-01 — Recurring quality problem
Map defect accumulation, inspection flow, rework, feedback delay and production incentives. Test whether the apparent root cause is actually a reinforcing loop.

## SYS-APP-02 — Project schedule pressure
Separate workload stock, completion flow, incoming changes, rework and decision delays. Avoid treating every late milestone as an independent event.

## SYS-APP-03 — Process KPI design
Map what behavior a metric rewards, what information it hides, and what balancing responses it creates.

## SYS-APP-04 — Organizational change
Identify information flows, decision rights, incentives, informal rules and adaptation. Expect counter-responses.

## SYS-APP-05 — Personal workflow
Model backlog as a stock and completion as a flow. Identify accumulation and context-switching loops before adding more tools.

## SYS-APP-06 — Supplier/process escalation
Map defects, complaints, corrective actions, capacity and incentives over time. Fix the loop that reproduces the issue, not only the latest symptom.

## SYS-APP-07 — Shared resource governance
For a shared capacity, common facility or finite resource, map who receives the benefit, who bears the cost and whether users see the resource's deteriorating condition. Design access rules or feedback that make long-term consequences visible.

## SYS-APP-08 — KPI drift and rule gaming
Compare the stated goal, the measured indicator and the rewards attached to it. Look for falling standards, output substituted for outcome, or compliance that technically meets a rule while defeating its purpose.

## SYS-APP-09 — Escalating competition or conflict
Map how each party's response becomes the trigger for the other party's next move. Test an interruption, unilateral de-escalation or negotiated balancing constraint rather than matching every increase.

## SYS-APP-10 — Intervention dependence
Check whether repeated rescue, rework or symptom suppression is reducing the system's ability to solve the underlying problem. Pair immediate relief with a plan to rebuild internal capability and reduce dependence.

## SYS-APP-11 — Resilience and organizational design
Review whether short-term utilization or standardization has removed spare capacity, diverse approaches, local adaptation or recovery paths. Evaluate performance under disturbance, not only under normal operating conditions.


## SYS-APP-12 — Select and test a leverage point
Describe the recurring behavior, map stocks, flows and feedback, then generate candidate interventions across parameters, buffers, physical structure, delays, feedback strength, information, rules, self-organization, goals and assumptions. Compare feasibility, response time, resistance and side effects before selecting a test.

## SYS-APP-13 — Review a KPI or management policy
Trace how a metric changes incentives, information and decisions. Ask whether it strengthens the intended feedback or encourages proxy optimization, rule gaming or goal drift. Define outcome checks and a revision cycle.

## SYS-APP-14 — Run a whole-system decision review
Before implementation, identify affected subsystems and indirect stakeholders, assign responsibility to actors with relevant information and authority, include delayed effects, and define what evidence would trigger a policy adjustment.


## Appendix model-equation catalog — nine model setups

The book's Appendix provides equations for the nine dynamic model headings used in Chapters One and Two. This catalog records their scope without claiming to have re-run or numerically validated the original simulations.

1. **Bathtub:** one water stock updated by inflow minus outflow; initial stock 50 gallons; minute time step; 10-minute run.
2. **Coffee Cup Cooling or Warming:** one model heading with cooling and warming variants. Cooling runs start at 100°C, 80°C and 60°C; warming runs at 0°C, 5°C and 10°C; room temperature is 18°C; each run lasts 8 minutes.
3. **Bank account:** money stock increases through interest; initial balance $100; annual time step; 12-year run.
4. **Thermostat:** room-temperature stock changes through furnace heat and heat loss; initial room temperature 10°C or 18°C; thermostat setting 18°C; scenarios run for 8 and 24 hours.
5. **Population:** population stock changes by births minus deaths; initial population 6.6 billion; annual time step; 100-year run.
6. **Capital:** capital stock changes by investment minus depreciation; initial capital stock 100; 50-year run.
7. **Business inventory:** car inventory stock changes with inventory supply and customer demand; initial inventory 200 cars; daily time step; 100-day run.
8. **Renewable stock constrained by a nonrenewable resource:** resource stock is depleted by extraction while capital stock changes through investment and depreciation; 100-year run.
9. **Renewable stock constrained by a renewable resource:** resource stock changes by regeneration minus harvest while capital stock changes through investment and depreciation; 100-year run.

General stock update pattern used across these examples: current stock = prior stock + (inflows − outflows) × time step. The sign and units of the flows must match the modeled stock; this pattern is a conceptual index, not a substitute for each source equation's specific converters and assumptions.
