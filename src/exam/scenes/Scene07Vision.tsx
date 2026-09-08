import { useCurrentFrame } from "remotion";
import {
  HIGH,
  InkSample,
  LOW,
  type Sample,
  ThresholdScale,
} from "../components/InkMeter";
import { SceneHead, SceneShell } from "../components/SceneShell";
import { type ExamLang, introCopy, salesCopy } from "../copy";
import { pfuMono } from "../fonts";
import { fadeIn, ramp, riseY } from "../motion";
import { pfu, state, type } from "../theme";

const RAIL_AT = 56;
const SAMPLES_AT = 152;
const SCALE_AT = 244;

const Pipeline: React.FC<{ steps: string[] }> = ({ steps }) => {
  const frame = useCurrentFrame();

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      {steps.map((s, i) => {
        const at = RAIL_AT + i * 11;
        const on = ramp(frame, at, at + 12);
        return (
          <div
            key={s}
            style={{ display: "flex", alignItems: "center", gap: 12 }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                backgroundColor: pfu.white,
                border: `1px solid ${on > 0.5 ? pfu.blue100 : pfu.g200}`,
                borderRadius: 8,
                padding: "12px 18px",
                opacity: fadeIn(frame, at, 10),
                translate: riseY(frame, at, 12, 8),
              }}
            >
              <span
                style={{
                  fontFamily: pfuMono,
                  fontSize: 14,
                  color: pfu.blue,
                  opacity: on,
                }}
              >
                {i + 1}
              </span>
              <span
                style={{
                  ...type.caption,
                  fontSize: 20,
                  color: pfu.ink,
                }}
              >
                {s}
              </span>
            </div>
            {i < steps.length - 1 ? (
              <div
                style={{
                  width: 22,
                  height: 2,
                  backgroundColor: pfu.blue,
                  opacity: ramp(frame, at + 8, at + 18),
                }}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export const Scene07Vision: React.FC<{ lang: ExamLang }> = ({ lang }) => {
  const frame = useCurrentFrame();
  const c = salesCopy[lang].vision;

  const samples: Sample[] = [
    { id: "empty", pct: 4, label: c.empty, color: pfu.g500, bg: pfu.g100 },
    {
      id: "doubt",
      pct: 38,
      label: c.doubtful,
      color: state.warning,
      bg: state.warningBg,
    },
    {
      id: "mark",
      pct: 71,
      label: c.marked,
      color: state.success,
      bg: state.successBg,
    },
  ];

  return (
    <SceneShell crumb={introCopy[lang].crumb}>
      <SceneHead
        eyebrow={c.eyebrow}
        title={c.title}
        lead={c.lead}
        delay={14}
        maxWidth={1300}
      />

      <div>
        <Pipeline steps={c.pipeline} />
      </div>

      <div style={{ display: "flex", gap: 46, marginTop: 38, flex: 1 }}>
        <div
          style={{
            backgroundColor: pfu.white,
            border: `1px solid ${pfu.g200}`,
            borderRadius: 10,
            boxShadow: "0 4px 14px rgba(26,26,26,0.08)",
            padding: "30px 46px 34px",
            alignSelf: "flex-start",
            opacity: fadeIn(frame, SAMPLES_AT - 20, 14),
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 66,
              justifyContent: "center",
              marginBottom: 30,
            }}
          >
            {samples.map((s, i) => (
              <InkSample key={s.id} sample={s} delay={SAMPLES_AT + i * 20} />
            ))}
          </div>
          <ThresholdScale
            samples={samples}
            delay={SCALE_AT}
            width={660}
            labels={{ empty: c.empty, doubtful: c.doubtful, marked: c.marked }}
          />
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 22,
            paddingTop: 10,
          }}
        >
          <div
            style={{
              fontFamily: pfuMono,
              ...type.eyebrow,
              fontSize: 15,
              color: pfu.g500,
              opacity: fadeIn(frame, SAMPLES_AT - 10, 12),
            }}
          >
            {c.meterLabel}
          </div>

          {[
            { k: `< ${LOW} %`, v: c.empty, color: pfu.g500 },
            { k: `${LOW} - ${HIGH} %`, v: c.doubtful, color: state.warning },
            { k: `> ${HIGH} %`, v: c.marked, color: state.success },
          ].map((r, i) => (
            <div
              key={r.k}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 18,
                borderTop: `1px solid ${pfu.g200}`,
                paddingTop: 16,
                opacity: fadeIn(frame, SCALE_AT + 16 + i * 10, 12),
                translate: riseY(frame, SCALE_AT + 16 + i * 10, 14, 10),
              }}
            >
              <span
                style={{
                  fontFamily: pfuMono,
                  fontSize: 22,
                  fontWeight: 500,
                  color: pfu.ink,
                  minWidth: 130,
                }}
              >
                {r.k}
              </span>
              <span
                style={{ ...type.body, fontSize: 22, color: r.color, fontWeight: 600 }}
              >
                {r.v}
              </span>
            </div>
          ))}

          <div
            style={{
              marginTop: "auto",
              ...type.subtitle,
              fontSize: 24,
              fontWeight: 600,
              color: pfu.ink,
              opacity: fadeIn(frame, SCALE_AT + 56, 16),
              translate: riseY(frame, SCALE_AT + 56, 18, 12),
            }}
          >
            {c.verdict}
          </div>
        </div>
      </div>
    </SceneShell>
  );
};
