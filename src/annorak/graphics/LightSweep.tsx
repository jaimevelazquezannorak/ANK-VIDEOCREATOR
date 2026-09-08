import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors } from "../theme";

type Props = {
  /** Frame when the sweep begins */
  delay?: number;
  /** Length of the sweep in frames */
  duration?: number;
  /** Peak opacity of the highlight band (keep low for monochrome) */
  peakOpacity?: number;
  /** Band width as fraction of diagonal span */
  bandWidth?: number;
  angleDeg?: number;
};

/** Soft monochrome highlight band drifting across the canvas */
export const LightSweep: React.FC<Props> = ({
  delay = 0,
  duration = 48,
  peakOpacity = 0.07,
  bandWidth = 0.22,
  angleDeg = -18,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const span = Math.hypot(width, height) * 1.4;
  const progress = interpolate(frame - delay, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  const envelope = interpolate(
    frame - delay,
    [0, duration * 0.35, duration],
    [0, peakOpacity, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const travel = interpolate(progress, [0, 1], [-span * 0.55, span * 0.55]);

  return (
    <AbsoluteFill style={{ pointerEvents: "none", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          left: width / 2,
          top: height / 2,
          width: span,
          height: span * bandWidth,
          transform: `translate(-50%, -50%) translateX(${travel}px) rotate(${angleDeg}deg)`,
          background: `linear-gradient(90deg, transparent 0%, ${colors.white} 48%, ${colors.white} 52%, transparent 100%)`,
          opacity: envelope,
          mixBlendMode: "soft-light",
        }}
      />
    </AbsoluteFill>
  );
};
