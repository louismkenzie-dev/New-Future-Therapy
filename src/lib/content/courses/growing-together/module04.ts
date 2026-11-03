import type { CourseModule } from "../types";

/* Module 4 — Communication. Seven parts, each opening with Laura and
   Esther's video, then the teaching broken into small screens, then the
   activity. Copy is the therapists' own: Laura's revised "info" and
   "reflections" sheets (x1, Parts 1–7) are the primary wording, with
   Esther's Module 4 scripts, written versions and activities filling what
   the revised sheets leave out (the video teaching, Part 7's final
   reflection). Lightly edited to house style: British English, no
   contractions, "your partner" throughout. */

const TAKE_TURNS_STEPS = [
  "Take turns to read out your answers. Give each other time to speak.",
  "Listen to understand. Notice any urge to correct or defend, and try: “Tell me more.”",
  "Then answer the together questions as one.",
];

export const module04: CourseModule = {
  id: "communication",
  number: 4,
  title: "Communication",
  lede: "Communication influences almost every part of your relationship. It is so much more than talking and listening — it is about creating conversations where both of you can feel heard, respected and understood.",
  essence: "Not “Who is the better communicator?” but “How can we understand each other better?”",
  lessons: [
    /* ---------------------------------------------------------------- 1 */
    {
      id: "communication-part-1",
      title: "Part 1: Communication and the Emotional Bank Account",
      summary:
        "What healthy communication really involves, why the smallest everyday interactions matter, and the emotional bank account. Then reflect together on the last 24 hours.",
      estimatedMinutes: 20,
      blocks: [
        {
          kind: "video",
          title: "Communication and the Emotional Bank Account — Part 1",
          playbackId: "rY1qdfGuPC4evxWEgINPODZCaKKQ57MHBzG5G02tbU88",
          durationSeconds: 220,
        },
        {
          kind: "prose",
          heading: "More Than Talking and Listening",
          body: `In this module, we are going to explore something that influences almost every part of all of our relationships: communication.

When people hear the word communication, they often think it is just about talking and listening. But good communication in a relationship is so much more than that.`,
        },
        {
          kind: "iconCards",
          heading: "Everyday Connection",
          intro: "Communication includes your words, your tone, your listening and your everyday gestures.",
          columns: 3,
          items: [
            { icon: "ear", title: "Listening and hearing", body: "Really taking in what your partner is saying." },
            { icon: "lightbulb", title: "Understanding", body: "Making sense of what it is like for them." },
            { icon: "search", title: "Asking questions", body: "Staying curious rather than assuming." },
            { icon: "message-circle", title: "Your tone", body: "How something is said, not only what is said." },
            { icon: "smile", title: "A smile or a hug", body: "The gestures that say more than words." },
            { icon: "refresh-cw", title: "Repair", body: "Good communication forms a part of repairing things when they go wrong." },
          ],
        },
        {
          kind: "contrast",
          heading: "What Healthy Communication Is",
          columns: [
            {
              label: "It is not about",
              icon: "search",
              items: ["Speaking the loudest", "Having the perfect words", "Always agreeing"],
            },
            {
              label: "It is about",
              icon: "heart-handshake",
              tone: "sage",
              items: ["Creating conversations where both of you have the opportunity to feel heard, respected and understood"],
            },
          ],
          note: "Throughout this module, we encourage you to become curious about how you and your partner can improve your communication. We could all improve this part of our relationships.",
        },
        {
          kind: "callout",
          icon: "calendar-clock",
          title: "When Did You Last Invest in Your Relationship?",
          body: `Not by talking about work. Not by discussing the mortgage, the shopping or whose turn it is to empty the dishwasher or take the bins out. But by genuinely investing in your relationship.

Healthy relationships require time, attention, care and consideration.`,
        },
        {
          kind: "prose",
          heading: "Small Moments Matter",
          body: `Often, it is the frequency of the smallest everyday interactions that makes the biggest difference.

Small, regular moments of care matter. Put your phone down, share a welcome hug or take time to listen.`,
        },
        {
          kind: "contrast",
          heading: "The Emotional Bank Account",
          intro:
            "Relationship researchers Dr John and Julie Gottman use the term emotional bank account. Imagine that every interaction with your partner has the potential to make either a deposit or a withdrawal.",
          columns: [
            {
              label: "Deposits",
              icon: "heart",
              tone: "sage",
              items: ["Kindness", "Appreciation", "Affection", "Listening", "Keeping promises"],
            },
            {
              label: "Withdrawals",
              icon: "battery-low",
              items: ["Criticism", "Hurtful sarcasm", "Dismissing feelings", "Ignoring each other", "Broken promises"],
            },
          ],
        },
        {
          kind: "callout",
          icon: "leaf",
          title: "Every Relationship Experiences Withdrawals",
          body: `Couples in healthy relationships do not avoid withdrawals completely. That is unrealistic. We all get tired, frustrated or distracted sometimes.

What matters is creating enough positive interactions, or deposits, so that the relationship has something to draw upon when life becomes difficult. Regular deposits and repairing hurt help strengthen connection.`,
        },
        {
          kind: "tapChoice",
          exerciseId: "m4-what-feels-like-a-deposit",
          title: "What Feels Like a Deposit to You?",
          intro: "There are no right answers here. Choose the one that matters most to you today.",
          questions: [
            {
              id: "deposit",
              text: "Which of these small moments helps you feel most valued?",
              options: [
                {
                  value: "listening",
                  label: "My partner putting their phone down and really listening",
                  response:
                    "Being given someone's full attention can be one of the most meaningful deposits of all. It is worth letting your partner know that.",
                },
                {
                  value: "thank-you",
                  label: "A thank you or a kind word",
                  response:
                    "Hearing appreciation out loud can matter a great deal. In Part 2, we explore appreciation in much more detail.",
                },
                {
                  value: "affection",
                  label: "A smile or a welcome hug",
                  response:
                    "Small gestures of affection can say a lot without any words at all. Noticing that this matters to you is a useful start.",
                },
                {
                  value: "promises",
                  label: "My partner keeping their promises",
                  response:
                    "Reliability is a quiet but powerful deposit. Knowing you can count on each other helps build trust over time.",
                },
              ],
            },
          ],
        },
        {
          kind: "callout",
          icon: "users",
          title: "What Matters to Each of You?",
          body: `A deposit may mean something different to each partner. What feels like a deposit to one person might not feel the same to another. That is why understanding what matters to your partner is so important.

Ask each other: “What small things help you feel valued and connected?”`,
        },
        {
          kind: "pairedReflection",
          exerciseId: "m4-emotional-bank-account",
          eyebrow: "Module 4 · Part 1",
          title: "The Last 24 Hours",
          intro:
            "Think about your interactions over the last 24 hours. Approach this reflection with honesty and curiosity, and try to be honest without blaming yourselves or each other.",
          individual: {
            title: "Individual Reflection",
            intro: "Answer these on your own first, then come back together to share.",
            questions: [
              {
                id: "deposits",
                label: "What deposits have we each made into our relationship over the last 24 hours?",
                hint: "Think about small moments of kindness, attention, affection or appreciation.",
              },
              {
                id: "withdrawals",
                label: "Have there been any withdrawals?",
                hint: "Describe specific moments and how they felt, without making assumptions about each other's intentions.",
              },
              {
                id: "connected",
                label: "What helped me feel connected or cared for?",
              },
            ],
          },
          together: {
            title: "Reflect Together",
            intro: "Give each other time to speak, and listen to understand.",
            steps: TAKE_TURNS_STEPS,
            questions: [
              {
                id: "not-noticed",
                label: "Were there moments either of us valued that the other had not noticed?",
              },
              {
                id: "small-deposit",
                label: "What is one small deposit we could each make today?",
                hint: "Choose something manageable and meaningful to your partner.",
              },
            ],
          },
          revealNote:
            "The aim is to notice the everyday interactions shaping your relationship and identify small opportunities to strengthen your connection.",
          closing: {
            text: "This is about understanding where you are right now and identifying small opportunities for positive change.",
          },
        },
        {
          kind: "callout",
          icon: "route",
          title: "Next: The Importance of Appreciation",
          body: `In Part 2, we build on these small everyday moments by exploring something that can easily get overlooked in relationships: appreciation.`,
        },
      ],
    },

    /* ---------------------------------------------------------------- 2 */
    {
      id: "communication-part-2",
      title: "Part 2: The Importance of Appreciation",
      summary:
        "Why the small, everyday moments matter as much as grand gestures, and why appreciation needs to be said out loud. Then practise the Couples Appreciation exercise together.",
      estimatedMinutes: 25,
      blocks: [
        {
          kind: "video",
          title: "The Importance of Appreciation — Part 2",
          playbackId: "mMlhWeNi8p3HX00qvT2pH1FfEbN5sXDngd01PaMZkVQ3M",
          durationSeconds: 131,
        },
        {
          kind: "prose",
          heading: "Expressing Appreciation",
          body: `Hopefully, that exercise helped you notice some of the small ways you communicate and connect throughout the day. Now we would like to build on that by exploring something that can easily get overlooked in relationships: appreciation.

Appreciation helps us feel noticed and valued. Research also indicates that showing appreciation in a relationship improves emotional connection.`,
        },
        {
          kind: "contrast",
          heading: "Grand Gestures and Small Moments",
          intro: "Grand romantic gestures can of course be absolutely lovely. But emotional connection is often strengthened through much smaller moments.",
          columns: [
            {
              label: "Grand gestures",
              icon: "sparkles",
              items: ["A lovely meal", "A surprise weekend away", "An anniversary gift"],
            },
            {
              label: "Everyday moments",
              icon: "sun",
              tone: "sage",
              items: [
                "Appreciating that your partner let you sleep in this morning, knowing you were really tired",
                "Recognising how hard your partner has been working recently",
              ],
            },
          ],
          note: "Small, everyday efforts can easily go unacknowledged.",
        },
        {
          kind: "flipCards",
          heading: "Knowing and Hearing",
          intro: "Tap the card to turn it over.",
          items: [
            {
              frontLabel: "What we often do",
              front: "We can feel grateful for someone without ever putting that appreciation into words. We might assume they already know.",
              backLabel: "Why it matters",
              back: "Knowing we are appreciated and actually hearing it can be two very different experiences. So tell your partner what you appreciate, rather than assuming they already know.",
            },
          ],
        },
        {
          kind: "iconCards",
          heading: "Who Your Partner Is, and What They Do",
          intro:
            "Recognise both who your partner is and what they do: their kindness, humour, practical help or willingness to listen. Your appreciations might include:",
          columns: 3,
          items: [
            { icon: "heart", title: "A quality you value", body: "Something you value about who they are." },
            { icon: "hand-heart", title: "Something they have done recently", body: "A moment that mattered to you." },
            { icon: "eye", title: "An effort you have noticed", body: "Something that might otherwise go unacknowledged." },
          ],
        },
        {
          kind: "contrast",
          heading: "Sharing and Listening",
          columns: [
            {
              label: "When sharing",
              icon: "message-circle",
              tone: "sage",
              items: [
                "Be specific about what you noticed and why it mattered to you",
                "You could begin: “One thing I appreciate about you is…”",
                "“I appreciated you making time to listen yesterday because it helped me feel supported.”",
              ],
            },
            {
              label: "When listening",
              icon: "ear",
              items: [
                "Give your partner your attention and allow yourself to receive their words",
                "You do not need to minimise the appreciation, explain it away or immediately return the compliment",
                "A simple “thank you” is enough",
              ],
            },
          ],
          note: "Just allow yourself to hear it and let it land.",
        },
        {
          kind: "tapChoice",
          exerciseId: "m4-receiving-appreciation",
          title: "Receiving Appreciation",
          intro: "There are no right answers here, just a moment of noticing.",
          questions: [
            {
              id: "first-instinct",
              text: "When someone tells you what they appreciate about you, what is your first instinct?",
              options: [
                {
                  value: "minimise",
                  label: "To brush it off or play it down",
                  response:
                    "Many of us do this, particularly if we are not used to hearing appreciation. In this exercise, try simply saying “thank you” and letting it land.",
                },
                {
                  value: "return",
                  label: "To return the compliment straight away",
                  response:
                    "That instinct often comes from kindness. This time, try to stay with receiving. Your turn to share will come.",
                },
                {
                  value: "explain",
                  label: "To explain it away",
                  response:
                    "Noticing this urge is useful in itself. See whether you can pause, and allow your partner's words to land before you respond.",
                },
                {
                  value: "receive",
                  label: "To take it in and enjoy it",
                  response:
                    "That is lovely. Receiving appreciation well is a gift to the person offering it, too.",
                },
              ],
            },
          ],
        },
        {
          kind: "flow",
          heading: "The Couples Appreciation Exercise",
          intro: "Take turns. Focus on listening, receiving and understanding rather than rushing through the exercise.",
          steps: [
            {
              icon: "message-circle",
              title: "Share three appreciations",
              body: "Qualities, actions or efforts you have noticed. “I appreciate how patient you were when I felt stressed last week.” “I appreciate your sense of humour and how you bring lightness into our relationship.”",
            },
            {
              icon: "ear",
              title: "The listener reflects back",
              body: "After each appreciation, briefly reflect back what you heard: “What I hear is that you appreciated my patience when you were feeling stressed.”",
            },
            {
              icon: "pause-circle",
              title: "Let it land, then swap",
              body: "There is no need to explain, defend or minimise it. Once all three have been shared, swap roles.",
            },
            {
              icon: "heart",
              title: "Say why it matters",
              body: "Now take turns sharing an appreciation and explaining why it matters to you: “I appreciate when you listen without interrupting because it helps me feel respected and important.”",
            },
            {
              icon: "refresh-cw",
              title: "Reflect back, then swap",
              body: "The listener reflects back what they heard before you swap roles.",
            },
          ],
        },
        {
          kind: "pairedReflection",
          exerciseId: "m4-couples-appreciation",
          eyebrow: "Module 4 · Part 2",
          title: "Couples Appreciation",
          intro:
            "You can note your appreciations here before you share them out loud, or simply talk them through together and record your reflections afterwards.",
          individual: {
            title: "Three Things I Appreciate About You",
            intro: "Try to be specific.",
            questions: [
              {
                id: "appreciation-1",
                label: "One thing I appreciate about you is…",
                hint: "A quality you value, something they have done recently or an effort you have noticed.",
              },
              { id: "appreciation-2", label: "Another thing I appreciate about you is…" },
              { id: "appreciation-3", label: "And another thing I appreciate about you is…" },
              {
                id: "why-it-matters",
                label: "I appreciate when you… because it helps me feel…",
              },
            ],
          },
          together: {
            title: "Reflect Together",
            questions: [
              { id: "give-receive", label: "What was it like to give and receive appreciation?" },
              { id: "surprise", label: "Did anything surprise you?" },
              { id: "most-meaningful", label: "Which appreciation felt most meaningful?" },
              { id: "learned", label: "What did you learn about each other?" },
            ],
          },
          revealNote:
            "Appreciation makes room to recognise what is working alongside the difficulties.",
          closing: {
            text: "Keep noticing and expressing the small things that help you feel valued and connected.",
          },
        },
        {
          kind: "callout",
          icon: "sprout",
          title: "Keep Practising",
          body: `Try this two or three times a week. It may feel unfamiliar, or a little clunky or awkward, at first, particularly if you are not used to expressing appreciation in this way. Keep it honest and unforced while you find your own way of expressing appreciation.

Next, in Part 3, we look at what happens when communication becomes difficult.`,
        },
      ],
    },

    /* ---------------------------------------------------------------- 3 */
    {
      id: "communication-part-3",
      title: "Part 3: Understanding Your Communication Patterns",
      summary:
        "The familiar cycles couples can get caught in when conversations become difficult: pursue–withdraw, both pursue and both withdraw. Then recognise and name your own pattern together.",
      estimatedMinutes: 35,
      blocks: [
        {
          kind: "video",
          title: "Understanding Your Communication Patterns — Part 3",
          playbackId: "T9dT00xVTPBPTJ00KzP3GOesDxGUx3KXG73GYFjosuB4U",
          durationSeconds: 489,
        },
        {
          kind: "prose",
          heading: "When Communication Becomes Difficult",
          body: `We have started by exploring the positive interactions that can help strengthen your relationship. Now we would like to look at what happens when communication becomes difficult.

This is where some of the learning from our previous modules becomes particularly helpful. Your understanding of your nervous system and your attachment strategies can help you recognise what is happening underneath when conversations become emotionally charged.`,
        },
        {
          kind: "callout",
          icon: "refresh-cw",
          title: "“Here We Go Again”",
          body: `Those moments when your partner says something in a particular tone or gives you a certain look, and you think: “Here we go again.” Before you know it, you are both following a familiar path.

Perhaps one of you gets louder while the other goes quiet. Maybe you find yourselves criticising, defending, explaining or becoming sarcastic. Or perhaps one of you stops engaging altogether. And afterwards, you are left wondering: “How did we end up there again?”

We are going to help you slow those moments down and begin to notice what happens between you.`,
        },
        {
          kind: "contrast",
          heading: "Looking Beyond the Argument",
          intro:
            "Emotionally Focused Therapy, or EFT, developed by Dr Sue Johnson and colleagues, encourages us to look beyond the argument itself.",
          columns: [
            {
              label: "Rather than focusing only on",
              icon: "search",
              items: ["What you are arguing about"],
            },
            {
              label: "We can ask",
              icon: "users",
              tone: "sage",
              items: ["“What happens between us when we start to argue and feel disconnected?”"],
            },
          ],
          note: "Sometimes the problem is not simply the disagreement. It is the pattern of responses that develops between you.",
        },
        {
          kind: "flow",
          heading: "How a Cycle Can Unfold",
          intro: "Imagine one partner wants to talk, but the other seems distracted.",
          steps: [
            {
              icon: "brain",
              title: "A story begins",
              body: "The first partner tells themselves: “They do not care about what I am saying.” Underneath, they feel hurt and unimportant.",
            },
            {
              icon: "message-circle",
              title: "It comes out as criticism",
              body: "Instead of saying that, they say: “You never listen to me.”",
            },
            {
              icon: "shield",
              title: "The other defends",
              body: "The second partner hears criticism: “That is not fair. I listen to you all the time.”",
            },
            {
              icon: "flame",
              title: "The first pushes harder",
              body: "Feeling even less heard: “This is exactly what you always do!”",
            },
            {
              icon: "battery-low",
              title: "The other withdraws",
              body: "Feeling overwhelmed: “I am not doing this.” Then they go quiet.",
            },
            {
              icon: "refresh-cw",
              title: "The fear is confirmed",
              body: "The silence seems to confirm the first partner's fear of not being important, so they try even harder to get a response.",
            },
          ],
        },
        {
          kind: "callout",
          icon: "heart-handshake",
          title: "That Is the Cycle",
          body: `The harder one partner pushes, the more the other wants to pull away. One is trying to get a response and feel connected. The other is trying to protect themselves from a conversation that feels overwhelming.

Neither has really explained what is happening underneath their reactions, and both end up feeling hurt and disconnected.`,
        },
        {
          kind: "accordion",
          heading: "Three Common Patterns",
          intro: "Notice the familiar cycle you get caught in when conversations become difficult. Tap each to read more.",
          items: [
            {
              icon: "arrow-up-down",
              title: "Pursue–withdraw",
              body: `One pushes for a response while the other pulls away.

A pursuing partner might ask repeated questions, speak more loudly or feel an urgent need to resolve things straight away. If you remember our attachment module, you might recognise how this can sometimes connect with anxious attachment strategies. From our nervous system module, you might recognise signs of sympathetic activation: that feeling of urgency, agitation or needing to do something.

The withdrawing partner might become quiet, give short answers or leave the conversation. This can sometimes be associated with avoidant attachment strategies. Depending on what is happening in the nervous system, they might be experiencing sympathetic activation, an urge to escape, or a more shut-down response.`,
            },
            {
              icon: "flame",
              title: "Both pursue",
              body: `Both try harder to be heard through interrupting, defending or raising their voices.

You may both gather evidence for your side of the argument. The conversation gets louder, and each person tries harder to be heard, but neither feels particularly understood. Both partners may be experiencing heightened nervous system activation, and the conversation can become increasingly difficult to manage.`,
            },
            {
              icon: "snowflake",
              title: "Both withdraw",
              body: `Difficult conversations are avoided, and concerns remain unspoken.

You may have very few arguments, because difficult subjects are quietly set aside. One of you thinks, “There is no point bringing it up.” The other assumes, “If they wanted to talk, they would.” Things might appear calm on the surface, but over time you may begin to feel less connected.

Sometimes difficult conversations need to happen for us to understand what our partner is experiencing.`,
            },
          ],
        },
        {
          kind: "flipCards",
          heading: "What May Be Happening Underneath",
          intro: "Tap each card to turn it over.",
          items: [
            {
              frontLabel: "What a partner might see",
              front: "Repeated questions, a louder voice, an urgent need to resolve things straight away.",
              backLabel: "What may sit underneath",
              back: "“Are we okay?” “Do I still matter to you?” “Why will you not talk to me?”",
            },
            {
              frontLabel: "What a partner might see",
              front: "Going quiet, giving short answers or leaving the conversation.",
              backLabel: "What may sit underneath",
              back: "“I am overwhelmed.” “Whatever I say makes this worse.” “I need to get away from this conversation.”",
            },
          ],
        },
        {
          kind: "callout",
          icon: "compass",
          title: "Not Fixed Labels",
          body: `Hurt, fear or overwhelm can sit beneath your reactions. Get curious about your own experience, and ask about your partner's rather than assuming.

Attachment strategies and nervous system responses are not fixed labels. These responses can change depending on the situation.`,
        },
        {
          kind: "contrast",
          heading: "Name the Pattern Together",
          intro:
            "The pattern is something happening between you. Rather than deciding who is causing the problem, become curious about how you both contribute to keeping the cycle going.",
          columns: [
            {
              label: "Rather than saying",
              icon: "message-circle",
              items: ["“You are doing it again.”"],
            },
            {
              label: "Try",
              icon: "users",
              tone: "sage",
              items: ["“I think we are getting caught in our pattern.”"],
            },
          ],
          note: "It is a small change in wording, but it creates an opportunity to pause and look at what is happening together. You could even choose a shared name for your pattern that helps you pause without blaming, criticising or silencing each other. Each of you remains responsible for your own behaviour.",
        },
        {
          kind: "tapChoice",
          exerciseId: "m4-familiar-pattern",
          title: "Which Pattern Feels Familiar?",
          intro: "There are no right answers here, just a first moment of noticing.",
          questions: [
            {
              id: "pattern",
              text: "When conversations become difficult between you, which pattern feels most familiar?",
              options: [
                {
                  value: "pursue-withdraw",
                  label: "One of us pushes, the other pulls away",
                  response:
                    "This is one of the most common patterns couples get caught in. Remember, it is something happening between you, not something one of you is doing wrong.",
                },
                {
                  value: "both-pursue",
                  label: "We both try harder to be heard",
                  response:
                    "When both of you are activated, it can be hard for either to feel understood. Noticing this together is an important first step.",
                },
                {
                  value: "both-withdraw",
                  label: "We both tend to avoid it",
                  response:
                    "This pattern can be harder to recognise, because things may seem calm. Becoming curious about what goes unspoken can help you feel more connected.",
                },
                {
                  value: "unsure",
                  label: "It changes, or I am not sure yet",
                  response:
                    "That is completely fine. These responses can change depending on the situation. The activity below may help you begin to notice your pattern.",
                },
              ],
            },
          ],
        },
        {
          kind: "callout",
          icon: "shield-check",
          title: "Choose a Manageable Disagreement",
          body: `Think about a recent disagreement that feels safe and manageable to revisit, rather than one of your most painful or difficult arguments.`,
        },
        {
          kind: "pairedReflection",
          exerciseId: "m4-recognising-your-pattern",
          eyebrow: "Module 4 · Part 3",
          title: "Can You Recognise Your Pattern?",
          individual: {
            title: "Pause and Reflect",
            intro: "Choose a recent, manageable disagreement. Answer these on your own first.",
            questions: [
              { id: "felt", label: "What did I feel?" },
              { id: "told-myself", label: "What did I tell myself?" },
              { id: "responded", label: "How did I respond?" },
            ],
          },
          together: {
            title: "Recognising Your Pattern Together",
            intro: "Think about the point where the conversation started to feel familiar, that sense of “here we go again.”",
            steps: TAKE_TURNS_STEPS,
            questions: [
              { id: "fed-into", label: "How did our responses feed into each other?" },
              { id: "our-pattern", label: "What is our pattern?" },
              {
                id: "name",
                label: "Can we give this pattern a name that makes sense to both of us?",
                hint: "It might be something simple like “the spiral”, “the loop”, “chase and retreat” or “the shutdown”.",
              },
              { id: "earlier", label: "What could help us recognise the pattern earlier?" },
              {
                id: "different",
                label: "Imagine noticing it the next time it begins. What do we want to be different this time?",
              },
            ],
          },
          revealNote:
            "The purpose is not to decide who is causing the problem. It is to become curious about how you both contribute to keeping the cycle going.",
          closing: {
            text: "Your pattern's name becomes a reminder to slow down and ask: “What is happening for each of us right now?”",
          },
        },
        {
          kind: "callout",
          icon: "route",
          title: "Next: The Four Horsemen",
          body: `In Part 4, we look at what happens when emotions run high, and four communication habits that can create even more distance.`,
        },
      ],
    },

    /* ---------------------------------------------------------------- 4 */
    {
      id: "communication-part-4",
      title: "Part 4: Recognising and Changing Unhelpful Communication Habits",
      summary:
        "The Gottmans' Four Horsemen — criticism, defensiveness, contempt and stonewalling — and how to notice your own first. Then reflect individually and share what you have learnt.",
      estimatedMinutes: 30,
      blocks: [
        {
          kind: "video",
          title: "Recognising and Changing Unhelpful Communication Habits — Part 4",
          playbackId: "y2w2pohhTKXdyNsuk02900ZjiuM1ltqt00KhlazqMrDEYI",
          durationSeconds: 390,
        },
        {
          kind: "prose",
          heading: "When Emotions Run High",
          body: `Perhaps one of you raises your voice. One becomes defensive. One walks away. Or maybe hurtful things are said that you later regret.

When we are emotionally activated, it can become much harder to listen, think clearly and stay curious about what is happening for our partner. Sometimes we fall into communication habits that create even more distance.`,
        },
        {
          kind: "iconCards",
          heading: "The Four Horsemen",
          intro:
            "Dr John Gottman and his colleagues spent decades studying couples and their interactions. They identified four communication behaviours that can create distance and make conflict harder to resolve.",
          columns: 4,
          items: [
            { icon: "zap", title: "Criticism", body: "Attacking your partner's character rather than raising a specific concern." },
            { icon: "shield", title: "Defensiveness", body: "Immediately justifying yourself, making excuses or responding with a countercomplaint." },
            { icon: "eye", title: "Contempt", body: "Communicating disrespect or superiority through mocking, belittling, eye-rolling or hurtful sarcasm." },
            { icon: "lock", title: "Stonewalling", body: "Withdrawing from the interaction and becoming unresponsive." },
          ],
        },
        {
          kind: "callout",
          icon: "search",
          title: "Notice Your Own First",
          body: `We are not asking you to identify everything your partner does wrong. We want you to begin noticing which of these behaviours you might recognise in yourself.`,
        },
        {
          kind: "contrast",
          heading: "Criticism or Complaint?",
          intro:
            "Criticism is not the same as making a complaint. We all need to be able to raise concerns or explain when something is not working for us. The difference is how we communicate it.",
          columns: [
            {
              label: "Criticism attacks the person",
              icon: "zap",
              items: ["“You never help around here. You are so lazy.”"],
            },
            {
              label: "A complaint focuses on the situation",
              icon: "message-circle",
              tone: "sage",
              items: ["“I felt disappointed that the bins were not emptied last night.”"],
            },
          ],
          note: "When someone feels personally attacked, they are much more likely to become defensive.",
        },
        {
          kind: "flipCards",
          heading: "Defensiveness",
          intro:
            "Defensiveness is incredibly common. It often happens when we feel blamed, misunderstood or unfairly criticised. Tap the card to turn it over.",
          items: [
            {
              frontLabel: "Your partner says",
              front: "“I have felt really overwhelmed this week.”",
              backLabel: "A defensive response",
              back: "“I have been working just as hard as you.” Instead of hearing their experience, you have moved into explaining or justifying something about yourself.",
            },
          ],
        },
        {
          kind: "callout",
          icon: "ear",
          title: "Preparing Your Defence or Listening?",
          body: `Defensiveness is often a protective response. But when we immediately defend ourselves, our partner's original concern can be left unheard.

Notice when you are preparing your defence rather than listening.`,
        },
        {
          kind: "prose",
          heading: "Contempt",
          body: `Contempt communicates a sense of superiority or disrespect towards your partner. It can show up through:

- Sarcasm or mocking
- Eye-rolling
- Belittling or name-calling
- Making your partner feel small
- Hurtful comments disguised as “I was only joking”

Contempt can be particularly damaging because it attacks our partner's sense of worth and dignity. It is something we take very seriously in couples counselling. Even when we are frustrated or hurt, how we treat each other matters.`,
        },
        {
          kind: "callout",
          icon: "pause-circle",
          tone: "dark",
          title: "Before You Speak, Ask",
          body: `“Will this help us understand each other, or will it simply hurt?”

Protecting each other's dignity during disagreements is really important. We can express anger, frustration or disappointment without attacking the person we are in a relationship with.`,
        },
        {
          kind: "accordion",
          heading: "Stonewalling",
          intro: "Stonewalling is withdrawing from the interaction and becoming unresponsive. Tap each to read more.",
          items: [
            {
              icon: "lock",
              title: "What it can look like",
              body: `- Consistently refusing to talk
- Leaving the room
- Ignoring your partner
- Sitting in silence rather than engaging`,
            },
            {
              icon: "battery-low",
              title: "When someone is overwhelmed",
              body: `Stonewalling can happen when someone feels emotionally overwhelmed; it does not automatically mean they no longer care. Sometimes someone becomes so overwhelmed that they genuinely struggle to respond. This is where your understanding of nervous system regulation can be helpful.`,
            },
            {
              icon: "calendar-clock",
              title: "An agreed break is different",
              body: `An agreed break, with a commitment to return to the conversation, is different from leaving your partner without a response or explanation. We look at how to take a healthy pause in Part 5.`,
            },
            {
              icon: "heart-handshake",
              title: "When disengagement has become ongoing",
              body: `Stonewalling can also involve a more persistent pattern of emotional disengagement from the relationship. Where emotional disengagement has become an ongoing difficulty, seeking couples therapy may be helpful.`,
            },
          ],
        },
        {
          kind: "tapChoice",
          exerciseId: "m4-first-horseman",
          title: "Which Do You Notice in Yourself?",
          intro: "There are no right answers here. Remember to notice your own, not your partner's.",
          questions: [
            {
              id: "horseman",
              text: "When conflict begins, which of the Four Horsemen are you most likely to fall into?",
              options: [
                {
                  value: "criticism",
                  label: "Criticism",
                  response:
                    "Noticing this is a real step. Often there is a genuine concern underneath criticism. Part 5 explores a gentler way to raise it.",
                },
                {
                  value: "defensiveness",
                  label: "Defensiveness",
                  response:
                    "This one is incredibly common, and it is often a way of protecting ourselves. Recognising it gives you a chance to listen first.",
                },
                {
                  value: "contempt",
                  label: "Contempt",
                  response:
                    "It takes honesty to recognise this. Pausing to ask “Will this help us understand each other?” can make a real difference.",
                },
                {
                  value: "stonewalling",
                  label: "Stonewalling",
                  response:
                    "If you tend to shut down when you feel overwhelmed, a healthy pause, with an agreement to return, can help. We explore this in Part 5.",
                },
                {
                  value: "unsure",
                  label: "I am not sure yet",
                  response:
                    "That is completely fine. The reflection below may help you begin to notice what happens for you.",
                },
              ],
            },
          ],
        },
        {
          kind: "worksheet",
          exerciseId: "m4-four-horsemen",
          title: "Recognising and Changing Unhelpful Communication Patterns",
          intro:
            "Conflict is a normal part of relationships. What matters is not whether you disagree, but how you communicate. Take a few moments to reflect individually before sharing with your partner.",
          fields: [
            {
              id: "recognise",
              section: "Individual Reflection",
              type: "choices",
              label: "Which of the Four Horsemen do I recognise in myself during disagreements?",
              options: ["Criticism", "Defensiveness", "Contempt", "Stonewalling"],
            },
            { id: "trigger", type: "text", label: "What tends to trigger this response?", hint: "What tends to happen just before I respond this way?" },
            { id: "underneath", type: "text", label: "What might I be feeling underneath it?" },
            { id: "affect", type: "text", label: "How might my response affect my partner and our connection?" },
            { id: "differently", type: "text", label: "What could I try differently next time?" },
          ],
          coupleSection: {
            title: "Couple Conversation: Understanding Each Other",
            intro: "Take turns sharing your reflections, then discuss these questions together.",
            groundRules: [
              "Take turns sharing your reflections.",
              "Listen with curiosity rather than correcting or defending.",
              "Focus on your own Four Horsemen, not on spotting your partner's.",
            ],
            fields: [
              { id: "learnt", label: "What have we learnt about each other's communication patterns (the Four Horsemen)?" },
              { id: "without-blame", label: "How can we help each other recognise these patterns without blame?" },
              { id: "small-change", label: "What is one small change we could each practise this week?" },
            ],
          },
          partnerNote: "Share your reflection with your partner before your couple conversation.",
        },
        {
          kind: "callout",
          icon: "route",
          title: "Next: What You Can Do Differently",
          body: `The purpose is not to blame yourself or your partner, but to develop greater awareness of your communication habits. Awareness gives you an opportunity to make different choices. In Part 5, we look at healthier alternatives.`,
        },
      ],
    },

    /* ---------------------------------------------------------------- 5 */
    {
      id: "communication-part-5",
      title: "Part 5: Healthier Alternatives and Listening to Understand",
      summary:
        "The gentle start-up, healthier alternatives to the Four Horsemen, knowing when to pause, and validation. Then practise the Speaker–Listener exercise together.",
      estimatedMinutes: 40,
      blocks: [
        {
          kind: "video",
          title: "Healthier Alternatives and Listening to Understand — Part 5",
          playbackId: "",
          durationSeconds: 840,
        },
        {
          kind: "prose",
          heading: "What You Can Do Differently",
          body: `Hopefully, that exercise helped you recognise some of your own communication habits. Now we are going to look at what you can do differently.`,
        },
        {
          kind: "contrast",
          heading: "Begin with a Gentle Start-Up",
          intro:
            "One technique the Gottmans recommend is a gentle start-up. Rather than beginning a difficult conversation with blame or criticism, begin with your own experience: your feelings and your needs.",
          columns: [
            {
              label: "Rather than",
              icon: "zap",
              items: ["“Can you not see how tired I am?”", "“Do not talk to me like that.”"],
            },
            {
              label: "Try",
              icon: "message-circle",
              tone: "sage",
              items: ["“I felt overwhelmed today, and I would really appreciate some help.”", "“I felt hurt when you said…”"],
            },
          ],
          note: "You are explaining your feelings or what you need, not attacking your partner's character. This can make it easier for your partner to hear your concern, although it cannot guarantee their response.",
        },
        {
          kind: "flipCards",
          heading: "Healthier Alternatives to the Four Horsemen",
          intro: "Tap each card to see what can take its place.",
          items: [
            {
              frontLabel: "Instead of",
              front: "Criticism",
              backLabel: "Try",
              back: "A gentle start-up. Describe your experience, feelings and needs rather than attacking your partner.",
            },
            {
              frontLabel: "Instead of",
              front: "Defensiveness",
              backLabel: "Try",
              back: "Taking responsibility. Acknowledge the part of the situation you can genuinely take responsibility for.",
            },
            {
              frontLabel: "Instead of",
              front: "Contempt",
              backLabel: "Try",
              back: "Appreciation and respect. Protect each other's dignity, even during disagreements.",
            },
            {
              frontLabel: "Instead of",
              front: "Stonewalling",
              backLabel: "Try",
              back: "A healthy pause. Take time to settle, and agree when you will return to the conversation.",
            },
          ],
        },
        {
          kind: "callout",
          icon: "sprout",
          title: "You Will Not Always Get This Right",
          body: `None of us does. The aim is to recognise these habits sooner and practise responding differently.`,
        },
        {
          kind: "contrast",
          heading: "Know When to Pause",
          intro:
            "If you notice you are shutting down, one helpful skill you can develop is knowing when to ask for a pause: recognising when you are becoming too overwhelmed to communicate respectfully, and explaining that you need a break.",
          columns: [
            {
              label: "A pause is not",
              icon: "lock",
              items: ["Walking away without explanation", "Refusing to continue the conversation indefinitely"],
            },
            {
              label: "A healthy pause sounds like",
              icon: "pause-circle",
              tone: "sage",
              items: ["“I am feeling overwhelmed. Can we take twenty minutes and come back to this?”"],
            },
          ],
          note: "The important part is agreeing to return. That helps the pause support communication rather than leave the issue unresolved.",
        },
        {
          kind: "callout",
          icon: "wind",
          title: "Time to Regulate",
          body: `As we discussed in our nervous system module, taking time to regulate can help us become more able to listen and respond thoughtfully.

And remember, you do not have to continue a conversation when either of you is too overwhelmed to engage safely or respectfully.`,
        },
        {
          kind: "prose",
          heading: "The Speaker–Listener Exercise",
          body: `Now we would like to introduce one of our favourite communication tools from the counselling room.

It is particularly helpful because it slows conversations down and encourages both people to listen with the intention of understanding. It is similar to the appreciation exercise, but this time we focus more specifically on active listening and understanding.`,
        },
        {
          kind: "contrast",
          heading: "Speaking and Listening",
          columns: [
            {
              label: "The speaker",
              icon: "message-circle",
              items: [
                "Talks for about one or two minutes",
                "Describes their experience and feelings",
                "Does not criticise or make personal attacks",
              ],
            },
            {
              label: "The listener",
              icon: "ear",
              tone: "sage",
              items: [
                "Gives their attention without interrupting, defending or immediately offering solutions",
                "Tries not to prepare a response while their partner is speaking",
                "Reflects back: “What I am hearing is…”, “It sounds like…” or “You felt…”",
                "Then asks: “Have I understood you correctly?”",
              ],
            },
          ],
          note: "If something has been missed, the speaker can clarify and the listener reflects again. The aim is not to get every word right. It is to show that you are genuinely trying to understand your partner's experience.",
        },
        {
          kind: "flipCards",
          heading: "What It Can Sound Like",
          intro: "Tap the card to hear the listener's reflection.",
          items: [
            {
              frontLabel: "The speaker",
              front: "“When you were on your phone while I was trying to talk yesterday, I felt really disappointed. I had been looking forward to telling you about what happened at work. In that moment, I felt as though what I was saying was not important to you.”",
              backLabel: "The listener",
              back: "“So what I am hearing is that when I was looking at my phone while you were trying to talk to me, you felt disappointed. You had been looking forward to sharing something with me, and when I was not giving you my attention, you felt unimportant. Have I understood you correctly?”",
            },
          ],
        },
        {
          kind: "callout",
          icon: "heart-handshake",
          title: "Understanding Does Not Mean Agreeing",
          body: `The listener has not explained why they were on their phone, defended themselves or tried to convince their partner not to feel disappointed. They have focused on understanding what that moment was like.

This is validation: acknowledging that your partner's feelings and experiences matter. It does not mean you have to agree with their interpretation of events. You can understand their perspective while seeing the situation differently.`,
        },
        {
          kind: "accordion",
          heading: "Common Mistakes",
          intro: "Keep reflections close to what your partner actually said. Tap each to read more.",
          items: [
            {
              icon: "zap",
              title: "Interrupting halfway through",
              body: `Try to stay with your partner's experience until they have finished. Your turn will come.`,
            },
            {
              icon: "search",
              title: "Reflecting back with judgement",
              body: `“So what you are saying is that I deliberately ignored you?” That is an interpretation rather than a reflection. Avoid adding judgement or assumptions.`,
            },
            {
              icon: "shield",
              title: "“Yes, but…”",
              body: `As soon as the “but” appears, the conversation can quickly move back into defending and explaining.`,
            },
          ],
        },
        {
          kind: "tapChoice",
          exerciseId: "m4-hardest-part-of-listening",
          title: "What Might Be Hardest for You?",
          intro: "There are no right answers here, just a moment of noticing before you practise.",
          questions: [
            {
              id: "hardest",
              text: "As the listener, which might be hardest for you?",
              options: [
                {
                  value: "interrupting",
                  label: "Not interrupting",
                  response:
                    "Many of us want to jump in, particularly when we care. Try letting a short pause pass before you speak.",
                },
                {
                  value: "defending",
                  label: "Not explaining or defending myself",
                  response:
                    "That urge is very natural. Remember, you will have your turn as the speaker. For now, stay with your partner's experience.",
                },
                {
                  value: "solutions",
                  label: "Not offering solutions straight away",
                  response:
                    "Wanting to help is caring. But often, feeling understood needs to come before any solution.",
                },
                {
                  value: "preparing",
                  label: "Not preparing my response while they talk",
                  response:
                    "This is one of the hardest parts. Gently bring your attention back to your partner's words each time you notice your mind drifting.",
                },
              ],
            },
          ],
        },
        {
          kind: "flow",
          heading: "Your Turn",
          intro: "Choose something relatively small and manageable to talk about, rather than your biggest relationship disagreement.",
          steps: [
            { icon: "message-circle", title: "Speaker", body: "One person speaks for up to two minutes about their experience. You might like to set a timer." },
            { icon: "ear", title: "Listener", body: "The other person listens without interrupting, defending or trying to solve the problem." },
            { icon: "refresh-cw", title: "Reflect", body: "Reflect back what you heard, and ask: “Have I understood you correctly?” If not, invite your partner to clarify and reflect again." },
            { icon: "users", title: "Swap roles", body: "Once the speaker feels understood, swap roles and give your partner the same opportunity." },
          ],
        },
        {
          kind: "callout",
          icon: "smile",
          title: "It Is a Skill",
          body: `It might feel awkward or unnatural at first. That is okay. You do not need to get it perfect.

If either of you becomes overwhelmed, it is okay to pause and return when you are ready.`,
        },
        {
          kind: "pairedReflection",
          exerciseId: "m4-speaker-listener",
          eyebrow: "Module 4 · Part 5",
          title: "Speaker–Listener Reflection",
          intro: "Once you have both had a turn as speaker and listener, take a few moments to reflect.",
          individual: {
            title: "Individual Reflection",
            questions: [
              { id: "talking", label: "What was it like to talk while my partner listened?" },
              { id: "reflected", label: "How did I feel when my partner reflected back what I said?" },
              { id: "urge", label: "What did I notice about my own urge to interrupt, explain or defend?" },
            ],
          },
          together: {
            title: "Reflect Together",
            steps: TAKE_TURNS_STEPS,
            questions: [
              { id: "everyday", label: "What might help us use this technique in everyday conversations?" },
            ],
          },
          revealNote:
            "This technique creates an opportunity to replace assumptions with understanding. It can help reduce defensiveness and encourage empathy.",
          closing: {
            text: "The aim is to listen with the intention of understanding.",
          },
        },
        {
          kind: "callout",
          icon: "route",
          title: "Next: Repairing and Reconnecting",
          body: `In Part 6, we look at how to find your way back to each other when a conversation has gone wrong.`,
        },
      ],
    },

    /* ---------------------------------------------------------------- 6 */
    {
      id: "communication-part-6",
      title: "Part 6: Repairing and Reconnecting After Conflict",
      summary:
        "The words that escalate a disagreement, repair attempts, meaningful apologies and accepting influence. Then reflect together on how you find your way back to each other.",
      estimatedMinutes: 30,
      blocks: [
        {
          kind: "video",
          title: "Repairing and Reconnecting After Conflict — Part 6",
          playbackId: "",
          durationSeconds: 540,
        },
        {
          kind: "contrast",
          heading: "Be Specific with Your Words",
          intro:
            "Sometimes it is the smallest words that can escalate a disagreement. Words like “You always…” and “You never…” often appear when we are frustrated, but they are rarely completely accurate.",
          columns: [
            {
              label: "Rather than",
              icon: "zap",
              items: ["“You always…”", "“You never…”"],
            },
            {
              label: "Try",
              icon: "message-circle",
              tone: "sage",
              items: ["Describing the particular moment and how it affected you"],
            },
          ],
          note: "When someone hears “You never listen”, they are unlikely to think “You are right.” They may immediately start searching their memory for all the times they did listen, and suddenly you are arguing about the words always and never rather than the original issue.",
        },
        {
          kind: "prose",
          heading: "The Importance of Repair",
          body: `Even when we get caught in these habits, it does not mean the conversation is lost. We can learn to recognise what is happening and find our way back to each other.

Healthy couples do not communicate perfectly. They interrupt. They misunderstand each other. Sometimes they say things they later regret. The important thing is not expecting ourselves or our partners to get everything right. It is learning to recognise when things have gone wrong, and what we can do to repair the connection.`,
        },
        {
          kind: "flipCards",
          heading: "Do We Argue?",
          intro:
            "Many people believe that happy couples do not argue. But every relationship has disagreements, different opinions, misunderstandings and frustrations. Tap the card.",
          items: [
            {
              frontLabel: "The question is not simply",
              front: "“Do we argue?”",
              backLabel: "It is",
              back: "“What happens next?” Do we move further apart, or can we find a way to reconnect?",
            },
          ],
        },
        {
          kind: "iconCards",
          heading: "Repair Attempts",
          intro:
            "A repair attempt is something you say or do to stop a difficult interaction escalating and help you reconnect. It does not need to be a big speech. Sometimes it is just a few words.",
          columns: 2,
          items: [
            { icon: "refresh-cw", title: "“Can we start again?”" },
            { icon: "pause-circle", title: "“Let us slow this down.”" },
            { icon: "search", title: "“Help me understand.”" },
            { icon: "hand-heart", title: "“I can understand why that felt upsetting.”" },
            { icon: "users", title: "“I can see we are both upset.”" },
            { icon: "message-circle", title: "“I do not think I am explaining myself very well.”" },
            { icon: "heart", title: "“I did not mean to hurt you.”" },
            { icon: "ear", title: "“Thank you for telling me.”" },
          ],
        },
        {
          kind: "callout",
          icon: "hourglass",
          title: "Repair Is an Invitation",
          body: `Repair may not resolve the disagreement immediately, but it can change the direction of the conversation.

We cannot demand that our partner feels better immediately or accepts our attempt to reconnect. Your partner may need time before they feel ready. Respecting that space can be part of the repair process too.`,
        },
        {
          kind: "contrast",
          heading: "Apologies That Miss the Mark",
          columns: [
            {
              label: "We have all heard",
              icon: "shield",
              items: ["“I am sorry you feel that way.”", "“I am sorry, but you started it.”"],
            },
            {
              label: "Why they miss",
              icon: "search",
              tone: "sage",
              items: ["They do not always communicate genuine accountability"],
            },
          ],
        },
        {
          kind: "flow",
          heading: "A Meaningful Apology",
          intro: "A meaningful apology usually involves three things.",
          steps: [
            { icon: "eye", title: "Acknowledge your behaviour", body: "“I am sorry I interrupted you.”" },
            { icon: "heart", title: "Recognise its impact", body: "“I understand that left you feeling unheard.”" },
            { icon: "route", title: "Explain what you will do differently", body: "“Next time, I will let you finish before responding.”" },
          ],
        },
        {
          kind: "callout",
          icon: "shield-check",
          title: "Following Through",
          body: `A meaningful apology is not just about what we say. It is also about what we do differently afterwards. Following through on your words helps rebuild trust.`,
        },
        {
          kind: "accordion",
          heading: "Accepting Influence",
          intro:
            "Another important part of healthy communication is being willing to let your partner's perspective influence your own. Tap each to read more.",
          items: [
            {
              icon: "users",
              title: "What it means",
              body: `Making room for your partner's perspective to shape your understanding and decisions. Recognising that their thoughts, feelings and opinions matter alongside your own.`,
            },
            {
              icon: "anchor",
              title: "What it does not mean",
              body: `It does not mean giving in. It does not mean agreeing with everything. And it certainly does not mean abandoning your own needs or values. You can remain open and curious while keeping your needs, boundaries and values.`,
            },
            {
              icon: "compass",
              title: "When you see things differently",
              body: `Sometimes your partner sees something you have missed. Sometimes they are right. Sometimes you are both partly right. And sometimes you will continue to see things differently. You can still approach those differences with curiosity and respect.`,
            },
          ],
        },
        {
          kind: "quote",
          text: "Healthy relationships are not about being competitors. They are about learning how to work together as a team.",
          attribution: "Laura & Esther",
        },
        {
          kind: "pairedReflection",
          exerciseId: "m4-finding-your-way-back",
          eyebrow: "Module 4 · Part 6",
          title: "Finding Your Way Back",
          intro:
            "Think of a recent, manageable disagreement. Listen without interrupting, and pause if either of you becomes overwhelmed.",
          individual: {
            title: "Individual Reflection",
            intro: "Answer these on your own first, then take turns sharing.",
            questions: [
              { id: "tried-repair", label: "Was there a moment when either of us tried to repair the conversation?" },
              { id: "helped", label: "What helped us reconnect, or what might have helped?" },
              { id: "understand", label: "Is there anything in my partner's perspective I can understand more clearly now?" },
            ],
          },
          together: {
            title: "Choose Together",
            steps: TAKE_TURNS_STEPS,
            questions: [
              {
                id: "repair-phrase",
                label: "Which repair phrase would we both feel comfortable using next time?",
                hint: "Such as “Can we start again?” or “Let us slow this down.”",
              },
            ],
          },
          revealNote:
            "Repair is not about getting every conversation right. It is about recognising when things have gone wrong and finding opportunities to reconnect.",
        },
        {
          kind: "callout",
          icon: "route",
          title: "Next: Humour, Reflection and Moving Forward",
          body: `In Part 7, the final part of this module, we look at humour as a repair tool and reflect on what you have learnt.`,
        },
      ],
    },

    /* ---------------------------------------------------------------- 7 */
    {
      id: "communication-part-7",
      title: "Part 7: Humour, Reflection and Moving Forward",
      summary:
        "Humour that helps you laugh together, a look back at everything this module has explored, and one small change to take forward. Then reflect on your communication.",
      estimatedMinutes: 20,
      blocks: [
        {
          kind: "video",
          title: "Humour, Reflection and Moving Forward — Part 7",
          playbackId: "",
          durationSeconds: 360,
        },
        {
          kind: "contrast",
          heading: "Humour That Helps You Reconnect",
          intro:
            "Humour can be a wonderful repair tool. A shared smile, a joke or a playful moment can help release tension, when it feels welcome to both of you.",
          columns: [
            {
              label: "Healthy humour",
              icon: "smile",
              tone: "sage",
              items: ["Helps you laugh together", "Feels welcome to both of you"],
            },
            {
              label: "Humour that hurts",
              icon: "shield-alert",
              items: ["Makes one person the joke", "Mocks, humiliates or dismisses your partner's feelings", "Can deepen the hurt and create distance"],
            },
          ],
          note: "Timing matters. Something that feels funny to one person might not feel funny to the other, particularly when they are hurt or upset. Pay attention to timing and how your humour is received.",
        },
        {
          kind: "flow",
          heading: "What We Have Explored in This Module",
          steps: [
            { icon: "heart", title: "Appreciation", body: "The importance of appreciation and everyday positive interactions." },
            { icon: "refresh-cw", title: "Patterns", body: "The communication patterns couples can get caught in." },
            { icon: "shield", title: "The Four Horsemen", body: "And some healthier alternatives." },
            { icon: "ear", title: "Listening", body: "Listening with the intention of understanding." },
            { icon: "heart-handshake", title: "Repair", body: "How repair can help us reconnect when communication goes wrong." },
          ],
        },
        {
          kind: "callout",
          icon: "leaf",
          tone: "dark",
          title: "One Message to Take Away",
          body: `Healthy communication is not about getting everything right. It is about being willing to notice, understand, take responsibility and keep learning.`,
        },
        {
          kind: "iconCards",
          heading: "Keep Building on These Skills",
          columns: 3,
          items: [
            { icon: "hand-heart", title: "Express appreciation regularly" },
            { icon: "refresh-cw", title: "Recognise your communication patterns" },
            { icon: "message-circle", title: "Raise concerns gently and listen to understand" },
            { icon: "pause-circle", title: "Pause when overwhelmed and agree to return" },
            { icon: "heart-handshake", title: "Repair when things go wrong" },
          ],
        },
        {
          kind: "tapChoice",
          exerciseId: "m4-one-small-change",
          title: "One Small Change",
          intro:
            "You do not have to change everything overnight. Sometimes one small change can make a difference. Which feels right for you to start with?",
          questions: [
            {
              id: "change",
              text: "Which small change would you like to practise first?",
              options: [
                {
                  value: "phone-down",
                  label: "Putting my phone down when my partner is speaking",
                  response:
                    "A simple change that can be a meaningful deposit. Your full attention says a great deal.",
                },
                {
                  value: "appreciation",
                  label: "Expressing appreciation more often",
                  response:
                    "Lovely. Remember, two or three times a week is a good place to start, in your own words.",
                },
                {
                  value: "defensive",
                  label: "Recognising when I am becoming defensive",
                  response:
                    "Noticing is where change begins. When you catch it, try listening first. Your turn will come.",
                },
                {
                  value: "pause",
                  label: "Asking for a pause before a conversation escalates",
                  response:
                    "A healthy pause, with an agreement to return, can protect both of you. Remember to say when you will come back to it.",
                },
                {
                  value: "help-me-understand",
                  label: "Asking, “Can you help me understand what this felt like for you?”",
                  response:
                    "A beautiful question. It invites your partner to share, and shows you are trying to understand.",
                },
              ],
            },
          ],
        },
        {
          kind: "sharedJournal",
          exerciseId: "m4-final-reflection",
          title: "Final Reflection: Your Communication",
          intro:
            "Before moving on to the next module, take a moment to reflect individually, then together. Remember, the aim is not to decide who is the better communicator or who needs to change the most. It is to develop a greater understanding of yourselves, each other and the patterns that can develop between you.",
          prompts: [
            "What have I learnt about the way I communicate?",
            "What have I learnt about my partner's experience of our communication?",
            "What is one small change I am willing to practise to help us communicate more effectively?",
          ],
          partnerNote:
            "Your partner's reflection on your communication, in their own words. Read it with curiosity rather than correction.",
        },
        {
          kind: "callout",
          icon: "leaf",
          title: "That Is the End of Module 4",
          body: `No couple communicates perfectly. But couples can learn to communicate in ways that create greater understanding, respect and connection, and the more you practise, the more familiar these skills can become. That is what we hope you will continue to practise as you move through the rest of the programme.

Growth begins with understanding. And sometimes, the smallest changes in how we communicate can create meaningful changes in how we connect. Next, we move on to Module 5.`,
        },
      ],
    },
  ],
};
