import { StructureBuilder } from "sanity/structure";

// Vlastní sidebar — singletony (Galerie) + seznam bytů
export const structure = (S: StructureBuilder) =>
  S.list()
    .title("BD Jedlová")
    .items([

      // Singleton — hlavní galerie
      S.listItem()
        .title("Hlavní galerie")
        .id("mainGallery")
        .child(
          S.document()
            .schemaType("mainGallery")
            .documentId("mainGallery")
            .title("Hlavní galerie")
        ),

      S.divider(),

      // Singleton — chatbot mozek
      S.listItem()
        .title("Chatbot — mozek")
        .id("chatbotBrain")
        .child(
          S.document()
            .schemaType("chatbotBrain")
            .documentId("chatbotBrain")
            .title("Chatbot — mozek")
        ),

      S.divider(),

      // Seznam bytů
      S.listItem()
        .title("Byty")
        .schemaType("apartment")
        .child(
          S.documentList()
            .title("Byty")
            .schemaType("apartment")
            .filter('_type == "apartment"')
            .defaultOrdering([{ field: "id", direction: "asc" }])
        ),
    ]);
