#!/usr/bin/env node

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const bin = path.join(root, "bin", "aion-forge-skills.js");
const expectedSkills = [
  "aion-contradiction-miner",
  "aion-evaluation-harness",
  "aion-evidence-harvester",
  "aion-evolution-memory",
  "aion-feature-spec-architect",
  "aion-forge",
  "aion-idea-forge",
  "aion-pain-point-distiller",
  "aion-skeptic-council",
];

function run(args) {
  return spawnSync(process.execPath, [bin, ...args], {
    cwd: root,
    encoding: "utf8",
  });
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function assertSuccess(result, label) {
  assert(result.status === 0, `${label} failed:\n${result.stderr}\n${result.stdout}`);
}

const list = run(["list", "--json"]);
assertSuccess(list, "list --json");
const skills = JSON.parse(list.stdout);
assert(JSON.stringify(skills) === JSON.stringify(expectedSkills), "skill list mismatch");

const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "aion forge cli "));
try {
  const project = run(["project", "--project", tempRoot, "--dry-run"]);
  assertSuccess(project, "project dry-run");
  assert(project.stdout.includes(path.join(tempRoot, ".agents", "skills")), "project target mismatch");
  assert(!fs.existsSync(path.join(tempRoot, ".agents")), "project dry-run wrote files");

  const user = run(["user", "--home", tempRoot, "--dry-run"]);
  assertSuccess(user, "user dry-run");
  assert(user.stdout.includes(path.join(tempRoot, ".agents", "skills")), "user target mismatch");
  assert(!fs.existsSync(path.join(tempRoot, ".agents")), "user dry-run wrote files");

  const legacy = run(["legacy-codex", "--home", tempRoot, "--dry-run"]);
  assertSuccess(legacy, "legacy dry-run");
  assert(legacy.stdout.includes(path.join(tempRoot, ".codex", "skills")), "legacy target mismatch");
  assert(!fs.existsSync(path.join(tempRoot, ".codex")), "legacy dry-run wrote files");

  const globalAlias = run(["install", "--scope", "global", "--home", tempRoot, "--dry-run"]);
  assertSuccess(globalAlias, "global alias dry-run");
  assert(globalAlias.stdout.includes("install scope: user"), "global alias should map to user");

  const admin = run(["admin", "--dry-run"]);
  assertSuccess(admin, "admin dry-run");
  assert(admin.stdout.includes("/etc/codex/skills"), "admin target mismatch");

  const badArg = run(["project", "--unknown"]);
  assert(badArg.status !== 0, "unknown args should fail");

  const missingValue = run(["project", "--project"]);
  assert(missingValue.status !== 0, "missing flag value should fail");
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}

console.log("CLI smoke tests passed.");
