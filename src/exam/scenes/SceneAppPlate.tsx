import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { BrandLockup } from "../BrandMark";
import { crossIn, fadeIn, ramp } from "../motion";
import { layout, pfu } from "../theme";

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
  crumb: string;
};

/**
 * Plano de interfaz. La captura va enmarcada en una ventana sobre fondo
 * oscuro, no a sangre: una UI blanca a pantalla completa dispara la luma a
 * ~248 y se percibe quemada, ademas de perder el contexto de producto.
 * Sin <video>, con secuencia de JPG, para no cortar la musica.
 */
export const SceneAppPlate: React.FC<Props> = ({
  folder,
  frames,
  skip,
  duration,
  crumb,
}) => {
  const frame = useCurrentFrame();
  const n = Math.min(frame + skip + 1, frames);
  const rise = ramp(frame, 0, 26);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: pfu.plateGround,
        opacity: crossIn(frame),
        padding: `${layout.padY}px ${layout.padX}px`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ opacity: fadeIn(frame, 4, 14), marginBottom: 34 }}>
        <BrandLockup crumb={crumb} tone="ink" />
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 14,
            overflow: "hidden",
            border: `1px solid rgba(255,255,255,0.12)`,
            boxShadow: "0 40px 90px rgba(0,0,0,0.55)",
            opacity: interpolate(rise, [0, 0.4], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: `0px ${interpolate(rise, [0, 1], [26, 0])}px`,
          }}
        >
          <Img
            src={staticFile(`${folder}/${pad(n)}.jpg`)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              scale: interpolate(frame, [0, duration], [1.01, 1.05], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.linear,
              }),
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
