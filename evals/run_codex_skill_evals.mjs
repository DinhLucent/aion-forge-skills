#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { checkEvidenceBeforeIdeas } from "./graders/check_evidence_before_ideas.mjs";
import { checkNoFakeSources } from "./graders/check_no_fake_sources.mjs";
import { checkRejectedIdeasPresent } from "./graders/check_rejected_ideas_present.mjs";
import { checkSkillInvoked } from "./graders/check_skill_invoked.mjs";
import { checkSpecFields } from "./graders/check_spec_fields.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fixtureOnly = process.argv.includes("--fixture-only");

function runGraders(label, text, expectedPass) {
  const checks = [
    checkSkillInvoked(text),
    checkEvidenceBeforeIdeas(text),
    checkNoFakeSources(text),
    checkRejectedIdeasPresent(text),
    checkSpecFields(text),
  ];

  const passed = checks.every((check) => check.passed);
  const ok = expectedPass ? passed : !passed;

  return {
    label,
    expectedPass,
    ok,
    checks,
  };
}

function printReport(reports) {
  for (const report of reports) {
    console.log(`${report.ok ? "PASS" : "FAIL"} ${report.label}`);
    for (const check of report.checks) {
      console.log(`  ${check.passed ? "ok" : "not ok"} ${check.name}`);
      if (!check.passed) console.log(`    ${check.message}`);
    }
  }
}

if (!fixtureOnly) {
  console.error(
    "This lightweight runner currently validates deterministic grader behavior. " +
      "Use --fixture-only in CI, or extend this file to run codex exec --json traces."
  );
  process.exit(2);
}

const good = readFileSync(
  path.join(root, "evals", "fixtures", "sample_good_output.md"),
  "utf8"
);
const bad = readFileSync(
  path.join(root, "evals", "fixtures", "sample_bad_flashy_ai_output.md"),
  "utf8"
);

const reports = [
  runGraders("sample_good_output", good, true),
  runGraders("sample_bad_flashy_ai_output", bad, false),
];

printReport(reports);

if (reports.some((report) => !report.ok)) {
  process.exit(1);
}
