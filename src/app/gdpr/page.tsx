import Navigation from "@/components/Navigation";
import Footer     from "@/components/Footer";
import Link       from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ochrana osobních údajů — BD Jedlová",
  description: "Informace o zpracování osobních údajů v souladu s GDPR pro projekt BD Jedlová, Plzeň.",
};

export default function GdprPage() {
  return (
    <>
      <Navigation dark />
      <main className="pt-28 pb-28 md:pb-40 bg-white min-h-screen">
        <div className="px-6 md:px-10 lg:px-20">
          <div className="max-w-3xl mx-auto">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-12">
              <Link href="/" className="label text-anthracite/35 hover:text-brick transition-colors duration-300">
                BD Jedlová
              </Link>
              <span className="label text-anthracite/20">›</span>
              <span className="label text-anthracite/50">Ochrana osobních údajů</span>
            </div>

            {/* Záhlaví */}
            <div className="mb-16">
              <p className="label text-brick mb-6">Právní informace</p>
              <h1 className="heading-lg text-anthracite mb-6">
                Ochrana<br />osobních údajů.
              </h1>
              <div className="divider mb-6" />
              <p className="body-sm text-anthracite/55">
                Poslední aktualizace: 1. dubna 2025
              </p>
            </div>

            {/* Obsah */}
            <div className="prose-custom space-y-12">

              <section>
                <h2 className="font-serif text-2xl text-anthracite mb-4">1. Správce osobních údajů</h2>
                <p className="body-sm text-anthracite/65 leading-relaxed">
                  Správcem osobních údajů je společnost zajišťující projekt BD Jedlová, bytový dům na adrese
                  Jedlová, Plzeň (dále jen „správce"). Správce zpracovává osobní údaje v souladu s Nařízením
                  Evropského parlamentu a Rady (EU) 2016/679 (GDPR) a zákonem č. 110/2019 Sb., o zpracování
                  osobních údajů.
                </p>
                <p className="body-sm text-anthracite/65 leading-relaxed mt-3">
                  Prodej bytů zajišťuje ve spolupráci s realitní kanceláří Bidli:
                </p>
                <div className="mt-4 p-5 bg-cream flex items-center gap-4">
                  <div>
                    <p className="font-serif text-lg text-anthracite">Ing. Zuzana Benedyktová</p>
                    <p className="label text-anthracite/40 mt-0.5 mb-3">Realitní makléřka</p>
                    <div className="space-y-1">
                      <p className="body-sm text-anthracite/65">
                        <span className="text-anthracite/40">Tel: </span>
                        <a href="tel:+420723117023" className="text-brick hover:text-brick-dark transition-colors">
                          +420 723 117 023
                        </a>
                      </p>
                      <p className="body-sm text-anthracite/65">
                        <span className="text-anthracite/40">E-mail: </span>
                        <a href="mailto:info@jedlova-plzen.cz" className="text-brick hover:text-brick-dark transition-colors">
                          info@jedlova-plzen.cz
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="font-serif text-2xl text-anthracite mb-4">2. Jaké osobní údaje zpracováváme</h2>
                <p className="body-sm text-anthracite/65 leading-relaxed mb-4">
                  V rámci provozu tohoto webu a komunikace s potenciálními zájemci zpracováváme následující
                  kategorie osobních údajů:
                </p>
                <ul className="space-y-2">
                  {[
                    "Identifikační údaje — jméno a příjmení",
                    "Kontaktní údaje — e-mailová adresa, telefonní číslo",
                    "Komunikační údaje — obsah zpráv zaslaných prostřednictvím kontaktního formuláře",
                    "Technické údaje — IP adresa, typ prohlížeče, datum a čas přístupu (pouze při souhlasu s analytickými cookies)",
                  ].map(item => (
                    <li key={item} className="flex items-start gap-3 body-sm text-anthracite/65">
                      <span className="w-1 h-1 rounded-full bg-brick shrink-0 mt-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl text-anthracite mb-4">3. Účel a právní základ zpracování</h2>
                <div className="space-y-4">
                  {[
                    {
                      title: "Odpověď na váš dotaz",
                      text: "Zpracování kontaktních údajů za účelem odpovědi na váš dotaz nebo zájem o konkrétní bytovou jednotku. Právní základ: oprávněný zájem správce (čl. 6 odst. 1 písm. f) GDPR).",
                    },
                    {
                      title: "Předsmluvní a smluvní vztahy",
                      text: "Zpracování osobních údajů nezbytné pro kroky před uzavřením smlouvy o prodeji nebo rezervaci bytové jednotky. Právní základ: plnění smlouvy (čl. 6 odst. 1 písm. b) GDPR).",
                    },
                    {
                      title: "Analytika webu",
                      text: "Sledování návštěvnosti a chování uživatelů za účelem zlepšování webu — pouze při vašem souhlasu. Právní základ: souhlas (čl. 6 odst. 1 písm. a) GDPR).",
                    },
                  ].map(({ title, text }) => (
                    <div key={title} className="pl-4 border-l-2 border-brick/30">
                      <p className="label text-anthracite mb-1">{title}</p>
                      <p className="body-sm text-anthracite/65 leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="font-serif text-2xl text-anthracite mb-4">4. Doba uchovávání údajů</h2>
                <p className="body-sm text-anthracite/65 leading-relaxed">
                  Osobní údaje uchováváme po dobu nezbytně nutnou k naplnění účelu zpracování:
                </p>
                <ul className="space-y-2 mt-4">
                  {[
                    "Kontaktní formulář — 2 roky od posledního kontaktu, nedojde-li k uzavření smluvního vztahu",
                    "Smluvní dokumentace — 10 let od ukončení smluvního vztahu (zákonná povinnost)",
                    "Analytická data — maximálně 26 měsíců (výchozí nastavení Google Analytics)",
                  ].map(item => (
                    <li key={item} className="flex items-start gap-3 body-sm text-anthracite/65">
                      <span className="w-1 h-1 rounded-full bg-brick shrink-0 mt-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl text-anthracite mb-4">5. Vaše práva</h2>
                <p className="body-sm text-anthracite/65 leading-relaxed mb-4">
                  V souladu s GDPR máte následující práva:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: "Právo na přístup", text: "Máte právo získat informace o tom, jaké údaje o vás zpracováváme." },
                    { title: "Právo na opravu", text: "Máte právo na opravu nepřesných nebo neúplných osobních údajů." },
                    { title: "Právo na výmaz", text: "Za určitých podmínek máte právo požádat o vymazání vašich údajů." },
                    { title: "Právo na omezení", text: "Máte právo požádat o omezení zpracování vašich osobních údajů." },
                    { title: "Právo na přenositelnost", text: "Máte právo obdržet vaše údaje ve strukturovaném, strojově čitelném formátu." },
                    { title: "Právo vznést námitku", text: "Máte právo vznést námitku proti zpracování na základě oprávněného zájmu." },
                  ].map(({ title, text }) => (
                    <div key={title} className="p-4 bg-cream">
                      <p className="label text-anthracite mb-2">{title}</p>
                      <p className="body-sm text-anthracite/60 text-[0.82rem] leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
                <p className="body-sm text-anthracite/65 leading-relaxed mt-4">
                  Svá práva uplatněte e-mailem na adrese{" "}
                  <a href="mailto:info@jedlova-plzen.cz" className="text-brick hover:text-brick-dark transition-colors">
                    info@jedlova-plzen.cz
                  </a>. Máte také právo podat stížnost u dozorového úřadu — Úřadu pro ochranu osobních údajů
                  (<a href="https://www.uoou.cz" target="_blank" rel="noopener noreferrer" className="text-brick hover:text-brick-dark transition-colors">www.uoou.cz</a>).
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl text-anthracite mb-4">6. Cookies</h2>
                <p className="body-sm text-anthracite/65 leading-relaxed mb-4">
                  Tento web používá soubory cookies. Cookies jsou malé textové soubory ukládané do vašeho
                  prohlížeče, které nám pomáhají zajistit správné fungování webu a analyzovat návštěvnost.
                </p>
                <div className="space-y-4">
                  {[
                    {
                      title: "Nezbytné cookies",
                      badge: "Vždy aktivní",
                      text: "Tyto cookies jsou nezbytné pro správné fungování webu. Bez nich by web nebyl schopen poskytovat základní funkce, jako je navigace nebo uchování vašeho souhlasu s cookies. Nelze je vypnout.",
                    },
                    {
                      title: "Analytické cookies",
                      badge: "Volitelné",
                      text: "Pomáhají nám pochopit, jak návštěvníci používají web. Veškerá data jsou anonymizovaná a slouží pouze ke zlepšení uživatelského zážitku. Aktivujeme je pouze s vaším souhlasem.",
                    },
                    {
                      title: "Marketingové cookies",
                      badge: "Volitelné",
                      text: "Umožňují zobrazovat relevantní reklamu na základě vašeho chování na webu. Aktivujeme je pouze s vaším výslovným souhlasem.",
                    },
                  ].map(({ title, badge, text }) => (
                    <div key={title} className="p-5 border border-anthracite/10">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="label text-anthracite">{title}</p>
                        <span className="font-sans text-[0.58rem] tracking-[0.15em] uppercase px-2 py-0.5 bg-brick/10 text-brick">
                          {badge}
                        </span>
                      </div>
                      <p className="body-sm text-anthracite/60 leading-relaxed text-[0.82rem]">{text}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="font-serif text-2xl text-anthracite mb-4">7. Příjemci osobních údajů</h2>
                <p className="body-sm text-anthracite/65 leading-relaxed">
                  Vaše osobní údaje neprodáváme ani nepředáváme třetím stranám za účelem jejich vlastního
                  marketingu. Údaje mohou být sdíleny výhradně s:
                </p>
                <ul className="space-y-2 mt-4">
                  {[
                    "Realitní kanceláří Bidli — zprostředkovatelé prodeje a doplňkových služeb (financování, pojištění, energie)",
                    "Poskytovateli IT infrastruktury — hosting, e-mail (vázáni smlouvou o zpracování osobních údajů)",
                    "Orgány veřejné moci — pouze v případě zákonné povinnosti",
                  ].map(item => (
                    <li key={item} className="flex items-start gap-3 body-sm text-anthracite/65">
                      <span className="w-1 h-1 rounded-full bg-brick shrink-0 mt-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl text-anthracite mb-4">8. Změny těchto zásad</h2>
                <p className="body-sm text-anthracite/65 leading-relaxed">
                  Vyhrazujeme si právo tyto zásady ochrany osobních údajů kdykoliv aktualizovat. O podstatných
                  změnách vás budeme informovat prostřednictvím webu. Datum poslední aktualizace je uvedeno
                  v záhlaví tohoto dokumentu.
                </p>
              </section>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
