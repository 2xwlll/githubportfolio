const milestones = [
  { date: "Sept. 2024", title: "Started at UTSA", detail: "Began my physics degree and joined the MAE Research Group." },
  { date: "Oct. 2024", title: "APPEX research poster", detail: "Presented a water quality assessment of Lake Boerne." },
  { date: "May 2025", title: "JWST and active galaxies", detail: "Co-authored a Cosmic Horizons poster on using AI to study AGN." },
  { date: "May 2026", title: "Kyoto Torus Workshop", detail: "Presented my machine learning framework for tracing ionization cones." },
  { date: "Summer 2026", title: "Breakthrough Listen REU", detail: "Tested radio signal recovery with Voyager data and synthetic injections." },
  { date: "Sept. 2026", title: "UTSA Advancement Council", detail: "Spoke about the programs that helped me get started in research." },
];

export default function ResearchTimeline() {
  return (
    <div className="min-w-0">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h3 id="research-timeline-title" className="text-sm font-bold text-slate-100">Academic timeline</h3>
        <p className="text-xs text-slate-400">Scroll sideways to browse</p>
      </div>
      <div
        role="region"
        aria-labelledby="research-timeline-title"
        tabIndex={0}
        className="snap-x overflow-x-auto overscroll-x-contain rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
      >
        <ol className="flex w-max gap-3 pb-3">
          {milestones.map(({ date, title, detail }) => (
            <li key={date} className="w-48 shrink-0 snap-start rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3">
              <p className="text-xs font-semibold text-cyan-200">{date}</p>
              <h4 className="mt-1 text-sm font-bold text-white">{title}</h4>
              <p className="mt-1 text-sm leading-5 text-slate-400">{detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
