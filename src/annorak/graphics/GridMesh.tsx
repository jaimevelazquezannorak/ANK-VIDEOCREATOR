import {
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors } from "../theme";

type Props = {
  cellSize?: number;
  opacity?: number;
  drift?: boolean;
  delay?: number;
};

export const GridMesh: React.FC<Props> = ({
  cellSize = 22,
  opacity = 0.12,
  drift = true,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const reveal = interpolate(frame - delay, [0, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const offset = drift ? interpolate(frame, [0, 600], [0, cellSize], {
    extrapolateRight: "extend",
  }) : 0;

  const lineColor = colors.border;

  const verticalCount = Math.ceil(width / cellSize) + 2;
  const horizontalCount = Math.ceil(height / cellSize) + 2;

  return (
    <svg
      width={width}
      height={height}
      style={{
        position: "absolute",
        inset: 0,
        opacity: opacity * reveal,
      }}
    >
      {Array.from({ length: verticalCount }).map((_, i) => {
        const x = i * cellSize - offset;
        return (
          <line
            key={`v-${i}`}
            x1={x}
            y1={0}
            x2={x}
            y2={height}
            stroke={lineColor}
            strokeWidth={1}
          />
        );
      })}
      {Array.from({ length: horizontalCount }).map((_, i) => {
        const y = i * cellSize - offset * 0.6;
        return (
          <line
            key={`h-${i}`}
            x1={0}
            y1={y}
            x2={width}
            y2={y}
            stroke={lineColor}
            strokeWidth={1}
          />
        );
      })}
    </svg>
  );
};
