"use client";

import { useId } from "react";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { COURSE_ICONS, courseIcon } from "@/components/course/blocks/courseIcons";
import { inputClass, labelClass } from "./formStyles";
import { SECTION_SPECS, type FieldSpec, type Photo } from "./sectionSchemas";

/* Renders a lesson section as plain labelled boxes, from the descriptions in
   sectionSchemas.ts. Every change produces a new copy of the section, with
   any keys the form does not show (ids, playback ids) carried across. */

type Obj = Record<string, unknown>;

const ICON_NAMES = Object.keys(COURSE_ICONS).sort();
const iconLabel = (name: string) => {
  const words = name.replace(/-/g, " ");
  return words.charAt(0).toUpperCase() + words.slice(1);
};

const smallButton =
  "w-10 h-10 inline-flex items-center justify-center rounded-full text-muted hover:text-sage-dark disabled:opacity-30 transition-colors duration-200";
const addButton =
  "inline-flex items-center gap-2 min-h-[44px] font-body text-sm text-sage-dark border border-dashed border-sage-light rounded-full px-5 py-2.5 hover:border-sage hover:bg-sage-pale/60 transition-colors duration-200";

export function SectionForm({
  value,
  onChange,
  photos,
}: {
  value: Obj;
  onChange: (next: Obj) => void;
  photos: Photo[];
}) {
  const spec = SECTION_SPECS[String(value.kind)];
  if (!spec) {
    return (
      <p className="font-body text-sm text-muted">
        This kind of section cannot be edited here yet. Ask for a change in plain English above instead.
      </p>
    );
  }
  return <Fields fields={spec.fields} value={value} onChange={onChange} root={value} photos={photos} />;
}

function Fields({
  fields,
  value,
  onChange,
  root,
  photos,
}: {
  fields: FieldSpec[];
  value: Obj;
  onChange: (next: Obj) => void;
  root: Obj;
  photos: Photo[];
}) {
  const set = (key: string, v: unknown) => {
    const next = { ...value };
    if (v === undefined) delete next[key];
    else next[key] = v;
    onChange(next);
  };
  return (
    <div className="space-y-5">
      {fields
        .filter((f) => !f.showIf || f.showIf(value))
        .map((f) => (
          <Field key={f.key} spec={f} value={value[f.key]} onChange={(v) => set(f.key, v)} root={root} photos={photos} />
        ))}
    </div>
  );
}

function Label({ htmlFor, text, required }: { htmlFor?: string; text: string; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className={labelClass}>
      {text}
      {required && <span className="text-sage-dark"> *</span>}
    </label>
  );
}

function Hint({ text }: { text?: string }) {
  return text ? <p className="font-body text-xs text-muted mt-1.5 leading-relaxed">{text}</p> : null;
}

