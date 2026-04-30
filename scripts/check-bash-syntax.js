#!/usr/bin/env node

const fs = require("node:fs");
const { spawnSync } = require("node:child_process");

const script = "scripts/install-aion-forge.sh";
const content = fs.readFileSync(script, "utf8");

if (!content.startsWith("#!/usr/bin/env bash\n")) {
  console.error(`${script}: shebang must be the first standalone line`);
  process.exit(1);
}

const bash = spawnSync("bash", ["-n", script], {
  encoding: "utf8",
  shell: process.platform === "win32",
});

if (bash.status === 0) {
  console.log(`${script}: bash -n passed`);
  process.exit(0);
}

const missingBash =
  bash.error ||
  /not found|No such file|cannot find|execvpe/i.test(`${bash.stderr}\n${bash.stdout}`);

if (missingBash) {
  console.warn(`${script}: bash not available; static shebang/newline check passed`);
  process.exit(0);
}

process.stderr.write(bash.stderr || bash.stdout);
process.exit(bash.status || 1);
