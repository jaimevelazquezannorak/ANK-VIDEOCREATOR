import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { pfu } from "./theme";

export const IntroGrid: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 22], [0, 0.07], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        opacity,
        backgroundImage:
          "linear-gradient(#3A3A3A 1px, transparent 1px), linear-gradient(90deg, #3A3A3A 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }}
    />
  );
};

export const IntroSweep: React.FC<{ delay?: number; duration?: number }> = ({
  delay = 48,
  duration = 70,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const span = Math.hypot(width, height);
  const travel = interpolate(frame - delay, [0, duration], [-span * 0.5, span * 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const envelope = interpolate(
    frame - delay,
    [0, 20, duration - 20, duration],
    [0, 0.12, 0.12, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ pointerEvents: "none", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          left: width / 2,
          top: height / 2,
          width: span,
          height: 180,
          translate: `${travel}px 0px`,
          rotate: "-18deg",
          background: `linear-gradient(90deg, transparent, ${pfu.blue} 50%, transparent)`,
          opacity: envelope,
        }}
      />
    </AbsoluteFill>
  );
};

export const IntroRings: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const opacity = interpolate(frame, [0, 22], [0, 0.28], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg
      width={width}
      height={height}
      style={{ position: "absolute", inset: 0, opacity }}
    >
      <circle
        cx={width / 2}
        cy={height / 2}
        r={268}
        fill="none"
        stroke={pfu.blue}
        strokeOpacity={0.35}
        strokeWidth={1}
      />
      <circle
        cx={width / 2}
        cy={height / 2}
        r={380}
        fill="none"
        stroke="#4A4A4A"
        strokeWidth={1}
      />
    </svg>
  );
};
