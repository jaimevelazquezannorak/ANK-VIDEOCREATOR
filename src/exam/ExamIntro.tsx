import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { BrandMark, logoLeftNudge } from "./BrandMark";
import { SheetPreview } from "./components/SheetPreview";
import { type ExamLang, introCopy } from "./copy";
import { pfuMono, pfuSans } from "./fonts";
import { fadeIn, ramp, riseY } from "./motion";
import { layout, pfu, state, type } from "./theme";

export type ExamIntroProps = {
  lang: ExamLang;
};

const enter = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
  easing: Easing.bezier(0.16, 1, 0.3, 1),
};

/** Ventana de escaneo en la portada (frames de la escena). */
const SCAN_FROM = 58;
const SCAN_TO = 176;
const RESULT_AT = 190;

/** Respuestas del alumno: "col-fila-opcion". Se descubren al pasar el escaner. */
const ANSWERS = [
  "0-0-1", "1-0-3", "0-1-0", "1-1-2", "0-2-2", "1-2-0", "0-3-3", "1-3-1",
  "0-4-1", "1-4-1", "0-5-0", "1-5-3", "0-6-2", "1-6-2", "0-7-3", "1-7-0",
  "0-8-1", "1-8-2", "0-9-0", "1-9-1", "0-10-2", "1-10-3", "0-11-1", "1-11-0",
  "0-12-3", "1-12-2", "0-13-0", "1-13-1", "0-14-2", "1-14-3", "0-15-1",
  "1-15-0", "0-16-3", "1-16-2", "0-17-1", "1-17-1",
];

const rowOf = (key: string) => Number(key.split("-")[1]);
const SHEET_ROW0 = 54;
const SHEET_STEP = 9;

/**
 * Portada: la hoja real del producto entra en el escaner y sale corregida
 * mientras se lee el titular. Estilo corporativo PFU: papel, azul, aire.
 */
