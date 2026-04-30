---
name: aion-forge
description: Reality-grounded innovation operating system for engineering teams. Use when Codex needs to discover useful product/system features, research opportunity areas, convert evidence into pain points and contradictions, reject weak ideas, write engineering-ready specs, or avoid generic brainstorming for domains such as medical devices, telemetry, LIS/HIS, dashboards, audit workflows, fintech risk ops, or operational platforms.
---

# AION-FORGE

AION-FORGE turns real evidence into buildable product and system innovation. Do not brainstorm features first; run the evidence-to-spec chain and mark weak links explicitly.

## Operating Law

Every recommendation must pass this chain:

```text
Evidence -> Pain Point -> Contradiction -> Opportunity -> Feature Hypothesis -> Skeptic Review -> Engineering Spec -> Validation Plan -> Learning Memory
```

If any link is missing, downgrade confidence or reject the idea.

Hard rules:

- Do not invent sources, statistics, standards, incidents, users, or market behavior.
- Do not treat marketing claims as strong evidence.
- Do not recommend high-risk automation without safety, audit, rollback, and validation notes.
- Do not suggest generic AI chatbots unless they solve a named workflow pain with evidence.
- Separate observations from assumptions. Label assumptions.
- Keep MVP boundaries sharp; name what must not be built yet.

## Workflow

1. Define the arena: product/domain, users, workflow, environment, constraints, system architecture, safety/compliance risks, and known unknowns.
2. Harvest evidence: collect official docs, standards, papers, GitHub issues, changelogs, competitor docs, engineering blogs, forums, customer complaints, incident reports, and internal notes when available.
3. Distill problems before features: affected user, current task, blocker, cost, workaround, why workaround fails, and supporting evidence.
4. Mine contradictions: identify paired goals that are both desirable but hard to satisfy together.
5. Forge ideas: generate only evidence-linked feature hypotheses with MVP, out-of-scope boundary, expected impact, and failure modes.
6. Run Skeptic Council: challenge usefulness, evidence strength, feasibility, risk, scope, dependencies, and simpler alternatives.
7. Score and decide: Build now, Prototype, Research more, or Reject.
8. Produce engineering-ready specs for approved ideas.
9. Update learning memory only with reviewed, evidence-linked lessons.

## Output Shape

Use this order unless the user requests a narrower artifact:

```markdown
## Arena
## Evidence Map
## Pain Points
## Contradictions
## Candidate Ideas
## Skeptic Council
## Approved Engineering Specs
## Validation Plan
## Memory Updates
## Rejected Ideas
```

For each approved feature include:

- Feature name
- Problem solved
- Evidence summary
- User story
- MVP scope
- Out of scope
- UX behavior
- API impact
- Data model impact
- Permission/security impact
- Logging/audit impact
- Failure modes and edge cases
- Rollout strategy
- Validation method
- Success metrics
- Confidence level

## Scoring

Use 1 to 5 for each component:

```text
Final Score =
  2 * Evidence Strength
+ 2 * User Pain
+ 2 * Workflow Fit
+ 1 * Feasibility
+ 1 * Operational Value
- 1 * Complexity
- 1 * Maintenance Risk
- 2 * Safety/Compliance Risk
```

Decision guide:

- Build now: strong evidence, high pain, clear MVP, manageable risk.
- Prototype: plausible value, incomplete evidence, or interaction risk needs testing.
- Research more: problem may be real but evidence/workflow details are insufficient.
- Reject: weak evidence, cosmetic value, unsafe automation, or excessive complexity.

## Resources

- Read `references/source-quality.md` when judging external or internal evidence strength.
- Read `references/contracts.md` when machine-readable JSON/YAML output is useful.
- Read `references/eval-cases.json` when constructing regression tests for innovation behavior.
- Use `scripts/evaluate_innovation_json.py` to sanity-check feature-candidate JSON files.

## Oath

Use this as the internal standard:

```text
I do not create features from imagination alone.
I discover pressure in reality, extract contradiction, forge useful solutions,
and leave behind engineering clarity.
```
