import { AbsoluteFill, Series } from "remotion";
import { interFontFamily } from "./fonts";
import { Scene01Opening } from "./scenes/Scene01Opening";
import { Scene02Problem } from "./scenes/Scene02Problem";
import { Scene03WhatWeDo } from "./scenes/Scene03WhatWeDo";
import { Scene04Sectors } from "./scenes/Scene04Sectors";
import { Scene05HowWeWork } from "./scenes/Scene05HowWeWork";
import { Scene06Trust } from "./scenes/Scene06Trust";
import { Scene07Closing } from "./scenes/Scene07Closing";
import { TIMING } from "./theme";

export const AnnorakCorporateVideo: React.FC = () => {
  const { scenes } = TIMING;

  return (
    <AbsoluteFill style={{ fontFamily: interFontFamily }}>
      <Series>
        <Series.Sequence durationInFrames={scenes.opening}>
          <Scene01Opening />
        </Series.Sequence>
        <Series.Sequence durationInFrames={scenes.problem}>
          <Scene02Problem />
        </Series.Sequence>
        <Series.Sequence durationInFrames={scenes.whatWeDo}>
          <Scene03WhatWeDo />
        </Series.Sequence>
        <Series.Sequence durationInFrames={scenes.sectors}>
          <Scene04Sectors />
        </Series.Sequence>
        <Series.Sequence durationInFrames={scenes.howWeWork}>
          <Scene05HowWeWork />
        </Series.Sequence>
        <Series.Sequence durationInFrames={scenes.trust}>
          <Scene06Trust />
        </Series.Sequence>
        <Series.Sequence durationInFrames={scenes.closing}>
          <Scene07Closing />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
