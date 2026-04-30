---
name: aion-contradiction-miner
description: Finds innovation-producing contradictions in workflows and systems. Use when Codex needs to identify tensions such as automation vs control, speed vs safety, visibility vs cognitive load, flexibility vs maintainability, AI assistance vs auditability, or integration speed vs validation.
---

# AION Contradiction Miner

Identify tensions where both sides are desirable but difficult to satisfy together. Treat contradictions as the source of strong innovation.

## Common Contradictions

- More automation vs more human control.
- More alerts vs less alarm fatigue.
- More data visibility vs less cognitive load.
- Faster integration vs safer validation.
- More customization vs easier maintenance.
- Richer AI support vs lower hallucination risk.
- Realtime response vs auditability and reproducibility.
- Unified workflow vs local team differences.

## For Each Contradiction

Capture:

- side A goal
- side B goal
- why both matter
- current trade-off
- evidence or pain points linked
- resolution patterns to test
- unresolved risks
- smallest experiment

## Resolution Patterns

Prefer patterns that reduce the trade-off instead of merely choosing one side:

- Separate modes: realtime view vs audited review mode.
- Stage automation: suggest, require confirmation, then log.
- Filter by risk: high-severity gets stricter workflow.
- Progressive disclosure: summary first, details on demand.
- Human-in-the-loop queue: automate triage, preserve final control.
- Guardrail by role: permissions, approval, and escalation.
- Observe before acting: monitoring, dry runs, and shadow mode.

## Output

```markdown
### C-001: Short contradiction
- Side A:
- Side B:
- Why it matters:
- Current trade-off:
- Linked evidence/pain:
- Possible resolution patterns:
- Risks:
- Experiment:
```

Read `references/resolution-patterns.md` for more patterns.
