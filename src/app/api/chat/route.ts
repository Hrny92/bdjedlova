import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { client } from "@/sanity/client";
import { chatbotBrainQuery, apartmentsQuery } from "@/sanity/queries";
import { groq } from "next-sanity";

type Message = { role: "user" | "model"; text: string };

type Brain = {
  systemPrompt: string;
  greeting:     string;
  faqs:         { question: string; answer: string }[] | null;
};

type ApartmentLive = {
  id:     number;
  type:   string;
  floor:  string;
  area:   number;
  terrace?: number;
  tag?:   string;
  price:  string;
  status: string;
};

// Cache — brain 60 s, byty 30 s (ceny se mění, chceme je čerstvé)
let brainCache:    Brain | null = null;
let brainCachedAt  = 0;
let aptsCache:     ApartmentLive[] | null = null;
let aptsCachedAt   = 0;
const BRAIN_TTL = 60_000;
const APTS_TTL  = 30_000;

async function getBrain(): Promise<Brain> {
  if (brainCache && Date.now() - brainCachedAt < BRAIN_TTL) return brainCache;
  const data = await client.fetch<Brain>(chatbotBrainQuery);
  brainCache    = data;
  brainCachedAt = Date.now();
  return data;
}

async function getApartments(): Promise<ApartmentLive[]> {
  if (aptsCache && Date.now() - aptsCachedAt < APTS_TTL) return aptsCache;
  const data = await client.fetch<ApartmentLive[]>(groq`
    *[_type == "apartment"] | order(id asc) {
      id, type, floor, area, terrace, tag, price, status
    }
  `);
  aptsCache    = data ?? [];
  aptsCachedAt = Date.now();
  return aptsCache;
}

// Formátuje aktuální tabulku bytů jako text pro AI kontext
function formatApartments(apts: ApartmentLive[]): string {
  if (!apts.length) return "Žádné byty nejsou v databázi.";

  const statusEmoji: Record<string, string> = {
    "Volný":       "✅ Volný",
    "Rezervováno": "🟡 Rezervováno",
    "Prodáno":     "❌ Prodáno",
  };

  const lines = apts.map((a) => {
    const terrace = a.terrace ? ` + terasa ${a.terrace} m²` : "";
    const tag     = a.tag ? ` [${a.tag}]` : "";
    const status  = statusEmoji[a.status] ?? a.status;
    return `  • Byt ${a.id} — ${a.type}, ${a.area} m²${terrace}, ${a.floor}${tag} | Cena: ${a.price} | ${status}`;
  });

  return lines.join("\n");
}

export async function POST(req: NextRequest) {
  try {
    const { messages }: { messages: Message[] } = await req.json();
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Chybí zprávy." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY není nastaven." }, { status: 500 });
    }

    // Paralelně načti mozek i aktuální byty
    const [brain, apartments] = await Promise.all([getBrain(), getApartments()]);

    // Sestav systemInstruction
    let systemInstruction = brain?.systemPrompt ?? "Jsi asistent pro bytový dům BD Jedlová v Plzni.";

    // Injektuj živá data bytů — AI tak vždy má aktuální ceny a dostupnost
    systemInstruction += `

--- AKTUÁLNÍ DATA BYTŮ (načteno živě ze systému, vždy aktuální) ---
${formatApartments(apartments)}

DŮLEŽITÉ: Ceny a dostupnost bytů vždy beri VÝHRADNĚ z výše uvedené tabulky. Nikdy nevymýšlej ani neodhaduj ceny.`;

    // Přidej FAQ znalostní bázi
    if (brain?.faqs?.length) {
      systemInstruction += "\n\n--- ZNALOSTNÍ BÁZE / FAQ ---\n";
      for (const faq of brain.faqs) {
        systemInstruction += `\nQ: ${faq.question}\nA: ${faq.answer}\n`;
      }
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL ?? "gemini-2.0-flash",
      systemInstruction,
    });

    // Gemini vyžaduje historii začínající rolí "user".
    // Odřízneme prefix model-zpráv (= uvítací zpráva) a pak vezmeme vše kromě poslední zprávy.
    const allButLast  = messages.slice(0, -1);
    const firstUserIdx = allButLast.findIndex((m) => m.role === "user");
    const trimmed     = firstUserIdx === -1 ? [] : allButLast.slice(firstUserIdx);

    const history = trimmed.map((m) => ({
      role:  m.role,
      parts: [{ text: m.text }],
    }));

    const chat   = model.startChat({ history });
    const result = await chat.sendMessage(messages[messages.length - 1].text);
    const text   = result.response.text();

    return NextResponse.json({ text });
  } catch (err) {
    console.error("[/api/chat]", err);
    return NextResponse.json({ error: "Chyba serveru." }, { status: 500 });
  }
}
