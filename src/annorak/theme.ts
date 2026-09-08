export const colors = {
  canvas: "#1E1E1E",
  surface: "#252525",
  raised: "#2E2E2E",
  overlay: "#383838",
  textPrimary: "#EDEDED",
  textSecondary: "#ABABAB",
  textMuted: "#7C7C7C",
  white: "#FFFFFF",
  paper: "#FFFFFF",
  lightCanvas: "#F5F5F5",
  ink: "#1A1A1A",
  border: "#363636",
  borderStrong: "#484848",
} as const;

export const TIMING = {
  fps: 30,
  totalFrames: 2280,
  scenes: {
    opening: 180,
    problem: 360,
    whatWeDo: 420,
    sectors: 360,
    howWeWork: 420,
    trust: 240,
    closing: 300,
  },
} as const;
