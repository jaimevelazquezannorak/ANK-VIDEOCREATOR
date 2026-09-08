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

/**
 * Escaleta del video de venta (98.4 s @ 30 fps = 2952 frames).
 * Los planos de app se intercalan; las diapositivas de producto no cambian.
 */
export const SALES = [
  { id: "brand", from: 0, duration: 252 },
  { id: "appDash", from: 252, duration: 120 },
  { id: "problem", from: 372, duration: 300 },
  { id: "hardware", from: 672, duration: 360 },
  { id: "appGen", from: 1032, duration: 120 },
  { id: "design", from: 1152, duration: 420 },
  { id: "identity", from: 1572, duration: 300 },
  { id: "appStudents", from: 1872, duration: 120 },
  { id: "printScan", from: 1992, duration: 360 },
  { id: "vision", from: 2352, duration: 360 },
  { id: "closing", from: 2712, duration: 240 },
] as const;

export const SALES_FRAMES = 2952;
