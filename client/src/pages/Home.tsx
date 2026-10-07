import HeroSection from "../components/Home/HeroSection";
import AboutPanels from "../components/Home/AboutPanels";
import FeaturedProjectsSection from "../components/Home/FeaturedProjectsSection";
import SkillsSection from "../components/Home/SkillsSection";
import ContactCTASection from "../components/Home/ContactCTASection";
import CertificatesSection from "../components/Home/CertificatesSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <section>
        <HeroSection />
      </section>

      <section>
        <AboutPanels />
      </section>

      <section>
        <CertificatesSection />
      </section>

      <section>
        <FeaturedProjectsSection />
      </section>

      <section>
        <SkillsSection />
      </section>

      <section>
        <ContactCTASection />
      </section>
    </main>
  );
}
