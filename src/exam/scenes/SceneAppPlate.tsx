import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { crossIn } from "../motion";
import { pfu } from "../theme";

export const APP_PLATES = {
  dash: { folder: "exam/broll/dashboard", frames: 126, skip: 21 },
  gen: { folder: "exam/broll/generador", frames: 131, skip: 24 },
  alu: { folder: "exam/broll/alumnos", frames: 138, skip: 24 },
} as const;

const pad = (n: number) => String(n).padStart(4, "0");

/** Precarga las capturas para que no disparen delayRender al entrar. */
export const preloadAppPlates = () => {
  for (const plate of Object.values(APP_PLATES)) {
    for (let i = plate.skip + 1; i <= plate.frames; i++) {
      const img = new Image();
      img.src = staticFile(`${plate.folder}/${pad(i)}.jpg`);
    }
  }
};

type Props = {
  folder: string;
  frames: number;
  skip: number;
  duration: number;
};

/** Plano de interfaz a sangre, sin <video>, para no cortar la musica. */
export const SceneAppPlate: React.FC<Props> = ({
  folder,
  frames,
  skip,
  duration,
}) => {
  const frame = useCurrentFrame();
  const n = Math.min(frame + skip + 1, frames);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: pfu.paper,
        opacity: crossIn(frame),
      }}
    >
      <Img
        src={staticFile(`${folder}/${pad(n)}.jpg`)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          scale: interpolate(frame, [0, duration], [1, 1.05], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.linear,
          }),
        }}
      />
    </AbsoluteFill>
  );
};
