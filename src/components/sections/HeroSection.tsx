"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeroSection() {
  const wrapperRef     = useRef<HTMLDivElement>(null);
  const doorLeftRef    = useRef<HTMLDivElement>(null);
  const doorRightRef   = useRef<HTMLDivElement>(null);
  const heroTextRef    = useRef<HTMLDivElement>(null);
  const scrollHintRef  = useRef<HTMLDivElement>(null);
  const section2Ref    = useRef<HTMLDivElement>(null);

  // Jeden video element → dva canvas → nulový desync, žádný šev
  const videoRef       = useRef<HTMLVideoElement>(null);
  const canvasLeftRef  = useRef<HTMLCanvasElement>(null);
  const canvasRightRef = useRef<HTMLCanvasElement>(null);
  const rafRef         = useRef<number>(0);

  useEffect(() => {
    let resizeFn: (() => void) | null = null;

    // ── Canvas render loop ────────────────────────────────────────────────────
    const video   = videoRef.current;
    const canvasL = canvasLeftRef.current;
    const canvasR = canvasRightRef.current;

    if (video && canvasL && canvasR) {
      const ctxL = canvasL.getContext("2d")!;
      const ctxR = canvasR.getContext("2d")!;
      const dpr  = window.devicePixelRatio || 1;

      // Nastav fyzické rozměry canvasu (= CSS px × DPR pro ostrý obraz)
      const setSize = () => {
        canvasL.width  = window.innerWidth  * dpr;
        canvasL.height = window.innerHeight * dpr;
        canvasR.width  = window.innerWidth  * dpr;
        canvasR.height = window.innerHeight * dpr;
      };
      setSize();
      resizeFn = setSize;
      window.addEventListener("resize", setSize);

      // object-fit: cover výpočet pro canvas
      const drawCover = (
        ctx: CanvasRenderingContext2D,
        vid: HTMLVideoElement,
        cw: number,
        ch: number,
      ) => {
        const vw = vid.videoWidth;
        const vh = vid.videoHeight;
        if (!vw || !vh) return;

        const vRatio = vw / vh;
        const cRatio = cw / ch;
        let dw: number, dh: number, dx = 0, dy = 0;

        if (vRatio > cRatio) {
          // video je relativně širší → fit height, crop width
          dh = ch; dw = ch * vRatio; dx = -(dw - cw) / 2;
        } else {
          // video je relativně užší → fit width, crop height
          dw = cw; dh = cw / vRatio; dy = -(dh - ch) / 2;
        }

        ctx.drawImage(vid, dx, dy, dw, dh);

        // Overlay — stejný pro oba → identické barvy bez odchylky
        ctx.fillStyle = "rgba(37,34,32,0.78)";
        ctx.fillRect(0, 0, cw, ch);
      };

      const loop = () => {
        if (video.readyState >= 2) {
          const cw = canvasL.width;
          const ch = canvasL.height;
          // Oba canvas kreslí ze stejného video elementu → stejný frame
          drawCover(ctxL, video, cw, ch);
          drawCover(ctxR, video, cw, ch);
        }
        rafRef.current = requestAnimationFrame(loop);
      };

      video.play().catch(() => {});
      rafRef.current = requestAnimationFrame(loop);
    }

    // ── GSAP ─────────────────────────────────────────────────────────────────
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      // Vstupní animace — spustí se jen pokud je stránka načtena u vrchu
      // (při reload uprostřed stránky scrub nastaví stav sám, text zůstane skrytý)
      const atTop = window.scrollY < window.innerHeight * 0.5;
      if (atTop) {
        gsap.fromTo(heroTextRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.4, delay: 0.3, ease: "power3.out" }
        );
        gsap.fromTo(scrollHintRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1, delay: 1.5, ease: "power2.out" }
        );
      }

      // Door scroll timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=130%",
          scrub: 1.2,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      // 1. Hero text zmizí — fromTo zajistí správné scrubování oběma směry
      tl.fromTo([heroTextRef.current, scrollHintRef.current],
        { opacity: 1, y: 0 },
        { opacity: 0, y: -20, duration: 0.2, ease: "power2.in" }
      )
      // 2. Dveře odjedou
      .to(doorLeftRef.current,  { x: "-100%", duration: 1, ease: "power2.inOut" }, "<0.05")
      .to(doorRightRef.current, { x: "100%",  duration: 1, ease: "power2.inOut" }, "<")
      // 3. Sekce 2 jemně vystoupí
      .from(section2Ref.current, { scale: 0.96, duration: 1, ease: "power2.out" }, "<0.1");

    }, wrapperRef);

    return () => {
      ctx.revert();
      cancelAnimationFrame(rafRef.current);
      if (resizeFn) window.removeEventListener("resize", resizeFn);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative h-screen overflow-hidden">

      {/* ── SEKCE 2 — za dveřmi, z-10 ── */}
      <div
        ref={section2Ref}
        id="o-projektu"
        className="absolute inset-0 z-10 bg-cream grid grid-cols-1 md:grid-cols-2"
      >
        {/* Levý panel */}
        <div className="flex flex-col justify-center px-6 py-8 md:px-16 md:py-20 lg:px-24
                        border-b md:border-b-0 md:border-r border-anthracite/10">
          <p className="label text-brick mb-4 md:mb-8">O projektu</p>
          <h2 className="heading-lg text-anthracite mb-4 md:mb-8">
            Bydlení<br />s charakterem.
          </h2>
          <div className="divider mb-4 md:mb-8" />
          <p className="body-sm text-anthracite/60 max-w-[36ch] mb-6 md:mb-10 text-[0.82rem] md:text-[0.9rem]">
            BD Jedlová uzavírá historickou proluku v centru Plzně. Čtyři podlaží,
            osm bytů, výrazná fasáda z tmavé lícové cihly a dřevěných lamel.
            Architektura, která ví, kde stojí.
          </p>
          <button
            onClick={() =>
              document.querySelector("#architektura")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="btn-outline-dark w-fit"
          >
            Zjistit více <span aria-hidden>→</span>
          </button>
        </div>

        {/* Pravý panel — stats */}
        <div className="flex flex-col justify-center px-6 py-8 md:px-16 md:py-20 lg:px-24">
          <p className="label text-anthracite/35 mb-6 md:mb-10">Projekt v číslech</p>
          <div className="grid grid-cols-2 gap-y-6 gap-x-8 md:gap-y-12">
            {[
              { value: "8",      label: "Bytových jednotek" },
              { value: "4",      label: "Nadzemní podlaží"  },
              { value: "10",     label: "Parkovacích míst"  },
              { value: "100 m²", label: "Největší byt"      },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="font-serif font-light text-[clamp(2rem,5vw,4.5rem)]
                                leading-none text-anthracite tracking-[-0.02em]">
                  {value}
                </div>
                <div className="label text-anthracite/35 mt-1 md:mt-2">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Skryté video — jediný zdroj pravdy ── */}
      <video
        ref={videoRef}
        autoPlay muted loop playsInline
        style={{ display: "none" }}
      >
        <source src="/video/hero-video.mp4" type="video/mp4" />
      </video>

      {/* ── LEVÉ KŘÍDLO — canvas kreslí levou polovinu videa ── */}
      <div
        ref={doorLeftRef}
        style={{
          position: "absolute",
          top: 0, left: 0,
          width: "50vw", height: "100vh",
          overflow: "hidden",
          zIndex: 20,
          backgroundColor: "rgb(37,34,32)", /* zakryje sekci 2 než se načte video */
        }}
      >
        <canvas
          ref={canvasLeftRef}
          style={{
            position: "absolute",
            top: 0, left: 0,
            width: "100vw", height: "100vh",
          }}
        />
      </div>

      {/* ── PRAVÉ KŘÍDLO — canvas kreslí pravou polovinu videa ── */}
      <div
        ref={doorRightRef}
        style={{
          position: "absolute",
          top: 0, right: 0,
          width: "50vw", height: "100vh",
          overflow: "hidden",
          zIndex: 20,
          backgroundColor: "rgb(37,34,32)", /* zakryje sekci 2 než se načte video */
        }}
      >
        <canvas
          ref={canvasRightRef}
          style={{
            position: "absolute",
            top: 0, right: 0,
            width: "100vw", height: "100vh",
          }}
        />
      </div>

      {/* ── HERO TEXT — z-30 ── */}
      <div
        ref={heroTextRef}
        className="gsap-init-hidden absolute inset-0 z-30 flex flex-col items-center justify-center
                   text-center px-6 pointer-events-none"
      >
        <p className="label text-white/50 mb-6 tracking-widest2">
          Plzeň · Jedlová · 8 bytů
        </p>
        <h1 className="heading-xl text-white mb-6">
          Bydlení<br />
          <em className="text-brick-muted">s charakterem.</em>
        </h1>
        <p className="font-sans text-[0.85rem] tracking-[0.18em] text-white/40 uppercase">
          Centrum Plzně · Prémiová architektura
        </p>
      </div>

      {/* ── SCROLL HINT — z-30 ── */}
      <div
        ref={scrollHintRef}
        className="gsap-init-hidden absolute bottom-10 left-1/2 -translate-x-1/2 z-30
                   flex flex-col items-center gap-2 pointer-events-none"
      >
        <div className="w-px h-10 bg-white/20 scroll-hint-line" />
        <span className="label text-white/30 text-[0.6rem] tracking-widest2">Scroll</span>
      </div>

    </div>
  );
}
