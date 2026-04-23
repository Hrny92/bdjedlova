"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link  from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useContactModal } from "@/context/ContactModalContext";

const navLinks = [
  { label: "O projektu",   href: "#o-projektu",  num: "01" },
  { label: "Architektura", href: "#architektura", num: "02" },
  { label: "Galerie",      href: "#galerie",      num: "03" },
  { label: "Lokalita",     href: "#lokalita",     num: "04" },
  { label: "Byty",         href: "/byty",         num: "05" },
  { label: "Služby",       href: "#sluzby",       num: "06" },
  { label: "Kontakt",      href: "#kontakt",      num: "07" },
];

export default function Navigation({ dark = false }: { dark?: boolean }) {
  const { open: openModal } = useContactModal();
  const navRef   = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLLIElement[]>([]);
  const lineRef  = useRef<HTMLDivElement>(null);

  const [scrolled,  setScrolled]  = useState(dark);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [animating, setAnimating] = useState(false);

  // Nav fade-in + scroll listener
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(navRef.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 1, delay: 0.4, ease: "power2.out" }
    );
    const handleScroll = () => setScrolled(dark || window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dark]);

  // Panel animace při otevření / zavření
  useEffect(() => {
    if (!panelRef.current) return;
    setAnimating(true);

    if (menuOpen) {
      // Zablokuj scroll
      document.body.style.overflow = "hidden";

      // Panel slide-in
      gsap.fromTo(panelRef.current,
        { x: 300 },
        { x: 0, duration: 0.55, ease: "power3.out",
          onComplete: () => setAnimating(false) }
      );
      // Backdrop fade-in
      gsap.fromTo(backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
      // Dekorativní linka — výška 0 → 100%
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        { scaleY: 1, duration: 0.6, delay: 0.15, ease: "power3.out", transformOrigin: "top" }
      );
      // Linky — stagger zprava
      gsap.fromTo(linksRef.current,
        { x: 24, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.45, delay: 0.2,
          stagger: 0.06, ease: "power3.out",
          onComplete: () => setAnimating(false) }
      );
    } else {
      // Panel slide-out
      gsap.to(panelRef.current,
        { x: 300, duration: 0.4, ease: "power3.in" }
      );
      // Backdrop fade-out
      gsap.to(backdropRef.current,
        { opacity: 0, duration: 0.35, ease: "power2.in",
          onComplete: () => {
            document.body.style.overflow = "";
            setAnimating(false);
          }
        }
      );
    }
  }, [menuOpen]);

  // Zavřít na Escape
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  const pathname = usePathname();

  const handleLinkClick = (href: string) => {
    setMenuOpen(false);
    if (!href.startsWith("#")) { window.location.href = href; return; }
    if (pathname === "/") {
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }, 450); // počkej na zavření panelu
    } else {
      window.location.href = "/" + href;
    }
  };

  return (
    <>
      {/* ── Navbar ── */}
      <nav
        ref={navRef}
        className={`
          fixed top-0 left-0 right-0 z-50 px-6 md:px-10 lg:px-16
          transition-all duration-500
          ${menuOpen ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"}
          ${scrolled
            ? "py-4 bg-white/95 backdrop-blur-md border-b border-anthracite/8 shadow-sm"
            : "py-6 bg-transparent"
          }
        `}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative block">
            <Image src="/logo-white.svg" alt="BD Jedlová" width={140} height={40} priority
              className={`transition-opacity duration-500 ${scrolled ? "opacity-0 absolute inset-0" : "opacity-100"}`}
            />
            <Image src="/logo-dark.svg" alt="BD Jedlová" width={140} height={40} priority
              className={`transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0 absolute inset-0"}`}
            />
          </Link>

          {/* Pravá strana */}
          <div className="flex items-center gap-5">
            {/* Mám zájem — skryje se při otevřeném menu */}
            <button
              onClick={() => openModal()}
              className={`
                font-sans text-[0.68rem] tracking-[0.22em] uppercase px-5 py-2.5
                border transition-all duration-300
                ${menuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}
                ${scrolled
                  ? "border-anthracite/25 text-anthracite hover:border-brick hover:text-brick"
                  : "border-white/30 text-white hover:border-white hover:text-white"
                }
              `}
            >
              Mám zájem
            </button>

            {/* Hamburger — jen tři čáry, bez X (X je v panelu) */}
            <button
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Otevřít menu"
              className={`relative flex flex-col gap-[5px] p-1 transition-colors duration-300
                ${menuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}
                ${scrolled ? "text-anthracite" : "text-white"}`}
            >
              <span className="block w-6 h-px bg-current" />
              <span className="block w-4 h-px bg-current" />
              <span className="block w-6 h-px bg-current" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Backdrop — nad navbarem ── */}
      <div
        ref={backdropRef}
        onClick={() => setMenuOpen(false)}
        style={{ opacity: 0 }}
        className={`fixed inset-0 z-[51] backdrop-blur-sm
          ${scrolled ? "bg-anthracite/20" : "bg-anthracite/60"}
          ${menuOpen || animating ? "pointer-events-auto" : "pointer-events-none"}`}
      />

      {/* ── Panel — nad backdropem ── */}
      <div
        ref={panelRef}
        style={{ transform: "translateX(300px)" }}
        className={`fixed top-0 right-0 bottom-0 z-[52] w-[300px] flex flex-col overflow-hidden
          ${scrolled ? "bg-white shadow-xl" : "bg-anthracite"}`}
      >
        {/* Dekorativní cihlová linka vlevo */}
        <div
          ref={lineRef}
          style={{ transform: "scaleY(0)", transformOrigin: "top" }}
          className="absolute left-0 top-0 bottom-0 w-[3px] bg-brick"
        />

        {/* Horní lišta panelu */}
        <div className={`flex items-center justify-between px-8 pt-7 pb-6 border-b
          ${scrolled ? "border-anthracite/10" : "border-white/8"}`}
        >
          <span className={`label tracking-[0.25em]
            ${scrolled ? "text-anthracite/30" : "text-white/25"}`}>
            Navigace
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            className={`w-8 h-8 flex items-center justify-center transition-colors duration-200
              ${scrolled
                ? "text-anthracite/35 hover:text-anthracite"
                : "text-white/40 hover:text-white"}`}
            aria-label="Zavřít"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
              <line x1="2" y1="2" x2="16" y2="16"/>
              <line x1="16" y1="2" x2="2" y2="16"/>
            </svg>
          </button>
        </div>

        {/* Linky */}
        <ul className="flex flex-col flex-1 px-8 py-6">
          {navLinks.map((link, i) => (
            <li
              key={link.href}
              ref={el => { if (el) linksRef.current[i] = el; }}
              style={{ opacity: 0 }}
              className={`border-b last:border-0
                ${scrolled ? "border-anthracite/8" : "border-white/8"}`}
            >
              <button
                onClick={() => handleLinkClick(link.href)}
                className="group w-full flex items-baseline gap-4 py-4
                           hover:text-brick transition-colors duration-300"
              >
                <span className={`label transition-colors duration-300 shrink-0 w-5 text-right
                  group-hover:text-brick/60
                  ${scrolled ? "text-anthracite/25" : "text-white/20"}`}>
                  {link.num}
                </span>
                <span className={`font-serif text-[1.25rem] leading-none transition-colors duration-300
                  group-hover:text-brick
                  ${scrolled ? "text-anthracite/80" : "text-white/85"}`}>
                  {link.label}
                </span>
              </button>
            </li>
          ))}
        </ul>

        {/* Spodní část — CTA */}
        <div className={`px-8 py-7 border-t
          ${scrolled ? "border-anthracite/10" : "border-white/8"}`}
        >
          <button
            onClick={() => { setMenuOpen(false); openModal(); }}
            className={scrolled ? "btn-outline-dark w-full justify-center" : "btn-outline-light w-full justify-center"}
          >
            Mám zájem o byt
          </button>
          <p className={`label mt-5 text-center
            ${scrolled ? "text-anthracite/25" : "text-white/20"}`}>
            BD Jedlová · Plzeň
          </p>
        </div>
      </div>
    </>
  );
}
