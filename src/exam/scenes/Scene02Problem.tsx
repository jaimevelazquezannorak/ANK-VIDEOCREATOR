import {
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SceneHead, SceneShell } from "../components/SceneShell";
import { type ExamLang, introCopy, salesCopy } from "../copy";
import { pfuMono } from "../fonts";
import { EASE, fadeIn, ramp, riseY } from "../motion";
import { pfu, type } from "../theme";

/**
 * Coreografia por fila (frames relativos al inicio de la fila):
 *   0   entra la version generica desde la izquierda
 *   10  el conector se dibuja hacia la derecha
 *   18  entra la version PFU con muelle
 *   30  la generica queda tachada y en segundo plano
 */
const HEADS_AT = 58;
const ROW_START = 76;
const ROW_STEP = 30;
const VERDICT_AT = ROW_START + 3 * ROW_STEP + 46;

const CONNECTOR_W = 84;

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

/** Trazo que se dibuja: pathLength normalizado a 1. */
const drawn = (p: number) => ({
  pathLength: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1 - p,
});

const Cross: React.FC<{ p: number }> = ({ p }) => (
  <svg width={24} height={24} viewBox="0 0 24 24">
    <circle
      cx={12}
      cy={12}
      r={11}
      fill="none"
      stroke={pfu.g200}
      strokeWidth={1.5}
      {...drawn(ramp(p, 0, 0.6))}
    />
    <path
      d="M8 8 L16 16"
      stroke={pfu.g500}
      strokeWidth={1.9}
      strokeLinecap="round"
      {...drawn(ramp(p, 0.4, 0.8))}
    />
    <path
      d="M16 8 L8 16"
      stroke={pfu.g500}
      strokeWidth={1.9}
      strokeLinecap="round"
      {...drawn(ramp(p, 0.6, 1))}
    />
  </svg>
);

const Check: React.FC<{ p: number }> = ({ p }) => (
  <svg width={24} height={24} viewBox="0 0 24 24">
    <circle
      cx={12}
      cy={12}
      r={12 * ramp(p, 0, 0.5)}
      fill={pfu.blue}
    />
    <path
      d="M7 12.4 L10.4 15.8 L17 8.6"
      stroke={pfu.white}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      {...drawn(ramp(p, 0.45, 1))}
    />
  </svg>
);

/** Linea con punta que se dibuja de izquierda a derecha. */
const Connector: React.FC<{ p: number }> = ({ p }) => {
  const w = CONNECTOR_W;
  return (
    <svg width={w} height={24} viewBox={`0 0 ${w} 24`} style={{ flexShrink: 0 }}>
      <path
        d={`M4 12 H${w - 10}`}
        stroke={pfu.blue}
        strokeWidth={2}
        strokeLinecap="round"
        {...drawn(ramp(p, 0, 0.8))}
      />
      <path
        d={`M${w - 16} 6 L${w - 8} 12 L${w - 16} 18`}
        stroke={pfu.blue}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        {...drawn(ramp(p, 0.7, 1))}
      />
    </svg>
  );
};

const ColumnHead: React.FC<{ label: string; accent: boolean; delay: number }> =
  ({ label, accent, delay }) => {
    const frame = useCurrentFrame();
    return (
      <div style={{ position: "relative", paddingBottom: 16, marginBottom: 22 }}>
        <div
          style={{
            fontFamily: pfuMono,
            ...type.eyebrow,
            fontSize: 15,
            color: accent ? pfu.blue : pfu.g500,
            opacity: fadeIn(frame, delay, 12),
            translate: riseY(frame, delay, 14, 8),
          }}
        >
          {label}
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            height: 2,
            backgroundColor: accent ? pfu.blue : pfu.g200,
            scale: `${ramp(frame, delay + 6, delay + 30)} 1`,
            transformOrigin: "left center",
          }}
        />
      </div>
    );
  };

