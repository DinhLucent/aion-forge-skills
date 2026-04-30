#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const root = path.resolve(__dirname, "..");
const matrix = JSON.parse(fs.readFileSync(path.join(root, "evals", "test-matrix.json"), "utf8"));
const writeIndex = process.argv.indexOf("--write");
const writePath = writeIndex >= 0 ? process.argv[writeIndex + 1] : null;

function commandForShell(command) {
  if (process.platform !== "win32") return command;
  if (!command.startsWith("bash ")) return command;
  const gitBash = "C:\\Program Files\\Git\\bin\\bash.exe";
  if (fs.existsSync(gitBash)) return `"${gitBash}" ${command.slice("bash ".length)}`;
  return command;
}

function run(command) {
  const started = process.hrtime.bigint();
  const result = spawnSync(commandForShell(command), {
    cwd: root,
    shell: true,
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 10,
  });
  const elapsedSeconds = Number(process.hrtime.bigint() - started) / 1e9;

  return {
    command,
    status: result.status,
    seconds: Number(elapsedSeconds.toFixed(3)),
    stdout_bytes: Buffer.byteLength(result.stdout || ""),
    stderr_bytes: Buffer.byteLength(result.stderr || ""),
    stderr_preview: result.status === 0 ? "" : (result.stderr || result.stdout || "").slice(0, 1200),
  };
}

function budgetFor(command) {
  const budgets = matrix.performance_budgets_seconds;
  if (command.includes("npm pack")) return budgets.npm_pack_dry_run;
  if (command === "npm run check") return budgets.full_check;
  if (command.includes("--dry-run")) return budgets.single_cli_dry_run;
  if (command.includes("validate:skills")) return budgets.validate_skills;
  if (command.includes("check:python")) return budgets.single_syntax_check;
  if (command.includes("--check") || command.includes("bash -n") || command.includes("py_compile")) {
    return budgets.single_syntax_check;
  }
  return null;
}

const results = [];
for (const suite of matrix.suites) {
  for (const command of suite.commands) {
    const result = run(command);
    const budget = budgetFor(command);
    const withinBudget = budget == null ? true : result.seconds <= budget;
    results.push({
      suite: suite.id,
      purpose: suite.purpose,
      budget_seconds: budget,
      within_budget: withinBudget,
      ...result,
    });
  }
}

const failed = results.filter((result) => result.status !== 0 || !result.within_budget);
const summary = {
  generated_at: new Date().toISOString(),
  total_commands: results.length,
  failed_commands: failed.length,
  total_seconds: Number(results.reduce((sum, result) => sum + result.seconds, 0).toFixed(3)),
  results,
};

if (process.argv.includes("--json")) {
  console.log(JSON.stringify(summary, null, 2));
} else {
  console.log("AION-FORGE local benchmark");
  console.log(`Commands: ${summary.total_commands}`);
  console.log(`Total seconds: ${summary.total_seconds}`);
  for (const result of results) {
    const mark = result.status === 0 && result.within_budget ? "PASS" : "FAIL";
    const budget = result.budget_seconds == null ? "" : ` budget=${result.budget_seconds}s`;
    console.log(`${mark} [${result.suite}] ${result.seconds}s${budget} :: ${result.command}`);
    if (result.stderr_preview) console.log(result.stderr_preview);
  }
}

if (writePath) {
  const outputPath = path.resolve(root, writePath);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(summary, null, 2)}\n`);
}

if (failed.length > 0) {
  process.exit(1);
}
