#!/usr/bin/env python3
"""Compile Python scripts without writing __pycache__ artifacts."""

from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TARGETS = [
    ROOT / "skills/aion-evaluation-harness/scripts/evaluate_innovation_json.py",
    ROOT / "skills/aion-forge/scripts/evaluate_innovation_json.py",
]


def main() -> int:
    for target in TARGETS:
        source = target.read_text(encoding="utf-8")
        compile(source, str(target), "exec")
        print(f"{target.relative_to(ROOT)}: syntax ok")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
