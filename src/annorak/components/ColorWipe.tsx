import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors } from "../theme";

type Props = {
  direction?: "left" | "right";
  color?: string;
  durationInFrames?: number;
  blocks?: number;
};

/** Barrido con bloques geométricos */
export const ColorWipeIn: React.FC<Props> = ({
  direction = "right",
  color = colors.white,
  durationInFrames = 16,
  blocks = 3,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  return (
    <AbsoluteFill style={{ pointerEvents: "none", zIndex: 20 }}>
      {Array.from({ length: blocks }).map((_, i) => {
        const delay = i * 4;
        const progress = interpolate(
          frame - delay,
          [0, durationInFrames],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          },
        );

        const blockH = height / blocks;
        const y = i * blockH;
        const x =
          direction === "right"
            ? interpolate(progress, [0, 1], [-width, width])
            : interpolate(progress, [0, 1], [width, -width]);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width,
              height: blockH + 1,
              backgroundColor: color,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
