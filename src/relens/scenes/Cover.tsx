import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { ANNORAK_LOGO, RelensLockup } from "../BrandMark";
import { PitchBackdrop } from "../components/PitchBackdrop";
import { relensSans } from "../fonts";
import { fadeIn, riseY } from "../motion";
import { layout, relens, type } from "../theme";

const STEPS = [
  { n: "01", title: "Recoge", desc: "Prensa, wikis y redes" },
  { n: "02", title: "Despieza", desc: "Hechos con fecha y fuente" },
  { n: "03", title: "Retrata", desc: "Sin inventar nada" },
  { n: "04", title: "Dibuja", desc: "El mapa de su círculo" },
];

/** Portada: marca, promesa y el expediente real entrando por la derecha. */
export const Cover: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: relens.navy,
        fontFamily: relensSans,
        color: relens.topbar,
        overflow: "hidden",
      }}
    >
      <PitchBackdrop color="rgba(243,246,249,0.07)" />

      <div
        style={{
          position: "absolute",
          left: layout.padX,
          top: 250,
          width: 860,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            ...type.eyebrow,
            fontWeight: 600,
            color: relens.accentLight,
            opacity: fadeIn(frame, 10, 12),
          }}
        >
          SCOUTING  ·  FUENTES ABIERTAS
        </div>
        <div
          style={{
            marginTop: 34,
            opacity: fadeIn(frame, 16, 16),
            translate: riseY(frame, 16, 20, 20),
          }}
        >
          <RelensLockup tone="ink" mark={120} />
        </div>
        <div
          style={{
            width: layout.ruleW,
            height: 3,
            backgroundColor: relens.accentLight,
            marginTop: 40,
            scale: `${fadeIn(frame, 30, 18)} 1`,
            transformOrigin: "left center",
          }}
        />
        <div
          style={{
            ...type.subtitle,
            fontSize: 30,
            color: relens.topbarMuted,
            maxWidth: 760,
            marginTop: 30,
            opacity: fadeIn(frame, 36, 16),
            translate: riseY(frame, 36, 18, 14),
          }}
        >
          El expediente personal de un futbolista, construido solo con fuentes
          públicas y con cada dato citado.
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 50 }}>
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                padding: "14px 18px",
                borderRadius: 8,
                border: `1px solid ${relens.navyLine}`,
                backgroundColor: "rgba(243,246,249,0.04)",
                minWidth: 176,
                opacity: fadeIn(frame, 62 + i * 10, 12),
                translate: riseY(frame, 62 + i * 10, 14, 12),
              }}
            >
              <div style={{ ...type.caption, fontSize: 15, color: relens.accentLight }}>
                {s.n}
              </div>
              <div style={{ fontSize: 22, fontWeight: 600 }}>{s.title}</div>
              <div style={{ fontSize: 16, color: relens.topbarMuted }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: layout.padX,
          bottom: layout.padY - 10,
          display: "flex",
          alignItems: "center",
          gap: 12,
          opacity: fadeIn(frame, 110, 16),
        }}
      >
        <span style={{ fontSize: 17, color: relens.topbarMuted }}>
          <strong style={{ color: relens.topbar, fontWeight: 600 }}>Powered</strong> by
        </span>
        <Img src={staticFile(ANNORAK_LOGO)} style={{ height: 34, width: "auto" }} />
      </div>

      <div
        style={{
          position: "absolute",
          left: 1060,
          top: 230,
          width: 1100,
          rotate: "-4deg",
          opacity: fadeIn(frame, 8, 20),
          translate: `${interpolate(frame, [8, 60], [120, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}px 0px`,
        }}
      >
        <Img
          src={staticFile("relens/plates/03-dossier.png")}
          style={{
            width: 1100,
            height: "auto",
            display: "block",
            borderRadius: 12,
            boxShadow: "0 40px 100px rgba(0,0,0,0.45)",
            border: "1px solid rgba(243,246,249,0.14)",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
