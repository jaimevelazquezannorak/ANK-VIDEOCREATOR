import { Easing, interpolate, spring } from "remotion";

/** Curva unica del video. Todo entra con la misma sensacion. */
export const EASE = Easing.bezier(0.16, 1, 0.3, 1);

/** Opacidad 0 -> 1 a partir de `delay`. */
export const fadeIn = (frame: number, delay = 0, len = 14) =>
  interpolate(frame, [delay, delay + len], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

/** Desplazamiento vertical de entrada, en px, listo para `translate`. */
export const riseY = (frame: number, delay = 0, len = 16, from = 16) =>
  `0px ${interpolate(frame, [delay, delay + len], [from, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  })}px`;

/** Entrada con muelle, para elementos que deben sentirse fisicos. */
export const pop = (frame: number, fps: number, delay = 0) =>
  spring({
    frame: frame - delay,
    fps,
    config: { damping: 200, mass: 0.6 },
  });

/** Progreso 0 -> 1 acotado entre dos frames. */
export const ramp = (frame: number, a: number, b: number) =>
  interpolate(frame, [a, b], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

/**
 * Encadenado: cada escena solo entra. La escena siguiente se solapa encima
 * durante `OVERLAP` frames, asi que nunca hay un fundido a negro intermedio.
 */
export const crossIn = (frame: number, len = 12) =>
  interpolate(frame, [0, len], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.linear,
  });
