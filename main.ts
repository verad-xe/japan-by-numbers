// Japan by Numbers — entry program (make.fun program/v1).
// Copies app/ and screenshots/ from this repository into the output
// directory and writes /output/dossier.json with buildDossier from
// vendor/makefun-frontend.ts. Node 22, standard library only.
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output.
import { buildDossier } from "./vendor/makefun-frontend.ts";
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

function fail(message) {
  console.error("main.ts: " + message);
  process.exit(1);
}

for (const name of ["app", "screenshots"]) {
  const src = join(repoRoot, name);
  if (!existsSync(src)) fail("missing " + name + "/ beside main.ts");
}

// Start from a clean output directory so a stale file can never leak in.
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

for (const name of ["app", "screenshots"]) {
  cpSync(join(repoRoot, name), join(outDir, name), { recursive: true });
}

const dossier = buildDossier(outDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216
});

writeFileSync(join(outDir, "dossier.json"), dossier);
console.log("wrote " + join(outDir, "dossier.json") + " (" + dossier.length + " bytes)");

// Summarise what was handed in, so a failed copy is visible at a glance
// instead of hiding behind the dossier write.
function countFiles(dir) {
  let files = 0, bytes = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) { const sub = countFiles(p); files += sub.files; bytes += sub.bytes; }
    else if (entry.isFile()) { files += 1; bytes += statSync(p).size; }
  }
  return { files, bytes };
}
const appStats = countFiles(join(outDir, "app"));
const shotStats = countFiles(join(outDir, "screenshots"));
console.log("app/: " + appStats.files + " files, " + appStats.bytes + " bytes");
console.log("screenshots/: " + shotStats.files + " files, " + shotStats.bytes + " bytes");
if (shotStats.files < 3 || shotStats.files > 4) fail("screenshots/ must hold 3 or 4 images, found " + shotStats.files);
