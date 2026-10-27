import type { CourseModule } from "../types";

/* Module 1 — Your Relationship Journey. Parts 1–3 are paired reflections
   (individual questions, then Coming Back Together); Part 4 introduces the
   journal, the Relationship Check-In and AI reflections. Copy is Laura and
   Esther's own (Module 1 scripts and reflection sheets, Parts 1–4), lightly
   edited to house style. */

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
          playbackId: "yXAHwLTBfmguvt026NgzWX024CzYe026aj8pOVgUAgKgVw",
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
        "How your relationship has developed — your happiest memories, what brought you closer, the challenges you have faced together and the moments that built trust.",
      estimatedMinutes: 45,
      blocks: [
        {
          kind: "video",
          title: "Building Your Relationship — Part 2",
          playbackId: "",
          durationSeconds: 420,
        },
        {
          kind: "prose",
          heading: "How Your Relationship Has Developed",
          body: `Now that you have explored how your relationship began, it is time to reflect on how it has developed.

Relationships are shaped by many experiences: celebrations and losses, big decisions and ordinary days, challenges and moments of support.`,
        },
        {
          kind: "iconCards",
          heading: "Built Through Thousands of Experiences",
          intro: "Relationships are not built through one enormous moment. They are built through thousands of experiences.",
          columns: 4,
          items: [
            { icon: "sun", title: "Holidays and celebrations" },
            { icon: "coffee", title: "Ordinary Tuesdays" },
            { icon: "milestone", title: "Big decisions" },
            { icon: "message-circle", title: "Difficult conversations" },
            { icon: "leaf", title: "Losses" },
            { icon: "hand-heart", title: "Showing up when it mattered" },
          ],
        },
        {
          kind: "iconCards",
          heading: "What Part 2 Looks Across",
          columns: 4,
          items: [
            { icon: "smile", title: "Happiest memories", body: "Significant occasions and small, everyday moments." },
            { icon: "heart", title: "What brought you closer", body: "When you felt your relationship deepen." },
            { icon: "mountain", title: "Challenges you have faced", body: "And how you navigated them." },
            { icon: "shield-check", title: "Moments that built trust", body: "When you felt you could rely on your partner." },
          ],
        },
        {
          kind: "tapChoice",
          exerciseId: "part-2-strengths-noticed",
          title: "Strengths You May Have Stopped Noticing",
          intro:
            "Sometimes looking back can help us recognise qualities in our relationship that have become harder to see.",
          questions: [
            {
              id: "strength",
              text: "Which of these feels most true of the two of you?",
              options: [
                {
                  value: "pull-together",
                  label: "We pull together when life gets difficult",
                  response: "That matters. Notice whether your partner names it too when you come back together.",
                },
                {
                  value: "humour",
                  label: "Humour has carried us through",
                  response: "Humour can carry couples through some really challenging periods. Hold on to it as you reflect.",
                },
                {
                  value: "loyal",
                  label: "We are loyal, affectionate or practical",
                  response: "These everyday qualities are easy to stop seeing, and they are part of what has built your relationship.",
                },
                {
                  value: "keep-choosing",
                  label: "We keep choosing to come back and try again",
                  response: "Choosing to return and try again is a real strength. Being here, doing this together, is part of it.",
                },
              ],
            },
          ],
        },
        {
          kind: "callout",
          icon: "ear",
          title: "You May Remember Things Differently",
          body: `You may also remember some difficult experiences, and it is okay if you remember them differently.

You do not need to resolve every disagreement or revisit every detail. For now, simply notice what those experiences meant to each of you and what you might learn from hearing each other's perspective.`,
        },
        {
          kind: "flow",
          heading: "Same Rhythm as Part 1",
          steps: [
            { icon: "lock", title: "Four individual questions", body: "In your own login. You choose which answers to share." },
            { icon: "heart-handshake", title: "Share and listen", body: "Take turns speaking and listening, with curiosity rather than correction." },
            { icon: "messages-square", title: "Two Couple Conversation questions", body: "Answered together, as one." },
          ],
        },
        {
          kind: "pairedReflection",
          exerciseId: "part-2-building-our-relationship",
          eyebrow: "Module 1 · Part 2",
          title: "Building Our Relationship",
          individual: {
            title: "Individual Reflection",
            intro:
              "Complete these four questions individually before coming back together with your partner. Take your time and reflect on the experiences that have helped shape your relationship: happy memories, significant decisions, challenges and everyday moments. You will have the opportunity to choose which answers you would like to share.",
            questions: [
              {
                id: "happiest",
                label: "What are some of my happiest memories from our relationship?",
                hint:
                  "What moments stand out when I think back over our time together? These might be significant occasions or small, everyday moments. Are there particular holidays, celebrations, ordinary days or experiences that I remember fondly? What made those times feel special to me?",
              },
              {
                id: "closer",
                label: "What experiences brought us closer together?",
                hint:
                  "Were there particular experiences when I felt our relationship deepen? What were we experiencing at the time? What did I notice about my partner or our relationship that helped me feel closer to them? Were there any important decisions or changes that shaped our relationship or brought us closer?",
              },
              {
                id: "challenges",
                label: "What challenges have we faced together, and how have we navigated them?",
                hint:
                  "What difficult periods have we experienced? How did we respond to them? What helped us get through those times? Did I discover anything about myself, my partner or our relationship through those experiences?",
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
            title: "Couple Conversation: Coming Back Together",
            intro:
              "Once you have both completed your Individual Reflections, come back together to share the answers you have chosen to share. Take turns speaking and listening, remembering that you may have experienced the same events differently. You do not need to agree on every detail. The aim is to understand each other's experiences with curiosity.",
            steps: COMING_BACK_TOGETHER_STEPS,
            questions: [
              {
                id: "similarities",
                label: "What similarities did we notice in the memories and experiences we chose?",
                hint:
                  "Were there particular moments that stood out to both of us? What might these shared memories tell us about what has been important in our relationship?",
              },
              {
                id: "strengths",
                label: "What strengths have helped us build our relationship?",
                hint:
                  "Looking across our answers, what qualities helped us make decisions, navigate challenges and stay connected? What strengths can we recognise in ourselves as a couple? Are there strengths we used to recognise more easily but may have lost sight of?",
              },
            ],
          },
          revealNote: REVEAL_NOTE,
          closing: {
            text: "Take your time with this. When you are ready, move on to Part 3: Looking at Us Today.",
          },
        },
      ],
    },
    {
      id: "looking-at-us-today",
      title: "Part 3: Looking at Us Today",
      summary:
        "Where your relationship is today — what you value about each other, your strengths as a couple, what being together has taught you and what you hope for the future.",
      estimatedMinutes: 45,
      blocks: [
        {
          kind: "video",
          title: "Looking at Us Today — Part 3",
          playbackId: "",
          durationSeconds: 540,
        },
        {
          kind: "prose",
          heading: "Bringing Your Story Up to Today",
          body: `So far, you have explored how your relationship began and some of the experiences that have shaped it along the way. Now we bring your relationship story right up to today.

Relationships change because people change. The person sitting beside you is not exactly the person you first met. And neither are you.`,
        },
        {
          kind: "iconCards",
          heading: "Who Your Partner Is to You Now",
          columns: 2,
          items: [
            { icon: "sparkles", title: "What do you admire about them?" },
            { icon: "hand-heart", title: "What are you grateful for?" },
            { icon: "users", title: "What strengths do you have as a couple?" },
            { icon: "lightbulb", title: "What has this relationship taught you about yourself?" },
          ],
        },
        {
          kind: "tapChoice",
          exerciseId: "part-3-where-we-are",
          title: "Wherever You Are Right Now",
          intro:
            "You might both feel your relationship is in a really good place. Or perhaps things are quite difficult at the moment.",
          questions: [
            {
              id: "where",
              text: "How does your relationship feel as you begin this part?",
              options: [
                {
                  value: "good",
                  label: "In a really good place",
                  response: "Then this is a chance to name what is working, so you can protect it as things continue to change.",
                },
                {
                  value: "mixed",
                  label: "Some good, some difficult",
                  response: "Most relationships hold both. You can be honest about the difficult parts and still notice what you value.",
                },
                {
                  value: "difficult",
                  label: "Quite difficult at the moment",
                  response: "That is okay. That is where you are right now. You do not have to force yourself to feel something you do not feel.",
                },
                {
                  value: "hard-to-find",
                  label: "I cannot think of much I admire right now",
                  response: "That is okay too. Maybe the only thing you can recognise is that you are both here, taking part in this programme. And that is a place to start.",
                },
              ],
            },
          ],
        },
        {
          kind: "callout",
          icon: "sprout",
          title: "Begin Where You Are",
          body: `This is the beginning, and you can meet this programme wherever you are in your relationship right now. There is no need to force a positive answer. Be honest about where you are.`,
        },
        {
          kind: "accordion",
          heading: "When You Come Back Together",
          intro: "Tap each to see what we will ask you to think about.",
          items: [
            {
              icon: "message-circle",
              title: "What it was like to talk about today",
              body: `How did it feel hearing what your partner admires and values about you? Was anything reassuring, emotional, difficult or unexpected to hear? And what was it like to say those things to each other?`,
            },
            {
              icon: "heart",
              title: "The strengths still present",
              body: `Even if things feel difficult right now, are there parts of your relationship you still value?

- Your friendship
- Your humour
- The way you support each other
- Your shared values
- The fact that you are both willing to be here`,
            },
            {
              icon: "route",
              title: "Your next chapter",
              body: `What would you like to take with you into the next chapter of your relationship? What would you like more of? Is there anything from the beginning or middle of your relationship you would like to rediscover? And perhaps most importantly, what do you hope you never lose?`,
            },
          ],
        },
        {
          kind: "quote",
          text: "Sometimes improving a relationship is not only about asking what needs to change. It is also about recognising what is already precious and making a conscious decision to nurture and protect it.",
          attribution: "Laura & Esther",
        },
        {
          kind: "pairedReflection",
          exerciseId: "part-3-looking-at-us-today",
          eyebrow: "Module 1 · Part 3",
          title: "Looking at Us Today",
          individual: {
            title: "Individual Reflection",
            intro:
              "Some of these questions may feel easier to answer than others, particularly if your relationship is going through a difficult time. There is no need to force a positive answer. Complete these four questions individually; as before, you choose which answers to share.",
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
              {
                id: "learned",
                label: "What has being in this relationship helped me learn about myself?",
                hint:
                  "Have I discovered anything about my needs, values, strengths or vulnerabilities? Has being with my partner helped me understand myself differently? Are there things I recognise about myself now that I did not understand earlier in our relationship?",
              },
            ],
          },
          together: {
            title: "Couple Conversation: Coming Back Together",
            intro:
              "Once you have both completed your Individual Reflections, come back together to share the answers you have chosen to share. Take turns speaking and listening. You do not need to agree on every detail; the aim is to understand each other's experiences with curiosity.",
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
                label: "What would we like to take into the next chapter of our relationship?",
                hint:
                  "What do we want to protect? What would we like more of? Is there something from the beginning or middle of our relationship that we would like to rediscover?",
              },
            ],
          },
          revealNote: REVEAL_NOTE,
          closing: {
            text: "You do not need to have all the answers or a big plan for what happens next. For now, simply begin thinking about what is important to each of you.",
          },
        },
      ],
    },
    {
      id: "relationship-check-in",
      title: "Part 4: Your Journal, Relationship Check-In and AI Reflections",
      summary:
        "Three tools you can return to throughout the programme: your personal journal, the three-question Relationship Check-In, and AI reflections.",
      estimatedMinutes: 25,
      blocks: [
        {
          kind: "video",
          title: "Your Journal, Check-In and AI Reflections — Part 4",
          playbackId: "",
          durationSeconds: 300,
        },
        {
          kind: "iconCards",
          heading: "Tools for the Whole Programme",
          intro:
            "Before you move on, we want to introduce a few things you will be able to use throughout the programme, to help you reflect on yourself, your partner and your relationship.",
          columns: 3,
          items: [
            { icon: "notebook-pen", title: "Your Personal Journal", body: "Your own space to explore what you are learning, feeling and noticing." },
            { icon: "messages-square", title: "Your Relationship Check-In", body: "Three simple questions that make time for regular conversations." },
            { icon: "sparkles", title: "Your AI Reflections", body: "Summaries and follow-up questions to help you notice themes." },
          ],
        },
        {
          kind: "iconCards",
          heading: "The Relationship Check-In",
          intro:
            "Relationships can change from day to day and week to week. We can also make assumptions about how our partner is feeling, or how our relationship is doing, without stopping to check. These three questions create a regular pause.",
          columns: 3,
          items: [
            { icon: "heart", title: "How am I?" },
            { icon: "eye", title: "How do I think you are?" },
            { icon: "users", title: "How do I think we are?" },
          ],
        },
        {
          kind: "accordion",
          heading: "Why Use This Check-In?",
          items: [
            { icon: "eye", title: "Builds self-awareness", body: "Helps you notice how you are feeling before focusing on your partner." },
            { icon: "search", title: "Encourages curiosity", body: "Helps you recognise that what you think your partner is feeling may not always match their experience." },
            { icon: "trending-up", title: "Helps identify patterns", body: "Repeated check-ins can highlight changes in connection, stress and relationship wellbeing over time." },
            { icon: "message-circle", title: "Supports communication", body: "Provides a simple starting point for conversations that might otherwise be difficult to begin." },
            { icon: "hand-heart", title: "Creates space for connection", body: "Helps you notice not only difficulties but also moments when things feel settled, close or positive." },
          ],
        },
        {
          kind: "flow",
          heading: "How to Use It",
          steps: [
            {
              icon: "messages-square",
              title: "Take turns sharing",
              body: "One of you answers all three questions while the other listens, without interrupting, correcting or trying to solve anything. Then swap roles.",
            },
            {
              icon: "search",
              title: "Listen with curiosity",
              body: "If your partner describes something differently from how you imagined, approach that difference with curiosity. You are not deciding whose experience is right or wrong.",
            },
            {
              icon: "lightbulb",
              title: "Reflect together",
              body: "Was anything surprising? Did we make assumptions about how the other was feeling? What did we learn? Is there anything either of us needs right now?",
            },
            {
              icon: "refresh-cw",
              title: "Return to it regularly",
              body: "Over time your answers may show changes, recurring patterns and moments when you feel more or less connected.",
            },
          ],
        },
        {
          kind: "callout",
          icon: "eye",
          title: "It Is Not a Trick Question",
          body: `When you are thinking about how your partner might be feeling, you are making a guess. It is okay if you do not quite hit the mark. You will not necessarily know how they are until you hear their perspective.

You do not need to solve anything or make immediate changes. Sometimes simply recognising how you are both feeling is enough.`,
        },
        {
          kind: "pairedReflection",
          exerciseId: "relationship-check-in",
          eyebrow: "Module 1 · Part 4",
          title: "How Am I? How Are You? How Are We?",
          intro:
            "You can record your answers here if you would find that helpful, or simply talk them through together.",
          individual: {
            title: "Your Check-In",
            intro:
              "Answer with what you genuinely notice, not what you think you should feel. Try not to overthink it; a number and a few words is plenty.",
            questions: [
              { id: "me", label: "How am I?", scale: { low: "Struggling", high: "Flourishing" } },
              { id: "you", label: "How do I think you are?", scale: { low: "Struggling", high: "Flourishing" } },
              { id: "us", label: "How do I think we are?", scale: { low: "Distant", high: "Connected" } },
            ],
          },
          together: {
            title: "Reflect Together",
            intro:
              "Once you have both shared, you might like to talk about these. The aim is not to judge how well your relationship is doing, but to develop greater awareness of yourselves and each other.",
            questions: [
              { id: "surprised", label: "Was there anything that surprised us?" },
              { id: "assumptions", label: "Did we make any assumptions about how the other person was feeling?" },
              { id: "learned", label: "What did we learn about ourselves or each other?" },
              { id: "needs", label: "Is there anything either of us needs right now?" },
            ],
          },
          compare: { me: "you", you: "me", us: "us" },
          revealNote:
            "Your “How do I think you are?” sits beside your partner's “How am I?” — a gentle check on the assumptions we make about each other.",
        },
        {
          kind: "sharedJournal",
          exerciseId: "personal-journal-module-1",
          title: "Your Personal Journal",
          intro:
            "Your journal is a space to reflect on what you are learning, how you are feeling and anything you notice about yourself or your relationship. It belongs to you: keep your reflections private, or choose to share particular entries with your partner. You can also keep a separate handwritten journal if you prefer. There is no right or wrong way to use it.",
          prompts: [
            "What have I learned about myself?",
            "What have I noticed about my partner?",
            "Has anything surprised me?",
            "What feelings have come up for me?",
            "Is there anything I would like to explore further?",
          ],
          partnerNote: "Your partner has chosen to share this journal entry with you.",
        },
        {
          kind: "contrast",
          heading: "Your AI Reflections",
          intro:
            "AI-generated summaries and follow-up questions can help you notice patterns, explore a feeling further or think about something from a different angle.",
          columns: [
            {
              label: "They are",
              icon: "sparkles",
              tone: "sage",
              items: ["Prompts for reflection", "Suggestions to encourage curiosity", "Drawn only from what you choose to make available"],
            },
            {
              label: "They are not",
              icon: "shield",
              items: ["Judgements about your relationship", "A verdict on who is right or wrong", "Advice or definitive interpretations"],
            },
          ],
          note: "Your individual reflections remain private unless you choose to share them.",
        },
        {
          kind: "callout",
          icon: "leaf",
          title: "That Is the End of Module 1",
          body: `You have looked back at where your relationship began, the experiences that have shaped it and where you find yourselves today. This is not about having a perfect relationship, agreeing on everything or pretending the difficult parts do not exist. It is about beginning to understand each other a little better.

You can return to these tools throughout the programme, and you do not need to use them perfectly. Next, in Module 2, we explore your nervous system and why we respond the way we do.`,
        },
      ],
    },
  ],
};
