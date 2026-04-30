#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const script = "scripts/install-aion-forge.sh";
const content = fs.readFileSync(script, "utf8");

if (!content.startsWith("#!/usr/bin/env bash\n")) {
  console.error(`${script}: shebang must be the first standalone line`);
  process.exit(1);
}

const candidates =
  process.platform === "win32"
    ? [
        "bash",
        "C:\\Program Files\\Git\\bin\\bash.exe",
        "C:\\Program Files\\Git\\usr\\bin\\bash.exe",
      ]
    : ["bash"];

let bash = null;
let used = null;
for (const candidate of candidates) {
  bash = spawnSync(candidate, ["-n", script], {
    encoding: "utf8",
    shell: false,
  });
  used = candidate;

  const missing =
    bash.error ||
    /not found|No such file|cannot find|execvpe/i.test(`${bash.stderr}\n${bash.stdout}`);
  if (!missing) break;
}

if (bash.status === 0) {
  console.log(`${script}: bash -n passed with ${path.basename(used)}`);
  process.exit(0);
}

const missingBash =
  bash.error ||
  /not found|No such file|cannot find|execvpe/i.test(`${bash.stderr}\n${bash.stdout}`);

if (missingBash) {
  console.error(`${script}: bash not available; install Bash or Git Bash to run syntax checks`);
  process.exit(1);
}

process.stderr.write(bash.stderr || bash.stdout);
process.exit(bash.status || 1);
