/**
 * Runs the "Definition of done" checks and prints only a short summary.
 *
 * Meant for AI agents: the full output goes to build/agent-logs/last-check.log, and only a summary
 * reaches the screen. On success that is one line; on failure at most 80 lines of the failed step
 * and the path of the full log. The exit code is non-zero when a step fails.
 *
 * Usage:
 *   npm run check                  lint, typecheck, unit tests, production build
 *   npm run check -- test lint     only the given steps
 *   npm run check -- e2e           end-to-end tests, not part of the default run
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const MAX_LINES = 80;
const LOG_DIR = "build/agent-logs";
const LOG_FILE = `${LOG_DIR}/last-check.log`;
const TEST_REPORT = `${LOG_DIR}/vitest.json`;

const STEPS = {
  lint: "npx biome check --reporter=concise",
  typecheck: "npx next typegen && npx tsc --noEmit",
  test: `npx vitest run --reporter=default --reporter=json --outputFile.json=${TEST_REPORT}`,
  build: "npx next build",
  e2e: "npx playwright test",
};
const DEFAULT_STEPS = ["lint", "typecheck", "test", "build"];

const requested = process.argv.slice(2);
const unknown = requested.filter((step) => !(step in STEPS));
if (unknown.length > 0) {
  console.log(`Unknown steps: ${unknown.join(", ")}.`);
  console.log(`Available: ${Object.keys(STEPS).join(", ")}.`);
  process.exit(2);
}

const steps = requested.length > 0 ? requested : DEFAULT_STEPS;
mkdirSync(LOG_DIR, { recursive: true });
writeFileSync(LOG_FILE, "");

function passedTests() {
  if (!steps.includes("test") || !existsSync(TEST_REPORT)) return null;
  return JSON.parse(readFileSync(TEST_REPORT, "utf8")).numPassedTests;
}

// Removes the color codes that some tools print even when they do not write to a terminal.
function plainText(output) {
  const escapeCharacter = String.fromCharCode(27);
  return output.replace(new RegExp(`${escapeCharacter}\\[[0-9;]*m`, "g"), "");
}

function appendToLog(step, output) {
  writeFileSync(LOG_FILE, `\n===== ${step} =====\n${output}`, { flag: "a" });
}

for (const step of steps) {
  const run = spawnSync(STEPS[step], {
    shell: true,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  const output = plainText(`${run.stdout}${run.stderr}`);
  appendToLog(step, output);

  if (run.status !== 0) {
    const lines = output.split(/\r?\n/).filter((line) => line.trim() !== "");
    console.log(`BUILD FAILED at step "${step}" (exit ${run.status})\n`);
    console.log(lines.slice(-(MAX_LINES - 3)).join("\n"));
    console.log(`\nFull log: ${LOG_FILE}`);
    process.exit(run.status ?? 1);
  }
}

const passed = passedTests();
const tests = passed === null ? "" : `, ${passed} tests passed`;
console.log(`BUILD OK — ${steps.join(", ")}${tests}`);
