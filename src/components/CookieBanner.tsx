"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = "bdjjedlova_cookie_consent";

function loadConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveConsent(c: Consent) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
  } catch {}
}

// ── Přepínač ──────────────────────────────────────────────────────────────────
function Toggle({ checked, onChange, disabled }: {
  checked: boolean; onChange: (v: boolean) => void; disabled?: boolean;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`relative w-10 h-5 rounded-full transition-colors duration-300 shrink-0
        ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
        ${checked ? "bg-brick" : "bg-anthracite/20"}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow
        transition-transform duration-300 ${checked ? "translate-x-5" : "translate-x-0"}`}
      />
    </button>
  );
}

// ── Kategorie ─────────────────────────────────────────────────────────────────
const categories = [
  {
    key: "necessary" as const,
    title: "Nezbytné",
    desc: "Zajišťují základní funkce webu — navigaci, uchování souhlasu a bezpečnost. Nelze vypnout.",
    disabled: true,
  },
  {
    key: "analytics" as const,
    title: "Analytické",
    desc: "Pomáhají nám pochopit, jak návštěvníci používají web. Data jsou anonymizovaná.",
    disabled: false,
  },
  {
    key: "marketing" as const,
    title: "Marketingové",
    desc: "Umožňují zobrazovat relevantní reklamu přizpůsobenou vašim zájmům.",
    disabled: false,
  },
];

// ── Hlavní komponenta ──────────────────────────────────────────────────────────
export default function CookieBanner() {
  const [mounted,     setMounted]     = useState(false);
  const [visible,     setVisible]     = useState(false);
  const [showDetail,  setShowDetail]  = useState(false);
  const [consent,     setConsent]     = useState<Consent>({
    necessary: true, analytics: false, marketing: false,
  });

  useEffect(() => {
    setMounted(true);
    if (!loadConsent()) {
      // Krátká pauza — nezobrazovat okamžitě při načítání stránky
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  // Poslouchej event z patičky — otevři rovnou nastavení
  useEffect(() => {
    const onOpen = () => {
      setVisible(true);
      setShowDetail(true);
    };
    window.addEventListener("openCookieSettings", onOpen);
    return () => window.removeEventListener("openCookieSettings", onOpen);
  }, []);

  const acceptAll = () => {
    const c: Consent = { necessary: true, analytics: true, marketing: true };
    saveConsent(c);
    setVisible(false);
  };

  const rejectAll = () => {
    const c: Consent = { necessary: true, analytics: false, marketing: false };
    saveConsent(c);
    setVisible(false);
  };

  const saveCustom = () => {
    saveConsent(consent);
    setVisible(false);
  };

  if (!mounted || !visible) return null;

  // ── Detail nastavení ─────────────────────────────────────────────────────
  if (showDetail) {
    return createPortal(
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4"
           style={{ backgroundColor: "rgba(37,34,32,0.7)", backdropFilter: "blur(4px)" }}>
        <div className="bg-white w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]">

          {/* Záhlaví */}
          <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-anthracite/10">
            <div>
              <p className="label text-brick mb-1">BD Jedlová</p>
              <h2 className="font-serif text-2xl text-anthracite">Nastavení cookies</h2>
            </div>
            <button onClick={() => setShowDetail(false)}
              className="w-8 h-8 flex items-center justify-center text-anthracite/30 hover:text-anthracite transition-colors">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                <line x1="2" y1="2" x2="16" y2="16"/><line x1="16" y1="2" x2="2" y2="16"/>
              </svg>
            </button>
          </div>

          {/* Kategorie */}
          <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
            <p className="body-sm text-anthracite/55 text-[0.85rem] leading-relaxed">
              Vyberte, které kategorie cookies chcete povolit. Nezbytné cookies jsou vždy aktivní
              a nelze je vypnout.
            </p>

            {categories.map(({ key, title, desc, disabled }) => (
              <div key={key} className="flex items-start gap-4 py-4 border-b border-anthracite/8 last:border-0">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="label text-anthracite">{title}</p>
                    {disabled && (
                      <span className="font-sans text-[0.55rem] tracking-[0.15em] uppercase
                                       px-1.5 py-0.5 bg-anthracite/8 text-anthracite/40">
                        Vždy aktivní
                      </span>
                    )}
                  </div>
                  <p className="body-sm text-anthracite/55 text-[0.8rem] leading-relaxed">{desc}</p>
                </div>
                <Toggle
                  checked={key === "necessary" ? true : consent[key]}
                  onChange={(v) => setConsent(prev => ({ ...prev, [key]: v }))}
                  disabled={disabled}
                />
              </div>
            ))}
          </div>

          {/* Akce */}
          <div className="px-8 py-6 border-t border-anthracite/10 flex flex-col sm:flex-row gap-3">
            <button onClick={saveCustom} className="btn-outline-dark flex-1 justify-center">
              Uložit nastavení
            </button>
            <button onClick={acceptAll} className="btn-filled flex-1 justify-center">
              Přijmout vše
            </button>
          </div>

          <p className="px-8 pb-5 text-center">
            <Link href="/gdpr" className="font-sans text-[0.68rem] text-anthracite/30
                                           hover:text-brick transition-colors duration-300 underline underline-offset-2">
              Zásady ochrany osobních údajů
            </Link>
          </p>
        </div>
      </div>,
      document.body
    );
  }

  // ── Lišta ────────────────────────────────────────────────────────────────
  return createPortal(
    <div className="fixed bottom-0 left-0 right-0 z-[200]
                    animate-[slideUp_0.5s_ease-out_forwards]"
         style={{ animation: "slideUp 0.5s ease-out forwards" }}>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>

      <div className="bg-anthracite border-t border-white/8
                      px-6 md:px-10 lg:px-16 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center
                        gap-4 sm:gap-8">

          {/* Text */}
          <p className="body-sm text-white/55 text-[0.82rem] leading-relaxed flex-1">
            Používáme cookies ke zlepšení vašeho zážitku a analýze návštěvnosti.{" "}
            <Link href="/gdpr" className="text-white/40 hover:text-brick underline underline-offset-2
                                          transition-colors duration-300">
              Více informací
            </Link>
          </p>

          {/* Akce */}
          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <button
              onClick={() => setShowDetail(true)}
              className="font-sans text-[0.65rem] tracking-[0.18em] uppercase
                         text-white/40 hover:text-white transition-colors duration-300
                         border-b border-white/15 hover:border-white/40 pb-px"
            >
              Nastavení
            </button>
            <button
              onClick={rejectAll}
              className="font-sans text-[0.65rem] tracking-[0.18em] uppercase
                         px-5 py-2.5 border border-white/20 text-white/60
                         hover:border-white/50 hover:text-white
                         transition-all duration-300"
            >
              Odmítnout
            </button>
            <button
              onClick={acceptAll}
              className="font-sans text-[0.65rem] tracking-[0.18em] uppercase
                         px-5 py-2.5 bg-brick text-white
                         hover:bg-brick-dark transition-colors duration-300"
            >
              Přijmout vše
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
