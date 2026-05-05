"use client";

import { useState, useEffect } from "react";
import { useContactModal } from "@/context/ContactModalContext";
import Navigation from "@/components/Navigation";
import Footer     from "@/components/Footer";
import Link       from "next/link";
import Image      from "next/image";
import { useRouter } from "next/navigation";
import { client } from "@/sanity/client";
import { apartmentsQuery } from "@/sanity/queries";

// ── Typy ───────────────────────────────────────────────────────────────────────
type Apartment = {
  id: number;
  type: string;
  floor: string;
  floorNum: number;
  area: number;
  terrace: number | null;
  tag: string | null;
  price: string;
  status: string;
};

// ── Lokální fallback data ──────────────────────────────────────────────────────
const localApartments: Apartment[] = [
  { id: 1, type: "3+kk",         floor: "2. NP", floorNum: 2, area: 59.86,  terrace: null,  tag: null,            price: "7 480 000 Kč",  status: "Volný" },
  { id: 2, type: "1+kk",         floor: "2. NP", floorNum: 2, area: 50.64,  terrace: 8.12,  tag: "Terasa",        price: "6 330 000 Kč",  status: "Volný" },
  { id: 3, type: "1+kk",         floor: "2. NP", floorNum: 2, area: 54.03,  terrace: 25.81, tag: "Velká terasa",  price: "6 750 000 Kč",  status: "Volný" },
  { id: 4, type: "3+kk",         floor: "3. NP", floorNum: 3, area: 59.86,  terrace: null,  tag: null,            price: "7 480 000 Kč",  status: "Volný" },
  { id: 5, type: "1+kk",         floor: "3. NP", floorNum: 3, area: 50.64,  terrace: 8.12,  tag: "Terasa",        price: "6 330 000 Kč",  status: "Volný" },
  { id: 6, type: "1+kk kompakt", floor: "3. NP", floorNum: 3, area: 28.23,  terrace: null,  tag: "Investice",     price: "3 530 000 Kč",  status: "Volný" },
  { id: 7, type: "1+kk",         floor: "4. NP", floorNum: 4, area: 29.53,  terrace: null,  tag: null,            price: "3 690 000 Kč",  status: "Volný" },
  { id: 8, type: "3+kk",         floor: "4. NP", floorNum: 4, area: 100.38, terrace: 28.25, tag: "Penthouse",     price: "12 550 000 Kč", status: "Volný" },
];

// ── SVG zóny podlaží ───────────────────────────────────────────────────────────
const floorZones = [
  {
    floorNum: 4,
    label: "4. NP",
    points: "763.49,280.73 763.49,289.49 765.25,289.49 765.25,340.13 766.7,340.13 767.03,605.45 1578.66,631.7 1578.66,584.3 1575.79,584.06 1577.06,512.33 1495.44,507.62 1499.2,419.93 1219,404.09 1219,327.28 1221.74,319.97 1222.19,313.81",
  },
  {
    floorNum: 3,
    label: "3. NP",
    points: "768.89,852.57 1578.66,858.13 1578.66,631.7 767.03,605.45",
  },
  {
    floorNum: 2,
    label: "2. NP",
    points: "768.95,1103.26 1196.48,1095.9 1315.67,1221.7 1318.17,1162.44 1865.01,1138.65 1685.88,1078.94 1686.6,1009.36 1578.66,990.71 1578.66,858.13 768.89,852.57",
  },
];

// ── Barva stavu ────────────────────────────────────────────────────────────────
function statusColor(status: string) {
  if (status === "Prodáno")     return "bg-red-400";
  if (status === "Rezervováno") return "bg-yellow-400";
  return "bg-green-500";
}

