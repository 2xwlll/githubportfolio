import Image from "next/image";
import Link from "next/link";

const results = [
  ["1,000", "synthetic observations"],
  ["0.647", "mean intersection-over-union"],
  ["3.7°", "mean position-angle error"],
  ["NGC 1068", "tested on real observations"],
];

export default function FeaturedResearch() {
  return (
    <section id="featured-research" className="relative border-y border-white/10 bg-slate-900 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.24em] text-cyan-300">Featured result · AGN research</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">Turning ionization-cone morphology into a measurable, reproducible system.</h2>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">I built a physically motivated U-Net pipeline that generates synthetic astronomical observations, segments diffuse ionized emission, and recovers cone geometry. Testing revealed both where the approach works and where transfer to real galaxies still breaks down.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/research/agn" className="rounded-full bg-cyan-300 px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-200">See methods and limitations →</Link>
            <a href="https://github.com/2xwlll/IonizationCone-Automation" target="_blank" rel="noreferrer" className="rounded-full border border-white/20 px-6 py-3.5 text-sm font-bold text-white transition hover:border-cyan-200 hover:bg-white/10">Inspect the code ↗</a>
          </div>
        </div>
        <div>
          <div className="relative aspect-[16/7] overflow-hidden rounded-2xl border border-white/10 bg-slate-950">
            <Image src="/images/research/ngc1068_prediction.png" alt="Model prediction for the active galaxy NGC 1068" fill sizes="(min-width: 1024px) 44vw, 100vw" className="object-cover" />
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-3">
            {results.map(([value, label]) => <div key={label} className="rounded-2xl border border-white/10 bg-slate-950/70 p-5"><dt className="text-2xl font-black text-cyan-200">{value}</dt><dd className="mt-2 text-sm leading-5 text-slate-400">{label}</dd></div>)}
          </dl>
          <p className="mt-4 text-xs leading-5 text-slate-500">Position-angle performance is strong; opening-angle recovery remains a documented limitation on real observations.</p>
        </div>
      </div>
    </section>
  );
}
