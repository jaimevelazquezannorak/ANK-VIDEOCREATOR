import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { springEnter } from "../motion";
import { colors } from "../theme";

type Props = {
  steps: number;
  activeStep: number;
  height: number;
  /** Frames per highlighted step (sync with scene). */
  segFrames?: number;
};

export const ProcessRail: React.FC<Props> = ({
  steps,
  activeStep,
  height,
  segFrames = 140,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const gap = height / (steps - 1);

  const trackReveal = spring({
    fps,
    frame: frame - 6,
    config: springEnter,
  });

  const segmentSpring = spring({
    fps,
    frame: frame - activeStep * segFrames - 8,
    config: springEnter,
  });

  const lineHeight =
    activeStep <= 0
      ? 0
      : (activeStep - 1) * gap + gap * segmentSpring;

  return (
    <div
      style={{
        position: "relative",
        width: 56,
        height,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 27,
          top: 0,
          width: 1,
          height: height * trackReveal,
          backgroundColor: colors.border,
          opacity: 0.65,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 26,
          top: 0,
          width: 3,
          height: lineHeight * trackReveal,
          backgroundColor: colors.textPrimary,
          opacity: 0.85,
        }}
      />
      {Array.from({ length: steps }).map((_, i) => {
        const nodeEnter = spring({
          fps,
          frame: frame - 14 - i * 10,
          config: springEnter,
        });
        const isActive = i === activeStep;
        const isComplete = i < activeStep;
        const nodeFocus = isActive
          ? spring({
              fps,
              frame: frame - activeStep * segFrames - 4,
              config: springEnter,
            })
          : 0;
        const size = 22 + nodeFocus * 6;
        const rotation = 45 + (isActive ? nodeFocus * 90 : 0);
        const borderColor = isActive || isComplete
          ? colors.textPrimary
          : colors.border;
        const fill =
          isActive ? colors.overlay : isComplete ? colors.raised : colors.surface;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: i * gap - size / 2,
              left: 28 - size / 2,
              width: size,
              height: size,
            }}
          >
            {isActive ? (
              <div
                style={{
                  position: "absolute",
                  inset: -10,
                  border: `1px solid ${colors.borderStrong}`,
                  opacity: nodeFocus * 0.55,
                  transform: `rotate(45deg) scale(${0.6 + nodeFocus * 0.55})`,
                }}
              />
            ) : null}
            <div
              style={{
                width: size,
                height: size,
                border: `2px solid ${borderColor}`,
                backgroundColor: fill,
                opacity: nodeEnter,
                transform: `scale(${nodeEnter * (isActive ? 1 : isComplete ? 0.92 : 0.58)}) rotate(${rotation}deg)`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

type BarProps = { count?: number; delay?: number };

export const TrustBars: React.FC<BarProps> = ({ count = 6, delay = 40 }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const heights = [0.45, 0.72, 0.55, 0.88, 0.62, 0.78];
  const barW = Math.min(48, (width * 0.7) / count);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        gap: barW * 0.35,
        height: 140,
        marginTop: 36,
      }}
    >
      {heights.slice(0, count).map((h, i) => {
        const p = spring({
          fps,
          frame: frame - delay - i * 5,
          config: springEnter,
        });
        return (
          <div
            key={i}
            style={{
              width: barW,
              height: 140 * h * p,
              border: `1px solid ${colors.border}`,
              backgroundColor: i % 2 === 0 ? colors.paper : colors.lightCanvas,
              transform: `translateY(${(1 - p) * 30}px)`,
            }}
          />
        );
      })}
    </div>
  );
};

type ClosingGeometryProps = {
  outroStart?: number;
};

export const ClosingGeometry: React.FC<ClosingGeometryProps> = ({
  outroStart = 246,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const cx = width / 2;
  const cy = height * 0.36;
  const maxR = Math.min(width, height) * 0.42;

  const ring1 = spring({ fps, frame: frame - 4, config: springEnter });
  const ring2 = spring({ fps, frame: frame - 16, config: springEnter });
  const ring3 = spring({ fps, frame: frame - 28, config: springEnter });
  const ticks = spring({ fps, frame: frame - 36, config: springEnter });

  const fade = interpolate(frame, [outroStart, outroStart + 54], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const rotA = interpolate(frame, [0, 300], [0, 11]);
  const rotB = interpolate(frame, [0, 300], [0, -16]);
  const rotC = interpolate(frame, [0, 300], [45, 38]);

  const radii = [
    { r: maxR * 0.72 * ring1, rot: rotA, stroke: colors.border, w: 1 },
    { r: maxR * 0.5 * ring2, rot: rotB, stroke: colors.textMuted, w: 1 },
    {
      r: maxR * 0.32 * ring3,
      rot: rotC,
      stroke: colors.borderStrong,
      w: 1.5,
    },
  ];

  return (
    <svg
      width={width}
      height={height}
      style={{
        position: "absolute",
        inset: 0,
        opacity: 0.55 * fade,
        pointerEvents: "none",
      }}
    >
      {radii.map(({ r, rot, stroke, w }, i) => (
        <g
          key={i}
          transform={`translate(${cx} ${cy}) rotate(${rot}) translate(${-cx} ${-cy})`}
        >
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={stroke}
            strokeWidth={w}
          />
        </g>
      ))}
      {[0, 90, 45, 135].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const len = maxR * 0.78 * ticks;
        const x2 = cx + Math.cos(rad) * len;
        const y2 = cy + Math.sin(rad) * len;
        return (
          <line
            key={`tick-${deg}`}
            x1={cx}
            y1={cy}
            x2={x2}
            y2={y2}
            stroke={colors.border}
            strokeWidth={i < 2 ? 1 : 0.75}
            strokeDasharray={i < 2 ? undefined : "4 8"}
            opacity={i < 2 ? 0.35 : 0.22}
          />
        );
      })}
      <rect
        x={cx - 6 * ticks}
        y={cy - 6 * ticks}
        width={12 * ticks}
        height={12 * ticks}
        fill="none"
        stroke={colors.textMuted}
        strokeWidth={1}
        transform={`rotate(45 ${cx} ${cy})`}
        opacity={0.4}
      />
    </svg>
  );
};
