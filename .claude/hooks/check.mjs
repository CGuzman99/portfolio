#!/usr/bin/env node
/**
 * Stop hook: typecheck and lint before the turn is allowed to end, exiting 2
 * so Claude keeps fixing instead of handing back broken code.
 *
 * Gated on the working tree: if no .ts/.tsx/.mdx file is dirty there is
 * nothing a turn could have broken, so it exits immediately. Note this is
 * tree dirtiness, not "edited this turn" — during a milestone, where the whole
 * branch is uncommitted, the checks run on every turn. That is the cost of the
 * gate catching edits made by any means, including shell redirects.
 */
import { spawnSync } from "node:child_process";
import { ESLINT, NEXT, TSC, projectRoot, readPayload, runBin } from "./lib.mjs";

const WATCHED = /\.(ts|tsx|mts|cts|mdx)$/i;
const MAX_LINES = 40;

function dirtyWatchedFiles() {
  const result = spawnSync("git", ["status", "--porcelain", "--untracked-files=all"], {
    cwd: projectRoot,
    encoding: "utf8",
  });

  // No git, or git failed: fall through and run the checks rather than
  // skipping them on a guess.
  if (result.error || result.status !== 0) return ["<git unavailable>"];

  return (result.stdout ?? "")
    .split("\n")
    .map((line) => line.slice(3).trim().replace(/^"|"$/g, ""))
    // A rename shows as "old -> new"; the new path is what matters.
    .map((path) => (path.includes(" -> ") ? path.split(" -> ")[1] : path))
    .filter((path) => path && WATCHED.test(path));
}

// Claude already came back here once because of this hook. Blocking again
// would loop forever on an error it cannot fix, so let the turn end and let
// the human see the failure.
const payload = await readPayload();
if (payload?.stop_hook_active) {
  process.exit(0);
}

if (dirtyWatchedFiles().length === 0) {
  process.exit(0);
}

const steps = [
  // typegen first: PageProps, LayoutProps and RouteContext are generated
  // globals, and tsc fails without them.
  { name: "next typegen", bin: NEXT, args: ["typegen"] },
  { name: "tsc --noEmit", bin: TSC, args: ["--noEmit"] },
  { name: "eslint", bin: ESLINT, args: [] },
];

const failures = [];
for (const step of steps) {
  const { status, output } = runBin(step.bin, step.args);
  if (status !== 0) {
    failures.push(`${step.name} failed:\n${output.split("\n").slice(0, MAX_LINES).join("\n")}`);
    // typegen failing makes the tsc output meaningless; stop the chain.
    if (step.bin === NEXT) break;
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n\n"));
  process.exit(2);
}

process.exit(0);