/** A text box that grows as you type, so every line stays in view. */
function GrowingArea({
  id,
  value,
  onChange,
  rows = 3,
  placeholder,
}: {
  id?: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  /* Roughly how many lines the text fills at this width, plus one spare. */
  const lines = value.split("\n").reduce((n, line) => n + Math.max(1, Math.ceil(line.length / 70)), 0) + 1;
  return (
    <textarea
      id={id}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      rows={Math.min(30, Math.max(rows, lines))}
      className={`${inputClass} text-base leading-relaxed resize-y`}
    />
  );
}

function Field({
  spec,
  value,
  onChange,
  root,
  photos,
}: {
  spec: FieldSpec;
  value: unknown;
  onChange: (v: unknown) => void;
  root: Obj;
  photos: Photo[];
}) {
  const id = useId();
  /* An empty optional box is left out altogether, so the site falls back to
     its default rather than showing an empty line. */
  const text = (v: string) => onChange(v === "" && !("required" in spec && spec.required) ? undefined : v);

  switch (spec.type) {
    case "text":
      return (
        <div>
          <Label htmlFor={id} text={spec.label} required={spec.required} />
          <input
            id={id}
            value={typeof value === "string" ? value : ""}
            placeholder={spec.placeholder}
            onChange={(e) => text(e.target.value)}
            className={`${inputClass} text-base`}
          />
          <Hint text={spec.hint} />
        </div>
      );

    case "area":
      return (
        <div>
          <Label htmlFor={id} text={spec.label} required={spec.required} />
          <GrowingArea
            id={id}
            value={typeof value === "string" ? value : ""}
            onChange={text}
            rows={spec.rows}
            placeholder={spec.placeholder}
          />
          <Hint text={spec.hint} />
        </div>
      );

    case "select":
    case "dynamicSelect": {
      const options = spec.type === "select" ? spec.options : spec.choices(root);
      const current = value === undefined || value === null ? "" : String(value);
      const known = options.some((o) => o.value === current);
      return (
        <div>
          <Label htmlFor={id} text={spec.label} />
          <select
            id={id}
            value={current}
            onChange={(e) => {
              const v = e.target.value;
              if (v === "") onChange(spec.type === "dynamicSelect" ? "" : undefined);
              else onChange(spec.type === "select" && spec.numeric ? Number(v) : v);
            }}
            className={`${inputClass} text-base`}
          >
            {spec.type === "dynamicSelect" && <option value="">Choose…</option>}
            {!known && current !== "" && <option value={current}>{current}</option>}
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <Hint text={spec.hint} />
        </div>
      );
    }

    case "icon": {
      const current = typeof value === "string" ? value : "";
      const Icon = courseIcon(current || undefined);
      return (
        <div>
          <Label htmlFor={id} text={spec.label} required={spec.required} />
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-sage-pale text-sage-dark shrink-0" aria-hidden="true">
              {current || spec.required ? <Icon size={20} /> : null}
            </span>
            <select
              id={id}
              value={current}
              onChange={(e) => onChange(e.target.value || (spec.required ? "leaf" : undefined))}
              className={`${inputClass} text-base`}
            >
              {!spec.required && <option value="">No icon</option>}
              {ICON_NAMES.map((name) => (
                <option key={name} value={name}>
                  {iconLabel(name)}
                </option>
              ))}
            </select>
          </div>
        </div>
      );
    }

    case "photo": {
      const current = typeof value === "string" ? value : "";
      const choices = photos.some((p) => p.src === current) || !current ? photos : [{ src: current, label: current }, ...photos];
      return (
        <div>
          <Label htmlFor={id} text={spec.label} required />
          <div className="flex items-start gap-4">
            {current && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={current} alt="" className="w-24 h-24 object-cover rounded-xl border border-grey-light shrink-0" />
            )}
            <select id={id} value={current} onChange={(e) => onChange(e.target.value)} className={`${inputClass} text-base`}>
              {choices.map((p) => (
                <option key={p.src} value={p.src}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      );
    }

    case "lines": {
      const items = Array.isArray(value) ? value.map((v) => (typeof v === "string" ? v : "")) : [];
      const setItems = (next: string[]) => onChange(next);
      return (
        <fieldset>
          <legend className={labelClass}>
            {spec.label}
            {spec.required && <span className="text-sage-dark"> *</span>}
          </legend>
          <ol className="space-y-3">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="font-body text-sm text-muted w-6 pt-3 text-right shrink-0">{i + 1}.</span>
                <div className="flex-1 min-w-0">
                  <GrowingArea
                    value={item}
                    rows={1}
                    onChange={(v) => setItems(items.map((x, j) => (j === i ? v : x)))}
                  />
                </div>
                <MoveButtons
                  index={i}
                  count={items.length}
                  noun={spec.itemLabel.toLowerCase()}
                  onMove={(dir) => setItems(swap(items, i, dir))}
                  onRemove={() => setItems(items.filter((_, j) => j !== i))}
                />
              </li>
            ))}
          </ol>
          <button type="button" onClick={() => setItems([...items, ""])} className={`${addButton} mt-3`}>
            <Plus size={16} />
            {withArticle(spec.itemLabel)}
          </button>
          <Hint text={spec.hint} />
        </fieldset>
      );
    }

    case "list": {
      const items = Array.isArray(value) ? (value as unknown[]).map((v) => (v && typeof v === "object" ? (v as Obj) : {})) : [];
      const setItems = (next: Obj[]) => onChange(next);
      return (
        <fieldset>
          <legend className={labelClass}>{spec.label}</legend>
          <Hint text={spec.hint} />
          <ol className="space-y-4 mt-2">
            {items.map((item, i) => (
              <li key={i} className="rounded-xl border border-grey-light bg-cream/50 p-4 sm:p-5">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <p className="font-body text-sm font-medium text-charcoal">
                    {spec.itemLabel} {i + 1}
                  </p>
                  {!spec.fixed && (
                    <MoveButtons
                      index={i}
                      count={items.length}
                      noun={spec.itemLabel.toLowerCase()}
                      onMove={(dir) => setItems(swap(items, i, dir))}
                      onRemove={() => setItems(items.filter((_, j) => j !== i))}
                    />
                  )}
                </div>
                <Fields
                  fields={spec.fields}
                  value={item}
                  onChange={(next) => setItems(items.map((x, j) => (j === i ? next : x)))}
                  root={root}
                  photos={photos}
                />
              </li>
            ))}
          </ol>
          {!spec.fixed && (
            <button type="button" onClick={() => setItems([...items, spec.newItem()])} className={`${addButton} mt-4`}>
              <Plus size={16} />
              {withArticle(spec.itemLabel)}
            </button>
          )}
        </fieldset>
      );
    }

    case "group": {
      const group = value && typeof value === "object" ? (value as Obj) : null;
      if (!group && spec.optional) {
        return (
          <div>
            <button type="button" onClick={() => onChange(spec.optional!.newValue())} className={addButton}>
              <Plus size={16} />
              {spec.optional.addLabel}
            </button>
            <Hint text={spec.hint} />
          </div>
        );
      }
      return (
        <fieldset className="rounded-xl border border-sage-light/60 bg-sage-pale/50 p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2 mb-4">
            <legend className="font-body text-xs text-sage-dark uppercase tracking-widest">{spec.label}</legend>
            {spec.optional && (
              <button
                type="button"
                onClick={() => onChange(undefined)}
                className="inline-flex items-center gap-1.5 min-h-[44px] font-body text-sm text-muted hover:text-red-600 px-2"
              >
                <Trash2 size={15} />
                Remove
              </button>
            )}
          </div>
          <Hint text={spec.hint} />
          <Fields fields={spec.fields} value={group ?? {}} onChange={onChange} root={root} photos={photos} />
        </fieldset>
      );
    }
  }
}

function withArticle(noun: string): string {
  return `Add ${/^[aeiou]/i.test(noun) ? "an" : "a"} ${noun}`;
}

function swap<T>(list: T[], i: number, dir: -1 | 1): T[] {
  const j = i + dir;
  if (j < 0 || j >= list.length) return list;
  const next = [...list];
  [next[i], next[j]] = [next[j], next[i]];
  return next;
}

function MoveButtons({
  index,
  count,
  noun,
  onMove,
  onRemove,
}: {
  index: number;
  count: number;
  noun: string;
  onMove: (dir: -1 | 1) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center shrink-0">
      <button type="button" onClick={() => onMove(-1)} disabled={index === 0} aria-label={`Move ${noun} ${index + 1} up`} title="Move up" className={smallButton}>
        <ArrowUp size={16} />
      </button>
      <button type="button" onClick={() => onMove(1)} disabled={index === count - 1} aria-label={`Move ${noun} ${index + 1} down`} title="Move down" className={smallButton}>
        <ArrowDown size={16} />
      </button>
      <button type="button" onClick={onRemove} aria-label={`Remove ${noun} ${index + 1}`} title="Remove" className={`${smallButton} hover:text-red-600`}>
        <Trash2 size={16} />
      </button>
    </div>
  );
}
