import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { ANNORAK_LOGO, RelensLockup } from "../BrandMark";
import { PitchBackdrop } from "../components/PitchBackdrop";
import { relensSans } from "../fonts";
import { crossIn, fadeIn, pop, ramp, riseY } from "../motion";
import { layout, relens, type } from "../theme";

const VERBS = ["Busca.", "Recoge.", "Verifica.", "Retrata."];
const OUTPUTS = ["Expediente", "Valoración", "Vida personal", "Círculo", "Retrato", "Mapa"];

export const Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rule = ramp(frame, 70, 100);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: relens.navy,
        fontFamily: relensSans,
        color: relens.topbar,
        padding: `${layout.padY}px ${layout.padX}px`,
        display: "flex",
        flexDirection: "column",
        opacity: crossIn(frame),
        overflow: "hidden",
      }}
    >
      <PitchBackdrop color="rgba(243,246,249,0.07)" />

      <div
        style={{
          opacity: fadeIn(frame, 6, 14),
          scale: `${0.96 + 0.04 * pop(frame, fps, 6)}`,
          transformOrigin: "left center",
        }}
      >
        <RelensLockup tone="ink" mark={64} />
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 28,
          position: "relative",
        }}
      >
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
          {VERBS.map((w, i) => (
            <span
              key={w}
              style={{
                ...type.display,
                fontSize: 96,
                color: i === VERBS.length - 1 ? relens.accentLight : relens.topbar,
                opacity: fadeIn(frame, 20 + i * 12, 12),
                translate: riseY(frame, 20 + i * 12, 16, 18),
              }}
            >
              {w}
            </span>
          ))}
        </div>

        <div
          style={{
            width: `${rule * 100}%`,
            maxWidth: 1240,
            height: 3,
            backgroundColor: relens.accentLight,
          }}
        />

        <div
          style={{
            ...type.subtitle,
            fontSize: 30,
            color: relens.topbarMuted,
            maxWidth: 1100,
            opacity: fadeIn(frame, 92, 14),
            translate: riseY(frame, 92, 16, 12),
          }}
        >
          El contexto personal de un jugador, más allá del campo. Con fuente.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 40,
          position: "relative",
        }}
      >
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", maxWidth: 1100 }}>
          {OUTPUTS.map((o, i) => (
            <div
              key={o}
              style={{
                ...type.caption,
                fontSize: 20,
                border: `1px solid ${relens.navyLine}`,
                borderRadius: 999,
                padding: "11px 22px",
                opacity: fadeIn(frame, 112 + i * 8, 12),
                translate: riseY(frame, 112 + i * 8, 14, 10),
              }}
            >
              {o}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            opacity: fadeIn(frame, 150, 16),
          }}
        >
          <span style={{ fontSize: 19, color: relens.topbarMuted }}>
            <strong style={{ color: relens.topbar, fontWeight: 600 }}>Powered</strong> by
          </span>
          <Img src={staticFile(ANNORAK_LOGO)} style={{ height: 40, width: "auto" }} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
