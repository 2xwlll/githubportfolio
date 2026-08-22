"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const identityLines = [
  <>I build physically informed <strong>machine-learning tools</strong> for astronomical discovery.</>,
  <>I trace how <strong>black holes shape galaxies</strong> through light and structure.</>,
  <>I search the radio sky for <strong>signals technology might leave behind</strong>.</>,
  <>I turn physical questions into <strong>transparent, reproducible code</strong>.</>,
];

export default function Hero() {
  const [workIndex, setWorkIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(
      () => setWorkIndex((current) => (current + 1) % identityLines.length),
      3600,
    );
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="top" className="relative isolate flex min-h-[780px] items-end overflow-hidden pt-24 sm:min-h-screen">
      <Image src="/images/general/hero-bg.jpg" alt="" fill priority sizes="100vw" className="absolute inset-0 -z-20 object-cover object-center opacity-40" />
      <div aria-hidden="true" className="pointer-events-none absolute right-[-14%] top-[8%] -z-10 h-[42%] w-[92%] animate-[slow-drift_18s_ease-in-out_infinite_alternate] opacity-55 mix-blend-screen sm:right-[-4%] sm:top-[8%] sm:h-[70%] sm:w-[62%]"><video autoPlay loop muted playsInline poster="/images/general/hero-bg.jpg" className="h-full w-full object-contain"><source src="/images/gifs/black-hole.webm" type="video/webm" /></video></div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,6,23,.96)_0%,rgba(2,6,23,.72)_45%,rgba(2,6,23,.3)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_20%,rgba(34,211,238,.18),transparent_32%),linear-gradient(0deg,#020617_0%,transparent_38%)]" />
      <div aria-hidden="true" className="hero-orbit hero-orbit-one"><span /></div>
      <div aria-hidden="true" className="hero-orbit hero-orbit-two"><span /></div>
      <div className="mx-auto w-full max-w-7xl px-5 pb-20 sm:px-8 sm:pb-28">
        <div className="max-w-3xl">
          <Image src="/images/profile/highres_headshot.jpg" alt="William Eric Olson" width={128} height={128} priority className="mb-7 mt-5 h-28 w-28 animate-[hero-reveal_700ms_ease-out_both] rounded-[2rem] border-2 border-cyan-100/50 object-cover object-center shadow-2xl shadow-cyan-950/50 sm:h-32 sm:w-32" />
          <p className="mb-6 flex animate-[hero-reveal_700ms_100ms_ease-out_both] items-center gap-3 text-xs font-bold uppercase tracking-[.25em] text-cyan-200"><span className="h-px w-10 bg-cyan-300" /> Astrophysics Undergraduate Researcher</p>
          <h1 className="max-w-2xl animate-[hero-reveal_800ms_180ms_ease-out_both] text-5xl font-black leading-[.9] tracking-[-.055em] text-white sm:text-7xl lg:text-8xl">William<br /><span className="text-cyan-100">Eric Olson</span></h1>
          <div className="mt-8 flex min-h-[5.5rem] max-w-2xl items-start animate-[hero-reveal_800ms_260ms_ease-out_both] sm:min-h-[4.5rem]">
            <p className="sr-only">I build physically informed machine-learning tools for astronomy, studying black holes, galaxies, and radio technosignatures through reproducible code.</p>
            <p key={workIndex} aria-hidden="true" className="identity-line text-xl font-light leading-9 text-cyan-100 sm:text-2xl">{identityLines[workIndex]}</p>
          </div>
          <p className="mt-7 max-w-xl animate-[hero-reveal_800ms_340ms_ease-out_both] text-base leading-7 text-slate-300 sm:text-lg">Currently studying AGN ionization cones at UTSA and radio technosignatures with Breakthrough Listen.</p>
          <div className="mt-10 flex animate-[hero-reveal_800ms_420ms_ease-out_both] flex-wrap gap-3">
            <Link href="/#featured-research" className="button-sweep rounded-full bg-cyan-300 px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-200">See my strongest work <span aria-hidden="true">↓</span></Link>
            <Link href="/cv" className="button-sweep rounded-full border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-white/10">View curriculum vitae</Link>
            <Link href="/publications" className="rounded-full px-4 py-3.5 text-sm font-semibold text-cyan-200 transition hover:text-white">Research outputs <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <div className="mt-16 flex items-center gap-4 text-xs uppercase tracking-[.2em] text-slate-400"><span className="h-px w-14 bg-slate-600" /> Research, projects, and background</div>
      </div>
    </section>
  );
}
