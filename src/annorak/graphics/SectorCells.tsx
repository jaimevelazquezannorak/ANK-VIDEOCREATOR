import {
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { springEnter } from "../motion";
import { colors } from "../theme";

type Props = {
  labels: string[];
  columns?: number;
  baseDelay?: number;
};

const STAGGER = 14;
const BASE_DELAY = 18;

const gridColumnFor = (
  index: number,
  columns: number,
  count: number,
): string | undefined => {
  if (columns === 4 && count === 7 && index >= 4) {
    return String(index - 4 + 2);
  }
  if (columns === 2 && count === 7 && index === 6) {
    return "1 / -1";
  }
  return undefined;
};

const cellDepthOffset = (index: number, columns: number): number => {
  const row = Math.floor(index / columns);
  const col = index % columns;
  return row * 14 + col * 9;
};

export const SectorCells: React.FC<Props> = ({
  labels,
  columns = 4,
  baseDelay = BASE_DELAY,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const frameReveal = interpolate(frame - 6, [0, 36], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        width: "100%",
        perspective: 1400,
        perspectiveOrigin: "50% 38%",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gap: 16,
          width: "100%",
          transformStyle: "preserve-3d",
          opacity: 0.35 + frameReveal * 0.65,
          transform: `scale(${0.97 + frameReveal * 0.03})`,
        }}
      >
        {labels.map((label, i) => {
          const delay = baseDelay + i * STAGGER;
          const p = spring({
            fps,
            frame: frame - delay,
            config: springEnter,
          });
          const depth = cellDepthOffset(i, columns);
          const z = interpolate(p, [0, 1], [-140 - depth, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const scale = interpolate(p, [0, 1], [0.84, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const rotateX = interpolate(p, [0, 1], [16, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const borderDraw = interpolate(frame - delay, [0, 24], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          });
          const shimmer = interpolate(frame - delay, [8, 32], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.quad),
          });

          const gridColumn = gridColumnFor(i, columns, labels.length);
          const soloLast =
            columns === 2 && labels.length === 7 && i === 6;

          return (
            <div
              key={label}
              style={{
                gridColumn,
                justifySelf: soloLast ? "center" : undefined,
                width: soloLast ? "calc(50% - 8px)" : undefined,
                border: `1px solid ${colors.border}`,
                backgroundColor: colors.surface,
                padding: "20px 16px 18px",
                minHeight: 76,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                gap: 10,
                opacity: p,
                transform: `translateZ(${z}px) rotateX(${rotateX}deg) scale(${scale}) translateY(${(1 - p) * 32}px)`,
                transformStyle: "preserve-3d",
                position: "relative",
                overflow: "hidden",
                boxShadow: `0 ${12 * p}px ${28 * p}px rgba(0,0,0,${0.35 * p})`,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  border: `1px solid ${colors.borderStrong}`,
                  opacity: borderDraw * 0.55,
                  transform: `scale(${0.98 + borderDraw * 0.02})`,
                  transformOrigin: "center center",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: 3,
                  backgroundColor: colors.textPrimary,
                  transform: `scaleX(${borderDraw})`,
                  transformOrigin: "left center",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "40%",
                  height: "100%",
                  background: `linear-gradient(105deg, rgba(255,255,255,${0.06 * shimmer}) 0%, transparent 55%)`,
                  transform: `translateX(${interpolate(shimmer, [0, 1], [-80, 120])}%)`,
                  pointerEvents: "none",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  top: 12,
                  right: 14,
                  fontSize: "0.42em",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  color: colors.textMuted,
                  opacity: borderDraw * 0.9,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                style={{
                  fontSize: "inherit",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: colors.textPrimary,
                  transform: `translateZ(${interpolate(p, [0, 1], [20, 0])}px)`,
                }}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
