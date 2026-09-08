import { useCurrentFrame } from "remotion";
import { BrollScene, SpecChips } from "../components/BrollScene";
import { introCopy, type ExamLang, salesCopy } from "../copy";
import { pfuMono } from "../fonts";
import { fadeIn, riseY } from "../motion";
import { layout, pfu, type } from "../theme";

export const Scene03Hardware: React.FC<{
  lang: ExamLang;
  duration: number;
}> = ({ lang, duration }) => {
  const frame = useCurrentFrame();
  const c = salesCopy[lang].hardware;

  return (
    <BrollScene
      duration={duration}
      still="exam/exam-ops-room.png"
      push="in"
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

      <SpecChips chips={c.chips} delay={58} />
    </BrollScene>
  );
};
