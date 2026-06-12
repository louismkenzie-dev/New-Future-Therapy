import type { CourseModule } from "../types";

export const module02: CourseModule = {
  id: "knowing-yourself",
  number: 2,
  title: "Knowing Yourself First",
  lede: "Every relationship you will ever have includes you. This module is about meeting yourself with the same curiosity you would offer someone you love.",
  essence: "The longest relationship of your life is the one with yourself.",
  lessons: [
    {
      id: "relationship-with-yourself",
      title: "Your Relationship With Yourself",
      summary:
        "How you speak to yourself, what you expect of yourself, and how that quietly shapes every other connection.",
      estimatedMinutes: 20,
      blocks: [
        {
          kind: "video",
          title: "The relationship underneath all the others",
          playbackId: "",
          durationSeconds: 480,
        },
        {
          kind: "prose",
          body: `Before we look outward, we look inward — not because your relationships are your fault, but because you are the one constant in all of them. The way you treat yourself sets a quiet baseline for what feels normal from others. If your inner voice is harsh, criticism from a partner can feel like confirmation. If you rarely rest, another person's care can feel uncomfortable, even undeserved.

Begin noticing the tone you take with yourself. When you make a mistake, what do you say inwardly? Would you say it, in those words, to someone you love? For many of us the honest answer is no — and noticing that gap is the first step in closing it.`,
        },
        {
          kind: "journal",
          exerciseId: "inner-voice",
          title: "The Voice Within",
          prompts: [
            "When something goes wrong, what does your inner voice typically say? Write a few of its actual phrases.",
            "Where do you think you learned that voice?",
            "What would a kinder — but still honest — version of that voice sound like?",
          ],
        },
      ],
    },
    {
      id: "attachment-patterns",
      title: "Attachment: The Patterns Beneath",
      summary:
        "The ways we learned to seek closeness and respond to distance — tendencies, not labels, and all of them changeable.",
      estimatedMinutes: 25,
      blocks: [
        {
          kind: "video",
          title: "How we learned to reach for people",
          playbackId: "",
          durationSeconds: 540,
        },
        {
          kind: "prose",
          body: `From our earliest days, we learn what happens when we reach for another person. Was comfort reliably there? Sometimes there? Conditional? Those early lessons settle into patterns — habits of closeness and distance that follow us into adult love.

You may notice yourself reaching quickly for reassurance when a relationship feels uncertain, or pulling away when someone comes close, or some mixture that shifts with the relationship and the season of life. None of these patterns is a flaw, and none is a life sentence. They were intelligent adaptations to the world you grew up in. The question now is whether they still serve the relationships you want.

The reflection below will help you notice your tendencies. Please hold the result lightly — it is a mirror, not a diagnosis, and most people see themselves in more than one pattern.`,
        },
        {
          kind: "quiz",
          exerciseId: "attachment-tendencies",
          title: "Your Patterns of Reaching",
          intro:
            "For each situation, choose the answer closest to what you actually tend to do — not what you would like to do. There are no good or bad answers.",
          questions: [
            {
              id: "q1",
              text: "A partner seems quieter than usual and you do not know why. What happens inside you?",
              options: [
                {
                  value: "settled",
                  label:
                    "I notice it, feel curious, and ask about it when the moment is right.",
                },
                {
                  value: "reaching",
                  label:
                    "I feel a pull of worry — I want to know we are okay, soon.",
                },
                {
                  value: "guarded",
                  label:
                    "I give them space and quietly get on with my own things.",
                },
                {
                  value: "mixed",
                  label:
                    "It depends — sometimes I press in, sometimes I disappear into myself.",
                },
              ],
            },
            {
              id: "q2",
              text: "When a relationship starts to feel really close, what do you notice?",
              options: [
                {
                  value: "settled",
                  label: "Mostly warmth — closeness tends to feel safe to me.",
                },
                {
                  value: "reaching",
                  label:
                    "Relief, with a watchfulness underneath — I do not want to lose it.",
                },
                {
                  value: "guarded",
                  label:
                    "A flicker of unease — part of me starts looking for the exit.",
                },
                {
                  value: "mixed",
                  label:
                    "Both longing and alarm, sometimes within the same hour.",
                },
              ],
            },
            {
              id: "q3",
              text: "After a disagreement, what is your strongest urge?",
              options: [
                {
                  value: "settled",
                  label:
                    "To cool down, then come back and repair things together.",
                },
                {
                  value: "reaching",
                  label:
                    "To resolve it immediately — unresolved conflict is hard to sit with.",
                },
                {
                  value: "guarded",
                  label:
                    "To withdraw and handle my feelings on my own first.",
                },
                {
                  value: "mixed",
                  label:
                    "To push for resolution, then shut down if it does not come.",
                },
              ],
            },
            {
              id: "q4",
              text: "Asking for help or comfort feels…",
              options: [
                { value: "settled", label: "Natural enough, with people I trust." },
                {
                  value: "reaching",
                  label:
                    "Easy to do, though I sometimes worry I need too much.",
                },
                {
                  value: "guarded",
                  label:
                    "Uncomfortable — I would usually rather manage alone.",
                },
                {
                  value: "mixed",
                  label:
                    "Confusing — I want it deeply and resist it at the same time.",
                },
              ],
            },
            {
              id: "q5",
              text: "When someone you love is away or out of contact longer than expected…",
              options: [
                {
                  value: "settled",
                  label: "I assume good reasons and carry on comfortably.",
                },
                {
                  value: "reaching",
                  label:
                    "My mind starts checking — are they alright, are we alright?",
                },
                {
                  value: "guarded",
                  label:
                    "Honestly, I often enjoy the breathing room.",
                },
                {
                  value: "mixed",
                  label:
                    "I swing between not minding at all and minding a great deal.",
                },
              ],
            },
          ],
          profiles: [
            {
              id: "settled",
              title: "Settled Reaching",
              description:
                "Closeness and distance both feel survivable to you. You can ask, wait, and repair. Your growth edge is often patience with partners whose patterns are louder than yours — their weather is not your fault, and not yours to fix alone.",
            },
            {
              id: "reaching",
              title: "Quick to Reach",
              description:
                "You feel connection — and threats to it — vividly. Your care is a strength; the cost is anxiety when reassurance is delayed. Practice may mean letting a feeling of uncertainty exist for a little while without acting on it, and telling partners plainly what helps you feel secure.",
            },
            {
              id: "guarded",
              title: "Self-Contained",
              description:
                "You learned to need lightly and cope alone, and you are likely very good at it. The cost can be distance you did not intend. Practice may mean staying present a few minutes longer in emotional conversations, and letting someone see a need before you have already met it yourself.",
            },
            {
              id: "mixed",
              title: "Both at Once",
              description:
                "You know the push and the pull intimately — longing for closeness and bracing against it. This often grows from love that was real but unpredictable. Be especially gentle with yourself; naming which force is active in a given moment is powerful work on its own.",
            },
          ],
        },
        {
          kind: "journal",
          exerciseId: "attachment-reflection",
          title: "Seeing the Pattern in Daylight",
          prompts: [
            "Where did you recognise yourself most, and least?",
            "Think of a recent moment your pattern showed up. What was it protecting you from?",
          ],
        },
      ],
    },
    {
      id: "needs-and-values",
      title: "Needs and Values",
      summary:
        "What you actually need to feel well in connection — and the values you want your relationships to be built on.",
      estimatedMinutes: 25,
      blocks: [
        {
          kind: "video",
          title: "Needs are not neediness",
          playbackId: "",
          durationSeconds: 420,
        },
        {
          kind: "prose",
          body: `Many of us were taught, one way or another, that having needs makes us a burden. So we trim them down, translate them into hints, or wait for people to guess. Then we feel quietly disappointed when they cannot.

Needs are not neediness. They are information — about what lets you feel safe, close, and yourself. Some are near-universal: to feel heard, respected, wanted. Others are particular to you: solitude that restores you, words of reassurance, shared adventure, a calm home. Knowing yours, in plain language, is one of the kindest things you can do for the people who love you — because it gives them a real chance to succeed.`,
        },
        {
          kind: "checkin",
          exerciseId: "values-sort",
          title: "What You Are Built On",
          intro:
            "Choose the values that feel most essential to how you want to love and be loved — then put words to the two that matter most.",
          fields: [
            {
              id: "values",
              label: "Which of these feel essential to you in close relationships? Choose up to five.",
              type: "choices",
              options: [
                "Honesty",
                "Loyalty",
                "Independence",
                "Tenderness",
                "Adventure",
                "Stability",
                "Humour",
                "Growth",
                "Faith or meaning",
                "Equality",
                "Passion",
                "Peace",
              ],
            },
            {
              id: "top-value",
              label: "Pick the single value you could least live without. What does it look like in daily life when it is honoured?",
              type: "text",
            },
            {
              id: "unmet",
              label: "Which of your needs most often goes unspoken? What stops you saying it?",
              type: "text",
            },
          ],
        },
        {
          kind: "download",
          title: "Needs and Values Map",
          description:
            "A worksheet for mapping your core needs and values — what they look like when met, how to ask for them, and how to recognise them in others.",
          blobPath: "courses/growing-together/needs-values-map.pdf",
          fileLabel: "Needs and Values Map (PDF)",
        },
      ],
    },
    {
      id: "self-worth-in-connection",
      title: "Self-Worth in Connection",
      summary:
        "How your sense of your own worth shapes what you accept, what you ask for, and what you believe you deserve.",
      estimatedMinutes: 20,
      blocks: [
        {
          kind: "video",
          title: "What you believe you deserve",
          playbackId: "",
          durationSeconds: 450,
        },
        {
          kind: "prose",
          body: `Self-worth is not confidence, and it is not thinking you are better than anyone. It is the settled sense that you are allowed to take up space — to have needs, to say no, to be loved without constantly earning it.

When self-worth runs low, relationships tilt. We over-give and feel resentful. We accept less than hurts us and call it being easy-going. We hear neutral words as criticism. None of this means you are broken; it usually means you learned, somewhere, that love had conditions. The unlearning is slow and absolutely possible — and it tends to happen in exactly the kind of honest reflection you are doing now.`,
        },
        {
          kind: "journal",
          exerciseId: "worth-stories",
          title: "The Terms of Belonging",
          prompts: [
            "Complete this sentence as honestly as you can: \"I am easiest to love when I…\"",
            "Where might that belief have come from?",
            "What would change in your closest relationship if you fully believed you did not have to earn your place in it?",
          ],
        },
        {
          kind: "audio",
          title: "A Self-Compassion Practice",
          playbackId: "",
          durationSeconds: 480,
        },
      ],
    },
    {
      id: "introducing-yourself-anew",
      title: "Introducing Yourself Anew",
      summary:
        "Gathering what you have learned about yourself into words — and, if you choose, offering them to your partner.",
      estimatedMinutes: 20,
      blocks: [
        {
          kind: "prose",
          body: `You have spent this module looking at your inner voice, your patterns of reaching, your needs, your values, and your sense of worth. This final exercise gathers it together.

Imagine introducing yourself — not your job or your history, but your inner workings — to someone who loves you and genuinely wants to understand. What would you most want them to know about how you work?

If you are linked with a partner on this course, you can choose to share this reflection with them when you are ready. Many people find it one of the most moving exchanges of the whole course. And if you would rather keep it private, that is completely fine — sharing is always your choice, never an expectation.`,
        },
        {
          kind: "sharedJournal",
          exerciseId: "introduce-anew",
          title: "What I Would Like You to Understand About Me",
          intro:
            "Write to be understood, not to be impressive. Plain, true sentences are enough.",
          prompts: [
            "When I go quiet or pull away, what is usually happening underneath is…",
            "I feel most loved when…",
            "Something I find hard to ask for is…",
            "One thing I am working on in this course is…",
          ],
          partnerNote:
            "Your partner chose to share this so you could understand them more deeply. There is nothing to fix here — the most loving response is simply to take it in.",
        },
      ],
    },
  ],
};
