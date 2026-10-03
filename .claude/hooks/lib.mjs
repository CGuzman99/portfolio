/**
 * Shared helpers for the Claude Code hooks.
 *
 * The hooks are Node, not shell scripts, so they behave identically on
 * Windows, macOS and Linux with no Git Bash dependency.
 *
 * Everything is spawned as `node <package bin>` rather than through npm or
 * npx. On Windows with Node 22, `spawnSync("npx.cmd", ...)` fails with EINVAL
 * unless `shell: true` is set, and it fails *silently* if you do not inspect
 * `result.error` — which is exactly the kind of hook that looks like it is
 * running and is not.
 */
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/** The repo root: this file lives in <root>/.claude/hooks/. */
export const projectRoot = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
);

/** Read the hook's JSON payload from stdin. Returns null when there is none. */
export async function readPayload() {
  if (process.stdin.isTTY) return null;
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8").trim();
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Run a package's JS bin with the current node binary.
 * Returns { status, output }, where a missing bin is reported rather than
 * swallowed.
 */
export function runBin(relativeBin, args) {
  const bin = join(projectRoot, relativeBin);
  if (!existsSync(bin)) {
    return { status: 1, output: `hook: missing ${relativeBin}. Run npm ci.` };
  }

  const result = spawnSync(process.execPath, [bin, ...args], {
    cwd: projectRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });

  if (result.error) {
    return { status: 1, output: `hook: could not run ${relativeBin}: ${result.error.message}` };
  }

  return {
    status: result.status ?? 1,
    output: `${result.stdout ?? ""}${result.stderr ?? ""}`.trim(),
  };
}

export const ESLINT = "node_modules/eslint/bin/eslint.js";
export const TSC = "node_modules/typescript/bin/tsc";
export const NEXT = "node_modules/next/dist/bin/next";
