import type { CourseModule } from "../types";

export const module05: CourseModule = {
  id: "conflict-and-repair",
  number: 5,
  title: "Conflict and Repair",
  lede: "Conflict is not the opposite of love — unrepaired conflict is. This module is about fighting fairly, and finding each other again afterwards.",
  essence: "It is not the rupture that defines a relationship, but the repair.",
  lessons: [
    {
      id: "why-we-fight",
      title: "Why We Fight",
      summary:
        "Arguments are rarely about the dishes. Understanding what conflict is really carrying changes how you meet it.",
      estimatedMinutes: 20,
      blocks: [
        {
          kind: "video",
          title: "What the argument is really about",
          playbackId: "",
          durationSeconds: 510,
        },
        {
          kind: "prose",
          body: `Most arguments have two layers. The surface layer is the stated subject — the dishes, the lateness, the money, the in-laws. The deeper layer is almost always a question: Do I matter to you? Am I safe with you? Are we still on the same side?

This is why surface-level victories feel so hollow. You can win the dishes argument decisively and both go to bed lonelier, because the real question — do I matter? — never got answered. And it is why tiny things can detonate enormous fights: the subject was small, but the question underneath was not.

The skill is learning to hear the question inside the complaint — in what your partner says, and in what you say. "You never text when you are late" is rarely about punctuality. It is usually "I want to know I am on your mind."`,
        },
        {
          kind: "journal",
          exerciseId: "fight-beneath",
          title: "The Question Underneath",
          prompts: [
            "Think of a recurring argument in your life — with a partner, past or present, or someone else close. What is its surface subject?",
            "What question do you think is really being asked underneath it — by you, and by them?",
            "What would it be like to answer the real question directly, just once?",
          ],
        },
      ],
    },
    {
      id: "your-conflict-style",
      title: "Your Conflict Style",
      summary:
        "How you behave when conflict arrives — and what your style costs and protects.",
      estimatedMinutes: 25,
      blocks: [
        {
          kind: "video",
          title: "Weather patterns in conflict",
          playbackId: "",
          durationSeconds: 450,
        },
        {
          kind: "prose",
          body: `Under conflict, we become more like ourselves — our protective patterns amplify. Some of us get louder, some vanish, some turn icily reasonable, some make peace at any price. None of these styles is wrong. Each one protects something and costs something.

What matters most is not your style but your awareness of it — because conflict between two unaware styles is choreography, and conflict between two aware ones is conversation.`,
        },
        {
          kind: "quiz",
          exerciseId: "conflict-style",
          title: "How You Weather Conflict",
          intro:
            "Answer for what you actually do when conflict is live — not your calmest theory of yourself.",
          questions: [
            {
              id: "q1",
              text: "Conflict has just arrived — voices have changed. Your first instinct is to…",
              options: [
                { value: "engager", label: "Lean in — let us have this out properly, now." },
                { value: "peacekeeper", label: "Smooth it — find the soft words that lower the temperature." },
                { value: "retreater", label: "Pull back — I need quiet and distance to think." },
                { value: "analyst", label: "Get reasonable — slow everything down into facts and logic." },
              ],
            },
            {
              id: "q2",
              text: "What feels most unbearable mid-conflict?",
              options: [
                { value: "engager", label: "Being shut out — silence and stonewalling." },
                { value: "peacekeeper", label: "The anger itself — raised voices feel dangerous." },
                { value: "retreater", label: "Being pressed to respond before I am ready." },
                { value: "analyst", label: "Emotion overwhelming the actual facts of the matter." },
              ],
            },
            {
              id: "q3",
              text: "Afterwards, you most often regret…",
              options: [
                { value: "engager", label: "How hard I pushed and what I said at full volume." },
                { value: "peacekeeper", label: "Agreeing to things I did not mean, just to end it." },
                { value: "retreater", label: "Disappearing — and how long I stayed gone." },
                { value: "analyst", label: "Winning the argument and losing the closeness." },
              ],
            },
            {
              id: "q4",
              text: "What you most wish the other person understood about you in conflict is…",
              options: [
                { value: "engager", label: "My intensity is engagement — I fight because I care." },
                { value: "peacekeeper", label: "My calm costs me — I am absorbing more than I show." },
                { value: "retreater", label: "My leaving is regulation, not rejection — I come back." },
                { value: "analyst", label: "My logic is not coldness — it is how I keep us safe from chaos." },
              ],
            },
          ],
          profiles: [
            {
              id: "engager",
              title: "The Engager",
              description:
                "You meet conflict head-on; avoidance feels like abandonment. Your courage keeps issues alive until they are resolved. Your practice: volume control and pacing — the same truth lands differently at half the intensity, and pauses are not defeats.",
            },
            {
              id: "peacekeeper",
              title: "The Peacekeeper",
              description:
                "You protect the relationship from heat, often at your own expense. Your gift is de-escalation. Your practice: making sure peace does not come at the price of truth — a resolved conflict you silently disagree with is just a postponed one.",
            },
            {
              id: "retreater",
              title: "The Retreater",
              description:
                "You step away to keep yourself — and sometimes everyone — safe from what might be said. Your gift is self-regulation. Your practice: announcing the retreat and the return (\"I need an hour; I am coming back\") so your absence reads as a pause, not a punishment.",
            },
            {
              id: "analyst",
              title: "The Analyst",
              description:
                "You reach for reason when feelings surge. Your gift is steadiness. Your practice: validating the feeling before solving the problem — \"that sounds really hard\" opens more doors than the most elegant solution delivered too early.",
            },
          ],
        },
      ],
    },
    {
      id: "rupture-and-repair",
      title: "The Cycle of Rupture and Repair",
      summary:
        "Every close relationship ruptures. The strong ones are not the ones that never tear — they are the ones that mend well.",
      estimatedMinutes: 25,
      blocks: [
        {
          kind: "video",
          title: "Mending as a practice",
          playbackId: "",
          durationSeconds: 540,
        },
        {
          kind: "prose",
          body: `Here is one of the most hopeful findings in everything we know about relationships: rupture is not the problem. Every close relationship tears sometimes — a harsh word, a missed need, a bad week. What separates relationships that deepen from ones that erode is not the frequency of rupture but the reliability of repair.

Repair is any move that says: the connection matters more than the argument. It can be an apology, a touch, a cup of tea made mid-silence, a joke offered carefully across the distance, the words "can we start again?". Crucially, repair attempts often arrive imperfectly and mid-conflict — and the skill is as much in receiving them as in making them. A clumsy olive branch declined is a second rupture.

Notice what repair looked like where you grew up. Some of us never saw it done — the house simply went quiet until the weather changed. If that is your inheritance, repair will feel awkward and unnatural at first. Do it anyway. It is learnable at any age, and it is the single most valuable skill in this entire course.`,
        },
        {
          kind: "quote",
          text: "It is not the rupture that defines a relationship, but the repair.",
        },
        {
          kind: "journal",
          exerciseId: "repair-history",
          title: "Your History of Mending",
          prompts: [
            "What did repair look like in your childhood home — or was the silence simply waited out?",
            "How do you tend to offer repair now? How do you receive it when it is offered clumsily?",
            "Recall a repair that worked — what exactly happened, and what did it make possible?",
          ],
        },
      ],
    },
    {
      id: "apology-and-forgiveness",
      title: "Apology and Forgiveness",
      summary:
        "What a real apology contains, why most fall short, and what forgiveness is — and is not.",
      estimatedMinutes: 25,
      blocks: [
        {
          kind: "video",
          title: "The anatomy of a real apology",
          playbackId: "",
          durationSeconds: 480,
        },
        {
          kind: "prose",
          body: `Most apologies fail because they are designed to end discomfort rather than acknowledge harm. "I am sorry you feel that way" is not an apology — it is a review of the other person's feelings. "I am sorry, but…" erases itself in the second clause.

A real apology has recognisable parts: naming what you did, without dilution; acknowledging its impact on the other person; and, where it is wanted, saying what you will do differently. No counter-charges filed in the same breath, no demand for instant absolution. An apology is something you give; what the other person does with it is theirs.

Forgiveness, likewise, is widely misunderstood. It is not saying the thing did not matter, and it is not a feeling you can force on a schedule. It is closer to a decision — to stop using the past as a weapon, and to release yourself from the full-time work of resentment. Sometimes it arrives quickly; sometimes it takes years; sometimes the wisest available step is simply willingness. All of those count.`,
        },
        {
          kind: "journal",
          exerciseId: "apology-work",
          title: "Owed and Owing",
          prompts: [
            "Is there an apology you owe — one you have given only in the diluted form? What would the full version say?",
            "Is there an apology you are still waiting for? What would it mean to stop organising your peace around its arrival?",
            "What does forgiveness mean to you — and where has it been confused with pretending things did not hurt?",
          ],
        },
        {
          kind: "audio",
          title: "A Cooling-Down Breathing Practice",
          playbackId: "",
          durationSeconds: 360,
        },
      ],
    },
    {
      id: "your-repair-ritual",
      title: "Building Your Repair Ritual",
      summary:
        "Designing your own reliable way back to each other — agreed in peacetime, ready for the storm.",
      estimatedMinutes: 20,
      blocks: [
        {
          kind: "prose",
          body: `The best time to design a repair ritual is when you do not need one. In calm weather, you can think clearly about what helps; in a storm, you can only grab what is already within reach.

A repair ritual is a small, agreed sequence for finding each other after a rupture. It might be: either of us can call a pause, and a pause always comes with a return time. Or: the word "ouch" means something landed harder than you knew. Or: after every argument, once we are calm, we each say one thing we understand better about the other now. The content matters less than the agreement — a shared map both people trust when feelings are running high.

Design yours below. If you are linked with a partner, share it — and let their version meet yours. The ritual you build together from both drafts will be stronger than either alone.`,
        },
        {
          kind: "sharedJournal",
          exerciseId: "repair-ritual",
          title: "Our Way Back to Each Other",
          intro:
            "Draft the repair ritual you would like to live by. Be concrete — storms do not read poetry.",
          prompts: [
            "When conflict starts to spiral, I would like either of us to be able to say or do this…",
            "When I retreat, what I need is… and what I commit to is…",
            "After the storm, the way I would like us to come back together is…",
          ],
          partnerNote:
            "Your partner has drafted their half of a repair ritual — their honest design for how the two of you find each other after conflict. Read it as an offer, then bring your half, and build the final version together.",
        },
        {
          kind: "download",
          title: "Our Repair Ritual",
          description:
            "A printable card to capture the repair ritual you design — pause signals, return times, and your agreed way back to each other. Keep it somewhere you will both see it.",
          blobPath: "courses/growing-together/repair-ritual-card.pdf",
          fileLabel: "Our Repair Ritual Card (PDF)",
        },
      ],
    },
  ],
};
