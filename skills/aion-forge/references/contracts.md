# AION-FORGE Contracts

Use these compact contracts when structured output is useful.

## Evidence Item

```json
{
  "id": "EV-001",
  "source_type": "official_doc",
  "source": "URL or local path",
  "date_or_version": "optional",
  "finding": "What the source says",
  "affected_user": "Who or what is affected",
  "pain_point": "Pain implied by this evidence",
  "severity": "low|medium|high|critical|unknown",
  "frequency": "known value or unknown",
  "confidence": "low|medium|high",
  "limitation": "Why this evidence may not fully apply"
}
```

## Pain Point

```json
{
  "id": "PP-001",
  "affected_actor": "user/system",
  "workflow": "task being attempted",
  "blocker": "what prevents success",
  "cost": "time, risk, money, errors, toil, delay",
  "workaround": "current workaround",
  "workaround_gap": "why workaround is insufficient",
  "evidence": ["EV-001"],
  "type": ["operational_pain"],
  "confidence": "medium"
}
```

## Feature Candidate

```json
{
  "feature_name": "Alarm Review Queue",
  "domain": "ICU telemetry",
  "problem_solved": "Operators need to review unresolved alarms by severity and device.",
  "evidence": [
    {
      "source": "EV-001",
      "finding": "Alarm reviewability is required for safe operations.",
      "confidence": "medium",
      "limitation": "Needs validation in local workflow."
    }
  ],
  "mvp_scope": ["severity filter", "acknowledge state", "operator note"],
  "out_of_scope": ["AI diagnosis", "automatic treatment recommendation"],
  "engineering_notes": {
    "data_model": ["alarm_event", "acknowledgement state"],
    "api": ["GET /alarms", "POST /alarms/{id}/acknowledge"],
    "security": ["role-based acknowledgement", "audit log"]
  },
  "risks": ["incorrect severity mapping"],
  "validation": ["measure time to find unresolved critical alarms"],
  "scores": {
    "evidence_strength": 4,
    "user_pain": 5,
    "workflow_fit": 5,
    "feasibility": 4,
    "operational_value": 5,
    "complexity": 2,
    "maintenance_risk": 2,
    "safety_risk": 3
  },
  "decision": "build_now",
  "confidence": "medium-high"
}
```

## Memory Item

```json
{
  "memory_type": "useful_pattern",
  "insight": "Short reusable lesson",
  "domain": "where it applies",
  "evidence": ["EV-001", "VAL-001"],
  "observed_at": "YYYY-MM-DD or version",
  "confidence": "low|medium|high",
  "validated_by": "person, test, study, or review",
  "applies_when": ["conditions"],
  "does_not_apply_when": ["boundaries"],
  "failure_examples": ["counterexample"],
  "review_status": "draft|reviewed|deprecated"
}
```
