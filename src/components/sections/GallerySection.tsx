"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { client } from "@/sanity/client";
import { mainGalleryQuery } from "@/sanity/queries";

// ── Lokální fallback obrázky ───────────────────────────────────────────────────
const localImages = [
  { src: "/images/gallery/exterier-1.webp", alt: "BD Jedlová — pohled z ulice" },
  { src: "/images/gallery/exterier-2.webp", alt: "BD Jedlová — fasáda z tmavé lícové cihly" },
  { src: "/images/gallery/exterier-3.webp", alt: "BD Jedlová — vstup a parkoviště" },
  { src: "/images/gallery/interior-byt1.webp", alt: "BD Jedlová — interiér bytu 1" },
  { src: "/images/gallery/exterier-4.webp", alt: "BD Jedlová — balkóny a dřevěné lamely" },
  { src: "/images/gallery/exterier-5.webp", alt: "BD Jedlová — noční pohled" },
  { src: "/images/gallery/interior-byt2.webp", alt: "BD Jedlová — interiér bytu 2" },
  { src: "/images/gallery/exterier-6.webp", alt: "BD Jedlová — detail fasády" },
  { src: "/images/gallery/exterier-7.webp", alt: "BD Jedlová — pohled ze dvora" },
  { src: "/images/gallery/interior-byt3.webp", alt: "BD Jedlová — interiér bytu 3" },
  { src: "/images/gallery/exterier-8.webp", alt: "BD Jedlová — celkový pohled" },
];