// ── Komponenta ─────────────────────────────────────────────────────────────────
export default function BytyPage() {
  const router = useRouter();
  const { open: openModal } = useContactModal();

  const [apartments, setApartments] = useState<Apartment[]>(localApartments);
  const [activeFloor,  setActiveFloor]  = useState<number>(2);
  const [hoveredFloor, setHoveredFloor] = useState<number | null>(null);

  // ── Načti byty ze Sanity ─────────────────────────────────────────────────
  useEffect(() => {
    client.fetch(apartmentsQuery)
      .then((data: Apartment[] | null) => {
        if (data && data.length > 0) {
          setApartments(data);
        }
      })
      .catch(() => {
        // Fallback na lokální data
      });
  }, []);

  const filtered = apartments.filter(a => a.floorNum === activeFloor);
  const selectFloor = (f: number) => setActiveFloor(f);

  return (
    <>
      <Navigation dark />

      <main className="pt-28 pb-28 md:pb-40 bg-white min-h-screen">

        {/* ── Záhlaví ─────────────────────────────────────────────────────── */}
        <div className="px-6 md:px-10 lg:px-20 mb-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-10">
              <Link href="/" className="label text-anthracite/35 hover:text-brick transition-colors duration-300">
                BD Jedlová
              </Link>
              <span className="label text-anthracite/20">›</span>
              <span className="label text-anthracite/50">Nabídka bytů</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <p className="label text-brick mb-6">Nabídka bytů</p>
                <h1 className="heading-lg text-anthracite">
                  8 bytů. Každý jiný.
                </h1>
              </div>
              
            </div>
          </div>
        </div>

        {/* ── Interaktivní mapa + tabulka ─────────────────────────────────── */}
        <div className="px-6 md:px-10 lg:px-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

            {/* Mapa budovy */}
            <div className="sticky top-28">
              <p className="label text-anthracite/40 mb-4">
                Vyberte podlaží — kliknutím filtrujete nabídku
              </p>

              <div className="relative w-full overflow-hidden bg-cream">
                <Image
                  src="/images/budova-podlazi.webp"
                  alt="BD Jedlová — interaktivní mapa podlaží"
                  width={2400}
                  height={1792}
                  className="w-full h-auto"
                  priority
                />

                {/* SVG overlay se zónami podlaží */}
                <svg
                  viewBox="0 0 2400 1792"
                  className="absolute inset-0 w-full h-full"
                  style={{ top: 0, left: 0 }}
                >
                  {floorZones.map(({ floorNum, label, points }) => {
                    const isActive  = activeFloor  === floorNum;
                    const isHovered = hoveredFloor === floorNum;
                    return (
                      <g key={floorNum}>
                        <polygon
                          points={points}
                          fill={
                            isActive  ? "rgba(158,72,34,0.35)" :
                            isHovered ? "rgba(158,72,34,0.20)" :
                            "rgba(37,34,32,0.01)"
                          }
                          stroke={
                            isActive || isHovered
                              ? "rgba(158,72,34,0.7)"
                              : "rgba(255,255,255,0.25)"
                          }
                          strokeWidth={isActive ? "6" : "3"}
                          className="cursor-pointer transition-all duration-200"
                          onMouseEnter={() => setHoveredFloor(floorNum)}
                          onMouseLeave={() => setHoveredFloor(null)}
                          onClick={() => selectFloor(floorNum)}
                        />
                        {(isHovered || isActive) && (
                          <text
                            x={points.split(" ")[0].split(",")[0]}
                            y={(() => {
                              const ys = points.split(" ").map(p => parseFloat(p.split(",")[1]));
                              return (Math.min(...ys) + Math.max(...ys)) / 2 + 14;
                            })()}
                            dx="32"
                            fill="white"
                            fontSize="52"
                            fontFamily="serif"
                            fontWeight="300"
                            style={{ pointerEvents: "none", userSelect: "none" }}
                          >
                            {label}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Legenda podlaží */}
              <div className="flex gap-3 mt-4 flex-wrap">
                {floorZones.map(({ floorNum, label }) => (
                  <button
                    key={floorNum}
                    onClick={() => selectFloor(floorNum)}
                    className={`
                      font-sans text-[0.65rem] tracking-[0.18em] uppercase px-4 py-2
                      border transition-all duration-200
                      ${activeFloor === floorNum
                        ? "bg-brick border-brick text-white"
                        : "border-anthracite/20 text-anthracite/60 hover:border-brick hover:text-brick"
                      }
                    `}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tabulka bytů */}
            <div>

              {/* Hlavička */}
              <div className="grid grid-cols-[2rem_1fr_6rem_8rem_4rem] gap-4
                              pb-3 border-b border-anthracite/10">
                {["#", "Byt", "Plocha", "Cena", "Stav"].map(h => (
                  <span key={h} className="label text-anthracite/35">{h}</span>
                ))}
              </div>

              {/* Řádky */}
              {filtered.map(apt => (
                <div
                  key={apt.id}
                  onClick={() => router.push(`/byty/${apt.id}`)}
                  className="group grid grid-cols-[2rem_1fr_6rem_8rem_4rem] gap-4
                             items-center py-6 border-b border-anthracite/8
                             hover:bg-cream transition-colors duration-300 px-2 -mx-2 cursor-pointer"
                >
                  {/* # */}
                  <span className="font-sans text-[0.72rem] text-anthracite/25">
                    {String(apt.id).padStart(2, "0")}
                  </span>

                  {/* Typ + tag */}
                  <div className="flex flex-col gap-1">
                    <span className="font-serif text-xl text-anthracite">{apt.type}</span>
                    {apt.tag && (
                      <span className="font-sans text-[0.58rem] tracking-[0.18em] uppercase
                                       px-2 py-0.5 bg-brick/10 text-brick w-fit">
                        {apt.tag}
                      </span>
                    )}
                  </div>

                  {/* Plocha */}
                  <span className="font-serif text-lg text-anthracite">
                    {apt.area.toLocaleString("cs")} m²
                  </span>

                  {/* Cena */}
                  <span className="font-sans text-[0.78rem] text-anthracite font-medium">
                    {apt.price}
                  </span>

                  {/* Stav */}
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusColor(apt.status)}`} />
                    <span className="body-sm text-anthracite/50 text-[0.72rem]">{apt.status}</span>
                  </div>
                </div>
              ))}

              {/* CTA */}
              <div className="mt-10 pt-8 border-t border-anthracite/8 flex justify-end">
                <button onClick={() => openModal()} className="btn-filled">
                  Mám zájem o byt
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
