import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { springEnter } from "../motion";
import { colors } from "../theme";

type BlockSpec = {
  w: number;
  h: number;
  x: number;
  y: number;
  delay: number;
  fill?: string;
};

type Props = {
  blocks: BlockSpec[];
};

export const SlideBlocks: React.FC<Props> = ({ blocks }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <>
      {blocks.map((b, i) => {
        const p = spring({
          fps,
          frame: frame - b.delay,
          config: springEnter,
        });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: b.x,
              top: b.y,
              width: b.w,
              height: b.h,
              backgroundColor: b.fill ?? colors.raised,
              border: `1px solid ${colors.border}`,
              opacity: p,
              transform: `translateX(${(1 - p) * -48}px) scale(${0.92 + p * 0.08})`,
            }}
          />
        );
      })}
    </>
  );
};
