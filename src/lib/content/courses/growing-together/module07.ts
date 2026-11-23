import type { CourseModule } from "../types";

/* Module 7 — Bringing It All Together, the final module of the programme.
   One part: Laura and Esther's closing video, then the summary broken into
   small screens, then a closing reflection that looks back across the
   whole programme. Copy is the therapists' own: Esther's "Final Module
   Written Version" (Drive folder "Module 7 Final") is the primary wording,
   with the "Final Module Script" used for the video length and speaker
   attribution. The documents carry no separate activity, so the closing
   reflection's prompts are drawn directly from the summary's own wording.
   Lightly edited to house style: British English, no contractions, "your
   partner" throughout. The site shows the certificate after this lesson. */

export const module07: CourseModule = {
  id: "bringing-it-all-together",
  number: 7,
  title: "Bringing It All Together",
  lede: "Throughout this programme, we have explored lots of different aspects of your relationship, hopefully helping you develop a deeper understanding of yourselves, each other and the patterns that shape how you connect.",
  essence: "Building a healthy, fulfilling relationship is something you continue to create together.",
  lessons: [
    {
      id: "final-part-1",
      title: "Final Module Summary: Your Relationship Journey",
      summary:
        "A look back at everything the programme has explored, from your relationship journey to privacy and secrecy, and what we hope you will take with you. Then a closing reflection, on your own and together.",
      estimatedMinutes: 20,
      blocks: [
        {
          kind: "video",
          title: "Bringing It All Together — Final Module Summary",
          playbackId: "",
          durationSeconds: 230,
        },
        {
          kind: "prose",
          heading: "Bringing It All Together",
          body: `Throughout this programme, we have explored lots of different aspects of your relationship, hopefully helping you develop a deeper understanding of yourselves, each other and the patterns that shape how you connect.

So, let us remind ourselves of some of the things we have covered.`,
        },
        {
          kind: "flow",
          heading: "Your Relationship Journey Through the Programme",
          steps: [
            {
              icon: "route",
              title: "Your Relationship Journey",
              body: "Reflecting on how your relationship began, the experiences that have shaped you and where you find yourselves today.",
            },
            {
              icon: "activity",
              title: "Your Nervous Systems",
              body: "Understanding how they respond to stress, recognise safety and influence the way you interact with each other.",
            },
            {
              icon: "anchor",
              title: "Attachment",
              body: "Exploring how your early experiences and attachment strategies can influence your needs for closeness, reassurance and independence.",
            },
            {
              icon: "messages-square",
              title: "Communication",
              body: "Recognising unhelpful communication habits, learning to listen with curiosity, express your needs and repair after disagreements. And the cycles you can become caught in during conflict, and how you can learn to work together against the pattern, rather than against each other.",
            },
            {
              icon: "flame",
              title: "Intimacy and Desire",
              body: "Looking at emotional and physical intimacy, understanding different experiences of desire and learning to communicate about touch, pleasure and connection without pressure or expectation.",
            },
            {
              icon: "shield",
              title: "Boundaries",
              body: "Recognising your individual needs and limits, communicating them clearly and respecting each other's differences.",
            },
            {
              icon: "lock",
              title: "Privacy and Secrecy",
              body: "Understanding the importance of personal autonomy, honesty and transparency, and developing shared relationship agreements that support trust and respect.",
            },
          ],
        },
        {
          kind: "contrast",
          heading: "What We Hope You Will Take Away",
          intro:
            "One of the most important things we hope you will take away from this programme is this.",
          columns: [
            {
              label: "Healthy relationships are not about",
              icon: "shield-alert",
              items: [
                "Getting everything right",
                "Never experiencing difficulties",
                "Becoming the perfect couple",
              ],
            },
            {
              label: "They are about",
              icon: "sprout",
              tone: "sage",
              items: [
                "Developing a greater awareness of yourselves and each other",
                "Recognising when old patterns are showing up",
                "Being willing to respond differently",
                "Becoming more aware, more intentional and better able to navigate life's challenges together",
              ],
            },
          ],
          note: "The aim was never to become the perfect couple.",
        },
        {
          kind: "callout",
          icon: "heart-handshake",
          title: "When Difficult Moments Come",
          body: `We are sure there will still be disagreements, misunderstandings and times when you feel disconnected. That is part of being in a relationship.

But hopefully, you now have a range of tools to help you navigate those moments with greater understanding, compassion and curiosity.`,
        },
        {
          kind: "iconCards",
          heading: "Keep Growing Together",
          intro:
            "Remember, your relationship will continue to grow and change, just as you both will.",
          columns: 4,
          items: [
            { icon: "message-circle", title: "Keep talking" },
            { icon: "ear", title: "Keep listening" },
            { icon: "search", title: "Keep being curious about each other" },
            {
              icon: "calendar-clock",
              title: "Keep making time for your relationship",
              body: "Perhaps most importantly of all.",
            },
          ],
        },
        {
          kind: "quote",
          text: "Building a healthy, fulfilling relationship is not something you achieve once. It is something you continue to create together.",
          attribution: "Laura & Esther",
        },
        {
          kind: "sharedJournal",
          exerciseId: "m7-closing-reflection",
          title: "Closing Reflection: Looking Back Across the Programme",
          intro:
            "Before you finish, take a moment to look back over the whole programme, first on your own and then, if you would like to, together. There are no right answers. The aim is not to have got everything right, but to notice what you now understand about yourselves, each other and your relationship.",
          prompts: [
            "Looking back across the programme, from our relationship journey through to privacy and secrecy, what is the most important thing I will take away?",
            "What have I come to understand about myself, my partner and the patterns that shape how we connect?",
            "Which old patterns do I now recognise when they show up, and how would I like to respond differently?",
            "When disagreements, misunderstandings or times of disconnection come, which tools from the programme would I most like us to reach for?",
            "How will we keep talking, keep listening, keep being curious about each other and keep making time for our relationship?",
          ],
          partnerNote:
            "Your partner has shared what they will take with them from the programme, in their own words. Read it with curiosity, and perhaps choose one thing you will keep creating together.",
        },
        {
          kind: "callout",
          icon: "leaf",
          tone: "dark",
          title: "Thank You for Joining Us on This Journey",
          body: `We really hope you have enjoyed this programme and that it has given you a greater understanding of yourselves, each other and your relationship.

And we hope you will continue to use what you have learnt, keep having those conversations and keep investing in your relationship.

Growth begins with understanding.`,
        },
      ],
    },
  ],
};
