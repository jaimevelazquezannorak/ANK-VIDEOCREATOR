import { useCurrentFrame } from "remotion";
import { pfuMono, pfuSans } from "../fonts";
import { fadeIn, ramp, riseY } from "../motion";
import { pfu, state, type } from "../theme";

export const LOW = 22;
export const HIGH = 55;

export type Sample = {
  id: string;
  /** Relleno final medido, 0 a 100. */
  pct: number;
  label: string;
  color: string;
  bg: string;
};

const R = 64;
const BOX = 182;

/** Casilla escaneada: se rellena de tinta hasta el porcentaje medido. */
export const InkSample: React.FC<{
  sample: Sample;
  delay: number;
  duration?: number;
}> = ({ sample, delay, duration = 40 }) => {
  const frame = useCurrentFrame();
  const p = ramp(frame, delay, delay + duration);
  const value = sample.pct * p;
  const cy = BOX / 2;
  const top = cy + R - (2 * R * value) / 100;
  const clipId = `ink-${sample.id}`;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        opacity: fadeIn(frame, delay - 8, 12),
        translate: riseY(frame, delay - 8, 16, 14),
      }}
    >
      <svg width={BOX} height={BOX} viewBox={`0 0 ${BOX} ${BOX}`}>
        <defs>
          <clipPath id={clipId}>
            <rect x={0} y={top} width={BOX} height={BOX} />
          </clipPath>
        </defs>
        <circle
          cx={BOX / 2}
          cy={cy}
          r={R}
          fill={pfu.white}
          stroke={pfu.g200}
          strokeWidth={3}
        />
        <circle
          cx={BOX / 2}
          cy={cy}
          r={R}
          fill={pfu.g700}
          clipPath={`url(#${clipId})`}
        />
        <rect
          x={BOX / 2 - R - 12}
          y={cy - R - 12}
          width={(R + 12) * 2}
          height={(R + 12) * 2}
          fill="none"
          stroke={sample.color}
          strokeWidth={2}
          strokeDasharray="6 5"
          opacity={0.9}
        />
      </svg>

      <div
        style={{
          fontFamily: pfuMono,
          fontSize: 38,
          fontWeight: 500,
          color: pfu.ink,
        }}
      >
        {value.toFixed(0)} %
      </div>

      <div
        style={{
          fontFamily: pfuSans,
          fontSize: 19,
          fontWeight: 600,
          color: sample.color,
          backgroundColor: sample.bg,
          borderRadius: 6,
          padding: "7px 16px",
          opacity: fadeIn(frame, delay + duration - 6, 10),
        }}
      >
        {sample.label}
      </div>
    </div>
  );
};

/** Escala compartida con las dos bandas de decision. */
export const ThresholdScale: React.FC<{
  samples: Sample[];
  delay: number;
  width: number;
  labels: { empty: string; doubtful: string; marked: string };
}> = ({ samples, delay, width, labels }) => {
  const frame = useCurrentFrame();
  const grow = ramp(frame, delay, delay + 22);
  const h = 16;
  const zone = (from: number, to: number, color: string) => ({
    left: (from / 100) * width,
    width: ((to - from) / 100) * width * grow,
    backgroundColor: color,
  });

  return (
    <div
      style={{
        width,
        opacity: fadeIn(frame, delay, 12),
      }}
    >
      <div style={{ position: "relative", height: h, width }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            height: h,
            borderRadius: 3,
            ...zone(0, LOW, pfu.g200),
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            height: h,
            ...zone(LOW, HIGH, state.warningBg),
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            height: h,
            borderRadius: 3,
            ...zone(HIGH, 100, state.successBg),
          }}
        />

        {[LOW, HIGH].map((t) => (
          <div
            key={t}
            style={{
              position: "absolute",
              left: (t / 100) * width,
              top: -10,
              width: 2,
              height: h + 20,
              backgroundColor: pfu.ink,
              opacity: fadeIn(frame, delay + 14, 10),
            }}
          />
        ))}

        {samples.map((s, i) => (
          <div
            key={s.id}
            style={{
              position: "absolute",
              left: (s.pct / 100) * width - 9,
              top: h + 12,
              width: 18,
              height: 18,
              opacity: fadeIn(frame, delay + 26 + i * 6, 10),
            }}
          >
            <svg width={18} height={18} viewBox="0 0 18 18">
              <path d="M9 0 L18 14 L0 14 Z" fill={s.color} />
            </svg>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 44,
          fontFamily: pfuMono,
          ...type.eyebrow,
          fontSize: 15,
          color: pfu.g500,
        }}
      >
        <span>{labels.empty}</span>
        <span style={{ color: state.warning }}>{labels.doubtful}</span>
        <span style={{ color: state.success }}>{labels.marked}</span>
      </div>
    </div>
  );
};
