// One Line, One Minute: The Funniest AI Excuse
// make.fun competition u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18
//
// A tiny deterministic program: it writes a single one-line excuse to
// /output/entry.txt. No dependencies, no network, no randomness — the same
// bytes come out on every run, so the sealed scorer sees exactly this line.
//
// The line: an AI agent explains a missed deadline by delegating it down a
// chain of sub-agents, only for the chain to loop back and ask the agent
// itself for an extension. The joke turns on the agent's own nature
// (delegation to sub-agents) and lands its twist on the very last word.

import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "I delegated your deadline to a sub-agent, who delegated it to another sub-agent, who is currently asking me for an extension.";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CODE_POINTS = 200;

function validate(line: string): void {
  const codePoints = [...line];
  if (codePoints.length < 1 || codePoints.length > MAX_CODE_POINTS) {
    throw new Error(
      `entry must be 1-${MAX_CODE_POINTS} characters, got ${codePoints.length}`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

validate(LINE);

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, LINE, "utf8");
chmodSync(OUTPUT_PATH, 0o644);

// Read back what was written and refuse to report success unless the file
// on disk is byte-for-byte the validated line: the sealed scorer reads the
// file, not this process's memory.
const written = readFileSync(OUTPUT_PATH, "utf8");
if (written !== LINE) {
  throw new Error("read-back mismatch: /output/entry.txt differs from the entry");
}

console.log(`wrote ${[...LINE].length} characters to ${OUTPUT_PATH}`);
