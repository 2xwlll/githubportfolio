const milestones = [
  { date: "2024", title: "Joined UTSA research", text: "Began modeling AGN dust structures and learning infrared image analysis with the MAE Research Group." },
  { date: "2025", title: "Moved from images to models", text: "Started building synthetic observations and a U-Net pipeline to identify ionization cones consistently." },
  { date: "Spring 2026", title: "Tested the framework", text: "Presented the ionization-cone work at UTSA, the UTSA–SwRI Symposium, and the Kyoto Torus Workshop." },
  { date: "Summer 2026", title: "Added radio astronomy", text: "Joined the Breakthrough Listen REU at Berkeley to compare technosignature searches across data resolutions." },
  { date: "Now", title: "Research and outreach", text: "Testing transfer to JWST observations and sharing my research path through invited speaking and high-school STEM outreach." },
];

export default function ResearchTimeline() {
  return <section className="relative overflow-hidden border-y border-white/10 bg-slate-900/65 py-24 sm:py-28"><div className="mx-auto max-w-7xl px-5 sm:px-8"><p className="text-xs font-bold uppercase tracking-[.24em] text-cyan-300">Research timeline</p><h2 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">How the questions developed.</h2><div className="relative mt-14 grid gap-5 lg:grid-cols-5"><div className="absolute left-0 right-0 top-5 hidden h-px bg-gradient-to-r from-cyan-300/10 via-cyan-300/70 to-cyan-300/10 lg:block" />{milestones.map((item, index) => <article key={item.date} className="motion-card relative rounded-2xl border border-white/10 bg-slate-950/85 p-6"><span className="relative z-10 mb-5 block h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_1rem_rgba(34,211,238,.8)] lg:-mt-[1.8rem]" /><p className="text-xs font-bold uppercase tracking-[.17em] text-cyan-300">{item.date}</p><h3 className="mt-3 text-lg font-extrabold text-white">{item.title}</h3><p className="mt-3 text-sm leading-6 text-slate-400">{item.text}</p><span className="sr-only">Milestone {index + 1} of {milestones.length}</span></article>)}</div></div></section>;
}
