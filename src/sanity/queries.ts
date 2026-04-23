import { groq } from "next-sanity";

// ── Hlavní galerie ────────────────────────────────────────────────────────────
export const mainGalleryQuery = groq`
  *[_type == "mainGallery" && _id == "mainGallery"][0] {
    images[] {
      asset->{ _id, url, metadata { dimensions } },
      alt
    }
  }
`;

// ── Všechny byty — pro přehledovou stránku /byty ─────────────────────────────
export const apartmentsQuery = groq`
  *[_type == "apartment"] | order(id asc) {
    id,
    type,
    floor,
    floorNum,
    area,
    terrace,
    tag,
    price,
    status
  }
`;

// ── Chatbot mozek ─────────────────────────────────────────────────────────────
export const chatbotBrainQuery = groq`
  *[_type == "chatbotBrain" && _id == "chatbotBrain"][0] {
    systemPrompt,
    greeting,
    faqs[] { question, answer }
  }
`;

// ── Jeden byt — pro detail /byty/[id] ────────────────────────────────────────
export const apartmentByIdQuery = groq`
  *[_type == "apartment" && id == $id][0] {
    id,
    type,
    floor,
    floorNum,
    area,
    terrace,
    tag,
    price,
    status,
    description,
    features,
    floorPlan { asset->{ _id, url } },
    gallery[] {
      asset->{ _id, url, metadata { dimensions } },
      alt
    },
    documents[] {
      label,
      asset->{ _id, url, originalFilename }
    }
  }
`;
