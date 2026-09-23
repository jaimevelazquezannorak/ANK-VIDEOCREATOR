import "./index.css";
import {
  AnnorakCorporateComposition,
  AnnorakCorporateFeedComposition,
} from "./Composition";
import { ExamIntroCompositions } from "./exam/ExamCompositions";
import { RelensCompositions } from "./relens/RelensCompositions";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <RelensCompositions />
      <ExamIntroCompositions />
      <AnnorakCorporateComposition />
      <AnnorakCorporateFeedComposition />
    </>
  );
};
