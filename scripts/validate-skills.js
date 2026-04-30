#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const skillsDir = path.join(root, "skills");
const skillNamePattern = /^[a-z0-9-]+$/;
const allowedNameMismatches = new Map();

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

function parseFrontmatter(content) {
  const normalized = content.replace(/^\uFEFF/, "");
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return null;

  const fields = {};
  for (const line of match[1].split("\n")) {
    if (!line.trim()) continue;
    const separator = line.indexOf(":");
    if (separator === -1) return null;
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    fields[key] = value.replace(/^["']|["']$/g, "");
  }
  return fields;
}

if (!fs.existsSync(skillsDir)) {
  fail(`Missing skills directory: ${skillsDir}`);
  process.exit();
}

const skillDirs = fs
  .readdirSync(skillsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

for (const skillName of skillDirs) {
  const skillMd = path.join(skillsDir, skillName, "SKILL.md");
  if (!fs.existsSync(skillMd)) {
    fail(`${skillName}: missing SKILL.md`);
    continue;
  }

  const content = fs.readFileSync(skillMd, "utf8");
  const lineCount = content.split(/\r?\n/).length;
  if (lineCount < 8) {
    fail(`${skillName}: SKILL.md appears one-line/minified or too short (${lineCount} lines)`);
    continue;
  }

  const firstLine = content.split(/\r?\n/, 1)[0];
  if (firstLine !== "---") {
    fail(`${skillName}: SKILL.md must start with standalone YAML delimiter`);
    continue;
  }

  const fields = parseFrontmatter(content);
  if (!fields) {
    fail(`${skillName}: invalid YAML-like frontmatter block`);
    continue;
  }

  if (!fields.name) fail(`${skillName}: missing frontmatter name`);
  if (!fields.description) fail(`${skillName}: missing frontmatter description`);
  if (
    fields.name &&
    fields.name !== skillName &&
    allowedNameMismatches.get(skillName) !== fields.name
  ) {
    fail(`${skillName}: frontmatter name must match folder name`);
  }
  if (fields.name && !skillNamePattern.test(fields.name)) {
    fail(`${skillName}: frontmatter name must be lowercase hyphen-case`);
  }
  if (fields.description && fields.description.length < 40) {
    fail(`${skillName}: description is too short for reliable triggering`);
  }

  const openaiYaml = path.join(skillsDir, skillName, "agents", "openai.yaml");
  if (!fs.existsSync(openaiYaml)) {
    fail(`${skillName}: missing agents/openai.yaml`);
  }
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`Validated ${skillDirs.length} skills.`);
