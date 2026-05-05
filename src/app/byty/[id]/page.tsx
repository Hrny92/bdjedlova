"use client";

import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { notFound } from "next/navigation";
import { useContactModal } from "@/context/ContactModalContext";
import Navigation from "@/components/Navigation";
import Footer     from "@/components/Footer";
import Link       from "next/link";
import Image      from "next/image";
import { client } from "@/sanity/client";
import { apartmentByIdQuery } from "@/sanity/queries";

// ── Typy ───────────────────────────────────────────────────────────────────────
type SanityApartment = {
  id: number;
  type: string;
  floor: string;
  floorNum: number;
  area: number;
  terrace: number | null;
  tag: string | null;
  price: string;
  status: string;
  description?: string;
  features?: string[];
  floorPlan?: { asset: { _id: string; url: string } };
  gallery?: Array<{ asset: { _id: string; url: string; metadata?: { dimensions?: { width: number; height: number } } }; alt?: string }>;
  documents?: Array<{ label: string; asset: { _id: string; url: string; originalFilename: string } }>;
};

// ── Lokální fallback data ──────────────────────────────────────────────────────
const localApartments = [
  {
    id: 1, type: "3+kk", floor: "2. NP", floorNum: 2, area: 59.86, terrace: null,
    tag: null, price: "7 480 000 Kč", status: "Volný",
    description: "Prostorný byt 3+kk ve druhém nadzemním podlaží. Dispozice nabízí oddělené pokoje s přirozeným osvětlením, plně vybavenou kuchyni s obývacím prostorem a koupelnu s WC. Součástí bytu je sklepní kója a parkovací místo v krytém parkovišti.",
    features: ["Sklepní kója", "Parkovací místo", "Koupelna s WC", "Šatna"],
    photos: [1,2,3,4,5,7,8,9,10],
    hasPlan: true,
  },
  {
    id: 2, type: "1+kk", floor: "2. NP", floorNum: 2, area: 50.64, terrace: 8.12,
    tag: "Terasa", price: "6 330 000 Kč", status: "Volný",
    description: "Vzdušný byt 1+kk s terasou 8 m² ve druhém nadzemním podlaží. Terasa navazuje přímo na obývací prostor s kuchyní a nabízí výhled do klidného zátiší. Ideální pro páry nebo investici.",
    features: ["Terasa 8 m²", "Sklepní kója", "Parkovací místo", "Koupelna s WC"],
    photos: [1,2,3,4,5,6,7],
    hasPlan: true,
  },
  {
    id: 3, type: "1+kk", floor: "2. NP", floorNum: 2, area: 54.03, terrace: 25.81,
    tag: "Velká terasa", price: "6 750 000 Kč", status: "Volný",
    description: "Výjimečný byt 1+kk s rozsáhlou terasou 25,8 m² — největší na celém 2. NP. Terasa umožňuje venkovní sezení, pěstování zeleně i soukromé posezení. Orientace do klidné části pozemku.",
    features: ["Terasa 25,8 m²", "Sklepní kója", "Parkovací místo", "Koupelna s WC"],
    photos: [1,2,3,4,5,6,7,8,9,10,11],
    hasPlan: true,
  },
  {
    id: 4, type: "3+kk", floor: "3. NP", floorNum: 3, area: 59.86, terrace: null,
    tag: null, price: "7 480 000 Kč", status: "Volný",
    description: "Byt 3+kk ve třetím nadzemním podlaží se světlou dispozicí a výhledem do okolní zástavby. Tři oddělené místnosti poskytují dostatečný prostor pro rodinu. Součástí sklepní kója a parkovací místo.",
    features: ["Sklepní kója", "Parkovací místo", "Koupelna s WC", "Šatna"],
    photos: [1,2,3,4,5,6],
    hasPlan: true,
  },
  {
    id: 5, type: "1+kk", floor: "3. NP", floorNum: 3, area: 50.64, terrace: 8.12,
    tag: "Terasa", price: "6 330 000 Kč", status: "Volný",
    description: "Byt 1+kk s terasou 8 m² ve třetím nadzemním podlaží. Díky vyšší poloze byt nabízí příjemnější výhledy než srovnatelné jednotky ve druhém patře. Kompaktní dispozice vhodná pro jednotlivce nebo pár.",
    features: ["Terasa 8 m²", "Sklepní kója", "Parkovací místo", "Koupelna s WC"],
    photos: [1,2,3,4,6,7,8,9,10,11,12],
    hasPlan: true,
  },
  {
    id: 6, type: "1+kk kompakt", floor: "3. NP", floorNum: 3, area: 28.23, terrace: null,
    tag: "Investice", price: "3 530 000 Kč", status: "Volný",
    description: "Kompaktní investiční jednotka 1+kk ve třetím nadzemním podlaží. Efektivně řešená dispozice na 28 m² — ideální pro krátkodobé nebo dlouhodobé pronájmy v centru Plzně. Výborný poměr ceny a výnosu.",
    features: ["Sklepní kója", "Parkovací místo", "Koupelna s WC", "Investiční potenciál"],
    photos: [],
    hasPlan: false,
  },
  {
    id: 7, type: "1+kk", floor: "4. NP", floorNum: 4, area: 29.53, terrace: null,
    tag: null, price: "3 690 000 Kč", status: "Volný",
    description: "Byt 1+kk ve čtvrtém nadzemním podlaží s výhledem přes střechy okolní zástavby. Světlá místnost s kuchyňským koutem, koupelna a šatní prostor. Klidná poloha v nejvyšším podlaží budovy.",
    features: ["Sklepní kója", "Parkovací místo", "Koupelna s WC", "Nejvyšší podlaží"],
    photos: [],
    hasPlan: false,
  },
  {
    id: 8, type: "3+kk", floor: "4. NP", floorNum: 4, area: 100.38, terrace: 28.25,
    tag: "Penthouse", price: "12 550 000 Kč", status: "Volný",
    description: "Výjimečný penthouse 3+kk o rozloze 100 m² ve čtvrtém nadzemním podlaží. Dvě terasy s celkovou plochou 28 m², šatna, velkorysý obývací prostor a prémiové vybavení. Nejprestižnější jednotka celého projektu BD Jedlová.",
    features: ["Terasy 28 m²", "Šatna", "Sklepní kója", "Parkovací místo", "Koupelna + WC", "Prémiové podlaží"],
    photos: [],
    hasPlan: false,
  },
];