export const ExamIntro: React.FC<ExamIntroProps> = ({ lang }) => {
  const frame = useCurrentFrame();
  const copy = introCopy[lang];

  // El escaner avanza a velocidad constante: nada de ease en el recorrido.
  const scan = interpolate(frame, [SCAN_FROM, SCAN_TO], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scanMm = scan * 297;
  const marks = ANSWERS.filter(
    (k) => scanMm > SHEET_ROW0 + rowOf(k) * SHEET_STEP + 2,
  );
  const scanning = frame >= SCAN_FROM && frame < RESULT_AT;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: pfu.paper,
        fontFamily: pfuSans,
        color: pfu.ink,
        overflow: "hidden",
      }}
    >
      {/* Panel azul en diagonal: el trazo de la marca PFU llevado al fondo. */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 900,
          height: "100%",
          background: `linear-gradient(160deg, ${pfu.blue50} 0%, ${pfu.blue100} 100%)`,
          clipPath: "polygon(24% 0, 100% 0, 100% 100%, 0 100%)",
          translate: interpolate(frame, [0, 34], ["220px 0px", "0px 0px"], enter),
          opacity: interpolate(frame, [0, 20], [0, 1], enter),
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 900,
          height: "100%",
          background: pfu.blue,
          clipPath: "polygon(24% 0, 24.55% 0, 0.55% 100%, 0 100%)",
          translate: interpolate(frame, [0, 34], ["220px 0px", "0px 0px"], enter),
          opacity: interpolate(frame, [6, 26], [0, 1], enter),
        }}
      />

      {/* Marca */}
      <div
        style={{
          position: "absolute",
          left: layout.padX + logoLeftNudge(210),
          top: layout.padY - 8,
          opacity: fadeIn(frame, 4, 16),
          translate: riseY(frame, 4, 18, 10),
        }}
      >
        <BrandMark width={210} />
      </div>

      {/* Columna de texto */}
      <div
        style={{
          position: "absolute",
          left: layout.padX,
          top: 300,
          width: 880,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Interactive.Div
          name="Eyebrow"
          style={{
            fontFamily: pfuMono,
            ...type.eyebrow,
            color: pfu.blue,
            opacity: fadeIn(frame, 16, 12),
          }}
        >
          {copy.eyebrow}
        </Interactive.Div>

        <Interactive.Div
          name="Product title"
          style={{
            ...type.display,
            fontSize: 96,
            lineHeight: 1.02,
            letterSpacing: "-0.03em",
            marginTop: 18,
            opacity: fadeIn(frame, 22, 16),
            translate: riseY(frame, 22, 20, 22),
          }}
        >
          {copy.product}
        </Interactive.Div>

        <div
          style={{
            width: layout.ruleW,
            height: 3,
            backgroundColor: pfu.blue,
            marginTop: 30,
            scale: `${ramp(frame, 34, 52)} 1`,
            transformOrigin: "left center",
          }}
        />

        <Interactive.Div
          name="Claim"
          style={{
            ...type.subtitle,
            fontSize: 27,
            color: pfu.ricohGray,
            maxWidth: 720,
            marginTop: 26,
            opacity: fadeIn(frame, 40, 16),
            translate: riseY(frame, 40, 18, 14),
          }}
        >
          {copy.claim}
        </Interactive.Div>

        <div style={{ display: "flex", gap: 14, marginTop: 44 }}>
          {copy.steps.map((s, i) => (
            <div
              key={s.n}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                backgroundColor: pfu.white,
                border: `1px solid ${pfu.g200}`,
                borderRadius: 8,
                padding: "12px 16px 12px 12px",
                boxShadow: "0 1px 2px rgba(26,26,26,0.06)",
                opacity: fadeIn(frame, 72 + i * 12, 12),
                translate: riseY(frame, 72 + i * 12, 14, 12),
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 6,
                  backgroundColor: pfu.blue50,
                  color: pfu.blue800,
                  fontFamily: pfuMono,
                  fontSize: 13,
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {s.n}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <div style={{ ...type.caption, fontSize: 19, color: pfu.ink, fontWeight: 600 }}>
                  {s.title}
                </div>
                <div style={{ ...type.caption, fontSize: 15, fontWeight: 400, color: pfu.g500 }}>
                  {s.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pie: quien pone el software y quien la captura */}
      <div
        style={{
          position: "absolute",
          left: layout.padX,
          bottom: layout.padY - 16,
          fontFamily: pfuMono,
          fontSize: 14,
          letterSpacing: "0.08em",
          color: pfu.g500,
          opacity: fadeIn(frame, 120, 16),
        }}
      >
        {copy.footer}
      </div>

      {/* Hoja del producto entrando en el escaner */}
      <div
        style={{
          position: "absolute",
          left: 1230,
          top: 118,
          rotate: "-3deg",
          transformOrigin: "center",
          opacity: fadeIn(frame, 10, 18),
          translate: riseY(frame, 10, 26, 70),
        }}
      >
        <div
          style={{
            backgroundColor: pfu.white,
            borderRadius: 6,
            boxShadow: "0 30px 70px rgba(16,66,140,0.22), 0 4px 14px rgba(26,26,26,0.10)",
            padding: 10,
          }}
        >
          <SheetPreview
            width={470}
            reveal={1}
            marks={marks}
            scan={scanning ? scan : undefined}
          />
        </div>

        <div
          style={{
            position: "absolute",
            left: 18,
            bottom: -54,
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontFamily: pfuMono,
            fontSize: 15,
            letterSpacing: "0.08em",
            color: pfu.blue800,
            opacity: scanning ? fadeIn(frame, SCAN_FROM, 10) : 0,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: pfu.blue,
              opacity: 0.55 + 0.45 * Math.abs(Math.sin(frame / 5)),
            }}
          />
          {copy.scanLabel}
        </div>

        <div
          style={{
            position: "absolute",
            right: -26,
            top: -26,
            display: "flex",
            alignItems: "center",
            gap: 10,
            backgroundColor: state.success,
            color: pfu.white,
            borderRadius: 999,
            padding: "12px 20px",
            fontSize: 20,
            fontWeight: 600,
            boxShadow: "0 10px 26px rgba(46,125,91,0.35)",
            opacity: fadeIn(frame, RESULT_AT, 10),
            scale: `${interpolate(frame, [RESULT_AT, RESULT_AT + 14], [0.82, 1], {
              ...enter,
              easing: Easing.bezier(0.34, 1.56, 0.64, 1),
            })}`,
          }}
        >
          <svg width={18} height={18} viewBox="0 0 22 22">
            <path
              d="M5 11.5 L9.2 15.6 L17 7.4"
              stroke={pfu.white}
              strokeWidth={2.6}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          {copy.resultBadge}
        </div>
      </div>
    </AbsoluteFill>
  );
};
