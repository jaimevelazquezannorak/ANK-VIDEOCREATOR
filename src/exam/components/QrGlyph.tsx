import { pfu } from "../theme";

/** Modulos deterministas: mismo seed, mismo dibujo en cada frame. */
const modules = (seed: number, n: number): boolean[] => {
  const out: boolean[] = [];
  let s = seed;
  for (let i = 0; i < n * n; i++) {
    s = (s * 1664525 + 1013904223) % 4294967296;
    out.push(s % 100 > 52);
  }
  return out;
};

const N = 21;

type Props = {
  size: number;
  seed?: number;
  color?: string;
  background?: string;
  /** Cuanto del codigo esta dibujado, 0 a 1. */
  reveal?: number;
};

/**
 * Glifo tipo QR. No es un codigo legible: representa el token opaco en pantalla.
 */
export const QrGlyph: React.FC<Props> = ({
  size,
  seed = 20260907,
  color = pfu.ink,
  background = pfu.white,
  reveal = 1,
}) => {
  const cells = modules(seed, N);
  const unit = 100 / N;
  const shown = Math.round(cells.length * Math.min(Math.max(reveal, 0), 1));

  const inFinder = (r: number, c: number) =>
    (r < 8 && c < 8) || (r < 8 && c > N - 9) || (r > N - 9 && c < 8);

  const finder = (r: number, c: number) => (
    <g key={`f${r}${c}`}>
      <rect
        x={c * unit}
        y={r * unit}
        width={unit * 7}
        height={unit * 7}
        fill={color}
      />
      <rect
        x={(c + 1) * unit}
        y={(r + 1) * unit}
        width={unit * 5}
        height={unit * 5}
        fill={background}
      />
      <rect
        x={(c + 2) * unit}
        y={(r + 2) * unit}
        width={unit * 3}
        height={unit * 3}
        fill={color}
      />
    </g>
  );

  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <rect x={0} y={0} width={100} height={100} fill={background} />
      {cells.map((on, i) => {
        const r = Math.floor(i / N);
        const c = i % N;
        if (!on || inFinder(r, c) || i > shown) return null;
        return (
          <rect
            key={i}
            x={c * unit}
            y={r * unit}
            width={unit}
            height={unit}
            fill={color}
          />
        );
      })}
      {finder(0, 0)}
      {finder(0, N - 7)}
      {finder(N - 7, 0)}
    </svg>
  );
};