// ── Barva stavu ────────────────────────────────────────────────────────────────
function statusColor(status: string) {
  if (status === "Prodáno")     return "bg-red-400";
  if (status === "Rezervováno") return "bg-yellow-400";
  return "bg-green-500";
}

// ── Lightbox (portal → mimo transform kontext) ─────────────────────────────────
function Lightbox({ images, index, onClose, onPrev, onNext, onSelect }: {
  images: string[], index: number,
  onClose: () => void, onPrev: () => void, onNext: () => void,
  onSelect: (i: number) => void,
}) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowLeft")  onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return createPortal(
    <div
      style={{ position: "fixed", inset: 0, zIndex: 9999, backgroundColor: "rgba(0,0,0,0.95)", display: "flex", alignItems: "center", justifyContent: "center" }}
      onClick={onClose}
    >
      {/* Obrázek */}
      <div
        style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 80px 96px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ position: "relative", width: "100%", height: "100%", maxWidth: "1100px" }}>
          <Image src={images[index]} alt="" fill className="object-contain" priority sizes="100vw"/>
        </div>
      </div>

      {/* Horní lišta */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px 24px", pointerEvents: "none" }}>
        <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.68rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)" }}>
          {index + 1} / {images.length}
        </span>
      </div>

      {/* Zavřít */}
      <button
        onClick={onClose}
        aria-label="Zavřít"
        style={{ position: "absolute", top: "16px", right: "20px", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.6)", background: "none", border: "none", cursor: "pointer" }}
        onMouseEnter={e => (e.currentTarget.style.color = "white")}
        onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="2" y1="2" x2="20" y2="20"/><line x1="20" y1="2" x2="2" y2="20"/>
        </svg>
      </button>

      {/* Šipka vlevo */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Předchozí"
        style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.6)", background: "none", border: "none", cursor: "pointer" }}
        onMouseEnter={e => (e.currentTarget.style.color = "white")}
        onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <polyline points="18,4 8,14 18,24"/>
        </svg>
      </button>

      {/* Šipka vpravo */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Další"
        style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.6)", background: "none", border: "none", cursor: "pointer" }}
        onMouseEnter={e => (e.currentTarget.style.color = "white")}
        onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <polyline points="10,4 20,14 10,24"/>
        </svg>
      </button>

      {/* Thumbnaily dole */}
      <div
        style={{ position: "absolute", bottom: 0, left: 0, right: 0, display: "flex", justifyContent: "center", gap: "8px", padding: "16px 24px", overflowX: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            style={{
              position: "relative", flexShrink: 0, width: "48px", height: "36px", overflow: "hidden",
              opacity: i === index ? 1 : 0.3,
              outline: i === index ? "1px solid white" : "none",
              background: "none", border: "none", cursor: "pointer", padding: 0,
            }}
          >
            <Image src={src} alt="" fill className="object-cover" sizes="48px"/>
          </button>
        ))}
      </div>
    </div>,
    document.body
  );
}

