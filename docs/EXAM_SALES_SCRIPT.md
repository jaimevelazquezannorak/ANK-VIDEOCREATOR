# Guion — PFU Exam System (venta para equipo PFU)

**Producto en pantalla:** Exam System / Sistema de Exámenes (repo `ANK-EXG`)
**Marca:** PFU, A RICOH Company (logo oficial). Hardware: fi Series + PaperStream Capture Pro.
**Audiencia:** equipo comercial PFU (no el alumno).
**Objetivo:** que un comercial pueda enseñar en 90 s cómo se vende y cómo funciona el lazo cerrado.
**Formatos:** dos renders, `ExamSalesES` y `ExamSalesEN` (1920x1080, 30 fps, 2700 frames).
**Estado:** montado y renderizado. Salidas en `out/exam_sales_es.mp4` y `out/exam_sales_en.mp4`.
**Locución:** guiones ES/EN para ElevenLabs en `docs/vo/`, montaje en `docs/ELEVENLABS_VO.md`.

---

## Estructura (98,4 s · 2952 frames)

Una sola escaleta para los dos idiomas. Vive en `SALES` (`src/exam/theme.ts`);
el texto en pantalla vive en `salesCopy` e `introCopy` (`src/exam/copy.ts`);
la locución en `docs/vo/`.

| # | Frames | Tiempo | Escena | Qué se ve |
|---|--------|--------|--------|-----------|
| 1 | 0–252 | 0–8,4 s | `ExamIntro.tsx` | Portada: la hoja real entra en el escáner y sale corregida |
| 2 | 252–372 | 8,4–12,4 s | `SceneAppPlate` dash | Captura real del cuadro de mando |
| 3 | 372–672 | 12,4–22,4 s | `Scene02Problem.tsx` | OMR genérico contra Sistema de Exámenes PFU |
| 4 | 672–1032 | 22,4–34,4 s | `Scene03Hardware.tsx` | **B-roll**: fi-7300NX, un botón, PaperStream Capture Pro |
| 5 | 1032–1152 | 34,4–38,4 s | `SceneAppPlate` gen | Captura real del generador |
| 6 | 1152–1572 | 38,4–52,4 s | `Scene04Design.tsx` | Formulario, especificación, hoja A4 y mapa de casillas |
| 7 | 1572–1872 | 52,4–62,4 s | `Scene05Identity.tsx` | Lista de alumnos tachada y QR con ID aleatorio |
| 8 | 1872–1992 | 62,4–66,4 s | `SceneAppPlate` alu | Captura real de alumnos |
| 9 | 1992–2352 | 66,4–78,4 s | `Scene06PrintScan.tsx` | **B-roll**: alimentador, lote de 120, reimpresión |
| 10 | 2352–2712 | 78,4–90,4 s | `Scene07Vision.tsx` | Seis pasos y medición de tinta con dos umbrales |
| 11 | 2712–2952 | 90,4–98,4 s | `Scene08Closing.tsx` | Cuatro verbos, salidas y cierre |

Las escenas encadenan con un solape de 12 frames (`OVERLAP` en
`src/exam/ExamSalesVideo.tsx`). Un hilo azul de avance recorre el borde inferior.

**Regla de copia (comercial):** cada plano abre con el beneficio para el centro y cierra
con una prueba técnica. Sin jerga en el titular; la jerga va en la locución o en los chips.

**Cierre on-screen**
ES: `Genera. Imprime. Escanea. Corrige.`
EN: `Design. Print. Scan. Grade.`

---

## Cómo renderizar

```bash
npm run dev                                            # Remotion Studio
npx remotion render ExamSalesES out/exam_sales_es.mp4
npx remotion render ExamSalesEN out/exam_sales_en.mp4
npx remotion still ExamSalesES --frame=1360 out/stills/design.png
```

---

## Sustituir stills por B-roll real

Los planos 3 y 6 usan stills con recorrido lento. Cuando existan los clips,
pasa `clip="exam/broll/<archivo>.mp4"` al `BrollScene` de esa escena y el
componente ignora el still.

| Hueco | Archivo | Uso |
|-------|---------|-----|
| Corporativo PFU | `public/exam/broll/pfu-corporate.mp4` | estación, fi Series, papel entrando |
| App | `public/exam/broll/app-ui.mp4` | Dashboard, Generador, Lote, revisión |

---

## Datos que salen en pantalla (verificados contra ANK-EXG)

- Captura: PaperStream Capture Pro **PUSH**, job `ANK_Examenes`, fi-7300NX, 300 ppp en gris.
- Generación: formulario → especificación JSON → PDF vectorial + registro de coordenadas
  en mm normalizados, independiente del DPI.
- Identidad: token opaco de 128 bits en el QR. Ni DNI ni nombre en el papel.
- Visión: QR, fiduciales, homografía, ROI, binarización, medición de relleno.
- Clasificación: dos umbrales (22 % y 55 % en pantalla) con banda de dudosos a revisión humana.
  Los valores reales se calibran con las casillas de control; los del vídeo son ilustrativos.

---

## Notas de venta (para el comercial)

- No es un corrector que "lee" un folio ajeno. PFU + software **generan** la hoja.
- Identidad desacoplada: QR opaco. El corrector opera sin ver el alumno.
- Dudosos = umbral, no IA creativa.
- Captura real: PaperStream Capture Pro PUSH, no SmartSDK de panel.
- Certificado del centro: el PDF escaneado se sella.
- Dos idiomas = dos vídeos, no subtítulos encima del mismo.

---

## Assets

- Logo: `public/branding/pfu-logo.png`
- Stills: `public/exam/exam-ops-room.png`, `scanner-paper-feed.png`,
  `exam-sheet-qr.png`, `results-review.png`
- Tokens de color y tipografía: `src/exam/theme.ts`, copiados de
  `ANK-EXG/frontend/src/brand/tokens.css`.
