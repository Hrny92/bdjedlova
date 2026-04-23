import { defineField, defineType } from "sanity";

export const apartment = defineType({
  name:  "apartment",
  title: "Byt",
  type:  "document",

  fields: [

    // ── Základní identifikace ───────────────────────────────────────────────
    defineField({
      name:        "id",
      title:       "Číslo bytu",
      type:        "number",
      description: "1–8 — musí odpovídat URL (/byty/1 … /byty/8)",
      validation:  R => R.required().min(1).max(8),
    }),
    defineField({
      name:  "title",
      title: "Název (interní)",
      type:  "string",
      description: "Napr. 'Byt 1 - 3+kk, 2. NP'. Jen pro orientaci v CMS.",
      validation: R => R.required(),
    }),

    // ── Dispozice a parametry ──────────────────────────────────────────────
    defineField({
      name:    "type",
      title:   "Dispozice",
      type:    "string",
      options: {
        list: [
          { title: "1+kk",         value: "1+kk"         },
          { title: "1+kk kompakt", value: "1+kk kompakt" },
          { title: "2+kk",         value: "2+kk"         },
          { title: "3+kk",         value: "3+kk"         },
          { title: "4+kk",         value: "4+kk"         },
        ],
      },
      validation: R => R.required(),
    }),
    defineField({
      name:    "floor",
      title:   "Podlaží",
      type:    "string",
      options: {
        list: [
          { title: "2. NP", value: "2. NP" },
          { title: "3. NP", value: "3. NP" },
          { title: "4. NP", value: "4. NP" },
        ],
      },
      validation: R => R.required(),
    }),
    defineField({
      name:        "floorNum",
      title:       "Číslo podlaží (číslo)",
      type:        "number",
      description: "2, 3 nebo 4 — pro filtrování v interaktivní mapě",
      validation:  R => R.required(),
    }),
    defineField({
      name:        "area",
      title:       "Obytná plocha (m²)",
      type:        "number",
      validation:  R => R.required().positive(),
    }),
    defineField({
      name:        "terrace",
      title:       "Plocha terasy (m²)",
      type:        "number",
      description: "Vyplnit jen pokud má byt terasu",
    }),
    defineField({
      name:    "tag",
      title:   "Štítek",
      type:    "string",
      options: {
        list: [
          { title: "Terasa",       value: "Terasa"       },
          { title: "Velká terasa", value: "Velká terasa" },
          { title: "Penthouse",    value: "Penthouse"    },
          { title: "Investice",    value: "Investice"    },
        ],
      },
    }),

    // ── Prodej ──────────────────────────────────────────────────────────────
    defineField({
      name:        "price",
      title:       "Cena",
      type:        "string",
      description: "Napr. '7 999 999 Kc' nebo 'Na dotaz'",
      validation:  R => R.required(),
    }),
    defineField({
      name:    "status",
      title:   "Stav",
      type:    "string",
      options: {
        list: [
          { title: "Volný",       value: "Volný"       },
          { title: "Rezervováno", value: "Rezervováno" },
          { title: "Prodáno",     value: "Prodáno"     },
        ],
        layout: "radio",
      },
      initialValue: "Volný",
      validation:   R => R.required(),
    }),

    // ── Popis ───────────────────────────────────────────────────────────────
    defineField({
      name:        "description",
      title:       "Popis bytu",
      type:        "text",
      rows:        5,
      description: "Zobrazí se na detailové stránce bytu.",
      validation:  R => R.required(),
    }),
    defineField({
      name:        "features",
      title:       "Co je součástí bytu",
      type:        "array",
      of:          [{ type: "string" }],
      description: "Sklepní kója, parkovací místo, terasa…",
    }),

    // ── Půdorys ─────────────────────────────────────────────────────────────
    defineField({
      name:  "floorPlan",
      title: "Půdorys",
      type:  "image",
      options: { hotspot: false },
    }),

    // ── Galerie ─────────────────────────────────────────────────────────────
    defineField({
      name:  "gallery",
      title: "Galerie bytu",
      type:  "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name:  "alt",
              title: "Popis obrázku (alt text)",
              type:  "string",
            }),
          ],
        },
      ],
      options: { layout: "grid" },
    }),

    // ── Technické dokumenty ─────────────────────────────────────────────────
    defineField({
      name:  "documents",
      title: "Technické dokumenty (PDF)",
      type:  "array",
      of: [
        {
          type: "file",
          fields: [
            defineField({
              name:        "label",
              title:       "Název dokumentu",
              type:        "string",
              description: "Napr. 'Technicka zprava' nebo 'Energeticky stitek'",
              validation:  R => R.required(),
            }),
          ],
        },
      ],
    }),

  ],

  // Náhled v seznamu dokumentů
  preview: {
    select: {
      id:     "id",
      title:  "type",
      floor:  "floor",
      status: "status",
      media:  "gallery.0",
    },
    prepare({ id, title, floor, status, media }) {
      const statusIcon = status === "Volný" ? "🟢" : status === "Rezervováno" ? "🟡" : "🔴";
      return {
        title:    `Byt ${id} — ${title}`,
        subtitle: `${floor} · ${statusIcon} ${status}`,
        media,
      };
    },
  },
});
