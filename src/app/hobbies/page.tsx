import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function HobbiesPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-5 pb-24 pt-32 text-slate-100 sm:px-8">
      <Navbar />
      <article className="mx-auto max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[.24em] text-cyan-300">Mind · Hobbies</p>
        <h1 className="mt-4 text-5xl font-black tracking-tight text-white">Curiosity beyond the lab.</h1>
        <p className="mt-7 text-lg leading-8 text-slate-300">Outside formal research, I like turning half-formed questions into something I can test, play with, or share. Code is often the medium, but curiosity is the actual hobby.</p>
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            ["Follow strange questions", "Reading across astronomy, AI, technology, and whatever new subject catches my attention."],
            ["Prototype ideas", "Using code and AI to turn shower thoughts into small apps, games, and experiments."],
            ["Learn in public", "Sharing unfinished work so the process—and not only a polished result—can be useful."],
          ].map(([title, text]) => <div key={title} className="rounded-2xl border border-white/10 bg-white/[.045] p-5"><h2 className="font-bold text-white">{title}</h2><p className="mt-3 text-sm leading-6 text-slate-400">{text}</p></div>)}
        </div>
        <section className="mt-14 border-t border-white/10 pt-10"><p className="text-xs font-bold uppercase tracking-[.2em] text-cyan-300">Recent side quests</p><div className="mt-6 space-y-4"><a href="https://github.com/2xwlll/Languid_Elements" target="_blank" rel="noreferrer" className="block rounded-2xl border border-white/10 bg-white/[.045] p-6 transition hover:border-cyan-300/50"><h2 className="font-bold text-white">Languid Elements ↗</h2><p className="mt-2 leading-7 text-slate-400">A game concept that began as a passing idea and became an experiment in AI-assisted building.</p></a><a href="https://github.com/2xwlll/Speed_Food_App" target="_blank" rel="noreferrer" className="block rounded-2xl border border-white/10 bg-white/[.045] p-6 transition hover:border-cyan-300/50"><h2 className="font-bold text-white">Speed Food ↗</h2><p className="mt-2 leading-7 text-slate-400">A work-in-progress food, recipe, and shopping-list tool designed around the needs of sprinters.</p></a></div></section>
        <Link href="/#philosophy" className="mt-10 inline-flex text-sm font-bold text-cyan-200">← Back to philosophy</Link>
      </article>
    </main>
  );
}
