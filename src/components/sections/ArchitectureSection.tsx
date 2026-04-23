"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const materials = [
  {
    id: "01",
    name: "Tmavá lícová cihla",
    desc: "Fasádní obklad s přirozenou texturou. Odolný, nadčasový, respektující historický kontext plzeňské zástavby.",
    image: "/images/materialy/Cihla.webp",
  },
  {
    id: "02",
    name: "Dřevěné lamely",
    desc: "Lamelové prvky na balkónech a lodžiích. Přirozené teplo v kontrastu s cihlou a betonem.",
    image: "/images/materialy/Drevo.webp",
  },
  {
    id: "03",
    name: "Pohledový beton",
    desc: "Viditelný na parkovišti a vstupních prvcích. Surovost jako záměrný designový prvek.",
    image: "/images/materialy/Beton.webp",
  },
  {
    id: "04",
    name: "Velkoformátová skla",
    desc: "Panoramatická okna maximalizující přísun denního světla do každého bytu.",
    image: "/images/materialy/Sklo-1.webp",
  },
  {
    id: "05",
    name: "Intenzivní zeleň",
    desc: "Zelená střecha nad krytým parkingem. Živý prvek, který proměňuje technický prostor.",
    image: "/images/materialy/Zelen.webp",
  },
];

export default function ArchitectureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);
  const quoteRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {

      // Nadpis
      gsap.from(headingRef.current, {
        scrollTrigger: { trigger: headingRef.current, start: "top 82%" },
        opacity: 0, y: 50, duration: 1.1, ease: "power3.out",
      });

      // Karty — stagger
      const cards = cardsRef.current?.querySelectorAll(".material-card");
      if (cards) {
        gsap.from(cards, {
          scrollTrigger: { trigger: cardsRef.current, start: "top 78%" },
          opacity: 0, y: 40, duration: 0.9,
          stagger: 0.12, ease: "power3.out",
        });
      }

      // Citát
      gsap.from(quoteRef.current, {
        scrollTrigger: { trigger: quoteRef.current, start: "top 85%" },
        opacity: 0, y: 30, duration: 1, ease: "power3.out",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="architektura"
      className="bg-cream py-28 md:py-40 px-6 md:px-10 lg:px-20"
    >
      <div className="max-w-7xl mx-auto">

        {/* Záhlaví */}
        <div ref={headingRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 md:mb-28">
          <div>
            <p className="label text-brick mb-6">Architektura</p>
            <h2 className="heading-lg text-anthracite">
              Materiály<br />
              zvolené pro<br />
              trvalost.
            </h2>
          </div>
          <div className="flex flex-col justify-center">
            <div className="divider mb-6" />
            <p className="body-sm text-anthracite/60 max-w-[64ch]">
              Žádné efekty pro efekt. Fasáda z tmavé lícové cihly, lamelové dřevěné prvky
              a pohledový beton — každý materiál tu má svůj důvod. Architektonický návrh
              zpracovalo studio Project Studio 8.
            </p>
          </div>
        </div>

        {/* Materiálové karty */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-anthracite/10">
          {materials.map((m) => (
            <div
              key={m.id}
              className="material-card bg-white p-8 flex flex-col gap-6
                         group hover:bg-anthracite transition-colors duration-500"
            >
              {/* Obrázek materiálu */}
              <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 ring-1 ring-anthracite/10">
                <Image
                  src={m.image}
                  alt={m.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Číslo */}
              <span className="label text-anthracite/30 group-hover:text-white/30 transition-colors duration-500">
                {m.id}
              </span>
              {/* Název */}
              <h3 className="font-serif font-light text-xl text-anthracite
                             group-hover:text-white transition-colors duration-500">
                {m.name}
              </h3>
              {/* Popis */}
              <p className="body-sm text-anthracite/55 group-hover:text-white/50
                            transition-colors duration-500 text-[0.82rem] leading-[1.7]">
                {m.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Citát */}
        <div ref={quoteRef} className="mt-24 md:mt-32 text-center">
          <blockquote className="font-serif font-bold text-[clamp(1.4rem,3vw,2.5rem)]
                                  text-anthracite/70 max-w-3xl mx-auto leading-relaxed">
            „Dům uzavírá historickou proluku citlivě — ctí rytmus uliční čáry,
            pracuje s výškou okolí a zároveň neskrývá, že je stavbou 21.&nbsp;století."
          </blockquote>
          <p className="label text-anthracite/35 mt-6">
            Ing. arch. Bohuslav Strejc — Project Studio 8
          </p>
        </div>

      </div>
    </section>
  );
}
