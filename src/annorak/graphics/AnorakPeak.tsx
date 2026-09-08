import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { springEnter } from "../motion";
import { colors } from "../theme";

type Props = {
  size?: number;
  x?: number;
  y?: number;
  delay?: number;
  strokeOnly?: boolean;
  color?: string;
};

/** Abstract hood peak from the Annorak wordmark */
export const AnorakPeak: React.FC<Props> = ({
  size = 220,
  x = 0,
  y = 0,
  delay = 0,
  strokeOnly = false,
  color = colors.textPrimary,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    fps,
    frame: frame - delay,
    config: springEnter,
  });

  const draw = interpolate(progress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const path = `M ${x} ${y + size} L ${x + size / 2} ${y} L ${x + size} ${y + size} Z`;
  const perimeter = size * 2.4;
  const dashOffset = perimeter * (1 - draw);

  return (
    <svg
      width={size}
      height={size}
      style={{
        overflow: "visible",
        transform: `scale(${0.85 + progress * 0.15})`,
        transformOrigin: "center center",
      }}
    >
      <path
        d={path}
        fill={strokeOnly ? "none" : color}
        fillOpacity={strokeOnly ? 0 : 0.08 + progress * 0.06}
        stroke={color}
        strokeWidth={strokeOnly ? 2 : 1.5}
        strokeDasharray={perimeter}
        strokeDashoffset={dashOffset}
        strokeLinejoin="miter"
      />
    </svg>
  );
};
