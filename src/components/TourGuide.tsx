"use client";

import { useEffect, useRef, useState } from "react";

type TourMode = "quick" | "research";
const tours = {
  quick: [
    { target: "top", title: "Start here", text: "A concise introduction to who I am and the problems at the center of my current work." },
    { target: "about", title: "My background", text: "Physics at UTSA led me from AGN infrared imaging into machine learning and radio astronomy." },
    { target: "philosophy", title: "Beyond the résumé", text: "Sprinting, coaching, and experimentation influence how I learn and respond when a plan fails." },
    { target: "contact", title: "Continue the conversation", text: "Ask about a project, inspect the public code, download my CV, or discuss a research opportunity." },
  ],
  research: [
    { target: "top", title: "Current questions", text: "My work concerns AGN morphology, physically informed machine learning, and radio technosignature searches." },
    { target: "about", title: "Research context", text: "I work with the UTSA MAE Research Group and the Breakthrough Listen collaboration." },
    { target: "research", title: "Research areas", text: "Each card explains a scientific problem, methods, quantitative progress, limitations, and next steps." },
    { target: "projects", title: "Reproducible code", text: "These repositories expose the working pipelines, notebooks, and experiments behind the summaries." },
    { target: "cv", title: "Preparation", text: "Review my research experience, outreach, and presentations, or download the November 2026 CV." },
    { target: "contact", title: "Questions and collaboration", text: "I welcome technical questions about the methods and conversations about research opportunities." },
  ],
} satisfies Record<TourMode, { target: string; title: string; text: string }[]>;

export default function TourGuide() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<TourMode | null>(null);
  const [step, setStep] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const launchButtonRef = useRef<HTMLButtonElement>(null);
  const steps = mode ? tours[mode] : tours.quick;

  const closeTour = () => { setOpen(false); setMode(null); window.setTimeout(() => launchButtonRef.current?.focus(), 0); };

  useEffect(() => {
    if (!open || !mode) return;
    const target = document.getElementById(steps[step].target);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    target?.classList.add("tour-focus");
    closeButtonRef.current?.focus();
    return () => target?.classList.remove("tour-focus");
  }, [open, mode, step, steps]);

  useEffect(() => {
    if (!open) return;
    const keys = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeTour();
      if (!mode) return;
      if (event.key === "ArrowRight") setStep((value) => Math.min(value + 1, steps.length - 1));
      if (event.key === "ArrowLeft") setStep((value) => Math.max(value - 1, 0));
    };
    window.addEventListener("keydown", keys);
    return () => window.removeEventListener("keydown", keys);
  }, [open, mode, steps.length]);

  if (!open) return <button ref={launchButtonRef} type="button" onClick={() => setOpen(true)} className="fixed bottom-5 right-5 z-40 rounded-full border border-cyan-200/40 bg-slate-950/90 px-5 py-3 text-sm font-bold text-cyan-100 shadow-2xl shadow-black/40 backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-cyan-300 hover:text-slate-950">Take the tour <span aria-hidden="true">→</span></button>;

  if (!mode) return <aside className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-xl rounded-3xl border border-cyan-200/30 bg-slate-950/95 p-6 text-slate-100 shadow-2xl backdrop-blur-xl" role="dialog" aria-labelledby="tour-choice-title"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-cyan-300">Choose a tour</p><h2 id="tour-choice-title" className="mt-3 text-2xl font-extrabold text-white">What would you like to see?</h2></div><button ref={closeButtonRef} type="button" onClick={closeTour} className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-bold text-slate-300">Close</button></div><div className="mt-6 grid gap-3 sm:grid-cols-2"><button type="button" onClick={() => { setStep(0); setMode("quick"); }} className="rounded-2xl border border-white/10 bg-white/[.04] p-5 text-left transition hover:border-cyan-300/60"><span className="font-extrabold text-white">Quick overview · 4 stops</span><span className="mt-2 block text-sm leading-6 text-slate-400">Background, personal approach, and contact.</span></button><button type="button" onClick={() => { setStep(0); setMode("research"); }} className="rounded-2xl border border-cyan-300/30 bg-cyan-300/10 p-5 text-left transition hover:border-cyan-300"><span className="font-extrabold text-cyan-100">Research tour · 6 stops</span><span className="mt-2 block text-sm leading-6 text-slate-400">Methods, results, repositories, and preparation.</span></button></div></aside>;

  const current = steps[step];
  return <aside className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-xl rounded-3xl border border-cyan-200/30 bg-slate-950/95 p-5 text-slate-100 shadow-2xl backdrop-blur-xl sm:p-6" role="dialog" aria-labelledby="tour-title" aria-describedby="tour-description"><div className="flex items-center justify-between gap-4"><p className="text-xs font-bold uppercase tracking-[.2em] text-cyan-300" aria-live="polite">{mode === "quick" ? "Quick tour" : "Research tour"} · {step + 1}/{steps.length}</p><button ref={closeButtonRef} type="button" onClick={closeTour} className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-bold text-slate-300">Close</button></div><div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-cyan-300 transition-[width] duration-500" style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div><h2 id="tour-title" className="mt-5 text-2xl font-extrabold text-white">{current.title}</h2><p id="tour-description" className="mt-3 leading-7 text-slate-300">{current.text}</p><div className="mt-6 flex justify-between gap-3"><button type="button" onClick={() => setStep((value) => value - 1)} disabled={step === 0} className="rounded-full border border-white/20 px-4 py-2.5 text-sm font-bold disabled:opacity-35">← Previous</button>{step < steps.length - 1 ? <button type="button" onClick={() => setStep((value) => value + 1)} className="rounded-full bg-cyan-300 px-5 py-2.5 text-sm font-bold text-slate-950">Next →</button> : <button type="button" onClick={closeTour} className="rounded-full bg-cyan-300 px-5 py-2.5 text-sm font-bold text-slate-950">Finish</button>}</div><p className="mt-4 hidden text-center text-xs text-slate-500 sm:block">Use ← and → to move. Press Esc to close.</p></aside>;
}
