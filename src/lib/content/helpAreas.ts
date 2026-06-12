export interface HelpArea {
  id: string;
  title: string;
  summary: string;
  body: string;
  /* One distilled line for the scroll-illumination moment */
  essence: string;
  /* Short themes shown as floating chips instead of paragraphs */
  keywords: string[];
}

export const helpAreas: HelpArea[] = [
  {
    id: "relationships",
    title: "Relationships, Couples, Sexuality & Identity",
    summary:
      "Communication difficulties, conflict, emotional disconnection, intimacy concerns, trust issues, affair recovery, life transitions and strengthening relationships.",
    body: `Relationships can be one of the greatest sources of connection, fulfilment and support in our lives, but they can also bring challenges, uncertainty, and emotional pain. We provide a safe, inclusive and non-judgemental space for individuals and couples to explore relationship difficulties, strengthen connections, and develop greater understanding of themselves and others.

We work with a wide range of relationship concerns including communication difficulties, conflict, emotional disconnection, trust issues, intimacy concerns, affair recovery, separation, life transitions, family dynamics, and differing needs within relationships. We also support individuals who wish to explore patterns in relationships, attachment styles, boundaries, self-worth and the impact of past experiences on current relationships.

We welcome and affirm people of all sexual orientations, gender identities, relationship structures and cultural backgrounds. This includes LGBTQ+ individuals and couples, people who are questioning aspects of their identity, those exploring sexuality or intimacy concerns, and people in monogamous, non-monogamous, polyamorous or other relationship arrangements.

Our aim is not to decide who is right or wrong but to create a space where experiences can be explored with curiosity, compassion, and respect. Through greater understanding of yourself, your relationships, and the patterns that shape them, meaningful and lasting change becomes possible.`,
    essence: "Connection is where we hurt — and where we heal.",
    keywords: [
      "Communication",
      "Conflict",
      "Intimacy",
      "Trust",
      "Affair recovery",
      "Attachment",
      "Couples",
      "LGBTQ+ affirming",
    ],
  },
  {
    id: "anxiety",
    title: "Anxiety & Stress",
    summary:
      "Worry, overthinking, panic, health anxiety, workplace stress, overwhelm and managing life's pressures.",
    body: `Anxiety and stress are among the most common reasons people seek therapy, and they can affect every area of life — from sleep and relationships to work and physical health. Whether you experience constant worry and overthinking, panic attacks, health anxiety, or are simply feeling overwhelmed by the pressures of daily life, therapy can help.

We work with you to understand what lies beneath your anxiety, exploring the thoughts, feelings and patterns that keep it in place. Through greater self-awareness and a range of evidence-informed approaches, we help you develop healthier ways of managing stress, build confidence in your ability to cope, and find greater calm and clarity in your day-to-day life.`,
    essence: "Beneath the worry there is a calmer, clearer you.",
    keywords: [
      "Worry",
      "Overthinking",
      "Panic",
      "Health anxiety",
      "Workplace stress",
      "Overwhelm",
    ],
  },
  {
    id: "trauma",
    title: "Trauma & Difficult Life Experiences",
    summary:
      "Childhood experiences, abuse, neglect, relationship trauma, PTSD symptoms and the lasting impact of difficult events.",
    body: `Difficult and traumatic experiences can leave a lasting mark on how we see ourselves and the world around us. Whether the impact comes from childhood experiences, abuse, neglect, loss, relationship trauma, accidents, or other distressing events, the effects can be far-reaching — affecting our emotions, relationships, sense of safety and sense of self.

We provide a gentle, trauma-informed approach that prioritises your safety and wellbeing at every step. We work at your pace, helping you to make sense of your experiences, process difficult feelings and memories, and gradually build a greater sense of security and resilience. Healing from trauma is possible, and you do not have to face it alone.`,
    essence: "What happened to you matters — and healing is possible.",
    keywords: [
      "Childhood experiences",
      "PTSD symptoms",
      "Abuse",
      "Neglect",
      "Relationship trauma",
      "Feeling safe again",
    ],
  },
  {
    id: "self-esteem",
    title: "Self-Esteem & Confidence",
    summary:
      "Low self-worth, self-criticism, people-pleasing, imposter feelings, confidence building and developing self-acceptance.",
    body: `Low self-esteem can show up in many different ways — through persistent self-criticism, difficulty setting boundaries, people-pleasing, imposter syndrome, or a deep sense of not being good enough. These feelings can affect our relationships, our work, and our ability to enjoy life.

In therapy, we explore where these beliefs about yourself originated and how they continue to be reinforced. With compassion and curiosity, we gently challenge unhelpful patterns of thinking and behaviour, helping you to develop a more balanced, kinder and more realistic sense of who you are. Over time, greater self-acceptance and confidence become possible.`,
    essence: "You are already enough — therapy helps you believe it.",
    keywords: [
      "Self-worth",
      "Self-criticism",
      "People-pleasing",
      "Imposter feelings",
      "Confidence",
      "Self-acceptance",
    ],
  },
  {
    id: "depression",
    title: "Depression & Low Mood",
    summary:
      "Feelings of sadness, hopelessness, loss of motivation, emotional numbness and difficulties finding enjoyment in life.",
    body: `Depression can feel like a heaviness that makes even small tasks feel impossible. It can show up as persistent sadness, a loss of interest or pleasure in things you used to enjoy, emotional numbness, hopelessness, low energy, or difficulty thinking clearly. It can be isolating, and it can be hard to reach out for help.

We offer a warm, non-judgemental space where you can speak freely about what you are experiencing. Together, we explore the underlying factors contributing to how you feel and work towards lifting the weight of depression — developing greater understanding, building gentle momentum, and reconnecting with a sense of hope and possibility.`,
    essence: "Even the heaviest days can lighten, one step at a time.",
    keywords: [
      "Low mood",
      "Hopelessness",
      "Emotional numbness",
      "Loss of motivation",
      "Finding enjoyment",
      "Rebuilding hope",
    ],
  },
  {
    id: "emotional-regulation",
    title: "Emotional Regulation & Personal Growth",
    summary:
      "Understanding emotions, managing anger, building resilience, developing self-awareness and creating healthier coping strategies.",
    body: `Sometimes our emotions can feel overwhelming, unpredictable or difficult to manage. Whether you struggle with anger, emotional outbursts, emotional numbness, or simply feel disconnected from yourself, therapy can help you develop a greater understanding of your inner world.

We support you in building emotional awareness — learning to recognise, name and understand your feelings — and developing healthier ways of coping and responding. We also work with people who simply want to grow, to understand themselves more fully, and to create a life that feels more fulfilling, intentional and connected.`,
    essence: "Your emotions are messengers — we help you listen.",
    keywords: [
      "Understanding emotions",
      "Managing anger",
      "Resilience",
      "Self-awareness",
      "Healthier coping",
      "Personal growth",
    ],
  },
  {
    id: "family-transitions",
    title: "Family, Identity & Life Transitions",
    summary:
      "Family difficulties, separation, divorce, parenting challenges, bereavement, career changes, menopause, retirement and major life changes.",
    body: `Life is full of transitions — some chosen and some not. Whether you are navigating separation or divorce, adjusting to parenthood, experiencing bereavement, facing significant career changes, approaching retirement, moving through menopause, or dealing with difficult family dynamics, transitions can bring up complex and often conflicting emotions.

Therapy provides a space to process change, explore identity and meaning, and find a way through uncertainty. We help you make sense of where you are, connect with your own values and strengths, and move forward with greater clarity and confidence — even in the midst of change.`,
    essence: "When life changes shape, you can too.",
    keywords: [
      "Separation & divorce",
      "Parenting",
      "Bereavement",
      "Career change",
      "Menopause",
      "Retirement",
    ],
  },
  {
    id: "neurodiversity",
    title: "Neurodiversity & Difference",
    summary:
      "Support for ADHD, autism, burnout, masking, sensory overwhelm, relationships and understanding yourself more fully.",
    body: `Being neurodivergent in a world not designed for the way your mind works can be exhausting, confusing and isolating. Whether you have a formal diagnosis of ADHD or autism, suspect you may be neurodivergent, or simply feel that you have always experienced the world differently, therapy can offer a space for greater self-understanding and self-compassion.

We provide neurodiversity-affirming support that celebrates difference while also acknowledging the very real challenges that can come with masking, burnout, sensory overwhelm, emotional dysregulation, and navigating relationships and the expectations of others. We work collaboratively with you to build strategies that fit how your mind actually works, rather than how others think it should.`,
    essence: "Your mind is not wrong — the world was not built for it.",
    keywords: [
      "ADHD",
      "Autism",
      "Burnout",
      "Masking",
      "Sensory overwhelm",
      "Self-understanding",
    ],
  },
];
