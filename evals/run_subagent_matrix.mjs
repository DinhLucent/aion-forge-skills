#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const matrixPath = path.join(root, "evals", "test-matrix.json");
const matrix = JSON.parse(fs.readFileSync(matrixPath, "utf8"));

const requiredSections = ["Mission", "Procedure", "Pass Criteria"];
const failures = [];

for (const role of matrix.subagent_roles) {
  const file = path.join(root, "evals", "subagents", `${role}.md`);
  if (!fs.existsSync(file)) {
    failures.push(`${role}: missing role prompt`);
    continue;
  }

  const content = fs.readFileSync(file, "utf8");
  if (!content.includes("\n")) {
    failures.push(`${role}: role prompt is one-line/minified`);
  }

  for (const section of requiredSections) {
    if (!content.includes(`## ${section}`)) {
      failures.push(`${role}: missing ${section} section`);
    }
  }
}

for (const suite of matrix.suites) {
  if (!suite.id || !suite.purpose || !Array.isArray(suite.commands) || suite.commands.length === 0) {
    failures.push(`suite:${suite.id || "<unknown>"} invalid suite contract`);
  }
}

if (failures.length > 0) {
  for (const failure of failures) console.error(failure);
  process.exit(1);
}

console.log(`Validated ${matrix.subagent_roles.length} sub-agent role prompts.`);
console.log(`Validated ${matrix.suites.length} local test suites.`);
