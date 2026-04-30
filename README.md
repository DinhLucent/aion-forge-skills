# AION-FORGE Skills

Reality-grounded innovation skills for Codex and AI engineering agents.

AION-FORGE is a skill pack for teams that do not want AI to generate random feature ideas. It forces the agent to start from evidence, extract real pain points, mine contradictions, challenge weak proposals, and leave behind engineering-ready specifications.

```text
Evidence -> Pain Point -> Contradiction -> Opportunity -> Feature Hypothesis
-> Skeptic Review -> Engineering Spec -> Validation Plan -> Learning Memory
```

## Why This Exists

Most AI ideation workflows optimize for fluent output. AION-FORGE optimizes for trustworthy decisions.

The core belief:

> Useful innovation does not start with imagination alone. It starts with pressure from reality.

Every feature recommendation must trace back to at least one concrete source: official documentation, standards, papers, GitHub issues, changelogs, customer complaints, workflow observations, incident reports, competitor behavior, or internal project notes.

If evidence is weak, AION-FORGE makes the weakness visible instead of hiding it behind confident prose.

## Included Skills

| Skill | Purpose |
| --- | --- |
| `aion-forge` | Master workflow for evidence-grounded innovation and engineering specs. |
| `aion-evidence-harvester` | Collect and rank real-world evidence before ideation. |
| `aion-pain-point-distiller` | Convert evidence into concrete user/system pain points. |
| `aion-contradiction-miner` | Find TRIZ-style tensions that create meaningful opportunities. |
| `aion-idea-forge` | Generate feature hypotheses only after evidence and pain are known. |
| `aion-skeptic-council` | Challenge ideas for evidence, feasibility, risk, scope, and usefulness. |
| `aion-feature-spec-architect` | Convert approved hypotheses into engineering-ready specs. |
| `aion-evaluation-harness` | Score innovation outputs and detect hallucinated or weak proposals. |
| `aion-evolution-memory` | Store validated lessons, rejected ideas, constraints, and reusable patterns. |

## Quickstart

Install interactively with the same `skills` CLI flow used by repositories such as `mattpocock/skills`:

```bash
npx skills@latest add DinhLucent/aion-forge-skills
```

List the available skills without installing:

```bash
npx skills@latest add DinhLucent/aion-forge-skills --list
```

Install every AION-FORGE skill into the current project for Codex without prompts:

```bash
npx skills@latest add DinhLucent/aion-forge-skills --skill '*' --agent codex --yes --copy
```

This installs the skills into:

```text
<project>/.agents/skills/
```

The `skills` CLI installs the skill folders and the resources bundled inside each skill. It does not install this repository's root-level development files such as `README.md`, `package.json`, `bin/`, `tests/`, or root `scripts/`.

Use the interactive command when you want to choose individual skills or target multiple agents. Use the non-interactive command when you want a repeatable project install for Codex.

### What Should Be Installed

A complete Codex project install should create these directories:

```text
<project>/.agents/skills/aion-contradiction-miner/
<project>/.agents/skills/aion-evaluation-harness/
<project>/.agents/skills/aion-evidence-harvester/
<project>/.agents/skills/aion-evolution-memory/
<project>/.agents/skills/aion-feature-spec-architect/
<project>/.agents/skills/aion-forge/
<project>/.agents/skills/aion-idea-forge/
<project>/.agents/skills/aion-pain-point-distiller/
<project>/.agents/skills/aion-skeptic-council/
```

Each installed skill directory should include its own `SKILL.md` and any bundled `agents/`, `references/`, or `scripts/` files from that skill folder.

### Full Toolkit Setup

If you want the complete AION-FORGE tool setup, use the AION installer instead of the generic `skills` CLI. This installs both:

- agent skills into `<project>/.agents/skills/`
- the full local toolkit into `<project>/.aion-forge/`

The toolkit includes `bin/`, `evals/`, `examples/`, `scripts/`, `tests/`, `skills/`, `package.json`, `README.md`, and `LICENSE`.

Before npm publication:

```bash
npx github:DinhLucent/aion-forge-skills setup --scope project
```

After npm publication:

```bash
npx aion-forge-skills setup --scope project
```

For a user-level setup:

```bash
npx github:DinhLucent/aion-forge-skills setup --scope user
```

