import type { CourseModule } from "../types";

export const module01: CourseModule = {
  id: "beginnings",
  number: 1,
  title: "Beginnings: How We Love",
  lede: "A gentle orientation — what this course is, how to take it alone or alongside a partner, and how to look after yourself as you go.",
  essence: "Growth begins with understanding.",
  lessons: [
    {
      id: "welcome",
      title: "Welcome: Growth Begins With Understanding",
      summary:
        "What this course offers, how it works, and how to make it your own — whether you are here by yourself or alongside a partner.",
      estimatedMinutes: 15,
      preview: true,
      blocks: [
        {
          kind: "video",
          title: "A welcome from Esther and Laura",
          playbackId: "",
          durationSeconds: 420,
        },
        {
          kind: "prose",
          body: `Welcome. We are so glad you are here. This course is a guided journey through the patterns that shape how you connect — with yourself, and with the people you love. It is built on the same foundations as our therapy practice: compassion, curiosity and connection.

You can take this course entirely on your own, and many people do. Understanding your own patterns is valuable whatever your relationship situation — whether you are single, newly together, decades into a partnership, or somewhere in between. If you are taking the course alongside a partner, you will each have your own private space to reflect, and you can choose — exercise by exercise — whether to share any of your reflections with each other.

There is no pace you are supposed to keep and no standard you are measured against. Some lessons will feel light; others may stir more than you expect. Take breaks. Return when you are ready. Everything you write is saved privately to your account, and nothing is ever shared unless you choose to share it.`,
        },
        {
          kind: "quote",
          text: "Growth begins with understanding — of yourself, of each other, and of the patterns that shape how you love.",
        },
        {
          kind: "journal",
          exerciseId: "welcome-intentions",
          title: "Your Intentions",
          intro:
            "Before anything else, take a quiet moment with these questions. There are no right answers — only honest ones.",
          prompts: [
            "What drew you to this course?",
            "What would you like to be different — in yourself, or in how you relate to others — by the time you finish?",
            "What might get in the way, and how would you like to respond when it does?",
          ],
        },
      ],
    },
    {
      id: "where-you-are-now",
      title: "What Brings You Here",
      summary:
        "A gentle baseline — where things stand for you today, so you can look back at the end and see how far you have come.",
      estimatedMinutes: 20,
      blocks: [
        {
          kind: "video",
          title: "Taking stock without judgement",
          playbackId: "",
          durationSeconds: 360,
        },
        {
          kind: "prose",
          body: `Before a journey, it helps to know where you are starting from. This is not an assessment of how good or bad anything is — it is simply a snapshot, taken kindly. At the end of the course you will revisit these same questions, and the distance between then and now will be yours to see.

Answer for how things actually feel today, not how you wish they felt or how you think they should feel. Honesty here is a gift to your future self.`,
        },
        {
          kind: "checkin",
          exerciseId: "baseline-checkin",
          title: "Where We Are Now",
          intro:
            "Move each slider to wherever feels true today. You will return to these questions in the final module.",
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
              id: "hopes",
              label: "In a sentence or two — what do you hope will have changed by the end?",
              type: "text",
            },
          ],
        },
        {
          kind: "journal",
          exerciseId: "hopes-and-worries",
          title: "Hopes and Worries",
          prompts: [
            "What do you hope for, in taking this course?",
            "Is there anything you are worried it might bring up? Naming it now can make it easier to meet later.",
          ],
        },
      ],
    },
    {
      id: "every-relationship-its-own",
      title: "Every Relationship Is Its Own",
      summary:
        "There is no single right shape for love. This course meets you in the relationship you actually have — or the one you hope to build.",
      estimatedMinutes: 15,
      blocks: [
        {
          kind: "video",
          title: "No single right shape",
          playbackId: "",
          durationSeconds: 390,
        },
        {
          kind: "prose",
          body: `Much of what is written about relationships quietly assumes a particular shape: two people, married, monogamous, living together, young. Real love is far more varied than that, and this course is written for all of it.

You may be in a monogamous partnership, a non-monogamous one, or a polyamorous constellation. You may be LGBTQIA+ or questioning. You may be eighteen and navigating your first serious relationship, or seventy and discovering love again after loss. You may live with your partner or apart, have children or not, be planning a future or rebuilding after one changed. Every one of these relationships deserves understanding on its own terms.

Throughout the course, when we say "partner", we mean whoever you love, however you love them. When an exercise asks about "your relationship", answer for the relationship that matters to you — including, if you are here on your own, your relationship with yourself. Nothing here will ask you to fit a mould. The work is to understand the relationship you are actually in, and to grow it in the direction you choose.`,
        },
        {
          kind: "quote",
          text: "We welcome and affirm people of all sexual orientations, gender identities, relationship structures and cultural backgrounds.",
          attribution: "Our practice commitment",
        },
        {
          kind: "journal",
          exerciseId: "own-shape",
          title: "The Shape of Yours",
          prompts: [
            "If you described your relationship — or the relationship you hope for — without using anyone else's template, what would you say?",
            "Where have outside expectations about what a relationship should look like put pressure on you?",
          ],
        },
      ],
    },
    {
      id: "caring-for-yourself",
      title: "Caring for Yourself Through This Course",
      summary:
        "How to pace yourself, what to do if difficult feelings surface, and when a course is not enough on its own.",
      estimatedMinutes: 12,
      blocks: [
        {
          kind: "video",
          title: "Pacing, safety and support",
          playbackId: "",
          durationSeconds: 300,
        },
        {
          kind: "prose",
          body: `Reflecting on relationships can stir real feeling. That is not a sign that something is wrong — it is usually a sign that you are touching something that matters. Even so, we want you to move through this course safely.

Go at your own pace. If a lesson feels too much today, leave it and come back. If writing about something raises more than you can comfortably hold, stop, breathe, and be gentle with yourself. The exercises will keep. You are allowed to skip anything.

Please also be honest with yourself about what a course can and cannot do. This course is a place for learning and reflection — it is not therapy, and it is not a substitute for it. If you are experiencing abuse, if past trauma is surfacing strongly, or if you are struggling with your mental health, please reach for more support. You can contact us about one-to-one therapy at any time — there is no pressure, and a free fifteen-minute initial consultation is always available. In an emergency, or if you feel unsafe, contact 999, or the Samaritans on 116 123, who are there day and night.`,
        },
        {
          kind: "download",
          title: "Your Course Companion",
          description:
            "A printable companion sheet — how to pace yourself, grounding practices for difficult moments, and the support contacts from this lesson in one place.",
          blobPath: "courses/growing-together/course-companion.pdf",
          fileLabel: "Course Companion (PDF)",
        },
      ],
    },
  ],
};
