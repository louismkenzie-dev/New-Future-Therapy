import type { CourseModule } from "../types";

export const module09: CourseModule = {
  id: "relationship-agreements",
  number: 9,
  title: "Your Relationship Agreements",
  lede: "The strongest relationships are designed, not defaulted into. This module replaces assumption with agreement — whatever shape your love takes.",
  essence: "Agreements, not assumptions.",
  lessons: [
    {
      id: "designing-your-relationship",
      title: "Designing Your Relationship",
      summary:
        "Every relationship runs on an agreement — the only question is whether you wrote it together or inherited it unread.",
      estimatedMinutes: 25,
      blocks: [
        {
          kind: "video",
          title: "The agreement you are already in",
          playbackId: "",
          durationSeconds: 540,
        },
        {
          kind: "prose",
          body: `Every relationship already has an operating agreement — about money, time, touch, family, exclusivity, holidays, housework, what counts as betrayal and what counts as care. Most of it was never discussed. It was assembled silently from upbringing, culture, past relationships and guesswork, and each person may be holding a different copy.

Designing your relationship means taking the implicit agreement out and reading it together. This is normal practice in non-monogamous and polyamorous relationships, where agreements must be explicit to work at all — and it is every bit as powerful in monogamous ones, where the inherited template is so standard it is rarely examined. What does commitment mean to us, specifically? What do we owe each other in time, honesty, support? What are we assuming the other has agreed to?

There is no correct set of answers. Two devoted people can build wildly different relationships — living together or apart, married or not, monogamous or not, children or not — and both can be thriving. What thriving relationships share is not a shape. It is that both people actually agreed to the shape they are in.`,
        },
        {
          kind: "journal",
          exerciseId: "implicit-agreement",
          title: "Reading the Unwritten Contract",
          prompts: [
            "What are three clauses in your relationship's unwritten agreement — things both of you act on but have never said aloud?",
            "Which clause did you inherit rather than choose? From where?",
            "Which clause would you most like to renegotiate — or simply confirm out loud?",
          ],
        },
      ],
    },
    {
      id: "agreements-not-assumptions",
      title: "Agreements, Not Assumptions",
      summary:
        "Turning the big unspoken areas — money, time, family, exclusivity, care — into conversations and explicit agreements.",
      estimatedMinutes: 25,
      blocks: [
        {
          kind: "video",
          title: "The conversations underneath the conflict",
          playbackId: "",
          durationSeconds: 510,
        },
        {
          kind: "prose",
          body: `Most recurring relationship conflict is an assumption wearing a costume. The argument about the in-laws is an unmade agreement about family boundaries. The tension about late nights at work is an unmade agreement about time. The silence about money is an unmade agreement, full stop — and money silence is one of the most expensive silences there is.

Making an agreement explicit does not mean making it rigid. Good agreements include how they change: we agree to this for now, and either of us can reopen it. That single meta-agreement — it is safe here to renegotiate — is worth more than any individual clause, because it means honesty never has to go underground.

The Agreements Canvas below walks you through the major territories: money, time, intimacy and exclusivity, family and friends, home, health, and how you will handle change itself. Work through it at your own pace — it is the spine of this module's shared exercise.`,
        },
        {
          kind: "download",
          title: "The Agreements Canvas",
          description:
            "A structured worksheet covering the major territories of a shared life — money, time, intimacy, family, home and change — with prompts to turn each assumption into an agreement.",
          blobPath: "courses/growing-together/agreements-canvas.pdf",
          fileLabel: "Agreements Canvas (PDF)",
        },
        {
          kind: "journal",
          exerciseId: "assumption-inventory",
          title: "The Assumption Inventory",
          prompts: [
            "In which territory — money, time, intimacy, family, home — do you and a partner most rely on assumption?",
            "What is one assumption you suspect you each hold a different copy of?",
            "What makes that conversation feel risky — and what is the risk of never having it?",
          ],
        },
      ],
    },
    {
      id: "rituals-of-connection",
      title: "Rituals of Connection",
      summary:
        "Connection that is left to chance gets crowded out. Rituals — small, regular, protected — are how busy lives stay close.",
      estimatedMinutes: 20,
      blocks: [
        {
          kind: "video",
          title: "Protected time, small and regular",
          playbackId: "",
          durationSeconds: 450,
        },
        {
          kind: "prose",
          body: `Left to chance, connection loses to logistics — not because love fades, but because love is patient and the dishwasher is not. The relationships that stay close in busy seasons are usually the ones that stopped leaving closeness to chance and gave it rituals instead.

A ritual of connection is small, regular and protected: the ten-minute check-in after work before anyone opens a laptop. The Sunday walk. Coffee in bed on Saturdays. The weekly question — "how are we doing?" — asked when nothing is wrong, so that asking it never becomes an alarm. The monthly evening that is in the calendar with the same authority as any meeting.

The weekly check-in below gives you a ready-made ritual to begin with. It takes fifteen minutes. Done weekly, it quietly catches most problems while they are still small — and it gives appreciation, which usually goes unsaid, a regular place to be said.`,
        },
        {
          kind: "checkin",
          exerciseId: "weekly-checkin",
          title: "The Weekly Check-In",
          intro:
            "Return to this each week — alone or together. Fifteen minutes, honestly answered, keeps small things small.",
          cadence: "weekly",
          fields: [
            {
              id: "connected",
              label: "How connected have we felt this week?",
              type: "scale",
            },
            {
              id: "appreciate",
              label: "One thing I appreciated about you (or about us) this week…",
              type: "text",
            },
            {
              id: "tend",
              label: "One small thing that needs tending before it grows…",
              type: "text",
            },
            {
              id: "ahead",
              label: "One thing I am looking forward to in the week ahead…",
              type: "text",
            },
          ],
        },
      ],
    },
    {
      id: "our-agreements",
      title: "Our Agreements",
      summary:
        "Bringing the module together — drafting the agreements you want to live by, and offering them for design together.",
      estimatedMinutes: 25,
      blocks: [
        {
          kind: "prose",
          body: `You have read the unwritten contract, inventoried the assumptions, and begun a ritual of connection. The final step is drafting: the agreements you actually want to live by, in your own words.

If you are linked with a partner, this shared exercise works best as a genuine exchange of drafts — each of you writes yours, you share, and the differences become the agenda for one of the most useful conversations a couple can have. The differences are not problems; they are precisely the places where assumption was doing the work agreement should be doing.`,
        },
        {
          kind: "sharedJournal",
          exerciseId: "our-agreements",
          title: "The Agreements I Want Us to Live By",
          intro:
            "Draft in plain sentences. \"We protect one evening a week.\" \"We tell each other about money worries early.\" Specific enough to actually live by.",
          prompts: [
            "Agreements I want us to make about our time…",
            "Agreements I want us to make about money…",
            "Agreements I want us to make about closeness, intimacy and what we are to each other…",
            "Agreements I want us to make about family, friends and the world around us…",
            "And the meta-agreement: when something here stops fitting, this is how I want us to reopen it…",
          ],
          partnerNote:
            "Your partner has drafted the agreements they hope to build with you. Where their draft differs from what you would write — that is not conflict, that is the conversation. Bring your own draft and design the final version together.",
        },
      ],
    },
  ],
};
