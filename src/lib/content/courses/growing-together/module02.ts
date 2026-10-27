import type { CourseModule } from "../types";

/* Module 2 — Understanding Your Nervous System. Three parts: the three
   nervous system states and mapping your own; hierarchy, neuroception and
   co-regulation with the Breathing Together exercise; and a Regulation and
   Reconnection Plan. Copy is Laura and Esther's own (Module 2 scripts and
   reflection sheets, Parts 1–3), lightly edited to house style. */

const LADDER = [
  "Ventral: settled, safe and connected",
  "Sympathetic: activated, ready to fight or flee",
  "Dorsal: shut down, overwhelmed or disconnected",
];

const REGULATION_ACTIVITIES = [
  "Slow my breathing, with a longer exhale",
  "Remind myself of the date, where I am and that I am here now",
  "Splash cool water on my hands and face",
  "Take a shower",
  "Have a bath",
  "Get some fresh air",
  "Spend some time in nature",
  "Go for a walk",
  "Go for a run",
  "Exercise",
  "Shake out my hands and arms",
  "Put on some music and dance",
  "Yoga",
  "Rock gently",
  "Yawn, sigh or stretch",
  "Hum",
  "Sing",
  "Listen to calming music",
  "Reduce noise and stimulation",
  "Put my phone down for a while",
  "Delay important decisions until I feel more settled",
  "Remind myself, “I do not have to solve this right now”",
  "Remind myself, “My nervous system is reacting; I can give it time to settle”",
  "Name the state: “I am noticing I am becoming activated”",
  "Name the emotion: angry, scared, overwhelmed, hurt, disconnected, numb",
  "Lie down or sleep",
  "Sit somewhere quiet",
  "Make a cup of tea",
  "Hold or stroke a pet",
  "Ask for a hug",
  "Phone someone I feel safe with",
  "Watch something funny",
  "Look at photographs",
  "Use a scent I associate with comfort",
  "Listen to birds or other natural sounds",
  "Draw or colour",
  "Journal or write",
  "Cook",
  "Garden",
];

