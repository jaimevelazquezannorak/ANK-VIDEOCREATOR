import "./index.css";
import {
  AnnorakCorporateComposition,
  AnnorakCorporateFeedComposition,
} from "./Composition";
import { ExamIntroCompositions } from "./exam/ExamCompositions";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <ExamIntroCompositions />
      <AnnorakCorporateComposition />
      <AnnorakCorporateFeedComposition />
    </>
  );
};
