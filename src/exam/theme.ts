/** Tokens PFU Exam App (ANK-EXG `tokens.css`) + escala para 1920x1080. */
export const pfu = {
  blue: "#1B66D6",
  blue700: "#1553B1",
  blue800: "#10428C",
  blue100: "#D2E1F7",
  blue50: "#EDF3FC",
  ricohGray: "#656263",
  ink: "#1A1A1A",
  g700: "#3D3D3D",
  g500: "#8A8A8A",
  g200: "#E6E6E6",
  g100: "#F1F1F1",
  paper: "#F8F8F8",
  white: "#FFFFFF",
  canvas: "#2A2A2A",
  header: "#07090D",
} as const;

/** Escala unica. No inventar sizes sueltos en escenas. */
export const type = {
  display: {
    fontSize: 64,
    fontWeight: 700,
    letterSpacing: "-0.02em",
    lineHeight: 1.1,
  },
  title: {
    fontSize: 48,
    fontWeight: 700,
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
  logoW: 142,
  logoClose: 235,
  ruleW: 48,
  ruleH: 2,
  stackGap: 20,
  maxCopy: 1120,
  /** Cintillo → titular */
  eyebrowToTitle: 14,
  /** Titular → subtitulo / lead */
  titleToLead: 36,
  /** Bloque de copia → cuerpo (tabla, cards, B-roll chips) */
  headToBody: 72,
} as const;

export const EXAM_FPS = 30;

export const INTRO_FRAMES = 252;

/** Semanticos de estado (tokens.css de la app). */
export const state = {
  success: "#2E7D5B",
  successBg: "#E8F3EE",
  warning: "#B8862A",
  warningBg: "#F8F0DF",
  info: "#356FA3",
  infoBg: "#E9F1F8",
  g300: "#CCCCCC",
  g600: "#656263",
  g800: "#2C2C2C",
} as const;

export type SceneId =
  | "brand"
  | "appDash"
  | "problem"
  | "hardware"
  | "appGen"
  | "design"
  | "identity"
  | "appStudents"
  | "printScan"
  | "vision"
  | "closing";

export const SCENE_ORDER: SceneId[] = [
  "brand",
  "appDash",
  "problem",
  "hardware",
  "appGen",
  "design",
  "identity",
  "appStudents",
  "printScan",
  "vision",
  "closing",
];

/**
 * Escaleta del video de venta, gobernada por la locucion.
 * Cada escena arranca ~0,3 s antes de que empiece su bloque hablado.
 * Los instantes salen de `silencedetect` sobre `public/exam/vo/{es,en}.mp3`
 * (pausas >= 1 s = los <break> de docs/vo/). Ultimo valor: fin del video.
 */
export const VO_CUES_S: Record<"es" | "en", number[]> = {
  /** Voz Martin Osborne, 130,2 s. */
  es: [0, 12.05, 18.5, 32.0, 47.0, 55.3, 70.1, 83.8, 89.7, 104.9, 118.65, 131.4],
  /** Voz Adrian, 132,9 s. */
  en: [0, 11.9, 17.8, 29.5, 46.6, 54.5, 68.6, 81.9, 87.5, 103.3, 119.3, 134.2],
};

export type SalesScene = { id: SceneId; from: number; duration: number };

/** Escaleta en frames para un idioma. */
export const salesSchedule = (lang: "es" | "en"): SalesScene[] => {
  const cues = VO_CUES_S[lang].map((s) => Math.round(s * EXAM_FPS));
  return SCENE_ORDER.map((id, i) => ({
    id,
    from: cues[i],
    duration: cues[i + 1] - cues[i],
  }));
};

export const salesFrames = (lang: "es" | "en") =>
  Math.round(VO_CUES_S[lang][VO_CUES_S[lang].length - 1] * EXAM_FPS);
