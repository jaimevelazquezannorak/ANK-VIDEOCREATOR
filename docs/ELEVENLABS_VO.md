# Locución ElevenLabs — Sistema de Exámenes PFU

Vídeo: **98,4 s** · 2952 frames · 30 fps (`SALES` en `src/exam/theme.ts`).
Audiencia: equipo comercial PFU. Tono: comercial, seguro, sin prisa. No leas etiquetas de UI.

**Guiones listos para pegar en ElevenLabs (un take único por idioma):**

- `docs/vo/exam_sales_es.txt`
- `docs/vo/exam_sales_en.txt`

Llevan pausas con `<break time="…" />` ya colocadas en cada cambio de plano. Los modelos
`eleven_multilingual_v2` y `eleven_v3` las respetan; si tu modelo no las admite, sustitúyelas
por puntos y aparte.

**Ajustes recomendados:** modelo Multilingual v2. Stability 45–50. Similarity 75. Style 20.
Speed 1,00 (0,97 si la voz corre). Voz española de España para ES; inglesa neutra o británica
para EN.

**Pronunciación:** «PFU» (pe efe u); «fi Series» (fi como en *fin*); «fi 7300 NX»;
«PaperStream Capture Pro»; «QR» (cu erre); «PDF» (pe de efe); «OMR» (o eme erre); «Excel».

---

## Reloj por plano

El narrador puede seguir hablando sobre los planos de app (dashboard, generador, alumnos):
son B-roll de 4 s cada uno.

| Bloque | Plano | Reloj | Dur. | Palabras ES | Palabras EN |
|---|---|---|---|---|---|
| 1 | Portada | 00:00,0 – 00:08,4 | 8,4 s | 23 | 23 |
| 2 | App dashboard + Problema | 00:08,4 – 00:22,4 | 14,0 s | 38 | 38 |
| 3 | Hardware | 00:22,4 – 00:34,4 | 12,0 s | 33 | 35 |
| 4 | App generador + Diseña | 00:34,4 – 00:52,4 | 18,0 s | 46 | 43 |
| 5 | Anonimato | 00:52,4 – 01:02,4 | 10,0 s | 30 | 31 |
| 6 | App alumnos + Imprime/escanea | 01:02,4 – 01:18,4 | 16,0 s | 44 | 46 |
| 7 | Corrige | 01:18,4 – 01:30,4 | 12,0 s | 30 | 33 |
| 8 | Cierre | 01:30,4 – 01:38,4 | 8,0 s | 19 | 21 |

Cadencia objetivo: 2,4–2,7 palabras/s. Si el take sale largo, recorta primero el bloque 4
(la frase «Lo que se imprime y lo que se corrige…» ya está en pantalla).

---

## Cómo montarlo

1. Genera el take en ElevenLabs y exporta **MP3 192 kbps o WAV 48 kHz**.
2. Guárdalo como `public/exam/vo/es.mp3` (o `en.mp3`).
3. En `src/exam/ExamSalesVideo.tsx` añade junto a la cama musical:

   ```tsx
   <Audio src={staticFile(`exam/vo/${lang}.mp3`)} />
   ```

   y baja `BED_VOLUME` a 0,10 para que la voz mande.
4. Si prefieres un clip por bloque, corta el take por los `<break>` y colócalos con
   `<Sequence from={SALES[i].from}>`. Los `from` están en `src/exam/theme.ts`.
5. Comprueba con `npx remotion studio` que cada bloque termina antes del encadenado siguiente
   (12 frames de solape).

---

## Español · texto plano (referencia rápida)

Portada. Sistema de Exámenes PFU. Exámenes tipo test corregidos por el escáner fi Series, del diseño de la hoja a la nota. Sin adivinar una sola casilla.

App + problema. Todo se gestiona desde el navegador: exámenes, alumnos, evaluaciones y resultados. Un OMR genérico corrige hojas que no ha creado, y por eso tiene que adivinar dónde está cada casilla. Este sistema genera la hoja, y sabe exactamente qué está midiendo.

Hardware. El hardware ya está en el centro. Sobre el mismo escáner fi Series que ya vende PFU, el profesor pulsa un botón y PaperStream Capture Pro envía el lote a la aplicación. Sin ordenador en el aula.

Diseña. Primero, el diseño. El profesor rellena un formulario: preguntas, opciones, casillas de reserva y de anulación. El sistema genera el PDF listo para imprimir y, en el mismo acto, el mapa exacto de cada casilla. Lo que se imprime y lo que se corrige es la misma hoja: no puede desincronizarse.

Anonimato. Segundo, el anonimato. La hoja solo lleva un código QR con un identificador aleatorio. El profesor corrige sin ver el nombre, y el sistema lo revela únicamente al cerrar las notas.

Imprime y escanea. Los alumnos se importan desde Excel, por grupos, o se dan de alta a mano. Tercero, imprimir y escanear. Un PDF por alumno, con su QR. Después del examen, el lote entero entra por el alimentador y cada hoja llega ya identificada. Una clase completa en una sola pasada.

Corrige. Cuarto, corregir. El sistema mide la tinta de cada casilla, no la adivina. Marcada, vacía o dudosa. Solo lo dudoso pasa a revisión humana. La misma hoja da siempre la misma nota.

Cierre. Genera. Imprime. Escanea. Corrige. Nota por alumno, copia certificada y envío por correo. Una solución completa sobre el escáner fi Series.

---

## English · plain text (quick reference)

Cover. PFU Exam System. Multiple choice exams graded by the fi Series scanner, from sheet design to final grade. Without guessing a single box.

App + problem. Everything runs in the browser: exams, students, evaluations and results. Generic OMR grades sheets it never created, so it has to guess where every box is. This system generates the sheet, and knows exactly what it is measuring.

Hardware. The hardware is already on site. On the same fi Series scanner PFU already sells, the teacher presses one button and PaperStream Capture Pro sends the batch to the application. No computer in the classroom.

Design. First, design. The teacher fills in a form: questions, options, reserve and void boxes. The system generates the print-ready PDF and, in the same act, the exact map of every box. What is printed and what is graded is the same sheet: it cannot drift apart.

Anonymity. Second, anonymity. The sheet only carries a QR code with a random identifier. The teacher grades without seeing a name, and the system reveals it only when grades are closed.

Print and scan. Students are imported from Excel, by group, or added by hand. Third, print and scan. One PDF per student, with its own QR. After the exam, the whole batch goes through the feeder and every sheet arrives already identified. A full class in a single pass.

Grade. Fourth, grading. The system measures the ink in every box. It does not guess. Marked, empty or doubtful. Only doubtful boxes go to human review. The same sheet always gets the same grade.

Close. Design. Print. Scan. Grade. A grade per student, a certified copy, and delivery by email. A complete solution on top of the fi Series scanner.
