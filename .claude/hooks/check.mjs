#!/usr/bin/env node
/**
 * Stop hook: typecheck and lint before the turn is allowed to end, exiting 2
 * so Claude keeps fixing instead of handing back broken code.
 *
 * Gated on the working tree: if no .ts/.tsx/.mdx file is dirty there is
 * nothing a turn could have broken, so it exits immediately rather than
 * spending ~20s on every conversational turn.
 */
import { spawnSync } from "node:child_process";
import { ESLINT, NEXT, TSC, projectRoot, runBin } from "./lib.mjs";

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
