import {
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

type Props = {
  src: string;
  durationInFrames: number;
};

export const KenBurnsStill: React.FC<Props> = ({ src, durationInFrames }) => {
  const frame = useCurrentFrame();

  return (
    <Img
      src={staticFile(src)}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        scale: interpolate(frame, [0, durationInFrames], [1.08, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        }),
      }}
      from={-2}
    />
  );
};
