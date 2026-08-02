import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function AthleticsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-5 pb-24 pt-32 text-slate-100 sm:px-8">
      <Navbar />
      <article className="mx-auto max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[.24em] text-cyan-300">Body · Athletics</p>
        <h1 className="mt-4 text-5xl font-black tracking-tight text-white">Discipline through movement.</h1>
        <p className="mt-7 text-lg leading-8 text-slate-300">Training is a practice in consistency, recovery, and steady progress—the same qualities I bring to research and everyday work.</p>
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            ["Train deliberately", "Sprinting and strength work reward patient, focused repetition."],
            ["Recover intelligently", "Rest and reflection make sustained progress possible."],
            ["Keep showing up", "Consistency compounds when motivation comes and goes."],
          ].map(([title, text]) => <div key={title} className="rounded-2xl border border-white/10 bg-white/[.045] p-5"><h2 className="font-bold text-white">{title}</h2><p className="mt-3 text-sm leading-6 text-slate-400">{text}</p></div>)}
        </div>
        <Link href="/#philosophy" className="mt-10 inline-flex text-sm font-bold text-cyan-200">← Back to philosophy</Link>
      </article>
    </main>
  );
}
