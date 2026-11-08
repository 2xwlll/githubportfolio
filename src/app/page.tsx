import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/home/About";
import Philosophy from "@/components/home/Philosophy";
import ResearchShowcase from "@/components/home/ResearchShowcase";
import Projects from "@/components/home/Projects";
import Outreach from "@/components/home/Outreach";
import CV from "@/components/home/CV";
import Contact from "@/components/home/Contact";

export default function Home() {
  return (
    <main className="overflow-hidden bg-slate-950 text-slate-100">
      <Navbar />
      <Hero />
      <About />
      <ResearchShowcase />
      <Projects />
      <Outreach />
      <Philosophy />
      <CV />
      <Contact />
    </main>
  );
}
