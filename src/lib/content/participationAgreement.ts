/* The Couples Participation Agreement, as written by Laura and Esther
   (August 2026). Bump AGREEMENT_VERSION when the wording changes materially
   and every member will be asked to accept it again. */

export const AGREEMENT_VERSION = "2026-08";
export const AGREEMENT_UPDATED = "August 2026";

export interface AgreementSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  afterBullets?: string[];
}

export const AGREEMENT_SECTIONS: AgreementSection[] = [
  {
    heading: "Welcome",
    paragraphs: [
      "Thank you for joining a NewFuture Therapy couples relationship programme.",
      "Our programmes are designed to help couples strengthen communication, increase understanding, deepen connection and explore relationship patterns through structured educational content, guided exercises and reflective learning.",
      "We believe that growth begins with understanding. Our aim is to create a space where couples can explore their relationship with curiosity, honesty and compassion.",
      "To support a safe and respectful learning environment, all participants are asked to read and agree to the following participation guidelines.",
    ],
  },
  {
    heading: "An Educational Programme, Not Counselling",
    paragraphs: [
      "NewFuture Therapy programmes are educational and psychoeducational resources.",
      "Participation does not create a counselling, psychotherapy, coaching or therapeutic relationship with NewFuture Therapy.",
      "The programme is not a substitute for counselling, psychotherapy, relationship therapy, medical advice, diagnosis, treatment or crisis support.",
      "While many couples find relationship education programmes valuable, individual circumstances vary and no specific outcomes can be guaranteed.",
    ],
  },
  {
    heading: "Separate Individual Accounts",
    paragraphs: [
      "Many NewFuture Therapy programmes provide separate accounts for each partner.",
      "Each participant is encouraged to complete activities independently and answer questions honestly and authentically.",
      "Your individual responses remain private unless you actively choose to share them through features designed for that purpose.",
      "Your partner will not automatically have access to your personal reflections, journals, questionnaires or activities unless you grant permission through the platform.",
      "You remain responsible for deciding what information you choose to share.",
    ],
  },
  {
    heading: "Shared Activities",
    paragraphs: [
      "Some activities are designed to be completed individually before being discussed together. Others may be completed collaboratively.",
      "The purpose of sharing is not to determine who is right or wrong. The purpose is to increase understanding, empathy and connection.",
      "When engaging in shared activities, participants agree to:",
    ],
    bullets: [
      "Approach differences with curiosity rather than criticism",
      "Listen with the intention of understanding",
      "Respect each other's experiences and perspectives",
      "Recognise that both partners may experience the same event differently",
      "Avoid blame, contempt, shaming or personal attacks",
      "Allow honesty without punishment",
      "Avoid pressuring a partner to disclose information they wish to keep private",
      "Remember that the goal is understanding rather than agreement",
    ],
  },
  {
    heading: "Privacy Between Partners",
    paragraphs: [
      "NewFuture Therapy provides tools that allow participants to decide what information they wish to share.",
      "Once information has been voluntarily shared with a partner, NewFuture Therapy cannot control how that information is used, discussed or remembered outside the platform.",
      "Participants are encouraged to treat information shared through the programme with care, respect and confidentiality.",
    ],
  },
  {
    heading: "Journals, Reflections and Personal Exercises",
    paragraphs: [
      "Many programmes include journals, reflective exercises and personal self-exploration activities. These activities are designed to support learning and self-awareness.",
      "There is no expectation that every reflection, journal entry or personal insight must be shared.",
      "Participants are encouraged to respect both their own boundaries and those of their partner.",
    ],
  },
  {
    heading: "AI-Generated Summaries and Reflections",
    paragraphs: [
      "Some programme features may use artificial intelligence to provide summaries, reflective questions, educational prompts and learning insights. These features are designed to support reflection and learning.",
      "AI-generated content:",
    ],
    bullets: [
      "May occasionally be inaccurate or incomplete",
      "May not fully understand your circumstances",
      "Should not be relied upon as professional advice",
      "Should not replace counselling, psychotherapy, medical care or crisis support",
    ],
    afterBullets: [
      "Participants remain responsible for deciding what information they choose to enter into AI-supported features.",
    ],
  },
  {
    heading: "Emotional Safety",
    paragraphs: [
      "Relationship growth can sometimes involve difficult conversations and uncomfortable emotions. Topics may include:",
    ],
    bullets: [
      "Conflict",
      "Attachment",
      "Family experiences",
      "Trust",
      "Betrayal",
      "Sex and intimacy",
      "Emotional wounds",
      "Loss",
      "Relationship dissatisfaction",
    ],
    afterBullets: [
      "Participants are encouraged to move at a pace that feels manageable. You may pause activities at any time and return to them later.",
      "If an activity feels overwhelming, additional support from a qualified professional may be appropriate.",
    ],
  },
  {
    heading: "Domestic Abuse, Coercive Control and Safety Concerns",
    paragraphs: [
      "These programmes are not designed for relationships involving ongoing domestic abuse, coercive control, intimidation, threats, fear or violence of any kind.",
      "Where safety concerns exist, specialist support should be sought. The physical and emotional safety of participants should always take priority over programme participation.",
      "If a participant feels unsafe sharing information with their partner, they should not feel pressured to do so.",
    ],
  },
  {
    heading: "If You Separate During the Programme",
    paragraphs: [
      "We recognise that some couples may decide to separate during the programme. Sometimes relationship education helps couples reconnect. Sometimes it helps couples gain clarity about the future of their relationship.",
      "If separation occurs:",
    ],
    bullets: [
      "Each participant will continue to have access to their own individual account for the remainder of the programme period unless otherwise stated.",
      "Previously shared content will remain visible to the partner with whom it was shared.",
      "Private content that was never shared will remain private.",
      "NewFuture Therapy cannot remove information that has already been voluntarily viewed, downloaded, copied or discussed by a partner.",
      "Participants remain responsible for treating previously shared information respectfully following separation.",
      "Programme participation may continue individually if desired, provided this does not breach any programme terms.",
    ],
  },
  {
    heading: "Respectful Participation",
    paragraphs: ["Participants agree to:"],
    bullets: [
      "Treat one another with dignity and respect",
      "Participate voluntarily",
      "Take responsibility for their own behaviour",
      "Avoid using programme content to control, manipulate, shame or punish a partner",
      "Use learning materials in good faith",
      "Take breaks when discussions become emotionally overwhelming",
    ],
    afterBullets: [
      "The programme is intended to support understanding and connection, not to provide evidence against a partner or win arguments.",
    ],
  },
  {
    heading: "Individual Responsibility",
    paragraphs: ["Each participant remains responsible for:"],
    bullets: [
      "Their own choices",
      "Their own wellbeing",
      "Their own communication",
      "How they use information gained through the programme",
      "Any decisions made during or after participation",
    ],
    afterBullets: [
      "NewFuture Therapy cannot be responsible for decisions made by participants regarding their relationship.",
    ],
  },
  {
    heading: "No Guarantee of Results",
    paragraphs: [
      "Every relationship is unique.",
      "While many couples find relationship education beneficial, NewFuture Therapy makes no guarantee regarding outcomes, improvements, reconciliation, intimacy, communication or relationship satisfaction.",
      "Results will vary depending on many factors including individual circumstances, commitment, readiness for change and factors outside the programme itself.",
    ],
  },
];

export const AGREEMENT_CONFIRMATIONS = [
  "You understand this programme is educational and not counselling or therapy.",
  "You are participating voluntarily.",
  "You understand how individual and shared content works.",
  "You accept responsibility for your own wellbeing and decisions.",
  "You agree to engage respectfully with your partner or partners.",
  "You understand the limitations of AI-generated content.",
  "You agree to these participation guidelines.",
];
