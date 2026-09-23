import { Composition } from "remotion";
import { RelensSalesVideo } from "./RelensSalesVideo";
import { RELENS_FPS, RELENS_FRAMES } from "./theme";

export const RelensCompositions = () => {
  return (
    <Composition
      id="RelensSales"
      component={RelensSalesVideo}
      durationInFrames={RELENS_FRAMES}
      fps={RELENS_FPS}
      width={1920}
      height={1080}
      defaultProps={{ music: true }}
    />
  );
};
