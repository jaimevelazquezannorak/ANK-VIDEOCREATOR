import {
  AbsoluteFill,
  Audio,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { type ExamLang } from "./copy";
import { ExamIntro } from "./ExamIntro";
import { Scene02Problem } from "./scenes/Scene02Problem";
import { Scene03Hardware } from "./scenes/Scene03Hardware";
import { Scene04Design } from "./scenes/Scene04Design";
import { Scene05Identity } from "./scenes/Scene05Identity";
import { Scene06PrintScan } from "./scenes/Scene06PrintScan";
import { Scene07Vision } from "./scenes/Scene07Vision";
import { Scene08Closing } from "./scenes/Scene08Closing";
import {
  APP_PLATES,
  preloadAppPlates,
  SceneAppPlate,
} from "./scenes/SceneAppPlate";

preloadAppPlates();
import { pfu, SALES, SALES_FRAMES } from "./theme";

const BED_VOLUME = 0.18;

/** Solape del encadenado entre escenas. */
const OVERLAP = 12;

const renderScene = (
  id: (typeof SALES)[number]["id"],
  lang: ExamLang,
  duration: number,
) => {
  switch (id) {
    case "brand":
      return <ExamIntro lang={lang} />;
    case "appDash":
      return (
        <SceneAppPlate {...APP_PLATES.dash} duration={duration} />
      );
    case "problem":
      return <Scene02Problem lang={lang} />;
    case "hardware":
      return <Scene03Hardware lang={lang} duration={duration} />;
    case "appGen":
      return (
        <SceneAppPlate {...APP_PLATES.gen} duration={duration} />
      );
    case "design":
      return <Scene04Design lang={lang} />;
    case "identity":
      return <Scene05Identity lang={lang} />;
    case "appStudents":
      return (
        <SceneAppPlate {...APP_PLATES.alu} duration={duration} />
      );
    case "printScan":
      return <Scene06PrintScan lang={lang} duration={duration} />;
    case "vision":
      return <Scene07Vision lang={lang} />;
    case "closing":
      return <Scene08Closing lang={lang} />;
    default:
      return null;
  }
};

/** Hilo azul de avance: el comercial ve cuanto queda sin salir del video. */
const ProgressRail: React.FC = () => {
  const frame = useCurrentFrame();
  const p = Math.min(frame / SALES_FRAMES, 1);

  return (
    <AbsoluteFill style={{ justifyContent: "flex-end" }}>
      <div style={{ height: 4, backgroundColor: "rgba(128,128,128,0.22)" }}>
        <div
          style={{
            height: 4,
            width: `${p * 100}%`,
            backgroundColor: pfu.blue,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

/**
 * Video de venta del Sistema de Examenes (90 s). Una escaleta, dos idiomas.
 * El montaje vive en `SALES` (src/exam/theme.ts) y el texto en `copy.ts`.
 */
export const ExamSalesVideo: React.FC<{ lang: ExamLang }> = ({ lang }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: pfu.paper }}>
      <Audio
        src={staticFile("exam/aylex-little-step.mp3")}
        volume={(f) =>
          interpolate(
            f,
            [0, 24, SALES_FRAMES - 48, SALES_FRAMES],
            [0, BED_VOLUME, BED_VOLUME, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          )
        }
      />
      {SALES.map((s, i) => {
        const from = i === 0 ? 0 : s.from - OVERLAP;
        const duration = s.from + s.duration - from;
        return (
          <Sequence key={s.id} from={from} durationInFrames={duration}>
            {renderScene(s.id, lang, duration)}
          </Sequence>
        );
      })}
      <ProgressRail />
    </AbsoluteFill>
  );
};
