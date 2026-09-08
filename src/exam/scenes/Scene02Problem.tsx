import { useCurrentFrame } from "remotion";
import { SceneHead, SceneShell } from "../components/SceneShell";
import { type ExamLang, introCopy, salesCopy } from "../copy";
import { pfuMono } from "../fonts";
import { fadeIn, riseY } from "../motion";
import { pfu, type } from "../theme";

const ROW_START = 96;
const ROW_STEP = 22;

const Cross: React.FC = () => (
  <svg width={22} height={22} viewBox="0 0 22 22">
    <circle cx={11} cy={11} r={11} fill={pfu.g200} />
    <path
      d="M7 7 L15 15 M15 7 L7 15"
      stroke={pfu.g500}
      strokeWidth={1.9}
      strokeLinecap="round"
    />
  </svg>
);

const Check: React.FC = () => (
  <svg width={22} height={22} viewBox="0 0 22 22">
    <circle cx={11} cy={11} r={11} fill={pfu.blue} />
    <path
      d="M6.5 11.3 L9.6 14.4 L15.5 7.8"
      stroke={pfu.white}
      strokeWidth={2.1}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const ColumnHead: React.FC<{ label: string; accent: boolean; delay: number }> =
  ({ label, accent, delay }) => {
    const frame = useCurrentFrame();
    return (
      <div
        style={{
          fontFamily: pfuMono,
          ...type.eyebrow,
          fontSize: 15,
          color: accent ? pfu.blue : pfu.g500,
          paddingBottom: 16,
          borderBottom: `2px solid ${accent ? pfu.blue : pfu.g200}`,
          marginBottom: 22,
          opacity: fadeIn(frame, delay, 12),
        }}
      >
        {label}
      </div>
    );
  };

const CompareRow: React.FC<{
  text: string;
  accent: boolean;
  delay: number;
}> = ({ text, accent, delay }) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 18,
        backgroundColor: accent ? pfu.white : pfu.g100,
        border: `1px solid ${accent ? pfu.blue100 : pfu.g200}`,
        borderLeft: accent ? `3px solid ${pfu.blue}` : `1px solid ${pfu.g200}`,
        borderRadius: 8,
        padding: "18px 22px",
        opacity: fadeIn(frame, delay, 12),
        translate: riseY(frame, delay, 14, accent ? 0 : 0),
      }}
    >
      <div style={{ flexShrink: 0, display: "flex" }}>
        {accent ? <Check /> : <Cross />}
      </div>
      <div
        style={{
          ...type.body,
          fontSize: 23,
          fontWeight: accent ? 500 : 400,
          color: accent ? pfu.ink : pfu.g500,
        }}
      >
        {text}
      </div>
    </div>
  );
};

export const Scene02Problem: React.FC<{ lang: ExamLang }> = ({ lang }) => {
  const frame = useCurrentFrame();
  const c = salesCopy[lang].problem;
  const last = ROW_START + (c.rows.length - 1) * ROW_STEP + 34;

  return (
    <SceneShell crumb={introCopy[lang].crumb}>
      <SceneHead
        eyebrow={c.eyebrow}
        title={c.title}
        lead={c.lead}
        delay={14}
        maxWidth={1500}
      />

      <div style={{ display: "flex", gap: 40 }}>
        <div style={{ flex: 1 }}>
          <ColumnHead label={c.beforeHead} accent={false} delay={ROW_START - 14} />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {c.rows.map((r, i) => (
              <CompareRow
                key={r.before}
                text={r.before}
                accent={false}
                delay={ROW_START + i * ROW_STEP}
              />
            ))}
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <ColumnHead label={c.afterHead} accent delay={ROW_START - 6} />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {c.rows.map((r, i) => (
              <CompareRow
                key={r.after}
                text={r.after}
                accent
                delay={ROW_START + 10 + i * ROW_STEP}
              />
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: "auto",
          paddingTop: 30,
          ...type.subtitle,
          fontSize: 26,
          fontWeight: 600,
          color: pfu.ink,
          maxWidth: 1400,
          opacity: fadeIn(frame, last, 16),
          translate: riseY(frame, last, 18, 12),
        }}
      >
        {c.verdict}
      </div>
    </SceneShell>
  );
};
