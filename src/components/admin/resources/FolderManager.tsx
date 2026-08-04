"use client";

import { useRef, useState, useTransition } from "react";
import { FolderPlus, Pencil, Trash2, Check, X, Folder } from "lucide-react";
import {
  addFolder,
  renameFolder,
  removeFolder,
} from "@/app/actions/resources";
import type { ResourceCategory } from "@/lib/dal/resources";

/* Folder (category) management for the resource library. Folders behave
   like tags — a resource can sit in several, and deleting a folder never
   deletes the resources inside it. */

function FolderRow({ folder }: { folder: ResourceCategory }) {
  const [editing, setEditing] = useState(false);
  const [pending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  const submitRename = () => {
    const name = inputRef.current?.value.trim() ?? "";
    if (name === "" || name === folder.name) {
      setEditing(false);
      return;
    }
    const data = new FormData();
    data.set("id", folder.id);
    data.set("name", name);
    startTransition(async () => {
      await renameFolder(data);
      setEditing(false);
    });
  };

  const submitDelete = () => {
    if (
      !window.confirm(
        `Delete the folder “${folder.name}”? Resources inside it are not deleted — they simply leave this folder.`
      )
    ) {
      return;
    }
    const data = new FormData();
    data.set("id", folder.id);
    startTransition(() => removeFolder(data));
  };

  return (
    <li
      className={`flex items-center gap-3 bg-white rounded-xl border border-grey-light px-4 py-3 transition-opacity ${
        pending ? "opacity-50" : ""
      }`}
    >
      <Folder size={16} strokeWidth={1.75} className="text-sage shrink-0" />
      {editing ? (
        <>
          <input
            ref={inputRef}
            defaultValue={folder.name}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") submitRename();
              if (e.key === "Escape") setEditing(false);
            }}
            className="flex-1 min-w-0 font-body text-sm text-charcoal bg-white border border-grey-light rounded-lg px-3 py-1.5 focus:outline-none focus:border-sage"
            aria-label={`Rename folder ${folder.name}`}
          />
          <button
            type="button"
            onClick={submitRename}
            disabled={pending}
            className="p-2 rounded-full text-sage-dark hover:bg-sage-pale transition-colors duration-200"
            aria-label="Save folder name"
          >
            <Check size={15} />
          </button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="p-2 rounded-full text-muted hover:bg-cream transition-colors duration-200"
            aria-label="Cancel renaming"
          >
            <X size={15} />
          </button>
        </>
      ) : (
        <>
          <span className="flex-1 min-w-0 truncate font-body text-sm text-charcoal">
            {folder.name}
          </span>
          <span className="font-body text-xs text-muted bg-cream border border-grey-light rounded-full px-2.5 py-0.5">
            {folder.resourceCount}
          </span>
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="p-2 rounded-full text-muted hover:text-sage-dark hover:bg-sage-pale transition-colors duration-200"
            aria-label={`Rename folder ${folder.name}`}
          >
            <Pencil size={14} />
          </button>
          <button
            type="button"
            onClick={submitDelete}
            disabled={pending}
            className="p-2 rounded-full text-muted hover:text-red-600 hover:bg-cream transition-colors duration-200"
            aria-label={`Delete folder ${folder.name}`}
          >
            <Trash2 size={14} />
          </button>
        </>
      )}
    </li>
  );
}

export default function FolderManager({
  folders,
}: {
  folders: ResourceCategory[];
}) {
  const [pending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div>
      <form
        ref={formRef}
        action={(data) => {
          startTransition(async () => {
            await addFolder(data);
            formRef.current?.reset();
          });
        }}
        className="flex gap-3 mb-6"
      >
        <input
          name="name"
          type="text"
          required
          placeholder="New folder name, e.g. Sleep & Rest"
          className="flex-1 min-w-0 font-body text-sm text-charcoal bg-white border border-grey-light rounded-lg px-4 py-2.5 focus:outline-none focus:border-sage placeholder:text-muted/70"
          aria-label="New folder name"
        />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 min-h-[44px] font-body text-sm bg-sage-dark text-cream px-5 py-2.5 rounded-full hover:bg-charcoal transition-colors duration-200 disabled:opacity-60 shrink-0"
        >
          <FolderPlus size={15} />
          Add Folder
        </button>
      </form>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {folders.map((folder) => (
          <FolderRow key={folder.id} folder={folder} />
        ))}
      </ul>
    </div>
  );
}
