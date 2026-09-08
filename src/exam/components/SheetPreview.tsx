import { pfu, state } from "../theme";

const COLS = 2;
const ROWS = 18;
const OPTS = 4;

const colX = [16, 112];
const rowY0 = 54;
const rowStep = 9;
const bubbleR = 2.6;
const optStep = 8.5;

type Props = {
  width: number;
  /** Cuantas filas se han maquetado ya, 0 a 1. */
  reveal?: number;
  /** Dibuja las cajas de ROI sobre las casillas. */
  roi?: number;
  /** Casillas rellenas: "col-row-opt". */
  marks?: string[];
  /** Marca de recorrido del escaner, 0 a 1. */
  scan?: number;
  children?: React.ReactNode;
};

const fiducial = (x: number, y: number, flipX: boolean, flipY: boolean) => {
  const l = 7;
  const t = 1.4;
  return (
    <g key={`${x}-${y}`} fill={pfu.ink}>
      <rect x={flipX ? x - l : x} y={flipY ? y - t : y} width={l} height={t} />
      <rect x={flipX ? x - t : x} y={flipY ? y - l : y} width={t} height={l} />
    </g>
  );
};

/**
 * Hoja de examen generada: fiduciales, QR, cabecera y rejilla de burbujas.
 * Todo en milimetros A4 para que la geometria del video sea la del producto.
 */
export const SheetPreview: React.FC<Props> = ({
  width,
  reveal = 1,
  roi = 0,
  marks = [],
  scan,
  children,
}) => {
  const height = (width * 297) / 210;
  const marked = new Set(marks);
  const rowsShown = ROWS * Math.min(Math.max(reveal, 0), 1);

  return (
    <svg width={width} height={height} viewBox="0 0 210 297">
      <rect x={0} y={0} width={210} height={297} fill={pfu.white} />

      {fiducial(10, 10, false, false)}
      {fiducial(200, 10, true, false)}
      {fiducial(10, 287, false, true)}
      {fiducial(200, 287, true, true)}

      <rect x={16} y={20} width={72} height={3.4} rx={1} fill={pfu.g200} />
      <rect x={16} y={27} width={46} height={2.6} rx={1} fill={pfu.g200} />
      <rect x={16} y={33} width={58} height={2.6} rx={1} fill={pfu.g200} />
      <rect
        x={16}
        y={43}
        width={178}
        height={0.5}
        fill={pfu.g200}
      />

      <g transform="translate(166 18)">
        <rect x={-1} y={-1} width={26} height={26} fill={pfu.white} />
        <g transform="scale(0.24)">
          <rect x={0} y={0} width={100} height={100} fill={pfu.white} />
          <QrBlocks />
        </g>
      </g>

      {Array.from({ length: ROWS * COLS }).map((_, i) => {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        if (row >= rowsShown) return null;
        const x = colX[col];
        const y = rowY0 + row * rowStep;
        const q = row * COLS + col + 1;
        return (
          <g key={i}>
            <text
              x={x}
              y={y + 1.2}
              fontSize={3.4}
              fill={pfu.g500}
              fontFamily="monospace"
            >
              {(q < 10 ? "0" : "") + q}
            </text>
            {Array.from({ length: OPTS }).map((__, o) => {
              const cx = x + 12 + o * optStep;
              const isMarked = marked.has(`${col}-${row}-${o}`);
              return (
                <g key={o}>
                  <circle
                    cx={cx}
                    cy={y}
                    r={bubbleR}
                    fill={isMarked ? pfu.g700 : pfu.white}
                    stroke={pfu.g500}
                    strokeWidth={0.35}
                  />
                  {roi > 0 ? (
                    <rect
                      x={cx - bubbleR - 0.9}
                      y={y - bubbleR - 0.9}
                      width={(bubbleR + 0.9) * 2}
                      height={(bubbleR + 0.9) * 2}
                      fill="none"
                      stroke={pfu.blue}
                      strokeWidth={0.28}
                      opacity={roi}
                    />
                  ) : null}
                </g>
              );
            })}
          </g>
        );
      })}

      <rect
        x={16}
        y={272}
        width={92}
        height={0.5}
        fill={pfu.g200}
      />

      {typeof scan === "number" ? (
        <>
          <rect
            x={0}
            y={scan * 297 - 1.2}
            width={210}
            height={2.4}
            fill={pfu.blue}
            opacity={0.85}
          />
          <rect
            x={0}
            y={0}
            width={210}
            height={Math.max(scan * 297 - 1.2, 0)}
            fill={state.info}
            opacity={0.07}
          />
        </>
      ) : null}

      {children}
    </svg>
  );
};

/** Modulos fijos del QR impreso en la hoja. */
const QrBlocks: React.FC = () => {
  const N = 21;
  const unit = 100 / N;
  const cells: React.ReactNode[] = [];
  let s = 7391;
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      s = (s * 1103515245 + 12345) % 2147483648;
      const finderZone =
        (r < 8 && c < 8) || (r < 8 && c > N - 9) || (r > N - 9 && c < 8);
      if (finderZone || s % 100 < 48) continue;
      cells.push(
        <rect
          key={`${r}-${c}`}
          x={c * unit}
          y={r * unit}
          width={unit}
          height={unit}
          fill={pfu.ink}
        />,
      );
    }
  }
  const finder = (r: number, c: number) => (
    <g key={`f${r}-${c}`}>
      <rect x={c * unit} y={r * unit} width={unit * 7} height={unit * 7} fill={pfu.ink} />
      <rect
        x={(c + 1) * unit}
        y={(r + 1) * unit}
        width={unit * 5}
        height={unit * 5}
        fill={pfu.white}
      />
      <rect
        x={(c + 2) * unit}
        y={(r + 2) * unit}
        width={unit * 3}
        height={unit * 3}
        fill={pfu.ink}
      />
    </g>
  );
  return (
    <>
      {cells}
      {finder(0, 0)}
      {finder(0, N - 7)}
      {finder(N - 7, 0)}
    </>
  );
};
