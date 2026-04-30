#!/usr/bin/env node

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const bin = path.join(root, "bin", "aion-forge-skills.js");
const expectedSkillCount = 9;

function run(args) {
  return spawnSync(process.execPath, [bin, ...args], {
    cwd: root,
    encoding: "utf8",
  });
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function assertSuccess(result, label) {
  assert(result.status === 0, `${label} failed:\n${result.stderr}\n${result.stdout}`);
}

const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "aion forge install "));
try {
  const firstInstall = run(["project", "--project", tempRoot]);
  assertSuccess(firstInstall, "project install");

  const target = path.join(tempRoot, ".agents", "skills");
  const installed = fs
    .readdirSync(target, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  assert(installed.length === expectedSkillCount, `expected ${expectedSkillCount} skills, got ${installed.length}`);

  for (const skill of installed) {
    assert(fs.existsSync(path.join(target, skill, "SKILL.md")), `${skill}: missing SKILL.md`);
    assert(fs.existsSync(path.join(target, skill, "agents", "openai.yaml")), `${skill}: missing agents/openai.yaml`);
  }

  const secondInstall = run(["project", "--project", tempRoot]);
  assertSuccess(secondInstall, "project reinstall without force");
  assert(secondInstall.stderr.includes("Skipping existing skill"), "reinstall should skip existing skills");

  const forcedInstall = run(["project", "--project", tempRoot, "--force"]);
  assertSuccess(forcedInstall, "project reinstall with force");
  assert(forcedInstall.stdout.includes("Installed: aion-forge"), "force install should reinstall skills");
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}

console.log("Local install tests passed.");
