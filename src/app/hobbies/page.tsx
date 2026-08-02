import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function HobbiesPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-5 pb-24 pt-32 text-slate-100 sm:px-8">
      <Navbar />
      <article className="mx-auto max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[.24em] text-cyan-300">Mind · Hobbies</p>
        <h1 className="mt-4 text-5xl font-black tracking-tight text-white">Curiosity beyond the lab.</h1>
        <p className="mt-7 text-lg leading-8 text-slate-300">The questions I follow for fun—through science, mathematics, computation, and the ideas that connect them.</p>
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            ["Read widely", "Following ideas across physics, technology, and culture."],
            ["Build experiments", "Turning small questions into code, models, and prototypes."],
            ["Stay curious", "Keeping a beginner’s mindset when the answer is not obvious."],
          ].map(([title, text]) => <div key={title} className="rounded-2xl border border-white/10 bg-white/[.045] p-5"><h2 className="font-bold text-white">{title}</h2><p className="mt-3 text-sm leading-6 text-slate-400">{text}</p></div>)}
        </div>
        <Link href="/#philosophy" className="mt-10 inline-flex text-sm font-bold text-cyan-200">← Back to philosophy</Link>
      </article>
    </main>
  );
}
