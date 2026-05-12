import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PartnersSection from "@/components/PartnersSection";
import ServicesSection from "@/components/ServicesSection";
import MethodologySection from "@/components/MethodologySection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import GlobalBackground from "@/components/GlobalBackground";

const Index = () => {
  return (
    <div className="min-h-screen">
      <GlobalBackground />
      <Header />
      <main>
        <HeroSection />
        <PartnersSection />
        <ServicesSection />
        <MethodologySection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
