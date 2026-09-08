import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ColorWipeIn } from "../components/ColorWipe";
import { SceneCanvas } from "../components/SceneCanvas";
import { DrawRule } from "../graphics/DrawRule";
import { GridMesh } from "../graphics/GridMesh";
import { SectorCells } from "../graphics/SectorCells";
import { enterSpring } from "../motion";
import { useLayout } from "../layout";
import { colors } from "../theme";

const SECTORS = [
  "Legal",
  "Fiscal",
  "Laboral",
  "Seguros",
  "Salud",
  "Real Estate",
  "Consultoría",
];

export const Scene04Sectors: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const layout = useLayout();

  const closingProgress = enterSpring(frame, fps, 252);
  const closingY = interpolate(closingProgress, [0, 1], [24, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const vignette = interpolate(frame, [0, 50], [0.08, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <SceneCanvas variant="dark">
      <GridMesh cellSize={28} opacity={0.09} drift={false} delay={4} />
      <ColorWipeIn color={colors.canvas} />
      <AbsoluteFill
        style={{
          pointerEvents: "none",
          background: `radial-gradient(ellipse 85% 70% at 50% 42%, transparent 40%, rgba(0,0,0,${vignette}) 100%)`,
        }}
      />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          padding: `${layout.padY}px ${layout.padX}px`,
        }}
      >
        <div
          style={{
            fontSize: layout.isFeed ? layout.body : layout.body * 1.05,
            width: "100%",
            maxWidth: layout.maxTextWidth,
            margin: "0 auto",
          }}
        >
          <SectorCells
            labels={SECTORS}
            columns={layout.isFeed ? 2 : 4}
          />
        </div>
        <div
          style={{
            marginTop: layout.isFeed ? 44 : 52,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 22,
          }}
        >
          <DrawRule
            length={Math.min(width * 0.48, 500)}
            delay={248}
            duration={26}
            color={colors.textMuted}
          />
          <p
            style={{
              margin: 0,
              textAlign: "center",
              maxWidth: layout.maxTextWidth * 0.92,
              fontSize: layout.headline * 0.78,
              fontWeight: 700,
              lineHeight: 1.22,
              letterSpacing: "-0.03em",
              color: colors.textSecondary,
              opacity: closingProgress,
              transform: `translateY(${closingY}px)`,
            }}
          >
            Cada uno con sus reglas. Nosotros las conocemos.
          </p>
        </div>
      </AbsoluteFill>
    </SceneCanvas>
  );
};
