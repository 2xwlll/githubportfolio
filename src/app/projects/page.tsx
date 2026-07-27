import Navbar from "@/components/Navbar";
import Projects from "@/components/home/Projects";
import Contact from "@/components/home/Contact";

export default function ProjectsPage() {
  return <main className="min-h-screen bg-slate-950 text-slate-100"><Navbar /><div className="pt-16"><Projects /></div><Contact /></main>;
}
