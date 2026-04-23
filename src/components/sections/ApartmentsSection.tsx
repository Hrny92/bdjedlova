"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

const stats = [
  { value: "8",      label: "Bytových jednotek", sub: "1+kk až 3+kk"   },
  { value: "28–100", label: "m² obytné plochy",  sub: "každý byt jiný" },
  { value: "4",      label: "Nadzemní podlaží",  sub: "2. – 4. NP"     },
  { value: "10",     label: "Parkovacích míst",  sub: "kryté parkování" },
];

export default function ApartmentsSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headingRef  = useRef<HTMLDivElement>(null);
  const imageRef    = useRef<HTMLDivElement>(null);
  const bottomRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {

      gsap.from(headingRef.current, {
        scrollTrigger: { trigger: headingRef.current, start: "top 82%" },
        opacity: 0, y: 40, duration: 1.1, ease: "power3.out",
      });
      gsap.from(imageRef.current, {
        scrollTrigger: { trigger: imageRef.current, start: "top 82%" },
        opacity: 0, y: 30, duration: 1.1, ease: "power3.out",
      });
      gsap.from(bottomRef.current?.children ?? [], {
        scrollTrigger: { trigger: bottomRef.current, start: "top 85%" },
        opacity: 0, y: 20, duration: 0.8,
        stagger: 0.08, ease: "power3.out",
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="byty"
      className="bg-cream py-28 md:py-40 px-6 md:px-10 lg:px-20"
    >
      <div className="max-w-7xl mx-auto">

        {/* Záhlaví — stejná struktura jako ostatní sekce */}
        <div ref={headingRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-14 md:mb-20">
          <div>
            <p className="label text-brick mb-6">Byty</p>
            <h2 className="heading-lg text-anthracite">
              8 bytů.<br />
              Každý jiný.
            </h2>
          </div>
          <div className="flex flex-col justify-center">
            <div className="divider mb-6" />
            <p className="body-sm text-anthracite/60 max-w-[64ch]">
              Od kompaktního 1+kk vhodného pro investici po prostorný penthouse
              se dvěma terasami a šatnou. Ke každé jednotce náleží sklepní kója
              a parkovací místo v krytém parkovišti.
            </p>
          </div>
        </div>

        {/* Vizualizace — plná šířka */}
        <div
          ref={imageRef}
          className="relative w-full overflow-hidden"
          style={{ height: "clamp(280px, 55vw, 620px)" }}
        >
          <Image
            src="/images/byt-vizualizace.webp"
            alt="BD Jedlová — vizualizace interiéru bytu"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 90vw"
          />
        </div>

        {/* Spodní pruh — 4 čísla + CTA */}
        <div
          ref={bottomRef}
          className="grid grid-cols-2 md:grid-cols-5 gap-px bg-anthracite/8 mt-px"
        >
          {stats.map(({ value, label, sub }) => (
            <div key={label} className="bg-cream px-7 py-8">
              <div className="font-serif font-light leading-none text-anthracite
                              tracking-[-0.02em] mb-2
                              text-[clamp(2rem,4vw,3.2rem)]">
                {value}
              </div>
              <div className="label text-anthracite/55 mb-1">{label}</div>
              <div className="font-sans text-[0.68rem] text-anthracite/30">{sub}</div>
            </div>
          ))}

          {/* CTA v posledním sloupci */}
          <div className="bg-anthracite px-7 py-8 flex flex-col justify-center gap-4 col-span-2 md:col-span-1">
            <p className="label text-white/40">Celá nabídka</p>
            <Link
              href="/byty"
              className="inline-flex items-center gap-2 font-sans text-[0.68rem]
                         tracking-[0.18em] uppercase text-white hover:text-brick
                         transition-colors duration-300"
            >
              Kouknout na nabídku <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
