import Navbar from "@/components/Navbar";
import ResearchShowcase from "@/components/home/ResearchShowcase";
import Contact from "@/components/home/Contact";

export default function ResearchPage() {
  return <main className="min-h-screen bg-slate-950 text-slate-100"><Navbar /><div className="pt-16"><ResearchShowcase /></div><Contact /></main>;
}
