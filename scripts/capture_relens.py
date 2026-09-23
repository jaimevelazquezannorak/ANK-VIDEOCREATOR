"""Capturas 1920x1080 (a escala 2) de Relens para el vídeo `RelensSales`.

Requiere la app sirviendo en http://127.0.0.1:8000 (`python -m osint_scout serve`).
Uso: <venv de osint-scout>/python scripts/capture_relens.py

Escribe `public/relens/plates/*.png` y `src/relens/plates.ts` con la caja
(en px de captura) de cada elemento que el vídeo resalta.
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

from playwright.sync_api import Page, sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "relens" / "plates"
RECTS_TS = ROOT / "src" / "relens" / "plates.ts"
CHROME = (
    ROOT
    / "node_modules/.remotion/chrome-headless-shell/win64"
    / "chrome-headless-shell-win64/chrome-headless-shell.exe"
)
URL = "http://127.0.0.1:8000/"
PLAYER = "Lamine Yamal"
PLAYER_ID = "ce525e31-8b4e-438b-bdb9-ee502151f733"

CLEAN_CSS = """
#delete-dossier, .stage-rerun, .vis-navigation { display: none !important; }
*, *::before, *::after { caret-color: transparent !important; }
"""

# Una marca: selector CSS, o [selector, texto que debe contener], o
# [selector, texto, "next"] para el hermano siguiente, o ["node", etiqueta].
RECT_JS = """
(spec) => {
  const box = (el) => {
    const r = el.getBoundingClientRect();
    return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
  };
  const out = {};
  for (const [key, m] of Object.entries(spec)) {
    if (Array.isArray(m) && m[0] === 'node') {
      const hit = Object.values(state.graphById || {}).find((n) => (n.label || '').includes(m[1]));
      if (!hit) continue;
      const pos = state.network.getPositions([hit.id])[hit.id];
      const dom = state.network.canvasToDOM(pos);
      const c = document.getElementById('graph-canvas').getBoundingClientRect();
      const s = 34 * state.network.getScale();
      out[key] = { x: Math.round(c.x + dom.x - s / 2), y: Math.round(c.y + dom.y - s / 2), w: Math.round(s), h: Math.round(s) };
      continue;
    }
    const [sel, text, rel] = Array.isArray(m) ? m : [m];
    let el = [...document.querySelectorAll(sel)].find(
      (e) => e.offsetParent !== null && (!text || (e.textContent || '').includes(text))
    );
    if (el && rel === 'next') el = el.nextElementSibling;
    if (el) out[key] = box(el);
  }
  return out;
}
"""

RECTS: dict[str, dict] = {}


def shot(page: Page, name: str, marks: dict | None = None) -> None:
    page.wait_for_timeout(700)
    page.screenshot(path=str(OUT / f"{name}.png"))
    RECTS[name] = page.evaluate(RECT_JS, marks or {})
    missing = sorted(set(marks or {}) - set(RECTS[name]))
    print("ok", name, "missing:" if missing else "", *missing)


def scroll_to(page: Page, selector: str, offset: int = 90, text: str | None = None) -> None:
    page.evaluate(
        """([sel, off, text]) => {
          const main = document.querySelector('main');
          const el = [...document.querySelectorAll(sel)].find(
            (e) => e.offsetParent !== null && (!text || (e.textContent || '').includes(text))
          );
          main.scrollTop += el.getBoundingClientRect().top - main.getBoundingClientRect().top - off;
        }""",
        [selector, offset, text],
    )


def tab(page: Page, view: str) -> None:
    page.click(f"#tab-{view}")
    page.wait_for_timeout(500)


def write_rects() -> None:
    body = json.dumps(RECTS, indent=2, ensure_ascii=False)
    RECTS_TS.write_text(
        "/** Generado por scripts/capture_relens.py. No editar a mano. */\n"
        "export type PlateRect = { x: number; y: number; w: number; h: number };\n\n"
        f"export const PLATE_RECTS = {body} as const;\n\n"
        "export type PlateName = keyof typeof PLATE_RECTS;\n",
        encoding="utf-8",
    )


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for old in OUT.glob("*.png"):
        old.unlink()

    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=str(CHROME) if CHROME.exists() else None)
        # Escala 2: PNG de 3840x2160 para el render 4K; las cajas siguen en px CSS de 1920x1080.
        page = browser.new_page(viewport={"width": 1920, "height": 1080}, device_scale_factor=2)
        page.goto(URL, wait_until="networkidle")
        page.add_style_tag(content=CLEAN_CSS)

        page.fill("#player-input", "")
        page.type("#player-input", PLAYER, delay=40)
        page.wait_for_selector(".tm-hit", timeout=30000)
        page.wait_for_timeout(1500)
        shot(page, "01-search", {"input": "#player-input", "hit": ".tm-hit"})

        page.click(".tm-hit >> nth=0")
        page.wait_for_selector("#picked:not([hidden])")
        page.wait_for_timeout(1500)
        page.evaluate(
            """() => {
              const img = document.getElementById('picked-photo');
              if (img.complete && img.naturalWidth) return;
              const box = document.createElement('div');
              box.textContent = 'LY';
              box.style.cssText = 'width:56px;height:56px;display:grid;place-items:center;'
                + 'background:var(--soft);border:1px solid var(--line);color:var(--accent);'
                + 'font-weight:600;font-size:16px;';
              img.replaceWith(box);
            }"""
        )
        shot(page, "02-picked", {"picked": "#picked", "run": "#run-btn", "exist": "#picked-exist"})

        page.click(f'#player-list button[data-id="{PLAYER_ID}"]')
        page.wait_for_selector("#dossier:not([hidden])")
        page.wait_for_function("document.getElementById('player-name').textContent.includes('Lamine')")
        page.wait_for_timeout(1500)
        page.evaluate("document.querySelector('main').scrollTop = 0")
        shot(
            page,
            "03-dossier",
            {
                "head": ".dossier-head",
                "name": "#player-name",
                "stats": "#player-stats",
                "phases": "#dossier-phases",
                "assessment": "#assessment-box",
                "radar": "#radar-chart",
                "legend": "#radar-legend",
                "prose": "#radar-prose",
                "origen": ["#radar-legend li", "Origen"],
                "formacion": ["#radar-legend li", "Formaci"],
                "familia": ["#radar-legend li", "Familia"],
                "pareja": ["#radar-legend li", "Pareja"],
                "contacts": "#contact-list",
                "keyne": [".contact", "Keyne"],
                "ines": [".contact", "Inés"],
                "mounir": [".contact", "Mounir"],
                "sheila": [".contact", "Sheila"],
            },
        )

        tab(page, "macro")
        page.click("#years button:has-text('2026')")
        page.wait_for_timeout(700)
        scroll_to(page, "#timeline-toolbar", 20)
        shot(
            page,
            "05-timeline",
            {
                "filters": "#filters",
                "years": "#years",
                "year": ["#years button", "2026"],
                "first": "#timeline li.row",
                "firstWhen": "#timeline li.row time.when",
                "firstCat": "#timeline li.row .cat",
            },
        )
        page.click("#years button:has-text('Todos')")
        page.wait_for_timeout(700)

        page.evaluate(
            """() => {
              const row = [...document.querySelectorAll('#timeline li.row')].find((e) => e.textContent.includes('Kopa'));
              row.querySelector('button.expand').click();
            }"""
        )
        page.wait_for_timeout(600)
        scroll_to(page, "#timeline li.row", 180, "Kopa")
        shot(page, "06-micro", {"row": ["#timeline li.row", "Kopa"], "kids": [".kids:not([hidden])"]})

        page.type("#search", "Inés García", delay=30)
        page.wait_for_timeout(900)
        scroll_to(page, "#timeline-toolbar", 20)
        shot(
            page,
            "07-partner",
            {"search": "#search", "first": "#timeline li.row", "firstWhen": "#timeline li.row time.when"},
        )
        page.fill("#search", "")
        page.dispatch_event("#search", "input")

        tab(page, "micro")
        scroll_to(page, "#view-micro", 130)
        shot(
            page,
            "08-circle",
            {
                "grid": ".circle-grid",
                "keyne": [".circle-card", "Keyne"],
                "mounir": [".circle-card", "Mounir"],
                "sheila": [".circle-card", "Sheila"],
                "ines": [".circle-card", "Inés"],
            },
        )

        tab(page, "bio")
        page.evaluate(
            """() => {
              const bio = document.getElementById('biography');
              bio.innerHTML = bio.innerHTML.replace(/(&amp;nbsp;\\s*)+/g, ' ');
            }"""
        )
        scroll_to(page, "#biography h2", 160, "Formación")
        shot(
            page,
            "09b-gaps",
            {
                "formacionHead": ["#biography h2", "Formación"],
                "formacion": ["#biography h2", "Formación", "next"],
                "parejaHead": ["#biography h2", "Pareja"],
                "pareja": ["#biography h2", "Pareja", "next"],
            },
        )
        scroll_to(page, "#view-bio", 40)
        shot(
            page,
            "09-portrait",
            {
                "bio": "#biography",
                "retratoHead": ["#biography h2", "Retrato"],
                "retrato": ["#biography h2", "Retrato", "next"],
                "formacionHead": ["#biography h2", "Formación"],
                "formacion": ["#biography h2", "Formación", "next"],
                "parejaHead": ["#biography h2", "Pareja"],
                "pareja": ["#biography h2", "Pareja", "next"],
            },
        )

        tab(page, "graph")
        scroll_to(page, "#view-graph", 20)
        page.wait_for_timeout(6000)
        shot(
            page,
            "10-map",
            {
                "canvas": "#graph-canvas",
                "types": "#graph-filters",
                "physics": "#graph-physics",
                "hint": "#graph-hint",
                "lamine": ["node", "Lamine"],
                "sheila": ["node", "Sheila"],
                "mounir": ["node", "Mounir"],
                "ines": ["node", "Inés"],
                "barcelona": ["node", "Barcelona"],
            },
        )

        picked = page.evaluate(
            """() => {
              const nodes = Object.values(state.graphById || {});
              const hit = nodes.find((n) => /Sheila/i.test(n.label || ''));
              if (!hit) return null;
              state.network.selectNodes([hit.id]);
              showGraphCard(hit);
              return hit.label;
            }"""
        )
        print("map node", picked)
        page.wait_for_timeout(1200)
        shot(page, "11-map-node", {"card": "#graph-card", "canvas": "#graph-canvas", "sheila": ["node", "Sheila"]})

        browser.close()

    write_rects()


if __name__ == "__main__":
    sys.exit(main())

