import { defineField, defineType } from "sanity";

export const mainGallery = defineType({
  name:  "mainGallery",
  title: "Hlavní galerie",
  type:  "document",

  // Singleton — jen jeden dokument tohoto typu
  __experimental_actions: ["update", "publish"],

  fields: [
    defineField({
      name:  "title",
      title: "Název",
      type:  "string",
      initialValue: "Hlavní galerie",
      readOnly: true,
    }),
    defineField({
      name:        "images",
      title:       "Fotografie",
      type:        "array",
      description: "Fotky se zobrazují na hlavní stránce v sekci Vizualizace. Řazení lze měnit přetažením.",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name:        "alt",
              title:       "Popis fotografie (alt text)",
              type:        "string",
              description: "Krátký popis pro přístupnost a SEO",
              validation:  R => R.required(),
            }),
          ],
        },
      ],
      options: { layout: "grid" },
      validation: R => R.required().min(1),
    }),
  ],

  preview: {
    select: { title: "title", media: "images.0" },
    prepare({ title, media }) {
      return { title, subtitle: "Fotografie na hlavní stránce", media };
    },
  },
});
