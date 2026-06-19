/* In-code article content — the SEO content engine described in the
   "low-competition keyword → optimised page → request indexing" method.
   Each article targets a cluster of low-competition, high-intent keywords and
   is written on-brand (British English, no contractions, inclusive, warm).
   Add a new entry here to publish a new article. */

export interface ArticleSection {
  heading: string;
  body: string[];
  bullets?: string[];
}

export interface ArticleFAQ {
  question: string;
  answer: string;
}

export interface RelatedLink {
  href: string;
  label: string;
}

export interface Article {
  slug: string;
  title: string;
  /** Optional <title> override; defaults to `${title}`. */
  metaTitle?: string;
  description: string;
  excerpt: string;
  keywords: string[];
  category: string;
  published: string;
  updated?: string;
  readingMinutes: number;
  intro: string[];
  sections: ArticleSection[];
  faqs?: ArticleFAQ[];
  related?: RelatedLink[];
}

export const articles: Article[] = [
  {
    slug: "when-to-consider-couples-counselling",
    title: "How to Know When It Is Time for Couples Counselling",
    description:
      "Wondering whether couples counselling could help? Here are the gentle signs it might be time to reach out — for any relationship, at any stage. Wakefield & Online.",
    excerpt:
      "Many couples wait years before reaching out. Here are some gentle signs that talking to someone together might help — and what to expect when you do.",
    keywords: [
      "couples counselling",
      "when to seek couples therapy",
      "signs you need couples counselling",
      "relationship counselling Wakefield",
      "couples therapy Wakefield",
    ],
    category: "Relationships",
    published: "2026-06-19",
    readingMinutes: 6,
    intro: [
      "There is rarely a single moment that tells you it is time for couples counselling. More often it is a quiet accumulation: the same argument returning in different clothes, a distance that has grown so slowly you barely noticed it, or a sense that you are living alongside one another rather than truly together.",
      "You do not need to be in crisis to seek support. Couples counselling is not only for relationships on the brink — it is for any two people who want to understand each other more fully and find a kinder way forward. Below are some of the signs that suggest it might help, whatever the shape of your relationship.",
    ],
    sections: [
      {
        heading: "You keep having the same argument",
        body: [
          "When a disagreement keeps returning, it is usually not really about the washing up, the money, or the plans for the weekend. Those are the surface. Underneath sits something that has not yet been heard — a need for reassurance, for respect, for a little more space or a little more closeness.",
          "Couples counselling gives you both a place to slow the argument down and look at what it is really about. Once the pattern beneath the conflict becomes visible, it often loses some of its grip.",
        ],
      },
      {
        heading: "It has become hard to talk — or to listen",
        body: [
          "Many couples reach a point where conversations either escalate quickly or stop happening altogether. You may find yourself rehearsing what to say, avoiding certain subjects, or feeling that you are never quite understood.",
          "A counsellor does not take sides. We help each of you say what matters in a way the other can hear, and we help you listen without immediately defending or fixing. For many couples, simply being heard by their partner again is where the change begins.",
        ],
      },
      {
        heading: "You feel more like housemates than partners",
        body: [
          "Closeness can fade without anyone meaning for it to. Busy lives, work, caring responsibilities and the ordinary weight of years can leave a couple feeling efficient but disconnected.",
          "Intimacy takes many forms — emotional, physical, intellectual, the quiet companionship of everyday life. If one or more of these has gone quiet, counselling can help you understand why and find your way back towards each other at a pace that feels right for you both.",
        ],
      },
      {
        heading: "Trust has been shaken",
        body: [
          "When trust has been broken — through an affair, a betrayal, or a series of smaller hurts — it can feel impossible to know whether the relationship can recover. It often can, but it takes time, honesty and a safe space in which to be honest.",
          "We work gently and without judgement here. There is no pressure to make any decision before you are ready; the work is about understanding what happened and what each of you needs in order to move forward.",
        ],
      },
      {
        heading: "A life change has knocked you off balance",
        body: [
          "Relationships are tested by change. Becoming parents or deciding not to, a new job or the loss of one, caring for an ageing relative, children leaving home, retirement, a change in health — any of these can shift the ground beneath a partnership.",
          "Couples counselling can help you face a transition as a team rather than letting it quietly pull you apart, whether you are in your twenties or well into later life.",
        ],
      },
      {
        heading: "You simply want to grow together",
        body: [
          "You do not need a problem to justify counselling. Some couples come because things are good and they want to keep them that way — to communicate more openly, understand each other more deeply, and build something that lasts.",
          "Growth begins with understanding, and there is real strength in choosing to invest in your relationship before anything feels wrong.",
        ],
      },
      {
        heading: "What couples counselling with us looks like",
        body: [
          "We offer a free 15-minute initial consultation so you can find out how we work and whether we might be a good fit, with no pressure and no commitment. Sessions are available face to face in Wakefield or online wherever you are.",
          "We welcome all couples and all relationship structures — monogamous, non-monogamous and polyamorous relationships are held with equal care, and our practice is actively LGBTQIA+ affirming. Whoever you are and however you love, you will find a space here that affirms you.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do both partners need to attend?",
        answer:
          "Couples counselling works best when both partners take part, but it is completely fine to begin the conversation on your own if your partner is unsure. We can talk through what would help in your particular situation.",
      },
      {
        question: "What if only one of us wants to come?",
        answer:
          "That is more common than you might think, and it is a valid place to start. Individual therapy can help you understand the relationship and what you need from it, and partners often join later once they see it is a safe and non-judgemental space.",
      },
      {
        question: "Do you work with non-monogamous and LGBTQIA+ relationships?",
        answer:
          "Yes, and we do so as active affirmation rather than tolerance. All relationship structures and all identities are welcomed and held with equal care.",
      },
      {
        question: "How long does couples counselling take?",
        answer:
          "There is no fixed answer — it depends on what you are working towards. Some couples come for a handful of sessions, others for longer. We will keep checking in with you about what is helping and what you need.",
      },
    ],
    related: [
      { href: "/how-we-can-help/relationships", label: "Relationships, Couples, Sexuality & Identity" },
      { href: "/counselling-wakefield", label: "Counselling in Wakefield & Online" },
      { href: "/articles/what-to-expect-first-therapy-session", label: "What to Expect From Your First Therapy Session" },
    ],
  },
  {
    slug: "what-to-expect-first-therapy-session",
    title: "What to Expect From Your First Therapy Session",
    description:
      "Nervous about starting therapy? Here is what actually happens in a first counselling session, so you can arrive knowing what to expect. Wakefield & Online, BACP-registered.",
    excerpt:
      "Feeling nervous before a first session is completely normal. Here is what actually happens, so you can arrive knowing what to expect.",
    keywords: [
      "first therapy session",
      "what to expect counselling",
      "starting therapy",
      "first counselling session nerves",
      "counselling Wakefield",
    ],
    category: "Getting Started",
    published: "2026-06-19",
    readingMinutes: 5,
    intro: [
      "Starting therapy can feel like a big step, and it is completely normal to feel nervous beforehand. Many people tell us they almost did not come, or that they sat in the car for a few minutes first. Wherever you are on that spectrum, you are welcome here.",
      "You do not need to prepare anything, rehearse what to say, or have the right words ready. Knowing roughly what will happen can take some of the uncertainty away, so here is what a first session with us actually looks like.",
    ],
    sections: [
      {
        heading: "Before we begin: the free consultation",
        body: [
          "Before booking a full session, we offer a free 15-minute initial consultation. It is a relaxed conversation, not an assessment. You can ask questions, get a feel for how we work, and decide whether it feels right — with no pressure and no commitment.",
          "Finding a therapist you feel comfortable with matters more than almost anything else, so we see this first step as genuinely important rather than a formality.",
        ],
      },
      {
        heading: "The first session is mostly about getting to know you",
        body: [
          "A first session is gentle. We will usually ask a little about what has brought you to therapy and what you are hoping for, but there is no script you have to follow and nothing you have to disclose before you are ready.",
          "You do not need a diagnosis, and you do not need to have it all worked out. Sometimes simply recognising that something does not feel quite right is enough to begin.",
        ],
      },
      {
        heading: "You set the pace",
        body: [
          "This is your space. You are always in control of what you share and when. If a subject feels too tender, we will not push — we will work at a pace that feels safe for you.",
          "Some people arrive with a great deal they want to say; others find words slowly. Both are completely fine.",
        ],
      },
      {
        heading: "Confidentiality and how we work",
        body: [
          "What you bring to therapy is confidential. We are registered with the British Association for Counselling and Psychotherapy (BACP) and work within its ethical framework, and we will explain the few, rare limits to confidentiality clearly at the start so you know exactly where you stand.",
          "Our approach is grounded in compassion, curiosity and connection. We will not judge you, and there is no such thing as a problem too small to bring.",
        ],
      },
      {
        heading: "In person in Wakefield, or online",
        body: [
          "You can choose to meet face to face in Wakefield or to have your sessions online from wherever you are. Online therapy is just as effective for most people and can make support far easier to fit around work, travel and caring responsibilities.",
          "If you are not sure which would suit you, we can talk it through together.",
        ],
      },
      {
        heading: "It is okay to feel unsure afterwards",
        body: [
          "Therapy can stir things up, and it is normal to leave a first session feeling a mix of relief, tiredness or uncertainty. That does not mean it is not working — it often means something has begun to move.",
          "If you decide we are not the right fit, that is genuinely okay. The most important thing is that you find the support that is right for you.",
        ],
      },
    ],
    faqs: [
      {
        question: "How long is a session?",
        answer:
          "A standard therapy session lasts around 50 minutes. The free initial consultation is shorter, at around 15 minutes.",
      },
      {
        question: "Do I need a referral from my GP?",
        answer:
          "No. You can contact us directly — there is no need for a GP referral or a diagnosis to begin therapy with us.",
      },
      {
        question: "Will I have to talk about my childhood straight away?",
        answer:
          "Not at all. You share what you want, when you want. We follow your lead and never pressure you to go anywhere you are not ready to go.",
      },
      {
        question: "What if I do not think it is the right fit?",
        answer:
          "That is completely understandable and we will not take it personally. Finding the right therapist matters, and we are happy to help you think about what might suit you better.",
      },
    ],
    related: [
      { href: "/our-approach", label: "Our Approach" },
      { href: "/how-we-can-help", label: "How We Can Help" },
      { href: "/articles/when-to-consider-couples-counselling", label: "How to Know When It Is Time for Couples Counselling" },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

/** Newest first, for listing pages. */
export function sortedArticles(): Article[] {
  return [...articles].sort((a, b) => b.published.localeCompare(a.published));
}
