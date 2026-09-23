import { Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { relensSans } from "../fonts";
import { EASE, fadeIn } from "../motion";
import type { PlateName, PlateRect } from "../plates";
import { relens } from "../theme";

export const FRAME_W = 1180;
export const FRAME_H = 664;
export const CHROME_H = 40;
const CAP_W = 1920;
const CAP_H = 1080;
const ASPECT = FRAME_H / FRAME_W;

/** Encuadre sobre la captura, en px de captura. El alto sale del ancho. */
export type Cam = { x: number; y: number; w: number };
export type CamKey = Cam & { at: number };

export type Shot = {
  plate: PlateName;
  /** Frame de la diapositiva en que entra. */
  from: number;
  /** `at` relativo a `from`. Con una sola clave, deriva despacio hacia dentro. */
  cams: CamKey[];
};

export type Mark = {
  shot: number;
  rect: PlateRect;
  at: number;
  /** Frame en que se retira (se funde en 8 frames). */
  until?: number;
  n?: number;
  label?: string;
  side?: "top" | "bottom";
  /** Oscurece el resto mientras es la última marca en entrar. */
  spot?: boolean;
  pad?: number;
  badgeRight?: boolean;
};

const clampCam = (c: Cam): Cam => {
  const w = Math.min(Math.max(c.w, 240), CAP_W);
  const h = w * ASPECT;
  return {
    w,
    x: Math.min(Math.max(c.x, 0), CAP_W - w),
    y: Math.min(Math.max(c.y, 0), CAP_H - h),
  };
};

type Box = { x: number; y: number; w: number; h: number };

export const union = (...rects: Box[]): Box => {
  const x = Math.min(...rects.map((r) => r.x));
  const y = Math.min(...rects.map((r) => r.y));
  const x2 = Math.max(...rects.map((r) => r.x + r.w));
  const y2 = Math.max(...rects.map((r) => r.y + r.h));
  return { x, y, w: x2 - x, h: y2 - y };
};

/** Encuadre mínimo que contiene `r` con `margin` px alrededor, centrado. */
export const fit = (r: Box, margin = 60, minW = 0): Cam => {
  const w = Math.max(r.w + margin * 2, (r.h + margin * 2) / ASPECT, minW);
  const h = w * ASPECT;
  return { x: r.x + r.w / 2 - w / 2, y: r.y + r.h / 2 - h / 2, w };
};

const camFor = (shot: Shot, t: number, life: number): Cam => {
  const keys = shot.cams.map((k) => ({ ...clampCam(k), at: k.at }));
  if (keys.length === 1) {
    const k = keys[0];
    const z = interpolate(t, [0, life], [1, 0.965], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.linear,
    });
    const w = k.w * z;
    const h0 = k.w * ASPECT;
    return clampCam({ w, x: k.x + (k.w - w) / 2, y: k.y + (h0 - w * ASPECT) / 2 });
  }
  let i = 0;
  while (i < keys.length - 2 && t > keys[i + 1].at) i++;
  const a = keys[i];
  const b = keys[i + 1];
  const p = interpolate(t, [a.at, b.at], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });
  return {
    x: a.x + (b.x - a.x) * p,
    y: a.y + (b.y - a.y) * p,
    w: a.w + (b.w - a.w) * p,
  };
};

export const Badge: React.FC<{ n: number; size?: number }> = ({ n, size = 34 }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: relens.navy,
      color: relens.topbar,
      fontFamily: relensSans,
      fontWeight: 600,
      fontSize: size * 0.5,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 4px 12px rgba(14,34,56,0.28)",
      flexShrink: 0,
    }}
  >
    {n}
  </div>
);

type Props = {
  shots: Shot[];
  marks: Mark[];
  duration: number;
  caption?: string;
};

