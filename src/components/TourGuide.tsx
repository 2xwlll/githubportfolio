"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    target: "top",
    title: "Start here",
    text: "This introduction summarizes who I am and rotates through the three problems at the center of my current work.",
  },
  {
    target: "about",
    title: "My research background",
    text: "This section connects my physics education at UTSA with my work in AGN, machine learning, and radio astronomy.",
  },
  {
    target: "philosophy",
    title: "How I approach the work",
    text: "Sprinting, curiosity, and coaching influence how I solve problems, respond to failure, and share what I learn.",
  },
  {
    target: "research",
    title: "Research areas",
    text: "Open any card for the scientific question, methods, current results, limitations, and next steps behind that research area.",
  },
  {
    target: "projects",
    title: "Working code",
    text: "These are public repositories connected directly to my current astronomy research, including the methods I am still testing.",
  },
  {
    target: "cv",
    title: "Training and experience",
    text: "This is a brief academic summary. You can request my complete curriculum vitae by email.",
  },
  {
    target: "contact",
    title: "Continue the conversation",
    text: "Use these links to ask about the research, examine the code, or discuss an opportunity to work together.",
  },
];

export default function TourGuide() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const launchButtonRef = useRef<HTMLButtonElement>(null);

  const closeTour = () => {
    setOpen(false);
    window.setTimeout(() => launchButtonRef.current?.focus(), 0);
  };

  useEffect(() => {
    if (!open) return;

    const target = document.getElementById(steps[step].target);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    target?.classList.add("tour-focus");
    closeButtonRef.current?.focus();

    return () => target?.classList.remove("tour-focus");
  }, [open, step]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeTour();
      if (event.key === "ArrowRight") setStep((current) => Math.min(current + 1, steps.length - 1));
      if (event.key === "ArrowLeft") setStep((current) => Math.max(current - 1, 0));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  if (!open) {
    return <button ref={launchButtonRef} type="button" onClick={() => { setStep(0); setOpen(true); }} className="fixed bottom-5 right-5 z-40 rounded-full border border-cyan-200/40 bg-slate-950/90 px-5 py-3 text-sm font-bold text-cyan-100 shadow-2xl shadow-black/40 backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-cyan-300 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200">Take the tour <span aria-hidden="true">→</span></button>;
  }

  const current = steps[step];

  return (
    <aside className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-xl rounded-3xl border border-cyan-200/30 bg-slate-950/95 p-5 text-slate-100 shadow-2xl shadow-black/60 backdrop-blur-xl sm:bottom-7 sm:p-6" role="dialog" aria-modal="false" aria-labelledby="tour-title" aria-describedby="tour-description">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-cyan-300" aria-live="polite">Stop {step + 1} of {steps.length}</p>
        <button ref={closeButtonRef} type="button" onClick={closeTour} className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-bold text-slate-300 transition hover:border-white/40 hover:text-white" aria-label="Close website tour">Close</button>
      </div>
      <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10" aria-hidden="true"><div className="h-full rounded-full bg-cyan-300 transition-[width] duration-500" style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div>
      <h2 id="tour-title" className="mt-5 text-2xl font-extrabold text-white">{current.title}</h2>
      <p id="tour-description" className="mt-3 leading-7 text-slate-300">{current.text}</p>
      <p className="sr-only" aria-live="polite">Now showing {current.title}, stop {step + 1} of {steps.length}.</p>
      <div className="mt-6 flex items-center justify-between gap-3">
        <button type="button" onClick={() => setStep((currentStep) => currentStep - 1)} disabled={step === 0} className="rounded-full border border-white/20 px-4 py-2.5 text-sm font-bold text-white transition hover:border-cyan-200 disabled:cursor-not-allowed disabled:opacity-35">← Previous</button>
        {step < steps.length - 1 ? <button type="button" onClick={() => setStep((currentStep) => currentStep + 1)} className="rounded-full bg-cyan-300 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-200">Next section →</button> : <button type="button" onClick={closeTour} className="rounded-full bg-cyan-300 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-200">Finish tour</button>}
      </div>
      <p className="mt-4 hidden text-center text-xs text-slate-500 sm:block">Use ← and → to move between stops. Press Esc to close.</p>
    </aside>
  );
}
