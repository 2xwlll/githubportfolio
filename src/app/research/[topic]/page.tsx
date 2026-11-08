import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Contact from "@/components/home/Contact";
import Navbar from "@/components/Navbar";
import { getResearchTopic, researchTopics } from "@/lib/research";
import ResearchFigure from "@/components/ResearchFigure";

type Props = { params: Promise<{ topic: string }> };

export function generateStaticParams() {
  return researchTopics.map(({ slug }) => ({ topic: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = getResearchTopic((await params).topic);
  return item ? { title: `${item.shortTitle} Research | William Eric Olson`, description: item.summary } : {};
}

export default async function ResearchTopicPage({ params }: Props) {
  const item = getResearchTopic((await params).topic);
  if (!item) notFound();

  return <main className="min-h-screen bg-slate-950 text-slate-100">
    <Navbar />
    <article>
      <header className="relative flex min-h-[72vh] items-end overflow-hidden pt-24">
        <Image src={item.image} alt={item.imageAlt} fill priority sizes="100vw" className="absolute inset-0 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/25" />
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8 sm:pb-24">
          <Link href="/research" className="mb-8 inline-block text-sm font-bold text-cyan-200 transition hover:text-white">← All research</Link>
          <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[.2em] text-cyan-300"><span>{item.eyebrow}</span><span className="rounded-full border border-cyan-200/30 bg-slate-950/50 px-3 py-1.5 text-cyan-100 backdrop-blur">{item.status}</span></div>
          <h1 className="mt-5 max-w-4xl text-5xl font-black tracking-[-.045em] text-white sm:text-7xl">{item.shortTitle}</h1>
          <p className="mt-4 text-xl font-bold text-slate-200 sm:text-2xl">{item.title}</p>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">{item.summary}</p>
        </div>
      </header>

      <section className="relative z-10 mx-auto -mt-8 grid max-w-6xl gap-3 px-5 sm:grid-cols-3 sm:px-8">
        {item.stats.map((stat) => <div key={stat.label} className="rounded-2xl border border-cyan-200/20 bg-slate-900/95 p-6 shadow-2xl shadow-black/20 backdrop-blur"><p className="text-3xl font-black text-cyan-200">{stat.value}</p><p className="mt-2 text-sm leading-5 text-slate-400">{stat.label}</p></div>)}
      </section>

      <section className="mx-auto grid max-w-6xl gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.2fr_.8fr]">
        <div><p className="text-xs font-bold uppercase tracking-[.24em] text-cyan-300">Research focus</p><h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">The question and why it matters</h2><p className="mt-7 text-lg leading-8 text-slate-300">{item.whyItMatters}</p><p className="mt-5 leading-8 text-slate-400">{item.challenge}</p></div>
        <aside className="rounded-2xl border border-white/10 bg-slate-900 p-7"><p className="text-xs font-bold uppercase tracking-[.2em] text-cyan-300">Methods & tools</p><ul className="mt-5 space-y-3">{item.methods.map((method) => <li key={method} className="flex gap-3 text-slate-300"><span className="text-cyan-300">✦</span>{method}</li>)}</ul></aside>
      </section>

      <section className="border-y border-white/10 bg-slate-900/70 py-20 sm:py-24"><div className="mx-auto max-w-6xl px-5 sm:px-8"><p className="text-xs font-bold uppercase tracking-[.24em] text-cyan-300">My approach</p><h2 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight text-white">{item.slug === "seti" ? "What I worked on" : "What I am doing now"}</h2><p className="mt-6 max-w-4xl text-lg leading-8 text-slate-300">{item.introduction}</p><div className="mt-10 grid gap-x-10 gap-y-7 sm:grid-cols-2">{item.progress.map((result, index) => <div key={result} className="flex gap-4 border-t border-white/10 pt-5"><span className="text-sm font-black text-cyan-300">{String(index + 1).padStart(2, "0")}</span><p className="leading-7 text-slate-300">{result}</p></div>)}</div>{item.resources && <div className="mt-8 flex flex-wrap gap-4">{item.resources.map((resource) => <a key={resource.href} href={resource.href} target="_blank" rel="noreferrer" className="group rounded-2xl border border-cyan-200/30 bg-cyan-300/10 px-6 py-5 transition hover:bg-cyan-300 hover:text-slate-950"><span className="font-extrabold text-cyan-100 group-hover:text-slate-950">{resource.label} ↗</span><span className="mt-1 block text-sm text-slate-400 group-hover:text-slate-700">{resource.detail}</span></a>)}</div>}</div></section>

      {item.slug === "agn" && <ResearchFigure />}

      <section className="border-y border-white/10 bg-slate-900/70 py-20 sm:py-24"><div className="mx-auto max-w-6xl px-5 sm:px-8"><p className="text-xs font-bold uppercase tracking-[.24em] text-cyan-300">What&apos;s next</p><div className="mt-8 grid gap-4 md:grid-cols-3">{item.nextSteps.map((step, index) => <div key={step} className="rounded-2xl border border-white/10 bg-slate-950/65 p-6"><span className="text-sm font-black text-cyan-300">0{index + 1}</span><p className="mt-5 text-lg font-bold leading-7 text-white">{step}</p></div>)}</div></div></section>

    </article>
    <Contact />
  </main>;
}
