---
name: aion-evaluation-harness
description: Evaluates AION-FORGE innovation outputs for evidence grounding, problem clarity, novelty, usefulness, workflow fit, feasibility, risk awareness, MVP sharpness, validation quality, rejection quality, and hallucination failures. Use when Codex needs to score feature candidates, audit an agent trajectory, or regression-test innovation prompts.
---

# AION Evaluation Harness

Evaluate the path, not only the final idea. Good output must show how evidence became engineering decisions.

## Rubric

Score 1 to 5:

1. Evidence grounding
2. Problem clarity
3. Novelty
4. Practical usefulness
5. Workflow fit
6. Engineering feasibility
7. Risk awareness
8. MVP sharpness
9. Validation quality
10. Rejection quality

## Automatic Failure

Fail the output if it:

- invents a source
- uses a fake statistic
- has no evidence map
- has no real pain point
- has no engineering notes
- has no risk analysis
- recommends high-risk automation without validation
- suggests a generic AI chatbot without workflow value
- skips rejected ideas entirely when brainstorming many candidates

## Procedure

1. Check hard failures first.
2. Verify every recommended idea maps to evidence and pain.
3. Check whether contradictions are explicit.
4. Score the rubric.
5. Review MVP boundaries and out-of-scope items.
6. Review safety, compliance, maintenance, and data risks.
7. Return decision: pass, pass with gaps, or fail.

## Script

When a feature candidate is available as JSON, run:

```bash
python scripts/evaluate_innovation_json.py path/to/candidate.json
```

The script checks required fields, hard-failure indicators, and the AION weighted score.

Read `references/evaluation-rubric.md` and `references/test-cases.json` for regression cases.
