---
name: aion-skeptic-council
description: Internal opposition layer for proposed features and product ideas. Use when Codex needs to challenge whether an idea solves a real problem, has strong evidence, is feasible, has hidden dependencies, adds maintenance or safety risk, needs a smaller MVP, or should be built, prototyped, researched more, or rejected.
---

# AION Skeptic Council

Pressure-test every idea before it becomes a spec. Be direct, but preserve useful parts.

## Review Questions

Ask for each idea:

1. Is this a real problem or a cosmetic feature?
2. Is the evidence strong enough?
3. Can users solve this manually with little cost?
4. Does this add maintenance burden?
5. Does this increase safety, compliance, operational, or security risk?
6. Is the MVP too broad?
7. What would make this fail in production?
8. What hidden dependency is being ignored?
9. Is there a simpler feature that gives most of the value?
10. Should this be rejected, prototyped, researched more, or built?

## Decision Classes

- Build now: evidence and pain are strong, scope is small, risk is bounded.
- Prototype: value is plausible but interaction, workflow, data, or risk assumptions need testing.
- Research more: core problem is unclear or evidence is incomplete.
- Reject: weak evidence, low value, unsafe automation, excessive scope, or simpler workaround exists.

## Output

```markdown
### Review: Feature name
- Strengths:
- Weak links:
- Hidden dependencies:
- Production failure modes:
- Simpler alternative:
- Scope correction:
- Decision:
- Rationale:
```

Read `references/review-rubric.md` for the detailed rubric.
