#!/usr/bin/env python3
"""Evaluate an AION-FORGE feature candidate JSON file."""

from __future__ import annotations

import json
import sys
from pathlib import Path
from typing import Any

REQUIRED_FIELDS = [
    "feature_name",
    "domain",
    "problem_solved",
    "evidence",
    "mvp_scope",
    "out_of_scope",
    "engineering_notes",
    "risks",
    "validation",
    "scores",
    "decision",
    "confidence",
]

SCORE_FIELDS = [
    "evidence_strength",
    "user_pain",
    "workflow_fit",
    "feasibility",
    "operational_value",
    "complexity",
    "maintenance_risk",
    "safety_risk",
]


def as_list(value: Any) -> list[Any]:
    if value is None:
        return []
    if isinstance(value, list):
        return value
    return [value]


def evaluate_one(candidate: dict[str, Any]) -> dict[str, Any]:
    failures: list[str] = []
    warnings: list[str] = []

    for field in REQUIRED_FIELDS:
        if field not in candidate or candidate[field] in ("", [], {}, None):
            failures.append(f"missing_or_empty:{field}")

    evidence = as_list(candidate.get("evidence"))
    if not evidence:
        failures.append("no_evidence_map")
    else:
        for index, item in enumerate(evidence, start=1):
            if not isinstance(item, dict):
                warnings.append(f"evidence_{index}_not_object")
                continue
            if not item.get("source"):
                failures.append(f"evidence_{index}_missing_source")
            if not item.get("finding"):
                failures.append(f"evidence_{index}_missing_finding")
            if not item.get("confidence"):
                warnings.append(f"evidence_{index}_missing_confidence")
            if not item.get("limitation"):
                warnings.append(f"evidence_{index}_missing_limitation")

    if not candidate.get("problem_solved"):
        failures.append("no_real_pain_point")

    if not as_list(candidate.get("risks")):
        failures.append("no_risk_analysis")

    if not as_list(candidate.get("validation")):
        failures.append("no_validation_plan")

    engineering_notes = candidate.get("engineering_notes")
    if not isinstance(engineering_notes, dict) or not engineering_notes:
        failures.append("no_engineering_notes")
    else:
        for field in ("data_model", "api", "security"):
            if not as_list(engineering_notes.get(field)):
                warnings.append(f"engineering_notes_missing:{field}")

    scores = candidate.get("scores", {})
    if not isinstance(scores, dict):
        failures.append("scores_not_object")
        scores = {}

    for field in SCORE_FIELDS:
        value = scores.get(field)
        if not isinstance(value, int) or value < 1 or value > 5:
            failures.append(f"invalid_score:{field}")

    if all(isinstance(scores.get(field), int) for field in SCORE_FIELDS):
        final_score = (
            2 * scores["evidence_strength"]
            + 2 * scores["user_pain"]
            + 2 * scores["workflow_fit"]
            + scores["feasibility"]
            + scores["operational_value"]
            - scores["complexity"]
            - scores["maintenance_risk"]
            - 2 * scores["safety_risk"]
        )
    else:
        final_score = None

    decision = "fail" if failures else "pass_with_warnings" if warnings else "pass"

    return {
        "feature_name": candidate.get("feature_name", "<unnamed>"),
        "decision": decision,
        "final_score": final_score,
        "hard_failures": failures,
        "warnings": warnings,
    }


def main() -> int:
    if len(sys.argv) != 2:
        print("Usage: evaluate_innovation_json.py path/to/candidate.json", file=sys.stderr)
        return 2

    path = Path(sys.argv[1])
    data = json.loads(path.read_text(encoding="utf-8"))
    candidates = data if isinstance(data, list) else [data]
    reports = [evaluate_one(candidate) for candidate in candidates]
    print(json.dumps(reports, indent=2))
    return 1 if any(report["decision"] == "fail" for report in reports) else 0


if __name__ == "__main__":
    raise SystemExit(main())
