import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ColorWipeIn } from "../components/ColorWipe";
import { SceneCanvas } from "../components/SceneCanvas";
import { AnorakPeak } from "../graphics/AnorakPeak";
import { ClosingGeometry } from "../graphics/ProcessRail";
import { DrawRule } from "../graphics/DrawRule";
import { GridMesh } from "../graphics/GridMesh";
import { enterSpring, springEnter } from "../motion";
import { useLayout } from "../layout";
import { colors } from "../theme";

const SCENE_FRAMES = 300;
const OUTRO_START = 246;

export const Scene07Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const layout = useLayout();

  const claimProgress = enterSpring(frame, fps, 26);
  const logoSpring = spring({
    fps,
    frame: frame - 102,
    config: springEnter,
  });
  const urlProgress = enterSpring(frame, fps, 132);

  const outro = interpolate(frame, [OUTRO_START, SCENE_FRAMES], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });

  const holdOpacity = 1 - outro * 0.92;
  const gridBase = interpolate(frame, [8, 48], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const gridOpacity = 0.1 * gridBase * (1 - outro * 0.85);

  const logoWidth = layout.isFeed
    ? width * 0.56
    : Math.min(width * 0.3, 440);

  const logoMaskScale = interpolate(logoSpring, [0, 1], [1.05, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const contentLift = interpolate(outro, [0, 1], [0, -18]);
  const contentScale = interpolate(outro, [0, 1], [1, 0.985]);

  const peakSize = layout.isFeed ? 112 : 156;

  return (
    <SceneCanvas variant="dark">
      <GridMesh cellSize={24} opacity={gridOpacity} drift delay={10} />
      <ClosingGeometry />
      <ColorWipeIn color={colors.canvas} durationInFrames={12} blocks={4} />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: layout.padX,
          opacity: holdOpacity,
          transform: `translateY(${contentLift}px) scale(${contentScale})`,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: layout.isFeed ? "26%" : "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: enterSpring(frame, fps, 12) * (1 - outro * 0.6),
          }}
        >
          <AnorakPeak size={peakSize} delay={10} strokeOnly />
        </div>

        <div style={{ textAlign: "center", maxWidth: layout.maxTextWidth }}>
          <DrawRule
            length={Math.min(300, width * 0.24)}
            delay={18}
            color={colors.borderStrong}
            style={{ margin: "0 auto 28px" }}
          />
          <p
            style={{
              margin: 0,
              fontSize: layout.displayLine * 0.82,
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.04em",
              color: colors.textPrimary,
              opacity: claimProgress,
              transform: `translateY(${(1 - claimProgress) * 22}px)`,
            }}
          >
            Software que entiende tu sector.
          </p>

          <div
            style={{
              marginTop: layout.isFeed ? 44 : 60,
              overflow: "hidden",
              clipPath: `inset(${(1 - logoSpring) * 42}% 0 ${(1 - logoSpring) * 42}% 0)`,
              transform: `scale(${logoMaskScale})`,
            }}
          >
            <Img
              src={staticFile("logo-annorak-white.png")}
              style={{
                width: logoWidth,
                height: "auto",
                opacity: logoSpring,
                filter: `blur(${(1 - logoSpring) * 4}px)`,
              }}
            />
          </div>

          <DrawRule
            length={Math.min(160, width * 0.12)}
            delay={128}
            thickness={1}
            color={colors.border}
            style={{ margin: "28px auto 20px" }}
          />
          <p
            style={{
              margin: 0,
              fontSize: layout.body,
              fontWeight: 500,
              letterSpacing: "0.08em",
              color: colors.textSecondary,
              opacity: urlProgress,
              transform: `translateY(${(1 - urlProgress) * 10}px)`,
            }}
          >
            annorak.com
          </p>
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          pointerEvents: "none",
          background: `radial-gradient(ellipse 72% 68% at 50% 44%, transparent 0%, ${colors.canvas} 100%)`,
          opacity: 0.55 + outro * 0.45,
        }}
      />
      <AbsoluteFill
        style={{
          pointerEvents: "none",
          backgroundColor: colors.canvas,
          opacity: outro,
        }}
      />
    </SceneCanvas>
  );
};
