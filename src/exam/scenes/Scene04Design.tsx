import { useCurrentFrame } from "remotion";
import { SceneHead, SceneShell } from "../components/SceneShell";
import { SheetPreview } from "../components/SheetPreview";
import { type ExamLang, introCopy, salesCopy } from "../copy";
import { pfuMono } from "../fonts";
import { fadeIn, ramp, riseY } from "../motion";
import { pfu, type } from "../theme";

/** El JSON del examen es el artefacto real del producto: no se traduce. */
const SPEC_LINES = [
  "{",
  '  "preguntas": 120,',
  '  "opciones": ["A", "B", "C", "D"],',
  '  "multirrespuesta": true,',
  '  "anulacion": true,',
  '  "reserva": 2,',
  '  "version": "V001"',
  "}",
];

const COORDS = [
  ["q07 · C", "x 128.5", "y 115.0", "d 5.0"],
  ["q07 · D", "x 137.0", "y 115.0", "d 5.0"],
  ["q08 · A", "x  24.0", "y 124.0", "d 5.0"],
];

const CardTitle: React.FC<{ text: string; delay: number }> = ({
  text,
  delay,
}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 18,
        opacity: fadeIn(frame, delay, 12),
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: pfu.blue,
        }}
      />
      <div
        style={{
          fontFamily: pfuMono,
          ...type.eyebrow,
          fontSize: 15,
          color: pfu.g500,
        }}
      >
        {text}
      </div>
    </div>
  );
};

export const Scene04Design: React.FC<{ lang: ExamLang }> = ({ lang }) => {
  const frame = useCurrentFrame();
  const c = salesCopy[lang].design;

  const sheetReveal = ramp(frame, 70, 250);
  const roi = ramp(frame, 268, 292);

  return (
    <SceneShell crumb={introCopy[lang].crumb}>
      <SceneHead
        eyebrow={c.eyebrow}
        title={c.title}
        lead={c.lead}
        delay={14}
        maxWidth={1420}
      />

      <div style={{ display: "flex", gap: 44, flex: 1 }}>
        <div
          style={{
            width: 700,
            display: "flex",
            flexDirection: "column",
            gap: 22,
          }}
        >
          <div
            style={{
              backgroundColor: pfu.white,
              border: `1px solid ${pfu.g200}`,
              borderRadius: 10,
              boxShadow: "0 1px 2px rgba(26,26,26,0.06)",
              padding: "22px 26px 16px",
              opacity: fadeIn(frame, 52, 14),
              translate: riseY(frame, 52, 16, 14),
            }}
          >
            <CardTitle text={c.formTitle} delay={56} />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: 34,
              }}
            >
            {c.fields.map((f, i) => (
              <div
                key={f.k}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "11px 0",
                  borderTop: i < 2 ? "none" : `1px solid ${pfu.g100}`,
                  opacity: fadeIn(frame, 64 + i * 9, 10),
                }}
              >
                <span style={{ ...type.caption, fontSize: 19, color: pfu.g500 }}>
                  {f.k}
                </span>
                <span
                  style={{
                    fontFamily: pfuMono,
                    fontSize: 19,
                    fontWeight: 500,
                    color: pfu.ink,
                  }}
                >
                  {f.v}
                </span>
              </div>
            ))}
            </div>
          </div>

          <div
            style={{
              backgroundColor: pfu.header,
              borderRadius: 10,
              padding: "20px 26px 22px",
              opacity: fadeIn(frame, 140, 14),
              translate: riseY(frame, 140, 16, 14),
            }}
          >
            <div
              style={{
                fontFamily: pfuMono,
                ...type.eyebrow,
                fontSize: 14,
                color: pfu.blue100,
                marginBottom: 14,
              }}
            >
              {c.specTitle}
            </div>
            {SPEC_LINES.map((line, i) => (
              <div
                key={line}
                style={{
                  fontFamily: pfuMono,
                  fontSize: 17,
                  lineHeight: 1.55,
                  color: i === 0 || i === SPEC_LINES.length - 1
                    ? pfu.g500
                    : pfu.white,
                  opacity: fadeIn(frame, 150 + i * 8, 8),
                }}
              >
                {line}
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", gap: 30 }}>
          <div
            style={{
              backgroundColor: pfu.white,
              border: `1px solid ${pfu.g200}`,
              borderRadius: 10,
              boxShadow: "0 12px 34px rgba(26,26,26,0.12)",
              padding: 14,
              alignSelf: "flex-start",
              opacity: fadeIn(frame, 58, 14),
              translate: riseY(frame, 58, 18, 16),
            }}
          >
            <SheetPreview width={306} reveal={sheetReveal} roi={roi} />
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 14,
              paddingTop: 6,
            }}
          >
            <CardTitle text={c.coordTitle} delay={262} />
            {COORDS.map((row, i) => (
              <div
                key={row[0]}
                style={{
                  display: "flex",
                  gap: 18,
                  backgroundColor: pfu.blue50,
                  border: `1px solid ${pfu.blue100}`,
                  borderRadius: 8,
                  padding: "14px 18px",
                  fontFamily: pfuMono,
                  fontSize: 18,
                  color: pfu.blue800,
                  opacity: fadeIn(frame, 276 + i * 10, 10),
                  translate: riseY(frame, 276 + i * 10, 12, 8),
                }}
              >
                {row.map((cell, j) => (
                  <span
                    key={cell}
                    style={{ minWidth: j === 0 ? 86 : 78, fontWeight: j === 0 ? 500 : 400 }}
                  >
                    {cell}
                  </span>
                ))}
              </div>
            ))}
            <div
              style={{
                ...type.caption,
                fontSize: 18,
                color: pfu.g500,
                marginTop: 4,
                opacity: fadeIn(frame, 312, 12),
              }}
            >
              {c.coordNote}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 26,
          ...type.subtitle,
          fontSize: 25,
          fontWeight: 600,
          color: pfu.ink,
          opacity: fadeIn(frame, 336, 16),
          translate: riseY(frame, 336, 18, 12),
        }}
      >
        {c.footnote}
      </div>
    </SceneShell>
  );
};
