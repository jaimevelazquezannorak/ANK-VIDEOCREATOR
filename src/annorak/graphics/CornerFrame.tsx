import { useCurrentFrame, useVideoConfig } from "remotion";
import { enterSpring } from "../motion";
import { colors } from "../theme";

type Props = {
  width: number;
  height: number;
  inset?: number;
  delay?: number;
  color?: string;
};

type CornerSpec = {
  left: number;
  top: number;
  borderTop?: boolean;
  borderBottom?: boolean;
  borderLeft?: boolean;
  borderRight?: boolean;
};

export const CornerFrame: React.FC<Props> = ({
  width,
  height,
  inset = 0,
  delay = 0,
  color = colors.borderStrong,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = enterSpring(frame, fps, delay);
  const arm = Math.min(width, height) * 0.12 * p;

  const corners: CornerSpec[] = [
    { left: inset, top: inset, borderTop: true, borderLeft: true },
    {
      left: inset + width - arm,
      top: inset,
      borderTop: true,
      borderRight: true,
    },
    {
      left: inset,
      top: inset + height - arm,
      borderBottom: true,
      borderLeft: true,
    },
    {
      left: inset + width - arm,
      top: inset + height - arm,
      borderBottom: true,
      borderRight: true,
    },
  ];

  return (
    <>
      {corners.map((c, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: c.left,
            top: c.top,
            width: arm,
            height: arm,
            borderTop: c.borderTop ? `2px solid ${color}` : undefined,
            borderBottom: c.borderBottom ? `2px solid ${color}` : undefined,
            borderLeft: c.borderLeft ? `2px solid ${color}` : undefined,
            borderRight: c.borderRight ? `2px solid ${color}` : undefined,
            opacity: p,
          }}
        />
      ))}
    </>
  );
};
