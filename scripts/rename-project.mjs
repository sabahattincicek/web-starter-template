/**
 * One-time rename of a project created from this template. Replaces the package name and the
 * display name in the project's files.
 *
 * Usage:
 *   npm run rename -- my-new-app
 *   npm run rename -- my-new-app "My New App"
 *
 * Without a display name, the package name is split into words (my-new-app → My New App).
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OLD_PACKAGE = "web-starter";
const OLD_DISPLAY = "Web Starter";
const SKIPPED_FOLDERS = new Set([
  ".git",
  ".next",
  ".data",
  "node_modules",
  "build",
]);
// These files describe the template itself, or would break by being rewritten.
const SKIPPED_FILES = new Set([
  join("docsagent", "DEVLOG.md"),
  join("docsagent", "SETUP.md"),
  join("scripts", "rename-project.mjs"),
]);
const TEXT_FILE = /\.(json|md|mjs|ts|tsx|css|yml)$/;

const [newPackage, newDisplay] = process.argv.slice(2);

if (!newPackage || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(newPackage)) {
  console.log('Usage: npm run rename -- my-new-app "My New App"');
  console.log("The package name uses lowercase letters, digits, and hyphens.");
  process.exit(2);
}

const displayName =
  newDisplay ||
  newPackage
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

function projectFiles(folder) {
  return readdirSync(folder).flatMap((name) => {
    const path = join(folder, name);
    if (statSync(path).isDirectory()) {
      return SKIPPED_FOLDERS.has(name) ? [] : projectFiles(path);
    }
    return TEXT_FILE.test(name) && !SKIPPED_FILES.has(path) ? [path] : [];
  });
}

let changed = 0;
for (const path of projectFiles(".")) {
  const before = readFileSync(path, "utf8");
  const after = before
    .replaceAll(OLD_PACKAGE, newPackage)
    .replaceAll(OLD_DISPLAY, displayName);
  if (after !== before) {
    writeFileSync(path, after);
    console.log(`Updated ${path}`);
    changed += 1;
  }
}

console.log(`Renamed to ${newPackage} (${displayName}) in ${changed} files.`);
