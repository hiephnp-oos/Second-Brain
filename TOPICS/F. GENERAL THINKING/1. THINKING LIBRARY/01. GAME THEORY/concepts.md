# Game Theory — Concepts

Sources: GT-01 *Thinking Strategically*; GT-02 *The Art of Strategy*; GT-03 *A Course in Game Theory*; GT-04 *The Strategy of Conflict*; GT-05 *The Evolution of Cooperation*.

## Strategic structure
Strategic interaction exists when another purposeful actor can change the value of your action. Model players, strategies, information, timing, preferences/payoffs and outcomes.

## Part I foundations from GT-01
Part I establishes several distinctions before the later formal machinery:

- **Reaction:** an action changes the opponent's response; the response can change the value of the original action.
- **Sequential interaction:** players move in sequence, so later responses must be anticipated and reasoned backward.
- **Simultaneous interaction:** players choose without observing the other's current choice; reasoning must solve mutual expectations rather than a visible move sequence.
- **Move order:** first mover advantage is not universal; revealing a choice can help the second mover.
- **Commitment/intransigence:** reducing one's own flexibility can change the opponent's feasible responses, but only when the position is sufficiently credible and the long-run cost is acceptable.
- **Coordination:** jointly beneficial action can fail when each individual bears the cost of moving first or acting alone.
- **Path dependence:** individually acceptable sequential decisions can produce an undesirable aggregate result.
- **Lock-in:** once switching becomes costly, the other side can capture bargaining power.
- **Mixed strategies:** unpredictability can prevent an opponent from systematically exploiting a predictable action pattern.
- **Information from behavior:** another player's action or willingness to trade can reveal information about what they know or believe.
- **Human behavior:** pride, irrationality and imperfect credibility can materially change strategic outcomes and should not be silently assumed away.

## Part I incremental foundations from GT-02

GT-02 revisits the Part I foundations with a stronger emphasis on what the strategic examples add beyond the core GT-01 framework:

- **Infer the objective behind the move:** strategic analysis may require reasoning about what the other actor, institution, or test designer is trying to achieve, not only the visible action.
- **Strategic sacrifice can improve the future position:** a locally costly outcome can be optimal when it changes the next state, removes a stronger rival, or preserves a better eventual payoff.
- **Backward reasoning has boundary conditions:** full backward solution is cleanest when the state, previous actions, objectives, and subsequent choices are sufficiently known; uncertainty about chance, hidden actions, or motives requires additional reasoning rather than blind backward induction.
- **Behavioral assumptions matter:** observed behavior can differ from the pure-self-interest prediction because of fairness, altruism, fear of rejection, learning, or social norms. The strategic model should make those assumptions explicit.
- **Equilibrium can be multiple:** a game may have several stable mutual-best-response outcomes. Finding an equilibrium is therefore not the same as explaining which equilibrium will be selected.
- **Coordination games need an equilibrium-selection mechanism:** focal points, conventions, communication, or credible commitments can help actors converge on one equilibrium when several are available.
- **Conflict games can contain mutually destructive equilibria:** in Chicken-like situations, avoiding the worst outcome may require credible restraint, commitment, or a convention that coordinates expectations.

These are incremental GT-02 foundations; they do not replace the more detailed GT-01 concepts already retained above.

## Solution concepts
Dominant/dominated strategies simplify analysis. Best responses map conditional optimal actions. Nash equilibrium describes mutual best responses; it is not automatically desirable. Rationalizability removes behavior inconsistent with rational best-response reasoning. Subgame perfection tests credibility in every relevant subgame. Sequential equilibrium combines sequential rationality with consistent beliefs.

## Information
Bayesian games represent private types. Common knowledge is stronger than shared knowledge. Signaling reveals information through observable actions; screening structures choices so hidden types reveal themselves.

## Commitment and conflict
Threats, promises, warnings, assurances and commitments alter expectations. Credibility comes from changed incentives, constraints, contracts, reputation, delegation, timing or deliberate loss of control. Schelling adds focal points, tacit coordination/bargaining, strategic communication and randomized commitment.

## Repetition and cooperation
Repeated games create a shadow of the future. Reciprocity, punishment, forgiveness, reputation and detectability can sustain cooperation. Axelrod adds evolutionary selection, local clusters, collective stability and robustness under noise.

