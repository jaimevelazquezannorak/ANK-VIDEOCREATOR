import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { springEnter } from "../motion";
import { colors } from "../theme";

type Props = {
  count?: number;
  delay?: number;
  height?: number;
};

const HEIGHT_RATIOS = [0.42, 0.68, 0.52, 0.92, 0.58, 0.76, 0.64];

/** Abstract partner pillars: no logos, only geometry and neutral name-plate bars. */
export const TrustPillars: React.FC<Props> = ({
  count = 6,
  delay = 28,
  height = 168,
}) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  const chartW = Math.min(width * 0.72, 920);
  const padX = 24;
  const innerW = chartW - padX * 2;
  const gap = innerW / (count * 1.55);
  const barW = gap * 0.55;
  const baselineY = height - 8;
  const chartH = height + 36;

  const baselineProgress = spring({
    fps,
    frame: frame - delay + 4,
    config: springEnter,
  });

  const gridOpacity = interpolate(frame, [delay, delay + 30], [0, 0.35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg
      width={chartW}
      height={chartH}
      viewBox={`0 0 ${chartW} ${chartH}`}
      style={{ display: "block", margin: "32px auto 0" }}
      aria-hidden
    >
      {[0.25, 0.5, 0.75].map((t) => {
        const y = baselineY - (baselineY - 16) * t;
        return (
          <line
            key={t}
            x1={padX}
            x2={padX + innerW * baselineProgress}
            y1={y}
            y2={y}
            stroke={colors.borderStrong}
            strokeWidth={1}
            opacity={gridOpacity * 0.35}
          />
        );
      })}
      <line
        x1={padX}
        x2={padX + innerW * baselineProgress}
        y1={baselineY}
        y2={baselineY}
        stroke={colors.ink}
        strokeWidth={2}
      />
      {HEIGHT_RATIOS.slice(0, count).map((ratio, i) => {
        const barDelay = delay + 10 + i * 6;
        const grow = spring({
          fps,
          frame: frame - barDelay,
          config: springEnter,
        });
        const plate = spring({
          fps,
          frame: frame - barDelay - 8,
          config: springEnter,
        });
        const pillarH = (baselineY - 20) * ratio * grow;
        const x = padX + i * (barW + gap) + gap * 0.35;
        const y = baselineY - pillarH;
        const fill = i % 2 === 0 ? colors.paper : colors.lightCanvas;
        const accentH = pillarH * 0.22;

        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={barW}
              height={pillarH}
              fill={fill}
              stroke={colors.ink}
              strokeWidth={1.5}
            />
            <rect
              x={x + 3}
              y={y + 8}
              width={Math.max(2, barW - 6)}
              height={accentH}
              fill={colors.ink}
              opacity={0.06 + grow * 0.04}
            />
            <line
              x1={x - 2}
              x2={x + barW + 2}
              y1={y}
              y2={y}
              stroke={colors.ink}
              strokeWidth={2.5}
              opacity={grow}
            />
            <rect
              x={x + barW * 0.12}
              y={baselineY + 14}
              width={barW * 0.76 * plate}
              height={5}
              fill={colors.ink}
              opacity={0.12 + plate * 0.18}
            />
            <rect
              x={x + barW * 0.12}
              y={baselineY + 24}
              width={barW * 0.52 * plate}
              height={4}
              fill={colors.ink}
              opacity={0.08 + plate * 0.12}
            />
          </g>
        );
      })}
    </svg>
  );
};
