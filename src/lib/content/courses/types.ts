/* Course content model. Content lives in code (like helpAreas.ts); all
   member data — progress, responses, reactions — lives in Supabase. */

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
      /** Paragraphs separated by blank lines. */
      kind: "prose";
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
