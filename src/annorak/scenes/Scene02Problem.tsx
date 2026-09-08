import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ColorWipeIn } from "../components/ColorWipe";
import { SceneCanvas } from "../components/SceneCanvas";
import { GridMesh } from "../graphics/GridMesh";
import { ProblemFigures } from "../graphics/ProblemFigures";
import { enterSpring } from "../motion";
import { useLayout } from "../layout";
import { colors } from "../theme";

const LINES = [
  "El software genérico no entiende tu sector.",
  "No entiende el RGPD. Ni la normativa fiscal. Ni el compliance penal.",
  "Y en sectores regulados, eso no es un detalle.",
] as const;

const SEG = 120;
const ENTER = 22;
const EXIT = 12;
const HOLD = SEG - ENTER - EXIT;

const fontSizeForLine = (index: number, layout: ReturnType<typeof useLayout>) => {
  if (index === 0) {
    return layout.displayLine;
  }
  if (index === 1) {
    return layout.headline;
  }
  return layout.title;
};

export const Scene02Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const layout = useLayout();

  return (
    <SceneCanvas variant="dark">
      <GridMesh cellSize={20} opacity={0.07} drift={false} />
      <ColorWipeIn color={colors.raised} />
      {LINES.map((line, index) => {
        const start = index * SEG;
        const endEnter = start + ENTER;
        const endHold = endEnter + HOLD;
        const endExit = endHold + EXIT;

        if (frame < start || frame > endExit) {
          return null;
        }

        const enter = enterSpring(frame, fps, start);
        const opacity =
          frame <= endHold
            ? enter
            : interpolate(frame, [endHold, endExit], [1, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.quad),
              });

        const translateY =
          frame <= endHold
            ? (1 - enter) * 40
            : interpolate(frame, [endHold, endExit], [0, -24], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });

        const isCentered = index === 2;

        return (
          <AbsoluteFill key={line}>
            <ProblemFigures
              phase={index as 0 | 1 | 2}
              width={width}
              height={height}
              localFrame={frame - start}
            />
            <AbsoluteFill
              style={{
                justifyContent: isCentered ? "center" : "flex-end",
                alignItems: "center",
                padding: `${layout.padY}px ${layout.padX}px`,
                paddingBottom: isCentered ? layout.padY : layout.isFeed ? height * 0.2 : height * 0.16,
              }}
            >
              <p
                style={{
                  margin: 0,
                  maxWidth: layout.maxTextWidth,
                  textAlign: "center",
                  fontSize: fontSizeForLine(index, layout),
                  fontWeight: index === 2 ? 800 : 700,
                  lineHeight: 1.12,
                  letterSpacing: "-0.035em",
                  color: colors.textPrimary,
                  opacity,
                  transform: `translateY(${translateY}px)`,
                }}
              >
                {line}
              </p>
            </AbsoluteFill>
          </AbsoluteFill>
        );
      })}
    </SceneCanvas>
  );
};
