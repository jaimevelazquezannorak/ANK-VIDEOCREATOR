import { useCurrentFrame, useVideoConfig } from "remotion";
import { enterSpring } from "../motion";

type Props = {
  text: string;
  delay?: number;
  style?: React.CSSProperties;
  letterDelay?: number;
};

export const StaggeredLetters: React.FC<Props> = ({
  text,
  delay = 0,
  style,
  letterDelay = 2,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <span style={{ display: "inline", ...style }}>
      {text.split("").map((char, i) => {
        const progress = enterSpring(frame, fps, delay + i * letterDelay);
        const opacity = progress;
        const translateY = (1 - progress) * 12;

        return (
          <span
            key={`${char}-${i}`}
            style={{
              display: "inline-block",
              opacity,
              transform: `translateY(${translateY}px)`,
              whiteSpace: char === " " ? "pre" : undefined,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </span>
  );
};
