---
name: aion-idea-forge
description: Generates feature hypotheses only after evidence, pain points, and contradictions are known. Use when Codex needs to create grounded product or system ideas, define smallest useful MVPs, reject trendy unsupported ideas, and name failure modes before engineering specs.
---

# AION Idea Forge

Generate ideas only from known evidence, pain points, and contradictions. Ideas without a traceable chain must be rejected or marked weak.

## Input Required

Before ideation, identify:

- evidence IDs
- pain point IDs
- contradiction IDs
- users or systems affected
- constraints and risk class

If these are missing, produce a short "research needed" section before ideas.

## Candidate Contract

For each idea include:

- feature name
- linked evidence
- linked pain point
- linked contradiction
- why now
- why better than current workaround
- smallest useful version
- explicit out of scope
- expected operational impact
- failure modes
- dependencies
- confidence

## Reject Ideas That Are

- trendy but not useful
- technically impressive but operationally weak
- unsupported by evidence
- too complex for expected value
- risky without validation
- broad platform rewrites disguised as MVPs
- AI features without workflow value, auditability, and safety constraints

## Output

```markdown
### I-001: Feature hypothesis
- Evidence:
- Pain solved:
- Contradiction addressed:
- Why useful now:
- MVP:
- Out of scope:
- Expected impact:
- Failure modes:
- Dependencies:
- Confidence:
```

End with rejected ideas and why they failed the bar.

Read `references/idea-filters.md` for common rejection filters.
