import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";

globalThis.require = createRequire(import.meta.url);
eval(await readFile("scripts/test-runner.js", "utf8"));
