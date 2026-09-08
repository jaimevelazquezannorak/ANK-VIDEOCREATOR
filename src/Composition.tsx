import { Composition } from "remotion";
import { AnnorakCorporateVideo } from "./annorak/AnnorakCorporateVideo";
import { TIMING } from "./annorak/theme";

export const AnnorakCorporateComposition = () => {
  return null;
};

export const AnnorakCorporateFeedComposition = () => {
  return (
    <Composition
      id="AnnorakCorporateFeed"
      component={AnnorakCorporateVideo}
      durationInFrames={TIMING.totalFrames}
      fps={TIMING.fps}
      width={1080}
      height={1350}
    />
  );
};
