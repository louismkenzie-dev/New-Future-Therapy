import type { CourseModule } from "../types";

/* Module 5 — Sex and Intimacy. Seven parts, each opening with Laura and
   Esther's video, then the teaching broken into small screens, then the
   activity. Copy is the therapists' own: the Module 5 "Written Version"
   documents (Parts 1–7) are the primary wording of the teaching screens,
   the Activity documents (1–6) supply the interactive blocks, and the
   video scripts (1–7) fill small gaps (for example the mind/body
   definitions of desire and arousal in Part 4) and set the video lengths
   (about 120 spoken words per minute). There is no Activity 7: Part 7's
   activity is built from the closing question in Written Version 7, and
   Activity 6 (the "final" reflection) sits in Part 6 as its numbering
   says. Lightly edited to house style: British English, no contractions,
   "your partner" and "they" throughout. Educational, warm and
   non-explicit; choice and consent run through every part. */

const SPEAKER_LISTENER_STEPS = [
  "Take turns speaking and listening, using the Speaker–Listener Technique from Module 4.",
  "Listen to understand, without interrupting, defending or trying to solve anything. Reflect back what you heard.",
  "Share only what you choose. Then answer the together questions as one.",
];

export const module05: CourseModule = {
  id: "sex-and-intimacy",
  number: 5,
  title: "Sex and Intimacy",
  lede: "Your beliefs, your body, your history and the circumstances of your everyday life all influence how you experience desire, pleasure and intimacy. This module is about understanding how desire works, communicating more openly and making choices together that feel right for both of you.",
  essence: "Sexual intimacy is something we share by choice, not something we owe each other.",
  lessons: [
    /* ---------------------------------------------------------------- 1 */
    {
      id: "intimacy-part-1",
      title: "Part 1: Understanding Your Sexual Beliefs and Expectations",
      summary:
        "Where our beliefs about sex and intimacy come from, Emily Nagoski's garden metaphor and the sexual scripts we each bring into a relationship. Then reflect on your own sexual messages, and share only what you choose.",
      estimatedMinutes: 30,
      blocks: [
        {
          kind: "video",
          title: "Understanding Your Sexual Beliefs and Expectations — Part 1",
          playbackId: "",
          durationSeconds: 310,
        },
        {
          kind: "prose",
          heading: "Before We Begin",
          body: `Before exploring what happens between you and your partner when it comes to intimacy, it is important to understand what each of you brings into those experiences.

Your beliefs, your body, your personal history and the circumstances of your everyday life can all influence how you experience desire, pleasure and sexual intimacy.`,
        },
        {
          kind: "contrast",
          heading: "What This Module Is About",
          columns: [
            {
              label: "It is not about",
              icon: "search",
              items: [
                "Discovering what is considered ‘normal’",
                "Learning how to make your partner want more intimacy",
              ],
            },
            {
              label: "It is about",
              icon: "heart-handshake",
              tone: "sage",
              items: [
                "Developing a better understanding of how desire and pleasure work",
                "Learning to communicate more openly",
                "Making choices together that feel right for both of you",
              ],
            },
          ],
        },
        {
          kind: "callout",
          icon: "shield-check",
          tone: "dark",
          title: "Shared by Choice, Not Owed",
          body: `One important principle will guide us throughout this module: sexual intimacy is something we share by choice, not something we owe each other.

Both partners need to feel free to say yes, no, not now or “I would like to stop”, without pressure, guilt or unwanted consequences.`,
        },
        {
          kind: "callout",
          icon: "lock",
          title: "You Choose What to Explore",
          body: `Some of the activities in this module may bring up sensitive feelings, memories or experiences.

You are encouraged to choose what you wish to explore privately, what you feel comfortable sharing with your partner and what you would prefer to leave out altogether.`,
        },
        {
          kind: "prose",
          heading: "Where Do Our Beliefs About Sex and Intimacy Come From?",
          body: `Our relationship with sex and intimacy begins developing long before we meet our partner.

From childhood onwards, we absorb messages about affection, bodies, relationships, pleasure and what is considered acceptable. We learn what can be spoken about openly, what should remain private, whose pleasure matters and what a sexual relationship is supposed to look like.`,
        },
        {
          kind: "iconCards",
          heading: "Where the Messages Come From",
          intro: "These messages come from many different places, including:",
          columns: 3,
          items: [
            { icon: "house", title: "Our families" },
            { icon: "users", title: "Friendships" },
            { icon: "book-open-text", title: "Education" },
            { icon: "compass", title: "Religion" },
            { icon: "globe", title: "Culture" },
            { icon: "tv", title: "The media" },
          ],
        },
        {
          kind: "callout",
          icon: "pen-line",
          title: "Our Sexual Scripts",
          body: `Over time, these messages contribute to what we call our sexual scripts: the beliefs, expectations and assumptions we develop about how sex and intimacy should work.

We may not even realise we hold these beliefs until something in our relationship challenges them.`,
        },
        {
          kind: "flow",
          heading: "Emily Nagoski's Garden Metaphor",
          intro:
            "Sex educator and researcher Emily Nagoski uses the metaphor of a garden to help explain how our beliefs about sexuality develop.",
          steps: [
            {
              icon: "sprout",
              title: "Your own plot of soil",
              body: "Imagine that when you are born, you are given your own little plot of soil. During childhood, you have very little control over what gets planted in that garden.",
            },
            {
              icon: "users",
              title: "Others plant the seeds",
              body: "The people and environments around you begin planting seeds: messages about your body, relationships, intimacy, desire and pleasure.",
            },
            {
              icon: "tree-deciduous",
              title: "Some seeds support you",
              body: "Some of these seeds grow into healthy beliefs that support confidence, connection and a positive relationship with your sexuality.",
            },
            {
              icon: "leaf",
              title: "Some no longer fit",
              body: "Others may develop into beliefs that create shame, pressure, fear or expectations that no longer fit who you are.",
            },
            {
              icon: "hand-heart",
              title: "You become the gardener",
              body: "As we grow older, we begin to recognise that the garden belongs to us. We can choose which beliefs to keep nurturing, which are no longer helpful and what new beliefs we would like to cultivate.",
            },
          ],
        },
        {
          kind: "prose",
          body: `For example, we might begin to challenge the belief that sex should always happen spontaneously, that we should always be available to our partner or that pleasure must look a particular way.

Instead, we can develop beliefs that support choice, confidence, safety, communication and mutual enjoyment.`,
        },
        {
          kind: "quote",
          text: "Just because a belief was planted in your garden does not mean it has to stay there.",
        },
        {
          kind: "prose",
          heading: "How Our Sexual Scripts Affect Relationships",
          body: `Consider some of the messages you may have grown up hearing:

- “Men always want sex.”
- “Women should not openly express sexual desire.”
- “Sex is a duty within a relationship.”
- “Penetration and orgasm define successful sex.”
- “Talking about sexual pleasure is embarrassing or inappropriate.”
- “A loving partner should automatically know what you enjoy.”

You may also have received positive messages about consent, bodies, pleasure and healthy relationships. Whether helpful or unhelpful, these beliefs can follow us into adulthood without us consciously recognising their influence.`,
        },
        {
          kind: "flipCards",
          heading: "How a Belief Can Follow Us",
          intro: "Tap each card to turn it over.",
          items: [
            {
              frontLabel: "A belief",
              front: "Sex is embarrassing or shameful.",
              backLabel: "How it can show up",
              back: "Someone who grew up believing this may find it difficult to communicate what they enjoy.",
            },
            {
              frontLabel: "A belief",
              front: "Refusing sex will hurt my partner.",
              backLabel: "How it can show up",
              back: "Someone who believes this may struggle to express boundaries or say no.",
            },
            {
              frontLabel: "A belief",
              front: "If my partner does not want sex, I am no longer loved.",
              backLabel: "How it can show up",
              back: "Another person may believe that their partner's lack of desire means they are no longer loved or attractive.",
            },
          ],
        },
        {
          kind: "prose",
          heading: "Two Different Sexual Scripts",
          body: `When two people enter a relationship, they bring two different sexual scripts, shaped by their individual experiences.

What feels natural, comfortable or enjoyable to one person may feel unfamiliar or uncomfortable to the other. Neither partner necessarily has the same expectations, preferences or understanding of intimacy.

Recognising these differences can help couples move away from assumptions and towards greater curiosity and understanding.`,
        },
        {
          kind: "contrast",
          columns: [
            {
              label: "Rather than asking",
              icon: "search",
              items: ["Who is right or wrong?"],
            },
            {
              label: "We can begin exploring",
              icon: "users",
              tone: "sage",
              items: ["How our individual experiences have shaped what we each believe"],
            },
          ],
        },
        {
          kind: "callout",
          icon: "sprout",
          title: "Becoming the Gardener",
          body: `The garden metaphor reminds us that our beliefs about intimacy are not fixed. We can question what we have inherited and make conscious choices about what we want to carry forward into our relationships.

As you move through this module, we encourage you to approach your own beliefs and your partner's beliefs with curiosity rather than judgement. You do not need to agree about everything, and you do not need to change your preferences to match your partner's.

The aim is to understand yourselves and each other more fully, so that intimacy can become something you communicate about and choose together.`,
        },
        {
          kind: "accordion",
          heading: "A Moment for Reflection",
          intro:
            "Before moving on, consider these three questions. You do not need to answer them immediately. As you continue through this module, notice which beliefs you may want to nurture and which you may be ready to reconsider.",
          items: [
            {
              icon: "lightbulb",
              title: "Is this belief helpful?",
              body: "Does it support my wellbeing and my relationship, or does it create pressure, shame or unrealistic expectations?",
            },
            {
              icon: "compass",
              title: "Does this belief reflect my values?",
              body: "Is it something I genuinely believe today, or something I learnt growing up and have never questioned?",
            },
            {
              icon: "heart-handshake",
              title: "Does this belief support a sexual relationship that feels respectful and enjoyable?",
              body: "Does it allow space for my needs, my partner's needs, consent, pleasure and individual differences?",
            },
          ],
        },
        {
          kind: "pairedReflection",
          exerciseId: "m5-my-sexual-messages",
          eyebrow: "Module 5 · Part 1",
          title: "My Sexual Messages",
          intro:
            "Complete these questions separately. Share only what you choose. You can leave out anything you would prefer not to explore.",
          individual: {
            title: "Individual Reflection",
            intro: "Answer these on your own first, then come back together to reflect.",
            questions: [
              { id: "first-things", label: "What were the first things I learnt about sex, pleasure and my body?" },
              { id: "affection", label: "What did I learn growing up about affection?" },
              { id: "pleasure", label: "What did I learn growing up about sexual pleasure?" },
              { id: "initiate", label: "What did I learn growing up about who should initiate sex?" },
              { id: "helped", label: "Which messages have helped me?" },
              { id: "shame", label: "Which messages have created shame, pressure or uncertainty?" },
              {
                id: "replace",
                label: "Is there one belief I would like to replace?",
                hint: "For example: “If my partner loves me, they should always want sex.”",
              },
            ],
          },
          together: {
            title: "Couple Conversation",
            intro: "Come back together to reflect.",
            steps: SPEAKER_LISTENER_STEPS,
            questions: [
              {
                id: "background",
                label: "What did we each learn about the other's background that helps us understand each other better?",
                hint: "Each of you answers in turn.",
              },
              {
                id: "unhelpful-expectation",
                label: "Is there an unhelpful sexual expectation we have each been carrying?",
                hint: "Each of you answers in turn.",
              },
              {
                id: "moving-forward",
                label: "How would we like those sexual expectations to be different moving forward?",
              },
            ],
          },
          revealNote:
            "Approach your own beliefs and your partner's beliefs with curiosity rather than judgement. You do not need to agree about everything.",
          closing: {
            text: "Understanding where our beliefs come from gives us the opportunity to decide what we want to grow next.",
          },
        },
        {
          kind: "callout",
          icon: "route",
          title: "Next: Accelerators and Brakes",
          body: `In Part 2, we look at what sexual desire actually is, and at the accelerators and brakes that influence it.`,
        },
      ],
    },

    /* ---------------------------------------------------------------- 2 */
    {
      id: "intimacy-part-2",
      title: "Part 2: Understanding Sexual Desire: Accelerators and Brakes",
      summary:
        "Desire as an incentive motivation system rather than a drive, and the Dual Control Model of accelerators and brakes. Then map your own accelerators and brakes, and talk about what you did not know.",
      estimatedMinutes: 25,
      blocks: [
        {
          kind: "video",
          title: "Accelerators and Brakes — Part 2",
          playbackId: "",
          durationSeconds: 215,
        },
        {
          kind: "prose",
          heading: "What Is Sexual Desire?",
          body: `As we explored in Part 1, the messages we receive throughout our lives can shape our beliefs and expectations about sex and intimacy. But our experiences also influence what we find sexually appealing and how we respond to opportunities for intimacy.

We often hear people talk about having a sex drive, as though sex is a biological necessity, similar to food or water. However, unlike food and water, we do not need sex to survive.

Sex educator and researcher Emily Nagoski describes sexual desire as an incentive motivation system, rather than a biological drive. In simple terms, sexual desire can emerge when our brain recognises something as sexually relevant, rewarding or appealing.`,
        },
        {
          kind: "callout",
          icon: "coffee",
          title: "Walking Past a Bakery",
          body: `Imagine walking past a bakery. You were not particularly thinking about eating, but suddenly you smell freshly baked bread. That smell catches your attention, and you might find yourself wanting something to eat.

Sexual desire does not work exactly like hunger, but this analogy helps us understand how something appealing can create motivation, even when we were not previously thinking about it.`,
        },
        {
          kind: "prose",
          heading: "Desire Is Not Fixed",
          body: `What feels sexually appealing is different for everyone. Something that encourages desire one day might have very little effect another day.

This is because sexual desire is not simply something we either have or do not have. It is influenced by our bodies, emotions, experiences, relationships and the circumstances around us.

Rather than focusing only on how much desire we experience, it can be more helpful to explore what encourages desire and what might be getting in the way.`,
        },
        {
          kind: "contrast",
          heading: "Your Sexual Accelerator and Brakes",
          intro:
            "Emily Nagoski explains this through the Dual Control Model of Sexual Response, originally developed by researchers John Bancroft and Erick Janssen. Imagine your sexual response works a little like a car, with an accelerator and brakes.",
          columns: [
            {
              label: "Your accelerator responds to things your brain recognises as sexually appealing, such as",
              icon: "zap",
              tone: "sage",
              items: [
                "Flirting or playful conversation",
                "Feeling wanted or desired",
                "Kissing and affectionate touch",
                "Emotional closeness and connection",
                "Anticipation or excitement",
                "Novelty and shared experiences",
                "A particular kind of touch or sexual stimulation",
              ],
            },
            {
              label: "Your brakes respond to things that make intimacy feel less appealing, uncomfortable, unsafe or inappropriate, such as",
              icon: "pause-circle",
              items: [
                "Stress, tiredness or feeling overwhelmed",
                "Physical discomfort or pain",
                "Distractions or worries",
                "Unresolved conflict or emotional distance",
                "Body-image concerns",
                "Feeling rushed or pressured",
                "Worrying about being overheard or interrupted",
                "Feeling hungry, uncomfortable or too full",
                "Concern that affection will create an expectation of sex",
              ],
            },
          ],
          note: "Some accelerators are directly sexual, while others create circumstances where intimacy feels more appealing.",
        },
        {
          kind: "callout",
          icon: "arrow-up-down",
          title: "Both Can Be Active at the Same Time",
          body: `For example, you might enjoy kissing your partner and feel emotionally close to them, but still not want sexual intimacy because you are exhausted or worried about something happening the next day.

Enjoying affection does not automatically mean wanting sex.`,
        },
        {
          kind: "flipCards",
          heading: "Why Understanding Your Brakes Matters",
          intro: "Tap each card to turn it over.",
          items: [
            {
              frontLabel: "What we often assume",
              front: "When desire feels low, we often assume we need to do more to create excitement: more romance, more flirting or more opportunities for intimacy. And sometimes those things can help.",
              backLabel: "But",
              back: "Imagine trying to drive a car while keeping your foot firmly on the brake. Pressing harder on the accelerator is not necessarily going to get you moving. Trying harder can sometimes increase the pressure someone is already experiencing.",
            },
            {
              frontLabel: "Rather than only asking",
              front: "“How can I increase my desire?”",
              backLabel: "It may be more helpful to ask",
              back: "“What might be making intimacy difficult or unappealing for me right now?”",
            },
          ],
        },
        {
          kind: "prose",
          body: `If someone is experiencing stress, discomfort, pressure or emotional disconnection, adding more sexual stimulation may not make intimacy feel appealing.

Sometimes the answer to that question is practical, such as needing more rest, privacy or time. Sometimes it is emotional, physical or connected to the relationship.`,
        },
        {
          kind: "callout",
          icon: "shield-check",
          title: "Sometimes You Simply Do Not Want Sex",
          body: `That is also a valid experience and does not necessarily mean something is wrong. That choice needs to be respected.`,
        },
        {
          kind: "tapChoice",
          exerciseId: "m5-when-desire-feels-low",
          title: "When Desire Feels Low",
          intro: "There are no right answers here, just a moment of noticing.",
          questions: [
            {
              id: "first-reach",
              text: "When desire feels low, what do you or your partner tend to reach for first?",
              options: [
                {
                  value: "accelerator",
                  label: "Trying harder on the accelerator",
                  response:
                    "Many of us do, and sometimes it helps. But if the brakes remain active, no amount of acceleration is going to help. It may be worth asking what is making intimacy difficult right now.",
                },
                {
                  value: "brakes",
                  label: "Looking at what might be getting in the way",
                  response:
                    "That is often the more useful question. The answer might be practical, such as more rest, privacy or time, or it might be emotional, physical or connected to the relationship.",
                },
                {
                  value: "avoid",
                  label: "Not talking about it at all",
                  response:
                    "That is very common. Understanding your accelerators and brakes can give you both a gentler way to begin talking, without assumptions about why desire may be different between you.",
                },
                {
                  value: "unsure",
                  label: "I am not sure yet",
                  response:
                    "That is fine. Simply noticing what influences your desire is a useful starting point.",
                },
              ],
            },
          ],
        },
        {
          kind: "prose",
          heading: "Understanding Your Own Sexual Response",
          body: `Everyone has an accelerator and brakes, but we do not all respond to the same things. Something that encourages desire for one person might have no effect on another. And something that activates your brakes may not affect your partner in the same way.

This does not mean either of you is right or wrong. It means you have different experiences, preferences and circumstances that influence your sexual response.

Understanding these differences can help you communicate more openly, recognise what supports intimacy and reduce assumptions about why desire may be different between you.`,
        },
        {
          kind: "callout",
          icon: "leaf",
          title: "The Aim",
          body: `The aim is not to remove every brake or make yourself want sex. It is to understand your own experience and recognise the conditions in which intimacy feels comfortable, appealing and freely chosen.`,
        },
        {
          kind: "worksheet",
          exerciseId: "m5-accelerators-and-brakes",
          title: "My Accelerators and Brakes",
          intro:
            "Think about your own experience rather than what you believe should work. You do not need to change anything at this stage. Simply noticing what influences your desire is a useful starting point.",
          fields: [
            {
              id: "accelerators",
              section: "Individual Exercise",
              type: "text",
              label: "My accelerators: things that can make intimacy appealing",
              hint: "Write down up to five examples. Think about the experiences, interactions or circumstances that make intimacy feel appealing.",
            },
            {
              id: "brakes",
              type: "text",
              label: "My brakes: things that can make intimacy less appealing",
              hint: "Write down up to five examples. Consider anything physical, emotional, practical or relational.",
            },
            {
              id: "changes",
              type: "text",
              label: "What have I noticed about how my desire changes?",
              hint: "Are there times when intimacy feels more appealing, and other times when it does not? What might be different?",
            },
            { id: "surprised", type: "text", label: "Which of these surprised me?" },
            { id: "my-influence", type: "text", label: "Which are within my influence to change?" },
            {
              id: "support",
              type: "text",
              label: "Which might need support from my partner or a deeper conversation?",
            },
          ],
          coupleSection: {
            title: "Couple Conversation: What We Did Not Know",
            intro: "Share two or three things from your lists.",
            groundRules: [
              "Share two or three things from your lists, and only what you choose.",
              "Listen without judgement about whether your partner should or should not feel that way.",
              "Remember that neither of you is right or wrong.",
            ],
            fields: [
              {
                id: "open-to-intimacy",
                label: "What did we each learn about the other that may help them feel open to intimacy?",
              },
              {
                id: "misunderstood-brake",
                label: "Is there a brake either of us may have misunderstood or unintentionally contributed to?",
              },
              {
                id: "understood",
                label: "What helps each of us feel understood and supported when our experiences of sexual desire are different?",
              },
            ],
          },
          partnerNote:
            "Share your accelerators and brakes with your partner before your couple conversation, if you choose to. Listen to theirs without judgement.",
        },
        {
          kind: "callout",
          icon: "route",
          title: "Remember",
          body: `Understanding sexual desire is not about making yourself or your partner want more sex. It is about recognising what supports desire, what gets in the way and how to create space for intimacy that feels right for you.

Next, in Part 3, we look at why your accelerators and brakes may respond differently from one day to the next.`,
        },
      ],
    },

    /* ---------------------------------------------------------------- 3 */
    {
      id: "intimacy-part-3",
      title: "Part 3: Understanding How Context Influences Sexual Desire",
      summary:
        "Why the same touch can feel completely different from one day to the next, how your nervous system and life stage shape desire, and why two partners may need different circumstances. Then map your own context and choose one small change.",
      estimatedMinutes: 25,
      blocks: [
        {
          kind: "video",
          title: "How Context Influences Desire — Part 3",
          playbackId: "",
          durationSeconds: 150,
        },
        {
          kind: "prose",
          heading: "Why Context Matters",
          body: `Now that you have explored your sexual accelerators and brakes, it is helpful to understand why they may respond differently from one day to the next. One of the most important influences on sexual desire is context.

Sexual desire does not happen in isolation. Our brains are constantly responding to what is happening in our bodies, minds, relationships and everyday lives. This means something that feels sexually appealing in one situation might feel uncomfortable or unappealing in another.`,
        },
        {
          kind: "flipCards",
          heading: "Same Touch, Different Experience",
          intro: "Tap the card to turn it over.",
          items: [
            {
              frontLabel: "A difficult day",
              front: "You are exhausted, thinking about everything you need to do tomorrow and still feeling hurt after an argument with your partner. Your partner comes over and kisses your neck. Usually, you enjoy this kind of affection. But tonight, the same touch feels irritating or unwelcome.",
              backLabel: "A different day",
              back: "You have had time to relax, enjoyed spending time together and feel emotionally connected. Your partner gives you exactly the same kiss. This time, it might feel enjoyable, comforting or inviting.",
            },
          ],
        },
        {
          kind: "callout",
          icon: "refresh-cw",
          title: "The Touch Has Not Changed. The Context Has.",
          body: `This helps us understand why sexual desire is not always predictable, and why something that encouraged desire yesterday might not have the same effect today.`,
        },
        {
          kind: "contrast",
          heading: "What Do We Mean by Context?",
          intro: "Context includes both external circumstances and our internal experiences.",
          columns: [
            {
              label: "External context: what is happening around us",
              icon: "house",
              items: [
                "Having enough time without feeling rushed",
                "Privacy and the possibility of being interrupted",
                "Work pressures and everyday responsibilities",
                "Parenting and caring commitments",
                "The environment around us",
                "Opportunities to relax and spend time together",
              ],
            },
            {
              label: "Internal context: what is happening within us",
              icon: "brain",
              tone: "sage",
              items: [
                "Stress, anxiety or feeling overwhelmed",
                "Feeling emotionally connected or disconnected",
                "Body-image concerns",
                "Physical discomfort, pain or tiredness",
                "Fear of disappointing a partner",
                "Previous experiences or memories",
                "Feeling pressured or obligated",
                "Our current emotional and nervous system state",
              ],
            },
          ],
          note: "Both internal and external factors can influence whether intimacy feels appealing, comfortable or enjoyable.",
        },
        {
          kind: "flow",
          heading: "Connecting Context to Your Nervous System",
          intro:
            "Earlier in the programme, you explored your nervous system using the Polyvagal Ladder. You learnt how your nervous system responds to experiences of safety, stress and overwhelm. These responses can also influence sexual intimacy.",
          steps: [
            {
              icon: "sun",
              title: "Settled and connected",
              body: "When we feel settled, comfortable and connected, we may find it easier to relax, enjoy affection and respond to sexual experiences.",
            },
            {
              icon: "zap",
              title: "Anxious or on high alert",
              body: "When we are feeling anxious, overwhelmed or on high alert, our attention may be focused on managing stress rather than experiencing pleasure.",
            },
            {
              icon: "snowflake",
              title: "Shut down or exhausted",
              body: "When we are feeling shut down, exhausted or emotionally disconnected, we may find it difficult to engage with intimacy.",
            },
          ],
        },
        {
          kind: "callout",
          icon: "activity",
          title: "Not Only Calm",
          body: `Sexual desire does not always require us to feel completely calm. Excitement, novelty and anticipation can also be enjoyable forms of activation.

The important question is whether our current nervous system state supports an experience of intimacy that feels comfortable, wanted and enjoyable.

Understanding this connection can help us recognise that changes in sexual desire are not necessarily a reflection of attraction or love. Sometimes our bodies and minds are simply responding to the circumstances we are experiencing.`,
        },
        {
          kind: "iconCards",
          heading: "How Context Changes Throughout Life",
          intro:
            "Our circumstances do not stay the same, and neither does our experience of sexual desire. Different stages of life can bring changes to our physical health, emotional wellbeing, relationships and everyday responsibilities. These might include:",
          columns: 4,
          items: [
            { icon: "calendar-clock", title: "Starting a new job or experiencing work stress" },
            { icon: "sprout", title: "Pregnancy, childbirth and parenting" },
            { icon: "hourglass", title: "Bereavement or significant life changes" },
            { icon: "stethoscope", title: "Physical illness or ongoing health conditions" },
            { icon: "pill", title: "Medication and its possible side effects" },
            { icon: "refresh-cw", title: "Menopause and other hormonal changes" },
            { icon: "eye", title: "Changes in body confidence or physical comfort" },
            { icon: "hand-heart", title: "Increased caring responsibilities" },
          ],
        },
        {
          kind: "callout",
          icon: "leaf",
          title: "A Change in Desire Is Not a Measure of Love",
          body: `These experiences can influence sexual interest, arousal, comfort and pleasure.

A change in desire does not automatically mean someone has stopped loving or feeling attracted to their partner. It may mean that the circumstances influencing their sexual response have changed.`,
        },
        {
          kind: "contrast",
          heading: "Different People, Different Contexts",
          intro:
            "Even within a loving relationship, two people may need very different circumstances for intimacy to feel appealing.",
          columns: [
            {
              label: "One partner might enjoy",
              icon: "sparkles",
              items: ["Spontaneity", "Surprise", "Unexpected affection"],
            },
            {
              label: "The other might prefer",
              icon: "calendar-clock",
              items: ["Knowing they have time together", "Not rushing", "Not worrying about interruptions"],
            },
          ],
          note: "Neither approach is right or wrong. The challenge can arise when we assume that what works for us should also work for our partner. Rather than guessing, talk openly about the circumstances that support each person's comfort and enjoyment.",
        },
        {
          kind: "callout",
          icon: "heart-handshake",
          tone: "dark",
          title: "Making Space Is Not an Expectation",
          body: `Planning time together does not have to mean scheduling sex. It might simply mean creating opportunities to relax, reconnect, enjoy affection or spend meaningful time together.

Making space for intimacy is not the same as creating an expectation that sex must happen. Connection can be valuable in its own right, whether or not it develops into sexual intimacy.`,
        },
        {
          kind: "worksheet",
          exerciseId: "m5-mapping-my-context",
          title: "Mapping My Context",
          intro:
            "Think of one occasion when intimacy felt welcome, and another when it felt difficult. Go into as much or as little detail as you feel comfortable.",
          fields: [
            { id: "easier-physical", section: "When Intimacy Felt Easier", type: "text", label: "How was I feeling physically?" },
            { id: "easier-emotional", type: "text", label: "What was happening emotionally?" },
            { id: "easier-connected", type: "text", label: "How connected did I feel to my partner?" },
            { id: "easier-around", type: "text", label: "What was happening around me?" },
            { id: "easier-needed", type: "text", label: "What might I have needed at that time?" },
            { id: "harder-physical", section: "When Intimacy Felt Harder", type: "text", label: "How was I feeling physically?" },
            { id: "harder-emotional", type: "text", label: "What was happening emotionally?" },
            { id: "harder-connected", type: "text", label: "How connected did I feel to my partner?" },
            { id: "harder-around", type: "text", label: "What was happening around me?" },
            { id: "harder-needed", type: "text", label: "What might I have needed at that time?" },
            {
              id: "stands-out",
              section: "Comparing the Two",
              type: "text",
              label: "What stands out when I compare the two situations?",
            },
          ],
          coupleSection: {
            title: "Couple Conversation: One Small Change",
            intro:
              "Share your insights from your context maps. Then choose at least one realistic change you would both like to work towards to create the right context for intimacy: for example, putting phones away during time together, allowing more time to unwind, or checking whether touch is wanted before initiating it.",
            groundRules: [
              "Share only what you feel comfortable sharing.",
              "Talk about what helps each of you feel comfortable, rather than guessing.",
              "Choose something realistic that you would both like to work towards.",
            ],
            fields: [
              { id: "insights", label: "What did we notice when we shared our context maps?" },
              { id: "small-change", label: "One realistic change we would both like to work towards is…" },
            ],
          },
          partnerNote:
            "Share your context map with your partner before your couple conversation, if you choose to. Include only what you feel comfortable sharing.",
        },
        {
          kind: "callout",
          icon: "route",
          title: "Next: Spontaneous and Responsive Desire",
          body: `In Part 4, we look at another reason why two people in the same relationship might experience desire very differently.`,
        },
      ],
    },

    /* ---------------------------------------------------------------- 4 */
    {
      id: "intimacy-part-4",
      title: "Part 4: Understanding Spontaneous and Responsive Desire",
      summary:
        "Two routes into desire, the difference between desire and arousal, and why responsive desire never means pushing through reluctance. Then reflect on how desire begins for you, and talk about it with shared respect.",
      estimatedMinutes: 25,
      blocks: [
        {
          kind: "video",
          title: "Spontaneous and Responsive Desire — Part 4",
          playbackId: "",
          durationSeconds: 185,
        },
        {
          kind: "prose",
          heading: "Why Do We Experience Desire Differently?",
          body: `Now that we have explored how context influences sexual desire, let us look at another reason why two people in the same relationship might experience desire very differently.

We often assume that sexual desire should happen naturally and spontaneously. Films, television and popular culture frequently portray desire as something that appears suddenly, almost like a light switch being turned on. But sexual desire does not work this way for everyone.

Emily Nagoski explains that there are different ways people experience sexual desire, including spontaneous desire and responsive desire. Neither is better, healthier or more normal than the other.`,
        },
        {
          kind: "accordion",
          heading: "Two Routes Into Desire",
          intro: "Open each one to read more.",
          items: [
            {
              icon: "zap",
              title: "What is spontaneous desire?",
              body: `Spontaneous desire is when an interest in sexual activity appears before any sexual stimulation or physical intimacy has begun.

You might be going about your day and suddenly find yourself thinking about sex or wanting sexual intimacy. You may experience sexual fantasies, anticipate sexual experiences or feel motivated to initiate intimacy without needing affectionate touch or physical stimulation first.

This is often the type of desire we see portrayed in films and the media, which can create the impression that everyone should experience desire this way. But spontaneous desire is only one way of experiencing sexual interest.`,
            },
            {
              icon: "sprout",
              title: "What is responsive desire?",
              body: `Responsive desire is when sexual interest begins to develop in response to something enjoyable, pleasurable or sexually appealing.

For example, you might not have been thinking about sex, but you genuinely want to enjoy kissing, cuddling or affectionate touch with your partner. As that experience continues, you may begin to feel sexually interested.

This does not mean someone has a low sex drive, lacks attraction or is experiencing a problem. It simply means their sexual desire may emerge differently.`,
            },
          ],
        },
        {
          kind: "flipCards",
          heading: "Desire and Arousal",
          intro:
            "Although desire and arousal are closely connected, they are not quite the same thing. Tap each card to turn it over.",
          items: [
            {
              frontLabel: "Sexual desire",
              front: "Your mind's response and readiness for sex.",
              backLabel: "In other words",
              back: "The psychological experience of wanting or feeling interested in sexual activity.",
            },
            {
              frontLabel: "Sexual arousal",
              front: "Your body's response and readiness for sex.",
              backLabel: "In other words",
              back: "The physical and psychological responses associated with sexual stimulation or excitement.",
            },
          ],
        },
        {
          kind: "callout",
          icon: "shield-check",
          tone: "dark",
          title: "Arousal Is Not Consent",
          body: `Desire and arousal can influence one another, but they do not always happen together. Someone may experience physical signs of arousal without wanting sex, or feel sexual desire without noticing a strong physical response.

Importantly, physical arousal does not automatically mean desire or consent.`,
        },
        {
          kind: "contrast",
          heading: "The Order Is Different",
          columns: [
            {
              label: "Spontaneous desire",
              icon: "zap",
              items: ["Sexual interest often appears first", "Arousal follows"],
            },
            {
              label: "Responsive desire",
              icon: "sprout",
              tone: "sage",
              items: ["An enjoyable experience, or arousal, has already begun", "Interest develops in response"],
            },
          ],
          note: "Both are valid ways of experiencing sexual desire, and many people experience a combination of the two depending on their circumstances.",
        },
        {
          kind: "flipCards",
          heading: "When Partners Experience Desire Differently",
          intro:
            "Imagine one partner regularly experiences spontaneous desire: they think about sex, look forward to it and often initiate intimacy. Their partner experiences more responsive desire: they rarely think about sex spontaneously, but may become interested when they are enjoying closeness, affection or pleasurable touch. Tap each card to turn it over.",
          items: [
            {
              frontLabel: "The first partner might wonder",
              front: "“Why do you never initiate intimacy?”",
              backLabel: "And might interpret",
              back: "A lack of initiation as rejection or a lack of attraction.",
            },
            {
              frontLabel: "The second partner might think",
              front: "“Why can I not want sex the way you do?”",
              backLabel: "And might feel",
              back: "That something is wrong with them because they do not experience sexual interest in the same way.",
            },
          ],
        },
        {
          kind: "callout",
          icon: "route",
          title: "Different Routes Into Desire",
          body: `Neither interpretation necessarily reflects what is happening. They may simply have different routes into desire.

Understanding these differences can help couples move away from assumptions, blame and unrealistic expectations. Rather than expecting desire to look the same for both people, they can begin to recognise and communicate about their individual experiences.`,
        },
        {
          kind: "callout",
          icon: "shield",
          title: "Responsive Desire Does Not Mean Pushing Through Reluctance",
          body: `Responsive desire does not mean you should begin sexual activity you do not want in the hope that desire will eventually appear.

There is a difference between genuinely wanting to explore affection or physical closeness, even when sexual desire is not present, and agreeing to intimacy because you feel guilty, pressured or obligated. For responsive desire to develop comfortably, there needs to be genuine choice and a willingness to engage in the experience.

- You do not need to push through discomfort, reluctance or unwanted sexual activity.
- You can enjoy kissing or cuddling without wanting anything further.
- You can change your mind at any point.

Sexual intimacy should always be something you freely choose, not something you feel responsible for providing.`,
        },
        {
          kind: "prose",
          heading: "Understanding Each Other's Experience",
          body: `Recognising spontaneous and responsive desire can help us understand why sexual interest may develop differently between partners. It can also challenge the belief that desire must always appear suddenly, or that a lack of spontaneous desire means something is wrong.

Our experiences of desire can change throughout life and may be influenced by stress, relationships, health, hormones, emotional wellbeing and context. There is no single correct way to experience sexual desire.`,
        },
        {
          kind: "tapChoice",
          exerciseId: "m5-which-route",
          title: "Which Do You Recognise?",
          intro: "There are no right answers here. Choose the one that feels closest to your experience at the moment.",
          questions: [
            {
              id: "route",
              text: "Which way of experiencing desire do you recognise most in yourself?",
              options: [
                {
                  value: "spontaneous",
                  label: "Mostly spontaneous",
                  response:
                    "Interest often seems to arrive first for you. It can help to remember that your partner's route into desire may be different, and that neither is better or more normal than the other.",
                },
                {
                  value: "responsive",
                  label: "Mostly responsive",
                  response:
                    "Interest may develop for you once something enjoyable has begun. This does not mean a low sex drive, a lack of attraction or a problem. It simply means your desire may emerge differently.",
                },
                {
                  value: "both",
                  label: "A combination of both",
                  response:
                    "Many people experience a combination of the two, depending on their circumstances. Noticing what makes the difference for you is a useful starting point.",
                },
                {
                  value: "unsure",
                  label: "I am not sure",
                  response:
                    "That is completely fine. Our experiences of desire can change throughout life, and the reflection below may help you notice more.",
                },
              ],
            },
          ],
        },
        {
          kind: "pairedReflection",
          exerciseId: "m5-different-routes",
          eyebrow: "Module 5 · Part 4",
          title: "How Desire Begins for Me",
          intro: "Answer on your own first, and share only what you choose.",
          individual: {
            title: "Individual Reflection",
            questions: [
              {
                id: "which-type",
                label: "Which type of desire do I experience in this relationship: spontaneous, responsive or both?",
              },
              { id: "changed", label: "How has my desire changed over the course of our relationship?" },
              {
                id: "mistaken",
                label: "Have I ever mistaken my partner's way of experiencing desire for a lack of love or attraction?",
                hint: "If so, please say more.",
              },
              {
                id: "guilty",
                label: "Have I ever felt guilty or confused about the way I experience desire?",
                hint: "If so, please say more.",
              },
              {
                id: "willing",
                label: "How would being genuinely willing to explore closeness feel to me, compared with feeling obligated or pressured?",
              },
              {
                id: "understand",
                label: "Something I would like my partner to understand about how desire works for me is…",
              },
            ],
          },
          together: {
            title: "Different Routes, Shared Respect",
            intro: "Take turns sharing your answers. Then discuss these questions together.",
            steps: SPEAKER_LISTENER_STEPS,
            questions: [
              { id: "misunderstandings", label: "How might our different patterns have led to misunderstandings?" },
              {
                id: "acknowledge-both",
                label: "If one of us wants sex and the other does not, how can we acknowledge both people's feelings without making each other feel uncomfortable, pressured or rejected?",
              },
            ],
          },
          revealNote:
            "Different experiences of desire do not necessarily mean a lack of love, attraction or compatibility.",
          closing: {
            text: "Understanding how desire develops can help create greater awareness, communication and choice within your relationship.",
          },
        },
        {
          kind: "callout",
          icon: "route",
          title: "Next: Affection, Touch and Responsive Desire",
          body: `In Part 5, we put some of this into practice by exploring affection and touch, and how to communicate what feels good.`,
        },
      ],
    },

    /* ---------------------------------------------------------------- 5 */
    {
      id: "intimacy-part-5",
      title: "Part 5: Exploring Affection, Touch and Responsive Desire",
      summary:
        "Why willingness is different from obligation, why consent to one form of affection is not consent to anything further, and how to communicate about touch. Then try a non-sexual touch exercise together, with no outcome to achieve.",
      estimatedMinutes: 30,
      blocks: [
        {
          kind: "video",
          title: "Affection, Touch and Responsive Desire — Part 5",
          playbackId: "",
          durationSeconds: 40,
        },
        {
          kind: "prose",
          heading: "Creating Space for Responsive Desire",
          body: `As we have explored, responsive desire is when sexual interest begins to develop in response to something enjoyable, pleasurable or appealing.

For some people, desire does not appear before intimacy begins. Instead, it may develop gradually through affection, physical closeness or enjoyable touch. This is why being open and willing to explore affection can sometimes create opportunities for responsive desire to develop.`,
        },
        {
          kind: "callout",
          icon: "hand-heart",
          title: "Willing Is Not the Same as Agreeing to Sex",
          body: `Being willing to explore affection is not the same as agreeing to have sex. You might genuinely want to enjoy kissing, cuddling, holding hands or other forms of physical closeness without wanting anything further. And that is absolutely fine.

Affection can be enjoyable and meaningful in its own right, whether or not sexual desire develops.`,
        },
        {
          kind: "contrast",
          heading: "Willingness Is Different From Obligation",
          columns: [
            {
              label: "Willingness",
              icon: "heart",
              tone: "sage",
              items: [
                "Choosing to explore touch because it feels comfortable and appealing",
                "Being genuinely open to the experience, with the freedom to decide what feels right for you",
                "Not having to continue if your feelings change",
              ],
            },
            {
              label: "Obligation",
              icon: "battery-low",
              items: [
                "Agreeing to intimacy because you feel guilty",
                "Agreeing because you feel pressured",
                "Agreeing because you are worried about disappointing your partner",
              ],
            },
          ],
        },
        {
          kind: "iconCards",
          heading: "You Can Always Choose",
          columns: 2,
          items: [
            { icon: "hand-heart", title: "You can say yes to a cuddle and no to a kiss." },
            { icon: "heart", title: "You can enjoy kissing without wanting sexual intimacy." },
            { icon: "pause-circle", title: "You can change your mind or stop at any point." },
            { icon: "shield-check", title: "Consent to one form of affection is not consent to anything further." },
          ],
        },
        {
          kind: "prose",
          heading: "Learning to Communicate About Touch",
          body: `We sometimes expect our partners to instinctively know what kind of affection or touch we enjoy. But everyone has different preferences, and these can change depending on our mood, circumstances and how we are feeling. Something that feels enjoyable one day may not feel comfortable another day.

Rather than expecting our partner to know what we like, we can practise communicating our preferences openly. This might involve explaining what feels pleasant, asking for something different or letting our partner know when we would like to stop.

It also means listening to our partner's preferences without taking their responses as criticism or rejection.`,
        },
        {
          kind: "callout",
          icon: "lightbulb",
          title: "The Purpose of the Next Exercise",
          body: `The next activity gives you an opportunity to practise communicating about affection and touch in a way that feels comfortable and respectful for both of you.

The aim is not to create sexual desire or progress towards sex. It is to develop greater awareness of what feels enjoyable, practise expressing your preferences and become more comfortable listening to each other's needs. There is no expectation that the activity should lead to sexual intimacy.`,
        },
        {
          kind: "flow",
          heading: "The Touch Exercise",
          intro: "Set aside 10–20 minutes somewhere private and comfortable.",
          steps: [
            {
              icon: "shield-check",
              title: "Keep to non-sexual touch",
              body: "For this exercise, keep to non-sexual touch, avoiding the chest, breasts and genitals.",
            },
            {
              icon: "users",
              title: "Take turns",
              body: "One person is the toucher and the other is the person being touched. Then swap roles.",
            },
            {
              icon: "message-circle",
              title: "Guide with words",
              body: "If you are being touched, notice what you enjoy and guide your partner using words.",
            },
            {
              icon: "ear",
              title: "Listen and respond",
              body: "If you are the toucher, listen and respond to your partner's guidance, and ask questions when you are unsure.",
            },
            {
              icon: "refresh-cw",
              title: "Swap roles",
              body: "When you are both ready, swap, and give each other the same care and attention.",
            },
          ],
        },
        {
          kind: "contrast",
          heading: "Your Role",
          columns: [
            {
              label: "If you are being touched",
              icon: "message-circle",
              tone: "sage",
              items: [
                "Your role is to notice what you enjoy and guide your partner using words",
                "Pay attention to your experience: what feels comforting, relaxing or pleasurable?",
                "What does not feel particularly enjoyable?",
              ],
            },
            {
              label: "If you are the toucher",
              icon: "ear",
              items: [
                "Your role is to listen and respond to your partner's guidance",
                "You might notice changes in their breathing or how their body relaxes, but do not assume these tell you what they are enjoying",
                "Listen to their words and ask questions when you are unsure",
              ],
            },
          ],
          note: "Remember, your partner asking for something different is not criticism. They are helping you understand what they enjoy.",
        },
        {
          kind: "prose",
          heading: "Things You Might Say",
          body: `- “A little softer.”
- “Could you go slower?”
- “I really like that.”
- “Stay there for a moment.”
- “Could you try somewhere else?”
- “I would like to stop.”`,
        },
        {
          kind: "callout",
          icon: "shield-check",
          tone: "dark",
          title: "Consent Goes Both Ways",
          body: `The toucher also has the right to express their preferences, decline a request or stop.

The important thing is that neither of you is trying to create sexual desire or achieve a particular outcome. You are simply practising being present, noticing what feels enjoyable and communicating openly.

And over time, if you both choose, you can explore more intimate touch using exactly the same principles.`,
        },
        {
          kind: "journal",
          exerciseId: "m5-noticing-touch",
          title: "Noticing What Feels Enjoyable",
          intro:
            "After the exercise, if you would like to, note what you noticed. This journal is private to you.",
          prompts: [
            "What felt comforting, relaxing or pleasurable?",
            "What did not feel particularly enjoyable?",
            "What was it like to express my preferences, and to listen to my partner's?",
          ],
        },
        {
          kind: "callout",
          icon: "leaf",
          title: "Remember",
          body: `Affection does not have to lead anywhere to be meaningful. Learning to communicate what feels good, what does not and what you need can help create greater understanding, trust and connection.

Next, in Part 6, we look at how we respond to our own experiences, and at moving away from sexual expectations.`,
        },
      ],
    },

    /* ---------------------------------------------------------------- 6 */
    {
      id: "intimacy-part-6",
      title: "Part 6: Moving Away from Sexual Expectations and Towards Understanding",
      summary:
        "How we feel about how we feel, letting go of an imagined ‘normal’, bringing the module together and approaching different needs with compassion. Then reflect on what you are taking forward, and agree your way forward together.",
      estimatedMinutes: 30,
      blocks: [
        {
          kind: "video",
          title: "Moving Away from Sexual Expectations — Part 6",
          playbackId: "",
          durationSeconds: 165,
        },
        {
          kind: "prose",
          heading: "How We Feel About Our Sexual Experiences Matters",
          body: `Throughout this module, we have explored what shapes our sexual responses, why desire can differ between people and how our experiences of intimacy can change.

But there is another important influence on our sexual wellbeing: how we respond to our own experiences. Emily Nagoski highlights this through a powerful message.`,
        },
        {
          kind: "quote",
          text: "It's not how you feel. It's how you feel about how you feel.",
          attribution: "Emily Nagoski, Come As You Are",
        },
        {
          kind: "prose",
          body: `In other words, our feelings and experiences are one thing, but the meaning we attach to them can influence how we see ourselves and our relationships.

For example, you might notice that you rarely experience spontaneous sexual desire. That observation alone does not mean anything is wrong.`,
        },
        {
          kind: "flipCards",
          heading: "Same Observation, Different Response",
          intro: "Tap the card to turn it over.",
          items: [
            {
              frontLabel: "Responding with judgement",
              front: "“What is wrong with me? Why do I not want sex more often? I am letting my partner down.”",
              backLabel: "Responding with curiosity",
              back: "“I have noticed that I do not often experience spontaneous desire. My desire tends to develop through connection and enjoyable experiences. What helps me feel that connection?”",
            },
          ],
        },
        {
          kind: "callout",
          icon: "heart",
          title: "The Experience Has Not Changed",
          body: `The first response can bring shame, guilt or pressure about something that is not necessarily a problem. In the second, the experience has not changed, but your response to it has.

Rather than judging yourself, you are beginning to understand yourself. Self-compassion and curiosity can help us explore our sexual experiences without adding unnecessary shame or pressure.`,
        },
        {
          kind: "iconCards",
          heading: "Challenging the Idea of a ‘Normal’ Sex Life",
          intro:
            "Many of us grow up absorbing messages about what a healthy or successful sexual relationship should look like. We may develop expectations about:",
          columns: 4,
          items: [
            { icon: "calendar-clock", title: "How often couples should have sex" },
            { icon: "flame", title: "How frequently we should experience sexual desire" },
            { icon: "message-circle", title: "Who should initiate intimacy" },
            { icon: "hourglass", title: "How quickly our bodies should respond" },
            { icon: "search", title: "What sexual activity should involve" },
            { icon: "sparkles", title: "Whether orgasm should always be the outcome" },
            { icon: "arrow-up-down", title: "What it means when partners have different levels of desire" },
          ],
        },
        {
          kind: "prose",
          body: `These expectations can become an imagined standard against which we measure ourselves and our relationships. But there is not one correct frequency, pattern or way of experiencing sexual intimacy that works for everyone. What feels enjoyable and meaningful to one person or couple may be very different for another.

When we focus too heavily on what we think should be happening, we can lose sight of what we are actually experiencing. We may become more concerned with how often sex happens, whether we are performing well or whether our relationship is normal than with whether intimacy feels comfortable, pleasurable and wanted.`,
        },
        {
          kind: "callout",
          icon: "compass",
          title: "No Imagined Standard",
          body: `Sexual wellbeing is not about meeting an imagined standard. It is about understanding what feels right for you and your relationship.`,
        },
        {
          kind: "accordion",
          heading: "Bringing Together What We Have Learnt",
          intro: "Throughout this module, we have explored several important influences on sexual desire and intimacy.",
          items: [
            {
              icon: "sprout",
              title: "Our sexual garden",
              body: "The messages we receive throughout our lives shape our beliefs and expectations about sex, pleasure and relationships. As adults, we can begin questioning those beliefs and deciding which ones we want to carry forward.",
            },
            {
              icon: "arrow-up-down",
              title: "Our sexual accelerators and brakes",
              body: "Our brains respond to things that make sexual intimacy feel appealing, as well as things that make it feel uncomfortable, unsafe or less desirable. Understanding both can help us recognise what influences our sexual responses.",
            },
            {
              icon: "sun",
              title: "The importance of context",
              body: "Our physical health, emotions, nervous system, relationships and everyday circumstances can all influence how we experience intimacy. The same touch or experience may feel very different depending on what is happening within and around us.",
            },
            {
              icon: "route",
              title: "Spontaneous and responsive desire",
              body: "Sexual desire does not develop in the same way for everyone. Some people experience desire before intimacy begins, while others find that desire develops in response to enjoyable experiences or affection. Neither is better or more normal than the other.",
            },
            {
              icon: "hand-heart",
              title: "Communication, touch and choice",
              body: "Learning to communicate what feels enjoyable, comfortable or unwanted can help us understand ourselves and each other. Affection does not have to lead to sex, and sexual intimacy should always be freely chosen.",
            },
          ],
        },
        {
          kind: "contrast",
          heading: "Moving Away from Performance and Towards Connection",
          intro:
            "One of the most important messages from this module is that pleasure and connection are not performance targets. Intimacy is not something we need to achieve, measure or compare against other people's relationships. Instead, it is something we can explore, communicate about and choose together.",
          columns: [
            {
              label: "Rather than only asking",
              icon: "search",
              items: ["“Are we having enough sex?”"],
            },
            {
              label: "We might also ask",
              icon: "heart-handshake",
              tone: "sage",
              items: ["“Does the intimacy we share feel welcome, enjoyable and meaningful to both of us?”"],
            },
          ],
        },
        {
          kind: "prose",
          body: `This does not mean that the frequency of sex or differences in desire do not matter.

For some people, sexual intimacy is an important part of feeling connected, loved and fulfilled in a relationship. For others, different forms of affection and closeness may be equally or more meaningful. Neither experience is wrong.

What matters is recognising that both partners' feelings, needs and choices deserve consideration.`,
        },
        {
          kind: "prose",
          heading: "When Partners Have Different Needs",
          body: `Understanding how desire works does not mean that every difference between partners will disappear. You may still have different preferences, expectations or wishes around sexual intimacy. One partner may want more sexual connection, while the other may feel comfortable with less.

These differences can bring up difficult feelings, including rejection, sadness, frustration, guilt or pressure. It is important that both partners have space to express those feelings without blame or judgement.`,
        },
        {
          kind: "callout",
          icon: "users",
          title: "Both Partners Matter",
          body: `No one should feel obligated to engage in sexual activity they do not want, and no one should feel that their wish for sexual connection is automatically unreasonable.`,
        },
        {
          kind: "prose",
          body: `Sometimes these differences can be explored through open communication, greater understanding and changes to the circumstances surrounding intimacy. At other times, couples may benefit from professional support to explore their experiences and consider what is possible within their relationship.

Understanding each other does not guarantee that every difference can be resolved. But it can help couples approach those differences with greater compassion, honesty and respect, rather than treating either partner as the problem.`,
        },
        {
          kind: "callout",
          icon: "leaf",
          tone: "dark",
          title: "A Final Thought",
          body: `Our experiences of sexual desire and intimacy are influenced by our beliefs, bodies, emotions, relationships and circumstances. They can change throughout our lives, and they do not always match those of our partner.

The aim of understanding sexual desire is not to make ourselves or our partners want more sex. It is to develop greater awareness of our own experiences, communicate more openly and make choices that respect both people's needs and boundaries.

And perhaps most importantly, it is about learning to respond to ourselves and each other with curiosity rather than criticism.`,
        },
        {
          kind: "pairedReflection",
          exerciseId: "m5-our-way-forward",
          eyebrow: "Module 5 · Part 6",
          title: "What I Am Taking Forward",
          intro: "Reflect on your own first, then share your individual insights, choosing what you share.",
          individual: {
            title: "Final Individual Reflection",
            questions: [
              { id: "learned", label: "What have I learnt about my own sexuality that I did not understand before?" },
              {
                id: "compassionate",
                label: "What would help me be more curious and compassionate about how I feel about my feelings around my sexuality?",
              },
              { id: "question", label: "What belief or expectation am I ready to question?" },
              { id: "choice", label: "What helps me experience intimacy as a choice rather than an obligation?" },
              { id: "keep-exploring", label: "What would I like to keep exploring?" },
            ],
          },
          together: {
            title: "Final Couple Conversation: Our Way Forward",
            intro: "Share your individual insights. Then complete these statements together.",
            steps: SPEAKER_LISTENER_STEPS,
            questions: [
              { id: "feel", label: "We want intimacy in our relationship to feel…" },
              { id: "needs-differ", label: "When our needs differ, we want to respond by…" },
              { id: "small-thing", label: "One small thing we would both like to try is…" },
            ],
          },
          revealNote:
            "Respond to yourselves and each other with curiosity rather than criticism. Both partners' feelings, needs and choices deserve consideration.",
          closing: {
            text: "There is no single definition of a successful sexual relationship. What matters is finding ways of experiencing intimacy that feel respectful, welcome and meaningful to the people within it.",
          },
        },
        {
          kind: "callout",
          icon: "route",
          title: "Next: Creating Intimacy That Works for You Both",
          body: `In Part 7, the final part of this module, we look at what kind of intimacy and pleasure you would like to create together.`,
        },
      ],
    },

    /* ---------------------------------------------------------------- 7 */
    {
      id: "intimacy-part-7",
      title: "Part 7: Creating Intimacy That Works for You Both",
      summary:
        "There is no one right way to experience intimacy. Letting go of what it ‘should’ look like, and Emily Nagoski's message that pleasure is the measure. Then explore together what kind of intimacy you would like to create.",
      estimatedMinutes: 15,
      blocks: [
        {
          kind: "video",
          title: "Creating Intimacy That Works for You Both — Part 7",
          playbackId: "",
          durationSeconds: 45,
        },
        {
          kind: "quote",
          text: "You do not have to want sex in the same way, at the same time or with the same frequency to understand and care for one another.",
        },
        {
          kind: "prose",
          heading: "There Is No One Right Way to Experience Intimacy",
          body: `Throughout this module, we have explored how our beliefs, experiences, bodies, emotions and relationships influence sexual desire and intimacy.

Every individual brings their own experiences, preferences and needs into a relationship.`,
        },
        {
          kind: "contrast",
          columns: [
            {
              label: "You may",
              icon: "users",
              items: [
                "Experience spontaneous desire while your partner experiences responsive desire",
                "Enjoy different forms of affection",
                "Need different circumstances to feel comfortable",
                "Have different wishes about how often you share sexual intimacy",
              ],
            },
            {
              label: "What matters",
              icon: "heart-handshake",
              tone: "sage",
              items: ["How you understand, communicate about and respond to those differences"],
            },
          ],
          note: "These differences do not automatically mean something is wrong with your relationship.",
        },
        {
          kind: "prose",
          heading: "Letting Go of What Intimacy ‘Should’ Look Like",
          body: `Many of us carry expectations about what a normal or successful sexual relationship should look like. We may compare ourselves to other couples or feel pressure to meet an imagined standard of sexual frequency, desire or performance.

But you do not have to make your sexuality fit someone else's version of normal.

A fulfilling intimate relationship is not defined by how often you have sex, who initiates or whether every sexual experience leads to orgasm. It is about understanding what feels meaningful, pleasurable and enjoyable to you both.`,
        },
        {
          kind: "callout",
          icon: "shield-check",
          title: "Both Partners' Feelings Matter",
          body: `This does not mean differences in sexual needs are always easy to navigate. Both partners' feelings and wishes matter, and sometimes those differences require honest conversations, understanding and compromise about how you approach your relationship, without compromising anyone's right to choose whether to engage in sexual activity.`,
        },
        {
          kind: "iconCards",
          heading: "Creating Your Own Experience of Intimacy",
          intro:
            "Rather than focusing on what your sexual relationship should look like, you can begin exploring what you would genuinely like it to be. This might include:",
          columns: 3,
          items: [
            { icon: "hand-heart", title: "More affection without expectations" },
            { icon: "heart", title: "Greater emotional connection" },
            { icon: "smile", title: "Opportunities for playfulness" },
            { icon: "messages-square", title: "More open conversations about pleasure" },
            { icon: "sparkles", title: "New ways to enjoy physical closeness" },
          ],
        },
        {
          kind: "prose",
          body: `For some couples, sexual intimacy is an important part of their connection. For others, affection, companionship and different forms of closeness may be equally meaningful.

There is no single formula that works for everyone. What matters is that both people feel able to express their needs, respect each other's choices and explore what feels right for their relationship.`,
        },
        {
          kind: "callout",
          icon: "sun",
          tone: "dark",
          title: "Pleasure Is the Measure",
          body: `One of Emily Nagoski's central messages is that pleasure, rather than performance, should guide how we think about sexual wellbeing.

Instead of measuring intimacy by frequency, duration or achieving a particular outcome, we can focus on whether our experiences feel welcome, pleasurable and meaningful.

Pleasure does not have to mean orgasm or even sexual activity. It can be found in affection, touch, playfulness, emotional closeness and feeling connected. And it should always be something we have the freedom to choose.`,
        },
        {
          kind: "tapChoice",
          exerciseId: "m5-what-we-would-like",
          title: "What Would You Genuinely Like?",
          intro: "There are no right answers here. Choose the one that feels most important to you today.",
          questions: [
            {
              id: "like-more",
              text: "Which of these would you most like more of in your relationship?",
              options: [
                {
                  value: "affection",
                  label: "More affection without expectations",
                  response:
                    "Affection does not have to lead anywhere to be meaningful. Letting your partner know this matters to you can be a gentle way to begin the conversation.",
                },
                {
                  value: "connection",
                  label: "Greater emotional connection",
                  response:
                    "For many people, feeling close and connected is where intimacy begins. It is worth talking together about what helps each of you feel that connection.",
                },
                {
                  value: "playfulness",
                  label: "Opportunities for playfulness",
                  response:
                    "Pleasure can be found in playfulness as well as in touch and closeness. Making room for lightness together can matter a great deal.",
                },
                {
                  value: "conversations",
                  label: "More open conversations about pleasure",
                  response:
                    "Rather than expecting each other to know, talking openly about what feels good is one of the most valuable things you can practise together.",
                },
                {
                  value: "closeness",
                  label: "New ways to enjoy physical closeness",
                  response:
                    "The same principles from the touch exercise can guide you: genuine choice, communicating with words and the freedom to stop at any point.",
                },
              ],
            },
          ],
        },
        {
          kind: "sharedJournal",
          exerciseId: "m5-the-intimacy-we-would-like",
          title: "Our Final Question",
          intro:
            "As you finish this module, we would like to leave you with one final question. There may not be an immediate answer, and that is okay. The important thing is creating space for an ongoing conversation where both of you feel heard, understood and respected.",
          prompts: [
            "If we let go of the pressure to have the sexual relationship we think we should have, what kind of intimacy and pleasure would we actually like to create together?",
          ],
          partnerNote:
            "Your partner's reflection on the intimacy and pleasure they would like you to create together, in their own words. Read it with curiosity, and let it be the start of an ongoing conversation.",
        },
        {
          kind: "callout",
          icon: "leaf",
          title: "That Is the End of Module 5",
          body: `You do not have to make your sexuality fit someone else's version of normal. What matters is whether you can talk honestly, respect each other's choices and make room for pleasure and connection in ways that work for you both.

Remember: pleasure is the measure. Growth begins with understanding. Next, we move on to Module 6.`,
        },
      ],
    },
  ],
};
