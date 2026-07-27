"use client";

import { useEffect, useState } from "react";

const taglines = [
  "Finding structure in the universe's noisiest data.",
  "Building tools for the next generation of discovery.",
  "Where astrophysics meets machine intelligence.",
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % taglines.length), 3800);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="top" className="relative isolate flex min-h-[780px] items-end overflow-hidden pt-24 sm:min-h-screen">
      <img src="/images/general/hero-bg.jpg" alt="" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,6,23,.96)_0%,rgba(2,6,23,.72)_45%,rgba(2,6,23,.3)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_20%,rgba(34,211,238,.18),transparent_32%),linear-gradient(0deg,#020617_0%,transparent_38%)]" />
      <div className="mx-auto w-full max-w-7xl px-5 pb-20 sm:px-8 sm:pb-28">
        <div className="max-w-3xl">
          <img src="/images/profile/highres_headshot.jpg" alt="William Eric Olson" className="relative top-4 mb-7 mt-5 h-28 w-28 rounded-[2rem] border-2 border-cyan-100/50 object-cover object-top shadow-2xl shadow-cyan-950/50 sm:h-32 sm:w-32" />
          <p className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[.25em] text-cyan-200"><span className="h-px w-10 bg-cyan-300" /> Astrophysics Undergraduate Researcher</p>
          <h1 className="max-w-2xl text-5xl font-black leading-[.9] tracking-[-.055em] text-white sm:text-7xl lg:text-8xl">William<br /><span className="text-cyan-100">Eric Olson</span></h1>
          <p className="mt-8 min-h-8 text-xl font-light text-cyan-100 sm:text-2xl">{taglines[index]}</p>
          <p className="mt-7 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">I explore the intersection of astrophysics, artificial intelligence, and scientific discovery—from JWST observations and machine learning to radio technosignatures.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="/research" className="rounded-full bg-cyan-300 px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-200">Explore research <span aria-hidden="true">↗</span></a>
            <a href="/cv" className="rounded-full border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-cyan-200 hover:bg-white/10">View curriculum vitae</a>
          </div>
        </div>
        <div className="mt-16 flex items-center gap-4 text-xs uppercase tracking-[.2em] text-slate-400"><span className="h-px w-14 bg-slate-600" /> Scroll to explore</div>
      </div>
    </section>
  );
}