export const module02: CourseModule = {
  id: "nervous-system",
  number: 2,
  title: "Understanding Your Nervous System",
  lede: "Why we respond the way we do. Exploring your relationship through the lens of your nervous system, and what helps each of you find your way back to connection.",
  essence: "Not “Why am I reacting like this?” but “What is happening to my nervous system right now?”",
  lessons: [
    {
      id: "understanding-your-nervous-system",
      title: "Part 1: Understanding Your Nervous System",
      summary:
        "The three nervous system states, how your body responds before your mind makes sense of it, and how two nervous systems can set each other off. Then map your own.",
      estimatedMinutes: 50,
      blocks: [
        {
          kind: "video",
          title: "Understanding Your Nervous System — Part 1",
          playbackId: "",
          durationSeconds: 720,
        },
        {
          kind: "prose",
          heading: "Your Relationship Through the Lens of Your Nervous System",
          body: `In this module, you will explore how your nervous system may influence the way you feel, think and respond in your relationship.

Polyvagal Theory, developed by Dr Stephen Porges, gives us a way of understanding how our nervous system is constantly responding to information from within our body, the world around us and the people we are with. In other words, from inside, outside and in between.`,
        },
        {
          kind: "iconCards",
          heading: "Three Nervous System States",
          intro: "As information changes, we naturally move between these states throughout the day.",
          columns: 3,
          items: [
            { icon: "sun", title: "Ventral vagal", body: "Feeling more settled, safe and connected." },
            { icon: "zap", title: "Sympathetic", body: "Activated and ready to fight or flee. A survival state." },
            { icon: "battery-low", title: "Dorsal vagal", body: "Frozen, overwhelmed, shut down or disconnected. A survival state." },
          ],
        },
        {
          kind: "callout",
          icon: "book-open-text",
          title: "A Framework for Reflection",
          body: `Polyvagal Theory offers one way of understanding these states. We use it as a framework for reflection, and research into the theory is ongoing.`,
        },
        {
          kind: "flow",
          heading: "Your Body Responds Before Your Mind Catches Up",
          intro:
            "The priority of the nervous system is protection. Often it begins to respond before we have consciously worked out what is happening. Imagine your partner answers you with a certain tone of voice and a particular look on their face.",
          steps: [
            { icon: "activity", title: "Your nervous system detects it", body: "Even before you are cognitively aware of it." },
            { icon: "heart", title: "Your body responds", body: "Your heart beats faster. Your muscles may tense." },
            { icon: "flame", title: "Feelings arrive", body: "You may suddenly feel anxious, irritated or defensive." },
            { icon: "brain", title: "Your mind makes a story", body: "“They are annoyed with me.” “They do not care.” “I have done something wrong.”" },
            { icon: "refresh-cw", title: "You behave, and the cycle continues", body: "Your behaviour affects your partner's nervous system, and two nervous systems begin responding to each other." },
          ],
        },
        {
          kind: "contrast",
          heading: "A Different Question to Ask",
          intro:
            "Many of us believe our thoughts came first. But it is our nervous system, then our body, that has already started responding.",
          columns: [
            { label: "Rather than asking", icon: "search", items: ["Why am I reacting and behaving like this?"] },
            {
              label: "Become curious about",
              icon: "sparkles",
              tone: "sage",
              items: ["What is happening to my nervous system right now?", "What might be happening to my partner's?"],
            },
          ],
          note: "That curiosity can create a small amount of space before you jump to a negative conclusion. And that space can begin to change the way you relate to each other.",
        },
        {
          kind: "accordion",
          heading: "Getting to Know Each State",
          intro: "Tap each state to see how it might feel in your body, your thoughts and your relationship.",
          items: [
            {
              icon: "sun",
              title: "Ventral vagal: settled and connected",
              body: `The state in which we generally feel most settled, connected and able to engage with the world. It does not mean you are happy or relaxed all of the time. You can still feel sadness, disappointment or frustration while staying connected to yourself and others; you simply have enough capacity to manage what you are experiencing.

- In your body: steadier breathing, more relaxed muscles, a warmer facial expression, a greater sense of being present
- In your thoughts: “I can cope with this.” “I am okay.” “We can work this out.”
- In your feelings: calm, connected, curious, affectionate or playful
- In your relationship: connection is easiest. You are more able to listen, laugh together, compromise and stay curious about your partner's experience`,
            },
            {
              icon: "zap",
              title: "Sympathetic: fight or flight",
              body: `When your nervous system detects something it interprets as threatening, it mobilises energy to help you respond. Within relationships, feeling criticised, rejected or misunderstood can be enough. So can your partner's facial expression, tone of voice or silence.

- In your body: a faster heartbeat, tension in your chest or jaw, butterflies, restlessness
- In your feelings: anxiety, anger, fear or jealousy
- In your thoughts: “They do not care about me.” “Why are they not listening?” “I cannot cope with this.”

Fight is the urge to move towards the problem: arguing, raising your voice, criticising, repeatedly asking questions, or feeling desperate to resolve things immediately. Underneath may be: “I need you to understand me.” “I need to know we are okay.”

Flight is the urge to move away: leaving the room, avoiding the conversation, keeping busy or changing the subject. Underneath may be: “I need to get away from this.”

Both are your nervous system's attempts to protect you.`,
            },
            {
              icon: "battery-low",
              title: "Dorsal vagal: freeze and shutdown",
              body: `Sometimes something feels so overwhelming that fighting or escaping no longer feels possible. Rather than giving us more energy, the nervous system begins to conserve it.

- In your body: heavy limbs, low energy, slower movement, or feeling separate from your own body (dissociation)
- In your feelings: numb, exhausted, empty, hopeless, or simply going through the motions
- In your thoughts: “What is the point?” “Nothing is going to change.” “I cannot cope.”
- In your relationship: becoming very quiet, withdrawing, struggling to find words or emotionally disconnecting

To a partner this can look like “You do not care.” Internally it may be much closer to “This is too much for me right now.”`,
            },
          ],
        },
        {
          kind: "flipCards",
          heading: "What It Looks Like, and What It Can Feel Like Inside",
          intro: "Tap each card to turn it over.",
          items: [
            { frontLabel: "What a partner might see", front: "Raising your voice, asking question after question.", backLabel: "What it may feel like inside", back: "“I need to know we are okay.”" },
            { frontLabel: "What a partner might see", front: "Leaving the room or changing the subject.", backLabel: "What it may feel like inside", back: "“I need to get away from this.”" },
            { frontLabel: "What a partner might see", front: "Going quiet. Not finding any words.", backLabel: "What it may feel like inside", back: "“This is too much for me right now.”" },
          ],
        },
        {
          kind: "flow",
          heading: "When Two Nervous Systems Meet",
          intro: "One person's fight response can trigger another person's flight or shutdown response.",
          steps: [
            { icon: "zap", title: "One pursues", body: "The more one person pursues the conversation (fight)…" },
            { icon: "battery-low", title: "The other retreats", body: "…the more overwhelmed the other becomes, and they move into flight or shutdown." },
            { icon: "flame", title: "The first feels rejected", body: "The more the other withdraws, the more rejected and activated the first person feels." },
            { icon: "refresh-cw", title: "Both are reacting", body: "Before long, both are reacting to each other's nervous systems rather than responding to what each other actually needs." },
          ],
        },
        {
          kind: "callout",
          icon: "leaf",
          title: "These Responses Are Part of Being Human",
          body: `It is normal to sometimes feel anxious, angry, overwhelmed or to need to withdraw. These are signs that your nervous system is trying to protect you, and protection is its primary job.

What becomes more difficult is getting stuck in a survival state, reacting without understanding what is happening, or struggling to find your way back to each other. Recognising your states can help you notice what is happening earlier and give you more choice about what you do next.`,
        },
        {
          kind: "worksheet",
          exerciseId: "m2-map-my-nervous-system",
          title: "Map My Nervous System",
          intro:
            "Map out your own nervous system states: what triggers you into sympathetic or dorsal, and what helps you return to ventral. Complete this on your own first.",
          fields: [
            { id: "symp-triggers", section: "When I am in sympathetic (fight or flight)", type: "text", label: "What situations or events can trigger my nervous system into a fight or flight response?" },
            { id: "symp-noticed", type: "text", label: "What might my partner notice about me in this state?" },
            { id: "symp-worse", type: "text", label: "What tends to make this worse for me?" },
            { id: "symp-need", type: "text", label: "Underneath my behaviour, what I need from my partner to help me shift towards safety and connection is…" },
            { id: "symp-self", type: "text", label: "What I can do to help myself…" },
            { id: "dorsal-triggers", section: "When I am in dorsal (shutdown)", type: "text", label: "What situations or events can trigger my nervous system into shutdown?" },
            { id: "dorsal-noticed", type: "text", label: "What might my partner notice about me in this state?" },
            { id: "dorsal-worse", type: "text", label: "What tends to make this worse for me?" },
            { id: "dorsal-need", type: "text", label: "Underneath my behaviour, what I need from my partner to help me shift towards safety and connection is…" },
            { id: "dorsal-self", type: "text", label: "What I can do to help myself…" },
            { id: "ventral-helps", section: "When I am in ventral (safe and connected)", type: "text", label: "What situations or events help my nervous system stay in ventral, with a feeling of safety and connection?" },
            { id: "ventral-noticed", type: "text", label: "What might my partner notice about me in this state?" },
            { id: "ventral-connected", type: "text", label: "I feel most connected to my partner when…" },
            { id: "ventral-stay", type: "text", label: "Things that help me stay here are…" },
          ],
          coupleSection: {
            title: "Getting Curious About Your Partner's Nervous System",
            intro:
              "Ask your partner to go through their answers while you listen. Then ask them the questions below, and swap roles.",
            groundRules: [
              "Your job is not to correct your partner's map. Your job is to get curious.",
              "Listen first. Ask the questions only once your partner has finished sharing their map.",
            ],
            fields: [
              { id: "tell", label: "How can I tell when you are starting to become activated into fight, flight or shutdown?" },
              { id: "inside", label: "What happens inside you that I might not be able to see?" },
              { id: "close-or-space", label: "When you are activated or shut down, do you usually want closeness or space? Can it be different for each state?" },
              { id: "worse", label: "What do I sometimes do when you are activated or shut down that unintentionally makes things worse?" },
              { id: "ready", label: "How would I know you are ready to reconnect?" },
            ],
          },
          partnerNote: "Share your map with your partner so they can see it alongside theirs as you get curious together.",
        },
      ],
    },
    {
      id: "hierarchy-neuroception-co-regulation",
      title: "Part 2: The Ladder, Neuroception and Co-Regulation",
      summary:
        "Three ideas that help explain your responses: the nervous system ladder, the cues your body picks up from inside, outside and between, and how you can help settle each other.",
      estimatedMinutes: 35,
      blocks: [
        {
          kind: "video",
          title: "Understanding Your Nervous System — Part 2",
          playbackId: "",
          durationSeconds: 600,
        },
        {
          kind: "prose",
          heading: "Going a Little Deeper",
          body: `Now that you know more about your three nervous system states, and have started to map your own and your partner's, we are going to go a little deeper.

Polyvagal Theory includes three useful concepts: hierarchy, neuroception and co-regulation. You do not need to remember the terminology. What matters is what these ideas can tell you about yourself, your partner and your relationship.`,
        },
        {
          kind: "flow",
          heading: "Hierarchy: The Nervous System Ladder",
          intro: "One way to imagine your nervous system is as a ladder.",
          steps: [
            { icon: "sun", title: "Top: ventral", body: "Greater access to connection, curiosity and flexible thinking." },
            { icon: "zap", title: "Middle: sympathetic", body: "If your nervous system detects enough threat, your body mobilises energy to protect you." },
            { icon: "battery-low", title: "Bottom: dorsal", body: "If that feels overwhelming or just too much, you may move further down towards shutdown or disconnection." },
          ],
        },
        {
          kind: "callout",
          icon: "arrow-up-down",
          title: "Where Am I on My Ladder Right Now?",
          body: `We move up and down this ladder many times in a single day, and the changes do not always follow a fixed order. The goal is not to stay in ventral all of the time. A flexible nervous system can move into activation when it needs to, then find its way back towards connection when the threat has passed.

That is why one of the most useful questions you can learn to ask is: “Where am I on my nervous system ladder right now?”`,
        },
        {
          kind: "iconCards",
          heading: "Neuroception: How Your Nervous System Detects Cues",
          intro:
            "Your nervous system is constantly looking for cues of safety and threat, often outside your conscious awareness. These cues come from three places.",
          columns: 3,
          items: [
            { icon: "heart", title: "Inside", body: "What is happening within your body. Perhaps you are tired, in pain, hungry or already stressed." },
            { icon: "house", title: "Outside", body: "What is happening around you. Somewhere noisy or unfamiliar, or too many demands competing for your attention." },
            { icon: "users", title: "Between", body: "What you pick up from another person. Tone of voice, facial expression, silence, body language." },
          ],
        },
        {
          kind: "flipCards",
          heading: "Why “Between” Matters So Much",
          intro: "Tap the card.",
          items: [
            {
              frontLabel: "What you consciously hear",
              front: "“I am fine.”",
              backLabel: "What your nervous system may notice first",
              back: "A facial expression, tone of voice or body language that communicates something very different.",
            },
          ],
        },
        {
          kind: "accordion",
          heading: "Co-Regulation",
          intro: "Regulation is having the flexibility to move through these states and, when needed, find your way back towards feeling settled, connected and able to respond rather than simply react.",
          items: [
            {
              icon: "footprints",
              title: "Helping ourselves",
              body: `Sometimes we can help ourselves regulate. We might go for a walk, slow our breathing, exercise, listen to music, spend some time alone or do something that helps us feel grounded. Think back to your map in Part 1 and what you noted helps you move between states.`,
            },
            {
              icon: "hand-heart",
              title: "Helping each other",
              body: `We do not regulate entirely on our own. From the beginning of our lives, we rely on other people to soothe and respond to us, and even as adults our nervous systems continue to influence one another.

A calm voice, a warm facial expression, reassuring touch, someone listening without judgement, or simply knowing someone is there with us can help our nervous system settle. This is co-regulation, and within a relationship your partner can be an important source of it.`,
            },
            {
              icon: "anchor",
              title: "Support, not responsibility",
              body: `There is an important difference between allowing your partner to support you with regulation and expecting your partner to regulate your nervous system for you.

Part of developing healthy regulation is learning what you can do for yourself, what your partner can do to support you, and what you can do together to help each other reconnect.`,
            },
          ],
        },
        {
          kind: "flow",
          heading: "Breathing Together: A Co-Regulation Exercise",
          intro: "Take a break to try this together. Before you start, notice how you are feeling and where you are on your ladder (you can record it below).",
          steps: [
            {
              icon: "users",
              title: "Sit opposite each other",
              body: "Close enough to reach one another without straining. If it feels comfortable for both of you, gently place one hand on your partner's chest, around their heart, and let them do the same.",
            },
            {
              icon: "eye",
              title: "Choose where to look",
              body: "Look at each other, soften your gaze, or close your eyes. Whatever feels most comfortable.",
            },
            {
              icon: "wind",
              title: "Slow your breathing",
              body: "Breathe in gently for 6 seconds, and out slowly for 8. Repeat together for about 10 breaths. If that count feels uncomfortable, shorten it: slow and comfortable matters more than the numbers.",
            },
            {
              icon: "heart",
              title: "Simply notice",
              body: "Do not worry about breathing perfectly in time. Notice your partner's presence, the warmth of their hand and the rhythm of your own breath.",
            },
          ],
        },
        {
          kind: "callout",
          icon: "smile",
          title: "It May Feel a Little Strange at First",
          body: `You might laugh. You might feel self-conscious, or struggle to make eye contact. You might find yourself thinking, “This feels a bit awkward.” That is okay. Try not to judge the experience too quickly.`,
        },
        {
          kind: "worksheet",
          exerciseId: "m2-breathing-together",
          title: "Breathing Together",
          intro: "Record where you are on your ladder before and after the exercise.",
          fields: [
            { id: "before", section: "Before you start", type: "scale", label: "Where am I on my nervous system ladder right now?", options: LADDER },
            { id: "before-feeling", type: "text", label: "How am I feeling right now?" },
            { id: "after", section: "After the exercise", type: "scale", label: "Where am I on my nervous system ladder now?", options: LADDER },
            { id: "after-feeling", type: "text", label: "How am I feeling now? What did I notice?" },
          ],
          partnerNote: "Share your before and after with your partner.",
        },
      ],
    },
    {
      id: "regulation-and-reconnection-plan",
      title: "Part 3: Your Regulation and Reconnection Plan",
      summary:
        "What helps you feel more settled and connected, individually and together, in fight or flight and in shutdown. Build your own plan as a couple.",
      estimatedMinutes: 35,
      blocks: [
        {
          kind: "video",
          title: "Your Regulation and Reconnection Plan — Part 3",
          playbackId: "",
          durationSeconds: 180,
        },
        {
          kind: "prose",
          heading: "What Actually Helps",
          body: `Now that you understand more about your nervous system, the next step is to explore what helps you self-regulate and, as a couple, co-regulate. Different nervous system states may need different things, and what works for you may be very different from what works for your partner.`,
        },
        {
          kind: "contrast",
          heading: "Different States, Different Support",
          columns: [
            {
              label: "In fight or flight",
              icon: "zap",
              items: [
                "Your body has mobilised energy",
                "Movement or a walk",
                "Music or fresh air",
                "Time away from a difficult conversation",
              ],
            },
            {
              label: "In shutdown",
              icon: "battery-low",
              tone: "sage",
              items: [
                "You may already feel slow or disconnected, so becoming calmer may not be what you need",
                "Gentle movement or fresh air",
                "A shower, something to eat or drink",
                "Connecting with someone",
              ],
            },
          ],
        },
        {
          kind: "iconCards",
          heading: "Building a Shared Understanding",
          intro:
            "First think about what helps each of you individually, in fight or flight and in shutdown. Then think about what helps you as a couple: taking a break and agreeing when you will come back together, going for a walk, physical affection, humour, sitting quietly together or simply offering reassurance.",
          columns: 3,
          items: [
            { icon: "footprints", title: "What I can do to help myself" },
            { icon: "hand-heart", title: "What my partner can do to help me" },
            { icon: "heart-handshake", title: "What helps us find our way back to connection" },
          ],
        },
        {
          kind: "worksheet",
          exerciseId: "m2-regulation-reconnection-plan",
          title: "Our Regulation and Reconnection Plan",
          intro:
            "Choose from the suggested activities, or add your own in your own words. Complete it on your own first, then share it so you can build your plan together.",
          fields: [
            { id: "symp-self-list", section: "In sympathetic fight or flight", type: "choices", label: "When I notice I am becoming activated, I can…", options: REGULATION_ACTIVITIES },
            { id: "symp-self", type: "text", label: "Anything else I can do, in my own words" },
            { id: "symp-partner", type: "text", label: "When you notice I am becoming activated, it may help if you…" },
            { id: "symp-together", type: "text", label: "What activities help us co-regulate or bring us back to connection?" },
            { id: "dorsal-self-list", section: "In dorsal shutdown", type: "choices", label: "When I notice I am shutting down, I can…", options: REGULATION_ACTIVITIES },
            { id: "dorsal-self", type: "text", label: "Anything else I can do, in my own words" },
            { id: "dorsal-partner", type: "text", label: "When you notice I am shutting down, it may help if you…" },
            { id: "dorsal-together", type: "text", label: "What activities help us co-regulate or bring us back to connection?" },
          ],
          partnerNote: "Share your plan so you can each see what helps the other.",
        },
        {
          kind: "callout",
          icon: "leaf",
          title: "That Is the End of Module 2",
          body: `Keep your plan somewhere you can both find it. You can return to it, and change it, as you learn more about what helps each of you. Next, in Module 3, we explore attachment.`,
        },
      ],
    },
  ],
};
