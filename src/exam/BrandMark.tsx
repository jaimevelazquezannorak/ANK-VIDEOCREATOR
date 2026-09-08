import { Img, staticFile } from "remotion";
import { pfuSerif } from "./fonts";
import { layout, pfu } from "./theme";

export const PFU_LOGO = "branding/pfu-logo.png";

/** El PNG trae aire a la izquierda; solo se usa para colocarlo, no se recorta. */
export const logoLeftNudge = (width: number) => -Math.round(width * (102 / 601));

type MarkProps = {
  width: number;
};

/** Logo oficial PFU, tal cual el PNG. */
export const BrandMark: React.FC<MarkProps> = ({ width }) => {
  return (
    <Img
      src={staticFile(PFU_LOGO)}
      style={{
        width,
        height: "auto",
        flexShrink: 0,
      }}
    />
  );
};

type LockupProps = {
  crumb: string;
  tone?: "paper" | "ink";
};

/** Marca + producto, alineados al margen izquierdo de la diapositiva. */
export const BrandLockup: React.FC<LockupProps> = ({
  crumb,
  tone = "paper",
}) => {
  const dark = tone === "ink";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginLeft: logoLeftNudge(layout.logoW),
      }}
    >
      <BrandMark width={layout.logoW} />
      <div
        style={{
          fontFamily: pfuSerif,
          fontSize: 22,
          fontWeight: 500,
          letterSpacing: "-0.015em",
          lineHeight: 1.2,
          color: dark ? pfu.g200 : pfu.g700,
        }}
      >
        {crumb}
      </div>
    </div>
  );
};
