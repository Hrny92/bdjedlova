# BD Jedlová — Sanity Studio

## Instalace a spuštění

```bash
cd web/sanity
npm install
npm run dev
```

Studio se otevře na http://localhost:3333

## Přihlášení

Přihlas se pomocí svého Sanity účtu. Jako vlastník projektu `ro6m7ots` máš
automaticky plný přístup. Klienta přidáš v sanity.io/manage → Members.

## Nasazení studia online

```bash
npm run deploy
```

Studio bude dostupné na https://bd-jedlova.sanity.studio  
(nebo jiný slug dle nastavení)

## Struktura obsahu

### Hlavní galerie
Fotky zobrazované v sekci „Vizualizace" na hlavní stránce.
Pořadí lze měnit přetažením. Každá fotka má povinný alt text.

### Byty (1–8)
Každý byt má tyto editovatelné pole:
- **Dispozice** — 1+kk, 2+kk, 3+kk…
- **Podlaží** — 2. NP, 3. NP, 4. NP
- **Plocha** — obytná v m²
- **Terasa** — plocha v m² (volitelné)
- **Cena** — textové pole (např. „7 999 999 Kč")
- **Stav** — Volný / Rezervováno / Prodáno
- **Popis** — delší text zobrazený na detailu bytu
- **Součástí bytu** — seznam (sklepní kója, parkovací místo…)
- **Půdorys** — obrázek
- **Galerie** — libovolný počet fotek, řaditelné přetažením
- **Technické dokumenty** — PDF soubory s názvem (energetický štítek, technická zpráva…)

## Napojení na Next.js frontend

Po úpravě obsahu v Sanity se změny projeví na webu po:
- **`npm run build`** — při statickém buildu (produkce)
- **okamžitě** — pokud je Next.js v dev módu (`npm run dev`)

Dotazy jsou definované v `web/src/sanity/queries.ts`.
