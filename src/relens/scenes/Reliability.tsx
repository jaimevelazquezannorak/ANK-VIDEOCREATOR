import { useCurrentFrame, useVideoConfig } from "remotion";
import { SlideHead, SlideShell } from "../components/SlideShell";
import { fadeIn, pop, riseY } from "../motion";
import { layout, relens, type } from "../theme";

const SOURCE = [
  { k: "A", v: "Oficial, wiki o cuenta del propio jugador" },
  { k: "B", v: "Prensa que nombra al jugador y el hecho" },
  { k: "C", v: "Revista, tabloide o agregador" },
  { k: "D", v: "Mención o comentario en redes" },
  { k: "E", v: "Fuente no identificable" },
  { k: "F", v: "No se puede valorar" },
];

const DATA = [
  { k: "1", v: "Confirmado por dos fuentes independientes" },
  { k: "2", v: "Probable" },
  { k: "3", v: "Posible" },
  { k: "4", v: "Dudoso" },
  { k: "5", v: "Improbable" },
  { k: "6", v: "No se puede juzgar" },
];

const PASS = ["A1", "A2", "B1", "B2"];

const Scale: React.FC<{
  title: string;
  rows: { k: string; v: string }[];
  from: number;
  keep: string[];
}> = ({ title, rows, from, keep }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ width: 520, display: "flex", flexDirection: "column" }}>
      <div
        style={{
          ...type.eyebrow,
          fontWeight: 600,
          color: relens.muted,
          marginBottom: 14,
          opacity: fadeIn(frame, from - 6, 12),
        }}
      >
        {title}
      </div>
      {rows.map((r, i) => {
        const strong = keep.includes(r.k);
        return (
          <div
            key={r.k}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              padding: "11px 0",
              borderTop: `1px solid ${relens.line}`,
              opacity: fadeIn(frame, from + i * 6, 10),
              translate: riseY(frame, from + i * 6, 12, 8),
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                fontWeight: 600,
                backgroundColor: strong ? relens.navy : relens.soft,
                color: strong ? relens.topbar : relens.muted,
                flexShrink: 0,
              }}
            >
              {r.k}
            </div>
            <div
              style={{
                ...type.body,
                fontSize: 21,
                color: strong ? relens.ink : relens.muted,
                fontWeight: strong ? 500 : 400,
              }}
            >
              {r.v}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const Reliability: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const passAt = 150;

  return (
    <SlideShell index={index}>
      <div
        style={{
          position: "absolute",
          left: layout.padX,
          top: 190,
          right: layout.padX,
        }}
      >
        <SlideHead
          eyebrow="FIABILIDAD"
          title="Cada hecho dice cuánto fiarse de él."
          lead="Una letra para la fuente y un número para el dato, como en el código de Almirantazgo."
          maxWidth={1200}
          titleSize={56}
        />

        <div style={{ display: "flex", gap: 64, marginTop: 50, alignItems: "flex-start" }}>
          <Scale title="FUENTE" rows={SOURCE} from={60} keep={["A", "B"]} />
          <Scale title="DATO" rows={DATA} from={90} keep={["1", "2"]} />

          <div
            style={{
              flex: 1,
              marginTop: 30,
              backgroundColor: relens.navy,
              color: relens.topbar,
              borderRadius: 14,
              padding: "34px 36px",
              boxShadow: "0 20px 50px rgba(14,34,56,0.25)",
              opacity: fadeIn(frame, passAt, 14),
              translate: riseY(frame, passAt, 16, 16),
            }}
          >
            <div style={{ ...type.eyebrow, fontWeight: 600, color: relens.accentLight }}>
              UMBRAL DE EXPEDIENTE
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 22 }}>
              {PASS.map((p, i) => (
                <div
                  key={p}
                  style={{
                    fontSize: 36,
                    fontWeight: 600,
                    padding: "10px 16px",
                    borderRadius: 8,
                    border: `1px solid ${relens.navyLine}`,
                    backgroundColor: "rgba(243,246,249,0.06)",
                    scale: `${0.85 + 0.15 * pop(frame, fps, passAt + 10 + i * 6)}`,
                    opacity: fadeIn(frame, passAt + 10 + i * 6, 8),
                  }}
                >
                  {p}
                </div>
              ))}
            </div>
            <div
              style={{
                ...type.body,
                fontSize: 23,
                color: relens.topbarMuted,
                marginTop: 26,
                opacity: fadeIn(frame, passAt + 40, 14),
              }}
            >
              Lo que no llega se muestra como pista, nunca como hecho.
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
};
