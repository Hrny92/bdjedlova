"use client";

import { useEffect, useRef, useState } from "react";
import { useContactModal } from "@/context/ContactModalContext";

const apartmentOptions = [
  "Byt 1 — 3+kk, 59,86 m², 2. NP",
  "Byt 2 — 1+kk, 50,64 m² + terasa, 2. NP",
  "Byt 3 — 1+kk, 54,03 m² + velká terasa, 2. NP",
  "Byt 4 — 3+kk, 59,86 m², 3. NP",
  "Byt 5 — 1+kk, 50,64 m² + terasa, 3. NP",
  "Byt 6 — 1+kk kompakt, 28,23 m², 3. NP",
  "Byt 7 — 1+kk, 29,53 m², 4. NP",
  "Byt 8 — 3+kk Penthouse, 100,38 m² + 2 terasy, 4. NP",
  "Obecný dotaz",
];

export default function ContactModal() {
  const { isOpen, close, preselected } = useContactModal();
  const [sent,    setSent]    = useState(false);
  const [loading, setLoading] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Klávesa Escape
  useEffect(() => {
    if (!isOpen) return;
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [isOpen, close]);

  // Blokuj scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Reset stavu při zavření
  useEffect(() => { if (!isOpen) { setSent(false); setLoading(false); } }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: zapojit API endpoint / EmailJS / Resend
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      onClick={(e) => { if (e.target === overlayRef.current) close(); }}
    >
      {/* Tmavý overlay */}
      <div className="absolute inset-0 bg-anthracite/70 backdrop-blur-sm" onClick={close} />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-cream">

        {/* Hlavička */}
        <div className="flex items-start justify-between px-8 pt-8 pb-6 border-b border-anthracite/10">
          <div>
            <p className="label text-brick mb-1">Kontakt</p>
            <h2 className="font-serif font-light text-2xl text-anthracite">
              Máte zájem? Napište nám.
            </h2>
          </div>
          <button
            onClick={close}
            aria-label="Zavřít"
            className="w-8 h-8 flex items-center justify-center text-anthracite/40
                       hover:text-anthracite transition-colors duration-200 shrink-0 mt-1"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="2" y1="2" x2="16" y2="16"/>
              <line x1="16" y1="2" x2="2" y2="16"/>
            </svg>
          </button>
        </div>

        {/* Obsah */}
        <div className="px-8 py-8">
          {sent ? (
            <div className="flex flex-col items-start gap-5 py-6">
              <div className="w-12 h-12 bg-brick flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <div>
                <h3 className="font-serif text-xl text-anthracite mb-2">Děkujeme za zájem.</h3>
                <p className="body-sm text-anthracite/60">
                  Váš dotaz jsme přijali. Ozveme se vám co nejdříve — zpravidla do 24 hodin.
                </p>
              </div>
              <button onClick={close} className="btn-outline-dark mt-2">Zavřít</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Jméno */}
              <div>
                <label className="label text-anthracite/50 block mb-2">Jméno a příjmení *</label>
                <input
                  type="text" required
                  placeholder="Jan Novák"
                  className="w-full bg-white border border-anthracite/15 px-4 py-3
                             font-sans text-sm text-anthracite placeholder:text-anthracite/30
                             focus:outline-none focus:border-brick transition-colors duration-300"
                />
              </div>

              {/* Telefon + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="label text-anthracite/50 block mb-2">Telefon *</label>
                  <input
                    type="tel" required
                    placeholder="+420 000 000 000"
                    className="w-full bg-white border border-anthracite/15 px-4 py-3
                               font-sans text-sm text-anthracite placeholder:text-anthracite/30
                               focus:outline-none focus:border-brick transition-colors duration-300"
                  />
                </div>
                <div>
                  <label className="label text-anthracite/50 block mb-2">E-mail *</label>
                  <input
                    type="email" required
                    placeholder="jan@example.com"
                    className="w-full bg-white border border-anthracite/15 px-4 py-3
                               font-sans text-sm text-anthracite placeholder:text-anthracite/30
                               focus:outline-none focus:border-brick transition-colors duration-300"
                  />
                </div>
              </div>

              {/* Zájem o — předvybrán byt pokud je znám */}
              <div>
                <label className="label text-anthracite/50 block mb-2">Mám zájem o</label>
                <select
                  defaultValue={preselected}
                  className="w-full bg-white border border-anthracite/15 px-4 py-3
                             font-sans text-sm text-anthracite
                             focus:outline-none focus:border-brick transition-colors duration-300
                             appearance-none cursor-pointer"
                >
                  <option value="">Vyberte byt…</option>
                  {apartmentOptions.map(a => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>

              {/* Zpráva */}
              <div>
                <label className="label text-anthracite/50 block mb-2">Zpráva</label>
                <textarea
                  rows={3}
                  placeholder="Volitelná zpráva nebo preferovaný čas pro zavolání…"
                  className="w-full bg-white border border-anthracite/15 px-4 py-3
                             font-sans text-sm text-anthracite placeholder:text-anthracite/30
                             focus:outline-none focus:border-brick transition-colors duration-300
                             resize-none"
                />
              </div>

              {/* GDPR */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" required className="mt-1 w-4 h-4 accent-brick shrink-0"/>
                <span className="body-sm text-anthracite/45 text-[0.76rem] leading-relaxed">
                  Souhlasím se zpracováním osobních údajů pro účely odpovědi na tento dotaz.
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`btn-filled w-full justify-center ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                {loading ? "Odesílám…" : "Odeslat dotaz"}
              </button>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}
