import type { CourseModule } from "../types";

/* Module 1 — Your Relationship Journey. Three parts, each a paired
   reflection (individual questions, then Coming Back Together), plus the
   Relationship Check-In. Copy is Laura and Esther's own (Module 1 Part 1
   script and written instructions; Parts 1–3 question sheets; Relationship
   Check-In activity), lightly edited to house style. */

const COMING_BACK_TOGETHER_STEPS = [
  "Reread each question out loud.",
  "Take turns to read out your answer. Do this for every question.",
  "Notice any urge to say, “No, that is not what happened.” Instead, try: “That is so interesting. Tell me more.”",
  "Then complete the Couples Conversation questions together.",
];

const REVEAL_NOTE =
  "The purpose is not to decide whose details are correct. It is to become curious about how each of you experienced the relationship. Two people can share exactly the same moment and experience it very differently.";

export const module01: CourseModule = {
  id: "your-relationship-journey",
  number: 1,
  title: "Your Relationship Journey",
  lede: "Every relationship has a story — a beginning, a middle and where it is right now. Before anything else, we start with yours.",
  essence: "Not “What is wrong with your relationship?” but “What is your relationship story?”",
  lessons: [
    {
      id: "in-the-beginning",
      title: "Part 1: In the Beginning",
      summary:
        "How you met, your earliest impressions of each other, how you spent your time together and what felt different about this relationship.",
      estimatedMinutes: 45,
      blocks: [
        {
          kind: "video",
          title: "Our Relationship So Far — Part 1",
          playbackId: "JxCY3y00qSCRmG02FPgf00CHCipsb9S4UAeX02QY02jNc00lA",
          durationSeconds: 600,
        },
        {
          kind: "prose",
          heading: "Our Relationship So Far",
          body: `Welcome to this module. Before we start helping you explore your attachment strategies, your nervous system responses, conflict and communication styles, boundary setting, as well as intimacy and trust, we are going to start somewhere a little different.

We are going to start with your story. Because every relationship has one.`,
        },
        {
          kind: "flow",
          heading: "Every Relationship Has a Story",
          steps: [
            {
              icon: "sprout",
              title: "The beginning",
              body: "How you met, those first impressions, what attracted you to each other and what made your relationship feel different.",
            },
            {
              icon: "tree-deciduous",
              title: "The middle",
              body: "The decisions you have made, the experiences you have shared, the difficult periods you have navigated and all those ordinary moments that built this life together.",
            },
            {
              icon: "sun",
              title: "Right now",
              body: "Where your relationship is today — and what strengths already exist between you.",
            },
          ],
        },
        {
          kind: "tapChoice",
          exerciseId: "part-1-what-you-notice",
          title: "What Do You Notice Most?",
          intro:
            "When couples start to find things more challenging, it can change the way they see their relationship. You become really good at noticing what is wrong.",
          questions: [
            {
              id: "notice",
              text: "When things feel hard, where does your attention tend to go?",
              options: [
                {
                  value: "not-doing",
                  label: "What my partner is not doing",
                  response:
                    "That is a very human place for attention to land. Sometimes we become so focused on the problems that we lose sight of the person we are with — which is why we are starting somewhere different.",
                },
                {
                  value: "frustrates",
                  label: "What they keep doing that frustrates me",
                  response:
                    "Noticing what frustrates us is easy; noticing the person behind it takes a deliberate turn. This module is that turn.",
                },
                {
                  value: "different",
                  label: "What I wish was different",
                  response:
                    "Wishing things were different often means we still care about what is possible. We will come to what you want to change — but first, the story so far.",
                },
                {
                  value: "person",
                  label: "The person I am with",
                  response:
                    "Holding on to the person, not just the problems, is exactly what this module is about. You may find it deepens further as you look back together.",
                },
              ],
            },
          ],
        },
        {
          kind: "contrast",
          heading: "So We Are Starting Somewhere Different",
          columns: [
            {
              label: "We are deliberately not asking",
              icon: "search",
              items: ["What is wrong with your relationship?"],
            },
            {
              label: "We are asking",
              icon: "sparkles",
              tone: "sage",
              items: [
                "What is your relationship story?",
                "Who were you when you met?",
                "What drew you towards each other?",
                "What have you been through together?",
                "What has worked — and what strengths already exist between you?",
              ],
            },
          ],
          note: "This is not about looking at your relationship through rose-tinted glasses, and it certainly is not about pretending that the difficult parts have not happened. They matter too. Those experiences are also part of your story. But they are not the whole story.",
        },
        {
          kind: "iconCards",
          heading: "How This Module Works",
          intro:
            "Three clear parts, each with its own set of questions. Every part begins with individual reflection questions, before you come back together, share your answers and complete two further Couples Conversation questions together.",
          columns: 3,
          items: [
            { icon: "sprout", title: "Part 1 · In the Beginning", body: "Four individual questions, then two together." },
            { icon: "tree-deciduous", title: "Part 2 · Building Our Relationship", body: "Four individual questions, then two together." },
            { icon: "sun", title: "Part 3 · Looking at Us Today", body: "Three individual questions, then two together." },
          ],
        },
        {
          kind: "flow",
          heading: "Why on Your Own First?",
          intro:
            "We want you to explore your experience of your relationship first. Not the answer you think your partner wants. Not the version you have reinforced over the years. And not necessarily the factually perfect version.",
          steps: [
            {
              icon: "lock",
              title: "Answer privately",
              body: "In your own login. “What do I remember? What did this mean to me? How did I experience our relationship?”",
            },
            {
              icon: "heart-handshake",
              title: "Choose to share",
              body: "When you are both ready. Your answers appear side by side only once you have both shared.",
            },
            {
              icon: "messages-square",
              title: "Come back together",
              body: "Reread each question aloud, take turns, then answer the Couples Conversation questions as one.",
            },
          ],
        },
        {
          kind: "flipCards",
          heading: "Your Answers Might Be Different",
          intro:
            "In fact, we would be surprised if they were not. Tap a card to see the same moment from the other side.",
          items: [
            {
              front: "Our first date was one of the best nights of my life.",
              back: "I remember you being completely terrified.",
            },
            {
              front: "I remember feeling really confident and chatty.",
              back: "I remember you being shy and quiet.",
            },
          ],
        },
        {
          kind: "contrast",
          heading: "When Your Partner Is Sharing",
          intro:
            "Two people can be sharing exactly the same moment and experience it very differently. Understanding those differences is something we return to again and again throughout this programme. So notice any urge to correct.",
          columns: [
            {
              label: "Notice the urge to say",
              icon: "flame",
              items: ["No, that is not what happened.", "You have remembered that completely wrong."],
            },
            {
              label: "Instead, try",
              icon: "ear",
              tone: "sage",
              items: ["That is so interesting. Tell me more."],
            },
          ],
        },
        {
          kind: "callout",
          icon: "sprout",
          title: "Part 1 Takes You Right Back to the Beginning",
          body: `Try to put yourself back into that stage of your life. Where were you living? What was happening in your world? Who were you back then? And what do you remember about your partner beginning to enter your life?

Take your time with this. Once you have both completed your four individual questions, come back together, reread each question out loud and take turns to read out your answers. Then complete the two Couples Conversation questions together — and come back for our next video, Building Our Relationship, once you have.

You may also find it helpful to keep a journal as you go — here in Your Learning Path, or by hand.`,
        },
        {
          kind: "pairedReflection",
          exerciseId: "part-1-in-the-beginning",
          eyebrow: "Module 1 · Part 1",
          title: "In the Beginning",
          individual: {
            title: "Individual Reflection",
            intro:
              "Complete these questions separately before sharing your answers with your partner. Write what you remember, what it meant to you and how you experienced it — not the version you think your partner wants.",
            questions: [
              {
                id: "met",
                label: "What can I remember about how we first met?",
                hint:
                  "Where did we meet? How did we first get in contact? Did anyone help with the introduction? What was happening in my life at that time?",
              },
              {
                id: "impressions",
                label: "What were my earliest impressions of my partner?",
                hint:
                  "What can I remember about them? What did they look like? How old were we? How did they come across? What can I remember about our first conversations?",
              },
              {
                id: "time-together",
                label: "How did I feel when we spent time together?",
                hint:
                  "How did we spend our time together? How did I feel when we were together? What are some of my favourite dates and times together?",
              },
              {
                id: "important",
                label:
                  "When did I begin to think this relationship might become important to me?",
                hint:
                  "Was there a particular moment, conversation or experience? What do I remember feeling or thinking at the time? What qualities stood out to me in those early days?",
              },
            ],
          },
          together: {
            title: "Coming Back Together",
            intro:
              "Once you have both completed and shared your four individual questions, come back together. This is where the really interesting part of the activity begins.",
            steps: COMING_BACK_TOGETHER_STEPS,
            questions: [
              {
                id: "similarities",
                label:
                  "What similarities did we notice in how we remembered the beginning of our relationship?",
                hint:
                  "Which memories, moments or first impressions did we both remember? Were we drawn to similar things about each other? What seemed important to both of us when we looked back?",
              },
              {
                id: "surprised",
                label: "Was there anything in our partner's story that surprised us?",
                hint:
                  "Did our partner remember something we had forgotten? Were we surprised by what they first noticed or liked about us? Was there anything we did not realise had been meaningful to them at the time?",
              },
            ],
          },
          revealNote: REVEAL_NOTE,
          closing: {
            text: "What was it like hearing the beginning of your relationship through your partner's eyes?",
          },
        },
      ],
    },
    {
      id: "building-our-relationship",
      title: "Part 2: Building Our Relationship",
      summary:
        "The middle of your story — your happiest memories, what brought you closer, the challenges you have faced together and the moments that built trust.",
      estimatedMinutes: 45,
      blocks: [
        {
          kind: "video",
          title: "Our Relationship So Far — Part 2",
          playbackId: "",
          durationSeconds: 480,
        },
        {
          /* Bridging copy drawn from the Part 1 script; Laura and Esther's
             Part 2 video script replaces this when it arrives. */
          kind: "prose",
          heading: "The Middle of Your Story",
          body: `After the beginning comes the middle. The decisions you have made, the experiences you have shared, the difficult periods you have navigated and all those ordinary moments that have gradually built the life you have chosen to share together.`,
        },
        {
          kind: "iconCards",
          heading: "What Part 2 Looks Across",
          columns: 4,
          items: [
            { icon: "sun", title: "Happiest memories", body: "Holidays, celebrations, ordinary days." },
            { icon: "heart", title: "What brought you closer", body: "Moments the relationship deepened." },
            { icon: "mountain", title: "Challenges you came through", body: "And what they revealed." },
            { icon: "shield-check", title: "Moments that built trust", body: "When you could rely on each other." },
          ],
        },
        {
          kind: "callout",
          icon: "route",
          title: "Same Rhythm as Part 1",
          body: `Complete your four individual questions separately first. Then come back together, reread each question aloud, take turns to share your answers, and complete the two Couples Conversation questions together. Remember: curiosity, not correction.`,
        },
        {
          kind: "pairedReflection",
          exerciseId: "part-2-building-our-relationship",
          eyebrow: "Module 1 · Part 2",
          title: "Building Our Relationship",
          individual: {
            title: "Individual Reflection",
            intro:
              "Complete these questions separately before sharing your answers with your partner.",
            questions: [
              {
                id: "happiest",
                label: "What are some of my happiest memories from our relationship?",
                hint:
                  "What moments stand out when I think back over our time together? Are there particular holidays, celebrations, ordinary days or experiences that I remember fondly? What made those times feel special to me?",
              },
              {
                id: "closer",
                label: "What experiences brought us closer together?",
                hint:
                  "Were there particular experiences when I felt our relationship deepen? What were we experiencing at the time? What did I notice about my partner or our relationship that helped me feel closer to them?",
              },
              {
                id: "challenges",
                label: "What challenges have we faced and overcome together?",
                hint:
                  "What difficult periods have we experienced? How did we respond to them? What helped us get through those times? Did I discover anything about myself, my partner or our relationship through those experiences? What big decisions shaped our lives?",
              },
              {
                id: "trust",
                label: "What moments helped build trust between us?",
                hint:
                  "When have I felt that I could rely on my partner? Were there moments when I felt supported, understood or accepted by them? What did my partner do that helped me trust them or the relationship more deeply?",
              },
            ],
          },
          together: {
            title: "Coming Back Together",
            intro:
              "Once you have both completed and shared your individual questions, come back together and share your answers before completing these two questions as a couple.",
            steps: COMING_BACK_TOGETHER_STEPS,
            questions: [
              {
                id: "similarities",
                label:
                  "What similarities did we notice in the memories and experiences we chose?",
                hint:
                  "Were there particular moments that stood out to both of us? What might these shared memories tell us about what has been important in our relationship?",
              },
              {
                id: "strengths",
                label: "What strengths have helped us build our relationship?",
                hint:
                  "Looking across our answers, what qualities helped us make decisions, navigate challenges and stay connected? What strengths can we recognise in ourselves as a couple?",
              },
            ],
          },
          revealNote: REVEAL_NOTE,
        },
      ],
    },
    {
      id: "looking-at-us-today",
      title: "Part 3: Looking at Us Today",
      summary:
        "Where your relationship is right now — what you admire, what you are grateful for, what you hope never to lose, and what you want to take into your next chapter.",
      estimatedMinutes: 40,
      blocks: [
        {
          kind: "video",
          title: "Our Relationship So Far — Part 3",
          playbackId: "",
          durationSeconds: 480,
        },
        {
          /* Bridging copy drawn from the Part 1 script; Laura and Esther's
             Part 3 video script replaces this when it arrives. */
          kind: "prose",
          heading: "Where You Are Right Now",
          body: `When things have felt challenging, it is easy to become very good at noticing what is wrong. Part 3 deliberately turns towards what you admire, what you are grateful for and what you hope you never lose — not through rose-tinted glasses, but because these things are also true, and they are also part of your story.`,
        },
        {
          kind: "iconCards",
          heading: "Three Questions for Today",
          columns: 3,
          items: [
            { icon: "sparkles", title: "What I admire", body: "The person your partner has become." },
            { icon: "hand-heart", title: "What I am grateful for", body: "Including what you forget to say out loud." },
            { icon: "leaf", title: "What I hope we never lose", body: "What feels important to protect as things change." },
          ],
        },
        {
          kind: "callout",
          icon: "route",
          title: "Then Come Back Together",
          body: `Complete your three individual questions separately first. Then share your answers, and complete the two Couples Conversation questions together — including what you would like to take forward into your next chapter.`,
        },
        {
          kind: "pairedReflection",
          exerciseId: "part-3-looking-at-us-today",
          eyebrow: "Module 1 · Part 3",
          title: "Looking at Us Today",
          individual: {
            title: "Individual Reflection",
            intro:
              "Complete these questions separately before sharing your answers with your partner.",
            questions: [
              {
                id: "admire",
                label: "What do I admire most about my partner today?",
                hint:
                  "What qualities do I value in them now? What do I respect about the person they have become? What do I notice about how they approach life, relationships, family or challenges? Are there qualities I appreciate now that I may not have noticed in the beginning?",
              },
              {
                id: "grateful",
                label: "What am I most grateful for in our relationship?",
                hint:
                  "When I think about our life together, what am I thankful for? Are there particular experiences, everyday moments, acts of support or things my partner brings to my life that I value? What might I sometimes appreciate but forget to say out loud?",
              },
              {
                id: "never-lose",
                label: "What do I hope we never lose in our relationship?",
                hint:
                  "What feels important for me to protect as our relationship continues to change? Is it our friendship, humour, affection, intimacy, shared values, adventures, traditions or something else? What would I miss most if it gradually disappeared from our relationship?",
              },
            ],
          },
          together: {
            title: "Coming Back Together",
            intro:
              "Once you have both completed and shared your individual questions, come back together and share your answers before completing these two questions as a couple.",
            steps: COMING_BACK_TOGETHER_STEPS,
            questions: [
              {
                id: "today-felt",
                label: "How did it feel to talk about our relationship as it is today?",
                hint:
                  "What emotions came up as we shared our answers? Did anything feel reassuring, emotional, difficult, hopeful or unexpected? Was there anything we found particularly easy or difficult to hear or say? Which strengths are still present?",
              },
              {
                id: "next-chapter",
                label:
                  "What would we like to take forward into the next chapter of our relationship?",
                hint:
                  "What do we want to protect? What would we like more of? Is there something from the beginning or middle of our relationship that we would like to rediscover?",
              },
            ],
          },
          revealNote: REVEAL_NOTE,
        },
      ],
    },
    {
      id: "relationship-check-in",
      title: "Relationship Check-In",
      summary:
        "Three simple questions — How am I? How do I think you are? How do I think we are? — to create a regular pause and notice how connected you feel.",
      estimatedMinutes: 15,
      blocks: [
        {
          kind: "prose",
          heading: "Why Use This Check-In?",
          body: `Relationships can change from day to day and week to week. We can also make assumptions about how our partner is feeling or how our relationship is doing without stopping to check.

This simple three-question exercise creates a regular pause.`,
        },
        {
          kind: "iconCards",
          columns: 3,
          items: [
            { icon: "eye", title: "Builds self-awareness", body: "Noticing how you are feeling before focusing on your partner." },
            { icon: "search", title: "Encourages curiosity", body: "What you think your partner is feeling may not always match their experience." },
            { icon: "trending-up", title: "Helps identify patterns", body: "Repeated check-ins can highlight changes in connection, stress and wellbeing over time." },
            { icon: "message-circle", title: "Supports communication", body: "A simple starting point for conversations that might otherwise be difficult to begin." },
            { icon: "heart", title: "Creates space for connection", body: "Noticing not only difficulties, but moments when things feel settled, close or positive." },
          ],
        },
        {
          kind: "callout",
          icon: "compass",
          title: "How to Use It",
          body: `Complete the three questions individually. Try to answer with what you genuinely notice rather than what you think you should feel. There are no right or wrong answers.

Then take turns to share. When you have both shared, your answers appear side by side — and how you thought your partner was doing sits next to how they actually said they are.`,
        },
        {
          kind: "pairedReflection",
          exerciseId: "relationship-check-in",
          eyebrow: "Module 1 · Check-In",
          title: "How Am I? How Are You? How Are We?",
          individual: {
            title: "Individually",
            intro:
              "Answer with what you genuinely notice, not what you think you should feel. A number and a few words is plenty.",
            questions: [
              {
                id: "me",
                label: "How am I?",
                scale: { low: "Struggling", high: "Flourishing" },
              },
              {
                id: "you",
                label: "How do I think you are?",
                scale: { low: "Struggling", high: "Flourishing" },
              },
              {
                id: "us",
                label: "How do I think we are?",
                scale: { low: "Distant", high: "Connected" },
              },
            ],
          },
          together: {
            title: "Take Turns",
            intro:
              "Take turns to share your answers. Notice where your sense of each other matched — and where it did not. Curiosity, not correction.",
            questions: [],
          },
          compare: { me: "you", you: "me", us: "us" },
          revealNote:
            "Your “How do I think you are?” sits beside your partner's “How am I?” — a gentle check on the assumptions we make about each other.",
        },
      ],
    },
  ],
};
