#!/usr/bin/env node

import { spawnSync } from "node:child_process";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const result = spawnSync("npm pack --dry-run --json", {
  encoding: "utf8",
  shell: true,
});

assert(result.status === 0, `npm pack failed:\n${result.stderr}\n${result.stdout}`);

const pack = JSON.parse(result.stdout)[0];
const files = pack.files.map((file) => file.path).sort();

for (const required of [
  "bin/aion-forge-skills.js",
  "evals/run_codex_skill_evals.mjs",
  "evals/run_subagent_matrix.mjs",
  "scripts/run-local-benchmarks.js",
  "skills/aion-forge/SKILL.md",
  "examples/alarm_review_queue_candidate.json",
]) {
  assert(files.includes(required), `package missing ${required}`);
}

for (const forbidden of [".env", ".git", "__pycache__", ".pyc", "node_modules"]) {
  assert(!files.some((file) => file.includes(forbidden)), `package includes forbidden artifact ${forbidden}`);
}

assert(pack.size < 100_000, `package tarball too large: ${pack.size}`);

console.log(`Package integrity tests passed (${files.length} files, ${pack.size} bytes).`);
