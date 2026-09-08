import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { ColorWipeIn } from "../components/ColorWipe";
import { SceneCanvas } from "../components/SceneCanvas";
import { CornerFrame } from "../graphics/CornerFrame";
import { DrawRule } from "../graphics/DrawRule";
import { GridMesh } from "../graphics/GridMesh";
import { SlideBlocks } from "../graphics/SlideBlocks";
import { TrustPillars } from "../graphics/TrustPillars";
import { enterSpring } from "../motion";
import { useLayout } from "../layout";
import { colors } from "../theme";

const BODY =
  "Trabajamos con firmas líderes de auditoría, administración pública y tecnología.";

export const Scene06Trust: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const layout = useLayout();

  const labelProgress = enterSpring(frame, fps, 10);
  const bodyProgress = enterSpring(frame, fps, 52);
  const frameW = layout.maxTextWidth;
  const frameH = layout.isFeed ? 480 : 440;
  const pillarH = layout.isFeed ? 150 : 168;

  return (
    <SceneCanvas variant="light">
      <GridMesh cellSize={32} opacity={0.045} drift={false} />
      <ColorWipeIn color={colors.paper} />
      <SlideBlocks
        blocks={[
          {
            w: width,
            h: 4,
            x: 0,
            y: height * 0.12,
            delay: 4,
            fill: colors.paper,
          },
          {
            w: width,
            h: 4,
            x: 0,
            y: height * 0.88,
            delay: 10,
            fill: colors.paper,
          },
        ]}
      />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: layout.padX,
        }}
      >
        <div
          style={{
            position: "relative",
            maxWidth: frameW,
            width: "100%",
            textAlign: "center",
            padding: layout.isFeed ? 28 : 36,
          }}
        >
          <CornerFrame
            width={frameW}
            height={frameH}
            delay={6}
            color={colors.ink}
            inset={4}
          />
          <p
            style={{
              margin: 0,
              fontSize: layout.label,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#6B6B6B",
              opacity: labelProgress,
              transform: `translateY(${(1 - labelProgress) * 12}px)`,
            }}
          >
            Ya confían en nosotros:
          </p>
          <DrawRule
            length={Math.min(160, frameW * 0.22)}
            delay={18}
            color={colors.ink}
            style={{ margin: "16px auto 0" }}
          />
          <TrustPillars
            count={layout.isFeed ? 5 : 6}
            delay={26}
            height={pillarH}
          />
          <DrawRule
            length={Math.min(frameW * 0.55, 480)}
            delay={44}
            color={colors.borderStrong}
            thickness={1}
            style={{ margin: `${layout.isFeed ? 24 : 28}px auto 0` }}
          />
          <p
            style={{
              marginTop: layout.isFeed ? 24 : 28,
              marginBottom: 0,
              fontSize: layout.title * 0.82,
              fontWeight: 700,
              lineHeight: 1.25,
              letterSpacing: "-0.03em",
              color: colors.ink,
              opacity: bodyProgress,
              transform: `translateY(${(1 - bodyProgress) * 20}px)`,
              maxWidth: frameW * 0.92,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {BODY}
          </p>
        </div>
      </AbsoluteFill>
    </SceneCanvas>
  );
};
