import { useCurrentFrame } from "remotion";
import { QrGlyph } from "../components/QrGlyph";
import { SceneHead, SceneShell } from "../components/SceneShell";
import { type ExamLang, introCopy, salesCopy } from "../copy";
import { pfuMono } from "../fonts";
import { fadeIn, ramp, riseY } from "../motion";
import { pfu, state, type } from "../theme";

const TOKENS = [
  "a7f3 91c2 08de 4b60",
  "1c94 6b0a f27d 5e13",
  "e05b 3d71 aa48 9c26",
  "74af c318 62b9 0dd5",
];

const REDACT_AT = 132;

const initials = (name: string) => {
  const clean = name.replace(",", "");
  const parts = clean.split(" ");
  const a = parts[0] ? parts[0][0] : "";
  const b = parts[parts.length - 1] ? parts[parts.length - 1][0] : "";
  return (a + b).toUpperCase();
};

const RosterRow: React.FC<{
  name: string;
  token: string;
  index: number;
}> = ({ name, token, index }) => {
  const frame = useCurrentFrame();
  const appear = 62 + index * 12;
  const wipe = ramp(frame, REDACT_AT + index * 8, REDACT_AT + 16 + index * 8);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "16px 4px",
        borderTop: index === 0 ? "none" : `1px solid ${pfu.g100}`,
        opacity: fadeIn(frame, appear, 12),
        translate: riseY(frame, appear, 14, 10),
      }}
    >
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: 19,
          backgroundColor: pfu.blue50,
          color: pfu.blue800,
          fontFamily: pfuMono,
          fontSize: 14,
          fontWeight: 500,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {initials(name)}
      </div>

      <div style={{ position: "relative", flex: 1 }}>
        <div style={{ ...type.body, fontSize: 21, color: pfu.ink }}>{name}</div>
        <div
          style={{
            position: "absolute",
            left: -6,
            top: -3,
            right: 0,
            bottom: -3,
            backgroundColor: pfu.g200,
            borderRadius: 4,
            scale: `${wipe} 1`,
            transformOrigin: "left center",
          }}
        />
      </div>

      <div
        style={{
          fontFamily: pfuMono,
          fontSize: 17,
          color: pfu.blue800,
          backgroundColor: pfu.blue50,
          border: `1px solid ${pfu.blue100}`,
          borderRadius: 6,
          padding: "6px 12px",
          opacity: fadeIn(frame, REDACT_AT + 10 + index * 8, 12),
        }}
      >
        {token}
      </div>
    </div>
  );
};

export const Scene05Identity: React.FC<{ lang: ExamLang }> = ({ lang }) => {
  const frame = useCurrentFrame();
  const c = salesCopy[lang].identity;

  return (
    <SceneShell crumb={introCopy[lang].crumb}>
      <SceneHead
        eyebrow={c.eyebrow}
        title={c.title}
        lead={c.lead}
        delay={14}
        maxWidth={1300}
      />

      <div style={{ display: "flex", gap: 48, flex: 1 }}>
        <div
          style={{
            flex: 1,
            backgroundColor: pfu.white,
            border: `1px solid ${pfu.g200}`,
            borderRadius: 10,
            boxShadow: "0 1px 2px rgba(26,26,26,0.06)",
            padding: "22px 26px",
            alignSelf: "flex-start",
            opacity: fadeIn(frame, 50, 14),
            translate: riseY(frame, 50, 16, 14),
          }}
        >
          <div
            style={{
              fontFamily: pfuMono,
              ...type.eyebrow,
              fontSize: 15,
              color: pfu.g500,
              marginBottom: 10,
            }}
          >
            {c.rosterTitle}
          </div>
          {c.students.map((s, i) => (
            <RosterRow key={s} name={s} token={TOKENS[i]} index={i} />
          ))}
        </div>

        <div
          style={{
            width: 470,
            display: "flex",
            flexDirection: "column",
            gap: 20,
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              backgroundColor: pfu.white,
              border: `1px solid ${pfu.g200}`,
              borderRadius: 10,
              boxShadow: "0 12px 34px rgba(26,26,26,0.12)",
              padding: 22,
              display: "flex",
              alignItems: "center",
              gap: 24,
              opacity: fadeIn(frame, 58, 14),
              translate: riseY(frame, 58, 18, 16),
            }}
          >
            <QrGlyph size={186} reveal={ramp(frame, 66, 130)} />
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div
                style={{
                  fontFamily: pfuMono,
                  ...type.eyebrow,
                  fontSize: 14,
                  color: pfu.g500,
                }}
              >
                {c.tokenTitle}
              </div>
              <div
                style={{
                  fontFamily: pfuMono,
                  fontSize: 22,
                  fontWeight: 500,
                  color: pfu.ink,
                  lineHeight: 1.5,
                  opacity: fadeIn(frame, 118, 12),
                }}
              >
                a7f3 91c2
                <br />
                08de 4b60
              </div>
              <div
                style={{
                  fontFamily: pfuMono,
                  fontSize: 15,
                  color: pfu.blue,
                  opacity: fadeIn(frame, 128, 12),
                }}
              >
                128 bits
              </div>
            </div>
          </div>

          <div
            style={{
              ...type.caption,
              fontSize: 19,
              color: pfu.ricohGray,
              opacity: fadeIn(frame, 150, 14),
            }}
          >
            {c.tokenNote}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {c.badges.map((b, i) => (
              <div
                key={b}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: 19,
                  fontWeight: 600,
                  color: state.success,
                  backgroundColor: state.successBg,
                  borderRadius: 6,
                  padding: "9px 16px",
                  opacity: fadeIn(frame, 176 + i * 12, 12),
                  translate: riseY(frame, 176 + i * 12, 14, 10),
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: 4,
                    backgroundColor: state.success,
                  }}
                />
                {b}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SceneShell>
  );
};
