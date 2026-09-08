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
import { SceneCanvas } from "../components/SceneCanvas";
import { CanvasVignette } from "../graphics/CanvasVignette";
import { CornerFrame } from "../graphics/CornerFrame";
import { DrawRule } from "../graphics/DrawRule";
import { GridMesh } from "../graphics/GridMesh";
import { LightSweep } from "../graphics/LightSweep";
import { enterSpring, springEnter } from "../motion";
import { useLayout } from "../layout";
import { colors } from "../theme";

/** Portada: solo logo oficial */
export const Scene01Opening: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const layout = useLayout();

  const reveal = spring({
    fps,
    frame: frame - 8,
    config: springEnter,
  });

  const logoWidth = layout.isFeed
    ? width * 0.78
    : Math.min(width * 0.38, 640);

  const logoHeightEstimate = logoWidth * 0.28;
  const framePadX = layout.isFeed ? 28 : 36;
  const framePadY = layout.isFeed ? 22 : 28;
  const frameW = logoWidth + framePadX * 2;
  const frameH = logoHeightEstimate + framePadY * 2;

  const maskScale = interpolate(reveal, [0, 1], [1.08, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const logoLift = interpolate(reveal, [0, 1], [14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const gridPulse = interpolate(frame, [0, 90, 180], [0.06, 0.1, 0.08], {
    extrapolateRight: "clamp",
  });

  const breathe = interpolate(
    frame,
    [70, 120, 180],
    [1, 1.012, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.sin),
    },
  );

  const frameOpacity = enterSpring(frame, fps, 42);

  return (
    <SceneCanvas variant="dark">
      <GridMesh cellSize={26} opacity={gridPulse} delay={0} drift />
      <LightSweep delay={22} duration={56} peakOpacity={0.06} angleDeg={-14} />
      <LightSweep
        delay={118}
        duration={52}
        peakOpacity={0.045}
        angleDeg={12}
        bandWidth={0.18}
      />
      <CanvasVignette strength={0.38} />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            width: frameW,
            height: frameH,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: `scale(${breathe})`,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: frameOpacity,
            }}
          >
            <CornerFrame
              width={frameW}
              height={frameH}
              inset={0}
              delay={38}
              color={colors.borderStrong}
            />
          </div>

          <DrawRule
            length={frameW * 0.32}
            delay={52}
            duration={26}
            color={colors.border}
            style={{
              position: "absolute",
              top: -framePadY - 18,
              left: "50%",
              marginLeft: -(frameW * 0.32) / 2,
              opacity: enterSpring(frame, fps, 52),
            }}
          />
          <DrawRule
            length={frameW * 0.32}
            delay={58}
            duration={26}
            color={colors.border}
            style={{
              position: "absolute",
              bottom: -framePadY - 18,
              left: "50%",
              marginLeft: -(frameW * 0.32) / 2,
              opacity: enterSpring(frame, fps, 58),
            }}
          />

          <div
            style={{
              overflow: "hidden",
              clipPath: `inset(${(1 - reveal) * 48}% 0 ${(1 - reveal) * 48}% 0)`,
              transform: `scale(${maskScale}) translateY(${logoLift}px)`,
            }}
          >
            <Img
              src={staticFile("logo-annorak-white.png")}
              style={{
                width: logoWidth,
                height: "auto",
                opacity: reveal,
                filter: `blur(${(1 - reveal) * 6}px)`,
              }}
            />
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          pointerEvents: "none",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: layout.isFeed ? height * 0.06 : 48,
          opacity: enterSpring(frame, fps, 145),
        }}
      >
        <DrawRule
          length={layout.isFeed ? width * 0.2 : 120}
          delay={145}
          duration={20}
          thickness={1}
          color={colors.border}
        />
      </AbsoluteFill>
    </SceneCanvas>
  );
};
