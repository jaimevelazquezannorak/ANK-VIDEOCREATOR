import { Easing, interpolate, useCurrentFrame } from "remotion";
import { colors } from "../theme";

type Props = {
  direction?: "horizontal" | "vertical";
  length: number;
  thickness?: number;
  delay?: number;
  duration?: number;
  color?: string;
  style?: React.CSSProperties;
};

export const DrawRule: React.FC<Props> = ({
  direction = "horizontal",
  length,
  thickness = 2,
  delay = 0,
  duration = 22,
  color = colors.borderStrong,
  style,
}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame - delay, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const isH = direction === "horizontal";

  return (
    <div
      style={{
        width: isH ? length : thickness,
        height: isH ? thickness : length,
        backgroundColor: color,
        transform: isH ? `scaleX(${scale})` : `scaleY(${scale})`,
        transformOrigin: isH ? "left center" : "center top",
        ...style,
      }}
    />
  );
};
