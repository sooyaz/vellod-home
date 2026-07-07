import Navbar from "@/components/layout/Navbar";

import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Portfolio from "@/sections/Portfolio";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="pt-20">
        <Hero />
        <About />
        <Portfolio />
      </main>
    </>
  );
}