## Mechanism and allocation
Implementation asks how to design a game that induces a desired outcome. Auction rules, voting procedures and incentive systems shape behavior. Coalitional games study group outcomes; the core tests coalition deviations; the Shapley value distributes by marginal contribution; Nash bargaining selects agreements relative to feasible outcomes and disagreement.

## Practical synthesis
Model interaction → identify information/timing → predict reactions → reason backward for sequential moves or solve mutual best responses for simultaneous moves → inspect move order and commitment → account for coordination, lock-in, mixed strategies and information revealed by behavior → test credibility → ask whether changing rules beats optimizing within them.

## Part II foundations from GT-01

Part II turns the Part I strategic foundations into explicit mechanisms for cooperation, strategic moves, credibility and unpredictability.

### Chapter 4 — Resolving the Prisoners' Dilemma
- Cooperation requires a way to detect cheating and identify the cheater.
- Detection can be imperfect; false positives and attribution problems affect enforcement design.
- Punishment can be external or generated from repeated interaction through loss of future cooperation.
- A known finite horizon can unravel cooperation by backward induction; an indefinite or uncertain horizon preserves the value of future cooperation.
- The value of cooperation depends on how strongly future payoffs matter relative to immediate cheating gains.
- Punishment design should consider simplicity, clarity, certainty, speed and sufficient—not gratuitous—severity.
- **TIT FOR TAT** illustrates conditional cooperation: start cooperatively, respond to defection, and restore cooperation when the other side does.
- Effective reciprocity must distinguish retaliation from forgiveness and remain robust to accidental errors.
- Cooperation mechanisms can be exploited or redirected; an apparently pro-competitive rule can also enforce a cartel.
- Multiple dimensions of competition can cause evasion to move from observable to opaque dimensions.

### Chapter 5 — Strategic Moves
A strategic move is a preemptive commitment that changes the other player's response. The book distinguishes:
- **unconditional moves**: act first and fix the action;
- **threats**: commit to a response that punishes a specified action;
- **promises**: commit to a response that rewards a specified action;
- **warnings/assurances**: informational statements that do not strategically change the response rule.
Strategic moves work only if the other side can observe or infer the move and can be influenced before acting. They transform an otherwise simultaneous interaction into a sequential one. More complex strategic moves can deliberately let the other side move first, wait for a threat, or create an intermediate commitment.

### Chapter 6 — Credible Commitments
Credibility means the opponent expects the strategic move to be carried out even when carrying it out later would otherwise be unattractive. The source's eightfold path uses devices including changing payoffs, reputation, contracts, cutting off communication, burning bridges, leaving outcomes beyond one's control, moving in small steps, teamwork and mandated negotiating agents. The common mechanism is to make reversal costly, impossible, externally constrained or strategically unappealing.

### Chapter 7 — Unpredictability
When both sides can anticipate and exploit systematic behavior, equilibrium may require mixing actions. The correct mixture is determined by the payoff structure, not necessarily 50:50. The randomization must itself be unpredictable; a fixed pattern with the correct long-run proportions remains exploitable. A player's best mix can change when the opponent's skills/payoffs change. Randomization also has limits: some situations are genuinely unique, information may make the opponent's action predictable, and strategic deception/surprise must be distinguished from routine mixed play.

## Part III foundations from GT-01

Part III applies the earlier framework to risk, coordination, voting, bargaining and incentive design.

### Chapter 8 — Brinkmanship
- Brinkmanship is deliberate creation of a recognizable risk that is not fully controlled, used to induce the other side to back down.
- It differs from ordinary mixed-strategy randomization: the uncertainty is about whether a deteriorating process crosses the bad-outcome threshold, not a private random choice that remains under the actor's control.
- Credible brinkmanship needs a controllable risk range: the opponent must be able to reduce the risk, ideally toward zero, by complying with the demanded terms.
- The mechanism can fail when the actor cannot control the risk at the required level, making the threat either ineffective or too dangerous.
- Brinkmanship always carries a falling-off-the-brink risk; successful deterrence and catastrophic escalation are two possible outcomes of the same mechanism.
- Nuclear deterrence illustrates the trade-off between the deterrent value of risk and the cost of leaving outcomes partly to chance.
- Small incremental aggression can test whether a threat line is credible; deterrence can be weakened when each individual step seems too small to justify a drastic response.

