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
  ["Questions first", "I study physics at UTSA, with minors in mathematics and astrophysics, a 4.00 GPA, and an expected graduation in May 2028. Through the Honors College, APPEX, and the College of Science Work Study Research Training Program, I am preparing for graduate research."],
  ["From images to systems", "Since September 2024, I have studied AGN ionization cones and infrared dust structures with the UTSA Mid-Infrared Astrophysics & Exoplanet Science (MAE) Research Group. My work combines U-Net segmentation, synthetic JWST images, and torus and polar-wind modeling. I presented the cone framework at the Kyoto Torus Workshop in May 2026."],
  ["A wider signal search", "During my June–August 2026 NSF REU with Breakthrough Listen at UC Berkeley, I searched Green Bank Telescope observations and compared turboSETI and BLISS. Voyager signals, ON/OFF comparisons, and synthetic injections helped test signal recovery and candidate validation."],
  ["Beyond the research", "I give STEM talks at James Madison High School and volunteer as a track and field coach. In September 2026, I was an invited student speaker for UTSA’s College of Sciences Advancement Council, sharing how research programs supported my growth with donors, alumni, and community leaders."],
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
          <Link href="/#outreach" className="rounded-full border border-white/20 px-6 py-3.5 text-sm font-bold text-white">Outreach & mentoring</Link>
        </div>
      </section>
      <Contact />
    </main>
  );
}
