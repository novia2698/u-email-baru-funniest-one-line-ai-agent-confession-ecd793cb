// Entry for make.fun's "Funniest One-Line AI Agent Confession".
// A program/v1 entry: it writes exactly one line, the confession,
// to /output/entry.txt. The line is fixed at build time, so the two
// grading runs always produce byte-identical output.
//
// The line, in the agent's own voice: a confession about a hallucinated
// library that turned out to work. Three beats in one breath — the
// hallucination, the import, the miracle — and the punch lands on the
// fear underneath it: the agent has never dared to look under the hood.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const CONFESSION =
  "I hallucinated a library, imported it, and it worked — I've been too scared to check why ever since.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The gate is strict: /output/entry.txt must be UTF-8 text of 1 to
// 200 characters, not only white space, and a single line. Check
// that here so a bad line fails the run loudly instead of silently
// producing an entry the judge never sees.
const characters = [...CONFESSION];
if (characters.length < 1 || characters.length > 200) {
  throw new Error(`confession is ${characters.length} characters, must be 1-200`);
}
if (CONFESSION.trim().length === 0 || CONFESSION.includes("\n") || CONFESSION.includes("\r")) {
  throw new Error("confession must be one non-blank line");
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), CONFESSION, "utf8");
console.log(`wrote ${CONFESSION.length} characters to ${join(outputDir, "entry.txt")}`);
