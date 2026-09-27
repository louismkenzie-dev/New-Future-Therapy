/* Course content model. Content lives in code (like helpAreas.ts); all
   member data — progress, responses, reactions — lives in Supabase. */

export interface PairedQuestion {
  id: string;
  label: string;
  /** The therapists' follow-on prompts, shown beneath the question. */
  hint?: string;
  /** Adds a 1–10 slider above the written answer. */
  scale?: { low: string; high: string };
}

export type LessonBlock =
  | {
      kind: "video";
      title?: string;
      /** Mux playback id (signed policy). Empty string = placeholder until recorded. */
      playbackId: string;
      durationSeconds: number;
    }
  | {
      kind: "audio";
      title: string;
      /** Mux playback id for an audio-only practice. */
      playbackId: string;
      durationSeconds: number;
    }
  | {
      /** Paragraphs separated by blank lines; a paragraph whose lines all
         begin "- " renders as a list. */
      kind: "prose";
      heading?: string;
      body: string;
    }
  | { kind: "quote"; text: string; attribution?: string }
  | {
      /** Private reflective journaling — never visible to anyone else. */
      kind: "journal";
      exerciseId: string;
      title: string;
      intro?: string;
      prompts: string[];
    }
  | {
      /** Journaling a member may choose to share with their linked partner. */
      kind: "sharedJournal";
      exerciseId: string;
      title: string;
      intro?: string;
      prompts: string[];
      /** Shown to the partner alongside the shared response. */
      partnerNote: string;
    }
  | {
      /** Gentle self-assessment: options map to reflection profiles, never scores. */
      kind: "quiz";
      exerciseId: string;
      title: string;
      intro: string;
      questions: {
        id: string;
        text: string;
        /** option.value is the id of the profile it leans towards */
        options: { value: string; label: string }[];
      }[];
      profiles: { id: string; title: string; description: string }[];
    }
  | {
      kind: "checkin";
      exerciseId: string;
      title: string;
      intro?: string;
      fields: {
        id: string;
        label: string;
        type: "scale" | "text" | "choices";
        options?: string[];
      }[];
      cadence?: "once" | "weekly" | "monthly";
    }
  | {
      /** Mixed-field reflection worksheet a member may share with their
         linked partner as one deliberate act. Individual fields are private
         by default; the couple section is designed to be completed together. */
      kind: "worksheet";
      exerciseId: string;
      title: string;
      intro?: string;
      fields: {
        id: string;
        label: string;
        type: "text" | "scale" | "choices";
        /** scale: ordered single-choice labels; choices: multi-select. */
        options?: string[];
        hint?: string;
        /** Optional section heading rendered above this field. */
        section?: string;
      }[];
      coupleSection?: {
        title: string;
        intro: string;
        groundRules: string[];
        fields: { id: string; label: string }[];
      };
      /** Shown beside the share toggle when a partner is linked. */
      partnerNote: string;
      closing?: {
        heading: string;
        body: string;
        question: string;
        pull: string;
      };
    }
  | {
      /** The programme's signature activity: each partner answers the
         individual questions privately in their own login, chooses whether
         to share, and — once both have shared — sees the answers side by
         side before completing the "Coming Back Together" questions as one
         joint record owned by the couple. Members without a linked partner
         complete both halves privately. */
      kind: "pairedReflection";
      exerciseId: string;
      /** e.g. "Part 1" — rendered as a tracked eyebrow above the title. */
      eyebrow?: string;
      title: string;
      intro?: string;
      /** Ground Rules is mostly written together, so it leads with that half. */
      order?: "individualFirst" | "togetherFirst";
      individual: {
        title: string;
        intro?: string;
        questions: PairedQuestion[];
      };
      together: {
        title: string;
        intro?: string;
        /** How to come back together, as the therapists describe it. */
        steps?: string[];
        questions: { id: string; label: string; hint?: string }[];
      };
      /** Check-in style comparisons: my question id -> the partner question
         it should sit beside (e.g. "How do I think you are?" beside their
         "How am I?"). Defaults to same-id pairing. */
      compare?: Record<string, string>;
      /** Shown beneath the side-by-side reveal. */
      revealNote?: string;
      closing?: { text: string };
    }
  | {
      /** Branded PDF worksheet, served via an entitlement-gated action. */
      kind: "download";
      title: string;
      description: string;
      blobPath: string;
      fileLabel: string;
    };

export interface Lesson {
  /** Globally unique across the course (used as the URL segment). */
  id: string;
  title: string;
  summary: string;
  estimatedMinutes: number;
  /** Free-preview lessons render for signed-out visitors too. */
  preview?: boolean;
  blocks: LessonBlock[];
}

export interface CourseModule {
  id: string;
  /** 0 is the Introduction that precedes Module One. */
  number: number;
  title: string;
  lede: string;
  /** One distilled line, mirroring helpAreas' essence. */
  essence: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  strapline: string;
  description: string;
  audience: string;
  /** Public-policy Mux playback id for the sales-page trailer. */
  trailerPlaybackId?: string;
  modules: CourseModule[];
  valueAdds: { icon: string; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
}
