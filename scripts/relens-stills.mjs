// Stills de revisión de RelensSales: un bundle, varios frames.
// Uso: node scripts/relens-stills.mjs 200 470 580 ...
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import path from "node:path";

const frames = process.argv.slice(2).map(Number);
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const composition = await selectComposition({ serveUrl, id: "RelensSales" });

for (const frame of frames) {
  const output = path.resolve(`out/stills/relens-${String(frame).padStart(4, "0")}.png`);
  await renderStill({ composition, serveUrl, frame, output, scale: 0.5 });
  console.log("ok", output);
}