// ── Stránka detailu bytu ───────────────────────────────────────────────────────
export default function BytDetail({ params }: { params: { id: string } }) {
  const numId = Number(params.id);
  const localApt = localApartments.find(a => a.id === numId);
  if (!localApt) notFound();

  const { open: openModal } = useContactModal();

  // Sanity data (null = ještě nenačteno / nedostupné)
  const [sanityApt, setSanityApt] = useState<SanityApartment | null>(null);

  useEffect(() => {
    client.fetch(apartmentByIdQuery, { id: numId })
      .then((data: SanityApartment | null) => {
        if (data) setSanityApt(data);
      })
      .catch(() => {
        // Fallback na lokální data
      });
  }, [numId]);

  // ── Sloučení dat: Sanity přebíjí lokální, lokální slouží jako záloha ─────
  const apt = {
    ...localApt,
    type:        sanityApt?.type        ?? localApt.type,
    floor:       sanityApt?.floor       ?? localApt.floor,
    area:        sanityApt?.area        ?? localApt.area,
    terrace:     sanityApt?.terrace     ?? localApt.terrace,
    tag:         sanityApt?.tag         ?? localApt.tag,
    price:       sanityApt?.price       ?? localApt.price,
    status:      sanityApt?.status      ?? localApt.status,
    description: sanityApt?.description ?? localApt.description,
    features:    sanityApt?.features    ?? localApt.features,
  };

  // ── Galerie: Sanity > lokální soubory ────────────────────────────────────
  const galleryImages: string[] = sanityApt?.gallery && sanityApt.gallery.length > 0
    ? sanityApt.gallery.map(g => g.asset.url)
    : localApt.photos.map(n => `/images/byty/byt-${localApt.id}-foto-${n}.webp`);

  // ── Půdorys: Sanity > lokální soubor ─────────────────────────────────────
  const floorPlanUrl: string | null = sanityApt?.floorPlan?.asset.url
    ?? (localApt.hasPlan ? `/images/byty/byt-${localApt.id}-pudorys.webp` : null);

  // ── Navigace mezi byty ────────────────────────────────────────────────────
  const prevApt = localApartments.find(a => a.id === numId - 1);
  const nextApt = localApartments.find(a => a.id === numId + 1);

  const aptLabel = `Byt ${apt.id} — ${apt.type}, ${apt.area.toLocaleString("cs")} m², ${apt.floor}`;

  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const closeLb  = useCallback(() => setLightboxIdx(null), []);
  const prevLb   = useCallback(() => setLightboxIdx(i => i !== null ? (i - 1 + galleryImages.length) % galleryImages.length : null), [galleryImages.length]);
  const nextLb   = useCallback(() => setLightboxIdx(i => i !== null ? (i + 1) % galleryImages.length : null), [galleryImages.length]);

  return (
    <>
      <Navigation dark />

      <main className="pt-28 pb-28 md:pb-40 bg-white min-h-screen">
        <div className="px-6 md:px-10 lg:px-20">
          <div className="max-w-7xl mx-auto">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-10">
              <Link href="/" className="label text-anthracite/35 hover:text-brick transition-colors">BD Jedlová</Link>
              <span className="label text-anthracite/20">›</span>
              <Link href="/byty" className="label text-anthracite/35 hover:text-brick transition-colors">Nabídka bytů</Link>
              <span className="label text-anthracite/20">›</span>
              <span className="label text-anthracite/55">Byt {apt.id} — {apt.type}</span>
            </div>

            {/* Záhlaví */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <p className="label text-brick">Byt {String(apt.id).padStart(2,"0")}</p>
                  {apt.tag && (
                    <span className="font-sans text-[0.58rem] tracking-[0.18em] uppercase px-2 py-0.5 bg-brick/10 text-brick">
                      {apt.tag}
                    </span>
                  )}
                </div>
                <h1 className="heading-lg text-anthracite mb-2">{apt.type}</h1>
                <p className="label text-anthracite/40">{apt.floor}</p>
              </div>

              <div className="flex flex-col justify-end gap-6">
                {/* Klíčové parametry */}
                <div className="grid grid-cols-3 gap-4 pb-6 border-b border-anthracite/10">
                  <div>
                    <p className="label text-anthracite/35 mb-1">Plocha bytu</p>
                    <p className="font-serif text-2xl text-anthracite">{apt.area.toLocaleString("cs")} m²</p>
                  </div>
                  {apt.terrace && (
                    <div>
                      <p className="label text-anthracite/35 mb-1">Terasa</p>
                      <p className="font-serif text-2xl text-anthracite">{Number(apt.terrace).toFixed(1)} m²</p>
                    </div>
                  )}
                  <div>
                    <p className="label text-anthracite/35 mb-1">Cena</p>
                    <p className="font-serif text-2xl text-brick">{apt.price}</p>
                  </div>
                </div>

                {/* Stav + CTA */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${statusColor(apt.status)}`}/>
                    <span className="body-sm text-anthracite/60">{apt.status}</span>
                  </div>
                  <button onClick={() => openModal(aptLabel)} className="btn-filled">
                    Mám zájem o tento byt
                  </button>
                </div>
              </div>
            </div>

            {/* ── Půdorys ────────────────────────────────────────────────── */}
            {floorPlanUrl && (
              <div className="mb-20">
                <p className="label text-brick mb-6">Půdorys</p>
                <div className="bg-cream p-6 md:p-10 flex items-center justify-center">
                  <Image
                    src={floorPlanUrl}
                    alt={`Půdorys bytu ${apt.id}`}
                    width={1200}
                    height={900}
                    className="w-full max-w-3xl h-auto"
                  />
                </div>
              </div>
            )}

            {/* ── Popis + vybavení ───────────────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
              <div>
                <p className="label text-brick mb-6">O bytu</p>
                <div className="divider mb-6"/>
                <p className="body-sm text-anthracite/65 leading-relaxed">{apt.description}</p>
              </div>
              <div>
                <p className="label text-brick mb-6">Součástí bytu</p>
                <div className="divider mb-6"/>
                <ul className="space-y-3">
                  {apt.features?.map(f => (
                    <li key={f} className="flex items-center gap-3">
                      <span className="w-1 h-1 rounded-full bg-brick shrink-0"/>
                      <span className="body-sm text-anthracite/65">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ── Technické dokumenty (ze Sanity) ───────────────────────── */}
            {sanityApt?.documents && sanityApt.documents.length > 0 && (
              <div className="mb-20">
                <p className="label text-brick mb-6">Dokumenty ke stažení</p>
                <div className="divider mb-6"/>
                <ul className="space-y-3">
                  {sanityApt.documents.map(doc => (
                    <li key={doc.asset._id}>
                      <a
                        href={doc.asset.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 group hover:text-brick transition-colors duration-200"
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className="text-brick shrink-0">
                          <rect x="2" y="1" width="10" height="13" rx="1"/>
                          <line x1="5" y1="5" x2="9" y2="5"/>
                          <line x1="5" y1="8" x2="9" y2="8"/>
                          <line x1="5" y1="11" x2="7" y2="11"/>
                        </svg>
                        <span className="body-sm text-anthracite/65 group-hover:text-brick transition-colors">
                          {doc.label || doc.asset.originalFilename}
                        </span>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className="text-anthracite/30 group-hover:text-brick transition-colors ml-auto">
                          <path d="M6 1v6M3 7l3 3 3-3M1 10h10"/>
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* ── Galerie ────────────────────────────────────────────────── */}
            {galleryImages.length > 0 && (
              <div className="mb-20">
                <p className="label text-brick mb-6">Galerie</p>

                {/* Grid galerie */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {galleryImages.map((src, i) => (
                    <div
                      key={i}
                      onClick={() => setLightboxIdx(i)}
                      className="relative overflow-hidden cursor-pointer group"
                      style={{ aspectRatio: "4/3" }}
                    >
                      <Image
                        src={src}
                        alt={`Byt ${apt.id} — foto ${i + 1}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        sizes="(max-width: 768px) 50vw, 33vw"
                        loading={i < 3 ? "eager" : "lazy"}
                      />
                      <div className="absolute inset-0 bg-anthracite/0 group-hover:bg-anthracite/20 transition-colors duration-400"/>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Navigace mezi byty ─────────────────────────────────────── */}
            <div className="pt-10 border-t border-anthracite/10 flex items-center justify-between">
              {prevApt ? (
                <Link href={`/byty/${prevApt.id}`} className="group flex items-center gap-3 hover:text-brick transition-colors">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
                    <polyline points="13,3 7,10 13,17"/>
                  </svg>
                  <div>
                    <p className="label text-anthracite/35">Předchozí byt</p>
                    <p className="font-serif text-lg text-anthracite group-hover:text-brick transition-colors">
                      Byt {prevApt.id} — {prevApt.type}
                    </p>
                  </div>
                </Link>
              ) : <div/>}

              <Link href="/byty" className="label text-anthracite/40 hover:text-brick transition-colors hidden md:block">
                ← Všechny byty
              </Link>

              {nextApt ? (
                <Link href={`/byty/${nextApt.id}`} className="group flex items-center gap-3 text-right hover:text-brick transition-colors">
                  <div>
                    <p className="label text-anthracite/35">Následující byt</p>
                    <p className="font-serif text-lg text-anthracite group-hover:text-brick transition-colors">
                      Byt {nextApt.id} — {nextApt.type}
                    </p>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
                    <polyline points="7,3 13,10 7,17"/>
                  </svg>
                </Link>
              ) : <div/>}
            </div>

          </div>
        </div>
      </main>

      <Footer/>

      {lightboxIdx !== null && (
        <Lightbox
          images={galleryImages}
          index={lightboxIdx}
          onClose={closeLb}
          onPrev={prevLb}
          onNext={nextLb}
          onSelect={setLightboxIdx}
        />
      )}
    </>
  );
}
