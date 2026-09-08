import { ReactNode } from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { BrandLockup } from "../BrandMark";
import { pfuMono, pfuSans } from "../fonts";
import { crossIn, fadeIn, riseY } from "../motion";
import { layout, pfu, type } from "../theme";

type ShellProps = {
  crumb: string;
  children: ReactNode;
  /** Fondo claro (app) o fondo oscuro (marca). */
  tone?: "paper" | "ink";
};

/**
 * Marco comun de las escenas de aplicacion: papel PFU, barra de marca arriba
 * y fundido de entrada y salida controlado por frame.
 */
export const SceneShell: React.FC<ShellProps> = ({
  crumb,
  children,
  tone = "paper",
}) => {
  const frame = useCurrentFrame();
  const dark = tone === "ink";

  return (
    <AbsoluteFill
      style={{
        backgroundColor: dark ? pfu.header : pfu.paper,
        fontFamily: pfuSans,
        color: dark ? pfu.white : pfu.ink,
        padding: `${layout.padY}px ${layout.padX}px`,
        display: "flex",
        flexDirection: "column",
        opacity: crossIn(frame),
      }}
    >
      <div
        style={{
          marginBottom: 44,
          opacity: fadeIn(frame, 0, 12),
        }}
      >
        <BrandLockup crumb={crumb} tone={tone} />
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {children}
      </div>
    </AbsoluteFill>
  );
};

type HeadProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  delay?: number;
  tone?: "paper" | "ink";
  maxWidth?: number;
};

/** Bloque titular: cintillo mono, titular display y entradilla. */
export const SceneHead: React.FC<HeadProps> = ({
  eyebrow,
  title,
  lead,
  delay = 8,
  tone = "paper",
  maxWidth = 1180,
}) => {
  const frame = useCurrentFrame();
  const dark = tone === "ink";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginBottom: layout.headToBody,
      }}
    >
      <div
        style={{
          fontFamily: pfuMono,
          ...type.eyebrow,
          color: dark ? pfu.blue100 : pfu.blue,
          opacity: fadeIn(frame, delay, 12),
        }}
      >
        {eyebrow}
      </div>
      <div
        style={{
          ...type.display,
          fontSize: 58,
          color: dark ? pfu.white : pfu.ink,
          maxWidth,
          marginTop: layout.eyebrowToTitle,
          opacity: fadeIn(frame, delay + 4, 14),
          translate: riseY(frame, delay + 4, 16, 14),
        }}
      >
        {title}
      </div>
      {lead ? (
        <div
          style={{
            ...type.subtitle,
            fontSize: 25,
            color: dark ? pfu.blue100 : pfu.ricohGray,
            maxWidth: 960,
            marginTop: layout.titleToLead,
            opacity: fadeIn(frame, delay + 12, 14),
            translate: riseY(frame, delay + 12, 16, 12),
          }}
        >
          {lead}
        </div>
      ) : null}
    </div>
  );
};
