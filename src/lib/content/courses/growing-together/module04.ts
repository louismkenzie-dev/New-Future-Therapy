import type { CourseModule } from "../types";

export const module04: CourseModule = {
  id: "communication",
  number: 4,
  title: "Communication: Speaking and Being Heard",
  lede: "Most relationship pain is not a lack of love — it is love failing to get through. This module is about clearing the line.",
  essence: "Being heard begins with how we listen.",
  lessons: [
    {
      id: "how-we-talk",
      title: "How We Talk",
      summary:
        "An honest look at your communication habits — the helpful ones and the ones that get in love's way.",
      estimatedMinutes: 20,
      blocks: [
        {
          kind: "video",
          title: "The habits underneath the words",
          playbackId: "",
          durationSeconds: 480,
        },
        {
          kind: "prose",
          body: `Communication is not just words. It is timing, tone, what your face does while the other person speaks, whether your phone is in your hand. Most of us have never audited these habits — we simply talk the way we have always talked, and wonder why the same conversations keep going wrong.

This week, become a kind observer of yourself. Notice when you interrupt, and what you are afraid will be lost if you wait. Notice when you compose your reply while the other person is still speaking. Notice the difference between conversations where you felt heard and ones where you felt processed. The aim is not guilt — it is data.`,
        },
        {
          kind: "checkin",
          exerciseId: "communication-habits",
          title: "Your Communication Habits",
          intro: "Answer for how things actually go, on an ordinary week.",
          fields: [
            {
              id: "listening",
              label: "When someone close to you talks about something hard, how fully do you listen — without planning your reply?",
              type: "scale",
            },
            {
              id: "directness",
              label: "How directly do you say what you actually mean?",
              type: "scale",
            },
            {
              id: "timing",
              label: "How often do important conversations happen at a good time, rather than mid-stress or late at night?",
              type: "scale",
            },
            {
              id: "habit",
              label: "Which habit would the people closest to you most wish you would change?",
              type: "text",
            },
          ],
        },
      ],
    },
    {
      id: "listening-to-understand",
      title: "Listening to Understand",
      summary:
        "The most powerful communication skill is not speaking better — it is listening so the other person actually feels heard.",
      estimatedMinutes: 25,
      blocks: [
        {
          kind: "video",
          title: "Listening as an act of love",
          playbackId: "",
          durationSeconds: 510,
        },
        {
          kind: "prose",
          body: `There are two kinds of listening. One waits for a gap to reply into. The other actually receives the person — their words, and the feeling underneath the words. People can tell the difference within seconds, even when they cannot name it.

Listening to understand has a simple, almost embarrassing technique at its heart: before you respond with your own view, reflect back what you heard, and check you got it. "So what you are saying is… have I understood?" It feels mechanical the first few times. It is also the fastest known route to another person softening, because being accurately heard is so rare that it changes the temperature of a conversation on its own.

Practise it this week somewhere low-stakes — a colleague, a friend, a parent — before you need it somewhere that matters.`,
        },
        {
          kind: "journal",
          exerciseId: "listening-practice",
          title: "The Listening Log",
          intro:
            "After you have tried reflective listening at least once, come back and capture what happened.",
          prompts: [
            "Who did you practise with, and what did you reflect back?",
            "What changed in them — or in the conversation — when you did?",
            "What made it hard to hold off on your own reply?",
          ],
        },
      ],
    },
    {
      id: "saying-what-you-need",
      title: "Saying What You Need",
      summary:
        "Turning hints, hopes and resentments into plain, kind requests that real people can actually respond to.",
      estimatedMinutes: 25,
      blocks: [
        {
          kind: "video",
          title: "From hint to request",
          playbackId: "",
          durationSeconds: 480,
        },
        {
          kind: "prose",
          body: `Unspoken needs do not disappear. They ferment — into hints, scorekeeping, and the special bitterness of "I should not have to ask." But here is the difficult, freeing truth: the people who love us cannot read minds, and making them guess is a test they are set up to fail.

A clean request has three parts: the situation, the feeling, the ask. "When plans change last minute (situation), I feel unsteady (feeling) — could you let me know as early as you can? (ask)". No accusation, no essay, no prosecution of character. Just information someone can act on.

Notice the difference between a request and a demand: a request survives hearing "no" and stays in the conversation. You are allowed to ask for what you need. The other person is allowed to be human in their response. Both of these can be true at once.`,
        },
        {
          kind: "journal",
          exerciseId: "needs-into-words",
          title: "Three Requests",
          prompts: [
            "Write down a need you have been hinting at instead of asking for.",
            "Now draft it as a clean request: situation, feeling, ask.",
            "What is the worst that could honestly happen if you asked it aloud — and could you survive that?",
          ],
        },
        {
          kind: "download",
          title: "Saying It Kindly",
          description:
            "A phrase guide for the conversations that matter — openers that lower defences, repairs for when it goes wrong, and clean ways to ask for what you need.",
          blobPath: "courses/growing-together/saying-it-kindly.pdf",
          fileLabel: "Saying It Kindly (PDF)",
        },
      ],
    },
    {
      id: "difficult-conversations",
      title: "Difficult Conversations",
      summary:
        "A calm structure for the conversations you have been putting off — so they bring you closer instead of further apart.",
      estimatedMinutes: 25,
      blocks: [
        {
          kind: "video",
          title: "Walking towards the hard thing",
          playbackId: "",
          durationSeconds: 540,
        },
        {
          kind: "prose",
          body: `Every relationship has a conversation it is avoiding. The avoidance is understandable — these talks carry real risk — but the cost compounds quietly: distance grows in exactly the shape of the things unsaid.

Difficult conversations go better when they are planned, not sprung. Choose a time when neither of you is hungry, exhausted or halfway out the door. Say what kind of conversation it is before you begin — "I want to talk something through; I am not looking for a fight" changes how everything after it lands. Know your one core point, because under stress you will not remember five. And decide in advance how you want to behave if it gets heated, because deciding in the moment rarely goes well.

Use the planner below for a real conversation you need to have. Planning is not manipulation — it is respect, for them and for what you are trying to say.`,
        },
        {
          kind: "checkin",
          exerciseId: "conversation-planner",
          title: "The Conversation Planner",
          intro: "Plan one real conversation you have been putting off.",
          fields: [
            {
              id: "topic",
              label: "What is the conversation about — in one sentence?",
              type: "text",
            },
            {
              id: "core",
              label: "What is the one thing you most need them to understand?",
              type: "text",
            },
            {
              id: "fear",
              label: "What are you most afraid might happen?",
              type: "text",
            },
            {
              id: "opening",
              label: "Write your opening line — kind, plain, no ambush.",
              type: "text",
            },
            {
              id: "heat",
              label: "If it gets heated, what will you do? (Pause? Name it? Agree to return to it?)",
              type: "text",
            },
          ],
        },
      ],
    },
    {
      id: "a-conversation-worth-having",
      title: "A Conversation Worth Having",
      summary:
        "Bringing the module together — a reflection written to be understood, and perhaps to be shared.",
      estimatedMinutes: 20,
      blocks: [
        {
          kind: "prose",
          body: `You have looked at your habits, practised real listening, turned needs into requests, and planned a difficult conversation. This final exercise is the module in miniature: one honest reflection about how communication goes between you and someone you love — written not to win anything, but to be understood.

If you are linked with a partner, sharing this can open exactly the conversation the two of you have been circling. Many couples find it easier to read each other's words first and talk second — the page absorbs the first flush of defensiveness so the conversation does not have to.`,
        },
        {
          kind: "sharedJournal",
          exerciseId: "conversation-worth-having",
          title: "What I Have Been Trying to Say",
          intro:
            "Write plainly. Imagine the other person reading this in a calm moment, genuinely wanting to understand you.",
          prompts: [
            "A conversation I think we need to have is…",
            "When we talk about hard things, what I notice myself doing is…",
            "What I am really asking for underneath it all is…",
            "One thing I want to do differently from my side is…",
          ],
          partnerNote:
            "Your partner has shared the conversation they have been carrying. Read it twice before responding — once to react, once to understand. Then perhaps let it open the conversation itself, gently, when you are both ready.",
        },
      ],
    },
  ],
};
