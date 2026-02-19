import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Team from "@/components/Team";

export const metadata: Metadata = {
  title: "Our Team | Enewable - Solar Experts Johannesburg",
  description: "Meet the Enewable team - Rob Bagley (CEO), Johnathan Bagley (CTO), Michael van Zyl (Sales Director), and Leo (Solar Advisor). 35+ years combined experience in solar energy.",
};

export default function TeamPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-20">
        <Team />
      </div>
      <Footer />
    </main>
  );
}
