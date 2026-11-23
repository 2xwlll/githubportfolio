import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ConeLab from "@/components/labs/ConeLab";

export const metadata: Metadata = { title: "Find the Cone | William Eric Olson", description: "Trace NGC 1068’s ionization cone, then compare your region with a U-Net prediction and published 3D geometry projected onto the HST image." };

export default function ConeLabPage() {
  return <main className="min-h-screen bg-slate-950 px-5 pb-24 pt-32 text-slate-100 sm:px-8"><Navbar /><div className="mx-auto max-w-6xl"><Link href="/observatory" className="text-sm font-bold text-cyan-200">Back to the observatory</Link><p className="mt-10 text-xs font-bold uppercase tracking-[.2em] text-cyan-300">Professor Ribbit’s image lab</p><h1 className="mt-4 text-5xl font-black tracking-tight text-white sm:text-6xl">Find the cone.</h1><p className="mb-10 mt-6 max-w-3xl text-lg leading-8 text-slate-300">Can you trace the extended structure around an active galactic nucleus? Make your own mark, then compare it with a U-Net prediction and published cone geometry mapped to the same HST image.</p><ConeLab /><noscript><p className="mt-6 leading-8 text-slate-300">The drawing controls need JavaScript. You can still <a href="/labs/cones/ngc1068.json" className="font-bold text-cyan-200">download the example</a> and <a href="/labs/cones/reproduce.py" className="font-bold text-cyan-200">reproduce the frozen comparison in Python</a>.</p></noscript></div></main>;
}
