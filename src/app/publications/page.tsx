import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Contact from "@/components/home/Contact";
import { presentations } from "@/lib/cv";

export const metadata: Metadata = { title: "Research Outputs | William Eric Olson", description: "Posters, software, tutorials, and research materials by William Eric Olson." };

const outputs: { type: string; date: string; title: string; detail: string; href?: string; action?: string }[] = [
  ...presentations.map((item) => ({
    type: item.type,
    date: item.date,
    title: item.title,
    detail: `${item.authors} ${item.venue}.`,
    href: item.href,
    action: item.href ? "Open poster" : undefined,
  })),
  { type: "Analysis · Radio astronomy", date: "2026", title: "Radio Signal Detection with NoiseChisel", detail: "Converted radio time–frequency data to FITS images for candidate detection, using robust row-based normalization and preprocessing to reduce instrumental artifacts.", href: "/research/seti", action: "Read workflow" },
  { type: "Software · Python", date: "Active", title: "Ionization Cone Automation Pipeline", detail: "Synthetic AGN imaging, augmentation, U-Net training, inference, evaluation, and geometric measurements.", href: "https://github.com/2xwlll/IonizationCone-Automation", action: "View repository" },
  { type: "Tutorial · Notebook", date: "Summer 2026", title: "SETI MidRes Tutorial", detail: "A documented introduction to loading, visualizing, and analyzing mid-resolution technosignature data.", href: "https://github.com/2xwlll/midres-tutorial", action: "Open tutorial" },
  { type: "Analysis · Notebook", date: "Summer 2026", title: "MidRes Narrowband Search", detail: "A test of turboSETI across narrowband observations and MidRes products using known spacecraft signals.", href: "https://github.com/2xwlll/midres_narrow", action: "View analysis" },
  { type: "Software · Data analysis", date: "2026", title: "Honors College Event Analyzer", detail: "Statistical analysis of attendance, SPICES categories, and keyword relationships in Honors College events.", href: "https://github.com/2xwlll/SPICESsense", action: "View repository" },
];

export default function PublicationsPage() {
  return <main className="min-h-screen bg-slate-950 text-slate-100"><Navbar /><header className="mx-auto max-w-6xl px-5 pb-14 pt-36 sm:px-8 sm:pt-44"><p className="text-xs font-bold uppercase tracking-[.24em] text-cyan-300">Research outputs</p><h1 className="mt-5 max-w-4xl text-5xl font-black tracking-[-.045em] text-white sm:text-7xl">Research, shared.</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">Presentations, software, tutorials, and analysis notebooks from my research. Available materials are linked below; papers will be added when publicly available.</p></header><section className="mx-auto max-w-6xl px-5 pb-28 sm:px-8"><div className="border-t border-white/10">{outputs.map((item, index) => <article key={`${item.title}-${item.date}-${item.detail}`} className="group grid gap-5 border-b border-white/10 py-8 transition hover:bg-white/[.025] sm:grid-cols-[3rem_1fr_auto] sm:px-4"><span className="text-sm font-black text-cyan-300">{String(index + 1).padStart(2, "0")}</span><div><div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-bold uppercase tracking-[.16em]"><span className="text-cyan-300">{item.type}</span><span className="text-slate-500">{item.date}</span></div><h2 className="mt-3 text-2xl font-extrabold leading-tight text-white">{item.title}</h2><p className="mt-3 max-w-3xl leading-7 text-slate-400">{item.detail}</p></div>{item.href ? <a href={item.href} target={item.href.startsWith("http") || item.href.endsWith(".pdf") ? "_blank" : undefined} rel={item.href.startsWith("http") || item.href.endsWith(".pdf") ? "noreferrer" : undefined} className="self-center text-sm font-bold text-cyan-200 transition group-hover:translate-x-1 group-hover:text-white">{item.action} ↗</a> : <span className="self-center text-sm text-slate-500">Presented</span>}</article>)}</div></section><Contact /></main>;
}
