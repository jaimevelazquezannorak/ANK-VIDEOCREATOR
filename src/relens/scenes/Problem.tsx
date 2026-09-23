import { useCurrentFrame } from "remotion";
import { SlideHead, SlideShell } from "../components/SlideShell";
import { fadeIn, ramp, riseY } from "../motion";
import { layout, relens, type } from "../theme";

const ROWS = [
  { before: "Búsquedas a mano en prensa y redes", after: "254 fuentes públicas recogidas solas" },
  { before: "Nombres sueltos, sin contexto", after: "Cada persona con su relación y su cita" },
  { before: "Rumor y hecho, mezclados", after: "Fiabilidad de fuente y de dato en cada hecho" },
  { before: "Un informe que caduca", after: "Un expediente vivo que se relanza por fases" },
];

const ROW0 = 96;
const ROW_STEP = 22;

export const Problem: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const verdictAt = ROW0 + ROWS.length * ROW_STEP + 26;
  const underline = ramp(frame, verdictAt + 14, verdictAt + 34);

  return (
    <SlideShell index={index}>
      <div
        style={{
          position: "absolute",
          left: layout.padX,
          top: 190,
          right: layout.padX,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <SlideHead
          eyebrow="EL PUNTO CIEGO"
          title="El scouting mide el campo. Lo que decide un fichaje suele pasar fuera."
          maxWidth={1300}
          titleSize={56}
        />

        <div
          style={{
            marginTop: 56,
            width: 1400,
            backgroundColor: relens.surface,
            border: `1px solid ${relens.line}`,
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 12px 34px rgba(14,34,56,0.08)",
            opacity: fadeIn(frame, ROW0 - 16, 14),
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              backgroundColor: relens.soft,
              borderBottom: `1px solid ${relens.line}`,
              ...type.eyebrow,
              fontWeight: 600,
            }}
          >
            <div style={{ padding: "18px 32px", color: relens.muted }}>HOY</div>
            <div style={{ padding: "18px 32px", color: relens.accent }}>CON RELENS</div>
          </div>
          {ROWS.map((r, i) => {
            const at = ROW0 + i * ROW_STEP;
            return (
              <div
                key={r.before}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  borderTop: i ? `1px solid ${relens.line}` : "none",
                  ...type.body,
                  fontSize: 25,
                }}
              >
                <div
                  style={{
                    padding: "20px 32px",
                    color: relens.muted,
                    opacity: fadeIn(frame, at, 12),
                  }}
                >
                  {r.before}
                </div>
                <div
                  style={{
                    padding: "20px 32px",
                    fontWeight: 600,
                    color: relens.ink,
                    borderLeft: `4px solid ${relens.accent}`,
                    opacity: fadeIn(frame, at + 8, 12),
                    translate: riseY(frame, at + 8, 14, 10),
                  }}
                >
                  {r.after}
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            ...type.subtitle,
            fontSize: 30,
            color: relens.ink,
            marginTop: 44,
            opacity: fadeIn(frame, verdictAt, 14),
            translate: riseY(frame, verdictAt, 16, 12),
          }}
        >
          Relens pone{" "}
          <span style={{ position: "relative", fontWeight: 600 }}>
            por escrito, y con fuente,
            <span
              style={{
                position: "absolute",
                left: 0,
                bottom: -4,
                height: 4,
                width: `${underline * 100}%`,
                backgroundColor: relens.accent,
              }}
            />
          </span>{" "}
          lo que hoy se cuenta de oídas.
        </div>
      </div>
    </SlideShell>
  );
};
