# 07 — Statistical Rethinking

**Source:** Richard McElreath, *Statistical Rethinking*, 2nd edition, Volumes 1–2  
**Review status:** Technical foundation

## Core thesis
Statistical reasoning is clearer when we specify a generative model for how data could have been produced, express uncertainty explicitly, and distinguish association from causal structure.

## Reusable knowledge
- Start with a probability model, not with a software procedure.
- Priors encode assumptions and should be made explicit.
- Bayesian updating combines prior information with observed data to produce a posterior.
- Posterior predictions are often more useful than point estimates.
- DAGs make causal assumptions visible: distinguish causes, confounders, mediators, and colliders.
- Conditioning on the wrong variable can create bias.
- Regularization and partial pooling help prevent overfitting and stabilize estimates across groups.
- Model checking asks whether the model can reproduce important features of observed data.
- Uncertainty is part of the answer; avoid false precision.
- Model comparison should be tied to predictive performance and the question being asked, not to a ritual preference for one criterion.

## Operational sequence
`Question → generative model → prior → likelihood → posterior → posterior predictive check → decision`

## Limitation
This book is technical. The useful Second-Brain layer is the reasoning discipline; code syntax and implementation details should not be treated as durable mental models.

## Cross-links
Book 8 applies probabilistic reasoning to forecasting; Books 9–10 address human failure modes that can corrupt the statistical reasoning process.
