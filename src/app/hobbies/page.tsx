import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Hobbies | William Eric Olson",
  description: "A brief look at William Olson's games, reading, and side projects outside astrophysics.",
};

const games = [
  ["Yu-Gi-Oh", "Deck building, interactions, and finding unusual lines through a complicated system."],
  ["Balatro", "Small rules combine into surprising strategies, which makes every run an optimization problem."],
];

export default function HobbiesPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-5 pb-24 pt-32 text-slate-100 sm:px-8">
      <Navbar />
      <article className="mx-auto max-w-4xl">
        <header className="grid gap-8 border-b border-white/10 pb-12 sm:grid-cols-[1fr_10rem] sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.24em] text-cyan-300">Mind · Hobbies</p>
            <h1 className="mt-4 text-5xl font-black tracking-tight text-white">Outside the lab.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">I read, play strategy games, study nutrition, and occasionally turn stray ideas into small software projects. Mostly, I enjoy learning how systems fit together.</p>
          </div>
          <video autoPlay loop muted playsInline aria-hidden="true" className="hidden aspect-square w-36 object-contain sm:block"><source src="/images/gifs/yugioh_floating_puzzle.webm" type="video/webm" media="(prefers-reduced-motion: no-preference)" /></video>
        </header>

        <section className="py-12">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-cyan-300">What I play</p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-left">
              <thead className="bg-white/[.05] text-xs uppercase tracking-[.15em] text-slate-400"><tr><th className="px-5 py-4 font-bold">Game</th><th className="px-5 py-4 font-bold">Why I return to it</th></tr></thead>
              <tbody className="divide-y divide-white/10">
                {games.map(([game, reason]) => <tr key={game}><th scope="row" className="px-5 py-5 align-top font-extrabold text-white">{game}</th><td className="px-5 py-5 leading-7 text-slate-400">{reason}</td></tr>)}
              </tbody>
            </table>
          </div>
        </section>

        <section className="border-t border-white/10 pt-10">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-cyan-300">Occasional side quests</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href="https://github.com/2xwlll/Languid_Elements" target="_blank" rel="noreferrer" className="rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-cyan-200 transition hover:border-cyan-300">Languid Elements ↗</a>
            <a href="https://github.com/2xwlll/Speed_Food_App" target="_blank" rel="noreferrer" className="rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-cyan-200 transition hover:border-cyan-300">Speed Food ↗</a>
          </div>
        </section>

        <Link href="/#philosophy" className="mt-12 inline-flex text-sm font-bold text-cyan-200">← Back to philosophy</Link>
      </article>
    </main>
  );
}
