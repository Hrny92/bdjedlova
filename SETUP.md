# BD Jedlová — Web Setup

## Rychlý start

```bash
# 1. Přejdi do složky
cd web

# 2. Nainstaluj závislosti
npm install

# 3. Přidej video
cp ../hero-video.mp4 public/video/hero-video.mp4

# 4. Spusť dev server
npm run dev
```

Otevři http://localhost:3000

---

## Struktura projektu

```
web/
├── public/
│   └── video/
│       └── hero-video.mp4       ← sem zkopíruj video
├── src/
│   ├── app/
│   │   ├── globals.css          ← globální styly + Tailwind
│   │   ├── layout.tsx           ← root layout, fonty, metadata
│   │   └── page.tsx             ← hlavní stránka
│   └── components/
│       ├── Navigation.tsx       ← fixed nav, mobile menu
│       ├── Footer.tsx
│       └── sections/
│           ├── HeroSection.tsx        ← video + door GSAP efekt
│           ├── ArchitectureSection.tsx ← materiály
│           ├── LocationSection.tsx    ← lokalita + POI
│           ├── ApartmentsSection.tsx  ← přehled bytů
│           └── ContactSection.tsx     ← kontaktní formulář
├── tailwind.config.ts           ← custom barvy: brick, anthracite, cream
└── package.json
```

---

## Barvy (Tailwind tokeny)

| Token              | Hex       | Použití                     |
|--------------------|-----------|-----------------------------|
| `brick`            | `#9E4822` | Akcenty, CTA, labely        |
| `brick-light`      | `#B85C35` | Hover stavy                 |
| `brick-muted`      | `#C49070` | Jemné akcenty, hero text    |
| `anthracite`       | `#252220` | Primární text, dark sekce   |
| `anthracite-light` | `#3A3734` | Hover v dark sekcích        |
| `cream`            | `#F6F3EE` | Světlé sekce (alternativa k bílé) |

---

## Co doplnit před spuštěním

1. **Video** — zkopírovat `hero-video.mp4` do `public/video/`
2. **Kontaktní údaje** — v `ContactSection.tsx` nahradit placeholder údaje
3. **Kontaktní formulář** — zapojit backend (Resend, EmailJS nebo vlastní API route)
4. **Logo** — nahradit textový placeholder v `Navigation.tsx` a `Footer.tsx`
5. **Mapa** — v `LocationSection.tsx` integrovat Mapbox nebo Google Maps
6. **Ceny bytů** — doplnit do `ApartmentsSection.tsx`
7. **Stránky bytů** — vytvořit `/byty/[id]` dynamické stránky s půdorysy

---

## GSAP — jak to funguje

**Hero dveřový efekt** (`HeroSection.tsx`):
- Sekce 2 leží za dveřmi (`z-index: 10`)
- Dveře překrývají sekci 2 (`z-index: 20`)
- Hero text je nejvýše (`z-index: 30`)
- ScrollTrigger pinuje wrapper, `scrub: 1.2` váže animaci na scroll pozici
- Při scrollu: text zmizí → dveře odjedou → sekce 2 se odhalí

**Ladění:**
- `scrub: 1.2` → setrvačnost. Nižší = těsnější sledování scrollu
- `end: "+=130%"` → délka scrollu pro celou animaci
- `ease: "power2.inOut"` na dveřích → zkus `"expo.inOut"` pro dramatičtější nástup
