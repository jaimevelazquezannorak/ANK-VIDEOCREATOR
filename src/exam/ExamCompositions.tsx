import { Composition } from "remotion";
import { z } from "zod";
import { ExamIntro } from "./ExamIntro";
import { ExamSalesVideo } from "./ExamSalesVideo";
import { EXAM_FPS, INTRO_FRAMES, SALES_FRAMES } from "./theme";

export const ExamIntroSchema = z.object({
  lang: z.enum(["es", "en"]),
});

export const ExamIntroCompositions = () => {
  return (
    <>
      <Composition
        id="ExamSalesES"
        component={ExamSalesVideo}
        durationInFrames={SALES_FRAMES}
        fps={EXAM_FPS}
        width={1920}
        height={1080}
        schema={ExamIntroSchema}
        defaultProps={{ lang: "es" as const }}
      />
      <Composition
        id="ExamSalesEN"
        component={ExamSalesVideo}
        durationInFrames={SALES_FRAMES}
        fps={EXAM_FPS}
        width={1920}
        height={1080}
        schema={ExamIntroSchema}
        defaultProps={{ lang: "en" as const }}
      />
      <Composition
        id="ExamIntroES"
        component={ExamIntro}
        durationInFrames={INTRO_FRAMES}
        fps={EXAM_FPS}
        width={1920}
        height={1080}
        schema={ExamIntroSchema}
        defaultProps={{ lang: "es" as const }}
      />
      <Composition
        id="ExamIntroEN"
        component={ExamIntro}
        durationInFrames={INTRO_FRAMES}
        fps={EXAM_FPS}
        width={1920}
        height={1080}
        schema={ExamIntroSchema}
        defaultProps={{ lang: "en" as const }}
      />
    </>
  );
};
