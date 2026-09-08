import { useCurrentFrame } from "remotion";
import { BrollScene, SpecChips } from "../components/BrollScene";
import { introCopy, type ExamLang, salesCopy } from "../copy";
import { pfuMono } from "../fonts";
import { fadeIn, ramp, riseY } from "../motion";
import { layout, pfu, type } from "../theme";

const StepRail: React.FC<{
  steps: { n: string; label: string }[];
  delay: number;
}> = ({ steps, delay }) => {
  const frame = useCurrentFrame();
  const line = ramp(frame, delay, delay + 34);

  return (
    <div style={{ marginTop: layout.headToBody, position: "relative", maxWidth: 1180 }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 17,
          height: 2,
          width: "100%",
          backgroundColor: "rgba(255,255,255,0.18)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 17,
          height: 2,
          width: `${line * 100}%`,
          backgroundColor: pfu.blue,
        }}
      />
      <div style={{ display: "flex", gap: 40 }}>
        {steps.map((s, i) => (
          <div
            key={s.n}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 16,
              opacity: fadeIn(frame, delay + 6 + i * 14, 12),
              translate: riseY(frame, delay + 6 + i * 14, 14, 10),
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: pfu.blue,
                color: pfu.white,
                fontFamily: pfuMono,
                fontSize: 15,
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {s.n}
            </div>
            <div
              style={{
                ...type.caption,
                fontSize: 22,
                color: pfu.white,
                maxWidth: 300,
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Scene06PrintScan: React.FC<{
  lang: ExamLang;
  duration: number;
}> = ({ lang, duration }) => {
  const frame = useCurrentFrame();
  const c = salesCopy[lang].printScan;

  return (
    <BrollScene
      duration={duration}
      still="exam/scanner-paper-feed.png"
      push="out"
      crumb={introCopy[lang].crumb}
    >
      <div
        style={{
          fontFamily: pfuMono,
          ...type.eyebrow,
          color: pfu.blue100,
          marginBottom: 18,
          opacity: fadeIn(frame, 14, 12),
        }}
      >
        {c.eyebrow}
      </div>
      <div
        style={{
          ...type.display,
          fontSize: 54,
          color: pfu.white,
          maxWidth: 1420,
          opacity: fadeIn(frame, 20, 14),
          translate: riseY(frame, 20, 18, 16),
        }}
      >
        {c.title}
      </div>
      <div
        style={{
          ...type.subtitle,
          fontSize: 25,
          color: pfu.blue100,
          maxWidth: 1040,
          marginTop: layout.titleToLead,
          opacity: fadeIn(frame, 34, 14),
          translate: riseY(frame, 34, 16, 12),
        }}
      >
        {c.lead}
      </div>

      <StepRail steps={c.steps} delay={62} />
      <SpecChips chips={c.chips} delay={150} />
    </BrollScene>
  );
};
