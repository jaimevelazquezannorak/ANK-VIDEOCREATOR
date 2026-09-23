# ANK-VIDEOCREATOR

Proyecto [Remotion](https://www.remotion.dev) con los vídeos de Annorak Intelligence. El código de cada escena está en React: se puede abrir en Studio y ver cómo está hecha cada animación.

## Vídeos

| Composición | Qué es | Código |
| --- | --- | --- |
| `ExamSalesES` / `ExamSalesEN` | Vídeo comercial PFU · Sistema de Exámenes (1920×1080) | `src/exam/` |
| `ExamIntroES` / `ExamIntroEN` | Intro aislada del comercial | `src/exam/ExamIntro.tsx` |
| `AnnorakCorporateFeed` | Vídeo corporativo Annorak (1080×1350) | `src/annorak/` |

## Dónde están las animaciones

**Comercial PFU**

- Timeline y beats: `src/exam/theme.ts`
- Orquestación: `src/exam/ExamSalesVideo.tsx`
- Escenas: `src/exam/scenes/`
- Motion compartido: `src/exam/motion.ts`, `src/exam/IntroMotion.tsx`
- Copy ES/EN: `src/exam/copy.ts`

**Corporativo Annorak**

- Timeline: `src/annorak/theme.ts`, `src/annorak/motion.ts`
- Orquestación: `src/annorak/AnnorakCorporateVideo.tsx`
- Escenas: `src/annorak/scenes/`
- Gráficos: `src/annorak/graphics/`

## Cómo ejecutarlo

```console
npm i
npm run dev
```

Studio queda en [http://localhost:3000](http://localhost:3000). Elige una composición y recorre el timeline para ver cada interpolación.

Render de un vídeo:

```console
npx remotion render ExamSalesES
```

## Requisitos

- Node.js 18+
- Remotion 4 (ver `package.json`)
