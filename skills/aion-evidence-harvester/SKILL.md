---
name: aion-evidence-harvester
description: Collects real-world evidence before ideation. Use when Codex needs to research official docs, standards, papers, GitHub issues, changelogs, competitor docs, forums, complaints, incidents, or internal notes before proposing product, workflow, architecture, or AI features.
---

# AION Evidence Harvester

Collect evidence before any feature proposal. Never invent sources or treat unsupported claims as facts.

## Source Order

Prefer stronger sources first:

1. Official docs, standards, regulations, specs, and security/compliance guidance.
2. Internal logs, customer complaints, support tickets, incident reports, and project notes.
3. Academic papers, clinical/industry guidelines, benchmark reports, and postmortems.
4. GitHub issues, pull requests, changelogs, release notes, and maintainer comments.
5. Competitor docs and product behavior.
6. Engineering blogs and conference talks.
7. Forums, social posts, reviews, and anecdotal complaints.

Use weak sources to generate questions, not high-confidence recommendations.

## Extraction Contract

For every source, extract:

- source id
- source type
- title or identifier
- URL or local path when available
- date or version when available
- key finding
- affected user or system
- pain point implied
- severity
- frequency if known
- confidence
- limitation
- direct implication for the project

## Rules

- Browse or inspect live sources when recency matters or the user asks for current evidence.
- Quote sparingly; summarize findings and keep source attribution precise.
- Mark stale, indirect, or marketing-heavy evidence as low confidence.
- Separate local project evidence from external domain evidence.
- Do not move to ideas until there is an evidence map.

## Output

Return an evidence map first:

```markdown
| ID | Source | Type | Finding | User/System | Pain | Confidence | Limitation |
| --- | --- | --- | --- | --- | --- | --- | --- |
```

End with evidence gaps and recommended next searches.

## Reference

Read `references/source-quality.md` when deciding how much weight a source deserves.
