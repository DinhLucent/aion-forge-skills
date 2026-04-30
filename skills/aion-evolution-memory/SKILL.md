---
name: aion-evolution-memory
description: Maintains curated learning memory for innovation agents. Use when Codex needs to store validated patterns, failed ideas, strong evidence sources, reusable architectures, dangerous assumptions, validation results, or domain constraints without treating raw opinions as truth.
---

# AION Evolution Memory

Store reviewed learning, not raw opinion. Memory should improve future decisions without freezing weak assumptions into truth.

## Memory Types

Use one of:

- useful pattern
- failed idea
- strong evidence source
- reusable architecture
- dangerous assumption
- validation result
- domain-specific constraint

## Required Fields

Each memory item must include:

- insight
- domain
- evidence
- observed date or version
- confidence
- validated by whom or what
- where it applies
- where it should not apply
- failure examples
- review status

## Rules

- Do not store unsupported claims as truth.
- Mark local findings as local; do not generalize without evidence.
- Keep rejected ideas and failure examples because they prevent repeated weak proposals.
- Prefer small, specific memories over broad principles.
- Expire or revisit memory tied to changing tools, laws, APIs, prices, or product behavior.

## Output

```json
{
  "memory_type": "dangerous_assumption",
  "insight": "Alarm severity mappings must be validated locally before dashboard priority rules are trusted.",
  "domain": "medical device telemetry",
  "evidence": ["EV-003", "VAL-001"],
  "observed_at": "2026-04-30",
  "confidence": "medium",
  "validated_by": "workflow review",
  "applies_when": ["building alarm queues", "mapping device telemetry"],
  "does_not_apply_when": ["non-clinical demo dashboards"],
  "failure_examples": ["critical alarms hidden by noisy low-priority events"],
  "review_status": "reviewed"
}
```

Read `references/memory-taxonomy.md` for storage guidance.
