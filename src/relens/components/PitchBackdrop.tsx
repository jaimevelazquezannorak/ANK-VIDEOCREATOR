import { AbsoluteFill } from "remotion";
import { relens } from "../theme";

/** Las líneas de campo que la app dibuja detrás del expediente. */
export const PitchBackdrop: React.FC<{ color?: string; opacity?: number }> = ({
  color = relens.pitch,
  opacity = 1,
}) => {
  const line = { fill: "none", stroke: color, strokeWidth: 1.35 };

  return (
    <AbsoluteFill style={{ opacity }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1200 760"
        preserveAspectRatio="xMidYMid slice"
      >
        <rect {...line} x="0" y="0" width="1200" height="760" />
        <line {...line} x1="600" y1="0" x2="600" y2="760" />
        <circle {...line} cx="600" cy="380" r="92" />
        <circle fill={color} cx="600" cy="380" r="4" />
        <rect {...line} x="0" y="190" width="165" height="380" />
        <rect {...line} x="0" y="270" width="70" height="220" />
        <circle fill={color} cx="120" cy="380" r="3" />
        <path {...line} d="M 165 300 A 88 88 0 0 1 165 460" />
        <rect {...line} x="1035" y="190" width="165" height="380" />
        <rect {...line} x="1130" y="270" width="70" height="220" />
        <circle fill={color} cx="1080" cy="380" r="3" />
        <path {...line} d="M 1035 300 A 88 88 0 0 0 1035 460" />
      </svg>
    </AbsoluteFill>
  );
};
