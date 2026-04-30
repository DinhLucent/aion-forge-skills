#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

const requiredFiles = [
  "bin/aion-forge-skills.js",
  "scripts/install-aion-forge.sh",
  "scripts/install-aion-forge.ps1",
  "skills/aion-evaluation-harness/scripts/evaluate_innovation_json.py",
  "examples/alarm_review_queue_candidate.json",
  "README.md",
];

const textExtensions = new Set([
  ".js",
  ".mjs",
  ".sh",
  ".ps1",
  ".py",
  ".json",
  ".md",
  ".txt",
  ".csv",
  ".yml",
  ".yaml",
]);

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function lineCount(text) {
  return text.split(/\r?\n/).length;
}

for (const file of requiredFiles) {
  const content = read(file);
  if (lineCount(content) < 3) {
    fail(`${file}: appears one-line/minified`);
  }
}

const cli = read("bin/aion-forge-skills.js").split(/\r?\n/);
if (cli[0] !== "#!/usr/bin/env node") fail("bin/aion-forge-skills.js: invalid shebang");
if (cli[1] !== "") fail("bin/aion-forge-skills.js: line 2 must be blank");

const bash = read("scripts/install-aion-forge.sh").split(/\r?\n/);
if (bash[0] !== "#!/usr/bin/env bash") fail("scripts/install-aion-forge.sh: invalid shebang");
if (bash[1] !== "set -euo pipefail") {
  fail("scripts/install-aion-forge.sh: line 2 must be set -euo pipefail");
}

const evaluator = read("skills/aion-evaluation-harness/scripts/evaluate_innovation_json.py")
  .split(/\r?\n/);
if (evaluator[0] !== "#!/usr/bin/env python3") {
  fail("evaluate_innovation_json.py: invalid shebang");
}
if (!evaluator[1].startsWith('"""')) {
  fail("evaluate_innovation_json.py: docstring must start on line 2");
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules" || entry.name === "__pycache__") {
      continue;
    }

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (!textExtensions.has(path.extname(entry.name))) continue;

    const relativePath = path.relative(root, fullPath).replaceAll(path.sep, "/");
    const content = fs.readFileSync(fullPath, "utf8");
    if (!content.includes("\n") && content.length > 80) {
      fail(`${relativePath}: text file has no newline and looks minified`);
    }
  }
}

walk(root);

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log("Format checks passed.");
