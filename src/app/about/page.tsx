import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Contact from "@/components/home/Contact";

export const metadata: Metadata = {
  title: "About | William Eric Olson",
  description: "William Olson's path through physics, astrophysics research, machine learning, sprinting, and coaching.",
};

const chapters = [
  ["Questions first", "I study physics at UTSA because I want to understand how complex systems reveal themselves through limited observations. Astronomy turns that curiosity into concrete questions about galaxies, black holes, signals, and measurement."],
  ["From images to systems", "My research began with infrared images of active galactic nuclei. Building synthetic observations and segmentation models taught me that useful machine learning must remain connected to the physical assumptions underneath it."],
  ["A wider signal search", "Breakthrough Listen extended that thinking into radio astronomy: different data products preserve different information, and a credible search depends on understanding exactly what a pipeline changes or discards."],
  ["Beyond the research", "Sprinting teaches deliberate iteration. Coaching teaches me to communicate what I see. Both make me a more patient researcher and a better collaborator."],
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <header className="border-b border-white/10 pt-28 sm:pt-36">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 sm:px-8 sm:pb-24 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div><p className="text-xs font-bold uppercase tracking-[.24em] text-cyan-300">About me</p><h1 className="mt-5 text-5xl font-black tracking-[-.045em] text-white sm:text-7xl">Curiosity, translated into work.</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">I am William Olson—a physics student, astrophysics researcher, sprinter, and coach learning how to turn difficult questions into systems people can inspect and improve.</p></div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10"><Image src="/images/general/japan/japan_headshot.JPG" alt="William Olson at Kinkaku-ji in Kyoto" fill priority sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" /></div>
        </div>
      </header>
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-x-12 gap-y-5 md:grid-cols-2">
          {chapters.map(([title, text], index) => <article key={title} className="border-t border-white/10 py-7"><p className="text-xs font-black text-cyan-300">0{index + 1}</p><h2 className="mt-4 text-2xl font-extrabold text-white">{title}</h2><p className="mt-4 leading-7 text-slate-400">{text}</p></article>)}
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          <Link href="/research" className="rounded-full bg-cyan-300 px-6 py-3.5 text-sm font-bold text-slate-950">Explore my research →</Link>
          <Link href="/cv" className="rounded-full border border-white/20 px-6 py-3.5 text-sm font-bold text-white">View my CV</Link>
        </div>
      </section>
      <Contact />
    </main>
  );
}
