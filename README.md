# AION-FORGE Skills

Reality-grounded innovation skills for Codex and AI engineering agents.

AION-FORGE is a skill pack for teams that do not want AI to generate random feature ideas. It forces the agent to start from evidence, extract real pain points, mine contradictions, challenge weak proposals, and leave behind engineering-ready specifications.

```text
Evidence -> Pain Point -> Contradiction -> Opportunity -> Feature Hypothesis
-> Skeptic Review -> Engineering Spec -> Validation Plan -> Learning Memory
```

## Why This Exists

Most AI ideation workflows optimize for fluent output. AION-FORGE optimizes for trustworthy decisions.

> Useful innovation does not start with imagination alone. It starts with pressure from reality.

Every feature recommendation must trace back to at least one concrete source: official documentation, standards, papers, GitHub issues, changelogs, customer complaints, workflow observations, incident reports, competitor behavior, or internal project notes.

If evidence is weak, AION-FORGE makes the weakness visible instead of hiding it behind confident prose.

## Included Skills

| Skill | Purpose |
|-------|---------|
| `aion-forge` | Master workflow for evidence-grounded innovation and engineering specs |
| `aion-evidence-harvester` | Collect and rank real-world evidence before ideation |
| `aion-pain-point-distiller` | Convert evidence into concrete user/system pain points |
| `aion-contradiction-miner` | Find TRIZ-style tensions that create meaningful opportunities |
| `aion-idea-forge` | Generate feature hypotheses only after evidence and pain are known |
| `aion-skeptic-council` | Challenge ideas for evidence, feasibility, risk, scope, and usefulness |
| `aion-feature-spec-architect` | Convert approved hypotheses into engineering-ready specs |
| `aion-evaluation-harness` | Score innovation outputs and detect hallucinated or weak proposals |
| `aion-evolution-memory` | Store validated lessons, rejected ideas, constraints, and reusable patterns |

## Quickstart

Install interactively with the `skills` CLI (compatible with `mattpocock/skills`):

```bash
npx skills@latest add DinhLucent/aion-forge-skills
```

Install every AION-FORGE skill into the current project for Codex:

```bash
npx skills@latest add DinhLucent/aion-forge-skills --skill '*' --agent codex --yes --copy
```

This installs skills into `<project>/.agents/skills/`.

### Full Toolkit Setup

Install both agent skills and the full local toolkit:

```bash
# Before npm publication
npx github:DinhLucent/aion-forge-skills setup --scope project

# After npm publication
npx aion-forge-skills setup --scope project

# User-level setup
npx aion-forge-skills setup --scope user
```

## AION Installer

Deterministic installer for all scopes:

```bash
# Install commands (before npm publication, use github:DinhLucent/aion-forge-skills)
npx aion-forge-skills project              # -> <project>/.agents/skills
npx aion-forge-skills user                 # -> ~/.agents/skills
npx aion-forge-skills admin                # -> /etc/codex/skills
npx aion-forge-skills legacy-codex         # -> ~/.codex/skills
```

Aliases: `aion-forge project`, `aion-forge user`, etc.

### Options

```bash
npx aion-forge-skills list [--json]                              # List available skills
npx aion-forge-skills project [--project <path>] [--force] [--dry-run]
npx aion-forge-skills install --scope project|user|admin|legacy-codex
npx aion-forge-skills setup --scope project|user                 # Skills + toolkit
```

`global` is accepted as a backward-compatible alias for `user`.

### Install With Local Scripts

```powershell
# PowerShell
.\scripts\install-aion-forge.ps1 -Scope project -ProjectPath .
.\scripts\install-aion-forge.ps1 -Scope user
```

```bash
# Bash
./scripts/install-aion-forge.sh project .
./scripts/install-aion-forge.sh user
```

## Usage

Master pipeline:

```text
Use $ion-forge to discover useful features for our medical device telemetry dashboard.
```

Focused modules:

```text
Use $ion-evidence-harvester to gather evidence before proposing LIS/HIS integration features.
Use $ion-skeptic-council to review these candidate features and decide build/prototype/reject.
Use $ion-feature-spec-architect to turn the approved idea into an engineering spec.
Use $ion-evaluation-harness to score this feature candidate JSON.
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

Approved engineering specs include: problem solved, evidence summary, user story, MVP scope, out of scope, UX behavior, API impact, data model impact, permission and security impact, logging and audit impact, failure modes and edge cases, rollout strategy, validation method, success metrics, and confidence level.

## Evaluation Harness

JSON checker for feature candidates:

```bash
python skills/aion-evaluation-harness/scripts/evaluate_innovation_json.py examples/alarm_review_queue_candidate.json
```

Expected result:

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
aion-forge-skills/
  bin/
    aion-forge-skills.js          npx installer CLI
  evals/
    fixtures/                     Good/bad sample outputs for grader tests
    graders/                      Deterministic output graders
    subagents/                    Sub-agent role prompts
    run_codex_skill_evals.mjs     Fixture-based grader validation
    run_subagent_matrix.mjs       Sub-agent contract validation
    test-matrix.json              Performance budgets and test suites
  examples/
    alarm_review_queue_candidate.json
  scripts/
    check-bash-syntax.js          Bash shebang and syntax check
    check-format.js               Format and minification checks
    check_python_syntax.py        Python compile check without __pycache__
    clean-python-cache.js         Remove __pycache__ directories
    install-aion-forge.ps1        PowerShell installer
    install-aion-forge.sh         Bash installer
    run-local-benchmarks.js       Performance budget runner
    validate-skills.js            Skill structure and frontmatter validator
  skills/
    aion-forge/                   Master workflow skill
    aion-evidence-harvester/      Evidence collection skill
    aion-pain-point-distiller/    Pain point extraction skill
    aion-contradiction-miner/     TRIZ contradiction mining skill
    aion-idea-forge/              Hypothesis generation skill
    aion-skeptic-council/         Multi-perspective review skill
    aion-feature-spec-architect/  Engineering spec generation skill
    aion-evaluation-harness/      Scoring and hallucination detection skill
    aion-evolution-memory/        Learning persistence skill
  tests/
    cli-smoke.mjs                 CLI argument parsing and dry-run tests
    install-local.mjs             Real install, skip-existing, force tests
    json-evaluator.mjs            Evaluator pass/warning/fail regression tests
    package-integrity.mjs         Tarball size and forbidden artifact checks
```

## Development

```bash
npm run list              # List skills
npm run check             # Full local check suite
npm run validate:skills   # Validate skill structure
npm run test:local        # All local tests
npm run bench             # Performance benchmarks
```

Individual checks:

```bash
npm run check:node        # Node.js syntax check
npm run check:format      # Format and shebang checks
npm run check:python      # Python compile check
npm run check:bash        # Bash syntax check
npm run test:evaluator    # Grader fixture tests
npm run test:subagents    # Sub-agent contract tests
npm run test:json         # JSON evaluator regression
npm run test:cli          # CLI smoke tests
npm run test:install      # Local install tests
npm run test:package      # Package integrity tests
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

MIT License. See [LICENSE](LICENSE).
