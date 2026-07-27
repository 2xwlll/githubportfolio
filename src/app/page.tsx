import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/home/About";
import Philosophy from "@/components/home/Philosophy";
import Contact from "@/components/home/Contact";

export default function Home() {
  return (
    <main className="overflow-hidden bg-slate-950 text-slate-100">
      <Navbar />
      <Hero />
      <About />
      <Philosophy />
      <Contact />
    </main>
  );
}
