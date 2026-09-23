/** Tokens de Relens (`osint_scout/web/styles.css`), escala 1920x1080. */
export const relens = {
  bg: "#f7f8fa",
  surface: "#ffffff",
  ink: "#152033",
  muted: "#5b6b7c",
  line: "#d5dde6",
  navy: "#0e2238",
  accent: "#1a4f73",
  soft: "#eef2f6",
  pitch: "#e6eae8",
  ok: "#1f6b4a",
  warn: "#8a5a12",
  bad: "#8f2d2d",
  paper: "#f7f8fa",
  white: "#ffffff",
  topbar: "#f3f6f9",
  topbarMuted: "#c5ced8",
  accentLight: "#8fb8d6",
  navyLine: "rgba(243,246,249,0.18)",
} as const;

/** Misma escala que el vídeo PFU. No inventar sizes sueltos en escenas. */
export const type = {
  display: {
    fontSize: 64,
    fontWeight: 600,
    letterSpacing: "-0.02em",
    lineHeight: 1.1,
  },
  title: {
    fontSize: 48,
    fontWeight: 600,
    letterSpacing: "-0.02em",
    lineHeight: 1.15,
  },
  subtitle: {
    fontSize: 28,
    fontWeight: 500,
    letterSpacing: "-0.01em",
    lineHeight: 1.4,
  },
  body: {
    fontSize: 24,
    fontWeight: 400,
    letterSpacing: "0em",
    lineHeight: 1.45,
  },
  caption: {
    fontSize: 20,
    fontWeight: 500,
    letterSpacing: "0.01em",
    lineHeight: 1.35,
  },
  eyebrow: {
    fontSize: 16,
    fontWeight: 500,
    letterSpacing: "0.14em",
    lineHeight: 1.2,
  },
} as const;

export const layout = {
  padX: 96,
  padY: 72,
  headerH: 112,
  mark: 44,
  ruleW: 48,
  ruleH: 2,
  stackGap: 20,
  maxCopy: 1120,
  eyebrowToTitle: 14,
  titleToLead: 36,
  headToBody: 72,
} as const;

export const RELENS_FPS = 30;

/** Misma atenuación de render que ExamSales. 1 = tal cual sale del navegador. */
export const RENDER_BRIGHTNESS = 0.9;

export type SlideId =
  | "cover"
  | "problem"
  | "search"
  | "process"
  | "dossier"
  | "radar"
  | "circle"
  | "timeline"
  | "partner"
  | "portrait"
  | "map"
  | "mapNode"
  | "reliability"
  | "closing";

/** Escaleta en frames. Sin locución: cada diapositiva dura lo que tarda en leerse. */
export const SLIDES: { id: SlideId; frames: number }[] = [
  { id: "cover", frames: 210 },
  { id: "problem", frames: 270 },
  { id: "search", frames: 240 },
  { id: "process", frames: 300 },
  { id: "dossier", frames: 240 },
  { id: "radar", frames: 270 },
  { id: "circle", frames: 270 },
  { id: "timeline", frames: 300 },
  { id: "partner", frames: 210 },
  { id: "portrait", frames: 270 },
  { id: "map", frames: 270 },
  { id: "mapNode", frames: 240 },
  { id: "reliability", frames: 270 },
  { id: "closing", frames: 240 },
];

export const relensSchedule = () => {
  let from = 0;
  return SLIDES.map((s, i) => {
    const slide = { ...s, index: i + 1, from };
    from += s.frames;
    return slide;
  });
};

export const RELENS_FRAMES = SLIDES.reduce((sum, s) => sum + s.frames, 0);
