import Link from "next/link";
import { outreach } from "@/lib/cv";

export default function Outreach() {
  return (
    <section id="outreach" aria-labelledby="outreach-title" className="relative border-y border-white/10 bg-slate-900 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[.24em] text-cyan-300">Outreach & mentoring</p>
          <h2 id="outreach-title" className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">Sharing what helped me get here.</h2>
          <p className="mt-7 leading-7 text-slate-300">Research grows through people. I speak about the support that helped me enter research, share the college and Ph.D. pathway with high-school students, and volunteer as a track and field coach.</p>
          <Link href="/outreach" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-cyan-200 transition hover:gap-3">Explore outreach &amp; mentoring <span aria-hidden="true">→</span></Link>
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