const Row: React.FC<{
  before: string;
  after: string;
  at: number;
}> = ({ before, after, at }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame - at;

  const leftIn = spring({
    frame: t,
    fps,
    config: { damping: 200 },
    durationInFrames: 22,
  });
  const connector = ramp(t, 10, 26);
  const rightIn = spring({
    frame: t - 18,
    fps,
    config: { damping: 16, stiffness: 170, mass: 0.7 },
    durationInFrames: 34,
  });
  const iconLeft = ramp(t, 4, 20);
  const iconRight = ramp(t, 22, 40);
  const retire = interpolate(t, [30, 46], [0, 1], { ...clamp, easing: EASE });

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          gap: 16,
          backgroundColor: pfu.white,
          border: `1px solid ${pfu.g200}`,
          borderRadius: 8,
          padding: "19px 22px",
          opacity: leftIn * (1 - retire * 0.45),
          translate: `${interpolate(leftIn, [0, 1], [-28, 0])}px 0px`,
        }}
      >
        <div style={{ flexShrink: 0, display: "flex" }}>
          <Cross p={iconLeft} />
        </div>
        <div style={{ position: "relative" }}>
          <div
            style={{
              ...type.body,
              fontSize: 23,
              color: retire > 0.5 ? pfu.g500 : pfu.g700,
            }}
          >
            {before}
          </div>
          <div
            style={{
              position: "absolute",
              left: -2,
              top: "52%",
              width: "calc(100% + 4px)",
              height: 2,
              backgroundColor: pfu.g500,
              scale: `${retire} 1`,
              transformOrigin: "left center",
            }}
          />
        </div>
      </div>

      <div style={{ padding: "0 14px", display: "flex" }}>
        <Connector p={connector} />
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          gap: 16,
          backgroundColor: pfu.white,
          border: `1px solid ${pfu.blue100}`,
          borderLeft: `3px solid ${pfu.blue}`,
          borderRadius: 8,
          padding: "19px 22px",
          boxShadow: `0 ${6 * rightIn}px ${18 * rightIn}px rgba(27,102,214,${0.12 * rightIn})`,
          opacity: interpolate(rightIn, [0, 0.35], [0, 1], clamp),
          translate: `${interpolate(rightIn, [0, 1], [26, 0])}px 0px`,
          scale: `${interpolate(rightIn, [0, 1], [0.97, 1])}`,
          transformOrigin: "left center",
        }}
      >
        <div style={{ flexShrink: 0, display: "flex" }}>
          <Check p={iconRight} />
        </div>
        <div
          style={{ ...type.body, fontSize: 23, fontWeight: 500, color: pfu.ink }}
        >
          {after}
        </div>
      </div>
    </div>
  );
};

export const Scene02Problem: React.FC<{ lang: ExamLang }> = ({ lang }) => {
  const frame = useCurrentFrame();
  const c = salesCopy[lang].problem;
  const mark = interpolate(frame, [VERDICT_AT + 14, VERDICT_AT + 36], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <SceneShell crumb={introCopy[lang].crumb}>
      <SceneHead
        eyebrow={c.eyebrow}
        title={c.title}
        lead={c.lead}
        delay={14}
        maxWidth={1500}
      />

      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <ColumnHead label={c.beforeHead} accent={false} delay={HEADS_AT} />
        </div>
        <div style={{ width: CONNECTOR_W + 28 }} />
        <div style={{ flex: 1 }}>
          <ColumnHead label={c.afterHead} accent delay={HEADS_AT + 8} />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {c.rows.map((r, i) => (
          <Row
            key={r.before}
            before={r.before}
            after={r.after}
            at={ROW_START + i * ROW_STEP}
          />
        ))}
      </div>

      <div
        style={{
          marginTop: "auto",
          paddingTop: 30,
          ...type.subtitle,
          fontSize: 26,
          fontWeight: 600,
          color: pfu.ink,
          maxWidth: 1500,
          opacity: fadeIn(frame, VERDICT_AT, 16),
          translate: riseY(frame, VERDICT_AT, 18, 12),
        }}
      >
        <span style={{ position: "relative" }}>{c.verdict.pre}</span>
        <span
          style={{
            position: "relative",
            display: "inline-block",
            padding: "0 6px",
            margin: "0 -6px",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: 0,
              top: "8%",
              width: "100%",
              height: "88%",
              backgroundColor: pfu.blue100,
              borderRadius: 4,
              scale: `${mark} 1`,
              transformOrigin: "left center",
            }}
          />
          <span style={{ position: "relative", color: pfu.blue800 }}>
            {c.verdict.mark}
          </span>
        </span>
        <span style={{ position: "relative" }}>{c.verdict.post}</span>
      </div>
    </SceneShell>
  );
};
