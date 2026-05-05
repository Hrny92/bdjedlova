/**
 * SEOSchema — strukturovaná data pro vyhledávače i AI (GEO)
 *
 * Obsahuje:
 *  • WebSite + SearchAction
 *  • Organization + LocalBusiness (RealEstateAgent)
 *  • ApartmentComplex + ItemList jednotlivých bytů
 *  • FAQPage — klíčový signál pro AI odpovědi (ChatGPT, Perplexity, Google AI Overview)
 *  • BreadcrumbList
 *  • Speakable — označení obsahu vhodného pro hlasové AI asistenty
 */
export default function SEOSchema() {
  const BASE_URL = "https://jedlova-plzen.cz";

  // ── 1. WebSite ────────────────────────────────────────────────────────────────
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: "BD Jedlová — Prémiové bydlení v centru Plzně",
    description:
      "Bytový dům Jedlová — 8 prémiových bytů v centru Plzně. Dispozice 1+kk až 3+kk penthouse. Fasáda z tmavé lícové cihly a dřevěných lamel. Cena od 3 530 000 Kč.",
    inLanguage: "cs-CZ",
    publisher: { "@id": `${BASE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${BASE_URL}/byty?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };

  // ── 2. Organization ───────────────────────────────────────────────────────────
  const organization = {
    "@context": "https://schema.org",
    "@type": ["Organization", "RealEstateAgent"],
    "@id": `${BASE_URL}/#organization`,
    name: "BD Jedlová",
    alternateName: ["Bytový dům Jedlová", "BD Jedlová Plzeň"],
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/logo.svg`,
      width: 280,
      height: 80,
    },
    image: `${BASE_URL}/images/gallery/exterier-1.webp`,
    description:
      "BD Jedlová je prémiový bytový dům v centru Plzně s 8 bytovými jednotkami. Nabízíme byty 1+kk, 3+kk a penthouse s výhledem na centrum Plzně.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jedlová",
      addressLocality: "Plzeň",
      addressRegion: "Plzeňský kraj",
      postalCode: "301 00",
      addressCountry: "CZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 49.7478,
      longitude: 13.3775,
    },
    telephone: ["+420723117023", "+420606064961"],
    email: "info@jedlova-plzen.cz",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+420-723-117-023",
        contactType: "sales",
        areaServed: "CZ",
        availableLanguage: "Czech",
        name: "Ing. Zuzana Benedyktová",
        jobTitle: "Realitní makléřka",
      },
      {
        "@type": "ContactPoint",
        telephone: "+420-606-064-961",
        contactType: "sales",
        areaServed: "CZ",
        availableLanguage: "Czech",
        name: "Milada Indráková",
        jobTitle: "Realitní makléřka",
      },
    ],
    sameAs: [],
  };

  // ── 3. LocalBusiness ─────────────────────────────────────────────────────────
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "RealEstateAgent"],
    "@id": `${BASE_URL}/#localbusiness`,
    name: "BD Jedlová — prodej bytů Plzeň",
    url: BASE_URL,
    telephone: "+420723117023",
    email: "info@jedlova-plzen.cz",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jedlová",
      addressLocality: "Plzeň",
      addressRegion: "Plzeňský kraj",
      postalCode: "301 00",
      addressCountry: "CZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 49.7478,
      longitude: 13.3775,
    },
    priceRange: "3 530 000 Kč – 12 550 000 Kč",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    hasMap: "https://maps.google.com/?q=Jedlová,+Plzeň",
    areaServed: {
      "@type": "City",
      name: "Plzeň",
    },
    currenciesAccepted: "CZK",
    paymentAccepted: "Hotovost, Bankovní převod, Hypotéka",
  };

  // ── 4. ApartmentComplex ───────────────────────────────────────────────────────
  const apartmentComplex = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    "@id": `${BASE_URL}/#complex`,
    name: "BD Jedlová",
    description:
      "Prémiový bytový dům v centru Plzně. Čtyři nadzemní podlaží, 8 bytových jednotek dispozic 1+kk, 3+kk a penthouse. Fasáda z tmavé lícové cihly a dřevěných lamelových prvků. Každý byt má sklepní kóji a parkovací místo v krytém parkovišti.",
    url: BASE_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jedlová",
      addressLocality: "Plzeň",
      postalCode: "301 00",
      addressCountry: "CZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 49.7478,
      longitude: 13.3775,
    },
    numberOfRooms: 8,
    numberOfBedrooms: "1–3",
    floorSize: {
      "@type": "QuantitativeValue",
      minValue: 28.23,
      maxValue: 100.38,
      unitCode: "MTK",
      unitText: "m²",
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Kryté parkoviště", value: true },
      { "@type": "LocationFeatureSpecification", name: "Sklepní kóje", value: true },
      { "@type": "LocationFeatureSpecification", name: "Výtah", value: true },
      { "@type": "LocationFeatureSpecification", name: "Terasa", value: true },
      { "@type": "LocationFeatureSpecification", name: "Prémiové materiály", value: true },
      { "@type": "LocationFeatureSpecification", name: "Centrum města", value: true },
      { "@type": "LocationFeatureSpecification", name: "Tmavá lícová cihla", value: true },
      { "@type": "LocationFeatureSpecification", name: "Dřevěné lamely", value: true },
    ],
    numberOfAvailableAccommodationUnits: 8,
    tourBookingPage: `${BASE_URL}/#kontakt`,
    image: [
      `${BASE_URL}/images/gallery/exterier-1.webp`,
      `${BASE_URL}/images/gallery/exterier-2.webp`,
      `${BASE_URL}/images/gallery/interior-byt1.webp`,
    ],
  };

  // ── 5. ItemList — přehled bytů ────────────────────────────────────────────────
  const apartmentList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${BASE_URL}/byty#list`,
    name: "Nabídka bytů BD Jedlová — přehled všech jednotek",
    description: "Kompletní přehled 8 bytových jednotek v BD Jedlová, Plzeň",
    numberOfItems: 8,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Apartment",
          "@id": `${BASE_URL}/byty/1`,
          name: "Byt 1 — 3+kk, 59,86 m², 2. NP",
          description: "Prostorný byt 3+kk ve druhém nadzemním podlaží. Sklepní kója a parkovací místo v ceně.",
          url: `${BASE_URL}/byty/1`,
          numberOfRooms: 3,
          floorLevel: 2,
          floorSize: { "@type": "QuantitativeValue", value: 59.86, unitCode: "MTK" },
          offers: {
            "@type": "Offer",
            price: 7480000,
            priceCurrency: "CZK",
            availability: "https://schema.org/InStock",
            priceValidUntil: "2026-12-31",
            seller: { "@id": `${BASE_URL}/#organization` },
          },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Apartment",
          "@id": `${BASE_URL}/byty/2`,
          name: "Byt 2 — 1+kk s terasou, 50,64 m² + terasa 8,12 m², 2. NP",
          description: "Vzdušný byt 1+kk s terasou 8 m². Ideální pro páry nebo investici.",
          url: `${BASE_URL}/byty/2`,
          numberOfRooms: 1,
          floorLevel: 2,
          floorSize: { "@type": "QuantitativeValue", value: 50.64, unitCode: "MTK" },
          amenityFeature: [{ "@type": "LocationFeatureSpecification", name: "Terasa 8,12 m²", value: true }],
          offers: {
            "@type": "Offer",
            price: 6330000,
            priceCurrency: "CZK",
            availability: "https://schema.org/InStock",
            priceValidUntil: "2026-12-31",
            seller: { "@id": `${BASE_URL}/#organization` },
          },
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Apartment",
          "@id": `${BASE_URL}/byty/3`,
          name: "Byt 3 — 1+kk s velkou terasou, 54,03 m² + terasa 25,81 m², 2. NP",
          description: "Výjimečný byt 1+kk s rozsáhlou terasou 25,8 m² — největší na 2. NP.",
          url: `${BASE_URL}/byty/3`,
          numberOfRooms: 1,
          floorLevel: 2,
          floorSize: { "@type": "QuantitativeValue", value: 54.03, unitCode: "MTK" },
          amenityFeature: [{ "@type": "LocationFeatureSpecification", name: "Terasa 25,81 m²", value: true }],
          offers: {
            "@type": "Offer",
            price: 6750000,
            priceCurrency: "CZK",
            availability: "https://schema.org/InStock",
            priceValidUntil: "2026-12-31",
            seller: { "@id": `${BASE_URL}/#organization` },
          },
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "Apartment",
          "@id": `${BASE_URL}/byty/4`,
          name: "Byt 4 — 3+kk, 59,86 m², 3. NP",
          description: "Byt 3+kk ve třetím nadzemním podlaží se světlou dispozicí a výhledem do okolní zástavby.",
          url: `${BASE_URL}/byty/4`,
          numberOfRooms: 3,
          floorLevel: 3,
          floorSize: { "@type": "QuantitativeValue", value: 59.86, unitCode: "MTK" },
          offers: {
            "@type": "Offer",
            price: 7480000,
            priceCurrency: "CZK",
            availability: "https://schema.org/InStock",
            priceValidUntil: "2026-12-31",
            seller: { "@id": `${BASE_URL}/#organization` },
          },
        },
      },
      {
        "@type": "ListItem",
        position: 5,
        item: {
          "@type": "Apartment",
          "@id": `${BASE_URL}/byty/5`,
          name: "Byt 5 — 1+kk s terasou, 50,64 m² + terasa 8,12 m², 3. NP",
          description: "Byt 1+kk s terasou ve třetím podlaží. Vyšší poloha přináší lepší výhledy.",
          url: `${BASE_URL}/byty/5`,
          numberOfRooms: 1,
          floorLevel: 3,
          floorSize: { "@type": "QuantitativeValue", value: 50.64, unitCode: "MTK" },
          amenityFeature: [{ "@type": "LocationFeatureSpecification", name: "Terasa 8,12 m²", value: true }],
          offers: {
            "@type": "Offer",
            price: 6330000,
            priceCurrency: "CZK",
            availability: "https://schema.org/InStock",
            priceValidUntil: "2026-12-31",
            seller: { "@id": `${BASE_URL}/#organization` },
          },
        },
      },
      {
        "@type": "ListItem",
        position: 6,
        item: {
          "@type": "Apartment",
          "@id": `${BASE_URL}/byty/6`,
          name: "Byt 6 — 1+kk kompakt investiční, 28,23 m², 3. NP",
          description: "Kompaktní investiční jednotka 1+kk. Ideální pro krátkodobé i dlouhodobé pronájmy v centru Plzně.",
          url: `${BASE_URL}/byty/6`,
          numberOfRooms: 1,
          floorLevel: 3,
          floorSize: { "@type": "QuantitativeValue", value: 28.23, unitCode: "MTK" },
          amenityFeature: [{ "@type": "LocationFeatureSpecification", name: "Investiční potenciál", value: true }],
          offers: {
            "@type": "Offer",
            price: 3530000,
            priceCurrency: "CZK",
            availability: "https://schema.org/InStock",
            priceValidUntil: "2026-12-31",
            seller: { "@id": `${BASE_URL}/#organization` },
          },
        },
      },
      {
        "@type": "ListItem",
        position: 7,
        item: {
          "@type": "Apartment",
          "@id": `${BASE_URL}/byty/7`,
          name: "Byt 7 — 1+kk, 29,53 m², 4. NP",
          description: "Byt 1+kk ve čtvrtém nadzemním podlaží s výhledem přes střechy okolní zástavby.",
          url: `${BASE_URL}/byty/7`,
          numberOfRooms: 1,
          floorLevel: 4,
          floorSize: { "@type": "QuantitativeValue", value: 29.53, unitCode: "MTK" },
          offers: {
            "@type": "Offer",
            price: 3690000,
            priceCurrency: "CZK",
            availability: "https://schema.org/InStock",
            priceValidUntil: "2026-12-31",
            seller: { "@id": `${BASE_URL}/#organization` },
          },
        },
      },
      {
        "@type": "ListItem",
        position: 8,
        item: {
          "@type": "Apartment",
          "@id": `${BASE_URL}/byty/8`,
          name: "Byt 8 — 3+kk Penthouse, 100,38 m² + 2 terasy 28,25 m², 4. NP",
          description: "Výjimečný penthouse 3+kk na 100 m² s dvěma terasami. Nejprestižnější jednotka celého projektu.",
          url: `${BASE_URL}/byty/8`,
          numberOfRooms: 3,
          floorLevel: 4,
          floorSize: { "@type": "QuantitativeValue", value: 100.38, unitCode: "MTK" },
          amenityFeature: [
            { "@type": "LocationFeatureSpecification", name: "Dvě terasy, 28,25 m²", value: true },
            { "@type": "LocationFeatureSpecification", name: "Penthouse", value: true },
            { "@type": "LocationFeatureSpecification", name: "Šatna", value: true },
          ],
          offers: {
            "@type": "Offer",
            price: 12550000,
            priceCurrency: "CZK",
            availability: "https://schema.org/InStock",
            priceValidUntil: "2026-12-31",
            seller: { "@id": `${BASE_URL}/#organization` },
          },
        },
      },
    ],
  };

  // ── 6. FAQPage — klíčový GEO signál pro AI odpovědi ──────────────────────────
  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${BASE_URL}/#faq`,
    name: "Časté otázky o BD Jedlová — bytový dům v centru Plzně",
    mainEntity: [
      {
        "@type": "Question",
        name: "Kde se nachází bytový dům BD Jedlová?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "BD Jedlová se nachází na ulici Jedlová v centru Plzně (PSČ 301 00). Bytový dům uzavírá historickou proluku v samém srdci města a nabízí výjimečnou polohu s pěší dostupností do centra Plzně. GPS souřadnice: 49.7478°N, 13.3775°E.",
        },
      },
      {
        "@type": "Question",
        name: "Kolik bytů nabízí BD Jedlová a jaké jsou jejich dispozice?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "BD Jedlová nabízí celkem 8 bytových jednotek ve čtyřech nadzemních podlažích (2. NP – 4. NP). Dispozice zahrnují byty 1+kk od 28 m², byty 3+kk od 59 m² a penthouse 3+kk o rozloze 100 m². Vybrané byty disponují terasami o rozloze 8 m² až 26 m².",
        },
      },
      {
        "@type": "Question",
        name: "Jaká je cena bytů v BD Jedlová?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ceny bytů v BD Jedlová vycházejí z 125 000 Kč za m² obytné plochy. Nejlevnější byt (1+kk kompakt, 28 m²) je za 3 530 000 Kč. Byty 3+kk (59,86 m²) jsou od 7 480 000 Kč. Penthouse 3+kk (100 m²) je za 12 550 000 Kč. Všechny ceny jsou uvedeny bez DPH.",
        },
      },
      {
        "@type": "Question",
        name: "Jaká je cena za metr čtvereční v BD Jedlová?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cena za metr čtvereční v BD Jedlová je 125 000 Kč. Tato cena odpovídá prémiové novostavbě v centru Plzně s vysokým standardem provedení a architektonicky hodnotnou fasádou z tmavé lícové cihly.",
        },
      },
      {
        "@type": "Question",
        name: "Jsou byty v BD Jedlová stále volné?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "K datu zveřejnění těchto informací jsou všechny byty (1–8) v BD Jedlová volné. Zájem o prémiové bydlení v centru Plzně je však vysoký. Pro aktuální dostupnost kontaktujte makléřku Ing. Zuzanu Benedyktovou (+420 723 117 023) nebo Miladu Indrátkovou (+420 606 064 961).",
        },
      },
      {
        "@type": "Question",
        name: "Jak kontaktovat makléřku pro prohlídku bytu v BD Jedlová?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Prohlídku bytu sjednáte s realitními makléřkami: Ing. Zuzana Benedyktová, tel. +420 723 117 023, nebo Milada Indráková, tel. +420 606 064 961. E-mail: info@jedlova-plzen.cz. Prohlídky jsou k dispozici po dohodě v pracovní dny i víkendy.",
        },
      },
      {
        "@type": "Question",
        name: "Je k bytům v BD Jedlová zajištěno parkování?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ano, BD Jedlová disponuje krytým parkovištěm s 10 parkovacími místy. Ke každému bytu náleží jedno parkovací místo v ceně. Parkoviště je kryté a přístupné přímo z objektu.",
        },
      },
      {
        "@type": "Question",
        name: "Jaká je architektura a materiály použité v BD Jedlová?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "BD Jedlová se vyznačuje výraznou fasádou z tmavé lícové cihly doplněnou dřevěnými lamelovými prvky a prosklenými balkóny. Architektonický návrh pochází ze studia Project Studio 8. Dům uzavírá historickou proluku v centru Plzně a svým charakterem respektuje okolní zástavbu.",
        },
      },
      {
        "@type": "Question",
        name: "Jsou byty v BD Jedlová vhodné jako investice?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ano, zejména byt 6 (1+kk kompakt, 28,23 m², 3 530 000 Kč) a byt 7 (1+kk, 29,53 m², 3 690 000 Kč) jsou výborné investiční příležitosti. Centrum Plzně vykazuje dlouhodobě vysokou poptávku po pronájmech. Výnosnost pronájmu v centru Plzně se pohybuje kolem 4–5 % ročně.",
        },
      },
      {
        "@type": "Question",
        name: "Jaké jsou nejlevnější byty v BD Jedlová?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nejlevnější byty v BD Jedlová jsou: Byt 6 — 1+kk kompakt, 28,23 m², 3. NP, cena 3 530 000 Kč (investiční) a Byt 7 — 1+kk, 29,53 m², 4. NP, cena 3 690 000 Kč. Oba byty jsou vhodné pro singles, páry nebo jako investice do pronájmu.",
        },
      },
      {
        "@type": "Question",
        name: "Jaký je největší a nejdražší byt v BD Jedlová?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Největší a nejprestižnější jednotkou je Byt 8 — penthouse 3+kk o rozloze 100,38 m² se dvěma terasami (28,25 m²) ve čtvrtém nadzemním podlaží. Cena penthouse je 12 550 000 Kč. Nabízí šatnu, velkorysý obývací prostor a výhledy na centrum Plzně.",
        },
      },
      {
        "@type": "Question",
        name: "Jaká je dostupnost BD Jedlová do centra Plzně a MHD?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "BD Jedlová leží přímo v centru Plzně v docházkové vzdálenosti od náměstí Republiky, historického jádra města a nákupních center. Zastávky MHD (tramvaj, trolejbus, autobus) jsou vzdáleny do 5 minut chůze. Vlakové nádraží Plzeň hlavní je dostupné do 10–15 minut.",
        },
      },
      {
        "@type": "Question",
        name: "Jsou v ceně bytu v BD Jedlová zahrnuty sklepní kóje?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ano, ke každému bytu v BD Jedlová náleží sklepní kója umístěná v suterénu budovy. Sklepní kóje jsou součástí kupní ceny bytu a nejsou účtovány zvlášť.",
        },
      },
      {
        "@type": "Question",
        name: "Je možné koupit byt v BD Jedlová na hypotéku?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ano, byty v BD Jedlová lze financovat hypotečním úvěrem. Naši makléři vám pomohou s doporučením hypoteční banky a celým procesem financování. Kontaktujte nás na info@jedlova-plzen.cz pro individuální konzultaci.",
        },
      },
      {
        "@type": "Question",
        name: "Kdy bude BD Jedlová dokončen?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pro aktuální informace o termínu dokončení a kolaudaci kontaktujte náš prodejní tým na +420 723 117 023 nebo info@jedlova-plzen.cz. Projekt se nachází v pokročilé fázi realizace.",
        },
      },
      {
        "@type": "Question",
        name: "Jaké novostavby bytů jsou k prodeji v centru Plzně?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "BD Jedlová je jednou z mála prémiových novostaveb přímo v historickém centru Plzně. Nabízí 8 bytových jednotek od 28 m² do 100 m² za ceny od 3 530 000 Kč. Jde o architektonicky hodnotnou stavbu s fasádou z tmavé lícové cihly — ojedinělý projekt v rámci plzeňského realitního trhu.",
        },
      },
    ],
  };

  // ── 7. BreadcrumbList ─────────────────────────────────────────────────────────
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "BD Jedlová",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Nabídka bytů",
        item: `${BASE_URL}/byty`,
      },
    ],
  };

  // ── 8. Speakable — pro hlasové AI asistenty (Google Assistant, Siri, Alexa) ──
  const speakable = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${BASE_URL}/#webpage`,
    url: BASE_URL,
    name: "BD Jedlová — Prémiové bydlení v centru Plzně",
    description:
      "Bytový dům Jedlová nabízí 8 prémiových bytů v centru Plzně. Dispozice 1+kk až 3+kk penthouse. Ceny od 3 530 000 Kč. Kontakt: +420 723 117 023.",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", ".body-sm", ".label"],
    },
    about: { "@id": `${BASE_URL}/#complex` },
    mainEntity: { "@id": `${BASE_URL}/#faq` },
    publisher: { "@id": `${BASE_URL}/#organization` },
    inLanguage: "cs-CZ",
    isPartOf: { "@id": `${BASE_URL}/#website` },
  };

  // ── 9. RealEstateListing — přímý signál pro Google Real Estate ───────────────
  const realEstateListing = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: "Nabídka bytů — BD Jedlová, centrum Plzně",
    description:
      "8 prémiových bytů k prodeji v novostavbě BD Jedlová v centru Plzně. Dispozice 1+kk (28–54 m²) a 3+kk (59–100 m²). Fasáda lícová cihla + dřevo. Parkovací místo a sklepní kója v ceně.",
    url: `${BASE_URL}/byty`,
    image: `${BASE_URL}/images/gallery/exterier-1.webp`,
    datePosted: "2025-01-01",
    offers: {
      "@type": "AggregateOffer",
      lowPrice: 3530000,
      highPrice: 12550000,
      priceCurrency: "CZK",
      offerCount: 8,
      availability: "https://schema.org/InStock",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jedlová",
      addressLocality: "Plzeň",
      postalCode: "301 00",
      addressCountry: "CZ",
    },
  };

  const schemas = [
    website,
    organization,
    localBusiness,
    apartmentComplex,
    apartmentList,
    faqPage,
    breadcrumb,
    speakable,
    realEstateListing,
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 0) }}
        />
      ))}
    </>
  );
}
