import type { LessonBlock } from "@/lib/content/courses";

/* Plain-English form descriptions for every kind of lesson section, so the
   editor can show labelled boxes instead of JSON. Each field names the key
   it edits; lists and groups nest further fields. Hidden ids (exerciseId,
   question ids, option values) are never shown: existing ones are kept as
   they are, because members' saved answers depend on them, and new items
   get a fresh one when they are added. */

type Obj = Record<string, unknown>;

type BaseField =
  | { type: "text"; key: string; label: string; hint?: string; required?: boolean; placeholder?: string }
  | { type: "area"; key: string; label: string; hint?: string; required?: boolean; rows?: number; placeholder?: string }
  | { type: "select"; key: string; label: string; hint?: string; options: { value: string; label: string }[]; numeric?: boolean }
  | {
      /** A select whose choices come from elsewhere in the same section. */
      type: "dynamicSelect";
      key: string;
      label: string;
      hint?: string;
      choices: (root: Obj) => { value: string; label: string }[];
    }
  | { type: "icon"; key: string; label: string; required?: boolean }
  | { type: "photo"; key: string; label: string }
  | {
      /** A list of short pieces of text. */
      type: "lines";
      key: string;
      label: string;
      itemLabel: string;
      hint?: string;
      required?: boolean;
    }
  | {
      /** A list of things, each with its own boxes. */
      type: "list";
      key: string;
      label: string;
      itemLabel: string;
      hint?: string;
      fields: FieldSpec[];
      newItem: () => Obj;
      /** A fixed number of items (e.g. the two columns of a comparison). */
      fixed?: boolean;
    }
  | {
      /** A nested set of boxes. Optional groups can be switched on and off. */
      type: "group";
      key: string;
      label: string;
      hint?: string;
      fields: FieldSpec[];
      optional?: { addLabel: string; newValue: () => Obj };
    };

export type FieldSpec = BaseField & {
  /** Only shown when this returns true for the item the field belongs to. */
  showIf?: (item: Obj) => boolean;
};

export interface Photo {
  src: string;
  label: string;
}

/** The photos in public/photos that a Photo section can use. */
export const PRACTICE_PHOTOS: Photo[] = [
  { src: "/photos/twins-laptop.jpg", label: "Both of us at a laptop" },
  { src: "/photos/therapist-green-portrait.jpg", label: "Green blouse, portrait" },
  { src: "/photos/therapist-green-session.jpg", label: "Green blouse, in session" },
  { src: "/photos/therapist-white-armchair.jpg", label: "White top, in the armchair" },
  { src: "/photos/therapist-white-armchair-wide.jpg", label: "White top, in the armchair (wide)" },
  { src: "/photos/therapist-white-profile.jpg", label: "White top, side profile" },
];

export function newId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

const LINE_HINT =
  "Press Enter to start a new line, and it will show as a new line on the site.";
const PARA_HINT =
  "Press Enter for a new line. Leave an empty line between paragraphs. Start a line with a dash and a space (- ) to make a bullet point.";

const heading = (label = "Heading"): FieldSpec => ({ type: "text", key: "heading", label, hint: "Optional." });
const intro = (): FieldSpec => ({ type: "area", key: "intro", label: "Introduction", hint: `Optional. ${LINE_HINT}`, rows: 3 });
const title = (label = "Title"): FieldSpec => ({ type: "text", key: "title", label, required: true });

const fieldTypeOptions = (withChoices = true) => [
  { value: "text", label: "Written answer" },
  { value: "scale", label: "Scale (pick one point on a line)" },
  ...(withChoices ? [{ value: "choices", label: "Tick boxes (pick any)" }] : []),
];

export interface SectionSpec {
  label: string;
  /** One line shown in the "Add a Section" menu. */
  description: string;
  fields: FieldSpec[];
  /** A new, empty section of this kind. Omitted kinds cannot be added here. */
  template?: () => Obj;
}

