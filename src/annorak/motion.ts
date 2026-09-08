import { spring, SpringConfig } from "remotion";

export const springEnter: Partial<SpringConfig> = {
  damping: 200,
  stiffness: 120,
  mass: 0.8,
};

export const enterSpring = (frame: number, fps: number, delay = 0) =>
  spring({
    fps,
    frame: frame - delay,
    config: springEnter,
  });

export const exitOpacity = (
  frame: number,
  start: number,
  duration: number,
): number => {
  if (frame < start) {
    return 1;
  }
  const t = Math.min(1, (frame - start) / duration);
  return 1 - t;
};
