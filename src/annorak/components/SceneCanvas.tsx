import { AbsoluteFill } from "remotion";
import { colors } from "../theme";

type Props = {
  variant: "dark" | "light";
  children: React.ReactNode;
};

export const SceneCanvas: React.FC<Props> = ({ variant, children }) => {
  const background =
    variant === "dark" ? colors.canvas : colors.lightCanvas;
  const color = variant === "dark" ? colors.textPrimary : colors.ink;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: background,
        color,
        fontFamily: "inherit",
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
