# Evaluation Rubric

Score 1 to 5.

- Evidence grounding: sources are real, relevant, attributed, and limitations are stated.
- Problem clarity: pain is specific, actor-bound, and workflow-linked.
- Novelty: solution resolves a real tension, not just a generic feature.
- Practical usefulness: feature reduces workload, risk, delay, error, or maintenance.
- Workflow fit: design matches how users or systems actually operate.
- Engineering feasibility: spec names data, API, security, rollout, and dependencies.
- Risk awareness: safety, compliance, privacy, operational, and maintenance risks are explicit.
- MVP sharpness: smallest useful version is clear and non-goals are named.
- Validation quality: test plan can falsify the hypothesis.
- Rejection quality: weak ideas are rejected with reasons.

Report:

```json
{
  "decision": "pass|pass_with_gaps|fail",
  "hard_failures": [],
  "scores": {},
  "highest_risks": [],
  "required_fixes": []
}
```
