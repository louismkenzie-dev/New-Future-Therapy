import type { CourseModule } from "../types";

export const module03: CourseModule = {
  id: "stories-we-carry",
  number: 3,
  title: "The Stories We Carry",
  lede: "We arrive in every relationship carrying stories — from childhood, from past loves, from the cultures we grew up in. Naming them loosens their grip.",
  essence: "What is unexamined gets repeated; what is understood can change.",
  lessons: [
    {
      id: "where-we-learned-love",
      title: "Where We Learned Love",
      summary:
        "The home and the world you grew up in taught you a first language of love — its warmth, its silences, its rules.",
      estimatedMinutes: 25,
      blocks: [
        {
          kind: "video",
          title: "Your first language of love",
          playbackId: "",
          durationSeconds: 540,
        },
        {
          kind: "prose",
          body: `Long before your first relationship, you were studying love. You watched how the adults around you handled affection, anger, apology and distance. Whether your early home was warm, cold, chaotic or careful, it taught you a first language of love — and like any first language, it shapes your accent forever, even when you learn new ones.

This is not about blaming anyone. The people who raised us were carrying their own stories, usually doing their best within them. It is about noticing what you absorbed as normal: Was affection spoken aloud or assumed? Was anger frightening, forbidden, or safely expressed? When something went wrong, did people repair — or just move on in silence?

Whatever you find, remember: a first language is not a life sentence. People learn new languages of love at every age — at twenty-five, at fifty, at seventy.`,
        },
        {
          kind: "journal",
          exerciseId: "family-language",
          title: "The House You Learned In",
          prompts: [
            "How was affection shown — or not shown — where you grew up?",
            "What happened to anger? What happened after it?",
            "What did you promise yourself, back then, about how your own relationships would be?",
            "Which parts of that first language still serve you, and which would you like to retire?",
          ],
        },
      ],
    },
    {
      id: "past-relationships",
      title: "Past Relationships, Lasting Echoes",
      summary:
        "Old relationships leave echoes — tendernesses and bruises that the present did not create but still has to live with.",
      estimatedMinutes: 20,
      blocks: [
        {
          kind: "video",
          title: "The echoes we bring forward",
          playbackId: "",
          durationSeconds: 450,
        },
        {
          kind: "prose",
          body: `Every significant relationship leaves something behind. Sometimes it is a gift — a way of being loved that showed you what is possible. Sometimes it is a bruise — a betrayal or a slow erosion that taught you to brace.

Echoes are loudest when they are unrecognised. A new partner is five minutes late and you feel a dread that belongs to someone who once left for good. Someone raises their voice and you go somewhere far away inside. In those moments you are not overreacting — you are reacting accurately to something that already happened, just not to the person in front of you.

The practice is gentle separation: this feeling is real, and it is information — but is it about now, or about then?`,
        },
        {
          kind: "journal",
          exerciseId: "echoes",
          title: "Naming the Echoes",
          prompts: [
            "Which past relationship left the deepest mark on you — for good, for ill, or both?",
            "What does your current self brace for, because of it?",
            "What did a past relationship teach you that you want to keep?",
          ],
        },
      ],
    },
    {
      id: "scripts-we-repeat",
      title: "The Scripts We Repeat",
      summary:
        "Most of us run a handful of well-worn scripts in close relationships — spotting yours mid-scene is where change begins.",
      estimatedMinutes: 25,
      blocks: [
        {
          kind: "video",
          title: "Spotting the scene you are in",
          playbackId: "",
          durationSeconds: 480,
        },
        {
          kind: "prose",
          body: `A script is a sequence so familiar you can play it half-asleep: one of you raises an issue, the other defends, voices rise, someone withdraws, a cold day follows, then it blows over without ever being resolved. Different relationships, same scene.

Scripts are not character flaws — they are choreography learned over years, usually built from the patterns and echoes you have already explored in this module. And the remarkable thing about a script is that it only takes one person to change it. When you decline your usual line — when you stay where you would normally leave, or soften where you would normally strike back — the scene cannot proceed as written.`,
        },
        {
          kind: "quiz",
          exerciseId: "script-spotting",
          title: "Your Familiar Scene",
          intro:
            "Choose the answers that sound most like your well-worn moments — not your best days. Recognition, not judgement, is the goal.",
          questions: [
            {
              id: "q1",
              text: "An issue has been bothering you for days. How does it usually come out?",
              options: [
                {
                  value: "pursuer",
                  label: "Suddenly and bigger than I intended — it bursts.",
                },
                {
                  value: "withdrawer",
                  label: "It mostly does not — I keep it in and hope it fades.",
                },
                {
                  value: "fixer",
                  label:
                    "As a calm, practical proposal — feelings packaged as logistics.",
                },
                {
                  value: "tester",
                  label:
                    "Sideways — hints, mood, sharp little remarks — hoping it gets noticed.",
                },
              ],
            },
            {
              id: "q2",
              text: "Mid-argument, your signature move is…",
              options: [
                {
                  value: "pursuer",
                  label: "Pressing harder — I need this resolved now.",
                },
                {
                  value: "withdrawer",
                  label: "Going quiet, going flat, or leaving the room.",
                },
                {
                  value: "fixer",
                  label:
                    "Problem-solving at speed, before the feelings get any bigger.",
                },
                {
                  value: "tester",
                  label:
                    "Saying \"fine, forget it\" while meaning the opposite.",
                },
              ],
            },
            {
              id: "q3",
              text: "What do you most need from the other person in a hard conversation?",
              options: [
                {
                  value: "pursuer",
                  label: "Engagement — silence feels like abandonment.",
                },
                {
                  value: "withdrawer",
                  label: "Patience and space — pressure makes me disappear.",
                },
                {
                  value: "fixer",
                  label:
                    "Acknowledgement that I am trying — my fixing is how I love.",
                },
                {
                  value: "tester",
                  label:
                    "To be read accurately — asking outright feels too exposed.",
                },
              ],
            },
            {
              id: "q4",
              text: "After the dust settles, what do you usually feel?",
              options: [
                {
                  value: "pursuer",
                  label: "Guilt about my intensity, but relief it is out.",
                },
                {
                  value: "withdrawer",
                  label: "Quiet regret about everything I did not say.",
                },
                {
                  value: "fixer",
                  label:
                    "Frustration that a perfectly good solution was not enough.",
                },
                {
                  value: "tester",
                  label: "Loneliness — they still did not really see me.",
                },
              ],
            },
          ],
          profiles: [
            {
              id: "pursuer",
              title: "The Pursuer",
              description:
                "You move towards conflict because disconnection hurts more than the argument. Your engagement is a strength. Your practice: slowing your pace so others can meet you — pressure closes the very door you are knocking on.",
            },
            {
              id: "withdrawer",
              title: "The Withdrawer",
              description:
                "You move away to keep things safe — often because conflict once was genuinely unsafe, or simply overwhelming. Your calm is a strength. Your practice: a returning ritual, so that your retreat reliably ends in re-engagement rather than silence.",
            },
            {
              id: "fixer",
              title: "The Fixer",
              description:
                "You convert pain into projects. Your reliability is a strength. Your practice: staying in the feeling stage a little longer — most people need to feel accompanied before they can hear a solution, however good it is.",
            },
            {
              id: "tester",
              title: "The Tester",
              description:
                "You signal rather than say, hoping to be understood without the risk of asking. Your sensitivity is a strength. Your practice: one plain sentence — \"this is what I am feeling, this is what would help\" — and tolerating the exposure of having said it.",
            },
          ],
        },
      ],
    },
    {
      id: "rewriting-the-story",
      title: "Rewriting the Story",
      summary:
        "You cannot change what happened, but you can change what it means — and what happens next.",
      estimatedMinutes: 25,
      blocks: [
        {
          kind: "video",
          title: "The author, not just the character",
          playbackId: "",
          durationSeconds: 420,
        },
        {
          kind: "prose",
          body: `There is a version of your story in which you are only the product of what happened to you. It is true, and it is incomplete. There is another version — just as true — in which you are also the one who survived it, learned from it, and is now, sentence by sentence, writing something different.

Rewriting is not pretending. The harder chapters stay in the book. But you get to decide what they mean: whether the relationship that hurt you proves you are unlovable, or proves you can survive and choose better. Meaning is the one part of the past that remains editable.

If you are sharing this course with a partner, this is a powerful reflection to offer them — the story you are stepping out of, and the one you are stepping into.`,
        },
        {
          kind: "sharedJournal",
          exerciseId: "rewriting",
          title: "My Relationship Story, Retold",
          intro:
            "Write the short version of your old story, then the new one. Both should be true.",
          prompts: [
            "The story I have been carrying about myself in relationships goes like this…",
            "The evidence that story ignores is…",
            "The story I am choosing to write from now on begins…",
          ],
          partnerNote:
            "Your partner is sharing something tender here — the story they have carried, and the one they are trying to write. Witnessing it is the gift; you do not need to add anything to it.",
        },
        {
          kind: "download",
          title: "My Relationship Story",
          description:
            "A guided worksheet for mapping the chapters of your relationship history — the patterns, the turning points, and the story you want to write next.",
          blobPath: "courses/growing-together/relationship-story.pdf",
          fileLabel: "My Relationship Story (PDF)",
        },
      ],
    },
  ],
};
