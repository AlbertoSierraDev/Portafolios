import HeroSection from "../components/Home/HeroSection";
import AboutPanels from "../components/Home/AboutPanels";
import FeaturedProjectsSection from "../components/Home/FeaturedProjectsSection";
import SkillsSection from "../components/Home/SkillsSection";
import ContactCTASection from "../components/Home/ContactCTASection";
import CertificatesSection from "../components/Home/CertificatesSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="min-h-screen md:snap-start">
        <HeroSection />
      </section>

      <section className="min-h-screen md:snap-start">
        <AboutPanels />
      </section>

      <section className="min-h-screen md:snap-start">
        <CertificatesSection />
      </section>

      <section className="min-h-screen md:snap-start">
        <FeaturedProjectsSection />
      </section>

      <section className="min-h-screen md:snap-start">
        <SkillsSection />
      </section>

      <section className="min-h-screen md:snap-start">
        <ContactCTASection />
      </section>
    </main>
  );
}
