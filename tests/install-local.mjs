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

  const fullRoot = fs.mkdtempSync(path.join(os.tmpdir(), "aion forge full setup "));
  try {
    const fullSetup = run(["setup", "--scope", "project", "--project", fullRoot]);
    assertSuccess(fullSetup, "project full setup");

    const fullSkillTarget = path.join(fullRoot, ".agents", "skills");
    const fullToolkitTarget = path.join(fullRoot, ".aion-forge");
    const fullInstalled = fs
      .readdirSync(fullSkillTarget, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);

    assert(fullInstalled.length === expectedSkillCount, `full setup expected ${expectedSkillCount} skills`);
    assert(fs.existsSync(path.join(fullToolkitTarget, "package.json")), "full setup missing toolkit package.json");
    assert(fs.existsSync(path.join(fullToolkitTarget, "README.md")), "full setup missing toolkit README.md");
    assert(fs.existsSync(path.join(fullToolkitTarget, "scripts", "validate-skills.js")), "full setup missing validator");
    assert(fs.existsSync(path.join(fullToolkitTarget, "tests", "install-local.mjs")), "full setup missing local tests");
    assert(
      fs.existsSync(path.join(fullToolkitTarget, "skills", "aion-forge", "SKILL.md")),
      "full setup missing toolkit skill sources",
    );

    const fullSetupAgain = run(["setup", "--scope", "project", "--project", fullRoot]);
    assertSuccess(fullSetupAgain, "project full setup repeat");
    assert(fullSetupAgain.stderr.includes("Skipping existing toolkit"), "repeat full setup should skip existing toolkit");
  } finally {
    fs.rmSync(fullRoot, { recursive: true, force: true });
  }
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}

console.log("Local install tests passed.");
