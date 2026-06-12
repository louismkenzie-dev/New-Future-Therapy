import type { Course } from "../types";
import { module01 } from "./module01";
import { module02 } from "./module02";
import { module03 } from "./module03";
import { module04 } from "./module04";
import { module05 } from "./module05";
import { module06 } from "./module06";
import { module07 } from "./module07";
import { module08 } from "./module08";
import { module09 } from "./module09";
import { module10 } from "./module10";

export const growingTogether: Course = {
  id: "growing-together",
  title: "Growing Together",
  strapline:
    "Growth begins with understanding — of yourself, of each other, and of the patterns that shape how you love.",
  description:
    "A ten-module course in building healthier, closer relationships — created by Esther and Laura, BACP-registered therapists. Video lessons, guided reflections, gentle self-assessments and printable practices, for individuals and for partners learning side by side. Whatever shape your relationship takes, and whatever season of life you are in, this course meets you there.",
  audience:
    "For adults of all ages, 18 to 70 and beyond — single, partnered, monogamous, non-monogamous or polyamorous, LGBTQIA+ and questioning. Take it on your own, or alongside a partner with linked accounts and optional sharing.",
  trailerPlaybackId: "",
  modules: [
    module01,
    module02,
    module03,
    module04,
    module05,
    module06,
    module07,
    module08,
    module09,
    module10,
  ],
  valueAdds: [
    {
      icon: "video",
      title: "Forty-Four Guided Lessons",
      description:
        "Ten modules of video lessons from Esther and Laura, paced for real life — watch in fifteen-minute sittings, pause whenever you need, return any time.",
    },
    {
      icon: "pen-line",
      title: "Private Reflective Journalling",
      description:
        "Guided prompts throughout, saved securely and encrypted to your account. Your words are private — always — unless you choose to share them.",
    },
    {
      icon: "users",
      title: "Learn Alongside a Partner",
      description:
        "The Joint Couples plan links two accounts. Each of you works privately, shares chosen reflections, responds gently, and builds a learning path together.",
    },
    {
      icon: "file-down",
      title: "Printable Worksheets and Practices",
      description:
        "Branded worksheets for every stage — a needs and values map, a repair ritual card, the Agreements Canvas — yours to download and keep.",
    },
    {
      icon: "headphones",
      title: "Guided Audio Practices",
      description:
        "Short audio practices for self-compassion and cooling down after conflict, recorded for the moments you need them most.",
    },
    {
      icon: "award",
      title: "Completion Certificate and Therapy Discount",
      description:
        "A certificate to mark the work you have done, plus a thank-you discount towards a first one-to-one session, alongside our free fifteen-minute initial consultation.",
    },
  ],
  faqs: [
    {
      question: "Do I need to be in a relationship to take this course?",
      answer:
        "Not at all. The course is written for individuals as much as for partners — understanding your own patterns is valuable whatever your situation. Every exercise has an on-your-own framing, and many members take the course single, between relationships, or to reflect on connection in their lives more broadly.",
    },
    {
      question: "How does the Joint Couples plan work?",
      answer:
        "One of you subscribes to the Couples plan and invites the other with a private link. You each get your own account, your own progress and your own private reflections. For certain exercises, either of you can choose to share what you wrote — your partner can then respond gently and save it to their own learning path. Sharing is always optional, per exercise, and you can change your mind at any time.",
    },
    {
      question: "Is this course suitable for my relationship?",
      answer:
        "We have written it to be. The course affirms people of all sexual orientations and gender identities, and treats monogamous, non-monogamous and polyamorous relationships equally throughout. It is written for adults of all ages, from early adulthood to later life. Wherever you are, the course meets your relationship on its own terms.",
    },
    {
      question: "Is this the same as therapy?",
      answer:
        "No — and we are careful about the difference. The course is a guided space for learning and reflection, built on the same foundations as our practice, but it is not a substitute for therapy. If something in your life needs more than a course can offer, we signpost clearly throughout, and one-to-one or couples therapy with us is always available, starting with a free fifteen-minute consultation.",
    },
    {
      question: "How long does the course take?",
      answer:
        "There are ten modules and forty-four lessons, most taking fifteen to twenty-five minutes. Some members move through in a couple of months; others take a season per module. There is no schedule and no pressure — your subscription gives you access to everything, and your progress is saved as you go.",
    },
    {
      question: "Who can see what I write?",
      answer:
        "You, and only you — unless you explicitly share a specific reflection with a linked partner. Your written reflections are encrypted, they are never visible to other members, and sharing is per-exercise, opt-in and reversible. If you unlink from a partner, anything you shared becomes private again immediately.",
    },
    {
      question: "Can I cancel my subscription?",
      answer:
        "Yes, at any time, in a couple of clicks from your account page. You will keep access until the end of the period you have paid for, and your reflections will be waiting for you if you ever return.",
    },
  ],
};
