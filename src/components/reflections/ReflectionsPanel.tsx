"use client";

import { useRef, useState } from "react";
import { Leaf, SendHorizontal, Sparkles } from "lucide-react";
import CrisisScreen from "@/components/reflections/CrisisScreen";

/* NewFuture Reflections chat. Used embedded beneath an exercise (with course
   context) and on the standalone Reflections page. Streams replies from
   /api/reflections/chat; when the safety layer interrupts, the fixed crisis
   screen replaces the input entirely. */

export interface PanelMessage {
  role: "user" | "assistant";
  content: string;
}

interface ReflectionsPanelProps {
  courseId?: string;
  lessonId?: string;
  exerciseId?: string;
  sessionId?: string;
  initialMessages?: PanelMessage[];
  /** Shown as a one-tap opener when there is no conversation yet. */
  invitation?: string;
  placeholder?: string;
}

export default function ReflectionsPanel({
  courseId,
  lessonId,
  exerciseId,
  sessionId: initialSessionId,
  initialMessages = [],
  invitation,
  placeholder = "Write a little about what is on your mind…",
}: ReflectionsPanelProps) {
  const [messages, setMessages] = useState<PanelMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [crisis, setCrisis] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const sessionRef = useRef<string | undefined>(initialSessionId);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollDown = () => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
    });
  };

  async function send(text: string) {
    const message = text.trim();
    if (!message || busy) return;
    setBusy(true);
    setNotice(null);
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: message }]);
    scrollDown();

    try {
      const response = await fetch("/api/reflections/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: sessionRef.current,
          courseId,
          lessonId,
          exerciseId,
          message,
        }),
      });

      const contentType = response.headers.get("Content-Type") ?? "";
      if (contentType.includes("application/json")) {
        const payload = (await response.json()) as {
          kind?: string;
          sessionId?: string;
        };
        if (payload.sessionId) sessionRef.current = payload.sessionId;
        if (payload.kind === "crisis") {
          setCrisis(true);
        } else if (payload.kind === "unavailable") {
          setNotice(
            "Reflections is not switched on yet. Your course and worksheets work as normal in the meantime."
          );
        } else {
          setNotice(
            "Something went wrong just now. Please try again in a moment."
          );
        }
        return;
      }

      const streamSession = response.headers.get("X-Reflections-Session");
      if (streamSession) sessionRef.current = streamSession;

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
      const reader = response.body?.getReader();
      if (!reader) return;
      const decoder = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const next = [...prev];
          const last = next[next.length - 1];
          next[next.length - 1] = {
            ...last,
            content: last.content + chunk,
          };
          return next;
        });
        scrollDown();
      }
    } catch {
      setNotice("Something went wrong just now. Please try again in a moment.");
    } finally {
      setBusy(false);
      scrollDown();
    }
  }

  if (crisis) {
    return (
      <div className="mt-6">
        <CrisisScreen onClose={() => setCrisis(false)} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-grey-light shadow-sm overflow-hidden">
      {/* Disclosure — fixed interface copy, pinned above every conversation */}
      <div className="bg-sage-pale border-b border-sage-light/50 px-6 py-3 flex items-start gap-2.5">
        <Leaf size={15} className="text-sage-dark shrink-0 mt-0.5" />
        <p className="font-body text-xs text-sage-dark leading-relaxed">
          NewFuture Reflections is an AI-supported educational and reflective
          guide. It is not counselling, therapy or emergency support, and no
          therapist reads these conversations.
        </p>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className={`px-6 overflow-y-auto ${
          messages.length > 0 ? "py-6 max-h-[26rem] space-y-4" : ""
        }`}
        aria-live="polite"
      >
        {messages.map((message, i) => (
          <div
            key={i}
            className={message.role === "user" ? "flex justify-end" : "flex"}
          >
            <div
              className={`max-w-[85%] font-body text-sm leading-relaxed whitespace-pre-wrap rounded-2xl px-4 py-3 ${
                message.role === "user"
                  ? "bg-sage-dark text-cream"
                  : "bg-cream border border-grey-light text-charcoal"
              }`}
            >
              {message.content || (
                <span className="inline-flex gap-1 items-center text-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
                  <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse [animation-delay:300ms]" />
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Invitation opener */}
      {messages.length === 0 && invitation && (
        <div className="px-6 pt-5">
          <button
            type="button"
            disabled={busy}
            onClick={() => send(invitation)}
            className="inline-flex items-center gap-2 font-body text-sm bg-sage-pale text-sage-dark border border-sage-light px-5 py-2.5 rounded-full hover:bg-sage-light/40 transition-colors duration-200 disabled:opacity-60"
          >
            <Sparkles size={15} />
            {invitation}
          </button>
        </div>
      )}

      {notice && (
        <p className="px-6 pt-4 font-body text-sm text-muted">{notice}</p>
      )}

      {/* Input */}
      <form
        className="flex items-end gap-3 p-4"
        onSubmit={(e) => {
          e.preventDefault();
          void send(input);
        }}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void send(input);
            }
          }}
          rows={2}
          placeholder={placeholder}
          className="flex-1 font-body text-sm text-charcoal bg-cream border border-grey-light rounded-xl px-4 py-3 focus:outline-none focus:border-sage resize-none placeholder:text-muted/70"
          aria-label="Message NewFuture Reflections"
        />
        <button
          type="submit"
          disabled={busy || input.trim() === ""}
          className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-sage-dark text-cream hover:bg-charcoal transition-colors duration-200 disabled:opacity-40 shrink-0"
          aria-label="Send"
        >
          <SendHorizontal size={17} />
        </button>
      </form>
    </div>
  );
}
