import { loadFont as loadPlex } from "@remotion/google-fonts/IBMPlexSans";
import { loadFont as loadFraunces } from "@remotion/google-fonts/Fraunces";

/** Misma pareja que la app: IBM Plex Sans + Fraunces. */
export const { fontFamily: relensSans } = loadPlex("normal", {
  weights: ["400", "500", "600"],
  subsets: ["latin"],
});

export const { fontFamily: relensSerif } = loadFraunces("normal", {
  weights: ["500", "600"],
  subsets: ["latin"],
});
