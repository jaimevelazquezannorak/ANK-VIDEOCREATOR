import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ColorWipeIn } from "../components/ColorWipe";
import { SceneCanvas } from "../components/SceneCanvas";
import { DrawRule } from "../graphics/DrawRule";
import { GridMesh } from "../graphics/GridMesh";
import { ProcessRail } from "../graphics/ProcessRail";
import { SlideBlocks } from "../graphics/SlideBlocks";
import { enterSpring, springEnter } from "../motion";
import { useLayout } from "../layout";
import { colors } from "../theme";

const STEPS = [
  "Entendemos tu operación y tu marco normativo.",
  "Construimos la herramienta exacta, sin módulos que sobran.",
  "La desplegamos, formamos a tu equipo y medimos el resultado.",
];

const SEG = 140;

export const Scene05HowWeWork: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const layout = useLayout();

  const activeStep = Math.min(2, Math.floor(frame / SEG));
  const headerProgress = enterSpring(frame, fps, 10);
  const railHeight = layout.isFeed ? 300 : 340;

  return (
    <SceneCanvas variant="dark">
      <GridMesh opacity={0.07} drift={false} />
      <ColorWipeIn color={colors.surface} />
      <SlideBlocks
        blocks={[
          {
            w: width,
            h: 6,
            x: 0,
            y: height * 0.2,
            delay: 6,
            fill: colors.raised,
          },
          {
            w: width,
            h: 6,
            x: 0,
            y: height * 0.8,
            delay: 12,
            fill: colors.raised,
          },
        ]}
      />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          padding: `${layout.padY}px ${layout.padX}px`,
        }}
      >
        <div
          style={{
            maxWidth: layout.maxTextWidth,
            margin: "0 auto",
            width: "100%",
          }}
        >
          <div
            style={{
              marginBottom: layout.isFeed ? 28 : 40,
              opacity: headerProgress,
              transform: `translateY(${(1 - headerProgress) * 20}px)`,
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: layout.label,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: colors.textMuted,
              }}
            >
              Cómo trabajamos
            </p>
            <DrawRule
              length={layout.isFeed ? 72 : 96}
              delay={18}
              thickness={2}
              color={colors.textPrimary}
              style={{ marginTop: 14 }}
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: layout.isFeed ? 20 : 40,
              alignItems: "stretch",
            }}
          >
            <ProcessRail
              steps={3}
              activeStep={activeStep}
              height={railHeight}
              segFrames={SEG}
            />
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: layout.isFeed ? 20 : 28,
              }}
            >
              {STEPS.map((text, i) => {
                const rowEnter = enterSpring(frame, fps, 22 + i * 12);
                const isActive = i === activeStep;
                const expand =
                  isActive
                    ? spring({
                        fps,
                        frame: frame - activeStep * SEG - 6,
                        config: springEnter,
                      })
                    : 0;
                const dim = isActive ? 1 : i < activeStep ? 0.58 : 0.4;
                const ruleLength = layout.isFeed ? 48 : 64;

                return (
                  <div
                    key={text}
                    style={{
                      position: "relative",
                      opacity: rowEnter * dim,
                      transform: `translateX(${(1 - rowEnter) * 36 + expand * 4}px)`,
                      borderLeft: `${1 + expand * 2}px solid ${
                        isActive ? colors.textPrimary : colors.border
                      }`,
                      paddingLeft: 16 + expand * 14,
                      paddingTop: 8 + expand * 12,
                      paddingBottom: 8 + expand * 12,
                      paddingRight: 12,
                      backgroundColor: isActive
                        ? colors.raised
                        : "transparent",
                      outline: isActive
                        ? `1px solid ${colors.border}`
                        : "none",
                      outlineOffset: expand * 6,
                    }}
                  >
                    {isActive ? (
                      <div
                        style={{
                          position: "absolute",
                          right: 14,
                          top: 14,
                          width: 18,
                          height: 18,
                          border: `1px solid ${colors.borderStrong}`,
                          opacity: expand * 0.5,
                          transform: `rotate(45deg) scale(${0.5 + expand * 0.6})`,
                        }}
                      />
                    ) : null}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      <span
                        style={{
                          fontSize: layout.small,
                          fontWeight: 800,
                          color: isActive
                            ? colors.textPrimary
                            : colors.textMuted,
                          letterSpacing: "0.08em",
                          minWidth: 28,
                        }}
                      >
                        0{i + 1}
                      </span>
                      <DrawRule
                        length={ruleLength * expand}
                        delay={activeStep * SEG + 10}
                        thickness={1}
                        color={colors.borderStrong}
                      />
                    </div>
                    <p
                      style={{
                        margin: "12px 0 0",
                        fontSize: layout.body,
                        fontWeight: isActive ? 600 : 500,
                        lineHeight: 1.45,
                        color: isActive
                          ? colors.textPrimary
                          : colors.textSecondary,
                        maxWidth: "95%",
                      }}
                    >
                      {text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </SceneCanvas>
  );
};
