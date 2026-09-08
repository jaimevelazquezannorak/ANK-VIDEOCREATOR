import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { ColorWipeIn } from "../components/ColorWipe";
import { SceneCanvas } from "../components/SceneCanvas";
import { DrawRule } from "../graphics/DrawRule";
import { GridMesh } from "../graphics/GridMesh";
import { SlideBlocks } from "../graphics/SlideBlocks";
import { WhatWeDoPanels } from "../graphics/WhatWeDoPanels";
import { enterSpring } from "../motion";
import { useLayout } from "../layout";
import { colors } from "../theme";

const TITLE =
  "Construimos software con IA para sectores donde la norma manda.";

const BULLETS = [
  "Diseñado sobre la normativa, no parcheado después.",
  "Entregado por un equipo senior, sin cadenas de subcontratación.",
  "En semanas, no en trimestres.",
] as const;

export const Scene03WhatWeDo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  const layout = useLayout();

  const titleProgress = enterSpring(frame, fps, 16);

  return (
    <SceneCanvas variant="light">
      <GridMesh cellSize={28} opacity={0.06} drift={false} />
      <ColorWipeIn color={colors.lightCanvas} />
      <SlideBlocks
        blocks={[
          {
            w: 90,
            h: height,
            x: 0,
            y: 0,
            delay: 0,
            fill: colors.paper,
          },
        ]}
      />
      <AbsoluteFill
        style={{
          flexDirection: layout.isFeed ? "column" : "row",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: layout.isFeed ? 40 : 72,
          padding: `${layout.padY}px ${layout.padX}px`,
        }}
      >
        <div
          style={{
            flex: layout.isFeed ? undefined : "0 0 auto",
            opacity: enterSpring(frame, fps, 6),
          }}
        >
          <WhatWeDoPanels compact={layout.isFeed} />
        </div>
        <div style={{ maxWidth: layout.maxTextWidth, flex: 1 }}>
          <DrawRule
            length={120}
            delay={24}
            color={colors.ink}
            style={{ marginBottom: 24 }}
          />
          <h2
            style={{
              margin: 0,
              fontSize: layout.title,
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: "-0.03em",
              color: colors.ink,
              opacity: titleProgress,
              transform: `translateY(${(1 - titleProgress) * 24}px)`,
            }}
          >
            {TITLE}
          </h2>
          <div
            style={{
              position: "relative",
              margin: layout.isFeed ? "28px 0 0" : "40px 0 0",
            }}
          >
            <DrawRule
              direction="vertical"
              length={
                layout.isFeed
                  ? BULLETS.length * 72
                  : BULLETS.length * 80 - 8
              }
              delay={68}
              thickness={1}
              color={colors.ink}
              style={{
                position: "absolute",
                left: 11,
                top: 8,
                opacity: 0.15,
              }}
            />
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: layout.isFeed ? 22 : 28,
              }}
            >
            {BULLETS.map((line, i) => {
              const delay = 72 + i * 78;
              const progress = enterSpring(frame, fps, delay);
              const ruleW = 28 + i * 6;
              return (
                <li
                  key={line}
                  style={{
                    display: "flex",
                    gap: 18,
                    alignItems: "flex-start",
                    opacity: progress,
                    transform: `translateX(${(1 - progress) * -36}px) translateY(${(1 - progress) * 12}px)`,
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: 24,
                      height: 24,
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        border: `1.5px solid ${colors.ink}`,
                        transform: `scale(${progress}) rotate(45deg)`,
                        transformOrigin: "center center",
                        backgroundColor: i === 0 ? colors.ink : "transparent",
                        opacity: i === 0 ? 0.12 + progress * 0.2 : progress,
                      }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: layout.label,
                        fontWeight: 800,
                        color: colors.ink,
                        opacity: progress,
                        transform: `scale(${0.7 + progress * 0.3})`,
                      }}
                    >
                      {i + 1}
                    </span>
                  </div>
                  <div style={{ flex: 1, paddingTop: 2 }}>
                    <DrawRule
                      length={ruleW}
                      delay={delay + 4}
                      thickness={2}
                      color={colors.ink}
                      style={{ marginBottom: 10, opacity: 0.4 }}
                    />
                    <span
                      style={{
                        display: "block",
                        fontSize: layout.body,
                        fontWeight: 500,
                        lineHeight: 1.45,
                        color: colors.ink,
                      }}
                    >
                      {line}
                    </span>
                  </div>
                </li>
              );
            })}
            </ul>
          </div>
        </div>
      </AbsoluteFill>
    </SceneCanvas>
  );
};
