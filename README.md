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

## Install With npx

Before the package is published to npm, install directly from GitHub:

```bash
npx github:DinhLucent/aion-forge-skills project
npx github:DinhLucent/aion-forge-skills user
npx github:DinhLucent/aion-forge-skills admin
npx github:DinhLucent/aion-forge-skills legacy-codex
```

After npm publication, the same installer works with the package name:

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
├─ bin/
│  └─ aion-forge-skills.js
├─ evals/
│  ├─ fixtures/
│  ├─ graders/
│  ├─ prompts.csv
│  └─ run_codex_skill_evals.mjs
├─ examples/
│  └─ alarm_review_queue_candidate.json
├─ scripts/
│  ├─ install-aion-forge.ps1
│  └─ install-aion-forge.sh
├─ skills/
│  ├─ aion-forge/
│  ├─ aion-evidence-harvester/
│  ├─ aion-pain-point-distiller/
│  ├─ aion-contradiction-miner/
│  ├─ aion-idea-forge/
│  ├─ aion-skeptic-council/
│  ├─ aion-feature-spec-architect/
│  ├─ aion-evaluation-harness/
│  └─ aion-evolution-memory/
├─ package.json
└─ README.md
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

Individual checks:

```bash
npm run check:node
npm run check:format
npm run check:python
npm run check:bash
npm run validate:skills
npm run test:evaluator
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
