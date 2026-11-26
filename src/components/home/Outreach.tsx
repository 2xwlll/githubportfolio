import Link from "next/link";
import { outreach } from "@/lib/cv";

export default function Outreach() {
  return (
    <section id="outreach" aria-labelledby="outreach-title" className="relative border-y border-white/10 bg-slate-900 scroll-mt-20 py-14 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 lg:gap-14 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <h2 id="outreach-title" className="text-xl font-bold text-white">Outreach &amp; mentoring</h2>
          <p className="mt-3 leading-7 text-slate-300">I talk with high school students about college and research, and volunteer as a track and field coach.</p>
          <Link href="/outreach" className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-cyan-200 transition hover:gap-3">Explore outreach &amp; mentoring <span aria-hidden="true">→</span></Link>
        </div>
        <div className="border-t border-white/10">
          {outreach.map((item) => (
            <article key={item.title} className="grid gap-3 border-b border-white/10 py-6 sm:grid-cols-[6rem_1fr]">
              <p className="text-xs font-bold uppercase tracking-[.17em] text-cyan-300">{item.date}</p>
              <div>
                <h3 className="text-lg font-extrabold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-cyan-200">{item.place}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
