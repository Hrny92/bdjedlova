"use client";

import Link  from "next/link";
import Image from "next/image";
import { useState } from "react";

const footerLinks = [
  { label: "O projektu",   href: "#o-projektu"  },
  { label: "Architektura", href: "#architektura" },
  { label: "Galerie",      href: "#galerie"      },
  { label: "Lokalita",     href: "#lokalita"     },
  { label: "Byty",         href: "/byty"         },
  { label: "Kontakt",      href: "#kontakt"      },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const handleAnchor = (href: string) => {
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-anthracite py-14 px-6 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end
                        justify-between gap-8 mb-12 pb-12 border-b border-white/8">
          {/* Logo + claim */}
          <div>
            <Link href="/">
              <Image
                src="/logo-white.svg"
                alt="BD Jedlová"
                width={140}
                height={40}
                className="mb-3"
              />
            </Link>
            <p className="label text-white/30">Plzeň · Prémiové bydlení</p>
          </div>

          {/* Rychlá navigace */}
          <nav>
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {footerLinks.map(({ label, href }) => (
                <li key={label}>
                  {href.startsWith("#") ? (
                    <button
                      onClick={() => handleAnchor(href)}
                      className="label text-white/35 hover:text-brick transition-colors duration-300"
                    >
                      {label}
                    </button>
                  ) : (
                    <Link
                      href={href}
                      className="label text-white/35 hover:text-brick transition-colors duration-300"
                    >
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Spodní řada */}
        <div className="flex flex-col md:flex-row items-start md:items-center
                        justify-between gap-4">
          <p className="font-sans text-[0.72rem] text-white/25">
            © {year} BD Jedlová. Všechna práva vyhrazena.
          </p>

          {/* Právní odkazy + cookies */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link
              href="/gdpr"
              className="font-sans text-[0.68rem] text-white/25 hover:text-brick
                         transition-colors duration-300 tracking-wide"
            >
              Ochrana osobních údajů
            </Link>
            <button
              onClick={() => {
                try { localStorage.removeItem("bdjjedlova_cookie_consent"); } catch {}
                window.location.reload();
              }}
              className="font-sans text-[0.68rem] text-white/25 hover:text-brick
                         transition-colors duration-300 tracking-wide"
            >
              Nastavení cookies
            </button>
            <p className="font-sans text-[0.72rem] text-white/20">
              Web vytvořil:{" "}
              <a
                href="https://www.hrncirovistudio.cz"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/40 transition-colors duration-300"
              >
                hrncirovistudio.cz
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
