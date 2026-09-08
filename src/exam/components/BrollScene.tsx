import { ReactNode } from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  Sequence,
  staticFile,
  OffthreadVideo,
  useCurrentFrame,
} from "remotion";
import { BrandLockup } from "../BrandMark";
import { pfuMono, pfuSans } from "../fonts";
import { crossIn, fadeIn, riseY } from "../motion";
import { layout, pfu, type } from "../theme";

type Props = {
  duration: number;
  /** Still de respaldo en `public/exam/`. */
  still: string;
  /** Clip opcional en `public/exam/broll/`. Si existe, manda sobre el still. */
  clip?: string;
  children: ReactNode;
  /** Sentido del zoom lento. */
  push?: "in" | "out";
  crumb?: string;
};

/**
 * Escena de B-roll: imagen a sangre con recorrido lento, velo oscuro por la
 * izquierda y contenido tipografico encima. El hueco de video se rellena solo
 * cuando el MP4 existe en `public/exam/broll/`.
 */
export const BrollScene: React.FC<Props> = ({
  duration,
  still,
  clip,
  children,
  push = "in",
  crumb,
}) => {
  const frame = useCurrentFrame();
  const from = push === "in" ? 1.02 : 1.14;
  const to = push === "in" ? 1.14 : 1.02;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: pfu.header,
        fontFamily: pfuSans,
        opacity: crossIn(frame),
      }}
    >
      <AbsoluteFill>
        {clip ? (
          <OffthreadVideo
            src={staticFile(clip)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            muted
          />
        ) : (
          <Img
            src={staticFile(still)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              scale: interpolate(frame, [0, duration], [from, to], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.linear,
              }),
            }}
          />
        )}
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(90deg, rgba(7,9,13,0.94) 0%, rgba(7,9,13,0.82) 38%, rgba(7,9,13,0.18) 72%, rgba(7,9,13,0.05) 100%)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(0deg, rgba(7,9,13,0.6) 0%, rgba(7,9,13,0) 46%)",
        }}
      />

      <AbsoluteFill
        style={{
          padding: `${layout.padY}px ${layout.padX}px`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          color: pfu.white,
        }}
      >
        {crumb ? (
          <div style={{ opacity: fadeIn(frame, 0, 12) }}>
            <BrandLockup crumb={crumb} tone="ink" />
          </div>
        ) : (
          <div />
        )}
        <div>
          <div
            style={{
              width: layout.ruleW,
              height: 3,
              backgroundColor: pfu.blue,
              marginBottom: 26,
              scale: `${fadeIn(frame, 6, 16)} 1`,
              transformOrigin: "left center",
            }}
          />
          {children}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Fila de datos duros sobre B-roll: clave mono arriba, valor abajo. */
export const SpecChips: React.FC<{
  chips: { k: string; v: string }[];
  delay: number;
}> = ({ chips, delay }) => {
  const frame = useCurrentFrame();

  return (
    <div style={{ display: "flex", gap: 56, marginTop: layout.titleToLead }}>
      {chips.map((c, i) => (
        <div
          key={c.k}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            paddingLeft: 16,
            borderLeft: `2px solid ${pfu.blue}`,
            opacity: fadeIn(frame, delay + i * 7, 12),
            translate: riseY(frame, delay + i * 7, 14, 10),
          }}
        >
          <div
            style={{
              fontFamily: pfuMono,
              fontSize: 15,
              letterSpacing: "0.12em",
              color: pfu.blue100,
              textTransform: "uppercase",
            }}
          >
            {c.k}
          </div>
          <div style={{ ...type.caption, fontSize: 22, color: pfu.white }}>
            {c.v}
          </div>
        </div>
      ))}
    </div>
  );
};

/** Sub-secuencia util para escalonar bloques dentro de una escena de B-roll. */
export const After: React.FC<{ at: number; children: ReactNode }> = ({
  at,
  children,
}) => (
  <Sequence from={at} layout="none">
    {children}
  </Sequence>
);
