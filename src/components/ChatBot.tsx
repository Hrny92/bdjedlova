"use client";

import { useEffect, useRef, useState } from "react";

type Message = { role: "user" | "model"; text: string };

const GREETING_FALLBACK = "Dobrý den! Jsem asistent BD Jedlová. Jak vám mohu pomoci?";

// ── Ikona chat bubbles ────────────────────────────────────────────────────────
function IconChat() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  );
}

function IconSend() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  );
}

function IconClose() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor"
         strokeWidth="1.5" strokeLinecap="round">
      <line x1="2" y1="2" x2="16" y2="16"/>
      <line x1="16" y1="2" x2="2" y2="16"/>
    </svg>
  );
}

// ── Tečky — indikátor psaní ───────────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <span key={i}
          className="w-1.5 h-1.5 rounded-full bg-anthracite/30"
          style={{ animation: `chatDot 1.2s ease-in-out ${i * 0.2}s infinite` }}
        />
      ))}
    </div>
  );
}

// ── Bubble ────────────────────────────────────────────────────────────────────
function Bubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed font-sans
          ${isUser
            ? "bg-brick text-white"
            : "bg-white text-anthracite border border-anthracite/10"
          }`}
        style={{ whiteSpace: "pre-wrap" }}
      >
        {msg.text}
      </div>
    </div>
  );
}

// ── Hlavní komponenta ─────────────────────────────────────────────────────────
export default function ChatBot() {
  const [open,     setOpen]     = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input,    setInput]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [greeting, setGreeting] = useState(GREETING_FALLBACK);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  // Fetch greeting z API (brain)
  useEffect(() => {
    fetch("/api/chat/greeting")
      .then((r) => r.json())
      .then((d) => { if (d.greeting) setGreeting(d.greeting); })
      .catch(() => {});
  }, []);

  // Při otevření nastav uvítací zprávu (jednou)
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: "model", text: greeting }]);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, greeting, messages.length]);

  // Scroll na poslední zprávu
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const next: Message[] = [...messages, { role: "user", text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "model", text: data.text ?? "Omlouvám se, nepodařilo se získat odpověď." }]);
    } catch {
      setMessages((prev) => [...prev, { role: "model", text: "Omlouvám se, nastala chyba. Zkuste to prosím znovu." }]);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <>
      <style>{`
        @keyframes chatDot {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
          40%            { opacity: 1;   transform: scale(1.1); }
        }
        @keyframes chatOpen {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
      `}</style>

      {/* Plovoucí bublina */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Otevřít chat"
        className={`fixed bottom-6 right-6 z-[300] w-14 h-14 bg-brick text-white
                    flex items-center justify-center shadow-xl
                    hover:bg-brick-dark transition-colors duration-300
                    ${open ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        style={{ transition: "opacity 0.2s, background-color 0.3s" }}
      >
        <IconChat />
      </button>

      {/* Chat okno */}
      {open && (
        <div
          className="fixed bottom-6 right-6 z-[300] w-[360px] max-w-[calc(100vw-3rem)]
                     bg-cream shadow-2xl flex flex-col overflow-hidden"
          style={{ height: "520px", animation: "chatOpen 0.25s ease-out" }}
        >
          {/* Záhlaví */}
          <div className="bg-anthracite px-5 py-4 flex items-center justify-between shrink-0">
            <div>
              <p className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-white/40 mb-0.5">
                BD Jedlová
              </p>
              <p className="font-serif text-base text-white leading-none">
                Asistent
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/40 hover:text-white transition-colors duration-200"
              aria-label="Zavřít chat"
            >
              <IconClose />
            </button>
          </div>

          {/* Zprávy */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => <Bubble key={i} msg={m} />)}
            {loading && (
              <div className="flex justify-start mb-3">
                <div className="bg-white border border-anthracite/10">
                  <TypingDots />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Vstup */}
          <div className="border-t border-anthracite/10 px-4 py-3 flex gap-2 shrink-0 bg-white">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              disabled={loading}
              placeholder="Napište dotaz…"
              className="flex-1 font-sans text-[16px] md:text-sm text-anthracite placeholder:text-anthracite/30
                         bg-transparent focus:outline-none"
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className={`w-9 h-9 flex items-center justify-center bg-brick text-white
                          hover:bg-brick-dark transition-colors duration-200
                          ${(loading || !input.trim()) ? "opacity-40 cursor-not-allowed" : ""}`}
            >
              <IconSend />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
