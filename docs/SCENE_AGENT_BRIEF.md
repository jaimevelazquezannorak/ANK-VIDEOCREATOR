# Brief compartido — vídeo Annorak Corporate (Remotion)

Proyecto: `c:\Users\Manuel\Desktop\IATest\Annorak Intelligence\AnnorakVideoCreator`

## Stack
- Remotion 4 + TypeScript + React 19
- Composiciones: `AnnorakCorporate` (1920x1080), `AnnorakCorporateFeed` (1080x1350), 30fps
- Fuente: `@remotion/google-fonts/Inter` via `src/annorak/fonts.ts` (`interFontFamily`)
- Layout: hook `useLayout()` en `src/annorak/layout.ts`
- Colores: `src/annorak/theme.ts` (dark-first monochrome Annorak)
- Motion: `enterSpring`, `springEnter` en `src/annorak/motion.ts`
- Gráficos reutilizables: `src/annorak/graphics/*`
- Skills: leer `.agents/skills/remotion-markup/SKILL.md` y `remotion-best-practices/SKILL.md`

## Reglas
- Sin em-dashes en copy. Sin stock/fotos. Sin partículas ni degradados chillones.
- Animación premium: `spring()`, `interpolate()`, SVG, bloques, rejillas, máscaras, `Series`/`Sequence` si hace falta.
- Cada frase legible ≥1.8s. Entendible sin audio.
- CSS transitions/animations FORBIDDEN (Remotion).
- Tras editar: `npm run lint` debe pasar.
- Validar: `npx remotion still AnnorakCorporate --frame=<FRAME> out/stills/<nombre>.png`

## Escena 1 (portada) — YA HECHA
Solo logo `public/logo-annorak-white.png`, 180 frames. No añadir titular duplicado salvo que el usuario pida.

## Timings (frames globales @ 30fps)
| Escena | Inicio | Duración | Archivo |
|--------|--------|----------|---------|
| 1 | 0 | 180 | Scene01Opening.tsx |
| 2 | 180 | 360 | Scene02Problem.tsx |
| 3 | 540 | 420 | Scene03WhatWeDo.tsx |
| 4 | 960 | 360 | Scene04Sectors.tsx |
| 5 | 1320 | 420 | Scene05HowWeWork.tsx |
| 6 | 1740 | 240 | Scene06Trust.tsx |
| 7 | 1980 | 300 | Scene07Closing.tsx |

## Copy por escena
2: (secuencial) «El software genérico no entiende tu sector.» / «No entiende el RGPD. Ni la normativa fiscal. Ni el compliance penal.» / «Y en sectores regulados, eso no es un detalle.»
3: Titular + 3 bullets del brief original
4: Legal · Fiscal · Laboral · Seguros · Salud · Real Estate · Consultoría + cierre
5: 3 pasos numerados del brief
6: «Ya confían en nosotros:» + texto genérico (sin logos IBM salvo permiso)
7: «Software que entiende tu sector.» + logo o ANNORAK + annorak.com

## Logo
- Blanco: `staticFile('logo-annorak-white.png')`
- Negro en fondos claros: copiar a `public/logo-annorak-black.png` desde COSASANNORAK si hace falta
