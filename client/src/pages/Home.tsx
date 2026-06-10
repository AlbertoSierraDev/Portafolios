import { useEffect } from "react";

import HeroSection from "../components/Home/HeroSection";
import AboutPanels from "../components/Home/AboutPanels";
import FeaturedProjectsSection from "../components/Home/FeaturedProjectsSection";
import SkillsSection from "../components/Home/SkillsSection";
import ContactCTASection from "../components/Home/ContactCTASection";

export default function Home() {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    if (!mediaQuery.matches) {
      return;
    }

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, []);

  return (
    <main className="min-h-screen md:h-screen md:overflow-y-scroll md:scroll-smooth md:snap-y md:snap-mandatory">
      <section className="min-h-screen md:snap-center">
        <HeroSection />
      </section>

      <section className="min-h-screen md:snap-center">
        <AboutPanels />
      </section>

      <section className="min-h-screen md:snap-center">
        <FeaturedProjectsSection />
      </section>

      <section className="min-h-screen md:snap-start">
        <SkillsSection />
      </section>

      <section className="min-h-screen md:snap-center">
        <ContactCTASection />
      </section>
    </main>
  );
}
