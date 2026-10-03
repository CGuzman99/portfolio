#!/usr/bin/env node
/**
 * PostToolUse hook for Edit|Write: runs `eslint --fix` on the file that was
 * just written.
 *
 * Always exits 0. This is an advisory auto-fix, not a gate: a lint error must
 * not abort the tool call that produced the file. check.mjs is where lint
 * actually blocks.
 */
import { extname, relative, resolve } from "node:path";
import { ESLINT, projectRoot, readPayload, runBin } from "./lib.mjs";

// .mdx is deliberately absent until M3 configures an MDX parser: ESLint
// prints its whole "Oops! Something went wrong!" block for an unparseable
// file, which is pure noise on every MDX write.
const FIXABLE = new Set([".ts", ".tsx", ".mts", ".cts"]);

const payload = await readPayload();
const filePath = payload?.tool_input?.file_path;

if (!filePath || !FIXABLE.has(extname(filePath).toLowerCase())) {
  process.exit(0);
}

// Keep eslint inside the project; it has no config for anything outside it.
const target = relative(projectRoot, resolve(projectRoot, filePath));
if (target.startsWith("..")) process.exit(0);

const { output } = runBin(ESLINT, ["--fix", target]);
if (output) console.error(output);

process.exit(0);
