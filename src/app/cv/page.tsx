import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Contact from "@/components/home/Contact";
import { affiliations, cvPdf, cvUpdated, honors, outreach, presentations, programs } from "@/lib/cv";

export const metadata: Metadata = {
  title: "Curriculum Vitae | William Eric Olson",
  description: "Education, research, presentations, honors, outreach, and technical training. Updated November 2026.",
};

const experience = [
  ["June–August 2026", "NSF REU Student Researcher", "Breakthrough Listen Initiative · UC Berkeley, California", "Conducted radio technosignature searches with Green Bank Telescope observations. Compared turboSETI and BLISS across high- and mid-frequency-resolution products, testing signal recovery with Voyager observations, ON/OFF comparisons, and synthetic injections."],
  ["September 2024–present", "Machine Learning for AGN Ionization Cone Detection", "UTSA · San Antonio, Texas", "Developing U-Net models and a modular Python framework for synthetic JWST images, augmentation, training, evaluation, and inference. Applying models to NIRCam and MIRI observations to investigate generalization, and proposed CLOUDY emission modeling to improve synthetic-image realism."],
  ["September 2024–present", "AGN Torus and Polar Wind Modeling", "UTSA · San Antonio, Texas", "Modeling infrared dust emission with FortesFit, CAT3D, CAT3D-Wind, and CLUMPY. Using forward modeling and image deconvolution to investigate dust geometry and polar emission, and comparing model predictions with JWST observations."],
];

const skills = [
  ["Programming", "Python, Bash"],
  ["Scientific computing", "NumPy, SciPy, Pandas, Astropy, GNU Radio"],
  ["Machine learning", "PyTorch, U-Net, segmentation-models-pytorch"],
  ["Astronomy software & data", "MAST Archive, SAOImage DS9, FITS, GNU Astronomy Utilities (NoiseChisel)"],
  ["Radio astronomy", "turboSETI, BLISS, blimpy, filterbank analysis, spectral analysis"],
  ["Visualization", "Matplotlib"],
  ["Development tools", "Git, Linux, remote SSH workflows, Jupyter Notebook, LaTeX"],
];

const groups = [
  { title: "Skills and tools", entries: skills },
  { title: "Honors & awards", entries: honors },
  { title: "Programs & training", entries: programs },
  { title: "Invited speaking & outreach", entries: outreach.map((item) => [`${item.title} · ${item.date}`, `${item.place}. ${item.detail}`]) },
  { title: "Affiliations", entries: affiliations.map((item) => [item, ""]) },
];

export default function CVPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <header className="border-b border-white/10 bg-slate-900/70">
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-36 sm:px-8 sm:pt-44">
          <p className="text-xs font-bold uppercase tracking-[.24em] text-cyan-300">Curriculum vitae · Updated {cvUpdated}</p>
          <div className="mt-5 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <h1 className="text-5xl font-black tracking-[-.045em] text-white sm:text-7xl">William Olson</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">Physics student and undergraduate researcher working across AGN imaging, astronomical machine learning, and radio technosignature searches.</p>
            </div>
            <a href={cvPdf} download className="button-sweep w-fit rounded-full bg-cyan-300 px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-200">Download CV · PDF ↓</a>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-6xl space-y-20 px-5 py-20 sm:px-8">
        <section>
          <p className="text-xs font-bold uppercase tracking-[.2em] text-cyan-300">Education</p>
          <div className="mt-6 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-2xl font-extrabold text-white">University of Texas at San Antonio</h2>
              <p className="mt-2 text-slate-300">B.S. Physics · Minors in Mathematics and Astrophysics · GPA 4.00/4.00</p>
              <p className="mt-2 text-slate-400">Since September 2024 · Coursework: Classical Mechanics, Mathematical Physics, Differential Equations, Linear Algebra</p>
            </div>
            <p className="text-sm font-bold text-cyan-200">Expected May 2028</p>
          </div>
        </section>
        <section>
          <p className="text-xs font-bold uppercase tracking-[.2em] text-cyan-300">Research experience</p>
          <div className="mt-6 space-y-0 border-t border-white/10">
            {experience.map(([date, title, place, detail]) => (
              <article key={title} className="grid gap-5 border-b border-white/10 py-7 md:grid-cols-[11rem_1fr]">
                <p className="text-sm font-bold text-cyan-300">{date}</p>
                <div>
                  <h2 className="text-xl font-extrabold text-white">{title}</h2>
                  <p className="mt-1 text-sm text-slate-500">{place}</p>
                  <p className="mt-4 max-w-3xl leading-7 text-slate-300">{detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-cyan-300">Presentations</p>
            <div className="mt-6 space-y-5">
              {presentations.map((item) => (
                <article key={`${item.venue}-${item.date}`} className="rounded-2xl border border-white/10 bg-white/[.035] p-5">
                  <p className="text-xs font-bold uppercase tracking-[.14em] text-cyan-300">{item.date} · {item.venue}</p>
                  <h2 className="mt-3 font-extrabold leading-6 text-white">{item.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{item.authors}</p>
                  <p className="mt-2 text-xs text-slate-500">{item.type}</p>
                </article>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[.035] p-6">
              <h2 className="text-sm font-bold text-cyan-300">Software & programs</h2>
              <ul className="mt-4 space-y-4 leading-7 text-slate-300">
                <li><a href="https://github.com/2xwlll/IonizationCone-Automation" target="_blank" rel="noreferrer" className="font-bold text-cyan-200 hover:text-white">Ionization Cone Automation Pipeline ↗</a><p>Synthetic AGN imaging, augmentation, U-Net training, inference, and evaluation for reproducible JWST experiments.</p></li>
                <li><a href="https://github.com/2xwlll/SPICESsense" target="_blank" rel="noreferrer" className="font-bold text-cyan-200 hover:text-white">Honors College Event Analyzer ↗</a><p>Attendance statistics and visualizations using event categories, SPICES themes, and keyword relationships.</p></li>
                <li><Link href="/research/seti" className="font-bold text-cyan-200 hover:text-white">Radio Signal Detection with NoiseChisel →</Link><p>Radio time–frequency data converted to FITS, with robust row-based normalization to reduce instrumental artifacts before detection.</p></li>
              </ul>
            </div>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[.035] p-6">
              <h2 className="text-sm font-bold text-cyan-300">Research interests</h2>
              <p className="mt-4 leading-7 text-slate-300">Active galactic nuclei, galaxy evolution, astronomical machine learning, scientific AI, radio astronomy, technosignature searches, JWST data analysis, and astronomical instrumentation.</p>
            </div>
          </div>
          <div>
            {groups.map((group) => (
              <section key={group.title} className="mt-6 first:mt-0">
                <h2 className="text-xs font-bold uppercase tracking-[.2em] text-cyan-300">{group.title}</h2>
                <div className="mt-6 rounded-2xl border border-white/10 bg-white/[.035] p-6">
                  <dl className="space-y-5">
                    {group.entries.map(([term, detail]) => (
                      <div key={term}>
                        <dt className="text-sm font-bold text-cyan-300">{term}</dt>
                        {detail && <dd className="mt-1 leading-7 text-slate-300">{detail}</dd>}
                      </div>
                    ))}
                  </dl>
                </div>
              </section>
            ))}
            <a href="/publications" className="mt-6 inline-flex text-sm font-bold text-cyan-200">View posters and public software →</a>
          </div>
        </section>
      </div>
      <Contact />
    </main>
  );
}
