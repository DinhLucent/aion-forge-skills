#!/usr/bin/env node

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const evaluator = path.join(
  root,
  "skills",
  "aion-evaluation-harness",
  "scripts",
  "evaluate_innovation_json.py"
);
const good = JSON.parse(fs.readFileSync(path.join(root, "examples", "alarm_review_queue_candidate.json"), "utf8"));

function runCase(name, value) {
  const tempFile = path.join(os.tmpdir(), `aion-${process.pid}-${name}.json`);
  fs.writeFileSync(tempFile, `${JSON.stringify(value, null, 2)}\n`);
  try {
    return spawnSync("python", [evaluator, tempFile], {
      cwd: root,
      encoding: "utf8",
    });
  } finally {
    fs.rmSync(tempFile, { force: true });
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const pass = runCase("pass", good);
assert(pass.status === 0, `good candidate should pass:\n${pass.stdout}\n${pass.stderr}`);
assert(JSON.parse(pass.stdout)[0].decision === "pass", "good candidate should report pass");

const warningOnly = structuredClone(good);
delete warningOnly.evidence[0].limitation;
const warning = runCase("warning", warningOnly);
assert(warning.status === 0, `warning-only candidate should not fail:\n${warning.stdout}\n${warning.stderr}`);
assert(JSON.parse(warning.stdout)[0].decision === "pass_with_warnings", "warning candidate should report warnings");

const missingEvidence = structuredClone(good);
missingEvidence.evidence = [];
const failEvidence = runCase("missing-evidence", missingEvidence);
assert(failEvidence.status !== 0, "missing evidence should fail");
assert(JSON.parse(failEvidence.stdout)[0].hard_failures.includes("missing_or_empty:evidence"), "missing evidence failure not reported");

const badScore = structuredClone(good);
badScore.scores.evidence_strength = 7;
const failScore = runCase("bad-score", badScore);
assert(failScore.status !== 0, "out-of-range score should fail");
assert(JSON.parse(failScore.stdout)[0].hard_failures.includes("invalid_score:evidence_strength"), "bad score failure not reported");

const mixed = runCase("mixed-list", [good, missingEvidence]);
assert(mixed.status !== 0, "mixed list with bad candidate should fail");
assert(JSON.parse(mixed.stdout).length === 2, "mixed list should return two reports");

console.log("JSON evaluator regression tests passed.");
