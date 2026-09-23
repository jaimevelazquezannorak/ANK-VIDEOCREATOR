import { Easing, interpolate, spring } from "remotion";

/** Misma curva que el vídeo PFU. Todo entra con la misma sensación. */
export const EASE = Easing.bezier(0.16, 1, 0.3, 1);

export const fadeIn = (frame: number, delay = 0, len = 14) =>
  interpolate(frame, [delay, delay + len], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

export const riseY = (frame: number, delay = 0, len = 16, from = 16) =>
  `0px ${interpolate(frame, [delay, delay + len], [from, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  })}px`;

export const pop = (frame: number, fps: number, delay = 0) =>
  spring({
    frame: frame - delay,
    fps,
    config: { damping: 200, mass: 0.6 },
  });

export const ramp = (frame: number, a: number, b: number) =>
  interpolate(frame, [a, b], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

export const crossIn = (frame: number, len = 12) =>
  interpolate(frame, [0, len], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.linear,
  });
