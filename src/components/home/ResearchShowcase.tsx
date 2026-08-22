import Image from "next/image";
import Link from "next/link";
import { researchTopics } from "@/lib/research";

export default function ResearchShowcase() {
  return (
    <section id="research" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div><p className="mb-4 text-xs font-bold uppercase tracking-[.24em] text-cyan-300">Research</p><h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Questions, tested in different ways.</h2></div>
          <Link href="/research" className="text-sm font-bold text-cyan-200 transition hover:text-white">View all research →</Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {researchTopics.map((item, index) => (
            <Link href={`/research/${item.slug}`} key={item.slug} style={{ animationDelay: `${index * 100}ms` }} className={`motion-card group overflow-hidden rounded-3xl border bg-slate-900/70 transition hover:-translate-y-1 hover:border-cyan-300/50 ${item.status === "Future direction" ? "border-dashed border-white/20" : "border-white/10"}`}>
              <div className="relative aspect-[16/8] overflow-hidden">
                <Image src={item.image} alt={item.imageAlt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-slate-950/75 px-3 py-1.5 text-xs font-bold text-cyan-100 backdrop-blur">{item.status}</span>
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[.18em] text-cyan-300">{item.eyebrow}</p>
                <h3 className="mt-3 text-3xl font-extrabold tracking-tight text-white">{item.title}</h3>
                <div className="mt-7 grid grid-cols-3 gap-2">
                  {item.stats.map((stat) => <div key={stat.label} className="rounded-xl border border-white/10 bg-slate-950/65 p-3 sm:p-4"><p className="text-lg font-black text-cyan-200 sm:text-xl">{stat.value}</p><p className="mt-1 text-[11px] leading-4 text-slate-400 sm:text-xs">{stat.label}</p></div>)}
                </div>
                <span className="mt-6 inline-block text-sm font-bold text-cyan-200">See the question, evidence, and limits →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
