import { interpolate, useCurrentFrame } from "remotion";
import { SlideHead, SlideShell } from "../components/SlideShell";
import { EASE, fadeIn, ramp, riseY } from "../motion";
import { layout, relens, type } from "../theme";

const PHASES = [
  {
    n: "01",
    name: "Recolección",
    desc: "Wikipedia, Wikidata, prensa, Instagram y X.",
    value: 254,
    unit: "documentos públicos",
  },
  {
    n: "02",
    name: "Microhechos",
    desc: "Cada noticia se parte en hechos: quién, qué, cuándo y dónde.",
    value: 354,
    unit: "microhechos",
  },
  {
    n: "03",
    name: "Retrato",
    desc: "Una biografía escrita solo con lo que está citado.",
    value: 188,
    unit: "hechos de vida personal",
  },
  {
    n: "04",
    name: "Mapa",
    desc: "Personas, cuentas, lugares y clubes, unidos por relaciones.",
    value: 17,
    unit: "relaciones en el mapa",
  },
];

const CARD_W = 405;
const GAP = 36;
const CARD0 = 70;
const CARD_STEP = 26;

export const Process: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const rail = ramp(frame, CARD0, CARD0 + CARD_STEP * 3 + 20);

  return (
    <SlideShell index={index}>
      <div
        style={{
          position: "absolute",
          left: layout.padX,
          top: 230,
          right: layout.padX,
        }}
      >
        <SlideHead
          eyebrow="CÓMO TRABAJA"
          title="Cuatro fases, de la noticia al mapa."
          lead="Cifras reales del expediente de Lamine Yamal."
          maxWidth={1200}
          titleSize={56}
        />

        <div style={{ position: "relative", marginTop: 70 }}>
          <div
            style={{
              position: "absolute",
              left: 34,
              top: 33,
              height: 2,
              width: (CARD_W + GAP) * 3 * rail,
              backgroundColor: relens.accent,
              opacity: 0.35,
            }}
          />
          <div style={{ display: "flex", gap: GAP }}>
            {PHASES.map((p, i) => {
              const at = CARD0 + i * CARD_STEP;
              const count = Math.round(
                interpolate(frame, [at + 10, at + 50], [0, p.value], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: EASE,
                }),
              );
              return (
                <div
                  key={p.n}
                  style={{
                    width: CARD_W,
                    display: "flex",
                    flexDirection: "column",
                    opacity: fadeIn(frame, at, 12),
                    translate: riseY(frame, at, 16, 16),
                  }}
                >
                  <div
                    style={{
                      width: 68,
                      height: 68,
                      borderRadius: 34,
                      backgroundColor: relens.navy,
                      color: relens.topbar,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      fontWeight: 600,
                      boxShadow: "0 8px 20px rgba(14,34,56,0.22)",
                    }}
                  >
                    {p.n}
                  </div>
                  <div
                    style={{
                      marginTop: 22,
                      backgroundColor: relens.surface,
                      border: `1px solid ${relens.line}`,
                      borderTop: `4px solid ${relens.accent}`,
                      borderRadius: 10,
                      padding: "26px 28px 28px",
                      boxShadow: "0 10px 30px rgba(14,34,56,0.07)",
                      minHeight: 318,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div style={{ ...type.title, fontSize: 34 }}>{p.name}</div>
                    <div
                      style={{
                        ...type.body,
                        fontSize: 22,
                        color: relens.muted,
                        marginTop: 12,
                        minHeight: 96,
                      }}
                    >
                      {p.desc}
                    </div>
                    <div
                      style={{
                        marginTop: "auto",
                        paddingTop: 18,
                        borderTop: `1px solid ${relens.line}`,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 64,
                          fontWeight: 600,
                          letterSpacing: "-0.02em",
                          color: relens.accent,
                          fontVariantNumeric: "tabular-nums",
                          lineHeight: 1.05,
                        }}
                      >
                        {count}
                      </div>
                      <div style={{ ...type.caption, color: relens.muted, marginTop: 4 }}>
                        {p.unit}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SlideShell>
  );
};
