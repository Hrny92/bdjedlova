import Navigation          from "@/components/Navigation";
import HeroSection         from "@/components/sections/HeroSection";
import ArchitectureSection from "@/components/sections/ArchitectureSection";
import GallerySection      from "@/components/sections/GallerySection";
import LocationSection     from "@/components/sections/LocationSection";
import ApartmentsSection   from "@/components/sections/ApartmentsSection";
import ServicesSection     from "@/components/sections/ServicesSection";
import ContactSection      from "@/components/sections/ContactSection";
import Footer              from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      {/* Navigace — fixed, přes celou stránku */}
      <Navigation />

      <main>
        {/*
          HeroSection obsahuje:
          1. Sekci 2 (za dveřmi) — #o-projektu
          2. Dveře (video)
          3. Hero text
          Po skončení pinu ScrollTrigger uvolní scroll pro zbytek stránky.
        */}
        <HeroSection />

        {/* Sekce pod hrdinou */}
        <ArchitectureSection />
        <GallerySection />
        <LocationSection />
        <ApartmentsSection />
        <ServicesSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
