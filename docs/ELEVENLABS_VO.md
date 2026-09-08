# Locución ElevenLabs — Sistema de Exámenes PFU

**Estado: locuciones montadas.** `public/exam/vo/es.mp3` (voz Martin Osborne, 130,2 s) y
`public/exam/vo/en.mp3` (voz Adrian, 132,9 s). El montaje sigue a la voz:
ES dura 131,4 s (3942 frames) y EN 134,2 s (4026 frames), 30 fps.

> Los nombres de voz de ElevenLabs no dicen el idioma: aquí la voz inglesa locuta el
> castellano y viceversa. Al reemplazar un take, comprueba escuchando qué idioma es
> antes de copiarlo a `es.mp3` o `en.mp3`.

Los guiones que se grabaron están en `docs/vo/exam_sales_es.txt` y `docs/vo/exam_sales_en.txt`.
Llevan pausas `<break time="…" />` en cada cambio de plano; el narrador las respetó, así que
cada pausa larga (≥ 1 s) marca un corte de escena.

**Mezcla** (`src/exam/ExamSalesVideo.tsx`): voz con ganancia por idioma (`VO_GAIN`: ES 1,25,
EN 1,65, porque el take de Adrian salió 2,6 dB más bajo que el de Martin); cama musical a 0,08
con entrada de 0,8 s y salida de 2 s. Resultado medido en el render: voz a unos -17 dBFS RMS
(30 % más alto), picos por debajo de -1 dBFS, música unos 18 dB por debajo de la voz.
Remotion resta ~3 dB al mezclar dos pistas; la ganancia ya lo compensa.

---

## Cómo se sincroniza

1. Los instantes de cada escena viven en `VO_CUES_S` (`src/exam/theme.ts`), en segundos,
   uno por idioma. Cada escena arranca ~0,3 s antes de que empiece su bloque hablado.
2. Si regrabas una voz, vuelve a sacar las pausas y actualiza esa tabla:

   ```bash
   npx remotion ffmpeg -i public/exam/vo/es.mp3 -af "silencedetect=noise=-38dB:d=0.55" -f null -
   ```

   Quédate con los silencios de ≥ 1 s (los `<break>`); los de 0,5–0,8 s son pausas dentro de
   una frase. `silence_end` de cada pausa larga, menos 0,3 s, es el `from` de la escena siguiente.
3. El último valor de la tabla es el final del vídeo (fin de la voz + 1,2 s).

## Reloj ES (voz Martin Osborne)

| Escena | Empieza | Bloque hablado |
|---|---|---|
| Portada | 0,0 s | «Sistema de Exámenes PFU…» |
| App dashboard | 12,05 s | «Todo se gestiona desde el navegador…» |
| Problema | 18,5 s | «Un OMR genérico corrige hojas…» |
| Hardware | 32,0 s | «El hardware ya está en el centro…» |
| App generador | 47,0 s | «Primero, el diseño…» |
| Diseña | 55,3 s | «El sistema genera el PDF…» |
| Anonimato | 70,1 s | «Segundo, el anonimato…» |
| App alumnos | 83,8 s | «Los alumnos se importan desde Excel…» |
| Imprime y escanea | 89,7 s | «Tercero, imprimir y escanear…» |
| Corrige | 104,9 s | «Cuarto, corregir…» |
| Cierre | 118,65 s | «Genera. Imprime. Escanea. Corrige…» |
| Fin | 131,4 s | |

## Reloj EN (voz Adrian)

| Escena | Empieza | Bloque hablado |
|---|---|---|
| Cover | 0,0 s | "PFU Exam System…" |
| App dashboard | 11,9 s | "Everything runs in the browser…" |
| Problem | 17,8 s | "Generic OMR grades sheets…" |
| Hardware | 29,5 s | "The hardware is already on site…" |
| App generator | 46,6 s | "First, design…" |
| Design | 54,5 s | "The system generates the print-ready PDF…" |
| Anonymity | 68,6 s | "Second, anonymity…" |
| App students | 81,9 s | "Students are imported from Excel…" |
| Print and scan | 87,5 s | "Third, print and scan…" |
| Grade | 103,3 s | "Fourth, grading…" |
| Close | 119,3 s | "Design. Print. Scan. Grade…" |
| End | 134,2 s | |

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
