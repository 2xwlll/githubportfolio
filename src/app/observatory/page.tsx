import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import FrogGuide from "@/components/labs/FrogGuide";

export const metadata: Metadata = { title: "After Hours Observatory | William Eric Olson", description: "Find Voyager’s radio signal and trace an ionization cone with Professor Ribbit, your frog astronomer guide." };

export default function ObservatoryPage() {
  return <main className="min-h-screen bg-slate-950 px-5 pb-24 pt-32 text-slate-100 sm:px-8"><Navbar /><div className="mx-auto max-w-5xl">
    <Link href="/" className="text-sm font-bold text-cyan-200">Back to the main site</Link>
    <p className="mt-10 text-xs font-bold uppercase tracking-[.24em] text-cyan-300">The observatory after hours</p>
    <h1 className="mt-4 text-5xl font-black tracking-tight text-white sm:text-7xl">A little curiosity goes a long way.</h1>
    <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">You found the night shift. Step inside for two small experiments connected to my research, with real data and a very enthusiastic frog.</p>
    <div className="mt-10"><FrogGuide>I’m Professor Ribbit. My telescope is small; my questions are not. Pick an experiment, make your own prediction, then inspect the evidence.</FrogGuide></div>
    <div className="mt-10 grid gap-6 md:grid-cols-2">
      <Link href="/observatory/voyager" className="group rounded-3xl border border-white/10 bg-slate-900/70 p-7 transition hover:border-cyan-200/50 hover:bg-slate-900 sm:p-9"><p className="text-sm font-bold text-cyan-300">Radio astronomy</p><h2 className="mt-4 text-3xl font-extrabold text-white">Find Voyager.</h2><p className="mt-5 leading-8 text-slate-400">Find a spacecraft’s radio carrier in telescope observations. Explore what fine and mid-resolution data let you see.</p><span className="mt-7 inline-block text-sm font-bold text-cyan-200">Enter the signal lab</span></Link>
      <Link href="/observatory/cones" className="group rounded-3xl border border-white/10 bg-slate-900/70 p-7 transition hover:border-cyan-200/50 hover:bg-slate-900 sm:p-9"><p className="text-sm font-bold text-cyan-300">Astronomical imaging</p><h2 className="mt-4 text-3xl font-extrabold text-white">Find the cone.</h2><p className="mt-5 leading-8 text-slate-400">Trace an HST image, then compare your region with a U-Net prediction and published cone geometry projected onto the galaxy.</p><span className="mt-7 inline-block text-sm font-bold text-cyan-200">Enter the cone lab</span></Link>
    </div>
    <p className="mt-10 text-sm leading-7 text-slate-500">These are guided explorations. Each lab includes its data source, display choices, and the limits of its comparison.</p>
  </div></main>;
}
