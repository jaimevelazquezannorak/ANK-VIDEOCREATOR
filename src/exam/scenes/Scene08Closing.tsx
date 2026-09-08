import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { BrandMark, logoLeftNudge } from "../BrandMark";
import { type ExamLang, introCopy, salesCopy } from "../copy";
import { pfuMono, pfuSans } from "../fonts";
import { crossIn, fadeIn, pop, ramp, riseY } from "../motion";
import { layout, pfu, type } from "../theme";

export const Scene08Closing: React.FC<{ lang: ExamLang }> = ({ lang }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = salesCopy[lang].closing;
  const rule = ramp(frame, 76, 104);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: pfu.header,
        fontFamily: pfuSans,
        color: pfu.white,
        padding: `${layout.padY}px ${layout.padX}px`,
        display: "flex",
        flexDirection: "column",
        opacity: crossIn(frame),
      }}
    >
      <div
        style={{
          opacity: fadeIn(frame, 6, 14),
          scale: `${0.96 + 0.04 * pop(frame, fps, 6)}`,
          transformOrigin: "left center",
          display: "flex",
          marginLeft: logoLeftNudge(layout.logoClose),
        }}
      >
        <BrandMark width={layout.logoClose} />
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 26,
        }}
      >
        <div
          style={{
            fontFamily: pfuMono,
            ...type.eyebrow,
            color: pfu.blue100,
            opacity: fadeIn(frame, 18, 12),
          }}
        >
          {c.eyebrow}
        </div>

        <div style={{ display: "flex", gap: 30, flexWrap: "wrap" }}>
          {c.kicker.map((w, i) => (
            <span
              key={w}
              style={{
                ...type.display,
                fontSize: 82,
                color: i === c.kicker.length - 1 ? pfu.blue : pfu.white,
                opacity: fadeIn(frame, 26 + i * 12, 12),
                translate: riseY(frame, 26 + i * 12, 16, 18),
              }}
            >
              {w}
            </span>
          ))}
        </div>

        <div
          style={{
            width: `${rule * 100}%`,
            maxWidth: 1180,
            height: 3,
            backgroundColor: pfu.blue,
          }}
        />

        <div
          style={{
            ...type.subtitle,
            fontSize: 28,
            color: pfu.blue100,
            maxWidth: 900,
            opacity: fadeIn(frame, 96, 14),
            translate: riseY(frame, 96, 16, 12),
          }}
        >
          {c.line}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 40,
        }}
      >
        <div style={{ display: "flex", gap: 14 }}>
          {c.outputs.map((o, i) => (
            <div
              key={o}
              style={{
                ...type.caption,
                fontSize: 20,
                color: pfu.white,
                border: `1px solid rgba(255,255,255,0.24)`,
                borderRadius: 999,
                padding: "11px 22px",
                opacity: fadeIn(frame, 116 + i * 11, 12),
                translate: riseY(frame, 116 + i * 11, 14, 10),
              }}
            >
              {o}
            </div>
          ))}
        </div>

        <div
          style={{
            textAlign: "right",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            opacity: fadeIn(frame, 154, 16),
          }}
        >
          <div style={{ ...type.title, fontSize: 34, color: pfu.white }}>
            {introCopy[lang].product}
          </div>
          <div
            style={{
              ...type.caption,
              fontSize: 19,
              color: pfu.g500,
              maxWidth: 520,
            }}
          >
            {c.signoff}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
