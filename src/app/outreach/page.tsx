import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Contact from "@/components/home/Contact";
import { outreach } from "@/lib/cv";

export const metadata: Metadata = {
  title: "Outreach & Mentoring | William Eric Olson",
  description: "William Olson’s invited speaking, STEM outreach at James Madison High School, and volunteer track and field coaching.",
};

export default function OutreachPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <header className="border-b border-white/10 bg-slate-900/70">
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-36 sm:px-8 sm:pt-44">
          <p className="text-xs font-bold uppercase tracking-[.24em] text-cyan-300">Speaking · STEM · student athletes</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-black tracking-[-.045em] text-white sm:text-7xl">Outreach &amp; mentoring.</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">Research grows through people. I share the support that helped me enter research, talk with high-school students about college and the path to a Ph.D., and mentor student athletes through volunteer coaching.</p>
          <Link href="#contact" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-cyan-200 transition hover:gap-3">Get in touch about outreach <span aria-hidden="true">→</span></Link>
        </div>
      </header>
      <section aria-label="Outreach experience" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="border-t border-white/10">
          {outreach.map((item) => (
            <article key={item.title} className="grid gap-5 border-b border-white/10 py-8 md:grid-cols-[11rem_1fr]">
              <p className="text-xs font-bold uppercase tracking-[.17em] text-cyan-300">{item.date}</p>
              <div>
                <h2 className="text-2xl font-extrabold text-white">{item.title}</h2>
                <p className="mt-3 text-sm text-cyan-200">{item.place}</p>
                <p className="mt-4 max-w-3xl leading-8 text-slate-300">{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
        <Link href="/#outreach" className="mt-10 inline-flex text-sm font-bold text-cyan-200 transition hover:text-white">← Back to the homepage</Link>
      </section>
      <Contact />
    </main>
  );
}
