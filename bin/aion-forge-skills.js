#!/usr/bin/env node

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const repoRoot = path.resolve(__dirname, "..");
const sourceDir = path.join(repoRoot, "skills");

function usage() {
  return `AION-FORGE skills installer

Usage:
  npx aion-forge-skills project [--project <path>] [--force] [--dry-run]
  npx aion-forge-skills global [--codex-home <path>] [--force] [--dry-run]
  npx aion-forge-skills install --scope project|global [options]
  npx aion-forge-skills list [--json]

GitHub usage before npm publish:
  npx github:DinhLucent/aion-forge-skills project
  npx github:DinhLucent/aion-forge-skills global

Targets:
  project -> <project>/.agents/skills
  global  -> $CODEX_HOME/skills, or ~/.codex/skills when CODEX_HOME is unset
`;
}

function parseArgs(argv) {
  const args = {
    command: argv[0] || "help",
    scope: null,
    projectPath: process.cwd(),
    codexHome: process.env.CODEX_HOME || path.join(os.homedir(), ".codex"),
    force: false,
    dryRun: false,
    json: false,
  };

  if (args.command === "install") {
    args.scope = "project";
  } else if (args.command === "project" || args.command === "global") {
    args.scope = args.command;
    args.command = "install";
  }

  for (let i = 1; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];

    if (arg === "--scope") {
      args.scope = requiredValue(arg, next);
      i += 1;
    } else if (arg === "--project" || arg === "--project-path") {
      args.projectPath = requiredValue(arg, next);
      i += 1;
    } else if (arg === "--codex-home") {
      args.codexHome = requiredValue(arg, next);
      i += 1;
    } else if (arg === "--force" || arg === "-f") {
      args.force = true;
    } else if (arg === "--dry-run") {
      args.dryRun = true;
    } else if (arg === "--json") {
      args.json = true;
    } else if (arg === "--help" || arg === "-h") {
      args.command = "help";
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return args;
}

function requiredValue(flag, value) {
  if (!value || value.startsWith("--")) {
    throw new Error(`Missing value for ${flag}`);
  }
  return value;
}

function listSkills() {
  if (!fs.existsSync(sourceDir)) {
    throw new Error(`Skills source not found: ${sourceDir}`);
  }

  return fs
    .readdirSync(sourceDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function resolveTarget(args) {
  if (args.scope === "project") {
    return path.join(path.resolve(args.projectPath), ".agents", "skills");
  }

  if (args.scope === "global") {
    return path.join(path.resolve(args.codexHome), "skills");
  }

  throw new Error("Scope must be project or global");
}

function install(args) {
  const skills = listSkills();
  const targetDir = resolveTarget(args);

  console.log(`AION-FORGE install scope: ${args.scope}`);
  console.log(`Source: ${sourceDir}`);
  console.log(`Target: ${targetDir}`);

  if (args.dryRun) {
    for (const skill of skills) {
      console.log(`Would install: ${skill}`);
    }
    return;
  }

  fs.mkdirSync(targetDir, { recursive: true });

  for (const skill of skills) {
    const source = path.join(sourceDir, skill);
    const destination = path.join(targetDir, skill);

    if (fs.existsSync(destination) && !args.force) {
      console.warn(`Skipping existing skill '${skill}'. Re-run with --force to overwrite files.`);
      continue;
    }

    fs.cpSync(source, destination, {
      recursive: true,
      force: true,
      errorOnExist: false,
    });
    console.log(`Installed: ${skill}`);
  }

  console.log("Done.");
}

function main() {
  try {
    const args = parseArgs(process.argv.slice(2));

    if (args.command === "help") {
      console.log(usage());
      return;
    }

    if (args.command === "list") {
      const skills = listSkills();
      if (args.json) {
        console.log(JSON.stringify(skills, null, 2));
      } else {
        for (const skill of skills) {
          console.log(skill);
        }
      }
      return;
    }

    if (args.command === "install") {
      install(args);
      return;
    }

    throw new Error(`Unknown command: ${args.command}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.error("");
    console.error(usage());
    process.exit(1);
  }
}

main();
