import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";
import { loadFont as loadSerif } from "@remotion/google-fonts/SourceSerif4";

export const { fontFamily: pfuSans } = loadInter("normal", {
  weights: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const { fontFamily: pfuMono } = loadMono("normal", {
  weights: ["400", "500"],
  subsets: ["latin"],
});

export const { fontFamily: pfuSerif } = loadSerif("normal", {
  weights: ["400", "500", "600"],
  subsets: ["latin"],
});
