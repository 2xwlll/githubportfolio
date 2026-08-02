import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function AttitudePage() {
  return (
    <main className="min-h-screen bg-slate-950 px-5 pb-24 pt-32 text-slate-100 sm:px-8">
      <Navbar />
      <article className="mx-auto max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[.24em] text-cyan-300">Character · Attitude</p>
        <h1 className="mt-4 text-5xl font-black tracking-tight text-white">Stability through perspective.</h1>
        <p className="mt-7 text-lg leading-8 text-slate-300">Humility, integrity, and perseverance help me navigate uncertainty, learn from setbacks, and work well with other people.</p>
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            ["Stay grounded", "Let evidence, reflection, and empathy guide decisions."],
            ["Learn from friction", "Treat setbacks as information instead of identity."],
            ["Work with integrity", "Be dependable, honest, and generous with collaborators."],
          ].map(([title, text]) => <div key={title} className="rounded-2xl border border-white/10 bg-white/[.045] p-5"><h2 className="font-bold text-white">{title}</h2><p className="mt-3 text-sm leading-6 text-slate-400">{text}</p></div>)}
        </div>
        <Link href="/#philosophy" className="mt-10 inline-flex text-sm font-bold text-cyan-200">← Back to philosophy</Link>
      </article>
    </main>
  );
}
