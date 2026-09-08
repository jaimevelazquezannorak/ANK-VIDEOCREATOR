import { chromium } from "playwright";
import { mkdirSync, renameSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const rawDir = join(root, "public", "exam", "broll", "raw");
const outDir = join(root, "public", "exam", "broll");
mkdirSync(rawDir, { recursive: true });

const hideChrome = `
  .alert { display: none !important; }
`;

async function login(page) {
  await page.goto("http://localhost:5173/login", { waitUntil: "networkidle" });
  const user = page.locator(".login-card input").first();
  const pass = page.locator('.login-card input[type="password"]');
  await user.fill("admin");
  await pass.fill("admin");
  await page.getByRole("button", { name: "Entrar" }).click();
  await page.waitForURL("**/dashboard");
  await page.addStyleTag({ content: hideChrome });
}

async function record(name, play) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
    recordVideo: { dir: rawDir, size: { width: 1920, height: 1080 } },
  });
  const page = await context.newPage();
  await login(page);
  await play(page);
  const video = page.video();
  await page.close();
  const src = await video.path();
  await context.close();
  await browser.close();
  const dest = join(rawDir, `${name}.webm`);
  renameSync(src, dest);
  return dest;
}

await record("app-dashboard", async (page) => {
  await page.waitForTimeout(400);
  await page.mouse.move(720, 620, { steps: 16 });
  await page.waitForTimeout(450);
  await page.mouse.move(1080, 640, { steps: 18 });
  await page.waitForTimeout(450);
  await page.mouse.move(1420, 640, { steps: 18 });
  await page.waitForTimeout(500);
  await page.mouse.move(1680, 640, { steps: 16 });
  await page.waitForTimeout(700);
});

await record("app-generador", async (page) => {
  await page.goto("http://localhost:5173/generador", { waitUntil: "networkidle" });
  await page.addStyleTag({ content: hideChrome });
  await page.waitForTimeout(350);
  const questions = page.locator('input[type="number"]').first();
  await questions.click();
  await questions.fill("120");
  await page.waitForTimeout(400);
  await page.getByRole("checkbox", { name: "Anulación" }).click();
  await page.waitForTimeout(350);
  await page.getByRole("button", { name: /Clave de respuestas/ }).click();
  await page.waitForTimeout(550);
  const keys = page.locator(".qrow button, .qcol button").first();
  if (await keys.count()) {
    await keys.click();
  }
  await page.waitForTimeout(700);
});

await record("app-alumnos", async (page) => {
  await page.goto("http://localhost:5173/alumnos", { waitUntil: "networkidle" });
  await page.addStyleTag({ content: hideChrome });
  await page.waitForTimeout(400);
  await page.getByRole("button", { name: "Nuevo alumno" }).click();
  await page.waitForTimeout(500);
  const fields = page.locator("input.input, .modal input, dialog input, form input");
  const n = await fields.count();
  if (n > 0) {
    await fields.nth(0).fill("Marta");
    await page.waitForTimeout(250);
    if (n > 1) await fields.nth(1).fill("Alonso Vidal");
    await page.waitForTimeout(250);
    if (n > 2) await fields.nth(2).fill("12345678A");
  }
  await page.waitForTimeout(800);
});

console.log("Recorded to", rawDir);
