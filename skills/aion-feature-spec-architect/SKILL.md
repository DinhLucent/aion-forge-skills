---
name: aion-feature-spec-architect
description: Converts validated AION-FORGE feature hypotheses into engineering-ready specs. Use when Codex needs to write implementable specs with UX behavior, API impact, data model impact, permissions, security, logging, audit, edge cases, rollout, validation, metrics, and confidence.
---

# AION Feature Spec Architect

Turn approved feature hypotheses into specs that engineers can build and reviewers can challenge.

## Preconditions

Only write a full spec when the idea has:

- evidence summary
- problem statement
- contradiction or trade-off addressed
- Skeptic Council decision
- MVP boundary
- risk notes

If these are missing, write a gap list first.

## Spec Template

Each spec must include:

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
- Failure modes
- Edge cases
- Rollout strategy
- Validation method
- Success metrics
- Confidence level

## Engineering Discipline

- Prefer small vertical slices over broad platform changes.
- Include migration and backward compatibility notes when data models or APIs change.
- Include observability for operational workflows.
- Add audit trails for regulated, clinical, financial, or safety-sensitive domains.
- Name non-goals so future scope creep is visible.
- Include a kill switch, rollback path, or shadow-mode plan for risky automation.

## Output

Use concise markdown for humans or the JSON contract in `references/spec-template.md` when machine validation is needed.
