export interface HelpArea {
  id: string;
  title: string;
  summary: string;
  body: string;
  /* One distilled line for the scroll-illumination moment */
  essence: string;
  /* Short themes shown as floating chips instead of paragraphs */
  keywords: string[];
  /* Optional interactive tabs: each theme reveals a "We can help you…" blurb */
  explore?: { label: string; body: string }[];
}

export const helpAreas: HelpArea[] = [
  {
    id: "relationships",
    title: "Relationships, Couples, Sexuality & Identity",
    summary:
      "Communication difficulties, recurring conflict, emotional disconnection, trust issues, affair recovery, attachment patterns, family dynamics, life transitions, separation, divorce and strengthening relationships.",
    body: `Communication difficulties, recurring conflict, emotional disconnection, trust issues, affair recovery, attachment patterns, family dynamics, life transitions, separation, divorce and strengthening relationships.

We support individuals and couples who are considering the future of their relationship, navigating uncertainty, deciding on next steps, rebuilding after challenges or exploring whether they wish to stay together, work towards change or navigate an amicable separation.

We work with a wide range of sexuality and intimacy concerns including differences in desire, loss of intimacy, sexual confidence, erectile difficulties, painful sex, sexual anxiety, the impact of trauma on intimacy, menopause-related changes and body image concerns.

We support individuals who are exploring, questioning or seeking greater understanding of their gender identity and or sexuality and how this fits within their personal journey and relationships.`,
    essence: "Connection is where we hurt — and where we heal.",
    keywords: [
      "Communication",
      "Conflict",
      "Intimacy",
      "Trust",
      "Affair recovery",
      "Attachment",
      "Couples",
      "LGBTQIA+ affirming",
    ],
    explore: [
      {
        label: "Conflict",
        body: "We can help you understand recurring arguments, break free from unhelpful relationship patterns, manage anger and resentment, communicate more effectively, navigate differing needs and expectations, repair after disagreements and develop healthier ways of resolving conflict.",
      },
      {
        label: "Trust",
        body: "We can help you rebuild trust following betrayal, affair recovery, or relationship difficulties, explore fears of abandonment, manage jealousy and insecurity, strengthen emotional safety, develop healthier boundaries and build more secure relationships with yourself and others.",
      },
      {
        label: "Affair Recovery",
        body: "We can help you process the impact of infidelity and betrayal, rebuild trust, navigate uncertainty about the future of your relationship, improve communication, understand underlying relationship dynamics, establish healthy boundaries and decide how you wish to move forward.",
      },
      {
        label: "Attachment",
        body: "We can help you understand your attachment style, recognise relationship patterns, explore fears of rejection or abandonment, improve emotional connection, build self-awareness and self-worth, develop healthier boundaries and create more secure relationships with yourself and others.",
      },
      {
        label: "Couples",
        body: "We can help you strengthen communication, rebuild trust, deepen emotional connection, navigate conflict, improve intimacy, recover from betrayal, understand relationship patterns, manage life transitions, strengthen your friendship and partnership and create a healthier and more fulfilling relationship together.",
      },
      {
        label: "LGBTQIA+",
        body: "We can help you explore sexuality, gender identity, and gender expression in a safe, affirming, and non-judgemental space, whether you are questioning, exploring, navigating change, or seeking support with the impact these experiences may have on your life and relationship.",
      },
    ],
  },
  {
    id: "anxiety",
    title: "Anxiety & Stress",
    summary:
      "Worry, overthinking, panic, health anxiety, workplace stress, overwhelm and managing life's pressures.",
    body: `Anxiety and stress are among the most common reasons people seek therapy and they can affect every area of life — from sleep and relationships to work and physical health. Whether you experience constant worry and overthinking, panic attacks, health anxiety or are simply feeling overwhelmed by the pressures of daily life, therapy can help.

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
    body: `Difficult and traumatic experiences can leave a lasting mark on how we see ourselves and the world around us. Whether the impact comes from childhood experiences, abuse, neglect, loss, relationship trauma, accidents or other distressing events, the effects can be far-reaching — affecting our emotions, relationships, sense of safety and sense of self.

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
    body: `Low self-esteem can show up in many different ways — through persistent self-criticism, difficulty setting boundaries, people-pleasing, imposter syndrome or a deep sense of not being good enough. These feelings can affect our relationships, our work and our ability to enjoy life.

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
    body: `Depression can feel like a heaviness that makes even small tasks feel impossible. It can show up as persistent sadness, a loss of interest or pleasure in things you used to enjoy, emotional numbness, hopelessness, low energy or difficulty thinking clearly. It can be isolating and it can be hard to reach out for help.

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
    body: `Sometimes our emotions can feel overwhelming, unpredictable or difficult to manage. Whether you struggle with anger, emotional outbursts, emotional numbness or simply feel disconnected from yourself, therapy can help you develop a greater understanding of your inner world.

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
    body: `Life is full of transitions — some chosen and some not. Whether you are navigating separation or divorce, adjusting to parenthood, experiencing bereavement, facing significant career changes, approaching retirement, moving through menopause or dealing with difficult family dynamics, transitions can bring up complex and often conflicting emotions.

Therapy provides a space to process change, explore identity and meaning, and find a way through uncertainty. We help you make sense of where you are, connect with your own values and strengths, and move forward with greater clarity and confidence — even in the midst of change.`,
    essence: "When life changes shape, you can too.",
    keywords: [
      "Early adulthood",
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
    body: `Being neurodivergent in a world not designed for the way your mind works can be exhausting, confusing and isolating. Whether you have a formal diagnosis of ADHD or autism, suspect you may be neurodivergent or simply feel that you have always experienced the world differently, therapy can offer a space for greater self-understanding and self-compassion.

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
