import type { CourseModule } from "../types";

/* Module 6 — Boundaries, Privacy and Secrecy. Three parts, each opening
   with Laura and Esther's video, then the teaching broken into small
   screens, then the activity. Copy is the therapists' own: the
   Module 6 Written Versions 1–3 are the primary wording of the teaching
   screens, Activities 1 and 2 are the Part 1 and Part 2 activities, and
   Scripts 1–3 fill the gaps and set the video lengths (about 120 spoken
   words per minute). There is no separate Activity 3: Part 3's reflection
   is the "one final question" in Written Version 3 and Script 3. The
   combined "Module 6 Boundaries FULL Script and Activities" document
   confirms the order and matches the per-part files. The Part 2
   worksheet reuses the design of Laura and Esther's earlier Privacy vs
   Secrecy worksheet (privacyVsSecrecy.ts) with the new Activity 2
   questions. Lightly edited to house style: British English, no
   contractions, "your partner" throughout. */

const TAKE_TURNS_STEPS = [
  "Take turns sharing your reflections. Give each other time to speak.",
  "Listen with curiosity rather than judgement.",
  "Then answer the together questions as one.",
];

export const module06: CourseModule = {
  id: "boundaries-privacy-and-secrecy",
  number: 6,
  title: "Boundaries, Privacy and Secrecy",
  lede: "Boundaries, privacy and secrecy are closely connected, but they are not the same thing. Understanding the difference can help build trust, respect and connection within your relationship.",
  essence: "Connection does not require us to give up our individuality, and trust does not require us to give up our privacy.",
  lessons: [
    /* ---------------------------------------------------------------- 1 */
    {
      id: "boundaries-part-1",
      title: "Part 1: Understanding Boundaries",
      summary:
        "What boundaries are and are not, the difference between a boundary and control, why boundaries can feel difficult, and the difference between a boundary and a wall. Then reflect on your boundaries together.",
      estimatedMinutes: 30,
      blocks: [
        {
          kind: "video",
          title: "Understanding Boundaries — Part 1",
          playbackId: "",
          durationSeconds: 505,
        },
        {
          kind: "prose",
          heading: "Boundaries, Privacy and Secrecy",
          body: `In this module, we are going to explore boundaries, privacy and secrecy, and how understanding these can help build trust, respect and connection within a relationship.

There are some important questions that often arise when we talk about these subjects.`,
        },
        {
          kind: "iconCards",
          heading: "Questions From the Counselling Room",
          intro:
            "These are questions that frequently come up in the counselling room and can create considerable tension between partners.",
          columns: 3,
          items: [
            { icon: "message-circle", title: "Should you tell your partner absolutely everything?" },
            { icon: "lock", title: "Should they have access to your phone, messages and social media passwords?" },
            { icon: "search", title: "If you want to keep something to yourself, does that mean you have something to hide?" },
          ],
        },
        {
          kind: "callout",
          icon: "compass",
          title: "Closely Connected, but Not the Same",
          body: `Although boundaries, privacy and secrecy are closely connected, they are not the same thing. Let us start by looking at boundaries.`,
        },
        {
          kind: "contrast",
          heading: "Understanding Boundaries",
          intro:
            "Boundaries have become a popular topic, particularly on social media. We often hear messages encouraging us to set better boundaries, not allow people to cross them or walk away when they are not respected. However, boundaries can sometimes be misunderstood.",
          columns: [
            {
              label: "Boundaries are not about",
              icon: "shield-alert",
              items: ["Getting our own way", "Controlling our partner", "Avoiding difficult conversations"],
            },
            {
              label: "Boundaries are about",
              icon: "heart-handshake",
              tone: "sage",
              items: [
                "Recognising our own needs",
                "Understanding what we feel comfortable with",
                "Identifying what we are responsible for within a relationship",
              ],
            },
          ],
        },
        {
          kind: "callout",
          icon: "shield-check",
          tone: "dark",
          title: "What Is a Boundary?",
          body: `A boundary is a way of recognising and communicating what is acceptable or unacceptable to us, what we are willing to participate in and what we might need to do to look after our own wellbeing.`,
        },
        {
          kind: "accordion",
          heading: "Different Areas of Our Lives",
          intro: "Boundaries can apply to many different areas of our lives and relationships. Tap each one to open it.",
          items: [
            {
              icon: "heart",
              title: "Emotional boundaries",
              body: "Emotional boundaries relate to how we want others to treat and speak to us, particularly during difficult conversations.",
            },
            {
              icon: "hand-heart",
              title: "Physical boundaries",
              body: "Physical boundaries involve personal space, physical affection and touch.",
            },
            {
              icon: "flame",
              title: "Sexual boundaries",
              body: "Sexual boundaries relate to what we feel comfortable with sexually, including our right to say no or change our minds.",
            },
            {
              icon: "smartphone",
              title: "Digital boundaries",
              body: "Digital boundaries involve privacy around our phones, social media and communication with others.",
            },
            {
              icon: "wallet",
              title: "Financial boundaries",
              body: "Financial boundaries relate to how we manage money, spending and shared financial responsibilities.",
            },
          ],
        },
        {
          kind: "prose",
          body: `Our boundaries may also change over time as our needs, experiences and circumstances change.`,
        },
        {
          kind: "flipCards",
          heading: "Boundaries Versus Control",
          intro:
            "One of the most important distinctions to understand is the difference between communicating a personal boundary and trying to control somebody else's behaviour. Tap each card to turn it over.",
          items: [
            {
              frontLabel: "Saying",
              front: "“You are not allowed to go out with your friends.”",
              backLabel: "Notice",
              back: "This is not a personal boundary. It is an attempt to dictate what a partner can and cannot do.",
            },
            {
              frontLabel: "A healthier boundary",
              front: "“Spending quality time together is important to me. If we regularly make plans and those plans are cancelled or pushed aside, I am going to stop rearranging my own commitments to accommodate that.”",
              backLabel: "Notice the difference",
              back: "This does not prevent a partner from seeing their friends. Instead, it communicates what matters to us, what is not working and what we will do if that pattern continues.",
            },
          ],
        },
        {
          kind: "contrast",
          heading: "Requests and Boundaries",
          intro:
            "We can still ask our partner to make changes or have conversations about how we spend our time together.",
          columns: [
            {
              label: "A request",
              icon: "message-circle",
              items: ["Is about what we would like our partner to do"],
            },
            {
              label: "A boundary",
              icon: "shield-check",
              tone: "sage",
              items: ["Is about what we will do"],
            },
          ],
          note: "Both requests and boundaries have an important place in healthy relationships.",
        },
        {
          kind: "accordion",
          heading: "Why Setting Boundaries Can Feel Difficult",
          intro:
            "For some people, communicating boundaries comes quite naturally. For others, it can feel incredibly uncomfortable. Our experiences growing up and in previous relationships can influence how comfortable we feel expressing our needs.",
          items: [
            {
              icon: "house",
              title: "Where it can begin",
              body: `Perhaps we grew up in a family where expressing our needs was considered selfish. Maybe we learnt that being a good person meant putting everybody else first.

Or perhaps we experienced relationships where saying no led to criticism, anger, rejection or withdrawal of affection.

Over time, we may have learnt to keep the peace by accommodating other people's needs, even when doing so came at a cost to ourselves.`,
            },
            {
              icon: "refresh-cw",
              title: "How it can show up now",
              body: `These patterns can continue into our adult relationships. We might find ourselves:

- Saying yes when we really want to say no
- Avoiding expressing our feelings because we do not want to upset our partner
- Expecting our partner to recognise what we need without us having to communicate it

When they do not recognise those needs, we may feel disappointed or misunderstood.`,
            },
          ],
        },
        {
          kind: "callout",
          icon: "lightbulb",
          title: "What Feels Obvious to Us",
          body: `Our partner cannot always know what our boundaries are if we have not communicated them.

We sometimes assume that what feels obvious to us should also be obvious to somebody else. But we all bring different experiences, expectations and understandings into our relationships.`,
        },
        {
          kind: "iconCards",
          heading: "Recognising When a Boundary May Be Needed",
          intro:
            "Our emotions can often provide useful clues that we may need to establish or communicate a boundary. We might notice:",
          columns: 2,
          items: [
            { icon: "flame", title: "Resentment", body: "Building because we repeatedly agree to things we do not want to do." },
            { icon: "battery-low", title: "Exhaustion or overwhelm", body: "From demands on our time and energy." },
            { icon: "zap", title: "Anger", body: "When we feel our needs are not being considered." },
            { icon: "wind", title: "Anxiety", body: "About disappointing our partner." },
          ],
        },
        {
          kind: "tapChoice",
          exerciseId: "m6-emotional-clues",
          title: "Which Clue Do You Notice Most?",
          intro: "There are no right answers here, just a moment of noticing.",
          questions: [
            {
              id: "clue",
              text: "Which of these feelings do you recognise most often in yourself?",
              options: [
                {
                  value: "resentment",
                  label: "Resentment, because I keep agreeing to things I do not want to do",
                  response:
                    "Resentment can be a useful clue. It does not automatically mean somebody has crossed a boundary, but it may indicate that a conversation or a clearer boundary could be helpful.",
                },
                {
                  value: "exhaustion",
                  label: "Exhaustion or overwhelm from demands on my time and energy",
                  response:
                    "Noticing this matters. It may indicate that something needs your attention, and that a conversation or a clearer boundary could be helpful.",
                },
                {
                  value: "anger",
                  label: "Anger when my needs are not being considered",
                  response:
                    "Anger can tell us something important. When you communicate what you need, how you say it can make a real difference. Try to raise it gently, without criticism or blame.",
                },
                {
                  value: "anxiety",
                  label: "Anxiety about disappointing my partner",
                  response:
                    "Many of us learnt to keep the peace by putting others first. Noticing this is a useful start. Your needs matter too.",
                },
              ],
            },
          ],
        },
        {
          kind: "callout",
          icon: "shield",
          title: "How We Communicate Boundaries Matters",
          body: `These feelings do not automatically mean that somebody has crossed a boundary. However, they may indicate that something needs our attention and that a conversation or a clearer boundary could be helpful.

How we communicate our boundaries can also make a significant difference. This connects with what we explored in Module 4, particularly the Four Horsemen. When boundaries are communicated through criticism or blame, our partner may respond defensively, making it harder for us to understand each other.`,
        },
        {
          kind: "flipCards",
          heading: "Respecting Each Other's Boundaries",
          intro:
            "Healthy boundaries work both ways. Just as we need to communicate our own needs and limits, we also need to recognise and respect those of our partner. Imagine having a difficult day and wanting some physical affection. You reach out for a hug, but your partner says:",
          items: [
            {
              frontLabel: "Your partner says",
              front: "“I am feeling overwhelmed. I just need a little space at the moment.”",
              backLabel: "What it may mean",
              back: "We might interpret this as rejection. However, our partner needing space is a personal boundary in that moment. It does not necessarily mean they are rejecting us. It may simply mean that their needs are different from ours at that particular time.",
            },
          ],
        },
        {
          kind: "prose",
          body: `Recognising this difference can help us avoid taking our partner's boundaries personally and make space for both people's needs within the relationship.`,
        },
        {
          kind: "contrast",
          heading: "Boundaries Versus Walls",
          intro:
            "When we have experienced hurt or rejection, we may become particularly protective of ourselves. Sometimes, without realising it, we might use boundaries as a way of avoiding vulnerability or difficult conversations.",
          columns: [
            {
              label: "A wall can sound like",
              icon: "shield-alert",
              items: [
                "“I do not discuss my feelings. That is my boundary.”",
                "“I do not want to talk about anything uncomfortable.”",
              ],
            },
            {
              label: "A healthy boundary",
              icon: "heart-handshake",
              tone: "sage",
              items: [
                "Is not about shutting our partner out",
                "Recognises our own needs and limits",
                "Allows space for communication, understanding and connection",
              ],
            },
          ],
          note: "Everyone has the right to choose what they share and when. However, if we consistently avoid important conversations, building emotional intimacy can become difficult.",
        },
        {
          kind: "quote",
          text: "Boundaries can help us remain connected to another person without losing our sense of ourselves.",
        },
        {
          kind: "pairedReflection",
          exerciseId: "m6-our-boundaries",
          eyebrow: "Module 6 · Part 1",
          title: "Understanding Each Other's Boundaries",
          intro:
            "Understanding and respecting each other's boundaries is an important part of developing a healthy relationship built on mutual respect, trust and consideration.",
          individual: {
            title: "Individual Reflection",
            intro: "Take a few moments to consider these questions independently, and give examples.",
            questions: [
              {
                id: "yes-but-no",
                label: "Are there times in our relationship when I say yes but really want to say no?",
                hint: "Give an example if you can.",
              },
              {
                id: "expressing-needs",
                label: "How comfortable do I feel expressing my needs and boundaries to you?",
              },
              {
                id: "reacting",
                label: "How do I react when you set a boundary that I find difficult or disappointing?",
              },
              {
                id: "avoiding",
                label: "Are there times when I use boundaries to avoid difficult conversations or vulnerability?",
              },
              {
                id: "understand-better",
                label: "Is there a boundary I would like you to understand better?",
              },
            ],
          },
          together: {
            title: "Couple Conversation",
            intro: "Take turns sharing your reflections, listening with curiosity rather than judgement.",
            steps: TAKE_TURNS_STEPS,
            questions: [
              {
                id: "learnt",
                label: "What have we learnt about each other's boundaries?",
              },
              {
                id: "differently",
                label: "One thing I would like us to understand or do differently when it comes to boundaries is…",
              },
            ],
          },
          closing: {
            text: "Remember, healthy boundaries are not about creating distance. They are about making space for both people to feel respected, understood and connected.",
          },
        },
        {
          kind: "callout",
          icon: "route",
          title: "Next: Privacy and Secrecy",
          body: `In the next part of this module, we will explore privacy and secrecy, including how they differ and why understanding that distinction matters within a relationship.`,
        },
      ],
    },

    /* ---------------------------------------------------------------- 2 */
    {
      id: "boundaries-part-2",
      title: "Part 2: Understanding Privacy and Secrecy",
      summary:
        "Why healthy relationships need room for individuality, how privacy differs from harmful secrecy, why people keep secrets, and building shared agreements. Then reflect on privacy and secrecy, privately first and then together.",
      estimatedMinutes: 25,
      blocks: [
        {
          kind: "video",
          title: "Understanding Privacy and Secrecy — Part 2",
          playbackId: "",
          durationSeconds: 325,
        },
        {
          kind: "prose",
          heading: "Privacy in Healthy Relationships",
          body: `Being in a healthy relationship does not mean giving up our right to be an individual.

We can love someone, be completely committed to them and still have thoughts, feelings, experiences and conversations that belong to us.

Privacy is about having personal space and autonomy within a relationship.`,
        },
        {
          kind: "iconCards",
          heading: "Examples of Healthy Privacy",
          intro: "None of these things automatically means we are hiding something.",
          columns: 2,
          items: [
            {
              icon: "users",
              title: "A private conversation",
              body: "With a friend or family member who has shared something personal with us.",
            },
            {
              icon: "notebook-pen",
              title: "Keeping a journal",
              body: "Where we explore our innermost thoughts and feelings, including the personal journal within this programme.",
            },
            {
              icon: "messages-square",
              title: "Individual conversations with a counsellor",
            },
            {
              icon: "message-circle",
              title: "Not sharing every message",
              body: "Choosing not to share every message or conversation we have with other people.",
            },
          ],
        },
        {
          kind: "callout",
          icon: "heart-handshake",
          title: "Closeness Is Not the Same as Access",
          body: `Healthy relationships need room for both connection as a couple and individuality.

Sometimes we can confuse closeness with having access to every part of our partner's life. However, we can have a deep connection without knowing every single thing about each other. We can have privacy without being dishonest.`,
        },
        {
          kind: "prose",
          heading: "Understanding the Difference Between Privacy and Secrecy",
          body: `So how is secrecy different from privacy?

Secrecy often involves deliberately withholding, concealing or misrepresenting information.

However, not every secret is harmful. Keeping a birthday surprise or protecting somebody else's confidential information is very different from hiding something that could damage our partner or our relationship. The concern arises when secrecy begins to undermine trust.`,
        },
        {
          kind: "iconCards",
          heading: "Examples of Potentially Harmful Secrecy",
          columns: 2,
          items: [
            {
              icon: "message-circle",
              title: "Deleting messages",
              body: "To prevent our partner from discovering a conversation that crosses an agreed relationship boundary.",
            },
            {
              icon: "wallet",
              title: "Hiding financial decisions",
              body: "That affect both partners.",
            },
            {
              icon: "footprints",
              title: "Lying about where we have been",
              body: "Or who we have been spending time with.",
            },
            {
              icon: "lock",
              title: "Keeping a relationship hidden",
              body: "Keeping an emotional or sexual relationship hidden from our partner when it breaches our relationship agreements.",
            },
          ],
        },
        {
          kind: "contrast",
          heading: "An Important Distinction",
          columns: [
            {
              label: "Privacy",
              icon: "shield-check",
              tone: "sage",
              items: ["Protects our autonomy and individuality"],
            },
            {
              label: "Harmful secrecy",
              icon: "shield-alert",
              items: ["Can prevent our partner from knowing or understanding something that directly affects them or the relationship"],
            },
          ],
        },
        {
          kind: "flow",
          heading: "When Privacy Becomes Secrecy",
          intro: "Imagine having conversations with somebody at work.",
          steps: [
            {
              icon: "messages-square",
              title: "Conversations with a colleague",
              body: "We do not necessarily need to tell our partner about every conversation we have with a colleague. That is part of having privacy.",
            },
            {
              icon: "trending-up",
              title: "Something changes",
              body: "Those conversations gradually become flirtatious or emotionally intimate in a way that crosses the boundaries agreed within the relationship.",
            },
            {
              icon: "eye-off",
              title: "Hiding begins",
              body: "We then begin deleting messages or deliberately avoiding mentioning how close we have become.",
            },
            {
              icon: "shield-alert",
              title: "No longer simply privacy",
              body: "We are actively concealing something that could affect our partner's understanding of the relationship. And that can undermine trust.",
            },
          ],
        },
        {
          kind: "callout",
          icon: "compass",
          tone: "dark",
          title: "The Important Difference",
          body: `The important difference is not necessarily whether we share every detail of our lives, but whether we are deliberately hiding something that affects the trust, honesty or agreements within our relationship.`,
        },
        {
          kind: "tapChoice",
          exerciseId: "m6-privacy-or-secrecy",
          title: "Privacy or Secrecy?",
          intro: "Take a moment to consider each example. Your choice is saved for you, and there is a short response for each.",
          questions: [
            {
              id: "every-message",
              text: "Choosing not to share every message or conversation you have with other people.",
              options: [
                {
                  value: "privacy",
                  label: "Privacy",
                  response:
                    "This is an example of healthy privacy. It does not automatically mean you are hiding something. Healthy relationships need room for both connection and individuality.",
                },
                {
                  value: "secrecy",
                  label: "Secrecy",
                  response:
                    "On its own, this is an example of healthy privacy. We can have a deep connection without knowing every single thing about each other, and we can have privacy without being dishonest.",
                },
              ],
            },
            {
              id: "birthday-surprise",
              text: "Keeping a birthday surprise.",
              options: [
                {
                  value: "privacy",
                  label: "Privacy",
                  response:
                    "It is a secret, but not every secret is harmful. A birthday surprise is very different from hiding something that could damage your partner or your relationship.",
                },
                {
                  value: "secrecy",
                  label: "Secrecy",
                  response:
                    "It is a secret, but not every secret is harmful. The concern arises when secrecy begins to undermine trust, and a birthday surprise does not.",
                },
              ],
            },
            {
              id: "deleting-messages",
              text: "Deleting messages so your partner does not discover a conversation that crosses an agreed relationship boundary.",
              options: [
                {
                  value: "privacy",
                  label: "Privacy",
                  response:
                    "This has moved beyond privacy. It is actively concealing something that could affect your partner's understanding of the relationship, and that can undermine trust.",
                },
                {
                  value: "secrecy",
                  label: "Secrecy",
                  response:
                    "Yes. This is an example of potentially harmful secrecy, because it hides something that affects the trust, honesty or agreements within the relationship.",
                },
              ],
            },
          ],
        },
        {
          kind: "iconCards",
          heading: "Understanding Why People Keep Secrets",
          intro:
            "Secrecy does not always come from a desire to hurt or deceive somebody. Sometimes it comes from fear. We might fear:",
          columns: 4,
          items: [
            { icon: "zap", title: "Conflict" },
            { icon: "heart", title: "Disappointing our partner" },
            { icon: "eye", title: "Being judged" },
            { icon: "shield-alert", title: "Experiencing rejection" },
          ],
        },
        {
          kind: "prose",
          body: `Our previous experiences can also influence how comfortable we feel being honest.

For example, if we grew up in an environment where being honest about our thoughts, feelings or experiences led to criticism, punishment or rejection, we may have learnt that keeping things to ourselves was the safest option. These patterns can continue into our adult relationships.`,
        },
        {
          kind: "contrast",
          heading: "Protecting or Deciding?",
          intro:
            "Sometimes people also avoid telling their partner something because they believe they are protecting them from being hurt. They might tell themselves: “This would upset them.” Or: “It does not mean anything.”",
          columns: [
            {
              label: "Wanting to protect our partner",
              icon: "hand-heart",
              items: ["Often comes from care, or from fear of hurting them"],
            },
            {
              label: "Deciding what they are allowed to know",
              icon: "lock",
              items: [
                "When information directly affects our partner or the agreements we have made together, withholding it can take away their opportunity to make informed choices",
              ],
            },
          ],
          note: "Understanding the reasons behind secrecy can help us recognise the patterns involved, but it does not mean that dishonesty becomes acceptable.",
        },
        {
          kind: "flipCards",
          heading: "Developing Shared Understanding and Agreements",
          intro: "Privacy and secrecy can mean different things to different people. Tap the card to turn it over.",
          items: [
            {
              frontLabel: "For example",
              front: "One partner might feel reassured by sharing phone passwords, while the other might feel uncomfortable with this, even though they have nothing to hide.",
              backLabel: "Remember",
              back: "Neither preference, on its own, tells us whether somebody is trustworthy or concealing something.",
            },
          ],
        },
        {
          kind: "prose",
          body: `This is why it can be helpful to approach conversations about privacy and secrecy with curiosity and transparency.

Rather than assuming our partner should have the same expectations as us, we can explore what privacy, honesty and transparency mean to each of us.

The aim is to develop shared agreements that both partners understand and respect, while recognising the importance of personal autonomy and the relationship itself.`,
        },
        {
          kind: "worksheet",
          exerciseId: "m6-privacy-and-secrecy",
          title: "Privacy, Secrecy and Our Shared Agreements",
          intro:
            "Before coming together for your couple conversation, we would like you to spend some time reflecting individually. Your answers are private to you — nothing is visible to your partner unless you choose to share it. There are no right answers here, only honest ones.",
          fields: [
            {
              id: "privacy-means",
              section: "Individual Reflection",
              label: "What does having privacy in a relationship mean to me?",
              type: "text",
            },
            {
              id: "harmful-secrecy",
              label: "What would I consider harmful secrecy in our relationship?",
              type: "text",
            },
            {
              id: "past-experiences",
              label:
                "Are there experiences from my past that influence how I feel about privacy, secrecy, honesty and transparency?",
              type: "text",
            },
            {
              id: "difficult-to-trust",
              label:
                "Are there situations where I find it difficult to trust, or where I feel my privacy is not respected?",
              type: "text",
            },
            {
              id: "trusted-and-respected",
              label:
                "What would help me feel both trusted and respected in our relationship with regard to privacy and secrecy?",
              type: "text",
            },
          ],
          coupleSection: {
            title: "Couple Conversation",
            intro:
              "Now we would like you to come together and share what you have discovered. Remember:",
            groundRules: [
              "Take turns sharing something you have learnt about your partner's values around privacy and secrecy.",
              "Once you have both had an opportunity to share, explore these areas together.",
              "An agreement is something both people can genuinely choose, rather than something one person imposes on the other.",
            ],
            fields: [
              {
                id: "couple-healthy-privacy",
                label: "What does healthy privacy look like in our relationship?",
              },
              {
                id: "couple-secrecy-behaviours",
                label: "What behaviours would we consider secrecy that could undermine trust?",
              },
              {
                id: "couple-shared-agreements",
                label:
                  "Our shared agreements — how do we want to approach situations where one of us feels uncomfortable, uncertain or concerned that an agreement has been crossed?",
              },
            ],
          },
          partnerNote:
            "Your partner has chosen to share their privacy and secrecy reflections with you. Read with curiosity, not defence — this is an invitation to understand, not a scorecard.",
          closing: {
            heading: "NewFuture Reflection",
            body: "Healthy relationships do not require us to give up our individuality or share every thought, message or conversation. However, they do benefit from honesty about matters that directly affect the relationship and the commitments we have made to each other.",
            question: "Should you tell your partner absolutely everything?",
            pull: "Privacy allows us to remain individuals within a relationship. Honesty and transparency help us protect the trust between us.",
          },
        },
        {
          kind: "callout",
          icon: "route",
          title: "Next: Bringing It All Together",
          body: `In Part 3, the final part of this module, we bring together what we have explored about boundaries, privacy and secrecy, and leave you with one final question.`,
        },
      ],
    },

    /* ---------------------------------------------------------------- 3 */
    {
      id: "boundaries-part-3",
      title: "Part 3: Bringing It All Together",
      summary:
        "Making room for both connection and individuality, why honesty matters too, and finding a balance that respects both people. Then reflect on one final question.",
      estimatedMinutes: 10,
      blocks: [
        {
          kind: "video",
          title: "Bringing It All Together — Part 3",
          playbackId: "",
          durationSeconds: 90,
        },
        {
          kind: "prose",
          heading: "Bringing It All Together",
          body: `As we come to the end of this module, it is important to remember that healthy relationships need room for both connection and individuality.`,
        },
        {
          kind: "flipCards",
          intro: "Tap each card to turn it over.",
          items: [
            {
              frontLabel: "Having boundaries",
              front: "Does it mean pushing our partner away?",
              backLabel: "No",
              back: "Having boundaries does not mean pushing our partner away.",
            },
            {
              frontLabel: "Having privacy",
              front: "Does it mean we are keeping secrets?",
              backLabel: "Not automatically",
              back: "Having privacy does not automatically mean we are keeping secrets.",
            },
          ],
        },
        {
          kind: "callout",
          icon: "shield-check",
          title: "Honesty Is Equally Important",
          body: `When we deliberately conceal things that affect our partner or the agreements we have made together, we risk undermining the very trust we are trying to build.

The aim is not to know absolutely everything about each other. Instead, it is about creating a relationship where both people can communicate their needs, respect each other's boundaries and feel confident in the honesty of their connection.`,
        },
        {
          kind: "iconCards",
          heading: "Finding a Healthy Balance",
          intro:
            "Connection does not require us to give up our individuality. And trust does not require us to give up our privacy. Healthy relationships are about finding a balance that respects both people. A balance where:",
          columns: 3,
          items: [
            { icon: "users", title: "Individuality and togetherness can coexist" },
            { icon: "shield-check", title: "Boundaries are understood and respected" },
            { icon: "heart-handshake", title: "Honesty helps strengthen trust and connection" },
          ],
        },
        {
          kind: "quote",
          text: "How can you create a relationship where you both feel free to be yourselves, safe enough to be honest and secure enough to trust each other?",
        },
        {
          kind: "sharedJournal",
          exerciseId: "m6-final-question",
          title: "One Final Question",
          intro:
            "As you reflect on what we have explored throughout this module, consider one final question. Write for yourself first, then choose whether to share it with your partner.",
          prompts: [
            "How can we create a relationship where we both feel free to be ourselves, safe enough to be honest and secure enough to trust each other?",
          ],
          partnerNote:
            "Your partner's reflection on the balance between connection and individuality, in their own words. Read it with curiosity rather than correction.",
        },
        {
          kind: "callout",
          icon: "leaf",
          title: "That Is the End of Module 6",
          body: `Healthy relationships are about finding a balance that respects both people, where individuality and togetherness can coexist, boundaries are understood and respected, and honesty helps strengthen trust and connection.

Growth begins with understanding. Next, we move on to Module 7.`,
        },
      ],
    },
  ],
};
