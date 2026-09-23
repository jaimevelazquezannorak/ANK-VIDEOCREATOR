import { ReactNode } from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { RelensLockup } from "../BrandMark";
import { relensSans } from "../fonts";
import { crossIn, fadeIn, riseY } from "../motion";
import { layout, relens, SLIDES, type } from "../theme";
import { PitchBackdrop } from "./PitchBackdrop";

const pad2 = (n: number) => String(n).padStart(2, "0");

/** Diapositiva clara: campo de fondo, marca arriba a la izquierda, contador a la derecha. */
export const SlideShell: React.FC<{ index: number; children: ReactNode }> = ({
  index,
  children,
}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: relens.paper,
        fontFamily: relensSans,
        color: relens.ink,
        opacity: crossIn(frame),
        overflow: "hidden",
      }}
    >
      <PitchBackdrop opacity={0.9} />
      <div
        style={{
          position: "absolute",
          left: layout.padX,
          top: layout.padY - 12,
          opacity: fadeIn(frame, 0, 12),
        }}
      >
        <RelensLockup mark={44} />
      </div>
      <div
        style={{
          position: "absolute",
          right: layout.padX,
          top: layout.padY - 2,
          ...type.caption,
          fontSize: 18,
          letterSpacing: "0.1em",
          color: relens.muted,
          fontVariantNumeric: "tabular-nums",
          opacity: fadeIn(frame, 4, 12),
        }}
      >
        <span style={{ color: relens.ink, fontWeight: 600 }}>{pad2(index)}</span>
        {"  /  "}
        {pad2(SLIDES.length)}
      </div>
      {children}
    </AbsoluteFill>
  );
};

type HeadProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  delay?: number;
  maxWidth?: number;
  titleSize?: number;
  tone?: "paper" | "ink";
};

/** Cintillo, titular y entradilla. Misma jerarquía que el vídeo PFU. */
export const SlideHead: React.FC<HeadProps> = ({
  eyebrow,
  title,
  lead,
  delay = 6,
  maxWidth = 520,
  titleSize = 50,
  tone = "paper",
}) => {
  const frame = useCurrentFrame();
  const dark = tone === "ink";

  return (
    <div style={{ display: "flex", flexDirection: "column", maxWidth }}>
      <div
        style={{
          ...type.eyebrow,
          fontWeight: 600,
          color: dark ? relens.accentLight : relens.accent,
          opacity: fadeIn(frame, delay, 12),
        }}
      >
        {eyebrow}
      </div>
      <div
        style={{
          ...type.display,
          fontSize: titleSize,
          color: dark ? relens.topbar : relens.ink,
          marginTop: layout.eyebrowToTitle + 4,
          opacity: fadeIn(frame, delay + 4, 14),
          translate: riseY(frame, delay + 4, 16, 14),
        }}
      >
        {title}
      </div>
      <div
        style={{
          width: layout.ruleW,
          height: 3,
          backgroundColor: dark ? relens.accentLight : relens.accent,
          marginTop: 26,
          opacity: fadeIn(frame, delay + 10, 12),
        }}
      />
      {lead ? (
        <div
          style={{
            ...type.subtitle,
            fontSize: 24,
            fontWeight: 400,
            color: dark ? relens.topbarMuted : relens.muted,
            marginTop: 24,
            opacity: fadeIn(frame, delay + 14, 14),
            translate: riseY(frame, delay + 14, 16, 12),
          }}
        >
          {lead}
        </div>
      ) : null}
    </div>
  );
};
