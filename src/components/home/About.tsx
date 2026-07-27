function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 text-xs font-bold uppercase tracking-[.24em] text-cyan-300">{children}</p>;
}

export default function About() {
  return <section id="about" className="relative border-y border-white/10 bg-slate-900 py-24 sm:py-32">
    <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
      <div><Eyebrow>About me</Eyebrow><h2 className="max-w-xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">Curious about how the universe works—and how we can understand it better.</h2><div className="mt-7 max-w-2xl space-y-5 leading-7 text-slate-300"><p>I am an astrophysics undergraduate researcher interested in the powerful overlap between scientific questions and computational methods.</p><p>My work reaches from observations of galaxies and stars to the AI systems that help researchers identify meaningful patterns in vast, noisy datasets.</p></div><a href="#contact" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-cyan-200 transition hover:gap-3">Let&apos;s connect <span>→</span></a></div>
      <div className="grid grid-cols-2 gap-3 sm:gap-5">{[["Astrophysics", "Observation → insight"], ["Artificial intelligence", "Tools for discovery"], ["Scientific computing", "Signal from noise"], ["Open questions", "Always worth chasing"]].map(([heading, text], index) => <div key={heading} className={`rounded-2xl border border-white/10 p-5 sm:p-7 ${index === 0 ? "bg-cyan-300 text-slate-950" : "bg-white/[.045]"}`}><p className="text-lg font-semibold leading-tight">{heading}</p><p className={`mt-7 text-sm ${index === 0 ? "text-slate-700" : "text-slate-400"}`}>{text}</p></div>)}</div>
    </div>
  </section>;
}
