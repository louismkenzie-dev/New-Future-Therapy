import type { CourseModule } from "../types";

export const module10: CourseModule = {
  id: "a-new-future",
  number: 10,
  title: "A New Future: Continuing to Grow",
  lede: "Looking back at how far you have come, gathering what you want to keep, and carrying the practice forward into the rest of your life.",
  essence: "The course ends; the growing does not.",
  lessons: [
    {
      id: "looking-back-at-the-path",
      title: "Looking Back at the Path",
      summary:
        "Retaking your very first reflection — and seeing, side by side, the distance you have travelled.",
      estimatedMinutes: 20,
      blocks: [
        {
          kind: "video",
          title: "Then and now",
          playbackId: "",
          durationSeconds: 420,
        },
        {
          kind: "prose",
          body: `At the very beginning of this course, you took a quiet snapshot of where you stood — how understood you felt, how able to ask, how safe disagreement seemed. You have since travelled through your patterns and your stories, communication and conflict, trust, intimacy, change and agreements.

Now take the same snapshot again, answering only for today. Then place the two side by side. Growth in this territory is rarely dramatic — it is a slider that sits somewhere kinder than it did, a conversation that went differently, a repair that arrived sooner. Those small distances are the real thing.

And if some answers have not moved, that is information too, not failure. It tells you where your continuing work lives — and you now have far more tools for it than you did at the start.`,
        },
        {
          kind: "checkin",
          exerciseId: "final-checkin",
          title: "Where We Are Now — Revisited",
          intro:
            "The same questions you answered in Module 1. Answer for today; your first answers will be shown alongside.",
          cadence: "once",
          fields: [
            {
              id: "understood",
              label: "How understood do you feel in your closest relationships?",
              type: "scale",
            },
            {
              id: "expressing",
              label: "How able do you feel to say what you need?",
              type: "scale",
            },
            {
              id: "conflict",
              label: "How safe does disagreement feel?",
              type: "scale",
            },
            {
              id: "closeness",
              label: "How connected do you feel to the people who matter most?",
              type: "scale",
            },
            {
              id: "self",
              label: "How kind are you to yourself when things go wrong?",
              type: "scale",
            },
            {
              id: "changed",
              label: "Looking back at your hopes from Module 1 — what has actually changed?",
              type: "text",
            },
          ],
        },
        {
          kind: "journal",
          exerciseId: "path-review",
          title: "The Distance Travelled",
          prompts: [
            "Which lesson or exercise changed the most for you, and how?",
            "What did you learn about yourself that you did not expect?",
            "What remains unfinished — and how do you want to keep working on it?",
          ],
        },
      ],
    },
    {
      id: "keeping-the-practice-alive",
      title: "Keeping the Practice Alive",
      summary:
        "Insight fades unless it becomes practice. A small monthly ritual keeps what you have built in working order.",
      estimatedMinutes: 15,
      blocks: [
        {
          kind: "video",
          title: "From course to practice",
          playbackId: "",
          durationSeconds: 390,
        },
        {
          kind: "prose",
          body: `Courses end. That is their nature. The question is what survives the ending — and the honest answer is: whatever you turn into practice. Insight that is not practised has a half-life of weeks; a small ritual, kept, lasts as long as you keep it.

You already have the pieces. The weekly check-in from Module 9. Your repair ritual from Module 5. Your connection menu from Module 7. Your agreements from Module 9. Keep them where you can see them — several have printable versions for exactly this reason.

To these, add one more: the monthly review below. Ten minutes, once a month. It asks only what is growing, what is straining, and what needs a conversation. Relationships rarely fail from the things people watch; they fail from the things no one was watching. This is how you keep watch, gently.`,
        },
        {
          kind: "checkin",
          exerciseId: "monthly-review",
          title: "The Monthly Review",
          intro: "Ten minutes, once a month. Gentle maintenance for everything you have built.",
          cadence: "monthly",
          fields: [
            {
              id: "growing",
              label: "What is growing well in your closest relationships right now?",
              type: "scale",
            },
            {
              id: "watch",
              label: "What is quietly straining and deserves attention?",
              type: "text",
            },
            {
              id: "practice",
              label: "Which practice from the course have you kept up — and which would you like to restart?",
              type: "text",
            },
            {
              id: "conversation",
              label: "What conversation does next month need?",
              type: "text",
            },
          ],
        },
      ],
    },
    {
      id: "when-to-reach-for-more",
      title: "When to Reach for More Support",
      summary:
        "A course can do a great deal — and some work deserves a therapist alongside you. How to know, and how to begin.",
      estimatedMinutes: 15,
      blocks: [
        {
          kind: "video",
          title: "What therapy adds",
          playbackId: "",
          durationSeconds: 420,
        },
        {
          kind: "prose",
          body: `A course like this can open doors: naming patterns, starting conversations, building practices. But some work goes better — sometimes only goes at all — with a therapist alongside you. A course cannot respond to what you said; a therapist can, and that responsiveness is where the deepest work happens.

Consider reaching for more support if something here stirred more than it settled; if the same conflict keeps returning regardless of tools; if betrayal, trauma or loss sits underneath everything and will not be journalled away; or if you and a partner keep having the conversation and keep arriving at the same wall. None of these means you have failed the course. They mean the course has done its real job — showing you where the deeper work is.

We offer therapy for individuals and couples, in Wakefield and online, and we are registered with BACP. As a course member, you will find a thank-you on your completion page — a discount towards a first one-to-one session, alongside our usual free fifteen-minute initial consultation. There is no pressure, and there never will be. The door is simply open.`,
        },
        {
          kind: "journal",
          exerciseId: "more-support",
          title: "An Honest Inventory",
          prompts: [
            "Is there anything this course stirred that has not settled?",
            "If you imagine sitting across from a therapist, what would you most want to talk about first?",
            "What has stopped you so far — and how true are those reasons today?",
          ],
        },
      ],
    },
    {
      id: "your-certificate",
      title: "Your Certificate and Next Steps",
      summary:
        "Marking what you have completed — and a few parting words for the road.",
      estimatedMinutes: 10,
      blocks: [
        {
          kind: "video",
          title: "A closing word from Esther and Laura",
          playbackId: "",
          durationSeconds: 300,
        },
        {
          kind: "prose",
          body: `You have reached the end of Growing Together — forty-four lessons of honest looking, which is no small thing. Whether you moved through in weeks or seasons, alone or alongside a partner, you have done real work, and we hope you are quietly proud of it.

Your certificate is ready on your completion page, along with your thank-you towards a first one-to-one session, should you ever want one. Your reflections, your learning path and all your practices remain in your account for as long as you are a member — this is a library now, not just a course.

One parting thought. The people who get the most from this work are not the ones who finish it flawlessly; they are the ones who keep returning to it imperfectly — re-reading an old reflection, restarting a lapsed check-in, offering one more clumsy, well-meant repair. Growth begins with understanding. It continues with practice. And it never requires you to be anyone other than who you are — only to keep meeting yourself, and the people you love, with compassion, curiosity and connection.

Thank you for spending this time with us. Whatever shape your relationships take from here, we wish you a future you have chosen on purpose — a new future, together with the people you love, and together with yourself.`,
        },
        {
          kind: "quote",
          text: "Growth begins with understanding. It continues with practice.",
          attribution: "Esther & Laura",
        },
        {
          kind: "journal",
          exerciseId: "parting-words",
          title: "A Letter to Your Future Self",
          intro:
            "One final entry — write to the person who will re-read this in a year.",
          prompts: [
            "What do you want your future self to remember from this course, in your own words?",
            "What do you hope will be true of your relationships by the time you read this again?",
            "What will you forgive yourself for, if it is not?",
          ],
        },
      ],
    },
  ],
};
