# Performance Audit Agent

## Mission

Measure whether local AION-FORGE tooling remains fast enough for repeated use.

## Procedure

1. Run the local benchmark script.
2. Compare timings with `evals/test-matrix.json` budgets.
3. Flag slow checks, noisy output, or commands that require network access.
4. Recommend whether checks should run on every local edit or only before publish.

## Pass Criteria

- `npm run check` finishes within the configured full-check budget.
- CLI dry-runs finish within the single dry-run budget.
- No benchmark writes files unless explicitly asked with `--write`.
