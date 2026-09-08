import { Easing, interpolate, useCurrentFrame } from "remotion";
import { pfuMono, pfuSans } from "./fonts";
import { pfu, type } from "./theme";

type Props = {
  n: string;
  title: string;
  desc: string;
  delay: number;
};

export const StepCard: React.FC<Props> = ({ n, title, desc, delay }) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: pfu.white,
        border: `1px solid ${pfu.g200}`,
        borderRadius: 10,
        padding: "28px 28px 32px",
        boxShadow: "0 1px 2px rgba(26,26,26,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        opacity: interpolate(frame, [delay, delay + 14], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        translate: interpolate(
          frame,
          [delay, delay + 14],
          ["0px 16px", "0px 0px"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          },
        ),
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 6,
          backgroundColor: pfu.blue50,
          color: pfu.blue800,
          fontFamily: pfuMono,
          fontSize: 14,
          fontWeight: 500,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {n}
      </div>
      <div
        style={{
          fontFamily: pfuSans,
          ...type.title,
          fontSize: 36,
          color: pfu.ink,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: pfuSans,
          ...type.caption,
          color: pfu.g500,
        }}
      >
        {desc}
      </div>
    </div>
  );
};
