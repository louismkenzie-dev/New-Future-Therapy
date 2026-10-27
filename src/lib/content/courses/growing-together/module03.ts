import type { CourseModule } from "../types";

/* Module 3 — Attachment. Eight parts, each opening with Laura and Esther's
   video, then their written introduction and the teaching from the video
   script broken into small screens, then the activity. Copy is the
   therapists' own (Module 3 Parts 1–8 scripts, written blurbs and
   reflections sheets), lightly edited to house style: British English, no
   contractions, "your partner" throughout. Attachment is offered as a lens
   for curiosity, never a diagnosis or a fixed label. */

const COMING_BACK_TOGETHER_STEPS = [
  "Reread each question out loud.",
  "Take turns to read out your answer. Do this for every question.",
  "Listen with curiosity. Notice any urge to correct or defend, and try: “That is so interesting. Tell me more.”",
  "Then answer the together questions as one.",
];

export const module03: CourseModule = {
  id: "attachment",
  number: 3,
  title: "Attachment",
  lede: "Attachment can help you understand how you respond to closeness, uncertainty and disconnection — and why you and your partner may react differently when things feel difficult.",
  essence:
    "Not “I am anxious and you are avoidant” but “We are beginning to recognise what happens between us.”",
  lessons: [
    /* ---------------------------------------------------------------- 1 */
    {
      id: "attachment-part-1",
      title: "Part 1: Attachment Strategies",
      summary:
        "An introduction to attachment and how it can show up in your relationship, beginning with a gentle attachment quiz — a starting point for curiosity, not a test or a diagnosis.",
      estimatedMinutes: 20,
      blocks: [
        {
          kind: "video",
          title: "Attachment Strategies",
          playbackId: "",
          durationSeconds: 300,
        },
        {
          kind: "prose",
          heading: "Welcome Back",
          body: `In this module, you will explore your attachment strategies and how they may show up in your relationship.`,
        },
        {
          kind: "iconCards",
          heading: "What Attachment Can Help You Understand",
          columns: 3,
          items: [
            {
              icon: "heart",
              title: "Closeness and connection",
              body: "Some of the ways you respond when you feel close to your partner.",
            },
            {
              icon: "compass",
              title: "Uncertainty and disconnection",
              body: "What happens for you when connection feels less certain.",
            },
            {
              icon: "users",
              title: "Why you react differently",
              body: "Why you and your partner may respond differently, particularly when things feel difficult between you.",
            },
          ],
        },
        {
          kind: "contrast",
          heading: "Before You Begin",
          intro:
            "Before we jump straight in, we would like you to take a moment to complete the attachment quiz.",
          columns: [
            {
              label: "This is not",
              icon: "search",
              items: ["A test", "A diagnosis", "Something to get right"],
            },
            {
              label: "It is",
              icon: "sprout",
              tone: "sage",
              items: [
                "A starting point for exploring your patterns",
                "A way to become curious about yourself",
              ],
            },
          ],
          note: "Try not to overthink your answers. There are no right or wrong responses.",
        },
        {
          kind: "worksheet",
          exerciseId: "m3-attachment-quiz",
          title: "Attachment Quiz",
          intro:
            "For each statement, choose how true it feels for you at the moment: 0 = rarely true, 1 = sometimes true, 2 = often true. Go with your first response.",
          fields: [
            /* Experiences of insecurity */
            {
              id: "insecure-lose-self",
              section: "Experiences of Insecurity",
              label: "I can lose the sense of who I am in the relationship.",
              type: "scale",
              options: ["0 · Rarely true", "1 · Sometimes true", "2 · Often true"],
            },
            {
              id: "insecure-neglect-self",
              label: "I tend to neglect myself in the relationship.",
              type: "scale",
              options: ["0 · Rarely true", "1 · Sometimes true", "2 · Often true"],
            },
            {
              id: "insecure-compromises",
              label: "I make compromises that I later feel resentful about.",
              type: "scale",
              options: ["0 · Rarely true", "1 · Sometimes true", "2 · Often true"],
            },
            {
              id: "insecure-only-counts",
              label:
                "It counts only when my partner does something for me because they want to, not when I had to ask for it.",
              type: "scale",
              options: ["0 · Rarely true", "1 · Sometimes true", "2 · Often true"],
            },
            {
              id: "insecure-hard-to-feel-reassured",
              label:
                "Even when my partner responds to something I have asked for, I find it hard to feel reassured or satisfied.",
              type: "scale",
              options: ["0 · Rarely true", "1 · Sometimes true", "2 · Often true"],
            },
            {
              id: "insecure-misunderstood",
              label: "I feel misunderstood by my partner.",
              type: "scale",
              options: ["0 · Rarely true", "1 · Sometimes true", "2 · Often true"],
            },
            {
              id: "insecure-promise",
              label:
                "When my partner does not follow through on a promise, I can take it very personally.",
              type: "scale",
              options: ["0 · Rarely true", "1 · Sometimes true", "2 · Often true"],
            },
            {
              id: "insecure-unloving",
              label:
                "I find it upsetting when my partner perceives something I do as unloving even though I mean well.",
              type: "scale",
              options: ["0 · Rarely true", "1 · Sometimes true", "2 · Often true"],
            },
            {
              id: "insecure-too-different",
              label: "I worry about whether my partner and I are fundamentally too different.",
              type: "scale",
              options: ["0 · Rarely true", "1 · Sometimes true", "2 · Often true"],
            },
            {
              id: "insecure-ask-help",
              label: "I struggle for a long time before I will ask for help.",
              type: "scale",
              options: ["0 · Rarely true", "1 · Sometimes true", "2 · Often true"],
            },
            {
              id: "insecure-parents",
              label:
                "When I imagine my parents, it is difficult to picture either of them looking back at me with pride and affection.",
              type: "scale",
              options: ["0 · Rarely true", "1 · Sometimes true", "2 · Often true"],
            },
            {
              id: "insecure-unfair",
              label: "It really gets under my skin when something feels unfair in a relationship.",
              type: "scale",
              options: ["0 · Rarely true", "1 · Sometimes true", "2 · Often true"],
            },
            /* Experiences of security */
            {
              id: "secure-balance",
              section: "Experiences of Security",
              label:
                "I find it easy to balance time together and time apart in my relationship.",
              type: "scale",
              options: ["0 · Rarely true", "1 · Sometimes true", "2 · Often true"],
            },
            {
              id: "secure-change-grow",
              label: "My partner can change and grow as needed, and it is not a threat.",
              type: "scale",
              options: ["0 · Rarely true", "1 · Sometimes true", "2 · Often true"],
            },
            {
              id: "secure-commitments",
              label:
                "It is easy for me to make commitments to my partner and honour those commitments.",
              type: "scale",
              options: ["0 · Rarely true", "1 · Sometimes true", "2 · Often true"],
            },
            {
              id: "secure-need-equally",
              label: "I need my partner as much as they need me.",
              type: "scale",
              options: ["0 · Rarely true", "1 · Sometimes true", "2 · Often true"],
            },
            {
              id: "secure-patient",
              label:
                "If something is not working out with my partner, I can be patient and wait for the right solution to present itself.",
              type: "scale",
              options: ["0 · Rarely true", "1 · Sometimes true", "2 · Often true"],
            },
            {
              id: "secure-conflict-no-fault",
              label: "We can have conflict, even though neither of us is at fault.",
              type: "scale",
              options: ["0 · Rarely true", "1 · Sometimes true", "2 · Often true"],
            },
            {
              id: "secure-talk-openly",
              label:
                "I feel able to talk openly with my partner about things that affect our relationship.",
              type: "scale",
              options: ["0 · Rarely true", "1 · Sometimes true", "2 · Often true"],
            },
            {
              id: "secure-needs-on-hold",
              label:
                "When I put my needs on hold so I can fully hear my partner, I am confident those needs will eventually be addressed.",
              type: "scale",
              options: ["0 · Rarely true", "1 · Sometimes true", "2 · Often true"],
            },
            {
              id: "secure-just-ask",
              label:
                "I can just ask my partner for what I want, and it usually works out one way or another.",
              type: "scale",
              options: ["0 · Rarely true", "1 · Sometimes true", "2 · Often true"],
            },
            {
              id: "secure-take-lead",
              label:
                "When my partner and I fight, I take the lead to help us both feel okay again.",
              type: "scale",
              options: ["0 · Rarely true", "1 · Sometimes true", "2 · Often true"],
            },
            {
              id: "secure-past-endings",
              label:
                "When past relationships have ended, it was a mutual and well-considered decision.",
              type: "scale",
              options: ["0 · Rarely true", "1 · Sometimes true", "2 · Often true"],
            },
            {
              id: "secure-win-win",
              label: "When my partner and I disagree, I commit to finding a win-win solution.",
              type: "scale",
              options: ["0 · Rarely true", "1 · Sometimes true", "2 · Often true"],
            },
            /* Totals and what stood out */
            {
              id: "insecurity-total",
              section: "Understanding Your Scores",
              label: "Relationship insecurity: my total out of 24",
              type: "text",
              hint: "Add up your answers in the Experiences of Insecurity section.",
            },
            {
              id: "security-total",
              label: "Relationship security: my total out of 24",
              type: "text",
              hint: "Add up your answers in the Experiences of Security section.",
            },
            {
              id: "stood-out",
              label: "Which individual questions stood out to me?",
              type: "text",
              hint: "They may tell you more than the totals.",
            },
          ],
          partnerNote:
            "Shared with you as a starting point for curiosity — not a diagnosis or a fixed attachment label.",
        },
        {
          kind: "accordion",
          heading: "Understanding Your Scores",
          intro: "Loosely based on the Attachment Quiz (Chen, A. 2019).",
          items: [
            {
              icon: "shield-alert",
              title: "Relationship insecurity",
              body: `A higher score may suggest that you experience a more insecure attachment at the moment.

This might show up as either seeking closeness and reassurance, or needing space or withdrawing, or a mixture of both. These are sometimes described as anxious and avoidant attachment strategies. This score alone cannot tell you which strategy you use.`,
            },
            {
              icon: "shield-check",
              title: "Relationship security",
              body: `A higher score may suggest that you experience a more secure attachment at the moment. It does not mean you always feel secure or never become activated.`,
            },
            {
              icon: "refresh-cw",
              title: "Scoring highly in both",
              body: `You may score highly in both sections. For example, you might feel generally secure with your partner but become worried or withdrawn during conflict.`,
            },
            {
              icon: "lightbulb",
              title: "A starting point, not a label",
              body: `These scores are a starting point for reflection, not a diagnosis or a fixed attachment label. Pay attention to the individual questions that stand out to you: they may tell you more than the totals.`,
            },
          ],
        },
        {
          kind: "callout",
          icon: "route",
          title: "Next: Understanding Attachment",
          body: `Once you have finished, come back to us and we will explore what attachment means and how it might influence your relationship.`,
        },
      ],
    },

    /* ---------------------------------------------------------------- 2 */
    {
      id: "attachment-part-2",
      title: "Part 2: Understanding Attachment",
      summary:
        "What attachment is, where the theory came from and the three main strategies — secure, anxious and avoidant — as patterns that can change, not fixed labels.",
      estimatedMinutes: 25,
      blocks: [
        {
          kind: "video",
          title: "Understanding Attachment",
          playbackId: "",
          durationSeconds: 600,
        },
        {
          kind: "prose",
          heading: "Understanding Attachment",
          body: `Attachment helps us understand how we seek safety, closeness and support in relationships, particularly when connection feels uncertain.

By the end of this module, we hope you will have a better understanding of how your attachment can be activated, and how this can influence your thoughts, emotions and behaviour within your relationship.`,
        },
        {
          kind: "iconCards",
          heading: "Along With Your Nervous System",
          intro:
            "Alongside your knowledge of your nervous system, this awareness can help you better understand yourself, your partner, and the patterns that can develop between you around:",
          columns: 4,
          items: [
            { icon: "heart", title: "Closeness" },
            { icon: "hand-heart", title: "Reassurance" },
            { icon: "flame", title: "Conflict" },
            { icon: "wind", title: "Disconnection" },
          ],
        },
        {
          kind: "contrast",
          heading: "Something Really Important Before We Begin",
          intro:
            "You may already have heard people describe themselves as anxiously attached, avoidantly attached or securely attached.",
          columns: [
            {
              label: "We do not want you to conclude",
              icon: "search",
              items: ["“One of us is anxiously attached.”", "“One of us is avoidantly attached.”"],
            },
            {
              label: "Instead",
              icon: "sprout",
              tone: "sage",
              items: [
                "Attachment strategies are not a fixed part of your personality.",
                "They are patterns of relating that can develop through experiences and relationships.",
                "And importantly, they can change.",
              ],
            },
          ],
          note: "You might feel quite secure most of the time in your current relationship, but notice more anxious or avoidant strategies appearing when your sense of connection feels threatened.",
        },
        {
          kind: "flipCards",
          heading: "The Three Main Responses",
          intro:
            "Attachment strategies can be broken down into three main responses. You may recognise different strategies in different situations. Tap each card.",
          items: [
            {
              frontLabel: "Strategy",
              front: "Secure",
              backLabel: "Tends towards",
              back: "Feeling relatively comfortable with both connection and appropriate independence.",
            },
            {
              frontLabel: "Strategy",
              front: "Anxious",
              backLabel: "Tends towards",
              back: "Moving towards connection or seeking reassurance when the relationship feels uncertain.",
            },
            {
              frontLabel: "Strategy",
              front: "Avoidant",
              backLabel: "Tends towards",
              back: "Moving away from connection, or towards self-reliance, when emotions or closeness feel overwhelming.",
            },
          ],
        },
        {
          kind: "accordion",
          heading: "Where Do These Patterns Come From?",
          intro:
            "Attachment theory is really about understanding how human beings seek safety, closeness and support through relationships.",
          items: [
            {
              icon: "sprout",
              title: "Early in life",
              body: `From very early in life, we begin learning whether other people are available to us, whether our needs will be responded to, and what we need to do when connection feels uncertain.

Those experiences can contribute to the strategies we use later in life.`,
            },
            {
              icon: "route",
              title: "But childhood is not the whole story",
              body: `Relationships, friendships, betrayal and other experiences throughout our lives can also influence the ways we relate.`,
            },
            {
              icon: "trending-up",
              title: "And patterns can shift",
              body: `Through new experiences, greater self-awareness, and the work you will do throughout this programme, you can begin to understand and shift old patterns.

Alongside relationships where you experience greater consistency, safety and connection, you can gradually develop more secure and flexible ways of relating.`,
            },
          ],
        },
        {
          kind: "flow",
          heading: "Where the Theory Came From",
          intro:
            "Psychologist John Bowlby and researcher Mary Ainsworth helped develop our understanding of attachment through their work on early relationships between children and caregivers.",
          steps: [
            {
              icon: "heart-handshake",
              title: "Bowlby",
              body: "Believed babies are biologically wired to form close attachments with their caregivers, because that connection helps them feel safe and protected.",
            },
            {
              icon: "eye",
              title: "The Strange Situation",
              body: "Ainsworth placed a baby and their mother in a room with a researcher. At different points the mother would leave the room, and then return.",
            },
            {
              icon: "search",
              title: "What happened on return",
              body: "What interested Ainsworth was not simply whether the baby became upset, but what happened when the mother came back.",
            },
          ],
        },
        {
          kind: "iconCards",
          heading: "What Ainsworth Noticed",
          intro:
            "These different patterns helped researchers understand what we now describe as secure, anxious and avoidant attachment strategies.",
          columns: 3,
          items: [
            { icon: "sun", title: "Some babies", body: "Sought comfort and quickly settled." },
            { icon: "flame", title: "Others", body: "Remained very distressed." },
            { icon: "wind", title: "Some", body: "Appeared to avoid or distance themselves from their mother." },
          ],
        },
        {
          kind: "callout",
          icon: "lightbulb",
          title: "From Babies to Adult Relationships",
          body: `Although this research began with babies, attachment theory has since been used to explore adult relationships too — some of the ways we seek safety and connection with each other.

The following activities are not to diagnose or pathologise you or your partner. As you work through this module, the aim is to become curious about your own patterns and those between you and your partner.`,
        },
        {
          kind: "sharedJournal",
          exerciseId: "m3-safe-and-connected",
          title: "When Connection Has Felt Safe",
          intro:
            "Take five minutes to explore how you respond within your relationship when connection has felt safe and predictable. Think about a time when you felt safe and connected within your relationship.",
          prompts: [
            "Describe this situation or event in as much detail as possible. Where were you both? What was happening? When was this?",
            "How did this situation make me feel about myself?",
            "How did this situation make me feel about my partner?",
            "How did this situation make me feel about my relationship?",
          ],
          partnerNote:
            "A time your partner felt safe and connected with you, in their own words.",
        },
        {
          kind: "callout",
          icon: "route",
          title: "Next: When Connection Feels Threatened",
          body: `Keep your answers to hand. In Part 4, we will invite you to come back to them.`,
        },
      ],
    },

    /* ---------------------------------------------------------------- 3 */
    {
      id: "attachment-part-3",
      title: "Part 3: When Connection Feels Threatened",
      summary:
        "How anxious and avoidant strategies can become much more noticeable when something threatens your sense of connection, and what happens for you when you feel disconnected.",
      estimatedMinutes: 20,
      blocks: [
        {
          kind: "video",
          title: "When Connection Feels Threatened",
          playbackId: "",
          durationSeconds: 360,
        },
        {
          kind: "prose",
          heading: "Until Something Happens",
          body: `Our attachment strategies often become much easier to see when something threatens our sense of connection.

You might generally feel secure and connected… until something happens. Then familiar protective strategies can suddenly become much more noticeable.`,
        },
        {
          kind: "iconCards",
          heading: "What Might Threaten Connection",
          columns: 3,
          items: [
            { icon: "message-circle", title: "Criticism" },
            { icon: "shield-alert", title: "Rejection" },
            { icon: "heart", title: "A change in affection or intimacy" },
          ],
        },
        {
          kind: "contrast",
          heading: "Two Kinds of Protective Strategy",
          columns: [
            {
              label: "Anxious strategies",
              icon: "flame",
              items: [
                "“Are we okay?”",
                "“Can we please sort this out now?”",
                "Seeking reassurance",
                "Finding uncertainty very difficult to tolerate",
                "Being on high alert to changes in your partner's behaviour",
              ],
            },
            {
              label: "Avoidant strategies",
              icon: "wind",
              items: [
                "“I do not want to talk about this.”",
                "Shutting down",
                "Becoming very logical rather than emotional",
                "Trying to deal with your feelings alone",
                "Telling yourself: “I do not need anyone anyway.”",
              ],
            },
          ],
          note: "Sometimes people move between both anxious and avoidant strategies.",
        },
        {
          kind: "flipCards",
          heading: "We Recognise These Too",
          intro: "Tap to see which one each of us relates to.",
          items: [
            {
              frontLabel: "Esther",
              front: "Anxious strategies",
              back: "“Now, this really resonates with me!”",
            },
            {
              frontLabel: "Laura",
              front: "Avoidant strategies",
              back: "“Now, this is definitely more me!”",
            },
          ],
        },
        {
          kind: "tapChoice",
          exerciseId: "m3-what-you-notice",
          title: "What Do You Notice in Yourself?",
          intro: "There are no right answers here — just a first moment of noticing.",
          questions: [
            {
              id: "when-threatened",
              text: "When your sense of connection feels threatened, what do you tend to notice first?",
              options: [
                {
                  value: "towards",
                  label: "I want to sort it out now",
                  response:
                    "Wanting to move towards connection is a very human response to uncertainty. The activity below will help you look at what happens next, and what you need underneath.",
                },
                {
                  value: "away",
                  label: "I want some space",
                  response:
                    "Needing space can be a way of protecting yourself when emotions or closeness feel overwhelming. Becoming curious about it is exactly where we start.",
                },
                {
                  value: "both",
                  label: "A bit of both",
                  response:
                    "Many people move between both strategies, depending on the situation. Noticing that is useful in itself.",
                },
                {
                  value: "unsure",
                  label: "I am not sure yet",
                  response:
                    "That is completely fine. The activity below may help you begin to notice what happens for you.",
                },
              ],
            },
          ],
        },
        {
          kind: "sharedJournal",
          exerciseId: "m3-feeling-disconnected",
          title: "When You Feel Disconnected",
          intro:
            "What happens to you when you feel disconnected from your partner? This activity begins to explore how you respond within your relationship when connection is unpredictable and challenging. Think about a recent event or situation when you felt disconnected from your partner.",
          prompts: [
            "Describe this situation or event in as much detail as possible. Where were you both? What was happening? When was this?",
            "How did this situation make me feel about myself?",
            "How did this situation make me feel about my partner?",
            "How did this situation make me feel about our relationship?",
            "What did I fear might happen?",
            "What did I do next? Did I move towards my partner? Move away? Seek reassurance? Become angry? Shut down?",
            "And underneath all of that, what did I actually need?",
          ],
          partnerNote:
            "A time your partner felt disconnected, in their own words. Read it with curiosity rather than correction.",
        },
        {
          kind: "callout",
          icon: "route",
          title: "Next: Attachment and Past Experiences",
          body: `Keep these answers, and your answers from Part 2, to hand. In Part 4 you will revisit them.`,
        },
      ],
    },

    /* ---------------------------------------------------------------- 4 */
    {
      id: "attachment-part-4",
      title: "Part 4: Attachment and Past Experiences",
      summary:
        "Why a situation can bring up a stronger reaction than you expect, how past experiences can shape the intensity of what you feel today, and why two things can be true at once.",
      estimatedMinutes: 20,
      blocks: [
        {
          kind: "video",
          title: "Attachment and Past Experiences",
          playbackId: "",
          durationSeconds: 420,
        },
        {
          kind: "prose",
          heading: "A Stronger Reaction Than You Expect",
          body: `Sometimes, the intensity of our reaction does not seem to quite match what has just happened.

This may be because something happening in the here and now is activating an attachment response shaped by experiences from our past — an earlier experience of loss, rejection or uncertainty.`,
        },
        {
          kind: "flow",
          heading: "An Example",
          steps: [
            {
              icon: "eye",
              title: "Your partner comes home quiet",
              body: "They come home from work and are unusually quiet, and suddenly you feel rejected.",
            },
            {
              icon: "message-circle",
              title: "They ask for space",
              body: "You ask them what is wrong, and they ask for some space.",
            },
            {
              icon: "flame",
              title: "A powerful fear",
              body: "You then experience a powerful fear that something is wrong with your relationship.",
            },
          ],
        },
        {
          kind: "contrast",
          heading: "Sometimes Clear, Sometimes Subtle",
          columns: [
            {
              label: "Sometimes you consciously recognise it",
              icon: "lightbulb",
              tone: "sage",
              items: [
                "“I am scared something is wrong, but this is not about us. This reminds me of something from my past.”",
              ],
            },
            {
              label: "But sometimes",
              icon: "search",
              items: ["It is much more subtle."],
            },
          ],
        },
        {
          kind: "iconCards",
          heading: "Experiences Across Our Whole Lives",
          intro:
            "Remember, our attachment strategies develop through relationships and experiences across our whole lives. That might include experiences within our family growing up, but it can also include:",
          columns: 3,
          items: [
            { icon: "users", title: "Family experiences", body: "Growing up, and since." },
            { icon: "heart", title: "Previous relationships" },
            { icon: "hourglass", title: "Bereavement" },
            { icon: "messages-square", title: "Friendship ruptures" },
            { icon: "shield-alert", title: "Infidelity or betrayal" },
            { icon: "mountain", title: "Bullying", body: "Or other times important relationships felt uncertain or unsafe." },
          ],
        },
        {
          kind: "callout",
          icon: "lightbulb",
          title: "A Really Useful Distinction",
          body: `Your partner may activate an attachment wound that they did not originally create.

When we do not recognise this, we can unconsciously expect our partner to repair something that began long before we met them.`,
        },
        {
          kind: "contrast",
          heading: "But We Need to Be Careful Here",
          columns: [
            {
              label: "We do not want you thinking or saying",
              icon: "search",
              items: [
                "“This feeling is just because of my childhood experience, so I should not feel this way.”",
                "“You are only upset because of your past.”",
              ],
            },
            {
              label: "Instead, we are inviting curiosity",
              icon: "sprout",
              tone: "sage",
              items: [
                "Your feelings are not wrong, and they should not be dismissed.",
                "Become curious about what is happening, rather than deciding either person's feelings are “just because of the past”.",
              ],
            },
          ],
        },
        {
          kind: "iconCards",
          heading: "Two Things Can Be True at the Same Time",
          columns: 2,
          items: [
            {
              icon: "heart-handshake",
              title: "Something now may need attention",
              body: "Something happening in your relationship right now may need attention.",
            },
            {
              icon: "hourglass",
              title: "The past may shape the intensity",
              body: "And your previous attachment experiences may be influencing how intensely you are experiencing it.",
            },
          ],
        },
        {
          kind: "sharedJournal",
          exerciseId: "m3-does-it-feel-familiar",
          title: "Does This Feel Familiar?",
          intro:
            "Revisit the answers you gave in Part 2 (When Connection Has Felt Safe) and Part 3 (When You Feel Disconnected), and use them to help you answer these questions.",
          prompts: [
            "Did this sensation, emotion or these thoughts feel familiar to me?",
            "If so, when did it feel familiar from? What is the earliest time I can remember feeling like this?",
            "What did this remind me of?",
          ],
          partnerNote:
            "Your partner's reflection on where this feeling may come from. Two things can be true at the same time — please hold it with curiosity, never as “just because of the past”.",
        },
        {
          kind: "callout",
          icon: "route",
          title: "Next: Your Attachment Cycle",
          body: `In Part 5 we zoom out a little, from your individual reactions to the pattern that can develop between you.`,
        },
      ],
    },

    /* ---------------------------------------------------------------- 5 */
    {
      id: "attachment-part-5",
      title: "Part 5: Your Attachment Cycle",
      summary:
        "How the qualities that first attracted you to each other can become amplified when connection feels uncertain, and mapping the cycle that can develop between you during conflict.",
      estimatedMinutes: 40,
      blocks: [
        {
          kind: "video",
          title: "Your Attachment Cycle",
          playbackId: "",
          durationSeconds: 360,
        },
        {
          kind: "prose",
          heading: "What First Attracted You",
          body: `Hopefully, you are starting to notice some of the ways you respond when you feel connected to your partner, and when that connection feels less certain.

Another really interesting thing about attachment is that sometimes the very qualities that initially attract us to our partner can later become the qualities that activate us — and not necessarily in a good way.`,
        },
        {
          kind: "contrast",
          heading: "Drawn to Difference",
          columns: [
            {
              label: "Someone using more anxious strategies may love their partner's",
              icon: "sparkles",
              items: ["Independence", "Calmness", "Self-sufficiency"],
            },
            {
              label: "Someone using more avoidant strategies may love their partner's",
              icon: "heart",
              tone: "sage",
              items: ["Warmth", "Affection", "Desire for closeness"],
            },
          ],
          note: "When the relationship feels threatened, those differences can become much more amplified.",
        },
        {
          kind: "flipCards",
          heading: "When Connection Feels Uncertain",
          intro: "Tap each card to see how an admired quality can be experienced differently.",
          items: [
            {
              frontLabel: "At first, admired as",
              front: "Independence",
              backLabel: "Under pressure, felt as",
              back: "Distance — or even abandonment — during conflict.",
            },
            {
              frontLabel: "At first, admired as",
              front: "Warmth and a desire for closeness",
              backLabel: "Under pressure, felt as",
              back: "Overwhelming, when your partner seeks reassurance.",
            },
          ],
        },
        {
          kind: "callout",
          icon: "refresh-cw",
          title: "Where Couples Can Become Caught",
          body: `These differences can become part of a cycle between you.

For this next activity, we want you to zoom out a little. Rather than focusing only on your individual reactions, start mapping your attachment cycle during conflict — the pattern that can develop between you when you feel disconnected, misunderstood or under pressure.`,
        },
        {
          kind: "callout",
          icon: "shield-check",
          title: "Choose a Manageable Disagreement",
          body: `Choose a relatively manageable disagreement to reflect on, rather than one of your most painful or difficult arguments.`,
        },
        {
          kind: "pairedReflection",
          exerciseId: "m3-attachment-cycle",
          eyebrow: "Module 3 · Part 5",
          title: "Mapping Your Attachment Cycle",
          individual: {
            title: "Individual Reflection",
            intro:
              "Start by thinking of a specific disagreement and describe it in as much detail as you can. Complete these questions separately before sharing them with your partner.",
            questions: [
              {
                id: "disagreement",
                label: "What happened?",
                hint: "Where were you? What was happening at the time? What seemed to trigger the disagreement?",
              },
              {
                id: "telling-myself",
                label: "What was I telling myself about what was happening?",
              },
              {
                id: "partner-meant",
                label: "What did I think my partner's behaviour meant?",
              },
              {
                id: "my-response",
                label: "How did I respond?",
                hint: "Did I tend to move towards my partner, seek reassurance, explain, question or pursue? Or did I tend to pull away, become quiet, shut down, avoid or need space?",
              },
              {
                id: "effect",
                label: "What effect did my response seem to have on my partner?",
              },
              {
                id: "they-did-next",
                label: "What did they do next?",
              },
              {
                id: "i-did-then",
                label: "What did I then do in response to them?",
              },
            ],
          },
          together: {
            title: "Going a Little Deeper, Together",
            intro:
              "Now go a little deeper and do this part of the activity together. Help your partner understand what is happening underneath. Each of you completes the sentences in turn, then you look at the cycle you have identified as one.",
            steps: COMING_BACK_TOGETHER_STEPS,
            questions: [
              {
                id: "underneath",
                label:
                  "When I pursue you, underneath I am often feeling… or: When I withdraw from you, underneath I am often feeling…",
                hint: "Each of you completes whichever sentence fits you.",
              },
              {
                id: "need-from-you",
                label: "What I actually need from you in that moment is…",
              },
              {
                id: "provide-for-myself",
                label: "What I can provide for myself in that moment is…",
              },
              {
                id: "cycle-next",
                label: "When this cycle starts between us, what tends to happen next?",
                hint: "Finally, come together and look at the cycle you have identified.",
              },
            ],
          },
          revealNote:
            "The purpose is not to decide who started it or who is to blame. It is to understand the pattern that happens between you.",
          closing: {
            text: "Once you have completed the individual reflections and explored the final question together, move on to the next video.",
          },
        },
      ],
    },

    /* ---------------------------------------------------------------- 6 */
    {
      id: "attachment-part-6",
      title: "Part 6: Building Greater Security",
      summary:
        "Not changing who you are, but developing more flexible ways of responding — what secure attachment really looks like, and how reliability, honesty, boundaries and repair can build security together.",
      estimatedMinutes: 35,
      blocks: [
        {
          kind: "video",
          title: "Building Greater Security",
          playbackId: "",
          durationSeconds: 480,
        },
        {
          kind: "prose",
          heading: "It Is Flexibility",
          body: `The goal is not to turn an anxious partner into an avoidant partner, or an avoidant partner into an anxious one.

The aim is not to change who you are, but to develop more flexible ways of responding when you feel disconnected.`,
        },
        {
          kind: "contrast",
          heading: "What Growth Might Involve",
          columns: [
            {
              label: "If you tend to pursue",
              icon: "flame",
              tone: "sage",
              items: [
                "Noticing your activation",
                "Finding ways to settle and regulate yourself",
                "Tolerating some uncertainty",
              ],
            },
            {
              label: "If you tend to withdraw",
              icon: "wind",
              tone: "sage",
              items: [
                "Staying emotionally present slightly longer",
                "Communicating rather than disappearing",
                "If you need space, agreeing when you will return to the conversation — and returning when you said you would",
              ],
            },
          ],
        },
        {
          kind: "contrast",
          heading: "So What Does Secure Attachment Look Like?",
          columns: [
            {
              label: "It does not mean you never",
              icon: "search",
              items: [
                "Feel jealous",
                "Feel anxious",
                "Get things wrong",
                "Communicate imperfectly",
              ],
            },
            {
              label: "It is often more visible in what happens after we become activated",
              icon: "shield-check",
              tone: "sage",
              items: [
                "Can I recognise what I am feeling?",
                "Can I communicate what I need?",
                "Can we disagree without experiencing every conflict as a threat to the relationship?",
              ],
            },
          ],
        },
        {
          kind: "flipCards",
          heading: "And When We Get It Wrong: Can We Repair?",
          intro: "Tap each card for words that can begin a repair.",
          items: [
            { front: "Owning it", back: "“I am sorry.”" },
            { front: "Reflecting", back: "“I did not handle that very well.”" },
            { front: "Trying again", back: "“Can we try that conversation again?”" },
          ],
        },
        {
          kind: "callout",
          icon: "leaf",
          tone: "dark",
          title: "Security Is Not About Perfection",
          body: `It is about flexibility, connection and repair.`,
        },
        {
          kind: "iconCards",
          heading: "Relationships Can Become Places of Something Different",
          intro:
            "A healthy, consistent relationship can become a place where insecure attachment strategies gradually begin to shift. Over time, repeated experiences of these can contribute to a growing sense of security:",
          columns: 3,
          items: [
            { icon: "calendar-clock", title: "Reliability" },
            { icon: "eye", title: "Honesty" },
            { icon: "compass", title: "Appropriate independence" },
            { icon: "shield", title: "Boundaries" },
            { icon: "refresh-cw", title: "Repair" },
            {
              icon: "heart-handshake",
              title: "Finding your way back",
              body: "“When something goes wrong between us, we can find our way back to each other.”",
            },
          ],
        },
        {
          kind: "contrast",
          heading: "Supporting Each Other, Taking Responsibility for Yourself",
          columns: [
            {
              label: "What is not possible",
              icon: "search",
              items: [
                "Your partner cannot heal everything for you.",
                "You cannot be responsible for regulating everything for your partner.",
              ],
            },
            {
              label: "What is possible",
              icon: "sprout",
              tone: "sage",
              items: [
                "You can absolutely influence the emotional environment you create together.",
              ],
            },
          ],
        },
        {
          kind: "pairedReflection",
          exerciseId: "m3-building-security",
          eyebrow: "Module 3 · Part 6",
          title: "Building Greater Security Together",
          intro:
            "These questions are designed to be read and answered together. You may like to note your own answers first, then share them and talk them through.",
          individual: {
            title: "My Answers",
            intro: "Each of you answers for yourself, speaking to your partner.",
            questions: [
              { id: "safest", label: "When do I feel safest and most connected to you?" },
              { id: "activates", label: "What tends to activate insecurity in me?" },
              { id: "recognise", label: "How might you recognise when I am becoming activated?" },
              {
                id: "reassured",
                label:
                  "What helps me feel reassured without making you responsible for all of my feelings?",
              },
              {
                id: "ask-for-space",
                label: "How can I ask for space without making you feel abandoned?",
              },
            ],
          },
          together: {
            title: "Together",
            intro: "Once you have both shared, answer these as a couple.",
            steps: COMING_BACK_TOGETHER_STEPS,
            questions: [
              { id: "reconnect", label: "What helps us reconnect after conflict?" },
              {
                id: "emotional-safety",
                label: "What does emotional safety look like for each of us?",
              },
              {
                id: "one-thing",
                label:
                  "And finally: what is one thing each of us can do this week that could help our relationship feel a little more secure?",
              },
            ],
          },
          revealNote:
            "You can support each other while also taking responsibility for your own responses.",
          closing: {
            text: "Come back to us once you have finished.",
          },
        },
      ],
    },

    /* ---------------------------------------------------------------- 7 */
    {
      id: "attachment-part-7",
      title: "Part 7: Facts, Feelings and Fears",
      summary:
        "A simple way of talking about what is happening when you become activated: separating the fact, the feeling and the fear or story — alongside where you are on your Polyvagal Ladder.",
      estimatedMinutes: 30,
      blocks: [
        {
          kind: "video",
          title: "Facts, Feelings and Fears",
          playbackId: "",
          durationSeconds: 600,
        },
        {
          kind: "prose",
          heading: "What Happened, and What It Means",
          body: `Now that you have started to recognise what happens in your attachment cycle, we want to give you a simple way of talking about what is happening when you become activated.

When something happens between us, we do not just respond to what happened. We also respond to what we think it means. And those two things are not always the same.`,
        },
        {
          kind: "flow",
          heading: "Slowing It Down in Three Parts",
          intro: "Imagine you have sent your partner a message and they do not reply.",
          steps: [
            {
              icon: "eye",
              title: "The fact",
              body: "What happened? “My partner did not reply to my message.”",
            },
            {
              icon: "heart",
              title: "The feeling",
              body: "How did I feel? “I felt anxious and concerned.”",
            },
            {
              icon: "message-circle",
              title: "The fear or story",
              body: "What meaning did my mind give it? “I am not important to you.” Or: “Something is wrong between us.”",
            },
          ],
        },
        {
          kind: "accordion",
          heading: "Notice Your Nervous System Too",
          intro:
            "Bring in something we covered in the previous module: where are you on your Polyvagal Ladder? You do not need to analyse this perfectly. Just begin to notice what is happening in your body alongside what is happening in your mind.",
          items: [
            {
              icon: "sun",
              title: "Ventral",
              body: "Were you initially in ventral, feeling relatively safe, settled and connected?",
            },
            {
              icon: "flame",
              title: "Sympathetic",
              body: "Have you moved into sympathetic activation, where you might feel anxious, restless, angry or ready to fight or flee?",
            },
            {
              icon: "pause-circle",
              title: "Dorsal",
              body: "Or have you moved towards the freeze of dorsal, where you might feel shut down, numb, disconnected or want to withdraw?",
            },
          ],
        },
        {
          kind: "callout",
          icon: "lightbulb",
          title: "The Story Is Not Necessarily the Facts",
          body: `This is where your nervous system, combined with your attachment strategies, can start to influence how you experience what is happening.

Our minds are very good at trying to make sense of uncertainty, particularly when connection feels threatened. But the story our mind creates is not necessarily the facts.`,
        },
        {
          kind: "prose",
          heading: "Your Feelings Are Real",
          body: `If you feel anxious, hurt, rejected or disconnected, that is your emotional experience.

But the meaning you have attached to what happened may or may not be true. The difficulty comes when we respond as though our interpretation is true.`,
        },
        {
          kind: "contrast",
          heading: "Notice the Difference",
          columns: [
            {
              label: "Instead of saying",
              icon: "flame",
              items: ["“You obviously do not care about me. You could not even be bothered to reply.”"],
            },
            {
              label: "We can slow it down",
              icon: "ear",
              tone: "sage",
              items: [
                "“When I did not hear from you, I noticed I became really anxious. My mind started telling me something was wrong between us. Can we talk about what happened?”",
              ],
            },
          ],
          note: "You are still communicating that something affected you. You are not dismissing your feelings or pretending everything is fine. But you are sharing your experience without telling your partner what they were thinking, feeling or intending — and without turning your feelings into blame.",
        },
        {
          kind: "worksheet",
          exerciseId: "m3-facts-feelings-fears",
          title: "Facts, Feelings and Fears",
          intro:
            "Next time you notice yourself becoming activated by a situation with your partner, use this worksheet to separate the facts, your feelings and the fear or story you are telling yourself. Think of a recent, manageable moment when you noticed yourself becoming activated or disconnected in your relationship. Avoid choosing your most painful or difficult conflict.",
          fields: [
            {
              id: "fact",
              section: "1. What Was the Fact?",
              label: "The facts were:",
              type: "text",
              hint: "What objectively happened? Try to describe only what you saw and heard, without adding assumptions about your partner's intentions.",
            },
            {
              id: "feeling",
              section: "2. What Did You Feel?",
              label: "I felt:",
              type: "text",
              hint: "What emotions came up for you?",
            },
            {
              id: "fear",
              section: "3. What Was the Fear or Story?",
              label: "My mind started telling me:",
              type: "text",
              hint: "What meaning did your mind begin to attach to what happened?",
            },
            {
              id: "ladder",
              section: "4. What Happened in Your Nervous System?",
              label: "Where did you notice yourself moving on your Polyvagal Ladder?",
              type: "choices",
              options: [
                "Ventral – safe, settled, connected",
                "Sympathetic – anxious, restless, angry, fight or flight",
                "Dorsal – shut down, numb, disconnected, withdrawn",
              ],
            },
            {
              id: "body",
              label: "What did you notice in your body?",
              type: "text",
            },
            {
              id: "put-together",
              section: "5. Now Put It Together",
              label: "Complete this sentence:",
              type: "text",
              hint: "“When … happened, I felt … I noticed my mind started telling me … Can we talk about what happened?”",
            },
          ],
          partnerNote:
            "Your partner is sharing their experience — the fact, the feeling and the story their mind told them. Listen with curiosity rather than defence.",
          closing: {
            heading: "Before You Share",
            body: "Ask yourself:",
            question:
              "Am I describing my experience, or am I assuming what my partner thought, felt or intended?",
            pull: "Am I sharing how I felt, or am I turning my feelings into blame?",
          },
        },
      ],
    },

    /* ---------------------------------------------------------------- 8 */
    {
      id: "attachment-part-8",
      title: "Part 8: Moving Forward Together",
      summary:
        "Bringing the module together: not labels, but understanding what happens for each of you and between you — and how security grows through reliability, honesty, boundaries and repair.",
      estimatedMinutes: 25,
      blocks: [
        {
          kind: "video",
          title: "Moving Forward Together",
          playbackId: "",
          durationSeconds: 300,
        },
        {
          kind: "prose",
          heading: "So Where Does All of This Take Us?",
          body: `Understanding attachment is not about labelling yourself or your partner. It is about recognising what happens for each of you, and the patterns that develop between you.`,
        },
        {
          kind: "contrast",
          heading: "Hopefully Not Towards a Label",
          columns: [
            {
              label: "Hopefully not towards",
              icon: "search",
              items: ["“I am anxious and you are avoidant.”"],
            },
            {
              label: "But towards",
              icon: "sprout",
              tone: "sage",
              items: [
                "“I am beginning to understand what happens to me.”",
                "“I am beginning to understand what happens to you.”",
                "“We are beginning to recognise what happens between us.”",
              ],
            },
          ],
        },
        {
          kind: "iconCards",
          heading: "How Security Develops",
          intro:
            "To recap: secure attachments develop through repeated experiences of —",
          columns: 3,
          items: [
            { icon: "calendar-clock", title: "Reliability" },
            { icon: "eye", title: "Honesty" },
            { icon: "shield", title: "Respect for boundaries" },
            { icon: "message-circle", title: "Communicating needs" },
            { icon: "refresh-cw", title: "Repair" },
          ],
        },
        {
          kind: "callout",
          icon: "heart-handshake",
          tone: "dark",
          title: "One of the Most Powerful Experiences",
          body: `“Something can go wrong between us, and we can find our way back together.”`,
        },
        {
          kind: "accordion",
          heading: "What You Each Bring",
          items: [
            {
              icon: "heart",
              title: "Your partner cannot heal everything",
              body: "Your partner cannot heal everything that happened before you met them.",
            },
            {
              icon: "wind",
              title: "You cannot regulate everything",
              body: "You cannot be responsible for regulating every difficult emotion your partner experiences.",
            },
            {
              icon: "users",
              title: "But you both contribute",
              body: "You both contribute to the emotional environment you create together — a relationship where, when things go wrong, you can find your way back to each other.",
            },
          ],
        },
        {
          kind: "pairedReflection",
          exerciseId: "m3-moving-forward",
          eyebrow: "Module 3 · Part 8",
          title: "Looking Back on This Module",
          intro:
            "Take a little time to reflect on what you have learned throughout this module. You might like to think about the questions individually first, then share your answers with each other.",
          individual: {
            title: "Individual Reflection",
            questions: [
              {
                id: "learned-self",
                label:
                  "What have I learned about myself and how I respond when I feel disconnected?",
              },
              {
                id: "learned-partner",
                label: "What have I learned about my partner and what helps them feel secure?",
              },
            ],
          },
          together: {
            title: "Coming Back Together",
            intro:
              "As you share, try to listen with curiosity and focus on understanding each other.",
            steps: COMING_BACK_TOGETHER_STEPS,
            questions: [
              {
                id: "patterns",
                label: "What patterns have we begun to recognise between us?",
              },
              {
                id: "practise",
                label: "What is one small thing we would both like to practise moving forward?",
              },
            ],
          },
          revealNote:
            "Greater security is not about getting everything right. It is about gradually finding different ways to respond to ourselves and each other.",
          closing: {
            text: "And remember, even when you feel disconnected, it does not necessarily mean you have lost each other.",
          },
        },
      ],
    },
  ],
};