export const SECTION_SPECS: Record<string, SectionSpec> = {
  video: {
    label: "Video",
    description: "A video, uploaded from your computer.",
    fields: [{ type: "text", key: "title", label: "Title", hint: "Optional. Shown above the video." }],
    template: () => ({ kind: "video", title: "", playbackId: "", durationSeconds: 0 }),
  },
  audio: {
    label: "Audio",
    description: "An audio-only practice.",
    fields: [title()],
    template: () => ({ kind: "audio", title: "", playbackId: "", durationSeconds: 0 }),
  },
  prose: {
    label: "Text",
    description: "A few paragraphs of reading.",
    fields: [heading(), { type: "area", key: "body", label: "Text", hint: PARA_HINT, required: true, rows: 8 }],
    template: () => ({ kind: "prose", heading: "", body: "" }),
  },
  quote: {
    label: "Quote",
    description: "A pull quote in large italic type.",
    fields: [
      { type: "area", key: "text", label: "Quote", required: true, rows: 3 },
      { type: "text", key: "attribution", label: "Who said it", hint: "Optional." },
    ],
    template: () => ({ kind: "quote", text: "" }),
  },
  callout: {
    label: "Callout",
    description: "A short highlighted band.",
    fields: [
      title(),
      { type: "area", key: "body", label: "Text", required: true, hint: PARA_HINT },
      { type: "icon", key: "icon", label: "Icon" },
      {
        type: "select",
        key: "tone",
        label: "Colour",
        options: [
          { value: "", label: "Soft green (most callouts)" },
          { value: "dark", label: "Dark green (safety notes only)" },
        ],
      },
    ],
    template: () => ({ kind: "callout", title: "", body: "" }),
  },
  photo: {
    label: "Photo",
    description: "One of the practice photos.",
    fields: [
      { type: "photo", key: "src", label: "Photo" },
      { type: "text", key: "alt", label: "Describe the photo", hint: "Read aloud to people using screen readers, e.g. “Laura and Esther at a laptop, smiling”.", required: true },
      { type: "text", key: "caption", label: "Caption", hint: "Optional. Shown beneath the photo." },
    ],
    template: () => ({ kind: "photo", src: "/photos/twins-laptop.jpg", alt: "" }),
  },
  iconCards: {
    label: "Icon cards",
    description: "A grid of small cards, each with an icon.",
    fields: [
      heading(),
      intro(),
      {
        type: "select",
        key: "columns",
        label: "Cards per row (on a computer)",
        numeric: true,
        options: [
          { value: "2", label: "2" },
          { value: "3", label: "3" },
          { value: "4", label: "4" },
        ],
      },
      {
        type: "list",
        key: "items",
        label: "Cards",
        itemLabel: "Card",
        fields: [
          { type: "icon", key: "icon", label: "Icon", required: true },
          { type: "text", key: "title", label: "Card title", required: true },
          { type: "area", key: "body", label: "Card text", hint: "Optional.", rows: 2 },
        ],
        newItem: () => ({ icon: "leaf", title: "", body: "" }),
      },
    ],
    template: () => ({ kind: "iconCards", heading: "", items: [{ icon: "leaf", title: "", body: "" }] }),
  },
  flow: {
    label: "Journey (steps)",
    description: "Numbered steps, one after another.",
    fields: [
      heading(),
      intro(),
      {
        type: "list",
        key: "steps",
        label: "Steps",
        itemLabel: "Step",
        fields: [
          { type: "icon", key: "icon", label: "Icon", required: true },
          { type: "text", key: "title", label: "Step title", required: true },
          { type: "area", key: "body", label: "Step text", hint: "Optional.", rows: 2 },
        ],
        newItem: () => ({ icon: "leaf", title: "", body: "" }),
      },
    ],
    template: () => ({ kind: "flow", heading: "", steps: [{ icon: "leaf", title: "" }] }),
  },
  accordion: {
    label: "Click-to-open sections",
    description: "Titles that open to reveal more text.",
    fields: [
      heading(),
      intro(),
      {
        type: "list",
        key: "items",
        label: "Sections",
        itemLabel: "Section",
        fields: [
          { type: "text", key: "title", label: "Title", required: true },
          { type: "area", key: "body", label: "Text shown when opened", required: true, hint: PARA_HINT, rows: 4 },
          { type: "icon", key: "icon", label: "Icon" },
        ],
        newItem: () => ({ title: "", body: "" }),
      },
    ],
    template: () => ({ kind: "accordion", heading: "", items: [{ title: "", body: "" }] }),
  },
  contrast: {
    label: "Two columns",
    description: "Two lists side by side, e.g. “Instead of saying” and “Try”.",
    fields: [
      heading(),
      intro(),
      {
        type: "list",
        key: "columns",
        label: "Columns",
        itemLabel: "Column",
        fixed: true,
        fields: [
          { type: "text", key: "label", label: "Column title", required: true },
          { type: "lines", key: "items", label: "Points", itemLabel: "Point", required: true },
          {
            type: "select",
            key: "tone",
            label: "Style",
            options: [
              { value: "", label: "Plain (the “instead of” side)" },
              { value: "sage", label: "Green (the encouraged side)" },
            ],
          },
          { type: "icon", key: "icon", label: "Icon" },
        ],
        newItem: () => ({ label: "", items: [] }),
      },
      { type: "area", key: "note", label: "Note underneath", hint: "Optional.", rows: 2 },
    ],
    template: () => ({
      kind: "contrast",
      heading: "",
      columns: [
        { label: "", items: [""] },
        { label: "", items: [""], tone: "sage" },
      ],
    }),
  },
  flipCards: {
    label: "Flip cards",
    description: "Cards that turn over on tap to show the other side.",
    fields: [
      heading(),
      intro(),
      {
        type: "list",
        key: "items",
        label: "Cards",
        itemLabel: "Card",
        fields: [
          { type: "text", key: "frontLabel", label: "Front label", placeholder: "You", hint: "Optional. Shown small above the front text. Leave empty for “You”." },
          { type: "area", key: "front", label: "Front text", required: true, rows: 2 },
          { type: "text", key: "backLabel", label: "Back label", placeholder: "Your partner", hint: "Optional. Leave empty for “Your partner”." },
          { type: "area", key: "back", label: "Back text", required: true, rows: 2 },
        ],
        newItem: () => ({ front: "", back: "" }),
      },
    ],
    template: () => ({ kind: "flipCards", heading: "", items: [{ front: "", back: "" }] }),
  },
  tapChoice: {
    label: "Tap-to-answer",
    description: "A gentle question with answers to tap. Never scored.",
    fields: [
      title(),
      intro(),
      {
        type: "list",
        key: "questions",
        label: "Questions",
        itemLabel: "Question",
        hint: "Usually just one question.",
        fields: [
          { type: "area", key: "text", label: "Question", required: true, rows: 2 },
          {
            type: "list",
            key: "options",
            label: "Answers to tap",
            itemLabel: "Answer",
            fields: [
              { type: "text", key: "label", label: "Answer (what they tap)", required: true },
              { type: "area", key: "response", label: "What we say back when they tap it", rows: 3 },
            ],
            newItem: () => ({ value: newId("answer"), label: "", response: "" }),
          },
        ],
        newItem: () => ({
          id: newId("question"),
          text: "",
          options: [{ value: newId("answer"), label: "", response: "" }],
        }),
      },
    ],
    template: () => ({
      kind: "tapChoice",
      exerciseId: newId("tap"),
      title: "",
      questions: [{ id: newId("question"), text: "", options: [{ value: newId("answer"), label: "", response: "" }] }],
    }),
  },
  pairedReflection: {
    label: "Paired reflection",
    description: "Questions each partner answers alone, then questions to talk through together.",
    fields: [
      { type: "text", key: "eyebrow", label: "Small label above the title", hint: "Optional, e.g. “Part 1”." },
      title(),
      intro(),
      {
        type: "select",
        key: "order",
        label: "Which half comes first",
        options: [
          { value: "", label: "On your own first, then together" },
          { value: "togetherFirst", label: "Together first, then on your own" },
        ],
      },
      {
        type: "group",
        key: "individual",
        label: "On Your Own",
        fields: [
          { type: "text", key: "title", label: "Title", required: true, placeholder: "Individual Reflection" },
          { type: "area", key: "intro", label: "Introduction", hint: "Optional.", rows: 2 },
          {
            type: "list",
            key: "questions",
            label: "Questions",
            itemLabel: "Question",
            fields: [
              { type: "area", key: "label", label: "Question", required: true, rows: 2 },
              { type: "area", key: "hint", label: "Follow-on prompts", hint: "Optional. Shown smaller beneath the question.", rows: 2 },
              {
                type: "group",
                key: "scale",
                label: "1 to 10 slider",
                hint: "Adds a slider above the written answer.",
                fields: [
                  { type: "text", key: "low", label: "Words at the low end", required: true },
                  { type: "text", key: "high", label: "Words at the high end", required: true },
                ],
                optional: { addLabel: "Add a 1 to 10 Slider", newValue: () => ({ low: "", high: "" }) },
              },
            ],
            newItem: () => ({ id: newId("q"), label: "", hint: "" }),
          },
        ],
      },
      {
        type: "group",
        key: "together",
        label: "Coming Back Together",
        fields: [
          { type: "text", key: "title", label: "Title", required: true, placeholder: "Coming Back Together" },
          { type: "area", key: "intro", label: "Introduction", hint: "Optional.", rows: 2 },
          { type: "lines", key: "steps", label: "How to come back together", itemLabel: "Step", hint: "Optional." },
          {
            type: "list",
            key: "questions",
            label: "Questions to talk through",
            itemLabel: "Question",
            fields: [
              { type: "area", key: "label", label: "Question", required: true, rows: 2 },
              { type: "area", key: "hint", label: "Follow-on prompts", hint: "Optional.", rows: 2 },
            ],
            newItem: () => ({ id: newId("together"), label: "", hint: "" }),
          },
        ],
      },
      { type: "area", key: "revealNote", label: "Note under the side-by-side answers", hint: "Optional.", rows: 2 },
      {
        type: "group",
        key: "closing",
        label: "Closing line",
        fields: [{ type: "area", key: "text", label: "Closing line", required: true, rows: 2 }],
        optional: { addLabel: "Add a Closing Line", newValue: () => ({ text: "" }) },
      },
    ],
    template: () => ({
      kind: "pairedReflection",
      exerciseId: newId("reflection"),
      title: "",
      individual: { title: "Individual Reflection", questions: [{ id: newId("q"), label: "" }] },
      together: { title: "Coming Back Together", questions: [] },
    }),
  },
  journal: {
    label: "Private journal",
    description: "Free writing that only the member can see.",
    fields: [
      title(),
      intro(),
      { type: "lines", key: "prompts", label: "Writing prompts", itemLabel: "Prompt", required: true },
    ],
    template: () => ({ kind: "journal", exerciseId: newId("journal"), title: "", prompts: [""] }),
  },
  sharedJournal: {
    label: "Shareable journal",
    description: "Free writing the member may choose to share with their partner.",
    fields: [
      title(),
      intro(),
      { type: "lines", key: "prompts", label: "Writing prompts", itemLabel: "Prompt", required: true },
      { type: "text", key: "partnerNote", label: "Note shown to the partner", placeholder: "Shared with you, in their own words." },
    ],
    template: () => ({
      kind: "sharedJournal",
      exerciseId: newId("journal"),
      title: "",
      prompts: [""],
      partnerNote: "Shared with you, in their own words.",
    }),
  },
  checkin: {
    label: "Check-in",
    description: "Sliders and short answers, just for the member.",
    fields: [
      title(),
      intro(),
      {
        type: "select",
        key: "cadence",
        label: "How often",
        options: [
          { value: "", label: "No reminder" },
          { value: "once", label: "Once" },
          { value: "weekly", label: "Weekly" },
          { value: "monthly", label: "Monthly" },
        ],
      },
      {
        type: "list",
        key: "fields",
        label: "Questions",
        itemLabel: "Question",
        fields: [
          { type: "area", key: "label", label: "Question", required: true, rows: 2 },
          { type: "select", key: "type", label: "How they answer", options: fieldTypeOptions() },
          {
            type: "lines",
            key: "options",
            label: "Choices",
            itemLabel: "Choice",
            showIf: (f) => f.type === "choices" || f.type === "scale",
          },
        ],
        newItem: () => ({ id: newId("field"), label: "", type: "text" }),
      },
    ],
    template: () => ({
      kind: "checkin",
      exerciseId: newId("checkin"),
      title: "",
      fields: [{ id: newId("field"), label: "", type: "text" }],
    }),
  },
  worksheet: {
    label: "Worksheet",
    description: "A mix of written answers, scales and tick boxes.",
    fields: [
      title(),
      intro(),
      {
        type: "list",
        key: "fields",
        label: "Questions",
        itemLabel: "Question",
        fields: [
          { type: "text", key: "section", label: "Section heading above this question", hint: "Optional." },
          { type: "area", key: "label", label: "Question", required: true, rows: 2 },
          { type: "area", key: "hint", label: "Hint", hint: "Optional. Shown smaller beneath the question.", rows: 2 },
          { type: "select", key: "type", label: "How they answer", options: fieldTypeOptions() },
          {
            type: "lines",
            key: "options",
            label: "Choices",
            itemLabel: "Choice",
            showIf: (f) => f.type === "choices" || f.type === "scale",
          },
        ],
        newItem: () => ({ id: newId("field"), label: "", type: "text" }),
      },
      {
        type: "group",
        key: "coupleSection",
        label: "Together section",
        fields: [
          { type: "text", key: "title", label: "Title", required: true },
          { type: "area", key: "intro", label: "Introduction", rows: 2 },
          { type: "lines", key: "groundRules", label: "Ground rules", itemLabel: "Rule" },
          {
            type: "list",
            key: "fields",
            label: "Questions to answer together",
            itemLabel: "Question",
            fields: [{ type: "area", key: "label", label: "Question", required: true, rows: 2 }],
            newItem: () => ({ id: newId("together"), label: "" }),
          },
        ],
        optional: {
          addLabel: "Add a Together Section",
          newValue: () => ({ title: "Together", intro: "", groundRules: [], fields: [] }),
        },
      },
      { type: "text", key: "partnerNote", label: "Note shown to the partner", placeholder: "Shared with you, in their own words." },
      {
        type: "group",
        key: "closing",
        label: "Closing",
        fields: [
          { type: "text", key: "heading", label: "Heading" },
          { type: "area", key: "body", label: "Text", rows: 3 },
          { type: "area", key: "question", label: "Question to take away", rows: 2 },
          { type: "area", key: "pull", label: "Final line", rows: 2 },
        ],
        optional: {
          addLabel: "Add a Closing",
          newValue: () => ({ heading: "", body: "", question: "", pull: "" }),
        },
      },
    ],
    template: () => ({
      kind: "worksheet",
      exerciseId: newId("worksheet"),
      title: "",
      fields: [{ id: newId("field"), label: "", type: "text" }],
      partnerNote: "Shared with you, in their own words.",
    }),
  },
  quiz: {
    label: "Self-assessment",
    description: "Questions whose answers lean towards a gentle profile, never a score.",
    fields: [
      title(),
      { type: "area", key: "intro", label: "Introduction", rows: 3 },
      {
        type: "list",
        key: "profiles",
        label: "Profiles (what the answers can lean towards)",
        itemLabel: "Profile",
        fields: [
          { type: "text", key: "title", label: "Profile name", required: true },
          { type: "area", key: "description", label: "Description", rows: 3 },
        ],
        newItem: () => ({ id: newId("profile"), title: "", description: "" }),
      },
      {
        type: "list",
        key: "questions",
        label: "Questions",
        itemLabel: "Question",
        fields: [
          { type: "area", key: "text", label: "Question", required: true, rows: 2 },
          {
            type: "list",
            key: "options",
            label: "Answers",
            itemLabel: "Answer",
            fields: [
              { type: "text", key: "label", label: "Answer", required: true },
              {
                type: "dynamicSelect",
                key: "value",
                label: "Leans towards",
                choices: (root) =>
                  (Array.isArray(root.profiles) ? (root.profiles as Obj[]) : []).map((p, i) => ({
                    value: String(p.id ?? ""),
                    label: String(p.title || `Profile ${i + 1}`),
                  })),
              },
            ],
            newItem: () => ({ value: "", label: "" }),
          },
        ],
        newItem: () => ({ id: newId("q"), text: "", options: [] }),
      },
    ],
  },
  download: {
    label: "Download",
    description: "A PDF worksheet to download.",
    fields: [
      title(),
      { type: "area", key: "description", label: "Description", rows: 2 },
      { type: "text", key: "fileLabel", label: "Button text", placeholder: "Download (PDF)" },
    ],
  },
};

export function sectionLabel(kind: string): string {
  return SECTION_SPECS[kind]?.label ?? kind;
}

/** A new section of the given kind, ready to fill in. */
export function newSection(kind: string): LessonBlock | null {
  const make = SECTION_SPECS[kind]?.template;
  return make ? (make() as unknown as LessonBlock) : null;
}