### Chapter 9 — Cooperation and Coordination
- Individually rational choices can produce socially poor equilibria when actions impose externalities on others.
- Congestion games can have a stable equilibrium that is worse than a coordinated allocation; the private incentive need not match the social optimum.
- Path dependence and positive feedback can lock a group into an inferior convention or technology even after circumstances change.
- Multiple equilibria require coordination, conventions, penalties or other mechanisms when the group needs one equilibrium selected over another.
- Local responses can generate segregation or polarization even when individuals do not have extreme preferences.
- In location/competition games, strategic interaction can pull choices toward the center and produce imitation rather than differentiated outcomes.
- Higher-order expectations matter in markets and contests: agents may act on what they expect others to expect, rather than on intrinsic value alone.
- The chapter's synthesis is that coordination problems can generate too much competition, wrong proportions, lock-in, excessive homogeneity, or unstable outcomes.

### Chapter 10 — The Strategy of Voting
- Majority voting need not produce a stable overall winner; pairwise preferences can cycle.
- Agenda control is strategic because changing the order of pairwise votes can change the final outcome.
- Decision procedures are part of the game: changing what is decided first can change the eventual result even with unchanged preferences.
- Sophisticated voters can reason backward through a voting tree, but collective strategic foresight can still produce an outcome that the group would not prefer ex ante.
- Voting rules create incentives to vote strategically rather than report true preferences, especially when voters face viability thresholds or limited ballots.
- Approval voting is presented as one alternative intended to let voters support all options they genuinely find acceptable rather than forcing them to rank only a limited number.
- Moving first can strategically distort one's apparent preference to induce a favorable response from others.
- A voting mechanism should therefore be evaluated as an incentive system, not merely as a neutral method for counting preferences.

### Chapter 11 — Bargaining
- Bargaining outcomes depend on each side's cost of waiting and outside opportunities, not only on the size of the pie.
- Relative outside options matter: reducing the rival's outside option more than one's own can improve one's bargaining position even when both sides are worse off in absolute terms.
- Brinkmanship in bargaining can create urgency, but delay also creates risks from misperception, mistrust and breakdown.
- With multiple issues, differences in relative valuations create opportunities for mutually beneficial trades that are missed by bargaining over a single aggregate number.
- Procedure matters: who makes offers, when offers can be rejected, and whether delay destroys surplus all change the equilibrium.
- In finite bargaining, backward induction can determine both the timing and division of the settlement.
- With ongoing bargaining, patience is valuable: the side with lower impatience/waiting cost generally has greater bargaining leverage.

### Chapter 12 — Incentives
- Incentive design must account for hidden effort: when effort is unobservable, compensation must be tied to observable outcomes or other signals that correlate with effort.
- Outcome-based incentives create a trade-off between rewarding desired effort and exposing the worker to risk from factors outside the worker's control.
- Joint ventures create a hold-up problem when parties become mutually dependent after investment; enforceable initial contracts can reduce later renegotiation incentives.
- Auction rules change strategic bidding incentives. Under a first-price sealed-bid setting, bidders may profit from shading or inflating relative to truthful cost reporting depending on the mechanism and information structure.
- The value of winning must be evaluated together with the information revealed by winning; a winner can be the party with the most optimistic estimate in an uncertain common-value setting.
- Good mechanism design aligns private incentives with the desired outcome instead of assuming participants will voluntarily choose the socially efficient action.

## Part III cross-chapter synthesis
1. Risk can be used strategically, but only when the risk is recognizable, bounded enough to influence behavior, and escapable through compliance.
2. Coordination failures often come from externalities, multiple equilibria, path dependence and higher-order expectations.
3. Voting procedures and bargaining procedures are themselves strategic mechanisms; changing the procedure can change the outcome without changing preferences.
4. Bargaining power comes partly from relative outside options, patience and control over procedure.
5. Incentive systems must be designed around observability, risk allocation, hold-up and the strategic response to the mechanism.
