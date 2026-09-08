import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { springEnter } from "../motion";
import { colors } from "../theme";

type Props = {
  compact?: boolean;
};

/** Wireframe de producto (como mocks de la guía de marca) */
export const ProductWireframe: React.FC<Props> = ({ compact = false }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const panelW = compact ? width * 0.88 : 420;
  const panelH = compact ? 280 : 320;
  const shell = spring({ fps, frame: frame - 4, config: springEnter });

  const bars = [0.55, 0.92, 0.84, 0.7];
  const sideItems = [0.8, 0.6, 0.7, 0.5];

  return (
    <div
      style={{
        width: panelW,
        height: panelH,
        borderRadius: 12,
        border: `1px solid ${colors.border}`,
        backgroundColor: colors.surface,
        boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
        overflow: "hidden",
        opacity: shell,
        transform: `translateY(${(1 - shell) * 40}px) scale(${0.94 + shell * 0.06})`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: 34,
          borderBottom: `1px solid ${colors.border}`,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 14px",
        }}
      >
        {[0, 1, 2].map((i) => {
          const d = spring({ fps, frame: frame - 10 - i * 4, config: springEnter });
          return (
            <div
              key={i}
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                backgroundColor: colors.borderStrong,
                opacity: d,
                transform: `scale(${d})`,
              }}
            />
          );
        })}
      </div>
      <div style={{ flex: 1, display: "flex" }}>
        <div
          style={{
            width: compact ? 64 : 78,
            borderRight: `1px solid ${colors.border}`,
            padding: "12px 10px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {sideItems.map((w, i) => {
            const p = spring({
              fps,
              frame: frame - 18 - i * 5,
              config: springEnter,
            });
            return (
              <div
                key={i}
                style={{
                  height: 6,
                  width: `${w * 100}%`,
                  borderRadius: 3,
                  backgroundColor: i === 0 ? "#3a3a3a" : colors.overlay,
                  opacity: p,
                  transform: `translateX(${(1 - p) * -20}px)`,
                }}
              />
            );
          })}
        </div>
        <div
          style={{
            flex: 1,
            padding: 14,
            display: "flex",
            flexDirection: "column",
            gap: 9,
          }}
        >
          {bars.map((w, i) => {
            const p = spring({
              fps,
              frame: frame - 28 - i * 6,
              config: springEnter,
            });
            return (
              <div
                key={i}
                style={{
                  height: i === 0 ? 9 : 7,
                  width: `${w * 100}%`,
                  borderRadius: 3,
                  backgroundColor: i === 0 ? "#e6e6e6" : colors.overlay,
                  opacity: p,
                  transform: `scaleX(${p})`,
                  transformOrigin: "left center",
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
