import { Img, staticFile } from "remotion";
import { relensSans, relensSerif } from "./fonts";
import { relens } from "./theme";

type GlyphProps = { size: number; color?: string };

/** Marca de la app: lente con estrella, sin baldosa. Sirve sobre navy. */
export const RelensGlyph: React.FC<GlyphProps> = ({
  size,
  color = relens.topbar,
}) => {
  return (
    <svg
      viewBox="0 0 36 36"
      width={size}
      height={size}
      aria-hidden
    >
      <defs>
        <clipPath id="relens-lens-clip">
          <circle cx="14.2" cy="14" r="9.4" />
        </clipPath>
      </defs>
      <line
        x1="22.6"
        y1="22.4"
        x2="32.4"
        y2="32.2"
        stroke={color}
        strokeWidth="2.7"
        strokeLinecap="round"
      />
      <circle
        cx="14.2"
        cy="14"
        r="10"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
      />
      <g clipPath="url(#relens-lens-clip)">
        <polygon
          points="14.2,10.3 17.7,12.9 16.4,17.0 12.0,17.0 10.7,12.9"
          fill={color}
        />
        <g fill="none" stroke={color} strokeWidth="1.15">
          <line x1="14.2" y1="10.3" x2="14.2" y2="4.8" />
          <line x1="17.7" y1="12.9" x2="22.9" y2="11.2" />
          <line x1="16.4" y1="17.0" x2="19.6" y2="21.4" />
          <line x1="12.0" y1="17.0" x2="8.8" y2="21.4" />
          <line x1="10.7" y1="12.9" x2="5.5" y2="11.2" />
        </g>
      </g>
    </svg>
  );
};

/** Baldosa navy del favicon. Sirve sobre papel. */
export const RelensMark: React.FC<{ size: number }> = ({ size }) => {
  return (
    <Img
      src={staticFile("relens/mark.svg")}
      style={{ width: size, height: size, display: "block" }}
    />
  );
};

type LockupProps = {
  tone?: "paper" | "ink";
  mark?: number;
};

/** Wordmark Relens, misma rejilla que la barra de la app. */
export const RelensLockup: React.FC<LockupProps> = ({
  tone = "paper",
  mark = 44,
}) => {
  const dark = tone === "ink";
  const name = dark ? relens.topbar : relens.navy;
  const tag = dark ? relens.topbarMuted : relens.muted;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `${mark}px max-content`,
        gridTemplateRows: "1fr 1fr",
        columnGap: 10,
        height: mark,
        lineHeight: 1,
      }}
    >
      <div style={{ gridRow: "1 / span 2" }}>
        {dark ? (
          <RelensGlyph size={mark} />
        ) : (
          <RelensMark size={mark} />
        )}
      </div>
      <strong
        style={{
          gridColumn: 2,
          alignSelf: "end",
          fontFamily: relensSerif,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          fontSize: mark * 0.52,
          color: name,
          whiteSpace: "nowrap",
        }}
      >
        Relens
      </strong>
      <small
        style={{
          gridColumn: 2,
          alignSelf: "start",
          paddingTop: 3,
          fontFamily: relensSans,
          fontWeight: 500,
          color: tag,
          fontSize: Math.max(11, mark * 0.24),
          letterSpacing: "0.045em",
          whiteSpace: "nowrap",
        }}
      >
        Más allá del campo
      </small>
    </div>
  );
};

export const ANNORAK_LOGO = "relens/logo-annorak.webp";
