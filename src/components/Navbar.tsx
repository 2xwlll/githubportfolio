"use client";

import { useState } from "react";

const links = [
  ["About", "/#about"],
  ["Philosophy", "/#philosophy"],
  ["Research", "/research"],
  ["Projects", "/projects"],
  ["CV", "/cv"],
  ["Contact", "/contact"],
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8" aria-label="Main navigation">
        <a className="group flex items-center gap-3" href="/" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-full border border-cyan-300/40 bg-cyan-300/10 text-lg font-extrabold text-cyan-100 transition group-hover:border-cyan-200 group-hover:bg-cyan-300/20">W</span>
          <span className="leading-tight text-white"><span className="block text-sm font-semibold tracking-wide">William Olson</span><span className="block text-[10px] uppercase tracking-[0.18em] text-slate-400">Astrophysics · AI</span></span>
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {links.map(([label, href]) => <a className="text-sm font-medium text-slate-300 transition hover:text-cyan-200" href={href} key={label}>{label}</a>)}
        </div>
        <button className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-slate-100 transition hover:border-cyan-200/60 md:hidden" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span className="text-xl leading-none">{open ? "×" : "☰"}</span>
        </button>
      </nav>
      {open && <div className="border-t border-white/10 bg-slate-950 px-5 py-4 md:hidden">
        <div className="mx-auto grid max-w-7xl gap-1">{links.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-slate-200 hover:bg-white/10">{label}</a>)}</div>
      </div>}
    </header>
  );
}
