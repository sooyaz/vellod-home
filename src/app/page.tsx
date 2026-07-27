import Navbar from "@/components/layout/Navbar";

import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Portfolio from "@/sections/Portfolio";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      <Navbar />

      <main className="pt-20">
        <Hero />
        <About />
        <Portfolio />
      </main>
    </div>
  );
}