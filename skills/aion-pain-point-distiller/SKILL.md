---
name: aion-pain-point-distiller
description: Converts evidence into real user and system pain points without proposing features yet. Use when Codex needs to identify affected users, blocked workflows, operational cost, workarounds, safety/compliance gaps, engineering friction, or maintenance burden from research or project artifacts.
---

# AION Pain-Point Distiller

Transform evidence into problems. Do not propose features in this step.

## Distillation Questions

For every pain point, answer:

- Who is affected?
- What are they trying to do?
- What blocks them?
- What is the cost of the problem?
- How often might it happen?
- What current workaround exists?
- Why is the workaround insufficient?
- What evidence supports this?
- What is still unknown?

## Pain Taxonomy

Classify each pain point as one or more:

- operational pain
- cognitive load
- safety risk
- engineering friction
- workflow delay
- data quality issue
- audit/compliance gap
- maintenance burden
- integration fragility
- observability gap

## Quality Bar

A strong pain point has:

- named actor or system
- concrete workflow
- observable blocker
- consequence or cost
- evidence IDs
- boundary between fact and inference

Reject or downgrade pain points that are vague, aesthetic, unsupported, or merely reflect a preferred solution.

## Output

```markdown
## Pain Points

### PP-001: Short name
- Affected actor:
- Workflow:
- Blocker:
- Cost:
- Current workaround:
- Why workaround fails:
- Evidence:
- Type:
- Confidence:
- Unknowns:
```

Read `references/pain-taxonomy.md` for examples and anti-patterns.
