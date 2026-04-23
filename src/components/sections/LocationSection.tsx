"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const pois = [
  { category: "Doprava",        items: ["Tramvaj Slovanská — 2 min pěšky", "Centrum Plzně — 10 min pěšky", "Dálnice D5 — 8 min autem"] },
  { category: "Obchody",        items: ["Supermarkety na Slovanské tř.", "Obchodní centrum — 5 min", "Lékárny, kavárny, restaurace"] },
  { category: "Vzdělání",       items: ["MŠ a ZŠ v docházkové vzdál.", "Gymnázia v centru", "Západočeská univerzita"] },
  { category: "Sport & příroda",items: ["Škoda Sportpark — 1,2 km", "Cyklostezky podél Radbuzy", "Papírenský park, park Homolka"] },
];

export default function LocationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);
  const poisRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {

      // Levý a pravý panel
      gsap.from(leftRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        opacity: 0, x: -40, duration: 1.1, ease: "power3.out",
      });
      gsap.from(rightRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        opacity: 0, x: 40, duration: 1.1, delay: 0.15, ease: "power3.out",
      });

      // POI skupiny
      const groups = poisRef.current?.querySelectorAll(".poi-group");
      if (groups) {
        gsap.from(groups, {
          scrollTrigger: { trigger: poisRef.current, start: "top 80%" },
          opacity: 0, y: 30, duration: 0.9,
          stagger: 0.1, ease: "power3.out",
        });
      }

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="lokalita"
      className="bg-anthracite py-28 md:py-40 px-6 md:px-10 lg:px-20"
    >
      <div className="max-w-7xl mx-auto">

        {/* Záhlaví — 2 sloupce */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-20 md:mb-28">
          <div ref={leftRef}>
            <p className="label text-brick mb-6">Lokalita</p>
            <h2 className="heading-lg text-white">
              Centrum.<br />
              Bez hluku.
            </h2>
          </div>

          <div ref={rightRef} className="flex flex-col justify-center">
            <div className="w-12 h-px bg-brick mb-6" />
            <p className="body-sm text-white/50 max-w-[64ch] mb-6">
              Ulice Jedlová leží kousek od Slovanské třídy — tramvaj, obchody,
              kavárny a parky na dosah pěšky. Historické náměstí za 10 minut.
              Tichá adresa, velkoměstský dosah.
            </p>
            <address className="not-italic">
              <p className="label text-white/30">Adresa</p>
              <p className="font-serif text-white/80 text-lg mt-1">
                Jedlová, Plzeň — Východní předměstí
              </p>
            </address>
          </div>
        </div>

        {/* Body zájmu */}
        <div
          ref={poisRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/6"
        >
          {pois.map((poi) => (
            <div
              key={poi.category}
              className="poi-group bg-anthracite-light p-8 md:p-10
                         hover:bg-brick/10 transition-colors duration-500"
            >
              <p className="label text-brick mb-6">{poi.category}</p>
              <ul className="space-y-3">
                {poi.items.map((item) => (
                  <li
                    key={item}
                    className="body-sm text-white/55 text-[0.85rem] flex items-start gap-2"
                  >
                    <span className="mt-[0.45rem] w-1 h-1 rounded-full bg-brick/60 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Google Maps */}
        <div className="mt-12 md:mt-16 overflow-hidden" style={{ height: "480px" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d686.650937203483!2d13.38894066967084!3d49.734923098216534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470aee20f1d60a8b%3A0x2b829f5e139ea6c4!2sJedlov%C3%A1%205%2C%20326%2000%20Plze%C5%88%202-Slovany!5e1!3m2!1scs!2scz!4v1776941331025!5m2!1scs!2scz"
            width="100%"
            height="100%"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="BD Jedlová — mapa"
          />
        </div>

      </div>
    </section>
  );
}
