#!/usr/bin/env node

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const repoRoot = path.resolve(__dirname, "..");
const sourceDir = path.join(repoRoot, "skills");
const toolkitEntries = [
  "bin",
  "evals",
  "examples",
  "scripts",
  "skills",
  "tests",
  "README.md",
  "LICENSE",
  "package.json",
  ".npmignore",
];

function usage() {
  return `AION-FORGE skills installer

Usage:
  npx aion-forge-skills project [--project <path>] [--force] [--dry-run]
  npx aion-forge-skills user [--home <path>] [--force] [--dry-run]
  npx aion-forge-skills admin [--force] [--dry-run]
  npx aion-forge-skills legacy-codex [--home <path>] [--force] [--dry-run]
  npx aion-forge-skills install --scope project|user|admin|legacy-codex [options]
  npx aion-forge-skills setup --scope project|user|admin|legacy-codex [options]
  npx aion-forge-skills list [--json]

GitHub usage before npm publish:
  npx github:DinhLucent/aion-forge-skills project
  npx github:DinhLucent/aion-forge-skills user
  npx github:DinhLucent/aion-forge-skills setup --scope project

Targets:
  project -> <project>/.agents/skills
  user    -> ~/.agents/skills
  admin   -> /etc/codex/skills
  legacy-codex -> ~/.codex/skills

Full setup toolkit targets:
  project -> <project>/.aion-forge
  user    -> ~/.aion-forge
  admin   -> /etc/codex/aion-forge
  legacy-codex -> ~/.codex/aion-forge
`;
}

function parseArgs(argv) {
  const args = {
    command: argv[0] || "help",
    scope: null,
    projectPath: process.cwd(),
    homePath: os.homedir(),
    force: false,
    dryRun: false,
    json: false,
  };

  if (args.command === "install" || args.command === "setup") {
    args.scope = "project";
  } else if (
    args.command === "project" ||
    args.command === "user" ||
    args.command === "admin" ||
    args.command === "legacy-codex"
  ) {
    args.scope = args.command;
    args.command = "install";
  } else if (args.command === "global") {
    args.scope = "user";
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
    } else if (arg === "--home") {
      args.homePath = requiredValue(arg, next);
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

  if (args.scope === "global") {
    args.scope = "user";
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

  if (args.scope === "user") {
    return path.join(path.resolve(args.homePath), ".agents", "skills");
  }

  if (args.scope === "admin") {
    return "/etc/codex/skills";
  }

  if (args.scope === "legacy-codex") {
    return path.join(path.resolve(args.homePath), ".codex", "skills");
  }

  throw new Error("Scope must be project, user, admin, or legacy-codex");
}

function resolveToolkitTarget(args) {
  if (args.scope === "project") {
    return path.join(path.resolve(args.projectPath), ".aion-forge");
  }

  if (args.scope === "user") {
    return path.join(path.resolve(args.homePath), ".aion-forge");
  }

  if (args.scope === "admin") {
    return "/etc/codex/aion-forge";
  }

  if (args.scope === "legacy-codex") {
    return path.join(path.resolve(args.homePath), ".codex", "aion-forge");
  }

  throw new Error("Scope must be project, user, admin, or legacy-codex");
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

function installToolkit(args) {
  const targetDir = resolveToolkitTarget(args);

  console.log(`AION-FORGE toolkit target: ${targetDir}`);

  if (args.dryRun) {
    for (const entry of toolkitEntries) {
      if (fs.existsSync(path.join(repoRoot, entry))) {
        console.log(`Would copy toolkit entry: ${entry}`);
      }
    }
    return;
  }

  if (fs.existsSync(targetDir)) {
    if (!args.force) {
      console.warn(`Skipping existing toolkit '${targetDir}'. Re-run with --force to overwrite files.`);
      return;
    }

    fs.rmSync(targetDir, { recursive: true, force: true });
  }

  fs.mkdirSync(targetDir, { recursive: true });

  for (const entry of toolkitEntries) {
    const source = path.join(repoRoot, entry);
    const destination = path.join(targetDir, entry);

    if (!fs.existsSync(source)) {
      continue;
    }

    fs.cpSync(source, destination, {
      recursive: true,
      force: true,
      errorOnExist: false,
    });
    console.log(`Copied toolkit entry: ${entry}`);
  }

  console.log("Toolkit setup done.");
}

function setup(args) {
  install(args);
  installToolkit(args);
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

    if (args.command === "setup") {
      setup(args);
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
