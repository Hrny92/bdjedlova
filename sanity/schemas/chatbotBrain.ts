import { defineField, defineType } from "sanity";

export const chatbotBrain = defineType({
  name:  "chatbotBrain",
  title: "Chatbot — mozek",
  type:  "document",

  fields: [
    defineField({
      name:  "systemPrompt",
      title: "Systémový prompt",
      type:  "text",
      rows:  12,
      description:
        "Instrukce pro AI. Popiš, kdo chatbot je, co smí a nesmí říkat, jak se má chovat a jaké informace zná.",
      validation: (R) => R.required(),
    }),

    defineField({
      name:  "greeting",
      title: "Uvítací zpráva",
      type:  "string",
      description: "První zpráva, kterou chatbot zobrazí při otevření.",
      initialValue: "Dobrý den! Jsem asistent BD Jedlová. Jak vám mohu pomoci?",
    }),

    defineField({
      name:  "faqs",
      title: "Znalostní báze (FAQ)",
      type:  "array",
      description:
        "Otázky a odpovědi, které chatbot dostane jako kontext ke každému dotazu.",
      of: [
        {
          type:   "object",
          title:  "Otázka / Odpověď",
          fields: [
            defineField({ name: "question", title: "Otázka", type: "string" }),
            defineField({ name: "answer",   title: "Odpověď", type: "text", rows: 4 }),
          ],
          preview: {
            select: { title: "question" },
          },
        },
      ],
    }),
  ],

  preview: {
    prepare: () => ({ title: "Chatbot — mozek" }),
  },
});
