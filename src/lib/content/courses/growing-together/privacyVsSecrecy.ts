import type { Lesson } from "../types";

/* The first interactive programme worksheet, authored by Laura and Esther.
   Individual sections save privately per partner; the couple section is
   designed to be completed together once both are ready. */

const RESPECT_SCALE = ["Always", "Usually", "Sometimes", "Rarely", "Never"];

export const privacyVsSecrecyLesson: Lesson = {
  id: "privacy-vs-secrecy",
  title: "Privacy vs Secrecy",
  summary:
    "Privacy is about choice. Secrecy is often about fear. A reflection worksheet on healthy boundaries and emotional safety — complete it privately, then choose what to explore together.",
  estimatedMinutes: 30,
  blocks: [
    {
      kind: "prose",
      body: `Privacy and secrecy can sometimes look similar on the surface, but they usually come from very different places. Privacy is about choice. Secrecy is often about fear.

Use this worksheet to reflect on your own relationship before discussing your answers with your partner. Your answers are private to you — nothing is visible to your partner unless you choose to share it. If you would rather complete it on paper, you can print the page and write by hand.`,
    },
    {
      kind: "worksheet",
      exerciseId: "privacy-vs-secrecy-worksheet",
      title: "Understanding Healthy Boundaries and Emotional Safety",
      intro:
        "Reflect honestly. There are no right answers here — only honest ones.",
      fields: [
        {
          id: "privacy-means",
          section: "My Understanding",
          label: "Privacy means…",
          type: "text",
          hint: "Complete the sentence in your own words.",
        },
        {
          id: "secrecy-means",
          label: "Secrecy means…",
          type: "text",
          hint: "Complete the sentence in your own words.",
        },
        {
          id: "important-private",
          section: "My Relationship With Privacy",
          label:
            "What parts of my life are important for me to keep private? Why are these important to me?",
          type: "text",
        },
        {
          id: "partner-respects-boundaries",
          label: "Do I feel my partner respects these boundaries?",
          type: "scale",
          options: RESPECT_SCALE,
        },
        {
          id: "feel-trusted",
          label: "What helps me feel trusted?",
          type: "text",
        },
        {
          id: "ease-of-telling",
          section: "Emotional Safety",
          label:
            "When I feel upset, hurt or disappointed, how easy is it for me to tell my partner?",
          type: "scale",
          options: [
            "Very easy",
            "Quite easy",
            "Sometimes",
            "Difficult",
            "Very difficult",
          ],
        },
        {
          id: "why-difficult",
          label: "If it feels difficult, why?",
          type: "text",
        },
        {
          id: "partner-usually",
          label: "When I share something vulnerable, my partner usually…",
          type: "choices",
          options: [
            "Listens",
            "Becomes curious",
            "Gets defensive",
            "Dismisses my feelings",
            "Changes the subject",
            "Other",
          ],
          hint: "Choose any that fit.",
        },
        {
          id: "kept-something-why",
          section: "My Relationship With Secrecy",
          label:
            "Have you ever kept something from your partner? If so, ask yourself why. Was it because…",
          type: "choices",
          options: [
            "I wanted personal privacy",
            "I was not ready to talk",
            "I was afraid of upsetting them",
            "I was worried about their reaction",
            "I wanted to avoid conflict",
            "Something else",
          ],
          hint: "Choose any that fit.",
        },
        {
          id: "hidden-safety",
          label:
            "Now think about this question: do I ever keep things hidden because I do not feel emotionally safe enough to be honest? Why is this?",
          type: "text",
        },
        {
          id: "feel-listened-to",
          section: "Our Communication",
          label:
            "Think about your relationship as a whole. When difficult conversations happen… I feel listened to.",
          type: "scale",
          options: RESPECT_SCALE,
        },
        {
          id: "feel-respected",
          label: "I feel respected.",
          type: "scale",
          options: RESPECT_SCALE,
        },
        {
          id: "safe-to-disagree",
          label: "I feel emotionally safe to disagree.",
          type: "scale",
          options: RESPECT_SCALE,
        },
        {
          id: "honest-without-fear",
          label: "I can be honest without fearing my partner's reaction.",
          type: "scale",
          options: RESPECT_SCALE,
        },
      ],
      coupleSection: {
        title: "Couple Discussion",
        intro:
          "When you are both ready, take turns answering these questions together. Remember:",
        groundRules: [
          "Listen to understand.",
          "Do not interrupt.",
          "Do not defend yourself.",
          "Simply become curious.",
        ],
        fields: [
          {
            id: "couple-safe-honest",
            label:
              "What helps you feel emotionally safe enough to be honest with me?",
          },
          {
            id: "couple-most-trusted",
            label: "When do you feel most trusted in our relationship?",
          },
          {
            id: "couple-keeping-to-yourself",
            label:
              "Is there anything you have been keeping to yourself because you were worried about my reaction?",
          },
          {
            id: "couple-help-feel-safer",
            label:
              "What could I do that would help you feel safer sharing difficult things with me?",
          },
          {
            id: "weekly-action",
            label:
              "Weekly action — together, choose one small action to practise this week that will help create more emotional safety in your relationship. Our action is…",
          },
        ],
      },
      partnerNote:
        "Your partner has chosen to share their Privacy vs Secrecy reflections with you. Read with curiosity, not defence — this is an invitation to understand, not a scorecard.",
      closing: {
        heading: "NewFuture Reflection",
        body: "Privacy strengthens relationships when it protects individuality. Secrecy weakens relationships when it grows out of fear. The answer is not about blame. It is an opportunity to better understand each other and create a relationship where both people feel safe, respected and heard.",
        question:
          "Does our relationship make it easier — or harder — for each of us to be honest?",
        pull: "Arguments do not damage relationships. Feeling unheard does. Healthy relationships are not built by winning disagreements. They are built by creating conversations where both people feel safe enough to be honest, vulnerable and understood.",
      },
    },
  ],
};
