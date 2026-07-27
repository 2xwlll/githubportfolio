import Navbar from "@/components/Navbar";
import CV from "@/components/home/CV";
import Contact from "@/components/home/Contact";

export default function CVPage() {
  return <main className="min-h-screen bg-slate-950 text-slate-100"><Navbar /><div className="pt-16"><CV /></div><Contact /></main>;
}
