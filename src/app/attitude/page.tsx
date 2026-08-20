import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function AttitudePage() {
  return (
    <main className="min-h-screen bg-slate-950 px-5 pb-24 pt-32 text-slate-100 sm:px-8">
      <Navbar />
      <article className="mx-auto max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[.24em] text-cyan-300">Character · Attitude</p>
        <h1 className="mt-4 text-5xl font-black tracking-tight text-white">How I respond when something is difficult.</h1>
        <p className="mt-7 text-lg leading-8 text-slate-300">I care about being ambitious without pretending to have every answer. Research, training, and building all work better when I can be candid about uncertainty, learn from failed attempts, and keep moving.</p>
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            ["Be honest about the work", "Call an experiment an experiment, document its limits, and avoid polishing away uncertainty."],
            ["Let failure teach", "A pipeline that breaks or a result that does not transfer is information about the next question."],
            ["Stay useful to others", "Share methods, write tutorials, and make it easier for collaborators to understand and extend the work."],
          ].map(([title, text]) => <div key={title} className="rounded-2xl border border-white/10 bg-white/[.045] p-5"><h2 className="font-bold text-white">{title}</h2><p className="mt-3 text-sm leading-6 text-slate-400">{text}</p></div>)}
        </div>
        <section className="mt-14 border-t border-white/10 pt-9"><h2 className="text-2xl font-extrabold text-white">My usual response is to work through it.</h2><p className="mt-4 leading-8 text-slate-300">When a race, model, or plan falls short, I try to separate the result from my identity. I determine what I can control, make a measurable adjustment, and continue. This does not guarantee that the next attempt will succeed, but it gives the failure a purpose.</p></section>
        <Link href="/#philosophy" className="mt-10 inline-flex text-sm font-bold text-cyan-200">← Back to philosophy</Link>
      </article>
    </main>
  );
}
