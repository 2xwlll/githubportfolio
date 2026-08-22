import Image from "next/image";

const projects = [
  {
    title: "Ionization Cone Automation",
    text: "The Python pipeline behind my AGN research. It generates training data, segments ionization cones, and measures the recovered geometry.",
    image: "/images/research/ngc1068_prediction.png",
    tag: "Research software",
    language: "Python",
    update: "Now: improving transfer from synthetic training data to JWST observations.",
    href: "https://github.com/2xwlll/IonizationCone-Automation",
  },
  {
    title: "SETI MidRes Tutorial",
    text: "A notebook tutorial for loading, visualizing, and working through mid-resolution SETI data without hiding the steps inside a black box.",
    image: "/images/research/spliced_blc00010203040506o7o0111213141516o7o021222324252627_guppi_59046_81310_DIAG_VOYAGER-1_0015.rawspec.0002_waterfall.png",
    tag: "Open tutorial",
    language: "Jupyter Notebook",
    update: "Now: documenting the route from telescope products to candidate-ready plots.",
    href: "https://github.com/2xwlll/midres-tutorial",
  },
  {
    title: "MidRes Narrowband Search",
    text: "I first use turboSETI to reproduce results on narrowband observations, then test whether the same method remains useful on MidRes data.",
    image: "/images/general/research-agentic.jpg",
    tag: "Active experiment",
    language: "Jupyter Notebook",
    update: "Now: comparing recovery behavior across narrowband and MidRes resolutions.",
    href: "https://github.com/2xwlll/midres_narrow",
  },
];

export default function Projects() {
  return (
    <>
      <section id="projects" className="relative border-y border-white/10 bg-slate-900 py-24 sm:py-32">
        <Image src="/images/general/background_blackhole_jet.jpg" alt="" fill sizes="100vw" className="object-cover opacity-15" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_.65fr] lg:items-end">
            <div className="relative">
              <Image src="/images/gifs/Code Coding Sticker by EscuelaDevRock.gif" alt="" width={64} height={64} unoptimized className="mb-5 h-14 w-14 object-contain opacity-80" />
              <p className="mb-4 text-xs font-bold uppercase tracking-[.24em] text-cyan-300">Open work · August 2026</p>
              <h2 className="max-w-2xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Code connected to my research.</h2>
            </div>
            <div>
              <p className="leading-7 text-slate-300">These repositories show what I am testing now: automatic measurements of ionization cones, a documented route into MidRes data, and an attempt to determine where an established narrowband search method stops working.</p>
              <a href="https://github.com/2xwlll" target="_blank" rel="noreferrer" className="mt-5 inline-flex text-sm font-bold text-cyan-200 transition hover:text-white">Follow the work on GitHub ↗</a>
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {projects.map((project, index) => (
              <a href={project.href} target="_blank" rel="noreferrer" key={project.title} style={{ animationDelay: `${index * 140}ms` }} className="motion-card group animate-[fade-up_700ms_ease-out_both] overflow-hidden rounded-2xl border border-white/10 bg-slate-950/65 transition hover:-translate-y-2 hover:border-cyan-300/50">
                <div className="relative aspect-[16/10] overflow-hidden"><Image src={project.image} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" /></div>
                <div className="p-7">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold uppercase tracking-[.16em]"><span className="text-cyan-300">{project.tag}</span><span className="text-slate-500">{project.language}</span></div>
                  <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-white">{project.title}</h3>
                  <p className="mt-4 leading-7 text-slate-400">{project.text}</p>
                  <p className="mt-5 border-l border-cyan-300/50 pl-4 text-sm leading-6 text-slate-300"><span className="font-bold text-cyan-300">August 2026</span><br />{project.update}</p>
                  <span className="mt-6 inline-block text-sm font-bold text-cyan-200">View repository ↗</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
