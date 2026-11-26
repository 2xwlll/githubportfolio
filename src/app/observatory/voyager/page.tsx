import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import LabAsciiArt from "@/components/labs/LabAsciiArt";
import VoyagerLab from "@/components/labs/VoyagerLab";

export const metadata: Metadata = { title: "Find Voyager | William Eric Olson", description: "A guided radio astronomy mini-lab comparing fine and mid-resolution Breakthrough Listen observations of Voyager 1." };

export default function VoyagerLabPage() {
  return <main className="min-h-screen bg-slate-950 px-5 pb-24 pt-32 text-slate-100 sm:px-8"><Navbar /><div className="mx-auto max-w-6xl"><Link href="/observatory" className="text-sm font-bold text-cyan-200">Back to the observatory</Link>
    <div className="mb-10 mt-10 grid items-center gap-6 md:grid-cols-[1fr_minmax(16rem,0.65fr)]">
      <div>
        <p className="text-xs font-bold uppercase tracking-[.2em] text-cyan-300">Professor Ribbit’s signal lab</p>
        <h1 className="mt-4 text-5xl font-black tracking-tight text-white sm:text-6xl">Find Voyager.</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">A spacecraft signal, two spectral resolutions, and a small challenge: spot the carrier and explore what the telescope actually recorded.</p>
      </div>
      <LabAsciiArt subject="voyager" />
    </div>
    <VoyagerLab /><noscript><p className="mt-6 leading-8 text-slate-300">The interactive waterfall needs JavaScript. You can still <a href="/labs/voyager/waterfalls.json" className="font-bold text-cyan-200">download the prepared data</a> or <a href="https://colab.research.google.com/drive/1wOC0SfRIm4v8qT7pGF8FS6o_ko7tY3RO#scrollTo=midres-000" className="font-bold text-cyan-200">open the full tutorial</a>.</p></noscript></div></main>;
}
