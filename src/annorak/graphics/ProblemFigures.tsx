import { Easing, interpolate, spring, useVideoConfig } from "remotion";
import { springEnter } from "../motion";
import { colors } from "../theme";

type Props = {
  phase: 0 | 1 | 2;
  width: number;
  height: number;
  localFrame: number;
};

const snapSpring = { damping: 22, stiffness: 140, mass: 0.7 };

const svgStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
};

/** Escena 2: geometría bold distinta por frase (localFrame) */
export const ProblemFigures: React.FC<Props> = ({
  phase,
  width,
  height,
  localFrame: frame,
}) => {
  const { fps } = useVideoConfig();
  const cx = width / 2;
  const cy = height * (height / width > 1 ? 0.34 : 0.38);

  if (phase === 0) {
    return <MisalignedModules cx={cx} cy={cy} frame={frame} fps={fps} />;
  }

  if (phase === 1) {
    return <ComplianceGrid cx={cx} cy={cy} frame={frame} fps={fps} />;
  }

  return <RegulatedDiamond cx={cx} cy={cy} frame={frame} fps={fps} />;
};

type FigureProps = {
  cx: number;
  cy: number;
  frame: number;
  fps: number;
};

const MisalignedModules: React.FC<FigureProps> = ({ cx, cy, frame, fps }) => {
  const drift = interpolate(frame, [24, 72], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const modules = [
    { w: 220, h: 100, ox: -300, oy: -70, rot: -11, delay: 0 },
    { w: 180, h: 88, ox: -20, oy: 36, rot: 7, delay: 6 },
    { w: 200, h: 96, ox: 260, oy: -48, rot: 9, delay: 12 },
    { w: 140, h: 72, ox: 120, oy: 110, rot: -5, delay: 18 },
    { w: 160, h: 80, ox: -180, oy: 95, rot: 4, delay: 14 },
  ];

  const guideY = cy - 40;
  const guideProgress = spring({ fps, frame: frame - 4, config: springEnter });

  return (
    <svg viewBox={`0 0 ${1920} ${1080}`} preserveAspectRatio="xMidYMid slice" style={svgStyle}>
      <line
        x1={cx - 420}
        y1={guideY}
        x2={cx + 420}
        y2={guideY + drift * 28}
        stroke={colors.borderStrong}
        strokeWidth={1}
        strokeDasharray="8 10"
        opacity={0.35 * guideProgress}
      />
      {modules.map((m, i) => {
        const p = spring({ fps, frame: frame - m.delay, config: snapSpring });
        const extraX = (i % 2 === 0 ? 1 : -1) * drift * 22;
        const extraY = (i % 3) * drift * 14;
        const x = cx + m.ox + extraX;
        const y = cy + m.oy + extraY;
        const rot = m.rot + drift * (i % 2 === 0 ? 4 : -3);
        return (
          <g
            key={m.ox}
            transform={`translate(${x} ${y}) rotate(${rot}) scale(${0.82 + p * 0.18})`}
            opacity={p}
          >
            <rect
              x={-m.w / 2}
              y={-m.h / 2}
              width={m.w}
              height={m.h}
              fill={colors.surface}
              stroke={colors.borderStrong}
              strokeWidth={1.5}
            />
            <rect x={-m.w / 2 + 12} y={-m.h / 2 + 12} width={m.w * 0.35} height={4} fill={colors.overlay} />
            <rect
              x={-m.w / 2 + 12}
              y={-m.h / 2 + 24}
              width={m.w * 0.55}
              height={3}
              fill={colors.border}
              opacity={0.7}
            />
          </g>
        );
      })}
      {[0, 1, 2].map((i) => {
        const link = spring({ fps, frame: frame - 20 - i * 8, config: springEnter });
        const from = modules[i];
        const to = modules[i + 1];
        const x1 = cx + from.ox + (i % 2 === 0 ? 1 : -1) * drift * 22;
        const y1 = cy + from.oy + (i % 3) * drift * 14;
        const x2 = cx + to.ox + ((i + 1) % 2 === 0 ? 1 : -1) * drift * 22;
        const y2 = cy + to.oy + ((i + 1) % 3) * drift * 14;
        const gap = interpolate(drift, [0, 1], [0, 36 + i * 12]);
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2 - gap;
        return (
          <path
            key={`link-${i}`}
            d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`}
            fill="none"
            stroke={colors.textMuted}
            strokeWidth={1}
            opacity={link * 0.55}
            strokeDasharray="4 8"
          />
        );
      })}
    </svg>
  );
};

const ComplianceGrid: React.FC<FigureProps> = ({ cx, cy, frame, fps }) => {
  const cols = 7;
  const rows = 5;
  const cell = 52;
  const gap = 6;
  const gridW = cols * cell + (cols - 1) * gap;
  const gridH = rows * cell + (rows - 1) * gap;
  const startX = cx - gridW / 2;
  const startY = cy - gridH / 2;

  const frameIn = spring({ fps, frame, config: springEnter });
  const scanY = interpolate(frame, [16, 100], [startY - 20, startY + gridH + 20], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });

  const stressCols = [1, 3, 5];
  const missing = new Set([9, 16, 23, 30]);

  return (
    <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" style={svgStyle}>
      <rect
        x={startX - 24}
        y={startY - 36}
        width={gridW + 48}
        height={gridH + 56}
        fill="none"
        stroke={colors.border}
        strokeWidth={1}
        opacity={frameIn * 0.5}
      />
      {stressCols.map((col, i) => {
        const bar = spring({ fps, frame: frame - 8 - i * 5, config: snapSpring });
        const bx = startX + col * (cell + gap);
        return (
          <rect
            key={`bar-${col}`}
            x={bx + (cell * (1 - bar)) / 2}
            y={startY - 28}
            width={cell * bar}
            height={5}
            fill={colors.textPrimary}
            opacity={bar}
          />
        );
      })}
      {Array.from({ length: cols * rows }).map((_, i) => {
        if (missing.has(i)) {
          return null;
        }
        const col = i % cols;
        const row = Math.floor(i / cols);
        const stagger = col * 2 + row * 3;
        const p = spring({ fps, frame: frame - stagger, config: springEnter });
        const x = startX + col * (cell + gap);
        const y = startY + row * (cell + gap);
        const isStress = stressCols.includes(col);
        const flicker = isStress
          ? interpolate((frame + col * 11) % 48, [0, 24, 48], [0.45, 1, 0.45])
          : 0.22;
        const offset =
          isStress && row > 1
            ? interpolate(frame, [40, 78], [0, (row - 1) * 5], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })
            : 0;

        return (
          <g key={`cell-${i}`} opacity={p}>
            <rect
              x={x}
              y={y + offset}
              width={cell}
              height={cell}
              fill={isStress ? colors.overlay : colors.raised}
              stroke={colors.borderStrong}
              strokeWidth={1}
            />
            {isStress && row === 2 ? (
              <g opacity={flicker}>
                <line
                  x1={x + 14}
                  y1={y + 14 + offset}
                  x2={x + cell - 14}
                  y2={y + cell - 14 + offset}
                  stroke={colors.textPrimary}
                  strokeWidth={2}
                />
                <line
                  x1={x + cell - 14}
                  y1={y + 14 + offset}
                  x2={x + 14}
                  y2={y + cell - 14 + offset}
                  stroke={colors.textPrimary}
                  strokeWidth={2}
                />
              </g>
            ) : null}
          </g>
        );
      })}
      <rect
        x={startX - 12}
        y={scanY}
        width={gridW + 24}
        height={3}
        fill={colors.textPrimary}
        opacity={interpolate(frame, [16, 100], [0.08, 0.35], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })}
      />
    </svg>
  );
};

const RegulatedDiamond: React.FC<FigureProps> = ({ cx, cy, frame, fps }) => {
  const enter = spring({ fps, frame: frame - 6, config: snapSpring });
  const size = interpolate(enter, [0, 1], [80, 280]);
  const inner = spring({ fps, frame: frame - 22, config: { damping: 28, stiffness: 200 } });
  const pulse = interpolate(frame % 60, [0, 30, 60], [1, 1.04, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const strokeDraw = interpolate(frame, [0, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const perimeter = size * 4 * Math.SQRT2;
  const bracket = spring({ fps, frame: frame - 32, config: springEnter });
  const b = 320;
  const slashHalf = (size * 0.35 * inner) / 2;

  return (
    <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" style={svgStyle}>
      {[
        { sx: -1, sy: -1 },
        { sx: 1, sy: -1 },
        { sx: -1, sy: 1 },
        { sx: 1, sy: 1 },
      ].map(({ sx, sy }, i) => {
        const len = spring({ fps, frame: frame - 28 - i * 4, config: springEnter });
        return (
          <g key={`br-${sx}-${sy}`} opacity={bracket}>
            <line
              x1={cx + sx * b}
              y1={cy + sy * (b - 40)}
              x2={cx + sx * (b - len * 48)}
              y2={cy + sy * (b - 40)}
              stroke={colors.borderStrong}
              strokeWidth={2}
            />
            <line
              x1={cx + sx * b}
              y1={cy + sy * (b - 40)}
              x2={cx + sx * b}
              y2={cy + sy * (b - 40 - len * 48)}
              stroke={colors.borderStrong}
              strokeWidth={2}
            />
          </g>
        );
      })}
      <g transform={`translate(${cx} ${cy}) rotate(45) scale(${pulse})`} opacity={enter}>
        <rect
          x={-size / 2}
          y={-size / 2}
          width={size}
          height={size}
          fill={colors.raised}
          stroke={colors.textPrimary}
          strokeWidth={2}
          strokeDasharray={perimeter}
          strokeDashoffset={perimeter * (1 - strokeDraw)}
        />
        <rect
          x={(-size * 0.42 * inner) / 2}
          y={(-size * 0.42 * inner) / 2}
          width={size * 0.42 * inner}
          height={size * 0.42 * inner}
          fill={colors.textPrimary}
          opacity={0.92 * inner}
        />
      </g>
      <line
        x1={cx - slashHalf}
        y1={cy}
        x2={cx + slashHalf}
        y2={cy}
        stroke={colors.textPrimary}
        strokeWidth={2}
        opacity={inner * 0.85}
      />
    </svg>
  );
};
