"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const services = [
  {
    id: "01",
    title: "Financování",
    desc: "Zajistíme nejvýhodnější hypotéku napříč všemi bankami na trhu. Vyjednáme nejlepší úrokové sazby a postaráme se o veškerou administrativu.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="9"/>
        <path d="M11 7v1.5M11 13.5V15M8.5 9.5C8.5 8.4 9.6 7.5 11 7.5s2.5.9 2.5 2c0 2.5-5 2-5 4.5 0 1.1 1.1 2 2.5 2s2.5-.9 2.5-2"/>
      </svg>
    ),
  },
  {
    id: "02",
    title: "Prodej stávající nemovitosti",
    desc: "Potřebujete nejdřív prodat svůj současný byt nebo dům? Zajistíme rychlý a výhodný prodej s využitím celorepublikového pokrytí a více než 600 průvodců nemovitostmi.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L11 3l8 6.5V19a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
        <path d="M8 20V12h6v8"/>
      </svg>
    ),
  },
  {
    id: "03",
    title: "Pojištění",
    desc: "Ochráníme váš nový domov i vás. Pomůžeme se zorientovat v nabídkách a sjednáme nejvýhodnější majetkové pojištění i komplexní životní pojištění.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 2L4 5v6c0 4.4 3 8.3 7 9.3 4-1 7-4.9 7-9.3V5l-7-3z"/>
        <polyline points="8,11 10,13 14,9"/>
      </svg>
    ),
  },
  {
    id: "04",
    title: "Energie",
    desc: "Zajistíme výhodný tarif elektřiny a plynu přímo pro vaši novou domácnost, včetně kompletního přehlášení a veškeré administrativy s tím spojené.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13,2 3,14 11,14 9,20 19,8 11,8 13,2"/>
      </svg>
    ),
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: { trigger: headingRef.current, start: "top 82%" },
        opacity: 0, y: 40, duration: 1.1, ease: "power3.out",
      });
      gsap.from(gridRef.current?.children ?? [], {
        scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
        opacity: 0, y: 30, duration: 0.9,
        stagger: 0.1, ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sluzby"
      className="bg-anthracite py-28 md:py-40 px-6 md:px-10 lg:px-20"
    >
      <div className="max-w-7xl mx-auto">

        {/* Záhlaví */}
        <div ref={headingRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div>
            <p className="label text-brick-muted mb-6">Komplexní péče</p>
            <h2 className="heading-lg text-white">
              Postaráme se<br />
              o vše ostatní.
            </h2>
          </div>
          <div className="flex flex-col justify-center">
            <div className="divider mb-6" />
            <p className="body-sm text-white/45 max-w-[64ch]">
              Ve spolupráci s kolegyní z realitní kanceláře Bidli vám zajistíme
              vše potřebné pro bezstarostné nastěhování — od hypotéky přes
              pojištění až po přepis energií.
            </p>
          </div>
        </div>

        {/* Karty služeb */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/8">
          {services.map((s) => (
            <div
              key={s.id}
              className="group bg-anthracite-light p-8 md:p-10 flex flex-col gap-8
                         hover:bg-brick transition-colors duration-500 cursor-default"
            >
              {/* Ikona */}
              <div className="w-10 h-10 flex items-center justify-center text-brick-muted
                              group-hover:text-white transition-colors duration-500">
                {s.icon}
              </div>

              {/* Číslo */}
              <span className="label text-white/20 group-hover:text-white/30 transition-colors duration-500">
                {s.id}
              </span>

              {/* Název */}
              <h3 className="font-serif text-xl text-white leading-snug">
                {s.title}
              </h3>

              {/* Popis */}
              <p className="body-sm text-white/45 group-hover:text-white/70
                            transition-colors duration-500 text-[0.82rem] leading-[1.75] mt-auto">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Poznámka */}
        <p className="label text-white/20 mt-10 text-center">
          Služby zajišťujeme ve spolupráci s Bidli Reality
        </p>

      </div>
    </section>
  );
}
