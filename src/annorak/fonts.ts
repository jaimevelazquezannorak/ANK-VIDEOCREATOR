import { loadFont } from "@remotion/google-fonts/Inter";

export const { fontFamily: interFontFamily } = loadFont("normal", {
  weights: ["400", "500", "700", "800"],
  subsets: ["latin"],
});
