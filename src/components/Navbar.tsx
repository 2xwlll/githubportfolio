"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const links = [
  ["About", "/#about", "about"],
  ["Philosophy", "/#philosophy", "philosophy"],
  ["Research", "/#research", "research"],
  ["Projects", "/#projects", "projects"],
  ["Outputs", "/publications", "outputs"],
  ["CV", "/#cv", "cv"],
  ["Contact", "/#contact", "contact"],
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const activeRef = useRef<string | null>(null);

  useEffect(() => {
    if (window.location.pathname !== "/") return;

    const updateActiveSection = () => {
      const marker = window.innerHeight * 0.36;
      const sections = links
        .map(([, , id]) => document.getElementById(id))
        .filter((section): section is HTMLElement => section !== null);
      const current = sections.filter((section) => section.getBoundingClientRect().top <= marker).at(-1);
      const nextSection = current?.id ?? null;

      if (nextSection === activeRef.current) return;
      activeRef.current = nextSection;
      setActiveSection(nextSection);

      const nextUrl = nextSection ? `/#${nextSection}` : "/";
      window.history.replaceState(null, "", nextUrl);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8" aria-label="Main navigation">
        <Link className="group flex items-center gap-3" href="/" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-full border border-cyan-300/40 bg-cyan-300/10 text-lg font-extrabold text-cyan-100 transition group-hover:border-cyan-200 group-hover:bg-cyan-300/20">W</span>
          <span className="leading-tight text-white"><span className="block text-sm font-semibold tracking-wide">William Olson</span><span className="block text-[10px] uppercase tracking-[0.18em] text-slate-400">Astrophysics · AI</span></span>
        </Link>
        <div className="hidden items-center gap-7 md:flex">
          {links.map(([label, href, id]) => <Link className={`text-sm font-medium transition ${activeSection === id ? "text-cyan-200" : "text-slate-300 hover:text-cyan-200"}`} href={href} key={label} aria-current={activeSection === id ? "location" : undefined} onClick={() => setActiveSection(id)}>{label}</Link>)}
        </div>
        <button className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-slate-100 transition hover:border-cyan-200/60 md:hidden" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span className="text-xl leading-none">{open ? "×" : "☰"}</span>
        </button>
      </nav>
      {open && <div className="border-t border-white/10 bg-slate-950 px-5 py-4 md:hidden">
        <div className="mx-auto grid max-w-7xl gap-1">{links.map(([label, href, id]) => <Link key={label} href={href} onClick={() => { setActiveSection(id); setOpen(false); }} aria-current={activeSection === id ? "location" : undefined} className={`rounded-lg px-3 py-3 text-sm font-medium ${activeSection === id ? "bg-white/10 text-cyan-200" : "text-slate-200 hover:bg-white/10"}`}>{label}</Link>)}</div>
      </div>}
    </header>
  );
}