/** Ventana de la app con cámara y marcas. Las capturas son 1920x1080 reales. */
export const AppFrame: React.FC<Props> = ({ shots, marks, duration, caption }) => {
  const frame = useCurrentFrame();

  const current = shots.reduce((acc, s, i) => (frame >= s.from ? i : acc), 0);
  const lifeOf = (i: number) => (shots[i + 1]?.from ?? duration) - shots[i].from;
  const cams = shots.map((s, i) => camFor(s, frame - s.from, lifeOf(i)));

  const live = marks.filter(
    (m) => m.shot === current && frame >= m.at && (m.until === undefined || frame < m.until + 8),
  );
  const lastSpot = live.filter((m) => m.spot && (m.until === undefined || frame < m.until)).reduce<Mark | null>(
    (acc, m) => (!acc || m.at >= acc.at ? m : acc),
    null,
  );

  return (
    <div
      style={{
        width: FRAME_W,
        borderRadius: 14,
        overflow: "hidden",
        backgroundColor: relens.white,
        border: `1px solid ${relens.line}`,
        boxShadow:
          "0 34px 90px rgba(14,34,56,0.22), 0 6px 18px rgba(14,34,56,0.08)",
      }}
    >
      <div
        style={{
          height: CHROME_H,
          backgroundColor: "#e8edf2",
          borderBottom: `1px solid ${relens.line}`,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 18px",
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: "#c5ced8",
            }}
          />
        ))}
        <div
          style={{
            marginLeft: 18,
            fontFamily: relensSans,
            fontSize: 15,
            fontWeight: 500,
            color: relens.muted,
            letterSpacing: "0.02em",
          }}
        >
          {caption ?? "Relens  ·  Lamine Yamal"}
        </div>
      </div>

      <div
        style={{
          position: "relative",
          width: FRAME_W,
          height: FRAME_H,
          overflow: "hidden",
          backgroundColor: relens.bg,
        }}
      >
        {shots.map((s, i) => {
          if (frame < s.from) return null;
          const next = shots[i + 1];
          if (next && frame > next.from + 16) return null;
          const cam = cams[i];
          const k = FRAME_W / cam.w;
          return (
            <div
              key={`${s.plate}-${s.from}`}
              style={{
                position: "absolute",
                inset: 0,
                opacity: i === 0 ? 1 : fadeIn(frame, s.from, 14),
              }}
            >
              <Img
                src={staticFile(`relens/plates/${s.plate}.png`)}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: CAP_W * k,
                  height: CAP_H * k,
                  maxWidth: "none",
                  translate: `${-cam.x * k}px ${-cam.y * k}px`,
                }}
              />
            </div>
          );
        })}

        {live.map((m) => {
          const cam = cams[m.shot];
          const k = FRAME_W / cam.w;
          const pad = m.pad ?? 8;
          const x = (m.rect.x - pad - cam.x) * k;
          const y = (m.rect.y - pad - cam.y) * k;
          const w = (m.rect.w + pad * 2) * k;
          const h = (m.rect.h + pad * 2) * k;
          const o =
            fadeIn(frame, m.at, 10) *
            (m.until === undefined ? 1 : 1 - fadeIn(frame, m.until, 8));
          const grow = interpolate(frame, [m.at, m.at + 12], [1.08, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: EASE,
          });
          const spotOn = lastSpot === m;
          const below = (m.side ?? "bottom") === "bottom";
          const anchorRight = x + w / 2 > FRAME_W / 2;
          return (
            <div
              key={`${m.shot}-${m.at}-${m.rect.x}-${m.rect.y}`}
              style={{
                position: "absolute",
                left: x,
                top: y,
                width: w,
                height: h,
                opacity: o,
                scale: `${grow}`,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 8,
                  border: `3px solid ${relens.accent}`,
                  backgroundColor: "rgba(26,79,115,0.06)",
                  boxShadow: spotOn
                    ? `0 0 0 4000px rgba(14,34,56,${0.34 * fadeIn(frame, m.at, 14)})`
                    : "none",
                }}
              />
              {m.n ? (
                <div
                  style={{
                    position: "absolute",
                    top: -16,
                    ...(m.badgeRight ? { right: -12 } : { left: -12 }),
                  }}
                >
                  <Badge n={m.n} />
                </div>
              ) : null}
              {m.label ? (
                <div
                  style={{
                    position: "absolute",
                    ...(anchorRight ? { right: 0 } : { left: 0 }),
                    ...(below ? { top: h + 10 } : { bottom: h + 10 }),
                    whiteSpace: "nowrap",
                    backgroundColor: relens.navy,
                    color: relens.topbar,
                    fontFamily: relensSans,
                    fontSize: 20,
                    fontWeight: 600,
                    padding: "8px 14px",
                    borderRadius: 8,
                    boxShadow: "0 8px 20px rgba(14,34,56,0.25)",
                  }}
                >
                  {m.label}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};
