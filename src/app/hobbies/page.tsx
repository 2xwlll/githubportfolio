import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function HobbiesPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-5 pb-24 pt-32 text-slate-100 sm:px-8">
      <Navbar />
      <article className="mx-auto max-w-5xl">
        <header className="grid gap-8 md:grid-cols-[1fr_18rem] md:items-center">
          <div><p className="text-xs font-bold uppercase tracking-[.24em] text-cyan-300">Mind · Hobbies</p><h1 className="mt-4 text-5xl font-black tracking-tight text-white">What I do outside the lab.</h1><p className="mt-7 text-lg leading-8 text-slate-300">I read, play games, study nutrition, and build small pieces of software. I enjoy learning the rules of a system—and finding where they interact.</p></div>
          <div className="hidden aspect-square place-items-center rounded-[2rem] border border-cyan-300/15 bg-cyan-300/[.04] md:grid"><video autoPlay loop muted playsInline aria-hidden="true" className="h-56 w-56 object-contain"><source src="/images/gifs/yugioh_floating_puzzle.webm" type="video/webm" media="(prefers-reduced-motion: no-preference)" /></video></div>
        </header>
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            ["Reading", "I read about physics, technology, nutrition, finance, and other subjects that give me a new system to understand."],
            ["Games", "I enjoy games, including Yu-Gi-Oh, that reward learning interactions, comparing strategies, and optimizing a plan."],
            ["Small builds", "When an idea seems testable, I use code and AI to turn it into a prototype instead of leaving it as a thought."],
          ].map(([title, text]) => <div key={title} className="rounded-2xl border border-white/10 bg-white/[.045] p-5"><h2 className="font-bold text-white">{title}</h2><p className="mt-3 text-sm leading-6 text-slate-400">{text}</p></div>)}
        </div>
        <section className="mt-14 border-t border-white/10 pt-10">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-cyan-300">Games in the rotation</p>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <figure className="overflow-hidden rounded-2xl border border-white/10 bg-white/[.035] p-4"><video autoPlay loop muted playsInline aria-hidden="true" className="aspect-square w-full object-contain"><source src="/images/gifs/yugioh_floating_puzzle.webm" type="video/webm" media="(prefers-reduced-motion: no-preference)" /></video><figcaption className="mt-3 text-center text-xs font-bold uppercase tracking-[.14em] text-slate-400">Yu-Gi-Oh</figcaption></figure>
            <figure className="overflow-hidden rounded-2xl border border-white/10 bg-white/[.035] p-4"><Image src="/images/gifs/yugioh_burst_stream.gif" alt="Blue-Eyes White Dragon animation" width={512} height={512} unoptimized className="aspect-square w-full object-contain" /><figcaption className="mt-3 text-center text-xs font-bold uppercase tracking-[.14em] text-slate-400">Deck building</figcaption></figure>
            <figure className="overflow-hidden rounded-2xl border border-white/10 bg-white/[.035] p-4"><video autoPlay loop muted playsInline aria-hidden="true" className="aspect-square w-full object-contain"><source src="/images/gifs/balatro_blueprint.webm" type="video/webm" media="(prefers-reduced-motion: no-preference)" /></video><figcaption className="mt-3 text-center text-xs font-bold uppercase tracking-[.14em] text-slate-400">Balatro</figcaption></figure>
            <figure className="overflow-hidden rounded-2xl border border-white/10 bg-white/[.035] p-4"><video autoPlay loop muted playsInline aria-hidden="true" className="aspect-square w-full object-contain"><source src="/images/gifs/balatro_brainstorm.webm" type="video/webm" media="(prefers-reduced-motion: no-preference)" /></video><figcaption className="mt-3 text-center text-xs font-bold uppercase tracking-[.14em] text-slate-400">Finding combos</figcaption></figure>
          </div>
        </section>
        <section className="mt-14 border-t border-white/10 pt-10"><p className="text-xs font-bold uppercase tracking-[.2em] text-cyan-300">Recent side quests</p><div className="mt-6 space-y-4"><a href="https://github.com/2xwlll/Languid_Elements" target="_blank" rel="noreferrer" className="block rounded-2xl border border-white/10 bg-white/[.045] p-6 transition hover:border-cyan-300/50"><h2 className="font-bold text-white">Languid Elements ↗</h2><p className="mt-2 leading-7 text-slate-400">A game concept that began as a passing idea and became an experiment in AI-assisted building.</p></a><a href="https://github.com/2xwlll/Speed_Food_App" target="_blank" rel="noreferrer" className="block rounded-2xl border border-white/10 bg-white/[.045] p-6 transition hover:border-cyan-300/50"><h2 className="font-bold text-white">Speed Food ↗</h2><p className="mt-2 leading-7 text-slate-400">A work-in-progress food, recipe, and shopping-list tool designed around the needs of sprinters.</p></a></div></section>
        <Link href="/#philosophy" className="mt-10 inline-flex text-sm font-bold text-cyan-200">← Back to philosophy</Link>
      </article>
    </main>
  );
}
