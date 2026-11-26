import type { CourseModule, FlatLesson, LessonFinishText } from "./index";
import { moduleLabel } from "./index";

/* The standard wording for the screen at the end of a lesson. It depends on
   where the lesson sits: the end of the programme, the end of a module, or
   an ordinary lesson. A lesson's own wording (lesson.finish), set in the
   course editor, replaces any of these. */

export interface FinishWording {
  heading: string;
  message: string;
  /** What members see before they have finished the lesson. */
  firstButton: string;
  /** What members see coming back to a lesson they have finished, and in the preview. */
  returnButton: string;
}

export function standardFinish({
  module,
  next,
  completed,
}: {
  module: CourseModule;
  next?: FlatLesson;
  completed?: boolean;
}): FinishWording {
  const isLast = !next;
  const crossesModule = Boolean(next && next.module.id !== module.id);
  if (isLast) {
    return {
      heading: "You Have Completed the Programme",
      message: "Take a moment together to notice how far you have come. Your certificate is ready.",
      firstButton: "Complete and Finish",
      returnButton: "View Your Certificate",
    };
  }
  if (crossesModule) {
    return {
      heading: `${moduleLabel(module)} Complete`,
      message: "Take a breath before moving on. Everything you wrote is saved, and you can come back to it whenever you like.",
      firstButton: `Complete and Start ${moduleLabel(next!.module)}`,
      returnButton: `Start ${moduleLabel(next!.module)}`,
    };
  }
  return {
    heading: completed ? "Lesson Complete" : "Well Done",
    message: "Everything you wrote is saved. Carry on when you are ready, or come back another day. There is no pace to keep.",
    firstButton: "Complete and Continue",
    returnButton: "Continue to the Next Lesson",
  };
}

/** The wording a member actually sees: the lesson's own, or the standard. */
export function finishWording(
  where: { module: CourseModule; next?: FlatLesson; completed?: boolean },
  custom?: LessonFinishText
): FinishWording {
  const std = standardFinish(where);
  return {
    heading: custom?.heading || std.heading,
    message: custom?.message || std.message,
    firstButton: custom?.buttonLabel || std.firstButton,
    returnButton: custom?.buttonLabel || std.returnButton,
  };
}
