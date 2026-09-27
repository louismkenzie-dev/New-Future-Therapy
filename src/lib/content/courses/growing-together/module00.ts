import type { CourseModule } from "../types";

/* The Introduction that precedes Module One — Laura and Esther's welcome to
   the Couples Relationship Programme and the Ground Rules worksheet the
   couple completes together before beginning. Copy is the therapists' own
   (Intro Script / Intro Written Instructions / Ground Rules Worksheet),
   lightly edited to house style. */

export const module00: CourseModule = {
  id: "introduction",
  number: 0,
  title: "Before You Begin",
  lede: "A welcome from Laura and Esther, what this programme is — and is not — and the ground rules you agree together before Module One.",
  essence: "Begin with curiosity, respect and a willingness to understand each other a little differently.",
  lessons: [
    {
      id: "welcome-to-the-programme",
      title: "Welcome to the Programme",
      summary:
        "Who this programme is for, how to look after yourselves as you work through it, and how to approach each other with respect and curiosity.",
      estimatedMinutes: 15,
      preview: true,
      blocks: [
        {
          kind: "video",
          title: "Welcome from Laura and Esther",
          playbackId: "",
          durationSeconds: 540,
        },
        {
          kind: "prose",
          body: `Welcome to our NewFuture Therapy Couples Relationship Programme.

We are Laura and Esther — identical twins, qualified counsellors and couples therapists based in Yorkshire.

We have created this programme to help you understand why you can get stuck in the same relationship patterns, communicate more effectively, feel more connected and navigate conflict in a less painful way.

Throughout the programme, you will find practical information, individual and couples activities, and guided reflection exercises to help you learn more about yourself, your partner and what happens between you.

Before you begin, please read the following information carefully. It will help you decide whether this programme is right for you and whether now is the right time to complete it together.`,
        },
        {
          kind: "prose",
          heading: "Who Is This Programme For?",
          body: `This programme is designed for couples over the age of 18 who want to understand more about their relationship and feel more fulfilled and connected.

It may be helpful if:

- Your relationship is generally going well and you want to strengthen it.
- You find yourselves having the same arguments or disagreements repeatedly.
- Communication, trust or intimacy has become challenging.
- You have been together for a long time and want to reinvest time and effort into your relationship.`,
        },
        {
          kind: "prose",
          heading: "An Inclusive Programme",
          body: `Relationships come in many different forms. This programme is designed to be inclusive of couples of all genders, sexual orientations, cultures and backgrounds.

Throughout the programme, we use words such as partner or couple simply to make the material easier to follow. We know these terms will not reflect every relationship structure, so please adapt them in any way that feels right for you.

Our intention throughout is to use language that feels respectful and welcoming to everyone.`,
        },
        {
          kind: "prose",
          heading: "What This Programme Is — and Is Not",
          body: `This is a psychoeducational, self-led, online relationship programme.

We will introduce you to counselling theories and techniques, alongside practical tools based on our research, knowledge and experience as counsellors and couples therapists.

This programme is not the same as individual counselling or couples therapy. We do not know your personal circumstances, so the information we provide cannot replace professional assessment, counselling, medical advice or crisis support.

The activities are designed to encourage curiosity about yourself and your partner and to open up conversations. They are not designed to tell you what you should or should not do within your relationship.`,
        },
        {
          kind: "prose",
          heading: "Look After Yourself as You Work Through the Programme",
          body: `Some of the subjects we explore may bring up difficult emotions. These include:

- attachment strategies
- nervous system responses
- conflict and communication styles
- boundaries
- intimacy
- trust

You may discover things about yourself or your relationship that you had not previously realised or thought about.

Go at your own pace. There is no benefit in pushing through an activity simply to get it done. You can pause, take a break, return another day, skip something or decide that a particular activity is not right for you.

Pay attention to what you are physically experiencing in your body, as well as what you are thinking and feeling emotionally. If you become overwhelmed, or a conversation becomes heated or confrontational and you are unable to engage constructively, stop the activity rather than pushing through it. Take some time to regulate and return when you both feel able to engage safely and constructively.

If something significant comes up that feels too difficult to manage on your own, consider seeking support from a qualified professional.`,
        },
        {
          kind: "prose",
          heading: "Approach Each Other With Respect and Curiosity",
          body: `You may remember the same event differently. Something that felt insignificant to one of you may have had a much greater impact on the other.

The aim is not to prove whose version is correct. Instead, try to become curious about your partner's experience, the meaning they have placed on it and the impact it may have had.

Try to listen without immediately defending or correcting. You do not have to agree with your partner's experience or feelings in order to listen to them.

You also always have a choice about what you share. If an activity is an individual reflection, you do not automatically have to share your answers with your partner.`,
        },
        {
          kind: "prose",
          heading: "When This Programme Is Not Appropriate",
          body: `There are circumstances where a self-led relationship programme may not be appropriate.

If there is any form of abuse or controlling behaviour within your relationship, or you do not feel able to express yourself safely, we would not recommend completing this programme together. Please consider seeking appropriate professional or specialist support instead.`,
        },
        {
          kind: "prose",
          heading: "There Are No Perfect Answers",
          body: `This programme is not a test. You do not need to agree with everything we say, and you do not need to approach every activity in exactly the same way.

Some parts may feel incredibly relevant to your relationship. Others may not quite fit. Take what is useful, remain curious and open about what you notice, and give yourselves time to think about what you are learning and what you would like to put into practice.`,
        },
        {
          kind: "quote",
          text: "Improving a relationship is not about becoming a perfect couple. It is about developing greater awareness, understanding and connection, as well as having more choice in how you respond to each other.",
          attribution: "Laura and Esther",
        },
        {
          kind: "prose",
          heading: "Before Module One: Agree Your Ground Rules",
          body: `Before starting Module One, spend some time discussing how you are going to complete this programme together. We have created a Ground Rules Worksheet — the next step in this Introduction — to help you do this.

Choose a time when you are not rushing, exhausted or likely to be distracted. Be realistic, but try to create some consistency. We suggest completing approximately one module each week.

Some activities may bring up difficult, upsetting or confrontational conversations. Agree in advance how either of you can ask for a pause. You might simply use the words “Time out.” Depending on what has come up, you may need a ten-minute break or you may need to return to the activity the following day. Taking a break is not about avoiding something difficult. It is about allowing yourselves time to settle and regulate so you can return when you are both more able to talk and listen.

Consider what you need from each other while completing the programme. Can you agree to listen without interrupting? To avoid sarcasm or dismissive comments? To allow your partner to have a different experience or opinion? To respect when your partner is not ready to answer something? To avoid demanding answers from each other?

And one final ground rule that we consider particularly important — one we always discuss in our counselling room: do not use something your partner shares openly or vulnerably during this programme against them later. You both need to be able to speak honestly without worrying that something you have shared will become ammunition in a future disagreement.

Complete your Ground Rules Worksheet together and decide what your boundaries and agreements will be. Once you have done that, you are ready to begin Module One: Your Relationship Journey.

Enjoy!

Laura & Esther, NewFuture Therapy`,
        },
      ],
    },
    {
      id: "our-ground-rules",
      title: "Our Ground Rules",
      summary:
        "Before Module One, decide together how you want to complete this programme — when, where, how you will pause, and what will remain private.",
      estimatedMinutes: 40,
      blocks: [
        {
          kind: "prose",
          body: `Before beginning Module One, take some time to think about how you want to complete this programme together. Do not rush this part.

Creating the right conditions can make it easier to be open, curious and respectful when you reach subjects that feel more challenging. Discuss the questions below together and write down anything you would like to agree before you begin. With linked accounts, the answers you write together are saved once, for both of you — either of you can return and add to them.`,
        },
        {
          kind: "pairedReflection",
          exerciseId: "ground-rules",
          eyebrow: "Worksheet",
          title: "Our Ground Rules",
          order: "togetherFirst",
          together: {
            title: "Decide Together",
            intro:
              "Talk each question through and write down what you agree. There are no right answers — only the ones that fit your relationship.",
            questions: [
              {
                id: "when",
                label: "When will we do the programme?",
                hint:
                  "Think realistically about when you are most likely to have the time and emotional capacity to engage. When would be a good time for us? Is there a particular day or time that would work? Are there times we should avoid — for example, when we are tired, rushing, drinking alcohol, looking after children or about to go to bed?",
              },
              {
                id: "where",
                label: "Where will we do it?",
                hint:
                  "Think about somewhere you can talk without being regularly interrupted or overheard. What environment would help us both feel comfortable and able to concentrate?",
              },
              {
                id: "pause",
                label: "How will we know when we need a pause?",
                hint:
                  "Some conversations may bring up stronger emotions than you expected. What might we notice in ourselves when we are becoming overwhelmed? What words could either of us use to say, “I need to stop for now”? How can we respect this without seeing it as rejection or avoidance?",
              },
              {
                id: "return",
                label: "How will we come back to the conversation?",
                hint:
                  "A pause works best when there is an intention to return. If one of us needs to stop, how will we agree when to come back to the conversation? What might each of us need before we return?",
              },
              {
                id: "treat",
                label: "How do we want to treat each other? Three things we agree to do:",
                hint:
                  "Discuss what respectful participation looks like in your relationship. For example: listening without interrupting; not mocking or dismissing an answer; not using something vulnerable that has been shared against each other later; not demanding an answer; allowing each other to remember events differently; trying to understand before responding.",
              },
              {
                id: "private",
                label: "What will remain private?",
                hint:
                  "You do not have to share every thought or every written reflection with your partner. Discuss what privacy means while completing this programme. How will we respect each other's personal reflections? What are we comfortable sharing? What would we prefer to keep to ourselves?",
              },
              {
                id: "support",
                label: "What support do we have outside our relationship? People or services we can turn to:",
                hint:
                  "Your partner does not have to be your only source of emotional support. Consider the people and resources available to you individually and together. Who could I speak to if something difficult comes up? Who helps me feel grounded or supported? Would there be circumstances where I would want professional support?",
              },
              {
                id: "agreement",
                label: "Our agreement: while completing this programme, we want to try to…",
                hint: "Before moving on, complete this sentence together.",
              },
            ],
          },
          individual: {
            title: "What I Need From My Partner",
            intro:
              "Complete this part individually before sharing your answers. Then take turns sharing. You do not need to fix or change your partner's response — for now, simply listen.",
            questions: [
              {
                id: "listened",
                label:
                  "When we are doing this programme, something that would help me feel listened to is…",
              },
              {
                id: "upset",
                label: "If I become upset or overwhelmed, what I would like from you is…",
              },
              {
                id: "unhelpful",
                label: "Something I do not find helpful when I am struggling is…",
              },
              {
                id: "disagree",
                label: "One thing I would like us both to remember when we disagree is…",
              },
              {
                id: "bring",
                label: "Something I want to bring to this programme is…",
              },
              {
                id: "understand-self",
                label: "Something I hope to understand better about myself is…",
              },
              {
                id: "understand-us",
                label: "Something I hope to understand better about our relationship is…",
              },
            ],
          },
          revealNote:
            "Take turns reading your answers aloud. You do not need to fix or change your partner's response. For now, simply listen.",
          closing: {
            text: "You do not need to know where this programme will take you. For now, the invitation is simply to begin with curiosity, respect and a willingness to understand each other a little differently.",
          },
        },
      ],
    },
  ],
};
