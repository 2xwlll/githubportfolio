"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const links = [
  ["About", "/#about", "about"],
  ["Research", "/#research", "research"],
  ["Projects", "/#projects", "projects"],
  ["Philosophy", "/#philosophy", "philosophy"],
  ["CV", "/#cv", "cv"],
  ["Outreach", "/outreach", "outreach"],
  ["Contact", "/#contact", "contact"],
] as const;

const scrollSections = [
  ["about", "about"],
  ["research", "research"],
  ["projects", "projects"],
  ["philosophy", "philosophy"],
  ["cv", "cv"],
  ["outreach", "outreach"],
  ["contact", "contact"],
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const activeRef = useRef<string | null>(null);

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    let frame = 0;
    const updateActiveSection = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const marker = Math.min(180, window.innerHeight * 0.25);
        const current = scrollSections
          .map(([elementId, navId]) => ({ element: document.getElementById(elementId), navId }))
          .filter(({ element }) => element !== null && element.getBoundingClientRect().top <= marker)
          .at(-1);
        const nextSection = current?.navId ?? null;

        if (nextSection === activeRef.current) return;
        activeRef.current = nextSection;
        setActiveSection(nextSection);
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  const navActive = pathname.startsWith("/research") || pathname === "/publications" ? "research" : pathname === "/outreach" ? "outreach" : pathname === "/about" ? "about" : pathname === "/" ? activeSection : null;
  const linkClass = (id: string) => `text-sm font-medium transition ${navActive === id ? "text-cyan-200" : "text-slate-300 hover:text-cyan-200"}`;
  const closeMobile = (id: string) => {
    setActiveSection(id);
    setOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8" aria-label="Main navigation">
        <Link className="group flex items-center gap-3" href="/" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-full border border-cyan-300/40 bg-cyan-300/10 text-lg font-extrabold text-cyan-100 transition group-hover:border-cyan-200 group-hover:bg-cyan-300/20">W</span>
          <span className="leading-tight text-white"><span className="block text-sm font-semibold tracking-wide">William Olson</span><span className="block text-[10px] uppercase tracking-[0.18em] text-slate-400">Astrophysics · AI</span></span>
        </Link>

        <div className="hidden items-center gap-4 md:flex lg:gap-7">
          <Link className={linkClass("about")} href="/#about" aria-current={navActive === "about" ? "location" : undefined} onClick={() => setActiveSection("about")}>About</Link>
          <div className="group relative py-2">
            <Link href="/#research" className={`${linkClass("research")} inline-flex items-center gap-1.5`} aria-current={navActive === "research" ? "location" : undefined} onClick={() => setActiveSection("research")}>Research <span aria-hidden="true" className="text-[10px] transition group-hover:rotate-180 group-focus-within:rotate-180">▾</span></Link>
            <div className="invisible absolute left-1/2 top-full w-56 -translate-x-1/2 translate-y-2 rounded-2xl border border-white/10 bg-slate-950/95 p-2 opacity-0 shadow-2xl backdrop-blur-xl transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <Link href="/research" className="block rounded-xl px-4 py-3 text-sm text-slate-200 transition hover:bg-white/10 hover:text-cyan-200"><span className="block font-bold">Research areas</span><span className="mt-1 block text-xs text-slate-500">Questions, methods, and progress</span></Link>
              <Link href="/publications" className="block rounded-xl px-4 py-3 text-sm text-slate-200 transition hover:bg-white/10 hover:text-cyan-200"><span className="block font-bold">Research outputs</span><span className="mt-1 block text-xs text-slate-500">Posters, software, and tutorials</span></Link>
            </div>
          </div>
          {links.slice(2).map(([label, href, id]) => <Link className={linkClass(id)} href={href} key={label} aria-current={navActive === id ? (id === "outreach" && pathname === "/outreach" ? "page" : "location") : undefined} onClick={() => setActiveSection(id)}>{label}</Link>)}
        </div>

        <button className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-slate-100 transition hover:border-cyan-200/60 md:hidden" aria-label="Toggle navigation" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>
          <span className="text-xl leading-none">{open ? "×" : "☰"}</span>
        </button>
      </nav>

      {open && <div id="mobile-navigation" className="border-t border-white/10 bg-slate-950 px-5 py-4 md:hidden">
        <div className="mx-auto grid max-w-7xl gap-1">
          <Link href="/#about" onClick={() => closeMobile("about")} aria-current={navActive === "about" ? "location" : undefined} className={`rounded-lg px-3 py-3 text-sm font-medium ${navActive === "about" ? "bg-white/10 text-cyan-200" : "text-slate-200 hover:bg-white/10"}`}>About</Link>
          <Link href="/#research" onClick={() => closeMobile("research")} aria-current={navActive === "research" ? "location" : undefined} className={`rounded-lg px-3 py-3 text-sm font-bold ${navActive === "research" ? "bg-white/10 text-cyan-200" : "text-slate-200 hover:bg-white/10"}`}>Research</Link>
          <div className="mb-2 ml-3 grid border-l border-cyan-300/25 pl-3">
            <Link href="/research" onClick={() => closeMobile("research")} className="rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-white/10 hover:text-cyan-200">Research areas</Link>
            <Link href="/publications" onClick={() => closeMobile("research")} className="rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-white/10 hover:text-cyan-200">Research outputs</Link>
          </div>
          {links.slice(2).map(([label, href, id]) => <Link key={label} href={href} onClick={() => closeMobile(id)} aria-current={navActive === id ? (id === "outreach" && pathname === "/outreach" ? "page" : "location") : undefined} className={`rounded-lg px-3 py-3 text-sm font-medium ${navActive === id ? "bg-white/10 text-cyan-200" : "text-slate-200 hover:bg-white/10"}`}>{label}</Link>)}
        </div>
      </div>}
    </header>
  );
}
