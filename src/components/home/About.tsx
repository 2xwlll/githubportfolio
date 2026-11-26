import Link from "next/link";
import ResearchTimeline from "./ResearchTimeline";

export default function About() {
  return (
    <section id="about" className="border-y border-white/10 bg-slate-900 py-12 sm:py-16">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 sm:px-8 lg:grid-cols-[.8fr_minmax(0,1.2fr)] lg:gap-14">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">About me</h2>
          <p className="mt-4 max-w-lg leading-7 text-slate-300">
            I study physics at UT San Antonio, with minors in mathematics and astrophysics.
            I work on active galactic nuclei with UTSA’s MAE Research Group and on radio
            technosignature searches with Breakthrough Listen.
          </p>
          <Link href="/about" className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-cyan-200 underline decoration-cyan-200/40 underline-offset-4 hover:text-white">
            Read more about me
          </Link>
        </div>
        <ResearchTimeline />
      </div>
    </section>
  );
}
