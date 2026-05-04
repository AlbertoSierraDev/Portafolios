import HeroSection from "../components/Home/HeroSection";
import AboutPanels from "../components/Home/AboutPanels";
import FeaturedProjectsSection from "../components/Home/FeaturedProjectsSection";
import SkillsSection from "../components/Home/SkillsSection";
import ContactCTASection from "../components/Home/ContactCTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutPanels />
      <FeaturedProjectsSection />
      <SkillsSection />
      <ContactCTASection />
    </>
  );
}
