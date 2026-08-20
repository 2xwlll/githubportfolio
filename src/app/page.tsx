import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/home/About";
import Philosophy from "@/components/home/Philosophy";
import ResearchShowcase from "@/components/home/ResearchShowcase";
import Projects from "@/components/home/Projects";
import CV from "@/components/home/CV";
import Contact from "@/components/home/Contact";
import TourGuide from "@/components/TourGuide";
import ResearchTimeline from "@/components/home/ResearchTimeline";

export default function Home() {
  return (
    <main className="overflow-hidden bg-slate-950 text-slate-100">
      <Navbar />
      <Hero />
      <About />
      <ResearchTimeline />
      <Philosophy />
      <ResearchShowcase />
      <Projects />
      <CV />
      <Contact />
      <TourGuide />
    </main>
  );
}
