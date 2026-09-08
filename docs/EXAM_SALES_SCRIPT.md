# Guion — PFU Exam System (venta para equipo PFU)

**Producto en pantalla:** Exam System / Sistema de Exámenes (repo `ANK-EXG`)
**Marca:** PFU, A RICOH Company (logo oficial). Hardware: fi Series + PaperStream Capture Pro.
**Audiencia:** equipo comercial PFU (no el alumno).
**Objetivo:** que un comercial pueda enseñar en 90 s cómo se vende y cómo funciona el lazo cerrado.
**Formatos:** dos renders, `ExamSalesES` y `ExamSalesEN` (1920x1080, 30 fps, 2700 frames).
**Estado:** montado y renderizado. Salidas en `out/exam_sales_es.mp4` y `out/exam_sales_en.mp4`.
**Locución:** grabada y montada (`public/exam/vo/{es,en}.mp3`). Guiones en `docs/vo/`, sincronía en `docs/ELEVENLABS_VO.md`.

---

## Estructura (gobernada por la locución)

Una escaleta por idioma. El orden de escenas vive en `SCENE_ORDER` y los instantes de
entrada en `VO_CUES_S` (`src/exam/theme.ts`); el texto en pantalla en `salesCopy` e
`introCopy` (`src/exam/copy.ts`); la locución en `docs/vo/` y `public/exam/vo/`.

| # | Escena | ES empieza | EN empieza | Qué se ve |
|---|--------|-----------|-----------|-----------|
| 1 | `ExamIntro.tsx` | 0,0 s | 0,0 s | Portada: la hoja real entra en el escáner y sale corregida |
| 2 | `SceneAppPlate` dash | 12,05 s | 11,9 s | Captura real del cuadro de mando |
| 3 | `Scene02Problem.tsx` | 18,5 s | 17,8 s | OMR genérico contra Sistema de Exámenes PFU, fila a fila |
| 4 | `Scene03Hardware.tsx` | 32,0 s | 29,5 s | **B-roll**: fi-7300NX, un botón, PaperStream Capture Pro |
| 5 | `SceneAppPlate` gen | 47,0 s | 46,6 s | Captura real del generador |
| 6 | `Scene04Design.tsx` | 55,3 s | 54,5 s | Formulario, especificación, hoja A4 y mapa de casillas |
| 7 | `Scene05Identity.tsx` | 70,1 s | 68,6 s | Lista de alumnos tachada y QR con ID aleatorio |
| 8 | `SceneAppPlate` alu | 83,8 s | 81,9 s | Captura real de alumnos |
| 9 | `Scene06PrintScan.tsx` | 89,7 s | 87,5 s | **B-roll**: alimentador, lote de 120, reimpresión |
| 10 | `Scene07Vision.tsx` | 104,9 s | 103,3 s | Seis pasos y medición de tinta con dos umbrales |
| 11 | `Scene08Closing.tsx` | 118,65 s | 119,3 s | Cuatro verbos, salidas y cierre |
| | Fin | 131,4 s | 134,2 s | |

Las escenas encadenan con un solape de 12 frames (`OVERLAP` en
`src/exam/ExamSalesVideo.tsx`). Un hilo azul de avance recorre el borde inferior.

**Regla de brillo (vídeo, no app):** el fondo de página es `#E4E9EF`, más oscuro que el
`--g50: #F8F8F8` del design system. A pantalla completa, 248 de luma se percibe quemado y no
deja separación con las tarjetas blancas. Las capturas de la app van enmarcadas sobre fondo
oscuro, nunca a sangre: a sangre disparaban la luma a 248 con un 45 % de la pantalla en blanco
casi puro. Medido sobre el render: planos claros a ~230, planos de app a ~191.

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
