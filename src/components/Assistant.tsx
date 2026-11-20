"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { SUGGESTED_QUESTIONS } from "@/lib/faq";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content: "Hi! I'm Thierry's portfolio assistant. Ask me about his cloud experience, certifications, projects or availability.",
};

export function Assistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState<"ai" | "faq" | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  async function ask(question: string) {
    const q = question.trim();
    if (!q || busy) return;
    const history = [...messages.filter((m) => m !== GREETING), { role: "user" as const, content: q }];
    setMessages((m) => [...m, { role: "user", content: q }, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);

    const write = (text: string, append = false) =>
      setMessages((m) => {
        const copy = [...m];
        const last = copy[copy.length - 1];
        copy[copy.length - 1] = { ...last, content: append ? last.content + text : text };
        return copy;
      });

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      const type = res.headers.get("content-type") || "";
      if (type.includes("application/json")) {
        const data = (await res.json()) as { answer?: string; error?: string; mode?: "faq" };
        if (data.mode) setMode(data.mode);
        write(data.answer ?? data.error ?? "Sorry, something went wrong.");
      } else if (res.body) {
        setMode("ai");
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          write(decoder.decode(value, { stream: true }), true);
        }
      }
    } catch {
      write("I couldn't reach the server. Please try again, or use the Contact page.");
    } finally {
      setBusy(false);
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void ask(input);
  };

  return (
    <div className="no-print">
      <AnimatePresence>
        {open ? (
          <motion.section
            key="panel"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-3 bottom-24 z-[60] flex max-h-[min(36rem,calc(100dvh-8rem))] flex-col overflow-hidden rounded-2xl border border-cyan-300/20 bg-ink-900/95 shadow-2xl backdrop-blur-xl sm:inset-x-auto sm:right-6 sm:w-[24rem]"
            role="dialog"
            aria-modal="false"
            aria-labelledby="assistant-title"
          >
            <header className="flex items-center gap-3 border-b border-cyan-300/10 px-4 py-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-300 to-azure-500 text-ink-950">
                <Bot className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <h2 id="assistant-title" className="font-display text-sm font-semibold text-white">Portfolio Assistant</h2>
                <p className="truncate font-mono text-[0.65rem] text-mist-400">
                  {mode === "faq" ? "Answers from portfolio content" : "AI answers grounded in this portfolio"}
                </p>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="rounded-full p-2 text-mist-300 hover:bg-white/5 hover:text-white" aria-label="Close assistant">
                <X className="h-4 w-4" />
              </button>
            </header>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite" aria-busy={busy}>
              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "flex justify-end" : "flex"}>
                  <p
                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "user" ? "rounded-br-md bg-cyan-400 text-ink-950" : "rounded-bl-md border border-cyan-300/10 bg-ink-950/70 text-mist-100"
                    }`}
                  >
                    {m.content || <span className="inline-flex gap-1" aria-label="Thinking"><Dot /><Dot d={0.15} /><Dot d={0.3} /></span>}
                  </p>
                </div>
              ))}
              {messages.length === 1 ? (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button key={q} type="button" onClick={() => void ask(q)} className="rounded-full border border-cyan-300/20 px-3 py-1.5 text-left text-xs text-mist-100 hover:border-cyan-300/60 hover:bg-cyan-400/[0.06]">
                      {q}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-cyan-300/10 p-3">
              <label htmlFor="assistant-input" className="sr-only">Ask a question</label>
              <input
                id="assistant-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={500}
                placeholder="Ask about skills, projects, certs…"
                className="min-h-[44px] flex-1 rounded-full border border-cyan-300/15 bg-ink-950/70 px-4 text-sm text-white placeholder:text-mist-400 focus:border-cyan-300/60 focus:outline-none"
                autoComplete="off"
              />
              <button type="submit" disabled={busy || !input.trim()} className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-400 text-ink-950 transition disabled:opacity-40" aria-label="Send question">
                <Send className="h-4 w-4" />
              </button>
            </form>
            <p className="px-4 pb-3 text-[0.65rem] leading-snug text-mist-400">
              Automated assistant. Answers may be imperfect — please confirm details with Thierry directly.
            </p>
          </motion.section>
        ) : null}
      </AnimatePresence>

      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close portfolio assistant" : "Open portfolio assistant"}
        className="group fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 to-azure-500 text-ink-950 shadow-[0_10px_40px_-6px_rgba(53,200,232,0.8)] transition hover:scale-105 sm:bottom-6 sm:right-6"
      >
        {!open ? <span className="absolute inset-0 animate-ping rounded-full bg-cyan-300/30 [animation-duration:2.6s]" aria-hidden="true" /> : null}
        {open ? <X className="relative h-5 w-5" aria-hidden="true" /> : <Sparkles className="relative h-5 w-5" aria-hidden="true" />}
        <span className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded-full border border-cyan-300/20 bg-ink-900/90 px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-white opacity-0 transition group-hover:opacity-100 sm:block" aria-hidden="true">
          {open ? "Close" : "Ask about Thierry"}
        </span>
      </button>
    </div>
  );
}

function Dot({ d = 0 }: { d?: number }) {
  return (
    <motion.span
      className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-300"
      animate={{ opacity: [0.2, 1, 0.2] }}
      transition={{ duration: 1, repeat: Infinity, delay: d }}
    />
  );
}