This installs skills into `~/.agents/skills/` and the toolkit into `~/.aion-forge/`.

## AION Installer

This repository also ships a deterministic installer for Codex-specific scopes and older local setups. Before the package is published to npm, run it directly from GitHub:

```bash
npx github:DinhLucent/aion-forge-skills project
npx github:DinhLucent/aion-forge-skills user
npx github:DinhLucent/aion-forge-skills admin
npx github:DinhLucent/aion-forge-skills legacy-codex
```

After npm publication, the same installer will work with the package name:

```bash
npx aion-forge-skills project
npx aion-forge-skills user
npx aion-forge-skills admin
npx aion-forge-skills legacy-codex
```

Aliases are also available:

```bash
npx aion-forge project
npx aion-forge user
npx aion-forge admin
npx aion-forge legacy-codex
```

### Project Install

Installs skills into the current project's agent skill directory:

```text
<project>/.agents/skills/
```

Use a different project path:

```bash
npx github:DinhLucent/aion-forge-skills project --project /path/to/project
```

### User Install

Installs skills into the current user's Codex skill directory:

```text
~/.agents/skills/
```

This is the recommended personal install target for current Codex Agent Skills.

### Admin Install

Installs skills into the machine-wide Codex skill directory:

```text
/etc/codex/skills/
```

This may require elevated filesystem permissions.

### Legacy Codex Install

For older Codex setups, install into the legacy Codex home:

```text
~/.codex/skills/
```

Legacy install is kept only for older local setups that still read from `~/.codex/skills`.

### Installer Options

```bash
npx github:DinhLucent/aion-forge-skills list
npx github:DinhLucent/aion-forge-skills list --json
npx github:DinhLucent/aion-forge-skills project --dry-run
npx github:DinhLucent/aion-forge-skills project --force
npx github:DinhLucent/aion-forge-skills install --scope project
npx github:DinhLucent/aion-forge-skills install --scope user
npx github:DinhLucent/aion-forge-skills install --scope admin
npx github:DinhLucent/aion-forge-skills install --scope legacy-codex
npx github:DinhLucent/aion-forge-skills setup --scope project
npx github:DinhLucent/aion-forge-skills setup --scope user
```

`global` is accepted as a backward-compatible alias for `user`.

## Install With Local Scripts

PowerShell:

```powershell
.\scripts\install-aion-forge.ps1 -Scope project -ProjectPath .
.\scripts\install-aion-forge.ps1 -Scope user
.\scripts\install-aion-forge.ps1 -Scope admin
.\scripts\install-aion-forge.ps1 -Scope legacy-codex
```

Bash:

```bash
./scripts/install-aion-forge.sh project .
./scripts/install-aion-forge.sh user
./scripts/install-aion-forge.sh admin
./scripts/install-aion-forge.sh legacy-codex
```

## Usage

Use the master skill for the full pipeline:

```text
Use $aion-forge to discover useful features for our medical device telemetry dashboard.
```

Use a focused module when the task is narrower:

```text
Use $aion-evidence-harvester to gather evidence before proposing LIS/HIS integration features.
Use $aion-skeptic-council to review these candidate features and decide build/prototype/reject.
Use $aion-feature-spec-architect to turn the approved idea into an engineering spec.
Use $aion-evaluation-harness to score this feature candidate JSON.
```

## Output Standard

AION-FORGE expects recommendations to follow this order:

```markdown
## Arena
## Evidence Map
## Pain Points
## Contradictions
## Candidate Ideas
## Skeptic Council
## Approved Engineering Specs
## Validation Plan
## Memory Updates
## Rejected Ideas
```

Approved engineering specs include:

- Problem solved
- Evidence summary
- User story
- MVP scope
- Out of scope
- UX behavior
- API impact
- Data model impact
- Permission and security impact
- Logging and audit impact
- Failure modes and edge cases
- Rollout strategy
- Validation method
- Success metrics
- Confidence level

## Evaluation Harness

The pack includes a small JSON checker for feature candidates:

```bash
python skills/aion-evaluation-harness/scripts/evaluate_innovation_json.py examples/alarm_review_queue_candidate.json
```

Expected result for the included example:

