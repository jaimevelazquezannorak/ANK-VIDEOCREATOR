import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { enterSpring } from "../motion";
import { useLayout } from "../layout";
import { colors } from "../theme";

type Props = {
  lines: string[];
  variant?: "dark" | "light";
  fontSize?: number;
  fontWeight?: number;
  lineHeight?: number;
  /** frames each line stays after its entrance */
  holdPerLine?: number;
  enterDuration?: number;
  exitDuration?: number;
};

export const SequentialLines: React.FC<Props> = ({
  lines,
  variant = "dark",
  fontSize,
  fontWeight = 700,
  lineHeight = 1.15,
  holdPerLine,
  enterDuration = 18,
  exitDuration = 10,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const layout = useLayout();
  const size = fontSize ?? layout.headline;
  const hold = holdPerLine ?? Math.floor(540 / lines.length) - enterDuration - exitDuration;

  const textColor =
    variant === "dark" ? colors.textPrimary : colors.ink;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: `${layout.padY}px ${layout.padX}px`,
      }}
    >
      {lines.map((line, index) => {
        const start = index * (hold + enterDuration + exitDuration);
        const endEnter = start + enterDuration;
        const endHold = endEnter + hold;
        const endExit = endHold + exitDuration;

        if (frame < start || frame > endExit) {
          return null;
        }

        const enter = enterSpring(frame, fps, start);
        const opacity =
          frame <= endHold
            ? enter
            : interpolate(
                frame,
                [endHold, endExit],
                [1, 0],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.out(Easing.quad),
                },
              );

        const translateY =
          frame <= endHold
            ? (1 - enter) * 28
            : interpolate(frame, [endHold, endExit], [0, -16], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });

        return (
          <AbsoluteFill
            key={line}
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: `${layout.padY}px ${layout.padX}px`,
            }}
          >
            <p
              style={{
                margin: 0,
                maxWidth: layout.maxTextWidth,
                textAlign: "center",
                fontSize: size,
                fontWeight,
                lineHeight,
                letterSpacing: "-0.03em",
                color: textColor,
                opacity,
                transform: `translateY(${translateY}px)`,
              }}
            >
              {line}
            </p>
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
};
