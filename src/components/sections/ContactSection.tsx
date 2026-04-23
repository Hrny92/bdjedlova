"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const apartments = [
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

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const formRef    = useRef<HTMLFormElement>(null);
  const [sent, setSent]   = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        opacity: 0, x: -40, duration: 1.1, ease: "power3.out",
      });
      gsap.from(formRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        opacity: 0, x: 40, duration: 1.1, delay: 0.15, ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: zapojit API endpoint / EmailJS / Resend
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  };

  return (
    <section
      ref={sectionRef}
      id="kontakt"
      className="bg-cream py-28 md:py-40 px-6 md:px-10 lg:px-20"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">

        {/* Levý sloupec */}
        <div ref={leftRef}>
          <p className="label text-brick mb-6">Kontakt</p>
          <h2 className="heading-lg text-anthracite mb-10">
            Máte zájem?<br />
            Napište nám.
          </h2>
          <div className="divider mb-8" />
          <p className="body-sm text-anthracite/60 max-w-[64ch] mb-12">
            BD Jedlová nabízí pouze 8 bytových jednotek. Pokud vás projekt zaujal,
            doporučujeme kontaktovat nás co nejdříve — zájem o prémiové bydlení
            v centru Plzně je vysoký.
          </p>

          {/* Kontaktní osoba */}
          {/* Kontaktní karta — foto absolute, přesahuje nahoře přes rámeček o 10 % */}
          <div className="relative mt-2">
            {/* Karta — pevná výška pro fungující height: 110% na absolutním dítěti */}
            <div className="relative bg-cream-dark overflow-visible" style={{ height: "15rem" }}>

              {/* Fotka — absolute, ukotvena ke spodku, výška 110 % = přesah nahoře.
                  Šířka w-64 > výška kontejneru → image je height-constrained → plná výška */}
              <div
                className="absolute left-0 bottom-0 w-64"
                style={{ height: "110%" }}
              >
                <Image
                  src="/images/zuzana.webp"
                  alt="Ing. Zuzana Benedyktová"
                  fill
                  className="object-contain object-bottom"
                  sizes="256px"
                />
              </div>

              {/* Text — odsazen zleva o šířku fotky + mezera */}
              <div className="absolute inset-0 flex flex-col justify-center pl-[calc(16rem+1rem)] pr-7">
                <p className="label text-brick mb-3">Prodej zajišťuje</p>
                <p className="font-serif text-xl text-anthracite leading-snug">
                  Ing. Zuzana<br />Benedyktová
                </p>
                <p className="label text-anthracite/40 mt-1.5 mb-6">Realitní makléřka</p>
                <div className="space-y-3">
                  <a href="tel:+420723117023" className="flex items-center gap-2.5 group">
                    <svg width="12" height="12" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"
                         className="text-brick shrink-0">
                      <path d="M12 9.5c0 .3-.1.6-.2.9-.1.3-.3.5-.5.7-.4.4-.8.5-1.3.5-.3 0-.7-.1-1-.2-1-.3-1.9-.9-2.7-1.6C5.5 9 4.7 8 4 6.9 3.3 5.8 2.8 4.7 2.5 3.6c-.1-.4-.2-.7-.2-1 0-.5.1-.9.4-1.3.3-.4.7-.6 1.1-.6.2 0 .3 0 .5.1.2.1.3.2.4.4L6 3.4c.1.2.2.3.2.5 0 .2-.1.3-.2.4L5.4 5c-.1.1-.1.2-.1.3 0 .1 0 .2.1.3.3.5.6 1 1 1.4.4.4.9.8 1.4 1.1.1.1.2.1.3.1.1 0 .2-.1.3-.2l.6-.6c.1-.1.3-.2.4-.2.2 0 .3.1.5.2l2.2 1.3c.2.1.3.3.3.5.1.1.1.2.1.3z"/>
                    </svg>
                    <span className="font-sans text-[0.82rem] text-anthracite/70 group-hover:text-brick transition-colors duration-300">
                      +420 723 117 023
                    </span>
                  </a>
                  <a href="mailto:info@jedlova-plzen.cz" className="flex items-center gap-2.5 group">
                    <svg width="12" height="12" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
                         className="text-brick shrink-0">
                      <rect x="1" y="2.5" width="11" height="8" rx="1"/>
                      <polyline points="1,2.5 6.5,7.5 12,2.5"/>
                    </svg>
                    <span className="font-sans text-[0.82rem] text-anthracite/70 group-hover:text-brick transition-colors duration-300">
                      info@jedlova-plzen.cz
                    </span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Pravý sloupec — formulář */}
        <div>
          {sent ? (
            <div className="flex flex-col items-start justify-center h-full gap-6">
              <div className="w-12 h-12 bg-brick flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-anthracite">Děkujeme za zájem.</h3>
              <p className="body-sm text-anthracite/60 max-w-[34ch]">
                Váš dotaz jsme přijali. Ozveme se vám co nejdříve — zpravidla do 24 hodin.
              </p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">

              {/* Jméno */}
              <div>
                <label className="label text-anthracite/50 block mb-2">Jméno a příjmení *</label>
                <input
                  type="text" required
                  className="w-full bg-white border border-anthracite/15 px-4 py-3.5
                             font-sans text-sm text-anthracite placeholder:text-anthracite/30
                             focus:outline-none focus:border-brick transition-colors duration-300"
                  placeholder="Jan Novák"
                />
              </div>

              {/* Telefon + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="label text-anthracite/50 block mb-2">Telefon *</label>
                  <input
                    type="tel" required
                    className="w-full bg-white border border-anthracite/15 px-4 py-3.5
                               font-sans text-sm text-anthracite placeholder:text-anthracite/30
                               focus:outline-none focus:border-brick transition-colors duration-300"
                    placeholder="+420 000 000 000"
                  />
                </div>
                <div>
                  <label className="label text-anthracite/50 block mb-2">E-mail *</label>
                  <input
                    type="email" required
                    className="w-full bg-white border border-anthracite/15 px-4 py-3.5
                               font-sans text-sm text-anthracite placeholder:text-anthracite/30
                               focus:outline-none focus:border-brick transition-colors duration-300"
                    placeholder="jan@example.com"
                  />
                </div>
              </div>

              {/* Zájem o */}
              <div>
                <label className="label text-anthracite/50 block mb-2">Mám zájem o</label>
                <select
                  className="w-full bg-white border border-anthracite/15 px-4 py-3.5
                             font-sans text-sm text-anthracite
                             focus:outline-none focus:border-brick transition-colors duration-300
                             appearance-none cursor-pointer"
                >
                  <option value="">Vyberte byt…</option>
                  {apartments.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>

              {/* Zpráva */}
              <div>
                <label className="label text-anthracite/50 block mb-2">Zpráva</label>
                <textarea
                  rows={4}
                  className="w-full bg-white border border-anthracite/15 px-4 py-3.5
                             font-sans text-sm text-anthracite placeholder:text-anthracite/30
                             focus:outline-none focus:border-brick transition-colors duration-300
                             resize-none"
                  placeholder="Volitelná zpráva, dotaz nebo preferovaný čas pro zavolání…"
                />
              </div>

              {/* GDPR */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" required
                       className="mt-1 w-4 h-4 accent-brick shrink-0" />
                <span className="body-sm text-anthracite/45 text-[0.78rem] leading-[1.6]">
                  Souhlasím se zpracováním osobních údajů pro účely odpovědi na tento dotaz.
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`btn-filled w-full justify-center transition-opacity duration-300
                  ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                {loading ? "Odesílám…" : "Odeslat dotaz"}
              </button>

            </form>
          )}
        </div>

      </div>
    </section>
  );
}
