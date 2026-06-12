import type { CourseModule } from "../types";

export const module07: CourseModule = {
  id: "intimacy-and-connection",
  number: 7,
  title: "Intimacy and Connection",
  lede: "Intimacy is more than one thing — emotional, physical, intellectual, everyday. This module explores all of them, at whatever pace feels right.",
  essence: "Closeness is built from being truly seen — and staying.",
  lessons: [
    {
      id: "forms-of-intimacy",
      title: "The Many Forms of Intimacy",
      summary:
        "Emotional, physical, intellectual, playful, everyday — mapping the kinds of closeness that make up a connected life.",
      estimatedMinutes: 20,
      blocks: [
        {
          kind: "video",
          title: "More than one kind of close",
          playbackId: "",
          durationSeconds: 480,
        },
        {
          kind: "prose",
          body: `Ask people about intimacy and most will think first of sex. But intimacy is a much wider country. There is emotional intimacy — being known, including the unflattering parts, and staying. Intellectual intimacy — minds that enjoy meeting. Playful intimacy — private jokes, shared silliness, the lightness that keeps love breathable. Physical intimacy in all its forms, sexual and not: the hand on the back, the head on the shoulder. And everyday intimacy — the unglamorous closeness of parallel lives, cooking while the other reads, comfortable silence in the same room.

Relationships rarely lack intimacy entirely; more often they are strong in some forms and thin in others — plenty of everyday closeness, say, but little real emotional disclosure. Mapping which is which turns a vague ache of distance into something specific you can actually tend.`,
        },
        {
          kind: "checkin",
          exerciseId: "intimacy-map",
          title: "Your Intimacy Map",
          intro:
            "Rate where your closest relationship feels rich and where it feels thin. If you are taking this course solo, answer for connection in your life as a whole.",
          fields: [
            { id: "emotional", label: "Emotional intimacy — being truly known", type: "scale" },
            { id: "physical", label: "Physical closeness — affection and touch", type: "scale" },
            { id: "intellectual", label: "Intellectual connection — minds meeting", type: "scale" },
            { id: "playful", label: "Playfulness — laughter and lightness", type: "scale" },
            { id: "everyday", label: "Everyday companionship — life lived alongside", type: "scale" },
            {
              id: "richest",
              label: "Which form is richest for you right now — and which do you miss most?",
              type: "text",
            },
          ],
        },
      ],
    },
    {
      id: "desire-and-its-seasons",
      title: "Desire and Its Seasons",
      summary:
        "Desire ebbs, flows and changes across a life. Understanding its seasons replaces panic with curiosity.",
      estimatedMinutes: 25,
      blocks: [
        {
          kind: "video",
          title: "Ebb, flow and change",
          playbackId: "",
          durationSeconds: 540,
        },
        {
          kind: "prose",
          body: `Few subjects carry as much silent worry as desire. We absorb the idea that desire should be constant and spontaneous, and that anything else signals a failing relationship. The truth is kinder and more interesting: desire has seasons. It shifts with stress, health, medication, grief, new parenthood, menopause, age, and the simple settling of long love. For many people — especially in long relationships — desire is more often responsive than spontaneous: it follows connection and context rather than arriving unprompted. Discovering this is usually a relief.

It is also true that people simply differ — in how much desire they feel, for whom, and whether they feel it at all. Asexuality is a real and valid way of being, not a problem to solve. Mismatched levels of desire between partners are among the most common experiences in long relationships and are not, by themselves, a verdict on anyone.

What turns desire differences into wounds is rarely the difference itself — it is the meanings silently attached to it: you do not want me, something is wrong with me. The antidote is the same as everywhere else in this course: honest, kind conversation in place of silent interpretation.`,
        },
        {
          kind: "journal",
          exerciseId: "desire-seasons",
          title: "Your Seasons",
          prompts: [
            "How has desire — its presence, absence, or shape — changed across your life so far?",
            "What meanings have you attached to those changes? Are they true?",
            "What would you want a partner to understand about your current season?",
          ],
        },
      ],
    },
    {
      id: "talking-about-sex-and-touch",
      title: "Talking About Sex and Touch",
      summary:
        "The conversation many couples never quite have — made approachable, at whatever depth you choose.",
      estimatedMinutes: 25,
      blocks: [
        {
          kind: "video",
          title: "Finding the words",
          playbackId: "",
          durationSeconds: 510,
        },
        {
          kind: "prose",
          body: `Many people find it easier to be physically intimate with a partner than to talk about physical intimacy with that same partner. The silence is understandable — these conversations risk embarrassment, rejection, and the fear of hurting someone we love. But the cost of silence is high: guesswork where there could be knowledge, and small dissatisfactions compounding quietly for years.

You do not have to begin with the hardest conversation. Begin with appreciation — what you enjoy, what feels good, what you would like more of. Appreciation opens the same door that criticism slams shut. Use plain words at whatever level of explicitness feels natural to you both; clinical distance and forced boldness are both ways of hiding.

And remember that this conversation includes non-sexual touch, which for many people is the truest currency of closeness. Being held, hand-holding, the goodnight kiss that does not ask for anything — these are worth talking about with the same care.`,
        },
        {
          kind: "checkin",
          exerciseId: "comfort-and-curiosity",
          title: "Comfort and Curiosity",
          intro:
            "A private reflection on physical closeness — at whatever depth feels right. Honesty here is for your benefit, not anyone else's eyes.",
          fields: [
            {
              id: "ease",
              label: "How at ease do you feel talking about physical intimacy with a partner?",
              type: "scale",
            },
            {
              id: "appreciate",
              label: "What forms of touch or closeness do you most appreciate?",
              type: "text",
            },
            {
              id: "more-of",
              label: "What would you like more of — and what has stopped you asking?",
              type: "text",
            },
            {
              id: "opener",
              label: "If you were to open this conversation with a partner, what might your first sentence be?",
              type: "text",
            },
          ],
        },
      ],
    },
    {
      id: "affection-in-everyday-life",
      title: "Affection in Everyday Life",
      summary:
        "Grand gestures are rare by definition. Connection lives in the small, repeatable acts — your connection menu.",
      estimatedMinutes: 20,
      blocks: [
        {
          kind: "video",
          title: "The small repeatable acts",
          playbackId: "",
          durationSeconds: 420,
        },
        {
          kind: "prose",
          body: `Long relationships are not sustained by anniversaries. They are sustained by Tuesday afternoons — the cup of tea made unasked, the six-second hug, the "text me when you land", the genuine question about the meeting they were dreading. Small acts, endlessly repeatable, each one a thread in the rope.

People differ — sometimes comically — in which acts land as love. One person feels cherished by words; another by help with the heavy task; another by undivided attention; another by touch. Mismatches here are a classic source of quiet hurt: you can be sending love fluently in your language while your partner waits for it in theirs.

The exercise below builds your connection menu — the specific, small, repeatable acts that reach you. Concrete enough that someone could actually do them this week.`,
        },
        {
          kind: "journal",
          exerciseId: "connection-menu",
          title: "Your Connection Menu",
          prompts: [
            "List eight to ten small, specific acts that make you feel loved. (Not \"be supportive\" — \"sit with me for ten minutes when I get home\".)",
            "Which languages of care do you send most fluently? Is that the language the people you love receive best?",
            "Which item on your menu would you most like someone to know about — and could you tell them this week?",
          ],
        },
      ],
    },
    {
      id: "what-closeness-means-to-me",
      title: "What Closeness Means to Me",
      summary:
        "Bringing the module together — your own definition of intimacy, and the chance to let your partner truly see it.",
      estimatedMinutes: 20,
      blocks: [
        {
          kind: "prose",
          body: `You have mapped the forms of intimacy, made peace with the seasons of desire, found words for the conversation about touch, and written your connection menu. This final reflection draws it into one place: what closeness actually means to you — not in general, but specifically, in this season of your life.

If you are linked with a partner, this is one of the most valuable reflections you can share. Most couples have never actually exchanged their definitions of closeness — they have inferred them, often inaccurately, for years.`,
        },
        {
          kind: "sharedJournal",
          exerciseId: "closeness-means",
          title: "What Closeness Means to Me",
          intro:
            "Write your honest, current definition — not the one you think you should have.",
          prompts: [
            "I feel closest to you when…",
            "A form of intimacy I treasure, that we rarely name, is…",
            "In this season of my life, what I most need from our physical closeness is…",
            "One small thing from my connection menu I would love you to know about is…",
          ],
          partnerNote:
            "Your partner has shared their map of closeness — what actually reaches them. This is rare information; most people never say it aloud. Perhaps choose one thing from it to act on this week, quietly.",
        },
      ],
    },
  ],
};
