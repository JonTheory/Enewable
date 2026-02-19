import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
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
      <ProcessSection />
      <ROICalculator />
      <Testimonials />
      <QuoteForm />
      <Footer />
      <SolarGenius />
    </main>
  );
}
