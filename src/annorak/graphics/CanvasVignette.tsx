import { AbsoluteFill } from "remotion";

type Props = {
  strength?: number;
};

/** Edge falloff on dark canvas; keeps center readable without loud gradients */
export const CanvasVignette: React.FC<Props> = ({ strength = 0.42 }) => {
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        background: `radial-gradient(ellipse 78% 72% at 50% 48%, transparent 0%, transparent 45%, rgba(0,0,0,${strength}) 100%)`,
      }}
    />
  );
};
