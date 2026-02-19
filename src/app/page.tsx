import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import Team from "@/components/Team";
import ProcessSection from "@/components/ProcessSection";
import ROICalculator from "@/components/ROICalculator";
import Testimonials from "@/components/Testimonials";
import QuoteForm from "@/components/QuoteForm";
import Footer from "@/components/Footer";
import SolarGenius from "@/components/SolarGenius";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <Team />
      <ProcessSection />
      <ROICalculator />
      <Testimonials />
      <QuoteForm />
      <Footer />
      <SolarGenius />
    </main>
  );
}
