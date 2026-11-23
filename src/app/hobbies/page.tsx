import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import HobbyStickers from "@/components/HobbyStickers";

export const metadata: Metadata = {
  title: "Hobbies | William Eric Olson",
  description: "Games, Yu-Gi-Oh decks, Minecraft, and side projects outside astrophysics.",
};

const games = [
  ["Yu-Gi-Oh", "Deck building, interactions, and finding unusual lines through a complicated system."],
  ["Balatro", "Small rules combine into surprising strategies, which makes every run an optimization problem."],
  ["Minecraft", "Building, exploring, and seeing where a small idea can lead."],
];

export default function HobbiesPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 px-5 pb-24 pt-32 text-slate-100 sm:px-8">
      <Navbar />
      <article className="relative mx-auto max-w-4xl">
        <header className="grid gap-8 border-b border-white/10 pb-12 sm:grid-cols-[1fr_10rem] sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.24em] text-cyan-300">Mind · Hobbies</p>
            <h1 className="mt-4 text-5xl font-black tracking-tight text-white">Outside the lab.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">I read, play strategy games, study nutrition, and occasionally turn stray ideas into small software projects. Mostly, I enjoy learning how systems fit together.</p>
          </div>
          <video autoPlay loop muted playsInline aria-hidden="true" className="hidden aspect-square w-36 object-contain sm:block"><source src="/images/gifs/yugioh_floating_puzzle.webm" type="video/webm" media="(prefers-reduced-motion: no-preference)" /></video>
        </header>
        <HobbyStickers />

        <section className="py-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-cyan-300">What I play</p>
            <a href="https://ygoprodeck.com/author/big-w-150657" target="_blank" rel="noopener noreferrer" className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 text-sm font-bold text-cyan-200 transition hover:border-cyan-200 hover:bg-cyan-300/20">Browse my Yu-Gi-Oh decks</a>
          </div>
          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-left">
              <thead className="bg-white/[.05] text-xs uppercase tracking-[.15em] text-slate-400"><tr><th className="px-5 py-4 font-bold">Game</th><th className="px-5 py-4 font-bold">Why I return to it</th></tr></thead>
              <tbody className="divide-y divide-white/10">
                {games.map(([game, reason]) => <tr key={game}><th scope="row" className="px-5 py-5 align-top font-extrabold text-white">{game}</th><td className="px-5 py-5 leading-7 text-slate-400">{reason}</td></tr>)}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid gap-10 border-t border-white/10 pt-10 sm:grid-cols-[1fr_16rem] sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-cyan-300">Occasional side quests</p>
            <p className="mt-5 leading-8 text-slate-400">Sometimes an idea turns into code. Sometimes it turns into another build, another deck, or another evening exploring.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href="https://github.com/2xwlll/Languid_Elements" target="_blank" rel="noreferrer" className="rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-cyan-200 transition hover:border-cyan-300">Languid Elements ↗</a>
              <a href="https://github.com/2xwlll/Speed_Food_App" target="_blank" rel="noreferrer" className="rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-cyan-200 transition hover:border-cyan-300">Speed Food ↗</a>
            </div>
          </div>
          <figure className="relative mx-auto mt-2 w-full max-w-72 rotate-3 rounded-2xl border border-white/15 bg-slate-900 p-3 shadow-2xl">
            <Image src="/images/hobbies/ChatGPT Image Sep 12, 2026, 09_30_16 PM.png" alt="Toadally Awesome floating through a lantern-lit garden on a lily pad" width={1536} height={1024} sizes="(min-width: 640px) 240px, 75vw" className="aspect-[3/2] w-full rounded-xl object-cover" />
            <figcaption className="px-2 pb-1 pt-3 text-sm font-medium text-slate-400">A little room for imagination.</figcaption>
            <picture className="absolute -right-4 -top-14 block w-28 -rotate-12 sm:-right-8 sm:w-36">
              <source media="(prefers-reduced-motion: reduce)" srcSet="/images/hobbies/minecraft-still.webp" />
              <Image src="/images/hobbies/cool_minecraft.gif" alt="A tiny rotating Minecraft world" width={360} height={226} unoptimized className="h-auto w-full drop-shadow-xl" />
            </picture>
          </figure>
        </section>

        <Link href="/#philosophy" className="mt-12 inline-flex text-sm font-bold text-cyan-200">← Back to philosophy</Link>
      </article>
    </main>
  );
}