type GalleryImage = { src: string; alt: string };

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  const [images, setImages] = useState<GalleryImage[]>(localImages);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // ── Načti galerii ze Sanity (pokud je dostupná) ───────────────────────────
  useEffect(() => {
    client.fetch(mainGalleryQuery)
      .then((data: { images?: Array<{ asset: { url: string }; alt?: string }> } | null) => {
        if (data?.images && data.images.length > 0) {
          const mapped: GalleryImage[] = data.images.map(img => ({
            src: img.asset.url,
            alt: img.alt ?? "BD Jedlová — vizualizace",
          }));
          setImages(mapped);
        }
      })
      .catch(() => {
        // Fallback na lokální obrázky — Sanity ještě není nastaveno
      });
  }, []);

  // ── Lightbox ovládání ──────────────────────────────────────────────────────
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goPrev = useCallback(() =>
    setLightboxIndex(i => i !== null ? (i - 1 + images.length) % images.length : null), [images.length]);
  const goNext = useCallback(() =>
    setLightboxIndex(i => i !== null ? (i + 1) % images.length : null), [images.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape")     closeLightbox();
      if (e.key === "ArrowLeft")  goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, closeLightbox, goPrev, goNext]);

  // Zablokuj scroll těla, když je lightbox otevřený
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  // ── GSAP ───────────────────────────────────────────────────────────────────
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: { trigger: headingRef.current, start: "top 82%" },
        opacity: 0, y: 40, duration: 1.1, ease: "power3.out",
      });
      gsap.from(gridRef.current?.children ?? [], {
        scrollTrigger: { trigger: gridRef.current, start: "top 78%" },
        opacity: 0, y: 30, duration: 0.9,
        stagger: 0.12, ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="galerie"
        className="bg-white py-28 md:py-40 px-6 md:px-10 lg:px-20"
      >
        <div className="max-w-7xl mx-auto">

          {/* Záhlaví */}
          <div ref={headingRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 md:mb-20">
            <div>
              <p className="label text-brick mb-6">Vizualizace</p>
              <h2 className="heading-lg text-anthracite">
                Dům<br />
                v obrazech.
              </h2>
            </div>
            <div className="flex flex-col justify-center">
              <div className="divider mb-6" />
              <p className="body-sm text-anthracite/55 max-w-[64ch]">
                Vizualizace zachycují výslednou podobu budovy — fasádu z tmavé lícové
                cihly, dřevěné lamelové prvky a prostorné terasy s výhledem na centrum Plzně.
              </p>
            </div>
          </div>

          {/*
            Layout: 1 velký obrázek vlevo + 2 menší vpravo (vpravo dole = třetí s CTA)
          */}
          <div ref={gridRef} className="grid grid-cols-2 grid-rows-2 gap-3 h-[70vh] min-h-[480px]">

            {/* Velký vlevo — zabírá oba řádky */}
            <div
              className="row-span-2 relative overflow-hidden group cursor-pointer bg-anthracite/10"
              onClick={() => setLightboxIndex(0)}
            >
              <Image
                src={images[0].src}
                alt={images[0].alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                quality={85}
              />
            </div>

            {/* Pravý horní */}
            <div
              className="relative overflow-hidden group cursor-pointer bg-anthracite/10"
              onClick={() => setLightboxIndex(1)}
            >
              <Image
                src={images[1].src}
                alt={images[1].alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                quality={85}
              />
            </div>

            {/* Pravý dolní — s CTA překryvem */}
            <div
              className="relative overflow-hidden cursor-pointer group bg-anthracite/10"
              onClick={() => setLightboxIndex(2)}
            >
              <Image
                src={images[2].src}
                alt={images[2].alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                quality={85}
              />
              {/* Tmavý overlay s tlačítkem */}
              <div className="absolute inset-0 bg-anthracite/55 flex flex-col items-center justify-center gap-3 px-4">
                <button
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(0); }}
                  className="font-sans text-[0.6rem] md:text-[0.68rem] tracking-[0.15em] md:tracking-[0.2em] uppercase
                             text-white border border-white/50 px-3 py-2.5 md:px-6 md:py-3
                             w-full max-w-[180px] text-center
                             hover:bg-white hover:text-anthracite
                             transition-all duration-300"
                >
                  Zobrazit fotografie
                </button>
                <span className="label text-white/40 text-[0.55rem] md:text-[0.68rem]">{images.length} vizualizací</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Lightbox (portal → mimo transform kontext GSAP) ────────────────── */}
      {lightboxIndex !== null && mounted && createPortal(
        <div
          style={{ position: "fixed", inset: 0, zIndex: 9999, backgroundColor: "rgba(0,0,0,0.95)", display: "flex", alignItems: "center", justifyContent: "center" }}
          onClick={closeLightbox}
        >
          {/* Obrázek */}
          <div
            style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 80px 96px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ position: "relative", width: "100%", height: "100%", maxWidth: "1100px" }}>
              <Image
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].alt}
                fill
                className="object-contain"
                priority
                sizes="100vw"
              />
            </div>
          </div>

          {/* Horní lišta */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", pointerEvents: "none" }}>
            <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.68rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>
              BD Jedlová — Vizualizace
            </span>
            <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.68rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)" }}>
              {lightboxIndex + 1} / {images.length}
            </span>
          </div>

          {/* Zavřít */}
          <button
            onClick={closeLightbox}
            aria-label="Zavřít"
            style={{ position: "absolute", top: "16px", right: "20px", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.6)", background: "none", border: "none", cursor: "pointer" }}
            onMouseEnter={e => (e.currentTarget.style.color = "white")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="2" y1="2" x2="20" y2="20" />
              <line x1="20" y1="2" x2="2" y2="20" />
            </svg>
          </button>

          {/* Šipka vlevo */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            aria-label="Předchozí"
            style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.6)", background: "none", border: "none", cursor: "pointer" }}
            onMouseEnter={e => (e.currentTarget.style.color = "white")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <polyline points="18,4 8,14 18,24" />
            </svg>
          </button>

          {/* Šipka vpravo */}
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            aria-label="Další"
            style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.6)", background: "none", border: "none", cursor: "pointer" }}
            onMouseEnter={e => (e.currentTarget.style.color = "white")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <polyline points="10,4 20,14 10,24" />
            </svg>
          </button>

          {/* Thumbnaily dole */}
          <div
            style={{ position: "absolute", bottom: 0, left: 0, right: 0, display: "flex", justifyContent: "center", gap: "8px", padding: "16px 24px", overflowX: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setLightboxIndex(idx)}
                style={{
                  position: "relative", flexShrink: 0, width: "56px", height: "40px", overflow: "hidden",
                  opacity: idx === lightboxIndex ? 1 : 0.35,
                  outline: idx === lightboxIndex ? "1px solid white" : "none",
                  background: "none", border: "none", cursor: "pointer", padding: 0,
                }}
              >
                <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="56px" />
              </button>
            ))}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
