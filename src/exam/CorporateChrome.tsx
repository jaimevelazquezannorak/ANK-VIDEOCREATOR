import { BrandMark } from "./BrandMark";
import { layout, pfu } from "./theme";

export const PfuHeader: React.FC = () => {
  return (
    <div
      style={{
        height: layout.headerH,
        backgroundColor: pfu.header,
        display: "flex",
        alignItems: "center",
        paddingLeft: layout.padX,
        paddingRight: layout.padX,
      }}
    >
      <BrandMark width={layout.logoW} />
    </div>
  );
};
