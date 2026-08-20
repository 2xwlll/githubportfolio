import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function AthleticsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-5 pb-24 pt-32 text-slate-100 sm:px-8">
      <Navbar />
      <article className="mx-auto max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[.24em] text-cyan-300">Body · Athletics</p>
        <h1 className="mt-4 text-5xl font-black tracking-tight text-white">Discipline through movement.</h1>
        <p className="mt-7 text-lg leading-8 text-slate-300">I sprint and strength train. Athletics gives me a daily practice in doing precise work at the edge of my ability, then recovering well enough to return and improve.</p>
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            ["Speed", "Sprinting turns mechanics, power, and focus into a few honest seconds on the clock."],
            ["Strength", "Work in the weight room builds the capacity to produce force and stay resilient."],
            ["Recovery", "Food, sleep, and restraint are part of training—not the time between it."],
          ].map(([title, text]) => <div key={title} className="rounded-2xl border border-white/10 bg-white/[.045] p-5"><h2 className="font-bold text-white">{title}</h2><p className="mt-3 text-sm leading-6 text-slate-400">{text}</p></div>)}
        </div>
        <section className="mt-14 rounded-3xl border border-cyan-300/20 bg-cyan-300/[.06] p-7 sm:p-9"><p className="text-xs font-bold uppercase tracking-[.2em] text-cyan-300">Where athletics meets building</p><h2 className="mt-3 text-2xl font-extrabold text-white">Speed Food</h2><p className="mt-4 leading-7 text-slate-300">I started building a food-tracking and recipe tool specifically for sprinters. It is an early experiment in making the everyday logistics around training easier to manage.</p><a href="https://github.com/2xwlll/Speed_Food_App" target="_blank" rel="noreferrer" className="mt-5 inline-flex text-sm font-bold text-cyan-200">See the work in progress ↗</a></section>
        <Link href="/#philosophy" className="mt-10 inline-flex text-sm font-bold text-cyan-200">← Back to philosophy</Link>
      </article>
    </main>
  );
}
