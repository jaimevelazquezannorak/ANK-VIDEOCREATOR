import { useVideoConfig } from "remotion";

export type LayoutTokens = {
  isFeed: boolean;
  padX: number;
  padY: number;
  displayLine: number;
  headline: number;
  title: number;
  body: number;
  small: number;
  label: number;
  maxTextWidth: number;
};

export const useLayout = (): LayoutTokens => {
  const { width, height } = useVideoConfig();
  const isFeed = height / width > 1;
  const w = width / 1920;

  if (isFeed) {
    return {
      isFeed: true,
      padX: Math.round(width * 0.08),
      padY: Math.round(height * 0.07),
      displayLine: Math.round(46 * w * 1.35),
      headline: Math.round(42 * w * 1.35),
      title: Math.round(34 * w * 1.3),
      body: Math.round(26 * w * 1.25),
      small: Math.round(22 * w * 1.2),
      label: Math.round(18 * w * 1.15),
      maxTextWidth: width - Math.round(width * 0.16),
    };
  }

  return {
    isFeed: false,
    padX: Math.round(120 * w),
    padY: Math.round(80 * w),
    displayLine: Math.round(64 * w),
    headline: Math.round(56 * w),
    title: Math.round(44 * w),
    body: Math.round(28 * w),
    small: Math.round(24 * w),
    label: Math.round(20 * w),
    maxTextWidth: Math.min(1400 * w, width - 240 * w),
  };
};
