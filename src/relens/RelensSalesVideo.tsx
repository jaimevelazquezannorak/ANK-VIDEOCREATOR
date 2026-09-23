import {
  AbsoluteFill,
  Audio,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Closing } from "./scenes/Closing";
import { Cover } from "./scenes/Cover";
import { Problem } from "./scenes/Problem";
import { Process } from "./scenes/Process";
import { Reliability } from "./scenes/Reliability";
import { TourSlide } from "./scenes/TourSlide";
import { relens, relensSchedule, RENDER_BRIGHTNESS, type SlideId } from "./theme";
import { TOUR } from "./tour";

/**
 * Cama musical en `public/`. Sin locución, la música va sola: en el Studio
 * suena a este volumen; el MP4 final se mezcla aparte con loudnorm (ver
 * scripts/render-relens.ps1) porque el FFmpeg de Remotion no arranca aquí.
 */
const MUSIC: string | null = "exam/aylex-little-step.mp3";
const BED_VOLUME = 0.6;

/** Solape del encadenado entre diapositivas, igual que en ExamSales. */
const OVERLAP = 12;

const renderSlide = (id: SlideId, index: number, duration: number) => {
  switch (id) {
    case "cover":
      return <Cover />;
    case "problem":
      return <Problem index={index} />;
    case "process":
      return <Process index={index} />;
    case "reliability":
      return <Reliability index={index} />;
    case "closing":
      return <Closing />;
    default:
      return <TourSlide index={index} duration={duration} config={TOUR[id]} />;
  }
};

const ProgressRail: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const p = Math.min(frame / durationInFrames, 1);

  return (
    <AbsoluteFill style={{ justifyContent: "flex-end" }}>
      <div style={{ height: 4, backgroundColor: "rgba(91,107,124,0.18)" }}>
        <div style={{ height: 4, width: `${p * 100}%`, backgroundColor: relens.accent }} />
      </div>
    </AbsoluteFill>
  );
};

export type RelensSalesProps = {
  /** `false` al sacar fotogramas: el ffprobe de Remotion tampoco arranca aquí. */
  music: boolean;
};

/** Presentación de Relens en diapositivas: tour por la app con el expediente de Lamine Yamal. */
export const RelensSalesVideo: React.FC<RelensSalesProps> = ({ music }) => {
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: relens.navy,
        filter: `brightness(${RENDER_BRIGHTNESS})`,
      }}
    >
      {music && MUSIC ? (
        <Audio
          src={staticFile(MUSIC)}
          volume={(f) =>
            interpolate(
              f,
              [0, 24, durationInFrames - 60, durationInFrames],
              [0, BED_VOLUME, BED_VOLUME, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            )
          }
        />
      ) : null}
      {relensSchedule().map((s, i) => {
        const from = i === 0 ? 0 : s.from - OVERLAP;
        const duration = s.from + s.frames - from;
        return (
          <Sequence key={s.id} name={s.id} from={from} durationInFrames={duration}>
            {renderSlide(s.id, s.index, duration)}
          </Sequence>
        );
      })}
      <ProgressRail />
    </AbsoluteFill>
  );
};