```json
[
  {
    "feature_name": "Alarm Review Queue",
    "decision": "pass",
    "final_score": 27,
    "hard_failures": [],
    "warnings": []
  }
]
```

The harness fails candidates that have no evidence map, no real pain point, no engineering notes, no risk analysis, invalid scores, or missing validation.

## Scoring Model

```text
Final Score =
  2 * Evidence Strength
+ 2 * User Pain
+ 2 * Workflow Fit
+ 1 * Feasibility
+ 1 * Operational Value
- 1 * Complexity
- 1 * Maintenance Risk
- 2 * Safety/Compliance Risk
```

Decision classes:

- `build_now`: strong evidence, high pain, narrow MVP, bounded risk.
- `prototype`: plausible value, but workflow/data/risk assumptions need testing.
- `research_more`: problem may be real, but evidence is incomplete.
- `reject`: weak evidence, cosmetic value, unsafe automation, or excessive complexity.

## Repository Structure

```text
.
|-- bin/
|   `-- aion-forge-skills.js
|-- evals/
|   |-- fixtures/
|   |-- graders/
|   |-- subagents/
|   |-- prompts.csv
|   |-- run_codex_skill_evals.mjs
|   |-- run_subagent_matrix.mjs
|   `-- test-matrix.json
|-- examples/
|   `-- alarm_review_queue_candidate.json
|-- scripts/
|   |-- check-bash-syntax.js
|   |-- check-format.js
|   |-- check_python_syntax.py
|   |-- clean-python-cache.js
|   |-- install-aion-forge.ps1
|   |-- install-aion-forge.sh
|   |-- run-local-benchmarks.js
|   `-- validate-skills.js
|-- skills/
|   |-- aion-forge/
|   |-- aion-evidence-harvester/
|   |-- aion-pain-point-distiller/
|   |-- aion-contradiction-miner/
|   |-- aion-idea-forge/
|   |-- aion-skeptic-council/
|   |-- aion-feature-spec-architect/
|   |-- aion-evaluation-harness/
|   `-- aion-evolution-memory/
|-- tests/
|   |-- cli-smoke.mjs
|   |-- install-local.mjs
|   |-- json-evaluator.mjs
|   `-- package-integrity.mjs
|-- LICENSE
|-- package.json
`-- README.md
```

## Development

List skills:

```bash
npm run list
```

Run the full local check suite:

```bash
npm run check
```

This repository intentionally uses local checks instead of GitHub Actions so the validation path remains usable without paid Actions minutes.

Individual checks:

```bash
npm run check:node
npm run check:format
npm run check:python
npm run check:bash
npm run validate:skills
npm run test:evaluator
npm run test:subagents
npm run test:json
npm run test:cli
npm run test:install
npm run test:package
npm run test:local
npm run bench
```

The local suites cover:

- `test:cli`: command parsing, install scopes, dry-run behavior, bad args, and path handling.
- `test:install`: real install into a temporary project directory, skip-existing behavior, and `--force`.
- `test:json`: evaluator pass, warning, hard-fail, score, and multi-candidate behavior.
- `test:package`: package contents, tarball size, and forbidden artifact checks.
- `test:subagents`: sub-agent role prompt contracts and local test matrix integrity.
- `bench`: runtime budgets for syntax, validation, CLI dry-runs, evaluator tests, install tests, and package checks.

Benchmark output can be written locally without committing generated reports:

```bash
npm run bench -- --write reports/local-benchmark.json
```

Pack locally:

```bash
npm pack
```

Run an npx-style local test:

```bash
node bin/aion-forge-skills.js project --dry-run
node bin/aion-forge-skills.js user --dry-run
node bin/aion-forge-skills.js admin --dry-run
node bin/aion-forge-skills.js legacy-codex --dry-run
```

## Safety Philosophy

AION-FORGE is intentionally skeptical. It rejects:

- Invented sources or fake statistics.
- Feature lists that appear before problem analysis.
- Generic AI chatbot ideas without workflow evidence.
- High-risk automation without validation, auditability, and rollback.
- Broad MVPs that hide platform rewrites.
- Ideas that increase maintenance burden without clear operational value.

## Agent Oath

```text
I do not create features from imagination alone.
I discover pressure in reality, extract contradiction, forge useful solutions,
and leave behind engineering clarity.
```

## License

MIT
