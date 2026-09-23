import { useCurrentFrame } from "remotion";
import {
  AppFrame,
  Badge,
  CHROME_H,
  FRAME_H,
  FRAME_W,
  type Mark,
  type Shot,
} from "../components/AppFrame";
import { SlideHead, SlideShell } from "../components/SlideShell";
import { fadeIn, riseY } from "../motion";
import { layout, relens, type } from "../theme";

export type Point = { n: number; text: string; at: number };

export type TourConfig = {
  eyebrow: string;
  title: string;
  lead?: string;
  points: Point[];
  shots: Shot[];
  marks: Mark[];
};

const COL_W = 500;
const FRAME_X = 1920 - layout.padX - FRAME_W;
const FRAME_Y = Math.round((1080 - FRAME_H - CHROME_H) / 2) + 26;

/** Plano del tour: texto a la izquierda, la app a la derecha con marcas numeradas. */
export const TourSlide: React.FC<{
  index: number;
  duration: number;
  config: TourConfig;
}> = ({ index, duration, config }) => {
  const frame = useCurrentFrame();
  const shown = config.points.filter((p) => frame >= p.at);
  const active = shown.length ? shown[shown.length - 1].n : 0;

  return (
    <SlideShell index={index}>
      <div
        style={{
          position: "absolute",
          left: layout.padX,
          top: FRAME_Y + 30,
          width: COL_W,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <SlideHead
          eyebrow={config.eyebrow}
          title={config.title}
          lead={config.lead}
          maxWidth={COL_W}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            marginTop: 40,
          }}
        >
          {config.points.map((p) => (
            <div
              key={p.n}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 16,
                opacity: fadeIn(frame, p.at, 12) * (p.n === active ? 1 : 0.55),
                translate: riseY(frame, p.at, 14, 10),
              }}
            >
              <Badge n={p.n} size={32} />
              <div
                style={{
                  ...type.body,
                  fontSize: 22,
                  lineHeight: 1.35,
                  fontWeight: p.n === active ? 600 : 500,
                  color: relens.ink,
                  paddingTop: 3,
                }}
              >
                {p.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: FRAME_X,
          top: FRAME_Y,
          opacity: fadeIn(frame, 4, 16),
          translate: riseY(frame, 4, 22, 28),
        }}
      >
        <AppFrame shots={config.shots} marks={config.marks} duration={duration} />
      </div>
    </SlideShell>
  );
};
