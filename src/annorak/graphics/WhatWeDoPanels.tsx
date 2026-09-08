import {
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { springEnter } from "../motion";
import { colors } from "../theme";

const light = {
  surface: "#FFFFFF",
  raised: "#FAFAFA",
  border: "#D8D8D8",
  borderStrong: "#B8B8B8",
  overlay: "#ECECEC",
  inkSoft: "#5C5C5C",
  shadow: "0 22px 48px rgba(0,0,0,0.09)",
  line: "#1A1A1A",
} as const;

type Props = {
  compact?: boolean;
};

/** Escena 3: paneles UI animados, rectángulos que morphan y líneas SVG */
export const WhatWeDoPanels: React.FC<Props> = ({ compact = false }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  const rootW = compact ? width * 0.9 : 480;
  const rootH = compact ? 300 : 360;

  const shell = spring({ fps, frame: frame - 2, config: springEnter });
  const panel2 = spring({ fps, frame: frame - 18, config: springEnter });

  const morphA = interpolate(frame, [55, 95, 140, 180], [0.72, 0.88, 0.76, 0.92], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const morphB = interpolate(frame, [70, 110, 155, 200], [0.45, 0.62, 0.5, 0.68], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const morphRadius = interpolate(frame, [90, 130, 170, 210], [6, 14, 8, 12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const lineDraw = interpolate(frame, [32, 58], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const lineDraw2 = interpolate(frame, [48, 74], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const pathLen = 120;
  const bars = [0.58, 0.92, 0.78, 0.65];
  const chips = [0.7, 0.55, 0.8];

  return (
    <div
      style={{
        position: "relative",
        width: rootW,
        height: rootH,
        opacity: shell,
        transform: `translateY(${(1 - shell) * 36}px) scale(${0.92 + shell * 0.08})`,
      }}
    >
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: rootW,
          height: rootH,
          overflow: "visible",
          pointerEvents: "none",
        }}
        viewBox={`0 0 ${rootW} ${rootH}`}
      >
        <path
          d={`M ${rootW * 0.62} ${rootH * 0.22} L ${rootW * 0.78} ${rootH * 0.12}`}
          fill="none"
          stroke={light.line}
          strokeWidth={1.5}
          strokeDasharray={pathLen}
          strokeDashoffset={pathLen * (1 - lineDraw)}
          opacity={0.35}
        />
        <path
          d={`M ${rootW * 0.38} ${rootH * 0.72} L ${rootW * 0.55} ${rootH * 0.88}`}
          fill="none"
          stroke={light.line}
          strokeWidth={1.5}
          strokeDasharray={pathLen}
          strokeDashoffset={pathLen * (1 - lineDraw2)}
          opacity={0.28}
        />
        <circle
          cx={rootW * 0.78}
          cy={rootH * 0.12}
          r={4}
          fill={colors.ink}
          opacity={lineDraw * panel2}
        />
      </svg>

      <div
        style={{
          position: "absolute",
          right: compact ? 4 : 8,
          top: 0,
          width: compact ? rootW * 0.42 : 168,
          height: compact ? 88 : 96,
          borderRadius: 10,
          border: `1px solid ${light.border}`,
          backgroundColor: light.surface,
          boxShadow: light.shadow,
          opacity: panel2,
          transform: `translateX(${(1 - panel2) * 28}px) translateY(${(1 - panel2) * -12}px)`,
          padding: "10px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div
          style={{
            height: 5,
            width: `${morphB * 100}%`,
            borderRadius: morphRadius / 2,
            backgroundColor: colors.ink,
            opacity: 0.85,
          }}
        />
        {chips.map((w, i) => {
          const p = spring({
            fps,
            frame: frame - 26 - i * 5,
            config: springEnter,
          });
          return (
            <div
              key={i}
              style={{
                height: 6,
                width: `${w * morphA * 100}%`,
                borderRadius: 3,
                backgroundColor: light.overlay,
                opacity: p,
                transform: `scaleX(${p})`,
                transformOrigin: "left center",
              }}
            />
          );
        })}
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: compact ? rootW * 0.94 : rootW - 24,
          height: compact ? rootH * 0.72 : rootH - 48,
          borderRadius: 14,
          border: `1px solid ${light.border}`,
          backgroundColor: light.surface,
          boxShadow: light.shadow,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            height: 36,
            borderBottom: `1px solid ${light.border}`,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "0 14px",
            backgroundColor: light.raised,
          }}
        >
          {[0, 1, 2].map((i) => {
            const d = spring({
              fps,
              frame: frame - 8 - i * 3,
              config: springEnter,
            });
            return (
              <div
                key={i}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 2,
                  backgroundColor: i === 0 ? colors.ink : light.borderStrong,
                  opacity: d,
                  transform: `scale(${d}) rotate(${i === 1 ? 45 : 0}deg)`,
                }}
              />
            );
          })}
          <div
            style={{
              marginLeft: "auto",
              width: `${morphA * 28}%`,
              maxWidth: 120,
              height: 6,
              borderRadius: 3,
              backgroundColor: light.overlay,
            }}
          />
        </div>
        <div style={{ flex: 1, display: "flex" }}>
          <div
            style={{
              width: compact ? 56 : 72,
              borderRight: `1px solid ${light.border}`,
              padding: "12px 8px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {[0.85, 0.6, 0.75, 0.5].map((w, i) => {
              const p = spring({
                fps,
                frame: frame - 20 - i * 4,
                config: springEnter,
              });
              const active = i === 0;
              return (
                <div
                  key={i}
                  style={{
                    height: active ? 10 : 6,
                    width: `${w * 100}%`,
                    borderRadius: active ? morphRadius : 3,
                    backgroundColor: active ? colors.ink : light.overlay,
                    opacity: p,
                    transform: `translateX(${(1 - p) * -16}px)`,
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
              gap: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 8,
                marginBottom: 4,
              }}
            >
              {[0.35, 0.28, 0.22].map((w, i) => {
                const p = spring({
                  fps,
                  frame: frame - 34 - i * 4,
                  config: springEnter,
                });
                return (
                  <div
                    key={i}
                    style={{
                      flex: w,
                      height: 28,
                      borderRadius: morphRadius,
                      border: `1px solid ${light.border}`,
                      backgroundColor: light.raised,
                      opacity: p,
                      transform: `scale(${0.88 + p * 0.12})`,
                    }}
                  />
                );
              })}
            </div>
            {bars.map((w, i) => {
              const p = spring({
                fps,
                frame: frame - 42 - i * 5,
                config: springEnter,
              });
              return (
                <div
                  key={i}
                  style={{
                    height: i === 0 ? 10 : 7,
                    width: `${w * morphB * 100}%`,
                    borderRadius: i === 0 ? morphRadius / 2 : 3,
                    backgroundColor: i === 0 ? light.inkSoft : light.overlay,
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

      <div
        style={{
          position: "absolute",
          left: compact ? rootW * 0.08 : 24,
          top: compact ? rootH * 0.38 : rootH * 0.42,
          width: interpolate(frame, [100, 150], [48, 72], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          height: interpolate(frame, [100, 150], [32, 44], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          border: `1.5px solid ${colors.ink}`,
          borderRadius: interpolate(frame, [120, 160], [4, 10], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          backgroundColor: light.raised,
          opacity: spring({ fps, frame: frame - 88, config: springEnter }),
          transform: `rotate(${interpolate(frame, [100, 200], [-2, 3], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}deg)`,
        }}
      />
    </div>
  );
};
